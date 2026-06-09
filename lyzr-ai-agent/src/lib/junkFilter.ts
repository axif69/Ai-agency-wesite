/**
 * Pillar-Validation Gate — central junk filter & 8-pillar taxonomy.
 *
 * Used by Scout (pre-sniff before queueing), Profiler (pre-sniff before
 * launching the browser), and the Judge LLM rubric (pillar tagging).
 *
 * Strategy: extract the *registrable label* of a host (the brand part, e.g.
 * `youtube` from `youtube.co.uk`), then check it against a labeled blocklist
 * Set. This is faster, simpler, and handles multi-part TLDs correctly.
 */

// ─── 8 Defense Pillars (the only reasons a lead may QUALIFY) ────────────────
export const DEFENSE_PILLARS = [
  'UAV', 'UGV', 'USV', 'EW', 'C4ISR', 'DIRECTED_ENERGY', 'ROBOTICS', 'CYBERSECURITY',
] as const;
export type Pillar = (typeof DEFENSE_PILLARS)[number];

// ─── Public-suffix multi-segment TLDs we care about ─────────────────────────
// (Comprehensive enough for the search-engine results we encounter; not the
// full PSL — adding `tldts` as a dep would bloat the bundle.)
const MULTI_TLDS = new Set([
  'co.uk','co.in','co.jp','co.kr','co.za','co.nz','co.il','co.th','co.id',
  'com.au','com.br','com.mx','com.cn','com.tr','com.tw','com.hk','com.sg',
  'com.ar','com.co','com.pe','com.ph','com.my','com.pk','com.eg','com.sa',
  'com.ng','com.ua','net.au','org.uk','ac.uk','gov.uk','net.in','org.in',
  'org.au','org.nz','net.cn','gov.cn','edu.cn','ac.jp','ne.jp','or.jp',
]);

/**
 * Returns the registrable brand label of a host, e.g.:
 *   `www.youtube.co.uk`         → `youtube`
 *   `anydesk.en.softonic.com`   → `softonic`
 *   `stadtanzeiger-ortenau.de`  → `stadtanzeiger-ortenau`
 *   `rtx.com`                   → `rtx`
 */
export function registrableLabel(host: string): string {
  if (!host) return '';
  const h = host.toLowerCase().replace(/^www\./, '').replace(/\.$/, '');
  const parts = h.split('.');
  if (parts.length < 2) return h;
  const lastTwo = parts.slice(-2).join('.');
  if (MULTI_TLDS.has(lastTwo) && parts.length >= 3) return parts[parts.length - 3];
  return parts[parts.length - 2];
}

// Hard-coded junk domain regex (multi-part TLD safe)
const JUNK_DOMAIN_REGEX = new RegExp(
  [
    // Search engines
    'google\\.com', 'bing\\.com', 'yahoo\\.com', 'baidu\\.com', 'duckduckgo\\.com', 'yandex\\.com',
    // Freemail
    'gmail\\.com', 'outlook\\.com', 'hotmail\\.com', 'yahoo\\.com', 'icloud\\.com', 'aol\\.com', 'mail\\.com',
    'protonmail\\.com', 'tutanota\\.com',
    // Marketplaces & file sharing
    'amazon\\.com', 'ebay\\.com', 'alibaba\\.com', 'aliexpress\\.com', 'taobao\\.com', 'wetransfer\\.com',
    'dropbox\\.com', 'drive\\.google\\.com', 'docs\\.google\\.com',
    // Encyclopedias & wikis
    'wikipedia\\.org', 'wiktionary\\.org', 'wikihow\\.com', 'britannica\\.com', 'investopedia\\.com',
    'about\\.com', 'answers\\.com',
    // Tech blogs & news
    'techspot\\.com', 'cnet\\.com', 'tomshardware\\.com', 'pcmag\\.com', 'pcadvisor\\.co\\.uk',
    'computerworld\\.com', 'techradar\\.com', 'engadget\\.com', 'gizmodo\\.com', 'theverge\\.com',
    'arstechnica\\.com', 'anandtech\\.com', 'extremetech\\.com', 'wired\\.com', 'venturebeat\\.com',
    'mashable\\.com', 'nextgov\\.com', 'federalnewsnetwork\\.com', 'fcw\\.com', 'defenseone\\.com',
    'breakingdefense\\.com', 'janes\\.com', 'ihs\\.com', 'flightglobal\\.com', 'aviationweek\\.com',
    'spacewar\\.com', 'army-technology\\.com', 'naval-technology\\.com', 'airforce-technology\\.com',
    'shephardmedia\\.com',
    // Download portals
    'softonic\\.com', 'filehippo\\.com', 'download\\.com', 'majorgeeks\\.com',
    // Regional news
    'bnn\\.de', 'stadtanzeiger-ortenau\\.de',
    // Consumer SaaS
    'anydesk\\.com', 'teamviewer\\.com', 'logmein\\.com',
    // Market research
    '6wresearch\\.com', 'aviationanddefencemarketreports\\.com',
    // Global giants (non-defense companies we don't need)
    'microsoft\\.com', 'apple\\.com', 'github\\.com', 'linkedin\\.com'
  ].join('|'),
  'i'
);

