# Sovereign Resale Engine: Current Implementation Logic

**Implementation reviewed:** Sovereign Resale Engine v5.1.3 hardened runtime  
**Report date:** July 16, 2026  
**Scope:** Current source code and runtime architecture, not the historical master design  
**Engine location:** `sovereign-resale-engine`  
**Database:** `sovereign_resale_v5.db`

## 1. Executive Summary

The current Sovereign Resale Engine is a local, multi-process sales-research and human-approved outreach system. It runs three processes:

1. An Express API server on port 3003.
2. A continuous background worker.
3. A Vite/React dashboard on port 3006.

The engine discovers UAE companies from public web sources, crawls official websites, attempts to identify decision-makers, extracts and validates public contact details, qualifies company fit, creates evidence-backed drafts, waits for human approval, sends approved messages through configured SMTP, archives sent copies through IMAP, and monitors the mailbox for replies and bounces.

The architecture is safety-oriented, but the current implementation has several important behavioral inconsistencies:

- AI routing is not unified. Research uses one provider chain, drafting uses another, and follow-ups and reply sentiment remain Groq-specific.
- Company relevance can fall back to deterministic approval when all AI providers fail.
- The default shallow discovery mode does not run all search providers advertised by its log message.
- A large incomplete-contact backlog can prevent autonomous discovery from running.
- Decision-maker identity validation is stronger than simple scraping but does not conclusively verify current employment.
- Pausing the main engine does not independently pause the approved-email delivery timer.

## 2. Runtime Architecture

### 2.1 Launcher

`SOVEREIGN_START_V17.bat` performs the following sequence:

1. Deletes the temporary dashboard API-port file if it exists.
2. Changes into the engine directory.
3. Runs `scripts/stop-stale-sovereign.ps1` to stop stale Node, command-shell, and PowerShell processes associated with this project.
4. Opens `http://localhost:3006` in the default browser.
5. Starts the server, worker, and dashboard through `concurrently`.

The launched commands are:

```text
tsx server.ts
tsx worker.ts
vite --port=3006
```

### 2.2 API and Dashboard

The Express server listens on port 3003. Vite listens on port 3006 and proxies `/api` requests to port 3003. The dashboard also contains fallback API-base detection for local ports.

### 2.3 Database Concurrency

The server and worker open the same SQLite file. SQLite is configured with:

- WAL journal mode.
- A 10-second busy timeout.
- `synchronous=NORMAL`.

This allows the dashboard server and autonomous worker to read and write concurrently with reduced `SQLITE_BUSY` risk.

## 3. Configuration Logic

### 3.1 Source of Truth

`config_manager.ts` treats the SQLite `settings` table as the operational source of truth. Environment variables are used only when a corresponding database setting is absent.

Sensitive values are decrypted when they appear to be encrypted. If decryption fails, the loader treats the value as plaintext for backward compatibility.

### 3.2 Main Settings

The runtime loads:

- Company identity: company name, representative, website, phone and sender email.
- Company knowledge and pitch context.
- Target location, required keywords and negative keywords.
- AI keys and selected models.
- SMTP host, port, security mode and mailbox password.
- Discovery depth: `shallow` or `deep`.
- Daily sending limit.
- Follow-up settings.
- Auto-discovery, pause and outreach-enabled flags.

### 3.3 Defaults

Important defaults are:

- Target location: UAE.
- Investigation depth: shallow.
- Auto-discovery: enabled.
- Outreach sending: disabled.
- Engine paused: false.
- Daily limit: 100 in configuration defaults, although some worker fallbacks use 500 when no parsed value is available.
- Main configured model: `llama-3.3-70b-versatile`.

## 4. Database Model

### 4.1 Leads

The `leads` table is the primary company pipeline. It stores:

- Company identity, website, domain, category and location.
- Email, phone, mobile and LinkedIn URL.
- Contact name and role-confidence fields.
- Relevance state and score.
- Contact evidence and email ownership fields.
- Draft/sending status, pitch and contact timestamps.
- SMTP receipt data and retry/error state.
- Enrichment attempt, worker and scheduling state.

The domain has a unique index, so the same company domain should not be inserted twice.

### 4.2 Contacts

The `contacts` table stores zero or more people for each lead, including:

- Full name and role.
- Seniority and department.
- Email, phone, mobile and LinkedIn URL.
- Evidence, confidence and ownership verification.
- Whether the contact is considered a decision-maker.

