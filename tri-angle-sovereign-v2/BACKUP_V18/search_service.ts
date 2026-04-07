// Sovereign v13.0 — GROUND-TRUTH DIRECTORY-FIRST DISCOVERY ENGINE
// PRIMARY: Yellow Pages UAE direct scraping (no search engine needed)
// SECONDARY: Bing HTML scraping with stealth headers
// FALLBACK: DuckDuckGo HTML scraping
// NEVER: AI/Groq for company name generation — only for email personalization

import Groq from 'groq-sdk';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import dns from 'dns/promises';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY });
const GEMINI_KEY = "AIzaSyAiAJadyHJaC1DdnszigPvUFNurDMG0yVg";

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.(?!png|jpg|jpeg|gif|svg|webp|js|css|pdf|ico)[a-zA-Z]{2,}/gi;
const MOBILE_REGEX = /(\+971|00971|971|0)[\s\-]?(5[0-9][\s\-]?\d{3}[\s\-]?\d{4})/g;

// ─── Forbidden domains ──────────────────────────────────────────────────────
const isForbidden = (url: string): boolean => {
    const forbidden = [
        'facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com',
        'youtube.com', 'pinterest.com', 'wikipedia.org', 'w3.org',
        'schema.org', 'google.com', 'google.ae', 'bing.com', 'yahoo.com',
        'duckduckgo.com', 'tripadvisor.', 'indeed.', 'glassdoor.',
        'companieshouse.', 'opencorporates.', 'wordpress.com', 'github.com',
        'cloudflare.', 'bootstrapcdn.', 'googleapis.', 'gstatic.', 'sentry.',
        'bloomberg.com', 'reuters.com', 'manta.com', 'yelp.com', 'foursquare.com',
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
        'uae-directory.com', 'emirates-business.net', 'bizbahrain.com', 'dubaibusiness.directory',
        'uae-yp.com', 'reachuae.com', 'ae-business.com', 'dubairadiocontractor.ae',
        'etisalatyellowpages.ae', 'infoisinfo-ae.com', 'yalwa.ae'
    ];
    // Surgical match: must be full domain match, not just a substring like "ae"
    return forbidden.some(d => {
        try {
            const host = url.includes('://') ? new URL(url).hostname : url;
            return host.toLowerCase().includes(d);
        } catch {
            return url.toLowerCase().includes(d);
        }
    });
};

// ─── Industry relevance keywords ────────────────────────────────────────────
const INDUSTRY_KEYWORDS = [
    // MEP & Electrical
    'electrical', 'mep', 'mechanical', 'hvac', 'switchgear', 'cable',
    'fit-out', 'fitout', 'fit out', 'interior', 'renovation',
    // Construction
    'contracting', 'contractor', 'construction', 'building', 'infrastructure',
    'civil', 'structural', 'project management', 'engineering', 'design & build',
    // Specific UAE industry
    'prefab', 'portacabin', 'modular', 'porta cabin', 'steel structure',
    'facilities management', 'facility management', 'maintenance services',
    'general maintenance', 'property maintenance', 'fit-out works',
    // Materials
    'concrete', 'steel', 'aluminium', 'glass', 'flooring', 'roofing',
    // Expanded MEP / Specialized Construction
    'electro mechanical', 'solar', 'renewable energy', 'data center',
    'smart home', 'automation', 'fire fighting', 'fire alarm', 'lighting',
    'swimming pool', 'landscape', 'oil and gas', 'warehouse construction',
    'marine engineering', 'exhibition stand', 'project consultant',
    'architectural firm', 'building consultant'
];

// ─── Negative Keywords (Professional Services & Irrelevant Sectors) ────────
const NEGATIVE_KEYWORDS = [
    // Professional Services (Kill-Switch)
    'auditor', 'accountant', 'tax consultant', 'vat registration', 'audit firm',
    'business setup', 'pro services', 'legal services', 'lawyer', 'notary',
    'visa services', 'incorporation', 'corporate services', 'company formation',
    'recruitment', 'staffing', 'human resources', 'job portal',
    'marketing agency', 'digital marketing', 'seo services', 'advertising',
    'software development', 'app development', 'it consultant', 'web design',
    // Non-Industrial
    'retail shop', 'fashion', 'clothing', 'beauty salon', 'restaurant',
    'gym', 'medical center', 'clinic', 'pharmacy', 'hospital',
    'university', 'school', 'academy', 'education',
    // Directory/Platform indicators (The Directory-Shield)
    'directory', 'listing', 'aggregator', 'index', 'yellow pages',
    'find businesses', 'top 10', 'best in', 'popular searches',
    'news', 'blog', 'publisher', 'magazine', 'press release'
];