// Global giants blocklist - discard without committing
export const GLOBAL_GIANTS = new Set([
  'microsoft.com', 'apple.com', 'github.com', 'linkedin.com', 'google.com',
  'amazon.com', 'facebook.com', 'twitter.com', 'x.com', 'instagram.com',
  'netflix.com', 'spotify.com', 'adobe.com', 'salesforce.com', 'oracle.com',
  'ibm.com', 'intel.com', 'amd.com', 'nvidia.com', 'cisco.com',
  'vmware.com', 'redhat.com', 'canonical.com', 'suse.com'
]);

// ─── Labeled blocklist — exact registrable-label matches ────────────────────
// (Vastly easier to maintain than a single mega-regex.)
const JUNK_LABELS = new Set<string>([
  // Search engines
  'google','googlemail','bing','baidu','duckduckgo','ecosia','ask','aol','yandex',
  'qwant','startpage','brave','searx','kagi','sogou','naver',
  // Freemail
  'gmail','hotmail','outlook','live','msn','yahoo','icloud','me','mac','protonmail',
  'gmx','mail','zoho','fastmail','tutanota','yandex',
  // File sharing & cloud storage
  'wetransfer','dropbox','onedrive','box','mega','mediafire','sendspace','filemail',
  'transfernow','smash','pcloud','sync','tresorit',
  // E-commerce & marketplaces
  'amazon','aws','amazonaws','ebay','alibaba','aliexpress','taobao','etsy',
  'walmart','target','costco','wayfair','overstock','rakuten','mercadolibre',
  // Site builders & hosting
  'wix','squarespace','wordpress','weebly','webflow','strikingly','tilda',
  'shopify','bigcommerce','prestashop','magento','woocommerce',
  'godaddy','bluehost','hostgator','namecheap','cloudflare','netlify','vercel',
  'render','heroku','digitalocean','linode','ovh','hetzner','hostinger','ionos',
  // Dev / source-host portals
  'github','gitlab','bitbucket','sourceforge','codeplex',
  'stackoverflow','stackexchange','quora','zhihu','reddit',
  'medium','substack','dev','hashnode','blogger','blogspot','tumblr','wordpress',
  'replit','codepen','jsfiddle','codesandbox','glitch','stackblitz',
  // Social
  'facebook','fb','instagram','twitter','tiktok','snapchat','whatsapp',
  'telegram','signal','discord','slack','zoom','skype','teams','webex',
  'youtube','vimeo','twitch','spotify','soundcloud','clubhouse','rumble',
  'pinterest','linktree',
  // Streaming & entertainment
  'netflix','hulu','disney','disneyplus','hbo','primevideo','peacock','paramount',
  'apple','itunes','xbox','playstation','steam','epicgames','origin','gog','itch',
  // Gaming portals (specifically blocked per Pillar-Validation gate)
  'poki','miniclip','crazygames','kongregate','armorgames','y8','friv','agame',
  'addictinggames','newgrounds','gamejolt','roblox','minecraft',
  // Reference / encyclopedias / dictionaries (NEW — britannica was the leak)
  'wikipedia','wikimedia','wiktionary','wikiquote','wikibooks','wikinews','wikidata',
  'britannica','encyclopedia','dictionary','thesaurus','merriam-webster','collinsdictionary',
  'investopedia','howstuffworks','wikihow',
  // Tech blogs / news / review sites (NEW — techspot, softonic were leaks)
  'techspot','cnet','tomshardware','tomsguide','pcmag','pcworld','engadget',
  'theverge','arstechnica','gizmodo','lifehacker','mashable','wired',
  'venturebeat','readwrite','digitaltrends','slashdot','hackaday','9to5mac',
  'macrumors','xda-developers','androidauthority','androidcentral','phonearena',
  'gsmarena','techradar','zdnet','techcrunch','recode','theinformation',
  // Software-download portals (NEW — softonic, filehippo, etc.)
  'softonic','filehippo','download','filehorse','majorgeeks','snapfiles',
  'soft32','uptodown','apkpure','apkmirror','apkmonk','malavida','tucows',
  // News (general & wire services)
  'reuters','bloomberg','nytimes','cnn','bbc','theguardian','economist','forbes',
  'washingtonpost','wsj','ft','cnbc','foxnews','aljazeera','dw','rt','sputnik',
  'tass','xinhua','kompas','huffpost','huffingtonpost','vox','axios','politico',
  'newsweek','time','usatoday','npr','apnews','rfi','france24','euronews',
  // German regional news (the BNN/Stadtanzeiger leak)
  'bnn','stadtanzeiger','wochenblatt','tagesspiegel','tageblatt','tagblatt',
  'rundschau','kurier','abendzeitung','morgenpost','nachrichten',
  'sueddeutsche','faz','zeit','bild','welt','spiegel','focus','stern','handelsblatt',
  // Travel / lifestyle
  'tripadvisor','booking','expedia','hotels','airbnb','trivago','kayak','skyscanner',
  'uber','lyft','doordash','grubhub','postmates','yelp','opentable','zomato',
  // Finance / payments
  'paypal','stripe','venmo','cashapp','wise','revolut','klarna',
  // Productivity SaaS (not relevant defense leads)
  'microsoft','adobe','oracle','sap','salesforce','hubspot','mailchimp','sendgrid',
  'twilio','notion','airtable','trello','asana','monday','jira','confluence',
  'figma','canva','miro','loom','calendly','typeform','surveymonkey','docusign',
  'hellosign','grammarly','dropbox','intuit','quickbooks','xero',
  // Generic remote/AnyDesk-style consumer SaaS (NEW — anydesk leak)
  'anydesk','teamviewer','logmein','splashtop','chrome-remote',
  // AI / ML platforms
  'chatgpt','openai','anthropic','claude','gemini','bard','midjourney','stability',
  'huggingface','kaggle','colab','jupyter','perplexity','character',
  // Domain registrars / WHOIS
  'register','registrar','whois','domaintools','namebright','porkbun','dynadot',
]);

