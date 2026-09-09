import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// In-memory deduplication cache (prevents duplicate spam within 10 minutes)
const recentLeadsCache = new Map<string, number>();

function isDuplicate(key: string): boolean {
  const now = Date.now();
  const lastTime = recentLeadsCache.get(key);
  if (lastTime && now - lastTime < 10 * 60 * 1000) {
    return true;
  }
  recentLeadsCache.set(key, now);
  // Clean up old entries
  if (recentLeadsCache.size > 500) {
    for (const [k, time] of recentLeadsCache.entries()) {
      if (now - time > 10 * 60 * 1000) recentLeadsCache.delete(k);
    }
  }
  return false;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contact, name, service, transcript, page } = body;

    const cleanContact = String(contact || '').trim();
    if (!cleanContact || cleanContact.length < 5) {
      return NextResponse.json({ error: 'Valid contact is required' }, { status: 400 });
    }

    const leadKey = `${cleanContact.toLowerCase()}_${page || ''}`;
    if (isDuplicate(leadKey)) {
      return NextResponse.json({ success: true, deduplicated: true });
    }

    const timestampStr = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Dubai',
      dateStyle: 'medium',
      timeStyle: 'short'
    }) + ' GST';

    // Format chat history string
    let formattedHistory = '';
    if (Array.isArray(transcript)) {
      formattedHistory = transcript
        .slice(-8)
        .map((m: any) => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text || m.content || ''}`)
        .join('\n');
    } else if (typeof transcript === 'string') {
      formattedHistory = transcript.slice(0, 2000);
    }

    // 1. DISPATCH TO TELEGRAM
    const tgToken = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
    const tgChatId = (process.env.TELEGRAM_CHAT_ID || '').trim();

    const cleanPhoneDigits = cleanContact.replace(/[^0-9]/g, '');
    const waQuickLink = cleanPhoneDigits.length >= 8 ? `https://wa.me/${cleanPhoneDigits}` : '';

    const tgMessage = [
      '🔥 <b>NEW QUALIFIED LEAD FROM KHALID AI</b>',
      '',
      `📱 <b>Contact:</b> <code>${cleanContact}</code>`,
      name ? `👤 <b>Name:</b> ${name}` : '',
      service ? `💼 <b>Interest:</b> ${service}` : '',
      `🌐 <b>Source Page:</b> <code>${page || '/'}</code>`,
      `⏰ <b>Time:</b> ${timestampStr}`,
      waQuickLink ? `\n⚡ <b>Quick WhatsApp:</b> <a href="${waQuickLink}">Click to Chat</a>` : '',
      '',
      '💬 <b>Recent Conversation:</b>',
      `<pre>${formattedHistory || cleanContact}</pre>`
    ].filter(Boolean).join('\n');

    const telegramPromise = fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: tgChatId,
        text: tgMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    }).catch(err => console.error('Telegram dispatch error:', err));

    // 2. DISPATCH TO WEB3FORMS (EMAIL)
    const web3Key = (process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '3fcd0399-3b92-41b4-b3f4-1d8160e70686').trim();
    
    const formData = new FormData();
    formData.append('access_key', web3Key);
    formData.append('name', name || 'Website Visitor (Khalid Chat)');
    formData.append('email', cleanContact.includes('@') ? cleanContact : 'khalid-lead@asifdigital.agency');
    formData.append('phone', cleanContact);
    formData.append('subject', `🔥 New Khalid Lead: ${cleanContact} on ${page || '/'}`);
    formData.append('from_name', 'Khalid AI Assistant');
    formData.append('message', [
      `Source Page: ${page || '/'}`,
      `Captured At: ${timestampStr}`,
      `Contact: ${cleanContact}`,
      `Interest: ${service || 'Strategic AI Solutions'}`,
      '--- Chat History ---',
      formattedHistory
    ].join('\n\n'));

    const emailPromise = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Origin': 'https://www.asifdigital.agency',
        'Referer': 'https://www.asifdigital.agency'
      },
      body: formData
    }).catch(err => console.error('Web3Forms dispatch error:', err));

    // 3. OPTIONAL CUSTOM WEBHOOK
    const webhookUrl = (process.env.LEAD_WEBHOOK_URL || '').trim();
    let webhookPromise: Promise<any> = Promise.resolve();
    if (webhookUrl) {
      webhookPromise = fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'khalid_chatbot',
          contact: cleanContact,
          name,
          service,
          page,
          transcript: formattedHistory,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error('Custom webhook dispatch error:', err));
    }

    // Run notifications concurrently
    await Promise.allSettled([telegramPromise, emailPromise, webhookPromise]);

    return NextResponse.json({ success: true, contact: cleanContact });
  } catch (error: any) {
    console.error('Lead Capture Route Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
