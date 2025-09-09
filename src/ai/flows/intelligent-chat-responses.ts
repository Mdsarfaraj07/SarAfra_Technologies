'use server';

/**
 * @fileOverview Implements the Intelligent Chat Responses flow for the SarAfra Assist application.
 *
 * This file defines a Genkit flow that leverages an LLM to provide helpful and informative responses
 * to user queries about SarAfra Technologies' services.
 *
 * @interface IntelligentChatResponsesInput - Defines the input schema for the intelligentChatResponses function.
 * @interface IntelligentChatResponsesOutput - Defines the output schema for the intelligentChatResponses function.
 * @function intelligentChatResponses - The exported function that calls the intelligentChatResponsesFlow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const IntelligentChatResponsesInputSchema = z.object({
  userPrompt: z.string().describe('The user\u2019s query or message.'),
});
export type IntelligentChatResponsesInput = z.infer<typeof IntelligentChatResponsesInputSchema>;

const IntelligentChatResponsesOutputSchema = z.object({
  response: z.string().describe('The LLM-generated response to the user\u2019s query.'),
});
export type IntelligentChatResponsesOutput = z.infer<typeof IntelligentChatResponsesOutputSchema>;

export async function intelligentChatResponses(input: IntelligentChatResponsesInput): Promise<IntelligentChatResponsesOutput> {
  return intelligentChatResponsesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentChatResponsesPrompt',
  input: {schema: IntelligentChatResponsesInputSchema},
  output: {schema: IntelligentChatResponsesOutputSchema},
  prompt: `You are a virtual assistant for SarAfra Technologies, a premium digital and software agency.  Provide friendly and concise answers to user questions. If you cannot find the answer, politely state that you can't provide that information and suggest they book a consultation.

User Query: {{{userPrompt}}}`, // Ensure correct Handlebars syntax
});

const intelligentChatResponsesFlow = ai.defineFlow(
  {
    name: 'intelligentChatResponsesFlow',
    inputSchema: IntelligentChatResponsesInputSchema,
    outputSchema: IntelligentChatResponsesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
