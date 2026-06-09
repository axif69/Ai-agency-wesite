import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'sniper.db');
const db = new Database(dbPath);

// Multi-process safe pragmas
db.pragma('journal_mode = WAL');
db.pragma('busy_timeout = 5000');
db.pragma('synchronous = NORMAL');
db.pragma('foreign_keys = ON');

// ── State machine: allowed transitions ─────────────────────────────────────
export const VALID_STATES = [
  'READY','PROFILING','PROFILE_FAILED','JUDGING','HUNTING','HUNT_FAILED',
  'DRAFTING','WRITING','COMPLETED','REJECTED','VERIFIED'
] as const;
export type LeadState = typeof VALID_STATES[number];

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  READY:          ['PROFILING','REJECTED','VERIFIED'],
  PROFILING:      ['JUDGING','PROFILE_FAILED','REJECTED'],
  PROFILE_FAILED: ['JUDGING','REJECTED','PROFILING'],
  JUDGING:        ['HUNTING','REJECTED'],
  HUNTING:        ['DRAFTING','HUNT_FAILED','VERIFIED'],
  HUNT_FAILED:    ['HUNTING','REJECTED'],
  DRAFTING:       ['WRITING','COMPLETED'],
  WRITING:        ['COMPLETED','DRAFTING'],
  COMPLETED:      [],
  VERIFIED:       [],
  REJECTED:       [],
};

/** Safe state transition. Silently refuses illegal moves and logs. */
export function transition(leadId: number, to: LeadState, extraSql = '', extraParams: any[] = []): boolean {
  const row = db.prepare('SELECT status FROM leads WHERE id = ?').get(leadId) as { status: string } | undefined;
  if (!row) return false;
  const from = row.status;
  const ok = ALLOWED_TRANSITIONS[from]?.includes(to);
  if (!ok) {
    console.warn(`[STATE] Illegal transition ${from} → ${to} for lead ${leadId}`);
    return false;
  }
  const sql = `UPDATE leads SET status = ?, last_updated = CURRENT_TIMESTAMP${extraSql ? ', ' + extraSql : ''} WHERE id = ?`;
  db.prepare(sql).run(to, ...extraParams, leadId);
  return true;
}

