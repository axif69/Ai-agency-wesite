import { loadSystemConfig } from './config_manager.js';
import axios from 'axios';

/**
 * Sovereign Personalizer v3.0 — Mistral-First Architecture
 * 
 * - Primary LLM: Mistral AI (mistral-small-latest)
 * - Fallback LLM: Groq (llama-3.3-70b-versatile)
 * - ALL config comes from DB via loadSystemConfig()
 * - Zero .env references
 */

// ─── Sanitizer ───────────────────────────────────────────────────────────────
export const sanitizeEmail = (text: string): string => {
  if (!text) return '';
  let sanitized = text;
  sanitized = sanitized.replace(/\*\*/g, '');
  sanitized = sanitized.replace(/\*/g, '');
  sanitized = sanitized.replace(/^Subject:.*\n?/gmi, ''); // Strip any subject lines the AI hallucinates
  sanitized = sanitized.replace(/^(Dear|Hello|Greetings|To whom).*\n?/gmi, ''); // Strip generic greetings
  sanitized = sanitized.replace(/\[Your Name\]/gi, '');
  sanitized = sanitized.replace(/\[.*?\]/g, ''); // Strip ALL bracket placeholders
  return sanitized.trim();
};

// ─── Brand Name Extractor ────────────────────────────────────────────────────
export const cleanName = (name: string, negativeKeywords: string = ''): string => {
    if (!name) return '';
    
    // Decode HTML entities
    let cleaned = name
        .replace(/&#8211;/g, '-')
        .replace(/&amp;/g, '&')
        .replace(/&#038;/g, '&')
        .replace(/&#039;/g, "'")
        .replace(/&quot;/g, '"');
                      
    // Cut everything after first separator (|, –, —, -, /)
    cleaned = cleaned.replace(/\s*[|–—].*$/g, '');
    cleaned = cleaned.replace(/\s*[-\/].*$/g, '');
    
    // Strip Geo suffixes
    cleaned = cleaned.replace(/\s+(Dubai|Abu Dhabi|Sharjah|Ajman|UAE|GCC|Middle East|Al Ain|RAK|Fujairah|Umm Al Quwain|in Dubai|in UAE|in Sharjah)$/gi, '');
    
    // Strip leading SEO noise
    cleaned = cleaned.replace(/^(the|welcome to|leading|specialized|authorized|top|best|things to do in|visit|discover|about|home|news|official registered)\s+/gi, '');
    
    // Remove parentheses content
    cleaned = cleaned.replace(/\s*\([^)]*\)/g, '');
    
    // If it's still long (>4 words), take the first 2 words as the brand core
    const words = cleaned.trim().split(/\s+/);
    if (words.length > 4) {
        cleaned = words.slice(0, 2).join(' ').trim();
    }
    
    // v24.0: Dashboard-Driven Identity Guard
    const lowerName = cleaned.toLowerCase();
    
    // Dynamically filter using the Dashboard's Negative Keywords
    if (negativeKeywords && negativeKeywords.trim()) {
        const userKeywords = negativeKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 0);
        if (userKeywords.some(k => lowerName.includes(k))) {
            return ''; // Junk topic hit -> return empty name fallback
        }
    }

    if (lowerName === 'official registered' || lowerName.includes('official registered') || cleaned.length < 2) {
        return '';
    }
    
    return cleaned.length > 25 ? cleaned.substring(0, 22).trim() : cleaned;
};

// ─── Mistral AI Caller (Primary Engine) ──────────────────────────────────────
const callMistral = async (
    systemMessage: string, 
    userMessage: string, 
    apiKey: string,
    jsonMode: boolean = false
): Promise<string | null> => {
    if (!apiKey) {
        console.warn('⚠️ Mistral API Key not configured. Skipping Mistral call.');
        return null;
    }
    
    try {
        const response = await axios.post(
            'https://api.mistral.ai/v1/chat/completions',
            {
                model: 'mistral-small-latest',
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 600,
                temperature: 0.65,
                ...(jsonMode ? { response_format: { type: 'json_object' } } : {})
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );
        return response.data.choices[0].message.content;
    } catch (e: any) {
        console.error("❌ Mistral API Error:", e.response?.data?.message || e.message);
        return null;
    }
};

// ─── Groq Fallback Caller ────────────────────────────────────────────────────
const callGroq = async (
    systemMessage: string, 
    userMessage: string, 
    apiKey: string,
    model: string = 'llama-3.3-70b-versatile',
    jsonMode: boolean = false
): Promise<string | null> => {
    if (!apiKey) return null;
    
    try {
        const { Groq } = await import("groq-sdk");
        const groq = new Groq({ apiKey });
        const response = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: userMessage }
            ],
            model: model,
            temperature: 0.6,
            max_tokens: 600,
            ...(jsonMode ? { response_format: { type: 'json_object' } } : {})
        });
        return response.choices[0].message.content || null;
    } catch (e: any) {
        console.error("❌ Groq Fallback Error:", e.message);
        return null;
    }
};


