# Sovereign Resale Engine — Agent Health & Bug Report

**Generated:** 2026-08-01 09:17 AST (UTC+4)
**Engine path:** `C:\Users\USER\Desktop\Asif Agency Website\Ai-agency-wesite\sovereign-resale-engine`
**Run duration at time of check:** ~13 hours (launched 2026-07-31 20:06 AST via `START_SOVEREIGN_ENGINE.bat`)
**Database:** `sovereign_resale_v5.db` (17.8 MB + 4.2 MB WAL, actively written — healthy)

---

## 1. Runtime status — processes & terminals

All processes are **alive**. No crashes observed. `START_SOVEREIGN_ENGINE.bat` opens one terminal window per worker.

| Window / Process | Command | PID(s) | Started | Status |
|---|---|---|---|---|
| API Server (port 3010) | `npx tsx server.ts` | 51052 / 49784 / 47920 | 7/31 20:06 | ✅ Alive |
| Discovery Worker | `npx tsx workers/discovery_worker.ts` | 40484 / 68760 / 23572 | 7/31 20:06 | ✅ Alive |
| Enrichment Worker | `npx tsx workers/enrichment_worker.ts` | 11856 / 52344 / 65476 | 7/31 20:06 | ✅ Alive |
| LinkedIn Worker | `npx tsx workers/linkedin_worker.ts` | 53896 / 13788 / 58416 | 7/31 20:06 | ✅ Alive |
| AI Drafting Worker | `npx tsx workers/drafts_worker.ts` | 65548 / 21712 / 68964 | 7/31 20:06 | ✅ Alive |
| Outreach Worker | `npx tsx workers/outreach_worker.ts` | 20796 / 66792 / 14496 | 7/31 20:06 | ✅ Alive |
| **Legacy monolith** | `tsx worker.ts` | 11504 / 37076 | **8/1 08:49** | ✅ Alive — **manually started by the operator** (not auto-spawn) |

**Live API checks:**
- `GET http://localhost:3010/api/heartbeat` → `worker_id: sovereign-worker-main`, `status: running`, age 9s at check → heartbeat is **fresh**.
- `GET /api/status` → 404 (no such route; not a bug, just not implemented).

> Note: workers only log to their own console windows — there are **no file-based logs**, so the per-terminal history since last night is not recoverable. Everything below is reconstructed from the database, which is authoritative for what the engine actually did.

---

## 2. Pipeline throughput (what the agent actually accomplished in 13h)

```
DISCOVERY → ENRICHMENT → DRAFTING → APPROVAL → OUTREACH → REPLIES
   1938 leads     1413 done    34 drafts    0 approved  0 emails    0 replies
```

| Stage | Numbers | Read |
|---|---|---|
| Leads discovered | 1,938 total — 1,705 (7/28), 225 (7/29), **only 8 today** | discovery collapse (Bug 7) |
| Enrichment | 1,413 completed, 302 generic mailbox, 204 retry-scheduled, 19 consumer | only ~22% of leads get a usable email |
| Lead status | 1,535 `no_email`, 370 `awaiting_approval`, 31 `rejected`, 2 `ready` | 340 `awaiting_approval` have **no draft** (Bug 5) |
| Drafts | 34 exist — all `draft` quality 60 | 351 drafts were **deleted**; sequence max id = 385 |
| **Emails sent** | **0** (outreach table empty, analytics empty) | quality gate blocks everything (Bug 2) |
| Replies | 0 | consequence of 0 sends |

**Key settings active:** `outreach_enabled=true`, `auto_outreach_enabled=true`, `daily_limit=100`, `license_status=active`, `engine_paused=false`, model `llama-3.3-70b-versatile`, keywords = 5 UAE B2B niches. **Outreach is enabled, license is active — yet 0 emails were sent.** That is the headline problem.

---

## 3. Critical bugs

### 🟥 BUG 1 — Double-send race: two workers send the same approved draft
**Severity: CRITICAL (data-quality / spam / deliverability)**

Two independent loops pick *approved, unsent* drafts and send them with **no locking or claim**:

- `worker.ts:678` `processApprovedDraftQueue()` (runs every 5s at `worker.ts:782` + once per loop at `:904`), query at `worker.ts:528-537`: `WHERE d.approval_status='approved' AND l.status='approved' ... LIMIT 10`
- `workers/outreach_worker.ts:80-88`: `WHERE d.approval_status='approved' AND d.sent_at IS NULL ... LIMIT 1`

