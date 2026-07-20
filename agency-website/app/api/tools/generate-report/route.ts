import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TOOL_PROMPTS: Record<string, string> = {
  "website-grader": `You are a senior website, SEO and conversion auditor for Asif Digital in the UAE. Use ONLY the supplied Google Lighthouse measurements and deterministic public-page checks. Return valid JSON with: summary (string, max 100 words, explicitly mention the tested URL and the two lowest verified areas), strengths (array of 2 short strings tied to evidence), priorities (array of exactly 4 objects with title, reason, action; the reason must quote a supplied score, metric or failed audit), and caveat (string). If Lighthouse is unavailable, say the audit is partial. Never invent tests, rankings, traffic, revenue or benchmarks.`,
  "strategy-generator": `You are a senior UAE and GCC marketing strategist for Asif Digital. This must be a genuinely personalized strategy, not a generic template. Use every supplied business input and classification. Return valid JSON with: executiveSummary (string, max 150 words, name the company/offer, market, objective, budget band, sales cycle and primary constraint), strategicFocus (string), inputEvidence (array of exactly 6 objects with input and implication), channelMix (array of 3-5 objects with channel, percentage integer, purpose and whyForThisBusiness; percentages must total 100), phases (object with days1to30, days31to60, days61to90; each an array of 4 specific actions), contentPillars (array of 4 objects with name, example and audienceIntent), kpis (array of 5 objects with metric and why), avoid (array of 3 strings specifically tied to budget/team/constraint), nextAction (string), caveat (string). Do not invent competitor research, market statistics, performance forecasts or guaranteed results. Avoid generic phrases that could apply to any company.`,
  "ad-spend-analyzer": `You are a senior paid-media and measurement auditor for Asif Digital in the UAE. Use ONLY the supplied imported/manual metrics, formulas and diagnostic answers. Return valid JSON with: summary (string, max 120 words that cites at least four supplied numerical metrics), evidenceUsed (array of 4-6 strings), priorities (array of exactly 4 objects with area, action, reason; each reason must cite a supplied number or missing field), measurementGaps (array of short strings), nextAction (string), caveat (string). Do not claim a platform is weak without platform-level evidence. Never invent industry benchmarks, conversions, revenue or wasted-spend figures.`,
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
