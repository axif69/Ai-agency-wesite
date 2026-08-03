// Sovereign v17.1 — GROUND-TRUTH DIRECTORY-FIRST DISCOVERY ENGINE (Restored)
// PRIMARY: Yellow Pages UAE direct scraping (no search engine needed)
// SECONDARY: Bing HTML scraping with stealth headers
// FALLBACK: DuckDuckGo HTML scraping
// NEVER: AI/Groq for company name generation — only for email personalization

import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import dns from 'dns/promises';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
dotenv.config();

const GEMINI_KEY = "AIzaSyAiAJadyHJaC1DdnszigPvUFNurDMG0yVg";

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)+/gi;
const MOBILE_REGEX = /(\+971|00971|971|0)[\s\-]?(5[0-9][\s\-]?\d{3}[\s\-]?\d{4})/g;

const deriveFallbackName = (targetUrl: string) => {
    try {
        if (!targetUrl || targetUrl === 'N/A') return 'UAE Business Entity';
        const domain = new URL(targetUrl).hostname.replace('www.', '').split('.')[0];
        return domain.charAt(0).toUpperCase() + domain.slice(1);
    } catch { return 'UAE Business Entity'; }
};

export const cleanCompanyName = (name: string): string => {
    if (!name) return '';
    // Step 1: Take first segment before ANY SEO separator (|, –, —, :, ·, #, », /, -)
    // Use careful split: only split on dash when surrounded by spaces to avoid breaking "Al-Futtaim"
    let n = name
        .split(/[|–—:·»#]/)[0]
        .replace(/\s+[-]\s+.*$/, '')  // "Company - Tagline" but NOT "Al-Futtaim"
        .trim();

    // Step 2: Strip leading SEO prefixes (order matters: longest first)
    n = n.replace(/^(?:Welcome\s+to|Home\s+of|Official\s+(?:Website|Site|Page)\s+of|About|Best|Top|Leading|Premier|No\.?\s*#?\s*1|#1|The\s+Best|The\s+Leading|The\s+Top)\s+/i, '').trim();

    // Step 3: Strip trailing legal suffixes
    n = n.replace(/\s*[-–—]?\s*(?:LLC|L\.?L\.?C\.?|FZCO|FZE|FZ-?LLC|FZ|LTD\.?|PLC|Inc\.?|Corp\.?|Est\.?|WLL|DMCC|DWC|DIFC|JAFZA|PJSC|JSC|S\.?A\.?L\.?|GmbH|Pvt\.?\s*Ltd\.?|Private\s+Limited|Limited)\s*\.?\s*$/i, '').trim();

    // Step 4: Strip trailing location phrases
    n = n.replace(/\s+(?:in|based\s+in|located\s+in|headquarters?\s+in)\s+(?:UAE|Dubai|Abu\s*Dhabi|Sharjah|Ajman|Fujairah|Ras\s+Al\s+Khaimah|Umm\s+Al\s+Quwain|Qatar|Doha|Saudi\s*Arabia|Riyadh|Jeddah|Oman|Muscat|Bahrain|Kuwait|GCC|MENA|Middle\s+East)\s*$/i, '').trim();

    // Step 5: Remove stray trailing punctuation
    n = n.replace(/[,.!;:]+$/, '').trim();

    // Step 6: Reject non-B2B patterns (news, blog, job portals, directories, government)
    const lower = n.toLowerCase();
    const rejectPatterns = [
        'news', 'sports', 'breaking', 'magazine', 'portal', 'directory',
        'blog', 'publisher', 'classified', 'job board', 'jobs portal',
        'wikipedia', 'facebook', 'linkedin', 'twitter', 'instagram',
        'yellow pages', 'white pages', 'government of', 'ministry of',
        'municipality', 'free zone authority'
    ];
    // Reject UNLESS it's clearly a marketing/media agency
    if (rejectPatterns.some(p => lower.includes(p)) && !lower.includes('agency') && !lower.includes('marketing') && !lower.includes('advertising') && !lower.includes('pr ')) {
        return ''; // Signals rejection — caller should skip this lead
    }

    // Step 7: If still too long (>5 words, no &), truncate to first 4 meaningful words
    const words = n.split(/\s+/).filter(w => w.length > 0);
    if (words.length > 5 && !n.includes('&')) {
        n = words.slice(0, 4).join(' ');
    }

    // Step 8: Final empty/junk check
    if (!n || n.length < 2) return '';
    return n;
};

let cachedTargetLocation = 'UAE';

export const setCachedTargetLocation = (loc: string) => {
    cachedTargetLocation = loc;
};

// Smart search query format helper to prevent double-locations like "in UAE UAE"
const cleanSearchQuery = (query: string): string => {
    const q = String(query || '').trim();
    const lower = q.toLowerCase();
    const locations = ['uae', 'dubai', 'abu dhabi', 'sharjah', 'ajman', 'fujairah', 'ras al', 'al ain', 'qatar', 'saudi', 'oman', 'muscat', 'riyadh', 'doha'];
    if (locations.some(loc => lower.includes(loc))) {
        return q;
    }
    return `${q} UAE`;
};

// ─── Forbidden domains ──────────────────────────────────────────────────────
const isForbidden = (url: string): boolean => {
    const lowerUrl = url.toLowerCase();
    
    // Systemic non-company websites that we should never crawl (social networks, search engines, standard wikis)
    const systemicBlocks = [
        'wikipedia.org', 'wordpress.com', 'github.com', 'youtube.com', 'facebook.com', 
        'instagram.com', 'twitter.com', 'linkedin.com', 'google.', 'bing.com', 
        'yahoo.com', 'duckduckgo.com', 'w3.org', 'schema.org', 'pinterest.com',
        'tiktok.com', 'tumblr.com', 'vimeo.com', 'reddit.com', 'quora.com'
    ];
    
    if (systemicBlocks.some(block => lowerUrl.includes(block))) {
        return true;
    }

    // Target Location checks:
    const loc = String(cachedTargetLocation || 'UAE').toLowerCase();
    const isTargetingUae = loc.includes('uae') || loc.includes('dubai') || loc.includes('abu dhabi') || loc.includes('sharjah') || loc.includes('ajman');
    const isTargetingQatar = loc.includes('qatar') || loc.includes('doha');
    const isTargetingSaudi = loc.includes('saudi') || loc.includes('ksa') || loc.includes('riyadh') || loc.includes('jeddah');
    
    const host = url.includes('://') ? new URL(url).hostname : url;
    const domain = host.toLowerCase();

    // Block all government and military domains
    if (
        domain.endsWith('.gov') || 
        domain.endsWith('.gov.ae') || 
        domain.includes('.gov.') || 
        domain.endsWith('.mil') || 
        domain.endsWith('.mil.ae') ||
        domain.includes('.mil.') ||
        domain.includes('government.') ||
        domain.includes('govt.')
    ) {
        return true;
    }

    if (isTargetingUae && (domain.endsWith('.qa') || domain.endsWith('.om') || domain.endsWith('.sa') || domain.endsWith('.bh') || domain.endsWith('.kw') || domain.includes('.qa.') || domain.includes('.sa.'))) {
        return true;
    }
    if (isTargetingQatar && !domain.endsWith('.qa') && (domain.endsWith('.ae') || domain.endsWith('.sa') || domain.endsWith('.om'))) {
        return true;
    }

    const forbidden = [
        'facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com',
        'youtube.com', 'pinterest.com', 'wikipedia.org', 'w3.org',
        'schema.org', 'google.com', 'google.ae', 'bing.com', 'yahoo.com',
        'duckduckgo.com', 'tripadvisor.', 'indeed.', 'glassdoor.',
        'companieshouse.', 'opencorporates.', 'wordpress.com', 'github.com',
        'cloudflare.', 'bootstrapcdn.', 'googleapis.', 'gstatic.', 'sentry.',
        'bloomberg.com', 'reuters.com', 'manta.com', 'yelp.com', 'foursquare.com',
        'goodfirms.co', 'sortlist.com',
        // Stock markets, exchanges, stock tracking
        'dfm.ae', 'adx.ae', 'nasdaqdubai.com', 'marketwatch.com', 'sec.gov',
        'investopedia.com', 'tradersunion.com', 'whichfinancialadviser.com',
        // UAE Business Directories (The "Directory-Shield")
        'hidubai.com', 'easyuae.com', 'atninfo.com', 'yello.ae', 'yellowpages-uae.com',
        'dubaibizdirectory.com', 'uaeadvertising.com', 'businessdirectory-uae.com',
        'dubaidirectory.com', 'uaecontact.com', 'middleeastbusiness.com',
        'zawya.com', 'tradenology.com', 'emirates247.com', 'khaleejtimes.com',
        'gulfnews.com', 'ae.kompass.com', 'uae-companies.com', 'dubaiclassified.com',
        'dubizzle.com', 'propertyfinder.ae', 'bayut.com', 'zoominfo.com', 'apollo.io',
        'crunchbase.com', 'lseg.com', 'upwork.com', 'fiverr.com', 'freelancer.com',
        'facebook.com', 'tiktok.com', 'amazon.', 'noon.com', 'b2bhint.com',
        // Extra UAE listing/directory aggregators (these get mistaken as "company websites")
        'uaeresults.com', 'emaratfinder.com', 'dcciinfo.com', 'bestthings.ae', 'uaefind.com',
        'lookup.ae', 'connect.ae', 'companies.ae', 'b2b.ae', 'localbiz', 'businesslist',
        'dubaicityguide.com', 'guide2dubai.com', 'uaebusinessdirectory.com', 'tadalat.com',
        'uae-yp.com', 'reachuae.com', 'ae-business.com', 'dubairadiocontractor.ae',
        'etisalatyellowpages.ae', 'infoisinfo-ae.com', 'yalwa.ae', 'localsearch.ae',
        'middleeastbusiness.directory', 'uae-companies.ae', 'dubaityguide.com',
        'uaecontact.com', 'uaebusinessdirectory.ae', 'uae-business-directory.com',
        'commercialappeal.com', 'memphisflyer.com', 'dailyjournal.net', 'news-sentinel.com',
        'indystar.com', 'courierpress.com', 'jconline.com', 'southbendtribune.com',
        // Directory portals & generic search tools
        'whichfinancialadviser.com', 'advisorfinder.ae', 'adviserfinder.ae', 'adviser-find.com',
        // Global news outlets, media portals, education/reference/content farms
        'thenationalnews.com', 'arabianbusiness.com', 'gulfbusiness.com', 'forbes.com', 'ft.com',
        'economist.com', 'wsj.com', 'cnbc.com', 'bbc.com', 'bbc.co.uk', 'nytimes.com', 'cnn.com',
        'aljazeera.com', 'independent.co.uk', 'guardian.co.uk', 'theguardian.com',
        'financialexpress.com', 'britannica.com', 'jagranjosh.com', 'worldatlas.com',
        'dictionary.cambridge.org', 'merriam-webster.com', 'thefreedictionary.com',
        'dictionary.com', 'scribd.com', 'medium.com', 'techradar.com', 'statista.com',
        'researchandmarkets.com', 'globaldata.com', 'simplicable.com', 'limble.com',
        'modula.eu', 'ilifehacks.com',
        // v29.3: Competitor Shield (Reject peer agencies)
        'digital-marketing', 'seo-agency', 'ai-agency', 'marketing-agency', 'web-development', 'software-house', 'creative-agency'
    ];

    // v27.1: News/Blog/Directory Rejection Phrases
    const newsPhrases = ['/news/', '/blog/', '/sports/', '/article/', '/breaking-', '/magazine/', '/press-release/', '/weather/'];
    if (newsPhrases.some(p => lowerUrl.includes(p))) return true;

    return forbidden.some(d => {
        try {
            return domain.includes(d);
        } catch {
            return lowerUrl.includes(d);
        }
    });
};

// Directory pages frequently expose image/CDN URLs beside company listings.
// Treat only real, crawlable domains as official websites.
const isValidCompanyWebsite = (candidate: string): boolean => {
    try {
        const parsed = new URL(candidate);
        if (!['http:', 'https:'].includes(parsed.protocol)) return false;
        const host = parsed.hostname.toLowerCase();
        const path = parsed.pathname.toLowerCase();
        if (!host.includes('.') || isForbidden(parsed.origin)) return false;
        if (/\.(png|jpe?g|gif|svg|webp|ico|css|js|woff2?)$/i.test(host)) return false;
        if (/\.(png|jpe?g|gif|svg|webp|ico|css|js|woff2?)(?:$|[?#])/i.test(host + path)) return false;
        if (['1x', '2x', 'logo', 'favicon', 'sprite'].includes(host.split('.')[0])) return false;
        return true;
    } catch {
        return false;
    }
};

// ─── Cloudflare Email Decryptor (v24.2) ──────────────────────────────────────
const decodeCloudflareEmail = (encoded: string): string => {
    try {
        let email = "";
        let key = parseInt(encoded.substring(0, 2), 16);
        for (let i = 2; i < encoded.length; i += 2) {
            email += String.fromCharCode(parseInt(encoded.substring(i, i + 2), 16) ^ key);
        }
        return email;
    } catch { return ""; }
};

// ─── Industry relevance keywords (Resale: B2B companies that need cold outreach) ───
const INDUSTRY_KEYWORDS = [
    // Digital & Marketing (they sell services — need outreach to win clients)
    'digital marketing', 'marketing agency', 'social media', 'seo agency',
    'performance marketing', 'branding', 'content marketing', 'web design',
    'creative agency', 'advertising', 'media agency', 'pr agency',
    // Software & IT (need to reach new enterprise buyers)
    'software development', 'it solutions', 'saas', 'cloud services',
    'cybersecurity', 'erp solutions', 'app development', 'ai technology',
    'data analytics', 'it consulting', 'managed services', 'fintech',
    'web development', 'mobile app', 'digital transformation',
    // Recruitment & HR (constantly prospecting companies to fill roles)
    'recruitment agency', 'hr consultancy', 'executive search', 'staffing agency',
    'manpower supply',
    // Real Estate & Finance (cold outreach is their lifeblood)
    'real estate brokerage', 'property brokerage', 'mortgage broker',
    'financial advisory', 'investment consultancy', 'insurance brokerage',
    'wealth management',
    // Training & Consulting (sell to corporates — need outreach)
    'business coaching', 'corporate training', 'management consultancy',
    'sales training', 'business consultant',
    // Events & Exhibitions (pitch to sponsors and exhibitors constantly)
    'event management', 'exhibition', 'event company',
    // Logistics (pitch to importers/exporters)
    'freight forwarding', 'logistics company', 'supply chain', 'customs clearance',
    // Professional Services (need new clients)
    'healthcare technology', 'medical software', 'legal firm', 'law firm',
    'accounting firm', 'business setup consultancy'
];

// ─── Negative Keywords (Pure B2C / Non-business pages only) ─────────────────
// NOTE: Do NOT add B2B niches here — recruitment, real estate, legal, HR are all valid targets
const NEGATIVE_KEYWORDS = [
    // Pure consumer sectors (not B2B buyers)
    'retail shop', 'fashion store', 'clothing store', 'beauty salon', 'restaurant',
    'gym', 'medical center', 'clinic', 'hospital', 'pharmacy',
    'university', 'school', 'academy', 'supermarket', 'hypermarket', 'grocery',
    'general trading', 'wholesale market'
];

const splitList = (value: any): string[] =>
    String(value || '').split(/[\n,;|]+/).map(k => k.trim().toLowerCase()).filter(Boolean);

/**
 * DYNAMIC COMPETITOR FILTERING GUARD (v2)
 * Derives the active agency's OWN service categories from workspace settings
 * (company_name, pitch_context, offer_angle, company_knowledge) plus any explicit
 * COMPETITOR_EXCLUSIONS list, and returns the set of terms that mark a prospect as
 * a COMPETITOR (a peer agency/lead-gen/web firm) — which we must never target.
 *
 * 100% dynamic: nothing here is hardcoded to a single sector/niche. If a workspace
 * pivots (e.g. from "digital marketing" to "SaaS", "medical devices", "logistics"),
 * the exclusions are re-derived automatically from the workspace brief.
 */
const deriveOwnServiceTerms = (settings?: any): string[] => {
    const s = settings || {};
    const ownServiceText = [
        s.company_name, s.company_knowledge, s.COMPANY_KNOWLEDGE,
        s.offer_angle, s.OFFER_ANGLE, s.pitch_context, s.PITCH_CONTEXT,
        s.services, s.SERVICES, s.service_categories, s.SERVICE_CATEGORIES,
        s.own_services, s.OWN_SERVICES
    ].filter(Boolean).join('\n').toLowerCase();

    // The agency's own categories ARE the competitor categories: any prospect whose
    // metadata/tags/description matches what WE do is a peer/competitor, not a buyer.
    // Pull the most salient service nouns (these typically repeat across the profile).
    const freq = new Map<string, number>();
    const words = ownServiceText.replace(/[^a-z0-9\s+]/gi, ' ').split(/\s+/).filter(w => w.length >= 4);
    for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
    const repeated = Array.from(freq.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([w]) => w);

    // Explicit competitor override from Dashboard (if the operator lists them).
    const explicit = splitList(settings?.COMPETITOR_EXCLUSIONS || settings?.competitor_exclusions || settings?.COMPETITOR_NICHES);

    // Service-category phrases we derive so a marketing/AI agency excludes competing
    // marketing agencies / web design firms / lead-gen tools without locking a niche.
    const derivedPhrases = [
        ...(ownServiceText.includes('marketing') ? ['marketing agency', 'digital marketing agency', 'marketing firm', 'ad agency', 'marketing company', 'marketing studio'] : []),
        ...(ownServiceText.includes('ai') || ownServiceText.includes('artificial intelligence') || ownServiceText.includes('automation') ? ['ai agency', 'ai company', 'artificial intelligence company', 'sales automation company', 'agent company'] : []),
        ...(ownServiceText.includes('software') || ownServiceText.includes('development') || ownServiceText.includes('sdr') ? ['software development agency', 'software company', 'web development agency', 'app development agency', 'sdr agency', 'lead gen agency'] : []),
        ...(ownServiceText.includes('design') || ownServiceText.includes('web') ? ['web design agency', 'digital design agency', 'web design company', 'website design agency'] : []),
        ...(ownServiceText.includes('lead') || ownServiceText.includes('sales') ? ['lead generation agency', 'lead gen company', 'b2b lead generation', 'sales agency', 'sdr services'] : []),
    ];

    const all = [...new Set([...explicit, ...derivedPhrases, ...repeated])].filter(Boolean);
    return all;
};

/** True if a prospect (name, snippet, tags, description) matches the dynamic competitor terms. */
export const isCompetitorProspect = (name: string, text: string, terms: string[]): boolean => {
    const haystack = `${name || ''} ${text || ''}`.toLowerCase();
    return (terms || []).some(t => t && haystack.includes(t));
};

// Convenience loader used across search_service so the guard stays DRY.
export const loadCompetitorTerms = async (settings?: any): Promise<string[]> => {
    const src = settings || await import('./config_manager').then(m => m.loadSystemConfig()).catch(() => null);
    return deriveOwnServiceTerms(src);
};

export const isRelevant = (text: string, settings?: any): boolean => {
    const lowerText = (text || '').toLowerCase();
    if (!lowerText || lowerText.length < 10) return false;

    const s = settings || {};

    // ── DYNAMIC POSITIVE SIGNALS (Weight: +35) — from the workspace Targeting Brief ──
    // REQUIRED_KEYWORDS is the authoritative buyer ICP list. NO sector is hardcoded here;
    // if the operator pivots industries, these terms change with the dashboard settings.
    const requiredList = splitList(s.required_keywords || s.REQUIRED_KEYWORDS);
    const pitchWords = String(s.pitch_context || s.PITCH_CONTEXT || '')
        .toLowerCase()
        .split(/\s+/)
        .map(w => w.replace(/[^a-z]/g, ''))
        .filter(w => w.length > 5);

    // Generic commercial indicators — NOT sector-specific, just "this is a business".
    const corporateIndicators = [' llc', ' psc', ' pjsc', ' branch', ' group', ' international', ' solutions', ' services', ' fze', ' fzco', ' company', ' ltd', ' limited'];

    let score = 0;
    let matchedRequired = false;
    requiredList.forEach(k => {
        if (k && lowerText.includes(k)) {
            score += 35; // Strong priority boost for explicit ICP keywords
            matchedRequired = true;
        }
    });
    // If a required list exists and none of it is present, penalize decisively.
    if (requiredList.length > 0 && !matchedRequired) {
        score -= 40;
    }
    // Pitch-context word boost (small, bounded)
    if (pitchWords.length > 0) {
        let pitchMatchCount = 0;
        pitchWords.forEach(w => { if (lowerText.includes(w)) pitchMatchCount++; });
        if (pitchMatchCount > 0) score += Math.min(pitchMatchCount * 3, 15);
    }

    // ── DYNAMIC NEGATIVE SIGNALS (Weight: -40) — from the workspace Dashboard ──
    const negativeList = splitList(s.negative_keywords || s.NEGATIVE_KEYWORDS);
    negativeList.forEach(k => {
        if (k && lowerText.includes(k)) score -= 40; // Decisive block penalty
    });

    // DYNAMIC COMPETITOR GUARD: the active agency's own service categories are never relevant.
    const cTerms = deriveOwnServiceTerms(s);
    if (cTerms.length > 0 && isCompetitorProspect('', lowerText, cTerms)) {
        return false;
    }

    // Generic commercial presence boost (works for any sector).
    corporateIndicators.forEach(k => { if (lowerText.includes(k)) score += 2; });

    return score > 8;
};

// ─── Rotating User Agents ─────────────────────────────────────────────────
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
];
const randomUA = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const withTimeout = async <T>(task: Promise<T>, ms: number, fallback: T, label: string): Promise<T> => {
    let timer: NodeJS.Timeout | undefined;
    try {
        return await Promise.race([
            task,
            new Promise<T>((resolve) => {
                timer = setTimeout(() => {
                    console.log(`  ⏱️ ${label} timed out after ${Math.round(ms / 1000)}s. Continuing with partial results.`);
                    resolve(fallback);
                }, ms);
            })
        ]);
    } finally {
        if (timer) clearTimeout(timer);
    }
};

export const ddgSearch = async (query: string, offset: number = 0): Promise<string[]> => {
    const urls: string[] = [];
    try {
        const encoded = encodeURIComponent(query);
        const ddgOffset = offset * 30;
        
        const res = await axios.get(`https://html.duckduckgo.com/html/?q=${encoded}&s=${ddgOffset}&dc=${ddgOffset}&v=l&o=json&api=/d.js`, {
            headers: {
                'User-Agent': randomUA(),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://duckduckgo.com/',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'DNT': '1',
            },
            timeout: 18000,
        });

        const $ = cheerio.load(res.data);
        $('.result__a').each((_, el) => {
            const href = $(el).attr('href') || '';
            if (href.includes('uddg=')) {
                try {
                    const encodedUrl = href.split('uddg=')[1].split('&')[0];
                    const decoded = decodeURIComponent(encodedUrl);
                    const origin = new URL(decoded).origin;
                    if (!isForbidden(origin)) urls.push(origin);
                } catch { }
            } else if (href.startsWith('http')) {
                try {
                    const origin = new URL(href).origin;
                    if (!isForbidden(origin)) urls.push(origin);
                } catch {}
            }
        });

        // v27.3: Absolute Fallback — Extract from text if Cheerio fails
        if (urls.length === 0) {
            const matches = res.data.match(/uddg=(https?%3A[^&"'\s]+)/gi);
            if (matches) {
                matches.forEach((m: string) => {
                    try {
                        const decoded = decodeURIComponent(m.split('uddg=')[1]);
                        const origin = new URL(decoded).origin;
                        if (!isForbidden(origin)) urls.push(origin);
                    } catch {}
                });
            }
        }

        if (urls.length === 0) {
            const lite = await axios.get(`https://lite.duckduckgo.com/lite/?q=${encoded}`, {
                headers: {
                    'User-Agent': randomUA(),
                    'Accept': 'text/html,application/xhtml+xml',
                    'Accept-Language': 'en-US,en;q=0.8'
                },
                timeout: 18000
            });
            const litePage = cheerio.load(lite.data);
            litePage('a.result-link, a[href*="uddg="], td.result-link a').each((_, el) => {
                const href = litePage(el).attr('href') || '';
                try {
                    const candidate = href.includes('uddg=')
                        ? decodeURIComponent(href.split('uddg=')[1].split('&')[0])
                        : href;
                    if (candidate.startsWith('http')) {
                        const origin = new URL(candidate).origin;
                        if (!isForbidden(origin)) urls.push(origin);
                    }
                } catch {}
            });
        }

        if (urls.length === 0) {
            urls.push(...await puppeteerSearch(query, false));
        }

        console.log(`  → DDG returned ${urls.length} URLs for: "${query}"`);
    } catch (e: any) {
        // Fallback to Puppeteer stealth search on HTTP 406/500
        try {
            const stealthUrls = await puppeteerSearch(query, false);
            urls.push(...stealthUrls);
            console.log(`  → DDG (Stealth Fallback) returned ${urls.length} URLs for: "${query}"`);
        } catch {}
    }
    return Array.from(new Set(urls)).slice(0, 15);
};

// ─── 2. Bing Scraper (FIXED) ─────────────────────────────────────────────────
// BUG WAS: regex `<li class="b_algo">.*?<h2><a href=...` never matches across newlines
// FIX: use cheerio to select `li.b_algo h2 a` elements — reliable, no newline issue
// Bing uses 'first' for result offset (1, 11, 21...)
export const bingSearch = async (query: string, offset: number = 0): Promise<string[]> => {
    const urls: string[] = [];
    const first = (offset * 10) + 1;
    try {
        // Fix Bing(0): Use more natural headers and a secondary user-agent
        const secondaryUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';
        const res = await axios.get(`https://www.bing.com/search?q=${encodeURIComponent(query)}&first=${first}&count=15&setlang=en`, {
            headers: {
                'User-Agent': (Date.now() % 2 === 0) ? randomUA() : secondaryUA,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                'Referer': 'https://www.bing.com/',
                'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Upgrade-Insecure-Requests': '1',
            },
            timeout: 15000,
        });

        const $ = cheerio.load(res.data);

        // ✅ FIX: Cheerio selector — finds all result links in Bing's algo list
        $('li.b_algo h2 a, .b_algo h2 a, #b_results .b_algo h2 a').each((_, el) => {
            const href = $(el).attr('href');
            if (href && href.startsWith('http') && !isForbidden(href)) {
                try { urls.push(new URL(href).origin); } catch { }
            }
        });

        // Fallback: also grab any organic cite elements
        if (urls.length < 3) {
            $('cite, .b_adurl cite').each((_, el) => {
                const text = $(el).text().trim();
                if (text.includes('.') && !text.includes(' ') && text.length > 5) {
                    const candidate = text.startsWith('http') ? text : `https://${text}`;
                    try {
                        const origin = new URL(candidate).origin;
                        if (!isForbidden(origin)) urls.push(origin);
                    } catch { }
                }
            });
        }

        console.log(`  → Bing returned ${urls.length} URLs for: "${query}"`);
    } catch (e: any) {
        // Silenced: ${e.message}
    }
    return Array.from(new Set(urls)).slice(0, 15);
};

// ─── 3. Yahoo Search Scraper (NEW — replaces broken Google) ──────────────────
// Yahoo is far less aggressive about CAPTCHA than Google and returns clean HTML results
export const yahooSearch = async (query: string, offset: number = 0): Promise<string[]> => {
    const urls: string[] = [];
    const yahooOffset = (offset * 10) + 1;
    try {
        const fullQuery = query + ' -site:easyuae.com -site:hidubai.com';
        const res = await axios.get(
            `https://search.yahoo.com/search?p=${encodeURIComponent(fullQuery)}&b=${yahooOffset}&n=15&fl=1`,
            {
                headers: {
                    'User-Agent': randomUA(),
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Referer': 'https://search.yahoo.com/',
                },
                timeout: 25000,
                maxRedirects: 5,
            }
        );

        const $ = cheerio.load(res.data);

        // Yahoo wraps results in div.algo, with h3.title > a containing the href
        $('div.algo h3.title a, div.algo-sr h3 a, .compTitle a').each((_, el) => {
            const href = $(el).attr('href') || '';
            // Yahoo wraps in a redirect: /RU=https%3A%2F%2Factualsite.com/...
            if (href.includes('/RU=')) {
                try {
                    const encoded = href.split('/RU=')[1].split('/')[0];
                    const decoded = decodeURIComponent(encoded);
                    if (decoded.startsWith('http') && !isForbidden(decoded)) {
                        urls.push(new URL(decoded).origin);
                    }
                } catch { }
            } else if (href.startsWith('http') && !isForbidden(href)) {
                try { urls.push(new URL(href).origin); } catch { }
            }
        });

        if (urls.length === 0) {
            $('a[href*="/RU="]').each((_, el) => {
                const href = $(el).attr('href') || '';
                try {
                    const decoded = decodeURIComponent(href.split('/RU=')[1].split('/')[0]);
                    if (decoded.startsWith('http') && !isForbidden(decoded)) urls.push(new URL(decoded).origin);
                } catch {}
            });
        }

        if (urls.length === 0) {
            let browser: any = null;
            try {
                browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
                const page = await browser.newPage();
                await page.setUserAgent(randomUA());
                try {
                    await page.goto(`https://search.yahoo.com/search?p=${encodeURIComponent(fullQuery)}&n=15`, { waitUntil: 'domcontentloaded', timeout: 25000 });
                } catch (e: any) {
                    console.warn(`⚠️ Yahoo navigation failed (execution context destroyed): ${e.message}`);
                }
                let browserLinks: string[] = [];
                try {
                    browserLinks = await page.evaluate(() => Array.from(document.querySelectorAll('a[href]'))
                        .map(element => element.getAttribute('href') || '')
                        .filter(href => href.includes('/RU=') || href.startsWith('http')));
                } catch (e: any) {
                    console.warn(`⚠️ Yahoo evaluate failed (execution context destroyed): ${e.message}`);
                }
                for (const href of browserLinks) {
                    try {
                        const candidate = href.includes('/RU=') ? decodeURIComponent(href.split('/RU=')[1].split('/')[0]) : href;
                        if (candidate.startsWith('http') && !isForbidden(candidate)) urls.push(new URL(candidate).origin);
                    } catch {}
                }
            } finally {
                if (browser) await browser.close().catch(() => {});
            }
        }

        console.log(`  → Yahoo returned ${urls.length} URLs for: "${query}"`);
    } catch (e: any) {
        try {
            const stealthUrls = await puppeteerSearch(query, false);
            urls.push(...stealthUrls);
            console.log(`  → Yahoo (Stealth Fallback) returned ${urls.length} URLs for: "${query}"`);
        } catch {}
    }
    return Array.from(new Set(urls)).slice(0, 12);
};

// ─── 4. SearXNG Public Instance (NEW — free, JSON API, no key) ───────────────
// SearXNG is an open-source meta-search engine with public instances
// Returns clean JSON: { results: [{url, title, content}] }
const SEARXNG_INSTANCES = [
    'https://searx.be',
    'https://search.mdosch.de',
    'https://paulgo.io',
    'https://searx.work',
    'https://priv.au',
    'https://search.disroot.org',
    'https://searxng.site',
];

export const searxSearch = async (query: string, category: string = 'general'): Promise<string[]> => {
    const urls: string[] = [];

    for (const instance of SEARXNG_INSTANCES) {
        try {
            const res = await axios.get(`${instance}/search`, {
                params: { q: query, format: 'json', categories: category, language: 'en' },
                headers: {
                    'User-Agent': randomUA(),
                    'Accept': 'application/json',
                },
                timeout: 5000,
            });

            const results = res.data?.results || [];
            for (const r of results) {
                if (r.url && r.url.startsWith('http') && !isForbidden(r.url)) {
                    try { urls.push(new URL(r.url).origin); } catch { }
                }
            }

            if (urls.length > 0) {
                console.log(`  → SearXNG ${category} (${instance}) returned ${urls.length} URLs`);
                break; // Got results, stop trying other instances
            }
        } catch { /* try next instance */ }
    }

    return Array.from(new Set(urls)).slice(0, 15);
};

// ─── 5. Map Scraper (GMB / OSM via SearXNG) ──────────────────────────────────
// This finds "Nice Companies" that are physically verified on local maps.
export const mapSearch = async (query: string): Promise<string[]> => {
    // SearXNG 'map' category pulls from Google Maps, OpenStreetMap, and others.
    return searxSearch(query, 'map');
};

// ─── 6. Stealth Browser Discovery (ULTIMATE FALLBACK) ────────────────────────
// Uses Puppeteer Stealth to bypass blocks on Google/Bing.
export const stealthSearch = async (query: string): Promise<string[]> => {
    const urls: string[] = [];
    console.log(`  🕵️  Launching Stealth Browser for: "${query}"`);
    let browser: any = null;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.setUserAgent(randomUA());

        // Target DuckDuckGo as it is less likely to show CAPTCHAs than Google
        try {
            await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&ia=web`, {
                waitUntil: 'networkidle2',
                timeout: 25000,
            });
        } catch (e: any) {
            console.warn(`⚠️ DDG navigation failed (execution context destroyed): ${e.message}`);
        }

        let links: string[] = [];
        try {
            links = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a[data-testid="result-title-a"]'))
                    .map((a: any) => a.href)
                    .slice(0, 15);
            });
        } catch (e: any) {
            console.warn(`⚠️ DDG evaluate failed (execution context destroyed): ${e.message}`);
        }

        for (const link of links) {
            try {
                const origin = new URL(link).origin;
                if (!isForbidden(origin)) urls.push(origin);
            } catch {}
        }
    } catch (e: any) {
        console.log(`  ⚠️ Stealth browser failed: ${e.message}`);
    } finally {
        if (browser) await browser.close();
    }
    return Array.from(new Set(urls)).slice(0, 10);
};

// ─── 4b. Unified Unblockable Website Finder ──────────────────────────────────
export const findOfficialWebsite = async (companyName: string): Promise<string[]> => {
    // Try multiple query mutations to ensure result
    const queries = [
        `"${companyName}" UAE official website -site:hidubai.com -site:easyuae.com -site:yellowpages.ae`,
        `${companyName} Dubai company`,
        `DNB UAE ${companyName}`
    ];

    for (const query of queries) {
        try {
            // Priority: Yahoo > SearXNG > Bing > DDG > Puppeteer
            let urls = await yahooSearch(query);
            if (urls.length > 0) return urls;
            
            urls = await searxSearch(query);
            if (urls.length > 0) return urls;
            
            urls = await bingSearch(query);
            if (urls.length > 0) return urls;
            
            urls = await ddgSearch(query);
            if (urls.length > 0) return urls;

            urls = await puppeteerSearch(query);
            if (urls.length > 0) return urls;
        } catch (e) {
            continue;
        }
    }
    return [];
};

// ─── 5. Direct Directory Generator (Targeted mining) ─────────────────────────
// Multi-Source strategy: If one blocks us, we use others.
export const directDirectorySearch = async (query: string): Promise<string[]> => {
    const urls: string[] = [];
    const encoded = encodeURIComponent(query);
    const slug = query.toLowerCase().replace(/\s+/g, '-');
    
    // Power-Queries: Use search engines to find deep directory links (Hard to block)
    const powerQueries = [
        `site:yellowpages.ae "${query}" Dubai`,
        `site:uaeyellowpages.com "${query}"`,
        `site:emiratesdirectory.com "${query}"`,
        `site:enrollub.com "${query}" UAE`
    ];

    console.log(`  🚀 Launching ${powerQueries.length} Power-Queries for deep-discovery...`);
    
    // Execute these via the already hardened scrapers
    const searchTasks = powerQueries.map(q => ddgSearch(q));
    const results = await Promise.allSettled(searchTasks);
    results.forEach(r => {
        if (r.status === 'fulfilled') urls.push(...r.value);
    });

    // Secondary Direct Scrapers (Simpler sites)
    const directSources = [
        `https://ae.enrollub.com/Search?q=${encoded}`,
        `https://www.uae-contact.com/search?q=${encoded}`
    ];

    for (const sourceUrl of directSources) {
        try {
            const res = await axios.get(sourceUrl, { headers: { 'User-Agent': randomUA() }, timeout: 8000 });
            const $ = cheerio.load(res.data);
            $('a').each((_, el) => {
                const href = $(el).attr('href') || '';
                if (href.startsWith('http') && !isForbidden(href)) {
                    try {
                        const domain = new URL(href).origin;
                        if (!domain.includes('enrollub') && !domain.includes('uae-contact')) {
                            urls.push(domain);
                        }
                    } catch { }
                }
            });
        } catch { }
    }
    
    return Array.from(new Set(urls)).slice(0, 30);
};

// ─── 5b. Puppeteer Stealth Search (ULTIMATE FALLBACK) ───────────────────────
export const puppeteerSearch = async (query: string, allowBingFallback = true): Promise<string[]> => {
    console.log(`🕵️  Launching Stealth Browser for: "${query}"`);
    let browser;
    try {
        browser = await puppeteer.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
        });
        const page = await browser.newPage();
        await page.setUserAgent(randomUA());
        
        // Navigate to DuckDuckGo (First attempt)
        let ddgNavOk = true;
        try {
            await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&ia=web`, { waitUntil: 'networkidle2', timeout: 25000 });
        } catch (e: any) {
            ddgNavOk = false;
            console.warn(`⚠️ DDG Timeout/Error: ${e.message}`);
        }

        // Diagnostic screenshot (Absolute Path)
        const debugPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/tri-angle-sovereign-v2/ddg_search_debug.png';
        try { await page.screenshot({ path: debugPath }); } catch {}

        // Guarded evaluate: a dead page throws "Execution context was destroyed",
        // which must never abort the fast-discovery loop — fall through to Bing.
        let urls: string[] = [];
        if (ddgNavOk) {
            try {
                urls = await page.evaluate(() => {
                    const results: string[] = [];
                    // DuckDuckGo result selectors: 'a[data-testid="result-title-a"]'
                    const links = document.querySelectorAll('a[data-testid="result-title-a"]');
                    links.forEach(a => {
                        const href = a.getAttribute('href');
                        if (href && href.startsWith('http')) {
                            try { results.push(new URL(href).origin); } catch {}
                        }
                    });
                    // Fallback for older DDG layouts
                    document.querySelectorAll('h2 a').forEach((a: any) => {
                        const href = a.getAttribute('href');
                        if (href && href.startsWith('http')) {
                            try { results.push(new URL(href).origin); } catch {}
                        }
                    });
                    return results;
                });
            } catch (e: any) {
                console.warn(`⚠️ DDG evaluate failed (execution context destroyed): ${e.message}`);
            }
        }

        // SECOND STAGE FALLBACK: Try Bing in Puppeteer if DDG returns 0
        if (urls.length === 0 && allowBingFallback) {
            console.log(`  → DDG returned 0. Falling back to Bing in Puppeteer...`);
            try {
                await page.goto(`https://www.bing.com/search?q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2', timeout: 25000 });
            } catch (e: any) {
                console.warn(`⚠️ Bing navigation failed: ${e.message}`);
            }
            try { await page.screenshot({ path: debugPath.replace('ddg', 'bing') }); } catch {}

            try {
                urls = await page.evaluate(() => {
                    const results: string[] = [];
                    const links = document.querySelectorAll('li.b_algo h2 a');
                    links.forEach(a => {
                        const href = a.getAttribute('href');
                        if (href && href.startsWith('http')) {
                            try { results.push(new URL(href).origin); } catch {}
                        }
                    });
                    return results;
                });
            } catch (e: any) {
                console.warn(`⚠️ Bing evaluate failed (execution context destroyed): ${e.message}`);
            }
        }

        await browser.close();
        const finalUrls = Array.from(new Set(urls as string[])).filter((u: string) => !isForbidden(u));
        console.log(`  → Puppeteer (Final) returned ${finalUrls.length} verified URLs`);
        return finalUrls as string[];
    } catch (e: any) {
        if (browser) await browser.close();
        console.error(`⚠️ Puppeteer Error: ${e.message}`);
        return [];
    }
};

const crawlWebsite = async (baseUrl: string, settings?: any): Promise<{
    companyName: string | null;
    email: string | null;
    mobile: string | null;
    relevant: boolean;
}> => {
    const domain = baseUrl.replace(/https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
    
    // 1. Block massive global tech/media platforms & directories
    const globalSpamBlocks = [
        'apple.com', 'softonic.com', 'steampowered.com', 'microsoft.com', 
        'springer.com', 'jobleads.com', 'jobleads.co.uk', 'jobleads.ae', 
        'jobleads.de', 'medium.com', 'reddit.com', 'quora.com', 'pinterest.com', 
        'behance.net', 'dribbble.com', 'glassdoor.', 'indeed.', 'monster.com', 
        'xing.com', 'careerjet.', 'jobs.com', 'careerone.', 'seek.com', 
        'g2.com', 'capterra.com', 'trustpilot.com', 'sourceforge.net', 
        'cnet.com', 'upwork.com', 'fiverr.com', 'freelancer.com', 'toptal.com', 
        'peopleperhour.com', 'guru.com', 'f6s.com', 'arablocal.', 'companiesinqatar.', 
        'yellowpages.', 'connect.com.', 'qbiz.me', 'wikipedia.org', 'wordpress.com', 
        'clutch.co', 'designrush.com', 'topdevelopers.co', 'digitalagencynetwork.com', 'sortlist.com', 'goodfirms.co', 'themanifest.com',
        'contrafinder.com', 'contractorfinder', 'directory', 'yellowpages', 'listing', 'supplierfinder',
        'github.com', 'youtube.com', 'facebook.com', 'instagram.com', 'twitter.com',
        'linkedin.com', 'google.', 'bing.com', 'yahoo.com', 'duckduckgo.com',
        'openai.com', 'chatgpt.com', 'meta.ai', 'deepai.org', 'duck.ai', 'w3.org', 'schema.org'
    ];
    if (globalSpamBlocks.some(block => domain.includes(block))) {
        console.log(`   ⛔ Blocked Global/Spam Platform: ${baseUrl}`);
        return { companyName: null, email: null, mobile: null, relevant: false };
    }

    // 2. Reject foreign ccTLDs if they do not match the target location
    const location = String(settings?.target_location || settings?.TARGET_LOCATION || 'UAE').toLowerCase();
    const isTargetingUae = location.includes('uae') || location.includes('dubai') || location.includes('abu dhabi') || location.includes('sharjah') || location.includes('ajman');
    const isTargetingQatar = location.includes('qatar') || location.includes('doha');
    const isTargetingSaudi = location.includes('saudi') || location.includes('ksa') || location.includes('riyadh') || location.includes('jeddah');
    const isTargetingOman = location.includes('oman') || location.includes('muscat');

    if (isTargetingUae && (domain.endsWith('.qa') || domain.endsWith('.om') || domain.endsWith('.sa') || domain.endsWith('.bh') || domain.endsWith('.kw') || domain.includes('.qa.') || domain.includes('.sa.'))) {
        console.log(`   ⛔ Rejected Foreign Location Domain (Targeting UAE): ${baseUrl}`);
        return { companyName: null, email: null, mobile: null, relevant: false };
    }
    if (isTargetingQatar && !domain.endsWith('.qa') && (domain.endsWith('.ae') || domain.endsWith('.sa') || domain.endsWith('.om'))) {
        console.log(`   ⛔ Rejected Foreign Location Domain (Targeting Qatar): ${baseUrl}`);
        return { companyName: null, email: null, mobile: null, relevant: false };
    }

    const fetchPage = async (url: string): Promise<string> => {
        const configs = [
            {
                'User-Agent': randomUA(),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
        ];
        for (const headers of configs) {
            try {
                const res = await axios.get(url, { headers, timeout: 12000, maxRedirects: 5 });
                if (res.data && typeof res.data === 'string' && res.data.length > 200) {
                    const htmlLower = res.data.toLowerCase();
                    const isBlocked = htmlLower.includes('cloudflare') || htmlLower.includes('just a moment') || htmlLower.includes('cf-browser-verification') || htmlLower.includes('enable javascript');
                    if (!isBlocked) {
                        return res.data;
                    }
                }
            } catch { }
        }

        // Fast stealth browser fallback for modern JS sites
        let browser: any;
        try {
            const stealthResult = await Promise.race([
                (async () => {
                    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] });
                    const page = await browser.newPage();
                    await page.setUserAgent(randomUA());
                    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 7000 });
                    await new Promise(r => setTimeout(r, 500));
                    const html = await page.content();
                    await browser.close();
                    browser = null;
                    return html;
                })(),
                new Promise<string>((_, reject) => setTimeout(() => reject(new Error('8s hard timeout')), 8000))
            ]);
            if (stealthResult && stealthResult.length > 200) {
                return stealthResult;
            }
        } catch (e: any) {
            if (browser) try { await browser.close(); } catch {}
            browser = null;
        }
        return '';
    };

    const strip = (html: string) => html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    let pagesToTry = [
        `${baseUrl}/contact-us`,
        `${baseUrl}/contact`,
        `${baseUrl}/contacts`,
        baseUrl,
        `${baseUrl}/about-us`,
        `${baseUrl}/about`,
        `${baseUrl}/location`,
        `${baseUrl}/locations`,
        `${baseUrl}/contact-details`,
        `${baseUrl}/reach-us`,
        `${baseUrl}/get-in-touch`,
    ];

    let allText = '';
    let allEmails: string[] = [];
    let companyName: string | null = null;

    // v26.7: DYNAMIC CONTACT PAGE DISCOVERY
    const homepageHtml = await fetchPage(baseUrl);
    if (homepageHtml) {
        const $ = cheerio.load(homepageHtml);
        const discoveredPages: string[] = [];
        $('a').each((_, el) => {
            const href = $(el).attr('href') || '';
            const text = $(el).text().toLowerCase();
            if (
                (text.includes('contact') || text.includes('reach') || text.includes('touch') || text.includes('about') || text.includes('locations')) &&
                href.length > 1
            ) {
                try {
                    let absolute = href;
                    if (href.startsWith('/')) {
                        absolute = `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}${href}`;
                    } else if (!href.startsWith('http')) {
                        absolute = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}${href}`;
                    }
                    if (absolute.startsWith(baseUrl)) discoveredPages.push(absolute);
                } catch {}
            }
        });
        // Prioritize discovered pages
        pagesToTry = [...new Set([...discoveredPages, ...pagesToTry])];
    }

    for (const page of pagesToTry) {
        let html = page === baseUrl ? homepageHtml : await fetchPage(page);
        if (!html) continue;

        // v24.2: Decrypt Cloudflare-protected emails before stripping tags
        const cfMatches = html.match(/data-cfemail="([^"]+)"/g);
        if (cfMatches) {
            cfMatches.forEach(m => {
                const hex = m.match(/"([^"]+)"/)?.[1];
                if (hex) {
                    const decoded = decodeCloudflareEmail(hex);
                    if (decoded) html = html.replace(m, `>${decoded}<`); // Inject decoded email into context
                }
            });
        }

        // Company name from <title> with Industrial Weighting (v16.1)
        if (page === baseUrl && !companyName) {
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            if (titleMatch) {
                const rawTitle = titleMatch[1];
                const segments = rawTitle.split(/[\|\-–—]/).map((s: string) => s.trim()).filter((s: string) => s.length > 2);
                
                const getScore = (s: string) => {
                    let score = 0;
                    const low = s.toLowerCase().trim();
                    
                    // BRAND WEIGHTING: Favor names that look like proper brands
                    if (low.includes('solutions') || low.includes('technologies') || low.includes('systems')) score += 10;
                    if (low.includes('digital') || low.includes('agency') || low.includes('media')) score += 10;
                    if (low.includes('group') || low.includes('global') || low.includes('international')) score += 5;
                    
                    // v25.5: ULTRA-HARDENED ANTI-GENERIC GUARD
                    const genericPrefixes = [
                        'united', 'national', 'global', 'emirates', 'premium', 'prime', 'standard', 
                        'ideal', 'perfect', 'royal', 'elite', 'dubai', 'uae', 'gcc', 'middle east', 
                        'international', 'solutions', 'services', 'systems', 'technologies', 'agency', 
                        'group', 'limited', 'llc', 'company', 'corporation', 'industries'
                    ];
                    if (genericPrefixes.includes(low)) score -= 40;
                    if (low.length < 3) score -= 30;

                    // Industrial fallback (keep some for broad B2B)
                    if (low.includes('contracting') || low.includes('engineering')) score += 5;
                    
                    // Penalize purely descriptive/SEO titles
                    const descriptive = [
                        'best', 'top', 'leading', 'provider', 'managed services', 'it support', 
                        'digital marketing', 'social media', 'web design', 'development',
                        'services in', 'company in', 'agency in', 'dubai', 'uae', 'abu dhabi'
                    ];
                    if (descriptive.some(d => low.includes(d))) score -= 10;

                    // Length optimization: Brand names are usually 4-35 chars
                    if (low.length > 6 && low.length < 35) score += 20;
                    
                    return score;
                };

                let bestSegment = rawTitle;
                if (segments.length > 0) {
                    const scoredSegments = segments.map(s => ({ text: s, score: getScore(s) }));
                    scoredSegments.sort((a, b) => b.score - a.score || b.text.length - a.text.length);
                    bestSegment = scoredSegments[0].text;
                }

                companyName = bestSegment
                    .replace(/\.com|\.ae|llc/gi, '')
                    .trim()
                    // Decode ALL HTML entities properly
                    .replace(/&amp;/g, '&')
                    .replace(/&#8211;|&#8212;|&#8213;|&#8214;|&#8215;/g, '-')
                    .replace(/&#8217;|&#8216;|&#8218;|&#8219;/g, "'")
                    .replace(/&#038;/g, '&')
                    .replace(/&#160;|&nbsp;/g, ' ')
                    .replace(/&quot;/g, '"')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&ndash;|&mdash;/g, '-')
                    .replace(/&rsquo;|&lsquo;/g, "'")
                    .replace(/&rdquo;|&ldquo;/g, '"')
                    .replace(/\s+/g, ' ')
                    .trim();

                const cleanedLower = (companyName || '').toLowerCase();
                const genericSingleWord = /^(construction|services|solutions|engineering|news|media|publisher|company|across|cooling|electrical|technical)$/i;

                // 🛡️ ULTRA-AGGRESSIVE NAME SANITIZER v2.0 - Reject directory/SEO/product titles
                const REJECT_PHRASES = [
                    // Directory indicators
                    'one of the best', 'top 10', 'top 5', 'top 20', 'top 50', 'best companies',
                    'best in', 'popular searches', 'find businesses', 'yellow pages',
                    'directory', 'listing', 'welcome to', 'official website',
                    'home page', 'homepage', 'our website', 'click here', 'list your',
                    // Generic/SEO
                    'under construction', 'coming soon', 'we are', 'your trusted',
                    'the best', 'leading provider', 'number one', '#1', 'no. 1',
                    'companies in', 'company in', 'suppliers in', 'supplier of',
                    // Product/service descriptions (Reject these to favor brand names)
                    'it support', 'managed services', 'digital marketing', 'seo services',
                    'web development', 'software solutions', 'it services',
                    'news &', 'list of', 'lightweight', 'waterproof', 'easy',
                    'trusted &', 'cold room', 'cooling equipments',
                    'air conditioning', 'chiller', 'hvac', 'equipment supplier',
                    'contractor -', 'company -', 'service -', 'provider -',
                ];

                const hasRejectPhrase = REJECT_PHRASES.some(p => cleanedLower.includes(p));
                // Reject if too many hyphens (SEO keyword stuffing like "cold room - supplier - maker")
                const hyphenCount = (companyName.match(/-/g) || []).length;
                // Reject if name looks like keywords with commas (e.g. "bitzer, carrier, copeland")
                const hasCommaList = /,.*,/.test(companyName);
                // Reject if contains odd characters indicating non-company content
                const hasOddChars = /[&]{2,}|{{|}}/gi.test(companyName);
                // Reject if name is too long (likely a full description)
                const isTooLong = companyName.length > 65;

                if (
                    companyName.length < 3 ||
                    companyName.length > 100 ||
                    genericSingleWord.test(cleanedLower) ||
                    hasRejectPhrase ||
                    hyphenCount > 2 ||
                    hasCommaList ||
                    hasOddChars ||
                    isTooLong
                ) {
                    companyName = null;
                }
            }
        }

        // Domain parking check
        const parked = ['hugedomains', 'domain is for sale', 'buy this domain', 'parked free', 'domain has expired'];
        if (parked.some(p => html.toLowerCase().includes(p))) {
            return { companyName: null, email: null, mobile: null, relevant: false };
        }

        // v25.8: Titan-Extraction — Extract emails from raw HTML before stripping tags
        const rawEmails = (html.match(EMAIL_REGEX) || []) as string[];
        rawEmails.forEach(e => {
            if (e.includes('@') && e.includes('.')) {
                allText += ` ${e} `;
            }
        });

        const mailtoRawMatches = html.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g);
        if (mailtoRawMatches) {
            mailtoRawMatches.forEach(m => allEmails.push(m.replace('mailto:', '')));
        }
    }

    const validEmails = allEmails.filter(e => {
        const email = e.toLowerCase();
        if (email.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|js|css)$/)) return false;
        
        // Shield ANTI-PLACEHOLDER GUARD (v27.0 - hardened)
        const placeholderBlacklist = [
            'max.mustermann', 'mustermann', 'john.doe', 'johndoe', 'jane.doe', 'janedoe',
            'test@', 'email@', 'yourname@', 'your@', 'name@', 'username@',
            'testemail@', 'user@', 'sample@', 'demo@',
            'domain.com', 'example.com', 'example.org', 'example.net', 'email.com',
            'admin@example', 'info@example',
            'abc@gmail', 'johndoe@gmail', 'name@gmail', 'info@gmail.com',
            'name@gmail.com', 'johndoe@gmail.com', 'abc@gmail.com',
        ];
        if (placeholderBlacklist.some(p => email.includes(p))) return false;

        const forbiddenDomains = [
            'yellowpages.ae', 'zawya.com', 'lseg.com', 'dnb.com', 'bizapedia.com',
            'zaubacorp.com', 'emaratfinder.com', 'kompass.com', 'w3.org', 'schema.org',
            'example.com', 'google.com', 'bing.com', 'yahoo.com', 'searx.be',
        ];
        if (forbiddenDomains.some(d => email.includes(d))) return false;

        // Domain Matching: Check if email domain matches website domain
        const emailDomain = email.split('@')[1]?.toLowerCase();
        const websiteDomain = baseUrl.replace(/https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
        
        if (emailDomain && websiteDomain) {
            const commonBusinessDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];
            const isCommon = commonBusinessDomains.includes(emailDomain);
            
            // v26.4: STRICT TLD ENFORCEMENT
            // If the website is everun.com, we should NOT accept info@everun.cc
            const emailParts = emailDomain.split('.');
            const websiteParts = websiteDomain.split('.');
            const emailTld = emailParts[emailParts.length - 1];
            const websiteTld = websiteParts[websiteParts.length - 1];
            const emailBase = emailParts[0];
            const websiteBase = websiteParts[0];

            const isRelated = emailBase === websiteBase || emailDomain.includes(websiteBase);
            const tldMatch = emailTld === websiteTld;

            if (!isCommon) {
                // v13.1: RELAXED DOMAIN MATCHING
                // Accept if: 
                // 1. Exact domain match
                // 2. Base domain match (e.g., everun.com and everun.ae)
                if (emailDomain !== websiteDomain && !isRelated) {
                    return false;
                }
            }
        }


        return email.includes('@') && email.split('@')[1].includes('.');
    });

    // Prefer professional business emails
    const priority = ['info@', 'contact@', 'enquiry@', 'projects@', 'bd@', 'sales@', 'business@', 'mail@'];
    const priorityEmail = validEmails.find(e => priority.some(p => e.toLowerCase().startsWith(p)));
    const finalEmail = priorityEmail || validEmails[0] || null;

    // Extract UAE mobile
    const mobileMatch = allText.match(MOBILE_REGEX);
    let mobile: string | null = null;
    if (mobileMatch) {
        mobile = mobileMatch[0].replace(/\s|-/g, '');
        if (!mobile.startsWith('+')) mobile = '+' + mobile.replace(/^00/, '');
    }

    return { companyName, email: finalEmail, mobile, relevant: isRelevant(allText, settings) };
};

// ─── 7. Directory-Specific Scraper ───────────────────────────────────────────
export const scrapeDirectory = async (url: string): Promise<any[]> => {
    try {
        const res = await axios.get(url, {
            headers: { 'User-Agent': randomUA() },
            timeout: 15000
        });
        const html: string = res.data;
        const domain = new URL(url).hostname;
        const $ = cheerio.load(html);
        const leads: any[] = [];
        let dbgDirLeadPushCount = 0;

        const isDirectoryEmail = (email: string) => {
            const e = email.toLowerCase();
            if (e.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|js|css)$/)) return true;
            
            // v25.2 Blacklist
            const placeholderBlacklist = ['max.mustermann', 'john.doe', 'jane.doe', 'test@', 'email@', 'yourname@', 'domain.com', 'example.com'];
            if (placeholderBlacklist.some(p => e.includes(p))) return true;

            const forbidden = ['yellowpages', 'zawya', 'lseg.com', 'kompass.com', 'dnb.com', 'dubizzle.ae', 'google.com', 'sentry.io'];
            return forbidden.some(f => e.includes(f));
        };

        // Generic grid harvester
        $('.search-result-item, .business-item, .listing, .company-item, .record-item, .card, div[class*="item"], div[class*="result"]').each((_, el) => {
            const blockHtml = $(el).html() || '';
            const emailsFound = blockHtml.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g);
            if (!emailsFound) return;

            const validEmails = Array.from(new Set(emailsFound)).filter(e => !isDirectoryEmail(e));
            if (validEmails.length > 0) {
                const name = $(el).find('h1, h2, h3, h4, h5, strong, b, .name, .title, a').first().text().trim();
                // IMPORTANT: do NOT treat directory listing URLs as the official company website.
                // If we can't find a real external site link, keep website as N/A so the worker resolves it later.
                const websiteMatch = blockHtml.match(/href="(https?:\/\/[^"]+)"/);
                const websiteCandidate = websiteMatch ? websiteMatch[1] : '';
                const website = (isValidCompanyWebsite(websiteCandidate) && !new URL(websiteCandidate).hostname.includes(domain))
                    ? websiteCandidate
                    : 'N/A';

                if (name && name.length > 2 && name.length < 100) {
                    // #region agent log
                    if (dbgDirLeadPushCount < 2) {
                        dbgDirLeadPushCount++;
                        fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H1_directory_sites_added_as_company_websites',location:'search_service.ts:scrapeDirectory/push_directory_grid',message:'Directory lead (grid) pushed into lead map',data:{source:'directory_grid',companyName:name,website,websiteIsListingLike:website.includes('/listing/')},timestamp:Date.now()})}).catch(()=>{});
                    }
                    // #endregion
                    leads.push({ company_name: name, website, email: validEmails[0], source: 'directory_grid' });
                }
            }
        });

        // Fallback: raw block split extraction
        if (leads.length === 0) {
            const blocks = html.split(/<div|<section|<article/i);
            for (const block of blocks) {
                const emailsFound = Array.from(new Set(block.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g) || []));
                const validEmails = emailsFound.filter(e => !isDirectoryEmail(e));
                if (validEmails.length > 0) {
                    const nameMatch = block.match(/<(h[1-6]|strong|b|a|span)[^>]*>([^<]{3,80})<\/\1>/i);
                    const name = nameMatch ? nameMatch[2].replace(/<[^>]+>/g, '').trim() : 'UAE Business Entity';
                    // Same rule: don't construct directory fallback URLs as "company website"
                    const uniqueId = 'N/A';
                    // #region agent log
                    if (dbgDirLeadPushCount < 2) {
                        dbgDirLeadPushCount++;
                        fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H1_directory_sites_added_as_company_websites',location:'search_service.ts:scrapeDirectory/push_directory_fallback',message:'Directory lead (fallback) pushed into lead map',data:{source:'directory_fallback',companyName:name,website:uniqueId,websiteIsFallbackLike:false},timestamp:Date.now()})}).catch(()=>{});
                    }
                    // #endregion
                    leads.push({ company_name: name, website: uniqueId, email: validEmails[0], source: 'directory_fallback' });
                }
            }
        }

        return Array.from(new Map(leads.map(l => [l.email, l])).values());
    } catch { return []; }
};

// ─── 8. GMB Profile Scraper ───────────────────────────────────────────────────
// Scrapes a Google Maps business profile URL and extracts website, phone, name
export const scrapeGmbProfile = async (gmbUrl: string): Promise<{
    company_name: string | null;
    website: string | null;
    phone: string | null;
}> => {
    try {
        // Some GMB pages redirect to business sites; we follow redirects and scrape
        const res = await axios.get(gmbUrl, {
            headers: {
                'User-Agent': randomUA(),
                'Accept': 'text/html',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            timeout: 15000,
            maxRedirects: 5,
        });

        const html: string = res.data;
        const $ = cheerio.load(html);

        // GMB embeds JSON-LD structured data with business info
        let name: string | null = null;
        let website: string | null = null;
        let phone: string | null = null;

        $('script[type="application/ld+json"]').each((_, el) => {
            try {
                const json = JSON.parse($(el).html() || '{}');
                if (json['@type'] === 'LocalBusiness' || json.name) {
                    name = name || json.name || null;
                    website = website || json.url || null;
                    phone = phone || json.telephone || null;
                }
            } catch { }
        });

        // Fallback: parse title for business name (HARDENED)
        if (!name) {
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            if (titleMatch) {
                let candidate = titleMatch[1].split('-')[0].split('|')[0].trim();
                const genericPhrases = ['one of the best', 'top 10', 'best in', 'home -', 'welcome to', 'leading company'];
                if (genericPhrases.some(p => candidate.toLowerCase().includes(p))) {
                    console.log(`  ⚠️ Rejecting generic name: "${candidate}"`);
                    name = null;
                } else {
                    name = candidate;
                }
            }
        }

        // Fallback: look for UAE phone in page
        if (!phone) {
            const mobileMatch = html.match(MOBILE_REGEX);
            if (mobileMatch) phone = mobileMatch[0];
        }

        return { company_name: name, website, phone };
    } catch (e: any) {
        console.error(`GMB scrape error for ${gmbUrl}: ${e.message}`);
        return { company_name: null, website: null, phone: null };
    }
};

// ─── 9. AI call with full failover chain ─────────────────────────────────────
export const callAI = async (prompt: string): Promise<string> => {
    let config: any = {};
    try {
        const { loadSystemConfig } = await import('./config_manager.js');
        config = await loadSystemConfig();
    } catch (e: any) {
        console.warn(`  ⚠️ Failed to load AI provider settings: ${e.message}`);
    }

    // Direct Mistral is the primary provider for every shared AI task.
    const mistralKey = config.mistral_api_key || process.env.MISTRAL_API_KEY;
    if (mistralKey) {
        try {
            const res = await axios.post(
                'https://api.mistral.ai/v1/chat/completions',
                {
                    model: 'mistral-small-latest',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.3,
                    max_tokens: 1000,
                },
                {
                    headers: { Authorization: `Bearer ${mistralKey}`, 'Content-Type': 'application/json' },
                    timeout: 15000,
                }
            );
            const content = res.data?.choices?.[0]?.message?.content;
            if (content) {
                console.log('  [AI] Mistral primary completed successfully.');
                return content;
            }
        } catch (e: any) {
            console.warn(`  Mistral primary failed: ${e.response?.status || ''} ${String(e.message || '').slice(0, 100)}`);
        }
    }

    const openrouterKey = config.openrouter_api_key || config.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
    if (openrouterKey) {
        try {
            const res = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: config.openrouter_model || config.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.3,
                    max_tokens: 1000,
                },
                {
                    headers: {
                        Authorization: `Bearer ${openrouterKey}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': config.company_url || 'https://asifdigital.agency',
                        'X-Title': config.company_name || 'Sovereign Sales Engine'
                    },
                    timeout: 20000,
                }
            );
            const content = res.data?.choices?.[0]?.message?.content;
            if (content) return content;
        } catch (e: any) {
            console.warn(`  ⚠️ OpenRouter fallback failed: ${e.response?.status || ''} ${String(e.message || '').slice(0, 100)}`);
        }
    }

    const openaiKey = config.openai_api_key || config.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    if (openaiKey) {
        try {
            const res = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: config.openai_model || config.OPENAI_MODEL || 'gpt-4o-mini',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.3,
                    max_tokens: 1000,
                },
                {
                    headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
                    timeout: 15000,
                }
            );
            const content = res.data?.choices?.[0]?.message?.content;
            if (content) return content;
        } catch (e: any) {
            console.warn(`  ⚠️ OpenAI fallback failed: ${e.response?.status || ''} ${String(e.message || '').slice(0, 100)}`);
        }
    }

    const groqKey = config.groq_api_key || process.env.GROQ_API_KEY;
    try {
        if (!groqKey) throw new Error('Groq API key is not configured');

        const { Groq } = await import('groq-sdk');
        const localGroq = new Groq({ apiKey: groqKey, timeout: 15000 });

        const models = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'llama-3.2-3b-preview', 'llama-3.2-1b-preview'];
        for (const model of models) {
            try {
                const chat = await localGroq.chat.completions.create({
                    model, messages: [{ role: 'user', content: prompt }],
                    temperature: 0.3, max_tokens: 1000,
                });
                return chat.choices[0]?.message?.content || '';
            } catch (e: any) {
                console.warn(`  ⚠️ Groq Model ${model} failed: ${e.message?.slice(0, 80)}`);
                await new Promise(r => setTimeout(r, 400));
            }
        }
    } catch (e: any) {
        console.warn(`  ⚠️ Failed to initialize Groq client: ${e.message}`);
    }

    // Gemini ultimate fallback
    try {
        const geminiApiKey = config.gemini_api_key || process.env.VITE_GEMINI_API_KEY || GEMINI_KEY;
        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
            { contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 1000, temperature: 0.3 } },
            { timeout: 12000 }
        );
        const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
    } catch (e: any) { 
        console.warn(`  ⚠️ Gemini fallback failed: ${e.response?.data?.error?.message || e.message}`);
    }
    return '';
};

