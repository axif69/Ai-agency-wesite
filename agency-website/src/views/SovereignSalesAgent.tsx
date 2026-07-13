"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import Link from "next/link";

import HeroParticles from "../components/HeroParticles";
import TiltCard from "../components/animations/TiltCard";
import SpotlightCard from "../components/animations/SpotlightCard";
import ParticleBackground from "../components/animations/ParticleBackground";
import MagneticButton from "../components/animations/MagneticButton";
import LazySection from "../components/LazySection";
import { TextGenerateEffect } from "../components/animations/TextGenerateEffect";
import { Network, Database, Brain, Globe, Shield, Activity, ChevronRight, Play, Server, ArrowRight, TrendingUp, MessageSquare, Briefcase, Zap, Workflow, Languages, Phone, CheckCircle2, Search, Crosshair, BarChart, Settings, Check, Clock, UserCheck, ShieldCheck } from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudyData";

export default function SovereignSalesAgent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#050505] text-white">
      
      {/* ── 1. HERO SECTION (Option 2 + Option B Subtext) ── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 pt-24 sm:pt-0">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center flex flex-col items-center -mt-10 md:-mt-20 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mb-6 flex items-center justify-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80">
              Dubai's Premier AI Automation & Digital Architects
            </span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-4xl sm:text-6xl md:text-7xl lg:text-[6vw] font-serif font-bold leading-[1.1] tracking-tight mb-8 max-w-7xl mx-auto drop-shadow-2xl text-balance">
            Stop Renting Leads. Start Owning <br className="hidden md:block" />
            <span className="italic text-white/70 tracking-normal pr-2">Acquisition Infrastructure.</span>
          </motion.h1>
          
          <TextGenerateEffect 
            words="Your competitors are deploying autonomous AI sales agents. The question isn't IF you need one. It's whether you can afford to wait."
            className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-4xl mx-auto font-sans leading-relaxed mb-8 drop-shadow-md text-balance"
          />

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-white/60 text-sm max-w-2xl mx-auto mb-12">
            50+ autonomous agents deployed across GCC enterprises and high-growth SMBs. AED 18M+ in client revenue generated. 14-day deployment. 30-day money-back guarantee. Join the companies ditching manual SDRs.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0 justify-center z-10">
            <MagneticButton>
              <Link href="/contact" aria-label="Schedule Your Free Competitive Audit" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-pointer">
                Schedule Your Free Competitive Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="#case-studies" className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md">
                Explore Case Studies <ChevronRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
        <HeroParticles />
      </section>

      <LazySection className="contents" placeholderClassName="block min-h-[4200px] bg-[#050505]" rootMargin="300px">
      {/* ── 2. YOUR WEBSITE IS YOUR SALES INFRASTRUCTURE ── */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="micro-label block mb-4 text-[#0066FF]">Digital Evolution</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-[1.1] mb-10 text-balance">
              Your Website is Your <br/><span className="italic text-white/70">Sales Infrastructure.</span>
            </h2>
            <div className="space-y-6 text-white/80 font-normal xl:text-lg leading-relaxed">
              <p className="text-xl font-medium text-white mb-2">A standard website sits there. Ours hunts.</p>
              <p>Most B2B websites are digital brochures—passive, reactive, waiting for visits. We install autonomous AI infrastructure that does three things simultaneously:</p>
            </div>
            
            <div className="mt-10 space-y-8">
              {[
                { title: "HUNTS", desc: "Scans your target market, identifies high-value prospects", icon: <Search className="text-[#0066FF]" /> },
                { title: "SCORES", desc: "AI qualifies leads in real-time, filters for sales-readiness", icon: <Crosshair className="text-[#0066FF]" /> },
                { title: "ENGAGES", desc: "Autonomous personalized outreach, calendar bookings, lead nurturing", icon: <MessageSquare className="text-[#0066FF]" /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-3 bg-[#0066FF]/10 rounded-lg border border-[#0066FF]/20">{item.icon}</div>
                  <div>
                    <h4 className="font-bold tracking-widest uppercase text-sm mb-1">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 border-l-2 border-[#0066FF] bg-[#0066FF]/5 text-white font-medium">
              Result: Your website doesn't just describe your service. It ACQUIRES customers while you sleep.
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] p-10 flex flex-col justify-center">
             <ParticleBackground />
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-20 z-[1]" />
             
             <div className="relative z-10 space-y-8">
                <div className="p-6 border border-white/10 bg-black/50 rounded-xl backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white/60 font-bold text-xs uppercase tracking-widest">Active Leads Scanned</h4>
                    <div className="flex items-center gap-2 text-green-400 text-xs"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Live</div>
                  </div>
                  <div className="text-4xl font-serif">14,208</div>
                </div>
                <div className="p-6 border border-white/10 bg-black/50 rounded-xl backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white/60 font-bold text-xs uppercase tracking-widest">Qualified & Engaged</h4>
                    <Activity className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="text-4xl font-serif">842</div>
                </div>
                <div className="p-6 border border-white/10 bg-black/50 rounded-xl backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white/60 font-bold text-xs uppercase tracking-widest">Meetings Booked</h4>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-4xl font-serif text-green-400">38</div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. THREE LAYERS. ONE AUTONOMOUS SYSTEM. ── */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none opacity-50" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Three Layers. <br/>One Autonomous System.</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              Every capability in the Sovereign Engine serves one purpose: Hunting qualified leads autonomously, 24/7, without human SDR overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LAYER 1 */}
            <TiltCard>
              <div className="p-8 md:p-10 bg-white/[0.02] border border-white/10 rounded-[2rem] h-full flex flex-col hover:border-white/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] mb-2">Layer 1</h3>
                <h4 className="text-2xl font-serif mb-2">Intelligence Gathering</h4>
                <p className="text-sm italic text-white/50 mb-8">(Know your market better than competitors)</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {["Live OSINT scanning of your exact target market", "Website scraping & decision-maker identification", "Competitor monitoring & market gap analysis", "Real-time lead scoring & qualification"].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/80 items-start">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-white/60 leading-relaxed mb-4">
                    <span className="font-bold text-white uppercase tracking-wider">What it means:</span><br/> Our agent doesn't use stale databases. It scans live prospects daily, identifies who just got hired, who moved companies, who's hiring, and finds patterns your competitors miss.
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    <span className="font-bold text-white uppercase tracking-wider">Example:</span><br/> Real estate company with 500 property developers as ICP → Agent found 420 in their jurisdiction, tracked hiring/job changes in real-time.
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* LAYER 2 */}
            <TiltCard>
              <div className="p-8 md:p-10 bg-white/[0.02] border border-white/10 rounded-[2rem] h-full flex flex-col hover:border-white/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] mb-2">Layer 2</h3>
                <h4 className="text-2xl font-serif mb-2">Autonomous Outreach</h4>
                <p className="text-sm italic text-white/50 mb-8">(Reach prospects before they know they want you)</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {["Autonomous email, SMS, WhatsApp sequencing", "AI-personalized messaging (based on profile)", "Calendar booking automation", "Lead nurturing sequences (until sales-ready)"].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/80 items-start">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-white/60 leading-relaxed mb-4">
                    <span className="font-bold text-white uppercase tracking-wider">What it means:</span><br/> The agent doesn't just find prospects. It engages them with hyper-personalized messages, books calls automatically, and nurtures until they're ready to talk to your sales team.
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    <span className="font-bold text-white uppercase tracking-wider">Example:</span><br/> Instead of an SDR sending generic emails (1-2% reply rate), the agent sends personalized messages based on prospect company, role, recent news. Result: 8.7% reply rate (6x improvement).
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* LAYER 3 */}
            <TiltCard>
              <div className="p-8 md:p-10 bg-white/[0.02] border border-white/10 rounded-[2rem] h-full flex flex-col hover:border-white/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] mb-2">Layer 3</h3>
                <h4 className="text-2xl font-serif mb-2">Private Infrastructure</h4>
                <p className="text-sm italic text-white/50 mb-8">(You own the code. You own the data. Forever.)</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {["Custom API integrations (your CRM, Slack, webhooks)", "Private cloud architecture (you control the data)", "Audit trails & compliance (for regulated industries)", "24/7 autonomous operation (no human needed)"].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/80 items-start">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-white/60 leading-relaxed mb-4">
                    <span className="font-bold text-white uppercase tracking-wider">What it means:</span><br/> Unlike SaaS platforms, you own everything. The code. The data. The agent. If you leave us, the agent is yours to run forever. No vendor lock-in.
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    <span className="font-bold text-white uppercase tracking-wider">Example:</span><br/> Client deploys to AWS (their account). Agent pulls daily from their Salesforce, pushes leads directly to their Slack. They own the entire system.
                  </p>
                </div>
              </div>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* ── 4 & 6. PROVEN RESULTS (CASE STUDIES) ── */}
      <section id="case-studies" className="py-32 px-6 md:px-12 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="micro-label block mb-4 text-[#0066FF]">Case Studies</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Proven Results from <br/>50+ GCC Enterprises</h2>
            <p className="text-white/60 text-lg">AED 18M+ in client revenue generated. 3.2x average Year 1 ROI. Here's how we did it.</p>
          </div>

          <div className="space-y-12">
            {CASE_STUDIES.map((study, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row gap-12">
                {/* Left Column: Context */}
                <div className="lg:w-1/3 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-12">
                  <div className="mb-8">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] mb-2">{study.industry}</div>
                    <h3 className="text-2xl font-serif text-white mb-2">{study.client}</h3>
                    <p className="text-xs text-white/40 uppercase tracking-wider">{study.location} | {study.scale}</p>
                  </div>

                  <div className="mb-8 flex-grow">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 flex items-center gap-2"><Crosshair className="w-4 h-4" /> The Challenge</h4>
                    <p className="text-sm text-white/80 italic leading-relaxed border-l-2 border-white/20 pl-4 py-2 bg-white/5 rounded-r-lg">"{study.challenge}"</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 flex items-center gap-2"><Settings className="w-4 h-4" /> What We Deployed</h4>
                    <ul className="space-y-2">
                      {study.solution.map((sol, j) => (
                        <li key={j} className="text-xs text-white/70 flex items-start gap-2">
                          <span className="text-[#0066FF] mt-0.5">•</span> {sol}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Metrics & Quote */}
                <div className="lg:w-2/3 flex flex-col">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2"><BarChart className="w-4 h-4" /> The Results (Before vs After)</h4>
                  
                  <div className="bg-black/50 rounded-2xl border border-white/5 overflow-hidden mb-10">
                    <div className="grid grid-cols-3 bg-white/5 p-4 border-b border-white/5 text-[10px] uppercase font-bold tracking-widest text-white/40">
                      <div>Metric</div>
                      <div>Before</div>
                      <div className="text-green-400">After (Sovereign)</div>
                    </div>
                    {study.metrics.before.map((metric, idx) => (
                      <div key={idx} className="grid grid-cols-3 p-4 border-b border-white/5 last:border-0 text-sm">
                        <div className="text-white/60">{metric.label}</div>
                        <div className="text-white/80">{metric.value}</div>
                        <div className="text-green-400 font-bold">{study.metrics.after[idx].value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden flex-grow mb-8">
                    <div className="absolute top-4 left-4 text-white/5 font-serif text-6xl leading-none pointer-events-none">"</div>
                    <p className="text-white/90 text-sm md:text-base italic leading-relaxed mb-4 relative z-10 text-balance">
                      "{study.quote}"
                    </p>
                    <p className="text-[#0066FF] text-[10px] uppercase tracking-widest font-bold">— {study.author}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                    {study.highlights.map((hl, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs font-bold text-white bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <CheckCircle2 className="w-3 h-3 text-green-400" /> {hl}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. OWN YOUR ACQUISITION ENGINE (PRICING) ── */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="micro-label block mb-4">Transparent ROI</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Own Your Acquisition Engine</h2>
            <p className="text-white/60 text-lg">Most companies rent their acquisition infrastructure. They pay perpetually. We sell ownership. You pay once. Then profit forever.</p>
          </div>

          {/* Pricing Comparison Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            <div className="p-8 md:p-12 bg-red-500/5 border border-red-500/20 rounded-[2.5rem]">
              <h3 className="text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" /> CURRENT APPROACH: Renting Intelligence
              </h3>
              <div className="space-y-6 text-sm text-white/80">
                <div><span className="text-white font-bold">You pay:</span></div>
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-2"><span>AED 150K/year</span> <span className="text-white/40">SDR salaries (3 FTEs × AED 50K)</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-2"><span>AED 50K/year</span> <span className="text-white/40">SaaS subscriptions</span></div>
                </div>
                <div className="flex justify-between font-bold text-red-400 text-lg pt-2">
                  <span>AED 200K/year</span> <span>(ongoing rent, forever)</span>
                </div>
                
                <div className="pt-6 space-y-3 border-t border-red-500/20">
                  <div className="flex justify-between"><span>You own:</span> <span className="text-red-400 font-bold">Nothing</span></div>
                  <div className="flex justify-between"><span>You control:</span> <span className="text-red-400 font-bold">Nothing</span></div>
                  <div className="flex justify-between"><span>Data ownership:</span> <span className="text-white/40">Locked in 3rd-party systems</span></div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 bg-green-500/5 border border-green-500/30 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px]" />
              <h3 className="text-green-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-green-500" /> SOVEREIGN APPROACH: Owning Infrastructure
              </h3>
              <div className="space-y-6 text-sm text-white/80 relative z-10">
                <div><span className="text-white font-bold">You pay:</span></div>
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-2"><span>AED 80K</span> <span className="text-white/40">One-time build (Tier 2)</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-2"><span>AED 3K/month</span> <span className="text-white/40">Cloud + support (AED 36K/yr)</span></div>
                </div>
                <div className="flex justify-between font-bold text-green-400 text-lg pt-2">
                  <span>AED 116K</span> <span>(first year total)</span>
                </div>
                
                <div className="pt-6 space-y-3 border-t border-green-500/30">
                  <div className="flex justify-between"><span>Breakeven:</span> <span className="text-green-400 font-bold">Month 8</span></div>
                  <div className="flex justify-between"><span>Year 2+:</span> <span className="text-green-400 font-bold">AED 164K/year pure profit</span></div>
                  <div className="flex justify-between pt-4 mt-2 border-t border-white/10"><span>You own:</span> <span className="text-white font-bold">Everything (code, data, agent)</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Tier 1 */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-white/30 transition-colors">
              <h3 className="text-white text-2xl font-serif mb-2">Tier 1: Startup</h3>
              <p className="text-white/40 text-xs mb-8">Best for: Early-stage SaaS, SMBs, new market entry</p>
              
              <div className="space-y-4 text-sm text-white/80 mb-8 flex-grow">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/50">One-time build:</span> <span className="font-serif text-xl">AED 40,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/50">Monthly support:</span> <span className="font-bold">AED 2,000</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Target: 500 prospects/month
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Email + WhatsApp Outreach
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/40" /> 7-day deployment
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl text-xs text-white/60 mt-auto">
                <strong className="text-white">Breakeven: Month 6</strong><br/>
                vs AED 100K-150K annual SDR cost
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-[#0a0a0a] border border-[#0066FF]/50 rounded-[2rem] p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_50px_rgba(0,102,255,0.1)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-white text-2xl font-serif mb-2">Tier 2: Growth</h3>
              <p className="text-white/40 text-xs mb-8">Best for: B2B SaaS, Real Estate, Consulting</p>
              
              <div className="space-y-4 text-sm text-white/80 mb-8 flex-grow">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/50">One-time build:</span> <span className="font-serif text-2xl text-[#0066FF]">AED 80,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/50">Monthly support:</span> <span className="font-bold">AED 3,000</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Target: 2,000 prospects/month
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Email + SMS + WhatsApp + Calendar
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/40" /> 14-day deployment
                </div>
              </div>

              <div className="p-4 bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-xl text-xs text-white/80 mt-auto">
                <strong className="text-white">Breakeven: Month 8</strong><br/>
                Year 2: AED 164K in savings (vs SDRs)
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-white/30 transition-colors">
              <h3 className="text-white text-2xl font-serif mb-2">Tier 3: Enterprise</h3>
              <p className="text-white/40 text-xs mb-8">Best for: Large enterprises, Regulated industries</p>
              
              <div className="space-y-4 text-sm text-white/80 mb-8 flex-grow">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/50">One-time build:</span> <span className="font-serif text-xl">Custom</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/50">Monthly support:</span> <span className="font-bold">Custom</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Target: 5,000+ prospects/month
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Full OSINT + Custom Integrations
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/40" /> 14-21 day deployment
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl text-xs text-white/60 mt-auto">
                Typically AED 150K-300K build.<br/>
                Requires discovery audit.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. READY TO OWN? (GUARANTEES) ── */}
      <section className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Ready to Own Your <br/>Acquisition Infrastructure?</h2>
          <p className="text-white/60 text-lg mb-16 max-w-2xl mx-auto">
            14 Days to Launch. Forever to Own. We've helped 50+ GCC enterprises deploy autonomous agents that hunt qualified leads 24/7, without the payroll tax.
          </p>
          
          <div className="bg-[#0a0a0a] border border-[#0066FF]/30 rounded-3xl p-8 md:p-12 text-left mb-16 shadow-[0_0_40px_rgba(0,102,255,0.05)]">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] mb-8 text-center">Sovereign Engine Commitment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="flex items-center gap-2 text-white font-bold mb-2"><ShieldCheck className="w-5 h-5 text-green-400" /> 30-Day Money-Back Guarantee</h4>
                <p className="text-xs text-white/60">Hit your lead benchmark or get a full refund.</p>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-white font-bold mb-2"><Clock className="w-5 h-5 text-green-400" /> 14-Day Deployment</h4>
                <p className="text-xs text-white/60">Go-live guaranteed by day 14 (or we eat the delay).</p>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-white font-bold mb-2"><UserCheck className="w-5 h-5 text-green-400" /> You Own Everything</h4>
                <p className="text-xs text-white/60">Code, data, agent—permanently yours from Day 1.</p>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-white font-bold mb-2"><Shield className="w-5 h-5 text-green-400" /> Zero Perpetual Lock-in</h4>
                <p className="text-xs text-white/60">No monthly SaaS subscriptions trapping you.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Link href="/contact" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center justify-center gap-3 cursor-pointer">
              Book Your Free Operational Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-white/40 text-[10px] uppercase tracking-widest text-center max-w-sm">
              20-minute call. No obligation. We'll show you exactly where your lead gen is leaking capital.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. ROADMAP (14-DAY DEPLOYMENT) ── */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <span className="micro-label block mb-4">Deployment Process</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Your 14-Day Roadmap</h2>
            <p className="text-white/60">We've done this 50+ times. Here's exactly what happens from Day 1 to go-live.</p>
          </div>

          <div className="space-y-6">
            {[
              { days: "Days 1-3", title: "Discovery & Audit", desc: "Deep dive into your current process, identify capital leaks, calculate exact ROI.", deliverable: "Your cost-per-lead analysis & deployment quote." },
              { days: "Days 4-7", title: "Infrastructure Design", desc: "Map OSINT scanning strategy, design autonomous outreach sequences, plan integrations.", deliverable: "Technical architecture doc & outreach templates." },
              { days: "Days 8-12", title: "Sovereign Build & Testing", desc: "Deploy agent to live environment, run test prospecting on 100 targets, measure & iterate.", deliverable: "Must hit 6%+ response rate before go-live." },
              { days: "Days 13-14", title: "Go-Live & Optimization", desc: "Release agent to full autonomous operation. Dashboard setup & team training (15 mins).", deliverable: "Qualified leads start arriving daily." },
            ].map((phase, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-8 hover:bg-white/[0.04] transition-colors">
                <div className="w-32 flex-shrink-0 text-[#0066FF] font-serif text-xl">{phase.days}</div>
                <div className="flex-grow">
                  <h4 className="text-white text-lg font-bold mb-2">{phase.title}</h4>
                  <p className="text-white/60 text-sm mb-4">{phase.desc}</p>
                  <div className="inline-block px-4 py-2 bg-white/5 rounded-lg text-xs font-bold text-green-400">
                    <span className="text-white/40 uppercase tracking-widest text-[10px] mr-2">Result:</span> {phase.deliverable}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. OUR MARKETING BLOG ── */}
      <section className="py-32 px-6 md:px-12 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="micro-label block mb-4 text-[#0066FF]">Insights</span>
              <h2 className="text-4xl md:text-5xl font-serif">Autonomous Sales Infrastructure</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Why GCC Real Estate Companies Are Ditching SDR Teams (2024 Benchmark)", excerpt: "The true cost of manual lead prospecting: AED 200K/year you're losing", read: "8 min" },
              { title: "The Real Cost of SaaS Lead Gen: Why Subscriptions Cost You AED 600K/Year", excerpt: "A breakdown of perpetual SaaS taxes + how to eliminate them forever", read: "6 min" },
              { title: "Calculate Your Autonomous Agent's ROI in 30 Days (Template Included)", excerpt: "The exact metrics to track. The formula to prove ROI. The spreadsheet for your CEO.", read: "7 min" },
            ].map((post, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex flex-col h-full">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0066FF] mb-6">Read Time: {post.read}</div>
                <h3 className="text-xl font-serif mb-4 text-white">{post.title}</h3>
                <p className="text-sm text-white/60 flex-grow mb-8">{post.excerpt}</p>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">Read Guide <ArrowRight className="w-3 h-3" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. OBJECTION-HANDLING FAQ ── */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Frequently Asked</h2>
            <p className="text-white/60">We built this FAQ because these are the most common objections from CEOs and VPs of Sales.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "How is Sovereign different from HubSpot/traditional CRM?", a: "They're tools. We're infrastructure. HubSpot is software you rent and use manually. Sovereign is proprietary code we deploy that works autonomously. HubSpot is like buying a car; Sovereign is buying an autonomous taxi." },
              { q: "How much will this actually cost? Is there a catch?", a: "No catch. Tier 2 costs AED 116,000 Year 1 (build + support). Compared to hiring 3 SDRs + SaaS (AED 230,000/yr). You save AED 502,000 over 3 years. Plus you OWN it. Still worried? 30-day money-back guarantee." },
              { q: "What if it doesn't work? Do you have a guarantee?", a: "Yes. We set a specific lead benchmark for YOUR company. On day 30, if we haven't hit it, you get a full refund of the build fee. No questions asked. We only win when you win." },
              { q: "What happens to the agent after we deploy? Can you hold it hostage?", a: "You own it. Not us. Code is fully documented and deployed to YOUR cloud account. If you leave us tomorrow, the agent keeps working, data stays yours. Zero penalty or clawback." },
              { q: "How many leads will we actually get? Can you guarantee a number?", a: "Yes. During the audit, we map your ICP, research market size, calculate OSINT limits, and set a guaranteed minimum based on historical reply rates (e.g., 20 qualified leads/month). If we miss, we refund." },
              { q: "Do we need to be tech-savvy to use this?", a: "No. You get a dashboard. You log in, see leads captured and meetings booked. We handle all the code, integrations, and optimizations. It's like hiring an SDR team that never asks for breaks." },
              { q: "What industries does this work for?", a: "B2B only. Works great for Real Estate, SaaS, Finance, Consulting, Tech, Recruiting. Doesn't work for B2C, E-commerce, or retail." },
              { q: "Can we pause or cancel if we want to?", a: "Yes. Anytime after 30 days. You can pause (keep agent ready for AED 1k/mo) or cancel completely (pay zero, take your agent and code with you)." }
            ].map((faq, i) => (
              <details key={i} className="group border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden">
                <summary className="p-8 cursor-pointer list-none flex justify-between items-center hover:bg-white/[0.04] transition-colors">
                  <span className="text-lg font-serif text-white pr-8 leading-tight">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-[#0066FF] group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-8 pb-8 text-white/60 text-sm leading-relaxed whitespace-pre-line">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-white/60 mb-6 text-sm">Still have questions? Let's talk. No obligation. No pitch. Just answers.</p>
            <Link href="/contact" className="inline-flex bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/80 transition-colors cursor-pointer">
              Book a Call
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#030303] border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-8 mb-20 pb-10 border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 50+ Autonomous Agents</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> AED 18M+ Client Revenue</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 14-Day Guarantee</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Google & Meta Certified</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 text-center md:text-left">
            <div>
              <h4 className="text-white font-serif text-2xl mb-6">Asif Digital.</h4>
              <p className="text-white/40 text-sm max-w-xs mx-auto md:mx-0">
                Turn your digital presence into an AI revenue engine. Own your acquisition infrastructure.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-6">Contact Us</h4>
              <p className="text-sm text-white/60">📧 hello@asifdigital.agency</p>
              <p className="text-sm text-white/60">📱 +971 545866094</p>
              <p className="text-sm text-white/60">📍 Sharjah, UAE (Serving GCC)</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/30 gap-4">
            <p>© 2024 Asif Digital.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
      </LazySection>
    </div>
  );
}
