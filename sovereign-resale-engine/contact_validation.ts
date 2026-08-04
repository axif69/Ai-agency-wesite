import { normalizePhone, websiteHostname } from './contact_format';
export { normalizePhone, websiteHostname } from './contact_format';

export type EmailExtractionMethod = 'mailto' | 'json_ld' | 'visible_text' | 'search_result' | 'manual';

export interface ValidatedEmail {
  address: string;
  normalizedAddress: string | null;
  sourceUrl: string;
  extractionMethod: EmailExtractionMethod;
  syntaxValid: boolean;
  mxValid: boolean | null;
  domainMatchesWebsite: boolean;
  confidence: number;
  validationReason?: string;
}

export const EMAIL_OWNERSHIP_STATUSES = [
  'EMAIL_EXPLICITLY_SOURCED',
  'EMAIL_PATTERN_GUESSED',
  'EMAIL_MAILBOX_ACCEPTED',
  'EMAIL_DOMAIN_CATCH_ALL',
  'EMAIL_COMPANY_MAILBOX',
  'EMAIL_PERSON_OWNERSHIP_UNVERIFIED',
  'EMAIL_PERSON_OWNERSHIP_VERIFIED',
] as const;

export type EmailOwnershipStatus = typeof EMAIL_OWNERSHIP_STATUSES[number];

const NON_PERSON_TERMS = new Set([
  // Website/UI words that get scraped as names
  'about', 'all', 'app', 'arrive', 'back', 'become', 'becoming', 'benefit', 'benefits',
  'browse', 'build', 'call', 'click', 'close', 'collaborate', 'collaborating', 'collaboration',
  'collaborative', 'commerce', 'comprehensive', 'contact', 'countries', 'delivered', 'discover',
  'domain', 'download', 'ecommerce', 'empower', 'empowering', 'enhance', 'exceptional', 'experience',
  'explore', 'featured', 'find', 'follow', 'free', 'get', 'global', 'home', 'how', 'join',
  'know', 'learn', 'led', 'let', 'like', 'live', 'loading', 'login', 'look', 'make',
  'menu', 'message', 'more', 'most', 'navigate', 'navigating', 'need', 'next', 'now',
  'offer', 'open', 'our', 'page', 'plan', 'platform', 'please', 'premier', 'premium',
  'press', 'privacy', 'public', 'read', 'register', 'relations', 'reliable', 'request',
  'search', 'send', 'senior', 'share', 'sign', 'site', 'start', 'strategy', 'submit',
  'subscribe', 'support', 'team', 'terms', 'that', 'the', 'their', 'they', 'this',
  'top', 'trusted', 'try', 'turn', 'update', 'view', 'visit', 'water', 'welcome',
  'what', 'why', 'work', 'world', 'your', 'zone',
  // Business/industry words
  'advisory', 'advisors', 'agency', 'associates', 'automotive', 'bakery', 'branch', 'business', 'careers', 'cars',
  'care', 'cargo', 'certified', 'commercial', 'company', 'consultancy', 'consulting', 'consultation', 'contracting',
  'construction', 'capital', 'dental', 'department', 'development', 'digital', 'design', 'distribution', 'division',
  'electromech', 'engineering', 'enterprises', 'equipment', 'fitness', 'fleet', 'fondue', 'freight', 'group',
  'healthcare', 'heavy', 'holding', 'holdings', 'hospitality', 'industrial', 'industries', 'insurance', 'international',
  'investment', 'licensed', 'logistics', 'management', 'manufacturing', 'market', 'marketing',
  'media', 'medical', 'mining', 'office', 'operations', 'partners', 'pharmaceutical', 'polaris',
  'professional', 'professionals', 'projects', 'properties', 'property', 'protection',
  'real', 'residential', 'estate', 'estates', 'recruitment', 'restaurant', 'retail', 'services',
  'shipping', 'software', 'solutions', 'studio', 'systems', 'technologies', 'technology',
  'trading', 'transportation', 'unit', 'vehicles', 'vehicle', 'ventures', 'warehouse',
  // Legal suffixes that sometimes get scraped
  'llc', 'ltd', 'inc', 'corp', 'fzco', 'fze', 'dmcc', 'wll', 'pjsc',
  // Location words
  'india', 'york', 'new', 'emirates', 'uae', 'dubai', 'sharjah', 'london', 'singapore',
  'china', 'riyadh', 'doha', 'muscat', 'bahrain', 'kuwait', 'saudi', 'arabia',
  'american', 'european', 'asian', 'african', 'gcc', 'mena',
  // Nationality/language words  
  'coalition', 'nordic', 'special', 'english', 'hindi', 'arabic', 'spanish', 'french',
  'german', 'chinese', 'japanese', 'russian', 'portuguese',
  // Month names
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
  'september', 'october', 'november', 'december',
  // Specific company-name fragments observed in audit
  'bayzat', 'casablanca', 'colab', 'cycl', 'gobuild', 'minifeel', 'odoo', 'oman',
  'petrofac', 'savtech', 'advertise', 'advertising',
  // Social/platform words that are never part of a human name
  'facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'whatsapp', 'google',
  'pinterest', 'tiktok', 'snapchat', 'telegram', 'web', 'site', 'email', 'online',
]);

