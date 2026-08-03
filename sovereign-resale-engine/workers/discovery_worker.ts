import { db, initDB } from '../db.js';
import { loadSystemConfig } from '../config_manager.js';
import { runGmbNinjaScan } from '../gmb_stealth.js';
import { findLeadTargetsFast, cleanCompanyName } from '../search_service.js';
import { logToDashboard } from '../shared_utils.js';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const MAX_PAGES_PER_VARIANT = 5; // Pages 1-5 per variant = 50 different results

/**
 * DISCOVERY QUERY HISTORY MANAGER
 * Tracks used queries + page offsets in the DB so we never repeat the same SERP page.
 * Rotates through keywords AND pages systematically.
 *
 * AUTO-ROTATION (Bug 7 fix):
 *  - If the history was last saved more than 7 days ago, the SERP landscape has changed —
 *    the whole map is cleared so discovery fetches fresh results for every variant.
 *  - If the map has grown beyond 2000 variants, exhausted variants (page offset >= max)
 *    are pruned so memory/DB size stays bounded and stale queries stop dominating.
 */
async function getQueryHistory(): Promise<Record<string, number>> {
    return new Promise((res) => {
        db.get("SELECT value, timestamp FROM metrics WHERE key = 'discovery_query_history'", (err, row: any) => {
            if (err || !row) return res({});

            // 7-day freshness rotation
            if (row.timestamp) {
                const iso = String(row.timestamp).trim().replace(' ', 'T');
                const lastSave = new Date(/Z|[+-]\d\d:\d\d$/.test(iso) ? iso : iso + 'Z').getTime();
                const ageDays = Number.isFinite(lastSave) ? (Date.now() - lastSave) / 86400000 : NaN;
                if (Number.isFinite(ageDays) && ageDays > 7) {
                    console.log(`🔄 [DISCOVERY] Query history is ${Math.round(ageDays)}d old (>7d). Auto-clearing for fresh discovery results.`);
                    return res({});
                }
            }

            let parsed: Record<string, number> = {};
            try {
                parsed = row.value ? JSON.parse(row.value) : {};
            } catch {
                return res({});
            }
            if (!parsed || typeof parsed !== 'object') return res({});

            // Bounded-growth prune: drop exhausted variants when the map explodes
            const entries = Object.entries(parsed);
            if (entries.length > 2000) {
                const pruned: Record<string, number> = {};
                for (const [k, v] of entries) {
                    if (Number(v) < MAX_PAGES_PER_VARIANT) pruned[k] = Number(v);
                    if (Object.keys(pruned).length >= 1500) break;
                }
                console.log(`🧹 [DISCOVERY] Pruned query history from ${entries.length} to ${Object.keys(pruned).length} variants.`);
                return res(pruned);
            }
            return res(parsed);
        });
    });
}

async function saveQueryHistory(history: Record<string, number>): Promise<void> {
    return new Promise((res) => {
        db.run(
            "INSERT OR REPLACE INTO metrics (key, value, timestamp) VALUES ('discovery_query_history', ?, CURRENT_TIMESTAMP)",
            [JSON.stringify(history)],
            () => res()
        );
    });
}

/**
 * AI-POWERED QUERY MUTATION ENGINE
 * Dynamically generates fresh query variations so we never get the same companies twice.
 * This ensures the discovery engine always finds new untapped niches.
 */
function generateQueryVariants(baseKeyword: string, location: string): string[] {
    const kw = baseKeyword.trim();
    const loc = location || 'UAE';

    // Systematic mutations that search engines treat as DIFFERENT queries → different SERP results
    return [
        `${kw} ${loc}`,
        `${kw} companies ${loc}`,
        `top ${kw} firms ${loc}`,
        `${kw} agencies ${loc}`,
        `${kw} consultancies ${loc}`,
        `best ${kw} ${loc}`,
        `${kw} services ${loc}`,
        `${kw} providers ${loc}`,
        `leading ${kw} ${loc}`,
        `${kw} Dubai`,
        `${kw} Abu Dhabi`,
        `${kw} Sharjah`,
        `${kw} MENA`,
        `${loc} ${kw}`,
        `${kw} b2b ${loc}`,
        `${kw} SME ${loc}`,
        `established ${kw} ${loc}`,
        `${kw} startups ${loc}`,
    ];
}

/**
 * SELECT NEXT QUERY WITH PAGE ROTATION
 * Returns: { query, pageOffset } — tracks which page of results we've already scraped for each query.
 * Page 0 = Page 1 (results 1-10), Page 1 = Page 11-20, etc.
 * When all pages for a query are exhausted, resets to 0 to cycle fresh queries.
 */
