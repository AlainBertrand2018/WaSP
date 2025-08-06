/**
 * @fileOverview Zod schemas and TypeScript types for the variable costs generation flow.
 */

import { z } from 'zod';
import { GenerateMvpInputSchema } from '../business-management/generate-mvp-schema';

export const GenerateVariableCostsInputSchema = GenerateMvpInputSchema;

export type GenerateVariableCostsInput = z.infer<
  typeof GenerateVariableCostsInputSchema
>;

export const VariableCostItemSchema = z.object({
  name: z.string().describe("The name of the variable cost item."),
  description: z.string().describe("A brief explanation of the cost item per unit."),
  category: z
    .string()
    .describe(
      'The category of the cost (e.g., "Cost of Goods Sold", "Marketing & Sales")'
    ),
});

export const GenerateVariableCostsOutputSchema = z.object({
  variableCosts: z.array(VariableCostItemSchema),
});

export type GenerateVariableCostsOutput = z.infer<
  typeof GenerateVariableCostsOutputSchema
>;
export type VariableCostItem = z.infer<typeof VariableCostItemSchema>;
