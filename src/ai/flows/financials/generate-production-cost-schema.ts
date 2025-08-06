/**
 * @fileOverview Zod schemas and TypeScript types for the production cost generation flow.
 */

import { z } from 'zod';
import { GenerateMvpInputSchema, GenerateMvpOutputSchema } from '../business-management/generate-mvp-schema';

export const GenerateProductionCostInputSchema = z.object({
  businessIdea: GenerateMvpInputSchema,
  mvpPlan: GenerateMvpOutputSchema,
});

export type GenerateProductionCostInput = z.infer<
  typeof GenerateProductionCostInputSchema
>;

export const GenerateProductionCostOutputSchema = z.object({
    estimatedCost: z.string().describe("The total estimated cost for a full production launch, as a range in MUR."),
    justification: z.string().describe("A detailed explanation of how the estimate was derived, covering scaling factors.")
});

export type GenerateProductionCostOutput = z.infer<
  typeof GenerateProductionCostOutputSchema
>;
