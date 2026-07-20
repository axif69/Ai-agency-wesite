import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TOOL_PROMPTS: Record<string, string> = {
  "website-grader": `You are a senior website, SEO and conversion auditor for Asif Digital in the UAE. Use only the supplied measurements. Return valid JSON with: summary (string, max 80 words), strengths (array of 2 short strings), priorities (array of exactly 3 objects with title, reason, action), and caveat (string). Never invent tests, rankings, traffic, revenue or benchmarks.`,
  "strategy-generator": `You are a senior UAE and GCC marketing strategist for Asif Digital. Build a focused 90-day strategy using only the supplied business inputs and classifications. Return valid JSON with: executiveSummary (string, max 120 words), strategicFocus (string), channelMix (array of 3-5 objects with channel, percentage integer, purpose; percentages must total 100), phases (object with days1to30, days31to60, days61to90; each an array of 3 short actions), contentPillars (array of 4 objects with name and example), kpis (array of 4 strings), avoid (array of 2 strings), nextAction (string), caveat (string). Do not invent competitor research, market statistics or guaranteed results.`,
  "ad-spend-analyzer": `You are a senior paid-media and measurement auditor for Asif Digital in the UAE. Use only the supplied metrics and diagnostic scores. Return valid JSON with: summary (string, max 100 words), priorities (array of exactly 4 objects with area, action, reason), measurementGaps (array of short strings), nextAction (string), caveat (string). Do not claim a platform is weak without platform-level evidence. Never invent industry benchmarks, conversions, revenue or wasted-spend figures.`,
};

function sanitize(value: unknown, depth = 0): unknown {
  if (depth > 4) return undefined;
  if (typeof value === "string") return value.slice(0, 1200);
  if (typeof value === "number" || typeof value === "boolean" || value === null) return value;
  if (Array.isArray(value)) return value.slice(0, 30).map((item) => sanitize(item, depth + 1));
  if (typeof value === "object" && value) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .slice(0, 60)
        .map(([key, item]) => [key.slice(0, 80), sanitize(item, depth + 1)])
    );
  }
  return undefined;
}

function extractJson(text: string) {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  return JSON.parse(cleaned);
}

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 20000) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }

    const body = JSON.parse(raw);
    const tool = typeof body.tool === "string" ? body.tool : "";
    const systemInstruction = TOOL_PROMPTS[tool];
    if (!systemInstruction) {
      return NextResponse.json({ error: "Unsupported tool." }, { status: 400 });
    }

    const groqKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
    if (!groqKey) {
      return NextResponse.json({ error: "AI report is temporarily unavailable." }, { status: 503 });
    }

    const facts = sanitize(body.facts);
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey.trim()}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        max_tokens: tool === "strategy-generator" ? 1900 : 1100,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: `Create the report from these verified inputs:\n${JSON.stringify(facts)}` },
        ],
      }),
      signal: AbortSignal.timeout(35000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "AI report is temporarily unavailable." }, { status: 502 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty AI response");

    return NextResponse.json({ report: extractJson(content) });
  } catch (error) {
    console.error("Tools report error:", error);
    return NextResponse.json({ error: "Unable to create the AI explanation." }, { status: 500 });
  }
}

