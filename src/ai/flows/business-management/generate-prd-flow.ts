
'use server';
/**
 * @fileOverview An AI agent for generating a Product Requirements Document (PRD).
 */

import { ai } from '@/ai/genkit';
import {
  GeneratePrdInput,
  GeneratePrdInputSchema,
  GeneratePrdOutput,
  GeneratePrdOutputSchema,
} from './generate-prd-schema';

export async function generatePrd(input: GeneratePrdInput): Promise<GeneratePrdOutput> {
  const result = await generatePrdFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'generatePrdPrompt',
  input: { schema: GeneratePrdInputSchema },
  output: { schema: GeneratePrdOutputSchema },
  prompt: `You are a seasoned Senior Product Manager with expertise in creating clear, concise, and comprehensive Product Requirements Documents (PRDs). Your task is to generate a detailed PRD based on the provided business idea validation report and the high-level MVP plan.

**Business Idea & Validation Data:**
- **Idea Title:** {{validationReport.originalIdea.businessIdeaTitle}}
- **Idea Description:** {{validationReport.originalIdea.ideaDescription}}
- **Validation Assessment:** {{validationReport.validationSummary.overallAssessment}}
- **Target Personas:**
{{#each validationReport.validationReport.targetPersonas}}
  - **{{title}}**: {{description}}
{{/each}}

**High-Level MVP Plan:**
- **MVP Description:** {{mvpPlan.mvpDescription}}
- **Core Features:**
{{#each mvpPlan.coreFeatures}}
  - {{this}}
{{/each}}
- **Tech Stack:** {{mvpPlan.techStack}}

Based on all this information, generate a comprehensive PRD with the following sections:

- **introduction**: Write a compelling introduction. Briefly describe the product's vision, purpose, and what problem it solves for the target audience.
- **problemStatement**: Clearly articulate the primary pain point or problem that this product will address.
- **goalsAndObjectives**: Define the key business goals and product objectives. What are the top 3-4 measurable outcomes we want to achieve with this MVP? (e.g., "Achieve 500 user sign-ups within the first 3 months," "Validate user demand for core feature X").
- **userStories**: For each core feature identified in the MVP plan, create a detailed user story. Each story must follow the format: "As a [persona type], I want to [action], so that I can [benefit]." Be specific and base the personas on the provided target personas.
- **technicalSpecifications**: Based on the recommended tech stack, outline the high-level technical requirements. This should not be a detailed system design but should mention key components like "Frontend built with Next.js," "Backend services using Firebase (Firestore, Auth)," "REST API for data communication."
- **successMetrics**: List the key performance indicators (KPIs) that will be used to measure the success of the MVP. These should be quantifiable and tied to the goals (e.g., "Daily Active Users (DAU)," "User Retention Rate," "Conversion Rate for key actions").
- **futureConsiderations**: Briefly describe potential features or enhancements that are out of scope for the MVP but should be considered for future versions of the product. This creates a high-level roadmap.

Produce the output in the required JSON format. Ensure the content is detailed, professional, and actionable for a development team.`,
});

const generatePrdFlow = ai.defineFlow(
  {
    name: 'generatePrdFlow',
    inputSchema: GeneratePrdInputSchema,
    outputSchema: GeneratePrdOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid PRD.');
    }
    return output;
  }
);