const ROLE_ONLY_TERMS = new Set([
  'broker', 'ceo', 'chairman', 'chief', 'decision', 'director', 'founder', 'founders',
  'manager', 'owner', 'partner', 'president', 'principal', 'vp', 'executive',
  'administrator', 'coordinator', 'supervisor', 'head', 'officer', 'lead',
  'assistant', 'vice', 'senior', 'managing', 'general', 'associate'
]);

/**
 * DYNAMIC ROLE & TITLE CLEANING (part of the name-disambiguation upgrade).
 * Tokens that can precede a real person name as a ROLE/designation and must be
 * stripped during NLP token parsing ("Founder Ashley Cadzow" -> "Ashley Cadzow",
 * "Architect Omar Hussain" -> "Omar Hussain").
 */
const ROLE_PREFIX_TOKENS = new Set([
  'ceo', 'coo', 'cfo', 'cto', 'founder', 'co-founder', 'cofounder', 'owner',
  'director', 'managing', 'general', 'executive', 'president', 'chairman',
  'chairwoman', 'head', 'vp', 'vice', 'principal', 'partner', 'manager',
  'supervisor', 'lead', 'chief', 'assistant', 'senior', 'associate', 'architect',
  'engineer', 'engineer-in-charge', 'eic', 'consultant', 'specialist', 'managerial',
  'group', 'regional', 'area', 'department', 'divisional', 'operations', 'project',
  'procurement', 'commercial', 'finance', 'marketing', 'sales', 'design', 'executive',
  'technical', 'account', 'admin', 'administration', 'business', 'brand', 'hr',
  'legal', 'quality', 'supply', 'logistics', 'facility', 'mep', 'electromechanical',
  'arch', 'archt', 'md', 'mgr', 'ceo', 'gm', 'dm', 'agm', 'cfo', 'coo', 'cto'
]);

/**
 * Department / section words that often get glued onto the END of a scraped name
 * and must be dropped ("Ramez Hamdan Sales" -> "Ramez Hamdan", "... Legal").
 */
const DEPARTMENT_SUFFIX_TOKENS = new Set([
  'legal', 'sales', 'marketing', 'hr', 'human', 'resources', 'finance', 'accounting',
  'accounts', 'operations', 'procurement', 'logistics', 'engineering', 'technical',
  'design', 'production', 'quality', 'administration', 'it', 'technology', 'customer',
  'service', 'services', 'support', 'strategy', 'communications', 'pr', 'projects',
  'commercial', 'title', 'department', 'division', 'team', 'unit', 'management',
  'developer', 'business', 'digital', 'media', 'creative', 'content', 'acquisition',
  'lawyer', 'attorney', 'advocate', 'counsel'
]);

/**
 * GENERIC BUSINESS CATEGORY detection — names that are really a business type or
 * offering, not a person ("Print Branding", "Skyline Builders", "Interior Design").
 * Any candidate whose surviving tokens are ALL in this set is not a human name.
 */
const GENERIC_CATEGORY_TERMS = new Set([
  'print', 'printing', 'brand', 'branding', 'advertising', 'marketing', 'digital',
  'construction', 'contracting', 'building', 'builders', 'real', 'estate', 'estates',
  'property', 'properties', 'logistics', 'freight', 'shipping', 'cargo', 'trading',
  'recruitment', 'manpower', 'staffing', 'security', 'cleaning', 'maintenance',
  'mep', 'electromechanical', 'electromech', 'electrical', 'mechanical', 'facility',
  'management', 'development', 'interior', 'fit', 'fitout', 'out', 'design', 'media',
  'landscaping', 'catering', 'food', 'beverage', 'architecture', 'architects',
  'engineering', 'automotive', 'vehicles', 'vehicle', 'materials', 'supplies',
  'packaging', 'textile', 'garments', 'furniture', 'joinery', 'steel', 'metal',
  'aluminium', 'glass', 'paint', 'paints', 'chemical', 'plastic', 'plumbing',
  'hvac', 'ac', 'accommodation', 'hospitality', 'tourism', 'travel', 'retail',
  'wholesale', 'distribution', 'supply', 'supplier', 'consulting', 'consultancy',
  'agency', 'services', 'solutions', 'systems', 'technologies', 'technology',
  'industries', 'group', 'holding', 'holdings', 'ventures', 'capital', 'investment',
  'insurance', 'banking', 'finance', 'education', 'training', 'healthcare', 'medical',
  'clinical', 'dentist', 'dental', 'clinic', 'beauty', 'salon', 'spa', 'gym', 'fitness',
  // Plural / variant forms of the above that appear glued onto scraped "names"
  'interiors', 'studios', 'designs', 'contractors', 'developers', 'manufacturers',
  'suppliers', 'technocrats', 'engineers',
  // Hospitality / F&B brand words observed glued onto scraped "names"
  'cafe', 'cafeteria', 'caf', 'coffee', 'bistro', 'restaurant', 'vibes', 'grill',
  'grills', 'dessert', 'juice', 'shop', 'shops', 'store', 'stores', 'souq'
]);

