import axios from 'axios';
import * as cheerio from 'cheerio';
import { db, initDB } from '../db.js';
import { loadSystemConfig } from '../config_manager.js';
import { personalizeOutreach } from '../personalizer.js';
import { logToDashboard } from '../shared_utils.js';
import { isConsumerEmail, isGenericMailbox, cleanContactName } from '../contact_validation.js';
import { cleanCompanyName } from '../search_service.js';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

/**
 * HYPER-PERSONALIZATION RESEARCH ENGINE
 * Deep-scrapes company website: home page + about page + services page
 * to extract real intelligence for the AI email writer.
 */
async function deepResearchCompany(website: string, companyName: string): Promise<{
  scrapedText: string;
  detectedServices: string[];
  detectedClients: string;
  detectedLocations: string;
  teamMentions: string;
  uniqueHooks: string[];
}> {
  const pagesToTry = [
    website,
    `${website.replace(/\/$/, '')}/about`,
    `${website.replace(/\/$/, '')}/about-us`,
    `${website.replace(/\/$/, '')}/services`,
    `${website.replace(/\/$/, '')}/what-we-do`,
  ];

  let combinedText = '';
  const uniqueHooks: string[] = [];

  for (const url of pagesToTry.slice(0, 3)) {
    try {
      const res = await axios.get(url, {
        timeout: 8000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        maxRedirects: 3,
      });

      const $ = cheerio.load(res.data);
      // Remove scripts, styles, nav, footer for clean content
      $('script, style, nav, footer, header, .cookie-banner, #cookie-notice, .menu').remove();

      // Extract meaningful content from key containers
      const contentSelectors = ['main', 'article', '.content', '.about', '.services', '.hero', 'section', 'body'];
      let pageText = '';
      for (const sel of contentSelectors) {
        const el = $(sel);
        if (el.length) {
          pageText = el.text();
          break;
        }
      }

      // Clean and normalize
      pageText = pageText.replace(/\s+/g, ' ').replace(/[^\w\s.,!?;:()\-'"]/g, ' ').trim().slice(0, 2000);
      if (pageText.length > 100) {
        combinedText += `\n[PAGE: ${url}]\n${pageText}`;
      }

      // Extract unique/interesting phrases (numbers, years, client counts)
      const hooks = pageText.match(/\b(\d{1,4}\+?\s*(years?|clients?|projects?|countries?|employees?|staff|offices?))\b/gi) || [];
      uniqueHooks.push(...hooks.slice(0, 5));

    } catch (_) {
      // Silent fail — try next URL
    }
  }

  // Extract detected services, client types, locations from combined text
  const serviceKeywords = combinedText.match(/\b(freight\s+forwarding|logistics|shipping|cargo|contracting|construction|real\s+estate|property|IT\s+solutions?|software|recruitment|staffing|engineering|consulting|advisory|accounting|audit|legal|law|marketing|facilities|healthcare|hospitality|events?|security|cloud|digital\s+transformation)\b/gi) || [];
  const detectedServices = [...new Set(serviceKeywords.map(s => s.toLowerCase()))].slice(0, 5);

  const clientMatches = combinedText.match(/\b(multinationals?|SMEs?|government|enterprises?|corporations?|hotels?|developers?|contractors?|banks?|hospitals?|manufacturers?|retailers?)\b/gi) || [];
  const detectedClients = [...new Set(clientMatches)].slice(0, 3).join(', ') || 'corporate businesses';

  const locationMatches = combinedText.match(/\b(Dubai|Abu Dhabi|Sharjah|UAE|Saudi Arabia|Qatar|Oman|Bahrain|Kuwait|GCC|MENA|Middle East)\b/gi) || [];
  const detectedLocations = [...new Set(locationMatches)].slice(0, 3).join(', ') || 'UAE';

  const teamMatches = combinedText.match(/\b(CEO|Managing Director|Director|Founder|President|GM|General Manager|Chairman|Partner)\b/gi) || [];
  const teamMentions = teamMatches.slice(0, 2).join(', ');

  return {
    scrapedText: combinedText.slice(0, 4000),
    detectedServices,
    detectedClients,
    detectedLocations,
    teamMentions,
    uniqueHooks: [...new Set(uniqueHooks)].slice(0, 4),
  };
}

async function runDraftsWorker() {
  console.log("📝 [WORKER: DRAFTS] Hyper-Personalized AI Draft Engine v2 Online...");
  await initDB();

  let consecutiveIdle = 0;

  while (true) {
    try {
      const settings = await loadSystemConfig();
      if (settings.engine_paused) {
        await delay(15000);
        continue;
      }

      const tone = (settings as any).ai_tone || (settings as any).tone || 'Professional & Bold';
      const model = (settings as any).ai_model || 'llama-3.3-70b-versatile';

      // Get leads that are ready and don't have a draft yet (any status)
      const readyLeads: any[] = await new Promise((res, rej) => db.all(
        `SELECT l.* FROM leads l 
         LEFT JOIN outreach_drafts d ON l.id = d.lead_id 
         WHERE l.status = 'ready' 
         AND l.email IS NOT NULL 
         AND l.email LIKE '%@%' 
         AND l.email NOT LIKE '//%'
         AND d.id IS NULL
         LIMIT 3`,
        (err, rows) => err ? rej(err) : res(rows || [])
      ));

      if (readyLeads.length === 0) {
        consecutiveIdle++;
        if (consecutiveIdle % 6 === 0) {
          const pendingCount: any = await new Promise(res => db.get(
            `SELECT COUNT(*) as cnt FROM leads WHERE status = 'ready' AND email IS NOT NULL AND email LIKE '%@%'`,
            (err, row: any) => res(row)
          ));
          console.log(`😴 [DRAFTS] Queue clear. ${pendingCount?.cnt || 0} ready leads queued. Waiting for Enrichment Worker...`);
        }
        await delay(10000);
        continue;
      }

      consecutiveIdle = 0;
      console.log(`\n📝 [DRAFTS] Hyper-personalizing ${readyLeads.length} lead(s) with deep company research...`);

      for (const lead of readyLeads) {
        const companyName = lead.company_name;
        const website = (lead.website || `https://${lead.domain}`).replace(/^\/\//, 'https://');
        const email = lead.email;

        // Email Quality Gate: reject consumer emails and generic mailboxes
        if (isConsumerEmail(email)) {
            console.log(`   🚫 [DRAFTS] Skipping ${companyName}: consumer email (${email})`);
            db.run("UPDATE leads SET status = 'no_email', enrichment_status = 'consumer_email' WHERE id = ?", [lead.id]);
            continue;
        }
        if (isGenericMailbox(email)) {
            console.log(`   ⚠️ [DRAFTS] Skipping ${companyName}: generic mailbox (${email})`);
            db.run("UPDATE leads SET status = 'no_email', enrichment_status = 'generic_mailbox' WHERE id = ?", [lead.id]);
            continue;
        }

        console.log(`\n🔬 [DRAFTS] Deep researching: ${companyName} (${website})...`);

        // === STAGE 1: DEEP COMPANY RESEARCH ===
        const research = await deepResearchCompany(website, companyName);

        const servicesStr = research.detectedServices.length > 0
          ? research.detectedServices.join(', ')
          : lead.category || 'B2B commercial services';

        const hooksStr = research.uniqueHooks.length > 0
          ? research.uniqueHooks.join(', ')
          : '';

        console.log(`   🧠 Intel: Services=[${servicesStr}] | Clients=[${research.detectedClients}] | Hooks=[${hooksStr}]`);

        // Build rich evidence facts from real scraped intel
        const evidenceFacts = [
          {
            fact: `${companyName} specializes in ${servicesStr} and operates primarily in ${research.detectedLocations}.`,
            source_url: website
          },
          {
            fact: research.uniqueHooks.length > 0
              ? `Key stats found on their website: ${hooksStr}.`
              : `Their primary client base includes ${research.detectedClients}.`,
            source_url: website
          },
          {
            fact: `Their target market appears to be: ${research.detectedClients}.`,
            source_url: website
          }
        ];

        // Use the real scraped about text (not just category)
        const enrichedAboutText = research.scrapedText.length > 100
          ? research.scrapedText
          : lead.about_summary || `${companyName} is a ${servicesStr} company based in ${research.detectedLocations}.`;

        // === STAGE 2: AI HYPER-PERSONALIZED EMAIL GENERATION ===
        console.log(`   ✍️  Writing hyper-personalized email for ${companyName}...`);
        const personalization = await personalizeOutreach(
          companyName,
          enrichedAboutText,
          website,
          tone,
          model,
          cleanContactName(lead.contact_name),
          evidenceFacts
        );

        if (personalization.body && personalization.body.length > 50) {
          // === STAGE 3: QUALITY GATE CHECK (100% Dynamic from DB) ===
          const activeCalendarUrl = String(settings.calendar_url || settings.meeting_link || settings.CALENDAR_URL || '').trim();
          const negativeKeywordsRaw = String(settings.negative_keywords || settings.NEGATIVE_KEYWORDS || '').trim();
          const blockedWords = negativeKeywordsRaw ? negativeKeywordsRaw.split(/[\n,;|]+/).map((w: string) => w.trim()).filter(Boolean) : [];

          const wordCount = personalization.body.split(/\s+/).length;
          // Accept a real CTA: a question mark OR the booking link (LLM sometimes writes the link without a '?').
          const hasCTA = personalization.body.includes('?') || (activeCalendarUrl ? personalization.body.includes(activeCalendarUrl) : false);
          const hasCalendar = activeCalendarUrl ? personalization.body.includes(activeCalendarUrl) : true;
          // Negative keywords are meant to EXCLUDE prospect companies (dental clinics, digital
          // agencies, etc.) — never the sender's own signature. Strip our own identity (agency
          // name + booking link) out of the body before scanning, otherwise a keyword like
          // "digital agency" matches "Asif Digital Agency" in the footer and every draft scores 60.
          const senderIdentityTokens = [...new Set([
            String(settings.company_name || settings.COMPANY_NAME || '').trim(),
            String(settings.sender_identity || '').trim(),
            activeCalendarUrl,
          ].filter(Boolean))];
          const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          let bodyForBannedCheck = personalization.body;
          for (const ident of senderIdentityTokens) {
            if (ident) bodyForBannedCheck = bodyForBannedCheck.replace(new RegExp(escapeRegExp(ident), 'gi'), ' ');
          }
          const hasBannedWord = blockedWords.some((w: string) => new RegExp(`\\b${w}\\b`, 'i').test(bodyForBannedCheck));
          const hasPersonalization = research.detectedServices.some((s: string) => personalization.body.toLowerCase().includes(s.toLowerCase())) || personalization.body.includes(companyName.split(' ')[0]);

          const passesQualityGate = hasCTA && hasCalendar && wordCount >= 50 && wordCount <= 180 && !hasBannedWord;
          const qualityScore = passesQualityGate && hasPersonalization ? 95 : passesQualityGate ? 80 : 60;

          const isAutoOutreach = String(
            settings.auto_outreach_enabled || settings.AUTO_OUTREACH_ENABLED || 'true'
          ).toLowerCase() === 'true';

          const initialStatus = (isAutoOutreach && qualityScore >= 80) ? 'approved' : 'draft';
          const modelProv = `${personalization.provider}:${personalization.model}`;

          // Dynamic subject line based on company category
          const cleanedSubjectName = cleanCompanyName(companyName) || companyName.split(' ').slice(0, 3).join(' ');
          const subjectTemplate = String(settings.subject_template || settings.SUBJECT_TEMPLATE || '').trim();
          let subject = subjectTemplate 
              ? subjectTemplate.replace(/\{company\}/gi, cleanedSubjectName).replace(/\{service\}/gi, servicesStr)
              : `Quick question, ${cleanedSubjectName}`;

          await new Promise<void>(res => {
            db.run(
              `INSERT INTO outreach_drafts (lead_id, recipient_email, subject, text_body, prospect_facts_json, prompt_version, model, quality_score, validation_warnings_json, approval_status)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                lead.id, email, subject, personalization.body,
                JSON.stringify(evidenceFacts), 'v6.0-hyperpersonalized',
                modelProv, qualityScore, '[]', initialStatus
              ],
              () => res()
            );
          });

          const leadStatus = initialStatus === 'approved' ? 'approved' : 'awaiting_approval';
          await new Promise<void>(res => db.run("UPDATE leads SET status = ? WHERE id = ?", [leadStatus, lead.id], () => res()));

          const icon = qualityScore >= 95 ? '🚀' : qualityScore >= 80 ? '✅' : '📝';
          console.log(`   ${icon} [DRAFTS] [Score: ${qualityScore}] [${initialStatus.toUpperCase()}] Draft created for: ${companyName} | Provider: ${personalization.provider}`);
          await logToDashboard(`${icon} Hyper-personalized draft (score: ${qualityScore}) created for: ${companyName}`, qualityScore >= 80 ? 'success' : 'warning');

        } else {
          console.warn(`   ⚠️  [DRAFTS] AI returned empty body for ${companyName}. Skipping.`);
          await new Promise<void>(res => db.run("UPDATE leads SET status = 'needs_review' WHERE id = ?", [lead.id], () => res()));
        }

        // Respectful delay between drafts to avoid rate limits
        await delay(3000);
      }

    } catch (err: any) {
      console.error(`⚠️ [DRAFTS WORKER ERROR]: ${err.message}`);
      await delay(5000);
    }

    await delay(5000);
  }
}

runDraftsWorker();
