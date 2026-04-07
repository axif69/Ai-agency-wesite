# Hardening Timestamp for Outreach

## Goal
Add a reliable `sent_at` timestamp to each lead when an outreach email is sent, store it in the database, and display it in the Dashboard's Outreach History view.

## User Review Required
[!IMPORTANT]
- No breaking UI changes are introduced; the new column will be optional for existing rows.
- The database migration will add the column if missing.
- Ensure the worker process has permission to write to the `leads` table.

## Proposed Changes
---
### [MODIFY] [db.ts](file:///c:/Users/USER/Desktop/Asif%20Agency%20Website/Ai-agency-wesite/tri-angle-sovereign-v2/db.ts)
- Extend `leads` table schema to include `sent_at DATETIME DEFAULT NULL`.
- Add migration `ALTER TABLE leads ADD COLUMN sent_at DATETIME` after table creation.
- Update `recordOutreach` to set `sent_at` on the corresponding lead record.

### [MODIFY] [Dashboard.tsx](file:///c:/Users/USER/Desktop/Asif%20Agency%20Website/Ai-agency-wesite/tri-angle-sovereign-v2/Dashboard.tsx)
- In the **Outreach History** (`view === 'sent'`) table, replace the `added_at` date display with `sent_at`.
- Use `new Date(p.sent_at).toLocaleString()` for a full timestamp.
- Adjust column header if needed (already labeled "Timestamp").

## Open Questions
- Do you want the timestamp column to also appear in the **All Leads** view? (Currently only used in sent view.)

## Verification Plan
### Automated Tests
- Run the worker to send a test email and verify that `sent_at` is populated in the `leads` row.
- Query the DB via the API (`/leads`) and ensure the field is returned.
- Check the Dashboard UI displays the timestamp correctly.

### Manual Verification
- Launch the app, trigger a bulk send, then navigate to **Outreach History** and confirm the timestamp appears.