### 4.3 Outreach Drafts

`outreach_drafts` stores editable, human-reviewable messages with:

- Lead and recipient.
- Subject and body.
- Sourced prospect facts.
- Prompt version and AI provider/model provenance.
- Quality score and warnings.
- Approval state and timestamps.

### 4.4 Delivery, Replies and Analytics

- `outreach` records accepted delivery attempts by email.
- `replies` stores parsed inbound replies and sentiment.
- `analytics` stores daily aggregate counters.
- `heartbeat` and `metrics` represent worker liveness.

## 5. Current Lead State Machine

The current code uses the following practical statuses:

```text
new
  -> ready                 verified person email or reviewable company mailbox
  -> no_email              contact incomplete or retained but not draftable
  -> rejected              irrelevant, invalid or missing required website
  -> invalid_email         invalid email state

ready / priority_ready
  -> awaiting_approval     AI draft successfully created
  -> needs_review          insufficient fit, evidence or safety

awaiting_approval
  -> approved              human approval accepted by API gate
  -> needs_review          human rejection

approved
  -> sent                  SMTP accepted recipient
  -> approved              sending failed and retry was scheduled
  -> needs_review          final safety/evidence/provenance gate failed
  -> invalid_email         malformed address or missing MX

sent
  -> followed_up           optional follow-up sent
  -> replied               reply workflow may associate an inbound response
```

The separate `enrichment_status` field can be `pending`, `processing`, `completed`, `retry_scheduled`, or `needs_review` independently of the lead status.

## 6. Worker Scheduling

### 6.1 Heartbeat

Every 15 seconds, the worker:

- Increments the local heartbeat metric.
- Posts liveness information to the API server.

The API considers the worker online when the heartbeat remains recent.

### 6.2 Independent Approved-Draft Queue

Every five seconds, a separate timer calls `processApprovedDraftQueue()`. This timer exists so a slow browser crawl cannot delay an already approved email.

Current consequence: this timer checks outreach enabled, license status and daily limit, but does not check `engine_paused`. Therefore pausing the main loop does not necessarily pause approved delivery.

### 6.3 Main Loop

The main worker runs continuously and sleeps for 15 seconds after each complete cycle. A cycle loads fresh settings and then performs:

1. Pause check.
2. Bounce check when due.
3. Draft creation from safe ready leads.
4. A direct approved-queue call in addition to the five-second timer.
5. Optional follow-ups.
6. Contact enrichment.
7. Autonomous discovery when the enrichment query is empty.
8. Reply-monitor self-healing.

## 7. Bounce Protection

Every 30 minutes, `bounce_scraper.ts` connects to the configured mailbox over IMAP and scans for delivery failures. Identified bounced addresses are protected from reuse and can be blacklisted or marked accordingly.

The IMAP host is derived from SMTP configuration when an explicit IMAP host is unavailable.

## 8. Draft Candidate Selection

### 8.1 Generic Mailbox Quarantine

Before selecting draft candidates, the worker quarantines generic addresses such as `info`, `contact`, `support`, `jobs`, or `billing` when they are not explicitly marked as official website/company mailbox fallbacks.

Official company mailboxes can remain eligible if:

- The address is syntactically valid.
- It belongs to the lead's domain or came from the official website.
- Domain or published-source evidence exists.
- It is not a blocked service mailbox such as support, legal, privacy or careers.
- The company remains relevant.

### 8.2 Ready Query

The worker selects up to 50 leads with:

- Status `ready` or `priority_ready`.
- A non-empty email.
- `is_relevant = 1`.
- Relevance score of at least 70.

It then applies `isSafeLead()` and drafts for only one lead per main loop.

### 8.3 Draft Safety

A draft candidate must have either:

- A strictly verified person-owned email, or
- A reviewable official company mailbox.

It must also avoid forbidden domains, placeholders, test addresses and blocked generic roles.

## 9. Company Fit and Evidence Before Drafting

Immediately before drafting, the worker runs `assessEnterpriseBuyerFit()` again against the stored about-summary or a fresh website scrape.

The deterministic assessment requires:

- At least one approved sector signal.
- At least two scale signals.
- At least two commercial-motion signals.
- UAE/local evidence.
- A score of at least 70.

The worker extracts short source-backed facts from the website text. It currently requires:

- At least two sourced facts.
- At least two facts recognized as commercially meaningful.

