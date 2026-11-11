"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Database, ArrowRight, ShieldCheck, Cpu, 
  MessageSquare, Phone, CheckCircle, Server, Code, Settings,
  Check, AlertTriangle, HelpCircle, FileText, Clock, Users,
  Layers, ArrowUpRight, Zap, Target, DollarSign,
  Filter, Share2, Compass, Award, BarChart3, Bot, ChevronDown,
  Workflow, GitFork, KeyRound, SlidersHorizontal, CheckCircle2,
  Lock, RefreshCw, Smartphone, Mail, Building2, Briefcase
} from "lucide-react";
import Link from "next/link";
import { trackEvent } from "../utils/analytics";

export default function CustomCrmDevelopmentDubai() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Interactive Pipeline Configurator State
  const [leadSources, setLeadSources] = useState<string[]>(["WhatsApp Cloud API", "Website Forms", "Inbound Phone/Email"]);
  const [selectedIndustry, setSelectedIndustry] = useState<"fitout" | "trade" | "healthcare" | "services">("fitout");
  const [includeErpSync, setIncludeErpSync] = useState(true);
  const [includeDeDuplication, setIncludeDeDuplication] = useState(true);

  const toggleSource = (source: string) => {
    if (leadSources.includes(source)) {
      if (leadSources.length > 1) {
        setLeadSources(leadSources.filter(s => s !== source));
      }
    } else {
      setLeadSources([...leadSources, source]);
    }
  };

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "audit" | "contact", destinationUrl: string) => {
    // Anchor wa.me/whatsapp.com clicks are tracked globally in app/layout.tsx
    if (type === "whatsapp") return;
    const eventName = type === "audit" ? "audit_request_click" : "contact_click";

    trackEvent(eventName, {
      service_name: "Custom CRM Development Dubai",
      cta_location: ctaLocation,
      cta_text: ctaText,
      link_url: destinationUrl
    });
  };

  const industryProfiles = {
    fitout: {
      label: "Interior Fitout & Contracting",
      stages: ["Site Survey Request", "BOQ & Estimation", "Client Proposal", "Work in Progress", "Final Handover"],
      example: "Tracks client floorplans, subcontractor quotes, material approvals, and staged retention billing."
    },
    trade: {
      label: "Wholesale, Trade & Distribution",
      stages: ["Inbound RFQ", "Inventory Availability", "Commercial Quotation", "PO Confirmed", "Dispatch & Payment"],
      example: "Manages credit terms, bulk pricing tiers, delivery dispatch notes, and warehouse dispatch notifications."
    },
    healthcare: {
      label: "Private Clinics & Specialized Healthcare",
      stages: ["Patient Enquiry", "Consultation Booked", "Treatment Plan", "Procedure Completed", "Follow-up Care"],
      example: "Organizes practitioner calendars, consent documentation, medical history notes, and recurring care reminders."
    },
    services: {
      label: "Professional & Corporate Services",
      stages: ["Scope Discovery", "Engagement Letter", "Document Verification", "Execution Phase", "Annual Renewal"],
      example: "Manages trade license renewals, visa tracking, compliance deadlines, and recurring retainer invoicing."
    }
  };

  const faqs = [
    {
      q: "How does a custom CRM differ from off-the-shelf platforms like HubSpot, Salesforce, or Zoho?",
      a: "Off-the-shelf CRMs charge recurring per-user monthly licenses that scale quickly as teams grow, while forcing your business into rigid, predefined data schemas. A custom CRM is engineered around your exact operational steps, customer attributes, and approval gates. You avoid paying for unused features, eliminate per-seat licensing penalties, and maintain direct control over your database schemas and backend code."
    },
    {
      q: "How is this different from your Real Estate CRM solution?",
      a: "Our Real Estate CRM is purpose-built for property brokerages, off-plan developers, and Bayut/Property Finder portal integrations. In contrast, this custom CRM service is engineered for general B2B organizations—such as fitout contractors, wholesale trading firms, specialized clinics, and professional corporate service providers—who need tailored customer records, custom quotation pipelines, and bespoke internal workflows."
    },
    {
      q: "Can a custom CRM integrate directly with our WhatsApp business communications?",
      a: "Yes. When paired with the official Meta WhatsApp Business Cloud API, customer conversations, inquiry submissions, and automated notifications can be piped directly into customer profile cards. This gives your account managers and sales coordinators complete conversational history in one centralized timeline."
    },
    {
      q: "Who owns the database, software code, and infrastructure?",
      a: "We engineer client-owned solutions. Delivered applications can be deployed directly into your company's own cloud tenancy (such as AWS, Microsoft Azure, Supabase, or Vercel). Upon final milestone completion and settlement, full administrative access and source-code repository ownership are handed over to your organization."
    },
    {
      q: "Can the database be hosted in UAE cloud regions to meet local compliance standards?",
      a: "Yes. Custom databases and backend microservices can be provisioned in local UAE data centers—including AWS Middle East UAE (me-central-1 in Dubai/Abu Dhabi) or Microsoft Azure UAE North—to support compliance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL)."
    },
    {
      q: "Which third-party business tools and ERPs can you connect with?",
      a: "We engineer custom REST API and webhook middleware to sync with any platform providing accessible developer endpoints. Common integrations include ERP and accounting tools (such as Odoo, Zoho Books, SAP, QuickBooks, and Xero), payment processors (Stripe, Tap Payments), and corporate email services. Integration feasibility is verified during initial technical discovery based on your vendor's active subscription tier."
    },
    {
      q: "What does an indicative delivery timeline look like?",
      a: "Indicative project timelines typically range from 4 to 8 weeks depending on technical scope: Phase 1 focuses on data schema modeling and pipeline mapping (Week 1–2); Phase 2 on full-stack UI development and database setup (Weeks 3–5); Phase 3 on API middleware, data migration, and exception handling (Weeks 6–7); and Phase 4 on end-to-end user acceptance testing, team walkthroughs, and production handover (Week 8)."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-emerald-400/30 font-sans">
      
      {/* ── 1. Breadcrumbs ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 text-xs font-mono text-white/50 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-400 transition-colors">HOME</Link>
        <span>&gt;</span>
        <Link href="/services" className="hover:text-emerald-400 transition-colors">SERVICES</Link>
        <span>&gt;</span>
        <span className="text-white/90">CUSTOM CRM DEVELOPMENT DUBAI</span>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.08),transparent_45%)] pointer-events-none" />

        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 mb-6">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300 font-mono">
              B2B Sales Pipelines · Custom Database Architecture · Dubai, UAE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.08] mb-6">
            Custom CRM Development <br />
            <span className="italic text-white/50 font-light">&amp; Pipeline Engineering Dubai</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 font-light leading-relaxed mb-8 max-w-3xl">
            Eliminate per-seat software licensing bloat and disconnected customer spreadsheets. We engineer custom B2B CRM systems, multi-source lead pipelines, and database integrations tailored to your organization&apos;s specific sales, operations, and compliance requirements.
          </p>

          {/* Definition Clarification Card */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm text-left max-w-3xl mb-8">
            <div className="flex items-start gap-4">
              <Layers className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
              <div className="space-y-1.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-white/90">Engineered for General B2B Operations</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Unlike our specialized real estate CRM (which focuses strictly on property portals and off-plan inventory), this service is designed for UAE commercial enterprises—including interior contractors, wholesale traders, clinics, and professional firms—who require tailored customer records, custom quotation stages, and direct ERP/accounting synchronization. For teams that also require automated data flows between customer records and messaging channels, our CRM architecture connects directly with our <Link href="/ai-automation-agency-dubai" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 font-medium">custom AI automation services</Link> in Dubai.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/free-growth-audit"
              onClick={() => handleCTA("Request CRM Architecture Audit", "Hero", "audit", "/free-growth-audit")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/10"
            >
              Request Architecture Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20am%20interested%20in%20custom%20CRM%20development%20for%20our%20business%20in%20Dubai."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Discuss Scope on WhatsApp", "Hero", "whatsapp", "https://wa.me/971545866094")}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Discuss Scope on WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-white/50 tracking-wider font-mono mt-10">
            <span>✓ FULL REPOSITORY HANDOVER</span>
            <span>✓ UAE CLOUD REGION COMPATIBLE</span>
            <span>✓ ZERO PER-SEAT PRICING PENALTIES</span>
          </div>
        </div>
      </section>

      {/* ── 3. Interactive B2B Pipeline Configurator ── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">Interactive Demonstrator</span>
          <h2 className="text-3xl sm:text-4xl font-serif mb-4">Explore Tailored B2B Pipeline Architecture</h2>
          <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
            Select an industry vertical and system components to see how custom pipeline stages and data normalization replace fragmented spreadsheet tracking:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Column */}
          <div className="space-y-6 lg:col-span-1">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/90 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" /> Select Industry Vertical
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(industryProfiles) as (keyof typeof industryProfiles)[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedIndustry(key)}
                    className={`text-left px-4 py-3 rounded-xl border text-xs font-medium transition-all ${
                      selectedIndustry === key
                        ? "border-emerald-400/50 bg-emerald-500/10 text-white font-semibold"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20"
                    }`}
                  >
                    {industryProfiles[key].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/90 mb-3 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-emerald-400" /> Inbound Intake Channels
              </h3>
              {["WhatsApp Cloud API", "Website Forms", "Inbound Phone/Email", "Meta/Google Ads"].map((src) => (
                <label key={src} className="flex items-center gap-3 text-xs text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={leadSources.includes(src)}
                    onChange={() => toggleSource(src)}
                    className="w-4 h-4 rounded border-white/20 bg-black text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <span>{src}</span>
                </label>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/90 mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" /> Backend Middleware Modules
              </h3>
              <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDeDuplication}
                  onChange={(e) => setIncludeDeDuplication(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-black text-emerald-500 focus:ring-0"
                />
                <span>Automated Deduplication (E.164 phone + email)</span>
              </label>
              <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeErpSync}
                  onChange={(e) => setIncludeErpSync(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-black text-emerald-500 focus:ring-0"
                />
                <span>Two-Way ERP &amp; Invoicing Sync (REST Webhooks)</span>
              </label>
            </div>
          </div>

          {/* Architecture Visualization Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">Architecture Preview</span>
                  <h4 className="text-xl font-serif text-white">{industryProfiles[selectedIndustry].label} Pipeline</h4>
                </div>
                <span className="px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-[10px] font-mono text-emerald-300">
                  ACTIVE SPECIFICATION
                </span>
              </div>

              <p className="text-xs text-white/70 font-light mb-8 leading-relaxed">
                {industryProfiles[selectedIndustry].example}
              </p>

              {/* Pipeline Flow Steps */}
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">Stage Progression Hierarchy:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {industryProfiles[selectedIndustry].stages.map((stg, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-white/10 bg-black/40 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-2">
                        <span>STAGE 0{idx + 1}</span>
                        {idx === 0 && <span className="text-emerald-400">INBOUND</span>}
                        {idx === industryProfiles[selectedIndustry].stages.length - 1 && <span className="text-emerald-400">WON/SETTLED</span>}
                      </div>
                      <div className="text-xs font-semibold text-white/90">{stg}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Ingestion Summary */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-white/60">
                <div>
                  <span className="text-white/40 block mb-1">CONNECTED INTAKE CHANNELS:</span>
                  <div className="text-white/90">{leadSources.join(", ")}</div>
                </div>
                <div>
                  <span className="text-white/40 block mb-1">SYSTEM SAFEGUARDS:</span>
                  <div className="text-white/90">
                    {[
                      includeDeDuplication ? "Deduplication Active" : "Deduplication Disabled",
                      includeErpSync ? "ERP Webhook Listener Active" : "ERP Sync Disabled"
                    ].join(" · ")}
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Comparison Note */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.015] flex items-start gap-4 text-xs text-white/70 font-light leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-1">Data Isolation &amp; Security Boundary:</strong>
                All lead states, customer notes, and commercial values reside in your dedicated PostgreSQL relational database with encrypted connections (TLS 1.3). No customer records are shared across multi-tenant pools or monetized by third-party SaaS vendors.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Core Capabilities Grid ── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">Technical Foundations</span>
          <h2 className="text-3xl sm:text-4xl font-serif mb-4">Engineered For Operational Durability</h2>
          <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
            Every custom CRM deployment is architected with modern software engineering principles, avoiding fragile no-code workarounds:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.015] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white">Relational Database Schemas</h3>
            <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
              Built on PostgreSQL and Prisma ORM with structured entity relationships between organizations, individual contacts, deal stages, and line-item quotations.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.015] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white">Granular Role-Based Access</h3>
            <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
              Define custom permissions for sales representatives, branch coordinators, estimators, and finance directors. Sales reps only see their assigned pipeline deals.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.015] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white">WhatsApp &amp; Multi-Channel Webhooks</h3>
            <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
              Direct webhook listeners ingest inbound messages, form submissions, and email inquiries into normalized lead records in seconds, avoiding manual copy-paste errors.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.015] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white">Two-Way Accounting Synchronization</h3>
            <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
              When a deal stage moves to &quot;Won&quot;, our webhook middleware can automatically create draft invoices or customer records in supported accounting systems.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.015] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white">UAE Cloud Tenancy Options</h3>
            <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
              Infrastructure can be deployed within local UAE data centers (AWS UAE me-central-1 or Azure UAE North) to support client-specific data handling and compliance policies.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.015] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white">Client-Owned Codebase</h3>
            <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
              Delivered applications are handed over to your organization&apos;s private Git repository upon project completion. You retain complete ownership of your business software.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Delivery Framework & Scoping Notice ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">Project Scoping</span>
              <h3 className="text-2xl font-serif text-white">Indicative Deployment Framework</h3>
            </div>
            <div className="text-xs font-mono text-white/50">
              TYPICAL DURATION: <span className="text-white font-semibold">4 TO 8 WEEKS</span> (BASED ON SCOPE)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-white/70 font-light">
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <div className="font-mono text-emerald-400 text-[10px] uppercase">WEEKS 1–2</div>
              <div className="text-white font-semibold text-sm">Schema &amp; Workflow Discovery</div>
              <p>Mapping custom data entities, user roles, pipeline stages, and verifying third-party API documentation.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <div className="font-mono text-emerald-400 text-[10px] uppercase">WEEKS 3–5</div>
              <div className="text-white font-semibold text-sm">Frontend UI &amp; Database Setup</div>
              <p>Engineering Next.js responsive Kanban views, customer timeline cards, and PostgreSQL relational schemas.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <div className="font-mono text-emerald-400 text-[10px] uppercase">WEEKS 6–7</div>
              <div className="text-white font-semibold text-sm">API Middleware &amp; Sync</div>
              <p>Implementing webhook endpoints, deduplication algorithms, and two-way sync with your communication tools.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <div className="font-mono text-emerald-400 text-[10px] uppercase">WEEK 8</div>
              <div className="text-white font-semibold text-sm">UAT &amp; Repository Handover</div>
              <p>Team walkthrough sessions, administrative credentials handover, and production cloud launch.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-white/50">
            * Note: Timelines vary based on data migration volume from legacy systems, third-party vendor API permissions, and client review cycles.
          </div>
        </div>
      </section>

      {/* ── 6. FAQ Accordion ── */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto border-b border-white/5">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Common Questions</span>
          <h2 className="text-3xl sm:text-4xl font-serif">Frequently Asked Questions</h2>
          <p className="text-sm md:text-base text-white/70 font-light">
            Architectural, operational, and commercial questions regarding custom CRM development:
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-2xl bg-white/[0.015] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-sm md:text-base text-white/90">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-emerald-400 shrink-0 transition-transform duration-300 ${
                    activeFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeFaq === index && (
                <div className="px-6 pb-6 text-xs md:text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Contextual Cross-Discipline Navigation ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/services/web-development-dubai-uae"
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.015] hover:border-emerald-400/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-2">Adjacent Engineering</span>
              <h4 className="text-base font-serif text-white group-hover:text-emerald-300 transition-colors">Custom Web &amp; Portal Development</h4>
              <p className="text-xs text-white/60 font-light mt-2 leading-relaxed">
                Explore our full-stack Next.js web application architecture and secure client portals.
              </p>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 mt-4">
              <span>View Web Engineering</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/ai-automation-agency-dubai"
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.015] hover:border-emerald-400/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-2">Automation Workflows</span>
              <h4 className="text-base font-serif text-white group-hover:text-emerald-300 transition-colors">AI Automation Agency Dubai</h4>
              <p className="text-xs text-white/60 font-light mt-2 leading-relaxed">
                Connect your CRM to backend ERPs, document extraction engines, and operational bots.
              </p>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 mt-4">
              <span>Explore Automation Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/real-estate-crm-dubai"
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.015] hover:border-emerald-400/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-2">PropTech Specialization</span>
              <h4 className="text-base font-serif text-white group-hover:text-emerald-300 transition-colors">Real Estate CRM &amp; Lead Routing</h4>
              <p className="text-xs text-white/60 font-light mt-2 leading-relaxed">
                Review our dedicated brokerage CRM with Bayut &amp; Property Finder portal integrations.
              </p>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 mt-4">
              <span>View PropTech CRM</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ── 8. Final Call to Action ── */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">
          Ready to Build a CRM Tailored to Your Business Workflow?
        </h2>
        <p className="text-white/70 font-light text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
          Request a technical consultation with our engineering team to review your current lead sources, database requirements, and pipeline stages.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/free-growth-audit"
            onClick={() => handleCTA("Request Consultation - Bottom", "Bottom Banner", "audit", "/free-growth-audit")}
            className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/10"
          >
            <span>Request Technical Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20we%20want%20to%20discuss%20a%20custom%20CRM%20project."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCTA("WhatsApp Principal - Bottom", "Bottom Banner", "whatsapp", "https://wa.me/971545866094")}
            className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:bg-white/5 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
