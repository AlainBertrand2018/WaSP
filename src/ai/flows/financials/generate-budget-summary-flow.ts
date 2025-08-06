
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
  prompt: `You are an expert financial analyst for Mauritian startups. Your task is to provide a comprehensive, realistic, and actionable budget analysis.

Analyze the following financial data for a startup in Mauritius:
- **Sector:** {{sector}}
- **Total Monthly Fixed Costs:** {{totalFixedCosts}} MUR
- **Total Variable Costs Per Unit:** {{totalVariableCosts}} MUR
- **Sale Price Per Unit:** {{salePricePerUnit}} MUR

Your tasks are:
1.  **Calculate Break-Even Point:** Determine the number of units the business needs to sell per month to cover all costs. The formula is: Total Fixed Costs / (Sale Price Per Unit - Variable Costs Per Unit).
    - \`breakEvenUnits\` should be a whole number (rounded up).
    - \`breakEvenRevenue\` is \`breakEvenUnits\` * \`salePricePerUnit\`.

2.  **Estimate Market Growth:** Based on your knowledge of the Mauritian economy and official data sources (like Statistics Mauritius, Bank of Mauritius), provide a realistic annual growth estimate for the specified **{{sector}}**. This should be a single percentage string for the \`marketGrowthEstimate\` field.

3.  **Generate a Comprehensive Summary (\`summary\`):** Write a thorough, multi-paragraph analysis.
    - Start by explaining what the break-even point means in simple terms.
    - Discuss the contribution margin (Sale Price - Variable Cost) and its importance.
    - Based on the numbers, provide actionable advice. What are the key levers this business can pull? (e.g., "Your contribution margin is healthy, focus on sales volume," or "Your variable costs seem high, consider renegotiating with suppliers.").
    - Suggest alternative strategies or scenarios to improve profitability (e.g., "Consider bundling products to increase the average sale price," or "Could a subscription model apply here to create recurring revenue?"). Your advice must be practical and not hallucinated.

4.  **Provide a Conservative Growth Outlook (\`conservativeGrowthOutlook\`):**
    - Considering the general Mauritian economic context (e.g., current inflation trends, market stability), provide a realistic, conservative narrative about the business's potential growth in its first year. This is not about numbers, but a qualitative forecast (e.g., "Initial growth may be slow as you build brand awareness... expect to reach break-even within 6-9 months if marketing efforts are consistent...").

5.  **Create a Forecast Chart (\`forecast\`):**
    - Generate an array of 10 data points for a profit forecast chart.
    - Start with 0 units sold.
    - The second point should be half the break-even units.
    - The third point should be the break-even point.
    - The next seven points should increment in reasonable steps up to roughly 2.5x - 3x the break-even point.
    - For each point, calculate \`revenue\` (units * price), \`costs\` (fixed + units * variable), and \`profit\` (revenue - costs).

Produce the output in the required JSON format. Ensure all calculations are accurate and the advice is grounded and realistic.`,
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
