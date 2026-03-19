import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import HeroParticles from "../components/HeroParticles";
import TiltCard from "../components/animations/TiltCard";
import SpotlightCard from "../components/animations/SpotlightCard";
import ParticleBackground from "../components/animations/ParticleBackground";
import MagneticButton from "../components/animations/MagneticButton";
import { TextGenerateEffect } from "../components/animations/TextGenerateEffect";
import { Network, Database, Brain, Globe, Shield, Activity, ChevronRight, Play, Server, ArrowRight, TrendingUp, MessageSquare, Briefcase, Zap } from "lucide-react";

/* ─────────────── DATA ─────────────── */

const sovereignSolutions = [
  {
    title: "Autonomous Sales Swarms",
    desc: "B2B WhatsApp & Email agents that qualify leads, negotiate, and close deals 24/7 without fatigue or geographical limits.",
    icon: <MessageSquare className="w-6 h-6" />,
    link: "/services/whatsapp-automation-gcc",
  },
  {
    title: "Answer Engine Optimization (AEO)",
    desc: "Dominate Gemini, Perplexity, and ChatGPT. We position your enterprise where UAE decision-makers do 80% of their research.",
    icon: <Globe className="w-6 h-6" />,
    link: "/services/seo-agency-dubai-sharjah-uae",
  },
  {
    title: "Sovereign Digital Ecosystems",
    desc: "Native apps and portals hosted on unshakeable UAE infrastructure (G42/Khazna) ensuring 100% data sovereignty and uptime.",
    icon: <Database className="w-6 h-6" />,
    link: "/services/web-development-dubai-uae",
  }
];

