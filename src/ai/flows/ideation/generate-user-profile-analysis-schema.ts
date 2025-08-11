
/**
 * @fileOverview Zod schemas and TypeScript types for the user profile analysis flow.
 * This file is separate to allow the main flow file to use 'use server' without
 * exporting non-async functions.
 */

import {z} from 'zod';

// Define the schema for the user profile input
export const GenerateSuggestionsForUserInputSchema = z.object({
  businessConcept: z
    .string()
    .describe('A high-level description of the business the user wants to create.'),
  problemToSolve: z
    .string()
    .describe('The specific problem the user aims to solve for their customers.'),
  proposedSolution: z
    .string()
    .describe('The solution the user proposes to address the problem.'),
  expertise: z
    .string()
    .describe("The user's professional background and areas of expertise."),
  passion: z.string().describe("The user's personal interests and passions."),
  budget: z
    .string()
    .describe(
      "The user's estimated starting budget (e.g., '< MUR 100k', 'MUR 100k - 500k')."
    ),
  businessStyle: z
    .string()
    .describe("The user's preferred business style (e.g., 'Solo Founder', 'Team-based')."),
  targetAudience: z
    .string()
    .describe("The user's preferred target audience (e.g., 'B2C', 'B2B')."),
});
export type GenerateSuggestionsForUserInput = z.infer<
  typeof GenerateSuggestionsForUserInputSchema
>;

// Define the schema for a single suggested sector
export const SectorSuggestionSchema = z.object({
  title: z.string().describe('The name of the promising business sector.'),
  reasonsWhy: z
    .array(z.string())
    .describe(
      "A list of 3-4 bullet points explaining why this sector is a good fit for the user, based on their profile and the provided document."
    ),
  marketSize: z
    .string()
    .describe(
      "The potential market size in terms of the number of potential customers (e.g., '5,000-10,000 customers')."
    ),
  marketValue: z
    .string()
    .describe(
      "The potential annual market value in Mauritian Rupees (e.g., 'MUR 10M - 15M')."
    ),
  averageSalePrice: z
    .string()
    .describe(
      "A suggested average sale price per unit or service (e.g., 'MUR 500 - 1,500 per transaction')."
    ),
});
export type SectorSuggestion = z.infer<typeof SectorSuggestionSchema>;

// Define the schema for the final output
export const GenerateSuggestionsForUserOutputSchema = z.object({
  suggestions: z
    .array(SectorSuggestionSchema)
    .describe(
      'A list of the top 3 most promising business sectors personalized for the user.'
    ),
  relevanceScore: z
    .number()
    .describe(
      "A score from 1 to 10 assessing the relevance of the user's profile and idea to the market."
    ),
  roadmapSummary: z
    .string()
    .describe(
      'A concise, actionable summary of a potential roadmap for the user.'
    ),
});
export type GenerateSuggestionsForUserOutput = z.infer<
  typeof GenerateSuggestionsForUserOutputSchema
>;
