
'use server';
/**
 * @fileOverview An AI agent for generating a list of relevant fixed cost fields for a startup budget.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateFixedCostsInput,
  GenerateFixedCostsInputSchema,
  GenerateFixedCostsOutput,
  GenerateFixedCostsOutputSchema,
} from './generate-fixed-costs-schema';

export async function generateFixedCosts(
  input: GenerateFixedCostsInput
): Promise<GenerateFixedCostsOutput> {
  const result = await generateFixedCostsFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateFixedCostsPrompt',
  input: { schema: GenerateFixedCostsInputSchema },
  output: { schema: GenerateFixedCostsOutputSchema },
  prompt: `You are a financial planner for Mauritian startups. Based on the following business idea, generate a comprehensive list of likely monthly fixed costs. Categorize each cost item clearly.

**Business Idea:** {{originalIdea.businessIdeaTitle}}
**Sector:** {{sector}}
**Description:** {{originalIdea.ideaDescription}}

For each fixed cost item, provide:
- **name**: The name of the cost item (e.g., "Office Rent").
- **description**: A brief, one-sentence explanation of why this cost is relevant for this specific business.
- **category**: The general category for this cost (e.g., "Office & Utilities", "Salaries & HR", "Software & Subscriptions", "Marketing & Sales", "Legal & Administrative").

Generate a diverse list covering all major operational areas.
In the "Salaries & HR" category, you must include the following specific items:
- "Founder's Salary"
- "Employee Salaries"
- "Pension Contributions (NSF)"
- "Social Security Contributions (CSG)"
- "NSF levy"

Produce the output in the required JSON format.`,
});

const generateFixedCostsFlow = ai.defineFlow(
  {
    name: 'generateFixedCostsFlow',
    inputSchema: GenerateFixedCostsInputSchema,
    outputSchema: GenerateFixedCostsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid list of fixed costs.');
    }
    return output;
  }
);
