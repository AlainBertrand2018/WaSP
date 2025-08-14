
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

// Zod schema for a single checklist item
const ChecklistItemSchema = z.object({
  category: z.string().describe('The compliance category (e.g., "MRA Registration", "Data Protection", "CIDB Compliance").'),
  requirement: z.string().describe('The specific compliance requirement or check.'),
  explanation: z.string().describe('A detailed explanation of the requirement and its relevance to the user\'s business profile.'),
  initialStatus: z.enum(['Compliant', 'Action Required', 'Not Applicable']).describe('The AI-suggested initial status of the compliance item based on the user\'s profile.'),
});

// Zod schema for the full checklist output
export const GenerateComplianceChecklistOutputSchema = z.object({
  businessSummary: z.string().describe("A brief, natural language summary of the user's business profile."),
  checklist: z.array(ChecklistItemSchema).describe('A comprehensive list of compliance checklist items.'),
  statusSummary: z.string().describe("A brief summary of the overall compliance status based on the generated checklist."),
});

export type GenerateComplianceChecklistOutput = z.infer<typeof GenerateComplianceChecklistOutputSchema>;
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;
