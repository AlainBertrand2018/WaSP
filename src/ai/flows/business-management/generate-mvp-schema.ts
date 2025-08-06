/**
 * @fileOverview Zod schemas and TypeScript types for the MVP generation flow.
 */

import { z } from 'zod';
import { ValidateBusinessIdeaOutputSchema } from './validate-idea-schema';

// Zod schema for the input form data
// It now accepts the full output from the validation flow for richer context.
export const GenerateMvpInputSchema = ValidateBusinessIdeaOutputSchema.extend({
  originalIdea: z.object({
    businessIdeaTitle: z.string(),
    ideaDescription: z.string(),
  }),
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
    .array(z.object({
        role: z.string().describe("The job title or role."),
        cost: z.string().describe("The estimated monthly cost for this role in MUR.")
    }))
    .describe('The essential personnel required to build the MVP and their estimated monthly costs.'),
  techStack: z
    .array(z.object({
        item: z.string().describe("The technology or service."),
        cost: z.string().describe("The estimated investment for this item in MUR (can be a one-time cost or monthly subscription).")
    }))
    .describe('A recommended technology stack for the MVP and its estimated investment.'),
  basicEquipment: z.object({
      items: z.array(z.string()).describe("A list of basic equipment needed."),
      estimatedInvestment: z.string().describe("The total estimated investment for all equipment in MUR.")
  }).describe("A summary of basic office or operational equipment required."),
  costEstimation: z
    .string()
    .describe(
      'The total, high-level cost estimation for the MVP development (sum of all investments) in Mauritian Rupees (MUR).'
    ),
});

export type GenerateMvpOutput = z.infer<typeof GenerateMvpOutputSchema>;