// ═══════════════════════════════════════════════════════════════════════════════
// SOVEREIGN OUTREACH ENGINE — MISTRAL-FIRST, FLUID TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════════
export const personalizeDeepOutreach = async (
    companyName: string, 
    analysis: { 
        notes: string, 
        services: string, 
        websiteContent?: string, 
        email?: string, 
        website?: string,
        targetProject?: string 
    }
): Promise<string | null> => {
    const config = await loadSystemConfig();
    const cName = cleanName(companyName, config.negative_keywords);
    const websiteSnippet = (analysis.websiteContent || '').replace(/\s+/g, ' ').substring(0, 4000);
    
    // ─── GUARD 1: Missing API Keys ───
    if (!config.mistral_api_key && !config.groq_api_key) {
        console.error(`\n🛑 ENGINE HALTED: Missing configuration in Dashboard.`);
        console.error(`   → No MISTRAL_API_KEY and no GROQ_API_KEY found in DB.`);
        console.error(`   → Go to Dashboard > Settings and save at least one API key.\n`);
        return null;
    }

    // ─── GUARD 2: Missing SMTP Credentials ───
    if (!config.email || !config.gmail_pass) {
        console.error(`\n🛑 ENGINE HALTED: Missing configuration in Dashboard.`);
        console.error(`   → No EMAIL_USER or GMAIL_APP_PASS found in DB.`);
        console.error(`   → Go to Dashboard > Settings and save your SMTP credentials.\n`);
        return null;
    }
    
    // ─── GUARD 3: No scraped content = No email ───
    if (!websiteSnippet || websiteSnippet.length < 50) {
        console.warn(`⚠️ PERSONALIZER: No scraped website content for "${companyName}". Marking as scrape_failed.`);
        return null; // Caller must check for null and mark lead as scrape_failed
    }
    
    // ─── VERIFICATION LOGGING ───
    console.log(`\n🧠 ─── MISTRAL DRAFTING ENGINE ───`);
    console.log(`   Target Brand Name: ${cName || '[GENERIC - "Hi team"]'}`);
    console.log(`   Scraped Content Length: ${websiteSnippet.length} chars`);
    console.log(`   Mistral Key Present: ${!!config.mistral_api_key}`);
    console.log(`   Groq Key Present: ${!!config.groq_api_key}`);
    
    // ─── BUILD PROMPT (FLUID ARCHITECTURE) ───
    const repName = config.rep_name || 'Asif Khan';
    const agencyName = config.company_name || 'Asif Digital';
    
    const systemMessage = `You are ${repName} from ${agencyName}.
${config.pitch_context ? `CORE PITCH, STRUCTURE, & IDENTITY RULES:\n${config.pitch_context}\n` : 'OUR PRODUCT: Premium B2B AI Systems.'}
${config.company_knowledge ? `OUR DETAILED KNOWLEDGE BASE:\n${config.company_knowledge}\n` : ''}

${config.tone === 'Ultra-Premium/Elite' ? `ELITE TONE DIRECTIVE: Speak with high authority. Use "we" and "us". Focus on the "unfair advantage" and "sovereignty" our system Provides. Be concise, exclusive, and slightly provocative. Avoid fluff.` : ''}

ULTRA-ELITE "WOW FACTOR" DIRECTIVE: 
Do NOT write a standard, boring B2B sales email. The reader ignores 50 generic SDR emails a day. 
YOUR JOB is to shatter their pattern:
1. Write a hyper-personalized, punchy, conversational hook based on their website.
2. Use powerful, disruptive copywriting (e.g. "We deploy autonomous AI sales engines", "Zero recurring fees. Complete ownership").
3. DO NOT sound like a corporate robot. Sound like an elite tech founder talking directly to another founder.
4. Keep the email shockingly short, extremely confident, and highly compelling.`;

    const userMessage = `Target Company Name: ${cName || companyName}

SCRAPED WEBSITE CONTENT FROM TARGET:
${websiteSnippet}

INSTRUCTION:
Analyze the target's website to understand what they do.
Draft a highly personalized lead-generation email combining their extracted info with our WOW FACTOR directive.

IMPORTANT:
- Do not invent services they do not offer.
- Exactly follow the WOW FACTOR rules above. Output ONLY the raw email body. No subject lines, no intro remarks.`;

    // ─── TRY MISTRAL FIRST ───
    let emailBody = await callMistral(systemMessage, userMessage, config.mistral_api_key);
    console.log(`   Mistral Prompt Triggered: ${!!emailBody}`);
    
    // ─── FALLBACK TO GROQ ───
    if (!emailBody || emailBody.length < 30) {
        console.log(`   ⚡ Falling back to Groq...`);
        emailBody = await callGroq(systemMessage, userMessage, config.groq_api_key);
        console.log(`   Groq Fallback Triggered: ${!!emailBody}`);
    }

    const displayName = cName || companyName || 'team';

    // ─── v23.2: ELITE VISUALS & CTA ───
    const imgUrl = config.outreach_image_url;
    let imageEmbed = '';
    
    if (imgUrl) {
        let directUrl = imgUrl;
        if (imgUrl.includes('drive.google.com/file/d/')) {
            const fileId = imgUrl.split('/d/')[1]?.split('/')[0];
            // Use Google's hidden image CDN to bypass Gmail's Drive attachment widget
            if (fileId) directUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
        }
        
        // Use directUrl for the anchor tag so the user sees the high-res dashboard upon click,
        // rather than taking them generically to the agency website.
        
        imageEmbed = `
<div style="margin-top: 30px; margin-bottom: 20px; text-align: left;">
    <p style="margin-bottom: 12px; font-family: sans-serif; font-size: 15px; color: #333; font-weight: bold;">
        Here is a preview of your custom AI agent dashboard:
    </p>
    <img src="${directUrl}" alt="Sovereign Dashboard" width="450" style="max-width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid #eee; cursor: pointer;" />
</div>`;
    }

    // ─── GUARANTEED GREETING & SIGNATURE BLOCK ───
    const greeting = `Hi ${displayName},\n\n`;
    const cleanBodyText = sanitizeEmail(greeting + emailBody);
    const signature = `\n${imageEmbed}\nBest regards,\n\n${repName}\nFounder, ${agencyName}\n${config.company_url || 'asifdigital.agency'}\n${config.phone ? `Phone: ${config.phone}\n` : ''}${config.email || 'Aiautomationdevelopement@gmail.com'}`;
    
    return cleanBodyText + signature;
};


