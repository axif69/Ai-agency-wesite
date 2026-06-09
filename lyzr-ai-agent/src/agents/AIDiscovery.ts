import db from '../server/db';
import { addLog } from '../server/db';
import { callAIJson } from '../lib/aiQueue';
import { renderPage } from '../lib/browserScraper';

// ─── The 8 Defense Pillars (Specific Descriptions) ─────────────────────────────────

export const DEFENSE_PILLARS = [
  'Autonomous Systems (UAV/UGV/USV)',
  'Air Defence & Missile Systems',
  'C4ISR Systems',
  'Cyber Security & EW',
  'Maritime Security',
  'Military Logistics & Support',
  'Intelligence & Surveillance',
  'Border Security & Critical Infrastructure',
];

// ─── Top 50 Defense-Producing Countries ──────────────────────────────────────

export const DEFENSE_COUNTRIES = [
  'United States', 'Russia', 'China', 'United Kingdom', 'France',
  'Germany', 'Israel', 'India', 'South Korea', 'Japan',
  'Italy', 'Turkey', 'Australia', 'Canada', 'Sweden',
  'Norway', 'Spain', 'Netherlands', 'Switzerland', 'Poland',
  'Brazil', 'South Africa', 'Singapore', 'Taiwan', 'Ukraine',
  'Finland', 'Belgium', 'Czech Republic', 'Austria', 'Denmark',
  'United Arab Emirates', 'Saudi Arabia', 'Pakistan', 'Indonesia', 'Thailand',
  'Egypt', 'Argentina', 'Chile', 'Colombia', 'Malaysia',
  'Portugal', 'Greece', 'Romania', 'Serbia', 'Croatia',
  'New Zealand', 'Ireland', 'Estonia', 'Latvia', 'Lithuania',
  'Singapore', 'Qatar', 'Kuwait', 'Morocco', 'Luxembourg',
];

interface CompanySeed {
  name: string;
  website_hint?: string | null;
  source?: string;
}

// ─── APPROACH 1: AI Brain-Dump (Primary) ──────────────────────────────────────

const generateBrainDumpSeeds = async (country: string, pillar: string, existingCompanies: string[]): Promise<CompanySeed[]> => {
  const exclusionText = existingCompanies.length > 0
    ? `\nCRITICAL EXCLUSIONS: DO NOT LIST ANY OF THE FOLLOWING COMPANIES: ${existingCompanies.sort(() => 0.5 - Math.random()).slice(0, 50).join(', ')}\n`
    : '';

  const prompt = `You are a B2B Event Sponsorship Specialist for GM Events.
CURRENT EVENT: Global Defense & Security Summit
STRATEGY: Identify and qualify defense manufacturers worldwide across 8 pillars (UAV, UGV, USV, EW, C4ISR, Directed Energy, Robotics, Cybersecurity). Target companies with manufacturing capabilities, defense contracts, or military technology focus.

List REAL companies headquartered in or primarily operating from ${country} that would be ideal SPONSORS or EXHIBITORS for this specific event focusing on: ${pillar}.
${exclusionText}
CRITICAL RULES:
1. DO NOT HALLUCINATE OR INVENT NAMES. If you only know 2 real companies, ONLY list 2.
2. DO NOT generate numbered entities (e.g., "Factory 100", "Factory 200", "Plant 1", "Unit 5"). These are fake.
3. DO NOT generate generic descriptions (e.g., "Factory for Engineering Industries", "Plant for Development Industries"). These are fake.
4. DO NOT repeat the same company name with slight variations (e.g., "Company A - Factory 100", "Company A - Factory 200").
5. Each entry must have the exact registered company name as it appears on official documents.
6. Each company MUST have a real, verifiable website. Do not invent domains.
7. List a maximum of 15 companies. Quality over quantity.
8. Only list well-known defense companies with manufacturing facilities, defense contracts, or military technology.
9. Avoid generic names, numbered variations, or subsidiaries that don't have their own identity.

Output as a JSON object with a single key "companies" containing an array:
{"companies": [{"name": "Company Name", "website_hint": "domain.com"}, ...]}`;

  addLog('SCOUT', `🧠 AI Brain-Dump: ${country} × ${pillar.slice(0, 30)}...`, 'INFO');

  const result = await callAIJson<{ companies: CompanySeed[] }>({
    prompt,
    maxTokens: 2000,
    temperature: 0.2,
    systemPrompt: 'You are a defense industry database. Output only valid JSON. Be accurate — do not hallucinate. Only list real companies with existing websites.'
  });

  return (result?.companies || []).map(c => ({ ...c, source: 'ai_braindump' }));
};

