"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code,
  Database,
  Globe,
  HeadphonesIcon,
  HelpCircle,
  KeyRound,
  Layers,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Network,
  Phone,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Workflow,
  Zap
} from "lucide-react";

export default function RealEstatePillarHubView() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the scope of AI and automation for UAE real estate companies?",
      a: "AI and automation in the UAE property market spans three primary operational layers: front-office customer engagement (instant WhatsApp qualification and off-plan matching), mid-office sales operations (portal lead ingestion, CRM routing SLAs, and broker copilot replies), and back-office management (property management triage, lease renewals, and listing XML syndication). Asif Digital designs connected architectures across all three domains."
    },
    {
      q: "How are the different real estate technology modules divided at Asif Digital?",
      a: "We maintain distinct, specialized operational modules to prevent fragmented systems: our Agency Hub handles lead qualification and broker SLAs; our Real Estate CRM manages portal capture and deal pipelines; our Property Management system automates tenant requests and lease administration; and our Digital Solutions division engineers custom brokerage websites and portal feed infrastructure."
    },
    {
      q: "How does property lead data flow from portals into our CRM and WhatsApp?",
      a: "When an inquiry arrives from Bayut, Property Finder, Dubizzle, or paid ads, our API webhook listeners capture the lead payload within seconds. The system logs the record in your CRM, matches the inquired property, assigns the appropriate broker based on language or territory rules, and triggers an automated, personalized WhatsApp confirmation to engage the buyer instantly."
    },
    {
      q: "Can these systems integrate with our existing property software (PropSpace, Zoho, Salesforce)?",
      a: "Yes. We engineer modular API and webhook adapters that interface with leading industry platforms including PropSpace, Zoho CRM, Salesforce, HubSpot, and custom internal SQL databases, ensuring new automation layers synchronize cleanly without disrupting existing operational records."
    },
    {
      q: "How is investor and tenant data protected under UAE PDPL regulations?",
      a: "All data architectures are designed in accordance with UAE Federal Decree-Law No. 45 (PDPL). We deploy on regional private cloud infrastructure (such as Azure UAE North or AWS Middle East) where required, enforce least-privilege API authentication, and ensure client property records and transaction logs are never used to train external public language models."
    },
    {
      q: "What is the recommended roadmap for a UAE brokerage adopting AI automation?",
      a: "Most brokerages begin with high-velocity lead intake (portal webhook ingestion and automated WhatsApp qualification to stop lead leakage), followed by CRM pipeline automation and broker routing rules. Once front-line lead velocity is stabilized, organizations expand into broker productivity tools, interactive command dashboards, and back-office listing syndication."
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-400/30 pt-24">
      
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "AI for Real Estate UAE - Asif Digital",
              "url": "https://www.asifdigital.agency/real-estate",
              "serviceType": "Enterprise Real Estate AI & Automation Architecture",
              "provider": {
                "@type": "Organization",
                "name": "Asif Digital Agency",
                "url": "https://www.asifdigital.agency"
              },
              "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
              "description": "Enterprise AI and automation systems for UAE real estate companies. Explore agency workflow automation, specialized CRM routing, property management AI, and portal integrations."
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
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
                  "name": "Real Estate AI UAE",
                  "item": "https://www.asifdigital.agency/real-estate"
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            }
          ])
        }}
      />

      {/* ── 1. Hero Section: True Broad Pillar Hub ── */}
      <section className="relative px-6 pt-12 pb-20 md:pt-20 md:pb-28 max-w-6xl mx-auto overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono tracking-widest text-emerald-400 uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Pillar Hub • UAE Real Estate Technology</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.12] text-white">
            AI &amp; Automation for Real Estate Companies in the UAE
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
            A unified technological foundation connecting agency lead response, specialized CRM pipelines, property management workflows, and digital brokerage infrastructure across Dubai and the UAE.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition shadow-lg shadow-white/10 text-sm"
            >
              <span>Request Sector Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 transition text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct Real Estate Desk (+971 54 586 6094)</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Four Core Specialized Real Estate Hubs (Spokes) ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Specialist Architecture</span>
          <h2 className="text-2xl md:text-4xl font-serif">Core Real Estate Operational Modules</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Real estate operations require purpose-built systems. Select a dedicated discipline to explore specialized architecture, features, and workflows:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Spoke 1: Agency Operations Hub */}
          <Link
            href="/ai-real-estate-agencies-dubai"
            className="group p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Workflow className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Commercial Brokerage Operations</span>
              <h3 className="text-2xl font-serif text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>AI for Real Estate Agencies Dubai</span>
                <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Empowering Dubai property brokerages with automated conversational WhatsApp qualification, viewing scheduling assistance, multilingual buyer dialogues, and agent workflow acceleration.
              </p>
              <ul className="space-y-2 text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Automated Conversational WhatsApp Intake</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Buyer Budget &amp; Area Qualification</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Automated Viewing Coordination</li>
              </ul>
            </div>
            <span className="mt-6 text-xs font-mono text-emerald-400 group-hover:underline">Explore Agency Operations &rarr;</span>
          </Link>

          {/* Spoke 2: Real Estate CRM Hub (Frozen Asset Link) */}
          <Link
            href="/real-estate-crm-dubai"
            className="group p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400">Sales Pipeline &amp; Routing</span>
              <h3 className="text-2xl font-serif text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>Real Estate CRM Dubai</span>
                <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Specialized real estate CRM engineering: automated Bayut and Property Finder lead ingestion, round-robin broker routing rules, speed-to-lead SLA enforcement, and deal pipeline visibility.
              </p>
              <ul className="space-y-2 text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Bayut &amp; Property Finder Webhook Sync</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Agent Response SLA Enforcement</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Closed-Loop Pipeline Analytics</li>
              </ul>
            </div>
            <span className="mt-6 text-xs font-mono text-blue-400 group-hover:underline">Explore Real Estate CRM &rarr;</span>
          </Link>

          {/* Spoke 3: Property Management AI Hub (Frozen Asset Link) */}
          <Link
            href="/ai-property-management-uae"
            className="group p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400">Tenancy &amp; Asset Operations</span>
              <h3 className="text-2xl font-serif text-white group-hover:text-purple-400 transition-colors flex items-center justify-between">
                <span>AI Property Management UAE</span>
                <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Operational automation for property management companies and asset managers: automated tenant maintenance triage, Ejari contract renewals, rent collection alerts, and vendor dispatch with human sign-off.
              </p>
              <ul className="space-y-2 text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Tenant WhatsApp Maintenance Intake</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Ejari &amp; Lease Renewal Reminders</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Human-Governed Vendor Scheduling</li>
              </ul>
            </div>
            <span className="mt-6 text-xs font-mono text-purple-400 group-hover:underline">Explore Property Management &rarr;</span>
          </Link>

          {/* Spoke 4: Digital Solutions & Infrastructure Hub */}
          <Link
            href="/real-estate-digital-solutions-uae"
            className="group p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Web &amp; Technology Infrastructure</span>
              <h3 className="text-2xl font-serif text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                <span>Real Estate Digital Solutions UAE</span>
                <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Customer-facing technology infrastructure: high-speed Next.js brokerage websites, interactive community search engines, automated XML portal listing feeds, and custom developer off-plan showcase hubs.
              </p>
              <ul className="space-y-2 text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Sub-Second Headless Property Websites</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Automated XML Listing Feeds (Bayut/PF)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Dynamic Developer Off-Plan Hubs</li>
              </ul>
            </div>
            <span className="mt-6 text-xs font-mono text-cyan-400 group-hover:underline">Explore Digital Solutions &rarr;</span>
          </Link>

        </div>
      </section>

      {/* ── 3. Four Feature Spokes (Tooling & Capabilities) ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Specialized Capabilities</span>
          <h2 className="text-2xl md:text-4xl font-serif">Feature Sub-Systems &amp; Integrations</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Deep technical components engineered to integrate with your broader real estate operations:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature 1: AI Lead Dashboard */}
          <Link
            href="/real-estate/ai-lead-dashboard"
            className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
                AI Lead Dashboard
              </h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Multi-channel ad attribution tagging (Meta, Google, Portals), live Kanban deal stages, and HOT/WARM/COLD intent scoring.
              </p>
            </div>
            <span className="mt-4 text-xs font-mono text-emerald-400 group-hover:underline">View Dashboard &rarr;</span>
          </Link>

          {/* Feature 2: Broker AI Copilot */}
          <Link
            href="/real-estate/broker-ai-copilot-dubai"
            className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                Broker AI Co-Pilot
              </h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                1-click mobile suggested replies on WhatsApp, broker SLA response trackers, and automated client handover workflows.
              </p>
            </div>
            <span className="mt-4 text-xs font-mono text-blue-400 group-hover:underline">View Co-Pilot &rarr;</span>
          </Link>

          {/* Feature 3: Portal Lead Integration */}
          <Link
            href="/real-estate/portal-lead-integration-dubai"
            className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <Network className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                Portal Lead Webhooks
              </h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Sub-second webhook listeners capturing Bayut, Property Finder, and Dubizzle lead emails and API feeds into your CRM.
              </p>
            </div>
            <span className="mt-4 text-xs font-mono text-cyan-400 group-hover:underline">View Integration &rarr;</span>
          </Link>

          {/* Feature 4: Off-Plan Automation */}
          <Link
            href="/real-estate/off-plan-ai-automation-dubai"
            className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
                Off-Plan AI Matcher
              </h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Interactive 1% monthly payment plan WhatsApp calculators, developer launch matching, and automated PDF brochure dispatch.
              </p>
            </div>
            <span className="mt-4 text-xs font-mono text-purple-400 group-hover:underline">View Off-Plan &rarr;</span>
          </Link>

        </div>
      </section>

      {/* ── 4. Sector Context: Dubai & UAE Property Dynamics ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-white/10">
        <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent space-y-6 text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">Market Context</span>
          <h2 className="text-2xl md:text-3xl font-serif text-white">
            Operational Velocity in Dubai&apos;s High-Volume Property Sector
          </h2>
          <p className="text-sm md:text-base text-white/75 font-light leading-relaxed">
            UAE real estate is a large, transaction-heavy market with complex brokerage, developer, leasing and property-operations workflows. Property inquiries arrive across diverse, fragmented channels: WhatsApp, portal forms, Meta advertisements, and direct web searches. High-net-worth buyers from the GCC, Europe, and international markets demand rapid, accurate property data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl border border-white/5 bg-black/40 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase">
                <Clock className="w-4 h-4" /> Prompt Lead Engagement
              </div>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Prompt automated conversational qualification engages inbound buyer inquiries promptly, capturing key preferences before lead decay occurs.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-white/5 bg-black/40 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase">
                <ShieldCheck className="w-4 h-4" /> Data Governance
              </div>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                UAE PDPL-aligned architectures with regional private cloud deployment options to keep client contact records secure.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-white/5 bg-black/40 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase">
                <Lock className="w-4 h-4" /> Code Ownership
              </div>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Full client ownership of custom Next.js web applications, API middleware, and database schemas with zero vendor lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Frequently Asked Questions (Accordion) ── */}
      <section className="py-16 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Sector Knowledge</span>
          <h2 className="text-2xl md:text-4xl font-serif">Frequently Asked Questions</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Understanding enterprise real estate technology integration, data governance, and operational rollouts:
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition"
              >
                <span className="text-sm md:text-base font-medium text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-emerald-400 shrink-0 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs md:text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Final Call to Action ── */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center border-t border-white/10">
        <div className="p-8 md:p-12 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 to-transparent space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Sector Architecture Consultation</span>
          <h2 className="text-2xl md:text-4xl font-serif text-white">Scale Your UAE Property Operations</h2>
          <p className="text-sm md:text-base text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Schedule a technical workflow audit with our Dubai engineering team. We evaluate your lead intake channels, CRM pipeline bottlenecks, and listing infrastructure to build a connected technological roadmap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition shadow-lg shadow-white/10 text-sm"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 transition text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us (+971 54 586 6094)</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