If these checks fail, the lead moves to `needs_review` instead of receiving a draft.

## 10. AI Provider Routing

The current system has multiple independent AI pipelines.

### 10.1 Shared Research AI: `search_service.callAI()`

This function powers discovery planning, batch filtering, relevance review and suspicious-name validation. Its current order is:

1. Direct Mistral using `mistral-small-latest`.
2. OpenRouter using the configured model.
3. OpenAI using the configured model.
4. Groq: `llama-3.3-70b-versatile`.
5. Groq: `llama-3.1-8b-instant`.
6. Groq: retired `mixtral-8x7b-32768`.
7. Gemini fallback.

A successful Mistral completion logs `[AI] Mistral primary completed successfully.`

### 10.2 Drafting AI: `personalizer.callAIPipe()`

Drafting does not use the shared order. Its current order is:

1. OpenRouter.
2. OpenAI.
3. Configured Groq model unless the selected model name is Mistral.
4. Mistral Large and Mistral Nemo fallbacks.
5. Groq `llama-3.1-8b-instant` emergency fallback.
6. Local hardcoded template.

The worker accepts a new review draft only when `personalizeOutreach()` reports a confirmed AI provider. Therefore the local hardcoded template is generated but is not saved as an approval-ready draft.

### 10.3 Follow-Up AI

`generateFollowUp()` uses Groq directly. When Groq is unavailable, it returns a generic local follow-up template.

### 10.4 Reply Sentiment AI

`analyzeSentiment()` also uses Groq directly with `llama-3.1-8b-instant`. If Groq is absent or fails, sentiment becomes `neutral`.

## 11. Autonomous Discovery Planning

`buildAiDiscoveryPlan()` builds a rotating pool of short search phrases from:

- Company identity and pitch context.
- Company knowledge.
- Required and negative keywords.
- Existing dynamic niches.
- Deterministic target-sector seeds.

AI suggestions are admitted only when they pass query-quality rules. For the sales-engine offer, the planner prioritizes established, high-ticket B2B sectors and preserves events, corporate training, marketing agencies, and web/app development firms only when the query implies meaningful scale.

One unused query is selected per discovery cycle using an in-memory round-robin set.

## 12. Discovery Sources

### 12.1 GMB Ninja

For every autonomous query, the worker launches GMB Ninja with the configured location. Ninja is given up to 120 seconds and runs while the search-engine promise is already in progress.

### 12.2 Shallow Discovery

Shallow mode is the default. `findLeadTargetsFast()` runs these sources concurrently:

- Yellow Pages UAE.
- Bing.
- Yahoo.

It does not currently execute DDG, SearXNG, map search or stealth search. The worker log nevertheless says that DDG and fallback providers are running, which is inaccurate in shallow mode.

### 12.3 Deep Discovery

Deep mode calls `findLeads()` and performs the larger sequence:

1. Yellow Pages.
2. Bing.
3. DuckDuckGo.
4. Yahoo.
5. SearXNG.
6. SearX map category.
7. Stealth browser search.

It crawls result websites and tracks per-provider counts.

### 12.4 AI Batch Filtering

Both fast and deep discovery pass candidates to `filterLeadsWithAI()`. When AI returns a valid list of indices, only those candidates survive. When AI fails or returns malformed output, the function currently returns all candidates rather than failing closed.

### 12.5 Final Insert Gate

Before insertion, each combined Ninja/search candidate is checked for:

- Required and negative keyword settings.
- Valid HTTP website.
- Allowed domain.
- Clean company name.
- Discovery quality score.
- Existing domain duplication.

Accepted companies enter the database with status `new`.

## 13. Discovery Scheduling Consequence

Autonomous discovery runs only when the enrichment-selection query returns zero rows.

That enrichment query currently includes incomplete records in all these statuses:

```text
new, no_email, rejected, refused, ready, priority_ready, invalid_email
```

A record is selected whenever either email or phone is missing, until it reaches four attempts. Consequently, a large historical database with missing phone numbers can keep discovery blocked while old records are retried.

The terminal's `processable` count includes only `new` records, even though the loop processes all selected statuses. A message such as `0 processable` therefore does not mean the loop performs no enrichment.

## 14. Website Enrichment

### 14.1 Home Page

`enrichCompanyData()` normalizes the lead URL and fetches the home page. Axios is attempted first; blocked or JavaScript-dependent sites can fall back to Puppeteer Stealth.

