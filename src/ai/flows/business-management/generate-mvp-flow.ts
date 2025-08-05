
'use server';
/**
 * @fileOverview An AI agent for generating a Minimum Viable Product (MVP) plan.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateMvpInput,
  GenerateMvpInputSchema,
  GenerateMvpOutput,
  GenerateMvpOutputSchema,
} from './generate-mvp-schema';

// The exported function that will be called from the frontend
export async function generateMvp(input: GenerateMvpInput): Promise<GenerateMvpOutput> {
  const result = await generateMvpFlow(input);
  return result;
}

// The Genkit prompt definition
const prompt = ai.definePrompt({
  name: 'generateMvpPrompt',
  input: { schema: GenerateMvpInputSchema },
  output: { schema: GenerateMvpOutputSchema },
  prompt: `You are an expert product manager and startup consultant specializing in lean methodology. Your task is to create a detailed Minimum Viable Product (MVP) plan based on the provided business idea.

Analyze the following validated business idea:
{{validatedBusinessIdea}}

Based on this, generate a comprehensive MVP plan.

- **mvpDescription**: Write a concise, compelling description of the MVP. What is the absolute core problem it solves for the target user?
- **coreFeatures**: List the 3-5 most critical features needed for the MVP to function and solve the core problem. Be specific and action-oriented (e.g., "User registration and profile management," "Real-time order tracking map"). Avoid nice-to-have features.
- **timeframe**: Provide a realistic estimated timeframe for developing this MVP (e.g., "2-3 months").
- **requiredStaff**: Specify the essential team members needed (e.g., "1 Full-Stack Developer, 1 UI/UX Designer").
- **techStack**: Recommend a suitable, modern, and scalable technology stack. Briefly justify your choices (e.g., "Next.js for the frontend for its performance and SEO benefits, Firebase for the backend to handle auth and database easily").
- **costEstimation**: Provide a rough, high-level cost estimation for the MVP development in MUR (e.g., "MUR 300,000 - 450,000").

Produce the output in the required JSON format.`,
});

// The Genkit flow definition
const generateMvpFlow = ai.defineFlow(
  {
    name: 'generateMvpFlow',
    inputSchema: GenerateMvpInputSchema,
    outputSchema: GenerateMvpOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid MVP plan.');
    }
    return output;
  }
);
