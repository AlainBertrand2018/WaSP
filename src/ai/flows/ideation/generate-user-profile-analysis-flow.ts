
'use server';
/**
 * @fileOverview An AI agent for analyzing a user's profile to suggest personalized business sectors.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
    GenerateSuggestionsForUserInput,
    GenerateSuggestionsForUserInputSchema,
    GenerateSuggestionsForUserOutput,
    GenerateSuggestionsForUserOutputSchema
} from './generate-user-profile-analysis-schema';

export type { GenerateSuggestionsForUserInput, SectorSuggestion } from './generate-user-profile-analysis-schema';


// Exported function that the frontend will call
export async function generateSuggestionsForUser(input: GenerateSuggestionsForUserInput): Promise<GenerateSuggestionsForUserOutput> {
  // Read the content of the markdown file
  const filePath = path.join(process.cwd(), 'public', 'documents', 'mauritius_sme_ecosystem_analysis.md');
  const documentContent = await fs.readFile(filePath, 'utf-8');
  
  // Call the Genkit flow with the user's profile and the document content
  const result = await generateSuggestionsFlow({ userProfile: input, document: documentContent });
  return result;
}

// Define the prompt with placeholders for the document and the user profile
const prompt = ai.definePrompt({
  name: 'generateUserSuggestionsPrompt',
  input: { schema: z.object({ userProfile: GenerateSuggestionsForUserInputSchema, document: z.string() }) },
  output: { schema: GenerateSuggestionsForUserOutputSchema },
  prompt: `You are an expert business consultant and career coach specializing in the Mauritian SME landscape. Your task is to analyze a user's profile and a document about the Mauritian SME ecosystem to suggest highly personalized business sectors.

**Analysis Document on Mauritian SME Ecosystem:**
---
{{document}}
---

**User's Profile:**
- **Expertise & Background:** {{userProfile.expertise}}
- **Passions & Interests:** {{userProfile.passion}}
- **Starting Budget:** {{userProfile.budget}}
- **Preferred Business Style:** {{userProfile.businessStyle}}
- **Target Audience:** {{userProfile.targetAudience}}

**Your Task:**
Based *only* on the provided document and the user's profile, identify the top 3 most promising business sectors for this specific individual.

For each of the 3 sectors you suggest:
1.  Provide a clear **title** for the sector.
2.  Provide a list of 3-4 compelling **reasonsWhy** this sector is a good fit. These reasons MUST connect the opportunities mentioned in the document with the user's specific profile (their expertise, passion, budget, etc.). For example, if the document mentions a rise in eco-tourism and the user is passionate about sustainable living, you should connect these two points.

Produce the output in the specified JSON format. Your suggestions must be deeply personalized and directly reference the synergy between the user's profile and the market opportunities in the document.
`,
});

// Define the Genkit flow
const generateSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSuggestionsFlow',
    inputSchema: z.object({ userProfile: GenerateSuggestionsForUserInputSchema, document: z.string() }),
    outputSchema: GenerateSuggestionsForUserOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid list of suggestions.');
    }
    return output;
  }
);
