// Sovereign v13.1 — Email Discovery Engine
// RULE: NEVER guess or construct email addresses unless verified by a working SMTP handshake.
// RULE: Always verify MX records before returning any email.

import axios from 'axios';
import * as cheerio from 'cheerio';
import dns from 'dns/promises';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { callAI } from './search_service';
import { assessPersonName, isCompanyEntityName, isGenericMailbox, isPortfolioClientBrand, normalizeEmailCandidate, personNamesMatch, personNameFromLinkedInUrl, stripRoleDepartmentTokens, type EmailOwnershipStatus } from './contact_validation';
puppeteer.use(StealthPlugin());

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SEARCH_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!png|jpg|jpeg|gif|svg|webp|js|css|pdf|ico)[a-zA-Z]{2,}/gi;

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
];
const randomUA = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
const humanNameCheckCache = new Map<string, boolean>();
const isBrowserUnsafeDocumentUrl = (url: string): boolean =>
    /\.(?:pdf|doc|docx|xls|xlsx|ppt|pptx)(?:[?#].*)?$/i.test(String(url || ''));

const looksLikeHumanName = (name: string): boolean => {
    const cleaned = String(name || '').trim();
    if (!cleaned) return false;
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length < 2 || parts.length > 4) return false;
    return parts.every(part => /^[A-Z][a-zA-Z.'-]+$/.test(part));
};

const isSuspiciousName = (name: string): boolean => {
    const lower = String(name || '').toLowerCase();
    const suspicious = [
        'benefit', 'customers', 'clients', 'services', 'solutions', 'company',
        'business', 'leading', 'trusted', 'that ', 'our ', 'your ', 'we ',
        'about ', 'contact ', 'learn ', 'read ', 'global', 'group', 'systems',
        'technologies', 'technology', 'partners', 'holdings', 'industries',
        'logistics', 'ventures', 'capital', 'consulting', 'international',
        'agency', 'agencies', 'associated', 'associates'
        , 'brings', 'joins', 'announces', 'appointed', 'promoted', 'speaks', 'shares'
    ];
    return suspicious.some(term => lower.includes(term));
};

const cleanContactName = (name: string): string | null => {
    const cleaned = String(name || '').trim();
    if (looksLikeHumanName(cleaned) && !isSuspiciousName(cleaned)) return cleaned;
    return null;
};

const validateNameWithAI = async (name: string, title: string | null, companyName: string | null = null, siteContext: string | null = null): Promise<boolean> => {
    const res = await sanitizeAndValidateNameWithAI(name, title, companyName, siteContext);
    return res.valid;
};

export const sanitizeAndValidateNameWithAI = async (rawName: string, title: string | null = null, companyName: string | null = null, siteContext: string | null = null): Promise<{ valid: boolean; cleanName: string | null; reason?: string }> => {
    // Brand-token sanitization: before ANY fast-path return, strip the company's own
    // tokens from the name so "Vincitore Veer Vijay Doshi" becomes "Veer Vijay Doshi"
    // and the brand is never persisted as part of a person's name.
    const brandStripped = stripBrandTokensFromName(rawName, companyName);
    let cleaned = String(brandStripped || rawName || '').trim();
    if (!cleaned || cleaned.length < 2) return { valid: false, cleanName: null };

    // v2 — dynamic role/title cleaning (NLP token parsing): strip leading designations
    // and trailing departments BEFORE any human-name decision.
    const roleStripped = stripRoleDepartmentTokens(cleaned) || cleaned;
    if (roleStripped.trim().length < 2) return { valid: false, cleanName: null, reason: 'ROLE_ONLY' };
    cleaned = roleStripped.trim();

    // v2 — Company Entity / Generic Category rejection ("Skyline Builders", "Print Branding").
    if (isCompanyEntityName(cleaned, companyName)) return { valid: false, cleanName: null, reason: 'COMPANY_ENTITY_OR_CATEGORY' };

    // v2 — Portfolio / Client / Brand cross-check: a name that only appears inside the
    // site's portfolio/clients/projects context (and never near a person-role cue) is a
    // client brand, NOT the company's executive — drop it ("InterContinental Hotel SnapFixNow").
    if (siteContext && isPortfolioClientBrand(cleaned, siteContext)) return { valid: false, cleanName: null, reason: 'PORTFOLIO_CLIENT_BRAND' };

    const cacheKey = `${cleaned.toLowerCase()}|${String(title || '').toLowerCase()}|${String(companyName || '').toLowerCase()}`;

    // Fast path for clean 2-word names without company/department noise
    const pure = cleanContactName(cleaned);
    if (pure && !/\b(commercial|vehicles|division|department|fleet|operations|services|group|contracting|logistics|trading|holding|associates|technologies|systems)\b/i.test(cleaned)) {
        return { valid: true, cleanName: pure };
    }

    const prompt = `
You are an AI data cleaning assistant for a B2B sales CRM.
Given a raw text string scraped from a website or search result, extract ONLY the clean, real human person name (First Name + Last Name).

Raw Input: "${cleaned}"
Job Title: ${title || 'N/A'}
Company: ${companyName || 'N/A'}
${siteContext ? `Site Content (context): ${String(siteContext).replace(/\s+/g, ' ').slice(0, 1200)}` : ''}

Rules:
1. Strip all department names (e.g. "Commercial Vehicles", "Sales Division", "Fleet Operations"), job titles (e.g. "General Manager", "CEO"), company names, and website noise.
2. Example: "Commercial Vehicles Ramez Hamdan" -> "Ramez Hamdan"
3. Example: "CEO Ashley Cadzow" -> "Ashley Cadzow"
4. Example: "Our Commercial Services Team" -> "N/A"
5. PORTFOLIO / CLIENT / BRAND REJECTION: If the name is a PORTFOLIO CLIENT, hotel, resort, case study, partner brand, or generic business category shown on the site (e.g. "InterContinental", "Print Branding", "Skyline Builders") rather than the company's own human executive — output valid: false and clean_name: null.
6. If there is NO real human person name, output valid: false and clean_name: null.

Output ONLY JSON in this exact format:
{"valid": true, "clean_name": "First Last"}
`.trim();

    try {
        const response = await callAI(prompt);
        const jsonMatch = response.match(/\{[\s\S]*?\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed && parsed.valid && parsed.clean_name && parsed.clean_name !== 'null' && String(parsed.clean_name).trim().length >= 2) {
                return { valid: true, cleanName: String(parsed.clean_name).trim() };
            }
        }
    } catch {}

    return { valid: Boolean(pure), cleanName: pure };
};

// ─── Email Scoring (TRI-ANGLE ELITE) ─────────────────────────────────────────
function scoreEmail(email: string): number {
    const e = email.toLowerCase();
    const prefix = e.split('@')[0];

    const generics = [
        'sales', 'bd', 'business', 'contact', 'enquiry', 'enquiries', 
        'projects', 'procurement', 'purchasing', 'tender', 'estimate',
        'info', 'mail', 'admin', 'office', 'general', 'reception',
        'noreply', 'no-reply', 'donotreply', 'support', 'help',
        'careers', 'hr', 'jobs', 'resume', 'apply', 'team',
        'hello', 'welcome', 'queries', 'marketing', 'media', 'press',
        'accounts', 'finance', 'billing', 'invoices', 'webmaster', 'postmaster'
    ];

    // Personal name email patterns (e.g. john.doe, j.doe, john)
    const isPersonalPattern = /^[a-z]{1,2}[.-][a-z]+$/.test(prefix) || 
                             (/^[a-z]{3,}\.[a-z]{3,}$/.test(prefix)) ||
                             (!generics.includes(prefix) && /^[a-z]{4,}$/.test(prefix));

    if (isPersonalPattern && !generics.includes(prefix)) {
        return 150; // PERSONAL/DECISION MAKER EMAIL IS THE HIGHEST PRIORITY
    }

    if (prefix === 'sales') return 100;
    if (prefix === 'bd') return 98;
    if (prefix === 'business') return 95;
    if (prefix === 'contact') return 93;
    if (prefix === 'enquiry' || prefix === 'enquiries') return 91;
    if (prefix === 'projects') return 89;
    if (prefix === 'procurement') return 87;
    if (prefix === 'purchasing') return 85;
    if (prefix === 'tender') return 83;
    if (prefix === 'estimate') return 81;

    if (prefix === 'info') return 70;
    if (prefix === 'mail') return 68;
    if (prefix === 'admin') return 65;
    if (prefix === 'office') return 63;
    if (prefix === 'general') return 60;
    if (prefix === 'reception') return 58;

    if (prefix === 'noreply' || prefix === 'no-reply' || prefix === 'donotreply') return 5;
    if (prefix === 'support') return 15;
    if (prefix === 'help') return 12;
    if (prefix === 'webmaster') return 10;
    if (prefix === 'postmaster') return 8;
    if (prefix.includes('unsubscribe')) return 3;
    if (prefix.includes('bounce')) return 2;
    if (prefix.includes('mailer-daemon')) return 1;

    return 40;
}

function decodeCloudflareEmail(encodedString: string): string {
    let email = '';
    const r = parseInt(encodedString.substr(0, 2), 16);
    for (let n = 2; n < encodedString.length; n += 2) {
        const i = parseInt(encodedString.substr(n, 2), 16) ^ r;
        email += String.fromCharCode(i);
    }
    return email;
}

type PublishedEmailSource = 'home' | 'contact' | 'about' | 'team' | 'leadership' | 'osint';

function extractEmailsFromHtml(html: string, source: PublishedEmailSource): { email: string; source: PublishedEmailSource }[] {
    if (!html) return [];
    
    const found: { email: string; source: PublishedEmailSource }[] = [];
    const $ = cheerio.load(html);
    
    // 1. Extract from mailto links
    $('a[href^="mailto:"]').each((_, el) => {
        const href = $(el).attr('href') || '';
        const email = href.replace(/^mailto:/i, '').split('?')[0].trim().toLowerCase();
        if (email && email.includes('@')) {
            found.push({ email, source });
        }
    });
    
    // 2. Extract from Cloudflare email protection
    $('[data-cfemail]').each((_, el) => {
        const cipher = $(el).attr('data-cfemail') || '';
        try {
            const email = decodeCloudflareEmail(cipher);
            if (email && email.includes('@')) {
                found.push({ email, source });
            }
        } catch {}
    });
    
    // 3. Extract from visible body text only (exclude script, style, svg, iframe, noscript)
    $('script, style, svg, iframe, noscript').remove();
    const visibleText = $('body').text() || '';
    
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/gi;
    const textMatches = visibleText.match(emailRegex) || [];
    for (const match of textMatches) {
        const email = match.trim().toLowerCase();
        if (email && email.includes('@') && email.length <= 100) {
            const ext = email.split('.').pop();
            const forbidden = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'js', 'css', 'pdf', 'ico', 'html', 'htm', 'mp4', 'mp3', 'woff', 'woff2', 'ttf', 'eot'];
            if (ext && !forbidden.includes(ext)) {
                found.push({ email, source });
            }
        }
    }
    
    // Deduplicate
    const uniqueMap = new Map<string, typeof found[0]>();
    for (const item of found) {
        uniqueMap.set(item.email, item);
    }
    return Array.from(uniqueMap.values());
}

import { verifyMailbox } from './verifier.js';
import { checkAIRelevance } from './search_service.js';
import { normalizePhone } from './contact_format.js';

type PublishedPhones = {
    mobile_number: string | null;
    phone: string | null;
};

function extractPublishedPhones(html: string): PublishedPhones {
    if (!html) return { mobile_number: null, phone: null };
    const $ = cheerio.load(html);
    const candidates: string[] = [];

    $('a[href^="tel:"]').each((_, el) => {
        candidates.push(($(el).attr('href') || '').replace(/^tel:/i, '').split(/[?;]/)[0]);
    });
    $('a[href*="wa.me/"], a[href*="api.whatsapp.com/"], a[href*="whatsapp.com/send"]').each((_, el) => {
        const href = $(el).attr('href') || '';
        const phoneParam = href.match(/[?&]phone=([^&]+)/i)?.[1];
        const pathNumber = href.match(/wa\.me\/(\d+)/i)?.[1];
        if (phoneParam) candidates.push(decodeURIComponent(phoneParam));
        if (pathNumber) candidates.push(pathNumber);
    });
    $('[itemprop="telephone"], meta[property="business:contact_data:phone_number"]').each((_, el) => {
        candidates.push($(el).attr('content') || $(el).text() || '');
    });
    $('script[type="application/ld+json"]').each((_, el) => {
        const jsonText = $(el).text() || '';
        const telephoneValues = jsonText.match(/"telephone"\s*:\s*"([^"]+)"/gi) || [];
        for (const value of telephoneValues) {
            candidates.push(value.replace(/^.*?:\s*"/, '').replace(/"$/, ''));
        }
    });
    $('script, style, svg, iframe, noscript').remove();
    const visibleText = $('body').text() || '';
    candidates.push(...(visibleText.match(/(?:\+|00)?\d[\d\s().-]{6,}\d/g) || []));

    let mobileNumber: string | null = null;
    let phone: string | null = null;
    for (const candidate of candidates) {
        const normalized = normalizePhone(candidate);
        if (!normalized) continue;
        if (!mobileNumber) mobileNumber = normalized;
        else if (!phone) phone = normalized;
        if (mobileNumber && phone) break;
    }
    return { mobile_number: mobileNumber, phone };
}

// ─── SMTP Verification (Deep Handshake) ─────────────────────────────────────
type MailboxProbe = {
    syntaxValid: boolean;
    domainValid: boolean;
    mailboxAccepted: boolean;
    catchAll: boolean;
    portBlocked: boolean;
};

async function probeMailbox(email: string): Promise<MailboxProbe> {
    if (!EMAIL_REGEX.test(email)) return { syntaxValid: false, domainValid: false, mailboxAccepted: false, catchAll: false, portBlocked: false };
    const domain = email.split('@')[1];
    let domainValid = false;
    try {
        const response = await axios.get(`https://dns.google/resolve?name=${domain}&type=MX`, { timeout: 8000 });
        domainValid = (response.data.Answer || []).some((record: any) => Number(record?.type) === 15);
    } catch {
        console.log(`  [DOH] MX lookup unavailable for ${domain}.`);
    }
    if (!domainValid) return { syntaxValid: true, domainValid: false, mailboxAccepted: false, catchAll: false, portBlocked: false };
    try {
        const { exists, isCatchAll, portBlocked } = await verifyMailbox(email);
        return { syntaxValid: true, domainValid: true, mailboxAccepted: exists && !portBlocked, catchAll: isCatchAll, portBlocked };
    } catch {
        return { syntaxValid: true, domainValid: true, mailboxAccepted: false, catchAll: false, portBlocked: false };
    }
}

async function verifyEmailDomain(email: string, isGuessed: boolean = false): Promise<boolean> {
    const probe = await probeMailbox(email);
    return isGuessed
        ? probe.syntaxValid && probe.domainValid && probe.mailboxAccepted && !probe.catchAll
        : probe.syntaxValid && probe.domainValid;
}

async function legacyVerifyEmailDomain(email: string, isGuessed: boolean = false): Promise<boolean> {
    if (!EMAIL_REGEX.test(email)) {
        console.log(`  ❌ Invalid syntax: ${email}`);
        return false;
    }
    
    const domain = email.split('@')[1];
    try {
        // v28.2: Use DoH to bypass local DNS restrictions
        const dohRes = await axios.get(`https://dns.google/resolve?name=${domain}&type=MX`, { timeout: 8000 });
        const mxRecords = dohRes.data.Answer || [];
        
        if (mxRecords.length === 0) {
            console.log(`  ❌ [DOH] No MX records for ${domain}. Domain likely inactive.`);
            return false;
        }
    } catch (err: any) {
        console.log(`  📡 [DOH] DNS-over-HTTPS check failed for ${domain}. Proceeding with caution.`);
    }

    try {
        console.log(`  🔍 Verifying mailbox: ${email}...`);
        const { exists, isCatchAll, portBlocked } = await verifyMailbox(email);
        
        // ── HARDENED v13.1 LOGIC ──
        if (portBlocked) {
            // If Port 25 is blocked, we can't confirm the mailbox exists.
            // If we GUESSED this email (Deep Pattern Probe), we REJECT it to avoid fake leads.
            if (isGuessed) {
                console.log(`  📡 [BLOCK] Port 25 restricted. Rejecting GUESSED pattern: ${email}`);
                return false;
            }
            // If we SCRAPED it from a real page, we can fallback to "likely exists" because the domain has MX.
            console.log(`  📡 [BLOCK] Port 25 restricted. Trusting SCRAPED email via MX-existence: ${email}`);
            return true;
        }

        if (!exists) {
            console.log(`  ⛔ Mailbox Rejected by SMTP: ${email}`);
            return false;
        }

        if (isCatchAll) {
            console.log(`  🕵️ Catch-All Detected for ${domain}. Proceeding.`);
            return true;
        }

        return true;
    } catch (e: any) {
        console.log(`  ⚠️ Verification system error for ${email}: ${e.message}.`);
        return !isGuessed; // Only trust if not guessed
    }
}

export interface EnrichmentData {
    companyName: string | null;
    website?: string | null;
    email: string | null;
    mobile?: string | null;
    mobile_number: string | null;
    phone?: string | null;
    contact_name: string | null;
    linkedin_url: string | null;
    aboutText?: string;
    scrapedText?: string;
    tech_stack?: string[];
    relevant?: boolean;
    relevance_score?: number;
    contacts?: EnrichedContact[];
    email_source?: 'decision_maker' | 'website' | 'osint' | 'pattern' | null;
    email_verified?: boolean;
    email_is_fallback?: boolean;
    person_identity_verified?: boolean;
    person_name_confidence?: number;
    role_confidence?: number;
    source_evidence?: ContactEvidence[];
    email_syntax_valid?: boolean;
    email_domain_valid?: boolean;
    email_mailbox_accepted?: boolean;
    email_domain_catch_all?: boolean;
    email_ownership_status?: EmailOwnershipStatus;
    email_ownership_verified?: boolean;
}

export interface ContactEvidence {
    source_url: string;
    excerpt: string;
    evidence_type: 'name_role' | 'name_role_email' | 'linkedin_profile';
}

export interface EnrichedContact {
    full_name: string | null;
    job_title: string | null;
    seniority: string | null;
    department: string | null;
    email: string | null;
    phone?: string | null;
    mobile_number?: string | null;
    linkedin_url: string | null;
    source: string;
    confidence_score: number;
    email_verified: boolean;
    is_decision_maker: boolean;
    person_identity_verified: boolean;
    person_name_confidence: number;
    role_confidence: number;
    source_evidence: ContactEvidence[];
    email_syntax_valid: boolean;
    email_domain_valid: boolean;
    email_mailbox_accepted: boolean;
    email_domain_catch_all: boolean;
    email_ownership_status: EmailOwnershipStatus;
    email_ownership_verified: boolean;
    email_source?: 'decision_maker' | 'website' | 'osint' | 'pattern' | 'google_osint_hunt' | 'company_fallback' | null;
    email_type?: 'person_direct' | 'company_fallback' | null;
}

const DECISION_TITLES = [
    'chief executive officer', 'ceo', 'founder', 'co-founder', 'owner',
    'managing director', 'general manager', 'director', 'partner',
    'head of sales', 'sales director', 'business development manager',
    'procurement manager', 'operations manager', 'commercial manager',
    'marketing manager', 'project manager'
];

const inferSeniority = (title: string | null): string | null => {
    const t = (title || '').toLowerCase();
    if (!t) return null;
    if (['chief', 'ceo', 'founder', 'owner', 'managing director', 'partner'].some(k => t.includes(k))) return 'executive';
    if (t.includes('director') || t.includes('head of')) return 'senior';
    if (t.includes('manager')) return 'manager';
    return 'staff';
};

const inferDepartment = (title: string | null): string | null => {
    const t = (title || '').toLowerCase();
    if (!t) return null;
    if (t.includes('sales') || t.includes('business development') || t.includes('commercial')) return 'sales';
    if (t.includes('procurement') || t.includes('purchase')) return 'procurement';
    if (t.includes('marketing')) return 'marketing';
    if (t.includes('operation') || t.includes('project')) return 'operations';
    if (t.includes('chief') || t.includes('ceo') || t.includes('founder') || t.includes('owner') || t.includes('director')) return 'leadership';
    return null;
};

const cleanPersonName = (name: string): string | null => {
    const assessment = assessPersonName(name);
    return assessment.valid ? assessment.normalizedName : null;
};

const extractDecisionMakersFromText = (text: string, sourceUrl: string): EnrichedContact[] => {
    const contacts = new Map<string, EnrichedContact>();
    const titleAlternation = DECISION_TITLES
        .flatMap(t => {
            const capitalized = t.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            const upper = t.toUpperCase();
            return [t, capitalized, upper];
        })
        .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|');
    const patterns = [
        new RegExp(`\\b([A-Z][a-zA-Z.'-]+(?:\\s+[A-Z][a-zA-Z.'-]+){1,3})\\s*(?:-|–|—|,|\\||:)\\s*(${titleAlternation})\\b`, 'g'),
        new RegExp(`\\b(${titleAlternation})\\s*(?:-|–|—|,|\\||:)\\s*([A-Z][a-zA-Z.'-]+(?:\\s+[A-Z][a-zA-Z.'-]+){1,3})\\b`, 'g')
    ];

    for (const pattern of patterns) {
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(text.slice(0, 12000)))) {
            const titleFirst = DECISION_TITLES.some(t => match?.[1]?.toLowerCase() === t);
            const rawName = titleFirst ? match[2] : match[1];
            const rawTitle = titleFirst ? match[1] : match[2];
            const fullName = cleanPersonName(rawName);
            if (!fullName) continue;
            const nameAssessment = assessPersonName(fullName);
            const jobTitle = rawTitle.replace(/\s+/g, ' ').trim();
            const key = `${fullName.toLowerCase()}|${jobTitle.toLowerCase()}`;
            contacts.set(key, {
                full_name: fullName,
                job_title: jobTitle,
                seniority: inferSeniority(jobTitle),
                department: inferDepartment(jobTitle),
                email: null,
                linkedin_url: null,
                source: 'website_text',
                confidence_score: 88,
                email_verified: false,
                is_decision_maker: true,
                person_identity_verified: nameAssessment.valid,
                person_name_confidence: nameAssessment.confidence,
                role_confidence: 88,
                source_evidence: [{ source_url: sourceUrl, excerpt: `${fullName} - ${jobTitle}`, evidence_type: 'name_role' }],
                email_syntax_valid: false,
                email_domain_valid: false,
                email_mailbox_accepted: false,
                email_domain_catch_all: false,
                email_ownership_status: 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
                email_ownership_verified: false
            });
        }
    }

    return Array.from(contacts.values()).slice(0, 5);
};

