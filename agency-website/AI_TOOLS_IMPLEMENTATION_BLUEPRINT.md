# Asif Digital Free AI Growth Tools — Implementation Blueprint

Prepared for Asif Digital  
Market: Dubai, UAE and GCC  
Version: 1.0 — July 2026

## 1. Product objective

Build three genuinely useful, free tools that turn Asif Digital from a service-only website into a source of original, interactive business intelligence:

1. **AI Website Grader** — live technical, SEO, conversion and AI-search readiness audit.
2. **AI Marketing Strategy Generator** — a practical UAE/GCC 90-day marketing plan.
3. **Ad Spend Efficiency Analyzer** — an evidence-based diagnosis of tracking, funnel and budget efficiency.

The tools should create three outcomes at the same time:

- Help a visitor solve a real problem immediately.
- Generate qualified leads with rich commercial context.
- Create crawlable, citable pages that strengthen Asif Digital's authority around AI marketing, websites, SEO/AEO, paid media and automation in the UAE.

No design or content can guarantee a Google ranking or an AI recommendation. The implementation below is designed to maximize usefulness, indexability, trust and citation eligibility without making unsupported claims.

## 2. Core product decisions

### Give value before requesting contact details

Every visitor receives a useful score, diagnosis or plan on screen without entering an email. After the initial result, offer an optional enhanced report, implementation review or WhatsApp consultation.

This is important for user trust and avoids creating a tool that appears to promise functionality but only displays a lead form.

### Use deterministic calculations before AI

The AI model should explain observed data; it should not invent the underlying score.

- Website scores come from PageSpeed/Lighthouse and observable page signals.
- Advertising metrics come from the user's actual numbers and published formulas.
- Strategy priorities come from a transparent decision matrix based on goals, market, budget, sales cycle and current maturity.
- The Groq model converts those facts into a concise, personalized report.

### Reuse the existing Groq key safely

The existing chatbot uses a Groq-compatible server endpoint. The tools can use the same **server-side `GROQ_API_KEY`** without exposing it to the browser.

Do not send tool requests through the current generic `/api/chat` endpoint unchanged. That endpoint accepts a client-provided system instruction. Create a dedicated tools endpoint whose prompts, models, token limits and output format are controlled on the server.

The Website Grader can call Google's PageSpeed Insights API without a key for light usage. A separate Google API key is recommended later for dependable quota. The Groq key cannot replace the PageSpeed key; it is only used to write the personalized analysis.

## 3. Information architecture

Create these four indexable routes:

| Page | Route | Primary search intent |
|---|---|---|
| Tools hub | `/tools` | free AI marketing tools UAE |
| Website Grader | `/tools/ai-website-grader` | free website grader UAE, website audit Dubai |
| Strategy Generator | `/tools/ai-marketing-strategy-generator` | AI marketing strategy generator, marketing plan UAE |
| Ad Spend Analyzer | `/tools/ad-spend-efficiency-analyzer` | ad spend analyzer UAE, ROAS calculator Dubai |

Use “efficiency analyzer” as the official Asif Digital product name. “Waste” may be used carefully in explanatory copy, but the tool must not claim a precise amount of wasted money unless the user's data supports it.

Add all four routes to:

- Main navigation under a new **Free Tools** item.
- Homepage Free AI Growth Tools section.
- Footer Resources column.
- XML sitemap.
- Relevant service pages and blog posts.

## 4. Shared visual direction

The pages should feel like Asif Digital products, not copied Hovi pages.

### Brand treatment

- Background: existing near-black `#050505` and `#080808`.
- Primary text: white with the site's existing opacity hierarchy.
- Product accent: intelligent green (`green-400`/`green-500`) already used on the homepage.
- Typography: existing Syne for display and Space Grotesk for interface/body text.
- Cards: large rounded corners, thin white borders, quiet green hover/focus state.
- Data views: use clean rings, bars and metric cards built with CSS and existing Lucide icons.
- Avoid generic robot art, stock dashboards and decorative imagery that competes with the tool.

### Tool layout

Desktop:

- Left: form/questions, 40% width.
- Right: sticky live preview, score explanation or “what you will receive,” 60% width.
- Results replace the two-column form with a wide report dashboard.

Mobile:

- Single-column flow.
- Progress and primary button remain visible without covering fields.
- Minimum 44px touch targets.
- No horizontal scrolling.

### Shared interface states

Every tool must include:

1. Empty state with realistic example output.
2. Field-level validation.
3. Loading state that names the current action.
4. Success result.
5. Partial-result state if one data provider fails.
6. Clear error with retry, not a blank screen.
7. “Start again” and share/copy actions.
8. Methodology and limitations near the report.

## 5. Shared page structure and content

Every individual tool page follows this order:

1. Breadcrumb: `Home / Free Tools / Tool Name`.
2. Hero with exact purpose and “Free — no account required.”
3. Interactive tool above the fold.
4. Result/report interface.
5. “How the score is calculated” methodology.
6. Interpretation guide: what good, needs work and high-risk mean.
7. UAE/GCC-specific guidance.
8. Implementation CTA connected to the relevant Asif Digital service.
9. Related tools.
10. Visible FAQs.
11. Sources, last reviewed date and reviewer.

Use this trust line consistently:

> Methodology designed by Asif Digital. AI is used to explain measured inputs and generate recommendations; it does not replace a full technical or advertising-account audit.

Reviewer block:

- **Reviewed by:** Asif Khan, Founder, Asif Digital.
- Link the name to a strengthened About/author profile containing verifiable experience, role, markets served and selected work.
- Display “Last reviewed” only when the page has actually been substantively reviewed.

## 6. Tools hub page

### Metadata

**Title:** Free AI Marketing Tools for UAE Businesses | Asif Digital  
**Description:** Grade your website, build a UAE-ready marketing strategy, and analyze ad spend efficiency with free tools from Asif Digital. Instant, practical results.

### Hero

**Eyebrow:** Free AI Growth Tools  
**H1:** Make Better Digital Decisions Before You Spend More  
**Supporting copy:** Use three practical tools built for UAE businesses to identify website weaknesses, plan a focused marketing strategy and understand where advertising performance is being lost. Get an immediate result with no account required.

Primary CTA: **Choose a Free Tool**  
Secondary CTA: **How Our Methodology Works**

### Tool cards

#### AI Website Grader

**Card promise:** Audit one URL across performance, technical SEO, user experience, conversion readiness and AI-search visibility.  
**CTA:** Grade My Website

#### AI Marketing Strategy Generator

**Card promise:** Turn your business goals, audience, market and budget into a focused 90-day UAE/GCC marketing plan.  
**CTA:** Build My Strategy

#### Ad Spend Efficiency Analyzer

**Card promise:** Calculate CPL, CPA, ROAS and break-even thresholds, then diagnose the measurement and funnel gaps that may be reducing returns.  
**CTA:** Analyze My Ad Spend

### Hub authority sections

- **What makes these tools useful:** real measurements, transparent formulas, market context, actionable recommendations.
- **What AI does and does not do:** AI explains and prioritizes; it does not invent performance data.
- **Built for UAE and GCC buying journeys:** English/Arabic journeys, WhatsApp lead handling, high-value services, real-estate lead routing and local sales cycles.
- **Privacy:** inputs are processed to generate the report; do not ask for ad-platform passwords, CRM credentials or sensitive customer data.

## 7. Tool 1 — AI Website Grader

### Positioning

**Title:** Free AI Website Grader UAE | SEO, Speed & AI Search Audit  
**Description:** Audit your website's performance, SEO, mobile experience, lead conversion and AI-search readiness. Get a free prioritized website report from Asif Digital.  
**H1:** Free AI Website Grader for UAE Businesses  
**Hero copy:** Enter any public website URL to receive a measured audit across the signals that affect visibility, usability and lead generation. Your report combines live technical data with clear, UAE-focused recommendations.

CTA: **Analyze My Website**  
Trust text: **Free. No account required. Usually 30–60 seconds.**

### Inputs

Required:

- Website URL.

Optional, used only to improve recommendations:

- Industry: Real estate, professional services, healthcare, hospitality, e-commerce, SaaS, logistics, education, finance, other.
- Primary market: Dubai, Abu Dhabi, Sharjah, wider UAE, Saudi Arabia, GCC, international.
- Primary website goal: generate leads, sell online, book appointments, build authority, provide customer support.
- Preferred language journey: English, Arabic, bilingual.

### Data collection