async function selectNextQueryWithPageRotation(
    queryPool: string[],
    location: string,
    history: Record<string, number>
): Promise<{ query: string; pageOffset: number; variantKey: string }> {
    // Generate all variants for all keywords
    const allVariants: Array<{ key: string; baseKw: string }> = [];
    for (const kw of queryPool) {
        const variants = generateQueryVariants(kw, location);
        variants.forEach((v, i) => {
            allVariants.push({ key: `${kw}___variant_${i}`, baseKw: v });
        });
    }

    // Find the variant that's been used the LEAST pages (or not at all)
    // Sort by page offset ascending so we always pick the freshest variant
    const sorted = allVariants.sort((a, b) => {
        const pagesA = history[a.key] ?? -1; // -1 = never used, prioritize these
        const pagesB = history[b.key] ?? -1;
        return pagesA - pagesB;
    });

    const chosen = sorted[0];
    const currentPage = history[chosen.key] ?? 0;

    if (currentPage >= MAX_PAGES_PER_VARIANT) {
        // This variant is exhausted — reset history for it and pick next fresh one
        delete history[chosen.key];
        // Pick the next one that's not exhausted
        const fresh = sorted.find(v => (history[v.key] ?? 0) < MAX_PAGES_PER_VARIANT) || sorted[0];
        const freshPage = history[fresh.key] ?? 0;
        return { query: fresh.baseKw, pageOffset: freshPage, variantKey: fresh.key };
    }

    return { query: chosen.baseKw, pageOffset: currentPage, variantKey: chosen.key };
}

