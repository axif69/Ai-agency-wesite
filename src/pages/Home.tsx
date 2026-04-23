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
import { Network, Database, Brain, Globe, Shield, Activity, ChevronRight, Play, Server, ArrowRight, TrendingUp, MessageSquare, Briefcase, Zap, Workflow, Languages } from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudyData";

/* ─── DATA ─── */

const sovereignSolutions = [
  {
    title: "AI Automation Agency",
    desc: "Architecting autonomous workflows, private LLMs, and cognitive process automation for high-ticket GCC enterprises.",
    icon: <Workflow className="w-6 h-6" role="img" aria-label="Workflow Icon" />,
    link: "/ai-automation-agency-dubai",
  },
  {
    title: "Sovereign AI Marketing",
    desc: "Autonomous marketing swarms that dominate UAE search & social with data-sovereign intelligence and AEO precision.",
    icon: <Zap className="w-6 h-6" role="img" aria-label="Marketing Flash Icon" />,
    link: "/ai-marketing-agency-dubai",
  },
  {
    title: "Autonomous Sales Swarms",
    desc: "B2B WhatsApp & Email agents that qualify leads, negotiate, and close deals 24/7 without fatigue or geographical limits.",
    icon: <MessageSquare className="w-6 h-6" role="img" aria-label="Sales Swarm Icon" />,
    link: "/sovereign-sales-agent",
  },
  {
    title: "Arabic Intelligence Hub",
    desc: "Sovereign Khaleeji NLP and culturally-aligned Arabic intelligence for UAE government and enterprise. Neural alignment for the GCC.",
    icon: <Languages className="w-6 h-6" role="img" aria-label="Arabic Language Icon" />,
    link: "/arabic-ai-hub",
  }
];

