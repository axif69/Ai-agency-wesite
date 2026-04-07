import nodemailer from 'nodemailer';
import { loadSystemConfig } from './config_manager';

/**
 * Sovereign SMTP Service v3.0
 * ALL credentials are fetched from the database right before every send.
 * Zero .env reliance. Zero hardcoded values.
 */
export const sendEmail = async (to: string, subject: string, body: string, options?: { name?: string }) => {
  // CRITICAL: Fetch fresh credentials from DB for EVERY email
  const config = await loadSystemConfig();
  
  const user = config.email;
  const pass = config.gmail_pass;
  const displayName = options?.name || config.rep_name || config.company_name || "Outreach";
  
  if (!user || !pass) {
    console.error('❌ SMTP BLOCKED: No email/password configured in Dashboard Settings.');
    return { success: false, error: 'SMTP credentials not configured. Go to Dashboard > Settings.' };
  }
  
  // SMTP Configuration — fully dynamic from DB
  const host = config.smtp_host || 'smtp.gmail.com';
  const port = config.smtp_port || 587;
  const secure = config.smtp_secure || port === 465;

  const transporterOptions: any = {
    host: host,
    port: port,
    secure: secure,
    auth: { user, pass }
  };

  // Gmail shorthand
  if (host.includes('gmail.com')) {
      delete transporterOptions.host;
      delete transporterOptions.port;
      delete transporterOptions.secure;
      transporterOptions.service = 'gmail';
  }

  const transporter = nodemailer.createTransport(transporterOptions);

  const mailOptions = {
    from: `"${displayName}" <${user}>`,
    to: to,
    subject: subject,
    text: body,
    html: `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">
            ${body.replace(/\n/g, '<br>')}
           </div>`
  };

  // ─── VERIFICATION LOGGING ───
  console.log(`📧 ─── SMTP SEND ATTEMPT ───`);
  console.log(`   Active SMTP User: ${user}`);
  console.log(`   To: ${to}`);
  console.log(`   Subject: ${subject}`);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('   ✅ Email sent: ' + info.response);
    return { success: true };
  } catch (error: any) {
    console.error('   ❌ Email send failed:', error.message);
    return { success: false, error: error.message };
  }
};
