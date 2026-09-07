"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Workflow, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Check, 
  AlertCircle
} from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudyData";

const CATEGORIES = [
  "All Showcases",
  "Multi-Agent Systems",
  "B2B Lead Intelligence",
  "Web & Local Infrastructure",
  "Workflow & CRM Automation"
] as const;

type Category = typeof CATEGORIES[number];

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All Showcases");

  const filteredStudies = CASE_STUDIES.filter((study) => {
    if (selectedCategory === "All Showcases") return true;
    if (selectedCategory === "Multi-Agent Systems") {
      return study.id === "global-exhibition-mas" || study.id === "governed-sales-engine";
    }
    if (selectedCategory === "B2B Lead Intelligence") {
      return study.id === "uae-construction-advisory" || study.id === "global-exhibition-mas";
    }
    if (selectedCategory === "Web & Local Infrastructure") {
      return study.id === "sharjah-dining-infrastructure";
    }
    if (selectedCategory === "Workflow & CRM Automation") {
      return study.id === "governed-sales-engine" || study.id === "real-estate-portal-crm";
    }
    return true;
  });

  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }} 
        className="mb-10 text-center md:text-left"
      >
        <span className="micro-label block mb-4 text-xs font-mono tracking-widest uppercase text-white/60">
          Verified Systems & Architectures
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight mb-6">
          AI, Automation & Digital Transformation Case Studies
        </h1>
        <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl leading-relaxed">
          Technical architectures, operational workflows, and verified digital systems engineered for UAE and international enterprises. Each showcase outlines the operational problem, architecture design, delivered controls, and operating boundaries.
        </p>
      </motion.div>

      {/* Integrity & Verification Notice */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-14 p-6 md:p-8 border border-white/10 bg-white/[0.02] rounded-2xl"
      >
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-green-400 shrink-0 mt-1" />
          <div>
            <h2 className="text-base md:text-lg font-semibold text-white mb-2 font-sans">
              Integrity & Verification Notice: Evidence-First Architecture
            </h2>
            <p className="text-sm md:text-base text-white/75 font-light leading-relaxed font-sans">
              We reject fabricated ROI multipliers, simulated 30x metrics, and unverified client logos. Every project below details the verified challenge, technical architecture, and actual delivered controls from real repository code, database states, and active digital infrastructure.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-white/60">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-400" /> Level A: Repository Code & State Machines</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-400" /> Level B: Local SQLite Runtime Evidence</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-400" /> Zero Unverified Synthetic Claims</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-16 border-b border-white/10 pb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? "bg-white text-black font-semibold shadow-sm"
                : "border border-white/10 text-white/70 hover:border-white/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Showcases List */}
      <div className="space-y-24">
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study) => (
            <motion.div
              key={study.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="border border-white/10 rounded-2xl bg-white/[0.015] p-6 sm:p-8 md:p-10"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium border border-green-500/30 bg-green-500/10 text-green-300">
                    {study.classification}
                  </span>
                  <span className="text-xs font-mono text-white/60">
                    {study.location}
                  </span>
                </div>
                <div className="text-xs font-mono text-white/50 tracking-wider uppercase">
                  {study.industry}
                </div>
              </div>

              {/* Title & Entity */}
              <div className="mb-8">
                <span className="text-xs font-mono text-white/50 block mb-2">
                  Client / Context: {study.client}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-tight leading-snug">
                  {study.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {study.tags.map((tag, j) => (
                    <span 
                      key={j} 
                      className="text-[11px] font-mono text-white/70 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4-Pillar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Pillar 1: Challenge */}
                <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-white/80">
                      1. Operational Challenge
                    </h3>
                  </div>
                  <p className="text-sm text-white/75 font-light leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                {/* Pillar 2: System Architecture */}
                <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-white/80">
                      2. System Architecture
                    </h3>
                  </div>
                  <p className="text-sm text-white/75 font-light leading-relaxed">
                    {study.architecture}
                  </p>
                </div>

                {/* Pillar 3: Delivered Controls */}
                <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-white/80">
                      3. Delivered Technical Controls
                    </h3>
                  </div>
                  <p className="text-sm text-white/75 font-light leading-relaxed mb-3">
                    {study.delivered}
                  </p>
                  <p className="text-xs font-mono text-white/50 border-t border-white/5 pt-2">
                    Safeguards: {study.safeguards}
                  </p>
                </div>

                {/* Pillar 4: Operational Focus */}
                <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-2 mb-3">
                    <Workflow className="w-4 h-4 text-purple-400" />
                    <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-white/80">
                      4. Operational Focus & Scope
                    </h3>
                  </div>
                  <p className="text-sm text-white/75 font-light leading-relaxed">
                    {study.outcomes}
                  </p>
                </div>
              </div>

              {/* Verified Results & Hub Link */}
              <div className="pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
                    Verified Execution Signals
                  </h4>
                  <ul className="space-y-1.5">
                    {study.results.map((res, k) => (
                      <li key={k} className="flex items-start gap-2.5 text-xs text-white/80 font-sans">
                        <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 pt-2 lg:pt-0">
                  <Link
                    href={study.serviceLink}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all"
                  >
                    <span>{study.serviceLinkLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Conversion CTA to Free Growth Audit */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="mt-28 p-10 md:p-14 border border-white/10 rounded-2xl text-center bg-white/[0.02]"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-xs font-mono mb-6">
          <CheckCircle2 className="w-3.5 h-3.5" /> Direct Technical Assessment
        </div>
        <h2 className="text-3xl md:text-5xl font-serif mb-4">
          Evaluate Your System Readiness with an Honest Technical Audit
        </h2>
        <p className="text-white/70 font-light mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          We don't sell speculative hype or one-size-fits-all chatbots. We evaluate your active workflows, map manual data bottlenecks, and determine whether custom AI, deterministic automation, or clean web architecture will deliver measurable operational efficiency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/free-growth-audit" 
            className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center justify-center gap-2"
          >
            Request Free Growth & Systems Audit <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/contact" 
            className="w-full sm:w-auto border border-white/20 text-white px-8 py-4 rounded-full font-medium text-xs tracking-widest uppercase hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
          >
            Speak With An Automation Architect
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