const foundationalServices = [
  {
    title: "Web & Ecommerce Development",
    desc: "High-performance, headless commerce architectures designed to scale locally and globally.",
    icon: <Briefcase className="w-5 h-5" role="img" aria-label="Ecommerce Icon" />,
    link: "/services/ecommerce-website-development-dubai",
  },
  {
    title: "Corporate Branding",
    desc: "Identity systems engineered for authority, trust, and premium market positioning.",
    icon: <Shield className="w-5 h-5" role="img" aria-label="Branding Shield Icon" />,
    link: "/services/branding-agency-dubai-sharjah",
  },
  {
    title: "Search & Paid Media (SEO/PPC)",
    desc: "Data-driven acquisition channels to capture high-intent traffic across the Emirates.",
    icon: <TrendingUp className="w-5 h-5" role="img" aria-label="Growth Chart Icon" />,
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
        title="Sovereign AI Architecture & Business Continuity Dubai"
        description="Asif Digital: The leading AI Agency in Dubai & Sharjah. We build Sovereign AI ecosystems and resilient digital infrastructure for UAE enterprises. Decouple from geopolitical risk."
        keywords="Sovereign AI Dubai, AI Agency Sharjah, SEO Dubai, Web Design UAE, Business Continuity Sharjah, Abu Dhabi AI Automation"
        canonical="https://asifdigital.agency"
        faqSchema={[
          {
            question: "What is Sovereign AI in the UAE context?",
            answer: "Sovereign AI refers to AI systems built and hosted locally on state-backed infrastructure like G42 and Khazna. This ensures that sensitive UAE enterprise data never leaves the country and remains compliant with Federal Decree-Law No. 45."
          },
          {
            question: "How does Asif Digital ensure business continuity?",
            answer: "We build agentic swarms—autonomous digital employees—that operate 24/7 on locally-hosted servers. Unlike human staff, these systems are resilient to geographical disruptions, visa changes, and global connectivity issues."
          },
          {
            question: "What is Answer Engine Optimization (AEO)?",
            answer: "AEO is the evolution of SEO. We optimize your brand's data so that AI models like Gemini, ChatGPT, and Perplexity cite your business as the definitive answer for industry-specific queries in the UAE."
          },
          {
            question: "Do you serve businesses in Abu Dhabi and Sharjah?",
            answer: "Yes, Asif Digital is a UAE-wide agency. While founded in Sharjah, we provide multi-disciplinary digital and AI services to enterprises across Dubai, Abu Dhabi, Ajman, and the wider GCC."
          }
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Asif Digital Agency",
          "image": "https://asifdigital.agency/logo.png",
          "description": "Elite AI Agency & Digital Transformation Firm specializing in Sovereign Architecture, Business Continuity, and AEO in the UAE.",
          "@id": "https://asifdigital.agency",
          "url": "https://asifdigital.agency",
          "telephone": "+971545866094",
          "priceRange": "AED 5,000 - AED 500,000",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Business Bay",
            "addressLocality": "Dubai",
            "addressRegion": "Dubai",
            "postalCode": "00000",
            "addressCountry": "AE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.185,
            "longitude": 55.272
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "10:00",
              "closes": "14:00"
            }
          ],
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Sharjah" },
            { "@type": "City", "name": "Abu Dhabi" },
            { "@type": "City", "name": "Ajman" },
            { "@type": "Country", "name": "United Arab Emirates" }
          ],
          "sameAs": [
            "https://www.linkedin.com/company/asif-digital",
            "https://twitter.com/asifdigitaluae",
            "https://www.instagram.com/asifdigital.agency"
          ]
        }}
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
              <Link to="/contact" aria-label="Book an Operational AI Audit" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Book an Operational Audit <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/sovereign-dashboard" aria-label="View Live Agentic Dashboard" className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md">
                View Live Dashboard <Activity className="w-4 h-4" role="img" aria-label="Activity icon" />
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
        <HeroParticles />
      </section>

      {/* ── Trust Signals Bar ── */}
      <section className="py-8 bg-black border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-white/70" role="img" aria-label="Sovereignty Shield icon" /> 100% Data Sovereignty</div>
          <div className="flex items-center gap-2"><Database className="w-4 h-4 text-white/70" role="img" aria-label="Database storage icon" /> UAE Hosted Compute</div>
          <div className="flex items-center gap-2"><Brain className="w-4 h-4 text-white/70" role="img" aria-label="AI reasoning brain icon" /> Agentic Architecture</div>
          <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-white/70" role="img" aria-label="Global networking icon" /> War-Agnostic Infrastructure</div>
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
                     <Link to={sol.link} aria-label={`Learn more about ${sol.title}`} className="block group w-full h-full">
                       <SpotlightCard className="p-8 w-full h-full bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors duration-300">
                         <div className="flex justify-between items-start mb-6 relative z-10">
                           <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                             {sol.icon}
                           </div>
                           <span className="text-white/30 group-hover:text-white transition-colors">
                             <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 transform origin-center" role="img" aria-label="Arrow Right icon" />
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
                   <Link to={sol.link} key={i} aria-label={`Explore ${sol.title}`} className="block p-8 rounded-2xl border border-white/5 bg-transparent hover:bg-white/[0.02] hover:border-white/20 transition-all duration-300 group opacity-80 hover:opacity-100">
                      <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white/80 transition-all">
                          {sol.icon}
                        </div>
                        <div>
                           <h4 className="text-xl font-serif mb-2 text-white/90">{sol.title}</h4>
                           <p className="text-white/60 text-sm leading-relaxed">{sol.desc}</p>
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
      
      {/* ── 4.5 Featured Success: Institutional Proof ── */}
      <section className="py-32 px-6 md:px-12 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="micro-label block mb-4 text-white/30">Institutional Proof</span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight mb-6">
                The Revenue <span className="italic text-white/60">Engine.</span>
              </h2>
              <p className="text-white/40 text-lg font-light leading-relaxed">
                Raw technical results from our top-tier GCC deployments. We don't just build software; we architect capital acquisition systems.
              </p>
            </div>
            <Link to="/case-studies" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px] font-bold">
              View All Global Results <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.slice(0, 3).map((study, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] hover:border-white/20 transition-all duration-500 flex flex-col h-full"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={study.img} alt={study.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">{study.industry} — {study.client}</span>
                  <h3 className="text-xl font-serif mb-6 leading-tight group-hover:text-white transition-colors">{study.title}</h3>
                  <div className="space-y-3 mt-auto">
                    {study.results.slice(0, 2).map((res, j) => (
                      <div key={j} className="flex items-start gap-3 text-xs text-white/50 font-light italic">
                        <TrendingUp className="w-3 h-3 mt-0.5 text-white/30" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOVEREIGN SALES AGENT HIGHLIGHT ── */}
      <section className="py-40 px-6 md:px-12 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="micro-label block mb-4 text-green-500/80">New: Autonomous B2B Acquisition</span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.05] mb-8">
                Deploy a Sovereign<br /><span className="italic text-white/60">Sales Agent.</span>
              </h2>
              <p className="text-white/50 font-light leading-relaxed mb-10 text-lg max-w-xl">
                A 24/7 autonomous engine that hunts UAE businesses, recovers direct WhatsApp numbers via OSINT, and fires hyper-personalized cold emails. No SDR team. No subscriptions. Yours to own.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { stat: "3–4 Days", label: "Full Deployment" },
                  { stat: "24/7", label: "Continuous Hunting" },
                  { stat: "WhatsApp", label: "OSINT Recovery" },
                  { stat: "4 Steps", label: "Self-Setup Flow" },
                ].map((item, i) => (
                  <div key={i} className="p-5 border border-white/5 bg-white/[0.02] rounded-2xl">
                    <div className="text-2xl font-serif text-white mb-1">{item.stat}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{item.label}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/sovereign-sales-agent"
                aria-label="Explore the Sovereign Sales Agent"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                Explore the Agent <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="space-y-4">
              {[
                { title: "Live Web Crawling & OSINT", desc: "Scrapes company websites, Google Maps, and GMB profiles in real-time. Data is always fresh — never a stale list." },
                { title: "WhatsApp Number Recovery", desc: "Automatically retrieves direct WhatsApp contact numbers from website metadata and GMB listings for direct stakeholder access." },
                { title: "Reply Sentiment Intelligence", desc: "Automatically categorizes incoming replies as Interested, Neutral, or Auto-Reply — visible in your analytics dashboard." },
                { title: "Enterprise Data Export", desc: "One-click export of your entire discovered database to Excel or CSV. Full data sovereignty with zero vendor lock-in." },
              ].map((f, i) => (
                <div key={i} className="flex gap-5 p-6 border border-white/5 bg-white/[0.02] rounded-2xl group hover:border-white/20 transition-all duration-500">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 font-serif font-bold text-sm">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 group-hover:text-white transition-colors">{f.title}</h4>
                    <p className="text-sm text-white/40 font-light leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Latest Insights (Internal Linking for SEO) ── */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
          <div>
            <span className="micro-label block mb-4 text-[#0066FF]">The Intelligence Journal</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Latest Deep Dives</h2>
          </div>
          <Link to="/blog" aria-label="Explore all Journal entries and AI deep dives" className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] border border-white/10 transition-all flex items-center gap-2 group">
            Explore All Journal Entries <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" role="img" aria-label="Chevron Right icon" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "The Sovereign Shield: AI & Cybersecurity in the GCC 2026",
              slug: "sovereign-shield-ai-cybersecurity-gcc-2026",
              category: "Cybersecurity & Sovereignty",
              excerpt: "Why the GCC's pivot to local data residency is the ultimate competitive advantage in the 2026 threat landscape."
            },
            {
              title: "AEO Mastery: Dominating the Answer Engine Era",
              slug: "aeo-mastery-dubai-search-future",
              category: "Search Strategy",
              excerpt: "Traditional SEO is dead. Learn how to optimize for Gemini, Perplexity, and ChatGPT to win the Dubai market."
            },
            {
              title: "Sovereign AI Blueprint: The GCC Enterprise Guide",
              slug: "sovereign-ai-blueprint-gcc-2026",
              category: "Executive Strategy",
              excerpt: "A comprehensive roadmap for UAE-based firms to deploy unshakeable, locally-hosted AI architectures."
            }
          ].map((post, i) => (
            <Link key={i} to={`/blog/${post.slug}`} aria-label={`Read Full Manuscript: ${post.title}`} className="group block p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 flex flex-col h-full">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0066FF] mb-6">
                {post.category}
              </div>
              <h3 className="text-2xl font-serif mb-6 group-hover:text-white transition-colors leading-tight flex-grow">
                {post.title}
              </h3>
              <p className="text-sm text-white/40 font-light leading-relaxed mb-8 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                Read Full Manuscript <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 6.5 Implementation Roadmap ── */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-t border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl">
              <span className="micro-label block mb-4">The Sovereign Journey</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                Architecting Your <span className="italic">Revenue Domain.</span>
              </h2>
            </div>
            <p className="text-white/40 font-light max-w-sm mb-2 text-sm leading-relaxed">
              We move beyond generic software. We deploy autonomous intelligence layers that become your company's most valuable asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                phase: "Phase 01",
                title: "Sovereign Audit",
                desc: "We perform a clinical deep-dive into your legacy friction points, identifying exactly where human latency is costing you revenue.",
                tags: ["Friction Mapping", "OSINT Audit"]
              },
              {
                phase: "Phase 02",
                title: "Neural Mapping",
                desc: "We architect the specific reasoning chains and agentic swarms required to automate your high-ticket acquisition and retention cycles.",
                tags: ["Logic Architecture", "Swarm Design"]
              },
              {
                phase: "Phase 03",
                title: "Sovereign Deployment",
                desc: "Deployment on local GCC-certified infrastructure (G42/Azure UAE North) ensuring 100% data residency and regional compliance.",
                tags: ["GCC Residency", "UAE Law 45"]
              },
              {
                phase: "Phase 04",
                title: "Revenue Scaling",
                desc: "Your autonomous engine begins real-time market arbitrage, operating 24/7 across global time zones to maximize yield.",
                tags: ["Yield Arbitrage", "Market Dominance"]
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/50 transition-all duration-700 group"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0066FF] mb-12">
                  {step.phase}
                </div>
                <h3 className="text-2xl font-serif mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {step.title}
                </h3>
                <p className="text-sm text-white/50 font-light leading-relaxed mb-10">
                  {step.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ Section (A11y & SEO) ── */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="micro-label block mb-4">Common Briefings</span>
          <h2 className="text-4xl md:text-5xl font-serif">Frequently Asked</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: "What is Sovereign AI?", a: "AI systems built and hosted locally on UAE state-backed infrastructure to ensure 100% data residency and compliance." },
            { q: "How fast can you deploy an Agentic swarm?", a: "Standard deployments take 4-6 weeks, depending on the complexity of the reasoning chains and legacy systems integration." },
            { q: "Do you provide ongoing support?", a: "Yes, all our Tier-1 and Tier-2 solutions include dedicated support and periodic model fine-tuning for UAE market shifts." }
          ].map((faq, i) => (
            <details key={i} className="group border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden">
              <summary className="p-8 cursor-pointer list-none flex justify-between items-center hover:bg-white/[0.04] transition-colors">
                <span className="text-lg font-serif">{faq.q}</span>
                <ChevronRight className="w-5 h-5 text-white/30 group-open:rotate-90 transition-transform" role="img" aria-label="Toggle Answer icon" />
              </summary>
              <div className="px-8 pb-8 text-white/50 font-light leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── 8. "Khalid" Integration ── */}
      <section className="py-32 px-6 md:px-12 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-20 h-20 mx-auto mb-8 bg-black rounded-full flex items-center justify-center text-white shadow-2xl">
            <Zap className="w-8 h-8" role="img" aria-label="Energy Zap icon" />
          </div>
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl font-serif tracking-tighter leading-tight mb-8">
            Meet the <span className="italic opacity-40">Architect.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-black/60 text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
            We don't do standard "Contact Us" forms. Speak with Khalid, our Strategic Intake Agent, to begin your business resilience audit immediately.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            {/* Let user click directly to open chatbot / or linking to a focus page */}
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} 
              aria-label="Begin AI Audit with Khalid"
              className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs border border-white/20 hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl mx-auto hover:scale-105 active:scale-95"
            >
              Begin Audit with Khalid <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </button>
          </motion.div>
        </div>
      </section>
      {/* Footer Internal Linking Swarm (SEO Boost) */}
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center text-white/80 text-[11px] uppercase tracking-[0.2em] font-bold text-center">
            <Link to="/ai-marketing-agency-dubai" className="hover:text-white transition-colors">AI Marketing Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-lead-generation-agency-dubai" className="hover:text-white transition-colors">AI Lead Generation Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-real-estate-agency-dubai" className="hover:text-white transition-colors">AI Real Estate Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/sovereign-sales-agent" className="hover:text-white transition-colors">B2B Sales AI</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
