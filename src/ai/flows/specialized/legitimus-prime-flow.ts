
'use server';
/**
 * @fileOverview An AI agent that answers questions about the Mauritian constitution.
 * It bases its answers exclusively on a provided legal document.
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

export async function askLegitimusPrime(
  input: AskLegitimusPrimeInput
): Promise<AskLegitimusPrimeOutput> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'documents',
    'constitution-of-Mauritius_rev2022.md'
  );
  const documentContent = await fs.readFile(filePath, 'utf-8');

  const result = await legitimusPrimeFlow({
    question: input.question,
    history: input.history,
    document: documentContent,
  });
  return result;
}

const prompt = ai.definePrompt({
  name: 'legitimusPrimePrompt',
  input: {
    schema: z.object({
      question: z.string(),
      history: z.array(z.object({ role: z.enum(['user', 'model']), content: z.string() })),
      document: z.string(),
    }),
  },
  output: { schema: AskLegitimusPrimeOutputSchema },
  prompt: `You are Legitimus Prime, a specialized legal AI assistant. Your sole purpose is to answer questions based *exclusively* on the content of the Constitution of Mauritius provided below.

**CRITICAL INSTRUCTIONS:**
1.  **DO NOT** use any external knowledge, personal opinions, or information not present in the provided document.
2.  If the answer to a question cannot be found within the document, you MUST state: "I cannot answer that question as the information is not contained within the provided text of the Constitution of Mauritius."
3.  Your answers must be direct, factual, and cite the relevant section of the constitution if possible.
4.  Maintain a formal, professional, and objective tone at all times. You are an informational tool, not a legal advisor.
5.  Never provide legal advice or interpret the law in a way that suggests a course of action. Stick to what the text says.

**Document: The Constitution of Mauritius**
---
{{document}}
---

**Conversation History:**
{{#each history}}
  **{{role}}**: {{content}}
{{/each}}

**User's new question:**
{{question}}

Based *only* on the document provided, generate a helpful answer.`,
});

const legitimusPrimeFlow = ai.defineFlow(
  {
    name: 'legitimusPrimeFlow',
    inputSchema: z.object({
        question: z.string(),
        history: z.array(z.object({ role: z.enum(['user', 'model']), content: z.string() })),
        document: z.string(),
    }),
    outputSchema: AskLegitimusPrimeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    return output;
  }
);
