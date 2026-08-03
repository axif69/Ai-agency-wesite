const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('sovereign_resale_v5.db');
const sql = `
  UPDATE leads
  SET enrichment_status = 'retry_scheduled',
      next_retry_at = CURRENT_TIMESTAMP,
      enrichment_attempt_count = CASE
        WHEN COALESCE(enrichment_attempt_count, 0) > 3 THEN 3
        ELSE COALESCE(enrichment_attempt_count, 0)
      END,
      last_error_code = NULL,
      last_error_message = NULL,
      enrichment_worker_id = NULL
  WHERE website IS NOT NULL
    AND TRIM(website) <> ''
    AND website <> 'N/A'
    AND COALESCE(enrichment_status, 'pending') <> 'processing'
    AND (
      email IS NULL OR TRIM(email) = '' OR
      COALESCE(
        NULLIF(TRIM(phone_e164), ''),
        NULLIF(TRIM(mobile_number), ''),
        NULLIF(TRIM(phone), '')
      ) IS NULL
    )
`;

db.run(sql, function onRequeued(error) {
  if (error) {
    console.error(error);
    process.exitCode = 1;
  } else {
    console.log(`REQUEUED=${this.changes}`);
  }
  db.close();
});
