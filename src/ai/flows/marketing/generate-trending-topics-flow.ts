
'use server';
/**
 * @fileOverview An AI agent for generating a list of trending topics.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TrendingTopicSchema = z.object({
  title: z.string().describe('A short, catchy title for the trending topic.'),
  shortDescription: z
    .string()
    .describe('A one-sentence description of the topic.'),
});

const GenerateTrendingTopicsOutputSchema = z.object({
  topics: z
    .array(TrendingTopicSchema)
    .describe('A list of 5-7 trending topics.'),
});

export type GenerateTrendingTopicsOutput = z.infer<
  typeof GenerateTrendingTopicsOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'generateTrendingTopicsPrompt',
  output: { schema: GenerateTrendingTopicsOutputSchema },
  prompt: `You are a market trend analyst for a SaaS company called "BusinessStudio AI" which provides tools for entrepreneurs in Mauritius.

Your task is to generate a list of 5-7 current and relevant trending topics for our user base. These topics will be displayed in a marquee on our "Video Script Generator" app page to inspire users on what to create content about.

The topics should be related to:
- Business and entrepreneurship in Mauritius.
- Tech trends relevant to SMEs.
- Marketing and sales strategies.
- Financial tips for small businesses.

Example Topics:
- "The Rise of E-commerce in Mauritius"
- "Using AI to Boost Your Sales"
- "Navigating the 2025 National Budget for SMEs"

Generate a fresh, diverse, and engaging list. Produce the output in the required JSON format.`,
});

const generateTrendingTopicsFlow = ai.defineFlow(
  {
    name: 'generateTrendingTopicsFlow',
    outputSchema: GenerateTrendingTopicsOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    if (!output) {
      throw new Error(
        'The AI model did not return a valid list of trending topics.'
      );
    }
    return output;
  }
);

export async function generateTrendingTopics(): Promise<GenerateTrendingTopicsOutput> {
  const result = await generateTrendingTopicsFlow();
  return result;
}