/**
 * Context cue words around a candidate inside the scraped site text. When the
 * candidate appears near these, it is a portfolio/client/project/partner BRAND,
 * not the company's executive — so it must be dropped.
 */
const PORTFOLIO_CLIENT_CONTEXT = /(portfolio|clients?|projects?|case\s+stud(?:y|ies)|our\s+work|references?|partners?|affiliates?|brands?|hotels?|resorts?|developments?|towers?|communities?|completed|delivered|key\s+projects?|featured\s+projects?|recent\s+projects?|previous\s+clients?|valued\s+clients?|trusted\s+by)/i;

/**
 * Person-title words whose presence near a candidate indicates it IS an executive
 * (so the portfolio-context heuristic should NOT drop it).
 */
const PERSON_ROLE_CUES = /(ceo|chief|founder|co-founder|director|managing\s+director|general\s+manager|owner|president|chairman|partner|manager|head\s+of)/i;

/**
 * Company / brand-type suffix words glued to a scraped "name" that mark it as an
 * entity rather than a person ("InterContinental Hotel", "... Resort & Spa").
 */
const ENTITY_SUFFIX_TERMS = /\b(?:hotels?|resorts?|spas?|towers?|malls?|centres?|centers?|plazas?|suites|executive\s+suites|development|developments|group|llc|l\.l\.c|fze|fzco|inc|corp|ltd|limited|co)\b/i;

/**
 * Dynamic role/title cleaning via NLP token parsing (Part 2b of the name upgrade).
 * Strips a leading role/designation and a trailing department/section from a
 * scraped candidate, leaving only the clean personal name tokens.
 *   "Founder Ashley Cadzow"      -> "Ashley Cadzow"
 *   "Architect Omar Hussain"     -> "Omar Hussain"
 *   "Director Ramez Hamdan Legal"-> "Ramez Hamdan"
 * Returns the cleaned name, or null if nothing human remains.
 */