// ─── APPROACH 2: Master List (Primary - RAG) ─────────────────────────────────────
const getMasterSeeds = async (country: string, pillar: string): Promise<CompanySeed[]> => {
  return new Promise((resolve) => {
    try {
      const rows = db.prepare(
        `SELECT company_name as name, website as website_hint FROM master_seeds
         WHERE country = ? AND (pillar IS NULL OR pillar LIKE ?)`
      ).all(country, `%${pillar.slice(0, 15)}%`);
      resolve((rows as any[]).map(r => ({ ...r, source: 'master_list' })));
    } catch {
      resolve([]);
    }
  });
};

// ─── APPROACH 3: Search Architect (Tertiary) ───────────────────────────────────

const generateSearchArchitectSeeds = async (country: string, pillar: string): Promise<CompanySeed[]> => {
  addLog('SCOUT', `🔍 Search Architect: ${country} × ${pillar.slice(0, 30)}...`, 'INFO');

  const queryPrompt = `You are a Search Specialist. Generate 3 highly specific Google search queries (Google Dorks) to find REAL defense companies in ${country} that specialize in: ${pillar}.
Focus on finding their official corporate websites.

Example format: "site:linkedin.com/company 'autonomous' 'South Korea' 'defense'"
Output JSON: {"queries": ["query1", "query2", "query3"]}`;

  const queryResult = await callAIJson<{ queries: string[] }>({
    prompt: queryPrompt,
    systemPrompt: 'You are a search specialist. Output only valid JSON.'
  });
  if (!queryResult || !queryResult.queries) return [];

  const foundCompanies = new Map<string, string>();

  for (const query of queryResult.queries) {
    const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    addLog('SCOUT', `🌐 Executing: ${query}`, 'INFO');

    try {
      const page = await renderPage(searchUrl);
      if (!page) continue;

      const noise = /google|bing|microsoft|linkedin|facebook|twitter|youtube|wikipedia|crunchbase|glassdoor|indeed|bloomberg|reuters|news|blog/i;

      for (const link of page.links) {
        if (!link.href || !link.href.startsWith('http')) continue;

        try {
          const url = new URL(link.href);
          const domain = url.hostname.replace('www.', '').toLowerCase();
          if (domain.split('.').length >= 2 && !noise.test(domain)) {
            const name = link.text.split(' - ')[0].split(' | ')[0].trim();
            if (name.length > 2 && name.length < 60) {
              foundCompanies.set(name, domain);
            }
          }
        } catch {}
      }
    } catch (error: any) {
      addLog('SCOUT', `Search failed: ${error.message}`, 'ERROR');
    }
  }

  return Array.from(foundCompanies.entries()).map(([name, website_hint]) => ({
    name,
    website_hint,
    source: 'search_architect'
  }));
};

// ─── Domain Blacklist ─────────────────────────────────────────────────────────────
const DOMAIN_BLACKLIST = [
  'navalnews.com', 'defensenews.com', 'janes.com', 'flightglobal.com',
  'army-technology.com', 'navaltoday.com', 'marinetechnologynews.com',
  'seapowermagazine.com', 'defenceweb.co.za', 'shephardmedia.com',
  'thedefensepost.com', 'breakingdefense.com', 'defenseone.com',
  'taskandpurpose.com', 'military.com', 'nationalinterest.com',
  '19fortyfive.com', 'sandboxx.us',
  'medium.com', 'wordpress.com', 'blogger.com', 'tumblr.com',
  'techcrunch.com', 'wired.com', 'theguardian.com', 'cnn.com',
  'bbc.com', 'bbc.co.uk', 'aljazeera.com', 'reuters.com',
  'bloomberg.com', 'forbes.com', 'inc.com',
  'linkedin.com/in/', 'indeed.com', 'glassdoor.com', 'monster.com',
  'ziprecruiter.com', 'crunchbase.com', 'pitchbook.com',
  'wikipedia.org', 'wikidata.org', 'reddit.com', 'quora.com',
  'youtube.com', 'facebook.com', 'twitter.com', 'x.com',
  'instagram.com', 'tiktok.com',
  'eventbrite.com', 'meetup.com',
  'google.com', 'yahoo.com', 'bing.com',
];

