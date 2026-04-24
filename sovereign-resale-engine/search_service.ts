// Sovereign v17.1 — GROUND-TRUTH DIRECTORY-FIRST DISCOVERY ENGINE (Restored)
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

const deriveFallbackName = (targetUrl: string) => {
    try {
        if (!targetUrl || targetUrl === 'N/A') return 'UAE Business Entity';
        const domain = new URL(targetUrl).hostname.replace('www.', '').split('.')[0];
        return domain.charAt(0).toUpperCase() + domain.slice(1);
    } catch { return 'UAE Business Entity'; }
};

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
    'general trading', 'wholesale market',
    // Directory / aggregator pages (not real companies)
    'directory', 'aggregator', 'yellow pages', 'find businesses',
    'top 10', 'best in uae', 'popular searches',
    'news article', 'blog post', 'magazine', 'press release'
];

export const isRelevant = (text: string): boolean => {
    const lowerText = (text || '').toLowerCase();
    if (!lowerText || lowerText.length < 10) return false;

    // ── STAGE 1: B2B POSITIVE SIGNALS (Weight: +10) ───────────────────────────
    const positiveKeywords = [
        'marketing agency', 'digital agency', 'digital marketing', 'software development',
        'it solutions', 'saas', 'cloud services', 'cybersecurity', 'erp solutions',
        'app development', 'ai technology', 'data analytics', 'managed services',
        'recruitment agency', 'hr consultancy', 'logistics company', 'event management',
        'business setup', 'fit out', 'interiors', 'fit-out', 'contracting', 'mep',
        'software company', 'tech company', 'digital transformation', 'web design'
    ];

    // ── STAGE 2: CONSUMER NEGATIVE SIGNALS (Weight: -15) ──────────────────────
    const negativeKeywords = [
        'retail shop', 'fashion store', 'beauty salon', 'restaurant', 'gym',
        'supermarket', 'hypermarket', 'grocery', 'clothing store'
    ];

    // v26.2: Weighted Scoring System (Ensures software agencies with hospital clients are NOT rejected)
    let score = 0;
    positiveKeywords.forEach(k => { if (lowerText.includes(k)) score += 10; });
    negativeKeywords.forEach(k => { if (lowerText.includes(k)) score -= 15; });

    // Special Case: Educational/Medical are only negative if no B2B signal exists
    const weakNegatives = ['hospital', 'clinic', 'pharmacy', 'school', 'university', 'academy'];
    weakNegatives.forEach(k => { if (lowerText.includes(k)) score -= 3; });

    // Corporate indicators add a small boost
    const corporateIndicators = [' llc', ' psc', ' pjsc', ' branch', ' group', ' international', ' solutions', ' services', ' fze', ' fzco'];
    corporateIndicators.forEach(k => { if (lowerText.includes(k)) score += 2; });

    return score > 5; 
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
    let companyName: string | null = null;

    for (const page of pagesToTry) {
        let html = await fetchPage(page);
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
        const rawEmails = html.match(EMAIL_REGEX) || [];
        rawEmails.forEach(e => {
            if (e.includes('@') && e.includes('.')) {
                allText += ` ${e} `;
            }
        });

        allText += ' ' + strip(html);

        // Early reject if not relevant after homepage load
        if (allText.length > 2000 && page === baseUrl) {
            if (!isRelevant(allText)) {
                console.log(`   ⛔ Rejected (Low B2B Score): ${baseUrl}`);
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
        
        // 🛡️ ANTI-PLACEHOLDER GUARD (v26.1)
        const placeholderBlacklist = ['max.mustermann', 'john.doe', 'jane.doe', 'test@', 'email@', 'yourname@', 'domain.com', 'example.com', 'user@', 'admin@example', 'info@example', 'name@', 'username@', 'testemail@'];
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
            // Reject if it's a completely different unrelated domain (like .ca for a .ae site)
            // Unless it's a common professional domain
            const commonBusinessDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];
            const isCommon = commonBusinessDomains.includes(emailDomain);
            // Softened domain matching: allow partial matches or common professional domains
            const websiteBase = websiteDomain.split('.')[0];
            const isRelated = emailDomain.includes(websiteBase) || websiteBase.includes(emailDomain.split('.')[0]);
            if (!isCommon && !isRelated && !emailDomain.includes(websiteDomain) && !websiteDomain.includes(emailDomain)) {
                // Only reject if it's completely unrelated (e.g. site is 'solar.ae' and email is 'junk@web.ca')
                return false; 
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
            console.log(`  ⚠️ YP scrape error for ${ypSearchUrl}: ${e.message?.slice(0, 80)}`);
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
            if (!lead.relevant) continue;
            
            discovered.set(website, {
                company_name: (() => {
                    const ypName = String(yp.name || '').trim();
                    const isGeneric = /^(construction|services|solutions)$/i.test(ypName);
                    return isGeneric ? (lead.companyName || deriveFallbackName(website)) : (ypName || lead.companyName || deriveFallbackName(website));
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

    for (const bingResultUrl of bingUrls) {
        if (discovered.size >= 35) break;
        if (isForbidden(bingResultUrl) || discovered.has(bingResultUrl)) continue;

        try {
            console.log(`  🕷️  Crawling Bing result: ${bingResultUrl}`);
            const lead = await crawlWebsite(bingResultUrl);
            if (lead.relevant) {
                discovered.set(bingResultUrl, {
                    company_name: lead.companyName || deriveFallbackName(bingResultUrl),
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
        const ddgUrls = await ddgSearch(query + ' UAE');
        trace.ddg = ddgUrls.length;

        for (const ddgResultUrl of ddgUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(ddgResultUrl) || discovered.has(ddgResultUrl)) continue;

            try {
                const lead = await crawlWebsite(ddgResultUrl);
                if (lead.relevant) {
                    discovered.set(ddgResultUrl, {
                        company_name: lead.companyName || deriveFallbackName(ddgResultUrl),
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
        const yahooUrls = await yahooSearch(query + ' UAE');
        trace.yahoo = yahooUrls.length;

        for (const yahooUrl of yahooUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(yahooUrl) || discovered.has(yahooUrl)) continue;

            try {
                const lead = await crawlWebsite(yahooUrl);
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
        const searxUrls = await searxSearch(query + ' UAE');
        trace.searx = searxUrls.length;

        for (const searxUrl of searxUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(searxUrl) || discovered.has(searxUrl)) continue;

            try {
                const lead = await crawlWebsite(searxUrl);
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
        const mapUrls = await mapSearch(query + ' UAE');
        trace.maps = mapUrls.length;

        for (const mapUrl of mapUrls) {
            if (discovered.size >= 60) break;
            if (isForbidden(mapUrl) || discovered.has(mapUrl)) continue;

            try {
                const lead = await crawlWebsite(mapUrl);
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
                const lead = await crawlWebsite(stealthUrl);
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
    console.log(`\n📡 Engine Trace: YP(${trace.yellowpages}) Bing(${trace.bing}) DDG(${trace.ddg}) Yahoo(${trace.yahoo}) SearX(${trace.searx}) Maps(${trace.maps}) Stealth(${trace.stealth}) Dir(${trace.directory})`);
    console.log(`✨ Discovery Complete: ${finalResults.length} verified companies found\n`);
    return { leads: finalResults, trace };
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