1. Normalize URL and enforce HTTPS where available.
2. Reject localhost, private IP ranges, file URLs, embedded credentials and unsafe redirects.
3. Request Google PageSpeed Insights for mobile and desktop.
4. Retrieve the public HTML with strict timeout, response-size and redirect limits.
5. Inspect only observable page signals.
6. Send the normalized findings—not raw unrestricted HTML—to the AI report endpoint.

### Score model

Total: 100 points.

| Category | Weight | Evidence |
|---|---:|---|
| Performance & Core Web Vitals | 25 | PageSpeed/Lighthouse, LCP, CLS, TBT proxy, image and JS diagnostics |
| Technical SEO | 20 | title, description, canonical, indexability, headings, links, crawl signals, structured data |
| Mobile & Accessibility | 15 | viewport, mobile Lighthouse, accessible names, tap targets and contrast diagnostics |
| Conversion Readiness | 20 | visible CTA, contact path, forms, phone/WhatsApp discoverability, trust and friction signals |
| AI Search & Content Clarity | 20 | extractable text, entity clarity, authorship, About/contact evidence, direct answers, sources and matching structured data |

Do not fabricate a “design quality” score based on visual taste. Name the measurable category **Conversion Readiness**.

### Performance thresholds

Use current Google guidance:

- Good LCP: 2.5 seconds or less.
- Good INP: 200ms or less when field data is available.
- Good CLS: 0.1 or less.
- Lighthouse category: 90+ good, 50–89 needs improvement, below 50 poor.

Clearly distinguish lab data from field data. If field data is unavailable, say so.

### Results screen

Top summary:

- Overall score and label: **Strong Foundation**, **Growth Opportunity**, or **Priority Fixes Required**.
- One-sentence diagnosis based on the lowest two categories.
- Data timestamp and tested URL.
- Mobile/desktop toggle.

Category cards:

- Score.
- What was observed.
- Why it matters.
- Highest-priority fix.
- Link to expand full findings.

Priority roadmap:

- **Fix now (0–7 days):** maximum three critical actions.
- **Improve next (8–30 days):** maximum four actions.
- **Build authority (31–90 days):** maximum four actions.

AI-search readiness output must answer:

- Can a crawler identify the company, offering, location and contact details?
- Are the main claims supported by visible evidence?
- Are important answers present as text, not only animation or images?
- Are author, reviewer, methodology and update information clear where relevant?
- Does structured data match visible content?
- Do internal links establish a coherent service/topic cluster?

### Lead conversion

Show the entire summary and top fixes first. Then offer:

**CTA heading:** Want the Fix Plan Prioritized for Your Business?  
**Copy:** Send the report to your inbox and add your business goal. Asif Digital will include a practical implementation sequence—without obligation.  
Fields: name, work email, company, WhatsApp optional, consent checkbox.  
Buttons: **Email My Report** and **Discuss the Fixes on WhatsApp**.

### Supporting authority content

- What a website grader can and cannot diagnose.
- Website performance versus business performance.
- Why mobile and WhatsApp journeys matter in the UAE.
- What AI-search readiness actually means.
- How Asif Digital audits websites.
- Short glossary: LCP, INP, CLS, canonical, schema, conversion path and GEO/AEO.

### FAQs

- Is the Website Grader free?
- Does the grader change my website?
- Why can mobile and desktop scores differ?
- Is a PageSpeed score the same as SEO performance?
- What does AI-search readiness mean?
- Will a high score guarantee Google rankings?
- Can you audit Arabic and English websites?
- How is my URL and contact information used?

## 8. Tool 2 — AI Marketing Strategy Generator

### Positioning

**Title:** Free AI Marketing Strategy Generator UAE | 90-Day Plan  
**Description:** Create a practical 90-day digital marketing strategy for your UAE or GCC business, including priorities, channels, content and measurement.  
**H1:** Build Your UAE Marketing Strategy in Minutes  
**Hero copy:** Answer a short set of business questions and receive a focused plan based on your market, sales cycle, budget, current capabilities and primary growth objective.

CTA: **Build My 90-Day Plan**  
Trust text: **Useful plan first. Contact details optional.**

### Form flow

#### Step 1 — Business context

