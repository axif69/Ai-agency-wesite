import { db } from './db';

export interface WebhookAlertPayload {
  event: 'lead_replied' | 'contact_verified' | 'batch_completed';
  timestamp: string;
  lead_id?: number;
  company_name?: string;
  contact_email?: string;
  sentiment?: string;
  message?: string;
}

/**
 * 🔔 Dispatches Webhook Alerts to Zapier / Make / Twilio / WhatsApp API
 */
export async function dispatchWebhookAlert(payload: WebhookAlertPayload): Promise<boolean> {
  return new Promise((resolve) => {
    db.get(`SELECT value FROM settings WHERE key = 'webhook_url'`, async (err, row: any) => {
      if (err || !row || !row.value || !row.value.trim()) {
        resolve(false);
        return;
      }

      const webhookUrl = row.value.trim();
      console.log(`[Alert Dispatcher] 🔔 Sending ${payload.event} alert payload to: ${webhookUrl}`);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (res.ok) {
          console.log(`[Alert Dispatcher] ✅ Webhook alert delivered successfully!`);
          resolve(true);
        } else {
          console.warn(`[Alert Dispatcher] ⚠️ Webhook returned HTTP status: ${res.status}`);
          resolve(false);
        }
      } catch (e: any) {
        console.error(`[Alert Dispatcher] ❌ Webhook dispatch error: ${e.message}`);
        resolve(false);
      }
    });
  });
}

/**
 * 🟢 Generates direct WhatsApp click-to-chat URL
 */
export function generateWhatsAppDirectUrl(phoneNumber: string, companyName: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(`Hi! Following up regarding ${companyName}...`);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
