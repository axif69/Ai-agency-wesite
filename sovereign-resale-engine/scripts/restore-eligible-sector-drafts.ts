import { db, initDB } from '../db.js';
import { assessEnterpriseBuyerFit } from '../search_service.js';

await initDB();

const rows: any[] = await new Promise((resolve, reject) => db.all(
  `SELECT d.id AS draft_id, d.lead_id, d.validation_warnings_json,
          l.company_name, l.about_summary
   FROM outreach_drafts d
   JOIN leads l ON l.id = d.lead_id
   WHERE d.approval_status = 'rejected'
     AND COALESCE(d.is_test_fixture, 0) = 0
     AND d.validation_warnings_json LIKE '%Enterprise buyer-fit gate:%'`,
  (error, results) => error ? reject(error) : resolve(results || [])
));

let restored = 0;
for (const row of rows) {
  const fit = assessEnterpriseBuyerFit(row.company_name, row.about_summary || '');
  if (!fit.qualified) continue;

  let warnings: string[] = [];
  try {
    const parsed = JSON.parse(String(row.validation_warnings_json || '[]'));
    if (Array.isArray(parsed)) warnings = parsed.map(String);
  } catch {}
  warnings = warnings.filter(warning => !warning.startsWith('Enterprise buyer-fit gate:'));

  await new Promise<void>((resolve) => db.run(
    `UPDATE outreach_drafts
     SET approval_status = 'draft', rejected_at = NULL,
         validation_warnings_json = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [JSON.stringify(warnings), row.draft_id],
    () => resolve()
  ));
  await new Promise<void>((resolve) => db.run(
    `UPDATE leads
     SET status = 'awaiting_approval', is_relevant = 1, relevance_score = ?,
         analysis_notes = COALESCE(analysis_notes, '') || ?
     WHERE id = ?`,
    [fit.score, ` | Restored after eligible-sector buyer-fit review: ${fit.reason}`, row.lead_id],
    () => resolve()
  ));
  restored++;
}

console.log(JSON.stringify({ reviewed: rows.length, restored }));
db.close();
