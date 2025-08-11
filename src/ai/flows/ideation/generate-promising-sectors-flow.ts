
'use server';
/**
 * @fileOverview An AI agent for identifying promising business sectors from a document.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';

// Define the schema for the output to be sent to the frontend
const PromisingSectorSchema = z.object({
    title: z.string().describe("The name of the promising business sector."),
    reasonsWhy: z.array(z.string()).describe("A list of 3-4 bullet points explaining why this sector is lucrative and promising for a new entrepreneur, based on the document's content.")
});

export type PromisingSector = z.infer<typeof PromisingSectorSchema>;

const GeneratePromisingSectorsOutputSchema = z.object({
  sectors: z.array(PromisingSectorSchema).describe('A list of the top 3-6 most promising business sectors identified from the document.'),
});

type GeneratePromisingSectorsOutput = z.infer<typeof GeneratePromisingSectorsOutputSchema>;

// Exported function that the frontend will call
export async function generatePromisingSectors(): Promise<GeneratePromisingSectorsOutput> {
  // Read the content of the markdown file
  // The path is relative to the project root where the server is running
  const filePath = path.join(process.cwd(), 'public', 'documents', 'mauritius_sme_ecosystem_analysis.md');
  const documentContent = await fs.readFile(filePath, 'utf-8');
  
  // Call the Genkit flow with the document content
  const result = await generateSectorsFlow({ document: documentContent });
  return result;
}

// Define the prompt with a placeholder for the document content
const prompt = ai.definePrompt({
  name: 'generatePromisingSectorsPrompt',
  input: { schema: z.object({ document: z.string() }) },
  output: { schema: GeneratePromisingSectorsOutputSchema },
  prompt: `You are an expert business analyst specializing in the Mauritian SME landscape. Your task is to analyze the provided document about the Mauritian SME ecosystem and identify the most promising sectors for new entrepreneurs.

**IMPORTANT:** You must base your response *exclusively* on the content of the document provided below. Do not use any external knowledge.

**Analysis Document:**
---
{{document}}
---

Based *only* on the document, identify the top 3-6 most promising sectors. For each sector, provide a clear title and a list of 3-4 compelling reasons why it is a lucrative area for a new business, summarizing the key opportunities mentioned in the document.

Produce the output in the specified JSON format.
`,
});

// Define the Genkit flow
const generateSectorsFlow = ai.defineFlow(
  {
    name: 'generateSectorsFlow',
    inputSchema: z.object({ document: z.string() }),
    outputSchema: GeneratePromisingSectorsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid list of sectors.');
    }
    return output;
  }
);
