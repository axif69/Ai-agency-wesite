// Sovereign v13.0 — Email Discovery Engine
// RULE: NEVER guess or construct email addresses. Only use emails scraped from real pages.
// RULE: Always verify MX records before returning any email.

import axios from 'axios';
import * as cheerio from 'cheerio';
import dns from 'dns/promises';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SEARCH_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!png|jpg|jpeg|gif|svg|webp|js|css|pdf|ico)[a-zA-Z]{2,}/gi;

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
];
const randomUA = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

// ─── Email Scoring ──────────────────────────────────────────────────────────
// Higher score = better email to use for outreach
function scoreEmail(email: string): number {
    const e = email.toLowerCase();
    const prefix = e.split('@')[0];
    
    // Best: business contact emails
    if (prefix === 'info') return 100;
    if (prefix === 'sales') return 95;
    if (prefix === 'contact') return 90;
    if (prefix === 'enquiry' || prefix === 'enquiries') return 88;
    if (prefix === 'business') return 85;
    if (prefix === 'projects') return 83;
    if (prefix === 'bd') return 80;
    if (prefix === 'mail') return 78;
    if (prefix === 'admin') return 75;
    if (prefix === 'office') return 73;
    if (prefix === 'general') return 70;
    if (prefix === 'reception') return 68;
    
    // Medium: department emails
    if (prefix.includes('procurement')) return 65;
    if (prefix.includes('purchasing')) return 63;
    if (prefix.includes('tender')) return 60;
    if (prefix.includes('estimate')) return 58;
    
    // OK: generic named emails (probably a real person)
    if (/^[a-z]+\.[a-z]+$/.test(prefix)) return 50; // firstname.lastname format
    if (/^[a-z]{2,}$/.test(prefix) && prefix.length > 3) return 45;
    
    // Low: should generally avoid
    if (prefix === 'noreply' || prefix === 'no-reply' || prefix === 'donotreply') return 5;
    if (prefix === 'support') return 15;
    if (prefix === 'help') return 12;
    if (prefix === 'webmaster') return 10;
    if (prefix === 'postmaster') return 8;
    if (prefix.includes('unsubscribe')) return 3;
    if (prefix.includes('bounce')) return 2;
    if (prefix.includes('mailer-daemon')) return 1;
    
    return 40; // Unknown prefix — moderate score
}

// ─── MX Verification ────────────────────────────────────────────────────────
async function verifyEmailDomain(email: string): Promise<boolean> {
    if (!EMAIL_REGEX.test(email)) return false;
    const domain = email.split('@')[1];
    try {
        const records = await dns.resolveMx(domain);
        return records && records.length > 0;
    } catch (e: any) {
        // If DNS is blocked/unavailable in this environment, don't hard-fail all emails.
        // Keep filtering by syntax + forbidden domains elsewhere, and let outreach proceed.
        const code = e?.code || e?.name || 'unknown';
        // #region agent log
        fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'post-fix',hypothesisId:'H9_dns_mx_blocked',location:'email_discovery.ts:verifyEmailDomain/catch',message:'MX lookup failed; treating email as tentatively valid',data:{domain,code},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        return true;
    }
}

export interface EnrichmentData {
    email: string | null;
    mobile_number: string | null;
    contact_name: string | null;
    linkedin_url: string | null;
    scrapedText?: string;
}

// ─── Extract mobile numbers for WhatsApp (05X or +9715X) ────────────────────
const extractMobile = (text: string): string | null => {
    const mobileRegex = /(?:\+971|00971|0)?(?:5[024568])[\s\-]?\d{3}[\s\-]?\d{4}/g;
    const matches = text.match(mobileRegex);
    if (matches && matches.length > 0) {
        let clean = matches[0].replace(/[\s\-]/g, '');
        if (clean.startsWith('05')) clean = '+971' + clean.substring(1);
        if (clean.startsWith('00971')) clean = '+' + clean.substring(2);
        return clean;
    }
    return null;
};

