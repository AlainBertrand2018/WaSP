
'use server';
/**
 * @fileOverview An AI agent for generating a market size estimation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Input schema for the market size generation
const GenerateMarketSizeInputSchema = z.object({
  sector: z.string().describe('The industry sector for the business.'),
  sectorTarget: z
    .string()
    .describe('The target market segment (B2B, B2C, etc.).'),
  customerProfile: z
    .string()
    .describe('A description of the target customer profile.'),
});

// Output schema for the market size generation
const GenerateMarketSizeOutputSchema = z.object({
  potentialCustomers: z
    .string()
    .describe(
      'An estimated number of potential customers for the idea in Mauritius (e.g., "5,000-8,500").'
    ),
  sources: z
    .array(z.string())
    .describe('A list of sources used for the estimation.'),
  explanation: z
    .string()
    .describe('An explanation of how the estimation was derived.'),
});

type GenerateMarketSizeInput = z.infer<typeof GenerateMarketSizeInputSchema>;
type GenerateMarketSizeOutput = z.infer<typeof GenerateMarketSizeOutputSchema>;

// The exported function that will be called from the frontend
export async function generateMarketSize(
  input: GenerateMarketSizeInput
): Promise<GenerateMarketSizeOutput> {
  const result = await generateMarketSizeFlow(input);
  return result;
}

// The Genkit prompt definition
const prompt = ai.definePrompt({
  name: 'generateMarketSizePrompt',
  input: { schema: GenerateMarketSizeInputSchema },
  output: { schema: GenerateMarketSizeOutputSchema },
  prompt: `You are an expert business analyst specializing in the Mauritian SME ecosystem. Your task is to estimate the potential target market size for a business idea based on the provided information, focusing on the number of potential customers.

Analyze the following:

- **Sector:** {{sector}}
- **Sector Target:** {{sectorTarget}}
- **Target Customer Profile:** {{customerProfile}}

Based on this, provide a realistic estimation of the potential number of customers in Mauritius.
- For **potentialCustomers**, provide a numeric range (e.g., "10,000-15,000 customers").
- For **sources**, list the primary data sources you are basing your analysis on. Be specific (e.g., "Statistics Mauritius 2022 Census," "Bank of Mauritius Annual Report 2023").
- For **explanation**, briefly explain your reasoning for the estimated number, connecting the sources and the customer profile.

Produce the output in the required JSON format.`,
});

// The Genkit flow definition
const generateMarketSizeFlow = ai.defineFlow(
  {
    name: 'generateMarketSizeFlow',
    inputSchema: GenerateMarketSizeInputSchema,
    outputSchema: GenerateMarketSizeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid market size.');
    }
    return output;
  }
);
