
'use server';
/**
 * @fileOverview An AI agent for generating a personalized business compliance checklist for Mauritius.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateComplianceChecklistInput,
  GenerateComplianceChecklistInputSchema,
  GenerateComplianceChecklistOutput,
  GenerateComplianceChecklistOutputSchema,
} from './generate-compliance-checklist-schema';

export async function generateComplianceChecklist(
  input: GenerateComplianceChecklistInput
): Promise<GenerateComplianceChecklistOutput> {
  const result = await generateComplianceChecklistFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateComplianceChecklistPrompt',
  input: { schema: GenerateComplianceChecklistInputSchema },
  output: { schema: GenerateComplianceChecklistOutputSchema },
  prompt: `You are a compliance expert specializing in the Mauritian legal and regulatory framework for businesses. Your task is to generate a personalized compliance checklist for a user based on their business profile.

Analyze the following user profile:
- Business Type: {{businessType}}
- Business Form: {{businessForm}}
- Industry: {{industry}}
- Has Employees: {{hasEmployees}} (Number: {{numberOfEmployees}})
- Is VAT Registered: {{isVatRegistered}}
- Annual Turnover: {{annualTurnover}}
- Is a Startup: {{isStartup}}

Based on this profile, generate a comprehensive checklist covering all relevant compliance areas in Mauritius. For each item, you must determine its relevance and suggest an initial status.

**Key Compliance Areas to Consider:**
1.  **MRA (Mauritius Revenue Authority):**
    - Business Registration (BRN).
    - Tax Account Number (TAN) for the company and individuals.
    - VAT registration (current threshold is MUR 6M, but advise based on their turnover and industry).
    - Corporate Tax filings.
    - PAYE for employees (if applicable).
    - NSF/CSG contributions for employees (if applicable).
2.  **Corporate and Business Registration Department (CBRD):**
    - Company incorporation documents.
    - Annual return filings.
3.  **Data Protection Office (DPO):**
    - Registration as a data controller/processor.
    - Having a privacy policy.
    - Compliance with the Data Protection Act 2017.
4.  **Industry-Specific Regulations:**
    - **Construction:** Check for CIDB registration.
    - **Tourism:** Check for Tourism Authority licenses.
    - **Financial Services:** Mention FSC licensing (but advise seeking professional help).
    - **Food/Hospitality:** Mention Food Handlers Certificate, Public Health permits.
5.  **Employment Law:**
    - Employment contracts for staff.
    - Compliance with the Workers' Rights Act.
    - Health and Safety regulations (OSHA).

**Instructions for Each Checklist Item:**
- **category:** Group the items logically (e.g., "MRA Tax Compliance", "Corporate Filings", "Employment Law").
- **requirement:** State the specific compliance action clearly (e.g., "File annual corporate tax return").
- **explanation:** Provide a detailed but simple explanation of what the requirement is, why it applies to *this specific user* based on their profile, and any relevant deadlines or thresholds.
- **initialStatus:**
    - If the user's profile suggests they are already compliant (e.g., has a VAT number and is marked as registered), set to 'Compliant'.
    - If the profile suggests a clear action is needed (e.g., has employees but hasn't mentioned PAYE), set to 'Action Required'.
    - If a requirement is clearly not relevant (e.g., CIDB for a retail shop), set to 'Not Applicable'.

Produce a diverse and thorough checklist. Do not include items that are not relevant.
Produce the output in the required JSON format.
`,
});

const generateComplianceChecklistFlow = ai.defineFlow(
  {
    name: 'generateComplianceChecklistFlow',
    inputSchema: GenerateComplianceChecklistInputSchema,
    outputSchema: GenerateComplianceChecklistOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid compliance checklist.');
    }
    return output;
  }
);
