import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail, Email } from '@/services/email';
import { generateRandomHash } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Recipient email is required' });
      }

      const passcode = generateRandomHash(6);

      const emailParams: Email = {
        to: email,
        subject: 'Your Access Passcode',
        html: `<p>Your access passcode is: <strong>${passcode}</strong></p>`,
      };

      await sendEmail(emailParams);

      return res.status(200).json({ message: 'Passcode sent successfully' });
    } catch (error: any) {
      console.error('Error sending passcode:', error);
      return res.status(500).json({ error: 'Failed to send passcode', details: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}