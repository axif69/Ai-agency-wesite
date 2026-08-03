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
]);

const ROLE_ONLY_TERMS = new Set([
  'broker', 'ceo', 'chairman', 'chief', 'decision', 'director', 'founder', 'founders',
  'manager', 'owner', 'partner', 'president', 'principal', 'vp', 'executive',
  'administrator', 'coordinator', 'supervisor', 'head', 'officer', 'lead',
  'assistant', 'vice', 'senior', 'managing', 'general', 'associate'
]);

/** Noise prefixes that web scrapers pick up before a real person name */
const NAME_NOISE_PREFIXES = /^(?:team|view|our|meet|agents?|message|contact|linkedin|profile|about|by|author|posted|written|meet\s+the|from|the)\s+/i;

/** Honorific title prefixes to strip */
const TITLE_PREFIXES = /^(?:dr\.?|mr\.?|mrs\.?|ms\.?|eng\.?|engr\.?|prof\.?|sheikh|sir|dame|hon\.?|hh|h\.e\.?|h\.h\.?)\s+/i;

/** Noise suffixes that get attached to names */
const NAME_NOISE_SUFFIXES = /\s+(?:executive|professional|specialist|expert|consultant|leader|ambassador|delegate|representative|spokesman|spokesperson|correspondent)\s*$/i;

/**
 * Cleans and validates a contact name scraped from a website.
 * Returns a clean first name (for greetings) or null if the name is invalid.
 * This is the ONE function all workers must call before saving contact_name to DB.
 */
export const cleanContactName = (rawName: unknown): string | null => {
    let name = String(rawName || '').trim();
    if (!name || name.length < 2) return null;

    // Strip noise prefixes and suffixes
    name = name.replace(NAME_NOISE_PREFIXES, '').trim();
    name = name.replace(NAME_NOISE_SUFFIXES, '').trim();
    name = name.replace(TITLE_PREFIXES, '').trim();

    // Strip HTML entities and non-alpha chars
    name = name.replace(/&amp;/gi, '&').replace(/[^A-Za-z\s.'\-]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!name || name.length < 2) return null;

    // Strip leading department/industry noise tokens (e.g. "Commercial Vehicles Ramez Hamdan" -> "Ramez Hamdan")
    const words = name.split(/\s+/);
    while (words.length >= 3 && NON_PERSON_TERMS.has(words[0].toLowerCase())) {
      words.shift();
    }
    name = words.join(' ');

    // Run full validation
    const assessment = assessPersonName(name);
    if (!assessment.valid || !assessment.normalizedName) return null;

    return assessment.normalizedName;
};

/**
 * Checks if an email address belongs to a consumer/free email provider.
 * Used by Drafts Worker to reject non-business emails.
 */
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
