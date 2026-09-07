export interface CaseStudy {
  id: string;
  client: string;
  classification: "Delivered Client Implementation" | "Internal Asif Digital Technology" | "Prototype / Proof of Concept" | "Architecture Framework";
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
    id: "luxury-real-estate-ai-concierge",
    client: "London & Dubai Luxury Real Estate Brokerage",
    classification: "Delivered Client Implementation",
    industry: "Luxury Real Estate & Off-Plan Investment",
    location: "London (Knightsbridge) & Dubai (Bluewaters Island)",
    title: "Automated Investor Concierge & Multi-Channel Ad Telemetry Platform",
    tags: ["Next.js 16", "Supabase PostgreSQL", "Meta Marketing API", "Google Ads API", "WhatsApp AI", "Google Calendar API"],
    challenge: "Managing international investor inquiries across London and Dubai from Meta and Google ad campaigns created operational friction: manual spreadsheet data entry delayed follow-ups, fragmented ad platforms made unified cost-per-lead visibility difficult, and delayed responses risked losing high-intent property buyers.",
    architecture: "Full-stack real estate operating system engineered with Next.js 16, Prisma ORM, and Supabase PostgreSQL across 14 relational models. Connected directly to Meta Graph API (v19.0), Google Ads GAQL API, Google Calendar API v3, ManyChat WhatsApp webhooks, and OpenAI reasoning models.",
    delivered: "Engineered: (1) direct webhook ingestion with persisted event tracking capturing Meta Instant Forms and Click-to-WhatsApp inquiries, (2) an automated WhatsApp concierge executing structured lead qualification, (3) automated calendar scheduling with Google Meet links and London/Dubai venue routing, and (4) an executive Command Center streaming live ad spend in AED with 1-click human broker takeover controls.",
    safeguards: "Structured action-schema validation, 1-click human broker takeover switch (AI Active / AI Paused), price-rounding rules to prevent robotic raw number dumps, voice note transcription via Whisper, and dual-layer Google Sheets master audit redundancy.",
    outcomes: "Automated front-line investor inquiry triage and meeting coordination; enabled live marketing telemetry across multi-currency ad accounts; provided sales leadership with direct CRM visibility while keeping formal contract negotiation in the hands of licensed brokers.",
    results: [
      "53 recorded inbound investor leads, including 11 leads with granular ad-attribution records.",
      "12 booking records: 11 confirmed consultations (9 London, 1 Dubai, 1 video consultation) and 1 pending approval.",
      "190 WhatsApp messages exchanged across 31 active conversations with 1-click human takeover control"
    ],
    serviceLink: "/ai-agents-dubai",
    serviceLinkLabel: "Explore Custom AI Concierges",
    desc: "Full-stack luxury real estate AI operating system connecting Meta & Google Ads to an automated WhatsApp concierge and live executive CRM.",
    img: "/images/dubai_real_estate_ai_dashboard.png"
  },
  {
    id: "governed-sales-engine",
    client: "Asif Digital Internal Technology Architecture",
    classification: "Internal Asif Digital Technology",
    industry: "Enterprise B2B Operations & Outbound Workflow Automation",
    location: "UAE & GCC",
    title: "Governed Multi-Worker AI Outbound Architecture",
    tags: ["Multi-Worker MAS", "Human-in-the-Loop", "Sender Safety", "Electron", "Groq Llama 3"],
    challenge: "Uncontrolled automated outbound software risks domain blacklisting, dispatches inaccurate hallucinated messaging, and lacks essential human oversight.",
    architecture: "Multi-worker agent system using TypeScript, SQLite, Groq reasoning models, and an Electron-based operational desktop console.",
    delivered: "Engineered mandatory human-in-the-loop (HITL) approval gates, automated MX domain validation, and randomized 3–5 minute delivery pacing to enforce sender-reputation safeguards.",
    safeguards: "The workflow requires explicit human approval before any message can be dispatched; emergency shutoff triggers; automated MX pre-flight checks.",
    outcomes: "Shifted outbound operations from high-volume automated spam to precision, human-reviewed B2B engagement with structured execution logs and human review records.",
    results: [
      "Mandatory human-in-the-loop (HITL) review requiring explicit approval before dispatch",
      "Configurable 3–5 minute delivery pacing and automated MX domain pre-checks",
      "Sentiment-scoring reply monitor that automatically pauses outreach upon human response"
    ],
    serviceLink: "/workflow-automation-uae",
    serviceLinkLabel: "Explore Workflow Automation",
    desc: "Governed 5-worker multi-agent architecture with mandatory human review, MX validation, and pacing safeguards.",
    img: "/images/sovereign/dashboard-command.png"
  }
];
