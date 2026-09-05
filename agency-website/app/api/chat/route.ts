import { NextResponse } from 'next/server';

interface ProviderConfig {
  name: string;
  url: string;
  key: string;
  model: string;
  headers: Record<string, string>;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, systemInstruction } = body;

    const chatMessages = [
      { role: "system", content: systemInstruction || "You are Khalid, Lead AI Architect & Consultant for Asif Digital Agency in Dubai." },
      ...messages
    ];

    // Collect available providers
    const providers: ProviderConfig[] = [];

    const groqKey = (process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY || "").trim();
    if (groqKey && !groqKey.includes("your_api_key")) {
      providers.push({
        name: "Groq",
        url: "https://api.groq.com/openai/v1/chat/completions",
        key: groqKey,
        model: "llama-3.3-70b-versatile",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey}`
        }
      });
    }

    const geminiKey = (process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "").trim();
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

    const mistralKey = (process.env.MISTRAL_API_KEY || process.env.NEXT_PUBLIC_MISTRAL_API_KEY || "").trim();
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

    const openaiKey = (process.env.OPENAI_API_KEY || "").trim();
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
              content: "I am Khalid, Asif Digital's AI Consultant. Notice: No active AI API key is configured. Please add `GROQ_API_KEY`, `MISTRAL_API_KEY`, or `GEMINI_API_KEY` to `.env.local` and your Vercel deployment to activate live dynamic AI responses!"
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
            temperature: 0.7,
            max_tokens: 1024
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

    // If all providers failed (e.g. 429 rate limit exceeded)
    console.error("All AI providers failed. Last error:", lastError);
    return NextResponse.json({
      choices: [
        {
          message: {
            content: "I am Khalid, Asif Digital's AI Consultant. I am currently receiving an API rate limit notice (HTTP 429) from the language model provider. You can reach our senior strategist directly on WhatsApp at +971 54 586 6094 or try again in a few moments!"
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
            content: "I am Khalid, Asif Digital's AI Consultant. Please reach our direct WhatsApp desk at +971 54 586 6094 for immediate consultation."
          }
        }
      ]
    });
  }
}