const generateEmailGuesses = (fullName: string | null, domainPart: string): string[] => {
    if (!fullName || !domainPart) return [];
    // Strip honorifics / roles / placeholder suffixes that get scraped into the name
    // ("Dr.", "CEO", trailing "Designation") so patterns are generated from the real
    // personal name — otherwise first.last@domain collapses to junk like mr@kumar.com.
    const roleTokens = new Set(['mr','mrs','ms','miss','dr','sir','prof','ceo','coo','cfo','founder','owner','director','managing','partner','chairman','president','presiding','head','executive','chief','designation','lead','and','inc','llc','ltd','llp','fze','fzco','fz','group','general','assistant']);
    let parts = fullName.toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean);
    while (parts.length && roleTokens.has(parts[0])) parts.shift();
    if (parts.length && parts[parts.length - 1] === 'designation') parts.pop();

    // Very short or no clear first+last (e.g. single initials) are not safe to pattern-build.
    if (!parts.length) return [];
    if (parts.length === 1 && parts[0].length < 2) return [];

    const first = parts[0];
    const last = parts[parts.length - 1];
    const firstInitial = first[0];

    if (parts.length === 1) {
        return Array.from(new Set([`${first}@${domainPart}`, `${first[0]}@${domainPart}`]));
    }

    return Array.from(new Set([
        `${first}.${last}@${domainPart}`,
        `${first}@${domainPart}`,
        `${firstInitial}.${last}@${domainPart}`,
        `${firstInitial}${last}@${domainPart}`,
        `${first}${last[0]}@${domainPart}`,
        `${last}.${first}@${domainPart}`
    ]));
};

