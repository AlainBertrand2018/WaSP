
'use server';
/**
 * @fileOverview An AI agent for generating a GDPR-style Privacy Policy.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GeneratePrivacyPolicyOutputSchema = z.object({
  policy: z.string().describe('A comprehensive privacy policy document formatted with Markdown.'),
});

export type GeneratePrivacyPolicyOutput = z.infer<typeof GeneratePrivacyPolicyOutputSchema>;


const prompt = ai.definePrompt({
  name: 'generatePrivacyPolicyPrompt',
  output: { schema: GeneratePrivacyPolicyOutputSchema },
  prompt: `You are a legal expert specializing in data privacy and compliance for technology companies. Your task is to generate a comprehensive, GDPR-compliant Privacy Policy for a SaaS product called "StudioFlow AI".

**About StudioFlow AI:**
- It's a comprehensive, AI-powered suite of tools for entrepreneurs and SMEs in Mauritius.
- It helps users create business plans, financial models, and marketing materials.
- It has a user registration system (collects name, email).
- It uses cookies for session management and analytics.
- It processes user-generated data (business ideas, financial figures) to provide its services.
- It has an AI chatbot named CLAIRE that logs conversation history.
- The target audience is Mauritian entrepreneurs and businesses.

**Task:**
Generate a full privacy policy document. The document should be well-structured, clear, and easy for a non-lawyer to understand. It must be formatted using Markdown.

**Required Sections:**
1.  **Introduction**: Briefly introduce StudioFlow AI and the purpose of the policy.
2.  **Information We Collect**: Detail the types of data collected (e.g., Personal Data like name/email, Usage Data like IP addresses/browser type, Business Data entered by the user, Cookies).
3.  **How We Use Your Information**: Explain the purposes for using the collected data (e.g., to provide and maintain the service, to personalize user experience, for customer support, for analytics).
4.  **How We Share Your Information**: Describe the circumstances under which data might be shared (e.g., with service providers, for legal compliance). State clearly that business data is treated as confidential.
5.  **Cookies and Tracking Technologies**: Explain what cookies are used for (e.g., essential, performance, analytics) and how users can manage them.
6.  **Data Security**: Describe the measures taken to protect user data (e.g., encryption, access controls).
7.  **Data Retention**: Explain how long different types of data are kept.
8.  **Your Data Protection Rights**: Outline user rights under GDPR (e.g., access, rectification, erasure, portability).
9.  **International Data Transfers**: Mention if data is stored/processed outside of Mauritius.
10. **Children's Privacy**: State that the service is not intended for children under 18.
11. **Changes to This Privacy Policy**: Explain how users will be notified of changes.
12. **Contact Us**: Provide a clear way for users to ask questions about the policy.

Produce the output as a single Markdown string in the required JSON format.`,
});

const generatePrivacyPolicyFlow = ai.defineFlow(
  {
    name: 'generatePrivacyPolicyFlow',
    outputSchema: GeneratePrivacyPolicyOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    if (!output) {
      throw new Error('The AI model did not return a valid privacy policy.');
    }
    return output;
  }
);

export async function generatePrivacyPolicy(): Promise<GeneratePrivacyPolicyOutput> {
  const result = await generatePrivacyPolicyFlow();
  return result;
}
