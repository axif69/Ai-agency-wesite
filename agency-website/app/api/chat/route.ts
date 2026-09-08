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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, systemInstruction } = body;

    const chatMessages = [
      { 
        role: "system", 
        content: systemInstruction || "You are Khalid, Lead AI Architect and Senior Partner at Asif Digital Agency in Dubai. You are a real, sharp, charismatic human tech consultant having a direct conversation with an executive over coffee in Dubai. Speak like a real man with dry wit, subtle UAE humor, and deep technical authority. Keep answers punchy (2-3 sentences max). Never use markdown bolding like **text**. Always append [SUGGESTIONS: Option 1, Option 2] at the end." 
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