type PublishedPage = { url: string; source: PublishedEmailSource; html: string; text: string };
type ExplicitEmailAssociation = { email: string; evidence: ContactEvidence };

const findExplicitEmailAssociations = (pages: PublishedPage[]): Map<string, ExplicitEmailAssociation> => {
    const associations = new Map<string, ExplicitEmailAssociation>();
    for (const page of pages) {
        const pageContacts = extractDecisionMakersFromText(page.text, page.url);
        const emails = extractEmailsFromHtml(page.html, page.source)
            .map(item => normalizeEmailCandidate(item.email))
            .filter((email): email is string => Boolean(email) && !isGenericMailbox(email));
        for (const contact of pageContacts) {
            if (!contact.full_name || !contact.job_title) continue;
            const nameIndex = page.text.toLowerCase().indexOf(contact.full_name.toLowerCase());
            if (nameIndex < 0) continue;
            for (const email of emails) {
                const emailIndex = page.text.toLowerCase().indexOf(email.toLowerCase());
                if (emailIndex < 0 || Math.abs(emailIndex - nameIndex) > 450) continue;
                const start = Math.max(0, Math.min(nameIndex, emailIndex) - 100);
                const end = Math.min(page.text.length, Math.max(nameIndex + contact.full_name.length, emailIndex + email.length) + 100);
                const excerpt = page.text.slice(start, end).replace(/\s+/g, ' ').trim();
                if (!excerpt.toLowerCase().includes(contact.job_title.toLowerCase())) continue;
                associations.set(contact.full_name.toLowerCase(), {
                    email,
                    evidence: { source_url: page.url, excerpt: excerpt.slice(0, 500), evidence_type: 'name_role_email' }
                });
            }
        }
    }
    return associations;
};

const buildContactProfile = async (
    contact: EnrichedContact,
    domainPart: string,
    mobileNumber: string | null,
    phoneNumber: string | null,
    explicitAssociation?: ExplicitEmailAssociation
): Promise<EnrichedContact> => {
    if (explicitAssociation) {
        const probe = await probeMailbox(explicitAssociation.email);
        const sourceEvidence = [...contact.source_evidence, explicitAssociation.evidence];
        const domainMatches = explicitAssociation.email.split('@')[1] === domainPart;
        const ownershipVerified = contact.person_identity_verified && contact.person_name_confidence >= 85
            && contact.role_confidence >= 80 && sourceEvidence.length >= 1 && domainMatches;
        return {
            ...contact,
            email: explicitAssociation.email,
            mobile_number: mobileNumber,
            phone: phoneNumber,
            confidence_score: ownershipVerified ? 96 : contact.confidence_score,
            email_verified: ownershipVerified,
            source: `${contact.source}+explicit_email_source`,
            source_evidence: sourceEvidence,
            email_syntax_valid: probe.syntaxValid,
            email_domain_valid: probe.domainValid,
            email_mailbox_accepted: probe.mailboxAccepted,
            email_domain_catch_all: probe.catchAll,
            email_ownership_status: ownershipVerified ? 'EMAIL_PERSON_OWNERSHIP_VERIFIED' : 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
            email_ownership_verified: ownershipVerified
        };
    }
    const guesses = generateEmailGuesses(contact.full_name, domainPart);
    for (const email of guesses) {
        const probe = await probeMailbox(email);
        if (probe.syntaxValid && probe.domainValid && probe.mailboxAccepted && !probe.catchAll) {
            return {
                ...contact,
                email,
                mobile_number: mobileNumber,
                phone: phoneNumber,
                confidence_score: Math.max(contact.confidence_score, 90),
                email_verified: true,
                source: `${contact.source}+smtp_handshake_verified`,
                email_syntax_valid: true,
                email_domain_valid: true,
                email_mailbox_accepted: true,
                email_domain_catch_all: false,
                email_ownership_status: 'EMAIL_PERSON_OWNERSHIP_VERIFIED',
                email_ownership_verified: true
            };
        }
    }

    // If no personal pattern passed SMTP handshake, fallback to company mailbox or leave unverified
    const fallbackEmail = (contact as any).company_email || contact.email || null;
    return {
        ...contact,
        email: fallbackEmail,
        mobile_number: mobileNumber,
        phone: phoneNumber,
        confidence_score: fallbackEmail ? Math.max(contact.confidence_score, 60) : contact.confidence_score,
        email_syntax_valid: Boolean(fallbackEmail),
        email_domain_valid: Boolean(fallbackEmail),
        email_ownership_status: fallbackEmail ? 'EMAIL_COMPANY_MAILBOX' : 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
        email_ownership_verified: false
    } as any;
};

