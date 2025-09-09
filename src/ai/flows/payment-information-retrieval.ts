'use server';

/**
 * @fileOverview A Genkit flow for retrieving payment information based on user queries.
 *
 * This file exports:
 * - `getPaymentInformation`: An async function that takes a user query as input and returns payment information.
 * - `PaymentInformationInput`: The input type for the getPaymentInformation function.
 * - `PaymentInformationOutput`: The output type for the getPaymentInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PaymentInformationInputSchema = z.object({
  query: z
    .string()
    .describe('The user query regarding payment information.'),
});
export type PaymentInformationInput = z.infer<typeof PaymentInformationInputSchema>;

const PaymentInformationOutputSchema = z.object({
  paymentInformation: z
    .string()
    .describe('The retrieved payment information based on the user query.'),
});
export type PaymentInformationOutput = z.infer<typeof PaymentInformationOutputSchema>;

const getPaymentInformationTool = ai.defineTool({
  name: 'getPaymentInformation',
  description: 'Retrieves payment information such as previous invoices, account balance, or payment methods.',
  inputSchema: z.object({
    query: z.string().describe('The query to use when retrieving payment information')
  }),
  outputSchema: z.string(),
  async implementation(input) {
    // In a real application, this would fetch data from a database or payment gateway.
    // For this example, we'll return some dummy data.
    const now = new Date();
    const invoiceNumber = `INV-${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}-${Math.floor(Math.random() * 1000)}`;
    const balance = (Math.random() * 1000).toFixed(2);
    const paymentMethod = 'Visa **** **** **** 1234';
    const dummyData = `Here is some payment information:\nInvoice Number: ${invoiceNumber}\nAccount Balance: $${balance}\nPayment Method: ${paymentMethod}`;
    return dummyData;
  },
});

const paymentInformationPrompt = ai.definePrompt({
  name: 'paymentInformationPrompt',
  tools: [getPaymentInformationTool],
  input: {schema: PaymentInformationInputSchema},
  output: {schema: PaymentInformationOutputSchema},
  prompt: `You are a helpful assistant that retrieves payment information for users.
  Use the getPaymentInformation tool to retrieve the information, and then present it to the user in a clear and concise manner.

  User query: {{{query}}}
  `
});

const paymentInformationFlow = ai.defineFlow(
  {
    name: 'paymentInformationFlow',
    inputSchema: PaymentInformationInputSchema,
    outputSchema: PaymentInformationOutputSchema,
  },
  async input => {
    const {output} = await paymentInformationPrompt(input);
    return output!;
  }
);

export async function getPaymentInformation(input: PaymentInformationInput): Promise<PaymentInformationOutput> {
  return paymentInformationFlow(input);
}
