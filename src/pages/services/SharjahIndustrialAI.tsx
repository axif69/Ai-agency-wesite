import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Factory, Activity, HardDrive, ShieldAlert, Cpu, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Meteors from "../../components/animations/Meteors";

export default function SharjahIndustrialAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-blue-500/30">
      <SEO 
        title="Sharjah Industrial AI | Predictive Maintenance & SAIF Zone Automation"
        description="Technical AI solutions for Sharjah manufacturing and logistics. Reduce downtime by 35% with predictive maintenance and autonomous SAIF Zone supply chains."
        keywords="Sharjah Industrial AI, SAIF Zone automation, Predictive maintenance Sharjah, Manufacturing AI UAE, Sharjah logistics automation"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Sharjah Industrial AI & Automation",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": { "@type": "City", "name": "Sharjah" },
          "description": "Industrial-grade AI for predictive maintenance and supply chain resilience in Sharjah's manufacturing hubs."
        }}
        faqSchema={[
          {
            question: "How do I implement predictive maintenance in a Sharjah factory?",
            answer: "Step 1: Sensor integration (Thermal/Vibration). Step 2: Local Edge compute deployment for Law 45 compliance. Step 3: Neural anomaly detection. Our system identifies sub-threshold mechanical stress 72 hours before a failure occurs."
          },
          {
            question: "What is the specific ROI for SAIF Zone logistics automation?",
            answer: "Automated routing and warehouse agents typically deliver a 22% reduction in operational overhead within 6 months by eliminating manual dispatch latency and optimizing fuel/route efficiency across the Sharjah-Dubai corridor."
          }
        ]}
      />
      
      {/* ── Hero ── */}
      <section className="relative min-h-[80svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.3em] text-blue-400">
             <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             SHARJAH INDUSTRIAL NODE: ACTIVE
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 leading-[0.9]">
            Industrial <br/><span className="italic text-white/40">Resilience.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            For Sharjah's manufacturing powerhouses, AI is not a chatbot. It is the end of unplanned downtime. We build sovereign neural grids for factory floors and logistics hubs.
          </motion.p>
        </motion.div>
        <Meteors number={30} />
      </section>

      {/* ── Technical Solutions ── */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-20 text-center">Engineered for <span className="italic">Sharjah Industry.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Activity className="w-8 h-8 text-blue-400" />, 
                title: "Predictive Maintenance", 
                desc: "Real-time acoustic and vibrational analysis for SAIF Zone manufacturing lines. Detect failures before they happen." 
              },
              { 
                icon: <Settings className="w-8 h-8 text-blue-400" />, 
                title: "Process Optimization", 
                desc: "Autonomous recalibration of production parameters to maximize yield and minimize energy waste in Sharjah Industrial Areas." 
              },
              { 
                icon: <Zap className="w-8 h-8 text-blue-400" />, 
                title: "Logistics Autonomy", 
                desc: "Sovereign agents for Khalid Port and Sharjah Airport hubs. Real-time rerouting that bypasses regional bottlenecks." 
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
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-6 block">Industrial Intelligence Report</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">Solving the <br/><span className="italic text-white/40">Downtime Crisis.</span></h2>
          <div className="space-y-12">
            <div className="p-8 border-l-2 border-blue-500 bg-blue-500/5">
              <h3 className="text-xl font-bold mb-4">The SAIF Zone Predictive Maintenance Protocol</h3>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                Our deployment follows a 3-tier hardening process for Sharjah manufacturing plants:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex gap-4">
                  <span className="text-blue-400 font-mono">01.</span>
                  <div>
                    <h4 className="font-bold text-white/90">Edge Ingress</h4>
                    <p className="text-xs text-white/50">Installation of sub-millisecond vibration and thermal sensors on critical rotating equipment.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-mono">02.</span>
                  <div>
                    <h4 className="font-bold text-white/90">Sovereign Neural Grid</h4>
                    <p className="text-xs text-white/50">Local inference nodes process data on-site, ensuring zero data leakage to foreign clouds.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-mono">03.</span>
                  <div>
                    <h4 className="font-bold text-white/90">Anomaly Synthesis</h4>
                    <p className="text-xs text-white/50">AI agents detect sub-threshold wear patterns, triggering automated work orders via your ERP.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-mono">04.</span>
                  <div>
                    <h4 className="font-bold text-white/90">Resilience Feedback</h4>
                    <p className="text-xs text-white/50">System learns from every failure, creating a self-healing industrial architecture.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-8 border-l-2 border-blue-500 bg-blue-500/5">
              <h3 className="text-xl font-bold mb-4">Sharjah Logistics: Rerouting Under Geopolitical Friction</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Logistics firms in the Northern Emirates face constant maritime volatility. Our "Supply Chain Swarms" are programmed to monitor Khalid Port and SHJ Cargo APIs 24/7. When a disruption signal is detected, the AI executes a "Pivot-to-Air" strategy, securing capacity at Sharjah International Airport before spot rates skyrocket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-white/5 text-center">
        <h2 className="text-4xl font-serif mb-10">Ready to <span className="italic">Automate?</span></h2>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
          Schedule Industrial Audit
        </button>
      </section>
    </div>
  );
}
