import { Groq } from "groq-sdk";
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

// v19.0: Strategic Product Mapping based on Triangle Website Menu
const getProductsForIndustry = (industry: string): string[] => {
    const ind = (industry || '').toLowerCase();
    
    // IT / Security / Low Voltage
    if (ind.includes('it') || ind.includes('security') || ind.includes('network') || ind.includes('computing')) {
        return ['Cat 6 Cables', 'Cable Trunking & System', 'Metal Enclosures'];
    }
    // Industrial / Manufacturing / Oil & Gas
    if (ind.includes('industrial') || ind.includes('factory') || ind.includes('manufacturing') || ind.includes('oil') || ind.includes('gas')) {
        return ['Motor Starters', 'Changeover Switches', 'Weatherproof Isolators', 'Armoured Cables'];
    }
    // Fire & Safety
    if (ind.includes('fire') || ind.includes('safety') || ind.includes('alarm')) {
        return ['Fire Alarm Cables', 'Weatherproof PVC Boxes', 'Earthing Accessories'];
    }
    // Residential / Fit-out / Interior
    if (ind.includes('fit-out') || ind.includes('interior') || ind.includes('villa') || ind.includes('residential')) {
        return ['Wiring Accessories', 'Ceiling / Exhaust Fans', 'Flexible cables', 'Pvc conduits'];
    }
    // General MEP / Infrastructure
    return ['Armoured cables', 'GI Conduits', 'LV Switchgears (MDB/SMDB)', 'Earthing Accessories'];
};

