
'use server';
/**
 * @fileOverview An AI agent for summarizing a business idea based on user input.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ValidateBusinessIdeaInput, ValidateBusinessIdeaInputSchema } from './validate-idea-schema';

// This schema defines the input for the prompt itself.
const SummarizeIdeaPromptInputSchema = z.object({
    ideaDetailsMarkdown: z.string().describe("A markdown-formatted string containing all the business idea details."),
});

// We only need the summary text as output.
const SummarizeIdeaOutputSchema = z.string();

type SummarizeIdeaOutput = z.infer<typeof SummarizeIdeaOutputSchema>;

// The exported function that will be called from the frontend
export async function summarizeIdea(
  input: ValidateBusinessIdeaInput
): Promise<SummarizeIdeaOutput> {
  const result = await summarizeIdeaFlow(input);
  return result;
}

// The Genkit prompt definition
const prompt = ai.definePrompt({
  name: 'summarizeIdeaPrompt',
  input: { schema: SummarizeIdeaPromptInputSchema },
  output: { schema: SummarizeIdeaOutputSchema },
  prompt: `You are an expert business analyst. Your task is to review the following business idea details, provided in Markdown format, and create a single, concise, well-written narrative paragraph that synthesizes all the key information. Do not use markdown or lists in your output.

For example: "[Business Name] is a [B2B/B2C] business in the [Sector] industry, targeting [Customer Profile]. They plan to offer [Products/Services] with a monetization strategy based on [Monetization Strategy]. With a starting budget of MUR [Budget] and an estimated market of [Market Size], they aim to solve [Problem from Description]."

Here is the business idea information:
{{ideaDetailsMarkdown}}
`,
});

// The Genkit flow definition
const summarizeIdeaFlow = ai.defineFlow(
  {
    name: 'summarizeIdeaFlow',
    inputSchema: ValidateBusinessIdeaInputSchema,
    outputSchema: SummarizeIdeaOutputSchema,
  },
  async (input) => {
    try {
      // Step 1: Compile all the input data into a single markdown string.
      const ideaDetailsMarkdown = `
- **Idea Title:** ${input.businessIdeaTitle}
- **Sector:** ${input.sector === 'Other' ? input.otherSector : input.sector}
- **Sector Target:** ${input.sectorTarget}
- **Idea Description:** ${input.ideaDescription}
- **Target Customer Profile:** ${input.customerProfile}
- **Estimated number of potential customers:** ${input.marketSize}
- **Product Type:** ${input.productType}
- **Products/Services:**
${input.products.map(p => `  - ${p.name}`).join('\n')}
- **Starting Budget:** MUR ${input.startingBudget}
- **Monetization Strategy:** ${input.monetization}
      `;

      // Step 2: Call the prompt with the compiled markdown string.
      const { output } = await prompt({ ideaDetailsMarkdown });

      if (!output) {
        // This case might happen if the model returns an empty response.
        return 'Sorry, I was unable to generate a summary for your idea. You can still proceed to validation.';
      }
      return output;
    } catch (error) {
        console.error('Error in summarizeIdeaFlow:', error);
        // This will catch schema validation errors or other issues from the AI call.
        return 'Sorry, an error occurred while generating the summary. You can still proceed to validation.';
    }
  }
);