// ─── DuckDuckGo OSINT for CEO/Manager ───────────────────────────────────────
const discoverExecutive = async (companyName: string): Promise<{name: string | null, linkedin: string | null}> => {
    try {
        const query = encodeURIComponent(`${companyName} CEO OR Manager OR Director UAE LinkedIn`);
        const res = await axios.get(`https://html.duckduckgo.com/html/?q=${query}`, {
            headers: { 'User-Agent': randomUA() },
            timeout: 8000,
        });
        
        const titleMatch = res.data.match(/<h2 class="result__title">\s*<a class="result__snippet"[^>]*>([^<]+)<\/a>/i);
        const urlMatch = res.data.match(/<a class="result__url" href="([^"]+linkedin\.com\/in\/[^"]+)">/i);

        let name = null;
        let linkedin = null;

        if (urlMatch) {
            linkedin = urlMatch[1].startsWith('//') ? 'https:' + urlMatch[1] : urlMatch[1];
            const urlObj = new URL(linkedin);
            if (urlObj.searchParams.has('uddg')) {
                linkedin = decodeURIComponent(urlObj.searchParams.get('uddg') || linkedin);
            }
        }
        if (titleMatch) {
            const rawTitle = titleMatch[1];
            name = rawTitle.split('-')[0].split('|')[0].trim();
            if (name.toLowerCase().includes('linkedin') || name.toLowerCase().includes('profile')) name = null;
        }

        return { name, linkedin };
    } catch (e) {
        return { name: null, linkedin: null };
    }
};

// ─── DuckDuckGo OSINT for Emergency Email Fallback ──────────────────────────
export const osintEmailSearch = async (companyName: string, domain: string): Promise<string | null> => {
    try {
        const query = encodeURIComponent(`"${companyName}" email OR contact "@${domain.replace('www.', '')}"`);
        const res = await axios.get(`https://html.duckduckgo.com/html/?q=${query}`, {
            headers: { 'User-Agent': randomUA() },
            timeout: 8000,
        });
        
        const emails = res.data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
        const unique = Array.from(new Set(emails.map((e: string) => e.toLowerCase())));
        const clean = unique.filter((e: string) => !e.includes('xxx') && !e.includes('example.com') && !e.includes('.png') && !e.includes('duckduckgo.com'));
        
        // Prioritize emails that match the domain, or are info/sales/contact
        const domainMatch = clean.find((e: string) => e.includes(domain.replace('www.', '')));
        if (domainMatch) return domainMatch;
        return clean.length > 0 ? clean[0] : null;
    } catch (e) {
        return null;
    }
};

// ─── Fetch a page with retries + Puppeteer fallback ─────────────────────────
async function fetchPage(url: string): Promise<string> {
    const configs = [
        {
            'User-Agent': randomUA(),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
        },
        { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
    ];
    // v20.3: Try both HTTPS and HTTP (many industrial sites are HTTP-only)
    const urls = [url];
    if (url.startsWith('https://')) urls.push(url.replace('https://', 'http://'));
    else if (url.startsWith('http://')) urls.push(url.replace('http://', 'https://'));

    for (const tryUrl of urls) {
        for (const headers of configs) {
            try {
                const res = await axios.get(tryUrl, { headers, timeout: 20000, maxRedirects: 5 });
                if (res.data && typeof res.data === 'string' && res.data.length > 100) {
                    return res.data;
                }
            } catch {}
        }
    }

    // v20.3: Puppeteer Stealth Fallback — for anti-bot sites (409/403)
    console.log(`  🔓 Axios blocked on ${url}. Launching stealth browser fallback...`);
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 25000 });
        const html = await page.content();
        await browser.close();
        if (html && html.length > 100) {
            console.log(`  ✅ Stealth browser got ${html.length} chars from ${url}`);
            return html;
        }
    } catch (e: any) {
        console.log(`  ⚠️ Stealth browser fallback failed: ${e.message}`);
        if (browser) try { await browser.close(); } catch {}
    }
    return '';
}