export const cleanName = (name: string): string => {
    if (!name) return '';
    // Decode basic HTML entities that scraper grabs from Title tags
    let cleaned = name.replace(/&#8211;/g, '-')
                      .replace(/&amp;/g, '&')
                      .replace(/&#039;/g, "'")
                      .replace(/&quot;/g, '"');
                      
    // Step 1: Split on separators and take the first chunk (including standard dashes)
    cleaned = cleaned.split(/[\|–—\/\-]/)[0].trim();
    // Strip parenthetical content fully e.g. "Al Furat Group (MEP)" -> "Al Furat Group"
    cleaned = cleaned.replace(/\s*\([^)]*\)/g, '');
    // Remove aggressive marketing/SEO prefixes
    cleaned = cleaned.replace(/^(welcome to|leading|specialized|authorized|high quality|the best|best|top|expert in|standard|official|buy|cheap|affordable|premium|trusted|certified|licensed|quality|professional|since 19\d{2}|since 20\d{2}|over \d+ years?\s*\w*)\s*/gi, '');
    cleaned = cleaned.replace(/^(authorized|specialized|registered|genuine|original|quality|high)\s*/gi, '').trim();
    // Remove trailing city/country words
    cleaned = cleaned.replace(/\s+(in\s+)?(dubai|abu\s?dhabi|sharjah|ajman|uae|rak|fujairah|al\s?ain|saudi|gcc|middle\s?east|qatar|oman|bahrain)$/gi, '');
    // Remove corporate legal entity suffixes (L.L.C, LLC, FZCO, WLL, EST, etc)
    cleaned = cleaned.replace(/\s+(l\.?l\.?c\.?|fzco|fzc|fze|co\.|inc\.|ltd\.?|limited|est\.?|establishment|group|gmbh)\b/gi, '');
    // Remove trailing business descriptors
    cleaned = cleaned.replace(/\s*(company|supplier|distributor|dealer|manufacturer|provider|services?|solutions?|installation|expertise|contractor|trading|enterprises?)$/gi, '');
    // v21.26 Identity Guard Update: Aggressively strip trailing conjunctions/prepositions
    cleaned = cleaned.replace(/\s+(and|&|in|with|for|at|office|the|of|on|to)\s*$/gi, '');
    // Remove dangling separators again
    cleaned = cleaned.replace(/\s*[-–—,&|:]\s*$/, '').trim();
    
    // Safety check: if stripping removed the entire name, revert to the first word
    if (cleaned.length < 3) cleaned = name.split(/[-–—,]/)[0].trim();
    // Final check for legal entities if they survived (e.g. no spaces)
    cleaned = cleaned.replace(/(llc|l\.l\.c|fzco|est|group)$/i, '').trim();
    return cleaned.length > 50 ? cleaned.substring(0, 47).trim() : cleaned;
};

// Fallback Google Gemini Call (Using Axios to avoid huge SDKs)
import axios from 'axios';
const callMistral = async (prompt: string, jsonMode: boolean = false): Promise<string | null> => {
    const mistralKey = process.env.MISTRAL_API_KEY || process.env.VITE_MISTRAL_API_KEY;
    if (!mistralKey) return null;
    
    try {
        const response = await axios.post(
            'https://api.mistral.ai/v1/chat/completions',
            {
                model: 'mistral-tiny',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: jsonMode ? 500 : 150,
                temperature: 0.2,
                response_format: jsonMode ? { type: 'json_object' } : undefined
            },
            {
                headers: {
                    'Authorization': `Bearer ${mistralKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const text = response.data?.choices?.[0]?.message?.content;
        return text ? text.trim() : null;
    } catch (e: any) {
        console.error("[WORKER] Mistral failed:", e.response?.data?.error?.message || e.message);
        return null;
    }
};

/**
 * Phase 21.0: Relevance Guard
 * Analyzes scraped text to determine if the lead is a valid B2B target.
 */
export const analyzeLeadRelevance = async (companyName: string, scrapedText: string): Promise<{ is_relevant: boolean, notes: string, services: string, brand_name?: string }> => {
    const prompt = `Analyze this company: "${companyName}" based on its website content: "${scrapedText.slice(0, 3000)}".
Return a JSON object:
{
  "is_relevant": boolean, 
  "reason": "short explanation",
  "brand_name": "actual business name (e.g., Al Furat) if current name is a generic category like 'Electrical Services' or 'MEP'",
  "top_3_services": ["service1", "service2", "service3"]
}
Rules: 
- is_relevant: true ONLY if they are an MEP Contractor, Interior Fit-out Company, Building Contractor, Civil Engineering, Facilities Management, ELECTRICAL CONTRACTOR, ELECTROMECHANICAL CONSULTING, or SUBSTATION CONTRACTOR in the UAE.
- is_relevant: false if they are a Supplier/Vendor/Manufacturer (e.g. Switchgear Manufacturers, Cable Suppliers, Electrical Wholesalers, Sandwich Panel Suppliers). 
- CRITICAL: A "Contractor" or "Consulting" firm is a TARGET. A "Manufacturer" or "Wholesaler" is a COMPETITOR.
- is_relevant: false if they are a Retail Shop, Auto Spare Parts, Garage, Real Estate Broker, News Site, or Publisher.
- Look for the actual company name/logo text. If the current name "${companyName}" is just a list of keywords, provide the real brand name in "brand_name".
- Return ONLY the JSON.`;

    try {
        const result = await callMistral(prompt, true);
        if (result) {
            const data = JSON.parse(result);
            return {
                is_relevant: !!data.is_relevant,
                notes: data.reason || 'No details found',
                services: (data.top_3_services || []).join(', '),
                brand_name: data.brand_name || undefined
            };
        }
    } catch (e) {
        console.error("[INTELLIGENCE] Relevance analysis failed:", e);
    }
    return { is_relevant: true, notes: 'Auto-approved (Fallback)', services: '' };
};

export const personalizeOutreach = async (companyName: string, aboutText: string, tone: string = 'Professional & Bold', model: string = 'llama-3.3-70b-versatile') => {
  const cName = cleanName(companyName);
  const targetedItems = getProductsForIndustry(aboutText);
  const itemsText = targetedItems.slice(0, 3).join(', ');

  const introPrompt = `You are Asif Khan from TRI ANGLE Elect.Ware LLC, Sharjah.
Write a VERY short, human-like 1-2 sentence observation about ${cName} based on the BACKGROUND INFO.
Goal: Mention that you can support them with ${itemsText}. Make it sound like you've seen their projects and know they need these specific items.

TONE: ${tone}. Conversational, helpful, and direct. NO corporate jargon.
BACKGROUND INFO: ${aboutText}

CRITICAL RULES:
1. Write ONLY 1-2 sentences. 
2. Start with a real observation about their specific projects or services.
3. Explicitly mention at least TWO of these items: ${itemsText}.
4. Keep it brief—like an email you'd type quickly on your phone.
5. Do NOT output "Dear Team" or placeholders. Output EXACTLY the sentences.`;

  let personalizedSentence = `I've been following ${cName}'s work in the UAE. Given your focus, I wanted to see if we can support your material needs for ${itemsText}.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: introPrompt }],
      model: model as any,
    });
    const result = chatCompletion.choices[0].message.content?.trim();
    if (result && result.length > 20) personalizedSentence = result;
  } catch (error: any) {
    console.error(`[WORKER] Groq failed (${error.status || error?.response?.status || 'Unknown'}). Attempting Mistral Fallback...`);
    const mistralKey = process.env.MISTRAL_API_KEY || process.env.VITE_MISTRAL_API_KEY;
    if (!mistralKey) {
       console.log("⚠️ Fallback failed: Please add MISTRAL_API_KEY to your .env file!");
    } else {
        const mistralResult = await callMistral(introPrompt);
        if (mistralResult && mistralResult.length > 15) {
            personalizedSentence = mistralResult;
            console.log("✅ Mistral Fallback Successful!");
        } else {
            console.log("⚠️ Fallback failed, using default generic template.");
        }
    }
  }

  // v18.1: Link Randomization (Prevents Firewall Fingerprinting)
  const linkIntro = [
    "You can view our project references and company profile here: ",
    "I've attached our capability statement and full profile for your review: ",
    "For your reference, our full company profile is available here: ",
    "If you'd like to see our past UAE projects, you can find our profile at this link: ",
    "I'm sharing our official company credentials and project list below: "
  ][Math.floor(Math.random() * 5)];

  const finalEmail = `Hi team at ${cName},
 
${personalizedSentence}
 
We specialized in the fast supply of high-precision Distribution Boards (MDB/SMDB), Ducab/Oman cables, and full Cable Management Systems. We're known for ensuring all materials match local authority (DEWA/SEWA) standards for large-scale UAE infrastructure.
 
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

/**
 * Phase 22.0: Deep Personalization with Full Website Intelligence
 * Uses scraped website content + Mistral analysis to write hyper-personalized emails.
 */
export const personalizeDeepOutreach = async (companyName: string, analysis: { notes: string, services: string, websiteContent?: string }, model: string = 'llama-3.3-70b-versatile', tone: string = 'Professional & Bold') => {
    const cName = cleanName(companyName);
    const servicesText = analysis.services || 'specialized projects';
    const websiteSnippet = (analysis.websiteContent || '').slice(0, 2500);
    
    // v22.0: Map their services to our relevant products
    const targetedItems = getProductsForIndustry(servicesText + ' ' + websiteSnippet);
    const itemsText = targetedItems.slice(0, 3).join(', ');
    
    const deepPrompt = `You are Asif Khan from TRI ANGLE Elect.Ware LLC, a B2B electrical supplier in Sharjah, UAE.
Write a greeting and a 2-sentence cold outreach opening to "${cName}". 
Your goal is to sound like a local UAE contractor/supplier, NOT an AI. CUT ALL FLUFF.

COMPANY APPRAISAL (scraped from their site):
Services: ${servicesText}
Notes: ${analysis.notes}
Website snippet: "${websiteSnippet.slice(0, 1500)}"

OUR PRODUCTS TO PITCH:
${itemsText}
(We also sell: MDBs, Ducab/Oman Cables, LV Switchgears, Cable Trays)

RULES - READ CAREFULLY OR YOU FAIL:
1. Greeting: Start with "Hi team at [REAL COMPANY NAME]," - DEDUCE THEIR ACTUAL BRAND NAME from the website snippet! If "${cName}" is just a category (like "Fire Safety"), fix it (like "Al Nuzha Safety").
2. Sentence 1: Acknowledge their exact operations using specific terminology from the scrape. (e.g. "Because your team handles MEP fit-outs...")
3. Sentence 2: State how we can supply their sites with the relevant products.
4. FORBIDDEN AI WORDS: "top-notch", "impressive", "leveraging", "efficient", "durable", "premier", "vital", "testament", "delve". Be blunt.
5. NO "I noticed". Just get straight to the point.

EXAMPLE OF GOOD (Blunt, B2B):
"Hi team at Al Nuzha Safety,

Since your mechanical division handles heavy industrial plant construction, your sites require fast material supply lines. We can support your ongoing projects with DEWA-approved MDB panels and Ducab armoured cables, available for immediate local delivery."

Write the greeting and 2 sentences now:`;

    let intro: string | null = null;
    if (model.includes('mixtral') || model.includes('mistral')) {
        intro = await callMistral(deepPrompt);
    } else {
        try {
            const res = await groq.chat.completions.create({
                messages: [{ role: "user", content: deepPrompt }],
                model: model as any,
            });
            intro = res.choices[0].message.content?.trim() || null;
        } catch (e) {
            intro = await callMistral(deepPrompt);
        }
    }
    if (!intro || intro.length < 20) {
        // Fallback: use the services info to write a semi-personalized line
        intro = `Hi team at ${cName},\n\nGiven your focus on ${servicesText}, we wanted to reach out regarding your material requirements. We can supply your sites directly with ${itemsText}, which are essential for UAE contracting projects.`;
    }
    
    // Clean up any AI artifacts
    intro = intro.replace(/^["']|["']$/g, '');
    intro = intro.replace(/I've seen|I noticed|I have noticed/gi, 'Given');

    const linkIntro = [
        "You can view our project references and company profile here: ",
        "I've attached our capability statement and full profile for your review: ",
        "For your reference, our full company profile is available here: ",
        "If you'd like to see our past UAE projects, you can find our profile at this link: ",
        "I'm sharing our official company credentials and project list below: "
    ][Math.floor(Math.random() * 5)];
    
    return `${intro}

We specialize in the fast supply of high-precision Distribution Boards (MDB/SMDB), Ducab/Oman cables, and full Cable Management Systems. We're known for ensuring all materials match local authority (DEWA/SEWA) standards for large-scale infrastructure.
 
${linkIntro}
https://drive.google.com/file/d/1T_rHZ6zOWXkOsHso0y2ncHm7rgpg5ol6/view?usp=sharing
 
Are you currently shortlisting electrical suppliers for any upcoming projects? I'd be happy to share a fresh price list for your procurement team if it helps.
 
Best regards,
 
Asif Khan
TRI ANGLE Elect.Ware LLC
+971 54 586 6094
info@triangleelectricals.com`;
};

// ... existing code ...
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

  return `Hi team at ${companyName},

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