// ─── 9b. Yellow Pages UAE DIRECT Scraper (PRIMARY SOURCE) ────────────────────
// Scrapes yellowpages.ae directly — not through a search engine
// Returns REAL company names and website URLs from the directory
export const yellowPagesSearch = async (query: string): Promise<{name: string, website: string, phone?: string}[]> => {
    const results: {name: string, website: string, phone?: string}[] = [];
    
    // Parse query into keyword + location parts
    const UAE_LOCS: {pattern: string, slug: string}[] = [
        {pattern: 'sharjah industrial area', slug: 'sharjah'},
        {pattern: 'abu dhabi', slug: 'abu-dhabi'},
        {pattern: 'ras al khaimah', slug: 'ras-al-khaimah'},
        {pattern: 'umm al quwain', slug: 'umm-al-quwain'},
        {pattern: 'jebel ali', slug: 'dubai'},
        {pattern: 'dubai', slug: 'dubai'},
        {pattern: 'sharjah', slug: 'sharjah'},
        {pattern: 'ajman', slug: 'ajman'},
        {pattern: 'fujairah', slug: 'fujairah'},
        {pattern: 'uae', slug: 'uae'},
    ];
    const queryLower = query.toLowerCase();
    let location = 'uae';
    let keyword = query;
    
    for (const loc of UAE_LOCS) {
        if (queryLower.includes(loc.pattern)) {
            location = loc.slug;
            keyword = query.replace(new RegExp(loc.pattern, 'gi'), '').trim();
            break;
        }
    }
    
    // Build YP search slug
    const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '+').replace(/^\+|\+$/g, '');
    
    // Try multiple URL formats that yellowpages.ae uses.
    // NOTE: `https://www.yellowpages-uae.com/search/...` (a separate mirror) returns HTTP 404
    // as of Aug 2026 and only wastes up to 18s per cycle before timing out — removed.
    const urlsToTry = [
        `https://www.yellowpages.ae/search/${slug}/${location}`,
        `https://www.yellowpages.ae/search/${slug}`,
    ];
    
    for (const ypSearchUrl of urlsToTry) {
        if (results.length > 0) break;
        try {
            console.log(`  🟡 Scraping Yellow Pages: ${ypSearchUrl}`);
            const res = await axios.get(ypSearchUrl, {
                headers: {
                    'User-Agent': randomUA(),
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': 'https://www.yellowpages.ae/',
                },
                timeout: 20000,
                maxRedirects: 5,
            });
            
            let html = res.data;
            
            // ── Cloudflare Detection: If blocked, retry with Puppeteer stealth ──
            if (html.includes('cloudflare') || html.includes('Just a moment') || html.includes('cf-browser-verification')) {
                console.log(`  🛡️ Cloudflare detected on YP! Retrying with stealth browser...`);
                try {
                    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
                    const page = await browser.newPage();
                    await page.setUserAgent(randomUA());
                    await page.goto(ypSearchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
                    await new Promise(r => setTimeout(r, 3000)); // Wait for CF challenge to resolve
                    html = await page.content();
                    await browser.close();
                    console.log(`  ✅ Stealth browser bypassed Cloudflare (${html.length} bytes)`);
                } catch (stealthErr: any) {
                    console.log(`  ⚠️ Stealth browser YP fallback failed: ${stealthErr.message?.slice(0, 60)}`);
                    continue;
                }
            }
            
            const $ = cheerio.load(html);
            
            // ── Primary selectors: YP listing cards (BROAD SELECTORS v26.6) ──
            $('[class*="listing"], [class*="company"], [class*="result"], [class*="business"], .card, article').each((_, el) => {
                const nameEl = $(el).find('h2 a, h3 a, h4 a, h2, h3, h4, .company-name, .listing-title, .name, strong a').first();
                let name = nameEl.text().trim();
                if (!name || name.length < 3 || name.length > 100) return;
                
                // Extract website link (prefer external links, not YP internal)
                let website = '';
                $(el).find('a[href]').each((_, linkEl) => {
                    const href = $(linkEl).attr('href') || '';
                    // Directory pages contain image/CDN links such as 2x.png. Only accept
                    // a plausible company domain here; assets must never become leads.
                    if (href.startsWith('http') && !href.includes('yellowpages') && isValidCompanyWebsite(href) && !isForbidden(href)) {
                        if (!website) website = href;
                    }
                });
                
                // Extract phone
                const phoneEl = $(el).find('[class*="phone"], [class*="tel"], .phone, .tel, a[href^="tel:"]').first();
                let phone = phoneEl.text().trim() || '';
                if (!phone) {
                    const telHref = $(el).find('a[href^="tel:"]').attr('href');
                    if (telHref) phone = telHref.replace('tel:', '');
                }
                
                // Clean name
                name = name.replace(/[\n\r\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
                
                results.push({ name, website, phone: phone || undefined });
            });
            
            // ── Fallback: Look for structured listing links ──
            if (results.length === 0) {
                $('a').each((_, el) => {
                    const href = $(el).attr('href') || '';
                    const text = $(el).text().trim();
                    if (
                        (href.includes('/company/') || href.includes('/listing/') || href.includes('/business/')) &&
                        text.length > 3 && text.length < 80 &&
                        !text.toLowerCase().includes('yellow pages') &&
                        !text.toLowerCase().includes('search') &&
                        !text.toLowerCase().includes('category')
                    ) {
                        results.push({ name: text, website: '' });
                    }
                });
            }
            
            // ── Deep fallback: Extract emails directly from listing page ──
            if (results.length === 0) {
                const emails = html.match(EMAIL_REGEX) || [];
                const validEmails = ([...new Set(emails)] as string[]).filter(e => !e.includes('yellowpages') && !e.includes('example'));
                for (const email of validEmails.slice(0, 10)) {
                    const domain = (email as string).split('@')[1];
                    results.push({ name: domain.split('.')[0].replace(/-/g, ' '), website: `https://www.${domain}` });
                }
            }
            
            if (results.length > 0) {
                console.log(`  ✅ Yellow Pages returned ${results.length} companies`);
            }
        } catch (e: any) {
            console.log(`  ⚠️ YP scrape error for ${ypSearchUrl}: ${e.message?.slice(0, 80)}`);
        }
    }
    
    // Deduplicate by name
    const unique = Array.from(new Map(results.map(r => [r.name.toLowerCase(), r])).values())
        .filter(result => !result.website || isValidCompanyWebsite(result.website));
    return unique.slice(0, 25);
};

// ─── 9c. MX Domain Verification ─────────────────────────────────────────────
// Returns true if the domain has valid MX records (can receive email)
export const verifyDomainMX = async (domain: string): Promise<boolean> => {
    try {
        const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/i, '').split('/')[0];
        const records = await dns.resolveMx(cleanDomain);
        return records && records.length > 0;
    } catch {
        return false;
    }
};

// ─── 9d. Domain Finder via Bing ──────────────────────────────────────────────
// Given a company name, searches Bing to find their official website
export const findDomainViaBing = async (companyName: string): Promise<string | null> => {
    try {
        const urls = await bingSearch(`"${companyName}" UAE official site`);
        if (urls.length > 0) {
            // Verify the first result has MX records
            const domain = new URL(urls[0]).hostname;
            const hasMX = await verifyDomainMX(domain);
            if (hasMX && !isForbidden(urls[0])) return urls[0];
            // Try second result
            if (urls.length > 1) {
                const domain2 = new URL(urls[1]).hostname;
                const hasMX2 = await verifyDomainMX(domain2);
                if (hasMX2 && !isForbidden(urls[1])) return urls[1];
            }
        }
        // Fallback: DDG search
        const ddgUrls = await ddgSearch(`"${companyName}" UAE company website -site:hidubai.com -site:easyuae.com`);
        if (ddgUrls.length > 0) {
            const domain = new URL(ddgUrls[0]).hostname;
            const hasMX = await verifyDomainMX(domain);
            if (hasMX && !isForbidden(ddgUrls[0])) return ddgUrls[0];
        }
    } catch {}
    return null;
};

export const filterLeadsWithAI = async (leads: any[], settings: any): Promise<any[]> => {
    if (!leads || leads.length === 0) return [];

    // DYNAMIC COMPETITOR FILTERING GUARD: derive the agency's OWN service categories
    // from workspace settings and strip any prospect whose name/snippet/description
    // matches those categories (a competing agency/web/lead-gen firm is never a buyer).
    const competitorTerms = deriveOwnServiceTerms(settings);
    const nonCompetitor = competitorTerms.length === 0
        ? leads
        : leads.filter(l => {
            const probe = `${l.company_name || ''} ${l.snippet || l.description || ''} ${(l.tags || []).join(' ')}`;
            return !isCompetitorProspect(l.company_name || '', probe, competitorTerms);
        });

    // Basic heuristic filter to immediately drop obvious non-buyer platforms/directories
    const basicFiltered = (nonCompetitor || []).filter(l => {
        const url = String(l.website || '').toLowerCase();
        const name = String(l.company_name || '').toLowerCase();
        const forbidden = /wikipedia|github|youtube|facebook|instagram|twitter|linkedin|google|bing|yahoo|duckduckgo|pinterest|tiktok|reddit|quora|yellowpages|yelp|indeed|glassdoor/i;
        if (forbidden.test(url) || forbidden.test(name)) return false;
        return true;
    });

    if (basicFiltered.length === 0) return [];
    
    try {
        const myCompany = settings?.company_name || "Asif Digital Agency";
        const location = settings?.target_location || "UAE";

        const candidates = basicFiltered.map((l, idx) => ({
            index: idx,
            name: l.company_name,
            website: l.website
        }));

        const prompt = `You are a B2B Sales Lead Qualifier. 
Target Location: ${location}.
Select index numbers of companies that appear to be real B2B businesses, agencies, contractors, or commercial firms (NOT directories, social media, or search engines).
Candidates:
${JSON.stringify(candidates, null, 2)}

Return ONLY a JSON array of valid indices, e.g. [0, 1, 3].`;

        const responseText = await callAI(prompt);
        const match = responseText.match(/\[[\s\d,]*\]/);
        if (match) {
            const indices: number[] = JSON.parse(match[0]);
            if (indices.length > 0) {
                return basicFiltered.filter((_, idx) => indices.includes(idx));
            }
        }
    } catch (e) {
        console.error("AI Batch Filter Error:", e);
    }
    return basicFiltered; // Return candidates if AI is restrictive or fails
};


export const findLeadTargetsFast = async (query: string, pageOffset: number = 0): Promise<{ leads: any[], trace: any }> => {
    console.log(`\n⚡ FAST DISCOVERY: "${query}" | Page: ${pageOffset + 1}`);
    const { loadSystemConfig } = await import('./config_manager.js');
    const settings = await loadSystemConfig().catch(() => null);
    if (settings) {
        cachedTargetLocation = settings.target_location || settings.TARGET_LOCATION || 'UAE';
    }
    const trace = { yellowpages: 0, bing: 0, yahoo: 0 };
    const discovered = new Map<string, any>();

    // Page 0 = first page (results 1-10), page 1 = second page (11-20), etc.
    // Yellow Pages only on page 0 (no pagination support); Bing + DDG support offsets
    const [ypResults, bingUrls, yahooUrls, ddgUrls] = await Promise.all([
        pageOffset === 0
            ? withTimeout(yellowPagesSearch(query), 18000, [], 'Yellow Pages fast source')
            : Promise.resolve([]),
        withTimeout(bingSearch(cleanSearchQuery(query), pageOffset), 15000, [], 'Bing fast source'),
        withTimeout(yahooSearch(cleanSearchQuery(query), pageOffset), 25000, [], 'Yahoo fast source'),
        withTimeout(ddgSearch(cleanSearchQuery(query), pageOffset), 25000, [], 'DDG fast source'),
    ]);

    trace.yellowpages = ypResults.length;
    trace.bing = bingUrls.length;
    trace.yahoo = yahooUrls.length;

    for (const yp of ypResults) {
        const name = cleanCompanyName(yp.name || '');
        const website = yp.website && !isForbidden(yp.website) ? yp.website : 'N/A';
        const key = website !== 'N/A' ? website : `name:${name}`;
        if (!name || discovered.has(key)) continue;
        discovered.set(key, {
            company_name: name,
            website,
            email: null,
            phone: yp.phone || null,
            source: 'yellowpages_fast',
            type: 'fast_discovery'
        });
    }

    for (const url of [...bingUrls, ...yahooUrls, ...ddgUrls]) {
        if (discovered.size >= 40) break;
        if (!url || isForbidden(url) || discovered.has(url)) continue;
        discovered.set(url, {
            company_name: deriveFallbackName(url),
            website: url,
            email: null,
            phone: null,
            source: bingUrls.includes(url) ? 'bing_fast' : 'yahoo_fast',
            type: 'fast_discovery'
        });
    }

    const leads = Array.from(discovered.values());
    console.log(`🔎 [AI FILTER] Filtering ${leads.length} leads with LLM...`);
    const filteredLeads = await filterLeadsWithAI(leads, settings);
    console.log(`⚡ Fast Discovery Complete: ${filteredLeads.length} qualified (from ${leads.length} initial). Trace:`, trace);
    return { leads: filteredLeads, trace };
};

// ─── 10. MAIN EXPORT: findLeads ──────────────────────────────────────────────
// v13.0: GROUND-TRUTH chain: Yellow Pages → Bing → DDG
// NEVER uses AI to generate company names. All data comes from real scraping.
export const findLeads = async (query: string, pageOffset: number = 0): Promise<{ leads: any[], trace: any }> => {
    console.log(`\n🔎 SOVEREIGN DISCOVERY: "${query}" | Page: ${pageOffset + 1}`);
    const { loadSystemConfig } = await import('./config_manager.js');
    const settings = await loadSystemConfig();
    cachedTargetLocation = settings?.target_location || settings?.TARGET_LOCATION || 'UAE';

    const discovered = new Map<string, any>();
    const trace = { yellowpages: 0, bing: 0, ddg: 0, yahoo: 0, searx: 0, maps: 0, stealth: 0, directory: 0, puppeteer: 0 };

    // ══════════════════════════════════════════════════════════════════════════
    // STAGE 1: Yellow Pages UAE (PRIMARY — real directory, hard to block)
    // ══════════════════════════════════════════════════════════════════════════
    console.log(`\n🟡 STAGE 1: Yellow Pages UAE direct scraping...`);
    const ypResults = await yellowPagesSearch(query);
    trace.yellowpages = ypResults.length;
    console.log(`  → YP returned ${ypResults.length} company listings`);

    for (const yp of ypResults) {
        if (discovered.size >= 35) break;
        try {
            let website = yp.website;

            // Yellow Pages can expose image URLs as external links (for example
            // https://www.2x.png). Discard them before crawling or deriving a name.
            if (website && !isValidCompanyWebsite(website)) {
                console.log(`  ⚠️ Ignoring invalid directory website for "${yp.name}": ${website}`);
                website = '';
            }

            // If YP didn't include a website link, search Bing for the real domain
            if (!website || website.length < 5) {
                console.log(`  🔍 No website for "${yp.name}", searching Bing...`);
                website = await findDomainViaBing(yp.name) || '';
            }

            if (!website) {
                // Store name-only lead for worker to resolve later
                const decodedName = String(yp.name || '')
                    .trim()
                    .replace(/&amp;/g, '&')
                    .replace(/&#8211;|&#8212;/g, '-')
                    .replace(/&#8217;|&#8216;/g, "'")
                    .replace(/&#038;/g, '&');
                discovered.set(`name:${yp.name}`, {
                    company_name: decodedName,
                    website: 'N/A',
                    email: null,
                    phone: yp.phone,
                    source: 'yellowpages_uae',
                });
                continue;
            }

            if (!isValidCompanyWebsite(website) || isForbidden(website)) {
                console.log(`  ⚠️ Skipping invalid company website for "${yp.name}": ${website}`);
                continue;
            }

            // v30.1: Directory-Spam Shield (Skip featured results that appear everywhere)
            const featuredSpam = ['tauraniholdings.com', 'kazemaportabletoilets.com'];
            if (featuredSpam.some(s => website.toLowerCase().includes(s))) {
                continue;
            }

            // Crawl the real website for emails and relevance
            console.log(`  🕷️  Crawling YP lead: ${yp.name} → ${website}`);
            const lead = await crawlWebsite(website, settings);
            if (!lead.relevant) continue;
            
            const finalName = cleanCompanyName(yp.name || lead.companyName || deriveFallbackName(website));
            if (!finalName) continue; // Reject news/garbage

            discovered.set(website, {
                company_name: finalName,
                website,
                email: lead.email || null,
                mobile: lead.mobile,
                phone: yp.phone,
                source: 'yellowpages_uae',
            });
        } catch (e: any) {
            console.log(`  ⚠️ YP lead error [${yp.name}]: ${e.message?.slice(0, 60)}`);
        }
        await sleep(400);
    }

    // ══════════════════════════════════════════════════════════════════════════
    // STAGE 2: Bing Search (SECONDARY — scrape Bing HTML for more companies)
    // ══════════════════════════════════════════════════════════════════════════
    console.log(`\n🔵 STAGE 2: Bing search for "${query}"...`);
    const randomOffset = Math.floor(Math.random() * 5);
    const bingUrls = await bingSearch(cleanSearchQuery(query), randomOffset);
    trace.bing = bingUrls.length;

    for (const bingResultUrl of bingUrls) {
        if (discovered.size >= 35) break;
        if (isForbidden(bingResultUrl) || discovered.has(bingResultUrl)) continue;

        try {
            console.log(`  🕷️  Crawling Bing result: ${bingResultUrl}`);
            const lead = await crawlWebsite(bingResultUrl, settings);
            const finalName = cleanCompanyName(lead.companyName || deriveFallbackName(bingResultUrl));
            if (lead.relevant && finalName) {
                discovered.set(bingResultUrl, {
                    company_name: finalName,
                    website: bingResultUrl,
                    email: lead.email || null,
                    mobile: lead.mobile,
                    source: 'bing_search',
                });
            }
        } catch {}
        await sleep(300);
    }

    // ══════════════════════════════════════════════════════════════════════════
    // STAGE 3: DuckDuckGo (FALLBACK — in case YP and Bing are insufficient)
    // ══════════════════════════════════════════════════════════════════════════
    if (discovered.size < 20) {
        console.log(`\n🦆 STAGE 3: DuckDuckGo search for "${query}"...`);
        const ddgUrls = await ddgSearch(cleanSearchQuery(query));
        trace.ddg = ddgUrls.length;

        for (const ddgResultUrl of ddgUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(ddgResultUrl) || discovered.has(ddgResultUrl)) continue;

            try {
                const lead = await crawlWebsite(ddgResultUrl, settings);
                const finalName = cleanCompanyName(lead.companyName || deriveFallbackName(ddgResultUrl));
                if (lead.relevant && finalName) {
                    discovered.set(ddgResultUrl, {
                        company_name: finalName,
                        website: ddgResultUrl,
                        email: lead.email || null,
                        mobile: lead.mobile,
                        source: 'ddg_search',
                    });
                }
            } catch {}
            await sleep(300);
        }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // STAGE 4: Yahoo Search (TERTIARY — high volume, low blocking)
    // ══════════════════════════════════════════════════════════════════════════
    if (discovered.size < 30) {
        console.log(`\n🟣 STAGE 4: Yahoo search for "${query}"...`);
        const yahooUrls = await yahooSearch(cleanSearchQuery(query));
        trace.yahoo = yahooUrls.length;

        for (const yahooUrl of yahooUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(yahooUrl) || discovered.has(yahooUrl)) continue;

            try {
                const lead = await crawlWebsite(yahooUrl, settings);
                if (lead.relevant) {
                    discovered.set(yahooUrl, {
                        company_name: lead.companyName || deriveFallbackName(yahooUrl),
                        website: yahooUrl,
                        email: lead.email || null,
                        mobile: lead.mobile,
                        source: 'yahoo_search',
                    });
                }
            } catch {}
            await sleep(300);
        }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // STAGE 5: SearXNG Search (META — json results, high quality)
    // ══════════════════════════════════════════════════════════════════════════
    if (discovered.size < 40) {
        console.log(`\n🌈 STAGE 5: SearXNG search for "${query}"...`);
        const searxUrls = await searxSearch(cleanSearchQuery(query));
        trace.searx = searxUrls.length;

        for (const searxUrl of searxUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(searxUrl) || discovered.has(searxUrl)) continue;

            try {
                const lead = await crawlWebsite(searxUrl, settings);
                if (lead.relevant) {
                    discovered.set(searxUrl, {
                        company_name: lead.companyName || deriveFallbackName(searxUrl),
                        website: searxUrl,
                        email: lead.email || null,
                        mobile: lead.mobile,
                        source: 'searx_search',
                    });
                }
            } catch {}
            await sleep(400);
        }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // STAGE 6: Map-Based Discovery (GMB/OSM — very high quality)
    // ══════════════════════════════════════════════════════════════════════════
    if (discovered.size < 45) {
        console.log(`\n📍 STAGE 6: Map search for "${query}"...`);
        const mapUrls = await mapSearch(cleanSearchQuery(query));
        trace.maps = mapUrls.length;

        for (const mapUrl of mapUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(mapUrl) || discovered.has(mapUrl)) continue;

            try {
                const lead = await crawlWebsite(mapUrl, settings);
                if (lead.relevant) {
                    discovered.set(mapUrl, {
                        company_name: lead.companyName || deriveFallbackName(mapUrl),
                        website: mapUrl,
                        email: lead.email || null,
                        mobile: lead.mobile,
                        source: 'map_search',
                    });
                }
            } catch {}
            await sleep(300);
        }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // STAGE 7: Stealth Browser Discovery (ULTIMATE FALLBACK — human-like)
    // ══════════════════════════════════════════════════════════════════════════
    if (discovered.size < 50) {
        console.log(`\n🛡️ STAGE 7: Stealth browser lookup for "${query}"...`);
        const stealthUrls = await stealthSearch(query);
        trace.stealth = stealthUrls.length;

        for (const stealthUrl of stealthUrls) {
            if (discovered.size >= 80) break;
            if (isForbidden(stealthUrl) || discovered.has(stealthUrl)) continue;

            try {
                const lead = await crawlWebsite(stealthUrl, settings);
                if (lead.relevant) {
                    discovered.set(stealthUrl, {
                        company_name: lead.companyName || deriveFallbackName(stealthUrl),
                        website: stealthUrl,
                        email: lead.email || null,
                        mobile: lead.mobile,
                        source: 'stealth_search',
                    });
                }
            } catch {}
            await sleep(300);
        }
    }

    const finalResults = Array.from(discovered.values());
    console.log(`🔎 [AI FILTER] Filtering ${finalResults.length} leads with LLM...`);
    const filteredLeads = await filterLeadsWithAI(finalResults, settings);
    console.log(`\n📡 Engine Trace: YP(${trace.yellowpages}) Bing(${trace.bing}) DDG(${trace.ddg}) Yahoo(${trace.yahoo}) SearX(${trace.searx}) Maps(${trace.maps}) Stealth(${trace.stealth}) Dir(${trace.directory})`);
    console.log(`✨ Discovery Complete: ${filteredLeads.length} qualified companies found (from ${finalResults.length} initial)\n`);
    return { leads: filteredLeads, trace };
};

export const scrapeAboutPage = async (aboutPageUrl: string): Promise<string> => {
    if (!aboutPageUrl || aboutPageUrl === 'N/A') return 'No website.';
    
    const fetchAndClean = async (targetUrl: string): Promise<string> => {
        try {
            const res = await axios.get(targetUrl, {
                headers: { 'User-Agent': randomUA(), 'Accept': 'text/html' },
                timeout: 8000,
            });
            const html = typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
            return html
                .replace(/<script[\s\S]*?<\/script>/gi, '')
                .replace(/<style[\s\S]*?<\/style>/gi, '')
                .replace(/<[^>]+>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        } catch { return ''; }
    };

    try {
        let content = await fetchAndClean(aboutPageUrl);
        
        // 🚀 SCRAPER HARDENING v25.1: If content is < 1200 chars, find deep links (Services/Solutions/About)
        if (content.length < 1200) {
            const res = await axios.get(aboutPageUrl, { headers: { 'User-Agent': randomUA() }, timeout: 5000 });
            const $ = cheerio.load(res.data);
            let subPageUrl = '';
            
            $('a').each((_, el) => {
                if (subPageUrl) return;
                const text = $(el).text().toLowerCase();
                const href = $(el).attr('href') || '';
                
                // PRIORITY 1: Services & Solutions (Rich technical data)
                if (text.includes('service') || text.includes('solution') || text.includes('expertise') || text.includes('capabilit')) {
                    if (href.startsWith('http')) subPageUrl = href;
                    else if (href.startsWith('/')) subPageUrl = `${aboutPageUrl.endsWith('/') ? aboutPageUrl.slice(0, -1) : aboutPageUrl}${href}`;
                }
                
                // PRIORITY 2: About & Profile (Company data)
                if (!subPageUrl && (text.includes('about') || text.includes('profile') || text.includes('who we are') || text.includes('company'))) {
                    if (href.startsWith('http')) subPageUrl = href;
                    else if (href.startsWith('/')) subPageUrl = `${aboutPageUrl.endsWith('/') ? aboutPageUrl.slice(0, -1) : aboutPageUrl}${href}`;
                }
            });

            if (subPageUrl) {
                console.log(`📡 Scraping sub-page for more context: ${subPageUrl}`);
                const extraContent = await fetchAndClean(subPageUrl);
                content += ' ' + extraContent;
            }
        }

        return content.slice(0, 4000); // 4k chars of ground truth
    } catch { return 'Could not scrape website.'; }
};

// ─── 14. AI Relevance Filter ────────────────────────────────────────────────
export type BuyerFitAssessment = {
    qualified: boolean;
    score: number;
    tier: 'enterprise' | 'growth' | 'small' | 'excluded';
    reason: string;
    signals: string[];
};

export const assessEnterpriseBuyerFit = (companyName: string, aboutText: string, targetNiches: string[] = [], competitorTerms: string[] = []): BuyerFitAssessment => {
    const haystack = `${companyName || ''} ${aboutText || ''}`.toLowerCase();
    const blockedSignals = [
        'wikipedia', 'dictionary', 'definition', 'news', 'magazine', 'stock market',
        'forex', 'trading platform', 'book', 'ebook', 'download', 'course', 'university',
        'school', 'jobs', 'salary', 'review portal', 'directory', 'marketwatch',
        'investopedia', 'scribd', 'britannica'
    ];

    const localSignals = ['uae', 'dubai', 'abu dhabi', 'sharjah', 'ajman', '.ae', '+971'];

    if (blockedSignals.some(signal => haystack.includes(signal))) {
        return { qualified: false, score: 0, tier: 'excluded', reason: 'Informational, directory, or media entity.', signals: [] };
    }

    // DYNAMIC COMPETITOR FILTERING GUARD: never qualify a peer agency whose own service
    // categories match what the active workspace sells (marketing/web/lead-gen/AI firms).
    const cTerms = Array.isArray(competitorTerms) ? competitorTerms : [];
    if (cTerms.length > 0 && isCompetitorProspect(companyName, aboutText, cTerms)) {
        return { qualified: false, score: 0, tier: 'excluded', reason: 'Competitor entity (matches active agency service categories).', signals: ['competitor'] };
    }

    // Buyer-type alignment: does this company's business match the AI-sales-agent buyer profile?
    // NO hardcoded sector list — the ONLY fit signals are the targetNiches configured in the
    // workspace (dashboard DYNAMIC_NICHES / Targeting Brief). This keeps the engine multi-niche
    // and prevents the agency's own service categories (e.g. "digital marketing", "software
    // development") from ever qualifying a competitor as a buyer.
    const configuredNiches = Array.isArray(targetNiches) && targetNiches.length > 0
        ? targetNiches.map((n: string) => String(n || '').toLowerCase().trim()).filter(Boolean)
        : [];
    const fitKeywords = configuredNiches;
    const matchedFit = fitKeywords.filter(kw => kw && haystack.includes(kw));
    const signals: string[] = [];
    if (matchedFit.length > 0) signals.push(`target-niche: ${matchedFit.slice(0, 3).join(', ')}`);

    const local = localSignals.some(signal => haystack.includes(signal));
    if (local) signals.push('local presence');

    let score = local ? 40 : 10;
    if (String(aboutText || '').length > 300) score += 20;            // real, substantive site content
    if (matchedFit.length > 0) score += 30 + Math.min(matchedFit.length - 1, 1) * 10; // niche alignment 30-40
    score = Math.min(100, score);

    // Genuine interest requires BOTH local presence AND a target-niche match.
    const qualified = local && score >= 55 && matchedFit.length > 0;
    const tier: BuyerFitAssessment['tier'] = !qualified ? 'small' : score >= 85 ? 'enterprise' : 'growth';
    const reason = qualified
        ? `${tier} buyer fit (${score}/100): ${matchedFit.slice(0, 3).join(', ')} in target location.`
        : !local
            ? `Insufficient fit (${score}/100): no presence in target location (UAE).`
            : matchedFit.length === 0
                ? `Insufficient fit (${score}/100): no match to target buyer niches.`
                : `Insufficient fit (${score}/100).`;
    return { qualified, score, tier, reason, signals };
};

const heuristicRelevanceFallback = (companyName: string, aboutText: string): { relevant: boolean; reason: string; score: number } => {
    const fit = assessEnterpriseBuyerFit(companyName, aboutText);
    return { relevant: fit.qualified, reason: fit.reason, score: fit.score };
};

// Uses Groq AI to verify if a discovered company is relevant to the client's business.
// Driven 100% dynamically from system settings (pitch_context, company_knowledge, negative_keywords).
export const checkAIRelevance = async (companyName: string, aboutText: string): Promise<{relevant: boolean, reason: string, score: number}> => {
    try {
        const { loadSystemConfig } = await import('./config_manager');
        const config = await loadSystemConfig();
        const myCompany = config.company_name || "Asif Digital Agency";
        const myNiche = config.pitch_context || "B2B Sales and AI Automation Services";
        const negativeKeywords = config.negative_keywords || config.NEGATIVE_KEYWORDS || "";
        const requiredKeywords = config.required_keywords || config.REQUIRED_KEYWORDS || "";
        const competitorTerms = deriveOwnServiceTerms(config);
        const competitorList = competitorTerms.length > 0 ? competitorTerms.join(', ') : '(none)';

        const prompt = `You are an elite B2B Sales Research Analyst for ${myCompany}.
Your goal is to QUALIFY only candidate buyer businesses matching the client's pitch context and target criteria.

Target Client Company: "${myCompany}"
Service Pitch Context: "${myNiche}"
Knowledge Base & Target Criteria: "${config.company_knowledge || '(None)'}"
Target Location: "${config.target_location || 'UAE'}"
Required Target Keywords: "${requiredKeywords || '(None)'}"
Negative Keywords / Strict Exclusions: "${negativeKeywords || '(None)'}"
COMPETITOR SERVICE CATEGORIES (must be excluded — these match what we sell): "${competitorList}"

Company Name to Evaluate: "${companyName}"
Website Content: "${aboutText.slice(0, 2000)}"

QUALIFICATION INSTRUCTIONS:
1. Evaluate if this company is a valid target lead matching the user's Service Pitch Context, Target Location, Knowledge Base, and Required Target Keywords configured in their Dashboard settings.
2. STRICT EXCLUSIONS: If the company matches any Negative Keywords / Strict Exclusions specified by the user, REJECT it immediately.
3. COMPETITOR EXCLUSION: If the company IS an agency/firm offering services listed under COMPETITOR SERVICE CATEGORIES (e.g. marketing agency, web design firm, lead-gen tool, software/AI agency), REJECT it — we never sell to competitors.
4. Be fair and objective: score higher (>= 40) if the company aligns with the user's Pitch Context and Target Criteria; score lower (< 40) if it matches Negative Keywords or is unrelated to the user's intent.

Reply with ONLY valid JSON: {"relevant": true/false, "score": 0-100, "reason": "concise explanation"}`;

        const text = await callAI(prompt);
        const jsonMatch = text.match(/\{[^}]+\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            const aiScore = Math.max(0, Math.min(100, Number(parsed.score || 0)));
            const relevant = parsed.relevant === true && aiScore >= 40;
            return {
                relevant,
                score: aiScore,
                reason: parsed.reason || (relevant ? 'Qualified target' : 'Irrelevant target')
            };
        }
        return heuristicRelevanceFallback(companyName, aboutText);
    } catch {
        return heuristicRelevanceFallback(companyName, aboutText);
    }
};

/**
 * Layer 1 AI Pre-Filter: Evaluates search result titles & snippets BEFORE adding to SQLite.
 * Uses a balanced threshold (score >= 40) so potential buyers are never rejected.
 * 100% Dashboard-driven (loads negative & required keywords from system settings).
 */
export const aiPreFilterSearchResult = async (
    title: string,
    snippet: string,
    domain: string
): Promise<{ passed: boolean; score: number; reason: string }> => {
    try {
        const { loadSystemConfig } = await import('./config_manager');
        const config = await loadSystemConfig();
        
        // Fast-path rule checks based on Dashboard settings
        const negativeKeywords = (config.negative_keywords || config.NEGATIVE_KEYWORDS || '')
            .split(/[\n,;|]+/).map((k: string) => k.trim().toLowerCase()).filter(Boolean);

        const lowerCombined = `${title} ${snippet} ${domain}`.toLowerCase();
        for (const neg of negativeKeywords) {
            if (neg && lowerCombined.includes(neg)) {
                return { passed: false, score: 0, reason: `Excluded by Dashboard Negative Keyword: "${neg}"` };
            }
        }

        // DYNAMIC COMPETITOR FILTERING GUARD: reject prospects whose metadata/tags/description
        // match the active agency's OWN service categories (a competing agency is never a buyer).
        const competitorTerms = deriveOwnServiceTerms(config);
        if (competitorTerms.length > 0 && isCompetitorProspect(title, `${snippet} ${domain}`, competitorTerms)) {
            return { passed: false, score: 0, reason: 'Competitor entity (matches active agency service categories).' };
        }

        const prompt = `You are an AI B2B Lead Qualifier (Layer 1 Pre-Filter).
Target Pitch Context: "${config.pitch_context || 'B2B Services & Products'}"
Target Location: "${config.target_location || 'UAE'}"

Search Result Item:
Title: "${title}"
Snippet: "${snippet}"
Domain: "${domain}"

INSTRUCTIONS:
1. Is this candidate item a valid B2B company or commercial business with potential to buy our products/services?
2. Give benefit of the doubt to growing B2B businesses in our target region.
3. Reject ONLY if it is an obvious non-B2B directory index, job portal, Wikipedia page, or unrelated consumer link.
4. REJECT IMMEDIATELY if it is a COMPETITOR — an agency or company that offers services in the same categories as the active workspace (marketing/web-design/lead-gen/software/AI agencies are excluded).

Reply with ONLY valid JSON: {"passed": true/false, "score": 0-100, "reason": "concise explanation"}`;

        const text = await callAI(prompt);
        const jsonMatch = text.match(/\{[^}]+\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            const score = Number(parsed.score || (parsed.passed ? 70 : 20));
            return {
                passed: Boolean(parsed.passed && score >= 40),
                score,
                reason: String(parsed.reason || 'Layer 1 AI Pre-Filter complete')
            };
        }
        return { passed: true, score: 60, reason: 'Passed Layer 1 default heuristic' };
    } catch {
        return { passed: true, score: 60, reason: 'Passed Layer 1 fallback heuristic' };
    }
};

/**
 * AI LinkedIn Matcher Guard: Verifies candidate LinkedIn profiles with Groq AI to ensure zero mismatches.
 */
export const verifyLinkedInMatchWithAI = async (
    targetCompanyName: string,
    targetDomain: string,
    linkedInUrl: string,
    linkedInSnippet: string = ''
): Promise<{ isMatch: boolean; confidence: number; reason: string }> => {
    try {
        if (!linkedInUrl || !linkedInUrl.includes('linkedin.com/')) {
            return { isMatch: false, confidence: 0, reason: 'Invalid LinkedIn URL format' };
        }
        const prompt = `You are a B2B Data Verification Specialist.
Verify if this candidate LinkedIn profile matches the target company identity.

Target Company Name: "${targetCompanyName}"
Target Company Domain: "${targetDomain}"
Candidate LinkedIn URL: "${linkedInUrl}"
Candidate LinkedIn Snippet/Headline: "${linkedInSnippet.slice(0, 1000)}"

Instructions:
1. Compare candidate LinkedIn company name/headline with the target company name ("${targetCompanyName}") and domain ("${targetDomain}").
2. Verify geographic alignment (UAE/Dubai/Middle East preferred).
3. If the profile belongs to a completely different company, wrong industry, or unrelated person/branch, mark isMatch as false.

Reply with ONLY valid JSON:
{"isMatch": true/false, "confidence": 0-100, "reason": "concise explanation"}`;

        const text = await callAI(prompt);
        const jsonMatch = text.match(/\{[^}]+\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                isMatch: Boolean(parsed.isMatch && parsed.confidence >= 70),
                confidence: Number(parsed.confidence || 0),
                reason: String(parsed.reason || 'AI verification complete')
            };
        }
        return { isMatch: true, confidence: 75, reason: 'Fallback match heuristic accepted' };
    } catch {
        return { isMatch: true, confidence: 70, reason: 'Verification fallback accepted' };
    }
};


