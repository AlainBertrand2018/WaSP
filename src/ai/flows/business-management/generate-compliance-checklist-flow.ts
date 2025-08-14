
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

const predefinedChecklist = [
    { category: "Registration & Legal", requirement: "Company Registration Certificate" },
    { category: "Registration & Legal", requirement: "Business Registration Number (BRN)" },
    { category: "MRA Tax Compliance", requirement: "Tax Account Number (TAN)" },
    { category: "MRA Tax Compliance", requirement: "VAT Registration Certificate" },
    { category: "MRA Tax Compliance", requirement: "PAYE Registration" },
    { category: "MRA Tax Compliance", requirement: "CSG / NSF Registration" },
    { category: "Data Protection", requirement: "Data Protection Office (DPO) Registration" },
    { category: "Employment Law", requirement: "Employee Contracts" },
    { category: "Industry-Specific", requirement: "Construction Industry Development Board (CIDB) Registration" },
    { category: "Industry-Specific", requirement: "Tourism Authority (TA) License" },
    { category: "Industry-Specific", requirement: "Food Handler's Certificate" },
];

const prompt = ai.definePrompt({
  name: 'generateComplianceChecklistPrompt',
  input: { schema: GenerateComplianceChecklistInputSchema },
  output: { schema: GenerateComplianceChecklistOutputSchema },
  prompt: `You are a compliance expert specializing in the Mauritian legal and regulatory framework for businesses. Your task is to analyze a user's business profile and determine the relevance and status of a predefined list of compliance requirements. **You must base your analysis on your knowledge of official Mauritian sources like the Mauritius Revenue Authority (MRA), the Corporate and Business Registration Department (CBRD), and relevant industry bodies.**

**Analyze the following user profile:**
- Business Type: {{businessType}}
- Business Form: {{businessForm}}
- Industry: {{industry}}
- Has Employees: {{hasEmployees}} (Number: {{numberOfEmployees}})
- Is VAT Registered: {{isVatRegistered}}
- Annual Turnover: {{annualTurnover}}
- Is a Startup: {{isStartup}}

**Here is the predefined list of all potential compliance requirements:**
{{#each predefinedChecklist}}
- {{requirement}}
{{/each}}

**Your Tasks:**

1.  **Generate Business Summary:**
    - Write a concise, one-paragraph summary of the user's business profile in natural language. This will be displayed at the top of the page.

2.  **Generate Compliance Analysis:**
    - For **each** item in the predefined list, you must produce a corresponding analysis object.
    - For each item, determine its relevance and suggest an initial status ('Compliant', 'Action Required', 'Not Applicable').
    - **Key Compliance Areas & Logic:**
        - MRA (BRN, TAN, VAT, PAYE, NSF/CSG): PAYE/NSF/CSG are relevant if 'hasEmployees' is 'Yes'. VAT is relevant if turnover is high or 'isVatRegistered' is 'Yes'. BRN/TAN are almost always relevant for a formal business.
        - Corporate and Business Registration Department (CBRD): Company Registration is relevant for 'Company' business types.
        - Data Protection Office (DPO): Relevant for most businesses that handle customer data.
        - Industry-Specific Regulations: CIDB for 'Construction', TA for 'Tourism', Food Certificate for 'Food/Restaurant'.
    - For each analysis object, provide:
        - **requirement:** The name of the item from the predefined list.
        - **isRelevant:** A boolean indicating if this applies to the user.
        - **explanation:** Explain what it is and *why* it is or is not relevant to this specific user's profile.
        - **initialStatus:** Set based on the user's profile. If 'isRelevant' is false, this should be 'Not Applicable'. If the user has a BRN, mark the BRN item as 'Compliant'.

3.  **Generate Status Summary:**
    - Based on the analysis you just created (specifically the items marked 'Action Required'), provide a summary as an array of strings.
    - **IMPORTANT**: Each string in the array should be a distinct bullet point, explaining why an action is necessary and what the overall compliance picture looks like for this business. **You must cite the relevant official body (e.g., MRA, CBRD) for each point.** For example: "Action is required for PAYE Registration as per MRA guidelines for businesses with employees."

Produce the output in the required JSON format with all three fields: businessSummary, analysis, and statusSummary. Ensure the 'analysis' array contains an object for every single item in the predefined list.
`,
});

const generateComplianceChecklistFlow = ai.defineFlow(
  {
    name: 'generateComplianceChecklistFlow',
    inputSchema: GenerateComplianceChecklistInputSchema,
    outputSchema: GenerateComplianceChecklistOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({ ...input, predefinedChecklist });
    if (!output) {
      throw new Error('The AI model did not return a valid compliance checklist.');
    }
    return output;
  }
);
