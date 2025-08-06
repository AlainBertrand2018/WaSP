
'use server';
/**
 * @fileOverview An AI agent for generating tailored financing strategies for a business.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateFinancingOptionsInput,
  GenerateFinancingOptionsInputSchema,
  GenerateFinancingOptionsOutput,
  GenerateFinancingOptionsOutputSchema,
} from './generate-financing-options-schema';

export async function generateFinancingOptions(
  input: GenerateFinancingOptionsInput
): Promise<GenerateFinancingOptionsOutput> {
  const result = await generateFinancingOptionsFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateFinancingOptionsPrompt',
  input: { schema: GenerateFinancingOptionsInputSchema },
  output: { schema: GenerateFinancingOptionsOutputSchema },
  prompt: `You are an expert financial advisor for Mauritian SMEs and startups. Your task is to generate a list of suitable financing strategies based on the provided business idea and MVP plan.

**Business Idea & MVP Data:**
- **Idea Title:** {{businessIdea.originalIdea.businessIdeaTitle}}
- **Sector:** {{businessIdea.sector}}
- **MVP Cost Estimation:** {{mvpPlan.costEstimation}}
- **Starting Budget:** {{businessIdea.startingBudget}}

Based on this information, generate a list of at least 4 diverse and relevant financing options. For each option:
- **title**: The name of the financing strategy (e.g., "Bootstrapping", "SME Mauritius Loan", "Angel Investment").
- **fundingRange**: A typical funding range for this option in MUR (e.g., "MUR 50,000 - MUR 250,000").
- **description**: A brief, clear description of what this financing option entails.
- **rationale**: A personalized explanation of *why* this option is a good fit for this specific business idea, considering its sector, budget, and MVP cost. Be specific and reference official Mauritian schemes or entities where applicable (e.g., DBM, SME Mauritius Ltd, etc.).

Produce the output in the required JSON format. Ensure the content is practical and actionable for a startup in Mauritius.`,
});

const generateFinancingOptionsFlow = ai.defineFlow(
  {
    name: 'generateFinancingOptionsFlow',
    inputSchema: GenerateFinancingOptionsInputSchema,
    outputSchema: GenerateFinancingOptionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return valid financing options.');
    }
    return output;
  }
);
