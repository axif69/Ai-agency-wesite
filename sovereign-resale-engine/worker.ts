import { db, initDB, recordOutreach, upsertContact, extractDomain } from './db.js';
import { scrapeAboutPage, findLeads, findLeadTargetsFast, callAI, assessEnterpriseBuyerFit } from './search_service.js';
import { personalizeOutreach, generateFollowUp } from './personalizer.js';
import { sendEmail } from './gmail_service.js';
import { verifyMailbox, isPort25Blocked } from './verifier.js';
import { logToDashboard, analyzeSentiment } from './shared_utils.js';
import { enrichCompanyData } from './email_discovery.js';
import { isStrictPersonEmail, normalizePhone, validateEmail } from './contact_validation.js';
import { loadSystemConfig } from './config_manager.js';
import { scrapeBounces } from './bounce_scraper.js';
import { checkOutreachSafetyGate } from './workers/outreach_worker';
import { getProcessableEnrichmentBatch } from './workers/enrichment_worker';
import { executeWaterfallEnrichment } from './waterfall_enrichment';
import { advanceLeadDripStep, haltDripSequenceForLead } from './drip_campaign';
import { dispatchWebhookAlert } from './alert_dispatcher';
import { fileURLToPath } from 'url';
import path from 'path';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const decodeHtmlEntities = (str: string) => str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)).replace(/&[a-z]+;/g, ' ');

// ─── DYNAMIC MULTI-TENANT SAAS DISCOVERY ───
const isWeakDiscoveryQuery = (query: string, settings?: any): boolean => {
    const lower = String(query || '').toLowerCase();
    const userNegatives = parseKeywordList(settings?.negative_keywords || settings?.NEGATIVE_KEYWORDS).map(k => k.toLowerCase());
    if (userNegatives.some(neg => neg && lower.includes(neg))) return true;
    
    // Generic non-B2B or directory search terms
    const genericNonB2b = ['directory', 'yellow pages', 'free download', 'wikipedia', 'jobs', 'vacancy'];
    return genericNonB2b.some(term => lower.includes(term));
};

let nicheIndex = 0; // Persistent index for Round-Robin selection
let lastPlanKey = '';
let lastPlanQueries: string[] = [];
let lastPlanTime = 0; // Timestamp of last plan generation
let usedQueries = new Set<string>(); // Track queries already run this cycle
const queryOffsetMap = new Map<string, number>(); // Track search engine page offset per query

const parseKeywordList = (value: any): string[] =>
    String(value || '')
        .split(/[\n,;|]+/)
        .map(part => part.trim())
        .filter(Boolean);

const safeParseDynamicNiches = (value: any): string[] => {
    try {
        const parsed = JSON.parse(String(value || '[]'));
        return Array.isArray(parsed) ? parsed.map(item => String(item || '').trim()).filter(Boolean) : [];
    } catch {
        return [];
    }
};

const normalizeDiscoveryQuery = (value: string): string => {
    let normalized = String(value || '').replace(/\s+/g, ' ').trim();
    const suffixes = 'companies|contractors|developers|clinics|suppliers|consultancies|firms|services';
    for (let i = 0; i < 3; i++) {
        normalized = normalized.replace(new RegExp(`\\b(${suffixes})(?:\\s+\\1)+\\b`, 'gi'), '$1');
    }
    return normalized;
};

const discoveryQueryKey = (value: string): string => normalizeDiscoveryQuery(value).toLowerCase();

const cleanDiscoveredCompanyName = (value: any): string => {
    const raw = String(value || '').replace(/\s+/g, ' ').trim();
    if (!raw.includes('|')) return raw;

    const parts = raw.split('|').map(part => part.trim()).filter(Boolean);
    const legalEntity = parts.find(part =>
        /\b(?:l\.?l\.?c\.?|llp|fze|fzco|pjsc|ltd\.?|limited|inc\.?|corp\.?|corporation|establishment)\b/i.test(part)
        && !/\b(?:best|top|near me)\b/i.test(part)
    );
    return legalEntity || parts[0] || raw;
};

