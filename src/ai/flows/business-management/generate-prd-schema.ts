/**
 * @fileOverview Zod schemas and TypeScript types for the PRD generation flow.
 */

import { z } from 'zod';
import { GenerateMvpInputSchema, GenerateMvpOutputSchema } from './generate-mvp-schema';

// The input combines the full validation report and the generated MVP plan.
export const GeneratePrdInputSchema = z.object({
  validationReport: GenerateMvpInputSchema,
  mvpPlan: GenerateMvpOutputSchema,
});

export type GeneratePrdInput = z.infer<typeof GeneratePrdInputSchema>;

// Zod schema for the structured PRD output
export const GeneratePrdOutputSchema = z.object({
  introduction: z
    .string()
    .describe(
      "An overview of the product, its vision, and the problem it solves."
    ),
  problemStatement: z
    .string()
    .describe("A clear and concise statement of the user problem."),
  goalsAndObjectives: z
    .array(z.string())
    .describe("A list of measurable business and product goals for the MVP."),
  userStories: z
    .array(
      z.object({
        feature: z.string().describe("The core feature this story relates to."),
        story: z
          .string()
          .describe(
            'The user story in the format "As a [persona], I want to [action], so that I can [benefit]."'
          ),
      })
    )
    .describe("Detailed user stories for each core MVP feature."),
  technicalSpecifications: z
    .string()
    .describe("High-level technical requirements and component overview."),
  successMetrics: z
    .array(z.string())
    .describe(
      "Key Performance Indicators (KPIs) to measure the success of the MVP."
    ),
  futureConsiderations: z
    .string()
    .describe(
      "A summary of potential features or improvements for future versions."
    ),
});

export type GeneratePrdOutput = z.infer<typeof GeneratePrdOutputSchema>;