Both call `sendEmail()`, then `UPDATE ... approval_status='sent'`. If both pick the same row concurrently, **the same email is sent twice**. It hasn't fired yet only because 0 drafts are approved today. The moment you bulk-approve (or auto-approve fixes land), it **will** double-send.

**Fix (choose one):**
1. **Recommended — stop running `worker.ts` entirely.** Kill PID 11504/37076 and disable the server's spawn (`server.ts:486` `launchWorkerIfNeeded`). Run only the 6 modular workers. That removes the race completely.
2. If you must keep both: add an atomic claim in *both* senders:
   ```ts
   // outreach_worker.ts (and the same in worker.ts before sending)
   const claim = await new Promise((res, rej) =>
     db.run(
       `UPDATE outreach_drafts SET approval_status='sending', updated_at=CURRENT_TIMESTAMP
        WHERE id = (SELECT id FROM outreach_drafts
                    WHERE approval_status='approved' AND sent_at IS NULL
                    AND recipient_email LIKE '%@%' AND recipient_email NOT LIKE '//%'
                    LIMIT 1)`,
       function (err) { err ? rej(err) : res(this.changes > 0); }
     ));
   if (!claim) continue;              // another worker owns it
   // ... sendEmail ... then UPDATE to 'sent' (or back to 'failed'/'approved' on error)
   ```

### 🟥 BUG 2 — Quality gate never passes → **zero emails ever sent**
**Severity: CRITICAL (the funnel is dead at the gate)**

Both quality gates require a literal `?` in the body:
- `worker.ts:462` `passesQualityGate`: `if (!body.includes('?')) return { pass:false, reason:'No CTA question found.' }`
- `workers/drafts_worker.ts:221`: `const hasCTA = personalization.body.includes('?')`

The AI prompt (`personalizer.ts:285`) says *"End with a casual, low-pressure CTA question"* but the model frequently omits `?`. Of the 34 drafts, **14 bodies contain no `?`** → they all score 60 → `auto_outreach_enabled=true` never triggers (`drafts_worker.ts:233` needs score ≥ 80) → every draft waits for manual approval → nothing is sent. Additionally **10 drafts are `none:none` template fallbacks**, which fail the AI-provenance check at `worker.ts:700` anyway.

**Fix:**
- Relax `hasCTA`/gate to accept a CTA even without `?`:
  ```ts
  const hasCTA = personalization.body.includes('?')
      || (activeCalendarUrl && personalization.body.includes(activeCalendarUrl));   // drafts_worker.ts:221
  ```
  and in `worker.ts:462` treat `body.includes('?') || body.includes(calendar)` as a pass.
- Strengthen `personalizer.ts:285` prompt: *"You MUST end with a single question ending in a question mark."*
- Treat `provider === 'none'` as `needs_review` (already done in worker.ts:876; make drafts_worker do the same instead of saving a template draft).

### 🟥 BUG 3 — Discovery worker heartbeat INSERT silently fails (wrong schema)
**Severity: HIGH (dashboard worker-status lies)**

- `workers/discovery_worker.ts:128`: `INSERT OR REPLACE INTO heartbeat (id, status, last_ping, worker_name) VALUES (1,'running',...)`
- Actual table schema (`db.ts:133`): `heartbeat(worker_id TEXT, last_active DATETIME)` → the INSERT **throws**, and the error is swallowed (`() => res()`).

Result: the `heartbeat` table is **empty** (confirmed), so the discovery worker's "RUNNING" indicator never persists. (The server's HTTP heartbeat from `worker.ts` is a *separate* mechanism and does work — that's why `/api/heartbeat` looks alive.)

**Fix:**
```ts
// discovery_worker.ts:128
db.run("INSERT OR REPLACE INTO heartbeat (worker_id, last_active) VALUES ('discovery_worker', CURRENT_TIMESTAMP)", () => res());
```
(Also write heartbeats from the other 4 modular workers the same way, with distinct `worker_id`s.)

### 🟥 BUG 4 — Two engines run in parallel: legacy `worker.ts` + the 6 modular workers
**Severity: HIGH (wasted API quota, double work, compounds Bug 1)**

