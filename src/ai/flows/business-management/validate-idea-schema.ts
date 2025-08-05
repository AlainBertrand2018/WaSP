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
      'An AI-generated estimated market size for the idea in Mauritius, formatted as a string (e.g., "MUR 1M-2.5M").'
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
      'An estimated market size for the idea in Mauritius, formatted as a string (e.g., "MUR 1M-2.5M").'
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
  targetPersona: z.object({
    name: z.string().describe('A fictional name for the target persona.'),
    demographics: z
      .string()
      .describe("The persona's demographics (age, location, job)."),
    goals: z
      .array(z.string())
      .describe('The primary goals and motivations of the persona.'),
    painPoints: z
      .array(z.string())
      .describe('The key problems and frustrations the persona faces.'),
  }),
  mvpPlanner: z.object({
    keyFeatures: z
      .array(z.string())
      .describe(
        'A list of essential features for the Minimum Viable Product (MVP).'
      ),
    marketingStrategies: z
      .array(z.string())
      .describe(
        'Suggested initial marketing strategies to reach the target audience.'
      ),
  }),
  businessPlan: z
    .object({
      executiveSummary: z.string(),
      companyDescription: z.string(),
      marketAnalysis: z.string(),
      organizationAndManagement: z.string(),
      serviceOrProductLine: z.string(),
      marketingAndSales: z.string(),
      financialProjections: z.string(),
    })
    .describe('A structured, AI-generated business plan.'),
});

export type ValidateBusinessIdeaOutput = z.infer<
  typeof ValidateBusinessIdeaOutputSchema
>;