The record is rejected from enrichment when the home page remains unreachable/thin or displays parking, suspension, under-construction or domain-sale signals.

### 14.2 Relevance Check

The home-page text is sent through `checkAIRelevance()`. When AI returns valid JSON, relevance requires both:

- Deterministic enterprise fit.
- AI approval with an AI score of at least 75.

When AI fails or returns malformed output, the function currently uses the deterministic result alone. This is a fail-open deviation from the nominal dual gate.

### 14.3 Internal Page Priority

The crawler discovers and prioritizes internal pages in this order:

1. Contact.
2. Leadership.
3. Team.
4. About.
5. Home.

It scans up to seven internal pages and adds `/contact` and `/contact-us` fallback paths. PDF and office-document links are not opened in the browser scan.

### 14.4 Email Extraction

The extractor reads:

- `mailto:` links.
- Visible cleaned HTML text.
- Cloudflare-obfuscated email attributes.

Scripts, styles, SVG, iframes and other noise are removed before regex extraction. Candidates are normalized and filtered for malformed suffixes, placeholders and forbidden domains.

### 14.5 Phone Extraction

Published UAE mobile and landline numbers are extracted from official pages and normalized using `libphonenumber-js`. Invalid values are discarded rather than displayed as verified numbers.

## 15. Decision-Maker Discovery

### 15.1 Public Executive Search

The engine searches:

```text
[Company Name] CEO OR Manager OR Director UAE LinkedIn
```

DuckDuckGo is attempted first, followed by Bing. Only `/in/` LinkedIn profile URLs are considered.

### 15.2 Company Matching

The current company relationship check removes generic company tokens and accepts a LinkedIn result when any remaining token appears in the result title or snippet.

This reduces obvious mismatches but does not prove current employment. It can accept a real person whose snippet happens to mention the target company or whose old role remains indexed.

### 15.3 Website Name/Role Extraction

Leadership and team-page text is scanned for combinations such as:

```text
Person Name - Managing Director
CEO: Person Name
```

Matched contacts receive source evidence containing the page URL and extracted name/title excerpt.

### 15.4 Name Validation

Names that already look like ordinary two-to-four-token human names and do not contain known suspicious terms are accepted without AI. Other names are sent through the shared AI validator.

The AI validator is currently called without the target company name in executive-enrichment paths. It validates whether the string resembles a person, not whether that person currently works for the company.

### 15.5 Email Association and Patterning

The system first looks for an explicit published email within 450 characters of the person's name and title. When no explicit association exists, it tests standard corporate patterns:

- `first.last@domain`
- `first@domain`
- `firstinitial.last@domain`
- `firstinitiallast@domain`
- `firstlastinitial@domain`

Pattern acceptance requires syntax, domain and mailbox checks and rejects catch-all acceptance. A pattern-derived address remains marked as guessed rather than person-owned.

## 16. Email Fallback Order

The effective enrichment preference is:

1. Explicitly associated and ownership-verified decision-maker email.
2. Verified official website email.
3. Published official website fallback.
4. OSINT-discovered address.
5. Deeper email search result.
6. Probed `info@`, `sales@`, or `contact@` mailbox.

The OSINT, deep-search and common-mailbox probes are primarily reached when the official page crawl produced no safe email candidates.

Official company mailboxes can be retained for review even without person ownership, but they are labeled as company-level fallbacks.

## 17. Email and Mailbox Validation

### 17.1 Format and Domain

Candidate addresses pass syntax checks, website-domain matching and Google DNS-over-HTTPS MX lookup.

### 17.2 SMTP Probe

`verifyMailbox()` attempts an SMTP conversation on port 25:

1. Connect to the best MX host.
2. Send greeting and sender commands.
3. Probe the target recipient.
4. Probe a randomized address for catch-all behavior.

The result distinguishes accepted, catch-all, rejected, invalid, no-MX, port-blocked and network-error states.

### 17.3 Local Port Restriction

When outbound port 25 is blocked, mailbox existence is not treated as verified. Published website emails may still remain reviewable based on source and domain evidence, while guessed person ownership is not granted.

## 18. Enrichment Writeback

After enrichment:

