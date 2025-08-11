
'use server';
/**
 * @fileOverview An AI agent for brainstorming business ideas based on a provided document.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';

// Define the schema for the input from the frontend
const BrainstormInputSchema = z.object({
  query: z.string().describe('The user\'s topic or question for brainstorming.'),
});

// Define the schema for the output to be sent to the frontend
const BrainstormOutputSchema = z.object({
  ideas: z.string().describe('The AI-generated brainstorming ideas, formatted as markdown.'),
});

export type BrainstormInput = z.infer<typeof BrainstormInputSchema>;
export type BrainstormOutput = z.infer<typeof BrainstormOutputSchema>;

// Exported function that the frontend will call
export async function generateBrainstormIdeas(input: BrainstormInput): Promise<BrainstormOutput> {
  // Read the content of the markdown file
  // The path is relative to the project root where the server is running
  const filePath = path.join(process.cwd(), 'public', 'documents', 'mauritius_sme_ecosystem_analysis.md');
  const documentContent = await fs.readFile(filePath, 'utf-8');
  
  // Call the Genkit flow with the user's query and the document content
  const result = await brainstormFlow({ query: input.query, document: documentContent });
  return result;
}

// Define the prompt with placeholders for the document and the user query
const prompt = ai.definePrompt({
  name: 'brainstormPrompt',
  input: { schema: z.object({ query: z.string(), document: z.string() }) },
  output: { schema: BrainstormOutputSchema },
  prompt: `You are an expert business consultant specializing in the Mauritian SME landscape. Your task is to help a user brainstorm business ideas based on the provided analysis of the Mauritian SME ecosystem.

**IMPORTANT:** You must base your response *exclusively* on the content of the document provided below. Do not use any external knowledge.

**Analysis Document:**
---
{{document}}
---

**User's Brainstorming Request:** "{{query}}"

Based on the user's request and the provided document, generate a list of 3-5 concrete and actionable business ideas. For each idea, briefly explain the opportunity and why it's relevant to the Mauritian context described in the document. Format your response in clear, easy-to-read markdown.
`,
});

// Define the Genkit flow
const brainstormFlow = ai.defineFlow(
  {
    name: 'brainstormFlow',
    inputSchema: z.object({ query: z.string(), document: z.string() }),
    outputSchema: BrainstormOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return valid ideas.');
    }
    return output;
  }
);
