
'use server';
/**
 * @fileOverview An AI agent for generating a list of relevant variable cost fields for a startup budget.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateVariableCostsInput,
  GenerateVariableCostsInputSchema,
  GenerateVariableCostsOutput,
  GenerateVariableCostsOutputSchema,
} from './generate-variable-costs-schema';

export async function generateVariableCosts(
  input: GenerateVariableCostsInput
): Promise<GenerateVariableCostsOutput> {
  const result = await generateVariableCostsFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateVariableCostsPrompt',
  input: { schema: GenerateVariableCostsInputSchema },
  output: { schema: GenerateVariableCostsOutputSchema },
  prompt: `You are a financial planner for Mauritian startups. Based on the following business idea, generate a comprehensive list of likely **variable costs per unit sold**. Categorize each cost item clearly.

**Business Idea:** {{originalIdea.businessIdeaTitle}}
**Sector:** {{sector}}
**Product Type:** {{productType}}
**Description:** {{originalIdea.ideaDescription}}

For each variable cost item, provide:
- **name**: The name of the cost item (e.g., "Raw Materials").
- **description**: A brief, one-sentence explanation of why this cost is relevant on a per-unit basis for this specific business.
- **category**: The general category for this cost (e.g., "Cost of Goods Sold", "Transaction Fees", "Shipping & Delivery", "Marketing & Sales").

Generate a diverse list covering all major operational areas related to producing and selling one unit. If the product is digital, consider costs like bandwidth or API calls per user.
Produce the output in the required JSON format.`,
});

const generateVariableCostsFlow = ai.defineFlow(
  {
    name: 'generateVariableCostsFlow',
    inputSchema: GenerateVariableCostsInputSchema,
    outputSchema: GenerateVariableCostsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid list of variable costs.');
    }
    return output;
  }
);
