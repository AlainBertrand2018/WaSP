
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
import { Message, streamFlow } from 'genkit';

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
    console.error('Failed to generate a valid embedding for the query.');
    return [];
  }

  // 2. Call the Supabase RPC to find matching sections using the secure admin client.
  const { data, error } = await supabaseAdminClient.rpc('search_constitution_sections', {
    query_embedding: queryEmbedding,
    match_threshold: 0.75, // Only return chunks with a similarity score > 0.75
    match_count: 5,       // Return top 5 most relevant chunks
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


export async function* streamAnswerForLegitimusPrime(
  input: AskLegitimusPrimeInput
): AsyncGenerator<string> {
    console.log("--- STREAMING TRACE: Starting streamAnswerForLegitimusPrime flow ---");
    const { stream, response } = streamFlow(
      {
        name: 'streamLegitimusPrime',
        inputSchema: AskLegitimusPrimeInputSchema,
      },
      async (flowInput) => {
        console.log("--- STREAMING TRACE: Triage step ---");
        const triageResult = await triagePrompt(flowInput.question);

        if (triageResult.output?.decision === 'greet_or_decline') {
            console.log("--- STREAMING TRACE: Triage result is 'greet_or_decline' ---");
            const standardResponse = await standardResponsePrompt(flowInput.question);
            return standardResponse.output || { answer: "I can only assist with questions about the Constitution of Mauritius." };
        }

        console.log("--- STREAMING TRACE: Triage result is 'search_document'. Starting RAG process. ---");
        const context = await searchConstitution(flowInput.question);
        
        console.log(`--- STREAMING TRACE: Found ${context.length} relevant context chunks. ---`);
        const { output } = await ragPrompt({
            ...flowInput,
            context
        });

        return output || { answer: "I could not generate a response."};
      }
    );

    // Call the flow
    const flowPromise = stream(input);

    for await (const chunk of (await flowPromise).stream) {
        if(chunk.content) {
            console.log("--- STREAMING TRACE: Yielding chunk ---", chunk.content);
            yield chunk.content;
        }
    }
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
  prompt: `You are Legitimus Prime, an expert AI assistant specializing in the Constitution of Mauritius. Using the following CONTEXT provided from the document, answer the user's QUESTION.
Your answer must be based exclusively on the information within the provided CONTEXT.
Do not use any outside knowledge. If the CONTEXT does not contain the answer, state that you cannot answer based on the provided information.

CONTEXT:
---
{{#each context}}
  {{this}}
---
{{/each}}

QUESTION:
{{question}}`,
});


const triagePrompt = ai.definePrompt({
    name: 'legitimusPrimeTriagePrompt',
    input: { schema: z.string() },
    output: { schema: z.object({ decision: z.enum(['search_document', 'greet_or_decline']) }) },
    prompt: `You are a triage agent. Your job is to determine if a user's query requires searching a legal document.
    - If the query asks about laws, rights, government structure, legal procedures, or anything that could plausibly be answered by the Constitution of Mauritius, respond with "search_document".
    - If the query is a simple greeting (e.g., "hello", "hi", "how are you?"), a thank you, or clearly off-topic (e.g., "what is the weather like?"), respond with "greet_or_decline".

    User query: "{{query}}"`,
    model: 'googleai/gemini-2.0-flash',
});


const standardResponsePrompt = ai.definePrompt({
    name: 'legitimusPrimeStandardResponsePrompt',
    input: { schema: z.string() },
    output: { schema: z.object({ answer: z.string() }) },
    prompt: `You are Legitimus Prime, a legal AI assistant for the Constitution of Mauritius. The user has said something that does not require a document search.
    - If it's a simple greeting like "hello" or "hi", respond with a polite, brief greeting like "Hello! How can I help you with the Constitution of Mauritius?".
    - If it's something else (like "thank you" or an off-topic question), politely state that you can only answer questions related to the Constitution of Mauritius.
    
    User input: "{{query}}"`,
    model: 'googleai/gemini-2.0-flash',
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
