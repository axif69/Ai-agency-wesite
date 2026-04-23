import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, ShieldCheck, Database, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Meteors from "../../components/animations/Meteors";

export default function AgenticFinanceUAE() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    {
      q: "Does the AI handle VAT and UAE Corporate Tax compliance?",
      a: "Yes. Our agents are specifically trained on FTA (Federal Tax Authority) regulations to ensure that every automated transaction and report is fully compliant with UAE tax laws."
    },
    {
      q: "Can this integrate with Tally or Zoho Books?",
      a: "Absolutely. We build custom API bridges for legacy systems like Tally and deep-layer integrations for modern ERPs like Zoho Books, Oracle NetSuite, and SAP."
    },
    {
      q: "Is the data stored locally in the UAE?",
      a: "We prioritize data sovereignty. Our solutions can be deployed on UAE-based infrastructure like G42 Khazna or AWS UAE Regions to meet local data residency requirements."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Agentic Finance & Compliance AI UAE | Asif Digital"
        description="Automate financial audits, KYC, and corporate tax compliance with sovereign AI agents. Built for UAE investment firms and enterprises in Dubai and Abu Dhabi."
        keywords="AI finance automation UAE, UAE Corporate Tax AI, KYC automation Dubai, Sovereign finance AI"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Agentic Finance & Compliance Automation",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Abu Dhabi" }
          ],
          "description": "Autonomous AI agents for financial reconciliation, regulatory compliance, and tax reporting tailored for the UAE market."
        }}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      
      {/* ── 1. Immersive Hero ── */}
      <section className="relative min-h-[90svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex items-center justify-center gap-3">
             <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400/80">
              Tier 1: Sovereign AI Solutions
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 leading-[0.9]">
            Agentic Finance & <br/><span className="italic text-white/40">Compliance.</span>
          </motion.h1>
          {/* Hidden SEO Image */}
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format,compress&fm=webp&q=75&w=1200" 
            alt="Agentic Finance and Corporate Tax Compliance AI UAE" 
            className="sr-only"
            loading="lazy"
          />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Stop waiting for month-end reports. Deploy autonomous Agentic swarms that handle reconciliation, KYC, and UAE Corporate Tax compliance in real-time. Unshakeable financial integrity.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto">
              Initiate Financial Audit <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
        <Meteors number={20} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.03)_0%,_transparent_70%)] pointer-events-none blur-[100px]" />
      </section>

      {/* ── 2. The FOMO / Market Context ── */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Your compliance team is <br /><span className="italic text-white/40">exhausted by manual logs.</span></h2>
            <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
              <p>In the UAE's evolving regulatory landscape, a single reporting oversight can lead to massive fines. Human auditors take weeks to spot discrepancies; our finance agents identify them in milliseconds.</p>
              <p>Most regional firms still rely on spreadsheets. In a high-speed investment environment like Dubai Internet City or ADGM, that latency is a liability. Our Agents bridge the gap between your bank APIs and your ERP automatically.</p>
              <p className="text-white font-medium border-l-2 border-white pl-4 mt-8">
                Autonomous Agents don't just report—they predict. Identifying liquidity gaps and compliance risks before they become balance-sheet burdens.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl">
              <div className="text-3xl font-serif text-white mb-2">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-4">Reconciliation Accuracy</div>
              <p className="text-xs text-white/50">Zero human error in matching thousands of daily ledger entries across multiple currencies.</p>
            </div>
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-2xl">
              <div className="text-3xl font-serif text-white mb-2">90% Faster</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-4">KYC Processing</div>
              <p className="text-xs text-white/50">Rapid document verification and risk scoring for new corporate accounts in Dubai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Financial Intelligence <span className="italic text-white/40">Redefined.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Database className="w-10 h-10 text-white/30 mb-6" />, title: "Automated Reconciliation", desc: "Agents connect to your bank APIs and ERP (SAP, Oracle, Zoho) to reconcile accounts daily, not monthly." },
              { icon: <ShieldCheck className="w-10 h-10 text-white/30 mb-6" />, title: "Regulatory Guardrails", desc: "Built-in UAE Corporate Tax and VAT rules ensure every automated entry follows FTA standards." },
              { icon: <Zap className="w-10 h-10 text-white/30 mb-6" />, title: "Real-time Auditing", desc: "Continuous monitoring of all financial activity to flag suspicious transactions and ensure unshakeable integrity." }
            ].map((capability, i) => (
              <div key={i} className="p-10 border border-white/10 rounded-2xl bg-white/[0.02]">
                {capability.icon}
                <h3 className="text-2xl font-serif mb-4">{capability.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{capability.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-emerald-400">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">Finance AI FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-emerald-400 transition-colors">
                  {faq.q}
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-white/60 font-light leading-relaxed text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Synergy Grid */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="micro-label block mb-4">Strategic Synergy</span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Related Solutions</h2>
            </div>
            <Link to="/services" className="text-xs font-bold uppercase tracking-widest hover:text-white/70 transition-colors">View All Services —</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Logistics AI", link: "/services/autonomous-logistics-supply-chain-uae", desc: "Automate supply chain rerouting alongside your financial swarms." },
              { title: "SaaS Development", link: "/services/saas-development-specialist-uae", desc: "Build unshakeable cloud infrastructure to power your finance agents." },
              { title: "AI HR & Workforce", link: "/services/ai-hr-emiratization-tracking-uae", desc: "Manage payroll and workforce tracking with intelligent agents." }
            ].map((s, i) => (
              <Link key={i} to={s.link} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                <h3 className="text-xl font-serif mb-4 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed mb-6">{s.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white">Explore Solution</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
