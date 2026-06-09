import axios from 'axios';
import * as cheerio from 'cheerio';
import db from '../server/db';
import { addLog } from '../server/db';
import { unwrapSerpRedirect, GLOBAL_GIANTS } from '../lib/junkFilter';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Randomized User-Agent switcher for YellowPages to avoid 403 errors
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export class Scout {
  /**
   * Search Aggregator: Rotates through multiple search engines for broader coverage.
   * - Google: Big international defense firms
   * - Bing: Corporate whitepapers and technical PDFs
   * - DuckDuckGo: Stealth extraction with cleaner HTML
   * - Yellow Pages: Local contractors in MENA region
   */
  private static getSearchEngine(niche: string, country: string): { name: string; url: string; selector: string; useRandomUA: boolean } {
    const engines = [
      {
        name: 'Google',
        url: `https://www.google.com/search?q=${encodeURIComponent(`"${niche}" "${country}"`)}`,
        selector: 'a[href]',
        useRandomUA: false
      },
      {
        name: 'Bing',
        url: `https://www.bing.com/search?q=${encodeURIComponent(`"${niche}" "${country}"`)}`,
        selector: 'a[href]',
        useRandomUA: false
      },
      {
        name: 'DuckDuckGo',
        url: `https://duckduckgo.com/html/?q=${encodeURIComponent(`"${niche}" "${country}"`)}`,
        selector: 'a.result__url',
        useRandomUA: false
      },
      {
        name: 'YellowPages',
        url: `https://www.yellowpages.com/search?search_terms=${encodeURIComponent(niche)}&geo_location_terms=${encodeURIComponent(country)}`,
        selector: 'a.business-name',
        useRandomUA: true // YellowPages needs random UA to avoid 403
      }
    ];
    return engines[Math.floor(Math.random() * engines.length)];
  }

  static async discover(campaign: any) {
    const keywordList = (campaign.niche_keywords || 'Defense').split(',').map((k: string) => k.trim()).filter(Boolean);
    const countryList = (campaign.target_countries || 'Global').split(',').map((c: string) => c.trim()).filter(Boolean);

    const selectedNiche = keywordList[Math.floor(Math.random() * keywordList.length)];
    const selectedCountry = countryList[Math.floor(Math.random() * countryList.length)];

    const engine = this.getSearchEngine(selectedNiche, selectedCountry);
    addLog('SCOUT', `SEED [${engine.name}]: [${selectedNiche}] in [${selectedCountry}]...`, 'INFO');

    // Human-like delay (longer for YellowPages to avoid 403)
    const delay = engine.useRandomUA ? Math.random() * 5000 + 5000 : Math.random() * 10000 + 5000;
    await sleep(delay);

    try {
      const headers: Record<string, string> = {
        'User-Agent': engine.useRandomUA ? getRandomUserAgent() : 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
      };
      if (engine.useRandomUA) {
        headers['Accept-Language'] = 'en-US,en;q=0.9';
        headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';
        headers['Accept-Encoding'] = 'gzip, deflate, br';
        headers['DNT'] = '1';
        headers['Connection'] = 'keep-alive';
        headers['Upgrade-Insecure-Requests'] = '1';
      }

      const { data: html } = await axios.get(engine.url, {
        headers,
        timeout: 20000,
      });

      const $ = cheerio.load(html);
      const seen = new Set<string>();
      const insertStmt = db.prepare(
        'INSERT OR IGNORE INTO leads (company_name, website, country, status, sector) VALUES (?, ?, ?, ?, ?)'
      );
      let committed = 0;
      let scanned = 0;

      $(engine.selector).each((_, el) => {
        const rawHref = $(el).attr('href');
        if (!rawHref || !rawHref.startsWith('http')) return;
        const url = unwrapSerpRedirect(rawHref);

        try {
          const host = new URL(url).hostname.replace(/^www\./, '').toLowerCase();
          scanned++;

          // Global giants filter - discard without committing (check base domain)
          const baseDomain = host.split('.').slice(-2).join('.');
          if (GLOBAL_GIANTS.has(host) || GLOBAL_GIANTS.has(baseDomain)) return;

          // Subdomain purge: reject support., docs., help., cloud.
          const subdomainPatterns = [/^support\./, /^help\./, /^docs\./, /^cloud\./, /^developer\./];
          if (subdomainPatterns.some(p => p.test(host))) return;

          // Basic domain filtering: skip obvious non-company sites
          const skipPatterns = [
            /github\.com$/, /stackoverflow\.com$/, /reddit\.com$/,
            /wikipedia\.org$/, /wikihow\.com$/, /youtube\.com$/, /facebook\.com$/,
            /linkedin\.com$/, /twitter\.com$/, /x\.com$/,
            /\.gov$/, /\.edu$/,
            /news/, /blog/, /magazine/, /report/,
            /marketresearch/, /6wresearch/, /eweek\.com$/, /mordorintelligence/, /kenresearch/,
            /food/, /recipe/, /cooking/, /kitchen/, /eating/,
            /speedtest/, /speed.*test/, /breitband/,
            /chip\.de$/, /billboard\.com$/, /showsbee\.com$/,
            /factually/, /geekzag/, /guidingtech/, /pureinfotech/,
            /cycling/, /realestate/
          ];
          if (skipPatterns.some(p => p.test(host))) return;

          if (seen.has(host)) return;
          seen.add(host);

          const cleanUrl = `https://${host}`;
          const rawText = $(el).text().replace(/\s+/g, ' ').trim();

          // Clean anchor text: remove URLs, breadcrumbs, and separators
          let cleanText = rawText
            .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
            .replace(/[›»…|·\-—]\s*/g, ' ') // Remove breadcrumbs
            .replace(/\.{3,}/g, '') // Remove ellipsis
            .replace(/\s+/g, ' ')
            .trim();

          // If clean text is too short or looks like garbage, use domain
          const title = (cleanText.length >= 3 && /[A-Za-z]/.test(cleanText) && !/^\d+$/.test(cleanText))
            ? cleanText.slice(0, 80)
            : host;

          const info = insertStmt.run(
            title,
            cleanUrl,
            selectedCountry,
            'READY',
            selectedNiche.toUpperCase()
          );
          if (info.changes > 0) {
            committed++;
            addLog('SCOUT', `+ ${host}`, 'INFO');
          }
        } catch (_) {}
      });

      addLog('SCOUT', `Scanned ${scanned} links → committed ${committed} new seeds.`, 'SUCCESS');
    } catch (error: any) {
      addLog('SCOUT', `Discovery Failure: ${error.message}`, 'ERROR');
    }
  }
}