- Company name, optional.
- Website URL, optional.
- Industry.
- Business model: B2B, B2C, B2B2C, e-commerce, marketplace.
- Primary market and city.
- Customer language: English, Arabic, bilingual, multilingual.

#### Step 2 — Commercial model

- Main product/service.
- Typical sale value in AED range.
- Sales cycle: same day, under 7 days, 1–4 weeks, 1–3 months, 3+ months.
- Current monthly lead/customer volume range.
- Sales capacity: how many new customers can be handled monthly?

#### Step 3 — Goals and budget

- Primary objective: awareness, qualified leads, e-commerce sales, appointments, market launch, retention.
- Monthly marketing budget range in AED.
- Team: owner-led, 1–3 people, internal team, agency-supported.
- Priority timeline: 30, 60, 90 or 180 days.

#### Step 4 — Current system

- Current channels.
- Tracking maturity: none, basic analytics, conversion tracking, CRM attribution.
- Website status: none, outdated, functional, high-performing.
- CRM/lead routing: none, spreadsheets, CRM, CRM plus automation.
- Biggest constraint: traffic, lead quality, conversion, follow-up, content, measurement, internal capacity.

### Strategy engine

The deterministic layer classifies:

- Funnel type: immediate transaction, considered purchase or complex/high-ticket sale.
- Maturity: foundation, traction, scale or optimization.
- Constraint: demand, capture, conversion, follow-up, measurement or capacity.
- Market complexity: one city, UAE-wide, GCC or multilingual expansion.
- Budget feasibility: narrow focus, balanced mix or multi-channel.

The AI receives those classifications plus sanitized answers and must return validated JSON. It must not invent market statistics, competitor research, guaranteed results or unsupported budget benchmarks.

### Required report output

1. **Executive diagnosis** — three short paragraphs.
2. **Strategic focus** — one primary outcome and two supporting outcomes.
3. **Ideal customer snapshot** — pains, intent triggers, objections and buying path.
4. **Recommended channel mix** — priority, purpose and suggested budget percentage range. Percentages must total 100.
5. **90-day plan**:
   - Days 1–30: foundation and measurement.
   - Days 31–60: launch and learning.
   - Days 61–90: optimization and scale.
6. **Content pillars** — four original pillars with sample topics.
7. **Lead journey** — traffic source to landing page, WhatsApp/form, CRM routing and follow-up.
8. **Measurement plan** — primary KPI, secondary KPIs and weekly review cadence.
9. **What not to do yet** — two distractions to avoid based on resources.
10. **Next best action** — one concrete action for this week.

### Report design

- Top “Strategy Snapshot” card.
- Channel allocation horizontal bars with percentages.
- 90-day timeline in three columns on desktop and stacked steps on mobile.
- Funnel diagram using CSS cards and arrows.
- KPI table with definitions, not fabricated targets.
- Copy, print and share actions.

### Lead conversion

After showing the full strategy:

**CTA heading:** Turn This Plan Into a Working System  
**Copy:** Ask Asif Digital to review the plan against your actual website, CRM, content capacity and UAE customer journey.  
Buttons: **Request a Free Strategy Review** and **Send Plan to WhatsApp**.

Capture the generated plan ID and key answers in the lead notification so the consultation begins with context.

### Supporting authority content

- What a marketing strategy should contain.
- Strategy versus tactics versus campaign plan.
- Choosing channels for high-ticket versus transactional offers.
- The role of WhatsApp in UAE lead journeys.
- Why measurement comes before automation.
- How to adapt the generated plan.

### FAQs

- Is this an AI-generated marketing plan?
- How is the channel mix selected?
- Does the generator use private business data?
- Can it create a real-estate marketing strategy?
- Does it support Arabic campaigns?
- How should I use the 90-day plan?
- Is the proposed budget a forecast or guarantee?
- Can Asif Digital implement the strategy?

## 9. Tool 3 — Ad Spend Efficiency Analyzer

### Positioning

**Title:** Free Ad Spend Efficiency Analyzer UAE | CPL, CPA & ROAS  
**Description:** Calculate CPL, CPA, ROAS and break-even acquisition costs, then identify tracking and funnel gaps affecting your UAE advertising performance.  
**H1:** Understand What Your Ad Spend Is Actually Producing  
**Hero copy:** Enter your real campaign and sales numbers to calculate performance, expose measurement gaps and receive a prioritized optimization plan. No ad-account login required.

