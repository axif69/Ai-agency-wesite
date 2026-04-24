import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../components/SEO";
import { 
  ArrowRight, Shield, Zap, Globe, Database, Cog, Search, 
  BarChart3, TrendingUp, Monitor, MessageSquare, 
  Target, Cpu, Network, Lock, Sparkles, Languages,
  Rocket, Layers, PieChart, Users, Building2, UserPlus,
  Mail, Phone, Share2, MousePointer2, Bot, CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AiLeadGenDubai() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // ROI Calculator for Lead Gen
  const [leads, setLeads] = useState(100);
  const conversionRate = 0.05; // 5% conversion
  const dealValue = 50000; // AED
  const revenue = Math.round(leads * conversionRate * dealValue);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Best AI Lead Generation Agency in Dubai | Autonomous Sales Swarms"
        description="Rank #1 with the undisputed Best AI Lead Generation Agency in Dubai. We deploy autonomous B2B sales swarms, WhatsApp AI agents, and hyper-personalized outreach for UAE enterprises."
        keywords="Best AI Lead Generation Dubai, AI Lead Generation Agency UAE, B2B Sales Automation Dubai, WhatsApp AI Agent UAE, Sales Intelligence GCC"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "AI Lead Generation & Sales Automation",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Asif Digital Agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Abu Dhabi" },
            { "@type": "Country", "name": "United Arab Emirates" }
          ],
          "description": "High-velocity AI lead generation and autonomous acquisition for high-ticket Dubai businesses."
        }}
      />

      {/* Hero Section: The Growth Hook */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.02] rounded-full blur-[150px]" />
        </div>
        
        <motion.div style={{ opacity, scale }} className="max-w-6xl relative z-10">
          <span className="micro-label block mb-8 text-white/30 tracking-[1em] uppercase text-[10px] font-bold">
            SOVEREIGN ACQUISITION v5.0
          </span>
          <h1 className="text-5xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
            The Best AI Lead Gen<br/>
            <span className="text-white/60 italic font-light tracking-normal">Agency in Dubai.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed mb-16">
            Stop waiting for inbound. Deploy <strong>Autonomous Sales Swarms</strong> that hunt, qualify, and close high-ticket deals in the UAE while you sleep.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link to="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Initiate Pipeline Audit
            </Link>
            <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Active Sales Swarms in Business Bay
            </div>
          </div>
        </motion.div>
      </section>

      {/* Chapter 1: The Death of Cold Outreach (400 Words) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              The 2% Trap is<br/>Bankrupting You.
            </h2>
            <div className="h-px w-20 bg-white/20 mb-8" />
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-12">Pillar 01: Market Evolution</p>
          </div>
          <div className="space-y-12 text-white/70 font-light text-lg leading-relaxed">
            <p>
              Traditional B2B lead generation in Dubai is broken. Most agencies are still buying stale "databases" from 2022, hiring expensive human SDRs to send generic emails, and settling for a 1-2% reply rate. In a market as high-velocity as the UAE, that isn't just slow—it's a financial leak.
            </p>
            <p>
              As the premier <strong>AI Lead Generation Agency in Dubai</strong>, we recognize that the local market operates on <strong>Relationships and Direct Access</strong>. If you aren't in their WhatsApp or their Primary Inbox with a hyper-personalized, value-first hook, you don't exist.
            </p>
            <p>
              The "Agentic Shift" has changed everything. We deploy <strong>Autonomous Sales Agents</strong> that perform deep OSINT (Open Source Intelligence) on every prospect. They read their latest LinkedIn posts, analyze their company's financial reports, and identify their exact pain points before ever sending a message. This is how we achieve 25%+ reply rates for our elite Dubai partners.
            </p>
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl mt-12 border-l-4 border-l-white/40">
              <h4 className="font-serif text-2xl mb-4 italic text-white/90">The Speed of Response</h4>
              <p className="text-sm text-white/50 italic">
                In Dubai, the agency that responds first wins. Our AI agents respond to inbound inquiries in {"<"} 30 seconds, qualifying them via WhatsApp and booking them directly into your calendar. While your competitors are still sleeping, your deals are already being negotiated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Acquisition Infrastructure (800 Words) */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="micro-label block mb-4">Technical Architecture</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-8">The Sales Stack.</h2>
            <p className="text-white/40 max-w-2xl mx-auto">We architect 100% autonomous acquisition engines that decouple your growth from your headcount.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {[
              { icon: <Mail className="w-6 h-6" />, title: "Hyper-Personalized Outreach", desc: "We eliminate the 98% waste of generic cold email. Our AI writes unique, 1-to-1 hooks for every prospect based on their specific business context." },
              { icon: <Phone className="w-6 h-6" />, title: "WhatsApp AI Agents", desc: "We convert leads where 70% of Dubai business actually happens. Deploy bilingual AI agents to qualify and close in the majlis of the mobile inbox." },
              { icon: <Users className="w-6 h-6" />, title: "LinkedIn Sales Swarms", desc: "Autonomous profile management that identifies high-value stakeholders and initiates professional, non-spammy dialogues." },
              { icon: <Database className="w-6 h-6" />, title: "Real-Time Data Mining", desc: "We don't buy lists. We build them daily by crawling the live web, GMB, and DLD records for ground-truth data." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/5 bg-black rounded-3xl hover:border-white/20 transition-all group">
                <div className="text-white/40 mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive ROI Calculator */}
          <div className="max-w-4xl mx-auto p-12 bg-white text-black rounded-[3rem] relative overflow-hidden">
            <div className="relative z-10 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-4 block">The Arbitrage Calculator</span>
              <h3 className="text-4xl font-serif mb-12">Calculate Your AI Alpha.</h3>
              <div className="space-y-12">
                 <div className="space-y-6">
                    <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                       <span>Monthly Leads Hunted</span>
                       <span>{leads}</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="2000" 
                      step="50"
                      value={leads}
                      onChange={(e) => setLeads(parseInt(e.target.value))}
                      className="w-full h-1 bg-black/10 rounded-full appearance-none cursor-pointer accent-black"
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black/5 pt-12">
                    <div className="text-left">
                       <p className="text-sm text-black/40 mb-2 uppercase tracking-widest font-bold">Projected Revenue</p>
                       <p className="text-5xl font-serif">AED {revenue.toLocaleString()}</p>
                       <p className="text-[10px] text-black/30 mt-4 italic">*Based on 5% conversion and AED 50k deal value.</p>
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                       <div className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span>0% Human Commission Paid</span>
                       </div>
                       <div className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span>24/7 Continuous Hunting</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: The WhatsApp Advantage (600 Words) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div>
              <span className="micro-label block mb-6">Channel Mastery</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">Where Dubai Deals<br/>Actually Close.</h2>
              <div className="space-y-8 text-white/50 font-light text-lg leading-relaxed">
                 <p>
                    In the GCC, the inbox is for records, but <strong>WhatsApp is for relationships</strong>. If your lead generation strategy relies solely on email, you are missing 70% of the market's high-intent activity.
                 </p>
                 <p>
                    We specialize in <strong>Sovereign WhatsApp Intelligence</strong>. Our agents are programmed to initiate bilingual conversations that feel human, professional, and respectful. They can handle objections, share company credentials, and book meetings directly within the app.
                 </p>
                 <div className="grid grid-cols-2 gap-6 pt-8">
                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                       <h5 className="font-bold text-xl mb-1">98%</h5>
                       <p className="text-[10px] uppercase tracking-widest opacity-40">Open Rate</p>
                    </div>
                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                       <h5 className="font-bold text-xl mb-1">45%</h5>
                       <p className="text-[10px] uppercase tracking-widest opacity-40">Reply Rate</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="relative">
              <div className="absolute inset-0 bg-white/5 rounded-[3rem] blur-3xl opacity-20" />
              <div className="relative bg-black border border-white/10 rounded-[3rem] p-10 overflow-hidden shadow-2xl">
                 <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                       <Bot className="w-6 h-6 text-white/60" />
                    </div>
                    <div>
                       <h4 className="font-bold text-sm">Khalid (Lead Gen Agent)</h4>
                       <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online | Analyzing Prospect</span>
                    </div>
                 </div>
                 <div className="space-y-6 text-sm">
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                       <p className="opacity-70">Salam, Asif. I see you just listed a new development in Dubai Hills. Our AI has already mapped 50 high-net-worth investors looking for exactly this. Would you like a brief summary?</p>
                    </div>
                    <div className="bg-white text-black p-4 rounded-2xl rounded-tr-none ml-auto max-w-[80%]">
                       <p className="font-medium">Yes, please send the list.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                       <p className="opacity-70 italic text-[10px]">Uploading Vector Data... 100%</p>
                       <p className="opacity-70 mt-2">Sent. I've also scheduled a reminder for your follow-up tomorrow at 10 AM.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Chapter 4: Vertical Domination (600 Words) */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Built for Your Vertical.</h2>
            <p className="text-white/40 max-w-2xl mx-auto font-light">We don't build generic systems. We build high-intent acquisition engines for the sectors that drive the GCC.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Real Estate Acquisition", 
                desc: "Identify HNW investors globally and move them from 'Interest' to 'Deposit' in days, not months.",
                icon: <Building2 className="w-10 h-10" />
              },
              { 
                title: "B2B Professional Services", 
                desc: "Target CEOs and Managing Partners in DIFC & ADGM with surgical, value-driven LinkedIn & Email swarms.",
                icon: <Briefcase className="w-10 h-10" />
              },
              { 
                title: "Enterprise Technology", 
                desc: "Qualify complex technical requirements and map the entire decision-making unit for 7-figure SaaS deals.",
                icon: <Cpu className="w-10 h-10" />
              }
            ].map((v, i) => (
              <div key={i} className="p-12 border border-white/5 bg-black rounded-[3rem] hover:bg-white/[0.02] transition-all group">
                <div className="text-white/20 mb-8 group-hover:text-white transition-colors">{v.icon}</div>
                <h4 className="text-2xl font-serif mb-6">{v.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 5: Trust, Compliance & Law No. 45 (300 Words) */}
      <section className="py-40 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <Lock className="w-16 h-16 mb-12 text-white/20" />
          <h2 className="text-4xl md:text-6xl font-serif mb-12 tracking-tight">Sovereign & Secure.</h2>
          <div className="space-y-8 text-white/50 font-light text-lg leading-relaxed text-left">
             <p>
                Acquisition is useless if it exposes your organization to regulatory risk. As a dedicated <strong>AI Lead Generation Agency in Dubai</strong>, we ensure that every autonomous outreach is compliant with <strong>UAE Federal Decree-Law No. 45</strong>.
             </p>
             <p>
                We maintain full data sovereignty. Your prospect lists, interaction logs, and customer data never leave the regional cloud (G42/Azure UAE North). We build systems that protect your brand while growing your revenue.
             </p>
          </div>
          <div className="mt-16 p-1 bg-gradient-to-r from-white/10 to-transparent rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
            Enterprise Security Standard v3.0
          </div>
        </div>
      </section>

      {/* Strategic Intelligence: The Spoke Network */}
      <section className="py-40 border-t border-white/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 tracking-tight">Strategic Intelligence.</h2>
              <p className="text-white/40 text-lg font-light leading-relaxed">
                Deep-dive technical insights for Dubai enterprises architecting the future of autonomous acquisition.
              </p>
            </div>
            <Link to="/blog" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors">
              View All Insights <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The 2% Reply Rate Crisis",
                slug: "ai-reply-rate-crisis-dubai-b2b",
                category: "Market Report"
              },
              {
                title: "WhatsApp AI Mastery",
                slug: "whatsapp-ai-deals-gcc",
                category: "Sales Automation"
              },
              {
                title: "LinkedIn OSINT Agents",
                slug: "linkedin-osint-autonomous-research",
                category: "Technical AI"
              }
            ].map((post, idx) => (
              <Link 
                key={idx}
                to={`/blog/${post.slug}`}
                className="group p-12 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0066FF] mb-8">{post.category}</div>
                <h3 className="text-2xl font-serif mb-8 leading-tight group-hover:text-white transition-colors">{post.title}</h3>
                <div className="flex items-center gap-2 text-white/20 text-xs font-bold uppercase tracking-widest group-hover:text-white/40 transition-colors">
                  Read Report <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA: The Pipeline Intake */}
      <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-serif tracking-tight mb-12">Capture Your Market.<br/><span className="text-white/40 italic font-light">Decouple Your Growth.</span></h2>
          <p className="text-white/50 font-light text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            We only accept <strong>two new acquisition partners</strong> per quarter to ensure zero overlap in target market dominance. Secure your territory today.
          </p>
          <div className="flex flex-col items-center gap-10">
            <Link to="/contact" className="bg-white text-black px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] active:scale-95">
              Secure Pipeline Audit
            </Link>
            <div className="flex flex-col md:flex-row gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
              <span className="flex items-center gap-2 italic">
                <Globe className="w-3 h-3" /> Regional Lead Gen: Asif Khan
              </span>
              <span className="flex items-center gap-2 italic">
                <Target className="w-3 h-3" /> 100% Autonomous Acquisition
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Linking Swarm (SEO Boost) */}
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center text-white/80 text-[11px] uppercase tracking-[0.2em] font-bold">
            <Link to="/ai-marketing-agency-dubai" className="hover:text-white transition-colors">AI Marketing Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/services/ai-automation-chatbot-dubai" className="hover:text-white transition-colors">AI Solutions UAE</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/" className="hover:text-white transition-colors">Home Authority</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Missing Lucide Icons and Helper Components
const Briefcase = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
