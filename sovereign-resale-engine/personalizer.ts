import { Groq } from "groq-sdk";
import axios from 'axios';
import dotenv from 'dotenv';
import { loadSystemConfig } from './config_manager';
dotenv.config();

export interface PersonalizedPitch {
  body: string;
  brandName: string;
}

/**
 * CORE KNOWLEDGE BASE & OUTREACH ENGINE
 * This file defines the identity of the Autonomous AI Sales Agent and generates high-fidelity pitches.
 */
const PRODUCT_KNOWLEDGE_BASE = `
PRODUCT: Autonomous AI Sales Agent (Custom-Built Asset)
OWNERSHIP: One-Time Asset Purchase. No monthly subscriptions. Client owns the source code.
CAPABILITIES: 
- 24/7 Autonomous Lead Discovery (Mining B2B directories/maps).
- Deep Content Analysis (Scraping public About/Services/Projects).
- Hyper-Personalized 1-to-1 Outreach (Drafting emails based on website data).
- CRM Integration & Appointment Setting.
ROI: 80% cost reduction in lead acquisition; replaces manual/redundant sales roles.
`;

export const personalizeOutreach = async (companyName: string, aboutText: string, websiteUrl: string, tone: string = 'Professional & Bold', model: string = 'llama-3.3-70b-versatile', executiveName: string | null = null): Promise<PersonalizedPitch> => {
  const config = await loadSystemConfig();
  const myCompany = config.company_name || "Asif Digital Agency";
  const myRep = config.rep_name || "Asif Khan";
  
  const groqKey = config.groq_api_key || config.GROQ_API_KEY || process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY || '';
  
  let cleanCompanyName = companyName.split(/[\|\-]/)[0].trim().split(' ')[0].replace(/[,.!]+$/, '');
  let detectedService = "your industry";
  let personalizedBody = "";

  if (aboutText && aboutText.length > 50 && groqKey) {
    try {
      const groq = new Groq({ apiKey: groqKey });
      
      const safeChat = async (msgs: any[], maxTokens: number = 400) => {
        try {
          return await groq.chat.completions.create({
            messages: msgs,
            model: model as any,
            max_tokens: maxTokens,
            temperature: 0.7,
          });
        } catch (e: any) {
          if (e.status === 429) {
            console.warn(`⚠️ [GROQ] 70b Rate Limit hit. Falling back to 8b-instant...`);
            return await groq.chat.completions.create({
              messages: msgs,
              model: 'llama-3.1-8b-instant',
              max_tokens: Math.min(maxTokens, 300),
              temperature: 0.6,
            });
          }
          throw e;
        }
      };

      // Stage 1: Extraction & Contextual Understanding
      const extractionChat = await safeChat([{ 
        role: "system",
        content: "You are a high-precision business analyst. Extract the brand name and primary niche from website text."
      }, { 
        role: "user", 
        content: `
          Analyze this website text: "${aboutText.slice(0, 1500)}"
          
          TASK:
          1. Extract the actual 1-word BRAND NAME.
          2. IDENTIFY a specific niche service they provide (e.g., "logistics", "software development", "HVAC").
          
          RULES:
          - No locations (Dubai, UAE). No generic industry terms (Services, Group).
          - Output ONLY: BRAND: [Name], SERVICE: [Service].
        ` 
      }], 60);

      const extractionResult = extractionChat.choices[0].message.content || "";
      const brandMatch = extractionResult.match(/BRAND:\s*(.+)/i);
      const serviceMatch = extractionResult.match(/SERVICE:\s*(.+)/i);
      
      if (brandMatch) {
          const rawName = brandMatch[1].trim().split(' ')[0].replace(/[".!,]/g, '');
          const low = rawName.toLowerCase();
          const genericPrefixes = ['united', 'national', 'global', 'emirates', 'premium', 'prime', 'standard', 'ideal', 'perfect', 'royal', 'elite', 'dubai', 'uae', 'gcc', 'international', 'solutions', 'services', 'systems', 'agency', 'group', 'limited', 'llc', 'company', 'corporation', 'industries', 'n/a', 'na'];
          if (!genericPrefixes.includes(low) && low.length >= 3) cleanCompanyName = rawName;
      }

      // Domain Fallback
      if ((!cleanCompanyName || cleanCompanyName.toLowerCase() === 'n/a') && websiteUrl && websiteUrl !== 'N/A') {
          try {
              const domain = websiteUrl.replace(/https?:\/\/(www\.)?/, '').split('.')[0];
              if (domain && domain.length > 2) cleanCompanyName = domain.charAt(0).toUpperCase() + domain.slice(1);
          } catch {}
      }

      if (serviceMatch) {
          const s = serviceMatch[1].trim().toLowerCase();
          if (s.length > 3) detectedService = s;
      }

      const greeting = executiveName ? `Hi ${executiveName.split(' ')[0]},` : `Hi team at ${cleanCompanyName},`;
      
      // Stage 2: Core Outreach Pitch Generation
      const prompt = `
        KNOWLEDGE BASE:
        ${PRODUCT_KNOWLEDGE_BASE}

        YOUR IDENTITY:
        You are an Elite B2B Sales Strategist for ${myRep} at ${myCompany}.

        GOAL:
        Write a human-style, thoughtful outreach email to ${cleanCompanyName}. It should feel like a direct message from one business owner to another, not a generic sequence.

        STRUCTURE (STRICTLY USE DOUBLE LINE BREAKS BETWEEN SECTIONS):
        1. GREETING: "${greeting}"
        
        2. THE CONTEXT: A 1-sentence, direct observation about ${cleanCompanyName}'s focus on ${detectedService}. No fluff or empty praise.
        
        3. THE SOVEREIGN SWARM: We deploy private, Autonomous Sales Swarms that execute your entire outreach cycle—discovery, live website analysis, and 1-to-1 drafting—24/7 without human intervention. This replaces manual scraping and legacy databases with a live, OSINT-driven hunting machine.
        
        4. THE INVESTMENT: This is a "One-Time Build" asset that you own entirely. By moving from legacy SDR overhead and recurring SaaS rentals to your own private infrastructure, you typically reduce acquisition costs by 80%.
        
        5. CLOSING: "Would you be open to a brief 5-min chat to see how this fits ${cleanCompanyName}?"

        HUMANIZATION & BREVITY RULES:
        - BE CLINICAL AND DIRECT. Talk like an engineer, not a salesman.
        - MAX 2 SENTENCES per paragraph. 
        - BAN ALL FLUFF: No "innovation", "excellence", "redefining", "game-changer", or "thrive".
        - Focus strictly on the "24/7 Autonomy" and "One-Time Investment" benefits.
        - Output ONLY the email body.
      `;

      const chat = await safeChat([{ role: "user", content: prompt }], 400);
      personalizedBody = (chat.choices[0].message.content || "").trim();

    } catch (e: any) {
      console.error(`❌ [GROQ] Personalization Error: ${e.message}`);
    }
  }

  // Final validation
  if (!cleanCompanyName || cleanCompanyName.toLowerCase() === 'n/a') cleanCompanyName = "your company";

  // Fallback Template (Pre-Validated)
  if (!personalizedBody) {
    const greeting = executiveName ? `Hi ${executiveName.split(' ')[0]},` : `Hi team at ${cleanCompanyName},`;
    personalizedBody = `${greeting}\n\nI've been following your work in ${detectedService} and wanted to reach out.\n\nWe build custom Autonomous AI Sales Agents that handle your entire outreach cycle 24/7. Our system analyzes your public business content to draft hyper-personalized 1-to-1 pitches to your ideal clients, just like this one.\n\nWe build this as a custom asset for a flat one-time fee—meaning you own the technology and pay zero monthly subscriptions. Most partners see an 80% reduction in lead acquisition costs within the first month.\n\nWould you be open to a 5-minute chat to see how this fits ${cleanCompanyName}?`;
  }

  const finalBody = `${personalizedBody}\n\nBest,\n\n${myRep}\n${myCompany}\n${config.phone || ""}\nhttps://www.asifdigital.agency/\n${config.email || ""}`;

  return { body: finalBody, brandName: cleanCompanyName };
};

export const generateFollowUp = async (companyName: string, model: string = 'llama-3.3-70b-versatile'): Promise<string> => {
  const config = await loadSystemConfig();
  const myCompany = config.company_name || "Asif Digital Agency";
  const myRep = config.rep_name || "Asif Khan";
  const groqKey = config.groq_api_key || config.GROQ_API_KEY || process.env.GROQ_API_KEY || '';

  if (!groqKey) return `Hi team at ${companyName},\n\nJust following up on my previous email. Would you be open to a 5-minute chat about automating your B2B sales?\n\nBest,\n${myRep}\n${myCompany}`;

  try {
    const groq = new Groq({ apiKey: groqKey });
    const chat = await groq.chat.completions.create({
      messages: [{ 
        role: "user", 
        content: `Write a 2-sentence follow-up for ${companyName} regarding our AI Sales Agent. Mention it's a one-time asset with no subscriptions. Professional tone.` 
      }],
      model: model as any,
      max_tokens: 150,
    });
    return chat.choices[0].message.content || "";
  } catch {
    return `Hi team at ${companyName},\n\nJust following up on my previous email. Would you be open to a 5-minute chat about automating your B2B sales?\n\nBest,\n${myRep}\n${myCompany}`;
  }
};
