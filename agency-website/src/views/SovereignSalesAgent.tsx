"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Database,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Filter,
  HelpCircle,
  Inbox,
  Laptop,
  Layers,
  Lock,
  Mail,
  MailCheck,
  MessageSquare,
  MousePointerClick,
  RefreshCw,
  Search,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  UserCheck,
  Users,
  XCircle,
  Loader2,
} from "lucide-react";
import { trackEvent } from "../utils/analytics";

const imgBase = "/images/sovereign-sales-agent";

const productScreenshots = [
  {
    id: "hero",
    src: `${imgBase}/hero-operations-v6.png`,
    title: "Operations Overview (Sovereign Engine v5.1)",
    desc: "Real-time visibility into target entities, intent gate qualification, sector distribution, and pipeline stages with zero unapproved outreach.",
    tag: "Workspace Overview · Illustrative Demonstration",
  },
  {
    id: "targets",
    src: `${imgBase}/ui-qualified-targets-v6.png`,
    title: "AI Qualified Targets & Discovery Gate",
    desc: "Target brief filtering, dynamic search parameters, observable website evidence, and contact enrichment readiness.",
    tag: "Target Qualification · Illustrative Demonstration",
  },
  {
    id: "review",
    src: `${imgBase}/ui-review-outreach-v6.png`,
    title: "Human Approval Queue & Outreach Review",
    desc: "Every AI-generated draft is held in an operator review queue for verification, personalization check, and single-click approval before sending.",
    tag: "Human Approval Gate · Sovereign Engine v5.1",
  },
  {
    id: "config",
    src: `${imgBase}/ui-system-config-v6.png`,
    title: "System Configuration & Dynamic Targeting",
    desc: "Customizable commercial ICP profiles, negative keyword exclusions, and Windows DPAPI credential protection.",
    tag: "Security & Governance · Illustrative Demonstration",
  },
];

const confidenceStatuses = [
  {
    badge: "Confirmed Decision-Maker",
    color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    desc: "Identity and role supported by verified public executive evidence.",
  },
  {
    badge: "Role Inferred",
    color: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    desc: "Likely responsibility based on operational context; not independently confirmed.",
  },
  {
    badge: "Public Profile Observed",
    color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    desc: "Public professional profile observed on company website or directory.",
  },
  {
    badge: "Personal Email Observed",
    color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    desc: "Direct mailbox observed; ownership and deliverability remain subject to testing.",
  },
  {
    badge: "Company Mailbox",
    color: "text-slate-300 border-white/20 bg-white/5",
    desc: "Departmental or general address (info@, sales@, contact@) for secondary routing.",
  },
  {
    badge: "Domain Accepts Email",
    color: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    desc: "Domain mail-exchange routing confirmed; does not prove individual inbox exists.",
  },
  {
    badge: "Mailbox Verification Unavailable",
    color: "text-rose-400 border-rose-400/30 bg-rose-400/10",
    desc: "Destination mail server blocks external SMTP handshake verification.",
  },
  {
    badge: "Evidence Missing",
    color: "text-neutral-400 border-neutral-600/30 bg-neutral-800/30",
    desc: "Insufficient supporting data; flagged for operator manual review.",
  },
];

