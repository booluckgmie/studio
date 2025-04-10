// src/ai/flows/generate-access-code.ts
'use server';
/**
 * @fileOverview Flow for generating and sending a unique access code to a user's email.
 *
 * - generateAccessCode - A function that generates and sends an access code.
 * - GenerateAccessCodeInput - The input type for the generateAccessCode function.
 * - GenerateAccessCodeOutput - The return type for the generateAccessCode function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {sendEmail, Email} from '@/services/email';

const GenerateAccessCodeInputSchema = z.object({
  email: z.string().email().describe('The email address to send the access code to.'),
});
export type GenerateAccessCodeInput = z.infer<typeof GenerateAccessCodeInputSchema>;

const GenerateAccessCodeOutputSchema = z.object({
  accessCode: z.string().describe('The generated access code.'),
  emailSent: z.boolean().describe('Whether the email was sent successfully.'),
});
export type GenerateAccessCodeOutput = z.infer<typeof GenerateAccessCodeOutputSchema>;

export async function generateAccessCode(input: GenerateAccessCodeInput): Promise<GenerateAccessCodeOutput> {
  return generateAccessCodeFlow(input);
}

const generateAccessCodePrompt = ai.definePrompt({
  name: 'generateAccessCodePrompt',
  input: {
    schema: z.object({
      email: z.string().email().describe('The email address to send the access code to.'),
    }),
  },
  output: {
    schema: z.object({
      accessCode: z.string().describe('The generated access code.'),
    }),
  },
  prompt: `You are an access code generator.  Generate a unique, secure access code to send to the user.

  Email: {{{email}}}

  The access code should be a 6-digit number.
  Respond with JSON.`,
});

const generateAccessCodeFlow = ai.defineFlow<
  typeof GenerateAccessCodeInputSchema,
  typeof GenerateAccessCodeOutputSchema
>({
  name: 'generateAccessCodeFlow',
  inputSchema: GenerateAccessCodeInputSchema,
  outputSchema: GenerateAccessCodeOutputSchema,
},
async input => {
  const {output} = await generateAccessCodePrompt(input);

  const accessCode = output!.accessCode;

  let emailSent = false;
  try {
    const email: Email = {
      to: input.email,
      subject: 'Your Access Code',
      body: `Your access code is: ${accessCode}`,
    };
    await sendEmail(email);
    emailSent = true;
  } catch (e) {
    console.error('Failed to send email', e);
    emailSent = false;
  }

  return {
    accessCode: accessCode,
    emailSent: emailSent,
  };
});

