// netlify/functions/send-email.js
const { sendEmail } = require('/src/services/email');
const { generateRandomHash } = require('/src/lib/utils');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body);  // Assuming you send email in the request body
    if (!email) {
      return { statusCode: 400, body: 'Email is required' };
    }

    const passcode = generateRandomHash(6);

    await sendEmail({to: email,subject: 'Your Access Passcode',html: `<p>Your access passcode is: <strong>${passcode}</strong></p>`,});

    return { statusCode: 200, body: JSON.stringify({ message: 'Email sent successfully' }) };
  } catch (error) {
    console.error('Error sending email:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email' }) };
  }
};