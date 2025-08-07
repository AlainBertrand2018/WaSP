/**
 * @fileOverview Zod schemas and TypeScript types for the business plan generation flow.
 */

import { z } from 'zod';
import { GenerateMvpInputSchema, GenerateMvpOutputSchema } from './generate-mvp-schema';
import { BudgetPlannerState } from '@/store/budget-planner-store';

// The input combines the full validation report, the generated MVP plan, and the budget summary.
export const GenerateBusinessPlanInputSchema = z.object({
  validationReport: GenerateMvpInputSchema,
  mvpPlan: GenerateMvpOutputSchema,
  budgetSummary: z.object({
    funding: z.object({
      requestedAmounts: z.record(z.number()),
      interestRate: z.number(),
      loanTerm: z.number(),
      totalRequested: z.number(),
      monthlyRepayment: z.number(),
    }),
    totalFixedCosts: z.number(),
    totalVariableCosts: z.number(),
    salePricePerUnit: z.number(),
    summary: z.object({
      breakEvenUnits: z.number(),
      breakEvenRevenue: z.number(),
      marketGrowthEstimate: z.string(),
      summary: z.string(),
      conservativeGrowthOutlook: z.string(),
      forecast: z.array(z.object({
        unitsSold: z.number(),
        revenue: z.number(),
        costs: z.number(),
        profit: z.number(),
      })),
    }),
  }),
});

export type GenerateBusinessPlanInput = z.infer<typeof GenerateBusinessPlanInputSchema>;

// Zod schema for the structured Business Plan output
export const GenerateBusinessPlanOutputSchema = z.object({
  executiveSummary: z.string().describe("A compelling overview of the entire business plan, covering the problem, solution, market, financials, and funding request."),
  companyDescription: z.string().describe("Details about the company, its mission, vision, legal structure, and business model."),
  marketAnalysis: z.string().describe("In-depth analysis of the industry, target market in Mauritius, market size, and growth potential."),
  marketingPlan: z.string().describe("The strategy to reach target customers, including pricing, promotion, and distribution channels."),
  salesPlan: z.string().describe("The process for selling products or services, from lead generation to conversion."),
  competitiveAnalysis: z.string().describe("An analysis of competitors, their strengths and weaknesses, and the company's competitive advantage."),
  organizationalStructure: z.string().describe("Details on the management team, key personnel, roles, and responsibilities."),
  productsAndServices: z.string().describe("A detailed description of the products or services offered by the business."),
  operatingPlan: z.string().describe("The day-to-day operational workflow, including location, technology, and key processes."),
  financialPlan: z.string().describe("A summary of the financial projections, including startup costs, revenue forecasts, and cost analysis."),
  fundingSources: z.string().describe("The total funding required, its allocation, and the justification for the investment."),
  swotAnalysis: z.string().describe("A formal analysis of the business's Strengths, Weaknesses, Opportunities, and Threats."),
  financialDocuments: z.string().describe("A concluding statement mentioning the availability of detailed financial sheets upon request."),
});

export type GenerateBusinessPlanOutput = z.infer<typeof GenerateBusinessPlanOutputSchema>;