CTA: **Analyze My Ad Spend**  
Trust text: **Your result is based on the numbers you provide—not invented benchmarks.**

### Inputs

Core:

- Currency: AED default, SAR, USD, QAR, KWD, BHD, OMR.
- Reporting period: 30, 60 or 90 days.
- Total ad spend.
- Platforms: Google, Meta, Instagram, TikTok, LinkedIn, Snapchat, other.
- Industry and market.
- Campaign objective.

Performance:

- Clicks or landing-page visits, optional.
- Leads/conversions.
- Qualified leads, optional.
- Customers/sales.
- Conversion value/revenue attributed to ads, optional.
- Gross margin percentage, optional.
- Average sale value, optional.

Measurement and operations:

- Is conversion tracking active?
- Are calls and WhatsApp conversions tracked?
- Is the CRM source captured?
- Are offline sales uploaded or attributed?
- Average lead response time.
- Are campaigns separated by intent/market/language?
- Is creative tested regularly?

### Calculations

Use transparent formulas:

- CPC = ad spend / clicks.
- CPL = ad spend / leads.
- Cost per qualified lead = ad spend / qualified leads.
- CPA = ad spend / customers.
- Lead-to-customer rate = customers / leads × 100.
- ROAS = attributed conversion value / ad spend.
- ROI, only when margin/cost data exists = (gross profit attributable to ads − ad spend) / ad spend.
- Break-even CPA = average sale value × gross margin percentage.
- Break-even ROAS = 1 / gross margin percentage.
- Maximum affordable CPL = break-even CPA × lead-to-customer rate.

Handle division by zero and missing values explicitly. Never convert a missing metric into zero.

### Efficiency model

Do not present a precise “wasted spend” amount from generic industry averages. Instead calculate:

1. **Measurement Confidence Score (0–100)** — conversion tracking, WhatsApp/call tracking, CRM attribution, offline conversion capture and data completeness.
2. **Funnel Efficiency Score (0–100)** — lead qualification, response time, sales conversion visibility and landing-page continuity.
3. **Campaign Control Score (0–100)** — intent separation, geographic/language structure, creative testing and review cadence.

If the user provides enough commercial data, show:

- **Confirmed performance gap:** amount spent above the user's own break-even threshold.
- **Spend at risk:** a range based on incomplete tracking or operational gaps, clearly labelled an estimate with low/medium/high confidence.

If the data is insufficient, say: “We cannot responsibly estimate wasted spend from the available inputs.” Then show exactly which data is needed.

### Results screen

- Executive status: **Profitable and Measurable**, **Promising but Under-Measured**, **Below Break-Even**, or **Insufficient Data**.
- KPI cards: spend, CPL, CPA, ROAS and break-even CPA.
- Funnel: clicks → leads → qualified leads → customers.
- Break-even comparison.
- Three diagnostic scores.
- Platform list, explicitly noting that platform-level allocation cannot be judged without platform-level spend/results.
- Priority actions grouped into tracking, campaign, landing page and sales follow-up.

### AI recommendations

The AI can recommend diagnostic actions such as:

- Repair conversion and WhatsApp tracking before changing budgets.
- Separate brand and non-brand search intent.
- Route high-intent leads to the CRM immediately.
- Reduce response time with automation.
- Improve message match between ad and landing page.
- Run controlled creative tests.

It must not state that a platform is underperforming without platform-specific data, promise a target ROAS or fabricate a MENA industry benchmark.

### Lead conversion

**CTA heading:** Get a Human Review of the Numbers  
**Copy:** Share this diagnostic with Asif Digital for a practical review of tracking, landing pages, lead routing and campaign structure. No ad-account password is required for the first conversation.  
Buttons: **Request an Efficiency Review** and **Discuss on WhatsApp**.

### Supporting authority content

- CPL, CPA, ROAS and ROI explained.
- Why reported platform conversions can differ.
- Break-even economics for lead generation and e-commerce.
- Why WhatsApp and offline conversions matter in the UAE.
- Common causes of weak ad efficiency.
- What the analyzer cannot know without account-level data.

### FAQs

- What is a good ROAS?
- What is the difference between ROAS and ROI?
- How is break-even CPA calculated?
- Can the analyzer access my Google or Meta account?
- Why is tracking confidence important?
- Can it calculate WhatsApp lead performance?
- Is estimated spend at risk the same as confirmed waste?
- Can Asif Digital audit the campaigns directly?

