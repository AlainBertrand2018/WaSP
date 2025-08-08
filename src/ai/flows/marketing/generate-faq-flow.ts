
'use server';
/**
 * @fileOverview An AI agent for generating Frequently Asked Questions (FAQs).
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FaqItemSchema = z.object({
  question: z.string().describe('A frequently asked question.'),
  answer: z
    .string()
    .describe(
      'A clear, concise, and helpful answer to the question.'
    ),
});

const GenerateFaqOutputSchema = z.object({
  faqs: z
    .array(FaqItemSchema)
    .describe(
      'A list of at least 8-10 frequently asked questions and their answers.'
    ),
});

export type GenerateFaqOutput = z.infer<typeof GenerateFaqOutputSchema>;


const prompt = ai.definePrompt({
  name: 'generateFaqPrompt',
  output: { schema: GenerateFaqOutputSchema },
  prompt: `You are a customer support and marketing specialist for a SaaS product called "StudioFlow AI". Your task is to generate a list of Frequently Asked Questions (FAQs) that a new or potential user might have.

Your knowledge base about StudioFlow AI is:
- It's a comprehensive, AI-powered suite of tools for entrepreneurs in Mauritius.
- Its core feature is a 4-step "Business Creation" suite: Idea Validation, MVP Planner, Startup Budget Planner, and Business Plan Generator.
- It helps users go from a simple idea to an investor-ready business plan.
- It also has other modules for Business Management, Products, Financials, and Marketing.
- The AI is localized for the Mauritian market.
- There is an AI chatbot assistant named CLAIRE.
- The pricing includes a free tier, and paid tiers for more features.

Based on this, generate a list of at least 8-10 relevant FAQs. The questions should cover topics like:
- What the product is and its main purpose.
- Who the target audience is.
- How the core features work (e.g., Idea Validation).
- What makes the product unique (e.g., Mauritian focus).
- Questions about pricing and getting started.
- The benefits of using the platform.

The answers should be clear, helpful, and written in a professional yet approachable tone.

Produce the output in the required JSON format.`,
});

const generateFaqFlow = ai.defineFlow(
  {
    name: 'generateFaqFlow',
    outputSchema: GenerateFaqOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    if (!output) {
      throw new Error('The AI model did not return a valid FAQ list.');
    }
    return output;
  }
);

export async function generateFaq(): Promise<GenerateFaqOutput> {
  const result = await generateFaqFlow();
  return result;
}