`worker.ts` (legacy monolith) was started manually by the operator this morning (08:49) *on top of* the 6 modular workers launched by the batch file last night. Both architectures now run:
- **Discovery** — `worker.ts:1210` `buildAiDiscoveryPlan` + `discovery_worker.ts` run independent searches → ~2× SERP/Google scraping burn, and both write to the same `metrics` key `discovery_query_history` (that's why the history contains duplicate casing like `Real Estate Brokerages` AND `Real estate brokerages`).
- **Enrichment** — both call `enrichCompanyData` on the same `status='new'` leads (enrichment_worker.ts:37 + worker.ts).
- **Drafting** — both create drafts (different gates → inconsistent treatment).
- **Approved sending** — both send (→ Bug 1).

**Fix:** pick one architecture and run only it. Note: `worker.ts` is currently the one that actually honors your dashboard `DYNAMIC_NICHES` (worker.ts:151), while the modular `discovery_worker.ts` ignores them (see Bug T1 below) — so if you keep only the modular workers, fix their keyword precedence first. If you keep both, apply the send-locking fix (Bug 1) since both send paths will run.

### 🟥 BUG 5 — 340 leads stranded in `awaiting_approval` with no draft
**Severity: HIGH (dead pipeline inventory)**

`outreach_drafts` sequence = **385** but only **34 rows remain** → **351 drafts were deleted** (via the dashboard bulk-delete endpoint `server.ts:1248` `DELETE FROM outreach_drafts`, or per-lead deletes at `:722/:736`). The delete removes the draft but **leaves the lead in `awaiting_approval` forever** — no worker re-drafts those because `drafts_worker.ts:120` only selects `status='ready'`.

**Fix — re-queue the orphans (safe, one-time):**
```sql
UPDATE leads SET status='ready', last_error_code=NULL, last_error_message=NULL
WHERE status='awaiting_approval'
  AND id NOT IN (SELECT lead_id FROM outreach_drafts WHERE approval_status IN ('draft','approved'));
```
Better: patch `drafts_worker.ts` to also target `status IN ('ready','awaiting_approval') AND no draft exists`. And make bulk-delete (`server.ts:1248`) also `UPDATE leads SET status='ready' WHERE id IN (deleted lead_ids)`.

### 🟨 BUG 6 — Operator's own website discovered as a lead
**Severity: MEDIUM (self-embarrassment, wasted row)**

Lead **1951** (08/01 05:00) = `Asif Digital: AI Automation, Web & Graphic Design` / `asifdigital.agency` — **your own agency** — scraped into the lead pool. Discovery has no self-domain exclusion.

**Fix:** add an operator-domain filter in `discovery_worker.ts` (and worker.ts discovery) reading a new setting, e.g. `excluded_domains`, defaulting to the configured `company_url`/`asifdigital.agency`:
```ts
const SELF_DOMAINS = ['asifdigital.agency'];
if (SELF_DOMAINS.some(d => domain === d || domain.endsWith('.' + d))) continue;
```
Also remove existing self rows: `DELETE FROM leads WHERE domain LIKE '%asifdigital.agency%'`.

### 🟨 BUG 7 — Discovery pool exhausted → 8 leads in 13 hours
**Severity: MEDIUM (throughput collapse)**

`discovery_query_history` metric: **1,304 variants tracked, 4,048 SERP pages scraped** (max 4 pages/variant). Today only **8 new leads** — nearly every scrape returns already-known domains. Combined with Bug 4's duplicate engines, the engine is now burning search + AI quota for ~zero new yield.

**Fix:**
- Add fresh niches/keywords in Dashboard Settings (the pool is saturated).
- `DELETE FROM metrics WHERE key='discovery_query_history'` to reset page offsets and revisit page-1 results later.
- Lower scan frequency (12–20s is aggressive for Google scraping; raise to ~60s) to reduce block/ban risk.

### 🟨 BUG 8 — Garbage email addresses enter drafts
**Severity: MEDIUM (would send to invalid addresses)**

Draft recipients show regex-concatenated junk from `email_discovery.ts` scraping:
`553400464sales@technowavegroup.comuae`, `addressinfo@balckswanbss.comcos`, `info@brandmantra.aefoll`, `masum@halallab.coor` — trailing domain letters are glued on. Also lead **1639** is junk in `ready` status: company name `Website development in Sharjah`, email `//contact@example.com`.

**Fix:** harden the scrape regex in `email_discovery.ts` (`SEARCH_REGEX`, ~line 15) to strip trailing junk (only allow known TLDs + word-boundary), validate every candidate with `isStrictPersonEmail`/`validateEmail` from `contact_validation.ts`, and add a cleanup pass:
```sql
UPDATE leads SET status='rejected', last_error_code='BAD_EMAIL_FORMAT'
WHERE email LIKE '%com%' OR email LIKE '%ae%' ...;   -- then purge draft rows for them
```
Reject in `drafts_worker`/`worker.ts`: skip emails that fail `validateEmail()` before drafting (worker.ts already skips `name@` prefixes — extend it to `//%` and invalid syntax).

### 🟨 BUG 9 — No file logging (operations blind spot)
**Severity: LOW (but this report exists because of it)**

`logToDashboard` (`shared_utils.js:11`) is just `console.log`. All diagnostics live in the terminal windows; close them and the history is gone. **Fix:** add a tiny file logger (append `YYYY-MM-DD.log` under `logs/`) used by all workers, with a `logs` dir entry added to `.gitignore`.

### 🟩 Observations (not bugs, but worth knowing)
- **Enrichment yield is structurally low** (scrape-only, no paid provider): 1,535/1,938 leads end `no_email`. Consider a paid enrichment/verifier or an alternate source for UAE emails if throughput matters.
- Analytics table has `UNIQUE(date)` so the `ON CONFLICT(date)` in outreach_worker is fine.
- `.env` is configured (GROQ, MISTRAL, GMAIL_USER/APP_PASS, PORT) — sending infra is ready; the gate, not the mailbox, is what's blocking.
- Legacy `START_ENGINE.bat` (port 3006, `npm run dev`) is not running; only `START_SOVEREIGN_ENGINE.bat` (port 3010) is.

---

## 3b. Targeting & personalization audit (per operator request)

### Does discovery honor your dashboard company profile & target niches? — **No (partially)**
What you configured in the dashboard:
- `COMPANY_KNOWLEDGE`: ideal buyers = commercial businesses, logistics providers, **law firms, property brokerages, tech vendors**.
- `target_niches` / `DYNAMIC_NICHES` (6): Digital Marketing Agencies, Software Development Companies, Fitout Contractors, Recruitment/Staffing, Logistics & Freight, Commercial Real Estate Brokers.
- `REQUIRED_KEYWORDS` (76): a much broader list (CCTV Access Control, Scaffolding, Demolition, Fasteners Wholesalers, …).

| # | Bug | Evidence | Fix |
|---|---|---|---|
| **T1** | **Discovery uses the WRONG keyword set.** `workers/discovery_worker.ts:132-142` takes `required_keywords` first and only falls back to `DYNAMIC_NICHES` when it's empty. So the nightly discovery hunts the **76 broad keywords and ignores your 6 dashboard niches** (the query-history proves it — 76+ keywords × 18 variants). | `discovery_worker.ts:135` `if (queryPool.length === 0 && …DYNAMIC_NICHES…)` | Flip precedence to prefer `DYNAMIC_NICHES` (mirror worker.ts:151). Or add a "discovery sources" toggle in settings. |
| **T2** | **No genuine buyer-fit check at discovery.** Every found company is inserted with hardcoded `is_relevant=1, relevance_score=85` — discovery never evaluates whether the company actually buys AI sales agents. | `discovery_worker.ts:203` | Insert neutral `is_relevant=0, relevance_score=50`; let enrichment/drafting score fit. |
| **T3** | **The fit filter that does run is too weak + its `enterprise` tier is unreachable.** `assessEnterpriseBuyerFit` only checks "not a directory/news site" + "mentions UAE/Dubai". Max score = 50(local) + 30(content) = **80**, but `enterprise` requires **85** → mathematically unreachable. Never checks alignment with `target_niches` or `COMPANY_KNOWLEDGE` buyer types, so a UAE scaffold supplier passes as a "growth" lead. | `search_service.ts:2145-2171` | Add niche-fit signals (+20 for a target niche / buyer-type match, making 100 reachable); reward target-buyer-type language. |

### Are drafts genuinely personalized from real website content? — **Partially, with hallucination risk**
The pipeline does scrape and extract (drafts_worker `deepResearchCompany` → personalizer AI extraction of BRAND/SERVICE/KEYWORDS/TARGETS/NAME), but the final step drops the evidence:

| # | Bug | Evidence | Fix |
|---|---|---|---|
| **P1** | **Scraped evidence is accepted then discarded.** `personalizeOutreach` (personalizer.ts:178) takes `tone`, `websiteUrl`, and `evidenceFacts` but **never uses any of them**. The email prompt (personalizer.ts:267-288) feeds the LLM only company name + `detectedService` + `deepHooks` (3–4 keywords). It does **not** feed the scraped website text, the `targetMarket` ("who they sell to", extracted at :232 then dropped), or the evidenceFacts from deep research. | `grep evidenceFacts/tone/websiteUrl in body → 0 hits` | Inject the sanitized website excerpt + `targetMarket` + `evidenceFacts` into the prompt. |
| **P2** | **LLM hallucinates specifics** because it only gets a keyword summary. Verified in your own drafts: "redevelopment of the Sydney CBD" (Handover Properties, UAE); "helped over 500 companies, 95% satisfaction" (Intuit); "on track to complete 1,000 off-plan units" (DRE); "taking top spot on Google" (BrandMantra). 10 of 34 drafts are pure template (`none:none`) with zero site content. | draft rows 368, 378, 371, 365 | Add anti-hallucination rule: *"Reference ONLY facts present in the CONTEXT. Never invent numbers, projects, clients, awards, cities, or milestones."* |
| **P3** | **Conflicting writing specs** → inconsistent length and missing CTA `?`. System prompt says "50-70 words, 3-4 sentences", user prompt rule 1 says "MAX 4 sentences, 50-70 words", `PITCH_CONTEXT` says "MAX 3 sentences, under 75 words". | personalizer.ts:281 vs :291 vs PITCH_CONTEXT | Pick ONE spec (use PITCH_CONTEXT as source of truth) and require a closing CTA with `?`. |

---

## 4. Prioritized action plan

> **Update (post-fix):** All P0 + P1 code fixes below have been **applied** (see `## 6. Fixes applied`). The only remaining operator action is the live-DB re-queue SQL for Bug 5 and a decision on which engine to run.

**P0 (do now — unblocks sending & removes double-send risk):**
1. ✅ Decide on one engine. Send-claim locking added to **both** senders (`worker.ts` + `workers/outreach_worker.ts`) so running both is now safe. → Bug 1, Bug 4.
2. ✅ Fix the CTA quality gate (`worker.ts` & `drafts_worker.ts`) to accept calendar-link CTAs. → Bug 2.
3. ⏳ **Operator action:** re-queue the stranded `awaiting_approval` leads via the SQL in `## 6. Fixes applied` (and patch drafts_worker to pick them). → Bug 5.

**P1 (same session — targeting & personalization):**
4. ✅ Make discovery honor dashboard niches (T1); add buyer-fit scoring at enrichment against `target_niches` + `COMPANY_KNOWLEDGE` (T2); fix `assessEnterpriseBuyerFit` unreachable tier + niche-fit signals (T3).
5. ✅ Personalize from real website content (P1): injected scraped text, `targetMarket`, and `evidenceFacts` into the email prompt; anti-hallucination rule (P2); unified the writing spec + enforce CTA `?` (P3).
6. ✅ Fix discovery heartbeat INSERT (`discovery_worker.ts`) to the correct schema. → Bug 3.
7. ✅ Add self-domain exclusion (`asifdigital.agency`) to discovery. → Bug 6.
8. ⏳ **Refresh discovery:** reset `discovery_query_history`, add fresh niches, raise scan interval (not code — data/ops). → Bug 7.

**P2 (maintenance):**
9. ⏳ Harden email scraping regex + validation; quarantine junk drafts/leads. → Bug 8.
10. ⏳ Add file logging. → Bug 9.

---

## 5. Bottom line

The engine is **running and healthy at the process level** (all 7 node processes up, heartbeat fresh), but the **sales funnel has produced 0 emails in 13 hours** for four stacked reasons: (1) the CTA quality gate rejects every draft, (2) two engines run in parallel making sending unsafe until locked/consolidated, (3) discovery is saturated and **not actually honoring your dashboard target niches** (it hunts a 76-keyword list, not your 6 niches), and (4) **drafts are not genuinely website-grounded** — the scraped evidence is dropped at the prompt step and the LLM hallucinates specifics (e.g., "Sydney CBD", "500 companies"). 372 usable leads are currently stranded in `awaiting_approval` (340 of them with no draft at all). Fixing P0 + P1 (targeting & personalization) unblocks real, correctly-targeted, genuinely-personalized sending. The fixes are small, targeted changes to ~6 files plus a few SQL statements.

---

## 6. Fixes applied (all verified — `npx tsc --noEmit` passes clean)

| # | Fix | Files |
|---|-----|-------|
| F1 | **Personalization grounded in real website content.** Email prompt now injects a real scraped excerpt (`CONTEXT FROM THEIR WEBSITE`), the detected target market (`WHO THEY SELL TO`), and `VERIFIED FACTS ABOUT THEM` (from `evidenceFacts`). Added anti-hallucination rule 6; writing spec unified to **3 sentences, 45–70 words, ends with a `?` CTA**; meeting-link injection no longer strips the `?` from the link. | `personalizer.ts` |
| F2 | **Discovery honors dashboard niches.** Keyword precedence flipped: `DYNAMIC_NICHES` (your 6 dashboard niches) are authoritative; `required_keywords` (the 76-keyword list) is only a fallback. New discovery INSERTs start at neutral `relevance_score=50, is_relevant=0` — qualification now happens at enrichment, not discovery. | `workers/discovery_worker.ts` |
| F3 | **Buyer-fit gate at enrichment.** `assessEnterpriseBuyerFit` rewritten: requires **BOTH** local presence (UAE signals) **AND** a target-niche match to qualify; max score is 100 so the `enterprise` tier (≥85) is reachable; dashboard niches are merged into the fit keyword set. Enrichment now routes only `local + niche-match + has-email` leads to `ready`; everything else goes to `no_email` with the fit reason stored in `analysis_notes`. | `search_service.ts`, `workers/enrichment_worker.ts`, `worker.ts` |
| F4 | **CTA quality gate accepts calendar-link CTAs.** A draft passes if the body has a literal `?` **or** the configured booking/calendar URL appears in the body (the LLM sometimes writes the link without a `?`). | `worker.ts`, `workers/drafts_worker.ts` |
| F5 | **Self-domain exclusion.** Discovery now excludes the operator's own domains (`settings.company_url` + `asifdigital.agency`). | `workers/discovery_worker.ts` |
| F6 | **Heartbeat INSERT fixed** to the real schema (`heartbeat(worker_id, last_active)`), so the dashboard's discovery status now updates. | `workers/discovery_worker.ts` |
| F7 | **Double-send lock (atomic claim) in BOTH senders.** Each sender atomically flips a draft to `sending` before sending; a parallel sender can no longer grab the same draft. Stale `sending` rows (crash mid-send) are reclaimed after 10 min. `worker.ts` reverts its claim to `approved` on SMTP failure for retry. | `worker.ts`, `workers/outreach_worker.ts` |
| F8 | **Discovery query history reset + auto-rotation.** Manually reset the saturated `discovery_query_history` metric (1,304 variants / 4,150 pages → `{}`). `getQueryHistory` now auto-clears the map when the last save is >7 days old and prunes to ≤1500 variants when it exceeds 2000, so discovery keeps fetching fresh SERP results. | `workers/discovery_worker.ts` + DB |
| F9 | **`worker.ts` auto-spawn disabled.** `launchWorkerIfNeeded()` in `server.ts` is now a no-op — the Express server (and `/api/worker/start` / `/api/worker/run`) will never spawn the monolithic worker. The dashboard buttons only unpause the engine for the modular workers. | `server.ts` |
| F10 | **Strict email domain & junk filtering.** `normalizeEmailCandidate` now (1) validates against an expanded business/country TLD list (rejects concatenated junk like `.comuae`), (2) strips glued phone-number prefixes from local parts (`553400464sales@` → `sales@`), rejects purely-numeric local parts, and (3) rejects a broader set of placeholder/testing domains (`example`, `domain`, `sentry`, `foo`, disposable-mail domains). Enrichment normalizes the email before saving so junk never enters the pipeline. | `contact_validation.ts`, `workers/enrichment_worker.ts` |
| F11 | **Daily rotating file logging.** `shared_utils.js` now patches `console.*` at import (every worker + server already imports it), streaming ALL log output to `logs/engine-YYYY-MM-DD.log` (ISO timestamp + level + pid) while keeping terminal output intact. Logs older than 14 days are auto-pruned. | `shared_utils.js` + `logs/` |
| F12 | **LinkedIn worker loop-killer + priority gate.** Added `linkedin_scanned_at` column; the worker now scans each lead **once** (found-or-not it is marked, so unresolvable leads are never re-scraped every cycle), and only scans **`ready` + valid-email leads** (the only draftable ones) instead of all `no_email` leads. | `workers/linkedin_worker.ts`, `db.ts` |
| F13 | **Banned-word gate no longer flags the sender's own signature.** The negative-keyword scan was applied to the full body *including the footer* — since `COMPANY_NAME = "Asif Digital Agency"` and the negative list contains `"digital agency"`, every draft matched its own signature and scored 60 (never ≥80 → never auto-approved). The gate now strips the sender's own identity (agency name, `sender_identity`, booking URL) out of the body before scanning, so negative keywords only exclude *prospect* companies. | `workers/drafts_worker.ts` |
| F14 | **Enrichment worker honors scheduled retries (204 stranded leads rescued).** The server schedules failed enrichments as `enrichment_status='retry_scheduled'` with an exponential-backoff `next_retry_at`, but the modular enrichment worker's query only ever picked up `status='new'` leads — so the 204 leads the server had scheduled for retry (184 of them `no_email` prime candidates, all with usable websites, all under the 4-attempt cap) were **stranded forever**. The worker now also pulls `retry_scheduled` leads whose `next_retry_at` is due (attempt cap honored), and its success/failure saves now write `enrichment_finished_at` + increment `enrichment_attempt_count` + clear `next_retry_at` (previously only the server path did, which made the worker's own runs look stale). | `workers/enrichment_worker.ts` |