const isBlacklistedDomain = (url: string): boolean => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return DOMAIN_BLACKLIST.some(b => lower.includes(b.toLowerCase()));
};

// ─── Educational Institution Check ─────────────────────────────────────────────
const EDU_KEYWORDS = ['university', 'polytechnic', 'school of', 'high school', 'college',
  'institute of technology', 'faculty of', 'academy of sciences'];

const isEducational = (name: string): boolean => {
  return EDU_KEYWORDS.some(k => name.toLowerCase().includes(k));
};

// ─── Elite Defense Keywords ─────────────────────────────────────────────────────
const ELITE_KEYWORDS = [
  'autonomous', 'unmanned', 'uav', 'ugv', 'usv', 'uuv', 'drone', 'drones',
  'swarm', 'robotic', 'robotics', 'artificial intelligence', 'ai',
  'machine learning', 'computer vision', 'machine vision',
  'sensor fusion', 'edge ai', 'c4isr', 'isr',
  'intelligence surveillance reconnaissance', 'electronic warfare',
  'sigint', 'geoint', 'situational awareness',
  'loitering munitions', 'counter-drone', 'counter drone', 'counter-uas', 'anti-drone',
  'autonomy', 'autopilot', 'navigation', 'lidar', 'radar ai',
  'target recognition', 'object detection', 'deep learning defense',
  'battlefield iot', 'defense ai', 'military ai',
  'autonomous targeting', 'unmanned systems', 'autonomous weapons',
  'smart munitions', 'intelligent systems',
];

const hasEliteKeyword = (name: string): boolean => {
  const lower = name.toLowerCase();
  return ELITE_KEYWORDS.some(k => lower.includes(k));
};

// ─── Known Defense Primes Whitelist ─────────────────────────────────────────────
const KNOWN_DEFENSE_PRIMES = [
  'raytheon', 'lockheed martin', 'boeing', 'northrop grumman', 'general dynamics',
  'bae systems', 'saab', 'thales', 'leonardo', 'airbus defence',
  'mbda', 'rafael', 'israel aerospace', 'elbit systems', 'diehl defence',
  'rheinmetall', 'krauss-maffei', 'howaldtswerke', 'thyssenkrupp marine',
  'naval group', 'dcns', 'fincantieri', 'damen', 'austal',
  'huntington ingalls', 'general atomics', 'booz allen hamilton',
  'l3harris', 'harris corporation', 'rockwell collins', 'utc aerospace',
  'collins aerospace', 'pratt & whitney', 'rolls-royce', 'mtu aero',
  'safran', 'snecma', 'heroux-devtek', 'cae', 'meggitt', 'ultra electronics',
  'cobham', 'qinetiq', 'chemring', 'avon protection', 'survitec',
  'kbr', 'fluor', 'jacobs', 'aeco', 'peraton', 'perspecta',
  'mantech', 'scienced applications', 'saic', 'caci',
  'textron', 'bell helicopter', 'cessna', 'beechcraft', 'hawker',
  'gulfstream', 'bombardier aerospace', 'embraer defense',
  'airbus military', 'antonov', 'sukhoi', 'mikoyan',
  'irkut corporation', 'yakovlev', 'beriev', 'kamov', 'mil moscow',
  'kazan helicopter', 'rostec', 'almaz-antey', 'tactical missiles',
  'novator', 'npo mashinostroyeniya', 'konstruktorskoe byuro',
  'nizhny novgorod', 'klimov', 'motor sich', 'ivchenko-progress',
  'antonov serial', 'state aviation', 'ukroboronprom', 'turkish aerospace',
  'tai', 'aselsan', 'roketsan', 'mke', 'fnss', 'havelsan',
];

const isKnownDefensePrime = (name: string): boolean => {
  const lower = name.toLowerCase();
  return KNOWN_DEFENSE_PRIMES.some(prime => lower.includes(prime));
};