const foundationalServices = [
  {
    title: "Web & Ecommerce Development",
    desc: "High-performance, headless commerce architectures designed to scale locally and globally.",
    icon: <Briefcase className="w-5 h-5" />,
    link: "/services/ecommerce-website-development-dubai",
  },
  {
    title: "Corporate Branding",
    desc: "Identity systems engineered for authority, trust, and premium market positioning.",
    icon: <Shield className="w-5 h-5" />,
    link: "/services/branding-agency-dubai-sharjah",
  },
  {
    title: "Search & Paid Media (SEO/PPC)",
    desc: "Data-driven acquisition channels to capture high-intent traffic across the Emirates.",
    icon: <TrendingUp className="w-5 h-5" />,
    link: "/services/ppc-google-ads-agency-dubai",
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ROI Calculator State
  const [employees, setEmployees] = useState(10);
  const humanCostPerYear = 650000; // AED per mid-level employee fully loaded
  const agentCostPerYear = (humanCostPerYear * 0.3); // 70% cheaper
  
  const totalHumanCost = employees * humanCostPerYear;
  const totalAgentCost = employees * agentCostPerYear;
  const totalSavings = totalHumanCost - totalAgentCost;

  return (
    <div ref={containerRef} className="relative bg-[#050505]">
      <SEO
        title="Sovereign AI Architecture & Business Continuity | Asif Digital"
        description="We architect agentic AI ecosystems and resilient digital infrastructure for UAE enterprises. Guarantee business continuity and decouple from geopolitical risk."
        keywords="Sovereign AI UAE, AI Agent Dubai, Business Continuity UAE, AI Automation Sharjah, Digital Ecosystems"
      />

      {/* ── 1. The "Authority" Hero Section ── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 pt-24 sm:pt-0">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center flex flex-col items-center -mt-20 md:-mt-32 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mb-6 flex items-center justify-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80">
              UAE Sovereign Infrastructure Online
            </span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-4xl sm:text-6xl md:text-8xl lg:text-[7vw] font-serif font-bold leading-[0.9] tracking-tight mb-8 max-w-7xl mx-auto drop-shadow-2xl">
            Architecting <span className="italic text-white/70">Sovereign</span><br />Intelligence.
          </motion.h1>
          
          <TextGenerateEffect 
            words="Decoupling UAE productivity from geopolitical risk. We build continuous, fault-tolerant AI ecosystems and digital infrastructure for enterprises."
            className="text-lg md:text-xl lg:text-3xl text-white font-medium max-w-4xl mx-auto font-sans leading-tight mb-12 drop-shadow-md"
          />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0 justify-center z-10">
            <MagneticButton>
              <Link to="/contact" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Book an Operational Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
        <HeroParticles />
      </section>

      {/* ── Trust Signals Bar ── */}
      <section className="py-8 bg-black border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-white/70" /> 100% Data Sovereignty</div>
          <div className="flex items-center gap-2"><Database className="w-4 h-4 text-white/70" /> UAE Hosted Compute</div>
          <div className="flex items-center gap-2"><Brain className="w-4 h-4 text-white/70" /> Agentic Architecture</div>
          <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-white/70" /> War-Agnostic Infrastructure</div>
        </div>
      </section>

      {/* ── 2. The Problem / Market Context ("Why Now") ── */}
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] mb-10">
              The standard office is fragile. 2026 demands <span className="italic text-white/70">unbreakable operations.</span>
            </h2>
            <div className="space-y-6 text-white/80 font-light xl:text-lg leading-relaxed">
              <p>In the wake of regional volatility and rapid workforce shifts across the GCC, relying solely on human capital introduces a critical single point of failure. When flights pause, logistics disruption hits, and remote mandates are issued—does your business stop?</p>
              <p>The 2026 UAE business environment demands structural resilience. A human mid-level office worker costs upwards of AED 650,000 annually when factoring in visas, mandatory housing, and end-of-service gratuity—all for 8 hours of daily output heavily vulnerable to global events.</p>
              <p className="text-white font-medium border-l-2 border-white pl-4 mt-8 py-2">
                We build Agentic Digital Employees. They do not require visas. They do not sleep. They execute complex reasoning tasks in milliseconds. And they reside entirely on <span className="text-green-400">G42 and Khazna</span> state-backed sovereign infrastructure, ensuring 100% data residency and absolute business continuity.
              </p>
            </div>
            <div className="mt-12 flex gap-8">
              <div>
                <div className="text-4xl font-serif text-white mb-2">98%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Of UAE Executives prioritize AI Sovereignty</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-white mb-2">70%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Reduction in operational overhead</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] p-10 flex flex-col justify-center">
             {/* New Animated Particle Background */}
            <ParticleBackground />

            {/* Existing Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-20 z-[1]" />
             <div className="relative z-10 space-y-8">
                <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-xl">
                  <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2">Legacy Vulnerability</h4>
                  <p className="text-white/60 text-sm">Human dependency exposed to evacuation risks, high visa overheads, and mandatory remote disruptions.</p>
                </div>
                <div className="flex justify-center"><ArrowRight className="w-6 h-6 rotate-90 text-white/20" /></div>
                <div className="p-6 border border-green-500/30 bg-green-500/10 rounded-xl">
                  <h4 className="text-green-400 font-bold text-xs uppercase tracking-widest mb-2">Sovereign Architecture</h4>
                  <p className="text-white/80 text-sm">Decentralized agentic swarms hosted locally. 100% uptime. Zero geographical dependency.</p>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Two-Tiered Solutions Grid ── */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none opacity-50" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Strategic Capabilities</h2>
            <p className="text-white/40 text-xl font-light">From high-ticket agentic automation to robust digital foundations.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Tier 1 */}
            <div>
               <div className="mb-8 flex items-center gap-4">
                 <div className="h-[1px] flex-grow bg-white/20"></div>
                 <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white">Tier 1: Sovereign AI Solutions</h3>
                 <div className="h-[1px] flex-grow bg-white/20"></div>
               </div>
               
               <div className="space-y-6">
                 {sovereignSolutions.map((sol, i) => (
                   <TiltCard key={i}>
                     <Link to={sol.link} className="block group w-full h-full">
                       <SpotlightCard className="p-8 w-full h-full bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors duration-300">
                         <div className="flex justify-between items-start mb-6 relative z-10">
                           <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                             {sol.icon}
                           </div>
                           <span className="text-white/30 group-hover:text-white transition-colors">
                             <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 transform origin-center" />
                           </span>
                         </div>
                         <h4 className="text-2xl font-serif mb-3 group-hover:text-green-400 transition-colors relative z-10">{sol.title}</h4>
                         <p className="text-white/60 font-light text-sm relative z-10">{sol.desc}</p>
                       </SpotlightCard>
                     </Link>
                   </TiltCard>
                 ))}
               </div>
            </div>

            {/* Tier 2 */}
            <div>
               <div className="mb-8 flex items-center gap-4">
                 <div className="h-[1px] flex-grow bg-white/10"></div>
                 <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Tier 2: Core Infrastructure</h3>
                 <div className="h-[1px] flex-grow bg-white/10"></div>
               </div>
               
               <div className="space-y-6">
                 {foundationalServices.map((sol, i) => (
                   <Link to={sol.link} key={i} className="block p-8 rounded-2xl border border-white/5 bg-transparent hover:bg-white/[0.02] hover:border-white/20 transition-all duration-300 group opacity-80 hover:opacity-100">
                      <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white/80 transition-all">
                          {sol.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-serif mb-2 text-white/80">{sol.title}</h4>
                          <p className="text-white/40 text-sm leading-relaxed">{sol.desc}</p>
                        </div>
                      </div>
                   </Link>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Intelligence Arbitrage ROI Calculator ── */}
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="micro-label block mb-4">Intelligence Arbitrage</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">The Cost of <span className="italic text-white/40">Human Capital.</span></h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">Calculate the financial exposure of your current mid-level office headcount vs. an Agentic deployment.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl">
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <label className="text-xs uppercase tracking-widest font-bold text-white/60">Number of Mid-Level Employees</label>
              <span className="text-3xl font-serif text-white">{employees}</span>
            </div>
            <input 
              type="range" 
              min="1" max="100" 
              value={employees} 
              onChange={(e) => setEmployees(parseInt(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
             <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
                <h4 className="text-[10px] uppercase tracking-widest text-red-500/80 font-bold mb-4">Current Human Overhead</h4>
                <div className="text-3xl font-serif text-white mb-2">AED {(totalHumanCost / 1000000).toFixed(2)}M <span className="text-sm font-sans text-white/40">/ yr</span></div>
                <ul className="text-xs text-white/40 space-y-2 mt-4">
                  <li>• High Visa & Gov Fees</li>
                  <li>• Mandatory Flight/Housing Allowances</li>
                  <li>• Vulnerable to crisis remote mandates</li>
                </ul>
             </div>
             
             <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
                <h4 className="text-[10px] uppercase tracking-widest text-green-500/80 font-bold mb-4">Agentic Architecture Cost</h4>
                <div className="text-3xl font-serif text-white mb-2">AED {(totalAgentCost / 1000000).toFixed(2)}M <span className="text-sm font-sans text-white/40">/ yr</span></div>
                 <ul className="text-xs text-white/60 space-y-2 mt-4">
                  <li>• Zero Visa or Housing overhead</li>
                  <li>• 24/7/365 Continuous Uptime</li>
                  <li>• Housed in Secure UAE Datacenters</li>
                </ul>
             </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <div className="text-[12px] uppercase tracking-widest text-white/60 font-bold mb-2">Projected Annual Savings</div>
            <div className="text-5xl md:text-7xl font-serif text-white">AED {(totalSavings / 1000000).toFixed(2)}M</div>
          </div>
        </div>
      </section>

      {/* ── 5. "Khalid" Integration ── */}
      <section className="py-32 px-6 md:px-12 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-20 h-20 mx-auto mb-8 bg-black rounded-full flex items-center justify-center text-white shadow-2xl">
            <Zap className="w-8 h-8" />
          </div>
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl font-serif tracking-tighter leading-tight mb-8">
            Meet the <span className="italic opacity-40">Architect.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-black/60 text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
            We don't do standard "Contact Us" forms. Speak with Khalid, our Strategic Intake Agent, to begin your business resilience audit immediately.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            {/* Let user click directly to open chatbot / or linking to a focus page */}
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl mx-auto hover:scale-105 active:scale-95">
              Begin Audit with Khalid <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
