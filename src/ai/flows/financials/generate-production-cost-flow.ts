
'use server';
/**
 * @fileOverview An AI agent for generating a full production cost estimation.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateProductionCostInput,
  GenerateProductionCostInputSchema,
  GenerateProductionCostOutput,
  GenerateProductionCostOutputSchema,
} from './generate-production-cost-schema';

export async function generateProductionCost(
  input: GenerateProductionCostInput
): Promise<GenerateProductionCostOutput> {
  const result = await generateProductionCostFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateProductionCostPrompt',
  input: { schema: GenerateProductionCostInputSchema },
  output: { schema: GenerateProductionCostOutputSchema },
  prompt: `You are a senior business financial planner and analyst specializing in scaling startups in Mauritius. Your task is to estimate the total investment required to take a business from the MVP stage to a full production launch.

Analyze the provided business idea and MVP plan:

- **Business Idea:** {{businessIdea.originalIdea.businessIdeaTitle}}
- **Sector:** {{businessIdea.sector}}
- **Target Market:** {{businessIdea.sectorTarget}}
- **Monetization Strategy:** {{businessIdea.monetization}}
- **MVP Cost Estimation:** {{mvpPlan.costEstimation}}
- **MVP Staffing:** {{#each mvpPlan.requiredStaff}}{{this.role}}, {{/each}}
- **MVP Tech Stack:** {{#each mvpPlan.techStack}}{{this.item}}, {{/each}}

Based on this data, provide a realistic estimation for a full production launch.

- **estimatedCost**: Provide a total estimated cost in MUR as a numeric range (e.g., "MUR 2,500,000 - MUR 4,000,000"). This should be significantly higher than the MVP cost.
- **justification**: Provide a detailed, multi-paragraph explanation for your estimate. Break down the reasoning based on factors like:
    - **Operational Scaling:** Increased staffing, larger office space, more inventory, etc.
    - **Marketing & Sales:** Costs for a full marketing launch, building a sales team, etc.
    - **Technology Infrastructure:** Scaling servers, software licenses, etc.
    - **Contingency Fund:** A buffer for unforeseen expenses (typically 15-20% of the total).

Your analysis must be tailored to the business's specific sector and the Mauritian economic context. Avoid generic advice. Produce the output in the required JSON format.`,
});

const generateProductionCostFlow = ai.defineFlow(
  {
    name: 'generateProductionCostFlow',
    inputSchema: GenerateProductionCostInputSchema,
    outputSchema: GenerateProductionCostOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid production cost estimation.');
    }
    return output;
  }
);
