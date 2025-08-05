
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
  ValidateBusinessIdeaOutput,
  ValidateBusinessIdeaOutputSchema,
} from './validate-idea-schema';

// The exported function that will be called from the frontend
export async function validateBusinessIdea(
  input: ValidateBusinessIdeaInput
): Promise<ValidateBusinessIdeaOutput> {
  const result = await validateBusinessIdeaFlow(input);
  return result;
}

// The Genkit prompt definition
const prompt = ai.definePrompt({
  name: 'validateBusinessIdeaPrompt',
  input: { schema: ValidateBusinessIdeaInputSchema },
  output: { schema: ValidateBusinessIdeaOutputSchema },
  prompt: `You are an expert business analyst and consultant specializing in the Mauritian SME ecosystem. Your task is to analyze a new business idea based on the provided data and generate a comprehensive and insightful validation report. You must use your deep knowledge of the Mauritian market, economy, and regulations.

Analyze the following business idea:

- **Idea Title:** {{businessIdeaTitle}}
- **Sector:** {{sector}}
- **Sector Target:** {{sectorTarget}}
- **Idea Description:** {{ideaDescription}}
- **Target Customer Profile:** {{customerProfile}}
- **Estimated number of potential customers:** {{marketSize}}
- **Product Type:** {{productType}}
- **Products/Services:**
{{#each products}}
- {{name}}
{{/each}}
- **Starting Budget:** MUR {{startingBudget}}
- **Monetization Strategy:** {{monetization}}

Based on this information, generate a detailed validation report. Your analysis must be rich, explanatory, and avoid generic statements.

- For the **marketSize** in the output, use the user-provided estimate: {{marketSize}}. You should format it nicely, for example as "5,000-8,000 customers".
- For the **validationSummary**, be critical and objective. The viability score should reflect a genuine assessment of strengths and weaknesses based on all provided data. The overall assessment should be a concise executive summary.
- For the **validationReport**, generate rich, explanatory, and comprehensive sections for each of the categories. Each section should be at least two detailed paragraphs.
  - For **marketPotential**, go beyond the numbers. Analyze the "why" behind the market size. Discuss trends, demographic shifts, and economic factors in Mauritius that support this potential.
  - For **monetization**, provide a deep analysis of the proposed pricing model in relation to the target customer profile, the products/services offered, and the local economic context. Assess its viability, potential for revenue generation, and suggest potential pricing tiers or alternative models.
  - For **competitiveLandscape**, identify potential direct and indirect competitors in Mauritius. Analyze their strengths and weaknesses and explain how this new idea can differentiate itself.
  - For **feasibility**, critically evaluate the idea's practicality. Consider the starting budget, the required resources (technical, human), and potential operational challenges within Mauritius.
  - For **targetPersonas**, create at least 3 realistic and detailed profiles of potential Mauritian customer types. Each persona must have a 'title' (e.g., "Ramesh, Owner of a Small Retail Business") and a 'description' (a rich paragraph detailing their background, motivations, needs, and specific pain points relevant to the business idea). Use realistic, fictional Mauritian names.
  - For **overallRecommendation**, provide a clear "go" or "no-go" recommendation with a detailed justification. Synthesize the findings from the previous sections to support your final conclusion.
- For the **refinementSuggestions**, provide a summary of concrete, actionable steps on how you would refine or improve the business idea to increase its chances of success in the Mauritian market.

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
