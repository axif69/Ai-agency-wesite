import { Groq } from "groq-sdk";
import axios from 'axios';
import dotenv from 'dotenv';
import { loadSystemConfig } from './config_manager';
import { decryptLocalSecret } from './crypto_utils';
import { cleanCompanyName as cleanName } from './search_service.js';
import { cleanContactName } from './contact_validation.js';
import { extractCleanMarkdownWithCrawl4AI } from './crawl4ai_extractor';
dotenv.config();

export interface PersonalizedPitch {
  body: string;
  subject: string;
  brandName: string;
  citedEvidence: string;      // the 1-2 verbatim facts this draft is grounded in
  confidence: number;         // 0-100 model confidence the draft is factually grounded
  generationMode: 'ai' | 'template';
  provider: 'openrouter' | 'openai' | 'groq' | 'mistral' | 'none';
  model: string;
}

export interface ProspectFact {
  fact: string;
  source_url: string;
}

/**
 * CORE KNOWLEDGE BASE & OUTREACH ENGINE
 * This file defines the identity of the Autonomous AI Sales Agent and generates high-fidelity pitches.
 */
const PRODUCT_KNOWLEDGE_BASE = `
PRODUCT: Private, custom-installed AI sales research infrastructure.
OWNERSHIP: The client owns the installed system, instance, and collected data.
CAPABILITIES:
- Discovers and scores target companies from public information.
- Verifies contact details and records source evidence.
- Produces review-ready outreach drafts under human approval.
- Reduces SDR research and preparation work while keeping final outreach under human control.
`;

/**
 * CORE AI PIPELINE (Multi-Provider + Fallback)
 * This function attempts to call Groq, then Mistral, then falls back to a safe template.
 */
interface AICompletionResult {
  content: string;
  provider: 'openrouter' | 'openai' | 'groq' | 'mistral' | 'none';
  model: string;
}

const getCleanKey = (k: string) => {
  if (!k) return '';
  if (k.startsWith('enc_v1:')) {
    try { return decryptLocalSecret(k); } catch (e) { return k; }
  }
  return k;
};

async function callAIPipe(msgs: any[], config: any, primaryModel: string, maxTokens: number = 400): Promise<AICompletionResult> {
  const openrouterKey = getCleanKey(config.openrouter_api_key || config.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '');
  const openrouterModel = config.openrouter_model || config.OPENROUTER_MODEL || 'openai/gpt-4o-mini';
  const openaiKey = getCleanKey(config.openai_api_key || config.OPENAI_API_KEY || process.env.OPENAI_API_KEY || '');
  const openaiModel = config.openai_model || config.OPENAI_MODEL || 'gpt-4o-mini';
  const groqKey = getCleanKey(config.groq_api_key || config.GROQ_API_KEY || '');
  const mistralKey = getCleanKey(config.mistral_api_key || config.MISTRAL_API_KEY || '');
  const temperature = parseFloat(config.temperature) || 0.7;

  // 1. Attempt Mistral first when configured
  if (mistralKey) {
    const mistralModels = primaryModel.includes('mistral') 
      ? [primaryModel, 'mistral-small-latest', 'open-mistral-7b', 'mistral-large-latest'] 
      : ['mistral-small-latest', 'open-mistral-7b', 'mistral-large-latest'];

    for (const model of mistralModels) {
      try {
        const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
          model: model,
          messages: msgs,
          max_tokens: maxTokens,
          temperature: temperature,
        }, {
          headers: { 'Authorization': `Bearer ${mistralKey}`, 'Content-Type': 'application/json' },
          timeout: 12000
        });
        const content = response.data?.choices?.[0]?.message?.content || "";
        if (content) {
          return { content, provider: 'mistral', model };
        }
      } catch (e: any) {
        if (e.response?.status === 429) {
          console.warn(`⚠️ [MISTRAL] ${model} Rate limited. Trying next fallback...`);
          continue;
        }
        console.warn(`⚠️ [MISTRAL] ${model} Failed: ${e.message}`);
        break; 
      }
    }
  }

  // 2. Attempt Groq
  if (groqKey && !primaryModel.includes('mistral')) {
    try {
      const groqModel = primaryModel.includes('llama') ? primaryModel : 'llama-3.3-70b-versatile';
      const groq = new Groq({ apiKey: groqKey });
      const chat = await groq.chat.completions.create({
        messages: msgs,
        model: groqModel as any,
        max_tokens: maxTokens,
        temperature: temperature,
      });
      const content = chat.choices[0]?.message?.content || "";
      if (content) {
        return { content, provider: 'groq', model: groqModel };
      }
    } catch (e: any) {
      console.warn(`⚠️ [GROQ] Failed: ${e.message}. Falling back...`);
    }
  }

  // 3. Attempt OpenRouter if configured
  if (openrouterKey && openrouterKey.startsWith('sk-or-v1-')) {
    try {
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: openrouterModel,
        messages: msgs,
        max_tokens: maxTokens,
        temperature: temperature,
      }, {
        headers: {
          'Authorization': `Bearer ${openrouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': config.company_url || '',
          'X-Title': config.company_name || ''
        },
        timeout: 20000
      });
      const content = response.data?.choices?.[0]?.message?.content || "";
      if (content) {
        return { content, provider: 'openrouter', model: openrouterModel };
      }
    } catch (e: any) {
      console.warn(`⚠️ [OPENROUTER] Failed: ${e.response?.status || ''} ${e.message}`);
    }
  }

  // 4. Attempt OpenAI when configured.
  if (openaiKey) {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: openaiModel,
        messages: msgs,
        max_tokens: maxTokens,
        temperature: temperature,
      }, {
        headers: { 'Authorization': `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
        timeout: 15000
      });
      return { content: response.data?.choices?.[0]?.message?.content || "", provider: 'openai', model: openaiModel };
    } catch (e: any) {
      console.warn(`⚠️ [OPENAI] Failed: ${e.response?.status || ''} ${e.message}. Falling back...`);
    }
  }

  // 5. Last Resort: Emergency Llama-3.1-8b via Groq (Fast & Cheap)
  if (groqKey) {
    try {
      const groq = new Groq({ apiKey: groqKey });
      const chat = await groq.chat.completions.create({
        messages: msgs,
        model: 'llama-3.1-8b-instant',
        max_tokens: 300,
        temperature: 0.6,
      });
      return { content: chat.choices[0].message.content || "", provider: 'groq', model: 'llama-3.1-8b-instant' };
    } catch {}
  }

  return { content: '', provider: 'none', model: 'none' };
}

