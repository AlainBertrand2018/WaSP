/**
 * @fileOverview Zod schemas and TypeScript types for the financing options generation flow.
 */

import { z } from 'zod';
import { GenerateMvpInputSchema, GenerateMvpOutputSchema } from '../business-management/generate-mvp-schema';

export const GenerateFinancingOptionsInputSchema = z.object({
  businessIdea: GenerateMvpInputSchema,
  mvpPlan: GenerateMvpOutputSchema,
});

export type GenerateFinancingOptionsInput = z.infer<
  typeof GenerateFinancingOptionsInputSchema
>;

export const FinancingOptionSchema = z.object({
    title: z.string().describe("The title of the financing option."),
    fundingRange: z.string().describe("The typical funding range in MUR."),
    description: z.string().describe("A brief description of the option."),
    rationale: z.string().describe("A personalized justification for why this option is suitable for the user's business.")
});

export const GenerateFinancingOptionsOutputSchema = z.object({
  financingOptions: z.array(FinancingOptionSchema),
});

export type GenerateFinancingOptionsOutput = z.infer<
  typeof GenerateFinancingOptionsOutputSchema
>;
export type FinancingOption = z.infer<typeof FinancingOptionSchema>;
