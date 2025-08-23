
'use server';
/**
 * @fileOverview An AI agent that answers questions about the Mauritian constitution.
 * It uses a Retrieval-Augmented Generation (RAG) pattern with Supabase/pgvector
 * to ensure answers are based exclusively on the provided legal document.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
// Import the new admin client for server-side operations
import { supabaseAdminClient } from '@/lib/supabase';

const AskLegitimusPrimeInputSchema = z.object({
  question: z.string().describe("The user's question about Mauritian law."),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
      })
    )
    .describe('The history of the conversation.'),
});

const AskLegitimusPrimeOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer based on the provided legal document.'),
});

export type AskLegitimusPrimeInput = z.infer<typeof AskLegitimusPrimeInputSchema>;
export type AskLegitimusPrimeOutput = z.infer<typeof AskLegitimusPrimeOutputSchema>;


/**
 * Searches the constitution sections in Supabase for relevant context.
 * @param query The user's question.
 * @returns A promise that resolves to an array of content strings.
 */
async function searchConstitution(query: string): Promise<string[]> {
  // 1. Generate an embedding for the user's query.
  const embeddingResponse = await ai.embed({
    embedder: 'googleai/text-embedding-004',
    content: query,
  });

  // Correctly extract the raw vector.
  const queryEmbedding = embeddingResponse[0]?.embedding;

  if (!queryEmbedding) {
    throw new Error('Failed to generate a valid embedding for the query.');
  }

  // 2. Call the Supabase RPC to find matching sections using the secure admin client.
  const { data, error } = await supabaseAdminClient.rpc('search_constitution_sections', {
    query_embedding: queryEmbedding,
    match_threshold: 0.75, // Adjust this threshold as needed
    match_count: 5,       // Return top 5 matches
  });

  if (error) {
    console.error('Error searching constitution:', error);
    throw new Error('Failed to search for relevant constitution sections.');
  }

  // 3. Return the content of the matched sections.
  return data.map((item: any) => item.content);
}


export async function askLegitimusPrime(
  input: AskLegitimusPrimeInput
): Promise<AskLegitimusPrimeOutput> {
  const result = await legitimusPrimeFlow(input);
  return result;
}

const ragPrompt = ai.definePrompt({
  name: 'legitimusPrimeRagPrompt',
  input: {
    schema: z.object({
      question: z.string(),
      history: z.array(z.object({ role: z.enum(['user', 'model']), content: z.string() })),
      context: z.array(z.string()), // Context from Supabase
    }),
  },
  output: { schema: AskLegitimusPrimeOutputSchema },
  prompt: `You are Legitimus Prime, a specialized legal AI assistant. Your sole purpose is to answer questions based *exclusively* on the provided context from the Constitution of Mauritius.

**CRITICAL INSTRUCTIONS:**
1.  **DO NOT** use any external knowledge, personal opinions, or information not present in the provided context.
2.  If the answer to a question cannot be found within the provided context, you MUST state: "I cannot answer that question as the information is not contained within the provided text of the Constitution of Mauritius."
3.  Your answers must be direct, factual, and cite the relevant section of the constitution if possible, based on the context.
4.  Maintain a formal, professional, and objective tone at all times. You are an informational tool, not a legal advisor.
5.  Never provide legal advice or interpret the law in a way that suggests a course of action. Stick to what the text says.

**CONTEXT FROM THE CONSTITUTION OF MAURITIUS:**
---
{{#each context}}
  {{this}}
---
{{/each}}

**Conversation History:**
{{#each history}}
  **{{role}}**: {{content}}
{{/each}}

**User's new question:**
{{question}}

Based *only* on the context provided, generate a helpful answer.`,
});


const triagePrompt = ai.definePrompt({
    name: 'legitimusPrimeTriagePrompt',
    input: { schema: z.string() },
    output: { schema: z.object({ decision: z.enum(['search_document', 'greet_or_decline']) }) },
    prompt: `You are a triage agent. Your job is to determine if a user's query requires searching a legal document for an answer, or if it is a simple greeting, conversational filler, or an off-topic question.

    - If the query is asking a question that could be answered by the Constitution of Mauritius (e.g., "What are the powers of the president?", "How is parliament formed?"), respond with "search_document".
    - If the query is a simple greeting (e.g., "hello", "hi", "how are you?"), a thank you, or an off-topic question (e.g., "what is the weather like?"), respond with "greet_or_decline".

    User query: "{{query}}"`,
    config: {
        model: 'googleai/gemini-2.0-flash'
    }
});


const standardResponsePrompt = ai.definePrompt({
    name: 'legitimusPrimeStandardResponsePrompt',
    input: { schema: z.string() },
    output: { schema: z.object({ answer: z.string() }) },
    prompt: `You are Legitimus Prime, a friendly but professional legal AI assistant for the Constitution of Mauritius.
    The user has said something that does not require a document search.
    - If it's a greeting, respond with a polite, brief greeting.
    - If it's off-topic, politely state that you can only answer questions related to the Constitution of Mauritius.
    User's input: "{{query}}"`,
    config: {
        model: 'googleai/gemini-2.0-flash'
    }
});


const legitimusPrimeFlow = ai.defineFlow(
  {
    name: 'legitimusPrimeFlow',
    inputSchema: AskLegitimusPrimeInputSchema,
    outputSchema: AskLegitimusPrimeOutputSchema,
  },
  async (input) => {
    // Step 1: Triage the user's question to see if it needs a search.
    const triageResult = await triagePrompt(input.question);
    
    if (triageResult.output?.decision === 'greet_or_decline') {
        // Step 2a: If it's a greeting/off-topic, generate a standard response.
        const standardResponse = await standardResponsePrompt(input.question);
        return standardResponse.output || { answer: "I can only assist with questions about the Constitution of Mauritius." };
    }

    // Step 2b: If it requires a search, proceed with the RAG process.
    // Retrieve relevant context from Supabase based on the user's question.
    const context = await searchConstitution(input.question);
    
    // Call the prompt with the question, history, and the retrieved context.
    const { output } = await ragPrompt({
        ...input,
        context
    });

    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    return output;
  }
);
