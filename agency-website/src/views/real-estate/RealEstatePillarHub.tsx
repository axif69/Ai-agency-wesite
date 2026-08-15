"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  LayoutDashboard,
  LockKeyhole,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";

const calendlyUrl = "https://calendly.com/asifdigitalagency";

export default function RealEstatePillarHubView() {
  const jsonLdHub = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Real Estate AI Automation Dubai",
    provider: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
    serviceType: "Real Estate AI Automation & Lead Attribution Architecture",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
    description:
      "Dubai's native agency custom-coding 100%-owned AI WhatsApp concierges & command dashboards. AED 761B market context. Sub-10s speed-to-lead. UAE PDPL compliant.",
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-400/30">
      {/* Head JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHub) }}
      />

      {/* ── HERO SECTION (BIG HEADINGS ARE PURE WHITE/NEUTRAL) ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden px-6 md:px-12 pt-32 pb-20 border-b border-white/5">
        <div className="max-w-5xl mx-auto text-center w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
              Pillar Hub · Dubai & UAE Enterprise Real Estate
            </span>

            {/* Big H1 - 100% Pure White */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.05] text-white mb-6">
              Real Estate AI Automation for <br />
              <span className="text-white/80 italic font-normal">Dubai & UAE Agencies.</span>
            </h1>

            <p className="max-w-3xl mx-auto text-base md:text-lg text-white/65 font-light leading-relaxed mb-8">
              Empowering Dubai property brokerages and developers with custom-coded, 100%-owned AI WhatsApp concierges, voice-note transcription engines, and live multi-channel lead attribution dashboards.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
              >
                Book a Live Demo <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                Explore Solution Modules ↓
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TWO DEDICATED SERVICE HUB CARDS ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 text-left">
          {/* Card 1: WhatsApp AI Automation */}
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 flex flex-col justify-between hover:border-emerald-400/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">Module 01</span>
              <h2 className="font-serif text-3xl text-white mb-4">Real Estate AI WhatsApp Automation</h2>
              <p className="text-sm leading-relaxed text-white/60 font-light mb-6">
                24/7 multilingual AI WhatsApp concierge answering property inquiries in sub-10 seconds. Features Khaleeji Arabic fluency, OpenAI Whisper voice-note transcription, Bayut & Property Finder direct webhooks, off-plan payment calculations, and 1-click human broker handoff.
              </p>
              <ul className="space-y-2.5 text-xs font-mono text-white/70 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Sub-10s Speed-to-Lead SLA</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multilingual (Khaleeji AR, EN, RU, FR, ZH)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Off-Plan 20% Down / 1% Monthly Engine</li>
              </ul>
            </div>
            <Link
              href="/real-estate/whatsapp-ai-automation"
              className="bg-white text-black px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors w-full text-center shadow-lg"
            >
              Explore WhatsApp AI Module <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: AI Lead Dashboard */}
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 flex flex-col justify-between hover:border-emerald-400/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2">Module 02</span>
              <h2 className="font-serif text-3xl text-white mb-4">Real Estate AI Lead Dashboard & Attribution</h2>
              <p className="text-sm leading-relaxed text-white/60 font-light mb-6">
                Unified real-time command portal tracking multi-channel ad spend (Meta, Google, TikTok, Bayut, Property Finder). Includes real-time Kanban pipeline status, HOT/WARM/COLD deal heat scores, 1-click executive reply co-pilot, and interactive lead loss calculator.
              </p>
              <ul className="space-y-2.5 text-xs font-mono text-white/70 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multi-Channel Ad Attribution Tagging</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Live Kanban Pipeline (New → Closed)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 1-Click Executive Reply Co-Pilot</li>
              </ul>
            </div>
            <Link
              href="/real-estate/ai-lead-dashboard"
              className="border border-white/15 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-2 hover:bg-white/5 transition-colors w-full text-center"
            >
              Explore Command Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DUBAI REAL ESTATE AI MARKET OVERVIEW (100 WORDS + STATS) ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-5xl mx-auto text-left">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
            Dubai Real Estate Market Context
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
            Capturing Demand in Dubai&apos;s AED 761 Billion Property Sector.
          </h2>
          <p className="text-base text-white/70 font-light leading-relaxed mb-12">
            Dubai real estate recorded over AED 761 Billion in transaction volume across 97,000+ deals according to UAE Land Department data. In a market where 85% of buyer inquiries originate or transition to WhatsApp, speed-to-lead dictates deal conversion. High-net-worth investors from the UK, Europe, CIS, and GCC expect sub-10s intelligent responses. Brokerages operating without automated WhatsApp qualification layers experience an estimated 85% decay in lead conversion when response times exceed 30 minutes. Asif Digital equips enterprise brokerages and off-plan developers with sovereign AI systems that capture, qualify, and attribute every inbound lead in real time.
          </p>

          {/* 3-Row Why Asif Digital Block */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4">
                <LockKeyhole className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">100% Code Ownership</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                You own the Next.js codebase and database outright — eliminating monthly SaaS rental fees.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">UAE PDPL-Compliant</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Private Supabase PostgreSQL database architecture ensuring full compliance with UAE data laws.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">Bayut & Property Finder Webhooks</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Direct 5-second API triggers capturing portal inquiries instantly with matching unit details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── UAE COMPLIANCE BLOCK ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest">
            <ShieldCheck className="h-5 w-5" /> 100% UAE-Native Agency & Data Sovereignty
          </div>
          <p className="text-sm text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Asif Digital builds 100% owned Next.js command applications on your private, UAE PDPL-compliant database.
          </p>
        </div>
      </section>
    </main>
  );
}
