import nodemailer from 'nodemailer';
import Imap from 'node-imap';
import { loadSystemConfig } from './config_manager.js';
import { decryptLocalSecret } from './crypto_utils.js';

export async function createSmtpTransporter(config) {
  const host = config.SMTP_HOST || config.smtp_host || 'smtp.gmail.com';
  const rawPort = config.SMTP_PORT || config.smtp_port || '587';
  const port = parseInt(String(rawPort), 10);

  // Port 465 = Implicit SSL (secure: true)
  // Port 587 / 25 = Explicit STARTTLS (secure: false)
  const secure = port === 465 ? true : (port === 587 ? false : (config.SMTP_SECURE === 'true' || config.smtp_secure === 'true'));

  const user = config.EMAIL_USER || config.email_user || config.email || '';
  let pass = config.GMAIL_APP_PASS || config.gmail_app_pass || config.gmail_pass || config.SMTP_PASS || config.SMTP_PASSWORD || '';

  if (pass && pass.startsWith('enc_v1:')) {
    pass = decryptLocalSecret(pass);
  }

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
}

/**
 * UNIVERSAL IMAP SENT FOLDER SYNCHRONIZATION
 * Appends the exact RFC822 raw email to the IMAP 'Sent' folder across all providers:
 * Hostinger, Gmail, Outlook/Office365, Yahoo, cPanel, Custom Mail.
 */
export async function appendToImapSent(config, rawEmailBuffer) {
  return new Promise((resolve) => {
    try {
      const user = config.EMAIL_USER || config.email_user || config.email || '';
      let pass = config.GMAIL_APP_PASS || config.gmail_app_pass || config.gmail_pass || config.SMTP_PASS || config.SMTP_PASSWORD || '';
      if (pass && pass.startsWith('enc_v1:')) {
        pass = decryptLocalSecret(pass);
      }

      if (!user || !pass) {
        resolve(false);
        return;
      }

      const smtpHost = config.SMTP_HOST || config.smtp_host || 'smtp.gmail.com';
      let imapHost = smtpHost.replace(/^smtp\./i, 'imap.');
      if (smtpHost.includes('office365') || smtpHost.includes('outlook')) {
        imapHost = 'outlook.office365.com';
      }

      const imap = new Imap({
        user: user,
        password: pass,
        host: imapHost,
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 8000
      });

      imap.once('ready', () => {
        imap.getBoxes((err, boxes) => {
          let targetFolder = 'Sent';

          if (boxes) {
            // Find folder matching \Sent attribute or 'Sent' in key name
            const findSentFolder = (obj, parentPath = '') => {
              for (const key of Object.keys(obj)) {
                const box = obj[key];
                const fullPath = parentPath ? `${parentPath}${box.delimiter || '/'}${key}` : key;
                const attribs = box.attribs || [];
                if (attribs.includes('\\Sent') || key.toLowerCase() === 'sent' || key.toLowerCase() === 'sent items' || key.toLowerCase() === 'sent messages') {
                  return fullPath;
                }
                if (box.children) {
                  const child = findSentFolder(box.children, fullPath);
                  if (child) return child;
                }
              }
              return null;
            };

            const detected = findSentFolder(boxes);
            if (detected) targetFolder = detected;
          }

          imap.openBox(targetFolder, false, (openErr) => {
            const folderToUse = openErr ? 'Sent' : targetFolder;
            imap.append(rawEmailBuffer, { mailbox: folderToUse, flags: ['\\Seen'] }, (appendErr) => {
              imap.end();
              if (appendErr) {
                console.warn(`  ⚠️ [IMAP SENT COPY] Failed to append to ${folderToUse}:`, appendErr.message);
                resolve(false);
              } else {
                console.log(`  ✅ [IMAP SENT COPY] Email successfully saved to '${folderToUse}' folder!`);
                resolve(true);
              }
            });
          });
        });
      });

      imap.once('error', (err) => {
        console.warn(`  ⚠️ [IMAP SENT COPY] IMAP connection warning:`, err.message);
        resolve(false);
      });

      imap.connect();
    } catch (e) {
      console.warn(`  ⚠️ [IMAP SENT COPY] Exception:`, e.message);
      resolve(false);
    }
  });
}

export async function sendOutreachEmail(arg1, arg2, arg3) {
  try {
    let transporter;
    let options;
    let config;

    if (typeof arg1 === 'string') {
      config = await loadSystemConfig();
      transporter = await createSmtpTransporter(config);
      if (!transporter) {
        return { success: false, error: 'SMTP credentials missing in Settings' };
      }
      const user = config.EMAIL_USER || config.email_user || config.email || '';
      const repName = config.REPRESENTATIVE_NAME || config.representative_name || config.rep_name || 'Asif Khan';
      options = {
        from: `"${repName}" <${user}>`,
        to: arg1,
        bcc: user,
        subject: arg2,
        text: arg3,
        html: `<div style="font-family: sans-serif; font-size: 15px; line-height: 1.6;">${String(arg3 || '').replace(/\n/g, '<br/>')}</div>`
      };
    } else {
      transporter = arg1;
      options = arg2;
      config = await loadSystemConfig();
    }

    if (!transporter || typeof transporter.sendMail !== 'function') {
      return { success: false, error: 'Invalid mail transporter' };
    }

    const info = await transporter.sendMail(options);

    // === UNIVERSAL IMAP SENT FOLDER COPY ===
    // Asynchronously appends the RFC822 raw message into the IMAP Sent folder
    // so it shows up in Hostinger Webmail, Gmail Sent, Outlook Sent, etc.
    try {
      const MailComposer = (await import('nodemailer/lib/mail-composer/index.js')).default;
      const comp = new MailComposer(options);
      const rawBuffer = await comp.compile().build();
      await appendToImapSent(config, rawBuffer);
    } catch (imapErr) {
      // Non-blocking: even if IMAP append fails, the SMTP email was delivered!
      console.warn('  ℹ️ [IMAP SENT COPY] Non-critical background append warning:', imapErr.message);
    }

    return { success: true, messageId: info.messageId, response: info.response, sender: options.from, status: 'delivered' };
  } catch (err) {
    console.error('[SMTP Delivery Error]', err.message);
    return { success: false, error: err.message };
  }
}

export const sendEmail = sendOutreachEmail;
