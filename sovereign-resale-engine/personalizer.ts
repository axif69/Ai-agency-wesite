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
 * Enforces the DYNAMIC EXECUTIVE SUBJECT-LINE standard on whatever the model returns:
 *   - drops any subject ending in "?" (a subject is a statement, never a quiz),
 *   - collapses whitespace and hard-clips to ~5 words (executive brevity),
 *   - rejects clickbait stat-question shapes ("500 projects in Dubai hotels?").
 * Returns a clean subject string, or null if nothing usable survived.
 */
export const sanitizeSubjectLine = (raw: unknown): string | null => {
  let subject = String(raw || '').trim();
  if (!subject) return null;
  // Kill trailing question marks and bare clickbait stat questions.
  subject = subject.replace(/[?]+$/g, '').trim();
  subject = subject.replace(/^\d+\s+[a-z].*\b(in|across|at)\b.*$/i, '').trim();
  subject = subject.replace(/^"(.*)"$/, '$1').trim();
  subject = subject.replace(/\s+/g, ' ').trim();
  if (subject.length < 3) return null;
  const words = subject.split(/\s+/);
  if (words.length > 5) {
    // Preserve a leading company/name token if present, else just clip.
    subject = words.slice(0, 5).join(' ').replace(/[,\s]+$/, '');
  }
  return subject.replace(/[.,!]+$/, '').trim() || null;
};

/**
 * EMERGENCY subject fallback — only used when the LLM returns no usable subject.
 * Built dynamically from the detected service niche ("fitout ops", "legal ops")
 * instead of a company-name template ("[Company] outreach"), per the dynamic
 * subject rule. Filler words are dropped so it stays 2-3 natural words.
 */
export const nicheSubjectFallback = (detectedService: string, targetMarket: string): string => {
  const FILLER = new Set(['your', 'ideal', 'the', 'a', 'an', 'and', 'in', 'of', 'services', 'for', 'to', 'with', 'across']);
  const src = (detectedService && detectedService !== 'your industry') ? detectedService : (targetMarket || '');
  const words = String(src || '')
    .toLowerCase()
    .replace(/[^a-z0-9 &-]/g, ' ')
    .split(/\s+/)
    .filter((w: string) => w && !FILLER.has(w))
    .slice(0, 3);
  return words.length ? `${words.join(' ')} ops` : 'executive outreach';
};

// ─────────────────────────────────────────────────────────────────────────────
// EXECUTIVE OUTREACH GUARDS — the strict 3-sentence CEO-to-CEO standard
//
// 1) ZERO TECHNICAL JARGON. The exact phrases below are the single source of
//    truth for the ban. They are checked — NOT auto-removed (deleting noun
//    phrases mangles grammar) — so any draft carrying one is routed to human
//    review by the drafting quality gate instead of auto-sending.
// 2) ZERO RAW URLS. No Calendly, website, or http/https links anywhere in the
//    email body (the model is told this AND we strip any it ignores).
// 3) MAX 3 SENTENCES in the core pitch (hook → value → soft CTA).
// ─────────────────────────────────────────────────────────────────────────────
// Ban ONLY the spammy buzzwords. The legitimate "AI sales engine" mechanism
// language is ALLOWED — the dynamic copy is expected to describe it plainly.
const BANNED_JARGON = [
  'ai sales sdr agent', 'ai sdr agent', 'ai sales sdr', 'sales sdr agent', 'sdr agent',
  'self-hosted', 'self hosted', 'ai lead hunting', 'lead hunting', 'lead-hunting',
  'cold outreach engine', 'cold outreach bot', 'automated sdr', 'sales sdr',
];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * True when the text contains any blocklisted software-jargon phrase.
 * Exact-phrase matching on purpose: a legitimate outcome sentence like
 * "without hiring expensive SDR teams" must NOT be flagged.
 */
export const containsJargon = (text: string): boolean => {
  const t = String(text || '').toLowerCase();
  return BANNED_JARGON.some(p => new RegExp(`\\b${escapeRegExp(p)}\\b`, 'i').test(t));
};

