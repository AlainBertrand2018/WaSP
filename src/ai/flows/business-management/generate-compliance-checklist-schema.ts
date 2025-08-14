/**
 * @fileOverview Zod schemas and TypeScript types for the compliance checklist generation flow.
 */

import { z } from 'zod';

// Zod schema for the input from the business profile form
export const GenerateComplianceChecklistInputSchema = z.object({
  businessType: z.string().describe('The type of the business (e.g., "Company", "Individual/Self-Employed").'),
  businessForm: z.string().optional().describe('The legal form of the business (e.g., "Private Company", "Société").'),
  brn: z.string().optional().describe('The Business Registration Number.'),
  isVatRegistered: z.string().describe('Whether the business is registered for VAT ("Yes" or "No").'),
  vatNumber: z.string().optional().describe('The VAT number, if applicable.'),
  isStartup: z.boolean().describe('Whether the business is a newly established startup.'),
  annualTurnover: z.string().optional().describe('The annual turnover in MUR.'),
  hasEmployees: z.string().describe('Whether the business has employees ("Yes" or "No").'),
  numberOfEmployees: z.string().optional().describe('The number of employees.'),
  industry: z.string().describe('The industry or sector the business operates in (e.g., "Construction", "Retail", "IT").'),
});

export type GenerateComplianceChecklistInput = z.infer<typeof GenerateComplianceChecklistInputSchema>;

// Zod schema for the analysis of a single checklist item
const ChecklistItemAnalysisSchema = z.object({
  requirement: z.string().describe('The specific compliance requirement being analyzed (must match one from the predefined list).'),
  isRelevant: z.boolean().describe('Whether this requirement is relevant to the user\'s business profile.'),
  explanation: z.string().describe('A detailed explanation of the requirement and its relevance to the user\'s business profile. If not relevant, explain why.'),
  initialStatus: z.enum(['Compliant', 'Action Required', 'Not Applicable']).describe('The AI-suggested initial status of the compliance item based on the user\'s profile.'),
});

export type ChecklistItemAnalysis = z.infer<typeof ChecklistItemAnalysisSchema>;


// Zod schema for the full checklist output
export const GenerateComplianceChecklistOutputSchema = z.object({
  businessSummary: z.string().describe("A brief, natural language summary of the user's business profile."),
  analysis: z.array(ChecklistItemAnalysisSchema).describe('A comprehensive analysis for each predefined compliance requirement.'),
  statusSummary: z.array(z.string()).describe("An array of strings, where each string is a summary point explaining a necessary action and the overall compliance picture."),
});

export type GenerateComplianceChecklistOutput = z.infer<typeof GenerateComplianceChecklistOutputSchema>;
