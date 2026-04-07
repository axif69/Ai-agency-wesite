import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (to: string, subject: string, body: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS
    }
  });

  const mailOptions = {
    from: `"Asif Khan" <${process.env.GMAIL_USER}>`,
    to: to,
    subject: subject,
    text: body,
    html: `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">
            ${body.replace(/\n/g, '<br>')}
           </div>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error: error.message };
  }
};
