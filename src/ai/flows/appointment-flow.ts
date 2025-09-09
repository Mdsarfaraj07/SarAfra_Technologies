'use server';

/**
 * @fileOverview A Genkit flow for handling appointment submissions.
 *
 * This file exports:
 * - `handleAppointment`: An async function that takes appointment details and sends a notification email.
 * - `AppointmentInput`: The input type for the handleAppointment function.
 * - `AppointmentOutput`: The output type for the handleAppointment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {Resend} from 'resend';

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

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // This must be a verified domain on Resend
        to: 'mdsarfaraj9886@gmail.com',
        subject: `New Appointment from ${input.name}`,
        html: `
          <h1>New Appointment Request</h1>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Message:</strong></p>
          <p>${input.message}</p>
        `,
      });
      return {
        success: true,
        message: 'Appointment request received successfully.',
      };
    } catch (error) {
      console.error('Failed to send email:', error);
      // Decide if the user should know about the email failure.
      // For now, we'll still tell the user it was successful, but log the error.
      return {
        success: false, // Or true, depending on desired user experience
        message: 'Your appointment request was received, but we encountered an issue sending a notification. We will still get back to you.',
      };
    }
  }
);