const faqs = [
  {
    q: "Is Sovereign AI Sales Agent available for commercial purchase today?",
    a: "No. Sovereign is currently in private development build status undergoing internal workflow testing. Private product walkthroughs and early-access evaluations are available by request. Commercial licensing terms will be announced following the pilot phase.",
  },
  {
    q: "Can I request a private walkthrough or demo?",
    a: "Yes. Qualified B2B agencies, consultancies, and commercial service providers can submit the walkthrough request form below to schedule a one-on-one session demonstrating the active research, qualification, and review workflows.",
  },
  {
    q: "Does it discover companies and verify data automatically?",
    a: "Sovereign discovers potential companies matching defined ICP criteria from search engines and public web presences. It crawls website text to find observable evidence, but clearly distinguishes confirmed observations from inferred roles and missing information.",
  },
  {
    q: "Does Sovereign verify individual email inboxes?",
    a: "Sovereign checks domain-level mail routing (MX) and tests deliverability where feasible, but explicitly avoids calling every address 'verified.' A domain with valid MX records does not prove an individual executive reads or owns that specific mailbox.",
  },
  {
    q: "Does Sovereign automatically send cold emails without supervision?",
    a: "No. All generated outreach drafts enter a local desktop human approval queue. Team members review, edit, approve, or reject drafts before dispatch. There is zero silent auto-approval of unreviewed messages.",
  },
  {
    q: "Where is my sales workspace data stored?",
    a: "Your prospect research, company records and outreach drafts are stored in a local SQLite workspace. Sensitive API credentials are protected using Windows DPAPI. Note that external AI, search, enrichment and email providers process relevant information when those services are used.",
  },
  {
    q: "Does it integrate with CRMs like HubSpot, Pipedrive, or Zoho today?",
    a: "Bi-directional CRM synchronization is currently on our planned commercial roadmap. Today, the workspace supports structured local data storage and data export. Direct CRM API synchronization is scheduled for commercial release.",
  },
  {
    q: "Does Sovereign guarantee replies, booked meetings, or revenue?",
    a: "No. Sovereign provides structured research, evidence-grounded qualification, and controlled drafting discipline. It cannot guarantee contact accuracy, replies, meetings, or revenue. Sales outcomes depend entirely on your market offer, timing, and relationship.",
  },
];

