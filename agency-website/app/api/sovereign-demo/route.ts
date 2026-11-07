import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// In-memory deduplication cache (prevents duplicate spam within 10 minutes)
const recentDemoLeadsCache = new Map<string, number>();

function isDuplicate(key: string): boolean {
  const now = Date.now();
  const lastTime = recentDemoLeadsCache.get(key);
  if (lastTime && now - lastTime < 10 * 60 * 1000) {
    return true;
  }
  recentDemoLeadsCache.set(key, now);
  if (recentDemoLeadsCache.size > 500) {
    for (const [k, time] of recentDemoLeadsCache.entries()) {
      if (now - time > 10 * 60 * 1000) recentDemoLeadsCache.delete(k);
    }
  }
  return false;
}

export async function POST(req: Request) {
  try {
    // 1. Strict request-body size limit (~64 KB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 65536) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
    }

    const rawBody = await req.text();
    if (rawBody.length > 65536) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
    }

    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    const { name, email, company, role, challenge, message, botcheck } = body;

    // 2. Spam honeypot check
    if (botcheck) {
      return NextResponse.json({ success: true, spam_filtered: true });
    }

    // 3. Sanitisation & Maximum Length Checks
    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanCompany = String(company || '').trim();
    const cleanRole = String(role || '').trim();
    const cleanChallenge = String(challenge || '').trim();
    const cleanMessage = String(message || '').trim();

    if (!cleanName || !cleanEmail || !cleanCompany || !cleanRole || !cleanChallenge) {
      return NextResponse.json(
        { error: 'All marked fields are required.' },
        { status: 400 }
      );
    }

    if (
      cleanName.length > 100 ||
      cleanEmail.length > 120 ||
      cleanCompany.length > 120 ||
      cleanRole.length > 100 ||
      cleanChallenge.length > 150 ||
      cleanMessage.length > 1000
    ) {
      return NextResponse.json(
        { error: 'Submitted field lengths exceed permitted limits.' },
        { status: 400 }
      );
    }

    // 4. Email syntax validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid business email address.' },
        { status: 400 }
      );
    }

    // 5. Duplicate prevention
    const leadKey = `${cleanEmail}_${cleanCompany.toLowerCase()}`;
    if (isDuplicate(leadKey)) {
      return NextResponse.json({ success: true, deduplicated: true });
    }

    const timestampStr =
      new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dubai',
        dateStyle: 'medium',
        timeStyle: 'short',
      }) + ' GST';

    // 6. Telegram Dispatch with 5-Second Timeout & Safe Failure Handling
    const tgToken = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
    const tgChatId = (process.env.TELEGRAM_CHAT_ID || '').trim();

    const tgMessage = [
      '👑 <b>NEW SOVEREIGN AI SALES AGENT DEMO REQUEST</b>',
      '',
      `👤 <b>Name:</b> ${cleanName}`,
      `🏢 <b>Company:</b> ${cleanCompany}`,
      `💼 <b>Role:</b> ${cleanRole}`,
      `✉️ <b>Email:</b> <code>${cleanEmail}</code>`,
      `🎯 <b>Challenge:</b> ${cleanChallenge}`,
      cleanMessage ? `📝 <b>Context:</b> ${cleanMessage}` : '',
      `⏰ <b>Time:</b> ${timestampStr}`,
      `🌐 <b>Source:</b> <code>/sovereign-sales-agent</code>`,
    ]
      .filter(Boolean)
      .join('\n');

    let telegramPromise: Promise<boolean> = Promise.resolve(false);
    if (tgToken && tgChatId) {
      telegramPromise = fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: tgMessage,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(5000),
      })
        .then((res) => {
          if (!res.ok) console.error('Telegram dispatch non-200 status code:', res.status);
          return res.ok;
        })
        .catch((err) => {
          console.error('Telegram dispatch failure:', err.name || 'UnknownError');
          return false;
        });
    }

    // 7. Web3Forms Dispatch with 5-Second Timeout & Safe Failure Handling
    const web3Key = (process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '').trim();
    let web3Promise: Promise<boolean> = Promise.resolve(false);
    if (web3Key) {
      const formPayload = new FormData();
      formPayload.append('access_key', web3Key);
      formPayload.append('name', cleanName);
      formPayload.append('email', cleanEmail);
      formPayload.append('subject', `👑 Sovereign Demo Request: ${cleanCompany} (${cleanName})`);
      formPayload.append('from_name', 'Sovereign Early Access');
      formPayload.append(
        'message',
        [
          `Name: ${cleanName}`,
          `Company: ${cleanCompany}`,
          `Role: ${cleanRole}`,
          `Email: ${cleanEmail}`,
          `Primary Challenge: ${cleanChallenge}`,
          `Context: ${cleanMessage || 'N/A'}`,
          `Captured At: ${timestampStr}`,
          `Source Page: /sovereign-sales-agent`,
        ].join('\n\n')
      );

      web3Promise = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Origin: 'https://www.asifdigital.agency',
          Referer: 'https://www.asifdigital.agency',
        },
        body: formPayload,
        signal: AbortSignal.timeout(5000),
      })
        .then((res) => {
          if (!res.ok) console.error('Web3Forms dispatch non-200 status code:', res.status);
          return res.ok;
        })
        .catch((err) => {
          console.error('Web3Forms dispatch failure:', err.name || 'UnknownError');
          return false;
        });
    }

    // 8. Delivery Verification
    const [tgSettled, web3Settled] = await Promise.allSettled([telegramPromise, web3Promise]);
    const tgSuccess = tgSettled.status === 'fulfilled' && tgSettled.value === true;
    const web3Success = web3Settled.status === 'fulfilled' && web3Settled.value === true;

    const servicesConfigured = Boolean((tgToken && tgChatId) || web3Key);

    // If neither gateway is configured: return HTTP 503 Service Unavailable
    if (!servicesConfigured) {
      return NextResponse.json(
        { error: 'Notification service is currently unconfigured. Please contact us directly via email or phone.' },
        { status: 503 }
      );
    }

    // If both configured gateways fail: return HTTP 502 Bad Gateway
    if (!tgSuccess && !web3Success) {
      return NextResponse.json(
        { error: 'Notification delivery failed across all available dispatch gateways. Please contact us directly via email or phone.' },
        { status: 502 }
      );
    }

    // At least one notification gateway succeeded: return HTTP 200 OK
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Sovereign Demo Route Exception:', error.name || 'InternalException');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