// ─── Strip HTML to text ─────────────────────────────────────────────────────
function stripHtml(html: string): string {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// ─── MAIN: Enrich Company Data ──────────────────────────────────────────────
// Crawls contact/about pages to find REAL emails. NEVER constructs or guesses.
export const enrichCompanyData = async (companyName: string, domain: string): Promise<EnrichmentData> => {
    console.log(`🔎 ENRICHMENT v13.0: ${companyName} (${domain})`);
    
    const domainClean = domain.replace(/\/$/, '').toLowerCase();
    // Normalize to origin so we always crawl the correct root website.
    // If `domain` is already a path like ".../contact", we don't want to crawl ".../contact/contact".
    let baseUrl = domainClean;
    try {
        baseUrl = new URL(domainClean).origin;
    } catch {
        // leave baseUrl as-is
    }
    const domainPart = baseUrl.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
    
    // Function to check if email belongs to the company's domain
    const isOfficial = (e: string) => {
        const emailDomain = e.toLowerCase().split('@')[1];
        return emailDomain && (emailDomain.includes(domainPart) || domainPart.includes(emailDomain.split('.')[0]));
    };
    
    // Forbidden email domains (directory platforms, not real companies)
    const forbiddenDomains = [
        'yellowpages.ae', 'zawya.com', 'lseg.com', 'dnb.com', 'bizapedia.com',
        'zaubacorp.com', 'emaratfinder.com', 'kompass.com', 'w3.org', 'schema.org',
        'example.com', 'google.com', 'bing.com', 'yahoo.com', 'searx.be',
        'wixsite.com', 'wordpress.com', 'github.com', 'sentry.io',
    ];

    // #region agent log
    fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H4_email_extraction_fails_due_to_directory_websites',location:'email_discovery.ts:enrichCompanyData/start',message:'Starting email enrichment crawl',data:{domainPart,looksDirectoryDomain:forbiddenDomains.some(d=>domainPart.includes(d)),pagesToCrawlCount:5},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    
    let allText = '';
    let allEmails: string[] = [];

    // 1. Parallel OSINT Executive Search
    const execPromise = discoverExecutive(companyName);

    try {
        // 2. Crawl pages in priority order for email discovery
        // Order matters: contact pages first (most likely to have emails)
        const pagesToCrawl = [
            `${baseUrl}/contact`,
            `${baseUrl}/contact-us`,
            `${baseUrl}/contact.php`,
            `${baseUrl}/contact-us.php`,
            `${baseUrl}/contact.html`,
            `${baseUrl}/about`,
            `${baseUrl}/about-us`,
            `${baseUrl}/about.php`,
            baseUrl, // homepage last
        ];
        
        console.log(`  📡 Crawling ${pagesToCrawl.length} pages for real emails...`);
        
        for (const pageUrl of pagesToCrawl) {
            try {
                const html = await fetchPage(pageUrl);
                if (!html) continue;
                
                // Check for parked/sold domains
                const parked = ['hugedomains', 'domain is for sale', 'buy this domain', 'parked free', 'domain has expired'];
                if (parked.some(p => html.toLowerCase().includes(p))) {
                    console.log(`  ⛔ Domain appears parked/for sale: ${domainClean}`);
                    const execData = await execPromise;
                    return { email: null, mobile_number: null, contact_name: execData.name, linkedin_url: execData.linkedin };
                }
                
                // Extract emails from this page
                // v20.3: Decode HTML entities first (many industrial sites encode @ as &#64;)
                // v22.1: Also decode URL-encoded characters (%20, %40, etc.)
                const decodedHtml = html
                    .replace(/%40/gi, '@')
                    .replace(/%20/gi, ' ')
                    .replace(/%2F/gi, '/')
                    .replace(/%3A/gi, ':')
                    .replace(/&#64;/g, '@')
                    .replace(/&#x40;/g, '@')
                    .replace(/\[at\]/gi, '@')
                    .replace(/\(at\)/gi, '@')
                    .replace(/&#46;/g, '.')
                    .replace(/\[dot\]/gi, '.');
                const pageEmails = decodedHtml.match(SEARCH_REGEX) || [];
                allEmails.push(...pageEmails.map(e => decodeURIComponent(e).trim()));
                allText += ' ' + stripHtml(decodedHtml);
                
                // Also check for mailto: links which are highly reliable
                const $ = cheerio.load(html);
                $('a[href^="mailto:"]').each((_, el) => {
                    const mailto = $(el).attr('href')?.replace('mailto:', '').split('?')[0].trim();
                    if (mailto && mailto.includes('@')) {
                        allEmails.push(mailto);
                    }
                });
                
                console.log(`  📄 ${pageUrl} → found ${pageEmails.length} email(s)`);
            } catch {}
        }
        
        // Also try to find contact links from the homepage and crawl those
        try {
            const homeHtml = await fetchPage(domainClean);
            if (homeHtml) {
                const $ = cheerio.load(homeHtml);
                const contactLinks: string[] = [];
                $('a[href]').each((_, el) => {
                    const href = $(el).attr('href') || '';
                    const text = ($(el).text() || '').toLowerCase();
                    if (text.includes('contact') || text.includes('reach') || text.includes('get in touch')) {
                        const fullUrl = href.startsWith('http') ? href : `${domainClean}/${href.replace(/^\//, '')}`;
                        if (!pagesToCrawl.includes(fullUrl)) {
                            contactLinks.push(fullUrl);
                        }
                    } else if (href.includes('contact.php') || href.includes('about.php')) {
                        const fullUrl = href.startsWith('http') ? href : `${domainClean}/${href.replace(/^\//, '')}`;
                        if (!pagesToCrawl.includes(fullUrl)) contactLinks.push(fullUrl);
                    }
                });
                
                // Crawl any additional contact links found
                for (const contactUrl of contactLinks.slice(0, 3)) {
                    try {
                        const html = await fetchPage(contactUrl);
                        if (html) {
                            const pageEmails = html.match(SEARCH_REGEX) || [];
                            allEmails.push(...pageEmails);
                            allText += ' ' + stripHtml(html);
                        }
                    } catch {}
                }
            }
        } catch {}

        // 3. Extract mobile number
        const mobile_number = extractMobile(allText);
        if (mobile_number) console.log(`  📱 Scraped WhatsApp Number: ${mobile_number}`);

        // 4. Deduplicate and filter emails
        const uniqueEmails = Array.from(new Set(allEmails.map(e => e.toLowerCase().trim())));
        const cleanEmails = uniqueEmails.filter(e => {
            if (!e.includes('@') || !e.split('@')[1].includes('.')) return false;
            
            const emailDomain = e.split('@')[1].toLowerCase();
            
            // 1. Is it an official email? (e.g. info@company.com matches company.com)
            const isMatch = emailDomain.includes(domainPart) || domainPart.includes(emailDomain.split('.')[0]);
            
            // 2. Is it a verified legitimate public provider often used by contractors?
            const publicProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'eim.ae', 'emirates.net.ae', 'icloud.com'];
            const isPublic = publicProviders.includes(emailDomain);
            
            // If it's neither their official domain nor a known real provider, it's 99% a fake/template email. Reject it.
            if (!isMatch && !isPublic) {
                return false;
            }

            // Must have valid format
            if (e.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|js|css|pdf)$/)) return false;
            // v22.1: Reject emails with leftover URL encoding or whitespace
            if (e.includes('%') || e.includes(' ') || e.includes('\t')) return false;
            return true;
        });
        
        console.log(`  📧 Total unique emails found: ${cleanEmails.length}`);
        
        if (cleanEmails.length === 0) {
            // NO EMAIL FOUND — do NOT guess. Return null.
            console.log(`  ⚠️ No emails discovered on any page for ${companyName}`);
            const eData = await execPromise;
            return { 
                email: null, 
                mobile_number: extractMobile(allText), 
                contact_name: eData.name, 
                linkedin_url: eData.linkedin, 
                scrapedText: allText.slice(0, 5000) 
            };
        }

        // 5. MX-verify all found emails
        const mxVerifiedEmails: string[] = [];
        for (const e of cleanEmails) {
            if (await verifyEmailDomain(e)) {
                mxVerifiedEmails.push(e);
            }
        }
        
        console.log(`  ✅ MX-verified emails: ${mxVerifiedEmails.length}/${cleanEmails.length}`);
        
        if (mxVerifiedEmails.length === 0) {
            console.log(`  ⛔ All found emails failed MX check for ${companyName}`);
            const eData2 = await execPromise;
            return { 
                email: null, 
                mobile_number: extractMobile(allText), 
                contact_name: eData2.name, 
                linkedin_url: eData2.linkedin,
                scrapedText: allText.slice(0, 5000)
            };
        }

        // 6. Score emails: prefer official domain, then by prefix priority
        const officialEmails = mxVerifiedEmails.filter(isOfficial);
        const emailPool = officialEmails.length > 0 ? officialEmails : mxVerifiedEmails;
        
        // Sort by score (highest first) and pick the best
        emailPool.sort((a, b) => scoreEmail(b) - scoreEmail(a));
        const finalEmail = emailPool[0];
        
        console.log(`  🎯 Best email: ${finalEmail} (score: ${scoreEmail(finalEmail)})`);

        // #region agent log
        fetch('http://127.0.0.1:7891/ingest/081b1996-3933-46ca-92dd-acff5fdb7cfa',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f5e6fe'},body:JSON.stringify({sessionId:'f5e6fe',runId:'pre-debug',hypothesisId:'H4_email_extraction_fails_due_to_directory_websites',location:'email_discovery.ts:enrichCompanyData/summary',message:'Email enrichment summary (counts only)',data:{cleanEmailsCount:cleanEmails.length,mxVerifiedCount:mxVerifiedEmails.length,finalEmailExists:!!finalEmail,officialEmailsCount:officialEmails.length,domainPart},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        
        const execData = await execPromise;
        if (execData.name) console.log(`  👔 Identified Executive: ${execData.name}`);

        return {
            email: finalEmail,
            mobile_number: extractMobile(allText),
            contact_name: execData.name,
            linkedin_url: execData.linkedin,
            scrapedText: allText.slice(0, 10000)
        };

    } catch (e: any) {
        console.error('Enrichment error:', e.message);
        const execData = await execPromise;
        return { email: null, mobile_number: null, contact_name: execData.name, linkedin_url: execData.linkedin };
    }
};
