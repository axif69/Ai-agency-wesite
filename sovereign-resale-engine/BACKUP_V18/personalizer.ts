import { Groq } from "groq-sdk";
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

export const personalizeOutreach = async (companyName: string, aboutText: string, tone: string = 'Professional & Bold', model: string = 'llama-3.3-70b-versatile') => {
  const introPrompt = `You are Asif Khan from TRI ANGLE Elect.Ware LLC, Sharjah.
Write a VERY short, human-like 1-2 sentence observation about ${companyName} based on the BACKGROUND INFO.
Goal: Make it sound like you've been following their projects and want to help them with electrical supplies.

TONE: Conversational, helpful, and direct. NO corporate jargon.
BACKGROUND INFO: ${aboutText}

CRITICAL RULES:
1. Write ONLY 1-2 sentences. 
2. Start with a real observation about their specific projects or services.
3. Keep it brief—like an email you'd type quickly on your phone.
4. Do NOT output "Dear Team" or placeholders. Output EXACTLY the sentences.`;

  let personalizedSentence = `I've been following ${companyName}'s recent projects in the UAE and wanted to see if we can support your team as an electrical material supplier.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: introPrompt }],
      model: model as any,
    });
    const result = chatCompletion.choices[0].message.content?.trim();
    if (result && result.length > 20) personalizedSentence = result;
  } catch (error) {
    console.error("Groq personalization failed:", error);
  }

  // v18.1: Link Randomization (Prevents Firewall Fingerprinting)
  const linkIntro = [
    "You can view our project references and company profile here: ",
    "I've attached our capability statement and full profile for your review: ",
    "For your reference, our full company profile is available here: ",
    "If you'd like to see our past UAE projects, you can find our profile at this link: ",
    "I'm sharing our official company credentials and project list below: "
  ][Math.floor(Math.random() * 5)];

  const finalEmail = `Dear Team at ${companyName},
 
I hope you're having a productive week. I'm Asif Khan from TRI ANGLE Elect.Ware LLC in Sharjah. 
 
${personalizedSentence}
 
We're currently supporting several infrastructure sites with high-precision Distribution Boards (MDB/SMDB), Ducab cables, and full Cable Management Systems. We're known for very fast quotations and ensuring all materials match local authority (DEWA/SEWA) standards.
 
${linkIntro}
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
  const nudgePrompt = `Write a short, professional follow-up email nudge for ${companyName}.
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

  return `Dear Team at ${companyName},

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
