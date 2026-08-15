import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, systemInstruction, model } = body;
    
    // Check for Mistral API Key or Groq API Key
    const mistralKey = process.env.MISTRAL_API_KEY || process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
    const groqKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

    let apiKey = mistralKey || groqKey;
    let isMistral = !!mistralKey || (apiKey ? apiKey.trim().startsWith("mistral") : false);

    if (!apiKey || apiKey.trim() === "" || apiKey.includes("your_api_key")) {
      return NextResponse.json({
        choices: [
          {
            message: {
              content: "I am Khalid, Asif Digital's AI Consultant. Notice: The server is missing a valid API key in `.env.local`. Please update `.env.local` with `MISTRAL_API_KEY` or `GROQ_API_KEY` to enable live AI responses!"
            }
          }
        ]
      });
    }

    const API_URL = isMistral
      ? "https://api.mistral.ai/v1/chat/completions"
      : "https://api.groq.com/openai/v1/chat/completions";

    // Enforce valid model for the chosen API provider
    let requestedModel = isMistral ? "mistral-small-latest" : (model || "llama-3.3-70b-versatile");

    const chatMessages = [
      { role: "system", content: systemInstruction || "You are Khalid, AI Consultant for Asif Digital Agency in Dubai." },
      ...messages
    ];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: requestedModel,
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      let err;
      try {
        err = JSON.parse(errText);
      } catch (e) {
        err = { message: "Failed to parse API error", details: errText };
      }

      console.error("AI API Error:", response.status, err);

      if (err?.error?.code === "invalid_api_key" || response.status === 401) {
        return NextResponse.json({
          choices: [
            {
              message: {
                content: "I am Khalid, Asif Digital's AI Consultant. Notice: The configured API key in `.env.local` is invalid or expired. Please update `.env.local` with a fresh key to activate live chat!"
              }
            }
          ]
        });
      }

      // Return friendly response choice rather than 500/401 error object to keep UI smooth
      return NextResponse.json({
        choices: [
          {
            message: {
              content: "I am Khalid, Asif Digital's AI Consultant. How can I assist you with WhatsApp AI, web design, or sales automation today?"
            }
          }
        ]
      });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json({
      choices: [
        {
          message: {
            content: "I am Khalid, Asif Digital's AI Consultant. How can I assist you with WhatsApp AI, web design, or sales automation today?"
          }
        }
      ]
    });
  }
}
