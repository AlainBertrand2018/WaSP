/**
 * @fileOverview Zod schemas and TypeScript types for the business idea validation flow.
 * This file is separate to allow the main flow file to use 'use server' without
 * exporting non-async functions.
 */

import { z } from 'zod';

// Zod schema for the input form data
export const ValidateBusinessIdeaInputSchema = z.object({
  businessIdeaTitle: z.string().describe('The title of the business idea.'),
  sector: z.string().describe('The industry sector for the business.'),
  sectorTarget: z
    .string()
    .describe('The target market segment (B2B, B2C, etc.).'),
  ideaDescription: z
    .string()
    .describe('A brief description of the business idea.'),
  customerProfile: z
    .string()
    .describe('A description of the target customer profile.'),
  marketSize: z
    .string()
    .describe(
      'An AI-generated estimated number of potential customers (e.g., "5,000-8,000").'
    ),
  productType: z.string().describe('The type of product being sold.'),
  products: z
    .array(z.object({ name: z.string() }))
    .describe('A list of products or services offered.'),
  startingBudget: z
    .string()
    .describe('The initial starting budget in Mauritian Rupees (MUR).'),
  monetization: z
    .string()
    .describe('The monetization strategy and pricing model.'),
});

export type ValidateBusinessIdeaInput = z.infer<
  typeof ValidateBusinessIdeaInputSchema
>;

// Zod schema for the structured output report
export const ValidateBusinessIdeaOutputSchema = z.object({
  marketSize: z
    .string()
    .describe(
      'An estimated market size for the idea in Mauritius, formatted as a potential customer count (e.g., "5,000-8,000 customers").'
    ),
  validationSummary: z.object({
    viabilityScore: z
      .number()
      .describe(
        'A score from 1 to 10 indicating the business idea viability.'
      ),
    keyStrengths: z
      .array(z.string())
      .describe('A list of key strengths of the business idea.'),
    potentialWeaknesses: z
      .array(z.string())
      .describe('A list of potential weaknesses or risks.'),
    overallAssessment: z
      .string()
      .describe('A brief, overall assessment of the idea.'),
  }),
  targetPersonas: z
    .array(
      z.object({
        title: z.string().describe("The persona's title, including a fictional name and their role (e.g., 'Anika, a Freelance Web Developer')."),
        description: z.string().describe("A detailed paragraph describing the persona's background, needs, and pain points."),
      })
    )
    .describe(
      'An array of at least 3 distinct customer persona profiles.'
    ),
  validationReport: z
    .object({
      marketPotential: z.string().describe("An analysis of the market potential."),
      monetization: z.string().describe("An analysis of the monetization strategy and pricing model."),
      competitiveLandscape: z.string().describe("An analysis of the competitive landscape."),
      feasibility: z.string().describe("An analysis of the idea's feasibility."),
      overallRecommendation: z.string().describe("An overall recommendation from the AI."),
    })
    .describe('A structured, AI-generated validation report.'),
  refinementSuggestions: z.string().describe("A summary of how the AI would refine the business idea."),
});

export type ValidateBusinessIdeaOutput = z.infer<
  typeof ValidateBusinessIdeaOutputSchema
>;
