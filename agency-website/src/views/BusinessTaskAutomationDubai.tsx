"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, CheckCircle2, ChevronRight, 
  HelpCircle, Layers, MessageSquare, Shield, 
  Sparkles, Target, Zap, BarChart3, Database, 
  PhoneCall, Cpu, FileText, Building, Users,
  Workflow, GitBranch, ArrowDown, Lock,
  Clock, AlertTriangle, TrendingUp, Calculator,
  ArrowUpRight, Sparkle, Globe, Briefcase, Phone,
  X, ExternalLink
} from "lucide-react";
import { trackEvent } from "../utils/analytics";

const PLATFORM_BRANDS = [
  { name: "OpenAI", mark: "OAI" },
  { name: "Google Cloud", mark: "G" },
  { name: "Meta Ads", mark: "MAds" },
  { name: "WhatsApp", mark: "WA" },
  { name: "Next.js", mark: "N" },
  { name: "Vercel", mark: "V" },
  { name: "n8n", mark: "n8n" },
  { name: "Zapier", mark: "Z" },
  { name: "Shopify", mark: "S" },
  { name: "WooCommerce", mark: "Woo" },
  { name: "Stripe", mark: "St" },
  { name: "HubSpot", mark: "H" },
  { name: "Zoho CRM", mark: "Z" },
  { name: "Twilio", mark: "Tw" },
  { name: "Microsoft Azure", mark: "AZ" }
];

export interface AutomationWorkflow {
  id: string;
  label: string;
  title: string;
  desc: string;
  friction: string;
  steps: string[];
  stack: string[];
  hours: string;
  deepDiveUrl?: string;
  deepDiveLabel?: string;
  whatsappMessage: string;
}

