import nodemailer from 'nodemailer';

/**
 * Represents an email message.
 */
export interface Email {
  /**
   * The recipient's email address.
   */
  to: string;
  /**
   * The HTML body of the email.
   */
  html?: string;
  /**
   * The subject of the email.
   */
  subject: string;
  /**
   * The body of the email.
   */
  body: string;
}

/**
 * Asynchronously sends an email message.
 *
 * @param email The email message to send.
 * @returns A promise that resolves when the email is sent successfully.
 */
export async function sendEmail({ to, subject, body, html }: Email): Promise<void> {
  if (typeof window === 'undefined') {
    // Only import and use nodemailer on the server-side
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'booluckgmie@gmail.com',
        pass: 'rmtzhqpwcjntriir',
      },
    });

    const mailOptions = {
      from: 'booluckgmie@gmail.com',
      to,
      subject,
      html: html || body,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email: ', error); // Log the entire error object
      throw new Error('Failed to send email');
    }
  } else {
    console.log('Sending emails is only supported on the server.');
  }
}
