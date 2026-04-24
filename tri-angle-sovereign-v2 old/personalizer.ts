import { Groq } from "groq-sdk";
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

export const personalizeOutreach = async (companyName: string, aboutText: string, tone: string = 'Professional & Bold', model: string = 'llama-3.3-70b-versatile', executiveName: string | null = null) => {
  // Clean company name - remove any remaining HTML entities
  const cleanCompanyName = companyName
    .replace(/&#8211;|&#8212;/g, '-')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();

  // Only call AI if we have meaningful website content (> 100 chars)
  const hasGoodContext = aboutText && aboutText.trim().length > 100;

  let para1 = `I've been impressed by ${cleanCompanyName}'s operations, and I noticed they require robust electrical infrastructure to support their projects.`;
  let para2 = `We specialize in the fast supply of high-precision Distribution Boards (MDB/SMDB), industrial-grade cables, and complete Cable Management Systems. We're known for ensuring all materials match local authority (DEWA/SEWA) standards for large-scale UAE infrastructure.`;

  // AI-enhanced personalization
  if (hasGoodContext) {
    const fullPrompt = `You are Asif Khan from TRI ANGLE Elect.Ware LLC. Generate a professional outreach email (3 paragraphs) for ${cleanCompanyName}.

BACKGROUND ON COMPANY:
${aboutText.slice(0, 1000)}

REQUIREMENTS:
1. Paragraph 1 (60-80 words): Specific observation about their business/operations. Reference actual services/projects they do. DO NOT say "I've been impressed" - be specific about WHAT impressed you.
2. Paragraph 2 (80-100 words): Explain YOUR services (Distribution Boards, cables, cable management systems) and how they help THEIR type of business specifically.
3. Paragraph 3 (40-50 words): Direct CTA - ask if they need electrical suppliers for upcoming projects and offer to share price list.

TONE: Professional, specific, helpful. Avoid generic phrases.
OUTPUT: Just the 3 paragraphs, no subject line, no greeting, no signature.`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: fullPrompt }],
        model: model as any,
        max_tokens: 400,
        temperature: 0.5,
      });
      const result = chatCompletion.choices[0].message.content?.trim();
      if (result && result.length > 150) {
        const paragraphs = result.split('\n\n').filter(p => p.trim());
        if (paragraphs.length >= 2) {
          para1 = paragraphs[0];
          para2 = paragraphs[1];
        }
      }
    } catch (error) {
      console.error("Groq personalization failed:", error);
    }
  }

  const finalEmail = `Hi team at ${cleanCompanyName},

${para1}

${para2}

You can view our project references and company profile here:
https://drive.google.com/file/d/1T_rHZ6zOWXkOsHso0y2ncHm7rgpg5ol6/view?usp=sharing

Are you currently shortlisting electrical suppliers for any upcoming projects? I'd be happy to share a fresh price list for your procurement team if it helps.

Best regards,

Asif Khan
TRI ANGLE Elect.Ware LLC
+971 54 586 6094
info@triangleelectricals.com`;

  return finalEmail;
};

// ─── Follow-Up Email (Day 4 Drip) with AI Nudge ─────────────────────────────
export const generateFollowUp = async (companyName: string, model: string = 'llama-3.3-70b-versatile'): Promise<string> => {
  // Clean company name
  const cleanCompanyName = companyName
    .replace(/&#8211;|&#8212;/g, '-')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();

  const nudgePrompt = `Write a short, professional follow-up email nudge for ${cleanCompanyName}.
Keep it under 3 sentences.
Context: We sent an introduction 4 days ago about being their electrical material supplier (TRI ANGLE Elect.Ware LLC).
Goal: Just keeping the opportunity top-of-mind and asking if they have any upcoming material requirements or need a price list.
TONE: Professional, brief, and helpful.
Do NOT use a subject line. Do NOT use "Dear Team". Start directly with the body.`;

  let nudgeText = `I'm just following up on my previous note regarding TRI ANGLE's electrical supply support. We haven't heard back, so I wanted to see if you have any upcoming projects that require a competitive material quotation or a fresh price list?`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: nudgePrompt }],
      model: model as any,
    });
    const result = chatCompletion.choices[0].message.content?.trim();
    if (result && result.length > 20) {
      nudgeText = result;
    }
  } catch (error) {
    console.error("Groq follow-up failed, using fallback.");
  }

  return `Dear Team at ${cleanCompanyName},

I hope you are having a productive week.

${nudgeText}

A quick reminder of our core supply capability:
- Pre-wired Distribution Boards (MDB / SMDB / Final DBs)
- Low Voltage Cables (Ducab / Oman / RR)
- Cable Management Systems & Enclosures

You can view our full project references and company profile here:
https://drive.google.com/file/d/1T_rHZ6zOWXkOsHso0y2ncHm7rgpg5ol6/view?usp=sharing

Thank you for your time.

Warm regards,

Asif Khan
Business Development Manager
TRI ANGLE Elect.Ware LLC
+971 54 586 6094
info@triangleelectricals.com
https://triangleelectricals.com`;
};