// ─── Website Content Verification ───────────────────────────────────────────────
const verifyWebsiteContent = async (website: string, companyName: string): Promise<boolean> => {
  if (!website) return false;

  try {
    addLog('SCOUT', `🌐 Verifying website content for ${companyName}...`, 'INFO');
    const { text } = await renderPage(website);

    // Check for defense-related keywords in website content
    const defenseKeywords = [
      'defense', 'defence', 'military', 'aerospace', 'weapon', 'ammunition',
      'security', 'surveillance', 'radar', 'missile', 'drone', 'uav', 'unmanned',
      'c4isr', 'electronic warfare', 'cybersecurity', 'naval', 'maritime',
      'army', 'navy', 'air force', 'combat', 'tactical', 'armored',
      'ballistic', 'rocket', 'satellite', 'communication', 'encryption',
      'countermeasure', 'reconnaissance', 'intelligence',
    ];

    const lowerText = text.toLowerCase();
    const keywordMatches = defenseKeywords.filter(keyword => lowerText.includes(keyword));

    // Require at least 3 defense keywords for verification
    if (keywordMatches.length >= 3) {
      addLog('SCOUT', `✓ ${companyName} - Website verified (found ${keywordMatches.length} defense keywords)`, 'INFO');
      return true;
    } else {
      addLog('SCOUT', `✗ ${companyName} - Website verification failed (only ${keywordMatches.length} defense keywords, need 3+)`, 'WARNING');
      return false;
    }
  } catch (error: any) {
    addLog('SCOUT', `✗ ${companyName} - Website verification error: ${error.message}`, 'WARNING');
    return false;
  }
};

// ─── AI Verification Function ───────────────────────────────────────────────────
const verifyLeadRelevance = async (companyName: string, pillar: string, website?: string): Promise<boolean> => {
  // Fast-track known defense primes
  if (isKnownDefensePrime(companyName)) {
    addLog('SCOUT', `✓ ${companyName} - Known defense prime (auto-verified)`, 'INFO');
    return true;
  }

  // Fast-track elite keyword matches
  if (hasEliteKeyword(companyName)) {
    addLog('SCOUT', `✓ ${companyName} - Elite keyword match (auto-verified)`, 'INFO');
    return true;
  }

  // Reject blacklisted domains
  if (website && isBlacklistedDomain(website)) {
    addLog('SCOUT', `✗ ${companyName} - Blacklisted domain: ${website}`, 'WARNING');
    return false;
  }

  // Reject educational institutions
  if (isEducational(companyName)) {
    addLog('SCOUT', `✗ ${companyName} - Educational institution (rejected)`, 'WARNING');
    return false;
  }

  // Website verification is REQUIRED for all non-fast-tracked companies
  if (!website) {
    addLog('SCOUT', `✗ ${companyName} - No website provided (cannot verify)`, 'WARNING');
    return false;
  }

  // Verify website content
  const isWebsiteValid = await verifyWebsiteContent(website, companyName);
  if (!isWebsiteValid) {
    return false;
  }

  // AI verification as final check
  const prompt = `You are a defense industry expert. Analyze if this company is a REAL defense company.

Company: ${companyName}
Website: ${website}
Defense Pillar: ${pillar}

The 8 defense pillars are: UAV, UGV, USV, EW, C4ISR, Directed Energy, Robotics, Cybersecurity.

Answer YES if:
1. The company is a REAL, EXISTING defense manufacturer, contractor, or government entity
2. The company works in ANY defense sector (not just the specific pillar - defense companies often work across multiple areas)
3. The company is NOT a generic tech company, consumer brand, or unrelated business

Answer NO if:
1. The company is fake, hallucinated, or doesn't exist
2. The company is unrelated to defense (retail, consumer, generic IT, etc.)

Output JSON: {"relevant": true/false, "reason": "brief explanation"}`;

  try {
    const result = await callAIJson<{ relevant: boolean; reason: string }>({
      prompt,
      maxTokens: 500,
      temperature: 0.2,
      systemPrompt: 'You are a defense industry analyst. Accept ANY legitimate defense company regardless of specific pillar match. Defense companies often work across multiple sectors.'
    });
    return result?.relevant || false;
  } catch {
    return false;
  }
};

// ─── Main Discovery Function ────────────────────────────────────────────────────

