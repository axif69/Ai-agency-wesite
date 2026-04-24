import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, ShieldCheck, Database, Zap, CheckCircle, Landmark, Scale, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Meteors from "../../components/animations/Meteors";

export default function DubaiCorporateAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-emerald-500/30">
      <SEO 
        title="Dubai Corporate AI | DIFC & ADGM Finance Automation"
        description="Autonomous AI solutions for Dubai financial firms. Automate AML, KYC, and UAE Corporate Tax compliance with Sovereign Agentic infrastructure."
        keywords="Dubai Finance AI, DIFC automation, ADGM compliance AI, UAE Corporate Tax AI, Autonomous auditing Dubai"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Dubai Corporate AI & Compliance",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": { "@type": "City", "name": "Dubai" },
          "description": "Enterprise-grade AI for financial reconciliation and regulatory compliance in Dubai's financial centers."
        }}
        faqSchema={[
          {
            question: "How does AI handle UAE Federal Tax Authority (FTA) compliance?",
            answer: "Our agents are trained natively on UAE tax law. They perform autonomous ledger classification and provision calculations, ensuring your corporate tax filings are 100% accurate and audit-ready at all times."
          },
          {
            question: "Can this AI replace manual KYC/AML checks in DIFC?",
            answer: "Yes. Our 'Compliance Swarms' perform real-time identity verification and sanctions screening against global databases, reducing onboarding time for new accounts by 90% while maintaining DIFC regulatory standards."
          }
        ]}
      />
      
      {/* ── Hero ── */}
      <section className="relative min-h-[80svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.3em] text-emerald-400">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             DUBAI CORPORATE NODE: ACTIVE
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 leading-[0.9]">
            Corporate <br/><span className="italic text-white/40">Sovereignty.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            For DIFC and ADGM enterprises, compliance is not negotiable. We deploy autonomous agents that protect your balance sheet and satisfy the UAE's strictest regulatory frameworks.
          </motion.p>
        </motion.div>
        <Meteors number={20} />
      </section>

      {/* ── Technical Solutions ── */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-20 text-center">Engineered for <span className="italic">High-Stakes Finance.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Landmark className="w-8 h-8 text-emerald-400" />, 
                title: "Autonomous Auditing", 
                desc: "Continuous, real-time reconciliation of ledgers across multiple currencies and jurisdictions. Zero human error." 
              },
              { 
                icon: <Scale className="w-8 h-8 text-emerald-400" />, 
                title: "Regulatory Guardrails", 
                desc: "Built-in compliance for UAE Law No. 45 and FTA standards. Your data residency is physically guaranteed." 
              },
              { 
                icon: <TrendingUp className="w-8 h-8 text-emerald-400" />, 
                title: "ROI Forecasting", 
                desc: "Predictive capital allocation models that identify liquidity gaps before they impact your operations." 
              }
            ].map((s, i) => (
              <div key={i} className="p-10 border border-white/5 bg-white/[0.02] rounded-3xl hover:bg-white/[0.05] transition-all">
                <div className="mb-8">{s.icon}</div>
                <h3 className="text-2xl font-serif mb-4">{s.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── "Proper Answer" Section ── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-6 block">Financial Intelligence Report</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">The End of <br/><span className="italic text-white/40">Reporting Latency.</span></h2>
          <div className="space-y-12">
            <div className="p-8 border-l-2 border-emerald-500 bg-emerald-500/5">
              <h3 className="text-xl font-bold mb-4">Sovereign Financial Architecture (DIFC Standard)</h3>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                We deploy a "Trust-Zero" neural stack for Dubai financial institutions, satisfying UAE Federal Decree-Law No. 45:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90">Regional Data Residency</h4>
                    <p className="text-xs text-white/50">Processing of all DIFC/ADGM entity data exclusively on G42 Khazna infrastructure within the UAE border.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90">Autonomous AML Screening</h4>
                    <p className="text-xs text-white/50">Real-time sanctions screening and pattern detection that exceeds standard regulatory latency benchmarks.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90">Real-Time Ledger Sync</h4>
                    <p className="text-xs text-white/50">Agents autonomously match bank transaction logs to ERP records in sub-second intervals, ensuring a 'Live Balance' view.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90">Corporate Tax Provisioning</h4>
                    <p className="text-xs text-white/50">Automated calculation and classification of tax obligations as per current UAE Federal Tax Authority mandates.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-8 border-l-2 border-emerald-500 bg-emerald-500/5">
              <h3 className="text-xl font-bold mb-4">Eliminating Extraterritorial Data Risk</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Most financial AI products are hosted in foreign jurisdictions (US/EU), exposing DIFC firms to the 'Cloud Act' overreach. Our Sovereign nodes operate entirely within the UAE legal perimeter, ensuring your corporate intelligence and client secrets are protected by the full force of UAE Sovereign Law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-white/5 text-center">
        <h2 className="text-4xl font-serif mb-10">Ready to <span className="italic">Secure your Finance?</span></h2>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
          Schedule Financial Briefing
        </button>
      </section>
    </div>
  );
}
