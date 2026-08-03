import { db, initDB } from '../db.js';
import { assessEnterpriseBuyerFit } from '../search_service.js';

await initDB();

const rows: any[] = await new Promise((resolve, reject) => {
  db.all(
    `SELECT d.id AS draft_id, d.lead_id, d.validation_warnings_json,
            l.company_name, l.about_summary, l.status
     FROM outreach_drafts d
     JOIN leads l ON l.id = d.lead_id
     WHERE d.approval_status IN ('draft', 'needs_review')
       AND COALESCE(d.is_test_fixture, 0) = 0`,
    (error, results) => error ? reject(error) : resolve(results || [])
  );
});

let quarantined = 0;
let retained = 0;

for (const row of rows) {
  const fit = assessEnterpriseBuyerFit(row.company_name, row.about_summary || '');
  if (fit.qualified) {
    retained++;
    await new Promise<void>((resolve) => db.run(
      'UPDATE leads SET relevance_score = ?, is_relevant = 1 WHERE id = ?',
      [fit.score, row.lead_id],
      () => resolve()
    ));
    continue;
  }

  let warnings: string[] = [];
  try {
    const parsed = JSON.parse(String(row.validation_warnings_json || '[]'));
    if (Array.isArray(parsed)) warnings = parsed.map(String);
  } catch {}
  warnings.push(`Enterprise buyer-fit gate: ${fit.reason}`);

  await new Promise<void>((resolve) => db.run(
    `UPDATE outreach_drafts
     SET approval_status = 'rejected', rejected_at = CURRENT_TIMESTAMP,
         validation_warnings_json = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [JSON.stringify(Array.from(new Set(warnings))), row.draft_id],
    () => resolve()
  ));
  await new Promise<void>((resolve) => db.run(
    `UPDATE leads
     SET status = CASE WHEN status IN ('ready', 'priority_ready', 'awaiting_approval') THEN 'needs_review' ELSE status END,
         is_relevant = 0, relevance_score = ?,
         analysis_notes = COALESCE(analysis_notes, '') || ?
     WHERE id = ?`,
    [fit.score, ` | Quarantined by enterprise buyer-fit gate: ${fit.reason}`, row.lead_id],
    () => resolve()
  ));
  quarantined++;
}

console.log(JSON.stringify({ reviewed: rows.length, quarantined, retained }));
db.close();
