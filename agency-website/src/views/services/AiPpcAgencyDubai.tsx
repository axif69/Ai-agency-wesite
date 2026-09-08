"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Target, BarChart3, TrendingUp, DollarSign, Users, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, 
  PhoneCall, HelpCircle, Layers, Eye, RefreshCw, Cpu,
  Database, Filter, Check, Sliders, Activity
} from "lucide-react";
import Link from "next/link";

export default function AiPpcAgencyDubai() {
  // Interactive Paid Media Tracking & Lead Quality Diagnostic State
  const [monthlyAdLeads, setMonthlyAdLeads] = useState(250);
  const [invalidLeadPercent, setInvalidLeadPercent] = useState(25); // % junk, spam, or invalid traffic
  const [usableIdentifierPercent, setUsableIdentifierPercent] = useState(70); // % with valid email/phone
  const [crmQualifiedPercent, setCrmQualifiedPercent] = useState(35); // % reaching sales-qualified stage

  // Calculations
  const invalidLeads = Math.round(monthlyAdLeads * (invalidLeadPercent / 100));
  const validLeads = Math.max(0, monthlyAdLeads - invalidLeads);
  const leadsWithIdentifiers = Math.round(validLeads * (usableIdentifierPercent / 100));
  const crmQualifiedLeads = Math.round(validLeads * (crmQualifiedPercent / 100));

  const pillars = [
    {
      number: "01",
      title: "Google Search & PMax Algorithmic Bidding",
      subtitle: "Smart Bidding with Strategy Guardrails",
      description:
        "Configuring value-based bidding, tCPA targets, and Performance Max asset groups backed by rigorous negative query exclusions to direct budget exclusively toward high-intent searchers.",
      points: [
        "Value-based bidding calibration for high-intent UAE commercial queries",
        "Target CPA and ROAS guardrails preventing volatile bid spikes",
        "Continuous negative search query auditing and keyword hygiene",
        "Performance Max asset group optimization with search theme controls",
      ],
    },
    {
      number: "02",
      title: "Meta Ads & Advantage+ Creative Workflows",
      subtitle: "Full-Funnel Social Performance Media",
      description:
        "Deploying localized English and Khaleeji Arabic ad creatives across Instagram and Facebook with Advantage+ audience controls, instant lead forms, and direct WhatsApp ad clickflows.",
      points: [
        "Bilingual creative production tailored for UAE national and expat audiences",
        "Advantage+ campaign structures with customized audience exclusions",
        "High-converting instant lead forms integrated with real-time CRM webhooks",
        "Click-to-WhatsApp ad workflows with automated qualification handoffs",
      ],
    },
    {
      number: "03",
      title: "First-Party Signal Enrichment (CAPI & Enhanced Conversions)",
      subtitle: "Server-Side Tracking Architecture",
      description:
        "Deploying Meta Conversions API (CAPI) and Google Enhanced Conversions via server-side cloud containers to capture verified first-party purchase and lead telemetry without browser cookie loss.",
      points: [
        "Cloud-hosted server-side GTM containers for verified event dispatch",
        "Meta CAPI deployment delivering high event quality match scores (8.0+)",
        "Google Enhanced Conversions with secure SHA-256 hashed customer parameters",
        "Resilience against iOS privacy barriers, cookie pruning, and ad blockers",
      ],
    },
    {
      number: "04",
      title: "CRM Offline Conversion Imports",
      subtitle: "Closed-Loop Revenue Attribution",
      description:
        "Feeding closed-won deal values and stage progression data from your CRM back to Google Ads and Meta. This trains ad algorithms to prioritize revenue over raw, unqualified lead volume.",
      points: [
        "Bi-directional synchronization between CRM stages and ad platforms",
        "Offline conversion upload pipelines for Google Ads and Meta Business Manager",
        "Value-optimized bidding trained on actual customer contract value",
        "Elimination of ad budget waste on repeat low-quality inquiry profiles",
      ],
    },
    {
      number: "05",
      title: "Creative-Fatigue Monitoring & Asset Rotation",
      subtitle: "Systematic Ad Decay Management",
      description:
        "Tracking frequency build-up, CTR degradation, and CPA inflection points across creative sets to trigger structured asset refreshes before ad fatigue erodes campaign efficiency.",
      points: [
        "Weekly creative performance audits tracking frequency decay and CTR shifts",
        "Modular visual and copy rotation pipelines to prevent audience wear-out",
        "A/B testing protocols isolating hooks, value propositions, and calls to action",
        "Multi-asset format testing across static, carousel, and vertical video formats",
      ],
    },
    {
      number: "06",
      title: "Invalid-Traffic Monitoring & Budget Scaling Guardrails",
      subtitle: "Spend Protection & Risk Governance",
      description:
        "Deploying reCAPTCHA v3 validation, IP anomaly filtering support, and threshold-based scaling rules that increase ad spend only when verified ROAS and lead quality benchmarks are satisfied.",
      points: [
        "reCAPTCHA v3 gating and honeypot validation on all inquiry capture points",
        "Invalid-traffic monitoring and IP anomaly exclusion workflows",
        "Budget scaling rules governed by pre-agreed ROAS and CPA thresholds",
        "Human oversight on all strategic media allocation decisions",
      ],
    },
  ];

  const faqs = [
    {
      q: "How does AI-assisted PPC differ from traditional PPC agency management in Dubai?",
      a: "Traditional PPC management often relies on manual bid tweaks once a week and sends clicks to generic homepages. Our AI-assisted performance marketing combines machine-learning bid algorithms (Google Smart Bidding, Meta Advantage+) with strict human strategy guardrails, server-side first-party data (CAPI), and closed-loop CRM conversion imports. This ensures ad networks optimize for actual signed contracts rather than vanity clicks or unqualified form fills.",
    },
    {
      q: "Which advertising platforms do you manage under your AI PPC service?",
      a: "We manage high-intent paid media across Google Search, Performance Max (PMax), Google Display, YouTube Ads, Meta Ads (Instagram & Facebook Lead Generation), and LinkedIn Ads for enterprise B2B sales in Dubai, Sharjah, Abu Dhabi, and the wider GCC.",
    },
    {
      q: "How do Meta CAPI and Google Enhanced Conversions improve our campaign ROI?",
      a: "Browser privacy restrictions (such as iOS App Tracking Transparency and browser ad blockers) prevent up to 30% of standard web conversions from reaching ad platforms. By deploying server-side Meta Conversions API (CAPI) and Google Enhanced Conversions, we pass verified, encrypted conversion signals directly from your server to the advertising algorithms, improving attribution accuracy and lowering your cost per acquisition (CPA).",
    },
    {
      q: "What are offline conversion imports and how do they benefit our business?",
      a: "Most ad platforms only know when someone submits a form—not whether they became a paying customer. With offline conversion imports, your CRM pushes qualified pipeline stages and closed deal revenues back to Google and Meta. The bidding algorithms then automatically optimize for high-value decision-makers rather than budget-draining tire-kickers.",
    },
    {
      q: "How do you protect our ad spend from runaway costs or invalid traffic?",
      a: "We implement strict budget scaling guardrails: daily spending caps, threshold-based budget adjustment rules, invalid-traffic monitoring, reCAPTCHA v3 bot protection on forms, and rigorous negative keyword exclusions. We never enable unmonitored auto-pilot spend scaling; every budget increase requires meeting agreed ROAS or qualified lead milestones.",
    },
    {
      q: "What is the recommended minimum monthly ad spend for AI PPC campaigns in the UAE?",
      a: "To allow machine learning algorithms (such as Google Smart Bidding and Meta Advantage+) to exit the learning phase and accumulate statistically significant conversion data, we generally recommend a minimum media budget of AED 7,000 to AED 15,000 per month paid directly to the ad platforms.",
    },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      {/* ── 1. Hero Section ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
            <Cpu className="w-3.5 h-3.5" /> Paid Media &bull; Google Ads &bull; Meta Ads &bull; Dubai &bull; GCC
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            AI PPC &amp; Performance <br />
            <span className="italic text-white/50 font-normal">Marketing Agency in Dubai</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Scale revenue—not just ad spend. We engineer AI-assisted Google Search, Performance Max, and Meta campaigns powered by server-side tracking, creative fatigue monitoring, and closed-loop CRM feedback to lower acquisition costs across the UAE.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-xl"
            >
              Request Performance Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Performance Metrics Ribbon ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "Server-Side", label: "Meta CAPI & GTM", sub: "Verified First-Party Signals" },
            { metric: "Closed-Loop", label: "CRM Revenue Sync", sub: "Offline Conversion Imports" },
            { metric: "Guardrails", label: "Human Strategy Oversight", sub: "No Runaway Auto-Scaling" },
            { metric: "100%", label: "Client Account Control", sub: "Direct Platform Billing" },
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-2xl sm:text-3xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Intent Separation Notice / Bridge Banner ── */}
      <section className="px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-sans text-white/70">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Looking for broader omnichannel growth strategies or marketing automation? Explore our umbrella{" "}
              <Link href="/ai-marketing-dubai" className="text-white underline hover:text-emerald-400 transition-colors">
                AI Marketing Agency Dubai
              </Link>{" "}
              hub, or review our{" "}
              <Link href="/services/ppc-google-ads-agency-dubai" className="text-white underline hover:text-emerald-400 transition-colors">
                Traditional PPC Management
              </Link>{" "}
              service.
            </span>
          </div>
          <Link
            href="/tools/ad-spend-efficiency-analyzer"
            className="text-emerald-400 hover:text-emerald-300 font-mono uppercase tracking-wider shrink-0 inline-flex items-center gap-1.5"
          >
            Ad Spend Waste Diagnostic <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── 4. Interactive Paid Media Tracking & Lead Quality Diagnostic ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold flex items-center gap-2">
              <Sliders className="w-4 h-4" /> Tracking &amp; Lead Quality Diagnostic
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Audit Paid Media Signal Hygiene &amp; CRM Readiness
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Algorithmic bidding in Google Ads and Meta Advantage+ relies on clean conversion data. Use this diagnostic to assess how lead validation, first-party data capture, and CRM qualification stages prepare your paid campaigns for server-side tracking and offline conversion optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Inbound Ad Leads (All Paid Channels):</span>
                  <span className="text-white font-bold">{monthlyAdLeads} leads / month</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={monthlyAdLeads}
                  onChange={(e) => setMonthlyAdLeads(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-2 font-mono">
                  <span className="text-white/70">Estimated Invalid / Bot / Spam Inquiries:</span>
                  <span className="text-amber-400 font-bold">{invalidLeadPercent}% ({invalidLeads} leads)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={invalidLeadPercent}
                  onChange={(e) => setInvalidLeadPercent(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-2 font-mono">
                  <span className="text-white/70">Leads with Usable First-Party Identifiers (Phone/Email):</span>
                  <span className="text-emerald-400 font-bold">{usableIdentifierPercent}% ({leadsWithIdentifiers} leads)</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="95"
                  step="5"
                  value={usableIdentifierPercent}
                  onChange={(e) => setUsableIdentifierPercent(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-2 font-mono">
                  <span className="text-white/70">Leads Reaching CRM Sales-Qualified Stage:</span>
                  <span className="text-blue-400 font-bold">{crmQualifiedPercent}% ({crmQualifiedLeads} SQLs)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  step="5"
                  value={crmQualifiedPercent}
                  onChange={(e) => setCrmQualifiedPercent(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/90 font-mono font-bold block mb-1">
                  Usable First-Party Records for Offline/CAPI Sync
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {leadsWithIdentifiers} <span className="text-xs font-sans text-white/50">verified records / month</span>
                </div>
                <div className="text-xs text-white/50 mt-1 font-light leading-relaxed">
                  Clean lead records formatted with verified contact parameters for server-side CAPI event dispatch or offline conversion imports.
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-blue-400 block mb-1">Current CRM Pipeline SQLs:</span>
                  <span className="text-white text-sm font-bold">{crmQualifiedLeads} qualified leads</span>
                </div>
                <div>
                  <span className="text-amber-400 block mb-1">Filtered Low-Quality Volume:</span>
                  <span className="text-white text-sm font-bold">{invalidLeads} invalid inquiries</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] text-white/45 font-light leading-relaxed mb-4">
                  Diagnostic Note: This tool models lead hygiene and tracking readiness based on user-entered parameters. Platform-side match rates (Meta Event Match Quality, Google Enhanced Conversions) and algorithmic bidding performance depend on ad platform infrastructure, user consent, and signal freshness, and cannot be predetermined by static estimates.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="flex-1 bg-emerald-400 text-black py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                  >
                    Schedule Strategy Review <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/tools/ad-spend-efficiency-analyzer"
                    className="border border-white/20 text-white/90 px-4 py-3.5 rounded-xl font-mono uppercase tracking-widest text-xs hover:bg-white/10 transition-colors text-center"
                  >
                    Run Ad Diagnostic
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Core Operational Pillars (6 Pillars) ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
            System Architecture
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            AI-Assisted Paid Media Architecture
          </h2>
          <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
            How we engineer high-performance paid advertising campaigns across Google, Meta, and LinkedIn with continuous first-party data enrichment and human guardrails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
                  System {pillar.number}
                </div>
                <h3 className="text-xl font-serif text-white mb-2">{pillar.title}</h3>
                <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-4">
                  {pillar.subtitle}
                </div>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-white/80 font-light">
                {pillar.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Comparison: Traditional vs AI-Assisted PPC ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Methodology Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Traditional PPC Management vs. AI-Assisted Performance Desk
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Operational Area</th>
                <th className="py-4 px-4 text-white/40">Traditional Agency Retainer</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital AI PPC Desk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bidding Methodology</td>
                <td className="py-5 px-4 text-white/60">Manual CPC tweaks or unconstrained automated bidding without ROAS caps</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Smart Bidding &amp; PMax with strict human strategy and budget guardrails</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Tracking &amp; Signal Quality</td>
                <td className="py-5 px-4 text-white/60">Basic browser pixels subject to 30%+ signal loss from cookie blockers</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Server-Side Meta CAPI &amp; Google Enhanced Conversions via cloud containers</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Conversion Optimization Target</td>
                <td className="py-5 px-4 text-white/60">Optimizes for surface-level form submissions, resulting in unqualified leads</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Closed-loop CRM offline conversion imports optimizing for sales-qualified revenue</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Ad Creative Lifecycle</td>
                <td className="py-5 px-4 text-white/60">Ad copy left static for months until severe creative fatigue sets in</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Continuous frequency and CTR monitoring with structured asset rotation workflows</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Traffic Protection</td>
                <td className="py-5 px-4 text-white/60">Minimal bot validation, paying for accidental clicks and spam submissions</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Invalid-traffic monitoring support, reCAPTCHA v3 gating, and IP anomaly filtering</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Budget Scaling Rules</td>
                <td className="py-5 px-4 text-white/60">Ad-hoc spending increases based on gut feeling or agency commission tiers</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Rules-based budget scaling tied strictly to pre-agreed ROAS/CPA thresholds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions ── */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
              Procurement &amp; Governance
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Clear answers on AI bidding mechanisms, tracking requirements, and account governance.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-lg md:text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-emerald-300 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-2xl text-white/40 group-open:rotate-45 group-open:text-emerald-400 transition-transform ml-4 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-white/75 font-light leading-relaxed text-sm md:text-base">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Call to Action ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block font-semibold">
            Scale With First-Party Data
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Stop Guessing on Ad Spend. <br />
            <span className="italic text-white/50 font-normal">Optimize for Pipeline Revenue.</span>
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Let our performance media desk audit your Google and Meta ad accounts. We will identify conversion tracking leaks, negative keyword waste, and creative fatigue bottlenecks.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              href="/contact"
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Book Strategy Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>

          <div className="pt-10 flex flex-wrap justify-center items-center gap-6 text-xs text-white/50 font-mono">
            <Link href="/ai-marketing-dubai" className="hover:text-white transition-colors">
              AI Marketing Agency Dubai
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/services/ppc-google-ads-agency-dubai" className="hover:text-white transition-colors">
              Traditional PPC Services
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/tools/ad-spend-efficiency-analyzer" className="hover:text-white transition-colors text-emerald-400">
              Ad Spend Efficiency Analyzer
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-seo-agency-dubai" className="hover:text-white transition-colors">
              AI SEO Agency Dubai
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