- All discovered contacts are upserted into `contacts`.
- Relevance score and status are updated.
- A verified person email or reviewable company mailbox moves the lead to `ready`.
- A useful but non-draftable email is retained while the lead becomes `no_email`.
- An irrelevant company becomes `rejected`.
- A relevant company with no usable email becomes `no_email`.

The lead is considered contact-complete only when it has both:

- A non-empty email.
- At least one valid phone/mobile field.

Otherwise enrichment is rescheduled with exponential delays until four attempts, after which it becomes `needs_review` at the enrichment-status level.

## 19. Draft Generation

### 19.1 Extraction Stage

`personalizeOutreach()` first asks the drafting pipeline to extract company service and decision-maker context from the about text.

### 19.2 Generation Stage

The final prompt supplies approved evidence and requires:

- A verified-name greeting or company-team greeting.
- Evidence-backed statements only.
- A cautious commercial hypothesis.
- No unsupported percentages or hype.
- A concrete sample-account-brief CTA with natural wording variation.
- Approximately 70 to 120 words.
- No Markdown.

The code does not perform a final numerical word-count rejection; the 70-to-120 rule is prompt-enforced rather than programmatically enforced.

### 19.3 Hallucination Guard

The result is blocked when it returns `BLOCK_DRAFT` or contains known unrelated WP Rocket/WordPress Rocket leakage.

### 19.4 Signature

The system appends representative name, company, phone, company URL and sender email. HTML rendering later converts URLs and email addresses into clickable links.

### 19.5 Draft Persistence

A draft is saved only when:

- AI provider provenance is confirmed.
- The pre-draft fit and evidence gates passed.
- No open draft already exists for the lead.

The lead then moves to `awaiting_approval`.

## 20. Draft Quality and Approval

### 20.1 Quality Score

The stored score combines:

- Relevance score.
- Email-confidence score.
- Number of meaningful facts.
- Person-level evidence.
- LinkedIn availability.
- Warning penalties.

Warnings identify missing facts, commercial triggers, decision-maker details, LinkedIn and phone data.

### 20.2 Approval API

A human can edit, approve or reject a draft.

A verified-person draft requires:

- Verified strict person email.
- Minimum email confidence.
- Relevant company.
- At least two sourced facts.
- At least one meaningful fact.
- Person-level evidence.
- Confirmed AI provenance.

A company-mailbox draft requires:

- A reviewable official mailbox.
- Relevant company.
- At least two sourced facts.
- Confirmed AI provenance.

Approval changes the draft to `approved` and the lead to `approved`. Rejection changes the draft to `rejected` and the lead to `needs_review`.

## 21. Approved Email Delivery

The approved queue selects the oldest approved draft whose lead is also approved and whose retry time is due.

Before sending, it rechecks:

- Outreach enabled.
- Active license.
- Daily limit.
- Safe recipient.
- At least two sourced facts.
- AI provider/model provenance.
- Email syntax and MX status.

`invalid_format` and `no_mx` block delivery. A `mailbox_rejected` port-25 probe is currently treated as inconclusive for a published address, and the configured SMTP server is allowed to make the final delivery decision.

On SMTP acceptance:

- The lead becomes `sent`.
- SMTP response and message ID are stored.
- The draft becomes `sent`.
- The `outreach` record is updated.
- IMAP archive failure is stored as a sent-copy error without pretending the SMTP send failed.

On SMTP failure:

- The lead returns to `approved`.
- Error details are stored.
- A retry is scheduled five minutes later.

## 22. SMTP and Sent-Mail Archiving

`sendEmail()` reloads SMTP settings from the database before every message. It supports ordinary SMTP and Gmail shorthand.

The message is compiled once into a raw MIME buffer. That same buffer is:

1. Submitted to SMTP.
2. Appended to the mailbox's discoverable Sent folder over IMAP after acceptance.

The Sent folder resolver recognizes IMAP `\Sent` attributes and common names including `Sent`, `Sent Items`, `Sent Messages`, and `INBOX.Sent`.

This is why agent messages now appear in Hostinger and in correctly configured Classic Outlook IMAP views.

## 23. Follow-Ups

Follow-ups are disabled unless the relevant setting is explicitly enabled. Eligible records are sent leads with one previous message and a `last_contacted` timestamp older than the configured delay.

The worker validates safety and mailbox status again. It sends up to five follow-ups per cycle with a cooldown between messages.

Groq generates the follow-up when available. Otherwise a generic local template is used.

## 24. Reply Monitoring