/**
 * Post-generation sanitizer. Applied to the core pitch so that even if the model
 * ignores the writing rules, the stored email has NO raw URLs and stays at 3
 * sentences. Jargon is deliberately NOT auto-removed here (it would mangle the
 * grammar) — it is flagged via containsJargon and the quality gate routes those
 * drafts to human review.
 */
export const sanitizeExecutiveBody = (core: string): string => {
  let s = String(core || '')
    .trim()
    .replace(/\*\*/g, '')                    // strip stray markdown bold
    .replace(/https?:\/\/\S+/gi, ' ')         // drop raw http(s) links
    .replace(/www\.\S+/gi, ' ')               // drop bare www links
    .replace(/\bcalendly(?:\.[a-z]+)+\S*\b/gi, ' ') // drop Calendly mentions
    .replace(/^(?:hi|hello|hey|dear|good\s+(?:morning|afternoon|evening))\b[^\n]*\n?/i, '') // drop ONLY a leading stray salutation
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Cap the CORE at 3 sentences (the CTA is sentence 3, so keep hook + value + CTA).
  const sentences = s.split(/(?<=[.!?])\s+/).filter((x: string) => x.trim());
  if (sentences.length > 3) s = sentences.slice(0, 3).join(' ').trim();

  return s;
};

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

      // Prefer an already-verified human executive name; only adopt the extracted
      // NAME when we had none (the scraped result may be the business/brand itself,
      // e.g. "Al Ayan Real" from "Al Ayan Real Estate Broker", which would null the
      // personal greeting). cleanContactName() is still the final arbiter below.
      if (!hasVerifiedExecutiveName && nameMatch && !nameMatch[1].includes('N/A')) decisionMaker = nameMatch[1].trim();

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

      const finalGreeting = decisionMaker ? `Hi ${decisionMaker},` : `Hi ${cleanCompanyName} team,`;

      // Stage 2: User-Defined Blueprint Cold Email Copywriter (100% Dynamic from DB Settings)
      const pitchContext = String(config.pitch_context || config.PITCH_CONTEXT || "").trim();
      const companyKnowledge = String(config.company_knowledge || config.COMPANY_KNOWLEDGE || "").trim();
      const offerAngle = String(config.offer_angle || config.OFFER_ANGLE || "our services").trim();
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
Write a short, executive peer-to-peer cold email from ${myCompany}'s founder to the decision-maker of "${cleanCompanyName}" (a ${detectedService || 'B2B'} company). You are writing TO a peer CEO — not at a stranger, not at a company. Write like a busy founder talking to another founder: direct, specific, zero corporate fluff.

CONTEXT FROM THEIR WEBSITE (REAL, VERIFIED — your ONLY source of facts about them):
${websiteExcerpt || deepHooks || detectedService || 'commercial services in UAE'}

WHO THEY SELL TO (their target market):
${targetMarket}

${factsBlock ? `VERIFIED FACTS ABOUT THEM (sourced during research):\n${factsBlock}` : ''}

WHAT WE OFFER:
${pitchContext || offerAngle || 'AI-powered sales automation'}

${companyKnowledge ? `EXTRA CONTEXT:\n${companyKnowledge}` : ''}

ABSOLUTE RULES — BREAK ANY ONE AND THE EMAIL IS REJECTED:
1. FACTS-GROUNDING: Cite at least 1-2 SPECIFIC facts about ${cleanCompanyName} taken VERBATIM from "CONTEXT FROM THEIR WEBSITE" or "VERIFIED FACTS ABOUT THEM" (e.g. a real service lineup, a specific project type, a cited stat, their target client type, a named location). Put the exact cited facts in the "cited_evidence" field. NEVER invent projects, stats, years, client names, or milestones that are not in the CONTEXT.
2. NO GREETING IN THE BODY: do NOT write "Hi", "Dear", "Hello", or any salutation — the greeting is added separately. Start the body directly with the personalized hook.
3. EXECUTIVE PEER TONE — exactly 3 sentences (under 65 words total), a peer writing to a peer:
   Sentence 1 (Contextual Hook): a direct, peer-level observation about their business or operational focus, DERIVED from their site evidence — name their real service line, project type, or market focus (e.g. "Noticed United Cargo's freight forwarding ops across the UAE..."). Never a stat dressed as a question.
   Sentence 2 (Mechanism & Benefit): ONE clear, natural sentence that EXPLAINS THE MECHANISM plainly — our system discovers their target companies, extracts verified executive decision-maker contacts, and writes the personalized outreach draft automatically — cutting 15+ hours of manual prospecting weekly. State the 3-step flow confidently; it IS the value. BAN only spammy buzzwords ("self-hosted AI SDR agent", "cold outreach bot", "automated SDR") — otherwise describe the mechanism in plain business language.
   Sentence 3 (Low-Friction CTA): a soft, 1-line question (e.g. "Open to a brief 5-minute chat next week?").