const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: "lead-capture",
    label: "Instant Qualification",
    title: "Lead Capture & Instant Dispatch",
    desc: "Connect Meta, Google, and portal forms directly to your sales team's WhatsApp in under 15 seconds. Route leads by territory, ping Slack, and greet hot buyers before competitors respond.",
    friction: "Copying names and numbers manually from ad managers into spreadsheets; sales reps messaging leads hours or days later when buyer intent has cooled.",
    steps: [
      "Inbound ad form or website inquiry triggers an encrypted webhook within 500 milliseconds.",
      "Middleware deduplicates contact, creates an active CRM deal record (HubSpot/Zoho), and assigns ownership.",
      "An automated personalized WhatsApp greeting is dispatched while an urgent mobile alert pings the on-duty broker."
    ],
    stack: ["Meta Graph API", "Google Ads Webhooks", "WhatsApp Cloud API", "HubSpot / Zoho CRM"],
    hours: "8 - 12 hrs / week",
    deepDiveUrl: "/ai-chatbots-dubai",
    deepDiveLabel: "View WhatsApp AI Hub",
    whatsappMessage: "Hi Asif, I want to automate our ad lead capture and instant WhatsApp sales dispatch."
  },
  {
    id: "invoice-extraction",
    label: "Financial Operations",
    title: "Invoice & Receipt Data Extraction",
    desc: "AI OCR reads supplier bills, payment receipts, and VAT tax invoices directly from WhatsApp and email, populating draft entries in Zoho Books, Xero, or QuickBooks without manual typing.",
    friction: "Accountants spending hours manually typing line items, TRN numbers, and invoice totals from crumpled receipt photos or messy PDF attachments into accounting platforms.",
    steps: [
      "Staff or suppliers forward bills and receipts via WhatsApp or dedicated billing inbox.",
      "Computer vision AI parses supplier names, TRN tax IDs, itemized lines, and 5% VAT figures with 99%+ accuracy.",
      "Draft invoice is automatically staged in your accounting software with original image attached for 1-click accountant reconciliation."
    ],
    stack: ["Vision AI / OCR", "n8n Private Engine", "Zoho Books / QuickBooks", "FTA Tax Validation"],
    hours: "6 - 10 hrs / week",
    deepDiveUrl: "/services/agentic-finance-uae",
    deepDiveLabel: "View AI Finance Services",
    whatsappMessage: "Hi Asif, I want to automate invoice data extraction and receipt bookkeeping for our company."
  },
  {
    id: "payment-chasers",
    label: "Cash Flow & Compliance",
    title: "Payment Chasers & Expiry Tracking",
    desc: "Automate overdue invoice follow-ups, tenancy renewals, and trade license expiries with polite, scheduled WhatsApp reminders featuring secure 1-click payment links.",
    friction: "Awkward manual phone calls to clients chasing late payments, or facing heavy UAE fines due to overlooked trade license or visa expiry dates.",
    steps: [
      "Pipeline monitors ERP/accounting due dates and flags pending balances 7 days before maturity.",
      "Dispatches courteous, automated WhatsApp notices with breakdown summary and direct online payment links.",
      "Automatically halts reminder sequences the instant payment clears or marks records for executive review if overdue past 14 days."
    ],
    stack: ["WhatsApp Business API", "Stripe / Payment Gateway", "ERP Webhooks", "Cron Schedulers"],
    hours: "4 - 6 hrs / week",
    deepDiveUrl: "/products/expirywatch",
    deepDiveLabel: "Explore ExpiryWatch™ Product",
    whatsappMessage: "Hi Asif, I want to automate overdue invoice payment follow-ups and renewal reminders."
  },
  {
    id: "executive-digest",
    label: "Executive Intelligence",
    title: "Daily 8:00 AM Executive Digest",
    desc: "Wake up to a consolidated morning briefing on WhatsApp: yesterday's ad spend, new enquiries, cash collected, and key pipeline updates compiled automatically from multiple portals.",
    friction: "Leadership logging into 4 disparate portals (Stripe, Meta Ads, Google Analytics, CRM) every evening or waiting on manual staff end-of-day reports.",
    steps: [
      "Nightly automated cron job extracts revenue, ad spend, and deal activity across all platforms at 02:00 AM.",
      "Data pipeline aggregates blended CAC, daily cash collections, and lead volume against monthly commercial targets.",
      "A clean, formatted 10-line executive briefing is delivered directly to the CEO's personal WhatsApp sharp at 08:00 AM."
    ],
    stack: ["Private n8n Microservice", "Stripe API", "Meta & Google Ads API", "WhatsApp Cloud API"],
    hours: "4 - 5 hrs / week",
    whatsappMessage: "Hi Asif, I want to set up an automated 8:00 AM Executive Digest on WhatsApp for our leadership team."
  },
  {
    id: "instant-quotations",
    label: "Commercial Speed",
    title: "Instant Branded Quotations",
    desc: "Enable sales reps to generate clean, approved PDF proposals on their mobile phones during client meetings in under 60 seconds, syncing directly with your CRM deal stage.",
    friction: "Sales reps waiting until they return to office to open desktop Word/Excel templates, causing delay while competitor quotes land first.",
    steps: [
      "Sales rep inputs 3 project parameters (scope, units, discount tier) via quick mobile form or WhatsApp command.",
      "Cloud generation engine applies approved rate cards, computes VAT, and renders a high-resolution branded PDF proposal.",
      "Contract PDF is sent directly to the client's WhatsApp and automatically logged to the CRM deal record."
    ],
    stack: ["Headless PDF Engine", "WhatsApp Cloud API", "CRM Deal Sync", "Cloudflare Storage"],
    hours: "5 - 8 hrs / week",
    whatsappMessage: "Hi Asif, I want to equip our sales team with instant mobile quotation generation."
  },
  {
    id: "custom-workflows",
    label: "Bespoke Architecture",
    title: "Custom Cross-Software Workflows",
    desc: "Have legacy ERPs, custom SQL databases, or proprietary multi-step verification protocols? We architect custom API bridges, webhooks, and private n8n pipelines around your exact operational rules.",
    friction: "Siloed legacy software forcing staff to act as human middleware—manually exporting CSVs from one system and importing them into another.",
    steps: [
      "Detailed operational discovery auditing your exact data models, software APIs, and compliance boundaries.",
      "Engineering a dedicated, private automation pipeline with end-to-end encryption and UAE PDPL compliance.",
      "Deployment in an isolated staging sandbox with comprehensive error-handling and automated alert notifications."
    ],
    stack: ["Custom REST/GraphQL APIs", "Self-Hosted n8n", "PostgreSQL / Supabase", "Enterprise Webhooks"],
    hours: "Bespoke Scope",
    whatsappMessage: "Hi Asif, I have a custom cross-software workflow I want to discuss automating."
  }
];

