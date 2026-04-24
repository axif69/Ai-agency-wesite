import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import SEO from "../components/SEO";
import { ArrowRight, Shield, Zap, Globe, Database, Cog, Search, Mail, UserCheck, BarChart3, TrendingUp, Monitor, X, Maximize2, MessageSquare, Key, UserPlus, Play, DownloadCloud } from "lucide-react";
import { Link } from "react-router-dom";

export default function SovereignSalesAgent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Lightbox State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const ComparisonRow = ({ legacy, sovereign, label }: { legacy: string, sovereign: string, label: string }) => (
    <div className="grid grid-cols-2 gap-8 py-6 border-b border-white/5">
      <div className="pr-4 border-r border-white/5">
        <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-1">Legacy</span>
        <p className="text-sm text-white/50">{legacy}</p>
      </div>
      <div className="pl-4">
        <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">Sovereign</span>
        <p className="text-sm text-white/90 font-medium">{sovereign}</p>
      </div>
    </div>
  );

  const DashboardImage = ({ src, alt, title }: { src: string, alt: string, title?: string }) => (
    <div 
      className="group relative border border-white/10 rounded-3xl overflow-hidden bg-black shadow-2xl transition-all hover:border-white/40 cursor-zoom-in"
      onClick={() => {
        setSelectedImage(src);
        setSelectedTitle(title || alt);
      }}
    >
      <div className="p-4 border-b border-white/5 flex items-center justify-between gap-2 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{title || alt}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[8px] text-white/20 uppercase tracking-widest font-bold group-hover:text-white/40 transition-colors">4K Upscaled</span>
          <Maximize2 className="w-3 h-3 text-white/20 group-hover:text-white/60 transition-colors" />
        </div>
      </div>
      <div className="relative overflow-hidden aspect-video md:aspect-auto">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02] image-rendering-auto" 
        />
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Sovereign Sales Agent | Autonomous B2B Discovery | Asif Digital"
        description="Deploy an autonomous, 24/7 B2B hunting agent engineered for the UAE market. Data-sovereign discovery, real-time OSINT research, and cold outreach."
        keywords="Sovereign Sales UAE, Autonomous B2B Hunting, AI SDR Dubai, B2B Acquisition Engine"
        ogImage="/images/sovereign/dashboard-command.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Asif Digital — Sovereign Systems",
          "image": "/images/sovereign/dashboard-command.png",
          "@id": "https://asifdigital.agency/sovereign-sales-agent",
          "url": "https://asifdigital.agency/sovereign-sales-agent",
          "telephone": "+971500000000",
          "priceRange": "AED 15,000 - AED 150,000",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dubai",
            "addressRegion": "Dubai",
            "addressCountry": "AE"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Sharjah" },
            { "@type": "Country", "name": "United Arab Emirates" }
          ],
          "description": "Deployment of the Sovereign Sales Engine, a localized, data-sovereign B2B acquisition asset."
        }}
      />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-3xl cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-16 right-0 p-3 text-white/50 hover:text-white transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="w-full bg-[#0c0c0c] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] flex flex-col">
                <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">{selectedTitle} — Ultra HD Trace</span>
                  <div className="flex gap-4">
                    <span className="text-[8px] text-white/40 uppercase font-bold px-2 py-1 border border-white/10 rounded-full animate-pulse">Live Visual</span>
                  </div>
                </div>
                <div className="overflow-auto bg-black flex items-center justify-center">
                  <img src={selectedImage} alt="Expanded Dashboard View" className="max-w-full h-auto object-contain" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Section 1: The Hero (The Hook & Authority) */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808]/50 to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[120px]" />
        </div>
        
        <motion.div 
          style={{ y, opacity }}
          className="max-w-5xl relative z-10"
        >
          <span className="micro-label block mb-6 text-white/30 tracking-[0.6em] uppercase text-[10px] font-bold">
            TIER 1: AUTONOMOUS ACQUISITION INFRASTRUCTURE
          </span>
          <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-[0.9] mb-10">
            Deploy a Sovereign<br/>
            <span className="text-white/70 italic">Sales Swarm.</span>
          </h1>
          <p className="text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            An autonomous, 24/7 B2B hunting agent engineered for the UAE market. It scrapes live data, performs deep OSINT research, recovers direct WhatsApp numbers, and executes hyper-personalized outreach.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/80 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]">Initiate Operational Audit</Link>
            <Link to="/ai-marketing-agency-dubai" className="border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">Sovereign Marketing Strategy</Link>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Legacy Vulnerability (The Pain Point) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="micro-label block mb-4">Strategic Landscape</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-8">The Cost of Legacy<br/>Prospecting in 2026</h2>
            <p className="text-white/50 font-light leading-relaxed mb-10">
              Relying on human SDRs and rented SaaS databases is a critical financial leak. You are paying high UAE visa overheads for employees to manually scrape over-used lists from generic providers, resulting in sub-2% reply rates and burned domains.
            </p>
            <div className="space-y-4">
              {[
                { title: "Stale Data", desc: "Buying the same lead lists as 500 other competing agencies." },
                { title: "Human Fatigue", desc: "8-hour workdays, slow follow-ups, and inconsistent brand tone." },
                { title: "The Robotic Trap", desc: "Generic AI email blasts that trigger spam filters and ruin reputation." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 border border-white/5 bg-white/[0.02] rounded-2xl">
                  <div className="text-white/20 font-serif text-2xl italic">0{i+1}</div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-white/40 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 border border-white/10 rounded-3xl bg-white/[0.01]">
            <h3 className="text-xl font-serif mb-8 text-center text-white/70 tracking-widest uppercase">Benchmark Comparison</h3>
            <ComparisonRow label="Data Freshness" legacy="Static, monthly exports (60-90 days old)" sovereign="Real-time, live web crawling (Ground Truth)" />
            <ComparisonRow label="Personalization" legacy="Segmented by industry name only" sovereign="Direct project-level hooks and site data" />
            <ComparisonRow label="Operating Clock" legacy="9:00 AM - 6:00 PM (UAE Time)" sovereign="24/7/365 Continuous Intelligence" />
            <ComparisonRow label="Technical Overhead" legacy="AED 12k/mo LinkedIn Navigator + Apollo" sovereign="Zero Subscriptions. Single Asset Ownership." />
            <div className="mt-10 p-6 bg-white/[0.03] rounded-2xl text-center">
              <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-2 font-bold">Projected Arbitrage</span>
              <p className="text-2xl font-serif">+400% Efficiency Increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Sovereign Sales Engine (The Solution) */}
      <section id="technical" className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-24">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8">Enter the Sovereign Sales Engine</h2>
            <p className="text-white/50 font-light text-lg max-w-3xl mx-auto leading-relaxed">
              We do not sell leads. We install a private, localized acquisition asset directly into your infrastructure (3–4 day deployment). You own the software. You own the pipeline.
            </p>
          </div>

          <div className="space-y-16 mb-32 max-w-6xl mx-auto">
            <DashboardImage 
              src="/images/sovereign/dashboard-discovery.png" 
              title="Enterprise Discovery Engine v7.1"
              alt="Autonomous Lead Mining Dashboard showing Ninja Discovery features and WhatsApp mining"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DashboardImage 
                src="/images/sovereign/dashboard-db.png" 
                title="Master UAE Database"
                alt="Construction Companies list with WhatsApp numbers and reachability status"
              />
              <DashboardImage 
                src="/images/sovereign/dashboard-config.png" 
                title="Intelligence Configuration"
                alt="System settings for LLM models and email credentials"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <MessageSquare className="w-6 h-6" />, title: "B2B Reply Intelligence", desc: "The agent automatically detects and categorizes replies as 'Interested', 'Auto-Reply', or 'Neutral', visible in your control panel." },
              { icon: <Monitor className="w-6 h-6" />, title: "WhatsApp OSINT Recovery", desc: "Retrieves direct WhatsApp contact numbers from website metadata and GMB profiles for direct stakeholder access." },
              { icon: <Database className="w-6 h-6" />, title: "Enterprise Export", desc: "Full data sovereignty. One-click export of your entire discovered database to Excel or CSV for external CRM ingestion." },
              { icon: <Shield className="w-6 h-6" />, title: "Deliverability Shield", desc: "Automated MX-validation and SMTP rotation ensures your emails land in the Primary inbox, protecting your domain." }
            ].map((f, i) => (
              <div key={i} className="p-8 border border-white/5 bg-[#080808] rounded-3xl group hover:border-white/20 transition-all text-left">
                <div className="text-white/40 mb-6 group-hover:scale-110 transition-transform duration-500">{f.icon}</div>
                <h4 className="font-bold mb-4 capitalize">{f.title}</h4>
                <p className="text-xs text-white/40 font-light leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW Section: Intelligence Analytics */}
      <section className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div>
              <span className="micro-label block mb-4">Performance Transparency</span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-8">Real-time Analytics<br/>Command Center</h2>
              <p className="text-white/50 font-light leading-relaxed mb-10">
                Monitor the engine's cognitive load and performance in real-time. Gain precise insights into daily activity, delivery success, and reply sentiment without opening a single spreadsheet.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 border border-white/5 bg-white/[0.01] rounded-2xl">
                  <div className="text-white/20 text-xs uppercase tracking-widest mb-2 font-bold font-sans">Reply Accuracy</div>
                  <div className="text-2xl font-serif">100% OSINT</div>
                </div>
                <div className="p-6 border border-white/5 bg-white/[0.01] rounded-2xl">
                  <div className="text-white/20 text-xs uppercase tracking-widest mb-2 font-bold font-sans">Data Export</div>
                  <div className="text-2xl font-serif">Excel/CSV</div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-1000" />
              <DashboardImage 
                src="/images/sovereign/dashboard-analytics.png" 
                title="Analytics Command Center View"
                alt="Live activity log showing reply sentiment and interested counts"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Intelligence Arbitrage (The Financial Hook) */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <span className="micro-label block mb-6">Financial Intelligence</span>
        <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-10">The Financial Arbitrage:<br/>Ownership vs. Rental</h2>
        <p className="text-white/60 font-light leading-relaxed mb-16 max-w-2xl mx-auto">
          SaaS companies want you to rent their platform forever-our infrastructure is an asset you own. The Sovereign Sales Agent is a One-Time Investment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-[#080808] p-12">
            <h4 className="text-white/30 uppercase tracking-widest text-[10px] mb-8 font-bold">Legacy Team (1 Year)</h4>
            <div className="text-3xl font-serif mb-2">AED 150,000+</div>
            <p className="text-sm text-white/40 font-light italic mb-8">Salaries, Visas, Subscriptions</p>
            <ul className="space-y-3 text-left max-w-[200px] mx-auto text-xs text-white/40">
              <li className="flex items-center gap-2 tracking-tight">❌ High Monthly Leakage</li>
              <li className="flex items-center gap-2 tracking-tight">❌ Linear Scalability</li>
              <li className="flex items-center gap-2 tracking-tight">❌ Human Overhead</li>
            </ul>
          </div>
          <div className="bg-[#0c0c0c] p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.02] animate-pulse pointer-events-none" />
            <h4 className="text-white/60 uppercase tracking-widest text-[10px] mb-8 font-bold">Sovereign Agent</h4>
            <div className="text-3xl font-serif mb-2">One-Time Asset</div>
            <p className="text-sm text-white/80 font-light italic mb-8">Deployment Fee Only</p>
            <ul className="space-y-3 text-left max-w-[200px] mx-auto text-xs text-white/80 font-medium">
              <li className="flex items-center gap-2 tracking-tight">✅ Zero Monthly SaaS Fees</li>
              <li className="flex items-center gap-2 tracking-tight">✅ Infinite Scale</li>
              <li className="flex items-center gap-2 tracking-tight">✅ Runs 24/7/365</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: NEW 4-STEP EASY SETUP GUIDE */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.01] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-white/5 rounded-3xl -rotate-2 scale-95 transition-transform group-hover:-rotate-1" />
              <DashboardImage 
                src="/images/sovereign/dashboard-command.png" 
                title="Elite Command Center v5.0"
                alt="System monitor showing active AI stream and thread status"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="micro-label block mb-4">Operational Deployment</span>
              <h2 className="text-4xl font-serif tracking-tight mb-12">The 4-Step Elite Flow<br/><span className="text-white/50 text-2xl">Self-Managed & Seamless.</span></h2>
              <div className="space-y-10">
                {[
                  { icon: <UserPlus className="w-5 h-5" />, title: "Identity & Access", desc: "Input your company details and email credentials (Gmail App Password or Outlook). Secure and direct." },
                  { icon: <Key className="w-5 h-5" />, title: "Intelligence Keying", desc: "Input your OpenAI/Anthropic API keys to power the agent's OSINT research and personalized drafting." },
                  { icon: <Target className="w-5 h-5" />, title: "Customer Profiling", desc: "Input your company profile and mission parameters—the target niches and customer avatars you want to hunt." },
                  { icon: <Play className="w-5 h-5" />, title: "Operational Launch", desc: "Click 'Deploy Agent'. The system instantly begins finding interested companies and initiating peer-to-peer outreach." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/30 transition-all duration-500">
                      {s.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{s.title}</h4>
                      <p className="text-sm text-white/40 font-light leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: The Executive Handoff (Final CTA) */}
      <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format,compress&fm=webp&q=75&w=1200')] opacity-[0.03] scale-105" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">Stop renting your pipeline.<br/><span className="text-white/60 italic">Architect your own.</span></h2>
          <p className="text-white/50 font-light text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            The Sovereign Engine is deployed strictly for high-ticket B2B enterprises in the GCC. Deployments are completed in 3–4 days, giving you full self-management capabilities from day one.
          </p>
          <div className="flex flex-col items-center gap-8">
            <Link to="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all shadow-[0_0_60px_rgba(255,255,255,0.1)]">Speak with Khalid (Strategic Intake Agent)</Link>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <div className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold py-4 px-8 border border-white/5 rounded-full">
                DIRECT ARCHITECT: <a href="mailto:aiautomationdevelopment@gmail.com" className="text-white/60 hover:text-white transition-colors">aiautomationdevelopment@gmail.com</a>
              </div>
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
            <Link to="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Missing Lucide Icons
const Target = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