// Legacy wrapper
export const personalizeOutreach = async (companyName: string, website: string, tone: string = 'Professional', model: string = 'llama-3.3-70b-versatile') => {
    return personalizeDeepOutreach(companyName, { notes: 'General B2B Inquiry', services: 'Digital Solutions' });
};

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 3: SMART COMPANY NAME EXTRACTION VIA LLM
// ═══════════════════════════════════════════════════════════════════════════════
export const analyzeLeadRelevance = async (
    companyName: string, 
    scrapedText: string, 
    notes: string
): Promise<{ isRelevant: boolean, reason: string, brandName: string, targetProject: string }> => {
    const config = await loadSystemConfig();
    
    const systemMessage = `You are a B2B lead qualification analyst. Extract the REAL commercial brand name and a specific project/service from the provided data. Return ONLY valid JSON.`;
    
    const userMessage = `LEAD METADATA:
Scraped Title: ${companyName}
Website URL: ${notes.match(/https?:\/\/[^\s]+/)?.[0] || 'N/A'}
Scraped Website Text: ${(scrapedText || '').substring(0, 3000)}

TASK: Extract the REAL commercial brand name and identify a specific recent project or service.
RULES:
1. Return JSON: { "isRelevant": boolean, "reason": "string", "brandName": "string", "targetProject": "string" }
2. "brandName": The core commercial brand ONLY (e.g. "Simba", "Al Futtaim"). Strip all SEO noise, page titles, and generic text.
3. "targetProject": A specific service, capability, or recent project found in their scraped text (e.g. "luxury villa fit-outs in Dubai Hills" or "industrial HVAC installations").
4. "isRelevant": true if this is a legit B2B business target, false if it's a directory, news site, or consumer service.
5. RETURN ONLY JSON. No explanation.`;

    // Try Mistral first for brand extraction
    let result: any = null;
    const mistralResponse = await callMistral(systemMessage, userMessage, config.mistral_api_key, true);
    if (mistralResponse) {
        try { result = JSON.parse(mistralResponse); } catch {}
    }
    
    // Fallback to Groq
    if (!result) {
        const groqResponse = await callGroq(systemMessage, userMessage, config.groq_api_key, 'llama3-8b-8192', true);
        if (groqResponse) {
            try { result = JSON.parse(groqResponse); } catch {}
        }
    }
    
    if (result) {
        return {
            isRelevant: result.isRelevant !== false,
            reason: result.reason || "B2B Target Match",
            brandName: result.brandName || companyName,
            targetProject: result.targetProject || ''
        };
    }
    
    // Total fallback — no AI available
    return { isRelevant: true, reason: "Manual bypass (no AI key)", brandName: companyName, targetProject: '' };
};

export const generateFollowUp = async (companyName: string, previousPitch: string): Promise<string> => {
    return "Following up on my previous note. Let me know if you are open to a quick roadmap session.";
};
