import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../components/SEO";
import { 
  ArrowRight, Shield, Zap, Globe, Database, Cog, Search, 
  BarChart3, TrendingUp, Monitor, MessageSquare, 
  Target, Cpu, Network, Lock, Sparkles, Building2,
  Home, MapPin, Key, PieChart, Users, ChevronRight,
  MousePointer2, Bot, CheckCircle2, Star
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AiRealEstateDubai() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Best AI Real Estate Agency in Dubai | AI Property Solutions UAE"
        description="Dominate the property market with the undisputed #1 Best AI Real Estate Agency in Dubai. We provide AI property valuations, investor matching, and autonomous lead generation for UAE realtors."
        keywords="Best AI Real Estate Dubai, AI Real Estate Agency UAE, AI Property Valuation Dubai, PropTech UAE, AI for Real Estate Agents Dubai"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "AI Real Estate Solutions",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Asif Digital Agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Abu Dhabi" }
          ],
          "description": "Enterprise-grade AI solutions for the Dubai real estate market, focusing on predictive analytics and investor acquisition."
        }}
      />

      {/* Hero Section: The Luxury Hook */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="max-w-5xl relative z-10">
          <span className="inline-block py-2 px-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-full mb-10 shadow-2xl">
            Sovereign PropTech Architecture
          </span>
          <h1 className="text-6xl md:text-[8rem] font-serif tracking-tight leading-[0.9] mb-12">
            The Best AI Real Estate<br/>
            <span className="text-white/60 italic font-light tracking-normal">Agency in Dubai.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed mb-16">
            Architecting high-intent AI ecosystems for Dubai's top brokerages. Predict values, match investors, and close 7-figure deals with <strong>Autonomous PropTech Swarms.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-2xl">
              Initiate Asset Audit
            </Link>
            <Link to="/ai-lead-generation-agency-dubai" className="border border-white/10 text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white/5 transition-all">
              Lead Gen Strategies
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Chapter 1: The New Era of Dubai Real Estate */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4 block">Market Insight</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Dubai 2026:<br/>Data is the<br/>New Developer.
            </h2>
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Pillar 01: The PropTech Shift</p>
          </div>
          <div className="space-y-12 text-white/70 font-light text-lg leading-relaxed">
            <p>
              The Dubai real estate market has moved beyond mere location. In an era where the <strong>Dubai Land Department (DLD)</strong> processes billions in weekly transactions, success is now determined by <strong>Predictive Intelligence</strong>.
            </p>
            <p>
              As the leading <strong>Best AI Real Estate Agency in Dubai</strong>, we build the technical moats that protect your brokerage from obsolescence. We don't just "list" properties; we architect digital assets that identify market trends and 7-figure investment signals before they ever hit the public headlines.
            </p>
            <p>
              Our <strong>PropTech Swarms</strong> analyze secondary market movements, off-plan absorption rates, and global investor sentiment in real-time. This allows your agents to match properties to investors in <strong>72 hours rather than 72 days</strong>, with data-driven valuations that beat standard market benchmarks.
            </p>
            <div className="p-10 border border-white/10 bg-white/[0.02] rounded-[3rem] mt-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Shield className="w-16 h-16" />
              </div>
              <h4 className="font-serif text-3xl mb-6 italic text-white/90">The 72-Hour Lead Window</h4>
              <p className="text-sm text-white/50 font-light italic leading-relaxed">
                In the Burj Khalifa district or Dubai Hills, a high-intent investor is usually only active for 72 hours before signing. Our AI systems detect these "Active Windows" using digital footprint analysis, ensuring your brokerage is the first to offer a localized, hyper-personalized pitch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Core AI Property Solutions */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-serif mb-8">The PropTech Stack.</h2>
            <p className="text-white/40 max-w-2xl mx-auto font-light">Custom-built AI modules for agencies that refuse to play the 'listing' game.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {[
              { 
                icon: <TrendingUp className="w-8 h-8" />, 
                title: "AI Property Valuation", 
                desc: "Real-time valuation engines that ingest DLD data, listing history, and regional micro-trends to provide 99.2% accurate price predictions." 
              },
              { 
                icon: <Users className="w-8 h-8" />, 
                title: "Global Investor Matching", 
                desc: "Autonomous agents that hunt for HNW investors in Europe, Asia, and the Americas, matching them with your premium off-plan inventory." 
              },
              { 
                icon: <MessageSquare className="w-8 h-8" />, 
                title: "Agentic CRM Management", 
                desc: "Your CRM shouldn't be a cemetery. Our AI cleans, qualifies, and re-engages dormant leads automatically using Khaleeji NLP." 
              },
              { 
                icon: <Monitor className="w-8 h-8" />, 
                title: "Virtual Staging & Vision", 
                desc: "AI-powered photorealistic staging that allows buyers to visualize shell-and-core properties as fully furnished luxury homes in seconds." 
              },
              { 
                icon: <Target className="w-8 h-8" />, 
                title: "Micro-Targeted Ads", 
                desc: "Stop wasting AED on generic reach. We use AI to target the exact 0.1% of investors whose financial behavior matches your property profile." 
              },
              { 
                icon: <Lock className="w-8 h-8" />, 
                title: "KYC & Compliance AI", 
                desc: "Automated investor screening and anti-money laundering (AML) checks integrated directly into your onboarding workflow." 
              }
            ].map((item, i) => (
              <div key={i} className="p-10 border border-white/5 bg-black rounded-[2.5rem] hover:border-white/20 transition-all group cursor-default">
                <div className="text-white/20 mb-8 group-hover:text-white transition-colors duration-500">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 3: The Off-Plan Dominance */}
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <div className="aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                       <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format,compress&q=75&w=600" alt="Dubai Skyline" className="w-full h-full object-cover opacity-50" />
                    </div>
                    <div className="aspect-square bg-white text-black p-8 rounded-3xl flex flex-col justify-end">
                       <p className="text-3xl font-serif">82%</p>
                       <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Off-Plan Success Rate</p>
                    </div>
                 </div>
                 <div className="space-y-4 pt-12">
                    <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center border border-white/5">
                       <Building2 className="w-12 h-12 text-white/20" />
                    </div>
                    <div className="aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                       <img src="https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format,compress&q=75&w=600" alt="Luxury Interior" className="w-full h-full object-cover opacity-50" />
                    </div>
                 </div>
              </div>
           </div>
           <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4 block">Sector Mastery</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight text-white">Mastering the<br/>Off-Plan Wave.</h2>
              <div className="space-y-8 text-white/60 font-light text-lg leading-relaxed">
                 <p>
                    In Dubai, <strong>Off-Plan</strong> is where the true wealth is built. However, competing with developer-direct sales teams is nearly impossible for independent brokerages without a technical edge.
                 </p>
                 <p>
                    We provide the edge. Our <strong>Investor Intelligence Engine</strong> identifies secondary market sellers who are looking to liquidate assets and move into the next big launch (EMAAR, Nakheel, Sobha). We help you position the right project in front of the right capital at the right millisecond.
                 </p>
                 <div className="pt-8 flex items-center gap-6">
                    <div className="flex -space-x-4">
                       {[1,2,3,4].map(i => (
                          <div key={i} className="w-12 h-12 rounded-full border-4 border-[#050505] bg-white/10" />
                       ))}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Trusted by 20+ DIFC Family Offices</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Chapter 4: Case Study Hook & Proof */}
      <section className="py-32 bg-white text-black rounded-[4rem] mx-6 md:mx-12 mb-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format,compress&q=75&w=1200')] opacity-[0.1] grayscale" />
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <Star className="w-12 h-12 mx-auto mb-10 text-black/20" />
            <h2 className="text-4xl md:text-6xl font-serif mb-12 tracking-tight">The 100M Dirham Alpha.</h2>
            <p className="text-black/60 font-light text-xl mb-16 leading-relaxed">
               "Within 4 months of deploying Asif Digital's AI Real Estate Swarm, our brokerage moved from the top 50 to the top 10 in secondary market transaction volume. The investor matching engine alone paid for the implementation in the first 14 days."
            </p>
            <div className="flex flex-col items-center">
               <p className="font-bold uppercase tracking-[0.3em] text-xs">Director of Sales</p>
               <p className="text-black/40 text-[10px] mt-2 italic">Elite Tier Dubai Brokerage (Anonymous by NDA)</p>
            </div>
         </div>
      </section>

      {/* Final CTA: The Intake Audit */}
      <section className="py-40 px-6 md:px-12 text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-8xl font-serif tracking-tighter mb-12">Own the Inventory.<br/><span className="text-white/30 italic font-light">Own the Market.</span></h2>
          <p className="text-white/40 font-light text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            Dubai's real estate market doesn't wait for 'best practices'. It creates them. Secure your brokerage's future as an <strong>AI-First Authority.</strong>
          </p>
          <div className="flex flex-col items-center gap-10">
            <Link to="/contact" className="bg-white text-black px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95">
              Secure Asset Audit
            </Link>
            <div className="flex flex-col md:flex-row gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
              <span className="flex items-center gap-2">
                <MapPin className="w-3 h-3" /> DIFC / Business Bay / Dubai Hills
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-3 h-3" /> Full DLD Data Compliance
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Investor Intelligence: The Spoke Network */}
      <section className="py-40 border-t border-white/5 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 tracking-tight text-white">Investor Intelligence.</h2>
              <p className="text-white/40 text-lg font-light leading-relaxed">
                Deep-dive technical reports on the future of high-ticket real estate and autonomous portfolio management in the GCC.
              </p>
            </div>
            <Link to="/blog" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors">
              View All Insights <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Predicting Dubai Real Estate Cycles",
                slug: "predicting-dubai-real-estate-cycles-ai",
                category: "Market Report"
              },
              {
                title: "DLD Data & Sovereign AI",
                slug: "dld-compliance-sovereign-ai-property",
                category: "Trust & Legal"
              },
              {
                title: "Virtual Viewings 2.0",
                slug: "virtual-viewings-ai-closers-dubai",
                category: "Sales Innovation"
              }
            ].map((post, idx) => (
              <Link 
                key={idx}
                to={`/blog/${post.slug}`}
                className="group p-12 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 text-left"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0066FF] mb-8">{post.category}</div>
                <h3 className="text-2xl font-serif mb-8 leading-tight group-hover:text-white transition-colors text-white">{post.title}</h3>
                <div className="flex items-center gap-2 text-white/20 text-xs font-bold uppercase tracking-widest group-hover:text-white/40 transition-colors">
                  Read Report <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Linking Swarm (SEO Boost) */}
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center text-white/80 text-[11px] uppercase tracking-[0.2em] font-bold text-center">
            <Link to="/ai-lead-generation-agency-dubai" className="hover:text-white transition-colors">AI Lead Generation Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-marketing-agency-dubai" className="hover:text-white transition-colors">AI Marketing Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/" className="hover:text-white transition-colors">Home Authority</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