const pickBestContactEmail = (contacts: EnrichedContact[]): string | null => {
    return contacts
        .filter(c => c.email && (c.email_ownership_verified || c.email_syntax_valid || (c.confidence_score && c.confidence_score >= 40)))
        .sort((a, b) => b.confidence_score - a.confidence_score)[0]?.email || null;
};

const buildFreeDecisionContacts = async (
    domainPart: string,
    allText: string,
    pages: PublishedPage[],
    mobileNumber: string | null,
    phoneNumber: string | null,
    execData: { name: string | null; linkedin: string | null },
    companyName: string,
    companyFallbackEmail: string | null
): Promise<EnrichedContact[]> => {
    const contacts = pages.flatMap(page => extractDecisionMakersFromText(page.text, page.url));
    const explicitAssociations = findExplicitEmailAssociations(pages);

    if (execData.name || execData.linkedin) {
        const normalizedExecName = cleanPersonName(execData.name || '');
        const execNameIsValid = normalizedExecName
            ? await validateNameWithAI(normalizedExecName, 'Decision maker', companyName, allText)
            : false;
        const existing = normalizedExecName
            ? contacts.find(c => c.full_name?.toLowerCase() === normalizedExecName.toLowerCase())
            : null;
        if (existing && execNameIsValid) {
            existing.linkedin_url = execData.linkedin;
            existing.source = `${existing.source}+search`;
            existing.confidence_score = Math.max(existing.confidence_score, 72);
        } else if (execNameIsValid) {
            contacts.unshift({
                full_name: normalizedExecName,
                job_title: 'Decision maker',
                seniority: execNameIsValid ? 'senior' : null,
                department: 'leadership',
                email: null,
                mobile_number: mobileNumber,
                phone: phoneNumber,
                linkedin_url: execData.linkedin,
                source: 'search_result',
                confidence_score: execData.linkedin ? 70 : 45,
                email_verified: false,
                is_decision_maker: true,
                person_identity_verified: Boolean(execData.linkedin && normalizedExecName),
                person_name_confidence: execData.linkedin ? 88 : 0,
                role_confidence: 50,
                source_evidence: execData.linkedin && normalizedExecName ? [{ source_url: execData.linkedin, excerpt: `${normalizedExecName} - public professional profile`, evidence_type: 'linkedin_profile' }] : [],
                email_syntax_valid: false,
                email_domain_valid: false,
                email_mailbox_accepted: false,
                email_domain_catch_all: false,
                email_ownership_status: 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
                email_ownership_verified: false
            });
        }
    }

    const uniqueContacts = Array.from(
        new Map(contacts.filter(c => c.full_name).map(c => [`${c.full_name}|${c.linkedin_url || ''}`, c])).values()
    ).slice(0, 5);

    const enriched: EnrichedContact[] = [];
    for (const contact of uniqueContacts) {
        if (!contact.full_name) continue;
        const aiResult = await sanitizeAndValidateNameWithAI(contact.full_name, contact.job_title, companyName, allText);
        if (!aiResult.valid || !aiResult.cleanName) continue;
        contact.full_name = aiResult.cleanName;
        enriched.push(await buildContactProfile(contact, domainPart, mobileNumber, phoneNumber, explicitAssociations.get(contact.full_name.toLowerCase())));
    }

    // TIER 2 + TIER 3 — Fill the gaps for DMs that have a name/title but no direct email.
    // Tier 2: OSINT hunt for a person-level email/LinkedIn. Tier 3: fall back to the
    // company's verified primary inbox + phone so no decision-maker row is left blank.
    for (const c of enriched) {
        const hasLinkedIn = Boolean(c.linkedin_url && String(c.linkedin_url).trim() !== '');
        // Root-cause guard: buildContactProfile slotted a generic mailbox into EVERY DM
        // (contact.email is often info@/email@/sales@), so the old `hasEmail` gate was
        // true for every record and the published-email hunt never ran. Track "is there a
        // REAL person-verified inbox yet" instead of "any non-empty string".
        const alreadyVerifiedPerson = c.email_ownership_status === 'EMAIL_PERSON_OWNERSHIP_VERIFIED' || c.email_ownership_verified === true;
        if (!c.full_name) continue;

        // TIER 2a — Role-aware decision-maker discovery. If a person was found with a
        // specific title on the site but no LinkedIn yet, Google "Company Name" "<their
        // position>" to surface the actual exec + their LinkedIn (per the operator flow).
        if (!hasLinkedIn && c.job_title) {
            const byRole = await discoverExecutive(companyName, [c.job_title]);
            // IDENTITY GUARD: discoverExecutive returns { name, linkedin } — both drawn
            // from the SAME search result, so they already belong to one profile. Only
            // bind the LinkedIn when a name is present AND that name reconciles with the
            // DM's scraped name. A role-aware search can return a DIFFERENT executive at
            // the same company (e.g. Vincitore's 10 decision makers) — gluing that URL
            // onto a different DM's name is the Vincitore mismatch we must prevent.
            if (byRole.linkedin && byRole.name) {
                const resolvedName = stripBrandTokensFromName(byRole.name, companyName) || byRole.name;
                const nameAgrees = personNamesMatch(resolvedName, c.full_name);
                if (nameAgrees) {
                    c.linkedin_url = byRole.linkedin;
                    c.person_identity_verified = true;
                } else {
                    console.log(`  ⚠️ [TIER 2a] DISCARDED LinkedIn ${byRole.linkedin} (${resolvedName}) — does not match DM ${c.full_name}`);
                }
            }
        }

        // TIER 2 — Published-email hunt (regated). The actual blocker: buildContactProfile
        // pre-fills a scraped generic mailbox (info@/email@/sales@) into `c.email` for nearly
        // every DM, so the old `!hasEmail` gate was ALWAYS false and this hunt NEVER ran —
        // which is why the new pipeline produced 0 verified DMs. Now it runs whenever the DM
        // does NOT yet hold a person-verified inbox (even if a generic mailbox is present),
        // and SMTP-verifies a surfaced address so a real published first.last replaces it.
        if (!alreadyVerifiedPerson && c.full_name) {
            console.log(`  🔎 [TIER 2] OSINT hunt "${c.full_name}" (${c.job_title || '?'}) @ ${companyName} — current email: ${c.email || 'none'}`);
            const hunt = await huntPersonOSINT(c.full_name, companyName);
            if (hunt.email || hunt.linkedin) console.log(`  🔬 [TIER 2] hunt for ${c.full_name} -> email=${hunt.email || '-'} linkedin=${hunt.linkedin || '-'}`);
            // IDENTITY GUARD: huntPersonOSINT returns the FIRST linkedin URL scraped from
            // the DDG page — which may be ANY person's profile at the target company, not
            // necessarily this DM. huntPersonOSINT already pre-validated the link by fuzzy
            // name-match against c.full_name (or surfaced a company/post URL for this person).
            // Only reject a hunt link when it is a PARSEABLE profile slug that clearly does
            // NOT match — unparseable company/post URLs are recovered link sources.
            if (hunt.linkedin && !c.linkedin_url) {
                const slugName = personNameFromLinkedInUrl(hunt.linkedin);
                const isCompanyPost = hunt.linkedin.includes('linkedin.com/company/') || hunt.linkedin.includes('linkedin.com/posts/');
                const huntNameAgrees = !slugName ? true : personNamesMatch(slugName, c.full_name);
                if (huntNameAgrees || isCompanyPost) {
                    c.linkedin_url = hunt.linkedin;
                } else {
                    console.log(`  ⚠️ [TIER 2] DISCARDED hunt LinkedIn ${hunt.linkedin} (slug ${slugName || '?'}) — does not match ${c.full_name}`);
                }
            }
            if (hunt.email) {
                const probe = await probeMailbox(hunt.email);
                const accepted = probe.syntaxValid && probe.domainValid && probe.mailboxAccepted && !probe.catchAll;
                c.email = hunt.email;
                c.email_source = 'google_osint_hunt';
                c.email_mailbox_accepted = probe.mailboxAccepted;
                c.email_verified = accepted;
                c.person_identity_verified = Boolean(c.linkedin_url || accepted);
                c.person_name_confidence = Math.max(c.person_name_confidence, 78);
                c.email_syntax_valid = probe.syntaxValid;
                c.email_domain_valid = probe.domainValid;
                c.email_domain_catch_all = probe.catchAll;
                c.email_ownership_status = accepted ? 'EMAIL_PERSON_OWNERSHIP_VERIFIED' : 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED';
                c.email_ownership_verified = accepted;
                c.source = `${c.source}+google_osint_hunt`;
                c.confidence_score = accepted ? Math.max(c.confidence_score, 92) : Math.min((c.confidence_score || 0) + 5, 92);
            }
        }

        // TIER 3 — Company primary-email fallback so the record is never blank.
        const stillNoEmail = !Boolean(c.email && String(c.email).trim() !== '');
        if (stillNoEmail && companyFallbackEmail) {
            c.email = companyFallbackEmail;
            c.email_type = 'company_fallback';
            c.email_source = 'company_fallback';
            c.email_ownership_status = 'EMAIL_COMPANY_MAILBOX';
            c.email_ownership_verified = false;
            c.email_syntax_valid = true;
            c.email_domain_valid = true;
            c.phone = c.phone || phoneNumber;
            c.mobile_number = c.mobile_number || mobileNumber;
            c.source = `${c.source}+company_fallback`;
            console.log(`  📮 [TIER 3] ${c.full_name} (${c.job_title}) -> company fallback ${companyFallbackEmail}`);
        }
    }
    return enriched.sort((a, b) => b.confidence_score - a.confidence_score);
};