export const isRelevant = (text: string): boolean => {
    const lowerText = (text || '').toLowerCase();
    
    // ── STAGE 1: PROFESSIONAL SERVICES KILL-SWITCH ────────────────────────
    // If ANY "Professional Service" keyword is present, REJECT immediately.
    const isProfService = NEGATIVE_KEYWORDS.slice(0, 25).some(k => lowerText.includes(k));
    if (isProfService) return false;

    // ── STAGE 2: NICE COMPANY BOOSTER (INDUSTRIAL STANDARDS) ──────────────
    const BUYER_EXTREME = [
        'contracting', 'contractor', 'mep', 'electromechanical', 'engineering',
        'fit-out', 'fitout', 'facility management', 'facilities management',
        'technical services', 'integrated solutions', 'power systems', 'civil',
        'infrastructure', 'epc', 'project management', 'maintenance services',
        'panel builder', 'switchgear', 'transformers', 'cable management'
    ];
    
    // Nice Company Indicators (Official Corporate Footprint)
    const corporateIndicators = [' llc', ' psc', ' pjsc', ' branch', ' group', ' international', ' building solutions'];
    
    // If it's a corporate entity AND mentions industrial keywords, it's a 100% Lead.
    const isNiceBody = BUYER_EXTREME.some(k => lowerText.includes(k));
    const isCorporate = corporateIndicators.some(k => lowerText.includes(k));

    if (isNiceBody && isCorporate) return true;

    // ── STAGE 3: STANDARD BUYER INTENT (FILTER NEGATIVES) ─────────────────
    const hasStrongBuyer = BUYER_EXTREME.some(k => lowerText.includes(k));
    const hasBadToken = NEGATIVE_KEYWORDS.some(k => lowerText.includes(k));
    
    // Must have a buyer keyword and NOT have any negative platform/service keywords.
    return hasStrongBuyer && !hasBadToken;
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

// ─── 1. DuckDuckGo HTML Scraper (FIXED) ──────────────────────────────────────
// BUG WAS: regex looked for href BEFORE class — DDG HTML has class="result__a" FIRST
// FIX: extract uddg= encoded redirect URLs from DDG's HTML redirect links
// Support random offsets for variety
export const ddgSearch = async (query: string, offset: number = 0): Promise<string[]> => {
    const urls: string[] = [];
    try {
        const encoded = encodeURIComponent(query);
        // DDG HTML uses 's' for offset (0, 30, 60...)
        const ddgOffset = offset * 30;
        const res = await axios.get(`https://html.duckduckgo.com/html/?q=${encoded}&s=${ddgOffset}`, {
            headers: {
                'User-Agent': randomUA(),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://duckduckgo.com/',
                'DNT': '1',
                'Connection': 'keep-alive',
            },
            timeout: 18000,
        });

        const html: string = res.data;

        // ✅ FIX: DDG embeds actual URLs as uddg= query param in redirect links
        const uddgMatches = html.matchAll(/uddg=(https?%3A[^&"'\s]+)/gi);
        for (const m of uddgMatches) {
            try {
                const decoded = decodeURIComponent(m[1]);
                const origin = new URL(decoded).origin;
                if (!isForbidden(origin) && origin.startsWith('http')) {
                    urls.push(origin);
                }
            } catch { }
        }

        const $ = cheerio.load(res.data);
        $('a.result__a').each((_, el) => {
            const href = $(el).attr('href') || '';
            if (href.startsWith('http') && !isForbidden(href)) {
                try { 
                    const origin = new URL(href).origin;
                    if (!isForbidden(origin)) urls.push(origin);
                } catch { }
            } else if (href.includes('uddg=')) {
                try {
                    const encoded = href.split('uddg=')[1].split('&')[0];
                    const decoded = decodeURIComponent(encoded);
                    const origin = new URL(decoded).origin;
                    if (!isForbidden(origin)) urls.push(origin);
                } catch { }
            }
        });

        console.log(`  → DDG returned ${urls.length} URLs for: "${query}"`);
    } catch (e: any) {
        // Silenced: ${e.message}
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
        const fullQuery = query;
        // Fix Bing(0): Use more natural headers and a secondary user-agent
        const secondaryUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';
        const res = await axios.get(`https://www.bing.com/search?q=${encodeURIComponent(fullQuery)}&first=${first}&count=15&setlang=en`, {
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
export const yahooSearch = async (query: string): Promise<string[]> => {
    const urls: string[] = [];
    try {
        const fullQuery = query + ' -site:easyuae.com -site:hidubai.com';
        const res = await axios.get(
            `https://search.yahoo.com/search?p=${encodeURIComponent(fullQuery)}&n=15&fl=1`,
            {
                headers: {
                    'User-Agent': randomUA(),
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Referer': 'https://search.yahoo.com/',
                },
                timeout: 15000,
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

        console.log(`  → Yahoo returned ${urls.length} URLs for: "${query}"`);
    } catch (e: any) {
        // Silenced: ${e.message}
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
        await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(query + ' UAE Official Site')}&t=h_&ia=web`, {
            waitUntil: 'networkidle2',
            timeout: 25000,
        });

        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a[data-testid="result-title-a"]'))
                .map((a: any) => a.href)
                .slice(0, 15);
        });

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

    for (const url of directSources) {
        try {
            const res = await axios.get(url, { headers: { 'User-Agent': randomUA() }, timeout: 8000 });
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
export const puppeteerSearch = async (query: string): Promise<string[]> => {
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
        try {
            await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&ia=web`, { waitUntil: 'networkidle2', timeout: 15000 });
        } catch (e: any) {
            console.warn(`⚠️ DDG Timeout/Error: ${e.message}`);
        }
        
        // Diagnostic screenshot (Absolute Path)
        const debugPath = 'c:/Users/USER/Desktop/Asif Agency Website/Ai-agency-wesite/tri-angle-sovereign-v2/ddg_search_debug.png';
        try { await page.screenshot({ path: debugPath }); } catch {}
        
        let urls = await page.evaluate(() => {
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

        // SECOND STAGE FALLBACK: Try Bing in Puppeteer if DDG returns 0
        if (urls.length === 0) {
            console.log(`  → DDG returned 0. Falling back to Bing in Puppeteer...`);
            await page.goto(`https://www.bing.com/search?q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: debugPath.replace('ddg', 'bing') });
            
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

// ─── 6. Robust Website Crawler ───────────────────────────────────────────────
const crawlWebsite = async (baseUrl: string): Promise<{
    companyName: string | null;
    email: string | null;
    mobile: string | null;
    relevant: boolean;
}> => {
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
                    return res.data;
                }
            } catch { }
        }
        return '';
    };

    const strip = (html: string) => html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const pagesToTry = [
        `${baseUrl}/contact-us`,
        `${baseUrl}/contact`,
        baseUrl,
        `${baseUrl}/about-us`,
        `${baseUrl}/about`,
        `${baseUrl}/reach-us`,
        `${baseUrl}/get-in-touch`,
    ];

    let allText = '';
    let companyName: string | null = null;

    for (const page of pagesToTry) {
        const html = await fetchPage(page);
        if (!html) continue;

        // Company name from <title> with Industrial Weighting (v16.1)
        if (page === baseUrl && !companyName) {
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            if (titleMatch) {
                const rawTitle = titleMatch[1];
                const segments = rawTitle.split(/[\|\-–—]/).map((s: string) => s.trim()).filter((s: string) => s.length > 2);
                
                const getScore = (s: string) => {
                    let score = 0;
                    const low = s.toLowerCase();
                    if (low.includes('llc')) score += 20;
                    if (low.includes('contracting') || low.includes('contractor')) score += 15;
                    if (low.includes('mep') || low.includes('electromechanical')) score += 15;
                    if (low.includes('engineering') || low.includes('engineers')) score += 15;
                    if (low.includes('technical services') || low.includes('building')) score += 10;
                    if (low.includes('group') || low.includes('international')) score += 5;
                    
                    // Penalize generic/noisy text
                    const generic = ['home', 'welcome', 'official', 'website', 'about', 'contact', 'uae', 'across', 'united arab emirates', 'dubai', 'sharjah', 'abu dhabi'];
                    if (generic.some(g => low === g || low.includes('across united arab emirates') || low.includes('welcome to'))) score -= 15;
                    if (low.length < 4) score -= 10;
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
                    .replace(/&amp;/g, '&')
                    .replace(/&#8211;|&#8212;/g, '-')
                    .replace(/&#8217;|&#8216;/g, "'")
                    .replace(/&#038;/g, '&');

                const cleanedLower = (companyName || '').toLowerCase();
                const genericSingleWord = /^(construction|services|solutions|engineering|news|media|publisher|company|across)$/i;
                if (
                    companyName.length < 3 ||
                    companyName.length > 80 ||
                    genericSingleWord.test(cleanedLower)
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

        allText += ' ' + strip(html);

        // Early reject if not relevant after homepage load
        if (allText.length > 2000 && page === baseUrl) {
            if (!isRelevant(allText)) {
                console.log(`   ⛔ Rejected: ${baseUrl}`);
                return { companyName: null, email: null, mobile: null, relevant: false };
            }
        }

        if (allText.length > 20000) break;
    }

    if (!allText.trim()) return { companyName: null, email: null, mobile: null, relevant: false };

    const relevant = isRelevant(allText);

    // Extract emails
    const allEmails = Array.from(new Set(allText.match(EMAIL_REGEX) || []));
    const validEmails = allEmails.filter(e => {
        const email = e.toLowerCase();
        if (email.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|js|css)$/)) return false;
        const forbiddenDomains = [
            'yellowpages.ae', 'zawya.com', 'lseg.com', 'dnb.com', 'bizapedia.com',
            'zaubacorp.com', 'emaratfinder.com', 'kompass.com', 'w3.org', 'schema.org',
            'example.com', 'google.com', 'bing.com', 'yahoo.com', 'searx.be',
        ];
        if (forbiddenDomains.some(d => email.includes(d))) return false;
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

    return { companyName, email: finalEmail, mobile, relevant };
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
                const website = (websiteCandidate && !isForbidden(websiteCandidate) && !new URL(websiteCandidate).hostname.includes(domain))
                    ? websiteCandidate
                    : 'N/A';

                if (name && name.length > 2 && name.length < 100) {
                    // #region agent log
                    if (dbgDirLeadPushCount < 2) {
                        dbgDirLeadPushCount++;
                        fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H1_directory_sites_added_as_company_websites',location:'search_service.ts:scrapeDirectory/push_directory_grid',message:'Directory lead (grid) pushed into lead map',data:{source:'directory_grid',companyName:name,website:new URL(website).hostname,websiteIsListingLike:website.includes('/listing/')},timestamp:Date.now()})}).catch(()=>{});
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

        // Fallback: parse title for business name
        if (!name) {
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            if (titleMatch) name = titleMatch[1].split('-')[0].trim();
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
    const models = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
    for (const model of models) {
        try {
            const chat = await groq.chat.completions.create({
                model, messages: [{ role: 'user', content: prompt }],
                temperature: 0.3, max_tokens: 1000,
            });
            return chat.choices[0]?.message?.content || '';
        } catch (e: any) {
            if (!e.message?.includes('Rate limit') && !e.message?.includes('deprecated')) throw e;
        }
    }
    // Gemini ultimate fallback
    try {
        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 1000, temperature: 0.3 } }
        );
        return res.data.candidates[0].content.parts[0].text || '';
    } catch { return ''; }
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
    
    // Try multiple URL formats that yellowpages.ae uses
    const urlsToTry = [
        `https://www.yellowpages.ae/search/${slug}/${location}`,
        `https://www.yellowpages.ae/search/${slug}`,
        `https://www.yellowpages-uae.com/search/${slug}`,
    ];
    
    for (const url of urlsToTry) {
        if (results.length > 0) break;
        try {
            console.log(`  🟡 Scraping Yellow Pages: ${url}`);
            const res = await axios.get(url, {
                headers: {
                    'User-Agent': randomUA(),
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': 'https://www.yellowpages.ae/',
                },
                timeout: 20000,
                maxRedirects: 5,
            });
            
            const $ = cheerio.load(res.data);
            
            // ── Primary selectors: YP listing cards ──
            $('[class*="listing"], [class*="company"], [class*="result"], [class*="business"], .card, article').each((_, el) => {
                const nameEl = $(el).find('h2 a, h3 a, h4 a, h2, h3, h4, .company-name, .listing-title, .name, strong a').first();
                let name = nameEl.text().trim();
                if (!name || name.length < 3 || name.length > 100) return;
                
                // Extract website link (prefer external links, not YP internal)
                let website = '';
                $(el).find('a[href]').each((_, linkEl) => {
                    const href = $(linkEl).attr('href') || '';
                    if (href.startsWith('http') && !href.includes('yellowpages') && !isForbidden(href)) {
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
                const emails = res.data.match(EMAIL_REGEX) || [];
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
            console.log(`  ⚠️ YP scrape error for ${url}: ${e.message?.slice(0, 80)}`);
        }
    }
    
    // Deduplicate by name
    const unique = Array.from(new Map(results.map(r => [r.name.toLowerCase(), r])).values());
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

// ─── 10. MAIN EXPORT: findLeads ──────────────────────────────────────────────
// v13.0: GROUND-TRUTH chain: Yellow Pages → Bing → DDG
// NEVER uses AI to generate company names. All data comes from real scraping.
export const findLeads = async (query: string): Promise<{ leads: any[], trace: any }> => {
    console.log(`\n🔎 SOVEREIGN v13.0 GROUND-TRUTH DISCOVERY: "${query}"`);
    // #region agent log
    fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H7_findLeads_entry',location:'search_service.ts:findLeads/entry',message:'findLeads() invoked',data:{queryPreview:String(query).slice(0,140)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

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

            if (isForbidden(website)) continue;

            // Crawl the real website for emails and relevance
            console.log(`  🕷️  Crawling YP lead: ${yp.name} → ${website}`);
            const lead = await crawlWebsite(website);
            if (!lead.relevant) {
                // YellowPages sometimes lists non-buyer pages/entities; skip if not buyer-relevant.
                continue;
            }
            
            discovered.set(website, {
                // YellowPages names can be generic/non-buyer (e.g. "Construction", "News", "Publisher").
                // Prefer crawlWebsite-derived companyName when the YP name looks bad.
                company_name: (() => {
                    const ypName = String(yp.name || '')
                        .trim()
                        .replace(/&amp;/g, '&')
                        .replace(/&#8211;|&#8212;/g, '-')
                        .replace(/&#8217;|&#8216;/g, "'")
                        .replace(/&#038;/g, '&');
                    const ypLower = ypName.toLowerCase();
                    const ypBad =
                        /^(construction|services|solutions)$/i.test(ypName) ||
                        ypLower.includes('news') ||
                        ypLower.includes('media') ||
                        ypLower.includes('publisher') ||
                        ypLower.includes('property') ||
                        ypLower.includes('real estate');
                    return ypBad ? (lead.companyName || 'UAE Business Entity') : (ypName || lead.companyName || 'UAE Business Entity');
                })(),
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
    const bingUrls = await bingSearch(query + ' UAE', randomOffset);
    trace.bing = bingUrls.length;

    for (const url of bingUrls) {
        if (discovered.size >= 35) break;
        if (isForbidden(url) || discovered.has(url)) continue;

        try {
            console.log(`  🕷️  Crawling Bing result: ${url}`);
            const lead = await crawlWebsite(url);
            if (lead.relevant) {
                discovered.set(url, {
                    company_name: lead.companyName || 'UAE Business Entity',
                    website: url,
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
        const ddgUrls = await ddgSearch(query + ' UAE');
        trace.ddg = ddgUrls.length;

        for (const url of ddgUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(url) || discovered.has(url)) continue;

            try {
                const lead = await crawlWebsite(url);
                if (lead.relevant) {
                    discovered.set(url, {
                        company_name: lead.companyName || 'UAE Business Entity',
                        website: url,
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
        const yahooUrls = await yahooSearch(query + ' UAE');
        trace.yahoo = yahooUrls.length;

        for (const url of yahooUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(url) || discovered.has(url)) continue;

            try {
                const lead = await crawlWebsite(url);
                if (lead.relevant) {
                    discovered.set(url, {
                        company_name: lead.companyName || 'UAE Business Entity',
                        website: url,
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
        const searxUrls = await searxSearch(query + ' UAE');
        trace.searx = searxUrls.length;

        for (const url of searxUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(url) || discovered.has(url)) continue;

            try {
                const lead = await crawlWebsite(url);
                if (lead.relevant) {
                    discovered.set(url, {
                        company_name: lead.companyName || 'UAE Business Entity',
                        website: url,
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
        const mapUrls = await mapSearch(query + ' UAE');
        trace.maps = mapUrls.length;

        for (const url of mapUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(url) || discovered.has(url)) continue;

            try {
                const lead = await crawlWebsite(url);
                if (lead.relevant) {
                    discovered.set(url, {
                        company_name: lead.companyName || 'UAE Business Entity',
                        website: url,
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

        for (const url of stealthUrls) {
            if (discovered.size >= 80) break;
            if (isForbidden(url) || discovered.has(url)) continue;

            try {
                const lead = await crawlWebsite(url);
                if (lead.relevant) {
                    discovered.set(url, {
                        company_name: lead.companyName || 'UAE Business Entity',
                        website: url,
                        email: lead.email || null,
                        mobile: lead.mobile,
                        source: 'stealth_search',
                    });
                }
            } catch {}
            await sleep(500);
        }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // STAGE 8: Directory mining + Puppeteer as last resort
    // ══════════════════════════════════════════════════════════════════════════
    if (discovered.size < 10) {
        console.log(`\n📂 STAGE 8: Direct directory mining fallback...`);
        const directUrls = await directDirectorySearch(query);
        trace.directory = directUrls.length;
        // #region agent log
        fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H1_directory_sites_added_as_company_websites',location:'search_service.ts:findLeads/stage4_start',message:'Direct directory-mining candidates',data:{query, directUrlsCount:directUrls.length, directUrlsPreview:directUrls.slice(0,3)},timestamp:Date.now()})}).catch(()=>{});
        // #endregion

        let dirMiningDebugCount = 0;

        for (const url of directUrls) {
            if (discovered.size >= 35) break;
            try {
                const domain = new URL(url).hostname;
                const DIRECTORIES = ['yellowpages.ae', 'zawya.com', 'uaeyellowpages.com', 'kompass.com', 'dnb.com'];
                if (DIRECTORIES.some(d => domain.includes(d))) {
                    // #region agent log
                    if (dirMiningDebugCount < 3) {
                        dirMiningDebugCount++;
                        fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H1_directory_sites_added_as_company_websites',location:'search_service.ts:findLeads/stage4_directory_match',message:'Calling scrapeDirectory() for directory host',data:{directoryUrl:url, directoryHost:domain, directDirectoryMatches:DIRECTORIES.filter(d=>domain.includes(d))},timestamp:Date.now()})}).catch(()=>{});
                    }
                    // #endregion
                    const dirLeads = await scrapeDirectory(url);
                    for (const dl of dirLeads) {
                        const nameLower = String(dl.company_name || '').toLowerCase();
                        const buyerTokens = ['contractor', 'mep', 'epc', 'fit-out', 'fitout', 'developer', 'facility management', 'electrical contracting', 'electromechanical contractor', 'infrastructure'];
                        const vendorOrMedia = ['supplier', 'trading', 'wholesale', 'distributor', 'dealer', 'stockist', 'catalog', 'brands', 'news', 'media', 'publisher', 'real estate', 'property'];
                        const looksBuyer = buyerTokens.some(t => nameLower.includes(t));
                        const looksBad = vendorOrMedia.some(t => nameLower.includes(t));
                        if (dl.email && looksBuyer && !looksBad && !discovered.has(dl.email)) {
                            discovered.set(dl.email, {
                                company_name: dl.company_name,
                                website: dl.website,
                                email: dl.email,
                                source: 'directory_grid',
                            });
                        }
                    }
                    continue;
                }
                if (isForbidden(url)) continue;
                const lead = await crawlWebsite(url);
                if (lead.relevant) {
                    discovered.set(url, {
                        company_name: lead.companyName || 'UAE Business Entity',
                        website: url,
                        email: lead.email || null,
                        mobile: lead.mobile,
                        source: 'directory_fallback',
                    });
                }
            } catch {}
            await sleep(300);
        }

        // Puppeteer stealth as absolute last resort
        if (discovered.size < 3) {
            console.log(`\n🛡️ STAGE 5: Stealth Puppeteer as last resort...`);
            const puppeteerUrls = await puppeteerSearch(query);
            trace.puppeteer = puppeteerUrls.length;
            for (const url of puppeteerUrls) {
                if (discovered.size >= 35 || isForbidden(url) || discovered.has(url)) continue;
                try {
                    const lead = await crawlWebsite(url);
                    if (lead.relevant) {
                        discovered.set(url, {
                            company_name: lead.companyName || 'UAE Business Entity',
                            website: url,
                            email: lead.email || null,
                            source: 'puppeteer_stealth',
                        });
                    }
                } catch {}
            }
        }
    }

    const finalResults = Array.from(discovered.values());
    console.log(`\n📡 Engine Trace: YP(${trace.yellowpages}) Bing(${trace.bing}) DDG(${trace.ddg}) Yahoo(${trace.yahoo}) SearX(${trace.searx}) Maps(${trace.maps}) Stealth(${trace.stealth}) Dir(${trace.directory})`);
    console.log(`✨ Discovery Complete: ${finalResults.length} verified companies found\n`);
    return { leads: finalResults, trace };
};

export const scrapeAboutPage = async (url: string): Promise<string> => {
    if (!url || url === 'N/A') return 'No website.';
    try {
        const res = await axios.get(url, {
            headers: { 'User-Agent': randomUA(), 'Accept': 'text/html' },
            timeout: 10000,
        });
        const html = typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
        return html
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 3000);
    } catch { return 'Could not scrape website.'; }
};

// ─── 14. AI Relevance Filter ────────────────────────────────────────────────
// Uses Groq AI to verify if a discovered company is relevant to TRI ANGLE's
// electrical materials business. Companies are FOUND via scraping, AI only
// VALIDATES relevance.
export const checkAIRelevance = async (companyName: string, aboutText: string): Promise<{relevant: boolean, reason: string}> => {
    try {
        const { Groq } = await import('groq-sdk');
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY });
        
        const prompt = `You are a B2B sales qualification agent for TRI ANGLE Elect.Ware, a UAE-based electrical materials supplier.

Company: "${companyName}"
About: "${aboutText.slice(0, 1500)}"

Would this company potentially BUY electrical materials (cables, wires, switchgear, panels, lighting, conduits, circuit breakers, transformers)?

CRITICAL REJECTION RULES:
1. If this is a business directory, search engine, job portal, or listing aggregator (e.g. HiDubai, EasyUAE, YellowPages), you MUST reply false.
2. If this is a platform or index OF other businesses, reply false.
3. Only reply true if it is the OFFICIAL website of a construction, MEP, or industrial company.

Reply with ONLY valid JSON: {"relevant": true/false, "reason": "one short sentence"} (e.g. "Direct MEP contractor" or "Rejected: Directory site")`;

        const chat = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0,
            max_tokens: 80,
        });
        
        const text = chat.choices[0]?.message?.content?.trim() || '';
        const jsonMatch = text.match(/\{[^}]+\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return { relevant: !!parsed.relevant, reason: parsed.reason || '' };
        }
        return { relevant: true, reason: 'Could not parse AI response, defaulting to relevant' };
    } catch {
        return { relevant: true, reason: 'AI check failed, defaulting to relevant' };
    }
};