## 10. AI and API architecture

### Recommended routes

- `POST /api/tools/website-audit`
- `POST /api/tools/generate-report`
- `POST /api/tools/send-report`

### `website-audit`

Responsibilities:

- Validate and normalize the public URL.
- Enforce SSRF protections.
- Fetch PageSpeed mobile and desktop data with timeouts.
- Fetch limited HTML for observable SEO/entity signals.
- Return normalized measurements and checks.
- Never pass an unrestricted fetched page directly into an AI prompt.

### `generate-report`

Request shape:

- `tool`: `website-grader`, `strategy-generator` or `ad-spend-analyzer`.
- `inputs`: allowlisted, length-limited fields.
- `measurements`: server-created normalized values where applicable.

Server behavior:

- Select a fixed prompt by tool type.
- Use the server-side Groq key.
- Set low temperature for stable output.
- Require JSON-only output matching a TypeScript schema.
- Reject or repair malformed output once; otherwise show the deterministic report.
- Never accept `systemInstruction`, arbitrary model names or raw prompts from the browser.

### Reliability and abuse controls

- Maximum request body size.
- Field allowlist and length limits.
- Per-IP best-effort rate limit and daily tool limit.
- Request timeout and cancellation.
- Output token cap.
- No secrets in browser bundles.
- No logging of full email, phone or sensitive free-text fields.
- Add bot protection if abuse appears; a durable serverless rate limiter can be phase two.
- Keep deterministic results available when AI generation is temporarily unavailable.

### Lead delivery

Reuse Web3Forms for lead notifications, but send from the server route rather than trusting hidden browser fields. Include:

- Tool name.
- Report ID and timestamp.
- Name, email, company and optional WhatsApp.
- User consent.
- Top result/score.
- Main business goal.
- Link back to the relevant tool.

Do not email an attachment in version one. Generate a print-friendly report page that the visitor can save as PDF from the browser.

## 11. SEO and AI-search implementation

### Server-rendered content

The hero, methodology, explanations, glossary, FAQs, sources and related links must be present in server-rendered HTML. Do not make the entire page an empty JavaScript shell containing only the interactive form.

### Page metadata

Each route needs:

- Unique title and meta description.
- Self-referencing canonical.
- Open Graph and X metadata.
- Index/follow robots setting.
- Descriptive social card using Asif Digital branding.

### Structured data

Use only markup that matches visible content:

- `WebApplication` or `SoftwareApplication` with free `Offer` price `0` and `AED`.
- `BreadcrumbList`.
- `Organization` reference to the existing Asif Digital entity.
- Visible FAQ content may use `FAQPage`, but do not promise an FAQ rich result; Google limits that display for most commercial websites.

There is no special AI Overview or AI Mode schema. Do not add invented “GEO schema” or AI crawler files.

### Trust and citation elements

Every page should state:

- Who created/reviewed the methodology.
- How the result was produced.
- What data sources were used.
- What the tool cannot determine.
- When the methodology was last substantively reviewed.

Create a visible **Methodology and Sources** section. The strongest original evidence will be the tool's own calculations, definitions and audit method—not rewritten competitor copy.

### Internal-link cluster

Tool-to-service links:

- Website Grader → Web Design, Web Development, SEO/AEO, Website Support.
- Strategy Generator → AI Marketing Dubai, Digital Marketing, AI Lead Generation, WhatsApp Automation.
- Ad Spend Analyzer → PPC/Google Ads, AI Lead Generation, CRM/WhatsApp Automation.

Service-to-tool links:

- Add a “Diagnose this first” callout on each related service page.

Tool-to-blog links:

- Link definitions and detailed questions to supporting articles.

### Supporting editorial cluster

Publish original articles in this order:

1. How to Audit a Business Website in the UAE: Technical, SEO and Conversion Checklist.
2. Website Grader Scores Explained: PageSpeed, SEO, Conversion and AI-Search Readiness.
3. How to Build a 90-Day Digital Marketing Strategy for a UAE Business.
4. Digital Marketing Budget Allocation in the UAE: A Decision Framework, Not a Universal Benchmark.
5. CPL vs CPA vs ROAS: The UAE Business Owner's Guide to Advertising Economics.
6. How to Measure Google, Meta, WhatsApp and Offline Leads in One Funnel.