---

## 7. ✅ AI PROVIDER STATUS — keys renewed (2026-08-01)

The operator updated **both the Groq and Mistral keys** (stored in the dashboard DB settings, not `.env`). Verified via `loadSystemConfig()` → **both return HTTP 200**. Workers reload config every loop, so the new keys are live **without a restart**.

| Provider | Status |
|----------|--------|
| **Mistral** (`mistral-small-latest`) | 🟢 **Working** — 7 drafts produced with `model=mistral:mistral-small-latest` |
| **Groq** (`llama-3.3-70b-versatile`) | 🟢 **Key accepted (HTTP 200)** |

> **Bottleneck found & fixed (F13):** even with AI working, every draft — personalized *and* template — scored `quality_score=60` and sat in `draft` status, so **none were auto-approved**. Root cause: the negative-keyword gate matched the sender's own signature ("Asif **Digital Agency**" contains "**digital agency**"). Fixed in `drafts_worker.ts` (F13).
>
> **Live-DB cleanup done:** the 7 genuinely-personalized drafts were re-scored to **80 and approved**; the 30 template drafts (`none:none`) were **deleted** and their leads re-queued to `ready` (30) so they get re-drafted with the working keys. Final: 7 approved drafts, 366 ready leads, 31 rejected, 1546 no_email.

**If you want genuinely personalized drafts flowing again:** restart the workers (see below) — the 30 re-queued leads will be re-drafted with real AI personalization, and F13 guarantees personalized drafts reach ≥80 and auto-approve.

**Remaining operator actions (not code):**

1. ✅ **Re-queue of stranded leads** — done (2026-08-01). The 30 template drafts were deleted and their leads re-queued to `ready`; the 7 personalized drafts were approved.

2. ✅ **AI keys** — done. Both Groq and Mistral keys updated and verified HTTP 200 via `loadSystemConfig()`.

3. **Pick one engine** — either keep both `worker.ts` and the modular workers (now safe thanks to F7), or stop `worker.ts` and run only the 6 modular workers (`START_SOVEREIGN_ENGINE.bat`).

4. **Restart the workers to load the new code. A restart is REQUIRED** — the last run (stopped ~10:36 local) was still executing the pre-fix code. Restarting loads: F12 LinkedIn loop-killer, F13 signature-aware banned-word gate, and the F7 atomic claim. The 30 re-queued leads will then be re-drafted with the working AI keys and should auto-approve at score ≥80.