export const personalizeOutreach = async (companyName: string, aboutText: string, websiteUrl: string, tone: string = 'Professional & Bold', model: string = 'llama-3.3-70b-versatile', executiveName: string | null = null, evidenceFacts: ProspectFact[] = []): Promise<PersonalizedPitch> => {
  const config = await loadSystemConfig();
  const myCompany = config.company_name || "Our Company";
  const myRep = config.rep_name || "Sales Team";
  
  let cleanCompanyName = cleanName(companyName);
  if (!cleanCompanyName) cleanCompanyName = companyName.split(/[|\-]/)[0].trim().split(' ').slice(0, 3).join(' ');

  let detectedService = "your industry";
  let targetMarket = "your ideal corporate clients";
  let personalizedBody = "";
  const hasVerifiedExecutiveName = Boolean(String(executiveName || '').trim());
  let decisionMaker = hasVerifiedExecutiveName ? String(executiveName).trim() : "";
  let completionProvider: PersonalizedPitch['provider'] = 'none';
  let completionModel = 'none';
  let draftSubject = "";
  let draftEvidence = "";
  let draftConfidence = 0;

  if (aboutText && aboutText.length > 50) {
    try {
      // v27.2: Sanitize HTML to prevent context leaks and hallucinations
      const cleanText = aboutText
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (cleanText.length < 50) throw new Error("Text too short after sanitization");

      // Stage 1: Extraction (Upgraded for v30.4 - Polished Elite Edition)
      const extractionResult = await callAIPipe([{ 
        role: "system",
        content: `You are a lead enrichment bot. Extract:
        1. BRAND: Real brand name.
        2. SERVICE: Primary service niche.
        3. KEYWORDS: 3-4 highly specific technical keywords or project types.
        4. TARGETS: Who are their ideal customers? (e.g. "hotel procurement managers, main contractors, and luxury architects").
        5. NAME: Look for a Founder, Director, or Manager name in the text. Output ONLY the first name if found.
        
        Output ONLY in this format: BRAND: [Name], SERVICE: [Service], KEYWORDS: [K1, K2, K3], TARGETS: [T1, T2, T3], NAME: [First Name or N/A].`
      }, { 
        role: "user", 
        content: `Analyze this website content and extract deep contextual hooks: "${cleanText.slice(0, 3000)}"` 
      }], config, model, 150);

      const extractionText = extractionResult.content;
      const brandMatch = extractionText.match(/BRAND:\s*([^,\n]+)/i);
      const serviceMatch = extractionText.match(/SERVICE:\s*([^,\n]+)/i);
      const keywordMatch = extractionText.match(/KEYWORDS:\s*([^,\n]+)/i);
      const targetMatch = extractionText.match(/TARGETS:\s*([^,\n]+)/i);
      const nameMatch = extractionText.match(/NAME:\s*([^,\n]+)/i);
      
      let deepHooks = "";
      if (keywordMatch) deepHooks = keywordMatch[1].trim();
      
      if (targetMatch && !targetMatch[1].includes('N/A')) targetMarket = targetMatch[1].trim();

      if (hasVerifiedExecutiveName && nameMatch && !nameMatch[1].includes('N/A')) decisionMaker = nameMatch[1].trim();

      if (brandMatch) {
          const rawName = brandMatch[1].trim().replace(/[[\]".!,]/g, '');
          const low = rawName.toLowerCase();
          const forbidden = ['not', 'n/a', 'na', 'unknown', 'none', 'company', 'brand', 'website', 'the', 'null', 'unspecified'];
          
          if (!forbidden.includes(low) && low.length >= 3) {
              const words = rawName.split(' ');
              cleanCompanyName = words.length <= 3 ? rawName : words.slice(0, 3).join(' ');
          }
      }

      if (serviceMatch) {
          const s = serviceMatch[1].trim().toLowerCase();
          if (s.length > 3 && !['n/a', 'na', 'null', 'none', 'unknown', 'unspecified'].includes(s)) detectedService = s;
      }

      // Final validation to prevent "Hi team at Not" or "Unspecified"
      const lowName = cleanCompanyName.toLowerCase();
      const genericWords = ['not', 'n/a', 'na', 'unknown', 'none', 'unspecified', 'company', 'brand', 'website', 'the', 'null'];
      if (!cleanCompanyName || genericWords.includes(lowName) || lowName.length < 3) {
          cleanCompanyName = companyName.split(/[\|\-]/)[0].trim().split(' ')[0].replace(/[,.!]+$/, '');
      }

      const finalGreeting = decisionMaker ? `Hi ${decisionMaker},` : `Hi team at ${cleanCompanyName},`;

      // Stage 2: User-Defined Blueprint Cold Email Copywriter (100% Dynamic from DB Settings)
      const pitchContext = String(config.pitch_context || config.PITCH_CONTEXT || "").trim();
      const companyKnowledge = String(config.company_knowledge || config.COMPANY_KNOWLEDGE || "").trim();
      const offerAngle = String(config.offer_angle || config.OFFER_ANGLE || "our services").trim();
      const calendarLink = String(config.calendar_url || config.meeting_link || config.CALENDAR_URL || "").trim();
      // Ground the email in the REAL scraped site content + sourced facts so the model
      // references actual projects/services instead of inventing them.
      const websiteExcerpt = cleanText.replace(/\s+/g, ' ').trim().slice(0, 1800);
      const factsBlock = Array.isArray(evidenceFacts) && evidenceFacts.length > 0
        ? evidenceFacts.map((f: ProspectFact) => `- ${f.fact}`).join('\n')
        : '';

      const bannedOpeners = [
        'I hope this email finds you well', 'I hope this email finds you', 'Hope this email finds you well',
        'I hope you are well', 'I stumbled upon your website', 'I came across your website',
        'I was browsing', 'I found you on', 'We are a leading agency', 'We are a premier agency',
        'We are one of the leading', 'I noticed your company', 'Your work stood out', 'I was impressed',
        'Hi I am reaching out', 'Just wanted to reach out', 'I wanted to touch base'
      ].map(x => x.toLowerCase());

      const fullEmailPrompt = `
Write a cold email from ${myCompany}'s founder to the decision-maker of "${cleanCompanyName}" (a ${detectedService || 'B2B'} company).

CONTEXT FROM THEIR WEBSITE (REAL, VERIFIED — your ONLY source of facts about them):
${websiteExcerpt || deepHooks || detectedService || 'commercial services in UAE'}

WHO THEY SELL TO (their target market):
${targetMarket}

${factsBlock ? `VERIFIED FACTS ABOUT THEM (sourced during research):\n${factsBlock}` : ''}

WHAT WE OFFER:
${pitchContext || offerAngle || 'AI-powered sales automation'}

${companyKnowledge ? `EXTRA CONTEXT:\n${companyKnowledge}` : ''}

${calendarLink ? `CALENDAR LINK (weave naturally at the end): ${calendarLink}` : ''}

ABSOLUTE RULES — BREAK ANY ONE AND THE EMAIL IS REJECTED:
1. FACTS-GROUNDING: You MUST cite at least 1-2 SPECIFIC facts about ${cleanCompanyName} taken VERBATIM from "CONTEXT FROM THEIR WEBSITE" or "VERIFIED FACTS ABOUT THEM" (e.g. a real service lineup, a specific project type, a cited stat, their target client type, a named location). Put the exact cited facts in the "cited_evidence" field. NEVER invent projects, stats, years, client names, or milestones that are not in the CONTEXT.
2. OPENERS BANNED (never start the body OR subject with these): ${bannedOpeners.join(', ')}. Also banned: "We are a leading agency", "I hope this finds you", "I'm reaching out because".
3. Subject line: short (< 9 words), specific, NO clickbait, may reference a cited fact.
4. Body: Tone ${tone}. MAX 3 sentences, 45-70 words. Zero fluff. Sentence 1 opens with a SPECIFIC, VERIFIED fact about the prospect. Sentence 2 bridges to your value in ONE sentence. Sentence 3 = one casual, low-pressure CTA question ending in "?".
5. ANTI-HALLUCINATION: only reference facts present above.
6. Output EXACTLY this JSON, no markdown, no code fence, strictly valid JSON:
{"subject": "...", "body": "...", "cited_evidence": "the exact 1-2 facts from their site that you referenced", "confidence": 0-100}
`;

      const emailResult = await callAIPipe([
        { role: "system", content: `You are an elite cold email copywriter. You write like a real startup founder — casual, specific, zero fluff. Every email is 45-70 words max, exactly 3 sentences, ends with a CTA question ending in a question mark. You NEVER invent facts not given in the context. You NEVER use cliché openers. You ALWAYS reply with strictly valid JSON only: {"subject": "...", "body": "...", "cited_evidence": "...", "confidence": 0-100}. No markdown, no code fences, no prose outside the JSON.` },
        { role: "user", content: fullEmailPrompt }
      ], config, model, 400);

      completionProvider = emailResult.provider;
      completionModel = emailResult.model;

      // Strict JSON structured-output parsing (subject / body / cited_evidence / confidence).
      const rawContent = (emailResult.content || '').trim();
      const jsonBlock = rawContent.match(/\{[\s\S]*\}/);
      if (jsonBlock) {
        try {
          const parsed = JSON.parse(jsonBlock[0]);
          const aiBody = String(parsed.body || '').trim();
          const aiSubject = String(parsed.subject || '').trim();
          const aiEvidence = String(parsed.cited_evidence || '').trim();
          const aiConfidence = Math.max(0, Math.min(100, Number(parsed.confidence) || 0));
          if (aiBody && aiBody.length >= 30) {
            personalizedBody = aiBody;
            draftSubject = aiSubject || draftSubject;
            draftEvidence = aiEvidence || draftEvidence;
            draftConfidence = aiConfidence > 0 ? aiConfidence : draftConfidence;
          }
        } catch (_) {
          // malformed JSON — fall through to text extraction below
        }
      }

      // Text fallback when the model refused JSON: strip markdown fences + headers.
      if (!personalizedBody) {
        personalizedBody = rawContent
          .replace(/^```(?:json)?\s*/i, '')
          .replace(/```\s*$/i, '')
          .replace(/^["']|["']$/g, '')
          .replace(/(WHAT WE DO|OUR SERVICE OFFER|PRICING STRUCTURE|VALUE PROPOSITION):?/gi, '')
          .replace(/—?\s*(Personalized Opener|Offer|Pricing & Ownership \+ CTA|Paragraph \d+):?\s*/gi, '')
          .replace(/^[-\*•]\s+/gm, '')
          .trim();
      }

      // Fallback if AI output is empty — executive CEO-to-CEO pool
      if (!personalizedBody || personalizedBody.length < 30) {
          personalizedBody = `Most founders running ${detectedService || 'B2B'} companies in ${cleanCompanyName}'s space spend thousands on lead software or waste 20+ hours a week verifying contacts manually.\n\nWe custom-build self-hosted AI SDR engines that automatically discover decision-maker emails, verify active mailboxes, and draft personalized outreach — with zero monthly credit fees.\n\nOpen to a quick 2-minute video preview of how it runs for ${cleanCompanyName}?`;
      }
    } catch (e: any) {
      console.error(`❌ [AI PIPE] Personalization Error: ${e.message}`);
    }
  }

  // Fallback Template if no aboutText — use varied opener
  if (!personalizedBody) {
    const templateOpeners = [
      `Running a ${detectedService || 'B2B'} company in this market is brutal — most founders are still doing outreach manually or paying $500/mo for lead tools that send garbage.`,
      `${detectedService || 'B2B services'} companies like ${cleanCompanyName} usually have one problem in common: the pipeline dries up the moment you stop manually prospecting.`,
      `Most ${detectedService || 'service'} founders I talk to spend 15+ hours/week on lead research. That time should be closing deals, not Googling contacts.`,
      `Here's what I keep hearing from ${detectedService || 'B2B'} founders: "We know who we want to sell to, but finding and reaching the right person takes forever."`,
      `The ${detectedService || 'B2B'} space in UAE is getting crowded fast — the companies winning right now are the ones automating their client acquisition pipeline.`,
    ];
    const idx = Math.abs(cleanCompanyName.charCodeAt(0) * 3 + cleanCompanyName.length) % templateOpeners.length;
    const dynamicOffer = String(config.offer_angle || config.OFFER_ANGLE || 'We built an AI engine that handles the entire discovery-to-outreach pipeline — finds decision makers, verifies emails, and drafts personalized cold emails. Self-hosted, no monthly fees.');
    const dynamicCTA = String(config.call_to_action || config.CALL_TO_ACTION || `Worth a quick look to see how this could work for ${cleanCompanyName}?`);
    personalizedBody = `${templateOpeners[idx]}\n\n${dynamicOffer}\n\n${dynamicCTA}`;
    draftSubject = draftSubject || `Quick question, ${cleanCompanyName.split(' ')[0]}`;
    draftEvidence = draftEvidence || (detectedService !== 'your industry'
      ? `Reference: ${cleanCompanyName} operates in ${detectedService}.`
      : `Reference: ${cleanCompanyName} is a B2B business in ${targetMarket}.`);
    draftConfidence = draftConfidence || 40;
  }

  const validatedName = cleanContactName(decisionMaker);
  const cleanGreetingName = validatedName ? validatedName.split(' ')[0] : '';

  // Smart CTA & Meeting Link Integration
  const meetingLink = config.meeting_link || config.calendar_url || config.CALENDLY_URL || "";
  let sanitizedBody = personalizedBody.replace(/\*\*/g, '').replace(/\*/g, '').trim();

  if (meetingLink && !sanitizedBody.includes(meetingLink)) {
      // Preserve the CTA question mark — append the calendar link as a separate sentence.
      sanitizedBody = `${sanitizedBody.trim()}\n\nFeel free to pick a time directly on my calendar here: ${meetingLink}`;
  }
  
  // Ensure greeting is correctly prepended if missing
  const greeting = cleanGreetingName ? `Hi ${cleanGreetingName},` : `Hi team at ${cleanCompanyName},`;
  if (!sanitizedBody.toLowerCase().startsWith('hi ')) {
      sanitizedBody = `${greeting}\n\n${sanitizedBody}`;
  }

  const companyWebsite = config.company_url || config.COMPANY_URL || "";
  const finalBody = `${sanitizedBody}\n\nBest,\n${myRep}\n${myCompany}\n${companyWebsite}\n${config.phone || ""}`;

  return {
    body: finalBody,
    subject: draftSubject || `Quick question, ${cleanCompanyName.split(' ')[0]}`,
    brandName: cleanCompanyName,
    citedEvidence: draftEvidence,
    confidence: draftConfidence,
    generationMode: completionProvider === 'none' ? 'template' : 'ai',
    provider: completionProvider,
    model: completionModel
  };
};

export const generateFollowUp = async (companyName: string, model: string = 'llama-3.3-70b-versatile'): Promise<string> => {
  const config = await loadSystemConfig();
  const myCompany = config.company_name || "Our Company";
  const myRep = config.rep_name || "Sales Team";
  const groqKey = config.groq_api_key || config.GROQ_API_KEY || process.env.GROQ_API_KEY || '';
  const offer = config.pitch_context || "automating your B2B sales operations";

  const signature = `\n\nBest,\n\n${myRep}\n${myCompany}\n${config.phone || ""}\n${config.company_url || ""}\n${config.email || ""}`;

  if (!groqKey) return `Hi team at ${companyName},\n\nJust following up on my previous email regarding ${offer}. Would you be open to a 5-minute chat?${signature}`;

  try {
    const groq = new Groq({ apiKey: groqKey });
    const chat = await groq.chat.completions.create({
      messages: [{ 
        role: "user", 
        content: `Write a 2-sentence follow-up for ${companyName} regarding our offer: "${offer}". Professional tone. Do NOT include any signature or closing.` 
      }],
      model: model as any,
      max_tokens: 150,
    });
    const body = (chat.choices[0].message.content || "").replace(/\*\*/g, '').replace(/\*/g, '').trim();
    return `${body}${signature}`;
  } catch {
    return `Hi team at ${companyName},\n\nJust following up on my previous email regarding ${offer}. Would you be open to a 5-minute chat?${signature}`;
  }
};
