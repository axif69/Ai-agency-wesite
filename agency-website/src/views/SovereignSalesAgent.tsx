"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Database,
  Eye,
  FileCheck,
  FileText,
  Filter,
  HelpCircle,
  HelpCircle as QuestionIcon,
  Laptop,
  Layers,
  Lock,
  Mail,
  MailCheck,
  MessageSquare,
  MousePointerClick,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";

const imgBase = "/images/sovereign-sales-agent";

const dashboardScreens = [
  {
    src: `${imgBase}/db-overview.png`,
    title: "Command overview (Development preview)",
    desc: "Track discovered companies, verified intelligence, qualified targets and outreach readiness from one clean desktop workspace.",
    tag: "Development Preview",
  },
  {
    src: `${imgBase}/discovered-companies.png`,
    title: "Master UAE database (Development preview)",
    desc: "Keep discovered UAE companies organized with websites, categories, source signals and enrichment status.",
    tag: "Development Preview",
  },
  {
    src: `${imgBase}/qualified-targets.png`,
    title: "AI qualified targets (Development preview)",
    desc: "Filter relevant companies before outreach, so your team spends time on better-fit accounts.",
    tag: "Development Preview",
  },
  {
    src: `${imgBase}/decision-makers.png`,
    title: "Decision maker view (Development preview)",
    desc: "Review observed contacts, role signals, contact confidence and source evidence before handoff.",
    tag: "Development Preview",
  },
  {
    src: `${imgBase}/review-outreach.png`,
    title: "Human approval queue (Development preview)",
    desc: "Approve, edit or reject AI-written outreach drafts before anything goes out.",
    tag: "Development Preview",
  },
  {
    src: `${imgBase}/leads-inbox.png`,
    title: "Leads inbox (Development preview)",
    desc: "Read replies and hand off high-intent conversations instead of losing them in scattered inboxes.",
    tag: "Development Preview",
  },
  {
    src: `${imgBase}/analytics.png`,
    title: "Analytics command center (Development preview)",
    desc: "See campaign activity, interested replies, follow-ups due and evidence logs.",
    tag: "Development Preview",
  },
  {
    src: `${imgBase}/system-brain.png`,
    title: "AI provider controls (Development preview)",
    desc: "Configure customer-supplied model keys, prompt rules and research criteria around your target market.",
    tag: "Development Preview",
  },
  {
    src: `${imgBase}/system-outreach.png`,
    title: "Outreach safety controls (Development preview)",
    desc: "Set daily send caps, follow-up delay rules, human approval requirements and opt-out handling.",
    tag: "Development Preview",
  },
];

