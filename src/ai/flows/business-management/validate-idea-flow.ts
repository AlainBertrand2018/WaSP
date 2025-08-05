
'use server';
/**
 * @fileOverview An AI agent for validating business ideas in the Mauritian context.
 *
 * - validateBusinessIdea - A function that handles the business idea validation process.
 * - ValidateBusinessIdeaInput - The input type for the validateBusinessIdea function.
 * - ValidateBusinessIdeaOutput - The return type for the validateBusinessIdea function.
 */

import { ai } from '@/ai/genkit';
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
    name: z.string().describe("A fictional name for the target persona."),
    demographics: z.string().describe("The persona's demographics (age, location, job)."),
    goals: z.array(z.string()).describe("The primary goals and motivations of the persona."),
    painPoints: z.array(z.string()).describe("The key problems and frustrations the persona faces."),
  }),
  mvpPlanner: z.object({
    keyFeatures: z
      .array(z.string())
      .describe(
        'A list of essential features for the Minimum Viable Product (MVP).'
      ),
    marketingStrategies: z
      .array(z.string())
      .describe('Suggested initial marketing strategies to reach the target audience.'),
  }),
  businessPlan: z.object({
      executiveSummary: z.string(),
      companyDescription: z.string(),
      marketAnalysis: z.string(),
      organizationAndManagement: z.string(),
      serviceOrProductLine: z.string(),
      marketingAndSales: z.string(),
      financialProjections: z.string(),
  }).describe('A structured, AI-generated business plan.'),
});

export type ValidateBusinessIdeaOutput = z.infer<
  typeof ValidateBusinessIdeaOutputSchema
>;

// The exported function that will be called from the frontend
export async function validateBusinessIdea(
  input: ValidateBusinessIdeaInput
): Promise<ValidateBusinessIdeaOutput> {
  return await validateBusinessIdeaFlow(input);
}

// The Genkit prompt definition
const prompt = ai.definePrompt({
  name: 'validateBusinessIdeaPrompt',
  input: { schema: ValidateBusinessIdeaInputSchema },
  output: { schema: ValidateBusinessIdeaOutputSchema },
  prompt: `You are an expert business analyst and consultant specializing in the Mauritian SME ecosystem. Your task is to analyze a new business idea based on the provided data and generate a comprehensive validation report. You must use your knowledge of the Mauritian market, economy, and regulations.

Analyze the following business idea:

- **Idea Title:** {{businessIdeaTitle}}
- **Sector:** {{sector}}
- **Sector Target:** {{sectorTarget}}
- **Idea Description:** {{ideaDescription}}
- **Target Customer Profile:** {{customerProfile}}
- **Product Type:** {{productType}}
- **Products/Services:**
{{#each products}}
- {{name}}
{{/each}}
- **Starting Budget:** MUR {{startingBudget}}
- **Monetization Strategy:** {{monetization}}

Based on this information, generate a detailed validation report.
- For the **marketSize**, provide a realistic estimation for Mauritius.
- For the **validationSummary**, be critical and objective. The viability score should reflect a genuine assessment of strengths and weaknesses.
- For the **targetPersona**, create a realistic profile of a potential Mauritian customer.
- For the **mvpPlanner**, suggest actionable and low-cost ideas suitable for an SME.
- For the **businessPlan**, generate concise but comprehensive sections. Financial projections should be high-level estimates based on the budget and monetization plan.

Produce the output in the required JSON format.`,
});

// The Genkit flow definition
const validateBusinessIdeaFlow = ai.defineFlow(
  {
    name: 'validateBusinessIdeaFlow',
    inputSchema: ValidateBusinessIdeaInputSchema,
    outputSchema: ValidateBusinessIdeaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid analysis.');
    }
    return output;
  }
);
