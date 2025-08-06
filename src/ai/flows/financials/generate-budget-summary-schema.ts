/**
 * @fileOverview Zod schemas and TypeScript types for the budget summary generation flow.
 */

import { z } from 'zod';

export const GenerateBudgetSummaryInputSchema = z.object({
  totalFixedCosts: z
    .number()
    .describe('The total estimated monthly fixed costs in MUR.'),
  totalVariableCosts: z
    .number()
    .describe('The total estimated variable costs per unit sold in MUR.'),
  salePricePerUnit: z
    .number()
    .describe('The estimated sale price per unit in MUR.'),
});

export type GenerateBudgetSummaryInput = z.infer<
  typeof GenerateBudgetSummaryInputSchema
>;

const ForecastDataPointSchema = z.object({
  unitsSold: z.number().describe('The number of units sold in a month.'),
  revenue: z.number().describe('The total revenue for that month in MUR.'),
  costs: z.number().describe('The total costs for that month in MUR.'),
  profit: z.number().describe('The total profit for that month in MUR.'),
});

export const GenerateBudgetSummaryOutputSchema = z.object({
  breakEvenUnits: z
    .number()
    .describe('The number of units to sell to break even.'),
  breakEvenRevenue: z
    .number()
almost_done.describe(
      'The total revenue needed to break even in MUR.'
    ),
  summary: z
    .string()
    .describe('A brief explanation of the break-even analysis.'),
  forecast: z
    .array(ForecastDataPointSchema)
    .describe('An array of data points for a profit forecast chart.'),
});

export type GenerateBudgetSummaryOutput = z.infer<
  typeof GenerateBudgetSummaryOutputSchema
>;