const withLocation = (query: string, location: string): string => {
    const cleanQuery = String(query || '').trim();
    const cleanLocation = String(location || 'UAE').trim();
    if (!cleanQuery) return cleanLocation;
    const locationPattern = new RegExp(`\\b${cleanLocation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'ig');
    const withoutLocation = cleanQuery.replace(locationPattern, ' ').replace(/\s+/g, ' ').trim();
    const normalized = normalizeDiscoveryQuery(withoutLocation);
    return `${normalized || cleanQuery} ${cleanLocation}`.trim();
};

const withoutTargetLocation = (query: string, location: string): string => {
    const cleanLocation = String(location || 'UAE').trim();
    const locationPattern = new RegExp(`\\b${cleanLocation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'ig');
    return normalizeDiscoveryQuery(String(query || '')
        .replace(locationPattern, ' ')
        .replace(/\s+/g, ' ')
        .trim());
};

const expandQuery = (query: string): string[] => {
    const lower = String(query || '').toLowerCase();
    const expansions: Record<string, string[]> = {
        'mep': ['mechanical electrical plumbing', 'mechanical engineering', 'electrical contracting'],
        'hvac': ['air conditioning contractors', 'mechanical contractors', 'cooling systems'],
        'fit-out': ['fitout contractors', 'interior contracting', 'office fit out'],
        'fit out': ['fitout contractors', 'interior contracting', 'office fit out'],
        'switchgear': ['panel builders', 'electrical panels', 'lv switchgear'],
        'electromechanical': ['mep contractors', 'mechanical electrical contractors'],
        'logistics': ['freight forwarding', 'supply chain', 'warehousing'],
        'real estate': ['property brokerage', 'property consultants', 'real estate development'],
        'recruitment': ['staffing agency', 'executive search', 'talent acquisition'],
        'legal': ['law firm', 'legal consultancy', 'corporate legal services'],
        'audit': ['accounting firm', 'tax advisory', 'financial advisory']
    };

    const variants = [query];
    for (const [needle, replacements] of Object.entries(expansions)) {
        if (lower.includes(needle)) {
            for (const replacement of replacements) {
                variants.push(query.toLowerCase().replace(needle, replacement));
            }
        }
    }
    return Array.from(new Set(variants.map(v => String(v || '').trim()).filter(Boolean)));
};

// 100% DYNAMIC — no hardcoded niche arrays. Seeds generated from dashboard settings.
const get6SeedsForNiche = (niche: string): string[] => {
    const clean = niche.trim();
    if (!clean) return [];
    // Generate 6 diverse search seed variations dynamically for ANY niche
    const base = clean.replace(/\s+(companies|agencies|firms|contractors|services)$/i, '').trim();
    return [
        clean,
        `${base} Companies`,
        `${base} Services`,
        `B2B ${base} Firms`,
        `${base} Agencies`,
        `Top ${base} Providers`
    ];
};

const buildAutonomousQueries = (settings: any): string[] => {
    const rawLocations = String(settings.target_location || settings.TARGET_LOCATION || 'UAE').replace(/[\s,]+$/g, '');
    const locations = rawLocations.split(',').map((l: string) => l.trim()).filter(Boolean);
    if (locations.length === 0) locations.push('UAE');

    const dynamicNiches = safeParseDynamicNiches(settings.DYNAMIC_NICHES || settings.dynamic_niches);
    // Fallback chain: dashboard niches → required_keywords → pitch context extraction
    const requiredKw = parseKeywordList(settings.required_keywords || settings.REQUIRED_KEYWORDS).filter(Boolean);
    const pitchNiches = String(settings.pitch_context || settings.PITCH_CONTEXT || '')
        .split(/[,;\n]+/).map((s: string) => s.trim()).filter((s: string) => s.length > 3).slice(0, 6);
    const nichesToUse = dynamicNiches.length > 0 ? dynamicNiches
        : requiredKw.length > 0 ? requiredKw
        : pitchNiches.length > 0 ? pitchNiches
        : ['B2B Services'];
    const negativeKeywords = parseKeywordList(settings.negative_keywords || settings.NEGATIVE_KEYWORDS).map((k: string) => k.toLowerCase());

    const generatedQueries: string[] = [];

    // Shoot 6 distinct seed query variations for each location x niche pair
    for (const loc of locations) {
        for (const niche of nichesToUse) {
            const seeds = get6SeedsForNiche(niche);
            for (const seed of seeds) {
                const queryStr = `${seed} ${loc}`.trim();
                const lower = queryStr.toLowerCase();
                const isNegative = negativeKeywords.some((neg) => neg && lower.includes(neg));
                if (!isNegative) {
                    generatedQueries.push(queryStr);
                }
            }
        }
    }

    const uniqueMap = new Map<string, string>();
    generatedQueries.forEach(q => uniqueMap.set(q.toLowerCase(), q));
    return Array.from(uniqueMap.values());
};

const rankQueries = (queries: string[], settings: any): { query: string; score: number; reason: string }[] => {
    const pitch = String(settings.pitch_context || settings.PITCH_CONTEXT || '').toLowerCase();
    const knowledge = String(settings.company_knowledge || settings.COMPANY_KNOWLEDGE || '').toLowerCase();
    const required = parseKeywordList(settings.required_keywords || settings.REQUIRED_KEYWORDS).map(item => item.toLowerCase());
    const negative = parseKeywordList(settings.negative_keywords || settings.NEGATIVE_KEYWORDS).map(item => item.toLowerCase());
    const location = String(settings.target_location || settings.TARGET_LOCATION || 'UAE').toLowerCase();

    return queries.map((query) => {
        const q = String(query || '').trim();
        const lower = q.toLowerCase();
        let score = 0;
        const reasons: string[] = [];

        // User explicit targeting is AUTHORITATIVE (+100 score)
        if (required.some(item => lower.includes(item))) { score += 100; reasons.push('user-required'); }
        if (pitch && pitch.split(/\s+/).some(word => word.length > 5 && lower.includes(word))) { score += 40; reasons.push('pitch-fit'); }
        if (knowledge && knowledge.split(/\s+/).some(word => word.length > 5 && lower.includes(word))) { score += 30; reasons.push('knowledge-fit'); }
        if (lower.includes(location)) { score += 10; reasons.push('location'); }
        if (negative.some(item => item && lower.includes(item))) { score -= 150; reasons.push('blocked'); }

        if (isWeakDiscoveryQuery(q, settings)) { score -= 100; reasons.push('weak-category'); }

        if (/\b(services|companies|contractors|consultants|providers|firms|builders|developers|clinics|suppliers)\b/.test(lower)) score += 10;

        return { query: q, score, reason: reasons.slice(0, 3).join(', ') || 'baseline' };
    }).sort((a, b) => b.score - a.score);
};

const normalizeAiQueryCandidate = (value: unknown): string => {
    let query = String(value || '').trim();
    query = query.replace(/^[\-\d.)\s]+/, '').trim();
    query = query.replace(/^["'`\s,\[\]:{}]+|["'`\s,\[\]:{}]+$/g, '').trim();
    query = query.replace(/\s+/g, ' ');

    const lower = query.toLowerCase();
    const invalidTokens = [
        'json', '```', '{', '}', '[', ']', 'return only', 'search phrases',
        'queries', 'query', 'location:', 'client company:', 'pitch context:'
    ];

    if (!query || query.length < 6) return '';
    if (invalidTokens.some(token => lower === token || lower.includes(token))) return '';
    if (!/[a-z]/i.test(query)) return '';

    return query;
};

const parseAiQueryPlan = (raw: string): string[] => {
    let text = String(raw || '').trim();
    if (!text) return [];

    // Strip markdown code block wrappers
    if (text.includes('```')) {
        const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
            text = match[1].trim();
        } else {
            text = text.replace(/```(?:json)?/gi, '').trim();
        }
    }

    try {
        const parsed = JSON.parse(text);
        const candidate = Array.isArray(parsed) ? parsed : parsed?.queries || parsed?.search_queries || parsed?.items || [];
        if (Array.isArray(candidate)) {
            return candidate.map(normalizeAiQueryCandidate).filter(Boolean);
        }
    } catch {}

    return text
        .split(/\r?\n/)
        .map(normalizeAiQueryCandidate)
        .filter(Boolean);
};

const buildAiDiscoveryPlan = async (settings: any): Promise<string[]> => {
    const pitch = String(settings.pitch_context || settings.PITCH_CONTEXT || '').trim();
    const knowledge = String(settings.company_knowledge || settings.COMPANY_KNOWLEDGE || '').trim();
    const companyName = String(settings.company_name || settings.COMPANY_NAME || 'the client').trim();
    const location = String(settings.target_location || settings.TARGET_LOCATION || 'UAE').trim();
    const requiredKeywords = parseKeywordList(settings.required_keywords || settings.REQUIRED_KEYWORDS);
    const negativeKeywords = parseKeywordList(settings.negative_keywords || settings.NEGATIVE_KEYWORDS);
    const dynamicNiches = safeParseDynamicNiches(settings.DYNAMIC_NICHES);
    const planKey = [
        companyName,
        location,
        pitch.slice(0, 250),
        knowledge.slice(0, 250),
        requiredKeywords.join('|'),
        negativeKeywords.join('|'),
        dynamicNiches.join('|')
    ].join('::');

    if (lastPlanKey === planKey && lastPlanQueries.length > 0 && (Date.now() - lastPlanTime) < 30 * 60 * 1000) {
        return lastPlanQueries;
    }

    const searchedList = Array.from(usedQueries).slice(-40).join(', ');
    const prompt = `
You are an expert AI B2B Sales Lead Generation Strategist for a SaaS Sales Engine.
Your task is to analyze the client's business profile, offer, and knowledge base, then generate 10 to 18 FRESH, highly targeted search engine queries to find ideal candidate buyer businesses in ${location}.

Client Company Name: ${companyName}
Target Location: ${location}

Pitch / Product Offer:
${pitch || 'B2B Services & Solutions'}

Company Knowledge Base:
${knowledge || '(none)'}

Target Keywords / Industries:
${requiredKeywords.join(', ') || '(none)'}

Negative Keywords / Blocklist (STRICTLY EXCLUDE THESE):
${negativeKeywords.join(', ') || '(none)'}

Already Searched Queries (DO NOT REPEAT ANY OF THESE):
${searchedList || '(none)'}

Instructions:
1. Generate NEW, concise, 2-to-4-word search queries that a human SDR would type into Google to find candidate buyer companies for THIS specific offer in ${location}.
2. Vary the angles, industry sub-niches, company types, and locations (e.g. "software companies dubai", "b2b IT consultancies uae", "technology vendors abu dhabi").
3. Do NOT include generic directories, job boards, or previously searched queries listed above.
4. Return ONLY a raw JSON array of strings containing search terms, e.g. ["query 1", "query 2"]. Do not include markdown code block syntax.
`.trim();

    const aiResponse = await callAI(prompt);
    const aiQueries = parseAiQueryPlan(aiResponse);
    const fallback = buildAutonomousQueries(settings);

    const safeAiQueries = aiQueries.filter(query => !isWeakDiscoveryQuery(query, settings));
    const finalQueries = [...safeAiQueries, ...fallback];
    const merged = rankQueries(Array.from(new Set(finalQueries)), settings)
        .filter(item => !isWeakDiscoveryQuery(item.query, settings))
        .map(item => item.query)
        .slice(0, 20);

    lastPlanKey = planKey;
    lastPlanTime = Date.now();
    lastPlanQueries = merged;
    return merged;
};

const shouldSkipLeadByTargeting = (lead: any, settings: any): boolean => {
    const negativeKeywords = parseKeywordList(settings.negative_keywords || settings.NEGATIVE_KEYWORDS).map(keyword => keyword.toLowerCase());
    const haystack = `${lead.company_name || ''} ${lead.website || ''} ${lead.email || ''}`.toLowerCase();

    // Only skip if lead matches a strictly banned/negative keyword
    if (negativeKeywords.some(keyword => keyword && haystack.includes(keyword))) return true;
    return false;
};

const DISCOVERY_BLOCKED_DOMAINS: string[] = [];

const DISCOVERY_NOISE_TERMS: string[] = [];
const DISCOVERY_BAD_COMPANY_TERMS: string[] = [];

const DISCOVERY_BUYER_TERMS = [
    'company', 'companies', 'services', 'llc', 'l.l.c', 'group', 'solutions',
    'consulting', 'consultancy', 'contractors', 'contracting', 'engineering',
    'technical', 'systems', 'logistics', 'management', 'agency', 'agencies',
    'industrial', 'commercial', 'corporate', 'enterprise', 'provider', 'providers',
    'firm', 'firms', 'trading'
];

const evaluateDiscoveryLeadQuality = (lead: any, query: string, settings: any): { accept: boolean; reason: string; score: number } => {
    const company = String(lead.company_name || '').trim();
    const website = String(lead.website || '').toLowerCase();
    const domain = String(lead.domain || '').toLowerCase();
    const category = String(query || '').toLowerCase();
    const entityHaystack = `${company} ${website} ${domain} ${lead.email || ''} ${lead.mobile || ''} ${lead.category || ''} ${lead.context || ''} ${query}`.toLowerCase();
    const source = String(lead.source || '').toLowerCase();
    const companyEvidence = `${company} ${website} ${domain} ${lead.context || ''}`.toLowerCase();
    const location = String(settings.target_location || settings.TARGET_LOCATION || 'UAE').toLowerCase();
    const isUaeTarget = /uae|dubai|abu dhabi|sharjah|ajman|ras al khaimah|fujairah|al ain/.test(location);
    const localSignal = /\.ae\b/.test(domain) || /uae|dubai|abu dhabi|sharjah|ajman|ras al khaimah|fujairah|al ain|\+971/.test(entityHaystack) || source.includes('gmb') || source.includes('ninja') || category.includes('uae') || category.includes('dubai') || true;
    const buyerSignal = DISCOVERY_BUYER_TERMS.some(term => entityHaystack.includes(term));
    const noiseSignal = DISCOVERY_NOISE_TERMS.some(term => entityHaystack.includes(term));
    const badCompanySignal = DISCOVERY_BAD_COMPANY_TERMS.some(term => entityHaystack.includes(term));
    const genericSingleTokenCompany = !company.includes(' ')
        && !/\b(llc|l\.l\.c|group|systems|contracting|contractors|clinic|medical|engineering|technical|trading|logistics|properties|real estate|consultancy|consulting|management)\b/i.test(company);
    const hasOfficialDomain = domain.includes('.')
        && !/^\d+(?:\.\d+){3}$/.test(domain)
        && !DISCOVERY_BLOCKED_DOMAINS.some(blocked => domain === blocked || domain.endsWith(`.${blocked}`));
    const invalidWebsite = !/^https?:\/\//i.test(website)
        || /(?:^|\/\/)(?:wa\.me|api\.whatsapp\.com|maps\.google\.|goo\.gl)(?:\/|$)/i.test(website);
    const negativeKeywords = parseKeywordList(settings.negative_keywords || settings.NEGATIVE_KEYWORDS);
    const excludedSegment = negativeKeywords.some(bad => bad && companyEvidence.includes(bad.toLowerCase()));
    
    if (!company || company.length < 3) return { accept: false, reason: 'missing company name', score: 0 };
    if (invalidWebsite || !hasOfficialDomain) return { accept: false, reason: 'no official company website', score: 0 };
    if (DISCOVERY_BLOCKED_DOMAINS.some(blocked => domain === blocked || domain.endsWith(`.${blocked}`))) return { accept: false, reason: 'blocked content/domain site', score: 0 };
    if (badCompanySignal) return { accept: false, reason: 'known content/noise brand', score: 0 };
    if (noiseSignal) return { accept: false, reason: 'directory/content/non-buyer signal', score: 0 };
    if (excludedSegment) return { accept: false, reason: 'excluded low-value or competing segment', score: 0 };

    let score = 50;
    if (buyerSignal) score += 20;
    if (lead.email || lead.mobile) score += 10;
    if (domain.endsWith('.ae')) score += 10;

    const genericDirectoryBrand = /^(?:contractors|companies|suppliers|businesses|services)\s+(?:uae|dubai|sharjah|abu dhabi)$/i.test(company);
    if (genericDirectoryBrand) return { accept: false, reason: 'generic directory brand', score: 0 };
    return { accept: true, reason: 'qualified', score };
};

// ─── Database Helpers (Self-Contained) ──────────────────────────────────────
const getTodaySentCount = (): Promise<number> => new Promise((res) => {
    const today = new Date().toISOString().split('T')[0];
    db.get("SELECT emails_sent FROM analytics WHERE date = ?", [today], (err, row: any) => res(row?.emails_sent || 0));
});

export const getReadyLeads = (): Promise<any[]> => new Promise((res) => {
    db.all("SELECT * FROM leads WHERE status IN ('ready', 'priority_ready') AND email IS NOT NULL AND COALESCE(is_relevant, 0) = 1 AND COALESCE(relevance_score, 0) >= 70 ORDER BY relevance_score DESC LIMIT 50", (err, rows) => res(rows || []));
});

type EvidenceFact = { fact: string; source_url: string };

const parseJsonArray = (value: any): any[] => {
    try {
        const parsed = JSON.parse(String(value || '[]'));
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const extractEvidenceFacts = (rawText: string, sourceUrl: string): EvidenceFact[] => {
    const cleaned = String(rawText || '')
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const reject = /cookie|privacy policy|terms of use|copyright|all rights reserved|subscribe|follow us|javascript|menu|read more/i;
    const candidates = cleaned.split(/(?<=[.!?])\s+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length >= 45 && sentence.length <= 220 && !reject.test(sentence));
    const unique = new Map<string, EvidenceFact>();
    for (const sentence of candidates) {
        const key = sentence.toLowerCase().replace(/[^a-z0-9]+/g, ' ').slice(0, 100);
        if (!unique.has(key)) unique.set(key, { fact: sentence, source_url: sourceUrl });
        if (unique.size === 3) break;
    }
    return Array.from(unique.values());
};

const isMeaningfulProspectFact = (fact: EvidenceFact): boolean => {
    const text = String(fact?.fact || '').toLowerCase();
    if (!/^https?:\/\//i.test(String(fact?.source_url || ''))) return false;
    if (/call now|know more|read more|contact us|best health care|comprehensive|empowers|critical work|©|®/.test(text)) return false;
    return /\b(sells?|provides?|serves?|speciali[sz]es?|integrat|manufactur|distribut|logistics?|software|platform|solution|hospital|clinic|facility|project|industry|market|customer|client|stakeholder|reduce|reducing|forecast|inventory|labor|food|costs?|profitability|margins?|restaurant|erp|operational efficiency)\b/.test(text);
};

const hasPersonLevelEvidence = (lead: any): boolean => {
    const sourceEvidence = parseJsonArray(lead.contact_source_evidence_json);
    return Boolean(
        lead.contact_name &&
        (lead.linkedin_url ||
            Number(lead.person_identity_verified || 0) === 1 ||
            sourceEvidence.length > 0) &&
        Number(lead.person_name_confidence || 0) >= 80 &&
        Number(lead.role_confidence || 0) >= 70
    );
};

const hasOpenDraft = (leadId: number): Promise<boolean> => new Promise((resolve) => {
    db.get("SELECT id FROM outreach_drafts WHERE lead_id = ? AND approval_status IN ('draft','approved') LIMIT 1", [leadId],
        (err, row) => resolve(!err && Boolean(row)));
});

const BANNED_PHRASES = [
    'scalable growth', 'competitive market', 'predictable roi', 'demands a more efficient way',
    'streamline', 'leverage', 'cutting-edge', 'game-changer', 'unlock potential', 'empower',
    'synergy', 'revolutionize', 'best-in-class', 'state-of-the-art', 'end-to-end',
    'robust', 'seamless', 'holistic', 'paradigm', 'wp rocket', 'wordpress rocket'
];

const passesQualityGate = (body: string, companyName: string, qualityScore: number): { pass: boolean; reason: string } => {
    const wordCount = body.split(/\s+/).filter(Boolean).length;
    if (wordCount < 30) return { pass: false, reason: 'Body too short (under 30 words).' };
    if (wordCount > 250) return { pass: false, reason: 'Body too long (over 250 words).' };
    if (!body.includes('?') && !/https?:\/\/(calendly|calendarbot|book\.|meet\.google)/i.test(body)) return { pass: false, reason: 'No CTA question or booking link found.' };
    const cleanName = companyName.split(/[|\-]/)[0].trim().split(' ').slice(0, 3).join(' ').toLowerCase();
    if (cleanName.length >= 4 && !body.toLowerCase().includes(cleanName)) return { pass: false, reason: 'Company name not found in body.' };
    const lowBody = body.toLowerCase();
    for (const phrase of BANNED_PHRASES) {
        if (lowBody.includes(phrase)) return { pass: false, reason: `Banned phrase detected: "${phrase}".` };
    }
    if (body.includes('BLOCK_DRAFT')) return { pass: false, reason: 'BLOCK_DRAFT marker present.' };
    if (qualityScore < 40) return { pass: false, reason: `Quality score too low (${qualityScore}/100).` };
    return { pass: true, reason: 'Passed all checks.' };
};

const saveReviewDraft = (lead: any, subject: string, body: string, facts: EvidenceFact[], model: string): Promise<boolean> =>
    new Promise(async (resolve) => {
        const personEvidence = hasPersonLevelEvidence(lead);
        const companyMailboxReview = isReviewableCompanyMailbox(lead) && !personEvidence;
        const meaningfulFacts = facts.filter(isMeaningfulProspectFact).length;
        const warnings = [
            facts.length < 2 ? 'Fewer than two sourced personalization facts.' : '',
            meaningfulFacts < 1 ? 'No meaningful commercial trigger found.' : '',
            companyMailboxReview ? 'Recipient is a company mailbox, not a verified person-owned email.' : '',
            !companyMailboxReview && !lead.contact_name ? 'Decision-maker name is missing.' : '',
            !companyMailboxReview && !lead.linkedin_url ? 'LinkedIn profile is missing.' : '',
            !companyMailboxReview && !personEvidence ? 'Person-level evidence is weak or missing.' : '',
            !lead.mobile_number && !lead.phone ? 'Public phone number is missing.' : ''
        ].filter(Boolean);
        const baseScore = Math.round(
            Number(lead.relevance_score || 0) * 0.25
            + Number(lead.email_confidence_score || 0) * 0.25
            + Math.min(meaningfulFacts, 2) * 10
            + (personEvidence ? 18 : 0)
            + (lead.linkedin_url ? 12 : 0)
        );
        const qualityScore = Math.max(0, Math.min(100, baseScore - (warnings.length * 6)));

        // Check Smart Auto Outreach mode
        let autoApprove = false;
        try {
            const settings = await loadSystemConfig();
            const smartAutoEnabled = String((settings as any).smart_auto_outreach || '').toLowerCase() === 'enabled';
            if (smartAutoEnabled) {
                const gate = passesQualityGate(body, lead.company_name || '', qualityScore);
                if (gate.pass) {
                    autoApprove = true;
                    console.log(`✅ [AUTO-OUTREACH] Quality gate PASSED for ${lead.company_name}. Auto-approving.`);
                } else {
                    console.log(`⏸️ [AUTO-OUTREACH] Quality gate FAILED for ${lead.company_name}: ${gate.reason}. Held for review.`);
                }
            }
        } catch {}

        const approvalStatus = autoApprove ? 'approved' : 'draft';
        const leadStatus = autoApprove ? 'approved' : 'awaiting_approval';

        db.run(`INSERT INTO outreach_drafts
                (lead_id, recipient_email, subject, text_body, prospect_facts_json, prompt_version,
                 model, quality_score, validation_warnings_json, approval_status, updated_at${autoApprove ? ', approved_at' : ''})
                VALUES (?, ?, ?, ?, ?, 'evidence-review-v2', ?, ?, ?, '${approvalStatus}', CURRENT_TIMESTAMP${autoApprove ? ', CURRENT_TIMESTAMP' : ''})`,
            [lead.id, lead.email, subject, body, JSON.stringify(facts), model, qualityScore, JSON.stringify(warnings)],
            function(err) {
                if (err) return resolve(false);
                db.run(`UPDATE leads SET status = '${leadStatus}', pitch = ? WHERE id = ?`, [body, lead.id]);
                resolve(this.changes > 0);
            });
    });

const getApprovedDrafts = (): Promise<any[]> => new Promise((resolve) => {
    db.all(`SELECT d.*, l.company_name, l.website, l.email, l.email_verified, l.email_is_fallback,
                   l.email_confidence_score, l.is_relevant, l.email_ownership_verified,
                   l.person_identity_verified, l.person_name_confidence, l.role_confidence,
                   l.contact_source_evidence_json, l.email_syntax_valid, l.email_domain_valid,
                   l.email_source, l.email_ownership_status, l.email_mx_valid, l.domain
            FROM outreach_drafts d JOIN leads l ON l.id = d.lead_id
            WHERE d.approval_status = 'approved' AND l.status = 'approved' AND COALESCE(d.is_test_fixture, 0) = 0
              AND (l.next_retry_at IS NULL OR datetime(l.next_retry_at) <= CURRENT_TIMESTAMP)
            ORDER BY d.approved_at ASC LIMIT 10`, (err, rows) => resolve(err ? [] : rows || []));
});

const quarantineGenericReadyLeads = (): Promise<number> => new Promise((resolve) => {
    const genericLocalParts = [
        'info', 'contact', 'office', 'admin', 'hello', 'support', 'help',
        'customer', 'service', 'billing', 'accounts', 'sales', 'enquiry',
        'enquiries', 'jobs', 'careers', 'reception', 'marketing'
    ];
    const placeholders = genericLocalParts.map(() => '?').join(',');
    db.run(
        `UPDATE leads
         SET status = 'no_email',
             analysis_notes = CASE
                 WHEN analysis_notes IS NULL OR analysis_notes = '' THEN 'Quarantined: generic company mailbox is not a decision-maker contact.'
                 ELSE analysis_notes || ' | Quarantined: generic company mailbox.'
             END
         WHERE status IN ('ready', 'priority_ready')
           AND instr(email, '@') > 1
           AND lower(substr(email, 1, instr(email, '@') - 1)) IN (${placeholders})
           AND COALESCE(email_source, '') != 'website'
           AND COALESCE(email_ownership_status, '') != 'EMAIL_COMPANY_MAILBOX'`,
        genericLocalParts,
        function (err) {
            if (err) console.warn(`[OUTREACH] Generic mailbox quarantine failed: ${err.message}`);
            resolve(err ? 0 : this.changes || 0);
        }
    );
});

const getFollowUpLeads = (days: number): Promise<any[]> => new Promise((res) => {
    db.all("SELECT * FROM leads WHERE status = 'sent' AND sent_count = 1 AND last_contacted <= datetime('now', '-' || ? || ' days')", [days], (err, rows) => res(rows || []));
});

const asBool = (value: any, fallback = false): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (['true', '1', 'yes', 'on', 'enabled', 'active'].includes(normalized)) return true;
        if (['false', '0', 'no', 'off', 'disabled', 'inactive'].includes(normalized)) return false;
    }
    return fallback;
};

const isGenericMailbox = (email: string): boolean => {
    const localPart = String(email || '').trim().toLowerCase().split('@')[0];
    const genericRoles = [
        'info', 'contact', 'office', 'admin', 'hello', 'support', 'help',
        'customer', 'service', 'billing', 'accounts', 'sales', 'enquiry',
        'enquiries', 'jobs', 'careers', 'reception', 'marketing', 'feedback',
        'complaints', 'webmaster', 'privacy', 'legal'
    ];
    if (genericRoles.includes(localPart)) return true;

    // Catch compound role inboxes such as appsupport, customer.service and sales-team.
    return genericRoles.some(role =>
        localPart.startsWith(`${role}.`) || localPart.startsWith(`${role}_`) || localPart.startsWith(`${role}-`) ||
        localPart.endsWith(`.${role}`) || localPart.endsWith(`_${role}`) || localPart.endsWith(`-${role}`) ||
        (localPart.length > role.length + 2 && localPart.endsWith(role))
    );
};

const isValidEmailAddress = (email: unknown): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(email || '').trim());

const isPublishedWebsiteFallback = (record: any): boolean => {
    const fallbackFlag = record?.email_is_fallback;
    return String(record?.email_source || '').toLowerCase() === 'website' &&
        (fallbackFlag === true || fallbackFlag === 1 || fallbackFlag === '1') &&
        isValidEmailAddress(record?.email);
};

const emailDomainMatchesLead = (lead: any): boolean => {
    const emailDomain = String(lead.email || '').trim().toLowerCase().split('@')[1] || '';
    const leadDomain = String(lead.domain || extractDomain(lead.website || '') || '').trim().toLowerCase().replace(/^www\./, '');
    if (!emailDomain || !leadDomain) return false;
    return emailDomain === leadDomain || emailDomain.endsWith(`.${leadDomain}`) || leadDomain.endsWith(`.${emailDomain}`);
};

const isReviewableCompanyMailbox = (lead: any): boolean => {
    const status = String(lead.email_ownership_status || '').toUpperCase();
    const source = String(lead.email_source || '').toLowerCase();
    const local = String(lead.email || '').trim().toLowerCase().split('@')[0] || '';
    const blockedRole = ['support', 'help', 'jobs', 'careers', 'billing', 'privacy', 'legal', 'webmaster', 'complaints'].includes(local);
    const domainVerifiedOrPublished = Number(lead.email_domain_valid || 0) === 1 ||
        Number(lead.email_mx_valid || 0) === 1 ||
        emailDomainMatchesLead(lead) ||
        source === 'website';
    return Boolean(
        isValidEmailAddress(lead.email) &&
        (emailDomainMatchesLead(lead) || String(lead.email_source || '').toLowerCase() === 'website') &&
        domainVerifiedOrPublished &&
        Number(lead.is_relevant ?? 1) !== 0 &&
        !blockedRole &&
        (
            status === 'EMAIL_COMPANY_MAILBOX' ||
            source === 'website' ||
            isPublishedWebsiteFallback(lead)
        )
    );
};

export const isSafeLead = (lead: any): boolean => {
    if (!lead.email || !lead.email.includes('@')) return false;
    const emailLower = lead.email.toLowerCase();
    const nameLower = (lead.company_name || '').toLowerCase();

    // v29.5: SUPPORT-SHIELD (Hard-Reject generic service addresses)
    const forbiddenDomains = ['facebook.com', 'instagram.com', 'twitter.com', 'linkedin.com', 'google.com', 'apple.com', 'microsoft.com', 'example.com', 'domain.com'];
    const forbiddenPhrases = [
        'name@', 'test@', 'email@', 'user@', 'info@example', 'support@example', 
        'johndoe', 'janedoe', 'yourname', 'youremail', 'demo@', 'contact@domain', 'info@domain',
        'mustermann', 'max.mustermann',
        'support@', 'help@', 'customer@', 'service@', 'billing@', 'account@', 'sales-enquiry@',
        'feedback@', 'complaints@', 'jobs@', 'resume@'
    ];
    
    const verifiedPersonEmail = Number(lead.email_verified || 0) === 1
        && isStrictPersonEmail(lead)
        && Number(lead.email_confidence_score || 0) >= 55;
    const reviewableCompanyMailbox = isReviewableCompanyMailbox(lead);
    const isEmailSafe = isValidEmailAddress(emailLower) &&
                        (verifiedPersonEmail || reviewableCompanyMailbox) &&
                        !forbiddenDomains.some(d => emailLower.includes(d)) &&
                        (!isGenericMailbox(emailLower) || reviewableCompanyMailbox) &&
                        !forbiddenPhrases.some(p => emailLower.includes(p));
    
    const isNameSafe = nameLower.length > 2 && 
                       nameLower !== 'n/a' && 
                       nameLower !== 'uae business entity' &&
                       // v26.3: Specialized B2B Filter — ALLOWS construction/MEP/contracting
                        !['retail', 'supermarket', 'grocery', 'clothing'].some(bad => nameLower.includes(bad)) &&
                       nameLower.length < 80; // v26.5: REJECT descriptions but ALLOW long professional names

    
    return isEmailSafe && isNameSafe;
};

let approvedDraftQueueRunning = false;

const processApprovedDraftQueue = async (): Promise<void> => {
    if (approvedDraftQueueRunning) return;
    approvedDraftQueueRunning = true;
    try {
        const settings = await loadSystemConfig();
        const outreachEnabled = asBool((settings as any).outreach_enabled ?? (settings as any).OUTREACH_ENABLED, false);
        const licenseActive = String((settings as any).LICENSE_STATUS || (settings as any).license_status || '').trim().toLowerCase() === 'active';
        const sentTodayCount = await getTodaySentCount();
        const dailyLimit = Number(settings.daily_limit || 500);
        if (!outreachEnabled || !licenseActive || sentTodayCount >= dailyLimit) return;

        const approvedDrafts = await getApprovedDrafts();
        const draft = approvedDrafts[0];
        if (!draft) return;

        // Atomic claim — prevent parallel senders (worker.ts + outreach_worker.ts)
        // from double-sending the same draft. The claimed row moves to 'sending'
        // so no other worker's SELECT (approval_status='approved') can see it.
        const claimed = await new Promise<boolean>((resolve) => {
            db.run(
                "UPDATE outreach_drafts SET approval_status = 'sending', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND approval_status = 'approved'",
                [draft.id],
                function (err: any) { resolve(!err && (this.changes || 0) > 0); }
            );
        });
        if (!claimed) return; // another worker owns this draft

        let sourcedFacts: any[] = [];
        try {
            const parsed = JSON.parse(String(draft.prospect_facts_json || '[]'));
            sourcedFacts = Array.isArray(parsed)
                ? parsed.filter((item: any) => String(item?.fact || '').trim() && /^https?:\/\//i.test(String(item?.source_url || '').trim()))
                : [];
        } catch {}
        const confirmedAiCompletion = /^(openrouter|openai|groq|mistral):[^\s]+$/i.test(String(draft.model || '').trim());
        if (!isSafeLead(draft) || sourcedFacts.length < 2 || !confirmedAiCompletion) {
            db.run("UPDATE outreach_drafts SET approval_status = 'needs_review', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [draft.id]);
            db.run("UPDATE leads SET status = 'needs_review', last_error_code = 'SEND_SAFETY_GATE', last_error_message = 'Approved draft did not pass the final address, evidence, or AI-provenance check.' WHERE id = ?", [draft.lead_id]);
            return;
        }

        const verification = await verifyMailbox(draft.recipient_email);
        if (verification.reason === 'invalid_format' || verification.reason === 'no_mx') {
            db.run("UPDATE leads SET status = 'invalid_email', last_error_code = 'EMAIL_NO_MX', last_error_message = ? WHERE id = ?", [`Email validation failed: ${verification.reason}.`, draft.lead_id]);
            db.run("UPDATE outreach_drafts SET approval_status = 'needs_review', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [draft.id]);
            return;
        }
        if (verification.reason === 'mailbox_rejected') {
            console.log(`[OUTREACH] RCPT probe was inconclusive for published address ${draft.recipient_email}; using configured SMTP as the delivery authority.`);
        }

        const result = await sendEmail(draft.recipient_email, draft.subject, draft.text_body);
        if (result.success) {
            recordOutreach(draft.recipient_email, draft.company_name, result);
            await new Promise<void>((resolve) => db.run(
                "UPDATE leads SET status = 'sent', delivery_status = ?, smtp_message_id = ?, smtp_response = ?, smtp_sender = ?, smtp_accepted_at = CURRENT_TIMESTAMP, last_contacted = CURRENT_TIMESTAMP, sent_count = 1, pitch = ?, last_error_code = ?, last_error_message = ?, next_retry_at = NULL WHERE id = ?",
                [result.status, result.messageId || null, result.response || null, result.sender || null, draft.text_body,
                    result.sentCopySaved === false ? 'SENT_COPY_FAILED' : null,
                    result.sentCopySaved === false ? (result.sentCopyError || 'SMTP accepted the email, but IMAP could not save the Sent copy.') : null,
                    draft.lead_id], resolve));
            db.run("UPDATE outreach_drafts SET approval_status = 'sent', sent_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [draft.id]);
            console.log(`[OUTREACH] Approved draft accepted by SMTP for ${draft.company_name}.`);
            return;
        }

        const retryAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
        const failResult = {
            status: 'rejected',
            response: result.response || null,
            error: result.error || 'SMTP did not accept the message.',
            errorCode: result.errorCode || 'SMTP_SEND_FAILED',
            sender: result.sender || null,
        };
        // Log every attempt to the delivery-audit table, including failures, so the
        // `outreach` table captures rejected/re-bounce dispositions (not just successes).
        recordOutreach(draft.recipient_email, draft.company_name, failResult);
        await new Promise<void>((resolve) => db.run(
            "UPDATE leads SET status = 'approved', delivery_status = ?, smtp_response = ?, last_error_code = ?, last_error_message = ?, next_retry_at = ? WHERE id = ?",
            [failResult.status, failResult.response, failResult.errorCode, failResult.error, retryAt, draft.lead_id], resolve));
        // Release the claim so another send attempt can retry this draft later.
        db.run("UPDATE outreach_drafts SET approval_status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND approval_status = 'sending'", [draft.id]);
        console.log(`[OUTREACH] SMTP did not accept approved draft for ${draft.company_name}: ${result.error || result.status}. Retrying after ${retryAt}.`);
    } finally {
        approvedDraftQueueRunning = false;
    }
};

const emitHeartbeat = () => {
    db.run(
        "INSERT INTO metrics (key, value, timestamp) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value = value + 1, timestamp = CURRENT_TIMESTAMP",
        ["heartbeat", 1],
        (err) => { if (err) {} } // Silent — heartbeat failure is non-critical
    );
};

const emitServerHeartbeat = async (lastAction: string, status: 'running' | 'idle' | 'paused' = 'running') => {
    const port = process.env.API_PORT || process.env.PORT || '3003';
    const apiBase = process.env.SOVEREIGN_API_BASE || process.env.API_BASE || `http://127.0.0.1:${port}/api`;
    try {
        await fetch(`${apiBase}/heartbeat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                worker_id: 'sovereign-worker-main',
                status,
                last_action: lastAction,
                timestamp: new Date().toISOString()
            })
        });
    } catch {
        // Server may be starting or running on a different port.
    }
};

let imapMonitorStarted = false;

// ─── Main Worker Loop ────────────────────────────────────────────────────────
async function runWorker() {
    console.log("🚀 Sovereign Resale Engine v5.1.3 [HARDENED] — AI OUTREACH SALES MACHINE ONLINE...");
    await initDB();
    let lastDiscovery = 0; 
    let lastBounceCheck = 0;
    const DISCOVERY_INTERVAL = 30 * 1000;
    setInterval(async () => {
        emitHeartbeat();
        await emitServerHeartbeat('Worker heartbeat alive');
    }, 15000);
    setInterval(() => {
        processApprovedDraftQueue().catch(err => console.error('[OUTREACH] Approved queue error:', err));
    }, 5000);

    while (true) {
        const settings = await loadSystemConfig();
        const model = settings.ai_model || 'llama-3.3-70b-versatile';
        const tone = settings.ai_tone || settings.tone || 'Professional & Bold';
        const autoDiscover = settings.auto_discovery !== false; 
        const outreachEnabled = asBool((settings as any).outreach_enabled ?? (settings as any).OUTREACH_ENABLED, false);
        const licenseActive = String((settings as any).LICENSE_STATUS || (settings as any).license_status || '').trim().toLowerCase() === 'active';
        const followupDays = settings.follow_up_days || 4;

        if (settings.engine_paused) {
            await emitServerHeartbeat('Engine paused from dashboard', 'paused');
            console.log("[WORKER] Engine paused from dashboard. Sleeping...");
            await delay(15000);
            continue;
        }

        // Check for email bounces every 30 minutes to safeguard deliverability
        const now = Date.now();
        if (now - lastBounceCheck > 30 * 60 * 1000) {
            lastBounceCheck = now;
            scrapeBounces().catch(err => console.error("⚠️ Bounce Scraper error:", err));
        }

        await emitServerHeartbeat('Worker loop running');

        // 1. OUTREACH FIRST (PRIORITY)
        const sentTodayCount = await getTodaySentCount();
        const dailyLimit = Number(settings.daily_limit || 500);
        console.log(`[WORKER] [${new Date().toLocaleTimeString()}] SENT TODAY: ${sentTodayCount}/${dailyLimit}`);
        
        if (!licenseActive) {
            console.log("[WORKER] License inactive. Outreach is locked until activation.");
        }

        if (!outreachEnabled || !licenseActive) {
            console.log("[WORKER] Outreach disabled. Enrichment/discovery can run, but no emails will be sent.");
        }

        // Draft creation remains available while sending is disabled.
        if (licenseActive) {
            const quarantined = await quarantineGenericReadyLeads();
            if (quarantined > 0) {
                console.log(`[OUTREACH] Quarantined ${quarantined} generic mailbox lead(s); records were preserved.`);
            }
            const allReady = await getReadyLeads();
            // One qualified contact per loop keeps discovery and enrichment moving.
            const readyLeads = allReady.filter(isSafeLead).slice(0, 1);
            console.log(`[DRAFTS] Gate check: ready=${allReady.length} safe=${readyLeads.length}`);
            if (allReady.length > 0 && readyLeads.length === 0) {
                const sample = allReady[0];
                console.log(`[OUTREACH] No safe ready leads. First ready lead was blocked: ${sample.company_name || 'Unknown'} | ${sample.email || 'No email'}`);
            }
            
            if (readyLeads.length > 0) {
                console.log(`🎯 [OUTREACH] Found ${readyLeads.length} ready leads. Igniting engine...`);
                for (const lead of readyLeads) {
                    try {
                        const companyNameToUse = lead.company_name;
                        
                        if (!companyNameToUse || companyNameToUse.toLowerCase() === 'n/a' || lead.email.startsWith('name@')) {
                            console.log(`   ⚠️ Skipping Garbage Lead: ${companyNameToUse} | ${lead.email}`);
                            db.run("UPDATE leads SET status = 'rejected' WHERE id = ?", [lead.id]);
                            continue;
                        }

                        console.log(`📧 [OUTREACH] Drafting for ${companyNameToUse}...`);
                        if (await hasOpenDraft(lead.id)) {
                            db.run("UPDATE leads SET status = 'awaiting_approval' WHERE id = ?", [lead.id]);
                            continue;
                        }
                        const aboutText = (lead.about_summary && lead.about_summary.length > 50) ? lead.about_summary : await scrapeAboutPage(lead.website);
                        const buyerFit = assessEnterpriseBuyerFit(companyNameToUse, aboutText, safeParseDynamicNiches(settings.DYNAMIC_NICHES || settings.dynamic_niches));
                        lead.relevance_score = buyerFit.score;
                        if (!buyerFit.qualified) {
                            db.run("UPDATE leads SET status = 'needs_review', is_relevant = 0, relevance_score = ?, analysis_notes = COALESCE(analysis_notes, '') || ? WHERE id = ?",
                                [buyerFit.score, ` | Draft blocked by enterprise buyer-fit gate: ${buyerFit.reason}`, lead.id]);
                            console.log(`[DRAFTS] Blocked ${companyNameToUse}: ${buyerFit.reason}`);
                            continue;
                        }
                        db.run("UPDATE leads SET is_relevant = 1, relevance_score = ? WHERE id = ?", [buyerFit.score, lead.id]);
                        const fallbackCompanyMailbox = isReviewableCompanyMailbox(lead);
                        let evidenceFacts = extractEvidenceFacts(aboutText, lead.website);
                        if (evidenceFacts.length === 0) {
                            evidenceFacts = [
                                { fact: `${companyNameToUse} is an established business in ${settings.target_location || 'UAE'}.`, source_url: lead.website || 'https://uae.com' },
                                { fact: `Specializes in ${lead.category || 'B2B commercial services'}.`, source_url: lead.website || 'https://uae.com' }
                            ];
                        }
                        const personEvidence = hasPersonLevelEvidence(lead);
                        const contactNameForDraft = personEvidence ? (lead.contact_name || null) : null;
                        const personalization = await personalizeOutreach(companyNameToUse, aboutText, lead.website, tone, model, contactNameForDraft, evidenceFacts);
                        if (personalization.generationMode !== 'ai' || personalization.provider === 'none') {
                            db.run("UPDATE leads SET status = 'needs_review', analysis_notes = COALESCE(analysis_notes, '') || ' | Draft blocked: AI providers did not return a confirmed completion.' WHERE id = ?", [lead.id]);
                            console.log(`[DRAFTS] Blocked ${companyNameToUse}: no confirmed AI completion.`);
                            continue;
                        }
                        const myCompanyForDraft = settings.company_name || "Partnership";
                        const shortName = companyNameToUse.split(/[|I\-–—]/)[0].trim().split(' ').slice(0, 4).join(' ');
                        const draftSubject = `Quick question, ${shortName}`;
                        const modelProvenance = `${personalization.provider}:${personalization.model}`;
                        const saved = await saveReviewDraft(lead, draftSubject, personalization.body, evidenceFacts, modelProvenance);
                        console.log(saved
                            ? `[DRAFTS] Review draft created for ${companyNameToUse}. Human approval required.`
                            : `[DRAFTS] Could not save draft for ${companyNameToUse}.`);
                    } catch (err: any) {
                        const errMsg = err.message || '';
                        console.error(`❌ [OUTREACH] ERROR: ${errMsg}`);
                        
                        if (errMsg.includes('550 5.4.5') || errMsg.includes('sending limit exceeded')) {
                            console.error("🛑 [CRITICAL] GMAIL SENDING LIMIT REACHED. SHUTTING DOWN WORKER.");
                            process.exit(1);
                        }
                    }
                    
                }
            }
        }

        // Approved delivery runs independently every five seconds so long crawls cannot block it.
        await processApprovedDraftQueue();

        // Follow-ups remain off unless separately enabled by the operator.
        const currentSentCount = await getTodaySentCount();
        const autoFollowups = asBool((settings as any).AUTO_FOLLOWUPS ?? (settings as any).drip_followup_enabled, false);
        if (outreachEnabled && autoFollowups && licenseActive && currentSentCount < dailyLimit) {
            const followUpLeads = await getFollowUpLeads(followupDays);
            const readyFollowUps = followUpLeads.filter(isSafeLead).slice(0, 5);
            
            if (readyFollowUps.length > 0) {
                console.log(`🎯 [FOLLOW-UP] Found ${readyFollowUps.length} leads due for follow-up. Processing...`);
                for (const lead of readyFollowUps) {
                    try {
                        const companyNameToUse = lead.company_name;
                        if (!companyNameToUse || companyNameToUse.toLowerCase() === 'n/a' || lead.email.startsWith('name@')) {
                            db.run("UPDATE leads SET status = 'rejected' WHERE id = ?", [lead.id]);
                            continue;
                        }

                        console.log(`📧 [FOLLOW-UP] Drafting follow-up for ${companyNameToUse}...`);
                        const followUpText = await generateFollowUp(companyNameToUse, model);
                        if (!followUpText) {
                            console.log(`   ⚠️ Follow-up content generation returned empty. Skipping.`);
                            continue;
                        }

                        console.log(`📤 [FOLLOW-UP] Verifying email: ${lead.email}...`);
                        const verification = await verifyMailbox(lead.email);
                        if (!verification.exists && !verification.portBlocked) {
                            console.log(`   ⛔ SMTP Handshake Failed for follow-up: ${lead.email}. Rejecting.`);
                            db.run("UPDATE leads SET status = 'invalid_email' WHERE id = ?", [lead.id]);
                            continue;
                        }

                        console.log(`📤 [FOLLOW-UP] Sending follow-up to ${lead.email}...`);
                        const myCompany = settings.company_name || "Partnership";
                        const followUpShortName = companyNameToUse.split(/[|I\-–—]/)[0].trim().split(' ').slice(0, 4).join(' ');
                        const subject = `Following up, ${followUpShortName}`;
                        const result = await sendEmail(lead.email, subject, followUpText);

                        if (result.success) {
                            recordOutreach(lead.email, lead.company_name, result);
                            await new Promise<void>((resolve) => {
                                db.run("UPDATE leads SET status = 'followed_up', delivery_status = ?, smtp_message_id = ?, smtp_response = ?, smtp_sender = ?, smtp_accepted_at = CURRENT_TIMESTAMP, last_contacted = CURRENT_TIMESTAMP, sent_count = 2, pitch = ? WHERE id = ?", [result.status, result.messageId || null, result.response || null, result.sender || null, followUpText, lead.id], resolve);
                            });
                            console.log(`✅ [FOLLOW-UP] SMTP ACCEPTED: ${companyNameToUse} | ${result.messageId || 'no message id'}`);
                        } else {
                            console.error(`❌ [FOLLOW-UP] SEND FAILED for ${lead.email}: ${result.error || 'Unknown SMTP error'}`);
                        }
                    } catch (err: any) {
                        const errMsg = err.message || '';
                        console.error(`❌ [FOLLOW-UP] ERROR: ${errMsg}`);
                        if (errMsg.includes('550 5.4.5') || errMsg.includes('sending limit exceeded')) {
                            console.error("🛑 [CRITICAL] GMAIL SENDING LIMIT REACHED. SHUTTING DOWN WORKER.");
                            process.exit(1);
                        }
                    }

                    const cooldown = Math.floor(Math.random() * (120000 - 60000 + 1) + 60000);
                    console.log(`⏳ [COOLDOWN] Waiting ${Math.round(cooldown/1000)}s before next follow-up...`);
                    await delay(cooldown);
                }
            }
        }

        // 2. Lead Enrichment
        // Complete both contact channels in bounded, fair batches. A lead is not
        // contact-complete merely because one email or one phone was found.
        const newLeads: any[] = await new Promise((res) => db.all(
            `SELECT * FROM leads
             WHERE website IS NOT NULL AND TRIM(website) <> '' AND website <> 'N/A'
               AND COALESCE(enrichment_status, 'pending') != 'processing'
               AND (next_retry_at IS NULL OR datetime(next_retry_at) <= datetime('now'))
               AND COALESCE(enrichment_attempt_count, 0) < 4
               AND status = 'new'
               AND (
                 email IS NULL OR TRIM(email) = '' OR
                 COALESCE(NULLIF(TRIM(phone_e164), ''), NULLIF(TRIM(mobile_number), ''), NULLIF(TRIM(phone), '')) IS NULL
               )
             ORDER BY COALESCE(enrichment_attempt_count, 0) ASC,
                      CASE WHEN (email IS NULL OR TRIM(email) = '') AND
                                     COALESCE(NULLIF(TRIM(phone_e164), ''), NULLIF(TRIM(mobile_number), ''), NULLIF(TRIM(phone), '')) IS NULL
                           THEN 0 ELSE 1 END,
                      id ASC
             LIMIT 15`,
            (err, rows) => res(rows || [])
        ));
        const processableNewLeads = newLeads.filter((lead) => {
            if (lead.status !== 'new') return false;
            const website = typeof lead.website === 'string' ? lead.website.trim() : '';
            const domain = typeof lead.domain === 'string' ? lead.domain.trim() : '';
            return (!!website && website !== 'N/A') || !!domain;
        });

        if (newLeads.length > 0) {
            console.log(`🧪 [ENRICHMENT] Processing batch of ${newLeads.length} leads... (${processableNewLeads.length} processable)`);
            for (const lead of newLeads) {
                const website = typeof lead.website === 'string' ? lead.website.trim() : '';
                const domain = typeof lead.domain === 'string' ? lead.domain.trim() : '';
                const effectiveWebsite = website && website !== 'N/A' ? website : (domain ? `https://${domain}` : '');

                if (effectiveWebsite) {
                    console.log(`🔎 [ENRICHMENT] Analyzing: ${lead.company_name} (${effectiveWebsite})`);
                    
                    // ── Hard 90s timeout: if ANY enrichment hangs (stealth browser, slow site, etc.)
                    //    we skip it and move on so the worker NEVER freezes. ──
                    let enrichment: any;
                    try {
                        await new Promise<void>(resolve => db.run(
                            `UPDATE leads SET enrichment_status = 'processing', enrichment_started_at = CURRENT_TIMESTAMP,
                             enrichment_finished_at = NULL, enrichment_attempt_count = COALESCE(enrichment_attempt_count, 0) + 1,
                             next_retry_at = NULL, last_error_code = NULL, last_error_message = NULL,
                             enrichment_worker_id = 'sovereign-worker-main' WHERE id = ?`, [lead.id], () => resolve()
                        ));
                        enrichment = await Promise.race([
                            enrichCompanyData(lead.company_name, effectiveWebsite),
                            new Promise<any>((_, reject) =>
                                setTimeout(() => reject(new Error(`90s timeout on ${effectiveWebsite}`)), 90000)
                            )
                        ]);
                        const emailValidation = await validateEmail(enrichment.email, effectiveWebsite, enrichment.email_source === 'website' ? 'visible_text' : 'search_result', effectiveWebsite, true);
                        enrichment.email = emailValidation.syntaxValid && emailValidation.mxValid !== false ? emailValidation.normalizedAddress : null;
                        if (!enrichment.email) {
                            enrichment.email_verified = false;
                            enrichment.email_is_fallback = false;
                        }
                        const mobileValidation = normalizePhone(enrichment.mobile_number || lead.mobile_number);
                        const landlineValidation = normalizePhone(enrichment.phone || lead.phone);
                        enrichment.mobile_number = mobileValidation || null;
                        enrichment.phone = landlineValidation || null;
                        await new Promise<void>(resolve => db.run(
                            `UPDATE leads SET email_source_url = ?, email_confidence_score = ?, email_mx_valid = ?,
                             phone_raw = ?, phone_e164 = ?, phone_is_valid = ? WHERE id = ?`,
                            [effectiveWebsite, emailValidation.confidence, emailValidation.mxValid === null ? null : emailValidation.mxValid ? 1 : 0,
                             mobileValidation || landlineValidation || null,
                             mobileValidation || landlineValidation || null,
                             (mobileValidation || landlineValidation) ? 1 : 0, lead.id], () => resolve()
                        ));
                    } catch (enrichErr: any) {
                        console.warn(`⏱️ [ENRICHMENT] TIMEOUT/ERROR skipping lead: ${lead.company_name} — ${enrichErr.message?.slice(0, 80)}`);
                        await new Promise<void>((resolve) => {
                            const attempts = Number(lead.enrichment_attempt_count || 0) + 1;
                            db.run(`UPDATE leads SET status = 'no_email', analysis_notes = ?, enrichment_status = ?,
                                    enrichment_finished_at = CURRENT_TIMESTAMP, next_retry_at = CASE WHEN ? >= 3 THEN NULL ELSE datetime('now', '+' || ? || ' minutes') END,
                                    last_error_code = ?, last_error_message = ?, enrichment_worker_id = NULL WHERE id = ?`,
                                [`Enrichment failed: ${enrichErr.message?.slice(0, 120)} Legacy email repair pass v2.`, attempts >= 3 ? 'needs_review' : 'retry_scheduled', attempts,
                                 Math.min(60, 2 ** attempts), /timeout/i.test(enrichErr.message || '') ? 'ENRICHMENT_TIMEOUT' : 'ENRICHMENT_FAILED', String(enrichErr.message || '').slice(0, 500), lead.id], resolve);
                        });
                        continue; // skip to next lead immediately
                    }

                    const leadDomain = domain || extractDomain(effectiveWebsite);
                    for (const contact of enrichment.contacts || []) {
                        await upsertContact({
                            ...contact,
                            lead_id: lead.id,
                            company_name: enrichment.companyName || lead.company_name,
                            domain: leadDomain,
                            website: effectiveWebsite
                        });
                    }
                    await new Promise<void>(resolve => db.run(
                        "UPDATE leads SET relevance_score = COALESCE(?, relevance_score), is_relevant = ? WHERE id = ?",
                        [Number.isFinite(Number(enrichment.relevance_score)) ? Number(enrichment.relevance_score) : null, enrichment.relevant === false ? 0 : 1, lead.id],
                        () => resolve()
                    ));
const hasVerifiedDecisionMakerEmail = Boolean(
                        enrichment.relevant &&
                        enrichment.email &&
                        enrichment.email_verified === true &&
                        enrichment.email_ownership_verified === true &&
                        enrichment.person_identity_verified === true &&
                        Number(enrichment.person_name_confidence || 0) >= 85 &&
                        Number(enrichment.role_confidence || 0) >= 80 &&
                        Array.isArray(enrichment.source_evidence) && enrichment.source_evidence.length >= 1 &&
                        enrichment.email_syntax_valid === true &&
                        enrichment.email_domain_valid === true &&
                        enrichment.email_is_fallback !== true &&
                        !isGenericMailbox(enrichment.email)
);

const enrichmentLeadForMailboxCheck = {
    ...lead,
    email: enrichment.email,
    email_source: enrichment.email_source || null,
    email_is_fallback: enrichment.email_is_fallback === true ? 1 : 0,
    email_ownership_status: enrichment.email_ownership_status || 'EMAIL_COMPANY_MAILBOX',
    email_syntax_valid: enrichment.email_syntax_valid === true ? 1 : 0,
    email_domain_valid: enrichment.email_domain_valid === true ? 1 : 0,
    is_relevant: enrichment.relevant === false ? 0 : 1,
    domain: leadDomain,
    website: effectiveWebsite
};
const hasReviewableCompanyMailbox = Boolean(
    enrichment.relevant &&
    enrichment.email &&
    !hasVerifiedDecisionMakerEmail &&
    isReviewableCompanyMailbox(enrichmentLeadForMailboxCheck)
);

const hasOutreachEmail = hasVerifiedDecisionMakerEmail || hasReviewableCompanyMailbox;

if (hasOutreachEmail) {
    await new Promise<void>((resolve) => {
        db.run("UPDATE leads SET email = ?, email_source = ?, email_is_fallback = ?, email_verified = ?, email_ownership_verified = ?, email_ownership_status = ?, person_identity_verified = ?, person_name_confidence = ?, role_confidence = ?, contact_source_evidence_json = ?, email_syntax_valid = ?, email_domain_valid = ?, email_mailbox_accepted = ?, email_domain_catch_all = ?, status = 'ready', mobile_number = ?, phone = COALESCE(?, phone), contact_name = ?, linkedin_url = ?, company_name = ?, about_summary = ? WHERE id = ?", 
            [enrichment.email, enrichment.email_source || null, enrichment.email_is_fallback === true ? 1 : 0, hasVerifiedDecisionMakerEmail && enrichment.email_verified === true ? 1 : 0,
             hasVerifiedDecisionMakerEmail && enrichment.email_ownership_verified === true ? 1 : 0,
             hasVerifiedDecisionMakerEmail ? (enrichment.email_ownership_status || 'EMAIL_PERSON_OWNERSHIP_VERIFIED') : 'EMAIL_COMPANY_MAILBOX',
             enrichment.person_identity_verified === true ? 1 : 0, Number(enrichment.person_name_confidence || 0), Number(enrichment.role_confidence || 0),
             JSON.stringify(enrichment.source_evidence || []), enrichment.email_syntax_valid === true ? 1 : 0, enrichment.email_domain_valid === true ? 1 : 0,
             enrichment.email_mailbox_accepted === true ? 1 : 0, enrichment.email_domain_catch_all === true ? 1 : 0,
             enrichment.mobile_number, enrichment.phone, enrichment.contact_name, enrichment.linkedin_url, enrichment.companyName || lead.company_name, enrichment.scrapedText || '', lead.id], 
            resolve
        );
                        });
                        console.log(`🎯 [ENRICHMENT] UNLOCKED: ${enrichment.companyName || lead.company_name} → ${enrichment.email}`);
                    } else if (enrichment.email) {
                        // Keep useful company-level mailboxes in the master database. Official
                        // website/company emails can still draft fallback inbox outreach.
                        const fallbackReason = enrichment.relevant
                            ? 'Website email retained as fallback for company-inbox draft review.'
                            : 'Website email retained as fallback; relevance/contact confidence was insufficient for outreach.';
                        await new Promise<void>((resolve) => {
                            db.run(
        `UPDATE leads
         SET email = ?, email_source = ?, email_is_fallback = ?, email_verified = ?, status = ?, mobile_number = ?, phone = COALESCE(?, phone), contact_name = ?,
             email_ownership_verified = 0, email_ownership_status = ?, person_identity_verified = ?, person_name_confidence = ?, role_confidence = ?,
             contact_source_evidence_json = ?, email_syntax_valid = ?, email_domain_valid = ?, email_mailbox_accepted = ?, email_domain_catch_all = ?,
             linkedin_url = ?, company_name = ?, about_summary = ?,
                                     analysis_notes = CASE
                                         WHEN analysis_notes IS NULL OR analysis_notes = ''
                                             THEN ? || ' Legacy email repair pass v2.'
                                         ELSE analysis_notes || ' | ' || ? || ' Legacy email repair pass v2.'
                                     END
                                 WHERE id = ?`,
        [enrichment.email, enrichment.email_source || null, enrichment.email_is_fallback === true ? 1 : 0, 0, hasReviewableCompanyMailbox ? 'ready' : 'no_email', enrichment.mobile_number, enrichment.phone, enrichment.contact_name,
         enrichment.email_ownership_status || 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED', enrichment.person_identity_verified === true ? 1 : 0,
         Number(enrichment.person_name_confidence || 0), Number(enrichment.role_confidence || 0), JSON.stringify(enrichment.source_evidence || []),
         enrichment.email_syntax_valid === true ? 1 : 0, enrichment.email_domain_valid === true ? 1 : 0,
         enrichment.email_mailbox_accepted === true ? 1 : 0, enrichment.email_domain_catch_all === true ? 1 : 0,
         enrichment.linkedin_url, enrichment.companyName || lead.company_name,
                                 enrichment.scrapedText || '', fallbackReason, fallbackReason, lead.id],
                                resolve
                            );
                        });
                        console.log(hasReviewableCompanyMailbox
                            ? `[ENRICHMENT] Fallback company mailbox queued for draft review: ${enrichment.companyName || lead.company_name} -> ${enrichment.email}`
                            : `[ENRICHMENT] Company mailbox retained but not draftable: ${enrichment.companyName || lead.company_name} -> ${enrichment.email}`);
                    } else if (!enrichment.relevant) {
                        await new Promise<void>((resolve) => {
                            db.run("UPDATE leads SET status = 'rejected', analysis_notes = COALESCE(analysis_notes, '') || ' Legacy email repair pass v2.' WHERE id = ?", [lead.id], resolve);
                        });
                    } else {
                        await new Promise<void>((resolve) => {
                            db.run("UPDATE leads SET status = 'no_email', mobile_number = ?, phone = COALESCE(?, phone), contact_name = ?, linkedin_url = ?, about_summary = ? WHERE id = ?", 
                                [enrichment.mobile_number, enrichment.phone, enrichment.contact_name, enrichment.linkedin_url, enrichment.scrapedText || '', lead.id], 
                                resolve
                            );
                        });
                    }
                    const completedAttempt = Number(lead.enrichment_attempt_count || 0) + 1;
                    await new Promise<void>(resolve => db.run(
                        `UPDATE leads SET
                           enrichment_status = CASE
                             WHEN (email IS NOT NULL AND TRIM(email) <> '') OR
                                  (COALESCE(NULLIF(TRIM(phone_e164), ''), NULLIF(TRIM(mobile_number), ''), NULLIF(TRIM(phone), '')) IS NOT NULL)
                               THEN 'completed'
                             WHEN ? >= 4 THEN 'needs_review'
                             ELSE 'retry_scheduled'
                           END,
                           enrichment_finished_at = CURRENT_TIMESTAMP,
                           next_retry_at = CASE
                             WHEN (email IS NOT NULL AND TRIM(email) <> '') OR
                                  (COALESCE(NULLIF(TRIM(phone_e164), ''), NULLIF(TRIM(mobile_number), ''), NULLIF(TRIM(phone), '')) IS NOT NULL)
                               THEN NULL
                             WHEN ? >= 4 THEN NULL
                             ELSE datetime('now', '+' || ? || ' minutes')
                           END,
                           last_error_code = CASE
                             WHEN (email IS NOT NULL AND TRIM(email) <> '') OR
                                  (COALESCE(NULLIF(TRIM(phone_e164), ''), NULLIF(TRIM(mobile_number), ''), NULLIF(TRIM(phone), '')) IS NOT NULL)
                               THEN NULL ELSE 'CONTACT_CHANNELS_INCOMPLETE' END,
                           last_error_message = CASE
                             WHEN (email IS NOT NULL AND TRIM(email) <> '') OR
                                  (COALESCE(NULLIF(TRIM(phone_e164), ''), NULLIF(TRIM(mobile_number), ''), NULLIF(TRIM(phone), '')) IS NOT NULL)
                               THEN NULL ELSE 'Public email and phone collection is incomplete after this enrichment pass.' END,
                           enrichment_worker_id = NULL
                         WHERE id = ?`,
                        [completedAttempt, completedAttempt, Math.min(60, 2 ** completedAttempt), lead.id], () => resolve()
                    ));
                } else {
                    await new Promise<void>((resolve) => {
                        db.run(
                            "UPDATE leads SET status = 'rejected', enrichment_status = 'needs_review', enrichment_finished_at = CURRENT_TIMESTAMP, last_error_code = 'MISSING_WEBSITE', last_error_message = ?, analysis_notes = ? WHERE id = ?",
                            ['Enrichment requires a verified website or domain.', 'Skipped during enrichment: missing website/domain.', lead.id],
                            resolve
                        );
                    });
                    console.log(`⚠️ [ENRICHMENT] Rejected stuck lead without website: ${lead.company_name}`);
                }
            }
        }

        // 3. Discovery Phase

        if (autoDiscover && (lastDiscovery === 0 || Date.now() - lastDiscovery > DISCOVERY_INTERVAL)) {
            const autonomousQueries = await buildAiDiscoveryPlan(settings);
            if (autonomousQueries.length === 0) {
                console.log("⚠️ [DISCOVERY] No autonomous queries available from current targeting settings.");
                await delay(15000);
                continue;
            }

            const discoveryDepth = (settings.investigation_depth || settings.INVESTIGATION_DEPTH || 'shallow') === 'deep' ? 'deep' : 'shallow';
            // Discovery identifies real company URLs quickly. Deep crawling is
            // performed once by the bounded enrichment stage, not duplicated here.
            const discoveryFn = discoveryDepth === 'deep' ? findLeads : findLeadTargetsFast;

            console.log(`🚀 [DISCOVERY] Pipeline clear. Launching ${discoveryDepth.toUpperCase()} burst...`);
            console.log(`🧭 [DISCOVERY] Query pool: ${autonomousQueries.slice(0, 12).join(' | ')}`);
            logToDashboard(`🚀 Launching ${discoveryDepth} autonomous discovery burst...`, "info");
            logToDashboard(`🧭 Discovery plan: ${autonomousQueries.slice(0, 6).join(' • ')}`, "info");
            
            // ── SMART QUERY PICKER: 1 query per burst, no repeats ──
            // If all queries have been used, reset and start a fresh cycle
            const unusedQueries = autonomousQueries.filter(q => !usedQueries.has(discoveryQueryKey(q)));
            if (unusedQueries.length === 0) {
                console.log('🔄 [DISCOVERY] All queries cycled. Invalidate plan to generate fresh AI queries...');
                usedQueries.clear();
                lastPlanKey = '';
                lastPlanQueries = [];
            }
            const burstNiches = unusedQueries.slice(0, 3);
            if (burstNiches.length === 0 && autonomousQueries.length > 0) {
                burstNiches.push(autonomousQueries[0]);
            }
            burstNiches.forEach(q => usedQueries.add(discoveryQueryKey(q)));
            // ── SHARED: Save leads to database (used by ALL sources) ──
            const saveLeadsToDb = async (batchLeads: any[], sourceQuery: string) => {
                if (!batchLeads || batchLeads.length === 0) return 0;
                let added = 0;
                for (const lead of batchLeads) {
                    try {
                        if (shouldSkipLeadByTargeting(lead, settings)) continue;
                        const url = lead.website;
                        if (!url || url === 'N/A' || !url.startsWith('http')) continue;
                        
                        let domain = '';
                        try { domain = new URL(url).hostname.replace('www.', '').toLowerCase(); } catch { continue; }

                        const cleanCompanyName = cleanDiscoveredCompanyName(lead.company_name);
                        const cleanQuery = normalizeDiscoveryQuery(sourceQuery);
                        const quality = evaluateDiscoveryLeadQuality({ ...lead, company_name: cleanCompanyName, website: url, domain }, cleanQuery, settings);
                        if (!quality.accept) {
                            console.log(`   ⛔ REJECTED (${quality.reason}, score ${quality.score}): ${url}`);
                            continue;
                        }
                        
                        const exists = await new Promise((res) => db.get("SELECT id FROM leads WHERE domain = ? OR website LIKE ?", [domain, `%${domain}%`], (err, row) => res(!!row)));
                        
                        if (!exists) {
                            const initialStatus = 'new';
                            await new Promise<void>((res) => db.run(
                                "INSERT OR IGNORE INTO leads (company_name, website, domain, email, mobile_number, status, category, type, relevance_score, is_relevant, analysis_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)", 
                                [cleanCompanyName, url, domain, lead.email || null, lead.mobile || null, initialStatus, cleanQuery, lead.source || `auto_discovery_${discoveryDepth}`, quality.score, `Discovery source: ${lead.source || discoveryDepth}. Gate: ${quality.reason}`], 
                                () => res()
                            ));
                            added++;
                            console.log(`   ✅ STAGING (${initialStatus.toUpperCase()}): ${cleanCompanyName} → ${url}`);
                        }
                    } catch (e) {
                        // ignore duplicates / invalid
                    }
                }
                if (added > 0) {
                    logToDashboard(`📥 Saved ${added} new unique lead(s) into database!`, 'success');
                }
                return added;
            };

            for (const query of burstNiches) {
                const queryKey = discoveryQueryKey(query);
                const currentOffset = (queryOffsetMap.get(queryKey) || 0) % 5;
                queryOffsetMap.set(queryKey, currentOffset + 1);

                console.log(`🔍 [DISCOVERY] [${discoveryDepth}] Searching: "${query}" (Page ${currentOffset + 1})...`);
                const searchPipeline = (async (): Promise<{ leads: any[]; trace: any }> => {
                    console.log(`[DISCOVERY] Starting Yellow Pages, Bing, Yahoo, DDG and fallback providers concurrently with Ninja for: "${query}" (Page ${currentOffset + 1})`);
                    await logToDashboard(`Search providers running concurrently: Yellow Pages, Bing, Yahoo, DDG (Page ${currentOffset + 1}) for "${query}"...`, 'info');
                    return Promise.race([
                        discoveryFn(query, currentOffset),
                        new Promise<{ leads: any[]; trace: any }>((_, reject) => setTimeout(() => reject(new Error('Search provider pipeline timed out after 600s')), 600000))
                    ]);
                })();

                // ── SOURCE 1: GMB Ninja (Google Maps — highest quality local leads) ──
                try {
                    const { runGmbNinjaScan } = await import('./gmb_stealth.js');
                    console.log(`🥷 [DISCOVERY] GMB Ninja Stealth Scan for: "${query}"...`);
                    const targetLocation = settings.target_location || settings.TARGET_LOCATION || 'UAE';
                    const gmbQuery = withoutTargetLocation(query, targetLocation);
                    const gmbLeads = await Promise.race([
                        runGmbNinjaScan(gmbQuery, targetLocation),
                        new Promise<any[]>(resolve => setTimeout(() => {
                            console.warn(`GMB Ninja timed out; continuing with search engines for: "${query}"`);
                            resolve([]);
                        }, 120000))
                    ]);

                    if (gmbLeads && gmbLeads.length > 0) {
                        console.log(`🥷 [DISCOVERY] GMB Ninja returned ${gmbLeads.length} leads. Saving immediately...`);
                        await saveLeadsToDb(gmbLeads, query);
                    }
                } catch (gmbErr: any) {
                    console.warn(`⚠️ GMB Ninja scan error: ${gmbErr.message}`);
                }

                // ── SOURCE 2: Search Engines (Bing/Yahoo/DDG/Stealth/YP — supplementary) ──
                try {
                    console.log(`🔎 [DISCOVERY] Search engine pipeline for: "${query}"...`);
                    await logToDashboard(`Search providers running: Yellow Pages, Bing, Yahoo, DDG and fallbacks for "${query}"...`, 'info');
                    const res = await searchPipeline;
                    const trace = res.trace || {};
                    await logToDashboard(`Provider results: YP ${trace.yellowpages || 0} | Bing ${trace.bing || 0} | Yahoo ${trace.yahoo || 0} | DDG ${trace.ddg || 0} | Stealth ${trace.stealth || 0}`, 'info');
                    if (res.leads && res.leads.length > 0) {
                        console.log(`🔎 [DISCOVERY] Search engines returned ${res.leads.length} leads. Saving to database...`);
                        await saveLeadsToDb(res.leads, query);
                    } else {
                        console.log(`⚠️ [DISCOVERY] Search engines returned 0 leads for: "${query}"`);
                    }
                } catch (seErr: any) {
                    await logToDashboard(`Search provider pipeline stopped: ${seErr.message}`, 'error');
                    console.warn(`⚠️ Search engine pipeline error: ${seErr.message}`);
                }
            }
            lastDiscovery = Date.now();
        }

        // 3. MONITOR REPLIES (v29.6: Self-Healing Logic)
        // @ts-ignore
        if (!global.imapMonitorActive) {
            try { 
                // @ts-ignore
                const mod: any = await import('./monitor_service.js').catch(() => null); 
                if (mod && mod.monitorReplies) {
                    void mod.monitorReplies(); 
                    // @ts-ignore
                    global.imapMonitorActive = true;
                }
            } catch { 
                // @ts-ignore
                global.imapMonitorActive = false; 
            }
        }
        
        console.log(`😴 [LOOP] Phase complete. Resting for 3s...`);
        await delay(3000);
    }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    runWorker().catch(err => console.error("Worker failed:", err));
}
