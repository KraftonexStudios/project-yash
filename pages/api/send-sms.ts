import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { to, message, contactName } = req.body;

  if (!to || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // Send SMS using Fast2SMS
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: "q", // Quick SMS route
      message: message,
      numbers: to.replace(/[^0-9]/g, ''), // Remove non-numeric characters
    }, {
      headers: {
        'authorization': process.env.FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.return === true) {
      return res.status(200).json({
        success: true,
        message: `SMS sent successfully to ${contactName}`,
      });
    } else {
      throw new Error('SMS sending failed');
    }
  } catch (error) {
    console.error('SMS error:', error);
    return res.status(500).json({
      success: false,
      message: `Failed to send SMS to ${contactName}`,
    });
  }
} 