const companyMatchTokens = (value: string): string[] => {
    const stop = new Set([
        'llc', 'ltd', 'limited', 'company', 'co', 'group', 'holding', 'holdings', 'properties',
        'property', 'real', 'estate', 'interior', 'fitout', 'dubai', 'uae', 'the', 'and', 'in'
    ]);
    return String(value || '')
        .toLowerCase()
        .replace(/&amp;/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .split(/\s+/)
        .filter(token => token.length >= 4 && !stop.has(token));
};

/**
 * Strips the company's own brand tokens out of a scraped executive name.
 * The Vincitore bug: the scraper glued the brand onto the person's name, so a
 * LinkedIn title looked like "Vincitore Veer Vijay Doshi" and that whole string
 * was adopted as the DM's name. Remove brand tokens (word-boundary, non-legal,
 * >=4 chars, not in the stop set) so "Vincitore Veer Vijay Doshi" -> "Veer Vijay Doshi".
 * Returns the cleaned name, or the original if nothing brandy was present.
 */
const stripBrandTokensFromName = (name: string | null, companyName: string | null): string => {
    const cleaned = String(name || '').trim();
    if (!cleaned || !companyName) return cleaned;
    const brandTokens = companyMatchTokens(companyName);
    if (brandTokens.length === 0) return cleaned;
    let out = cleaned;
    for (const token of brandTokens) {
        // Word-boundary replace, case-insensitive; drop the token anywhere it appears
        out = out.replace(new RegExp(`\\b${token}\\b`, 'gi'), ' ');
    }
    return out.replace(/\s+/g, ' ').trim() || cleaned;
};

const linkedinResultMatchesCompany = (companyName: string, titleText: string, snippetText: string = ''): boolean => {
    const haystack = `${titleText || ''} ${snippetText || ''}`.toLowerCase();
    const tokens = companyMatchTokens(companyName);
    if (tokens.length === 0) return false;
    return tokens.some(token => haystack.includes(token));
};

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

/**
 * Resolves a LinkedIn search-result URL (profile /in/, company /company/, or post
 * /posts/ URLs) into an authoritative person name + linkedin URL pair.
 *
 * v2 — Identity-safe + link-recovery:
 *  - Personal profile URLs (/in/) derive the name from the URL slug FIRST (canonical,
 *    brand-free, same-profile), falling back to the sanitized title text.
 *  - Company + post URLs (linkedin.com/company/*, linkedin.com/posts/*) are ALSO
 *    accepted when the title/snippet contains the person's name AND the target
 *    company — many decision-makers surface via a company page or post, not a profile.
 *  - The returned name + linkedin always come from the SAME result so they cannot be
 *    stitched to a different founder.
 */
async function resolveLinkedInResult(href: string, titleText: string, snippetText: string, cleanComp: string): Promise<{ name: string | null; linkedin: string | null }> {
    const isProfile = href.includes('linkedin.com/in/');
    const isCompanyPost = href.includes('linkedin.com/company/') || href.includes('linkedin.com/posts/');
    if (!isProfile && !isCompanyPost) return { name: null, linkedin: null };

    const url = href.startsWith('http') ? href : `https://${href}`;
    // For /in/ profiles, the slug is the canonical name of the SAME profile.
    if (isProfile) {
        const slugName = personNameFromLinkedInUrl(url);
        if (slugName) {
            const cleanSlug = stripBrandTokensFromName(slugName, cleanComp);
            const aiResult = await sanitizeAndValidateNameWithAI(cleanSlug, 'Executive', cleanComp, snippetText);
            if (aiResult.valid && aiResult.cleanName) {
                return { name: aiResult.cleanName, linkedin: url };
            }
        }
    }

    // Fall back to the title-text name (covers /in/ with an unparseable slug AND
    // company/post URLs where the person is named in the title).
    if (!linkedinResultMatchesCompany(cleanComp, titleText, snippetText)) return { name: null, linkedin: null };
    const parts = titleText.split(/[-|]/);
    const rawName = parts[0]?.trim();
    if (rawName) {
        const aiResult = await sanitizeAndValidateNameWithAI(rawName, 'Executive', cleanComp, snippetText);
        if (aiResult.valid && aiResult.cleanName) {
            return { name: aiResult.cleanName, linkedin: url };
        }
    }
    return { name: null, linkedin: null };
}

const discoverExecutive = async (companyName: string, roles: string[] = []): Promise<{name: string | null, linkedin: string | null}> => {
    try {
        const cleanComp = companyName.replace(/\b(llc|l\.l\.c|fzco|fze|inc|corp|ltd|group|holding|holdings)\b/gi, '').trim();
        // If a specific position is known from the website, search "Company" "<that position>";
        // otherwise fall back to the generic C-level directive set.
        const roleClause = roles.length
            ? roles.map(r => `"${r}"`).join(' OR ')
            : '"CEO" OR "Founder" OR "Managing Director" OR "Owner"';
        const queries = [
            `site:linkedin.com/in/ "${cleanComp}" ${roleClause}`,
            `site:linkedin.com/company/ OR site:linkedin.com/posts/ "${cleanComp}" ${roleClause}`,
            `"${cleanComp}" ${roleClause} LinkedIn`,
            `"${cleanComp}" ${roleClause} UAE LinkedIn`
        ];

        let name: string | null = null;
        let linkedin: string | null = null;

        for (const query of queries) {
            if (name && linkedin) break;

            // Try Bing Search first for LinkedIn profiles
            try {
                const bingRes = await axios.get(`https://www.bing.com/search?q=${encodeURIComponent(query)}&count=10`, {
                    headers: {
                        'User-Agent': randomUA(),
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Referer': 'https://www.bing.com/',
                    },
                    timeout: 7000,
                });

                const $bing = cheerio.load(bingRes.data);
                for (const el of $bing('li.b_algo h2 a').toArray()) {
                    if (name && linkedin) break;
                    const href = $bing(el).attr('href') || '';
                    const titleText = $bing(el).text() || '';
                    const parent = $bing(el).closest('li.b_algo');
                    const snippetText = parent.text() || '';
                    const resolved = await resolveLinkedInResult(href, titleText, snippetText, cleanComp);
                    if (resolved.name && resolved.linkedin) {
                        name = resolved.name;
                        linkedin = resolved.linkedin;
                    }
                }
            } catch {}

            if (name && linkedin) break;

            // DuckDuckGo fallback
            try {
                const res = await axios.get(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
                    headers: { 'User-Agent': randomUA() },
                    timeout: 7000,
                });

                const $ = cheerio.load(res.data);
                for (const el of $('.result__body').toArray()) {
                    if (name && linkedin) break;
                    const a = $(el).find('.result__a');
                    let href = a.attr('href') || '';
                    if (href.includes('uddg=')) {
                        href = decodeURIComponent(href.split('uddg=')[1].split('&')[0]);
                    }
                    const titleText = a.text() || '';
                    const snippetText = $(el).find('.result__snippet').text() || $(el).text() || '';
                    const resolved = await resolveLinkedInResult(href, titleText, snippetText, cleanComp);
                    if (resolved.name && resolved.linkedin) {
                        name = resolved.name;
                        linkedin = resolved.linkedin;
                    }
                }
            } catch {}
        }

        return { name, linkedin };
    } catch (e) {
        return { name: null, linkedin: null };
    }
};

export const deepEmailSearch = async (companyName: string, domain: string): Promise<string[]> => {
  const emails: string[] = [];
  try {
    const query = `"${companyName}" contact email "@${domain}"`;
    const res = await axios.get(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': randomUA() },
      timeout: 10000,
    });
    const $ = cheerio.load(res.data);
    const text = $('body').text().toLowerCase();
    
    // Regex for emails on the target domain
    const emailRegex = new RegExp(`[a-z0-9._%+-]+@${domain.replace('.', '\\.')}`, 'gi');
    const matches = text.match(emailRegex);
    if (matches) emails.push(...matches);
    
    // Also check snippets specifically
    $('.result__snippet').each((_, el) => {
      const snippet = $(el).text().toLowerCase();
      const sMatches = snippet.match(emailRegex);
      if (sMatches) emails.push(...sMatches);
    });
  } catch (err) {}
  return Array.from(new Set(emails.map(e => e.toLowerCase())));
};