// Substring patterns for generic news/blog domains (matches anywhere in host).
// Words like `stadtanzeiger-ortenau.de` contain `anzeiger` mid-label.
const NEWS_SUBSTR_RE =
  /(?:zeitung|anzeiger|wochenblatt|tageblatt|tagblatt|tagesspiegel|landeszeitung|nachrichten|rundschau|kurier|abendzeitung|morgenpost|magazin|gazette|tribune|chronicle|herald|encyclopedia|britannica|forum)/i;

/** Hard-block check on the registered domain label. */
export function isHardJunkDomain(host: string): boolean {
  if (!host) return true;
  const h = host.toLowerCase().replace(/^www\./, '');
  const label = registrableLabel(h);
  if (!label || label.length < 3) return true;             // single-letter / 2-char junk
  if (JUNK_LABELS.has(label)) return true;
  if (NEWS_SUBSTR_RE.test(h)) return true;                 // *.zeitung.de, stadtanzeiger-*, britannica.com
  if (NEWS_SUBSTR_RE.test(label)) return true;             // foo-anzeiger, bar-zeitung labels
  return false;
}

/** User-defined Banned Domains list (one per line / comma-separated). */
export function isUserBannedDomain(host: string, banned?: string | null): boolean {
  if (!banned) return false;
  const list = banned.split(/[\n,;]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
  const h = host.toLowerCase().replace(/^www\./, '');
  return list.some((b) => h === b || h.endsWith('.' + b) || h.includes(b));
}

/** First negative keyword present in `text`, else null. */
export function findNegativeKeyword(text: string, negative?: string | null): string | null {
  if (!text || !negative) return null;
  const list = negative.split(/[\n,;]+/).map((s) => s.trim()).filter((s) => s.length > 2);
  const lower = text.toLowerCase();
  for (const kw of list) {
    if (lower.includes(kw.toLowerCase())) return kw;
  }
  return null;
}

// English/German stopwords that often appear as SERP-snippet headlines and
// must NEVER become a company_name.
const STOPWORD_TITLES = new Set([
  'the','a','an','and','or','but','of','for','to','in','on','at','by','with',
  'is','are','was','were','be','been','being','it','its','this','that','these','those',
  'what','which','who','how','why','when','where','about','more','most','best',
  'top','new','old','our','your','their','his','her','my','i','you','we','they',
  'der','die','das','und','oder','aber','von','für','zu','in','auf','mit','ist',
  'sind','war','ein','eine','einen','einem','einer','dass','als','wie','nicht',
  'auch','noch','nur','sehr','schon','unsere','euer','ihr','sein',
  'radar','remote','search','results','google','bing','yahoo','wikipedia',
  'page','site','website','home','about','contact','privacy','terms','help',
  'login','signup','register','download','free','premium','pro','plus',
]);

/**
 * Detects anchor-text strings that came from a search-engine result page
 * (breadcrumb display URL, ellipsis, embedded URL fragment) OR are useless
 * stopword-only headlines.
 */
export function isJunkAnchorText(text: string): boolean {
  if (!text) return true;
  const t = text.trim();
  if (t.length < 2 || t.length > 120) return true;
  if (/[›»…]/.test(t))               return true;   // breadcrumb arrows / ellipsis
  if (/\.\.\./.test(t))              return true;   // truncated SERP titles
  if (/https?:\/\//i.test(t))        return true;   // embedded URL in anchor
  if (/^\W+$/.test(t))               return true;   // purely punctuation
  // Single-word stopword titles (e.g. "Radar", "Remote", "The")
  if (!/\s/.test(t) && STOPWORD_TITLES.has(t.toLowerCase())) return true;
  return false;
}

/** Decode Bing /ck/a and Google /url click-redirects to the real target URL. */
export function unwrapSerpRedirect(rawUrl: string): string {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.toLowerCase();
    if (host.endsWith('bing.com') && u.searchParams.has('u')) {
      const enc = u.searchParams.get('u') || '';
      const b64 = enc.replace(/^a\d/, '');
      try {
        const decoded = Buffer.from(b64, 'base64').toString('utf8');
        if (/^https?:\/\//i.test(decoded)) return decoded;
      } catch {}
    }
    if (host.endsWith('google.com') && u.searchParams.has('q')) {
      const q = u.searchParams.get('q') || '';
      if (/^https?:\/\//i.test(q)) return q;
    }
  } catch {}
  return rawUrl;
}

/** Master rejection check — call from Scout AND Profiler. */
export function rejectReason(host: string, banned?: string | null): string | null {
  if (isHardJunkDomain(host))           return 'HARD_JUNK_DOMAIN';
  if (isUserBannedDomain(host, banned)) return 'USER_BANNED_DOMAIN';
  return null;
}

/**
 * Build the strict pillar-validation prompt for the Judge LLM.
 * Forces a JSON response that includes the matched pillar (or null).
 */
export function buildJudgePrompt(args: {
  companyName: string;
  website: string;
  pageContent: string;
  positiveKeywords: string;
  negativeKeywords: string;
}): string {
  const { companyName, website, pageContent, positiveKeywords, negativeKeywords } = args;
  return `You are an Apex Defense Industry Judge. Apply the SO-WHAT TEST: does this company actually MANUFACTURE PRODUCTS or PROVIDE SERVICES in one of the 8 Defense Pillars below? Marketing fluff, news mentions, encyclopedia entries, software downloads, and generic IT services do NOT count.

THE 8 DEFENSE PILLARS (a lead is QUALIFIED only if it serves at least one):
1. UAV               — Unmanned Aerial Vehicles, military drones, loitering munitions
2. UGV               — Unmanned Ground Vehicles, autonomous land platforms
3. USV               — Unmanned Surface Vehicles, naval autonomous craft, underwater vehicles
4. EW                — Electronic Warfare, jamming, signal intelligence
5. C4ISR             — Command/Control, ISR, battlefield comms, radar, sensors
6. DIRECTED_ENERGY   — Laser weapons, high-power microwave systems
7. ROBOTICS          — Defense robotics, exoskeletons, bomb-disposal robots
8. CYBERSECURITY     — Defense-grade cyber, cleared cyber operators (NOT generic IT)

ELITE POSITIVE KEYWORDS (boost confidence if found): ${positiveKeywords || 'autonomous, ISR, radar, defense, military, tactical'}
NEGATIVE KEYWORDS (auto-reject if found): ${negativeKeywords || 'hobbyist, toy, retail, gambling, adult'}

TARGET COMPANY: ${companyName}
WEBSITE: ${website}

SCRAPED PAGE TEXT (first 6000 chars):
"""
${pageContent.slice(0, 6000)}
"""

Reply with EXACTLY this JSON shape (no prose, no markdown):
{
  "isMatch": boolean,            // true ONLY if company manufactures/provides services in 1+ pillar
  "pillar": "UAV"|"UGV"|"USV"|"EW"|"C4ISR"|"DIRECTED_ENERGY"|"ROBOTICS"|"CYBERSECURITY"|null,
  "sectorTag": string,           // human-readable tag, e.g. "USV Naval Defense" or "C4ISR Radar Systems"
  "isNegative": boolean,         // true if negative keyword detected
  "confidence": number,          // 0.0 to 1.0
  "reason": string               // <= 140 chars, why
}`;
}