const faqs = [
  {
    q: "Is Sovereign AI Sales Agent available for commercial purchase today?",
    a: "No. The product is currently in active development as a desktop application. We are preparing for controlled early-access testing. Register for early access to receive development updates and pilot availability.",
  },
  {
    q: "Will customers need to run command-line or terminal windows?",
    a: "No. The product is being designed as a native Windows desktop application with a clean visual interface and background processing, requiring no visible terminal windows or developer commands.",
  },
  {
    q: "Is Sovereign AI Sales Agent fully autonomous?",
    a: "No. Sovereign is explicitly designed around human approval. The AI conducts research, evaluates company fit, and drafts personalized outreach, but human approval is required before sending messages or executing actions.",
  },
  {
    q: "Does it send emails automatically without supervision?",
    a: "By default, no. All email drafts enter a human review queue. Team members can review, edit, approve, or reject drafts. Automated sending capabilities will only operate within strict, user-defined rules and caps.",
  },
  {
    q: "Where will my sales workspace data be stored?",
    a: "The application is built local-first. Core workspace data, company records, contact lists, and outreach drafts are stored locally on your Windows computer in a local database by default.",
  },
  {
    q: "Will it integrate with data providers like Apollo, Hunter, or Snov.io?",
    a: "Data provider integration is on our planned roadmap. The system is designed to allow customers to connect their own supported API keys and data provider accounts.",
  },
  {
    q: "Will it integrate with CRM platforms like HubSpot or Pipedrive?",
    a: "Yes, CRM synchronization (including HubSpot, Pipedrive, and Zoho CRM) is planned for commercial release so approved leads and activity history sync directly with your sales pipeline.",
  },
  {
    q: "Will it support automation platforms like Zapier, Make.com, or n8n?",
    a: "Yes. The roadmap includes support for outgoing webhooks and automation triggers to connect your local sales workspace with Zapier, Make.com, or custom webhooks.",
  },
  {
    q: "Does Sovereign guarantee 100% verified contacts?",
    a: "No. Domain validation or server checks do not prove that a specific individual owns or checks a mailbox. Sovereign presents clear confidence scores and distinguishes confirmed data from inferred role signals.",
  },
  {
    q: "Will customers need their own AI provider API keys?",
    a: "Yes. The product is designed to allow customers to connect supported AI providers (such as OpenAI or Anthropic) using their own API keys, giving you direct control over model selection and usage.",
  },
  {
    q: "Will there be a dedicated Windows installer?",
    a: "Yes. A signed, standard Windows installer (.exe / .msi) is planned for commercial release for easy setup and update management.",
  },
  {
    q: "How will licence activation work?",
    a: "Upon commercial release, customers will activate the application using an account email and licence key. If a licence expires, the software enters a restricted read-only mode without deleting your local workspace data.",
  },
  {
    q: "Can Sovereign guarantee replies, meetings, revenue, or sales?",
    a: "No. Sovereign is intended to improve prospect research quality, workflow control, and outreach preparation. It cannot guarantee contact accuracy, replies, meetings, revenue, or sales.",
  },
  {
    q: "Will it automate mass LinkedIn connections or messaging?",
    a: "No. Sovereign does not perform unrestricted LinkedIn scraping or automated mass LinkedIn actions. Decision-maker research combines permitted data sources, public business web pages, and user-reviewed evidence.",
  },
];

