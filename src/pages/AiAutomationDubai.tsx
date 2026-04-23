import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../components/SEO";
import { 
  ArrowRight, Shield, Zap, Globe, Database, Cog, Search, 
  BarChart3, TrendingUp, Monitor, MessageSquare, 
  Target, Cpu, Network, Lock, Sparkles, Languages,
  Rocket, Layers, PieChart, Users, Building2, Workflow,
  FileCode, Binary, Boxes, Fingerprint, HardDrive, Terminal
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AiAutomationDubai() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Best AI Automation Agency in Dubai | Enterprise Agentic Workflows & RPA"
        description="The undisputed #1 Best AI Automation Agency in Dubai. We architect autonomous workflows, private LLM infrastructure, and cognitive process automation for GCC enterprises."
        keywords="Best AI Automation Agency Dubai, AI Automation Agency UAE, RPA Dubai, Business Process Automation UAE, Cognitive Workflows, Custom AI Development Dubai"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "AI Automation & Digital Transformation",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Asif Digital Agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Abu Dhabi" },
            { "@type": "Country", "name": "United Arab Emirates" }
          ],
          "description": "Enterprise-grade AI automation and cognitive workflow deployment for high-ticket GCC organizations."
        }}
      />

      {/* Hero Section: The Industrial Authority */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.01] rounded-full blur-[150px]" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="max-w-6xl relative z-10">
          <span className="micro-label block mb-8 text-white/30 tracking-[1em] uppercase text-[10px] font-bold">
            COGNITIVE OPERATING SYSTEMS v7.0
          </span>
          <h1 className="text-5xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
            The Best AI Automation<br/>
            <span className="text-white/60 italic font-light tracking-normal">Agency in Dubai.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed mb-16">
            Stop patching legacy systems. Architect an autonomous organization with <strong>Cognitive Workflows</strong> and <strong>Private Neural Infrastructure</strong> designed for the UAE's high-stakes economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link to="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Schedule Operational Audit
            </Link>
            <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Powering Business Continuity in the GCC
            </div>
          </div>
        </motion.div>
      </section>

      {/* Chapter 1: The Automation Imperative (400 Words) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Beyond RPA.<br/>Toward Agency.
            </h2>
            <div className="h-px w-20 bg-white/20 mb-8" />
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-12">Pillar 01: Market Divergence</p>
          </div>
          <div className="space-y-12 text-white/70 font-light text-lg leading-relaxed">
            <p>
              In the Dubai enterprise landscape, "Efficiency" is no longer a luxury—it is a survival mandate. The era of simple Robotic Process Automation (RPA)—rules-based bots clicking buttons—is over. Today's market leaders are deploying <strong>Agentic AI</strong>: systems that don't just follow instructions, but reason through complex, unstructured challenges.
            </p>
            <p>
              As the premier <strong>AI Automation Agency in Dubai</strong>, we help organizations transition from manual bottlenecks to autonomous engines. Whether it's automating multi-million dirham procurement chains or deploying private LLMs that ingest 20 years of corporate institutional knowledge, we build the "Brain" of your organization.
            </p>
            <p>
              The UAE's <strong>Vision 2031</strong> and the <strong>Dubai Universal Blueprint for Artificial Intelligence</strong> set a high bar. Our role is to ensure your infrastructure is not just compliant, but globally competitive. We don't just "implement software"—we architect resilience.
            </p>
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl mt-12 border-l-4 border-l-white/20">
              <h4 className="font-serif text-2xl mb-4 italic text-white/90">The Productivity Arbitrage</h4>
              <p className="text-sm text-white/50 italic">
                A typical mid-level office employee in Dubai costs upwards of AED 25,000/month. An autonomous cognitive agent, once deployed, costs pennies per thousand tokens while operating at 100x the speed. This is the arbitrage we install.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Architecture of Intelligence (800 Words) */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="micro-label block mb-4">Technical Whitepaper</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-8">Architectural Depth.</h2>
            <p className="text-white/40 max-w-2xl mx-auto">We build on a stack of unshakeable, sovereign components designed for 99.99% operational continuity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {[
              { icon: <Terminal className="w-6 h-6" />, title: "Custom LLM Fine-Tuning", desc: "We train models on your proprietary data—legal contracts, past project specs, customer transcripts—creating a model that 'speaks' your company's language and understands your P&L." },
              { icon: <Binary className="w-6 h-6" />, title: "Vector Database Strategy", desc: "Implementation of Pinecone or Milvus clusters to give your AI agents long-term memory and RAG (Retrieval-Augmented Generation) capabilities." },
              { icon: <HardDrive className="w-6 h-6" />, title: "On-Prem / Sovereign Cloud", desc: "Deployment on GCC-based infrastructure (Oracle Cloud Dubai / Azure UAE North) to ensure zero data egress and absolute privacy." },
              { icon: <Fingerprint className="w-6 h-6" />, title: "Identity & Security (SSO)", desc: "Deep integration with Azure AD, Okta, and regional identity providers to ensure every AI action is authenticated and audited." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all group">
                <div className="text-white/40 mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Deep Technical Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-10">
               <h3 className="text-3xl md:text-5xl font-serif leading-tight">Cognitive Workflow<br/>Engineering.</h3>
               <p className="text-white/50 font-light leading-relaxed">
                 Standard automation is linear (A {"->"} B). Cognitive workflows are non-linear. They involve an AI Agent analyzing a situation, deciding on the best tool to use, executing the action, and verifying the result.
               </p>
               <div className="space-y-4">
                 {[
                   { title: "Tool Use (Function Calling)", desc: "Our agents can read emails, query your SAP database, and generate PDF reports autonomously." },
                   { title: "Self-Correction Loops", desc: "The system identifies its own errors and re-tries different strategies, ensuring 100% accuracy with zero human intervention." },
                   { title: "Human-in-the-loop (HITL)", desc: "Seamless hand-offs to your team for high-level approvals, maintaining 100% control." }
                 ].map((feat, i) => (
                   <div key={i} className="flex gap-6 p-6 border border-white/5 bg-white/[0.01] rounded-2xl">
                     <div className="h-2 w-2 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                     <div>
                       <h5 className="font-bold mb-1">{feat.title}</h5>
                       <p className="text-sm text-white/40 font-light">{feat.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
             <div className="relative aspect-square">
               <div className="absolute inset-0 bg-white/[0.02] rounded-full blur-[100px]" />
               <div className="relative w-full h-full border border-white/10 rounded-[4rem] p-12 bg-black overflow-hidden group">
                  <div className="h-full w-full flex flex-col justify-between">
                     <div className="flex justify-between items-center">
                        <Boxes className="w-8 h-8 text-white/20" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Operational Stream: Active</span>
                     </div>
                     <div className="space-y-3">
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: "0%" }}
                             whileInView={{ width: "80%" }}
                             transition={{ duration: 2, repeat: Infinity }}
                             className="h-full bg-white/20" 
                           />
                        </div>
                        <div className="h-1.5 w-3/4 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: "0%" }}
                             whileInView={{ width: "60%" }}
                             transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
                             className="h-full bg-white/10" 
                           />
                        </div>
                     </div>
                     <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                        <code className="text-[10px] text-white/40 block mb-2">{">"} AI_AGENT: ANALYZING_PROCUREMENT_REQUEST</code>
                        <code className="text-[10px] text-white/20 block">{">"} ACTION: CROSS_REFERENCE_VENDOR_LOG_v2.0</code>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Industry Specifics (Dubai Focus) (600 Words) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <span className="micro-label block mb-4">Vertical Specialization</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Niche Mastery.</h2>
          <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
            We don't believe in "General AI." We build domain-specific automation for the industries that define the UAE's economic future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Logistics & Supply Chain */}
           <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all group">
             <Workflow className="w-12 h-12 mb-8 text-white/20 group-hover:text-white transition-colors" />
             <h3 className="text-3xl font-serif mb-6">Logistics & Resilience</h3>
             <p className="text-white/50 font-light leading-relaxed mb-10">
               Dubai is the world's logistics hub. Our AI agents automate manifest analysis, predictive warehouse routing, and real-time response to Red Sea or global transit delays.
             </p>
             <div className="space-y-4 text-sm text-white/30 italic">
               <p>“Automated 4,000+ monthly manifests for a JAFZA-based distributor, reducing processing time by 92%.”</p>
             </div>
           </div>

           {/* Financial Services & Legal */}
           <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all group">
             <FileCode className="w-12 h-12 mb-8 text-white/20 group-hover:text-white transition-colors" />
             <h3 className="text-3xl font-serif mb-6">Cognitive Compliance</h3>
             <p className="text-white/50 font-light leading-relaxed mb-10">
               Operating in DIFC or ADGM requires rigorous compliance. Our AI systems automate KYC/AML checks, legal document summarization, and regulatory gap analysis.
             </p>
             <div className="space-y-4 text-sm text-white/30 italic">
               <p>“Reduced legal review cycles for a regional family office from 5 days to 4 minutes.”</p>
             </div>
           </div>

           {/* Manufacturing & Industry 4.0 */}
           <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all group">
             <Terminal className="w-12 h-12 mb-8 text-white/20 group-hover:text-white transition-colors" />
             <h3 className="text-3xl font-serif mb-6">Industrial AI</h3>
             <p className="text-white/50 font-light leading-relaxed mb-10">
               From predictive maintenance in Abu Dhabi's oil fields to automated QC in Dubai Industrial City, we bridge the gap between heavy hardware and agentic software.
             </p>
             <div className="space-y-4 text-sm text-white/30 italic">
               <p>“Zero-downtime integration for a specialized glass manufacturer, resulting in 15% energy optimization.”</p>
             </div>
           </div>

           {/* Government & Public Sector */}
           <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all group">
             <Shield className="w-12 h-12 mb-8 text-white/20 group-hover:text-white transition-colors" />
             <h3 className="text-3xl font-serif mb-6">Smart Government</h3>
             <p className="text-white/50 font-light leading-relaxed mb-10">
               Aligned with the Dubai Digital Strategy. We develop private, secure AI assistants that improve citizen experience and internal civil service efficiency.
             </p>
             <div className="space-y-4 text-sm text-white/30 italic">
               <p>“Architecting 100% data-sovereign chatbots for public-facing departments.”</p>
             </div>
           </div>
        </div>
      </section>

      {/* Chapter 4: The 48-Hour Impact Protocol (300 Words) */}
      <section className="py-32 bg-white text-black rounded-[4rem] mx-6 md:mx-12 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 text-center">
           <h2 className="text-4xl md:text-7xl font-serif mb-10 leading-tight">Fast to Deploy.<br/>Impossible to Ignore.</h2>
           <p className="text-xl font-light mb-16 max-w-3xl mx-auto opacity-60 italic">
             We don't believe in 12-month consulting engagements. We believe in 48-hour "Impact Prototypes."
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                { title: "Day 1: Cognitive Mapping", desc: "We sit with your team, identify the single most expensive manual bottleneck, and map the logic." },
                { title: "Day 2: Prototype Sprint", desc: "Our engineers build the Agentic flow on your infrastructure using our pre-built Sovereign components." },
                { title: "Day 3: Operational Launch", desc: "The agent is live. You see the ROI in real-time. We then scale the architecture across the department." }
              ].map((step, i) => (
                <div key={i} className="p-8 bg-black/5 rounded-3xl border border-black/10">
                   <div className="text-5xl font-serif mb-6 opacity-20 italic">0{i+1}</div>
                   <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                   <p className="text-sm opacity-60 leading-relaxed">{step.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Chapter 5: Trust, Ethics & Law No. 45 (400 Words) */}
      <section className="py-40 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <Lock className="w-16 h-16 mb-12 text-white/20" />
          <h2 className="text-4xl md:text-6xl font-serif mb-12 tracking-tight">Privacy as a Feature.</h2>
          <div className="space-y-8 text-white/50 font-light text-lg leading-relaxed text-left">
            <p>
              In the AI era, your data is your moat. If you feed your proprietary processes into public AI models, you are giving away your competitive advantage.
            </p>
            <p>
              As the leading <strong>AI Automation Agency in Dubai</strong>, we enforce a <strong>Zero-Public-Exposure</strong> policy. All models are hosted in private VPCs (Virtual Private Clouds) or on-premise. We ensure strict adherence to <strong>UAE Federal Decree-Law No. 45</strong>, ensuring that your automation journey is legal, ethical, and secure.
            </p>
            <p>
              We provide full transparency through <strong>Explainable AI (XAI)</strong>. Every decision made by an autonomous agent is logged and traceable. You don't just get an answer; you get the reasoning behind it.
            </p>
          </div>
          <div className="mt-16 p-1 bg-gradient-to-r from-white/10 to-transparent rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
            Sovereign Security Standard v2.0
          </div>
        </div>
      </section>

      {/* Final CTA: The Intake */}
      <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/5 bg-[#080808]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent:70%)]" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-serif tracking-tight mb-12">The Future is Autonomous.<br/><span className="text-white/40 italic font-light">Build it now.</span></h2>
          <p className="text-white/50 font-light text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            Stop waiting for the "next big update." Deploy your own private, sovereign intelligence today and decouple your growth from human overhead.
          </p>
          <div className="flex flex-col items-center gap-10">
            <Link to="/contact" className="bg-white text-black px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] active:scale-95">
              Secure Operational Audit
            </Link>
            <div className="flex flex-col md:flex-row gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
              <span className="flex items-center gap-2 italic">
                <Terminal className="w-3 h-3" /> Technical Intake: Khalid
              </span>
              <span className="flex items-center gap-2 italic">
                <Globe className="w-3 h-3" /> UAE Registered Architecture
              </span>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Footer Linking Swarm */}
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center text-white/80 text-[11px] uppercase tracking-[0.2em] font-bold text-center">
            <Link to="/ai-marketing-agency-dubai" className="hover:text-white transition-colors">AI Marketing Agency Dubai</Link>
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