export default function SovereignSalesAgent() {
  const [zoomedShot, setZoomedShot] = useState<(typeof productScreenshots)[number] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    challenge: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formStartedRef = useRef(false);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const accessKey = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "").trim();
      if (!accessKey) {
        throw new Error(
          "Demo enquiry dispatch is currently unavailable. Please reach Asif directly via WhatsApp (+971 54 586 6094) or email hello@asifdigital.agency."
        );
      }

      // Check honeypot if filled by automated bots
      const formTarget = e.currentTarget as HTMLFormElement;
      const botcheck = (formTarget.elements.namedItem("botcheck") as HTMLInputElement)?.checked;
      if (botcheck) {
        setSubmitSuccess(true);
        return;
      }

      // Client-side sanitization and validation
      const cleanName = formData.name.trim();
      const cleanEmail = formData.email.trim();
      const cleanCompany = formData.company.trim();
      const cleanRole = formData.role.trim();
      const cleanChallenge = formData.challenge.trim();
      const cleanMessage = formData.message.trim();

      if (!cleanName || !cleanEmail || !cleanCompany || !cleanRole || !cleanChallenge) {
        throw new Error("All marked fields are required.");
      }

      if (
        cleanName.length > 100 ||
        cleanEmail.length > 120 ||
        cleanCompany.length > 120 ||
        cleanRole.length > 100 ||
        cleanChallenge.length > 150 ||
        cleanMessage.length > 1000
      ) {
        throw new Error("Submitted fields exceed permitted lengths.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        throw new Error("Please enter a valid business email address.");
      }

      const timestampStr =
        new Date().toLocaleString("en-US", {
          timeZone: "Asia/Dubai",
          dateStyle: "medium",
          timeStyle: "short",
        }) + " GST";

      const submissionData = new FormData();
      submissionData.append("access_key", accessKey);
      submissionData.append("name", cleanName);
      submissionData.append("email", cleanEmail);
      submissionData.append("subject", `👑 Sovereign Demo Request: ${cleanCompany} (${cleanName})`);
      submissionData.append("from_name", "Sovereign Early Access Intake");
      submissionData.append("Company", cleanCompany);
      submissionData.append("Role", cleanRole);
      submissionData.append("Primary_Challenge", cleanChallenge);
      submissionData.append(
        "message",
        [
          `Name: ${cleanName}`,
          `Company: ${cleanCompany}`,
          `Role: ${cleanRole}`,
          `Email: ${cleanEmail}`,
          `Primary Challenge: ${cleanChallenge}`,
          `Context: ${cleanMessage || "N/A"}`,
          `Captured At: ${timestampStr}`,
          `Source Page: /sovereign-sales-agent`,
        ].join("\n\n")
      );

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData,
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "We could not submit your request online. Please contact Asif directly via WhatsApp (+971 54 586 6094) or email hello@asifdigital.agency."
        );
      }

      trackEvent("generate_lead", {
        form_name: "Sovereign Private Demo Request",
        service_name: "Sovereign AI Sales Agent Walkthrough",
        lead_type: "sovereign_demo",
      });

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        challenge: "",
        message: "",
      });
      formStartedRef.current = false;
    } catch (err: any) {
      console.error("Sovereign Demo Form Error:", err);
      setSubmitError(
        err?.message ||
          "We could not submit your request online. Please contact Asif directly via WhatsApp (+971 54 586 6094) or email hello@asifdigital.agency."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const jsonLdSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sovereign AI Sales Agent",
    operatingSystem: "Windows 10, Windows 11",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "B2B Sales Prospecting & Intelligence Software",
    description:
      "A local-first B2B sales research and outreach workspace in development by Asif Digital Agency, designed to help businesses discover relevant companies, evaluate ICP fit against observable evidence, and prepare human-approved outreach.",
    author: {
      "@type": "Organization",
      name: "Asif Digital: AI Automation, Web & Graphic Design",
      alternateName: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Muwaileh Commercial - Industrial Area",
        addressLocality: "Sharjah",
        addressRegion: "Sharjah",
        addressCountry: "AE"
      }
    },
    publisher: {
      "@type": "Organization",
      name: "Asif Digital: AI Automation, Web & Graphic Design",
      alternateName: "Asif Digital Agency",
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
    <main className="relative overflow-hidden bg-[#070b12] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-white">
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

      {/* Atmospheric Subtle Grid & Gradient Background */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.15),transparent),linear-gradient(180deg,#070b12_0%,#04070c_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* ── SECTION 01: HERO & PRODUCT PREVIEW ── */}
      <section className="relative z-10 px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                <span>SOVEREIGN AI SALES AGENT</span>
                <span className="text-white/40">·</span>
                <span>PRIVATE DEVELOPMENT BUILD</span>
              </div>

              <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
                AI-Powered B2B Sales Prospecting & <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-white bg-clip-text text-transparent">
                  Research Software
                </span> <br />
                <span className="font-light italic text-white/80">Find Fit. Verify Evidence. Control Every Draft.</span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                Sovereign helps B2B teams research relevant businesses, evaluate ICP fit, identify potential decision-makers, and prepare personalised outreach using observable company evidence — all from one controlled sales workspace.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#private-demo"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-blue-600 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 hover:shadow-blue-500/35 sm:w-auto"
                >
                  Request a Private Demo <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
                >
                  Explore How It Works
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Currently available as a private development build. Early-access availability is subject to product validation and onboarding.
              </p>
            </motion.div>
          </div>

          {/* Hero Workspace Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-14 relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-b from-blue-500/20 via-indigo-500/10 to-transparent blur-2xl" />
            
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0b1322] p-2.5 shadow-2xl md:p-3.5">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/70" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/70" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-mono text-[11px] text-slate-300">Asif Digital Agency / Sovereign Engine v5.1</span>
                </div>
                <span className="hidden font-mono text-[11px] text-emerald-400 sm:inline-block">● Engine Online (Desktop Runtime)</span>
              </div>

              <button
                type="button"
                onClick={() => setZoomedShot(productScreenshots[0])}
                aria-label="Inspect Sovereign operations dashboard"
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#0e1726]"
              >
                <Image
                  src={productScreenshots[0].src}
                  alt="Sovereign AI-Powered B2B Sales Prospecting Software - Operations Overview Workspace"
                  width={1920}
                  height={1080}
                  priority
                  className="h-auto w-full transition duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-black/85 px-4 py-3 text-white backdrop-blur">
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-300">
                      Illustrative Demonstration · Not Live Prospect Data
                    </span>
                    <p className="text-xs text-slate-300">Click to view full-resolution workspace interface</p>
                  </div>
                  <MousePointerClick className="h-5 w-5 text-blue-400 shrink-0" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 02: THE PROBLEM WITH CONVENTIONAL PROSPECTING ── */}
      <section className="relative z-10 border-y border-white/10 bg-slate-900/40 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">The Problem</span>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-white md:text-5xl">
              More Leads Don&apos;t Automatically Mean Better Prospects.
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Traditional sales tools focus on scraping massive volumes of stale contacts, leaving your sales team to guess which companies actually fit and why.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Irrelevant Lead Lists",
                desc: "Off-the-shelf databases flood your pipeline with companies that fail basic commercial, geographic, or service-model criteria.",
              },
              {
                title: "Black-Box Lead Scores",
                desc: "Generic numeric scores without observable website evidence or explainable reasoning leave reps with zero context.",
              },
              {
                title: "Misleading Verification",
                desc: "Tools confuse a domain’s mail-exchange (MX) ping with an active, deliverable inbox owned by the intended executive.",
              },
              {
                title: "Generic Automated Outreach",
                desc: "Unsupervised bulk-generated emails damage your domain reputation and insult high-value commercial prospects.",
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-blue-500/30 hover:bg-white/[0.04]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-400/10 text-amber-300">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 03: HOW SOVEREIGN WORKS ── */}
      <section id="how-it-works" className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">Structured Pipeline</span>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-white md:text-5xl">
              From Company Discovery to Human-Approved Outreach.
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Sovereign organizes your outbound workflow into eight clear, auditable stages. Every company recommendation is backed by observable evidence before any draft is queued.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Define Ideal Customer",
                desc: "Configure target sectors, geography, negative keyword exclusions, and commercial service models.",
              },
              {
                step: "02",
                title: "Discover Companies",
                desc: "Identify potential businesses matching target criteria using search queries and web presence signals.",
              },
              {
                step: "03",
                title: "Research Business Fit",
                desc: "Inspect website content, core service offerings, location signals, and evidence-supported observations.",
              },
              {
                step: "04",
                title: "Qualify the Prospect",
                desc: "Score company alignment against criteria; automatically log exact rejection reasons for out-of-market entities.",
              },
              {
                step: "05",
                title: "Research Contact Confidence",
                desc: "Distinguish verified decision-maker identities from inferred roles and unverified company mailboxes.",
              },
              {
                step: "06",
                title: "Prepare Personalised Outreach",
                desc: "Generate concise (45–90 word) outreach messages grounded in verified company observations.",
              },
              {
                step: "07",
                title: "Review Before Action",
                desc: "Inspect every message in your review queue. Edit copy, reassign recipients, approve, or reject.",
              },
              {
                step: "08",
                title: "Maintain Activity History",
                desc: "Retain available activity and decision history locally, tracking feedback and outreach progress.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-blue-500/30"
              >
                <span className="font-mono text-xs font-bold text-blue-400 tracking-wider block mb-3">{s.step}</span>
                <h3 className="font-serif text-lg text-white mb-2">{s.title}</h3>
                <p className="text-xs leading-relaxed text-slate-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 04: COMPANY INTELLIGENCE & EVIDENCE ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10 bg-slate-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">Account Validation</span>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-white md:text-5xl">
                Don&apos;t Just Collect Company Names. Understand the Business.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Sovereign evaluates company fit through observable website signals, matching services and operational parameters while subtracting penalties for conflicting branch data or missing details.
              </p>

              {/* Explainable Fit Scoring Box */}
              <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-3.5">
                  <div className="font-mono font-bold text-emerald-300">+30 Pts: Industry Match</div>
                  <p className="mt-1 text-slate-300">Verifiable core services align with target profile.</p>
                </div>
                <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-3.5">
                  <div className="font-mono font-bold text-emerald-300">+25 Pts: Location Signal</div>
                  <p className="mt-1 text-slate-300">Physical presence in targeted commercial zones.</p>
                </div>
                <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-3.5">
                  <div className="font-mono font-bold text-emerald-300">+20 Pts: B2B Model Fit</div>
                  <p className="mt-1 text-slate-300">Evidence of commercial client engagements.</p>
                </div>
                <div className="rounded-xl border border-rose-400/25 bg-rose-400/10 p-3.5">
                  <div className="font-mono font-bold text-rose-300">-15 Pts: Conflicting Data</div>
                  <p className="mt-1 text-slate-300">Deduction applied for contradictory branches.</p>
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-400 font-mono">
                Illustrative demonstration — not live prospect data. Scoring weights are customizable per ICP profile.
              </p>
            </div>

            {/* Visual Screenshot Card */}
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b1322] p-2 shadow-2xl">
                <button
                  type="button"
                  onClick={() => setZoomedShot(productScreenshots[1])}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#0e1726]"
                >
                  <Image
                    src={productScreenshots[1].src}
                    alt="Sovereign B2B Company Research and Account Qualification Interface"
                    width={1024}
                    height={600}
                    className="h-auto w-full transition duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg border border-white/15 bg-black/85 px-3.5 py-2 text-white backdrop-blur">
                    <span className="font-mono text-[10px] text-blue-300 uppercase tracking-wider">
                      Discovery Gate & Intent Filtering Preview
                    </span>
                    <MousePointerClick className="h-4 w-4 text-blue-400" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 05: CONTACT CONFIDENCE & EMAIL INTEGRITY ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">Data Integrity</span>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-white md:text-5xl">
              A Valid Domain Does Not Mean a Verified Person.
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              A domain with valid mail routing (MX) does not prove that an individual mailbox exists or belongs to the intended decision-maker. Sovereign explicitly classifies contact certainty into eight transparent tiers.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {confidenceStatuses.map((item) => (
              <div
                key={item.badge}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20"
              >
                <div>
                  <span className={`inline-block rounded-full border px-3 py-1 font-mono text-[11px] font-semibold ${item.color}`}>
                    {item.badge}
                  </span>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">{item.desc}</p>
                </div>
                <div className="mt-4 border-t border-white/5 pt-2 text-[10px] font-mono text-slate-400">
                  Application Data Model Status
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-500/[0.05] p-4 text-xs text-amber-200/90 leading-relaxed font-mono">
            <strong>Operating Safeguard:</strong> Sovereign never uses the word &quot;VERIFIED&quot; as a blanket label for contact records and does not guarantee 100% email deliverability.
          </div>
        </div>
      </section>

      {/* ── SECTION 06: PERSONALISED OUTREACH & HUMAN REVIEW ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10 bg-slate-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
            {/* Visual Screenshot of Inbound Copilot & Review */}
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b1322] p-2 shadow-2xl">
                <button
                  type="button"
                  onClick={() => setZoomedShot(productScreenshots[2])}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#0e1726]"
                >
                  <Image
                    src={productScreenshots[2].src}
                    alt="Sovereign Review & Outreach Workspace"
                    width={1024}
                    height={550}
                    className="h-auto w-full transition duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg border border-white/15 bg-black/85 px-3.5 py-2 text-white backdrop-blur">
                    <span className="font-mono text-[10px] text-blue-300 uppercase tracking-wider">
                      Human Review Queue & Personalised Outreach Verification
                    </span>
                    <MousePointerClick className="h-4 w-4 text-blue-400" />
                  </div>
                </button>
              </div>
            </div>

            {/* Narrative & Human Approval Gate */}
            <div className="order-1 lg:order-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">Human Approval Gate</span>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-white md:text-5xl">
                AI Does the Research. <br />
                <span className="italic text-white/80 font-light">You Make the Decision.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Outreach drafts are kept concise (45–90 words) and built around actual company observations. Every single draft is held in a review queue until an operator approves it.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>1 specific observation</strong> regarding the prospect company’s services or activity</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>1 relevant business implication</strong> addressing operational bottleneck or growth</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>1 concise, tailored offer</strong> explaining how your service provides value</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>1 low-friction closing inquiry</strong> with zero aggressive sales pressure</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300 font-mono">
                No silent auto-dispatch. Operators can edit text, swap contacts, approve, or reject drafts at will.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 07: ARCHITECTURE, SECURITY & INTEGRATIONS ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">System Architecture</span>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-white md:text-5xl">
              A Sales Workspace Designed Around Your Control.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Your prospect research, company records and outreach drafts are stored in a local SQLite workspace. Sensitive API credentials are protected using Windows DPAPI.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            {/* System Config Screenshot */}
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b1322] p-2 shadow-2xl">
                <button
                  type="button"
                  onClick={() => setZoomedShot(productScreenshots[3])}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#0e1726]"
                >
                  <Image
                    src={productScreenshots[3].src}
                    alt="Sovereign Sales Intelligence Configuration and Dynamic Targeting Rules"
                    width={1024}
                    height={500}
                    className="h-auto w-full transition duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg border border-white/15 bg-black/85 px-3.5 py-2 text-white backdrop-blur">
                    <span className="font-mono text-[10px] text-blue-300 uppercase tracking-wider">
                      Commercial Profiles, Negative Keywords & Local Security
                    </span>
                    <MousePointerClick className="h-4 w-4 text-blue-400" />
                  </div>
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-slate-400 leading-relaxed font-mono">
                <strong>Data Processing Disclosure:</strong> External AI, search, enrichment and email providers process relevant information when those services are used by the system.
              </div>
            </div>

            {/* Clear 3-Tier Integration Matrix */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.03] p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl text-white">Available in Current Build</h3>
                  <span className="rounded-full bg-emerald-400/20 border border-emerald-400/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300 uppercase">
                    Operational
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    SMTP email delivery and IMAP mailbox integration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Local SQLite Workspace Storage Engine (27 Structured Tables)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Native Windows DPAPI Secret Encryption Vault
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Supported LLM Model Providers (Groq, OpenAI) via User Keys
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-blue-400/30 bg-blue-400/[0.03] p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl text-white">In Active Development</h3>
                  <span className="rounded-full bg-blue-400/20 border border-blue-400/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-blue-300 uppercase">
                    Testing
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Advanced Local Web Evidence Extraction Pipelines
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Structured Data Export (CSV / JSON Pipeline Export)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Enhanced Live Lead Intelligence Logs & Rejection Audit
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl text-white">Planned / Under Evaluation</h3>
                  <span className="rounded-full bg-white/10 border border-white/20 px-2.5 py-0.5 text-[10px] font-mono text-slate-300 uppercase">
                    Roadmap
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-400 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    Apollo, Hunter.io & Snov.io Data Provider Connectors
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    HubSpot, Pipedrive & Zoho CRM Two-Way Sync
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    Zapier, Make.com & n8n Outbound Automation Webhooks
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 08: WHO IT IS FOR & DEVELOPMENT STATUS ── */}
      <section className="relative z-10 px-6 py-20 md:px-12 md:py-28 border-b border-white/10 bg-slate-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">Target Audience</span>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-white md:text-5xl">
              Built for Focused B2B Sales Research.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Engineered for companies selling high-value commercial services where reputation, accuracy, and human context matter.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.03] p-8">
              <h3 className="font-serif text-2xl text-emerald-300 mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Suitable Audiences
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-200 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>B2B service agencies & technical consultancies</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Corporate-services providers & business setup specialists</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Commercial interior fit-out, MEP & contracting firms</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Specialised software vendors & enterprise service firms</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Founders managing targeted outbound prospecting with human review</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-rose-400/25 bg-rose-400/[0.03] p-8">
              <h3 className="font-serif text-2xl text-rose-300 mb-6 flex items-center gap-3">
                <XCircle className="h-6 w-6 text-rose-400" /> Not Intended For
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Unsegmented mass-email spam campaigns</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Unrestricted personal-data scraping or privacy breaches</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Guaranteed-lead or guaranteed-revenue expectations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Automated LinkedIn connection abuse or account violations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Development Status Callout */}
          <div className="mt-12 rounded-2xl border border-white/15 bg-white/[0.03] p-8 text-center max-w-4xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">Product Availability</span>
            <h3 className="mt-2 font-serif text-2xl text-white">Private Development Build</h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Private Development Build. Private product walkthroughs and early-access evaluations are available by request. Commercial licensing terms will be announced following the pilot phase.
            </p>
            <p className="mt-4 text-xs text-slate-400">
              Looking for done-for-you B2B outbound or custom sales systems in Dubai? Explore our{" "}
              <Link href="/ai-lead-generation-agency-dubai" className="text-blue-400 underline hover:text-blue-300">
                AI Lead Generation Agency in Dubai
              </Link>{" "}
              and{" "}
              <Link href="/workflow-automation-uae" className="text-blue-400 underline hover:text-blue-300">
                Enterprise Workflow Automation across the UAE
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 09: FAQS & PRIVATE DEMO REQUEST FORM ── */}
      <section id="private-demo" className="relative z-10 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            {/* FAQ Column */}
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">Questions & Answers</span>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-white md:text-5xl mb-8">
                Frequently Asked Questions.
              </h2>

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
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-serif text-base md:text-lg text-white pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-blue-400 transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`px-5 pb-5 text-sm leading-relaxed text-slate-300 border-t border-white/5 pt-3 ${
                          isOpen ? "block" : "hidden"
                        }`}
                      >
                        {faq.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Private Demo Request Form */}
            <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 shadow-2xl md:p-10">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">Early Access</span>
              <h3 className="mt-1 font-serif text-3xl text-white">Request a Private Demo</h3>
              <p className="mt-2 text-sm text-slate-300">
                Connect with our commercial lead for a one-on-one walkthrough of the Sovereign research and qualification workspace.
              </p>

              <form onSubmit={handleFormSubmit} className="mt-8 space-y-4">
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asif Khan"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Technical Services"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Founder, Commercial Director"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Main Prospecting Challenge *
                  </label>
                  <select
                    required
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0e1726] px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select your primary challenge...</option>
                    <option value="Poor Lead Quality">Poor lead quality from existing databases</option>
                    <option value="Time-Consuming Research">Reps spending too much time on manual research</option>
                    <option value="Unverified Emails / Bounces">High email bounce rates and misleading contact data</option>
                    <option value="Generic Outreach Copy">Generic outreach producing low reply rates</option>
                    <option value="Need Human-Controlled Workflow">Want AI research but require strict human review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Additional Context (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your target market (e.g. UAE commercial contractors, UK logistics firms)..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-xs text-emerald-300 font-mono"
                    >
                      ✓ Request received. Our team will contact you within 24 hours to schedule your private Sovereign walkthrough.
                    </motion.div>
                  )}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-xs text-rose-300 font-mono"
                    >
                      {submitError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting Request...
                    </>
                  ) : (
                    <>
                      Request Private Walkthrough <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  By submitting, you agree to our{" "}
                  <Link href="/privacy-policy" className="text-blue-400 underline hover:text-blue-300">
                    Privacy Policy
                  </Link>
                  . Direct commercial communication only — no spam, ever.
                </p>
              </form>
            </div>
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
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-[#0b1322] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setZoomedShot(null)}
              className="absolute right-4 top-4 z-20 rounded-full bg-black/80 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur hover:bg-white hover:text-black transition"
            >
              Close
            </button>
            <div className="relative flex min-h-[260px] w-full items-center justify-center overflow-hidden bg-[#070d18] p-3 md:p-5 max-h-[72vh]">
              <Image
                src={zoomedShot.src}
                alt={zoomedShot.title}
                width={1920}
                height={1080}
                sizes="min(1120px, 94vw)"
                className="block h-auto w-auto max-h-[70vh] max-w-full rounded-xl object-contain"
                priority
              />
            </div>
            <div className="border-t border-white/10 px-6 py-4 bg-[#0b1322]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-blue-300">
                {zoomedShot.tag}
              </span>
              <h3 className="mt-1 font-serif text-xl text-white">{zoomedShot.title}</h3>
              <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-300">{zoomedShot.desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
