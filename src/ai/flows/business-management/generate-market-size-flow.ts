
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
  marketSize: z
    .string()
    .describe(
      'An estimated market size for the idea in Mauritius, formatted as a string (e.g., "MUR 1M-2.5M").'
    ),
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
  prompt: `You are an expert business analyst specializing in the Mauritian SME ecosystem. Your task is to estimate the potential market size for a business idea based on the provided information.

Analyze the following:

- **Sector:** {{sector}}
- **Sector Target:** {{sectorTarget}}
- **Target Customer Profile:** {{customerProfile}}

Based on this, provide a realistic market size estimation for Mauritius, expressed in Mauritian Rupees (MUR). For example: "MUR 5M-8M" or "Approx. MUR 12M annually".

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
