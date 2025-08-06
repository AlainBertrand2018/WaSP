
'use server';
/**
 * @fileOverview An AI agent for generating a budget summary and break-even analysis.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateBudgetSummaryInput,
  GenerateBudgetSummaryInputSchema,
  GenerateBudgetSummaryOutput,
  GenerateBudgetSummaryOutputSchema,
} from './generate-budget-summary-schema';

export async function generateBudgetSummary(
  input: GenerateBudgetSummaryInput
): Promise<GenerateBudgetSummaryOutput> {
  const result = await generateBudgetSummaryFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateBudgetSummaryPrompt',
  input: { schema: GenerateBudgetSummaryInputSchema },
  output: { schema: GenerateBudgetSummaryOutputSchema },
  prompt: `You are a financial analyst providing a budget summary for a startup.

Analyze the following financial data:
- **Total Monthly Fixed Costs:** {{totalFixedCosts}} MUR
- **Total Variable Costs Per Unit:** {{totalVariableCosts}} MUR
- **Sale Price Per Unit:** {{salePricePerUnit}} MUR

Your tasks are:
1.  **Calculate Break-Even Point:** Determine the number of units the business needs to sell per month to cover all costs. The formula is: Total Fixed Costs / (Sale Price Per Unit - Variable Costs Per Unit).
    - `breakEvenUnits` should be a whole number (rounded up).
    - `breakEvenRevenue` is `breakEvenUnits` * `salePricePerUnit`.

2.  **Generate a Summary:** Write a brief, encouraging paragraph explaining what the break-even point means. Mention the contribution margin (Sale Price - Variable Cost) and how it contributes to covering fixed costs.

3.  **Create a Forecast:** Generate an array of 10 data points for a profit forecast chart.
    - Start with 0 units sold.
    - The second point should be half the break-even units.
    - The third point should be the break-even point.
    - The next seven points should increment in reasonable steps up to roughly 2.5x - 3x the break-even point.
    - For each point, calculate `revenue` (units * price), `costs` (fixed + units * variable), and `profit` (revenue - costs).

Produce the output in the required JSON format. Ensure all calculations are accurate.`,
});

const generateBudgetSummaryFlow = ai.defineFlow(
  {
    name: 'generateBudgetSummaryFlow',
    inputSchema: GenerateBudgetSummaryInputSchema,
    outputSchema: GenerateBudgetSummaryOutputSchema,
  },
  async (input) => {
    // Basic validation to prevent division by zero or negative contribution margin
    if (input.salePricePerUnit <= input.totalVariableCosts) {
      throw new Error(
        'Sale price per unit must be greater than variable costs per unit.'
      );
    }

    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid budget summary.');
    }
    return output;
  }
);
