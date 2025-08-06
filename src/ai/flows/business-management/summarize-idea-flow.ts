
'use server';
/**
 * @fileOverview An AI agent for summarizing a business idea based on user input.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  ValidateBusinessIdeaInput,
  ValidateBusinessIdeaInputSchema,
} from './validate-idea-schema';

// We only need the summary text as output.
const SummarizeIdeaOutputSchema = z.string();

type SummarizeIdeaOutput = z.infer<typeof SummarizeIdeaOutputSchema>;

// The exported function that will be called from the frontend
export async function summarizeIdea(
  input: ValidateBusinessIdeaInput
): Promise<SummarizeIdeaOutput> {
  const result = await summarizeIdeaFlow(input);
  return result;
}

// The Genkit prompt definition
const prompt = ai.definePrompt({
  name: 'summarizeIdeaPrompt',
  input: { schema: ValidateBusinessIdeaInputSchema },
  output: { schema: SummarizeIdeaOutputSchema },
  prompt: `You are an expert business analyst. Your task is to review the following business idea details, provided in JSON format, and create a single, concise, well-written narrative paragraph that synthesizes all the key information. Do not use markdown or lists in your output.

For example: "[Business Name] is a [B2B/B2C] business in the [Sector] industry, targeting [Customer Profile]. They plan to offer [Products/Services] with a monetization strategy based on [Monetization Strategy]. With a starting budget of MUR [Budget] and an estimated market of [Market Size], they aim to solve [Problem from Description]."

Here is the business idea information:
- Idea Title: {{businessIdeaTitle}}
- Sector: {{#if otherSector}}{{otherSector}}{{else}}{{sector}}{{/if}}
- Sector Target: {{sectorTarget}}
- Idea Description: {{ideaDescription}}
- Target Customer Profile: {{customerProfile}}
- Estimated number of potential customers: {{marketSize}}
- Product Type: {{productType}}
- Products/Services Offered: {{#each products}}{{this.name}}, {{/each}}
- Starting Budget: MUR {{startingBudget}}
- Monetization Strategy: {{monetization}}
`,
});

// The Genkit flow definition
const summarizeIdeaFlow = ai.defineFlow(
  {
    name: 'summarizeIdeaFlow',
    inputSchema: ValidateBusinessIdeaInputSchema,
    outputSchema: SummarizeIdeaOutputSchema,
  },
  async (input) => {
    try {
      // The input is already in the correct JSON format, so we can pass it directly.
      const { output } = await prompt(input);

      if (!output) {
        // This case might happen if the model returns an empty response.
        return 'Sorry, I was unable to generate a summary for your idea. You can still proceed to validation.';
      }
      return output;
    } catch (error) {
      console.error('Error in summarizeIdeaFlow:', error);
      // This will catch schema validation errors or other issues from the AI call.
      return 'Sorry, an error occurred while generating the summary. You can still proceed to validation.';
    }
  }
);
