'use server';
/**
 * @fileOverview An AI agent that answers questions about the Mauritian business landscape.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateChatResponseInputSchema = z.object({
  question: z.string().describe('The user\'s question.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The history of the conversation.'),
});

const GenerateChatResponseOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer.'),
});

export type GenerateChatResponseInput = z.infer<typeof GenerateChatResponseInputSchema>;
export type GenerateChatResponseOutput = z.infer<typeof GenerateChatResponseOutputSchema>;


export async function generateChatResponse(
  input: GenerateChatResponseInput
): Promise<GenerateChatResponseOutput> {
  const result = await generateChatResponseFlow(input);
  return result;
}

const prompt = ai.definePrompt({
    name: 'generateChatResponsePrompt',
    input: { schema: GenerateChatResponseInputSchema },
    output: { schema: GenerateChatResponseOutputSchema },
    prompt: `You are an expert chatbot specializing in the Mauritian business, SME, startup, and regulatory landscape. Your name is "Waspy".

Your purpose is to provide clear, accurate, and concise answers to user questions related to:
- Business registration and licensing in Mauritius.
- The Mauritian tax system (VAT, corporate tax, etc.).
- Government grants, schemes, and incentives for SMEs and startups (e.g., from SME Mauritius Ltd, DBM, MRIC).
- Corporate law and compliance requirements.
- Labor laws and employment regulations.
- Common challenges and opportunities for businesses in Mauritius.

**Conversation History:**
{{#each history}}
  **{{role}}**: {{content}}
{{/each}}

**User's new question:**
{{question}}

Based on this conversation and your knowledge base, provide a helpful answer. Be friendly but professional.
If the question is outside your scope of expertise, politely state that you can only answer questions about the StudioFlow AI app and the Mauritian business landscape.`,
});


const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: GenerateChatResponseOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    return output;
  }
);
