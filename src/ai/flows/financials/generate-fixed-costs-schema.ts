/**
 * @fileOverview Zod schemas and TypeScript types for the fixed costs generation flow.
 */

import { z } from 'zod';
import { GenerateMvpInputSchema } from '../business-management/generate-mvp-schema';

export const GenerateFixedCostsInputSchema = GenerateMvpInputSchema;

export type GenerateFixedCostsInput = z.infer<
  typeof GenerateFixedCostsInputSchema
>;

export const FixedCostItemSchema = z.object({
  name: z.string().describe("The name of the fixed cost item."),
  description: z.string().describe("A brief explanation of the cost item."),
  category: z
    .string()
    .describe(
      'The category of the cost (e.g., "Office & Utilities", "Salaries & HR", "Software & Subscriptions")'
    ),
});

export const GenerateFixedCostsOutputSchema = z.object({
  fixedCosts: z.array(FixedCostItemSchema),
});

export type GenerateFixedCostsOutput = z.infer<
  typeof GenerateFixedCostsOutputSchema
>;
export type FixedCostItem = z.infer<typeof FixedCostItemSchema>;
