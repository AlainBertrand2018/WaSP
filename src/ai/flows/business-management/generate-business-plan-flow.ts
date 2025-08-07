
'use server';
/**
 * @fileOverview An AI agent for generating a comprehensive business plan.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateBusinessPlanInput,
  GenerateBusinessPlanInputSchema,
  GenerateBusinessPlanOutput,
  GenerateBusinessPlanOutputSchema,
} from './generate-business-plan-schema';

export async function generateBusinessPlan(
  input: GenerateBusinessPlanInput
): Promise<GenerateBusinessPlanOutput> {
  const result = await generateBusinessPlanFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateBusinessPlanPrompt',
  input: { schema: GenerateBusinessPlanInputSchema },
  output: { schema: GenerateBusinessPlanOutputSchema },
  prompt: `You are a world-class business consultant and financial analyst with deep expertise in the Mauritian SME ecosystem. Your task is to generate a comprehensive, professional, and investment-ready business plan by synthesizing the provided data. The tone should be formal, confident, and persuasive, suitable for submission to financial institutions and investors.

**Analyze and synthesize the following data:**

**1. Business Idea Validation Report:**
   - Idea Title: {{validationReport.originalIdea.businessIdeaTitle}}
   - Sector: {{validationReport.sector}}
   - Overall Assessment: {{validationReport.validationSummary.overallAssessment}}
   - Key Strengths: {{#each validationReport.validationSummary.keyStrengths}} {{this}},{{/each}}
   - Potential Weaknesses: {{#each validationReport.validationSummary.potentialWeaknesses}} {{this}},{{/each}}
   - Market Potential Analysis: {{validationReport.validationReport.marketPotential}}
   - Competitive Landscape Analysis: {{validationReport.validationReport.competitiveLandscape}}
   - Target Personas: {{#each validationReport.validationReport.targetPersonas}} {{title}}: {{description}}; {{/each}}

**2. Minimum Viable Product (MVP) Plan:**
   - MVP Description: {{mvpPlan.mvpDescription}}
   - Core Features: {{#each mvpPlan.coreFeatures}} {{this}},{{/each}}
   - Required Staff: {{#each mvpPlan.requiredStaff}} {{role}} ({{cost}}); {{/each}}
   - Tech Stack: {{#each mvpPlan.techStack}} {{item}} ({{cost}}); {{/each}}

**3. Startup Budget & Financial Summary:**
   - Total Monthly Fixed Costs: MUR {{budgetSummary.totalFixedCosts}}
   - Total Variable Costs Per Unit: MUR {{budgetSummary.totalVariableCosts}}
   - Sale Price Per Unit: MUR {{budgetSummary.salePricePerUnit}}
   - Break-Even Point: {{budgetSummary.summary.breakEvenUnits}} units per month
   - Break-Even Analysis Summary: {{budgetSummary.summary.summary}}
   - Funding Requested: MUR {{budgetSummary.funding.totalRequested}}
   - Monthly Loan Repayment: MUR {{budgetSummary.funding.monthlyRepayment}}

**Generate the business plan with the following 13 sections. Be thorough and eloquent. Do not just list the data; interpret and present it professionally.**

1.  **executiveSummary**: Write a compelling executive summary. Start with the business name and its mission. Briefly cover the problem, solution, target market, key financial highlights, and the funding request. This should be a concise overview of the entire plan.
2.  **companyDescription**: Provide a detailed description of the company. Include the legal structure (assume a Private Limited Company), mission, vision, and the core values. Describe the business model in detail based on the provided monetization strategy.
3.  **marketAnalysis**: Based on the validation report's market potential section, provide a detailed analysis of the industry and target market in Mauritius. Discuss market size, trends, and growth potential.
4.  **marketingPlan**: Detail the marketing and sales strategy. Describe how the company will reach its target personas. Outline a pricing strategy based on the 'salePricePerUnit'. Propose marketing channels (e.g., social media, content marketing, local partnerships) suitable for the Mauritian context.
5.  **salesPlan**: Describe the sales process from lead generation to closing a deal. How will the first customers be acquired? What is the sales cycle?
6.  **competitiveAnalysis**: Use the competitive landscape analysis from the validation report to write this section. Identify key competitors, analyze their strengths and weaknesses, and clearly articulate this business's competitive advantage and unique selling proposition (USP).
7.  **organizationalStructure**: Detail the management team and staffing. Based on the 'requiredStaff' from the MVP plan, outline the key roles and responsibilities. Briefly mention future hiring plans needed for scaling from MVP to full production.
8.  **productsAndServices**: Elaborate on the products/services offered. Use the 'mvpDescription' and 'coreFeatures' as a starting point, but present it as a market-ready offering.
9.  **operatingPlan**: Describe the day-to-day operations. Where will the business be located? What are the key operational processes from production/service delivery to customer support? Mention the 'techStack'.
10. **financialPlan**: Provide a detailed financial plan. Summarize the startup costs (based on MVP cost and production cost estimates), project revenue for the first year (use break-even analysis as a baseline and project reasonable growth), and present a summary of fixed and variable costs.
11. **fundingSources**: Clearly state the total funding required (from the budget planner). Detail how these funds will be allocated across key areas like product development, marketing, operational costs, etc. Justify why this funding is essential for the company's success.
12. **swotAnalysis**: Create a formal SWOT analysis. Use the 'keyStrengths' and 'potentialWeaknesses' from the validation report. Then, infer and describe potential Opportunities (e.g., market trends, gaps in competition) and Threats (e.g., economic factors, new competitors) relevant to Mauritius.
13. **financialDocuments**: State that detailed financial projections, including cash flow statements, income statements, and balance sheets for the first three years, are available as an appendix. (Do not generate the actual sheets).

Produce the output in the required JSON format.
`,
});

const generateBusinessPlanFlow = ai.defineFlow(
  {
    name: 'generateBusinessPlanFlow',
    inputSchema: GenerateBusinessPlanInputSchema,
    outputSchema: GenerateBusinessPlanOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid business plan.');
    }
    return output;
  }
);
