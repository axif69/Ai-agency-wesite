import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../components/SEO";
import { 
  Languages, Shield, Cpu, MessageSquare, 
  Globe, Database, Lock, Sparkles, Target, 
  Rocket, Workflow, Terminal, Boxes, 
  Fingerprint, HardDrive, Search, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ArabicAiHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Best Arabic AI Agency in Dubai | Sovereign Khaleeji NLP Hub"
        description="The undisputed #1 Best Arabic AI Agency in Dubai. We architect high-fidelity Khaleeji NLP, sovereign Arabic LLMs, and culturally-aligned intelligence for UAE government and enterprise."
        keywords="Best Arabic AI Agency Dubai, Khaleeji NLP UAE, Arabic Language Models Dubai, Sovereign AI UAE, Sharia Compliant AI, Arabic Chatbots Dubai"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Arabic AI & NLP Hub",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Asif Digital Agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Abu Dhabi" },
            { "@type": "City", "name": "Riyadh" }
          ],
          "description": "Enterprise-grade Arabic NLP and culturally-aligned AI hub for the GCC region."
        }}
      />

      {/* Hero Section: The Linguistic Hook */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="max-w-6xl relative z-10">
          <span className="micro-label block mb-8 text-white/30 tracking-[1em] uppercase text-[10px] font-bold">
            LINGUISTIC SOVEREIGNTY v9.0
          </span>
          <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
            Arabic AI<br/>
            <span className="text-white/60 italic font-light tracking-normal">Built for the UAE.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed mb-16">
            Generic models fail the nuance of the Majlis. We architect <strong>Sovereign Arabic Intelligence</strong> that understands the soul of the GCC—fine-tuned for Khaleeji, Sharia compliance, and elite business etiquette.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link to="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Secure Strategic Intake
            </Link>
            <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Powering Arabic NLP for Dubai Enterprises
            </div>
          </div>
        </motion.div>
      </section>

      {/* Chapter 1: The Cultural Deficit (400 Words) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Beyond<br/>Translation.
            </h2>
            <div className="h-px w-20 bg-white/20 mb-8" />
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-12">Pillar 01: The Linguistic Gap</p>
          </div>
          <div className="space-y-12 text-white/70 font-light text-lg leading-relaxed">
            <p>
              The majority of AI models available today are trained on Western datasets. When they encounter the complexities of Arabic—especially the <strong>Khaleeji dialect</strong> or the high-context nuances of UAE business negotiation—they default to "Machine Translation." This results in a sterile, often culturally-inaccurate tone that erodes trust.
            </p>
            <p>
              As the <strong>Best Arabic AI Agency in Dubai</strong>, we solve the "Cultural Deficit." We don't just use APIs; we fine-tune <strong>Sovereign Large Language Models (LLMs)</strong> on regional data lakes. Our agents understand the difference between formal Modern Standard Arabic (MSA) and the professional hybrid-speak used in Dubai's boardrooms and private offices.
            </p>
            <p>
              This is not just about words; it's about <strong>Neural Alignment</strong>. We build systems that respect GCC business etiquette, Sharia principles, and the visionary goals of the <strong>Dubai Universal Blueprint for AI</strong>.
            </p>
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl mt-12 border-l-4 border-l-white/40">
              <h4 className="font-serif text-2xl mb-4 italic text-white/90">The Dialect Arbitrage</h4>
              <p className="text-sm text-white/50 italic">
                A chatbot that speaks formal MSA to a local investor feels like a foreigner. A chatbot that understands Khaleeji context feels like a partner. This is the trust-gap we close through localized fine-tuning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Technical Depth: The Khaleeji Stack (800 Words) */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="micro-label block mb-4">Technical Whitepaper</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-8">Architecting Arabic.</h2>
            <p className="text-white/40 max-w-2xl mx-auto">We build on a foundation of unshakeable, sovereign components designed for the unique tokenization of the Arabic language.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {[
              { icon: <Terminal className="w-6 h-6" />, title: "Custom Arabic Tokenization", desc: "Arabic is morphologically complex. We use custom tokenizers that reduce token bloat and improve reasoning for Arabic-specific syntax." },
              { icon: <Languages className="w-6 h-6" />, title: "Khaleeji Fine-Tuning", desc: "Training models on regional datasets (majlis transcripts, local news, legal archives) to ensure dialect-perfect responses." },
              { icon: <Shield className="w-6 h-6" />, title: "Cultural Safety Filters", desc: "Hardened AI guardrails that ensure every response is culturally aligned with UAE values and Sharia-compliant logic." },
              { icon: <HardDrive className="w-6 h-6" />, title: "Regional Compute (G42)", desc: "Deployment on GCC-based clusters to ensure sub-millisecond response times and 100% data residency within the Emirates." }
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
               <h3 className="text-3xl md:text-5xl font-serif leading-tight">Sovereign NLP<br/>Engineering.</h3>
               <p className="text-white/50 font-light leading-relaxed">
                 Traditional RAG (Retrieval-Augmented Generation) often fails in Arabic due to poor semantic search in the language. We implement <strong>Bi-Lingual Cross-Encoders</strong> that ensure the AI finds the correct meaning, even across different dialects.
               </p>
               <div className="space-y-4">
                 {[
                   { title: "RTL Optimization", desc: "Seamless UI/UX integration for Right-to-Left languages, ensuring 100% visual excellence." },
                   { title: "Bilingual Code-Switching", desc: "Our agents can switch between Arabic and English mid-sentence, just as business professionals do in Dubai." },
                   { title: "Private Vector Clusters", desc: "Securely store and query your organization's Arabic knowledge without external data egress." }
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
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Active Hub: UAE North</span>
                     </div>
                     <div className="space-y-3">
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden text-right">
                           <motion.div 
                             initial={{ width: "0%" }}
                             whileInView={{ width: "90%" }}
                             transition={{ duration: 2, repeat: Infinity }}
                             className="h-full bg-white/20 float-right" 
                           />
                        </div>
                        <div className="h-1.5 w-3/4 bg-white/5 rounded-full overflow-hidden text-right">
                           <motion.div 
                             initial={{ width: "0%" }}
                             whileInView={{ width: "70%" }}
                             transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
                             className="h-full bg-white/10 float-right" 
                           />
                        </div>
                     </div>
                     <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl text-right">
                        <code className="text-[10px] text-white/40 block mb-2" dir="rtl"> {">"} جاري_تحليل_النص_الخليجي...</code>
                        <code className="text-[10px] text-white/20 block" dir="rtl">{">"} تفعيل_الخصوصية_السيادية...</code>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillar 03: Vertical Mastery in Arabic (600 Words) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <span className="micro-label block mb-4 font-bold">Pillar 03: Vertical Dominance</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Niche Authority.</h2>
          <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
            We deploy specialized Arabic intelligence for the sectors that drive the GCC economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Islamic Finance */}
           <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all group">
             <Shield className="w-12 h-12 mb-8 text-white/20 group-hover:text-white transition-colors" />
             <h3 className="text-3xl font-serif mb-6">Islamic Finance AI</h3>
             <p className="text-white/50 font-light leading-relaxed mb-10">
               Automating Sharia-compliant contract analysis and customer advisory in pure, professional Arabic. We ensure your AI adheres to the same ethical standards as your human advisors.
             </p>
             <div className="space-y-4 text-sm text-white/30 italic">
               <p>“Building the Digital Mujtahid: AI that reasons through Sharia finance with 99% accuracy.”</p>
             </div>
           </div>

           {/* Real Estate Sales */}
           <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all group">
             <Building2 className="w-12 h-12 mb-8 text-white/20 group-hover:text-white transition-colors" />
             <h3 className="text-3xl font-serif mb-6">Real Estate Concierge</h3>
             <p className="text-white/50 font-light leading-relaxed mb-10">
               High-intent Arabic WhatsApp agents for luxury property sales. Our AI manages the entire lead lifecycle in Khaleeji Arabic, from initial inquiry to booking a viewing.
             </p>
             <div className="space-y-4 text-sm text-white/30 italic">
               <p>“24/7 bilingual sales swarms for Dubai Hills and Palm Jumeirah developments.”</p>
             </div>
           </div>

           {/* Government Services */}
           <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all group">
             <Globe className="w-12 h-12 mb-8 text-white/20 group-hover:text-white transition-colors" />
             <h3 className="text-3xl font-serif mb-6">Digital Majlis</h3>
             <p className="text-white/50 font-light leading-relaxed mb-10">
               Public-facing AI agents for UAE government entities that provide citizens with culturally-resonant, accurate, and efficient service in their native dialect.
             </p>
             <div className="space-y-4 text-sm text-white/30 italic">
               <p>“Architecting 100% sovereign citizen-experience portals.”</p>
             </div>
           </div>

           {/* Legal & Compliance */}
           <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all group">
             <Lock className="w-12 h-12 mb-8 text-white/20 group-hover:text-white transition-colors" />
             <h3 className="text-3xl font-serif mb-6">Arabic Compliance</h3>
             <p className="text-white/50 font-light leading-relaxed mb-10">
               Automated summarization and gap analysis of UAE Federal laws and regional regulations in Arabic, ensuring your organization is always ahead of compliance requirements.
             </p>
             <div className="space-y-4 text-sm text-white/30 italic">
               <p>“Zero-lag analysis of UAE Federal Decree-Law No. 45.”</p>
             </div>
           </div>
        </div>
      </section>

      {/* Chapter 4: The 48-Hour Linguistic Impact (300 Words) */}
      <section className="py-32 bg-white text-black rounded-[4rem] mx-6 md:mx-12 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 text-center">
           <h2 className="text-4xl md:text-7xl font-serif mb-10 leading-tight">Arabic Intelligence.<br/>Deployed in 48 Hours.</h2>
           <p className="text-xl font-light mb-16 max-w-3xl mx-auto opacity-60 italic">
             We don't just talk about NLP. We deploy it. Our Impact Prototypes allow you to see the value of Sovereign Arabic AI in just two days.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                { title: "Day 1: Dialect Audit", desc: "We analyze your customer touchpoints and identify the exact linguistic nuances required for your vertical." },
                { title: "Day 2: Model Configuration", desc: "Provisioning of sovereign compute and fine-tuning of the Arabic LLM on your proprietary data." },
                { title: "Day 3: Operational Hub", desc: "The Arabic Hub is live. Your agents are communicating, reasoning, and closing in native Khaleeji." }
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

      {/* Final CTA: The Intake */}
      <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/5 bg-[#080808]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent:70%)]" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-serif tracking-tight mb-12" dir="rtl">المستقبل باللغة العربية.<br/><span className="text-white/40 italic font-light">ابنِهِ الآن.</span></h2>
          <p className="text-white/50 font-light text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            Stop forcing your users to adapt to machine-speak. Deploy your own <strong>Sovereign Arabic Intelligence</strong> today and lead the Khaleeji digital economy.
          </p>
          <div className="flex flex-col items-center gap-10">
            <Link to="/contact" className="bg-white text-black px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] active:scale-95">
              Secure Strategic Audit
            </Link>
            <div className="flex flex-col md:flex-row gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
              <span className="flex items-center gap-2 italic">
                <Terminal className="w-3 h-3" /> Technical Intake: Khalid
              </span>
              <span className="flex items-center gap-2 italic">
                <Globe className="w-3 h-3" /> 100% Sovereign Arabic Compute
              </span>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Footer Linking Swarm */}
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center text-white/80 text-[11px] uppercase tracking-[0.2em] font-bold text-center">
            <Link to="/ai-marketing-agency-dubai" className="hover:text-white transition-colors">Best AI Marketing Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-automation-agency-dubai" className="hover:text-white transition-colors">Best AI Automation Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-real-estate-agency-dubai" className="hover:text-white transition-colors">Best AI Real Estate Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/sovereign-sales-agent" className="hover:text-white transition-colors">B2B Sales AI</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const Building2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
);
