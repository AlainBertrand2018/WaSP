/**
 * @fileOverview Zod schemas and TypeScript types for the MVP generation flow.
 */

import { z } from 'zod';

// Zod schema for the input form data
export const GenerateMvpInputSchema = z.object({
  validatedBusinessIdea: z
    .string()
    .describe(
      'The summary and refinement suggestions from the business idea validation report.'
    ),
});

export type GenerateMvpInput = z.infer<typeof GenerateMvpInputSchema>;

// Zod schema for the structured output report
export const GenerateMvpOutputSchema = z.object({
  mvpDescription: z
    .string()
    .describe('A concise description of the Minimum Viable Product.'),
  coreFeatures: z
    .array(z.string())
    .describe(
      'A list of the absolute essential features for the first version.'
    ),
  timeframe: z.string().describe('An estimated timeframe for MVP development.'),
  requiredStaff: z
    .string()
    .describe('The essential personnel required to build the MVP.'),
  techStack: z
    .string()
    .describe('A recommended technology stack for the MVP.'),
  costEstimation: z
    .string()
    .describe(
      'A high-level cost estimation for the MVP in Mauritian Rupees (MUR).'
    ),
});

export type GenerateMvpOutput = z.infer<typeof GenerateMvpOutputSchema>;
