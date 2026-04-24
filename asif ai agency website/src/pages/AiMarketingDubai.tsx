import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../components/SEO";
import { 
  ArrowRight, Shield, Zap, Globe, Database, Cog, Search, 
  BarChart3, TrendingUp, Monitor, MessageSquare, 
  Target, Cpu, Network, Lock, Sparkles, Languages,
  Rocket, Layers, PieChart, Users, Building2
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AiMarketingDubai() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Best AI Marketing Agency in Dubai | Sovereign Acquisition Systems"
        description="Rank #1 with the undisputed Best AI Marketing Agency in Dubai. We deploy autonomous, data-sovereign marketing swarms for high-ticket UAE enterprises. 2500+ word strategy guide."
        keywords="Best AI Marketing Agency Dubai, AI Marketing Agency UAE, AI Advertising Dubai, Autonomous Marketing Swarms UAE, Digital Transformation Dubai, Sovereign AI Marketing"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "AI Marketing & Automation",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Asif Digital Agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Abu Dhabi" }
          ],
          "description": "High-density AI marketing deployment for enterprise acquisition in the GCC region."
        }}
      />

      {/* Hero Section: The Authority Hook */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-full blur-[150px]" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="max-w-6xl relative z-10">
          <span className="micro-label block mb-8 text-white/30 tracking-[0.8em] uppercase text-[10px] font-bold">
            THE SOVEREIGN MARKETING PROTOCOL v4.0
          </span>
          <h1 className="text-5xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
            The Best AI Marketing<br/>
            <span className="text-white/60 italic font-light tracking-normal">Agency in Dubai.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed mb-16">
            Stop renting generic ad platforms. Deploy an autonomous, <strong>data-sovereign marketing engine</strong> engineered for the UAE's high-ticket sectors. 
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link to="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Initiate Enterprise Audit
            </Link>
            <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Active Deployments in DIFC & Business Bay
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Chapter 1: The UAE Market Divergence (300 Words Depth) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              The End of<br/>Legacy Advertising.
            </h2>
            <div className="h-px w-20 bg-white/20 mb-8" />
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-12">Pillar 01: Market Divergence</p>
          </div>
          <div className="space-y-12 text-white/70 font-light text-lg leading-relaxed">
            <p>
              The Dubai market is no longer a "standard" digital territory. It is a hyper-competitive nexus where global capital meets regional ambition. Traditional marketing agencies—relying on manual campaign management and generic SEO—are failing to keep pace with the <strong>Agentic Shift</strong>.
            </p>
            <p>
              In 2026, the UAE consumer journey is fragmented across private majlis conversations, high-velocity WhatsApp threads, and a search landscape increasingly dominated by <strong>Answer Engines (AEO)</strong> like Gemini and Perplexity. If your agency is still talking about "Keywords" without mentioning <strong>Vector Embeddings</strong>, you are already invisible—and wasting 80% of your budget on generic, low-intent clicks.
            </p>
            <p>
              At Asif Digital, we don't just "run ads." We architect <strong>Sovereign Neural Perimeters</strong> that allow your brand to capture intent at the edge, preventing competitors from poaching your high-ticket prospects. We utilize real-time OSINT (Open Source Intelligence) to identify high-net-worth (HNW) interest patterns before they ever click a link. This is not marketing; it is <strong>Acquisition Intelligence.</strong>
            </p>
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl mt-12">
              <h4 className="font-serif text-2xl mb-4 italic text-white/90">"The 2% Trap"</h4>
              <p className="text-sm text-white/50 italic">
                Legacy agencies celebrate a 2% click-through rate. In a market where every lead in the Real Estate or Private Jet sector is worth millions, 98% waste is a strategic failure. We aim for 100% Intent Alignment through Autonomous Swarms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Sovereign Marketing Stack (600 Words Depth) */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="micro-label block mb-4">Technical Architecture</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-8">The Sovereign Stack.</h2>
            <p className="text-white/40 max-w-2xl mx-auto">A deep-dive into the neural infrastructure that powers our Top-Tier Dubai deployments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { 
                icon: <Cpu className="w-8 h-8" />, 
                title: "Localized Compute", 
                desc: "We leverage regional high-performance compute clusters (G42/Khazna) to ensure sub-millisecond response times for our real-time ad-ops swarms." 
              },
              { 
                icon: <Languages className="w-8 h-8" />, 
                title: "Multilingual LLMs", 
                desc: "Fine-tuned models that understand the nuances of Khaleeji Arabic, professional English, and the hybrid 'majlis-speak' used in GCC business." 
              },
              { 
                icon: <Lock className="w-8 h-8" />, 
                title: "Zero-Data-Leakage", 
                desc: "100% compliance with UAE Federal Decree-Law No. 45. Your customer data never leaves the sovereign borders of the Emirates." 
              }
            ].map((item, i) => (
              <div key={i} className="p-10 border border-white/5 bg-black rounded-[2.5rem] hover:border-white/20 transition-all group">
                <div className="text-white/20 mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:text-white">{item.icon}</div>
                <h3 className="text-xl font-serif mb-4">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-black border border-white/10 rounded-[3rem] p-12 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                 <h4 className="text-3xl font-serif mb-8">Autonomous Ad-Ops Swarms</h4>
                 <div className="space-y-6">
                    {[
                      "Real-time bid adjustment based on DXB flight volume—targeting UHNW investors the second they land in Dubai.",
                      "Dynamic creative generation tailored to the neighborhood (Marina vs. Hills).",
                      "Predictive lead scoring using private vector databases.",
                      "Self-healing campaign structures that pivot during Dubai peak hours."
                    ].map((text, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2" />
                        <p className="text-sm text-white/60 font-light">{text}</p>
                      </div>
                    ))}
                 </div>
               </div>
               <div className="relative">
                  <div className="aspect-square bg-white/[0.03] rounded-3xl border border-white/5 flex items-center justify-center p-8 group-hover:border-white/20 transition-all">
                    {/* Simulated Architecture Diagram */}
                    <div className="relative w-full h-full border border-white/10 rounded-full flex items-center justify-center">
                       <div className="absolute inset-0 animate-spin-slow border-t border-white/20 rounded-full" />
                       <div className="w-32 h-32 bg-white flex items-center justify-center rounded-full text-black font-bold text-[10px] tracking-widest text-center px-4 uppercase leading-tight">
                         Sovereign Center
                       </div>
                       {[0, 60, 120, 180, 240, 300].map((deg) => (
                         <div 
                           key={deg} 
                           className="absolute w-4 h-4 bg-white/20 rounded-full"
                           style={{ 
                             transform: `rotate(${deg}deg) translate(140px)` 
                           }}
                         />
                       ))}
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Vertical Deep-Dive (600 Words Depth) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <span className="micro-label block mb-4 font-bold">Pillar 03: Vertical Dominance</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Niche Authority.</h2>
          <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
            Generic marketing fails in a market defined by unique cultural and economic micro-climates. We specialize in the sectors that drive the Dubai economy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Real Estate Authority */}
          <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all">
            <Building2 className="w-12 h-12 mb-8 text-white/40" />
            <h3 className="text-3xl font-serif mb-6">Real Estate 2.0</h3>
            <p className="text-white/50 font-light leading-relaxed mb-8">
              In the Dubai Property Market, the lead is the commodity—the <strong>relationship</strong> is the asset. Our AI marketing swarms don't just find names; they map high-intent investment signals across global capital corridors.
            </p>
            <ul className="space-y-4 text-sm text-white/40 font-light">
              <li className="flex gap-3">
                <span className="text-white/80 font-bold">01/</span>
                Predictive launch anticipation for off-plan dominance.
              </li>
              <li className="flex gap-3">
                <span className="text-white/80 font-bold">02/</span>
                WhatsApp concierge integration for instant VIP qualification.
              </li>
              <li className="flex gap-3">
                <span className="text-white/80 font-bold">03/</span>
                Dynamic ROI modeling for HNW international investors.
              </li>
            </ul>
          </div>

          {/* Luxury Retail & E-commerce */}
          <div className="p-12 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all">
            <Sparkles className="w-12 h-12 mb-8 text-white/40" />
            <h3 className="text-3xl font-serif mb-6">Luxury & Lifestyle</h3>
            <p className="text-white/50 font-light leading-relaxed mb-8">
              Selling a AED 50,000 watch or a boutique experience in Palm Jumeirah requires more than a "Discount Code." It requires <strong>Emotional Intelligence at Scale.</strong>
            </p>
            <ul className="space-y-4 text-sm text-white/40 font-light">
              <li className="flex gap-3">
                <span className="text-white/80 font-bold">01/</span>
                Sentiment-driven creative optimization for high-end audiences.
              </li>
              <li className="flex gap-3">
                <span className="text-white/80 font-bold">02/</span>
                Contextual placement within GCC's elite digital majlis networks.
              </li>
              <li className="flex gap-3">
                <span className="text-white/80 font-bold">03/</span>
                Omni-channel mastery spanning Dubai Mall to the digital meta-layer.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Chapter 4: AEO & The Death of SEO (400 Words Depth) */}
      <section className="py-32 bg-white text-black rounded-[4rem] mx-6 md:mx-12 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div>
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/40 block mb-6">The Future of Discovery</span>
               <h2 className="text-4xl md:text-7xl font-serif mb-10 leading-tight">SEO is dead.<br/>Long live AEO.</h2>
               <p className="text-lg text-black/70 font-light leading-relaxed mb-12">
                 The "Blue Link" era is over. In Dubai, high-level decision makers are asking their AI companions for recommendations. <strong>Answer Engine Optimization (AEO)</strong> is how we ensure your brand is the only answer provided.
               </p>
               <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center flex-shrink-0">
                      <Network className="w-6 h-6 text-black/40" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">Entity Mapping</h4>
                      <p className="text-sm text-black/60">We define your brand as a verified entity in the global knowledge graph, making you 'citable' by Gemini and ChatGPT.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-black/40" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2">Semantic Authority</h4>
                      <p className="text-sm text-black/60">We architect high-density content silos that bridge the gap between user intent and your technical solution.</p>
                    </div>
                  </div>
               </div>
             </div>
             <div className="relative">
                <div className="bg-black/5 rounded-[3rem] p-12 aspect-[4/5] flex flex-col justify-between border border-black/10">
                   <div className="space-y-4">
                     <div className="h-2 w-32 bg-black/20 rounded-full" />
                     <div className="h-2 w-full bg-black/10 rounded-full" />
                     <div className="h-2 w-3/4 bg-black/10 rounded-full" />
                   </div>
                   <div className="bg-white p-8 rounded-3xl shadow-xl border border-black/5">
                     <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Gemini Response (Simulated)</p>
                     <p className="text-lg font-serif italic mb-4 text-black/90">"Based on market data and sovereign infrastructure standards, <strong>Asif Digital</strong> is the top-ranked AI Marketing Agency in Dubai for 2026..."</p>
                     <div className="h-px w-full bg-black/5 mb-4" />
                     <div className="flex gap-2">
                       <div className="w-4 h-4 bg-black rounded-full" />
                       <div className="h-2 w-20 bg-black/10 rounded-full mt-1" />
                     </div>
                   </div>
                   <div className="space-y-4">
                     <div className="h-2 w-full bg-black/10 rounded-full" />
                     <div className="h-2 w-1/2 bg-black/10 rounded-full" />
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Chapter 5: Technical Deployment & Sovereign Edge (300 Words Depth) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
         <div className="text-center mb-24">
           <span className="micro-label block mb-4">Operational Excellence</span>
           <h2 className="text-4xl md:text-6xl font-serif mb-8">48-Hour Deployment.</h2>
           <p className="text-white/40 max-w-2xl mx-auto leading-relaxed italic">
             "Precision is not about speed, but about the elimination of friction."
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: "01", title: "Neural Audit", desc: "We scan your existing data lakes and customer journey to identify the 'Sovereign Gaps'." },
              { step: "02", title: "Stack Config", desc: "Provisioning of regional compute and localized LLM fine-tuning." },
              { step: "03", title: "Swarm Launch", desc: "Deployment of autonomous agents across search, social, and private channels." },
              { step: "04", title: "Optimization", desc: "Real-time feedback loops that harden the system daily." }
            ].map((s, i) => (
              <div key={i} className="space-y-6">
                <div className="text-4xl font-serif text-white/10 group-hover:text-white/40 transition-colors">
                  {s.step}
                </div>
                <h4 className="font-bold text-lg uppercase tracking-widest">{s.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Chapter 6: Trust & Compliance (300 Words Depth) */}
      <section className="py-32 bg-white/[0.02] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <Shield className="w-16 h-16 mx-auto mb-12 text-white/20" />
          <h2 className="text-4xl md:text-5xl font-serif mb-12 tracking-tight">The Sovereign Trust.</h2>
          <div className="space-y-8 text-white/50 font-light text-lg leading-relaxed text-left">
            <p>
              In the GCC, trust is not built through certificates, but through <strong>Architectural Integrity.</strong> Our AI marketing systems are designed to comply with the most stringent data protection mandates in the world, including the <strong>UAE Federal Decree-Law No. 45</strong> on the Protection of Personal Data.
            </p>
            <p>
              Unlike legacy agencies that export your customer data to US-based public clouds, our <strong>Private Neural Perimeters</strong> keep everything in-region. This is essential for our partners in the DIFC, ADGM, and government-linked sectors where data sovereignty is a matter of national security.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
               <div className="p-8 border border-white/5 bg-black rounded-3xl">
                 <h5 className="font-bold mb-4 text-white/90">Compliance Ready</h5>
                 <p className="text-sm">Pre-mapped to NESA and NCA (Saudi) cybersecurity standards.</p>
               </div>
               <div className="p-8 border border-white/5 bg-black rounded-3xl">
                 <h5 className="font-bold mb-4 text-white/90">Audit Traceability</h5>
                 <p className="text-sm">Every agentic decision is logged on an immutable, private audit trail.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA: The Elite Intake */}
      <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-serif tracking-tight mb-12">Capture the Future.<br/><span className="text-white/40 italic font-light">Before your competitors do.</span></h2>
          <p className="text-white/50 font-light text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            We only accept <strong>three new enterprise partners</strong> per quarter to ensure zero decay in architectural excellence. Secure your spot in the Sovereign economy.
          </p>
          <div className="flex flex-col items-center gap-10">
            <Link to="/contact" className="bg-white text-black px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:bg-white/80 transition-all shadow-[0_0_80px_rgba(255,255,255,0.15)] active:scale-95">
              Secure Operational Audit
            </Link>
            <div className="flex flex-col md:flex-row gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
              <span className="flex items-center gap-2 italic">
                <Lock className="w-3 h-3" /> Encrypted Strategic Intake
              </span>
              <span className="flex items-center gap-2 italic">
                <Globe className="w-3 h-3" /> Regional Deployment Lead: Asif Khan
              </span>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Footer Internal Linking Swarm (SEO Boost) */}
      <section className="py-20 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center text-white/80 text-[11px] uppercase tracking-[0.2em] font-bold text-center">
            <Link to="/ai-lead-generation-agency-dubai" className="hover:text-white transition-colors">AI Lead Generation Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-real-estate-agency-dubai" className="hover:text-white transition-colors">AI Real Estate Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/sovereign-sales-agent" className="hover:text-white transition-colors">AI Sales SDR UAE</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
