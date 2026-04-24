import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { dbInsertLead } from './worker.js'; 
import { logToDashboard } from './shared_utils.js'; // Ensure we can insert directly and log

puppeteer.use(StealthPlugin());

export async function runGmbNinjaScan(query: string, location: string = 'UAE') {
    const fullQuery = `${query} ${location}`;
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
        await page.goto(searchUrl, { waitUntil: 'networkidle2' });
        
        // 2. Wait for first results
        await page.waitForSelector('.hfpxzc', { timeout: 30000 }).catch(() => null);
        
        const leads: { company_name: string; website: string | null }[] = [];
        const seenNames = new Set<string>();

        // 3. Human-Mimic Scroll Loop
        await logToDashboard(`🥷 Ninja: Scrolling through list for "${query}"...`, 'info');
        console.log(`🥷 GMB NINJA: Scrolling to find leads...`);
        let scrollCount = 0;
        const maxScrolls = 15; // Approx 100-150 leads
        
        while (scrollCount < maxScrolls) {
            // Find the scrollable feed container (standard GMB class)
            const feedSelector = 'div[role="feed"]';
            await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.scrollBy(0, 1500); // Scroll down
                }
            }, feedSelector);

            // "Human Pause" - Randomized wait 2-5s
            await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000));
            
            // Extract current visible leads
            const currentLeads = await page.evaluate(() => {
                const results: { company_name: string; website: string | null }[] = [];
                const cards = document.querySelectorAll('.hfpxzc');
                
                cards.forEach(card => {
                    const name = card.getAttribute('aria-label') || '';
                    // Find the parent to find the website button
                    const parent = card.closest('.Nv2PK');
                    const websiteBtn = parent?.querySelector('a.lcr4fd.S9kvJb');
                    const website = websiteBtn ? websiteBtn.getAttribute('href') : null;
                    
                    if (name && name.length > 2) {
                        results.push({ company_name: name, website });
                    }
                });
                return results;
            });

            for (const lead of currentLeads) {
                if (!seenNames.has(lead.company_name)) {
                    seenNames.add(lead.company_name);
                    leads.push(lead);
                    console.log(`🥷 Found: ${lead.company_name} (${lead.website || 'No Website'})`);
                    if (leads.length % 5 === 0) {
                        await logToDashboard(`🥷 Ninja: Identified ${leads.length} unique targets so far...`, 'info');
                    }
                }
            }

            // Check if we hit the end
            const isEnd = await page.evaluate(() => {
                return document.body.innerText.includes("You've reached the end of the list");
            });
            if (isEnd) break;
            
            scrollCount++;
        }

        console.log(`🥷 GMB NINJA: Extraction complete. Found ${leads.length} unique leads.`);
        await logToDashboard(`🥷 Ninja: Extraction complete. Found ${leads.length} unique targets. Syncing to master database...`, 'success');
        
        // 4. Inject into Triangle Master Database
        for (const lead of leads) {
            // Only add if it has a website (to allow the crawler to find details)
            if (lead.website) {
                await dbInsertLead({
                    company_name: lead.company_name,
                    website: lead.website,
                    type: 'gmb_ninja',
                    category: query,
                    about: `Discovered via GMB Ninja Search for: ${query}`,
                    status: 'new'
                });
            }
        }
        
        return leads;
    } catch (error: any) {
        console.error(`❌ GMB NINJA ERROR: ${error.message}`);
        return [];
    } finally {
        await browser.close();
    }
}