export function initDb() {
  // Drop if schema is old (detecting old column name)
  try {
    const info = db.prepare("PRAGMA table_info(campaign_settings)").all();
    const hasOldColumn = info.some((c: any) => c.name === 'niche_name');
    if (hasOldColumn) {
      console.log('Old Schema Detected. Resetting Database for Sovereign V5.1 parity...');
      db.prepare('DROP TABLE IF EXISTS campaign_settings').run();
      db.prepare('DROP TABLE IF EXISTS leads').run();
      db.prepare('DROP TABLE IF EXISTS system_logs').run();
    }
  } catch (e) {}

  // Settings
  db.prepare(`
    CREATE TABLE IF NOT EXISTS campaign_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agency_name TEXT DEFAULT 'GM Events',
      agency_rep TEXT DEFAULT 'Asif Khan',
      agency_website TEXT DEFAULT 'https://gmevents.ae',
      agency_phone TEXT,
      agency_location TEXT DEFAULT 'UAE / Dubai',
      campaign_name TEXT DEFAULT 'Global Event Sniper',
      campaign_strategy TEXT,
      brochure_path TEXT,
      brochure_content TEXT,
      openai_key TEXT,
      anthropic_key TEXT,
      google_key TEXT,
      openrouter_key TEXT,
      openrouter_base_url TEXT DEFAULT 'https://openrouter.ai/api/v1',
      openrouter_model TEXT DEFAULT 'google/gemma-7b-it:free',
      apollo_key TEXT,
      model_discovery TEXT DEFAULT 'gpt-4o',
      model_categorization TEXT DEFAULT 'gpt-4o',
      model_enrichment TEXT DEFAULT 'gpt-4o',
      model_personalization TEXT DEFAULT 'gpt-4o',
      target_designations TEXT DEFAULT 'CEO, MD, Head of Marketing, Head of Sales, Export Manager',
      niche_keywords TEXT DEFAULT 'Conference, Expo, Trade Show',
      target_countries TEXT DEFAULT 'UAE, UK, USA, Germany',
      sector_pillars TEXT,
      smtp_host TEXT,
      smtp_port TEXT,
      smtp_user TEXT,
      smtp_pass TEXT,
      discovery_concurrency INTEGER DEFAULT 5,
      enrichment_concurrency INTEGER DEFAULT 5,
      personalization_concurrency INTEGER DEFAULT 5,
      scrape_timeout INTEGER DEFAULT 30000,
      retry_count INTEGER DEFAULT 3,
      daily_send_cap INTEGER DEFAULT 500,
      negative_keywords TEXT DEFAULT 'Gambling, Adult, Crypto, Retail',
      follow_up_delay INTEGER DEFAULT 3
    )
  `).run();

  // Leads
  db.prepare(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT DEFAULT 'READY',
      company_name TEXT,
      website TEXT UNIQUE,
      country TEXT,
      niche_category TEXT,
      top_designation TEXT,
      contact_name TEXT,
      verified_email TEXT,
      verified_mobile TEXT,
      contact_phone TEXT,
      contact_linkedin TEXT,
      sector TEXT,
      pitch_draft TEXT,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Logs
  db.prepare(`
    CREATE TABLE IF NOT EXISTS system_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent TEXT,
      message TEXT,
      type TEXT DEFAULT 'INFO',
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Manual Stage Triggers (polled by each agent process every 2s)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS triggers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stage TEXT NOT NULL,
      consumed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Agent heartbeat (for System Health panel)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS agent_heartbeat (
      agent TEXT PRIMARY KEY,
      last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'IDLE'
    )
  `).run();

  // Master seeds table (known defense companies from exhibitions)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS master_seeds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      website TEXT,
      country TEXT,
      category TEXT,
      source TEXT,
      pillar TEXT
    )
  `).run();

  // Master seeds table (known defense companies from exhibitions)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS master_seeds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      website TEXT,
      country TEXT,
      category TEXT,
      source TEXT,
      pillar TEXT
    )
  `).run();

  // ── Idempotent column migrations (safe on every boot) ──────────────────
  const settingsCols = (db.prepare('PRAGMA table_info(campaign_settings)').all() as { name: string }[]).map((c) => c.name);
  if (!settingsCols.includes('banned_domains')) {
    db.prepare("ALTER TABLE campaign_settings ADD COLUMN banned_domains TEXT DEFAULT 'hotmail.com,outlook.com,gmail.com,yahoo.com,wetransfer.com,dropbox.com,amazon.com,ebay.com'").run();
  }
  if (!settingsCols.includes('niche_keywords')) {
    db.prepare("ALTER TABLE campaign_settings ADD COLUMN niche_keywords TEXT DEFAULT ''").run();
  }
  const leadsCols = (db.prepare('PRAGMA table_info(leads)').all() as { name: string }[]).map((c) => c.name);
  if (!leadsCols.includes('rejection_reason')) {
    db.prepare('ALTER TABLE leads ADD COLUMN rejection_reason TEXT').run();
  }

  // Insert default campaign settings if table is empty
  const existingSettings = db.prepare('SELECT COUNT(*) as count FROM campaign_settings').get() as { count: number };
  if (existingSettings.count === 0) {
    db.prepare(`
      INSERT INTO campaign_settings (
        agency_name, agency_rep, agency_website, agency_phone, agency_location,
        campaign_name, campaign_strategy,
        niche_keywords, target_countries, sector_pillars,
        target_designations, negative_keywords, banned_domains
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'GM Events',
      'Your Name',
      'https://gm-events.com',
      '+1 555-123-4567',
      'Dubai, UAE',
      'Global Defense Manufacturers Outreach 2026',
      'Identify and qualify defense manufacturers worldwide across 8 pillars (UAV, UGV, USV, EW, C4ISR, Directed Energy, Robotics, Cybersecurity). Target companies with manufacturing capabilities, defense contracts, or military technology focus. Prioritize NATO and allied markets, then expand to global defense industry hubs.',
      'Radar, UAV, UGV, USV, Electronic Warfare, EW, C4ISR, ISR, Directed Energy, Robotics, Cybersecurity, Military Technology, Defense Systems, Tactical Communications, Command and Control Systems, Secure Communications, Military Surveillance, ISR Systems, Reconnaissance, Countermeasures, Signal Intelligence, SIGINT, Electronic Countermeasures, ECM, Electronic Counter-Countermeasures, ECCM, Autonomous Systems, Unmanned Systems, Drone Technology, Combat Systems, Missile Defense, Satellite Communications, SATCOM, Battlefield Management, Network Centric Warfare, Cryptography, Information Security, Threat Detection, Sensors, Electro-Optics, Infrared, Military Thermal Imaging, Defense Thermal Cameras, High Energy Weapons, Non-Lethal Weapons, Naval Defense, Maritime Security, Border Security, Critical Infrastructure Protection, Military Simulation, Training Systems, Defense Electronics, Avionics, Defense Contracting, Military Manufacturing',
      'USA, UK, Germany, France, Israel, India, South Korea, Japan, Australia, Canada, Italy, Spain, Turkey, UAE, Saudi Arabia, Singapore, Sweden, Norway, Poland, Ukraine, Brazil, South Africa, Switzerland, Netherlands, Belgium, Finland, Greece, Pakistan, Egypt, Thailand, Indonesia, Malaysia',
      'UAV, UGV, USV, EW, C4ISR, Directed Energy, Robotics, Cybersecurity',
      'CEO, MD, Head of Marketing, Head of Sales, Export Manager, Business Development, Director, Vice President, CTO, CIO, COO, CFO, General Manager, Managing Director, Chief Executive Officer, Managing Director, Director of Business Development, Director of Sales, Director of Marketing, Director of Operations, Director of Technology, Director of Engineering, Director of Programs, Director of Defense Programs, Director of International Sales, Director of Export Sales, Head of International Business, Head of Defense Sales, Head of Export Sales, VP of Business Development, VP of Sales, VP of Marketing, VP of Operations, VP of Technology, VP of Engineering, VP of Programs, VP of Defense Programs, VP of International Sales, VP of Export Sales',
      'hobbyist, toy, retail, gambling, adult, porn, casino, betting, gaming, esports, entertainment, music, movie, film, celebrity, fashion, beauty, lifestyle, blog, news, forum, wiki, encyclopedia, dictionary, education, school, university, college, course, tutorial, how-to, diy, craft, art, design, photography, cooking, recipe, food, restaurant, travel, tourism, hotel, booking, ticket, event, conference, expo, trade show, exhibition, job, career, recruitment, hiring, freelance, gig, marketplace, shopping, e-commerce, store, shop, mall, auction, classified, dating, social, network, community, chat, messaging, video, streaming, download, software, app, game, mobile, phone, tablet, computer, hardware, repair, service, maintenance, cleaning, landscaping, construction, real estate, property, rental, insurance, finance, banking, investment, crypto, blockchain, nft, metaverse, web3, startup, incubator, accelerator, vc, angel, funding, grant, charity, nonprofit, ngo, government, politics, election, law, legal, attorney, lawyer, medical, health, fitness, wellness, pharmacy, drug, medicine',
      'hotmail.com, outlook.com, gmail.com, yahoo.com, icloud.com, aol.com, mail.com, protonmail.com, tutanota.com, gmail.co.uk, gmail.de, gmail.fr, gmail.cn, gmail.in, gmail.ru, gmail.br, gmail.jp, gmail.kr, gmail.au, gmail.ca, gmail.es, gmail.it, gmail.nl, gmail.se, gmail.no, gmail.dk, gmail.fi, gmail.pl, gmail.cz, gmail.hu, gmail.ro, gmail.bg, gmail.gr, gmail.tr, gmail.il, gmail.sa, gmail.ae, gmail.pk, gmail.bd, gmail.in, gmail.sg, gmail.my, gmail.th, gmail.vn, gmail.id, gmail.ph, wetransfer.com, dropbox.com, google.com, drive.google.com, docs.google.com, amazon.com, amazon.co.uk, amazon.de, amazon.fr, amazon.in, amazon.ca, amazon.au, amazon.jp, amazon.cn, amazon.es, amazon.it, amazon.nl, amazon.se, amazon.br, amazon.mx, ebay.com, ebay.co.uk, ebay.de, ebay.fr, ebay.it, ebay.es, ebay.ca, ebay.au, alibaba.com, aliexpress.com, taobao.com, tmall.com, jd.com, walmart.com, target.com, bestbuy.com, newegg.com, baidu.com, qihoo.com, sohu.com, sina.com.cn, 163.com, qq.com, weibo.com, zhihu.com, douban.com, tieba.baidu.com, bbs.tianya.cn, tianya.cn, renren.com, kaixin001.com, 51.com, 360.cn, hao123.com, soso.com, sogou.com, youdao.com, cn.bing.com, bing.com, google.cn, google.com.hk, google.co.jp, google.co.kr, google.co.uk, google.de, google.fr, google.it, google.es, google.ca, google.au, google.in, google.ru, google.br, google.mx, wikipedia.org, wikimedia.org, wiktionary.org, wikihow.com, britannica.com, encyclopediabritannica.com, investopedia.com, about.com, answers.com, quora.com, stackoverflow.com, github.com, bitbucket.org, gitlab.com, sourceforge.net, codeplex.com, cnet.com, download.com, softonic.com, filehippo.com, majorgeeks.com, techspot.com, tomsguide.com, pcworld.com, pcmag.com, pcadvisor.co.uk, computerworld.com, techradar.com, engadget.com, gizmodo.com, theverge.com, arstechnica.com, anandtech.com, extremetech.com, wired.com, venturebeat.com, mashable.com, nextgov.com, federalnewsnetwork.com, fcw.com, defenseone.com, breakingdefense.com, janes.com, ihs.com, flightglobal.com, aviationweek.com, spacewar.com, army-technology.com, naval-technology.com, airforce-technology.com, shephardmedia.com'
    );
  }

  // Performance indexes — critical for 15k-lead scale
  db.prepare('CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)').run();
  db.prepare('CREATE INDEX IF NOT EXISTS idx_leads_updated ON leads(last_updated)').run();
  db.prepare('CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON system_logs(timestamp)').run();
  db.prepare('CREATE INDEX IF NOT EXISTS idx_triggers_consumed ON triggers(consumed, stage)').run();
}

export function addLog(agent: string, message: string, type: string = 'INFO') {
  const color = type === 'ERROR' ? '\x1b[31m' : type === 'SUCCESS' ? '\x1b[32m' : '\x1b[34m';
  console.log(`[${new Date().toLocaleTimeString()}] ${color}${agent}\x1b[0m: ${message}`);
  try {
    db.prepare('INSERT INTO system_logs (agent, message, type) VALUES (?, ?, ?)').run(agent, message, type);
  } catch (e) {}
}

/** Agent calls this each loop iteration so the UI can show green/amber/red. */
export function heartbeat(agent: string, status: string = 'RUNNING') {
  try {
    db.prepare(`
      INSERT INTO agent_heartbeat (agent, last_seen, status) VALUES (?, CURRENT_TIMESTAMP, ?)
      ON CONFLICT(agent) DO UPDATE SET last_seen = CURRENT_TIMESTAMP, status = excluded.status
    `).run(agent, status);
  } catch (e) {}
}

/** Pops one unconsumed trigger for a stage (used by agent processes). */
export function consumeTrigger(stage: string): boolean {
  const row = db.prepare('SELECT id FROM triggers WHERE stage = ? AND consumed = 0 ORDER BY id ASC LIMIT 1').get(stage) as { id: number } | undefined;
  if (!row) return false;
  db.prepare('UPDATE triggers SET consumed = 1 WHERE id = ?').run(row.id);
  return true;
}

/**
 * Junk-lead cleanup — deletes any lead that:
 *   1. matches the hard-junk domain regex (freemail, file-share, marketplaces)
 *   2. matches the user's Banned Domains list
 *   3. is in REJECTED state with no useful data
 *
 * Safe to call on any schedule (idempotent, transactional).
 * Returns the number of rows deleted.
 */
export async function cleanupJunkLeads(): Promise<{ deleted: number; reasons: Record<string, number> }> {
  const { isHardJunkDomain, isUserBannedDomain } = await import('../lib/junkFilter');
  const settings = db.prepare('SELECT banned_domains FROM campaign_settings ORDER BY id DESC LIMIT 1').get() as { banned_domains?: string } | undefined;
  const banned = settings?.banned_domains || '';

  const all = db.prepare('SELECT id, website FROM leads').all() as { id: number; website: string }[];
  const toDelete: number[] = [];
  const reasons: Record<string, number> = { hard_junk: 0, user_banned: 0, rejected_empty: 0 };

  for (const row of all) {
    if (!row.website) continue;
    let host = '';
    try { host = new URL(row.website).hostname.replace(/^www\./, '').toLowerCase(); } catch { continue; }
    if (isHardJunkDomain(host))           { toDelete.push(row.id); reasons.hard_junk++;   continue; }
    if (isUserBannedDomain(host, banned)) { toDelete.push(row.id); reasons.user_banned++; continue; }
  }

  // Also drop REJECTED leads that have no contact data (no value to keep)
  const emptyRejected = db.prepare(
    "SELECT id FROM leads WHERE status = 'REJECTED' AND (verified_email IS NULL OR verified_email = '')"
  ).all() as { id: number }[];
  for (const r of emptyRejected) { toDelete.push(r.id); reasons.rejected_empty++; }

  if (toDelete.length === 0) return { deleted: 0, reasons };

  const txn = db.transaction((ids: number[]) => {
    const stmt = db.prepare('DELETE FROM leads WHERE id = ?');
    for (const id of ids) stmt.run(id);
  });
  // De-duplicate IDs before delete
  const uniq = Array.from(new Set(toDelete));
  txn(uniq);
  addLog('SYSTEM', `Cleanup deleted ${uniq.length} junk leads (hard:${reasons.hard_junk}, banned:${reasons.user_banned}, rejected_empty:${reasons.rejected_empty}).`, 'WARNING');
  return { deleted: uniq.length, reasons };
}

export default db;
