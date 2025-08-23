
'use server';
/**
 * @fileOverview An AI agent that answers questions about the Mauritian constitution.
 * It bases its answers exclusively on a provided legal document.
 * This version uses a Retrieval-Augmented Generation (RAG) pattern for improved accuracy.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';

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

// Define an in-memory retriever for the constitution document
const constitutionRetriever = ai.defineRetriever(
  {
    name: 'constitution-retriever',
  },
  async (question: string) => {
    // 1. Read the document
    const filePath = path.join(process.cwd(), 'public', 'documents', 'constitution-of-Mauritius_rev2022.md');
    const documentContent = await fs.readFile(filePath, 'utf-8');
    
    // 2. Split the document into chunks (by paragraph)
    const chunks = documentContent.split(/\n\s*\n/).filter(p => p.trim().length > 10);
    const documents = chunks.map(chunk => ({ content: chunk }));

    // 3. Index the chunks in-memory
    const indexedDocs = await ai.index({
      indexer: 'text-embedding-gecko',
      documents,
    });

    // 4. Retrieve the most relevant chunks based on the user's question
    const relevantDocs = await ai.retrieve({
      retriever: indexedDocs,
      query: question,
      options: { k: 5 }, // Retrieve top 5 most relevant chunks
    });

    // 5. Return the retrieved documents
    return { documents: relevantDocs };
  }
);

export async function askLegitimusPrime(
  input: AskLegitimusPrimeInput
): Promise<AskLegitimusPrimeOutput> {
  const result = await legitimusPrimeFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'legitimusPrimePrompt',
  input: {
    schema: z.object({
      question: z.string(),
      history: z.array(z.object({ role: z.enum(['user', 'model']), content: z.string() })),
      context: z.array(z.any()), // Context from retriever
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
  {{this.content}}
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

const legitimusPrimeFlow = ai.defineFlow(
  {
    name: 'legitimusPrimeFlow',
    inputSchema: AskLegitimusPrimeInputSchema,
    outputSchema: AskLegitimusPrimeOutputSchema,
  },
  async (input) => {
    // Use the retriever to find relevant context
    const { documents: context } = await constitutionRetriever(input.question);
    
    // Call the prompt with the question, history, and the retrieved context
    const { output } = await prompt({
        ...input,
        context
    });

    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    return output;
  }
);
