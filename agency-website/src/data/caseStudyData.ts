export interface CaseStudy {
  id: string;
  client: string;
  classification: "Prototype / Proof of Concept" | "Lead Intelligence & B2B PoC" | "Public Website Project" | "Internal Asif Digital Technology" | "Architecture Framework";
  industry: string;
  location: string;
  title: string;
  tags: string[];
  challenge: string;
  architecture: string;
  delivered: string;
  safeguards: string;
  outcomes: string;
  results: string[];
  serviceLink: string;
  serviceLinkLabel: string;
  desc?: string;
  img?: string;
  highlights?: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "global-exhibition-mas",
    client: "Global Trade Show & B2B Exhibition Organizer",
    classification: "Prototype / Proof of Concept",
    industry: "Defense, Aerospace & Global Trade Exhibitions",
    location: "UAE & International",
    title: "Global B2B Exhibition Intelligence Multi-Agent System",
    tags: ["Multi-Agent Systems", "Playwright", "Apollo OSINT", "SQLite"],
    challenge: "Event management teams researching international defense trade expos spend extensive manual hours parsing unstructured exhibitor directories and hunting for relevant C-suite points of contact.",
    architecture: "Autonomous 5-worker state machine (Orchestrator, Profiler, Judge, Executive Hunter, Ghostwriter) orchestrated via Node.js, Better-SQLite3, and Apollo APIs.",
    delivered: "Engineered a headless profiling engine that extracts exhibitor profiles, filters non-relevant entities, queries decision-maker OSINT, and logs execution across 6,700+ system trace events.",
    safeguards: "Built-in rate limiting, local SQLite state isolation, and consent-gated discovery queues.",
    outcomes: "Centralized exhibitor intelligence; replaced manual prospect hunting with automated multi-agent triage; tested across 738 seed entries and multi-expo research queues.",
    results: [
      "Automated multi-agent extraction pipeline replacing manual directory lookups",
      "Centralized SQLite state machine tested across 738 seed entries",
      "6,700+ execution trace events logged with full lead provenance"
    ],
    serviceLink: "/ai-agents-dubai",
    serviceLinkLabel: "Explore Custom AI Agents",
    desc: "Autonomous 5-worker multi-agent system designed for automated discovery and structured profiling of international trade show exhibitors.",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "uae-construction-advisory",
    client: "UAE Construction Commercial Consultancy (D&A Consult)",
    classification: "Lead Intelligence & B2B PoC",
    industry: "Construction Commercial Management & Quantity Surveying",
    location: "Dubai & Northern Emirates, UAE",
    title: "UAE Construction Commercial Advisory Intelligence Pipeline",
    tags: ["Construction QS", "Groq Llama 3.3", "B2B Intelligence", "SQLite"],
    challenge: "Specialized construction consultancies struggle to reach relevant project developers and main contractors using generic marketing, which fails to address technical contractual risks like variation disputes and cost overruns.",
    architecture: "Node.js and TypeScript discovery pipeline backed by SQLite, leveraging Groq (Llama 3.3 70B) for domain-specific context drafting and Cheerio/Playwright for company extraction.",
    delivered: "Constructed an intelligence repository mapping 132 UAE-focused contractors and developers with 320 extracted contacts, pairing it with domain-specific LLM context drafting managed through a custom dashboard.",
    safeguards: "Zero-hardcoded dynamic configuration, MX domain verification, and 100% human-in-the-loop review.",
    outcomes: "Replaced indiscriminate outbound with high-relevance, engineering-specific positioning; unified contractor contact extraction; saved leadership hours on manual firmographic research.",
    results: [
      "UAE-focused intelligence database mapping 132 contractors and developers",
      "320 extracted contacts with domain MX validation",
      "Contextual LLM personalizer referencing BOQs, variations, and FIDIC dispute mitigation"
    ],
    serviceLink: "/ai-lead-generation-agency-dubai",
    serviceLinkLabel: "Explore B2B Lead Systems",
    desc: "UAE-focused contractor and developer intelligence pipeline with contextual LLM drafting for quantity surveying and commercial claims.",
    img: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "sharjah-dining-infrastructure",
    client: "Nimir's Pizzeria",
    classification: "Public Website Project",
    industry: "Food & Beverage / Local Hospitality",
    location: "Muwaileh Commercial, Sharjah, UAE",
    title: "Sharjah Restaurant Digital Ordering & Local Search Infrastructure",
    tags: ["Mobile Architecture", "Local SEO", "Talabat Integration", "Schema.org"],
    challenge: "Local dining establishments often suffer from slow, generic website templates that create friction on mobile devices when customers try to view menus, call, or order.",
    architecture: "Framework-free semantic HTML5, high-performance CSS3, and Schema.org LocalBusiness structured JSON-LD data.",
    delivered: "Built a lightweight mobile-first digital storefront with instant click-to-call integration (06 534 5442), direct Talabat delivery portal routing, and search-optimized local business markup.",
    safeguards: "Zero bloated third-party trackers, clean accessibility compliance, and mobile responsive tap targets.",
    outcomes: "Providing a lightweight, mobile-first ordering and local search experience for Sharjah diners.",
    results: [
      "Frictionless mobile navigation drawer with direct tap-to-call ordering",
      "Seamless delivery aggregation pathways via direct Talabat integration",
      "Schema.org LocalBusiness structured data targeting Muwaileh & Sharjah search intent"
    ],
    serviceLink: "/web-design-sharjah",
    serviceLinkLabel: "Explore Web Design Sharjah",
    desc: "Lightweight mobile-first digital storefront with direct telephone ordering, Talabat integration, and LocalBusiness schema markup.",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "governed-sales-engine",
    client: "Asif Digital Internal Technology Architecture",
    classification: "Internal Asif Digital Technology",
    industry: "Enterprise B2B Operations & Outbound Workflow Automation",
    location: "UAE & GCC",
    title: "Governed Multi-Worker AI Outbound Architecture",
    tags: ["Multi-Worker MAS", "Human-in-the-Loop", "Sender Safety", "Electron"],
    challenge: "Uncontrolled automated outbound software risks domain blacklisting, dispatches inaccurate hallucinated messaging, and lacks essential human oversight.",
    architecture: "Multi-worker agent system using TypeScript, SQLite, Groq reasoning models, and an Electron-based operational desktop console.",
    delivered: "Engineered mandatory human-in-the-loop (HITL) approval gates, automated MX domain validation, and randomized 3–5 minute delivery pacing to enforce sender-reputation safeguards.",
    safeguards: "The workflow requires explicit human approval before any message can be dispatched; emergency shutoff triggers; automated MX pre-flight checks.",
    outcomes: "Shifted outbound operations from high-volume automated spam to precision, human-reviewed B2B engagement with complete audit trails.",
    results: [
      "Mandatory human-in-the-loop (HITL) review requiring explicit approval before dispatch",
      "Configurable 3–5 minute delivery pacing and automated MX domain pre-checks",
      "Sentiment-scoring reply monitor that automatically pauses outreach upon human response"
    ],
    serviceLink: "/workflow-automation-uae",
    serviceLinkLabel: "Explore Workflow Automation",
    desc: "Governed 5-worker multi-agent architecture with mandatory human review, MX validation, and pacing safeguards.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "real-estate-portal-crm",
    client: "UAE Real Estate Brokerage Suite",
    classification: "Architecture Framework",
    industry: "Real Estate & Brokerage Operations",
    location: "Dubai & UAE",
    title: "Real Estate Portal Webhook & CRM Routing Architecture",
    tags: ["Portal Webhooks", "CRM Sync", "WhatsApp Alerts", "Next.js API"],
    challenge: "Brokerages frequently experience inquiry drop-off when leads from major property portals sit in unmonitored email inboxes or require manual spreadsheet imports.",
    architecture: "Serverless API webhook endpoints, CRM REST synchronization (HubSpot, Bitrix24, Salesforce), and automated WhatsApp/SMS notification triggers upon webhook intake.",
    delivered: "Designed an event-driven architecture that ingests portal inquiries automatically via webhooks, formats lead context, and initiates automated notification pathways while synchronizing central CRM pipelines.",
    safeguards: "Payload schema validation, duplicate deduplication logic, and failover logging.",
    outcomes: "Reducing reliance on manual spreadsheet imports through automated webhook-to-CRM routing.",
    results: [
      "Event-driven webhook endpoints capturing inquiries directly from portals and ad forms",
      "Automated WhatsApp and SMS notification triggers upon webhook intake alerting on-duty agents",
      "Structured two-way CRM field mapping for lead source, budget, and property preferences"
    ],
    serviceLink: "/real-estate-crm-dubai",
    serviceLinkLabel: "Explore Real Estate CRM",
    desc: "Event-driven webhook ingestion architecture connecting real estate portals to central CRMs and WhatsApp alert pathways.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
  }
];
