
'use server';
/**
 * @fileOverview An AI agent for validating business ideas in the Mauritian context.
 *
 * - validateBusinessIdea - A function that handles the business idea validation process.
 */

import { ai } from '@/ai/genkit';
import {
  ValidateBusinessIdeaInput,
  ValidateBusinessIdeaInputSchema,
  ValidateBusinessIdeaOutputSchema,
} from './validate-idea-schema';

// The exported function that will be called from the frontend
export async function validateBusinessIdea(
  input: ValidateBusinessIdeaInput
) {
  const result = await validateBusinessIdeaFlow(input);
  return result;
}

// The Genkit prompt definition
const prompt = ai.definePrompt({
  name: 'validateBusinessIdeaPrompt',
  input: { schema: ValidateBusinessIdeaInputSchema },
  output: { schema: ValidateBusinessIdeaOutputSchema },
  prompt: `You are an expert business analyst and consultant specializing in the Mauritian SME ecosystem. Your task is to analyze a new business idea based on the provided data and generate a comprehensive validation report. You must use your knowledge of the Mauritian market, economy, and regulations.

Analyze the following business idea:

- **Idea Title:** {{businessIdeaTitle}}
- **Sector:** {{sector}}
- **Sector Target:** {{sectorTarget}}
- **Idea Description:** {{ideaDescription}}
- **Target Customer Profile:** {{customerProfile}}
- **Product Type:** {{productType}}
- **Products/Services:**
{{#each products}}
- {{name}}
{{/each}}
- **Starting Budget:** MUR {{startingBudget}}
- **Monetization Strategy:** {{monetization}}

Based on this information, generate a detailed validation report.
- For the **marketSize**, provide a realistic estimation for Mauritius.
- For the **validationSummary**, be critical and objective. The viability score should reflect a genuine assessment of strengths and weaknesses.
- For the **targetPersona**, create a realistic profile of a potential Mauritian customer.
- For the **mvpPlanner**, suggest actionable and low-cost ideas suitable for an SME.
- For the **businessPlan**, generate concise but comprehensive sections. Financial projections should be high-level estimates based on the budget and monetization plan.

Produce the output in the required JSON format.`,
});

// The Genkit flow definition
const validateBusinessIdeaFlow = ai.defineFlow(
  {
    name: 'validateBusinessIdeaFlow',
    inputSchema: ValidateBusinessIdeaInputSchema,
    outputSchema: ValidateBusinessIdeaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid analysis.');
    }
    return output;
  }
);
