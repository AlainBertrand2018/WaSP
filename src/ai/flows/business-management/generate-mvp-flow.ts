
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
  prompt: `You are an expert product manager and startup consultant specializing in lean methodology. Your task is to create a detailed Minimum Viable Product (MVP) plan based on the provided validated business idea report.

Analyze the following validated business idea report:

- **Original Idea Title:** {{originalIdea.businessIdeaTitle}}
- **Original Idea Description:** {{originalIdea.ideaDescription}}

**Validation Report Summary:**
- **Viability Score:** {{validationSummary.viabilityScore}} / 10
- **Overall Assessment:** {{validationSummary.overallAssessment}}
- **Key Strengths:** 
{{#each validationSummary.keyStrengths}}
  - {{this}}
{{/each}}
- **Potential Weaknesses:**
{{#each validationSummary.potentialWeaknesses}}
  - {{this}}
{{/each}}

**AI Refinement Suggestions:**
{{refinementSuggestions}}

Based on this comprehensive report, generate a detailed MVP plan.

- **mvpDescription**: Write a concise, compelling description of the MVP. What is the absolute core problem it solves for the target user? This should synthesize the original idea and the AI's refinement suggestions.
- **coreFeatures**: List the 3-5 most critical features needed for the MVP to function and solve the core problem. Be specific and action-oriented (e.g., "User registration and profile management," "Real-time order tracking map"). Avoid nice-to-have features. Base these on the validation report's assessment.
- **timeframe**: Provide a realistic estimated timeframe for developing this MVP (e.g., "2-3 months").
- **requiredStaff**: Specify the essential team members needed as a list of strings (e.g., ["1 Full-Stack Developer", "1 UI/UX Designer"]).
- **techStack**: Recommend a suitable, modern, and scalable technology stack as a list of strings. Briefly justify your choices (e.g., ["Next.js for frontend: performance and SEO benefits", "Firebase for backend: handles auth and database easily"]).
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
