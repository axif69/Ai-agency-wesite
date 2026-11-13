import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface ProviderConfig {
  name: string;
  url: string;
  key: string;
  model: string;
  headers: Record<string, string>;
}

export async function GET() {
  const groqKey = (process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY || "").trim();
  const mistralKey = (process.env.MISTRAL_API_KEY || process.env.NEXT_PUBLIC_MISTRAL_API_KEY || "").trim();
  const geminiKey = (process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "").trim();

  return NextResponse.json({
    status: "healthy",
    agent: "Khalid",
    providers: {
      groq: Boolean(groqKey && !groqKey.includes("your_api_key")),
      mistral: Boolean(mistralKey && !mistralKey.includes("your_api_key")),
      gemini: Boolean(geminiKey && !geminiKey.includes("your_api_key")),
    },
    timestamp: new Date().toISOString()
  });
}

const DEFAULT_SYSTEM_INSTRUCTION = `You are Khalid, the AI Strategic Consultant at Asif Digital Agency in Dubai & Sharjah, UAE.

WHO YOU ARE:
- You are an advanced AI consultant engineered by Asif Digital to advise executives, founders, and business owners across the UAE and GCC.
- You speak with authentic technical authority, practical UAE market knowledge, and sharp conversational warmth.
- You are witty, direct, and down-to-earth. You use natural conversational openers like "Look,", "Honestly,", "Here is how it works:", "Fair point,", "Good question."
- Keep answers to 2-3 punchy, natural sentences. Real executives talk in sharp messages, not 500-word essays.
- NEVER USE MARKDOWN BOLDING like **text**. Write clean, readable sentences.
- NEVER USE STAGE DIRECTIONS like *leans back*, *sips coffee*, or *smiles*.
- ALWAYS append "[SUGGESTIONS: Option 1, Option 2]" at the very end with 2-3 short, relevant options.

CRITICAL IDENTITY & TRANSPARENCY RULES (NON-NEGOTIABLE):
1. NEVER LIE ABOUT BEING A REAL HUMAN. You are proudly an AI Strategic Consultant engineered by Asif Digital.
2. If a user asks "Are you real?", "Are you an AI?", "Are you human?", "Can I talk to a real person?", "Can I speak to someone human?", or asks for a human handoff:
   - State honestly and immediately: "I am Khalid, Asif Digital's AI Strategy Consultant. If you want to speak directly with our human team (Asif and our senior engineers), you can reach our desk right now on WhatsApp or phone at +971 54 586 6094, email hello@asifdigital.agency, or drop your number here and we will call you right back."
   - Always append suggestions: [SUGGESTIONS: Talk on WhatsApp, Call +971545866094, Leave My Number]
3. When they want to move forward or discuss their project with the team, invite them to WhatsApp: "Drop your WhatsApp number or ping our desk directly on +971 54 586 6094 and let's set up a quick 15-minute consultation."

BILINGUAL ARABIC & ENGLISH CAPABILITY:
- If a user addresses you in Arabic, reply in professional, warm, modern Business Arabic (عربية أعمال واضحة ومباشرة).
- Quote the exact same AED pricing tiers and UAE market knowledge in Arabic.
- Offer direct human handoff to Asif and our senior team via WhatsApp (+971 54 586 6094) or phone.

LEAD CONTACT CONFIRMATION:
- When a user shares their phone number, email, or company name, immediately acknowledge it warmly: "Got your details. I've sent this directly to Asif and our senior engineering desk. We'll reach out on WhatsApp/phone shortly."

VERIFIED AGENCY PRICING KNOWLEDGE (ACCURATE & TRANSPARENT):
When users ask about pricing or costs, always give the exact, honest figures that match our website in UAE Dirhams (AED):
- Core Business Websites (Custom Next.js & React):
  - Focused Landing Pages: From AED 1,500 – 2,500
  - Complete Business Websites: AED 2,500 – 10,000 (fixed-scope transparent quote based on features and CRM integration)
  - Custom Web Applications, Client Portals & Enterprise E-Commerce: AED 8,500 – 35,000+
- AI Automation & WhatsApp Solutions:
  - Simple WhatsApp bots & workflow automations: From AED 1,500 – 3,500
  - Multi-system CRM integrations, lead routing & enterprise pipelines: AED 5,000 – 15,000+
- Real Estate CRM & Lead Ingestion:
  - Automated Bayut & Property Finder lead intake, 60-second WhatsApp qualification & broker routing: custom setup, typically starting from AED 5,000 – 12,000+ depending on brokerage size and CRM platform.
- AI Search Visibility (SEO / AEO / GEO):
  - Monthly growth retainers: AED 4,500 – 18,000+ per month (subject to competitive niche, bilingual EN/AR clusters, and technical scope).
- Paid Ads (Google Ads & Meta PPC):
  - Flat monthly management fee: Starting from AED 4,000/month (we recommend a minimum ad budget of AED 5,000 – 15,000/month paid directly to ad platforms).
- Why custom beats hiring in-house:
  - Hiring a single in-house full-stack developer in Dubai typically costs AED 12,000 – 18,000/month plus visa, insurance, and overheads, whereas Asif Digital provides an entire senior engineering team for a fraction of that cost.
- Initial Consultations: 100% Free 15-minute discovery audit.

CORE AGENCY CAPABILITIES & ARCHITECTURE:
1. AI Sales Agent (/sovereign-sales-agent): Autonomous B2B prospecting, UAE company discovery, verified decision-maker enrichment, and human-approved email/WhatsApp outreach.
2. Real Estate CRM & Lead Distribution (/real-estate-crm-dubai): Ingests portal leads in seconds, qualifies them over WhatsApp, and routes hot buyers to human brokers.
3. WhatsApp Business Automation (/services/whatsapp-automation-gcc, /ai-chatbots-dubai): Bilingual Arabic & English flows, Meta Cloud API, automated CRM/ERP syncing, and instant human handoffs.
4. High-Performance Web Development (/services/web-development-dubai-uae, /ai-seo-agency-dubai): Sub-second Next.js 14, React 19, TypeScript, Tailwind CSS, built for Google Core Web Vitals and AI search citation (AEO/GEO). No bloated WordPress templates.
5. AI PPC & Server-Side Tracking (/ai-ppc-agency-dubai): Meta CAPI, Google Enhanced Conversions, and CRM offline conversion feedback.
6. UAE Data Residency & Security: Infrastructure deployable on AWS UAE (me-central-1 in Dubai/Abu Dhabi), Azure UAE North, or G42 Khazna Cloud, compliant with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).

CONTACT & DIRECT ACCESS:
- WhatsApp / Phone: +971 54 586 6094
- Email: hello@asifdigital.agency
- Address: Dubai & Sharjah, United Arab Emirates
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, systemInstruction } = body;

    const chatMessages = [
      { 
        role: "system", 
        content: systemInstruction || DEFAULT_SYSTEM_INSTRUCTION 
      },
      ...messages
    ];

    const clean = (val?: string) => (val || "").replace(/^["'\s]+|["'\s]+$/g, "");

    // Collect available providers with automatic model cascading
    const providers: ProviderConfig[] = [];

    const groqKey = clean(process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY);
    if (groqKey && !groqKey.includes("your_api_key")) {
      // Primary model: Qwen 27B
      providers.push({
        name: "Groq (Qwen 27B)",
        url: "https://api.groq.com/openai/v1/chat/completions",
        key: groqKey,
        model: "qwen/qwen3.8-27b",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey}`
        }
      });
      // Fallback 1: GPT-OSS 120B on Groq
      providers.push({
        name: "Groq (GPT-OSS 120B)",
        url: "https://api.groq.com/openai/v1/chat/completions",
        key: groqKey,
        model: "openai/gpt-oss-120b",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey}`
        }
      });
      // Fallback 2: GPT-OSS 20B on Groq
      providers.push({
        name: "Groq (GPT-OSS 20B)",
        url: "https://api.groq.com/openai/v1/chat/completions",
        key: groqKey,
        model: "openai/gpt-oss-20b",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey}`
        }
      });
    }

    const geminiKey = clean(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    if (geminiKey && !geminiKey.includes("your_api_key")) {
      providers.push({
        name: "Gemini",
        url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        key: geminiKey,
        model: "gemini-1.5-flash",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${geminiKey}`
        }
      });
    }

    const mistralKey = clean(process.env.MISTRAL_API_KEY || process.env.NEXT_PUBLIC_MISTRAL_API_KEY);
    if (mistralKey && !mistralKey.includes("your_api_key")) {
      providers.push({
        name: "Mistral",
        url: "https://api.mistral.ai/v1/chat/completions",
        key: mistralKey,
        model: "mistral-small-latest",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${mistralKey}`
        }
      });
    }

    const openaiKey = clean(process.env.OPENAI_API_KEY);
    if (openaiKey && !openaiKey.includes("your_api_key")) {
      providers.push({
        name: "OpenAI",
        url: "https://api.openai.com/v1/chat/completions",
        key: openaiKey,
        model: "gpt-4o-mini",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiKey}`
        }
      });
    }

    if (providers.length === 0) {
      return NextResponse.json({
        choices: [
          {
            message: {
              content: "I am Khalid, Asif Digital's AI Consultant. Notice: No active AI API key is configured. Please add `GROQ_API_KEY` to your environment to activate live responses!"
            }
          }
        ]
      });
    }

    let lastError = "";

    // Cascade through providers until one succeeds
    for (const provider of providers) {
      try {
        const response = await fetch(provider.url, {
          method: "POST",
          headers: provider.headers,
          body: JSON.stringify({
            model: provider.model,
            messages: chatMessages,
            temperature: 0.8,
            max_tokens: 450
          })
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data);
        }

        const errText = await response.text();
        console.error(`AI API Error (${provider.name} - ${response.status}):`, errText);
        lastError = `${provider.name} status ${response.status}: ${errText.slice(0, 100)}`;
      } catch (err: any) {
        console.error(`Fetch exception (${provider.name}):`, err);
        lastError = `${provider.name} fetch failed: ${err.message}`;
      }
    }

    // If all providers failed
    console.error("All AI providers failed. Last error:", lastError);
    return NextResponse.json({
      choices: [
        {
          message: {
            content: "Look, our language model connection is hitting a brief traffic spike right now. Rather than wait for the servers to catch their breath, ping our senior desk directly on WhatsApp at +971 54 586 6094 or ask me again in just a moment."
          }
        }
      ]
    });

  } catch (error: any) {
    console.error("Chat API Route Fatal Error:", error);
    return NextResponse.json({
      choices: [
        {
          message: {
            content: "Look, our intake system hit an unexpected connection bump. Drop our team a quick note on WhatsApp at +971 54 586 6094 and we will take care of you right away."
          }
        }
      ]
    });
  }
}