export const osintEmailSearch = async (companyName: string, domain: string): Promise<string | null> => {
    try {
        const query = encodeURIComponent(`"${companyName}" email OR contact "@${domain.replace('www.', '')}"`);
        const res = await axios.get(`https://html.duckduckgo.com/html/?q=${query}`, {
            headers: { 'User-Agent': randomUA() },
            timeout: 8000,
        });
        
        const emails: string[] = res.data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
        const unique: string[] = Array.from(new Set(emails.map((e: string) => e.toLowerCase())));
        // Strict TLD gate: normalizeEmailCandidate enforces the VALID_EMAIL_TLD allowlist,
        // rejecting corrupted tails like .comuae / .comvie that STRICT_TLD_TAIL lets through.
        const clean = unique
            .filter((e: string) => !!normalizeEmailCandidate(e))
            .filter((e: string) => !e.includes('xxx') && !e.includes('example.com') && !e.includes('.png') && !e.includes('duckduckgo.com'));
        
        const domainMatch = clean.find((e: string) => e.includes(domain.replace('www.', '')));
        if (domainMatch) {
            console.log(`  🎯 OSINT Domain Match Found: ${domainMatch}`);
            return domainMatch;
        }
        
        console.log(`  ⚠️ OSINT found ${clean.length} emails, but NONE matched the domain "${domain}". Rejecting all.`);
        return null;

    } catch (e) {
        return null;
    }
};

/**
 * TIER 2 — Google/OSINT fallback hunt for a single decision maker.
 * When a DM (name + title) is found on the site but has no direct email/LinkedIn,
 * run a web search for `"${personName}" "${companyName}" email OR linkedin` and
 * surface any public email or LinkedIn profile that turns up.
 * Returns `{ email, linkedin }` — both null if nothing credible found.
 */
const huntPersonOSINT = async (personName: string, companyName: string): Promise<{ email: string | null; linkedin: string | null }> => {
    try {
        // v2: also target company (+posts) pages where the person + title surface,
        // not just public profile pages — many DMs are found only via company activity.
        const query = encodeURIComponent(`"${personName}" "${companyName}" linkedin`);
        const res = await axios.get(`https://html.duckduckgo.com/html/?q=${query}`, {
            headers: { 'User-Agent': randomUA() },
            timeout: 10000,
        });
        const text = String(res.data || '');
        const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
        // Strict TLD gate: filterEmailCandidate() enforces the VALID_EMAIL_TLD allowlist so
        // corrupted tails (.comuae/.comvie) never surface from the open-web hunt.
        const uniqueEmails = Array.from(new Set(emails.map((e: string) => e.toLowerCase())))
            .filter((e: string) => !!normalizeEmailCandidate(e))
            .filter(e => !e.includes('xxx') && !e.includes('example.com') && !e.includes('.png') && !e.includes('duckduckgo.com') && !e.includes('wixpress.com'));
        const email = uniqueEmails.find(e => !/^(image|img|www|redirect|email)/.test(e)) || uniqueEmails[0] || null;

        // Gather every linkedin URL: profile (/in/), company (/company/), and posts (/posts/).
        const linkedinMatch = text.match(/https?:\/\/(?:www\.|[\w-]+\.)?linkedin\.com\/(?:in|company|posts)\/[a-zA-Z0-9_\-%]+/g) || [];
        let linkedin: string | null = null;
        for (const url of linkedinMatch) {
            // Prefer a profile whose slug fuzzily equals the person's name; else accept a
            // company/post URL (still a valid, clickable source for the decision-maker).
            const slugName = personNameFromLinkedInUrl(url);
            if (slugName && personNamesMatch(slugName, personName)) {
                linkedin = url;
                break;
            }
        }
        // If no name-matching profile, fall back to the first credible shareable link.
        if (!linkedin && linkedinMatch.length > 0) linkedin = linkedinMatch[0];

        if (email || linkedin) console.log(`  🔬 [OSINT HUNT] "${personName}" @ ${companyName} -> ${email || 'no email'} ${linkedin ? '| linkedin' : ''}`);
        return { email, linkedin };
    } catch {
        return { email: null, linkedin: null };
    }
};

