import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import SEO from "../../components/SEO";
import { ArrowRight, ShieldCheck, FileText, CheckCircle, Database, Lock, Zap, BarChart } from "lucide-react";
import { TextGenerateEffect } from "../../components/animations/TextGenerateEffect";

export default function AgenticFinanceUAE() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Agentic Finance & Compliance Automation UAE | Asif Digital"
        description="Reduce back-office manual review hours to seconds. UAE-localized AI agents for CBUAE compliance, invoice matching, and financial auditing hosted on G42 sovereign compute."
        keywords="Finance AI Dubai, CBUAE compliance automation, Agentic finance UAE, G42 sovereign AI"
      />
      
      {/* ── 1. Immersive Hero ── */}
      <section className="relative min-h-[90svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex items-center justify-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80">
              Tier 1: Sovereign AI Solutions
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 leading-[0.9]">
            Agentic Finance <br/><span className="italic text-white/40">& Compliance.</span>
          </motion.h1>
          <TextGenerateEffect
            words="Compress 3-week manual financial audits into 4 seconds. We architect UAE-localized AI agents that automate CBUAE reporting, invoice matching, and governance—hosted exclusively on Khazna and G42 sovereign compute."
            className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-10"
          />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto">
              Initiate Financial Audit <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
        
        {/* Background gradient effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none blur-[100px]" />
      </section>

      {/* ── 2. The FOMO / Market Context ── */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">The highest cost in your finance department isn't software. <span className="italic text-white/40">It's human latency.</span></h2>
            <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
              <p>In the rapid regulatory shifts of the 2026 UAE market, relying on a human workforce for invoice matching and compliance reporting is a critical vulnerability. Human accountants suffer from fatigue, require costly visas (averaging AED 12,000+), housing allowances, and are susceptible to regional remote-work mandates.</p>
              <p>A single manual data entry error in CBUAE (Central Bank of the UAE) compliance reporting can result in catastrophic fines. Yet, 84% of mid-market enterprises in Dubai still rely on manual spreadsheet validation.</p>
              <p className="text-white font-medium border-l-2 border-white pl-4 mt-8">
                An Agentic AI Employee costs 70% less, operates 24/7/365, and executes with 99.99% accuracy.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-2xl">
              <div className="text-3xl font-serif text-white mb-2">AED 250k+</div>
              <div className="text-[10px] uppercase tracking-widest text-red-500/80 font-bold mb-4">Yearly Cost / Human</div>
              <p className="text-xs text-white/50">Base salary, visa, health insurance, and end-of-service accrual for one mid-level accountant.</p>
            </div>
            <div className="p-8 border border-green-500/20 bg-green-500/5 rounded-2xl">
              <div className="text-3xl font-serif text-white mb-2">&lt; 1 sec</div>
              <div className="text-[10px] uppercase tracking-widest text-green-500/80 font-bold mb-4">Agentic Audit Speed</div>
              <p className="text-xs text-white/50">Time taken for an AI agent to cross-verify a 50-page invoice against bank statements.</p>
            </div>
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-2xl sm:col-span-2">
              <div className="text-3xl font-serif text-white mb-2">0%</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-4">Geopolitical Risk</div>
              <p className="text-xs text-white/50">Zero exposure to flight cancellations, evacuation protocols, or sick leave. Total business continuity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Sovereign Infrastructure (G42/Khazna) ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4 block">Uncompromising Security</span>
          <h2 className="text-4xl md:text-6xl font-serif">Sovereign Data. <span className="italic text-white/40">UAE Native Compute.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg">Your financial data never leaves the Emirates. We deploy our AI models exclusively on state-backed sovereign infrastructure.</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center">
            <Database className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Khazna Data Centers</h3>
            <p className="text-sm text-white/50 font-light">Models hosted locally in Dubai and Abu Dhabi Khazna facilities, guaranteeing 100% data residency and compliance with UAE data privacy laws.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center">
            <Lock className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">G42 Integration</h3>
            <p className="text-sm text-white/50 font-light">Leveraging G42's Jais Arabic LLM capabilities for bilingual financial extraction, ensuring flawless parsing of Arabic invoices and tax documents.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center">
            <ShieldCheck className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Air-Gapped Deployment</h3>
            <p className="text-sm text-white/50 font-light">For ultra-sensitive financial institutions, agents can be deployed in secure, air-gapped environments disconnected from the public internet.</p>
          </div>
        </div>
      </section>

      {/* ── 4. Core Capabilities Detailed ── */}
      <section className="py-32 px-6 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Agentic Workflows <span className="italic text-white/40">in Action.</span></h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-5 p-10 border border-white/10 rounded-3xl bg-[#0a0a0a]">
                <FileText className="w-10 h-10 text-white/50 mb-6" />
                <h3 className="text-2xl font-serif mb-4">Autonomous Invoice & Receipt Reconciliation</h3>
                <p className="text-white/50 font-light mb-6">Replace entire teams of data entry clerks. Our agents automatically ingest invoices via email, extract line-item data in English and Arabic, match them against purchase orders, and draft the GL entries in your ERP (Oracle, SAP, Xero).</p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-green-500/70" /> 100% elimination of manual typing</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-green-500/70" /> Multi-currency conversion parsing</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-green-500/70" /> Discrepancy flagging to human approvers</li>
                </ul>
              </div>
              
              <div className="md:col-span-7 flex flex-col gap-6">
                <div className="flex-1 p-10 border border-white/10 rounded-3xl bg-[#0a0a0a]">
                  <Zap className="w-8 h-8 text-white/50 mb-6" />
                  <h3 className="text-2xl font-serif mb-4">CBUAE & FTA Compliance Governance</h3>
                  <p className="text-white/50 font-light">Agents continuously monitor all outgoing ledger entries for compliance with the Federal Tax Authority (FTA) Corporate Tax and VAT regulations, applying predictive risk modeling to flag non-compliant transactions before tax season.</p>
                </div>
                <div className="flex-1 p-10 border border-white/10 rounded-3xl bg-[#0a0a0a]">
                  <BarChart className="w-8 h-8 text-white/50 mb-6" />
                  <h3 className="text-2xl font-serif mb-4">Real-Time CFO Dashboards</h3>
                  <p className="text-white/50 font-light">Traditional reporting involves asking analysts to pull data over weeks. Our CFO Agents allow you to text your database via a secure WhatsApp interface: <span className="italic">"What is our cash runway if Jebel Ali logistics costs increase by 15%?"</span> and receive instantaneous, modeled answers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Final CTA ── */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-serif mb-8">Stop paying for human latency. <br/><span className="italic text-white/40">Architect for the future.</span></h2>
        <p className="text-lg text-white/50 font-light mb-12">The transition from manual back-office labor to an Agentic Finance architecture takes approximately 45 days. Contact Khalid today to model your ROI.</p>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 mx-auto">
          Begin Operational Audit <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
