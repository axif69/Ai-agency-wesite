"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Building, ArrowRight, ShieldAlert, Cpu, 
  MessageSquare, Phone, CheckCircle, Server, Code, Settings,
  Check, Globe, Database, Network, Layout, ExternalLink,
  ChevronDown, Layers, FileText, BarChart3, RefreshCw,
  Lock, Zap, CheckCircle2
} from "lucide-react";
import { trackEvent } from "../../utils/analytics";

export default function RealEstateDigitalSolutionsUAE() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "phone" | "consultation", destinationUrl: string) => {
    let eventName = "whatsapp_click";
    if (type === "phone") eventName = "phone_click";
    if (type === "consultation") eventName = "consultation_click";

    trackEvent(eventName, {
      service_name: "Real Estate Digital Solutions",
      cta_location: ctaLocation,
      cta_text: ctaText,
      link_url: destinationUrl
    });
  };

  const handleFaq = (index: number, question: string) => {
    if (activeFaq !== index) {
      trackEvent("faq_expand", {
        service_name: "Real Estate Digital Solutions",
        cta_text: question
      });
    }
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How do custom real estate websites differ from standard WordPress or portal templates?",
      a: "Standard real estate templates rely on heavy PHP plugins, unoptimized databases, and generic themes that load slowly on mobile, causing high bounce rates and poor Google rankings. Our custom real estate websites are built on modern headless Next.js and React architecture, featuring sub-second property filtering, automated WebP image optimization, CDN caching, and direct API connections to your property database without third-party plugin vulnerability."
    },
    {
      q: "Can you automate listing syndication across Bayut, Property Finder, and Dubizzle?",
      a: "Yes. We engineer XML and REST API listing engines that synchronize your internal property listings directly with major UAE portals including Bayut, Property Finder, and Dubizzle. When an agent updates a price, uploads high-res photography, or marks a property as reserved, changes syndicate automatically, preventing manual duplicate entry across portal dashboards."
    },
    {
      q: "Does this digital infrastructure replace our sales CRM?",
      a: "No. Real estate digital solutions represent your customer-facing technology infrastructure—including your brokerage website, developer portals, listing feeds, and API middleware. For sales pipeline management, speed-to-lead automation, WhatsApp qualification, and broker assignment rules, this infrastructure connects directly into our dedicated Real Estate CRM setup or your existing CRM platform."
    },
    {
      q: "How do you handle off-plan developer data and brochure downloads?",
      a: "We build dedicated off-plan project hubs that ingest developer inventory data, high-resolution rendering galleries, payment plan schedules, and floor plan PDFs. Users can explore units by completion date, developer, and payment structure, while automated download gates capture qualified investor details before releasing brochures."
    },
    {
      q: "Who owns the codebase and property database after deployment?",
      a: "You retain 100% full ownership of your custom code repository, property database, media assets, and API configurations. We do not lock your brokerage into proprietary closed ecosystems; your team receives full administrative credentials and documentation upon handover."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* ── 1. Compact Breadcrumb ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/" className="hover:text-emerald-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <Link href="/real-estate" className="hover:text-emerald-400 transition-colors">REAL ESTATE AI HUB</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95 font-sans">DIGITAL SOLUTIONS &amp; TECH INFRASTRUCTURE</span>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 py-2 px-5 bg-white/5 border border-white/10 text-emerald-400 text-[13px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Enterprise Real Estate Technology
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.12] tracking-tight mb-6">
            Real Estate Digital Solutions &amp; <br className="hidden md:inline" />
            <span className="italic text-white/60 font-light tracking-normal">Technology Infrastructure in the UAE</span>
          </h1>

          <p className="text-[17px] md:text-[19px] leading-[1.7] text-white/80 max-w-3xl mx-auto mb-8 font-sans font-light">
            We architect and engineer high-performance property search websites, automated XML portal syndication (Bayut &amp; Property Finder), off-plan developer feeds, and custom API middleware for UAE brokerages and real estate developers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 font-sans">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20real%20estate%20digital%20solutions%20and%20agency%20technology%20infrastructure." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Hero CTA", "whatsapp", "https://wa.me/971545866094")}
              className="w-full sm:w-auto bg-white text-black px-9 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white/85 transition-all flex items-center justify-center gap-3 shadow-2xl h-[52px]"
            >
              WhatsApp Us <MessageSquare className="w-4 h-4 text-black" />
            </a>
            <Link 
              href="/contact" 
              onClick={() => handleCTA("Schedule Infrastructure Consultation", "Hero CTA", "consultation", "/contact")}
              className="w-full sm:w-auto border border-white/20 text-white px-9 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white/5 transition-all flex items-center justify-center gap-3 h-[52px]"
            >
              Schedule Tech Audit <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[12px] text-white/60 tracking-wider font-mono">
            <span>✓ NEXT.JS HEADLESS BROKERAGE SITES</span>
            <span>✓ BAYUT &amp; PROPERTY FINDER XML FEEDS</span>
            <span>✓ OFF-PLAN DEVELOPER API HUBS</span>
            <span>✓ 100% CODEBASE OWNERSHIP</span>
          </div>
        </div>
      </section>

      {/* ── 3. Direct Answer / System Overview Block (AEO Target) ── */}
      <section className="px-6 md:px-12 py-10 max-w-5xl mx-auto">
        <div className="p-8 md:p-10 border border-white/10 bg-white/[0.02] rounded-3xl relative overflow-hidden">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> System Overview • Real Estate Digital Infrastructure
          </div>
          <h2 className="text-2xl md:text-3xl font-serif mb-4 text-white">
            What Constitutes Modern Real Estate Digital Solutions in the UAE?
          </h2>
          <p className="text-[16px] md:text-[17px] text-white/85 leading-[1.8] font-light">
            In the UAE property market, real estate digital solutions refer to the interconnected technology stack that powers agency operations: sub-second headless property search websites, automated XML listing feeds to UAE property portals (Bayut, Property Finder, Dubizzle), off-plan inventory ingestion pipelines, and secure API middleware connecting customer inquiries to CRM systems. Unlike generic web templates, modern real estate infrastructure eliminates manual data re-entry, maintains synchronized listing availability, and provides agencies with complete ownership of their digital assets and client databases.
          </p>
        </div>
      </section>

      {/* ── 4. Architecture Flowchart: Inventory to Operational Hub ── */}
      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            End-to-End System Pipeline
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            Real Estate Digital Architecture Flow
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-3 text-sm">
            How listing data, property portals, custom websites, and sales operations connect seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs mb-4">01</div>
              <h3 className="font-bold text-white text-sm mb-2">Inventory CMS</h3>
              <p className="text-white/60 text-xs leading-relaxed">Central agency database of secondary listings &amp; off-plan inventory.</p>
            </div>
            <div className="text-emerald-400 text-xs font-mono mt-4">Single Source of Truth</div>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono font-bold flex items-center justify-center text-xs mb-4">02</div>
              <h3 className="font-bold text-white text-sm mb-2">API &amp; XML Feeds</h3>
              <p className="text-white/60 text-xs leading-relaxed">Automated syndication engine formatting data for Bayut, PF, &amp; Dubizzle.</p>
            </div>
            <div className="text-blue-400 text-xs font-mono mt-4">Automated Feed Engine</div>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono font-bold flex items-center justify-center text-xs mb-4">03</div>
              <h3 className="font-bold text-white text-sm mb-2">Headless Website</h3>
              <p className="text-white/60 text-xs leading-relaxed">Fast Next.js property search, interactive maps, and off-plan landing hubs.</p>
            </div>
            <div className="text-purple-400 text-xs font-mono mt-4">Direct Buyer Layer</div>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs mb-4">04</div>
              <h3 className="font-bold text-white text-sm mb-2">Ingestion Webhooks</h3>
              <p className="text-white/60 text-xs leading-relaxed">Webhook listeners capturing direct website inquiries and portal leads.</p>
            </div>
            <div className="text-amber-400 text-xs font-mono mt-4">Instant Lead Ingestion</div>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs mb-4">05</div>
              <h3 className="font-bold text-white text-sm mb-2">Data Gateway &amp; CRM Bridge</h3>
              <p className="text-white/60 text-xs leading-relaxed">Secure webhook pipelines bridging web inquiries directly into your agency CRM.</p>
            </div>
            <div className="text-emerald-400 text-xs font-mono mt-4">API Handover Point</div>
          </div>
        </div>
      </section>

      {/* ── 5. Clear Intent Separation: Dedicated CRM Bridge Card ── */}
      <section className="px-6 md:px-12 py-8 max-w-5xl mx-auto">
        <div className="p-8 md:p-10 border border-emerald-500/30 bg-emerald-500/[0.04] rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-400 text-[12px] font-bold uppercase tracking-[0.2em] font-mono block mb-2">
              Architectural Demarcation • Sales Pipeline &amp; Lead Operations
            </span>
            <h2 className="text-2xl md:text-3xl font-serif mb-3 text-white">
              Looking specifically for Real Estate CRM &amp; Speed-to-Lead?
            </h2>
            <p className="text-[15px] text-white/75 leading-[1.7] font-light">
              While our digital solutions engineer your custom websites, portal feeds, and listing architecture, sales pipeline automation, agent round-robin routing, and WhatsApp instant qualification are managed by our specialized Dubai Real Estate CRM setup.
            </p>
          </div>
          <Link
            href="/real-estate-crm-dubai"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-400 text-black font-bold uppercase tracking-widest text-xs hover:bg-emerald-300 transition-colors shadow-lg"
          >
            Explore Real Estate CRM <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── 6. Core Real Estate Infrastructure Pillars ── */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Engineered Deliverables
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Core Real Estate Technology Infrastructure We Build
          </h2>
          <p className="text-[17px] text-white/70 font-light leading-[1.7]">
            Purpose-built components designed specifically for UAE brokerage workflows and developer project launches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3">Custom Brokerage Websites</h3>
              <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
                Headless Next.js web applications engineered for sub-second page loads. Includes dynamic community map search (Downtown Dubai, Palm Jumeirah, Dubai Hills), faceted listing filtering by price AED, bedrooms, and completion date, and mobile-first progressive web app (PWA) responsiveness.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 text-xs text-emerald-400 font-mono">
              ✓ Sub-Second Search • Interactive Map Views
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3">Portal XML &amp; API Feeds</h3>
              <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
                Direct XML syndication engines connecting your internal CMS to Bayut, Property Finder, and Dubizzle. Automatically validates image dimensions, watermark placement, and RERA permit requirements before syndicating, eliminating manual double-entry.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 text-xs text-emerald-400 font-mono">
              ✓ Bayut, PF &amp; Dubizzle Integration
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3">Off-Plan Developer Hubs</h3>
              <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
                Dedicated off-plan project showcase engines featuring developer inventory ingestion (Emaar, Damac, Sobha, Aldar), interactive master plans, floor plan downloads, and automated payment plan calculators supporting multi-currency investor views.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 text-xs text-emerald-400 font-mono">
              ✓ Developer Ingestion • Dynamic Floor Plans
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3">Listing Inventory CMS</h3>
              <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
                Unified internal database allowing agency administrators to manage secondary sales, rentals, and exclusive listings from a single dashboard. Features automated status toggling (Available, Reserved, Sold) that cascades across all active channels.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 text-xs text-emerald-400 font-mono">
              ✓ Cascading Status Sync • Role Controls
            </div>
          </div>

          {/* Pillar 5 */}
          <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3">API &amp; Webhook Middleware</h3>
              <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
                Enterprise webhook listeners and REST API middleware connecting your digital touchpoints to downstream tools. Handles concurrency, message queues, and error recovery to ensure zero lost leads between portals, landing pages, and internal databases.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 text-xs text-emerald-400 font-mono">
              ✓ High-Concurrency Webhooks • Zero Lead Loss
            </div>
          </div>

          {/* Pillar 6 */}
          <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif mb-3">Broker &amp; Developer Dashboards</h3>
              <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
                Custom administrative dashboards displaying inventory velocity, portal view counts, inquiry attribution by marketing source, and broker asset performance—giving managing directors complete visibility into their digital asset ROI.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 text-xs text-emerald-400 font-mono">
              ✓ Portal ROI Attribution • Inventory Velocity
            </div>
          </div>

        </div>
      </section>

      {/* ── 7. Second Intent Link: Portal Lead Integration ── */}
      <section className="px-6 md:px-12 py-6 max-w-5xl mx-auto">
        <div className="p-6 md:p-8 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-white font-semibold text-base mb-1">Need direct portal lead capture into your CRM?</div>
            <p className="text-white/60 text-sm font-light">Explore our automated lead ingestion tunnels for Bayut and Property Finder email/webhook feeds.</p>
          </div>
          <Link
            href="/real-estate/portal-lead-integration-dubai"
            className="shrink-0 text-xs uppercase tracking-wider font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
          >
            Portal Lead Integration <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── 8. Comparison Table: Fragmented Tech Stack vs Integrated Platform ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-3">
            Strategic Evaluation
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            Fragmented Real Estate Tech vs. Integrated Digital Infrastructure
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-3 text-sm">
            Comparing conventional patchwork setups against purpose-engineered UAE property infrastructure.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Capability Layer</th>
                <th className="py-4 px-6">Conventional Fragmented Setup</th>
                <th className="py-4 px-6 text-emerald-400">Integrated Digital Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80 font-light">
              <tr>
                <td className="py-5 px-6 font-medium text-white font-mono text-xs">Website Performance</td>
                <td className="py-5 px-6 text-white/50">Slow WordPress theme with 30+ plugins; 4-7s mobile load time causing high bounce rates.</td>
                <td className="py-5 px-6 text-white font-normal bg-emerald-500/[0.02]">Headless Next.js edge-rendered architecture; sub-second mobile loads with instant faceted search.</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white font-mono text-xs">Listing Management</td>
                <td className="py-5 px-6 text-white/50">Agents manually log in to Bayut, Property Finder, and website backend to re-type listing data.</td>
                <td className="py-5 px-6 text-white font-normal bg-emerald-500/[0.02]">Single-source CMS publishing automated XML feeds to portals and website simultaneously.</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white font-mono text-xs">Off-Plan Content</td>
                <td className="py-5 px-6 text-white/50">Static PDFs emailed manually; outdated pricing and floor plans causing broker confusion.</td>
                <td className="py-5 px-6 text-white font-normal bg-emerald-500/[0.02]">Dynamic developer hubs with automated brochure gates, interactive floor plans, and live availability.</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white font-mono text-xs">System Connectivity</td>
                <td className="py-5 px-6 text-white/50">Disconnected tools and spreadsheets; leads lost in email inboxes without central recording.</td>
                <td className="py-5 px-6 text-white font-normal bg-emerald-500/[0.02]">API middleware and webhook queues syncing every direct inquiry and portal lead in real time.</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white font-mono text-xs">Asset Ownership</td>
                <td className="py-5 px-6 text-white/50">Locked into recurring monthly third-party SaaS templates with zero code ownership.</td>
                <td className="py-5 px-6 text-white font-normal bg-emerald-500/[0.02]">100% agency-owned codebase, private database, and custom infrastructure with no vendor lock-in.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 9. Implementation Roadmap ── */}
      <section className="py-20 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-3">
              Deployment Phases
            </span>
            <h2 className="text-3xl md:text-5xl font-serif">
              Real Estate Infrastructure Implementation Roadmap
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto mt-3 text-sm">
              A structured 4-phase rollout engineered to prevent operational downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-emerald-400 font-mono text-xs uppercase block mb-3">Phase 01 • Weeks 1-2</span>
              <h3 className="text-lg font-bold mb-2">Audit &amp; Data Mapping</h3>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Catalog existing property listings, map developer project feeds, review portal accounts, and define database taxonomy.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-emerald-400 font-mono text-xs uppercase block mb-3">Phase 02 • Weeks 3-4</span>
              <h3 className="text-lg font-bold mb-2">Website &amp; Search Build</h3>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Engineer headless Next.js frontend, interactive community map search, off-plan project hubs, and CDN caching layers.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-emerald-400 font-mono text-xs uppercase block mb-3">Phase 03 • Weeks 5-6</span>
              <h3 className="text-lg font-bold mb-2">Portal Feeds &amp; Middleware</h3>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Configure XML syndication engines for Bayut and Property Finder, establish webhook tunnels, and link inquiry routes.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <span className="text-emerald-400 font-mono text-xs uppercase block mb-3">Phase 04 • Week 7</span>
              <h3 className="text-lg font-bold mb-2">Staging &amp; Handover</h3>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                Conduct stress testing, verify portal feed parsing, train agency administrative staff, and execute live DNS cutover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Pricing Variables ── */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Investment Structure
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            Factors That Influence Infrastructure Pricing
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-3 text-sm">
            We provide transparent, fixed-scope engineering proposals based on four technical variables:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <h3 className="text-lg font-bold mb-2 font-serif text-emerald-400">1. Active Listing Catalog Volume</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Database architecture and image optimization requirements vary between boutique agencies with 50 exclusive listings and enterprise brokerages with 5,000+ active units.
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <h3 className="text-lg font-bold mb-2 font-serif text-emerald-400">2. Portal Syndication Scope</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Single-portal feed generation versus automated two-way synchronization across Bayut, Property Finder, Dubizzle, and international property portals.
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <h3 className="text-lg font-bold mb-2 font-serif text-emerald-400">3. Off-Plan Developer Hub Complexity</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Standard off-plan landing pages versus multi-currency interactive project portals with dynamic payment schedule calculators and floor plan download gates.
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <h3 className="text-lg font-bold mb-2 font-serif text-emerald-400">4. Hosting &amp; Private Infrastructure</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Standard global edge deployment on Vercel/AWS versus dedicated local UAE-region cloud infrastructure for compliance-governed real estate enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* ── 11. Who This Solution Is For ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-serif mb-4">Who This Infrastructure Is Built For</h2>
          <p className="text-[17px] text-white/70 font-light leading-[1.7]">
            Tailored specifically for property organizations operating in Dubai, Abu Dhabi, and across the UAE.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "UAE Real Estate Brokerages", desc: "Agencies requiring high-speed property search websites, community landing hubs, and automated portal syndication." },
            { title: "Off-Plan Project Agencies", desc: "Brokerages specializing in developer sales requiring interactive off-plan hubs, master plans, and floor plan gates." },
            { title: "Private Property Developers", desc: "Development firms launching residential or commercial projects that need dedicated sales showcase portals." },
            { title: "Multi-Branch Property Groups", desc: "Enterprise operations coordinating thousands of listings across multiple emirates with centralized CMS control." }
          ].map((item) => (
            <div key={item.title} className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl text-left">
              <h3 className="text-lg font-serif mb-2 text-white">{item.title}</h3>
              <p className="text-xs text-white/70 leading-[1.7] font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 12. Operational Boundaries & Regulatory Demarcation ── */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="p-8 border border-white/10 bg-black rounded-3xl">
          <div className="flex items-center gap-3 text-amber-400 font-semibold mb-4 text-base">
            <Lock className="w-5 h-5" /> Operational Boundaries &amp; Regulatory Responsibility
          </div>
          <div className="space-y-4 text-xs text-white/70 font-light leading-relaxed">
            <p>
              <strong>What We Engineer:</strong> Asif Digital designs, develops, and deploys digital technology infrastructure—including custom web applications, property databases, API connectors, and automated XML portal feeds.
            </p>
            <p>
              <strong>Regulatory Responsibility:</strong> We do not act as real estate brokers or legal advisors. Real estate licensing, DLD/RERA advertising permits (Trakheesi permits), title deed authenticity, and escrow account operations remain the sole responsibility of your licensed brokerage or developer entity.
            </p>
          </div>
        </div>
      </section>

      {/* ── 13. Authority Guide Bridge (Connecting to Pos 2.1 Guide) ── */}
      <section className="py-12 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2">
              Comprehensive Strategic Guide
            </span>
            <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
              Read Our In-Depth Real Estate Digital Guide
            </h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Explore our comprehensive 15-minute operational analysis on evaluating real estate websites, CRM hygiene, listing workflows, and technology investments in the UAE.
            </p>
          </div>
          <Link
            href="/blog/real-estate-digital-solutions-uae-guide"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-emerald-400 text-white text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            Read Digital Guide <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── 14. Frequently Asked Questions ── */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Clear Answers
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm">
            Technical and operational questions about deploying real estate digital solutions in the UAE.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-white/[0.01] rounded-2xl overflow-hidden transition-all">
              <button
                className="w-full text-left text-base font-medium py-5 px-6 flex justify-between items-center hover:bg-white/[0.02] transition-colors"
                onClick={() => handleFaq(i, faq.q)}
              >
                <span className="text-white/90">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-200 ${activeFaq === i ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === i && (
                <div className="px-6 pb-6 text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 15. Final CTA Section ── */}
      <section className="py-24 px-6 md:px-12 border-t border-white/10 text-center relative overflow-hidden bg-black">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight mb-6">
            Modernize Your Real Estate <br />
            <span className="text-white/50 italic font-light">Technology Infrastructure</span>
          </h2>
          <p className="text-[17px] text-white/60 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Let us audit your current website, listing feeds, and digital workflows. We will design a unified technology architecture that reduces manual effort and accelerates buyer inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-sans">
            <Link 
              href="/contact" 
              onClick={() => handleCTA("Request Tech Audit", "Final CTA", "consultation", "/contact")}
              className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            >
              Request Technology Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20real%20estate%20digital%20solutions%20and%20agency%20technology%20infrastructure." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Final CTA", "whatsapp", "https://wa.me/971545866094")}
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 bg-white/[0.02] text-white px-8 py-5 rounded-full font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Strategic Desk
            </a>
          </div>
        </div>
      </section>

      {/* ── 16. Topic Cluster Footer Navigation ── */}
      <section className="py-12 border-t border-white/5 bg-black/40 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Real Estate Technology Cluster
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/real-estate" className="hover:text-white transition-colors text-emerald-400 font-medium">Real Estate AI Hub</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate-crm-dubai" className="hover:text-white transition-colors">Dubai Real Estate CRM (Sales Operations)</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate/portal-lead-integration-dubai" className="hover:text-white transition-colors">Portal Lead Integration</Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-real-estate-agencies-dubai" className="hover:text-white transition-colors">AI for Real Estate Agencies</Link>
            <span className="text-white/20">•</span>
            <Link href="/blog/real-estate-digital-solutions-uae-guide" className="hover:text-white transition-colors">Operational Guide</Link>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0ced]/90 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-4 md:hidden font-sans">
        <a 
          href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20real%20estate%20digital%20solutions%20and%20agency%20technology%20infrastructure."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCTA("Sticky WhatsApp Mobile", "Sticky Footer", "whatsapp", "https://wa.me/971545866094")}
          className="flex-1 bg-[#25d366] text-white text-center font-bold uppercase tracking-wider text-[13px] py-3 rounded-xl flex items-center justify-center gap-2 h-11"
        >
          <MessageSquare className="w-4 h-4" /> WhatsApp Us
        </a>
        <a 
          href="tel:+971545866094"
          onClick={() => handleCTA("Sticky Phone Mobile", "Sticky Footer", "phone", "tel:+971545866094")}
          className="flex-1 bg-white text-black text-center font-bold uppercase tracking-wider text-[13px] py-3 rounded-xl flex items-center justify-center gap-2 h-11"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
      </div>

    </div>
  );
}