Each article must include original Asif Digital examples, screenshots or anonymized calculation scenarios, a named author/reviewer, sources and links back to the relevant tool and service. Do not copy or lightly rewrite Hovi's content.

## 12. Homepage integration

Place a new section immediately after **Choose what you need right now** and before **Why Now**.

**Eyebrow:** Free AI Growth Tools  
**H2:** Diagnose Before You Invest  
**Copy:** Grade your website, build a focused UAE marketing plan or calculate what your current advertising is producing. Each tool gives you an immediate result and a practical next step.  

Show three compact product cards with an example metric/benefit and one CTA each. Add a fourth text link: **Explore All Free Tools**.

Do not place the full tools directly on the homepage. Dedicated routes create clearer search intent, better reporting and a stronger internal-link structure.

## 13. Analytics and lead-quality measurement

Track these events in Google Analytics:

- `tool_view`
- `tool_start`
- `tool_step_complete`
- `tool_analysis_success`
- `tool_analysis_partial`
- `tool_result_view`
- `tool_report_copy`
- `tool_report_print`
- `tool_lead_submit`
- `tool_whatsapp_click`
- `tool_service_click`

Parameters:

- `tool_name`
- `industry`
- `market`
- `result_band`
- `lead_source_page`

Never send email, phone, company name, URL query contents or other personal data to Google Analytics.

Primary success metrics:

- Tool start rate.
- Completion rate.
- Result-to-lead conversion rate.
- Result-to-service click rate.
- Qualified consultation rate by tool.
- Organic impressions/clicks to each tool route.

## 14. Accessibility, performance and privacy

- All steps must work with keyboard and screen readers.
- Use real labels, fieldsets and legends—not placeholder-only fields.
- Announce loading and result status with an ARIA live region.
- Do not rely on color alone for score status.
- Respect reduced-motion preferences.
- Keep the initial page lightweight; load report code when needed.
- Avoid adding heavy chart libraries; use CSS and existing components.
- Explain that reports are directional and not legal, financial or guaranteed performance advice.
- Add explicit consent before sending contact details.
- Link to Privacy Policy beside the form.

## 15. Delivery sequence

### Phase 1 — Shared foundation

- Build shared tool shell, progress UI, result components and validation helpers.
- Secure server-side Groq report endpoint.
- Add analytics helpers and lead delivery.
- Create Tools hub and navigation/footer links.

### Phase 2 — AI Website Grader

- Implement first because it creates the strongest public demonstration of Asif Digital's technical capability.
- Integrate PageSpeed, HTML checks, scoring, report and print view.

### Phase 3 — Strategy Generator

- Implement structured questionnaire, decision matrix and validated AI report.

### Phase 4 — Ad Spend Efficiency Analyzer

- Implement formulas and confidence scoring before AI recommendations.

### Phase 5 — Authority and launch

- Add homepage section and service-page callouts.
- Publish the first three supporting articles.
- Validate structured data, mobile behavior and analytics.
- Add routes to sitemap.
- Request indexing for the hub and three tools after deployment.

## 16. Acceptance criteria

A tool is ready only when:

- It produces a useful result without requiring contact details.
- Its primary calculation can be explained without the AI model.
- It still returns a deterministic report if Groq fails.
- It never exposes an API key in browser code.
- It has input validation, rate limits and safe error states.
- Its visible content fully explains the method, limits and next actions.
- Metadata, canonical, sitemap and structured data are correct.
- The page works at mobile widths and by keyboard.
- Analytics excludes personal information.
- Lead notifications contain enough context for a useful follow-up.
- No claim, benchmark, score or testimonial is invented.

## 17. Research basis

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Generative AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [Google: Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google: Software application structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Google: PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- [web.dev: Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [Google Ads: CPA and ROAS definitions](https://support.google.com/google-ads/answer/12851704)
- [Google Ads: ROI calculation](https://support.google.com/google-ads/answer/1722066)
- [Competitor reference: Hovi tools hub](https://thehovi.com/tools)

The Hovi pages were used only to understand competitor product positioning. Asif Digital's tools, copy, scoring, methodology and user experience should remain original.