async function runDiscoveryWorker() {
    console.log("🟢 [WORKER: DISCOVERY v3.0] Smart Page-Rotating Discovery Engine Online...");
    console.log("   🔄 Features: Query history tracking | Page rotation | Fresh variant generation");
    await initDB();

    // Independent liveness ticker: keeps the DB heartbeat fresh even while a single
    // iteration is blocked on a long GMB/web scan (>60s), so the Dashboard keeps
    // reporting the engine as RUNNING instead of flipping to STOPPED mid-scan.
    setInterval(async () => {
        try {
            const s = await loadSystemConfig();
            if (s.engine_paused) return; // never report alive while paused
            await new Promise<void>((res) => {
                db.run("INSERT OR REPLACE INTO heartbeat (worker_id, last_active) VALUES ('discovery_worker', CURRENT_TIMESTAMP)", () => res());
            });
        } catch (_) {}
    }, 15000);

    while (true) {
        try {
            const settings = await loadSystemConfig();
            if (settings.engine_paused) {
                console.log("😴 [DISCOVERY] Engine paused from dashboard. Sleeping...");
                await delay(15000);
                continue;
            }

            // Write heartbeat to DB so Dashboard displays RUNNING status
            // (schema: heartbeat(worker_id TEXT, last_active DATETIME))
            await new Promise<void>((res) => {
                db.run("INSERT OR REPLACE INTO heartbeat (worker_id, last_active) VALUES ('discovery_worker', CURRENT_TIMESTAMP)", () => res());
            });

            const targetLocation = settings.target_location || settings.TARGET_LOCATION || 'UAE';
            // Dashboard target niches (TARGET_NICHES) are authoritative for targeting.
            // If empty, discovery pauses - no hardcoded fallbacks allowed.
            let queryPool: string[] = [];
            if (settings.TARGET_NICHES || settings.target_niches) {
                try {
                    const parsed = JSON.parse(settings.TARGET_NICHES || settings.target_niches);
                    if (Array.isArray(parsed)) {
                        queryPool = parsed.map((s: any) => String(s).trim()).filter(Boolean);
                    }
                } catch (_) {}
            }

            if (queryPool.length === 0) {
                console.log("⚠️ [DISCOVERY] No target niches configured in DB settings (TARGET_NICHES). Sleeping 30s...");
                await delay(30000);
                continue;
            }

            // Load query history from DB
            const history = await getQueryHistory();

            // Select next query + page offset (never repeat same SERP page)
            const { query, pageOffset, variantKey } = await selectNextQueryWithPageRotation(queryPool, targetLocation, history);

            console.log(`🚀 [DISCOVERY] Query: "${query}" | Page: ${pageOffset + 1} | Variant: ${variantKey}`);
            await logToDashboard(`🔍 Discovery scan: "${query}" (Page ${pageOffset + 1})`, 'info');

            // === DUAL STRATEGY: GMB Ninja + Multi-Page Web Search ===
            let leads: any[] = [];

            // Strategy 1: GMB Maps (doesn't support pagination but great for local UAE companies)
            if (pageOffset === 0) {
                // Only do GMB on page 0 to avoid re-scanning the same Maps results
                leads = await runGmbNinjaScan(query, targetLocation, false);
                console.log(`🗺️ [DISCOVERY] GMB returned ${leads.length} leads`);
            }

            // Strategy 2: Multi-source web search with page offset for deeper SERP pages
            const { leads: webLeads } = await findLeadTargetsFast(query, pageOffset);
            const mappedWebLeads = (webLeads || []).map((r: any) => ({
                company_name: r.company_name || r.name || '',
                website: r.website || r.url || '',
                context: r.snippet || `Web search lead for ${query} (page ${pageOffset + 1})`,
                source: 'web_search'
            })).filter((r: any) => r.company_name && r.website);

            leads = [...leads, ...mappedWebLeads];
            console.log(`🌐 [DISCOVERY] Total leads found: ${leads.length} (${mappedWebLeads.length} from web search page ${pageOffset + 1})`);

            let added = 0;

            const negativeList = String(settings.negative_keywords || settings.NEGATIVE_KEYWORDS || 'children,kids,nursery,school,clinic,hospital,garage').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);

            for (const lead of leads) {
                if (!lead.website || !lead.company_name) continue;
                
                const cleanedName = cleanCompanyName(lead.company_name);
                if (!cleanedName) continue; // Skip rejected names (news, blog, directory)
                
                const domain = lead.website.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();

                // Skip the operator's own domains (self-identification)
                const selfDomains = [settings.company_url, settings.COMPANY_URL]
                    .filter(Boolean)
                    .map((u: any) => String(u).replace(/^https?:\/\//, '').split('/')[0].toLowerCase())
                    .concat(['asifdigital.agency']);
                if (selfDomains.some((d: string) => d && (domain === d || domain.endsWith('.' + d)))) {
                    continue;
                }

                // Quick negative keyword rejection check
                const nameLower = cleanedName.toLowerCase();
                if (negativeList.some(neg => nameLower.includes(neg))) {
                    continue;
                }

                const exists = await new Promise((res) => db.get("SELECT id FROM leads WHERE domain = ? OR website LIKE ?", [domain, `%${domain}%`], (err, row) => res(!!row)));

                if (!exists) {
                    // Neutral fit at discovery — enrichment/drafting score genuine buyer fit later.
                    await new Promise<void>((res) => db.run(
                        "INSERT OR IGNORE INTO leads (company_name, website, domain, email, mobile_number, status, category, source, relevance_score, is_relevant, analysis_notes) VALUES (?, ?, ?, ?, ?, 'new', ?, 'discovery_engine', 50, 0, ?)",
                        [cleanedName, lead.website, domain, (lead as any).email || null, (lead as any).mobile || null, query, `Discovered & AI-Qualified via Discovery v3.0 for "${query}" (Page ${pageOffset + 1})`],
                        () => res()
                    ));
                    added++;
                }
            }

            if (added > 0) {
                console.log(`📥 [DISCOVERY] Saved ${added} NEW unique companies! Query: "${query}" Page: ${pageOffset + 1}`);
                await logToDashboard(`📥 ${added} new companies discovered for: "${query}" (Page ${pageOffset + 1})`, 'success');
            } else {
                console.log(`ℹ️ [DISCOVERY] ${leads.length} leads checked, 0 new (all already in DB). Moving to next page/variant.`);
            }

            // Advance the page counter for this variant
            history[variantKey] = (history[variantKey] ?? 0) + 1;
            await saveQueryHistory(history);

            // Log current history stats
            const totalVariants = Object.keys(history).length;
            const totalPages = Object.values(history).reduce((a, b) => a + b, 0);
            console.log(`📊 [DISCOVERY] Query history: ${totalVariants} variants tracked | ${totalPages} total pages scraped`);

        } catch (err: any) {
            console.error(`⚠️ [DISCOVERY ERROR]: ${err.message}`);
        }

        // Faster loop — no need for 20s delay, rotate immediately
        const loopDelay = 12000 + Math.floor(Math.random() * 8000); // 12-20s
        console.log(`⏳ [DISCOVERY] Next scan in ${Math.round(loopDelay / 1000)}s...`);
        await delay(loopDelay);
    }
}

runDiscoveryWorker();