export default function BusinessTaskAutomationDubai() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<AutomationWorkflow | null>(null);

  // Calculator State
  const [teamMembers, setTeamMembers] = useState<number>(3);
  const [weeklyRepetitiveHours, setWeeklyRepetitiveHours] = useState<number>(8);
  const [automationPercent, setAutomationPercent] = useState<number>(50);
  const [monthlySalary, setMonthlySalary] = useState<number>(6500);

  const teamMembersId = useId();
  const weeklyHoursId = useId();
  const automationPercentId = useId();
  const salaryId = useId();

  // Calculations
  const hourlyRate = Math.round(monthlySalary / (22 * 8)); // ~176 working hours per month
  const totalAnnualHours = teamMembers * weeklyRepetitiveHours * 50;
  const hoursSavedAnnual = Math.round(totalAnnualHours * (automationPercent / 100));
  const payrollValueSaved = Math.round(hoursSavedAnnual * hourlyRate);

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "consultation") => {
    trackEvent(type === "whatsapp" ? "whatsapp_click" : "consultation_click", {
      service_name: "Business Task Automation Dubai",
      cta_location: ctaLocation,
      cta_text: ctaText
    });
  };

  const faqs = [
    {
      q: "What types of manual business tasks can you automate?",
      a: "We specialize in operational tasks involving repetitive data movement between software: syncing leads from ads to your CRM, extracting invoice details from emails or WhatsApp into accounting platforms, sending automated payment and renewal notifications, compiling cross-platform reports, and generating instant customer proposals."
    },
    {
      q: "Do we need to replace our existing software or CRM?",
      a: "No. Our approach connects to the tools you already use—such as Zoho, HubSpot, QuickBooks, Xero, Google Sheets, Meta Ads, and WhatsApp Business API. We build secure integration pipelines using modern middleware (like n8n or custom API microservices) so your team keeps their familiar interfaces."
    },
    {
      q: "How does the Task Efficiency Estimator calculate savings?",
      a: "The calculator multiplies the number of team members by their reported weekly hours spent on manual administrative tasks and standard UAE hourly rates. Industry benchmarks show well-engineered automations typically recover 40% to 70% of this time. These figures represent an indicative operational estimate based on your inputs, rather than a contractual guarantee."
    },
    {
      q: "How do you ensure data security and UAE PDPL compliance?",
      a: "All automated workflows are built with role-based access controls, encrypted API connections, and customer-owned credentials. We avoid public AI training on proprietary client data and design workflows aligned with UAE Personal Data Protection Law (PDPL) requirements."
    },
    {
      q: "What is the typical deployment timeline for a business automation project?",
      a: "Most single-system or two-system automations (such as automated lead ingestion or invoice parsing) go live within 2 to 3 weeks, including sandbox testing, error-handling validation, and team training."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-emerald-500/30 font-sans">
      
      {/* 1. Breadcrumb */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/50 font-mono">
        <Link href="/" className="hover:text-green-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/30">&gt;</span>
        <Link href="/services" className="hover:text-green-400 transition-colors">SERVICES</Link>
        <span className="mx-2 text-white/30">&gt;</span>
        <span className="text-white/90">BUSINESS TASK AUTOMATION DUBAI</span>
      </div>

      {/* 2. Hero Section - Strictly Matching Authentic Live Site Styling */}
      <section className="relative z-10 px-6 md:px-12 pt-12 pb-20 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        {/* Authentic Live Site Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>BUSINESS TASK AUTOMATION & WORKFLOWS IN THE UAE</span>
        </div>

        {/* Authentic Playfair Display Serif Headline - Unified 2-Line Structure */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.5vw] font-serif font-bold leading-[1.14] tracking-tight mb-6 drop-shadow-2xl max-w-6xl mx-auto">
          <span className="inline-block sm:whitespace-nowrap">Automate Repetitive Business Tasks,</span> <br className="hidden md:inline" />
          <span className="italic text-white/70 tracking-normal font-light inline-block sm:whitespace-nowrap">Built to Eliminate Operational Waste.</span>
        </h1>

        {/* Supporting Proposition */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 font-normal max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-md">
          Asif Digital Agency replaces manual copy-pasting, delayed WhatsApp follow-ups, repetitive invoice data entry, and spreadsheet maintenance with resilient, error-free automated workflows engineered for UAE businesses.
        </p>

        {/* Primary & Secondary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center mb-10">
          <a
            href="#calculator"
            className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            <span>ESTIMATE YOUR HOURS SAVED</span>
            <ArrowDown className="w-4 h-4 text-black" />
          </a>
          <a
            href="https://wa.me/971545866094?text=Hello%20Asif%20Digital,%20I%20want%20to%20automate%20repetitive%20tasks%20in%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCTA("Discuss On WhatsApp", "Hero", "whatsapp")}
            className="border border-white/20 text-white/90 px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
          >
            <span>DISCUSS ON WHATSAPP</span>
            <MessageSquare className="w-4 h-4 text-green-400" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-white/70">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>Next.js & API Microservices</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>Sub-second Lead Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>Bilingual AR / EN</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>UAE PDPL Compliant</span>
          </div>
        </div>
      </section>

      {/* 3. Technology Integration Marquee (Live Animated Continuous Ticker) */}
      <section className="py-10 border-y border-white/5 bg-black/40 overflow-hidden relative" aria-label="Supported Integrations">
        <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-1">
            Integrated Ecosystem
          </span>
          <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Platforms and middleware we connect natively to eliminate manual data entry.
          </p>
        </div>

        <div className="brand-marquee" role="region" aria-label="Technology platforms used by Asif Digital">
          <div className="brand-marquee-track">
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="brand-marquee-set" aria-hidden={setIndex === 1}>
                {PLATFORM_BRANDS.map((brand) => (
                  <div key={`${setIndex}-${brand.name}`} className="brand-marquee-item" title={brand.name}>
                    <span className="brand-marquee-mark" aria-hidden="true">{brand.mark}</span>
                    <span>{brand.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Automation Modules (With Interactive Workflow Details Panel) */}
      <section className="px-6 md:px-12 py-20 sm:py-28 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
              Start Here
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white">
              Pick the fastest path to eliminate manual toil.
            </h2>
          </div>
          <p className="text-white/75 text-base sm:text-lg max-w-xl leading-relaxed">
            Click any module below to inspect the step-by-step technical architecture, tools used, and deployment timeline before contacting our team.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUTOMATION_WORKFLOWS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedWorkflow(item)}
              className="group relative text-left p-7 sm:p-8 rounded-[1.75rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-green-400/40 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            >
              <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-green-400 mb-3 block">
                  {item.label}
                </span>
                <h3 className="text-2xl sm:text-[1.65rem] font-serif text-white mb-3 leading-snug group-hover:text-green-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/80 text-base leading-relaxed mb-6 font-normal">
                  {item.desc}
                </p>

                {/* Subtle Metric Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-white/40 uppercase">Typical Recovery:</span>
                  <span className="text-green-400 font-semibold">{item.hours}</span>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/5 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white/70 group-hover:text-green-300 transition-colors">
                Inspect Workflow <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Contextual Link to AI Automation Agency */}
        <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-white/70 font-light">
            Looking for production-grade pipelines connecting your CRM, ERP, and customer channels? Explore our dedicated <Link href="/ai-automation-agency-dubai" className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4">AI automation and systems integration</Link> services in Dubai.
          </p>
          <Link href="/ai-automation-agency-dubai" className="text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 shrink-0">
            View Automation Services <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. Interactive Workflow Details Modal / Slide-over Drawer */}
      {selectedWorkflow && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedWorkflow(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 sm:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedWorkflow(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-2 font-mono">
              {selectedWorkflow.label}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4 pr-10">
              {selectedWorkflow.title}
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
              {selectedWorkflow.desc}
            </p>

            {/* Friction Solved */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-1">
                Friction This Replaces:
              </span>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {selectedWorkflow.friction}
              </p>
            </div>

            {/* Step-by-Step Architecture */}
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90 block mb-3 font-mono">
                How The Automation Runs (End-to-End)
              </span>
              <div className="space-y-3">
                {selectedWorkflow.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 font-mono font-bold text-xs flex items-center justify-center mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrated Stack */}
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-2">
                Connected Software & Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedWorkflow.stack.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/75">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center">
              <a
                href={`https://wa.me/971545866094?text=${encodeURIComponent(selectedWorkflow.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTA(`Modal WhatsApp: ${selectedWorkflow.title}`, "Workflow Modal", "whatsapp")}
                className="w-full sm:w-auto flex-1 bg-white hover:bg-white/90 text-black px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <span>DISCUSS THIS WORKFLOW ON WHATSAPP</span>
                <MessageSquare className="w-4 h-4 text-green-600" />
              </a>

              {selectedWorkflow.deepDiveUrl && (
                <Link
                  href={selectedWorkflow.deepDiveUrl}
                  className="w-full sm:w-auto border border-white/20 hover:border-green-400/50 hover:bg-white/5 text-white/90 px-5 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>{selectedWorkflow.deepDiveLabel || "READ FULL GUIDE"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-green-400" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. Interactive ROI & Capacity Estimator (Strictly Matching Home.tsx RoiCalculator) */}
      <section id="calculator" className="relative z-20 py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#050505]">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
            Operational Capacity Planning
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white mb-4">
            Human Team & Automation: <span className="italic text-white/60 font-light">Model Your Capacity.</span>
          </h2>
          <p className="text-white/75 text-base sm:text-lg leading-relaxed">
            Input your team size and hours spent on manual administrative tasks to see an indicative projection of time and payroll efficiency recovered through automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sliders (7 Cols) */}
          <div className="lg:col-span-7 p-7 sm:p-10 rounded-[1.75rem] border border-white/10 bg-white/[0.02] space-y-8">
            
            {/* Input 1 */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor={teamMembersId} className="text-sm sm:text-base uppercase tracking-wider font-bold text-white/90">
                  1. Team Members Performing Manual Admin Tasks
                </label>
                <div className="flex items-baseline gap-1.5 font-mono">
                  <span className="text-2xl sm:text-3xl font-serif text-white font-bold">{teamMembers}</span>
                  <span className="text-xs sm:text-sm text-white/60">people</span>
                </div>
              </div>
              <input
                id={teamMembersId}
                type="range"
                min="1"
                max="25"
                step="1"
                value={teamMembers}
                onChange={(e) => setTeamMembers(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
              />
            </div>

            {/* Input 2 */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor={weeklyHoursId} className="text-sm sm:text-base uppercase tracking-wider font-bold text-white/90">
                  2. Repetitive Manual Hours per Week (per Person)
                </label>
                <div className="flex items-baseline gap-1.5 font-mono">
                  <span className="text-2xl sm:text-3xl font-serif text-white font-bold">{weeklyRepetitiveHours}</span>
                  <span className="text-xs sm:text-sm text-white/60">hrs / wk</span>
                </div>
              </div>
              <input
                id={weeklyHoursId}
                type="range"
                min="2"
                max="25"
                step="1"
                value={weeklyRepetitiveHours}
                onChange={(e) => setWeeklyRepetitiveHours(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
              />
            </div>

            {/* Input 3 */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor={automationPercentId} className="text-sm sm:text-base uppercase tracking-wider font-bold text-white/90">
                  3. Estimated Repetitive Workload Handled by Automation
                </label>
                <div className="flex items-baseline gap-1.5 font-mono">
                  <span className="text-2xl sm:text-3xl font-serif text-green-400 font-bold">{automationPercent}%</span>
                  <span className="text-xs sm:text-sm text-white/60">workload</span>
                </div>
              </div>
              <input
                id={automationPercentId}
                type="range"
                min="20"
                max="80"
                step="5"
                value={automationPercent}
                onChange={(e) => setAutomationPercent(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
              />
              <div className="flex justify-between text-xs font-mono text-white/60 font-medium mt-1.5">
                <span>20% (Basic Sync)</span>
                <span>50% (Standard Workflows)</span>
                <span>80% (Deep Integrations)</span>
              </div>
            </div>

            {/* Input 4 */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor={salaryId} className="text-sm sm:text-base uppercase tracking-wider font-bold text-white/90">
                  4. Average Monthly Staff Compensation (AED)
                </label>
                <div className="flex items-baseline gap-1.5 font-mono">
                  <span className="text-2xl sm:text-3xl font-serif text-white font-bold">AED {monthlySalary.toLocaleString()}</span>
                  <span className="text-xs sm:text-sm text-white/60">/ mo</span>
                </div>
              </div>
              <input
                id={salaryId}
                type="range"
                min="3000"
                max="25000"
                step="500"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
              />
            </div>
          </div>

          {/* Results Summary (5 Cols) */}
          <div className="lg:col-span-5 p-7 sm:p-10 rounded-[1.75rem] border border-green-400/30 bg-white/[0.03] flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
                Indicative Annual Value Recovered
              </span>
              
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-white/60 block font-mono">Reclaimed Team Time</span>
                <div className="text-4xl sm:text-5xl font-serif text-green-400 font-bold mt-1">
                  ~{hoursSavedAnnual.toLocaleString()} <span className="text-xl sm:text-2xl font-sans text-white/70 font-normal">hrs / yr</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-white/60 block font-mono">Equivalent Payroll Capacity Recaptured</span>
                <div className="text-4xl sm:text-5xl font-serif text-white font-bold mt-1">
                  AED {payrollValueSaved.toLocaleString()}
                </div>
              </div>

              <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-6">
                *Indicative operational planning estimate based on user inputs. Not a contractual guarantee. Real recovery varies by process complexity and adoption.
              </p>
            </div>

            <a
              href="https://wa.me/971545866094?text=Hi%20Asif,%20I%20used%20your%20Automation%20Calculator%20and%20want%20to%20audit%20our%20business%20workflows."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("WhatsApp Calculator Follow-up", "Calculator Output", "whatsapp")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>AUDIT YOUR WORKFLOWS</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. Step-by-Step Implementation Protocol */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
            Implementation Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white mb-4">
            How We Automate Your Operations
          </h2>
          <p className="text-white/75 text-base sm:text-lg leading-relaxed">
            A controlled, three-step methodology engineered to eliminate errors, safeguard client data, and preserve team continuity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "Process Audit & Friction Mapping",
              desc: "We analyze where your staff spends repetitive hours: copy-pasting spreadsheet fields, delayed messaging, or manual billing entry."
            },
            {
              num: "02",
              title: "Resilient Pipeline Engineering",
              desc: "We architect webhooks, middleware pipelines (n8n/APIs), and error-recovery routines connecting your software seamlessly."
            },
            {
              num: "03",
              title: "Sandbox Validation & Staff Training",
              desc: "We test workflows across edge cases, ensure full UAE PDPL data compliance, and train your team on monitoring."
            }
          ].map((step, i) => (
            <div key={i} className="p-7 sm:p-8 rounded-[1.75rem] border border-white/10 bg-white/[0.02] flex flex-col justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-serif text-green-400 font-bold block mb-4">
                  {step.num}
                </span>
                <h3 className="text-xl font-serif text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="px-6 md:px-12 py-20 max-w-5xl mx-auto border-t border-white/5" aria-labelledby="faq-heading">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
            Clear Answers
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/75 text-base sm:text-lg">
            Practical answers about automating your business workflows with Asif Digital Agency.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden">
              <summary className="p-6 sm:p-8 cursor-pointer list-none flex justify-between items-center hover:bg-white/[0.04] transition-colors">
                <span className="text-lg sm:text-xl md:text-2xl font-serif text-white pr-4 leading-snug">
                  {faq.q}
                </span>
                <ChevronRight className="w-5 h-5 text-white/50 group-open:rotate-90 transition-transform flex-shrink-0" />
              </summary>
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-white/80 font-normal leading-relaxed text-base sm:text-lg border-t border-white/5 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 9. High-Contrast Final Call To Action */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-white text-neutral-950 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 bg-neutral-950 rounded-full flex items-center justify-center text-white shadow-2xl">
            <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" />
          </div>
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight mb-6 leading-tight text-neutral-950">
            Ready to eliminate manual <br />
            <span className="italic font-light text-neutral-700">operational toil?</span>
          </h2>

          <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Speak directly with Asif Digital Agency. We will review your recurring business tasks, identify quick automation wins, and outline a clear implementation plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <a
              href="https://wa.me/971545866094?text=Hello%20Asif%20Digital,%20I%20would%20like%20to%20schedule%20a%20business%20automation%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Final CTA WhatsApp", "Bottom Banner", "whatsapp")}
              className="w-full sm:w-auto bg-neutral-950 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3 shadow-2xl"
            >
              <span>CONNECT ON WHATSAPP</span>
              <MessageSquare className="w-4 h-4 text-green-400" />
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto border border-neutral-300 text-neutral-900 px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-100 transition-colors flex items-center justify-center gap-3"
            >
              <span>SCHEDULE CONSULTATION</span>
              <ArrowRight className="w-4 h-4 text-neutral-950" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
