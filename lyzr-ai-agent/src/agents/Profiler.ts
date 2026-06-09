import { chromium } from 'playwright';
import type { Browser } from 'playwright';
import db, { addLog, transition } from '../server/db';
import OpenAI from 'openai';
import { sleep } from '../lib/throttle';
import { rejectReason, findNegativeKeyword, buildJudgePrompt, DEFENSE_PILLARS } from '../lib/junkFilter';

// ─── Singleton browser pool — hoist launch cost out of the per-lead path ───
let browserSingleton: Browser | null = null;
async function getBrowser(): Promise<Browser> {
  if (browserSingleton && browserSingleton.isConnected()) return browserSingleton;
  browserSingleton = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  return browserSingleton;
}
process.on('exit',    () => { browserSingleton?.close().catch(() => {}); });
process.on('SIGINT',  () => { browserSingleton?.close().catch(() => {}); process.exit(0); });
process.on('SIGTERM', () => { browserSingleton?.close().catch(() => {}); process.exit(0); });

export class Profiler {
  static async process(lead: any, campaign: any) {
    addLog('PROFILER', `Analyzing ${lead.company_name}...`, 'INFO');

    // ── PILLAR-VALIDATION GATE #1: URL pre-sniff (skip browser entirely) ──
    let host = '';
    try { host = new URL(lead.website).hostname.replace(/^www\./, '').toLowerCase(); } catch {}
    const presniff = rejectReason(host, campaign.banned_domains || '');
    if (presniff) {
      addLog('JUDGE', `✗ ${host} rejected on pre-sniff (${presniff}). No browser launched.`, 'WARNING');
      transition(lead.id, 'REJECTED');
      db.prepare('UPDATE leads SET rejection_reason = ? WHERE id = ?').run(presniff, lead.id);
      return;
    }

    if (!transition(lead.id, 'PROFILING')) return;

    // Mandatory 15-45s stealth delay before scrape
    await sleep();

    const browser = await getBrowser();
    const context = await browser.newContext();

    try {
      const page = await context.newPage();
      await page.route('**/*.{png,jpg,jpeg,gif,svg,woff,woff2,ttf,otf,css,mp4,webm}', (route) => route.abort());

      const timeout = campaign.scrape_timeout || 30000;
      await page.goto(lead.website, { waitUntil: 'domcontentloaded', timeout });

      // SLEDGEHAMMER EXTRACTION — purge chrome/nav/script/style, take raw body text
      const content = await page.evaluate(() => {
        document
          .querySelectorAll('script,style,nav,footer,header,noscript,iframe,svg,aside,form')
          .forEach((n) => n.remove());
        return document.body.innerText
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 6000);
      });

      // ── PILLAR-VALIDATION GATE #2: negative-keyword content check ──────
      const hit = findNegativeKeyword(content, campaign.negative_keywords);
      if (hit) {
        addLog('JUDGE', `✗ ${lead.company_name} rejected — negative keyword "${hit}" found in content.`, 'WARNING');
        transition(lead.id, 'REJECTED');
        db.prepare('UPDATE leads SET rejection_reason = ? WHERE id = ?').run(`NEG_KEYWORD:${hit}`, lead.id);
        return;
      }

      // ── PILLAR-VALIDATION GATE #3: 8-pillar Judge LLM rubric ("so-what test") ──
      const openai = new OpenAI({
        apiKey: campaign.openrouter_key,
        baseURL: campaign.openrouter_base_url || 'https://openrouter.ai/api/v1',
        defaultHeaders: {
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Sovereign Sniper'
        }
      });

      const prompt = buildJudgePrompt({
        companyName:      lead.company_name,
        website:          lead.website,
        pageContent:      content,
        positiveKeywords: campaign.niche_keywords || '',
        negativeKeywords: campaign.negative_keywords || '',
      });

      const response = await openai.chat.completions.create({
        model: campaign.openrouter_model || 'google/gemma-7b-it:free',
        messages: [{ role: 'user', content: prompt }]
      });

      let result: any = {};
      try {
        const rawContent = response.choices[0].message?.content || '{}';
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        result = JSON.parse(jsonMatch ? jsonMatch[0] : '{}');
      } catch (e) {
        addLog('JUDGE', `LLM JSON parse error for ${lead.company_name}. Defaulting to REJECTED (fail-closed).`, 'WARNING');
        result = { isMatch: false, reason: 'LLM_PARSE_ERROR' };
      }

      // The pillar must be one of the 8 OR isMatch=false
      const pillarValid = result.pillar && (DEFENSE_PILLARS as readonly string[]).includes(result.pillar);

      if (result.isMatch && !result.isNegative && pillarValid) {
        const sectorTag = result.sectorTag || `${result.pillar} Defense`;
        transition(lead.id, 'JUDGING', 'sector = ?', [sectorTag]);
        addLog('JUDGE', `✓ ${lead.company_name} QUALIFIED → [${sectorTag}] (conf ${result.confidence ?? '?'}).`, 'SUCCESS');
      } else {
        transition(lead.id, 'REJECTED');
        const why = !pillarValid ? 'NO_PILLAR_MATCH' : (result.reason || 'SO_WHAT_FAILED');
        db.prepare('UPDATE leads SET rejection_reason = ? WHERE id = ?').run(why.slice(0, 140), lead.id);
        addLog('JUDGE', `✗ ${lead.company_name} REJECTED: ${why}`, 'WARNING');
      }

    } catch (error: any) {
      addLog('PROFILER', `AI Profiling Failed for ${lead.company_name}: ${error.message}`, 'ERROR');
      transition(lead.id, 'PROFILE_FAILED');
    } finally {
      // Close the context only — keep the shared browser alive for next lead
      await context.close().catch(() => {});
    }
  }
}
