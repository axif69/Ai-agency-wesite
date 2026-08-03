const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('sovereign_resale_v5.db');
const sql = `
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN email IS NOT NULL AND TRIM(email) <> '' THEN 1 ELSE 0 END) AS with_email,
    SUM(CASE WHEN COALESCE(NULLIF(TRIM(phone_e164), ''), NULLIF(TRIM(mobile_number), ''), NULLIF(TRIM(phone), '')) IS NOT NULL THEN 1 ELSE 0 END) AS with_phone,
    SUM(CASE WHEN email IS NOT NULL AND TRIM(email) <> '' AND COALESCE(NULLIF(TRIM(phone_e164), ''), NULLIF(TRIM(mobile_number), ''), NULLIF(TRIM(phone), '')) IS NOT NULL THEN 1 ELSE 0 END) AS complete,
    SUM(CASE WHEN (email IS NULL OR TRIM(email) = '') AND COALESCE(NULLIF(TRIM(phone_e164), ''), NULLIF(TRIM(mobile_number), ''), NULLIF(TRIM(phone), '')) IS NULL THEN 1 ELSE 0 END) AS missing_both,
    SUM(CASE WHEN enrichment_status = 'retry_scheduled' THEN 1 ELSE 0 END) AS queued,
    SUM(CASE WHEN enrichment_status = 'processing' THEN 1 ELSE 0 END) AS processing,
    SUM(CASE WHEN enrichment_status = 'needs_review' THEN 1 ELSE 0 END) AS exhausted
  FROM leads
`;

db.get(sql, (error, row) => {
  if (error) {
    console.error(error);
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify(row));
  }
  db.close();
});
