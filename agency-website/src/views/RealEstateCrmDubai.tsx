"use client";

import { motion } from "framer-motion";
import { 
  Building, ArrowRight, ShieldCheck, Cpu, 
  MessageSquare, Phone, CheckCircle, Server, Code, Settings,
  Check, AlertTriangle, HelpCircle, FileText, Clock, Users,
  Database, Layers, ArrowUpRight, Zap, Target, DollarSign,
  Filter, Share2, Compass, Award, BarChart3, Bot, ChevronDown, Calendar
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { trackEvent } from "../utils/analytics";

export default function RealEstateCrmDubai() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "phone" | "consultation", destinationUrl: string) => {
    let eventName = "whatsapp_click";
    if (type === "phone") eventName = "phone_click";
    if (type === "consultation") eventName = "consultation_click";

    trackEvent(eventName, {
      service_name: "Real Estate CRM Dubai",
      cta_location: ctaLocation,
      cta_text: ctaText,
      link_url: destinationUrl
    });
  };

  const handleFaq = (index: number, question: string) => {
    if (activeFaq !== index) {
      trackEvent("faq_expand", {
        service_name: "Real Estate CRM Dubai",
        cta_text: question
      });
    }
    setActiveFaq(activeFaq === index ? null : index);
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.asifdigital.agency/real-estate-crm-dubai#webpage",
        "url": "https://www.asifdigital.agency/real-estate-crm-dubai",
        "name": "Real Estate CRM Dubai | Lead Routing, WhatsApp & Portal Automation",
        "isPartOf": { "@id": "https://www.asifdigital.agency/#website" },
        "breadcrumb": { "@id": "https://www.asifdigital.agency/real-estate-crm-dubai#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.asifdigital.agency/real-estate-crm-dubai#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.asifdigital.agency"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Real Estate AI Hub",
            "item": "https://www.asifdigital.agency/real-estate"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Real Estate CRM Dubai",
            "item": "https://www.asifdigital.agency/real-estate-crm-dubai"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.asifdigital.agency/real-estate-crm-dubai#service",
        "name": "Real Estate CRM & Lead Automation for Dubai Agencies",
        "description": "Custom real estate CRM and lead automation for Dubai agencies. Fast portal lead capture, automated WhatsApp response, agent routing SLAs, and deal pipelines.",
        "provider": { "@id": "https://www.asifdigital.agency/#organization" }
      },
      {
        "@type": "Organization",
        "@id": "https://www.asifdigital.agency/#organization",
        "name": "Asif Digital",
        "url": "https://www.asifdigital.agency/",
        "logo": "https://www.asifdigital.agency/images/asif-digital-ad-mark.png",
        "telephone": "+971 54 586 6094",
        "email": "hello@asifdigital.agency"
      }
    ]
  };

  const comparisonData = [
    {
      workflow: "Portal Lead Capture",
      manual: "Agents receive notification emails, manually open them, and paste details into spreadsheets or personal WhatsApps after hours.",
      automated: "Automated intake relays (email parsing and webhook connectors) capture lead data in under 5 seconds into the central CRM."
    },
    {
      workflow: "Speed-to-Lead Response",
      manual: "First contact happens anywhere from 45 minutes to the next business day, after the buyer has already inquired on competitor listings.",
      automated: "Instant bilingual WhatsApp outreach triggers immediately, acknowledging the specific property reference code and asking qualification questions."
    },
    {
      workflow: "Lead Distribution & SLA",
      manual: "Leads are dumped into shared group chats or manually handed out, with zero visibility into who called or followed up.",
      automated: "Rules-based routing matches language and community specialization, with configurable escalation rules for unanswered leads (e.g. after 10 minutes)."
    },
    {
      workflow: "Deal & Viewing Tracking",
      manual: "Managers must hold weekly interrogations to find out if viewings took place or if clients were lost.",
      automated: "Structured deal stages (Inquiry ➔ Qualified ➔ Viewing Booked ➔ Offer ➔ Form F Milestone ➔ DLD Settlement Tracking) track agency transaction milestones automatically."
    },
    {
      workflow: "Commission & Milestone Splits",
      manual: "Commission calculations sit in fragmented spreadsheets, causing disputes between internal agents, external brokers, and agency owners.",
      automated: "Built-in transaction milestone tracking automatically calculates agent splits, developer payout stages, and referral commissions."
    }
  ];

  const targetAudiences = [
    {
      title: "Dubai Brokerage Agencies",
      desc: "Licensed agencies running secondary and off-plan sales teams that need clear pipeline transparency and guaranteed agent follow-up."
    },
    {
      title: "Off-Plan Project Sales Teams",
      desc: "Specialized brokerages generating hundreds of paid ad leads weekly that require instant WhatsApp qualification and developer brochure delivery."
    },
    {
      title: "Boutique Real Estate Firms",
      desc: "Founder-led agencies looking to operate with enterprise-grade speed-to-lead and structured pipeline discipline without hiring full-time CRM admins."
    },
    {
      title: "Agency Sales Directors & Team Leads",
      desc: "Leaders who require real-time visibility into agent response times, lead decay rates, and active deal negotiations across their floor."
    }
  ];

  const faqs = [
    {
      q: "How does portal lead intake work with Bayut and Property Finder?",
      a: "Depending on your agency's account configuration, we configure automated ingestion via official CRM connectors, portal email notification parsing, or webhook relays. Leads are extracted instantly—including property reference, budget, and buyer phone number—and ingested into your CRM without manual data entry."
    },
    {
      q: "Can we use our existing CRM, or do you provide a new one?",
      a: "Both options are supported. If your agency already uses HubSpot, Salesforce, Zoho, or Propertybase, we build the automation and WhatsApp layer directly on top of your existing database. If you do not have a CRM, we configure a streamlined, real-estate-specific pipeline from scratch."
    },
    {
      q: "How does the 10-minute lead escalation work?",
      a: "We configure custom SLA rules tailored to your team. For example, if a high-intent portal lead is assigned to an agent and not opened or updated within 10 minutes, an automated notification alerts the sales manager or transfers the lead to the next available agent."
    },
    {
      q: "Is customer data protected under UAE laws?",
      a: "Yes. Our architecture is designed with UAE PDPL-aligned data handling, access controls, and customer-owned credentials. You retain 100% ownership of your CRM database, WhatsApp Business API accounts, and client communication records."
    },
    {
      q: "What is the typical deployment timeline?",
      a: "Typical deployments take 2 to 4 weeks for core lead capture, WhatsApp qualification, and agent routing workflows. Complex multi-branch brokerages or extensive historical data migrations can require longer."
    },
    {
      q: "Does the CRM submit documents directly to the Dubai Land Department (DLD)?",
      a: "No. The CRM provides internal workflow and milestone tracking for your agency—tracking Form F signing dates, NOC follow-ups, trustee appointment schedules, and commission splits. Official conveyancing, legal contracts, and property registrations are handled directly by your licensed brokers and official DLD Trustee offices."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* Hidden Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* ── 1. Breadcrumb ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/" className="hover:text-emerald-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <Link href="/real-estate" className="hover:text-emerald-400 transition-colors">REAL ESTATE AI HUB</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95">REAL ESTATE CRM DUBAI</span>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 bg-white/5 border border-white/10 text-emerald-400 text-[13px] font-bold uppercase tracking-[0.3em] rounded-full mb-6 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Dubai Real Estate CRM &amp; Automation
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.12] tracking-tight mb-6">
            Real Estate CRM &amp; Lead Automation <br className="hidden md:inline" />
            <span className="italic text-white/60 font-light tracking-normal">for Dubai Agencies</span>
          </h1>
          <p className="text-[17px] md:text-[19px] leading-[1.7] text-white/80 max-w-3xl mx-auto mb-10 font-sans font-light">
            Connect Bayut, Property Finder, and campaign leads into an automated intake pipeline. Trigger instant WhatsApp qualification, enforce agent response SLAs, and track agency deal milestones from viewing through to DLD trustee appointments and commission payouts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link 
              href="/free-growth-audit"
              onClick={() => handleCTA("Audit Consultation", "Hero Primary CTA", "consultation", "/free-growth-audit")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-emerald-100 transition-all flex items-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              Book CRM Workflow Audit <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20setting%20up%20a%20real%20estate%20CRM%20and%20lead%20automation%20for%20our%20Dubai%20agency." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Hero Secondary CTA", "whatsapp", "https://wa.me/971545866094")}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-3 h-[52px] font-sans"
            >
              Talk to Us on WhatsApp <MessageSquare className="w-4 h-4 text-emerald-400" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[13px] text-white/70 tracking-wider font-mono">
            <span>✓ BAYUT &amp; PROPERTY FINDER INTAKE</span>
            <span>✓ SUB-60S WHATSAPP SPEED-TO-LEAD</span>
            <span>✓ CONFIGURABLE AGENT SLAs</span>
          </div>
        </motion.div>
      </section>

      {/* ── 3. Direct-Answer Block / Executive Definition ── */}
      <section className="px-6 md:px-12 py-10 max-w-4xl mx-auto text-left">
        <div className="p-8 md:p-12 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-3xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Executive Summary</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif mb-4 text-white">What is a Real Estate CRM for Dubai Agencies?</h2>
          <p className="text-[17px] md:text-[18px] leading-[1.75] text-white/95 font-sans font-light mb-6">
            A Dubai real estate CRM connects incoming property portal and campaign leads into an automated intake pipeline, triggering instant WhatsApp first contact, qualifying buyer budgets and areas, and routing verified opportunities to agents under strict SLA rules while tracking internal deal milestones through Form F negotiations, DLD trustee appointments, and commission payouts (the CRM tracks internal agency deal stages; all formal legal filings and registrations remain handled by licensed brokers and government trustee offices).
          </p>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-white/75 font-sans font-light">
            Asif Digital engineers these operational CRM systems for Dubai brokerages and sales teams to eliminate lead decay, stop manual spreadsheet tracking, and ensure every buyer inquiry receives immediate, professional attention.
          </p>
        </div>
      </section>

      {/* ── 4. The Speed-to-Lead Problem in Dubai Real Estate ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">The Commercial Reality</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">Why Standard CRMs Fail Dubai Real Estate Teams</h2>
          <p className="mt-4 text-white/70 text-base leading-relaxed">
            Dubai property buyers rarely wait. If an investor inquires on a 2-bedroom in Downtown or Dubai Hills and does not hear back within 5 minutes, they click the next listing on Property Finder or Bayut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 border border-white/10 bg-black/40 rounded-2xl">
            <div className="text-red-400 text-xs font-mono font-bold uppercase mb-3">Bottleneck 01</div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">Severe Lead Decay</h3>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              Portal leads sit in email inboxes for hours. By the time an agent picks up the phone, the buyer has already booked a viewing with a competing broker.
            </p>
          </div>
          <div className="p-7 border border-white/10 bg-black/40 rounded-2xl">
            <div className="text-red-400 text-xs font-mono font-bold uppercase mb-3">Bottleneck 02</div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">Unqualified Time Waste</h3>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              Top-producing agents spend 40% of their workday filtering window-shoppers, wrong numbers, and out-of-budget inquiries that should have been pre-qualified automatically.
            </p>
          </div>
          <div className="p-7 border border-white/10 bg-black/40 rounded-2xl">
            <div className="text-red-400 text-xs font-mono font-bold uppercase mb-3">Bottleneck 03</div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">Zero Follow-up Visibility</h3>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              Agency owners invest tens of thousands of dirhams in portal subscriptions, but cannot track whether leads were actually called, toured, or abandoned.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. The 6-Stage Dubai CRM Architecture ── */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">End-to-End Pipeline</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">The Complete Dubai Agency CRM Architecture</h2>
            <p className="mt-4 text-white/70 text-base leading-relaxed">
              From the millisecond an inquiry arrives on a property portal to the final commission settlement at the DLD Trustee office.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Stage 1 */}
            <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1 uppercase">Stage 01</span>
                <h3 className="text-xl font-serif font-bold mb-3">Portal Lead Intake</h3>
                <p className="text-sm text-white/70 leading-relaxed font-light mb-4">
                  Ingests leads instantly from Property Finder, Bayut, Dubizzle, website forms, and Meta lead generation ads via notification parsing and webhook connectors.
                </p>
              </div>
              <div className="text-xs text-white/50 font-mono pt-4 border-t border-white/10">
                Ingestion Latency: &lt; 5 seconds
              </div>
            </div>

            {/* Stage 2 */}
            <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1 uppercase">Stage 02</span>
                <h3 className="text-xl font-serif font-bold mb-3">Instant WhatsApp Speed-to-Lead</h3>
                <p className="text-sm text-white/70 leading-relaxed font-light mb-4">
                  Sends an automated bilingual WhatsApp greeting mentioning the exact unit reference code, offering floor plans, payment breakdowns, and immediate assistance.
                </p>
              </div>
              <div className="text-xs text-white/50 font-mono pt-4 border-t border-white/10">
                First Contact: &lt; 60 seconds
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Filter className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1 uppercase">Stage 03</span>
                <h3 className="text-xl font-serif font-bold mb-3">Buyer Pre-Qualification</h3>
                <p className="text-sm text-white/70 leading-relaxed font-light mb-4">
                  Conversational assistant extracts buyer criteria: budget range, cash vs mortgage readiness, off-plan vs ready preference, and intended move-in or investment timeline.
                </p>
              </div>
              <div className="text-xs text-white/50 font-mono pt-4 border-t border-white/10">
                Lead Scoring: Hot / Warm / Unqualified
              </div>
            </div>

            {/* Stage 4 */}
            <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1 uppercase">Stage 04</span>
                <h3 className="text-xl font-serif font-bold mb-3">Agent Routing &amp; Response SLA</h3>
                <p className="text-sm text-white/70 leading-relaxed font-light mb-4">
                  Distributes qualified leads to designated area specialists (Downtown, Dubai Hills, Palm Jumeirah) with configurable escalation rules for unanswered leads (e.g. after 10 minutes).
                </p>
              </div>
              <div className="text-xs text-white/50 font-mono pt-4 border-t border-white/10">
                SLA Rule: 10-Min Escalation Re-route
              </div>
            </div>

            {/* Stage 5 */}
            <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1 uppercase">Stage 05</span>
                <h3 className="text-xl font-serif font-bold mb-3">Viewing &amp; Offer Pipeline</h3>
                <p className="text-sm text-white/70 leading-relaxed font-light mb-4">
                  Tracks viewing confirmations, location pin dispatches, feedback notes, token deposits, and formal Form B / Form F negotiations inside the shared agency pipeline.
                </p>
              </div>
              <div className="text-xs text-white/50 font-mono pt-4 border-t border-white/10">
                Calendar &amp; Location WhatsApp Sync
              </div>
            </div>

            {/* Stage 6 */}
            <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1 uppercase">Stage 06</span>
                <h3 className="text-xl font-serif font-bold mb-3">Commission &amp; Settlement Tracking</h3>
                <p className="text-sm text-white/70 leading-relaxed font-light mb-4">
                  Tracks internal agency milestones including DLD Trustee appointment dates, NOC collection progress, developer commission tranches, and agent splits (the system tracks operational deal milestones; official property registrations and legal conveyancing are completed through Dubai Land Department trustee centers).
                </p>
              </div>
              <div className="text-xs text-white/50 font-mono pt-4 border-t border-white/10">
                Full Payout &amp; Tax Invoice Audit
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. Comparison Table: Traditional CRM vs Automated Dubai Real Estate CRM ── */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Operational Benchmark</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">Traditional Agency CRM vs. Automated System</h2>
          <p className="mt-4 text-white/70 text-base leading-relaxed">
            A clear comparison of how automated lead intake and WhatsApp routing protect your agency's paid advertising budget.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-white font-mono text-xs uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-5">Operational Stage</th>
                <th className="p-5 text-white/60">Traditional Agency Setup</th>
                <th className="p-5 text-emerald-400">Automated Dubai Real Estate CRM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              {comparisonData.map((row) => (
                <tr key={row.workflow} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 font-semibold text-white font-sans">{row.workflow}</td>
                  <td className="p-5 text-white/60 leading-relaxed">{row.manual}</td>
                  <td className="p-5 text-white/90 leading-relaxed font-sans">{row.automated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. Mid-Page Contextual CTA ── */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <div className="p-8 md:p-12 border border-white/10 bg-white/[0.02] rounded-3xl">
          <h2 className="text-2xl md:text-4xl font-serif mb-4">Want to see how many leads your agency is losing to delay?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Schedule a 20-minute lead flow discovery session. We will audit your current portal intake process and show you where inquiries are stalling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/free-growth-audit"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-emerald-100 transition-all flex items-center gap-3 h-[50px]"
            >
              Book CRM Workflow Audit <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20audit%20our%20agency%20CRM%20and%20speed-to-lead%20flow." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-3 h-[50px]"
            >
              Talk to Us on WhatsApp <MessageSquare className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. Supported Integrations & Database Architecture ── */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Tech Stack Connectivity</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight mb-6">
              Integrates with Your Preferred CRM &amp; Software
            </h2>
            <p className="text-base text-white/80 leading-relaxed font-light mb-6">
              Whether your agency operates on an enterprise CRM, specialized real estate software, or a bespoke database, our automation serves as the real-time speed layer that powers lead intake and WhatsApp messaging.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 bg-black/40 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">HubSpot &amp; Salesforce</h4>
                <p className="text-xs text-white/65 leading-relaxed">Direct two-way webhook sync with custom deal stages and owner assignments.</p>
              </div>
              <div className="p-4 border border-white/10 bg-black/40 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">Zoho &amp; Propertybase</h4>
                <p className="text-xs text-white/65 leading-relaxed">Custom field mapping for UAE property reference codes and listing IDs.</p>
              </div>
              <div className="p-4 border border-white/10 bg-black/40 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">Custom SQL &amp; Supabase</h4>
                <p className="text-xs text-white/65 leading-relaxed">Private self-hosted agency databases for maximum data sovereignty.</p>
              </div>
              <div className="p-4 border border-white/10 bg-black/40 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">WhatsApp Cloud API</h4>
                <p className="text-xs text-white/65 leading-relaxed">Official Meta Business API connection with verified green badge eligibility.</p>
              </div>
            </div>
          </div>

          <div className="p-8 border border-white/10 bg-black rounded-3xl space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">Dubai Lead Pipeline Status</h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">Active Relay</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-white/5 rounded-xl flex justify-between items-center">
                <span className="text-white/70">Bayut Lead Relay:</span>
                <span className="text-emerald-400 font-bold">Ingested in 1.8s</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl flex justify-between items-center">
                <span className="text-white/70">Property Finder Relay:</span>
                <span className="text-emerald-400 font-bold">Ingested in 2.1s</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl flex justify-between items-center">
                <span className="text-white/70">WhatsApp First Touch:</span>
                <span className="text-emerald-400 font-bold">Dispatched in 14s</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl flex justify-between items-center">
                <span className="text-white/70">Broker SLA Status:</span>
                <span className="text-emerald-400 font-bold">Claimed (3m 12s)</span>
              </div>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-sans pt-2 border-t border-white/5">
              *Designed with UAE PDPL-aligned data handling, access controls, and customer-owned credentials.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. Who This Is For ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Qualified Operators</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">Who This CRM System is Built For</h2>
          <p className="mt-4 text-white/70 text-base leading-relaxed">
            We work with real estate brokerages and property marketing companies in Dubai looking to streamline lead distribution and accelerate sales cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetAudiences.map((aud, i) => (
            <div key={aud.title} className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-3">0{i+1}</span>
                <h3 className="text-lg font-bold text-white mb-2 font-sans">{aud.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed font-light">{aud.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. Implementation Process & Pricing Factors ── */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Rollout Methodology</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight mb-6">
              Deployment Timeline
            </h2>
            <p className="text-base text-white/75 leading-relaxed font-light mb-8">
              Typical deployments take 2–4 weeks for core workflows; complex multi-branch setups can require longer.
            </p>
            <div className="space-y-4">
              {[
                { phase: "Week 1", title: "Discovery & Portal Audit", desc: "Map lead sources (Bayut, Property Finder, Meta ads) and agent roster routing rules." },
                { phase: "Week 2", title: "CRM Pipeline & Relay Setup", desc: "Configure lead ingestion parsers, custom deal stages, and WhatsApp qualification prompts." },
                { phase: "Week 3", title: "Agent SLA & Escalation Testing", desc: "Simulate inbound inquiries, test round-robin distribution, and verify 10-minute escalation alerts." },
                { phase: "Week 4", title: "Go-Live & Supervised Optimization", desc: "Deploy live with agent floor training, active delivery monitoring, and commission tracking setup." }
              ].map((step) => (
                <div key={step.phase} className="p-4 border border-white/10 bg-black/40 rounded-xl flex gap-4 items-start">
                  <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 mt-1">{step.phase}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-xs text-white/65 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Commercial Clarity</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight mb-6">
              Transparent Pricing Factors
            </h2>
            <p className="text-base text-white/75 leading-relaxed font-light mb-8">
              Setup investments depend on real technical architecture, not arbitrary monthly markups:
            </p>
            <div className="space-y-4">
              <div className="p-6 border border-white/10 bg-black/40 rounded-2xl">
                <h4 className="text-base font-semibold text-white mb-2">1. Active Agent &amp; Seat Count</h4>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  A boutique office with 5 brokers has different routing and permission structures than an agency floor of 60 agents across sales and leasing.
                </p>
              </div>
              <div className="p-6 border border-white/10 bg-black/40 rounded-2xl">
                <h4 className="text-base font-semibold text-white mb-2">2. CRM Integration Depth</h4>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  Deploying a turnkey cloud CRM pipeline is faster than migrating historical deal logs and syncing two-way APIs with legacy enterprise databases.
                </p>
              </div>
              <div className="p-6 border border-white/10 bg-black/40 rounded-2xl">
                <h4 className="text-base font-semibold text-white mb-2">3. Custom SLA &amp; Commission Logic</h4>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  Advanced multi-tier commission splits, developer milestone tracking, and complex multi-language qualification require tailored workflow configurations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Connected UAE Real Estate Technology Ecosystem ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Topical Ecosystem</span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight">Part of the Asif Digital Real Estate Suite</h2>
          <p className="mt-3 text-white/70 text-base leading-relaxed">
            Our Dubai real estate CRM integrates directly with our broader ecosystem of specialized property agency tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Real Estate Digital Solutions",
              href: "/real-estate-digital-solutions-uae",
              desc: "Complete agency web platforms, custom broker sites, and listing sync tools."
            },
            {
              title: "Broker AI Copilot Dubai",
              href: "/real-estate/broker-ai-copilot-dubai",
              desc: "Instant WhatsApp co-pilot for off-plan inventory search and brochure generation."
            },
            {
              title: "AI Property Management",
              href: "/ai-property-management-uae",
              desc: "Tenant intake, maintenance request triage, and lease renewal automation."
            },
            {
              title: "Portal Lead Integration",
              href: "/real-estate/portal-lead-integration-dubai",
              desc: "Dedicated portal webhook relays and attribution tracking for agency directors."
            }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-emerald-400/40 hover:bg-white/[0.05] transition-all group flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-serif font-semibold text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {link.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">{link.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                Explore Solution <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 12. FAQ Section ── */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Common Inquiries</span>
          <h2 className="text-3xl md:text-5xl font-serif">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-white/[0.015] rounded-2xl p-6">
              <button
                className="w-full text-left text-lg md:text-xl font-serif flex justify-between items-center hover:text-emerald-300 transition-colors"
                onClick={() => handleFaq(i, faq.q)}
              >
                <span>{faq.q}</span>
                <span className="text-emerald-400 text-2xl font-mono">{activeFaq === i ? "−" : "+"}</span>
              </button>
              {activeFaq === i && (
                <p className="mt-4 text-white/75 font-light leading-relaxed text-sm md:text-base border-t border-white/10 pt-4 font-sans">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 13. Final CTA Block ── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-6xl font-serif tracking-tight mb-6">
            Stop Losing Portal Leads <br />
            <span className="italic text-black/55 font-light tracking-normal">to Slow Follow-Up.</span>
          </h2>
          <p className="text-black/70 font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-sans">
            Schedule a 20-minute agency workflow discovery call. We will review your current portal lead flow and show you how to automate instant qualification and agent routing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/free-growth-audit"
              onClick={() => handleCTA("Audit Consultation", "Final CTA Block", "consultation", "/free-growth-audit")}
              className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              Book CRM Workflow Audit <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20setting%20up%20a%20real%20estate%20CRM%20for%20our%20Dubai%20agency." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Final CTA Block", "whatsapp", "https://wa.me/971545866094")}
              className="bg-transparent text-black border border-black/25 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center justify-center gap-3 h-[52px] font-sans"
            >
              WhatsApp Us <MessageSquare className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 14. Ecosystem Footer Strip ── */}
      <div className="py-6 bg-black border-t border-white/5 text-center text-xs tracking-wider text-white/70 font-mono">
        <Link href="/real-estate" className="hover:text-emerald-400 transition-colors mx-3">Real Estate AI Hub</Link>
        <span className="text-white/20">|</span>
        <Link href="/real-estate-digital-solutions-uae" className="hover:text-emerald-400 transition-colors mx-3">Real Estate Digital Solutions</Link>
        <span className="text-white/20">|</span>
        <Link href="/ai-property-management-uae" className="hover:text-emerald-400 transition-colors mx-3">AI Property Management</Link>
        <span className="text-white/20">|</span>
        <Link href="/real-estate/broker-ai-copilot-dubai" className="hover:text-emerald-400 transition-colors mx-3">Broker AI Copilot</Link>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0ced]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-4 md:hidden font-sans">
        <a 
          href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20setting%20up%20a%20real%20estate%20CRM%20for%20our%20Dubai%20agency."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCTA("Sticky WhatsApp Mobile", "Sticky Footer", "whatsapp", "https://wa.me/971545866094")}
          className="flex-1 bg-[#25d366] text-white text-center font-bold uppercase tracking-wider text-[10px] py-3 rounded-xl flex items-center justify-center gap-2 h-11 font-sans"
        >
          <MessageSquare className="w-4 h-4" /> WhatsApp Us
        </a>
        <Link 
          href="/free-growth-audit"
          onClick={() => handleCTA("Sticky Audit Mobile", "Sticky Footer", "consultation", "/free-growth-audit")}
          className="flex-1 bg-white text-black text-center font-bold uppercase tracking-wider text-[10px] py-3 rounded-xl flex items-center justify-center gap-2 h-11 font-sans"
        >
          Book Audit
        </Link>
      </div>

    </div>
  );
}
