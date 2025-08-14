
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
  prompt: `You are a compliance expert specializing in the Mauritian legal and regulatory framework for businesses. Your task is to generate a personalized compliance checklist and insightful summaries for a user based on their business profile.

**Analyze the following user profile:**
- Business Type: {{businessType}}
- Business Form: {{businessForm}}
- Industry: {{industry}}
- Has Employees: {{hasEmployees}} (Number: {{numberOfEmployees}})
- Is VAT Registered: {{isVatRegistered}}
- Annual Turnover: {{annualTurnover}}
- Is a Startup: {{isStartup}}

**Your Tasks:**

1.  **Generate Business Summary:**
    - Write a concise, one-paragraph summary of the user's business profile in natural language. This will be displayed at the top of the page.

2.  **Generate Compliance Checklist:**
    - Create a comprehensive checklist covering all relevant compliance areas in Mauritius.
    - For each item, determine its relevance and suggest an initial status ('Compliant', 'Action Required', 'Not Applicable').
    - **Key Compliance Areas:** MRA (BRN, TAN, VAT, PAYE, NSF/CSG), Corporate and Business Registration Department (CBRD), Data Protection Office (DPO), Industry-Specific Regulations (Construction/CIDB, Tourism/TA, Food/Health), Employment Law (Workers' Rights Act, OSHA).
    - For each checklist item, provide:
        - **category:** Group items logically (e.g., "MRA Tax Compliance").
        - **requirement:** State the specific action clearly.
        - **explanation:** Explain what it is, why it applies to *this user*, and any deadlines/thresholds.
        - **initialStatus:** Set based on the user's profile.

3.  **Generate Status Summary:**
    - Based on the checklist you just created (specifically the items marked 'Action Required'), provide a summary as an array of strings.
    - **IMPORTANT**: Each string in the array should be a distinct point, explaining why an action is necessary and what the overall compliance picture looks like for this business.

Produce the output in the required JSON format with all three fields: businessSummary, checklist, and statusSummary.
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
