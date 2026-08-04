/**
 * DB SANITIZATION + DRAFT RESET
 * 1. Runs the v2 dynamic name-disambiguation (cleanContactName) across every
 *    contacts.full_name and leads.contact_name, clearing fake person entries
 *    ("Skyline Builders", "InterContinental Hotel SnapFixNow", "Print Branding",
 *    "Ismail Intellect Cafe", "Art Interiors", social-platform junk, ...) and
 *    stripping role/honorific noise ("Architect Eleanor Pena" -> "Eleanor Pena").
 * 2. Purges outreach_drafts.
 * 3. Resets qualified leads back to 'ready' so drafts_worker regenerates fresh
 *    CEO-to-CEO drafts (contacted / no_email / rejected / new untouched).
 *
 * Run: npx tsx scripts/sanitize-contacts.ts   (backup DB before running)
 */
import sqlite3 from 'sqlite3';
import { cleanContactName } from '../contact_validation.js';

const db = new sqlite3.Database('sovereign_resale_v5.db');
const all = (sql: string, params: any[] = []): Promise<any[]> => new Promise((res, rej) => db.all(sql, params, (e, r) => e ? rej(e) : res(r || [])));
const run = (sql: string, params: any[] = []): Promise<void> => new Promise((res, rej) => db.run(sql, params, (e) => e ? rej(e) : res()));

const EMPTY_NAME = ['', 'n/a', 'none', 'unknown', 'null', 'na', 'not', 'unspecified'];

const isMeaningful = (n: unknown): boolean => {
  const s = String(n || '').trim();
  return s.length >= 2 && !EMPTY_NAME.includes(s.toLowerCase());
};

async function main() {
  // ── 1. SANITIZE contacts.full_name ─────────────────────────────────────
  const contacts = await all(`SELECT id, full_name, company_name, status, person_identity_verified FROM contacts`);
  let cleared = 0;
  let cleaned = 0;
  let alreadyFake = 0;
  for (const c of contacts) {
    if (!isMeaningful(c.full_name)) { alreadyFake++; continue; }
    const result = cleanContactName(c.full_name, c.company_name);
    if (!result) {
      // Fake / entity / generic-category name — clear it so it is never treated
      // as a decision maker again. 'rejected' keeps it out of the deep-hunt queue.
      await run(`UPDATE contacts SET
        full_name = NULL,
        person_identity_verified = 0,
        person_name_confidence = 0,
        role_confidence = 0,
        deep_hunt_status = 'rejected',
        linkedin_url = CASE WHEN linkedin_status = 'verified' THEN linkedin_url ELSE NULL END,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`, [c.id]);
      cleared++;
      console.log(`  ✗ [CONTACT ${c.id}] cleared fake name: "${c.full_name}"`);
    } else if (result !== c.full_name) {
      await run(`UPDATE contacts SET full_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [result, c.id]);
      cleaned++;
      console.log(`  ~ [CONTACT ${c.id}] cleaned: "${c.full_name}" -> "${result}"`);
    }
  }

  // ── 2. SANITIZE leads.contact_name ─────────────────────────────────────
  const leads = await all(`SELECT id, company_name, contact_name, person_identity_verified, person_name_confidence FROM leads`);
  let lCleared = 0;
  let lCleaned = 0;
  for (const l of leads) {
    if (!isMeaningful(l.contact_name)) continue;
    const result = cleanContactName(l.contact_name, l.company_name);
    if (!result) {
      await run(`UPDATE leads SET
        contact_name = NULL,
        person_identity_verified = 0,
        person_name_confidence = 0,
        role_confidence = 0,
        linkedin_url = NULL
        WHERE id = ?`, [l.id]);
      lCleared++;
      console.log(`  ✗ [LEAD ${l.id}] cleared fake name: "${l.contact_name}" @ "${l.company_name}"`);
    } else if (result !== l.contact_name) {
      await run(`UPDATE leads SET contact_name = ?, person_name_confidence = MAX(person_name_confidence, 75) WHERE id = ?`, [result, l.id]);
      lCleaned++;
      console.log(`  ~ [LEAD ${l.id}] cleaned: "${l.contact_name}" -> "${result}"`);
    }
  }

  // ── 3. PURGE outreach_drafts ───────────────────────────────────────────
  const draftRows = await all(`SELECT COUNT(*) n FROM outreach_drafts`);
  await run(`DELETE FROM outreach_drafts`);

  // ── 4. RESET qualified leads -> 'ready' (contacted/no_email/rejected/new kept) ──
  const resetResult = await run(
    `UPDATE leads SET status = 'ready', enrichment_status = 'completed'
     WHERE status IN ('approved', 'awaiting_approval', 'needs_review')`
  );
  const readyCount = await all(`SELECT COUNT(*) n FROM leads WHERE status = 'ready' AND email IS NOT NULL AND email LIKE '%@%' AND email NOT LIKE '//%'`);

  console.log(`\n🏁 SANITIZATION COMPLETE`);
  console.log(`  contacts: ${contacts.length} scanned, ${cleared} cleared, ${cleaned} cleaned, ${alreadyFake} already empty`);
  console.log(`  leads:    ${leads.length} scanned, ${lCleared} cleared, ${lCleaned} cleaned`);
  console.log(`  drafts purged: ${draftRows[0]?.n || 0}`);
  console.log(`  leads reset to 'ready': ${readyCount[0]?.n || 0} draft-eligible now`);
  db.close();
}

main().catch(e => { console.error('SANITIZE ERROR:', e); db.close(); process.exit(1); });
