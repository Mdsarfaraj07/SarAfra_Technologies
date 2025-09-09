'use server';

/**
 * @fileOverview A Genkit flow for handling appointment submissions.
 *
 * This file exports:
 * - `handleAppointment`: An async function that takes appointment details and can be extended to send notifications.
 * - `AppointmentInput`: The input type for the handleAppointment function.
 * - `AppointmentOutput`: The output type for the handleAppointment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AppointmentInputSchema = z.object({
  name: z.string().describe("The user's name."),
  email: z.string().email().describe("The user's email address."),
  message: z.string().describe('The message or project details.'),
});
export type AppointmentInput = z.infer<typeof AppointmentInputSchema>;

const AppointmentOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type AppointmentOutput = z.infer<typeof AppointmentOutputSchema>;

export async function handleAppointment(input: AppointmentInput): Promise<AppointmentOutput> {
  return appointmentFlow(input);
}

const appointmentFlow = ai.defineFlow(
  {
    name: 'appointmentFlow',
    inputSchema: AppointmentInputSchema,
    outputSchema: AppointmentOutputSchema,
  },
  async (input) => {
    console.log('Received appointment request:', input);

    // TODO: Implement email sending logic here.
    // You can use a library like Nodemailer or an email API service (e.g., SendGrid, Resend).
    // Example using a placeholder function:
    // await sendEmail({
    //   to: 'mdsarfaraj9886@gmail.com',
    //   from: 'noreply@yourdomain.com',
    //   subject: `New Appointment from ${input.name}`,
    //   html: `
    //     <h1>New Appointment Request</h1>
    //     <p><strong>Name:</strong> ${input.name}</p>
    //     <p><strong>Email:</strong> ${input.email}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${input.message}</p>
    //   `,
    // });

    return {
      success: true,
      message: 'Appointment request received successfully.',
    };
  }
);