`monitor_service.ts` maintains an IMAP connection to the configured inbox.

It:

- Searches messages from the previous seven days.
- Ignores mailer-daemon and delivery-failure messages.
- Treats messages beginning with `Re:` or containing parsed references as replies.
- Deduplicates by message ID.
- Attempts to match the sender address to a sent/followed-up lead.
- Stores the message and sentiment in `replies`.
- Listens for new-mail notifications.

Current limitations:

- It checks parsed references but not the explicit `inReplyTo` property.
- Automatic replies are stored and classified rather than filtered before insertion.
- Sentiment depends on Groq; failure becomes neutral.
- The worker sets the global monitor flag immediately after launching the async monitor, which can briefly report active before IMAP is actually ready.

## 25. Dashboard Behavior

The React dashboard exposes these primary views:

- Overview.
- Database.
- Decision Makers.
- Discovery.
- Bulk Import.
- Review & Outreach.
- Inbox.
- Analytics.
- System.

### 25.1 Discovery Controls

The operator can:

- Run web or map discovery.
- Choose fast or deep mode.
- Select leads.
- Re-enrich the current page or selected records.
- Find decision-makers.
- Queue selected qualified records for draft creation.
- View provider logs.

### 25.2 System Controls

The operator can configure:

- Company identity and target market.
- Positive and negative targeting keywords.
- Discovery depth.
- AI providers and models.
- SMTP/IMAP mailbox settings.
- Daily limit and temperature.
- Follow-up controls.
- Pitch context and company knowledge.
- Outreach-enabled state.

Provider tests are independent API test calls; a green provider test confirms that provider endpoint, not that every worker subsystem uses that provider first.

## 26. Safety Properties Currently Present

The current implementation includes these meaningful protections:

- No autonomous sending before human approval.
- Test fixtures cannot enter the delivery queue.
- Final AI provenance requirement.
- Sourced-evidence requirement.
- Strict person-email ownership fields.
- Official company-mailbox labeling rather than fake personalization.
- Domain, MX and address validation.
- Catch-all detection.
- Placeholder and forbidden-domain rejection.
- Government, military, directory, media and system-domain shields.
- Daily sending cap.
- Bounce monitoring.
- Retry scheduling and stored SMTP receipts.
- Sent-copy error visibility.

## 27. Current Behavioral Gaps and Risks

### Critical

1. `engine_paused` does not stop the independent approved-delivery timer.
2. The system does not have one unified AI router; different features can behave differently during provider outages.

### High

1. AI relevance filtering fails open to deterministic logic.
2. The broad incomplete-contact queue can starve discovery.
3. Shallow discovery omits DDG, SearXNG, maps and stealth despite broader terminal wording.
4. LinkedIn matching verifies text overlap, not confirmed current employment.
5. Human-looking names can bypass AI validation.

### Moderate

1. Word count is not programmatically enforced.
2. Follow-ups and reply sentiment remain dependent on rate-limited Groq.
3. Reply detection does not directly inspect `inReplyTo`.
4. Published-address SMTP probe rejection is allowed to proceed to real SMTP.
5. The `processable` enrichment log count does not represent every record actually processed.

## 28. Existing Verification Coverage

The repository currently provides:

- TypeScript type checking.
- Vite production build.
- A focused contact-validation test.
- Several diagnostic and repair scripts.

It does not currently have one automated end-to-end test that proves the complete state transition:

```text
discover -> enrich -> qualify -> draft -> approve -> send -> archive -> reply
```

It also lacks dedicated regression tests for provider ordering, discovery-source execution, pause behavior, enrichment fairness and current-employer verification.

## 29. Accurate Mental Model

The current engine should be understood as five cooperating systems rather than one single AI agent:

1. **Discovery system:** finds real company URLs through public sources.
2. **Research system:** crawls websites and evaluates company fit.
3. **Contact system:** identifies people and validates public communication channels.
4. **Draft-review system:** creates sourced messages and waits for human approval.
5. **Delivery-monitoring system:** sends, archives, tracks bounces and records replies.

A success in one system does not prove success in the others. For example:

- A working Mistral test does not prove LinkedIn discovery is working.
- A discovered company does not imply a verified decision-maker exists.
- A saved draft does not imply outreach is enabled.
- SMTP acceptance does not prove inbox placement.
- IMAP Sent visibility does not prove the recipient read the email.

This separation is essential when diagnosing the current application.