export const stripRoleDepartmentTokens = (rawName: unknown): string | null => {
  let name = String(rawName || '')
    .replace(/[^A-Za-z\s.'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!name) return null;

  const tokens = name.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  // Strip leading role/designation tokens (single or multiple: "Managing Director X").
  while (tokens.length > 1) {
    const head = tokens[0].toLowerCase().replace(/[^a-z]/g, '');
    const next = (tokens[1] || '').toLowerCase().replace(/[^a-z]/g, '');
    // "managing director", "general manager", "vice president", "chief executive officer"
    if (ROLE_PREFIX_TOKENS.has(head)) {
      tokens.shift();
      continue;
    }
    if (head === 'vice' && next === 'president') { tokens.shift(); continue; }
    if (head === 'chief' && (next === 'executive' || next === 'operating' || next === 'technology' || next === 'financial' || next === 'marketing' || next === 'commercial')) { tokens.shift(); continue; }
    if (head === 'general' && next === 'manager') { tokens.shift(); continue; }
    if (head === 'managing' && next === 'director') { tokens.shift(); continue; }
    if (head === 'co' && next === 'founder') { tokens.shift(); tokens.shift(); continue; }
    break;
  }

  // Strip trailing department/section tokens.
  while (tokens.length > 1) {
    const tail = tokens[tokens.length - 1].toLowerCase().replace(/[^a-z]/g, '');
    if (DEPARTMENT_SUFFIX_TOKENS.has(tail)) {
      tokens.pop();
      continue;
    }
    break;
  }

  const cleaned = tokens.join(' ').trim();
  if (!cleaned || cleaned.length < 2) return null;
  return cleaned;
};

/**
 * Company Entity / Generic Category rejection (Part 2c). Returns true when the
 * candidate name is really the target company's own name, or collapses entirely
 * into generic business-category words ("Print Branding", "Skyline Builders").
 */
export const isCompanyEntityName = (rawName: unknown, companyName: unknown): boolean => {
  const tokens = String(rawName || '').toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  // Business-label detection: a real human name essentially never contains a generic
  // business-category word as a component ("Skyline Builders", "Print Branding",
  // "Ismail Intellect Cafe", "Art Interiors"). Reject the name when ANY significant
  // token is a category/offering term — not just when every token is.
  if (tokens.some(t => t.length >= 3 && GENERIC_CATEGORY_TERMS.has(t))) return true;

  // Generic category collapse: every surviving token is a business term.
  if (tokens.every(t => GENERIC_CATEGORY_TERMS.has(t))) return true;

  // Entity suffix marker ("InterContinental Hotel") → not a person.
  if (ENTITY_SUFFIX_TERMS.test(String(rawName || ''))) return true;

  // Exact / near-exact overlap with the company's own name: when every non-generic
  // token of the candidate is a company token, the candidate IS the entity (e.g.
  // candidate "Skyline Builders" @ company "Skyline Builders").
  const compTokens = String(companyName || '')
    .toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/)
    .filter(t => t.length >= 3 && !GENERIC_CATEGORY_TERMS.has(t));
  if (compTokens.length >= 1) {
    const personTokens = tokens.filter(t => t.length >= 3 && !GENERIC_CATEGORY_TERMS.has(t));
    if (personTokens.length >= 1 && personTokens.every(t => compTokens.includes(t))) return true;
  }
  return false;
};

/**
 * Portfolio / Client / Brand disambiguation (Part 2a). Cross-checks a candidate
 * name against the scraped site content: when the name appears near portfolio,
 * client, project, case-study, or partner cue words — and NOT near any person-role
 * cue — it is a client/partner/hotel brand shown on the company's site, not the
 * company's own executive. Returns true when the candidate must be dropped.
 */
export const isPortfolioClientBrand = (rawName: unknown, siteText: unknown): boolean => {
  const name = String(rawName || '').trim();
  const haystack = String(siteText || '');
  if (!name || name.length < 2 || haystack.length < 20) return false;

  const nameRe = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+'), 'i');
  if (!nameRe.test(haystack)) return false;

  // Inspect a window around every occurrence for portfolio-vs-executive context.
  let match: RegExpExecArray | null;
  let portfolioHits = 0;
  let execHits = 0;
  const globalRe = new RegExp(nameRe.source, 'gi');
  while ((match = globalRe.exec(haystack)) !== null) {
    const start = Math.max(0, match.index - 120);
    const end = Math.min(haystack.length, match.index + name.length + 140);
    const windowText = haystack.slice(start, end);
    if (PERSON_ROLE_CUES.test(windowText)) execHits++;
    if (PORTFOLIO_CLIENT_CONTEXT.test(windowText)) portfolioHits++;
    if (match.index >= haystack.length) break;
  }
  // Exec presence wins; otherwise portfolio/brand context drops the candidate.
  if (execHits > 0 && execHits >= portfolioHits) return false;
  return portfolioHits > 0;
};

/** Noise prefixes that web scrapers pick up before a real person name */
const NAME_NOISE_PREFIXES = /^(?:team|view|our|meet|agents?|message|contact|linkedin|profile|about|by|author|posted|written|meet\s+the|from|the)\s+/i;

/** Honorific title prefixes to strip */
const TITLE_PREFIXES = /^(?:dr\.?|mr\.?|mrs\.?|ms\.?|eng\.?|engr\.?|prof\.?|sheikh|shaikh|sir|dame|hon\.?|hh|h\.e\.?|h\.h\.?)\s+/i;

/** Noise suffixes that get attached to names */
const NAME_NOISE_SUFFIXES = /\s+(?:executive|professional|specialist|expert|consultant|leader|ambassador|delegate|representative|spokesman|spokesperson|correspondent)\s*$/i;

/**
 * Cleans and validates a contact name scraped from a website.
 * Returns a clean first name (for greetings) or null if the name is invalid.
 * This is the ONE function all workers must call before saving contact_name to DB.
 *
 * v2 — Dynamic name disambiguation:
 *  - RFC leaves role/designation tokens ({"Founder X","Architect Y","X Legal"}),
 *  - rejects company-entity / generic-category names ("Print Branding","Skyline Builders"),
 *  - when companyName is supplied, rejects a name that IS the company's own entity.
 */
export const cleanContactName = (rawName: unknown, companyName: unknown = null): string | null => {
    let name = String(rawName || '').trim();
    if (!name || name.length < 2) return null;

    // Strip noise prefixes and whitespace
    name = name.replace(NAME_NOISE_PREFIXES, '').trim();
    name = name.replace(NAME_NOISE_SUFFIXES, '').trim();
    name = name.replace(TITLE_PREFIXES, '').trim();

    // Strip HTML entities and non-alpha chars
    name = name.replace(/&amp;/gi, '&').replace(/[^A-Za-z\s.'\-]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!name || name.length < 2) return null;

    // Strip leading department/industry noise tokens (e.g. "Commercial Vehicles Vines Hamdan" -> "Vines Hamdan")
    const words = name.split(/\s+/);
    while (words.length >= 3 && NON_PERSON_TERMS.has(words[0].toLowerCase())) {
      words.shift();
    }
    name = words.join(' ');
    if (!name || name.length < 2) return null;

    // v2 — dynamic role/title cleaning: drop leading designation + trailing department.
    name = stripRoleDepartmentTokens(name) || name;
    // A mid-string role can have exposed an honorific ("MD Mr. X" -> "Mr. X"); re-strip it.
    name = name.replace(NAME_NOISE_PREFIXES, '').trim();
    name = name.replace(TITLE_PREFIXES, '').trim();
    if (!name || name.length < 2) return null;

    // v2 — company-entity / generic-category rejection.
    if (isCompanyEntityName(name, companyName)) return null;

    // Run full validation
    const assessment = assessPersonName(name);
    if (!assessment.valid || !assessment.normalizedName) return null;

    return assessment.normalizedName;
};

/**
 * Checks if an email address belongs to a consumer/free email provider.
 * Used by Drafts Worker to reject non-business emails.
 */
/**
 * Extracts a readable person-name token string from a LinkedIn public profile URL.
 * Example: "https://ch.linkedin.com/in/veer-vijay-doshi-87a" -> "veer vijay doshi".
 * Used to verify that a LinkedIn URL and a scraped full_name refer to the SAME
 * profile before the two are ever bound together (identity mismatch guard).
 */
export const personNameFromLinkedInUrl = (url: unknown): string | null => {
  const m = String(url || '').match(/linkedin\.com\/in\/([a-zA-Z0-9_\-%]+)/i);
  if (!m) return null;
  const slug = String(m[1])
    .replace(/[-_%]+/g, ' ')
    // Strip trailing LinkedIn profile id (e.g. "-87a", "1234") — not part of the name.
    .replace(/\s*\d+[a-zA-Z]*\s*$/i, '')
    .trim();
  return slug || null;
};

const normalizeNameTokens = (value: unknown): string[] =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

/** Names like "Abdul Kader" vs "Abdulkader" are the same person — collapse glued tokens. */
const joinGluedTokens = (tokens: string[]): string => tokens.join(' ').replace(/\s+/g, '');

/** Common personal middle-name fragments we ignore when comparing. */
const NAME_NOISE = new Set(['al', 'el', 'ben', 'bin', 'abu', 'abdul', 'abd', 'de', 'del', 'van', 'von', 'ibn', 'haj', 'haji', 'syed', 'sayed']);

/** Keep only significant name tokens (drop honorifics + common middle fragments). */
const significantTokens = (value: unknown): string[] => {
  const raw = String(value || '').toLowerCase();
  // LinkedIn slugs use "-" between tokens; also strip trailing profile id like "-87a".
  const cleaned = raw
    .replace(/[-_%]/g, ' ')
    .replace(/(\d+[a-z]*\s*)+$/i, '')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.split(/\s+/).filter((t) => t.length >= 2 && !NAME_NOISE.has(t));
};

/**
 * FUZZY PERSON-NAME MATCH (v2)
 * True when two names plausibly refer to the same individual, tolerating:
 *  - hyphen vs space ("Abdul-Kader" = "Abdul Kader"),
 *  - glued middle names ("Abdulkader" = "Abdul Kader"),
 *  - middle-name variations ("Niyaz Abdulkader" = "Niyaz Abdul Kader"),
 *  - honorifics ("Mr", "Dr") and common fragments ("al", "bin").
 * A match requires LAST-NAME agreement plus either a shared first-name token OR a
 * strong overlap of the glued full name. This is the identity gate that binds a
 * scraped website name to its LinkedIn profile WITHOUT dropping legitimate matches.
 */
/** Last names agree when they are equal, OR one is a suffix of the other (glued
 *  middle-name variants: "Abdulkader" vs "Kader", "Abdul-Kader" vs "Kader"). */
const lastNamesAgree = (lastA: string, lastB: string): boolean => {
  if (lastA === lastB) return true;
  if (lastA.length >= 4 && lastB.length >= 4) {
    if (lastA.endsWith(lastB) || lastB.endsWith(lastA)) return true;
  }
  return false;
};

/**
 * FUZZY PERSON-NAME MATCH (v3 — Token-Overlap)
 * True when two names plausibly refer to the same individual, tolerating:
 *  - hyphen vs space ("Abdul-Kader" = "Abdul Kader"),
 *  - glued middle names ("Abdulkader" = "Abdul Kader"),
 *  - dropped/extra middle names ("Niyaz Abdulkader" = "Niyaz Abdul Kader"),
 *  - honorifics ("Mr", "Dr") and common fragments ("al", "bin", "abdul").
 * Rule: last names must agree (equal or suffix-of), AND a first-name token is shared
 * (or one side's single first name is contained in the other). This binds a scraped
 * website name to its LinkedIn profile WITHOUT dropping legitimate fuzzy matches.
 */
export const personNamesMatch = (a: unknown, b: unknown): boolean => {
  const ta = significantTokens(a);
  const tb = significantTokens(b);
  if (ta.length < 1 || tb.length < 1) return false;

  // Exact after normalization (handles duplicate tokens / slug noise).
  if (joinGluedTokens(ta) === joinGluedTokens(tb)) return true;

  const lastA = ta[ta.length - 1];
  const lastB = tb[tb.length - 1];
  // A shared last name is the anchor of person identity.
  if (!lastNamesAgree(lastA, lastB)) return false;

  const firstA = ta.slice(0, -1);
  const firstB = tb.slice(0, -1);

  // Any shared first-name token is enough (handles middle-name differences).
  if (firstA.some((f) => firstB.includes(f))) return true;

  // Single-first-name sides: containment in the other's glued first names
  // ("Abdulkader" vs "Abdul Kader" -> "abdulkader" contained in "abdul kader").
  const gluedFirstA = joinGluedTokens(firstA);
  const gluedFirstB = joinGluedTokens(firstB);
  if (firstA.length === 1 && gluedFirstB.includes(gluedFirstA)) return true;
  if (firstB.length === 1 && gluedFirstA.includes(gluedFirstB)) return true;

  // Single-token names on both sides sharing the (agreed) last name.
  return ta.length === 1 && tb.length === 1;
};

export const isConsumerEmail = (email: unknown): boolean => {
    const normalized = normalizeEmailCandidate(email);
    if (!normalized) return false;
    const domain = normalized.split('@')[1] || '';
    const consumerDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
        'aol.com', 'icloud.com', 'protonmail.com', 'mail.com', 'zoho.com',
        'ymail.com', 'gmx.com', 'gmx.net', 'inbox.com', 'fastmail.com',
        'tutanota.com', 'pm.me', 'yahoo.co.uk', 'yahoo.co.in', 'hotmail.co.uk',
        'outlook.sa', 'outlook.ae', 'msn.com', 'rediffmail.com', 'mail.ru',
        'qq.com', '163.com', 'yeah.net', 'live.co.uk', 'live.in',
        'emirates.net.ae', 'etisalat.ae', 'du.ae',
    ];
    return consumerDomains.includes(domain.toLowerCase());
};

export interface PersonNameAssessment {
  normalizedName: string | null;
  confidence: number;
  valid: boolean;
  reasons: string[];
}

export const assessPersonName = (value: unknown): PersonNameAssessment => {
  const normalizedName = String(value || '')
    .replace(/&amp;/gi, '&')
    .replace(/[^A-Za-z\s.'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || null;
  const reasons: string[] = [];
  if (!normalizedName) return { normalizedName: null, confidence: 0, valid: false, reasons: ['PERSON_NAME_EMPTY'] };

  const words = normalizedName.split(' ').filter(Boolean);
  const lowered = words.map(word => word.toLowerCase().replace(/[^a-z]/g, ''));
  if (words.length < 2) reasons.push('PERSON_NAME_TOO_SHORT');
  if (words.length > 4) reasons.push('PERSON_NAME_TOO_MANY_TOKENS');
  if (words.some(word => !/^(?:[A-Z][A-Za-z.'-]*|[A-Z]{2,})$/.test(word))) reasons.push('PERSON_NAME_BAD_TOKEN_SHAPE');
  // Reject if ANY word is a non-person term (was: some, now stricter)
  const nonPersonCount = lowered.filter(word => NON_PERSON_TERMS.has(word)).length;
  if (nonPersonCount >= 1) reasons.push('PERSON_NAME_NON_HUMAN_TERM');
  if (lowered.some(word => ROLE_ONLY_TERMS.has(word))) reasons.push('PERSON_NAME_ROLE_FRAGMENT');
  if (/\b(?:llc|l\.l\.c|co\.?|company|contracting|consultancy|consulting|electromech|systems|solutions|services|trading|group|holding|holdings|platform|ecommerce|agency|marketing|development|estate|estates|collaborating|collaborative)\b/i.test(normalizedName)) {
    reasons.push('PERSON_NAME_COMPANY_FRAGMENT');
  }
  if (lowered.every(word => ROLE_ONLY_TERMS.has(word))) reasons.push('PERSON_NAME_IS_ROLE');
  if (/\b(uae|dubai|sharjah|abu dhabi|ajman|oman|qatar|bahrain|saudi|arabia|european|middle east|india|york|london|singapore|america|usa)\b/i.test(normalizedName)) reasons.push('PERSON_NAME_LOCATION_FRAGMENT');
  // Reject names starting with articles/pronouns
  if (/^(?:our|your|the|their|its|my|his|her|we|they|this|that)\s/i.test(normalizedName)) reasons.push('PERSON_NAME_STARTS_WITH_PRONOUN');

  const confidence = Math.max(0, 92 - reasons.length * 35 - Math.max(0, words.length - 3) * 3);
  return { normalizedName, confidence, valid: reasons.length === 0 && confidence >= 85, reasons };
};

export const isGenericMailbox = (email: unknown): boolean => {
  const normalized = normalizeEmailCandidate(email);
  if (!normalized) return false;
  const local = normalized.split('@')[0];
  return /^(?:admin|careers?|contact|enquir(?:y|ies)|general|hello|hr|info|mail|marketing|noreply|no-reply|office|postmaster|reception|sales|support|team|webmaster|billing|accounts?|service|services|jobs|recruitment|press|pr|feedback)$/i.test(local);
};

export const hasSourceEvidence = (value: unknown): boolean => {
  if (Array.isArray(value)) return value.length > 0;
  try {
    const parsed = JSON.parse(String(value || '[]'));
    return Array.isArray(parsed) && parsed.length > 0;
  } catch {
    return false;
  }
};

export const isStrictPersonEmail = (record: any): boolean => Boolean(
  record &&
  Number(record.person_identity_verified || 0) === 1 &&
  Number(record.email_ownership_verified || 0) === 1 &&
  Number(record.person_name_confidence || 0) >= 85 &&
  Number(record.role_confidence || 0) >= 80 &&
  hasSourceEvidence(record.source_evidence ?? record.source_evidence_json ?? record.contact_source_evidence_json) &&
  Number(record.email_syntax_valid || 0) === 1 &&
  Number(record.email_domain_valid || 0) === 1 &&
  Number(record.email_is_fallback || 0) === 0 &&
  !isGenericMailbox(record.email)
);

// Placeholder/testing/asset addresses that must NEVER be saved, e.g. info@example.com,
// contact@domain.example, user@sentry.io, or a scraped image/PDF URL.
const PLACEHOLDER_OR_ASSET = /@(?:example|test|sample|yourdomain|mydomain|company|domain|website|localhost|foo|bar|sentry)(?:\.|$)|@(?:mailinator|guerrillamail|yopmail|tempmail|temp-mail|sharklasers|maildrop|fake|disposable)\.|\.(?:png|jpe?g|gif|svg|webp|css|js|pdf)$/i;

// Valid business TLDs + common country TLDs + multi-segment TLDs. Scraped emails must
// end in one of these — anything else (e.g. ".comuae", ".comass") is malformed junk.
export const VALID_EMAIL_TLD = /\.(?:com|co|net|org|gov|edu|io|ai|tech|agency|info|biz|design|me|xyz|ltd|services|online|global|solutions|app|store|digital|cloud|dev|live|pro|site|cc|tv|us|uk|ca|au|nz|in|de|fr|es|it|nl|se|no|fi|dk|be|ch|at|ie|pl|ru|ua|ae|sa|qa|kw|bh|om|eg|ma|dz|jo|lb|sg|my|id|th|vn|ph|hk|cn|jp|kr|tw|pk|bd|lk|np|za|ng|ke|gh|mx|br|ar|cl|co\.(?:uk|in|jp|kr|nz|za)|com\.(?:au|sg|my|pk|bd|ph|hk|mx|br|tr)|ac\.(?:uk|in|za))$/i;
// Hard TLD-tail guarantee: the address MUST end in a clean alphabetic TLD segment.
// Catches concatenation corruption like ".comvie", ".comuae", ".aedubai" that slips past
// scraped-asset and syntax-only checks. The allowlist above is the whitelist; this is the
// belt-and-suspenders structural gate applied wherever a candidate is admitted/persisted.
export const STRICT_TLD_TAIL = /\.[a-z]{2,24}$/i;
const EMAIL_SYNTAX = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

export const normalizeEmailCandidate = (value: unknown): string | null => {
  let candidate = String(value || '').replace(/&commat;|&#64;/gi, '@').replace(/&period;|&#46;/gi, '.').trim();
  try { candidate = decodeURIComponent(candidate); } catch { /* malformed encoding is validated below */ }
  candidate = candidate.replace(/^mailto:/i, '').split('?')[0].trim();
  candidate = candidate.replace(/^[\s<([{'"`]+|[\s>\])}'"`,;:.]+$/g, '').toLowerCase();
  
  // Clean scraped prefix noise like usinfo@ -> info@, contactusinfo@ -> info@
  candidate = candidate.replace(/^(?:us|contactus|emailus|reachus|callus)info@/i, 'info@');
  candidate = candidate.replace(/^(?:us|contactus|emailus|reachus|callus)sales@/i, 'sales@');

  // Clean trailing HTML tag/attribute garbage appended by regex scrapers (e.g. .comass -> .com, .comclass -> .com)
  candidate = candidate.replace(/\.com(?:ass|class|html|href|png|jpg|site|page|id|style)$/i, '.com');
  candidate = candidate.replace(/\.ae(?:ass|class|html|href|png|jpg|site|page|id|style)$/i, '.ae');

  // Strip a leading phone-number run glued to a name — scrapers concatenate mobile numbers
  // with the email local part (e.g. "553400464sales@" -> "sales@"). Only strip when a real
  // name actually follows the digit run; a purely-numeric local part is rejected below.
  const atIndex = candidate.indexOf('@');
  if (atIndex > 0) {
    let local = candidate.slice(0, atIndex);
    const domainPart = candidate.slice(atIndex);
    const phoneMatch = local.match(/^\+?\d[\d\s()\-.]{4,}/);
    if (phoneMatch && /^[a-z]/.test(local.slice(phoneMatch[0].length))) {
      local = local.slice(phoneMatch[0].length).replace(/^[\s\-_.]+/, '');
      candidate = local + domainPart;
    }
    // Reject local parts that are essentially a phone number (mostly digits)
    const digitCount = (local.match(/\d/g) || []).length;
    const alphaCount = (local.match(/[a-z]/g) || []).length;
    if (digitCount >= 8 && alphaCount < 3) return null;
  }

  // Strict TLD check — rejects malformed concatenated domains (.comuae, .comae, .comdubai, .comvie)
  if (!VALID_EMAIL_TLD.test(candidate) || !STRICT_TLD_TAIL.test(candidate)) {
    return null;
  }

  if (!EMAIL_SYNTAX.test(candidate) || PLACEHOLDER_OR_ASSET.test(candidate) || candidate.includes('mailto') || /^mailoinfo@/i.test(candidate) || /\.ae(?:care|contact|email)$/i.test(candidate.split('@')[1] || '')) return null;
  return candidate;
};

export const validateEmail = async (
  value: unknown,
  sourceUrl = '',
  extractionMethod: EmailExtractionMethod = 'visible_text',
  website = '',
  checkMx = false,
): Promise<ValidatedEmail> => {
  const normalizedAddress = normalizeEmailCandidate(value);
  if (!normalizedAddress) {
    return { address: String(value || ''), normalizedAddress: null, sourceUrl, extractionMethod, syntaxValid: false, mxValid: null, domainMatchesWebsite: false, confidence: 0, validationReason: 'INVALID_EMAIL_SYNTAX' };
  }
  const domain = normalizedAddress.split('@')[1];
  const companyDomain = websiteHostname(website);
  const domainMatchesWebsite = Boolean(companyDomain && (domain === companyDomain || domain.endsWith(`.${companyDomain}`)));
  let mxValid: boolean | null = null;
  if (checkMx) {
    try {
      const dns = await import('node:dns/promises').catch(() => null);
      if (dns && typeof dns.resolveMx === 'function') {
        mxValid = (await dns.resolveMx(domain)).length > 0;
      }
    } catch {
      mxValid = false;
    }
    if (!mxValid) {
      try {
        const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`, {
          signal: AbortSignal.timeout(8000),
          headers: { Accept: 'application/dns-json' },
        });
        const payload: any = response.ok ? await response.json() : null;
        mxValid = Array.isArray(payload?.Answer) && payload.Answer.some((answer: any) => Number(answer?.type) === 15);
      } catch {
        mxValid = false;
      }
    }
  }
  const sourceScore = extractionMethod === 'mailto' ? 45 : extractionMethod === 'json_ld' ? 38 : extractionMethod === 'manual' ? 35 : 25;
  const confidence = Math.max(0, Math.min(100, sourceScore + (domainMatchesWebsite ? 35 : 0) + (mxValid === true ? 20 : mxValid === false ? -35 : 0)));
  return {
    address: String(value || ''), normalizedAddress, sourceUrl, extractionMethod,
    syntaxValid: true, mxValid, domainMatchesWebsite, confidence,
    validationReason: mxValid === false ? 'DOMAIN_HAS_NO_MX' : (!domainMatchesWebsite && website ? 'DOMAIN_MISMATCH' : undefined),
  };
};