export class AIDiscovery {
  static async discover(campaign: any) {
    const countries = DEFENSE_COUNTRIES;
    const pillars = DEFENSE_PILLARS;

    // Shuffle and select 5 countries and 5 pillars for this cycle (like old agent)
    const selectedCountries = [...countries].sort(() => 0.5 - Math.random()).slice(0, 5);
    const selectedPillars = [...pillars].sort(() => 0.5 - Math.random()).slice(0, 5);

    addLog('SCOUT', `🚀 AI Discovery: ${selectedCountries.join(', ')} × ${selectedPillars.length} pillars`, 'INFO');

    let totalInserted = 0;

    try {
      for (const selectedCountry of selectedCountries) {
        for (const selectedPillar of selectedPillars) {
          addLog('SCOUT', `🧠 Discovery: ${selectedCountry} × ${selectedPillar.slice(0, 40)}...`, 'INFO');

          // Get existing companies for this country to avoid duplicates
          const existing = db.prepare('SELECT company_name FROM leads WHERE country = ?').all(selectedCountry).map((r: any) => r.company_name);

          // Run Master List (primary approach - RAG from known companies)
          const masterSeeds = await getMasterSeeds(selectedCountry, selectedPillar);

          // Run AI Brain-Dump (secondary approach)
          const brainSeeds = await generateBrainDumpSeeds(selectedCountry, selectedPillar, existing);

          // Run Search Architect (tertiary approach)
          const searchSeeds = await generateSearchArchitectSeeds(selectedCountry, selectedPillar);

          const allSeeds = [...masterSeeds, ...brainSeeds, ...searchSeeds];
          addLog('SCOUT', `📊 Results: Master(${masterSeeds.length}) | AI(${brainSeeds.length}) | Search(${searchSeeds.length})`, 'INFO');

          let inserted = 0;
          for (const seed of allSeeds) {
            if (!seed.name || seed.name.length < 2) continue;

            // Clean the website hint
            let website: string | null = null;
            if (seed.website_hint && seed.website_hint !== 'null' && seed.website_hint.length > 3) {
              website = seed.website_hint.startsWith('http') ? seed.website_hint : `https://${seed.website_hint}`;
            }

            // Check if already exists
            const exists = db.prepare('SELECT id FROM leads WHERE company_name = ? OR website = ?').get(seed.name, website);
            if (exists) continue;

            // Pre-verification checks before inserting
            if (website && isBlacklistedDomain(website)) {
              addLog('SCOUT', `✗ ${seed.name} - Blacklisted domain (skipped)`, 'WARNING');
              continue;
            }

            if (isEducational(seed.name)) {
              addLog('SCOUT', `✗ ${seed.name} - Educational institution (skipped)`, 'WARNING');
              continue;
            }

            // Fast-track known defense primes and elite keyword matches
            const isPrime = isKnownDefensePrime(seed.name);
            const hasElite = hasEliteKeyword(seed.name);

            // Insert with READY status first
            const info = db.prepare(
              'INSERT OR IGNORE INTO leads (company_name, website, country, status, sector) VALUES (?, ?, ?, ?, ?)'
            ).run(
              seed.name.trim(),
              website || '',
              selectedCountry,
              'READY',
              selectedPillar.toUpperCase()
            );

            if (info.changes > 0) {
              // AI verification - check if company matches the defense pillar
              const isRelevant = await verifyLeadRelevance(seed.name, selectedPillar, website);
              if (isRelevant || isPrime || hasElite) {
                // Update to VERIFIED if AI confirms it matches the pillar
                db.prepare('UPDATE leads SET status = ? WHERE company_name = ?').run('VERIFIED', seed.name.trim());
                inserted++;
                totalInserted++;
                const reason = isPrime ? ' (defense prime)' : hasElite ? ' (elite keyword)' : ' (verified)';
                addLog('SCOUT', `+ ${seed.name} (${seed.source}) ✓ VERIFIED${reason}`, 'INFO');
              } else {
                // Delete if AI says it's not relevant
                db.prepare('DELETE FROM leads WHERE company_name = ?').run(seed.name.trim());
                addLog('SCOUT', `✗ ${seed.name} - verification failed (deleted)`, 'WARNING');
              }
            }
          }

          addLog('SCOUT', `✅ ${selectedCountry} × ${selectedPillar.slice(0, 30)}: ${inserted} new leads added`, 'INFO');
        }
      }

      addLog('SCOUT', `🏁 Cycle complete: ${totalInserted} total new leads added`, 'SUCCESS');
    } catch (error: any) {
      addLog('SCOUT', `Discovery failed: ${error.message}`, 'ERROR');
    }
  }
}