async function fetchPage(url: string): Promise<string> {
    if (isBrowserUnsafeDocumentUrl(url)) {
        console.log(`  [SPECIALIST] Skipping document URL: ${url}`);
        return '';
    }
    const configs = [
        {
            'User-Agent': randomUA(),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
        },
        { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
    ];
    const urls = [url];
    if (url.startsWith('https://')) urls.push(url.replace('https://', 'http://'));
    else if (url.startsWith('http://')) urls.push(url.replace('http://', 'https://'));

    for (const tryUrl of urls) {
        for (const headers of configs) {
            try {
                const res = await axios.get(tryUrl, { headers, timeout: 20000, maxRedirects: 5, responseType: 'text', maxContentLength: 750000 });
                const contentType = String(res.headers?.['content-type'] || '').toLowerCase();
                if (contentType.includes('application/pdf') || contentType.includes('application/octet-stream')) return '';
                if (res.data && typeof res.data === 'string' && res.data.length > 100) {
                    return res.data;
                }
            } catch {}
        }
    }

    console.log(`  🔓 Axios blocked on ${url}. Launching stealth browser fallback...`);
    let browser: any;
    try {
        // Hard 30s timeout — if the browser hangs for any reason, give up and move on
        const stealthResult = await Promise.race([
            (async () => {
                browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
                // Use domcontentloaded — much faster than networkidle2, works on slow sites
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
                const html = await page.content();
                await browser.close();
                browser = null;
                return html;
            })(),
            new Promise<string>((_, reject) => setTimeout(() => reject(new Error('30s hard timeout')), 30000))
        ]);
        if (stealthResult && stealthResult.length > 100) {
            console.log(`  ✅ Stealth browser got ${stealthResult.length} chars from ${url}`);
            return stealthResult;
        }
    } catch (e: any) {
        console.log(`  ⚠️ Stealth browser fallback failed: ${e.message?.slice(0, 80)}`);
        if (browser) try { await browser.close(); } catch {}
        browser = null;
    }
    return '';
}

function stripHtml(html: string): string {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export const enrichCompanyData = async (companyName: string, domain: string): Promise<EnrichmentData> => {
    console.log(`🔎 ENRICHMENT v13.1: ${companyName} (${domain})`);
    
    const domainClean = domain.replace(/\/$/, '').toLowerCase();
    let baseUrl = domainClean;
    if (!baseUrl.startsWith('http')) baseUrl = 'https://' + baseUrl;
    
    try {
        const urlObj = new URL(baseUrl);
        baseUrl = urlObj.origin;
    } catch {
        // leave baseUrl as-is
    }
    const domainPart = baseUrl.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
    
    const isOfficial = (e: string) => {
        const emailDomain = e.toLowerCase().split('@')[1];
        return emailDomain && (emailDomain.includes(domainPart) || domainPart.includes(emailDomain.split('.')[0]));
    };
    
    const forbiddenDomains = [
        'yellowpages.ae', 'zawya.com', 'lseg.com', 'dnb.com', 'bizapedia.com',
        'zaubacorp.com', 'emaratfinder.com', 'kompass.com', 'w3.org', 'schema.org',
        'example.com', 'google.com', 'bing.com', 'yahoo.com', 'searx.be',
        'wixsite.com', 'wordpress.com', 'github.com', 'sentry.io', 'wixpress.com',
        'sentry-next.wixpress.com', 'wix.com'
    ];

    let allText = '';
    let allEmails: { email: string; source: PublishedEmailSource }[] = [];
    const publishedPages: PublishedPage[] = [];
    let publishedMobile: string | null = null;
    let publishedPhone: string | null = null;

    const execPromise = discoverExecutive(companyName);

    try {
        console.log(`  🎯 [SPECIALIST] Analyzing Footer & Contact Page for ${domainClean}...`);
        
        const homeHtml = await fetchPage(baseUrl);
        const foundOnHome = homeHtml ? extractEmailsFromHtml(homeHtml, 'home') : [];
        const homePhones = extractPublishedPhones(homeHtml);
        publishedMobile = homePhones.mobile_number;
        publishedPhone = homePhones.phone;
        allEmails.push(...foundOnHome);
        if (!homeHtml || homeHtml.length < 500) {
            console.log(`  ❌ [SPECIALIST] Home Page unreachable or too thin (${homeHtml?.length || 0} chars) for ${baseUrl}. ABORTING.`);
            return { companyName, website: domain, email: foundOnHome[0]?.email || null, mobile: homePhones.mobile_number, mobile_number: homePhones.mobile_number, phone: homePhones.phone, contact_name: null, linkedin_url: null, aboutText: 'Unreachable', relevant: false, contacts: [], email_source: foundOnHome[0]?.email ? 'website' : null, email_verified: false, email_is_fallback: Boolean(foundOnHome[0]?.email) };
        }

        const $ = cheerio.load(homeHtml);
        const lowerHtml = homeHtml.toLowerCase();
        
        // v29.2: Parking Page & Suspended Detector
        const redFlags = ['suspended', 'parked', 'under construction', 'coming soon', 'domain is for sale', 'buy this domain', 'hostinger.com/suspended', 'account suspended'];
        if (redFlags.some(flag => lowerHtml.includes(flag))) {
            console.log(`  ⛔ [REJECTED] Domain Parked/Suspended: ${baseUrl}. Skipping.`);
            return { companyName, website: domain, email: foundOnHome[0]?.email || null, mobile: homePhones.mobile_number, mobile_number: homePhones.mobile_number, phone: homePhones.phone, contact_name: null, linkedin_url: null, aboutText: 'Parked/Suspended', relevant: false, contacts: [], email_source: foundOnHome[0]?.email ? 'website' : null, email_verified: false, email_is_fallback: Boolean(foundOnHome[0]?.email) };
        }

        allText = stripHtml(homeHtml).slice(0, 10000);
        publishedPages.push({ url: baseUrl, source: 'home', html: homeHtml, text: allText });

        // Capture public company mailboxes before the AI relevance gate. Relevance
        // controls outreach eligibility, but must not erase useful contact data.
        // v29.1: Mandatory AI Relevance Check BEFORE discovery
        console.log(`  🤖 [SPECIALIST] Verifying B2B Relevance for ${companyName}...`);
        const relevanceResult = await checkAIRelevance(companyName, allText);
        if (!relevanceResult.relevant) {
            console.log(`  ⛔ [REJECTED] Irrelevant entity. Reason: ${relevanceResult.reason}`);
            return {
                companyName,
                website: domain,
                email: foundOnHome[0]?.email || null,
                mobile: homePhones.mobile_number,
                mobile_number: homePhones.mobile_number,
                phone: homePhones.phone,
                contact_name: null,
                linkedin_url: null,
                aboutText: allText,
                relevant: false,
                relevance_score: relevanceResult.score,
                contacts: [],
                email_source: foundOnHome[0]?.email ? 'website' : null,
                email_verified: false,
                email_is_fallback: Boolean(foundOnHome[0]?.email)
            };
        }
        console.log(`  ✅ [RELEVANT] B2B Entity Confirmed. Reason: ${relevanceResult.reason}`);
        
        const internalPages = new Map<string, PublishedEmailSource>();
        $('a[href]').each((_, el) => {
            const href = $(el).attr('href') || '';
            const hint = `${$(el).text() || ''} ${href}`.toLowerCase();
            let source: PublishedEmailSource | null = null;
            if (/contact|support|get[ -]?in[ -]?touch/.test(hint)) source = 'contact';
            else if (/leadership|management|executive|director/.test(hint)) source = 'leadership';
            else if (/team|people|staff/.test(hint)) source = 'team';
            else if (/about|company/.test(hint)) source = 'about';
            if (!source || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            try {
                const pageUrl = new URL(href, baseUrl);
                if (pageUrl.origin === new URL(baseUrl).origin) {
                    pageUrl.hash = '';
                    if (isBrowserUnsafeDocumentUrl(pageUrl.href)) return;
                    internalPages.set(pageUrl.href, source);
                }
            } catch { /* Ignore malformed navigation links. */ }
        });

            const pageSourcePriority: Record<PublishedEmailSource, number> = { contact: 0, leadership: 1, team: 2, about: 3, home: 4, osint: 5 };
            const pagesToScan = Array.from(internalPages.entries())
                .sort((a, b) => pageSourcePriority[a[1]] - pageSourcePriority[b[1]])
                .slice(0, 6);
            for (const fallbackPath of ['/contact', '/contact-us']) {
                const fallbackUrl = new URL(fallbackPath, baseUrl).href;
                if (!pagesToScan.some(([url]) => url === fallbackUrl)) pagesToScan.push([fallbackUrl, 'contact']);
            }

            for (const [pageUrl, source] of pagesToScan.slice(0, 7)) {
                const contactLink = pageUrl;
                if (isBrowserUnsafeDocumentUrl(contactLink)) {
                    console.log(`  [SPECIALIST] Skipping document link during browser scan: ${contactLink}`);
                    continue;
                }
                console.log(`  📡 [SPECIALIST] Launching Stealth Scan on Contact Page: ${contactLink}`);
                const contactHtml = await fetchPage(pageUrl);
                if (contactHtml) {
                    const foundOnContact = extractEmailsFromHtml(contactHtml, source);
                    allEmails.push(...foundOnContact);
                    const contactPhones = extractPublishedPhones(contactHtml);
                    publishedMobile ||= contactPhones.mobile_number;
                    publishedPhone ||= contactPhones.phone;
                    const contactText = stripHtml(contactHtml).slice(0, 8000);
                    allText += `\n${contactText}`;
                    publishedPages.push({ url: pageUrl, source, html: contactHtml, text: contactText });
                }
            }

        const mobile_number = publishedMobile || extractMobile(allText);
        const phone = publishedPhone;
        const execData = await execPromise;
        // Company's verified primary domain email — used as TIER 3 fallback so every
        // decision-maker record carries a working inbox instead of a blank "No email".
        const companyFallbackEmail = (() => {
            const candidates = Array.from(new Set(allEmails.map(e => e.email)))
                .filter(e => normalizeEmailCandidate(e) && !forbiddenDomains.some(d => e.includes(d)))
                .filter(e => {
                    if (e.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|js|css|pdf)$/)) return false;
                    if (e.includes('%') || e.includes(' ') || e.includes('\t')) return false;
                    const emailDomain = e.split('@')[1].toLowerCase();
                    const isMatch = emailDomain.includes(domainPart) || domainPart.includes(emailDomain.split('.')[0]);
                    return isMatch;
                })
                .sort((a, b) => scoreEmail(b) - scoreEmail(a));
            return candidates[0] || null;
        })();
        const decisionContacts = await buildFreeDecisionContacts(domainPart, allText, publishedPages, mobile_number, phone, execData, companyName, companyFallbackEmail);
        const bestDecisionContact = decisionContacts
            .filter(contact => contact.email && (contact.email_ownership_verified || contact.email_syntax_valid || (contact.confidence_score && contact.confidence_score >= 40)))
            .sort((a, b) => b.confidence_score - a.confidence_score)[0];
        const bestDecisionEmail = pickBestContactEmail(decisionContacts);
        const ownershipFields: Partial<EnrichmentData> = bestDecisionContact ? {
            person_identity_verified: bestDecisionContact.person_identity_verified,
            person_name_confidence: bestDecisionContact.person_name_confidence,
            role_confidence: bestDecisionContact.role_confidence,
            source_evidence: bestDecisionContact.source_evidence,
            email_syntax_valid: bestDecisionContact.email_syntax_valid,
            email_domain_valid: bestDecisionContact.email_domain_valid,
            email_mailbox_accepted: bestDecisionContact.email_mailbox_accepted,
            email_domain_catch_all: bestDecisionContact.email_domain_catch_all,
            email_ownership_status: bestDecisionContact.email_ownership_status,
            email_ownership_verified: bestDecisionContact.email_ownership_verified
        } : {
            person_identity_verified: false,
            person_name_confidence: 0,
            role_confidence: 0,
            source_evidence: [],
            email_syntax_valid: false,
            email_domain_valid: false,
            email_mailbox_accepted: false,
            email_domain_catch_all: false,
            email_ownership_status: 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
            email_ownership_verified: false
        };
        if (decisionContacts.length > 0) {
            console.log(`  Decision-Maker Free Mode: ${decisionContacts.length} profile(s) found.`);
        }
        if (mobile_number) console.log(`  📱 Scraped WhatsApp Number: ${mobile_number}`);

        const emailMap = new Map<string, PublishedEmailSource>();
        const sourcePriority: Record<PublishedEmailSource, number> = {
            leadership: 6,
            team: 5,
            contact: 4,
            about: 3,
            home: 2,
            osint: 1
        };
        for (const entry of allEmails) {
            const currentSource = emailMap.get(entry.email);
            if (!currentSource || sourcePriority[entry.source] > sourcePriority[currentSource]) {
                emailMap.set(entry.email, entry.source);
            }
        }

        const filteredEmails = Array.from(emailMap.keys()).filter(e => {
            if (!e.includes('@') || !e.split('@')[1].includes('.')) return false;
            // Reject corrupted TLD tails (.comvie, .comuae) at the collection choke point.
            // STRICT_TLD_TAIL alone is INSUFFICIENT here: .comvie/.comuae end in an
            // alphabetic run, so /\.[a-z]{2,24}$/ passes them. normalizeEmailCandidate
            // also enforces the VALID_EMAIL_TLD allowlist, which rejects those tails.
            if (!normalizeEmailCandidate(e)) return false;
            if (forbiddenDomains.some(d => e.includes(d))) return false;
            const emailDomain = e.split('@')[1].toLowerCase();
            const source = emailMap.get(e);

            const isMatch = emailDomain.includes(domainPart) || domainPart.includes(emailDomain.split('.')[0]);
            const publicProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'eim.ae', 'emirates.net.ae', 'icloud.com', 'me.com', 'msn.com'];
            const isPublic = publicProviders.includes(emailDomain);
            
            if (!isMatch && !isPublic && source !== 'contact') return false;
            if (e.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|js|css|pdf)$/)) return false;
            if (e.includes('%') || e.includes(' ') || e.includes('\t')) return false;

            const forbiddenPhrases = ['name@', 'test@', 'email@', 'user@', 'admin@', 'info@example', 'support@example', 'johndoe', 'janedoe', 'yourname', 'youremail', 'demo@'];
            if (forbiddenPhrases.some(p => e.includes(p))) return false;

            return true;
        });
        const cleanEmails = filteredEmails.filter(email => {
            const [local, emailDomain] = email.split('@');
            return !filteredEmails.some(other => {
                if (other === email) return false;
                const [otherLocal, otherDomain] = other.split('@');
                if (emailDomain !== otherDomain || !local.endsWith(otherLocal)) return false;
                const accidentalPrefix = local.slice(0, -otherLocal.length);
                return /^(?:on|to|email|mail|chain|\d{3,})$/i.test(accidentalPrefix);
            });
        });
        const publishedFallback = [...cleanEmails]
            .sort((a, b) => scoreEmail(b) - scoreEmail(a))[0] || null;
        
        if (cleanEmails.length === 0) {
            console.log(`  [EMAIL] Website crawl found no safe domain email. Checking OSINT for ${companyName}...`);
            const osintEmail = await osintEmailSearch(companyName, domainPart);
            if (osintEmail && await verifyEmailDomain(osintEmail, false)) {
                console.log(`  🎯 OSINT Found Email: ${osintEmail}`);
                return { 
                    companyName: companyName,
                    email: osintEmail, 
                    mobile_number,
                    phone,
                    contact_name: cleanPersonName(execData.name || '') || cleanPersonName(decisionContacts[0]?.full_name || '') || null, 
                    linkedin_url: execData.linkedin || decisionContacts[0]?.linkedin_url || null, 
                    scrapedText: allText.slice(0, 5000),
                    relevant: true,
                    relevance_score: relevanceResult.score,
                    contacts: decisionContacts,
                    email_source: 'osint',
                    email_verified: false,
                    email_is_fallback: true,
                    email_ownership_status: 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
                    email_ownership_verified: false
                };
            }

            console.log(`  [EMAIL] OSINT found no safe verified match. Running deeper email search for ${domainPart}...`);
            const foundEmails = await deepEmailSearch(companyName, domainPart);
            if (foundEmails.length > 0) {
                for (const email of foundEmails) {
                    if (await verifyEmailDomain(email, true)) {
                        console.log(`  🎯 Deep Hunt UNLOCKED: ${email}`);
                        return { 
                            companyName: companyName,
                            email: email, 
                            mobile_number,
                            phone,
                            contact_name: cleanPersonName(execData.name || '') || cleanPersonName(decisionContacts[0]?.full_name || '') || null, 
                            linkedin_url: execData.linkedin || decisionContacts[0]?.linkedin_url || null, 
                            scrapedText: allText.slice(0, 5000),
                            relevant: true,
                            relevance_score: relevanceResult.score,
                            contacts: decisionContacts,
                            email_source: 'osint',
                            email_verified: false,
                            email_is_fallback: true,
                            email_ownership_status: 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
                            email_ownership_verified: false
                        };
                    }
                }
            }

            console.log(`  [EMAIL] Deep search found no verified match. Testing common mailbox patterns for ${domainPart}...`);
            if (bestDecisionEmail) {
                return {
                    companyName: companyName,
                    email: bestDecisionEmail,
                    mobile_number,
                    contact_name: cleanPersonName(decisionContacts[0]?.full_name || '') || cleanPersonName(execData.name || '') || null,
                    linkedin_url: decisionContacts[0]?.linkedin_url || execData.linkedin,
                    scrapedText: allText.slice(0, 5000),
                    relevant: true,
                    relevance_score: relevanceResult.score,
                    contacts: decisionContacts,
                    email_source: 'decision_maker',
                    email_verified: true,
                    email_is_fallback: false,
                    ...ownershipFields
                };
            }

            // Prefer a VERIFIED direct personal email (first.last@domain) for the top decision
            // maker before falling back to a generic company mailbox (info@/sales@/contact@).
            // Without this, executives with names but no scraped address sit on "COMPANY MAILBOX"
            // even when a real first.last@company.com mailbox exists and accepts mail.
            if (!bestDecisionEmail) {
                const topDM = (decisionContacts || [])
                    .slice()
                    .sort((a: any, b: any) => Number(b.confidence_score || 0) - Number(a.confidence_score || 0))[0];
                const dmName = topDM?.full_name || (execData as any)?.name || null;
                if (dmName) {
                    for (const guess of generateEmailGuesses(dmName, domainPart)) {
                        if (await verifyEmailDomain(guess, true)) {
                            console.log(`  🎯 Direct personal email verified: ${guess}`);
                            return {
                                companyName,
                                email: guess,
                                mobile_number,
                                phone,
                                contact_name: cleanPersonName(execData.name || '') || cleanPersonName(dmName) || null,
                                linkedin_url: topDM?.linkedin_url || execData.linkedin,
                                scrapedText: allText.slice(0, 5000),
                                relevant: true,
                                relevance_score: relevanceResult.score,
                                contacts: decisionContacts,
                                email_source: 'decision_maker',
                                email_verified: true,
                                email_is_fallback: false,
                                email_ownership_status: 'EMAIL_PERSON_OWNERSHIP_VERIFIED',
                                email_ownership_verified: true
                            };
                        }
                    }
                }
            }

            const fallbackPatterns = [`info@${domainPart}`, `sales@${domainPart}`, `contact@${domainPart}`];
            for (const pattern of fallbackPatterns) {
                if (await verifyEmailDomain(pattern, true)) {
                    console.log(`  🎯 Pattern Probe UNLOCKED: ${pattern}`);
                    return { 
                        companyName: companyName,
                        email: pattern, 
                        mobile_number,
                        phone,
                        contact_name: cleanPersonName(execData.name || '') || cleanPersonName(decisionContacts[0]?.full_name || '') || null, 
                        linkedin_url: execData.linkedin || decisionContacts[0]?.linkedin_url || null, 
                        scrapedText: allText.slice(0, 5000),
                        relevant: true,
                        relevance_score: relevanceResult.score,
                        contacts: decisionContacts,
                        email_source: 'pattern',
                        email_verified: false,
                        email_is_fallback: true,
                        email_ownership_status: 'EMAIL_COMPANY_MAILBOX',
                        email_ownership_verified: false
                    };
                }
            }

            console.log(`  [EMAIL] No safe email found for ${companyName}. Keeping company as no_email; no guessed address will be used.`);
            return { companyName: companyName, email: null, mobile_number, phone, contact_name: cleanPersonName(execData.name || '') || cleanPersonName(decisionContacts[0]?.full_name || '') || null, linkedin_url: execData.linkedin || decisionContacts[0]?.linkedin_url || null, scrapedText: allText.slice(0, 5000), relevant: true, relevance_score: relevanceResult.score, contacts: decisionContacts };
        }

        const verifiedEntries: { email: string; source: PublishedEmailSource }[] = [];
        for (const e of cleanEmails) {
            if (await verifyEmailDomain(e, false)) {
                verifiedEntries.push({ email: e, source: emailMap.get(e)! });
            }
        }
        
        let finalEmail = bestDecisionEmail;
        let finalSource: EnrichmentData['email_source'] = bestDecisionEmail ? 'decision_maker' : null;
        let finalVerified = Boolean(bestDecisionEmail);
        let finalFallback = false;

        if (!finalEmail) {
            if (verifiedEntries.length > 0) {
                verifiedEntries.sort((a, b) => scoreEmail(b.email) - scoreEmail(a.email));
                finalEmail = verifiedEntries[0].email;
                finalSource = 'website';
                finalVerified = false;
                finalFallback = true;
            } else if (publishedFallback) {
                finalEmail = publishedFallback;
                finalSource = 'website';
                finalVerified = false;
                finalFallback = true;
                console.log(`  Website fallback retained without verification: ${publishedFallback}`);
            }
        }

        if (!finalEmail) {
            console.log(`  No usable email discovered for ${companyName}`);
            return { companyName: companyName, email: null, mobile_number, phone, contact_name: cleanPersonName(execData.name || '') || cleanPersonName(decisionContacts[0]?.full_name || '') || null, linkedin_url: execData.linkedin || decisionContacts[0]?.linkedin_url || null, scrapedText: allText.slice(0, 5000), relevant: true, relevance_score: relevanceResult.score, contacts: decisionContacts };
        }

        console.log(`  🎯 Best email: ${finalEmail} (score: ${scoreEmail(finalEmail)})`);

        if (execData.name) console.log(`  👔 Identified Executive: ${execData.name}`);

        return {
            companyName: companyName,
            email: finalEmail,
            mobile_number,
            phone,
            contact_name: cleanPersonName(execData.name || '') || cleanPersonName(decisionContacts[0]?.full_name || '') || null,
            linkedin_url: execData.linkedin || decisionContacts[0]?.linkedin_url || null,
            scrapedText: allText.slice(0, 10000),
            relevant: true,
            relevance_score: relevanceResult.score,
            contacts: decisionContacts,
            email_source: finalSource,
            email_verified: finalVerified,
            email_is_fallback: finalFallback,
            ...(finalVerified ? ownershipFields : {
                email_ownership_status: isGenericMailbox(finalEmail) ? 'EMAIL_COMPANY_MAILBOX' : 'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
                email_ownership_verified: false
            })
        };

    } catch (e: any) {
        console.error('Enrichment error:', e.message);
        const execData = await execPromise;
        return { companyName: companyName, email: null, mobile_number: null, contact_name: cleanPersonName(execData.name || ''), linkedin_url: execData.linkedin };
    }
};
