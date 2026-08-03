import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { dbInsertLead } from './db.js'; 
import { logToDashboard } from './shared_utils.js'; // Ensure we can insert directly and log

puppeteer.use(StealthPlugin());

export async function runGmbNinjaScan(query: string, location: string = 'UAE', persistResults: boolean = false) {
    const cleanQuery = String(query || '').replace(/\b(\w+)(?:\s+\1)+\b/gi, '$1').trim();
    const cleanLocation = String(location || 'UAE').trim();
    const fullQuery = cleanQuery.toLowerCase().includes(cleanLocation.toLowerCase())
        ? cleanQuery
        : `${cleanQuery} ${cleanLocation}`.trim();
    await logToDashboard(`🥷 GMB Ninja: Starting Stealth Discovery for "${fullQuery}"...`, 'info');
    console.log(`🥷 GMB NINJA: Starting Stealth Scan for "${fullQuery}"`);
    await logToDashboard(`🥷 GMB Ninja: Starting Stealth Discovery for "${fullQuery}"...`, 'info');
    console.log(`🥷 GMB NINJA: Starting Stealth Scan for "${fullQuery}"`);
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
    });

    try {
        await logToDashboard(`🥷 Ninja: Browser launched. Tunneling into Google Maps...`, 'info');
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        
        // 1. Navigate to Google Maps
        const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(fullQuery)}`;
        try {
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 25000 });
        } catch (e: any) {
            console.warn(`🥷 GMB: Maps navigation failed (${e.message}). Aborting scan gracefully.`);
            return [];
        }
        
        // 2. Wait for first results
        await page.waitForSelector('.hfpxzc', { timeout: 7000 }).catch(() => null);
        
        const leads: { company_name: string; website: string; context: string; source: string }[] = [];
        const seenNames = new Set<string>();
        console.log(`🥷 GMB NINJA: Scrolling to find leads...`);
        let scrollCount = 0;
        const maxScrolls = 15; // Approx 100-150 leads
        
        while (scrollCount < maxScrolls) {
            // Find the scrollable feed container (standard GMB class)
            const feedSelector = 'div[role="feed"]';
            try {
                await page.evaluate((selector) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.scrollBy(0, 1500); // Scroll down
                    }
                }, feedSelector);
            } catch (e: any) {
                // Dead/crashed page mid-scroll — stop gracefully instead of aborting the scan.
                console.warn(`🥷 GMB: Page context lost during scroll (${e.message}). Stopping scroll.`);
                break;
            }

            // "Human Pause" - Randomized wait 2-5s
            await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000));
            
            // Extract current visible leads
            let currentLeads: { company_name: string; website: string | null; context: string }[] = [];
            try {
                currentLeads = await page.evaluate(() => {
                    const results: { company_name: string; website: string | null; context: string }[] = [];
                    const cards = document.querySelectorAll('.hfpxzc');

                    cards.forEach(card => {
                        const name = card.getAttribute('aria-label') || '';
                        // Find the parent to find the website button
                        const parent = card.closest('.Nv2PK');
                        const websiteBtn = parent?.querySelector('a.lcr4fd.S9kvJb');
                        const website = websiteBtn ? websiteBtn.getAttribute('href') : null;
                        const context = (parent?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 600);

                        if (name && name.length > 2) {
                            results.push({ company_name: name, website, context });
                        }
                    });
                    return results;
                });
            } catch (e: any) {
                console.warn(`🥷 GMB: Page context lost during extraction (${e.message}). Stopping scan.`);
                break;
            }

            for (const lead of currentLeads) {
                const website = String(lead.website || '').trim();
                let hostname = '';
                try { hostname = new URL(website).hostname.toLowerCase(); } catch { continue; }
                if (!/^https?:\/\//i.test(website) || /(^|\.)google\.|googleadservices|doubleclick/i.test(hostname)) continue;
                if (!seenNames.has(lead.company_name)) {
                    seenNames.add(lead.company_name);
                    leads.push({ company_name: lead.company_name, website, context: lead.context, source: 'gmb_ninja' });
                    console.log(`🥷 Found: ${lead.company_name} (${lead.website || 'No Website'})`);
                    if (leads.length % 5 === 0) {
                        await logToDashboard(`🥷 Ninja: Identified ${leads.length} unique targets so far...`, 'info');
                    }
                }
            }

            // Check if we hit the end
            let isEnd = false;
            try {
                isEnd = await page.evaluate(() => {
                    return document.body.innerText.includes("You've reached the end of the list");
                });
            } catch (e: any) {
                console.warn(`🥷 GMB: Page context lost during end-check (${e.message}). Stopping scan.`);
                break;
            }
            if (isEnd) break;
            
            scrollCount++;
        }

        console.log(`🥷 GMB NINJA: Extraction complete. Found ${leads.length} unique leads.`);
        await logToDashboard(`🥷 Ninja: Extraction complete. Found ${leads.length} unique targets. Syncing to master database...`, 'success');
        
        // Manual GMB scans may persist directly. Autonomous discovery leaves
        // persistence to worker.ts so every result passes the shared quality gate.
        if (persistResults) {
            for (const lead of leads) {
                if (lead.website) {
                    await dbInsertLead({
                        company_name: lead.company_name,
                        website: lead.website,
                        type: 'gmb_ninja',
                        category: cleanQuery,
                        about: `Discovered via GMB Ninja Search for: ${cleanQuery}`,
                        status: 'new'
                    });
                }
            }
        }
        
        return leads;
    } catch (error: any) {
        console.error(`❌ GMB NINJA ERROR: ${error.message}`);
        return [];
    } finally {
        // Chromium can hang while closing after a long Maps scroll. Cleanup must
        // never block the remaining discovery sources.
        await Promise.race([
            browser.close().catch(() => undefined),
            new Promise<void>(resolve => setTimeout(resolve, 5000))
        ]);
    }
}