4. DYNAMIC SUBJECT LINE (2-4 WORDS, EXECUTIVE, NO CLICKBAIT, NO COMPANY-NAME TEMPLATES): craft a UNIQUE, natural 2-4 word subject derived dynamically from THEIR specific niche, projects, or operational focus (e.g. "commercial freight / DFH", "dubai legal operations", "quick note re: fitout clients"). NEVER use a static template that repeats the company name or a fixed pattern ("[Company] outreach", "Quick note re: <Company>", "Scaling <service>") — every subject must be original to this company's actual operations. NEVER write a clickbait stat question, NEVER end the subject with "?", NEVER append "?" to a raw scraped number (ban "500 projects in Dubai hotels?"). A subject is a statement, not a quiz.
5. PLAIN TEXT ONLY: ban bullet points, lists, bold/markdown, headings, and corporate declarations ("We are a leading agency...", "best-in-class", "cutting-edge", "game-changer", "revolutionary", "synergy", "world-class").
6. NO RAW URLS WHATSOEVER: never put a Calendly link, a website URL, or any http/https/www link anywhere in the email body. The CTA is a soft QUESTION only — never "book here" with a link. Sentence 3 is the CTA, no link required.
7. OPENERS BANNED anywhere: ${bannedOpeners.join(', ')}.
8. ANTI-HALLUCINATION: only reference facts present above.
9. Output EXACTLY this JSON, no markdown, no code fence, strictly valid JSON:
{"subject": "...", "body": "...", "cited_evidence": "the exact 1-2 facts from their site that you referenced", "confidence": 0-100}
`;

      const emailResult = await callAIPipe([
        { role: "system", content: `You are an elite B2B Growth Specialist cold-email writer who writes like a real founder writing to a peer CEO — direct, specific, zero corporate fluff. Plain text only. Exactly 3 sentences (under 65 words total): (1) a peer-level context hook naming their real service/project, (2) ONE clear sentence that explains the MECHANISM — our AI sales engine discovers their target companies, extracts verified executive decision-makers, and writes the personalized outreach draft automatically, cutting 15+ hours of manual prospecting weekly, (3) one soft low-friction CTA question ending in "?". DYNAMIC SUBJECT: craft a UNIQUE 2-4 word natural executive subject derived from THEIR specific niche or operations (e.g. "dubai legal ops", "commercial freight focus") — NEVER the generic "[Company] outreach" pattern, NEVER a clickbait stat question, NEVER end the subject with "?", NEVER append "?" to a raw number. NO RAW URLS whatsoever — never a Calendly link, website link, or http/https/www link anywhere. No greeting, no bullets, no marketing fluff, no corporate declarations, no spammy buzzwords ("self-hosted AI SDR agent", "cold outreach bot", "automated SDR"). You NEVER invent facts not given in the context. You ALWAYS reply with strictly valid JSON only: {"subject": "...", "body": "...", "cited_evidence": "...", "confidence": 0-100}. No markdown, no code fences, no prose outside the JSON.` },
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
            const cleanSubject = sanitizeSubjectLine(aiSubject);
            if (cleanSubject) draftSubject = cleanSubject;
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
          // Executive 3-sentence fallback — peer hook → mechanism & benefit → soft CTA.
          // Zero spammy buzzwords, zero raw URLs (per the dynamic writing rules).
          personalizedBody = `Most ${detectedService || 'B2B'} founders in this market burn 15-20 hours a week on manual prospecting. Our AI sales engine discovers their target companies, extracts verified executive contacts, and writes the outreach draft automatically. Open to a brief 5-minute chat next week?`;
      }
    } catch (e: any) {
      console.error(`❌ [AI PIPE] Personalization Error: ${e.message}`);
    }
  }

  // Fallback Template if no aboutText — use varied opener
  if (!personalizedBody) {
    const templateOpeners = [
      `${cleanCompanyName} clearly runs a serious ${detectedService || 'B2B'} operation — most founders in this space still handle their own prospecting.`,
      `Running a ${detectedService || 'B2B'} company in this market usually means the founder personally chases every lead.`,
      `Most ${detectedService || 'B2B'} founders I talk to lose 15-20 hours a week on manual list building and research.`,
    ];
    const idx = Math.abs(cleanCompanyName.charCodeAt(0) * 3 + cleanCompanyName.length) % templateOpeners.length;
    // Outcome-only framing: no tool names, no jargon, no raw URLs.
    const dynamicOffer = String(config.offer_angle || config.OFFER_ANGLE || 'Our AI sales engine discovers target companies, verifies executive contacts, and writes each outreach draft automatically.');
    const dynamicCTA = String(config.call_to_action || config.CALL_TO_ACTION || 'Open to a brief 5-minute chat next week?');
    personalizedBody = `${templateOpeners[idx]} ${dynamicOffer} ${dynamicCTA}`;
    draftSubject = sanitizeSubjectLine(draftSubject) || nicheSubjectFallback(detectedService, targetMarket);
    draftEvidence = draftEvidence || (detectedService !== 'your industry'
      ? `Reference: ${cleanCompanyName} operates in ${detectedService}.`
      : `Reference: ${cleanCompanyName} is a B2B business in ${targetMarket}.`);
    draftConfidence = draftConfidence || 40;
  }

  const validatedName = cleanContactName(decisionMaker);
  let firstToken = validatedName ? validatedName.split(/\s+/)[0] : '';
  // Drop trailing honorific punctuation ("Mr." -> "Mr", "E.V." -> "E.V").
  firstToken = firstToken.replace(/[.,]+$/g, '').trim();

  // ── EXECUTIVE SANITIZER ──
  // Push the generated core through the strict guards: strip raw URLs, ban tech
  // jargon, cap to 3 sentences. NO calendar-link injection — the CTA is a soft
  // question only (per the "NO RAW URLS" writing rule).
  let sanitizedBody = sanitizeExecutiveBody(personalizedBody);

  // ── MANDATORY PERSONAL SALUTATION ──
  // ALWAYS address the decision-maker by first name when one exists; never fall back
  // to "Hi there" / "Dear Team" if the contact name is present.
  const greeting = firstToken
    ? `Hi ${firstToken},`
    : `Hi ${cleanCompanyName} team,`;

  sanitizedBody = sanitizedBody
    .replace(/^(hi|hello|hey|dear|good\s+(morning|afternoon|evening))\b[^\n]*\n?/i, '')
    .replace(/^["']|["']$/g, '')
    .trim();
  sanitizedBody = `${greeting}\n\n${sanitizedBody}`;

  // Executive signature — no raw website/Calendly URL (zero raw URLs anywhere).
  const finalBody = `${sanitizedBody}\n\nBest,\n${myRep}\n${myCompany}\n${config.phone || ""}`.trim();

  return {
    body: finalBody,
    subject: sanitizeSubjectLine(draftSubject) || nicheSubjectFallback(detectedService, targetMarket),
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

  if (!groqKey) return `Hi ${companyName} team,\n\nJust following up on my previous email regarding ${offer}. Would you be open to a 5-minute chat?${signature}`;

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
    return `Hi ${companyName} team,\n\nJust following up on my previous email regarding ${offer}. Would you be open to a 5-minute chat?${signature}`;
  }
};
