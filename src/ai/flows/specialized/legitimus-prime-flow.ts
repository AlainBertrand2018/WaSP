
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

// The output now includes a structured sources array
const AskLegitimusPrimeOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer based on the provided legal document.'),
  sources: z.array(z.object({ 
      content: z.string(),
      // In the future, we could add more metadata here like title, section, score
  })).describe('The chunks of text from the source document used to generate the answer.'),
});

export type AskLegitimusPrimeInput = z.infer<typeof AskLegitimusPrimeInputSchema>;
export type AskLegitimusPrimeOutput = z.infer<typeof AskLegitimusPrimeOutputSchema>;


/**
 * Searches the constitution sections in Supabase for relevant context.
 * @param query The user's question.
 * @returns A promise that resolves to an array of content strings.
 */
async function searchConstitution(query: string): Promise<any[]> {
  // 1. Generate an embedding for the user's query.
  const embeddingResponse = await ai.embed({
    embedder: 'googleai/text-embedding-004',
    content: query,
  });

  const queryEmbedding = embeddingResponse[0]?.embedding;

  if (!queryEmbedding) {
    console.error('MANUAL CHECK FAILED: Could not generate a valid embedding for the query.');
    return [];
  }
  console.log('MANUAL CHECK 1: User question embedded successfully.');


  // 2. Call the Supabase RPC to find matching sections using the secure admin client.
  const { data, error } = await supabaseAdminClient.rpc('search_constitution_sections', {
    query_embedding: queryEmbedding,
    match_threshold: 0.75, // Only return chunks with a similarity score > 0.75
    match_count: 5,       // Return top 5 most relevant chunks
  });

  if (error) {
    console.error('MANUAL CHECK FAILED: Error searching constitution in Supabase:', error);
    throw new Error('Failed to search for relevant constitution sections.');
  }

  console.log(`MANUAL CHECK 2: Supabase vector search returned ${data.length} chunks.`);
  if(data.length > 0) {
      console.log("Supabase search result (first chunk content):", (data[0] as any)?.content?.substring(0, 100) + "...");
  }

  // 3. Return the full matched sections, which now include content and other metadata
  return data || [];
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
    const { stream, response } = streamFlow(
      {
        name: 'streamLegitimusPrime',
        inputSchema: AskLegitimusPrimeInputSchema,
      },
      async (flowInput) => {
        console.log("--- STARTING STREAMING FLOW ---");
        const triageResult = await triagePrompt(flowInput.question);
        console.log("MANUAL CHECK 4: Triage decision is:", triageResult.output?.decision);


        if (triageResult.output?.decision === 'greet_or_decline') {
            const standardResponse = await standardResponsePrompt(flowInput.question);
            return { answer: standardResponse.output?.answer || "I can only assist with questions about the Constitution of Mauritius.", sources: [] };
        }

        const retrievedDocs = await searchConstitution(flowInput.question);

        if (!retrievedDocs || retrievedDocs.length === 0) {
          return {
            answer: "I couldn't find any relevant information in the Constitution of Mauritius to answer that question.",
            sources: []
          };
        }

        const context = retrievedDocs.map((doc, i) => `<<<SOURCE ${i+1}>>>\n${doc.content}`).join('\n\n---\n\n');
        console.log('MANUAL CHECK 3: Assembled context for AI. Total characters:', context.length);

        
        const { output } = await ragPrompt({
            question: flowInput.question,
            context
        });

        // The RAG prompt returns the answer, we just need to attach the sources.
        return { 
          answer: output?.answer || "I could not generate a response.", 
          sources: retrievedDocs.map(doc => ({ content: doc.content })) 
        };
      }
    );

    // Call the flow
    const flowPromise = stream(input);

    for await (const chunk of (await flowPromise).stream) {
        if(chunk.content) {
            yield chunk.content;
        }
    }
}


