import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, systemInstruction, model } = body;
    
    // Use standard server-side var or the public one the user accidentally set
    const groqKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

    if (!groqKey) {
      return NextResponse.json({ error: { message: "GROQ_API_KEY_MISSING" } }, { status: 401 });
    }

    const API_URL = "https://api.groq.com/openai/v1/chat/completions";

    const groqMessages = [
      { role: "system", content: systemInstruction },
      ...messages
    ];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqKey.trim()}`
      },
      body: JSON.stringify({
        model: model || "llama-3.3-70b-versatile",
        messages: groqMessages,
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
        err = { message: "Failed to parse Groq error", details: errText };
      }
      return NextResponse.json({ error: err.error || err }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json({ error: { message: error.message || "Internal Server Error" } }, { status: 500 });
  }
}
