
'use server';
/**
 * @fileOverview An AI agent for analyzing a user's profile to suggest personalized business sectors.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {
  GenerateSuggestionsForUserInput,
  GenerateSuggestionsForUserInputSchema,
  GenerateSuggestionsForUserOutput,
  GenerateSuggestionsForUserOutputSchema,
} from './generate-user-profile-analysis-schema';

export type {
  GenerateSuggestionsForUserInput,
  SectorSuggestion,
} from './generate-user-profile-analysis-schema';

// Exported function that the frontend will call
export async function generateSuggestionsForUser(
  input: GenerateSuggestionsForUserInput
): Promise<GenerateSuggestionsForUserOutput> {
  const result = await generateSuggestionsFlow(input);
  return result;
}

// Define the prompt with placeholders for the document and the user profile
const prompt = ai.definePrompt({
  name: 'generateUserSuggestionsPrompt',
  input: {
    schema: GenerateSuggestionsForUserInputSchema,
  },
  output: {schema: GenerateSuggestionsForUserOutputSchema},
  prompt: `You are an expert business consultant and market analyst specializing in the Mauritian SME landscape. Your task is to analyze a user's initial business concept and their personal profile against your knowledge of the Mauritian SME ecosystem. Your goal is to provide personalized, data-driven feedback and an actionable roadmap.

**Your Knowledge Base:** You have deep knowledge of the Mauritian SME landscape, including promising sectors (like Agri-tech, FinTech, Sustainable Tourism, etc.), market trends, government incentives, and common challenges.

**User's Initial Idea:**
- **Business Concept:** {{businessConcept}}
- **Problem to Solve:** {{problemToSolve}}
- **Proposed Solution:** {{proposedSolution}}

**User's Profile:**
- **Expertise & Background:** {{expertise}}
- **Passions & Interests:** {{passion}}
- **Starting Budget:** {{budget}}
- **Preferred Business Style:** {{businessStyle}}
- **Target Audience:** {{targetAudience}}

**Your Task:**

**Part 1: Generate Sector Suggestions (Hints)**
Based *only* on your knowledge of the Mauritian market and the user's profile, identify the top 3 most promising business sectors for this specific individual. These suggestions should be creative and directly link the user's profile to market opportunities. For each of the 3 sectors you suggest, you must provide:
1.  A clear **title** for the sector.
2.  A list of 3-4 compelling **reasonsWhy** this sector is a good fit. These reasons MUST connect market opportunities with the user's specific profile (their expertise, passion, budget, etc.).
3.  An estimated **marketSize** in terms of the potential number of customers (e.g., "5,000-10,000 customers").
4.  An estimated annual **marketValue** in Mauritian Rupees (e.g., "MUR 8M - 12M").
5.  A suggested **averageSalePrice** per unit or service, relevant to the sector (e.g., "MUR 1,000 - 2,500 per service").

**Part 2: Assess and Summarize**
After generating the sectors, perform a final assessment.
1.  **relevanceScore**: Provide a score from 1 to 10 assessing the overall relevance and potential of the user's profile and initial idea within the Mauritian market context. A score of 1-4 means the idea/profile alignment is weak and needs significant rethinking. 5-7 means there's potential but requires refinement. 8-10 means it's a very promising fit.
2.  **roadmapSummary**: Write a concise, actionable summary of a potential roadmap for the user. This summary should synthesize their initial idea and profile, suggest which of the hinted sectors might be the best starting point, and outline the immediate next steps they could take (e.g., "Given your tech background and the identified gap in Agri-Tech, a good starting point would be to develop a prototype for a farm-to-consumer app. Next steps should include detailed market research on local farmer needs and building a basic financial model based on the suggested 'Agri-Tech Solutions' sector.").

Produce the output in the specified JSON format. Your suggestions and estimations must be deeply personalized and directly reference the synergy between the user's profile and the market opportunities.
`,
});

// Define the Genkit flow
const generateSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSuggestionsFlow',
    inputSchema: GenerateSuggestionsForUserInputSchema,
    outputSchema: GenerateSuggestionsForUserOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid list of suggestions.');
    }
    return output;
  }
);