export default function SovereignSalesAgent() {
  const [zoomedShot, setZoomedShot] = useState<(typeof dashboardScreens)[number] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!zoomedShot) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomedShot(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomedShot]);

  const jsonLdSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sovereign AI Sales Agent",
    operatingSystem: "Windows",
    applicationCategory: "BusinessApplication",
    description:
      "Local-first Windows desktop application in development for evidence-backed B2B prospect research, decision-maker discovery, and human-approved outreach.",
    publisher: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.asifdigital.agency",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sovereign AI Sales Agent",
        item: "https://www.asifdigital.agency/sovereign-sales-agent",
      },
    ],
  };

  return (
    <main className="relative overflow-hidden bg-[#050505] text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Global Background Styling */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,255,136,0.10),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(0,102,255,0.09),transparent_30%),linear-gradient(180deg,#050505,#030303)]" />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative z-10 px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-green-300">
                SOVEREIGN AI SALES AGENT · IN DEVELOPMENT
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-mono text-white/70">
                Early-access development
              </span>
            </div>

            <h1 className="max-w-4xl font-serif text-4xl leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[72px]">
              Your AI Sales Workspace. <br />
              <span className="text-white/70 italic font-normal">Your Data. Your Decisions.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-[1.7] text-white/75 md:text-lg">
              Sovereign AI Sales Agent is a Windows desktop application being developed to help B2B teams research relevant companies, identify likely decision-makers, prepare evidence-grounded outreach, and manage human-approved sales workflows from one workspace.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white/85"
              >
                Request Early Access <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#planned-workflow"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
              >
                Explore Planned Workflow
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[13px] text-white/65 leading-relaxed">
              <strong className="text-white">Status Note:</strong> The product is currently under active development. Final features, providers, integrations, and release availability will be confirmed after testing.
            </div>
          </motion.div>

          {/* Hero Desktop Mockup Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative min-h-[420px]"
          >
            <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-3xl" />
            <motion.button
              type="button"
              onClick={() => setZoomedShot(dashboardScreens[0])}
              aria-label="Open sales agent command overview dashboard preview"
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[2rem] border border-white/15 bg-[#07100d] p-3 text-left shadow-2xl"
            >
              <div className="relative rounded-[1.4rem] bg-[#eef5fb] p-2">
                <Image
                  src={dashboardScreens[0].src}
                  alt="Sovereign AI Sales Agent command overview development preview"
                  width={1920}
                  height={1080}
                  priority
                  className="h-auto w-full rounded-[1rem]"
                />
              </div>
              <div className="absolute inset-x-7 bottom-6 flex items-center justify-between rounded-2xl border border-white/15 bg-black/80 px-5 py-3.5 text-white shadow-2xl backdrop-blur">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-300">
                    Development Preview · Illustrative UI
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/70">Click to zoom interactive workspace mockups</p>
                </div>
                <MousePointerClick className="h-5 w-5 text-green-300 shrink-0" />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: THE PROBLEM ── */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.02] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <span className="micro-label mb-3 block text-green-400">The Problem</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Most Prospecting Tools Give You More Data. Not Better Decisions.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Irrelevant Targets",
                desc: "Off-the-shelf databases flood your pipeline with out-of-market companies that fail basic ideal customer criteria.",
              },
              {
                title: "Unexplained AI Scores",
                desc: "Traditional tools show black-box lead scores without explaining what evidence was found or why a company qualified.",
              },
              {
                title: "Guessed Emails as 'Verified'",
                desc: "Generic catch-all verification labels confuse domain ping status with real, person-owned mailboxes.",
              },
              {
                title: "Unsupervised Automation",
                desc: "Tools that send bulk messages automatically risk sending embarrassing, unverified copy to high-value prospects.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
                <AlertTriangle className="mb-4 h-6 w-6 text-amber-400" />
                <h3 className="font-serif text-xl mb-2 text-white">{item.title}</h3>
                <p className="text-[16px] leading-[1.7] text-white/65 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PRODUCT PRINCIPLE ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="micro-label mb-3 block text-green-400">Product Principle</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              AI Should Assist the Decision. <br />
              <span className="italic opacity-70">Not Hide How It Was Made.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-5 text-left">
            {[
              { step: "01", title: "AI Proposes", desc: "Suggests prospect accounts and outreach drafts based on your defined ICP." },
              { step: "02", title: "Evidence Supports", desc: "Attaches source URLs, observed text snippets, and timestamps to every match." },
              { step: "03", title: "Rules Validate", desc: "Applies hard exclusion filters, duplicate checks, and sending cap safety bounds." },
              { step: "04", title: "Human Approves", desc: "Your team reviews, edits, or rejects recommendations before any action occurs." },
              { step: "05", title: "System Acts", desc: "Executes approved outreach or syncs intelligence to your CRM upon authorization." },
            ].map((p) => (
              <div key={p.step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 relative">
                <span className="font-mono text-xs font-bold text-green-400 tracking-wider mb-4 block">{p.step}</span>
                <h3 className="font-serif text-xl mb-2 text-white">{p.title}</h3>
                <p className="text-[16px] leading-[1.7] text-white/60 font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: ONE CONTROLLED WORKFLOW ── */}
      <section id="planned-workflow" className="relative z-10 px-6 py-24 md:px-12 md:py-32 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="micro-label text-green-400">Planned Product Workflow</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-white/60">
                Planned Workflow
              </span>
            </div>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              One Controlled Workflow. From Targeting to Review.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", title: "Define Your Target", desc: "Specify target industries, geographic locations, company headcount bounds, and explicit exclusion criteria." },
              { num: "02", title: "Research Companies", desc: "Discover candidate B2B companies from permitted business sources and public domain records." },
              { num: "03", title: "Evaluate Fit", desc: "Calculate an explainable fit score grounded in verifiable business-model and service evidence." },
              { num: "04", title: "Research Decision-Makers", desc: "Identify likely owners or department leads, distinguishing observed signals from role inferences." },
              { num: "05", title: "Prepare Outreach", desc: "Draft concise (45–90 word) outreach messages highlighting an observed business observation." },
              { num: "06", title: "Review Before Action", desc: "Inspect every message in your desktop approval queue to edit, approve, or pause sending." },
              { num: "07", title: "Track History", desc: "Maintain local audit logs of all approved outreach, responses, and CRM synchronization status." },
            ].map((step) => (
              <div key={step.num} className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
                <span className="font-mono text-xs font-bold text-green-400 tracking-widest block mb-3">{step.num}</span>
                <h3 className="font-serif text-xl mb-2 text-white">{step.title}</h3>
                <p className="text-[16px] leading-[1.7] text-white/65 font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: EVIDENCE BEFORE AUTOMATION ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <div className="text-left">
            <span className="micro-label mb-3 block text-green-400">Account Validation</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl mb-5">
              Evidence Before Automation.
            </h2>
            <p className="text-[17px] leading-[1.7] text-white/75 font-light mb-6">
              Sovereign is being designed to show team members exactly why a company fits your ideal customer profile, where the observation originated, and what uncertainties remain.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-[13px] text-white/60 font-mono">
              Illustrative example — not live client data.
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-black/70 p-6 md:p-8 text-left space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-xl text-white">Al-Sharq Logistics Solutions LLC</h3>
                <p className="text-xs text-white/50 font-mono mt-0.5">Domain: alsharq-logistics-example.ae</p>
              </div>
              <span className="rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-bold text-green-300 font-mono">
                Fit Score: 88/100
              </span>
            </div>

            <div className="grid gap-3 text-xs md:text-sm font-light">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Industry Evidence:</span>
                <span className="text-white font-mono">Observed &quot;Fleet Freight & Cold Storage&quot; on homepage</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Location Evidence:</span>
                <span className="text-white font-mono">Dubai South Logistics District address listed</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Company Size Signal:</span>
                <span className="text-white font-mono">50–150 employees (Observed career page listings)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Conflicting Info:</span>
                <span className="text-amber-300 font-mono">Secondary domain lists Abu Dhabi branch (Unverified)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/50">Reviewer Status:</span>
                <span className="text-green-400 font-bold font-mono">Pending Human Approval</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: EXPLAINABLE COMPANY FIT ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl text-left">
          <div className="mb-12 max-w-3xl">
            <span className="micro-label mb-3 block text-green-400">Scoring Transparency</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Understand Why a Company Fits.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-white/70 font-light">
              Rather than assigning an arbitrary lead score, Sovereign breaks qualification down into verifiable match factors and penalty deductions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Industry Match", score: "+30 pts", desc: "Matches target sector criteria explicitly." },
              { label: "Location Match", score: "+25 pts", desc: "Verified business address in target zone." },
              { label: "Business-Model Fit", score: "+20 pts", desc: "B2B commercial operations observed." },
              { label: "Decision-Maker Availability", score: "+15 pts", desc: "Identified relevant role lead." },
              { label: "Conflicting Evidence", score: "-15 pts", desc: "Deducted for contradictory branch data." },
              { label: "Missing Evidence Penalty", score: "-10 pts", desc: "Deducted when headcount signal is missing." },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif text-lg text-white">{s.label}</span>
                  <span className="font-mono text-sm font-bold text-green-400">{s.score}</span>
                </div>
                <p className="text-[14px] text-white/60 font-light">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-white/40 font-mono">
            Illustrative scoring model — not live client data. Scoring parameters are customizable per deployment.
          </p>
        </div>
      </section>

      {/* ── SECTION 7: HONEST CONTACT CONFIDENCE ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl text-left">
          <div className="mb-12 max-w-3xl">
            <span className="micro-label mb-3 block text-green-400">Data Integrity</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              No More Calling Every Email &quot;Verified.&quot;
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-white/70 font-light">
              Validating an email server or domain MX record does not prove that a specific executive reads or owns a mailbox. Sovereign accurately distinguishes observed facts from role inferences.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              "Confirmed Decision-Maker",
              "Role Inferred",
              "Public Profile Observed",
              "Personal Email Observed",
              "Company Mailbox",
              "Domain Accepts Email",
              "Mailbox Verification Unavailable",
              "Evidence Missing",
            ].map((tag) => (
              <div key={tag} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4">
                <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                <span className="text-sm font-mono text-white/80">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: OUTREACH QUALITY ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 items-center text-left">
          <div>
            <span className="micro-label mb-3 block text-green-400">Drafting Standards</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl mb-5">
              Shorter Drafts. <br />
              <span className="italic opacity-70">Stronger Reasons to Reply.</span>
            </h2>
            <p className="text-[17px] leading-[1.7] text-white/75 font-light mb-6">
              Outreach messages are crafted around concise, relevant observations rather than generic fluff. Every message is designed to stay between 45 and 90 words with zero fake personalization.
            </p>

            <div className="space-y-3 text-sm text-white/70 font-light">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>1 specific observation regarding the prospect company</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>1 relevant operational implication</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>1 concise, direct offer or insight</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>1 low-friction closing question</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-black/60 p-8 text-left space-y-5">
            <h3 className="font-serif text-xl text-white">Planned Draft Quality Checks</h3>
            <p className="text-xs text-white/50 leading-relaxed font-mono">
              Before entering your review queue, drafts pass automated reviewer checks to prevent low-quality outreach:
            </p>
            <div className="grid gap-3 text-xs font-mono">
              {[
                { check: "Unsupported-Claim Check", status: "PASS" },
                { check: "Genericness Penalty Check", status: "PASS" },
                { check: "Length Check (45-90 words)", status: "PASS (62 words)" },
                { check: "Duplication Protection", status: "PASS" },
                { check: "Evidence Support Validation", status: "PASS" },
              ].map((c) => (
                <div key={c.check} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-white/70">{c.check}</span>
                  <span className="text-green-400 font-bold">{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: LOCAL-FIRST WINDOWS APPLICATION ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl text-left">
          <div className="mb-14 max-w-3xl">
            <span className="micro-label mb-3 block text-green-400">Desktop Architecture</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Designed to Run on Your Windows Computer.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-white/75 font-light">
              Designed to keep core workspace data local by default. No background terminal windows or manual scripts required.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Downloadable Windows App", desc: "Installed via standard desktop installer with an intuitive graphical dashboard." },
              { title: "Local Database Storage", desc: "Company targets, contact lists, and notes remain stored locally on your machine." },
              { title: "Encrypted Local Credentials", desc: "API keys and account details stay securely stored in your local Windows environment." },
              { title: "Customer-Controlled Keys", desc: "Connect your preferred AI provider accounts and API keys directly." },
            ].map((box) => (
              <div key={box.title} className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <Laptop className="mb-4 h-6 w-6 text-green-400" />
                <h3 className="font-serif text-xl mb-2 text-white">{box.title}</h3>
                <p className="text-[15px] leading-[1.7] text-white/65 font-light">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: REUSABLE SALES INTELLIGENCE ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl text-left">
          <div className="mb-12 max-w-3xl">
            <span className="micro-label mb-3 block text-green-400">Knowledge Retention</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Your Sales Research Should Become Reusable Intelligence.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Approved & Rejected Company History",
              "Exact Rejection Reasons & Filters",
              "Source Evidence & Observed Text",
              "Contact Confidence Classifications",
              "Human Approval Audit Log",
              "CRM Sync & Webhook Logs",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <Database className="mb-3 h-5 w-5 text-green-400" />
                <h3 className="font-serif text-lg text-white mb-1">{item}</h3>
                <p className="text-xs text-white/50 font-mono">Retained in local database workspace</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 11: OWN YOUR SALES WORKSPACE ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl text-center">
          <span className="micro-label mb-3 block text-green-400">Control & Sovereignty</span>
          <h2 className="font-serif text-3xl leading-tight md:text-5xl mb-14">
            Own Your Sales Workspace. Control Every Connection.
          </h2>

          <div className="grid gap-8 md:grid-cols-3 text-left">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <Lock className="mb-6 h-8 w-8 text-green-400" />
              <h3 className="font-serif text-2xl text-white mb-3">Your Data</h3>
              <p className="text-[16px] leading-[1.7] text-white/65 font-light">
                Prospect lists, rejection logs, notes, and approval histories stay stored in your local workspace database.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <Sliders className="mb-6 h-8 w-8 text-green-400" />
              <h3 className="font-serif text-2xl text-white mb-3">Your Providers</h3>
              <p className="text-[16px] leading-[1.7] text-white/65 font-light">
                Connect your preferred AI providers and data services using your own API keys and accounts.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <UserCheck className="mb-6 h-8 w-8 text-green-400" />
              <h3 className="font-serif text-2xl text-white mb-3">Your Decisions</h3>
              <p className="text-[16px] leading-[1.7] text-white/65 font-light">
                No automated message goes out without human review unless explicitly authorized by your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: PLANNED INTEGRATIONS ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl text-left">
          <div className="mb-12 max-w-3xl">
            <span className="micro-label mb-3 block text-green-400">Ecosystem Roadmap</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Built to Connect With the Tools Your Team Uses.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {[
              { cat: "AI Providers", items: ["OpenAI API", "Anthropic Claude API"], status: "Planned" },
              { cat: "Contact Data", items: ["Apollo API", "Hunter.io API", "Snov.io API"], status: "Under Evaluation" },
              { cat: "CRM Platforms", items: ["HubSpot CRM", "Pipedrive", "Zoho CRM"], status: "Planned" },
              { cat: "Email Services", items: ["Custom SMTP / IMAP", "Mailbox Relay"], status: "Planned" },
              { cat: "Automation", items: ["Zapier Webhooks", "Make.com", "n8n Webhooks"], status: "Planned" },
              { cat: "Notifications", items: ["In-App Alerts", "Windows Notifications", "Slack Webhooks"], status: "Planned" },
            ].map((group) => (
              <div key={group.cat} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl text-white">{group.cat}</h3>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-mono text-white/70">
                    {group.status}
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-white/60 font-light">
                  {group.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[13px] text-white/60 leading-relaxed font-mono">
            Integration availability, provider limits and required subscriptions may vary. Customers may need their own provider accounts and API access.
          </div>
        </div>
      </section>

      {/* ── SECTION 13: HUMAN CONTROL AND SAFETY ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl text-left">
          <div className="mb-12 max-w-3xl">
            <span className="micro-label mb-3 block text-green-400">Safeguards & Bounds</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Automation With Clear Boundaries.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Human approval required before outreach",
              "Source evidence displayed beside recommendations",
              "No silent auto-approval of unreviewed drafts",
              "Contact confidence scores on all records",
              "Duplicate-send protection & cap enforcement",
              "Daily and campaign outreach volume limits",
              "Opt-out & unsubscribe handling",
              "Redacted system logs & local error diagnostics",
              "Licence expiry enters read-only mode without deleting data",
            ].map((s) => (
              <div key={s} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-5">
                <ShieldCheck className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-[15px] text-white/75 font-light leading-relaxed">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 14: WHO IT IS FOR ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl text-left">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="micro-label mb-3 block text-green-400">Target Fit</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Built for Focused B2B Prospecting. Not Mass Spam.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-green-400/20 bg-green-400/[0.03] p-8">
              <h3 className="font-serif text-2xl text-green-300 mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-400" /> Ideal Fit
              </h3>
              <ul className="space-y-4 text-[16px] text-white/75 font-light leading-relaxed">
                <li>• B2B service agencies & technical consultancies</li>
                <li>• Commercial real estate & property management teams</li>
                <li>• Logistics, SaaS & specialized B2B service providers</li>
                <li>• Founders managing targeted outbound research</li>
                <li>• Teams that require human review before sending outreach</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-red-400/20 bg-red-400/[0.03] p-8">
              <h3 className="font-serif text-2xl text-red-300 mb-6 flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-400" /> Not Designed For
              </h3>
              <ul className="space-y-4 text-[16px] text-white/75 font-light leading-relaxed">
                <li>• Mass unsegmented email spamming</li>
                <li>• Unrestricted web scraping or privacy violations</li>
                <li>• Unattended bulk email blasting</li>
                <li>• Guaranteed-lead or guaranteed-revenue expectations</li>
                <li>• Automated LinkedIn connection abuse</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 15: DEVELOPMENT ROADMAP ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl text-left">
          <div className="mb-14 max-w-3xl">
            <span className="micro-label mb-3 block text-green-400">Release Plan</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Development Roadmap.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <span className="font-mono text-xs text-green-400 font-bold uppercase tracking-wider mb-2 block">Phase 1</span>
              <h3 className="font-serif text-2xl text-white mb-4">Current Foundation</h3>
              <ul className="space-y-3 text-[15px] text-white/65 font-light leading-relaxed">
                <li>• Secure Windows desktop shell foundation</li>
                <li>• Local SQLite database schema</li>
                <li>• Desktop UI dashboards & review queues</li>
                <li>• Typed IPC inter-process communication</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider mb-2 block">Phase 2</span>
              <h3 className="font-serif text-2xl text-white mb-4">In Development</h3>
              <ul className="space-y-3 text-[15px] text-white/65 font-light leading-relaxed">
                <li>• Strict ICP targeting configuration</li>
                <li>• Evidence extraction model</li>
                <li>• Decision-maker confidence tagging</li>
                <li>• Quality reviewer draft validation</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider mb-2 block">Phase 3</span>
              <h3 className="font-serif text-2xl text-white mb-4">Commercial Release</h3>
              <ul className="space-y-3 text-[15px] text-white/65 font-light leading-relaxed">
                <li>• Signed Windows installer (.exe/.msi)</li>
                <li>• Licence key activation & update system</li>
                <li>• Provider API integration suite</li>
                <li>• Controlled early-access pilot launch</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 16: EARLY ACCESS CTA ── */}
      <section className="relative z-10 px-6 py-24 md:px-12 md:py-32 border-b border-white/10">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-white/[0.05] to-black/60 p-10 text-center shadow-2xl md:p-16">
          <span className="micro-label mb-4 inline-block text-green-400">Join Development</span>
          <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-tight md:text-6xl text-white mb-6">
            Help Shape a More Honest AI Sales Agent.
          </h2>
          <p className="mx-auto max-w-2xl text-[17px] leading-[1.7] text-white/70 font-light mb-10">
            Request early access to receive product updates, pilot availability, and release information. Early-access registration does not guarantee immediate access.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white/85"
            >
              Request Early Access <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
            >
              Discuss the Product
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 17: FAQ ── */}
      <section className="relative z-10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl text-left">
          <div className="mb-14 text-center">
            <span className="micro-label mb-3 block text-green-400">Questions & Answers</span>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Frequently Asked Questions.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-serif text-lg md:text-xl text-white pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-green-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-[16px] leading-[1.7] text-white/70 font-light border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Screenshot Zoom Modal */}
      {zoomedShot && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setZoomedShot(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28 }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-[#070b09] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setZoomedShot(null)}
              className="absolute right-4 top-4 z-20 rounded-full bg-black/80 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur hover:bg-white hover:text-black transition"
            >
              Close
            </button>
            <div className="relative flex min-h-[260px] w-full items-center justify-center overflow-hidden bg-[#eef5fb] p-3 md:p-5 max-h-[70vh]">
              <Image
                src={zoomedShot.src}
                alt={zoomedShot.title}
                width={1920}
                height={1080}
                sizes="min(1120px, 94vw)"
                className="block h-auto w-auto max-h-[68vh] max-w-full rounded-[1rem] object-contain"
                priority
              />
            </div>
            <div className="border-t border-white/10 px-6 py-5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-green-300">
                {zoomedShot.tag}
              </span>
              <h3 className="mt-1 font-serif text-2xl text-white">{zoomedShot.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60 font-light">{zoomedShot.desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