const ragPrompt = ai.definePrompt({
  name: 'legitimusPrimeRagPrompt',
  input: {
    schema: z.object({
      question: z.string(),
      context: z.string(),
    }),
  },
  output: { schema: z.object({ answer: z.string() }) },
  prompt: `You are Legitimus Prime, a legal AI assistant. Your sole purpose is to answer questions based on the Constitution of Mauritius.

You must follow these rules strictly:
1.  Answer ONLY using the provided sources from the Constitution.
2.  If the answer is not present in the sources, you MUST state: "I do not have enough information in the Constitution to answer that question." Do not use outside knowledge.
3.  Cite your sources at the end of relevant sentences using the format [S1], [S2], etc., matching the source blocks.
4.  Do NOT provide legal advice. Provide factual excerpts and references only.

User's Question:
{{question}}

Sources from the Constitution of Mauritius:
---
{{context}}
---

Based on the sources provided, answer the user's question.`,
});


const triagePrompt = ai.definePrompt({
    name: 'legitimusPrimeTriagePrompt',
    input: { schema: z.string() },
    output: { schema: z.object({ decision: z.enum(['search_document', 'greet_or_decline']) }) },
    prompt: `You are a triage agent. Your job is to determine if a user's query requires searching a legal document.
- If the query asks about laws, rights, government structure, legal procedures, or anything that could plausibly be answered by the Constitution of Mauritius, respond with "search_document".
- If the query is a simple greeting (e.g., "hello", "hi", "how are you?"), a thank you, or clearly off-topic (e.g., "what is the weather like?"), respond with "greet_or_decline".

User query: "{{query}}"`,
});


const standardResponsePrompt = ai.definePrompt({
    name: 'legitimusPrimeStandardResponsePrompt',
    input: { schema: z.string() },
    output: { schema: z.object({ answer: z.string() }) },
    prompt: `You are Legitimus Prime, a seasoned legal AI assistant specialized in the laws and Constitution of Mauritius. The user has said something that does not require a document search.
- If it's a simple greeting like "hello" or "hi", respond with a polite, brief greeting like "Hello! How can I help you with the Constitution of Mauritius?".
- If it's something else (like "thank you" or an off-topic question), politely state that you can only answer questions related to the Constitution of Mauritius.
    
User input: "{{query}}"`,
});


const legitimusPrimeFlow = ai.defineFlow(
  {
    name: 'legitimusPrimeFlow',
    inputSchema: AskLegitimusPrimeInputSchema,
    outputSchema: AskLegitimusPrimeOutputSchema,
  },
  async (input) => {
    console.log("--- STARTING NON-STREAMING FLOW ---");
    // Step 1: Triage the user's question to see if it needs a search.
    const triageResult = await triagePrompt(input.question);
    console.log("MANUAL CHECK 4: Triage decision is:", triageResult.output?.decision);

    
    if (triageResult.output?.decision === 'greet_or_decline') {
        // Step 2a: If it's a greeting/off-topic, generate a standard response.
        const standardResponse = await standardResponsePrompt(input.question);
        return { 
          answer: standardResponse.output?.answer || "I can only assist with questions about the Constitution of Mauritius.",
          sources: [] 
        };
    }

    // Step 2b: If it requires a search, proceed with the RAG process.
    const retrievedDocs = await searchConstitution(input.question);

    if (!retrievedDocs || retrievedDocs.length === 0) {
      return {
        answer: "I couldn't find any relevant information in the Constitution of Mauritius to answer that question.",
        sources: []
      };
    }

    // Assemble the context for the prompt
    const context = retrievedDocs.map((doc, i) => `<<<SOURCE ${i+1}>>>\n${doc.content}`).join('\n\n---\n\n');
    console.log('MANUAL CHECK 3: Assembled context for AI. Total characters:', context.length);

    
    // Call the prompt with the question and the retrieved context.
    const { output } = await ragPrompt({
        question: input.question,
        context
    });

    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    
    // Return the answer and the structured sources.
    return {
      answer: output.answer,
      sources: retrievedDocs.map(doc => ({ content: doc.content }))
    };
  }
);
