import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { ExternalLink, ArrowRight, Shield, TrendingUp, Zap } from "lucide-react";

const categories = ["All", "Sovereign AI", "Web Architecture", "AEO & SEO", "Branding", "UI/UX", "Ecommerce"];

const portfolioItems = [
  { id: 1, title: "Sovereign Sales Swarm — B2B High-Ticket Agent", category: "Sovereign AI", location: "Dubai, UAE", desc: "Autonomous B2B discovery and outreach engine. Delivered 42 high-intent institutional leads in 30 days for a DIFC-based private equity firm. 100% G42 residency compliant.", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format,compress&fm=webp&q=75&w=1200", link: "#" },
  { id: 2, title: "Zenith Properties — Architectural Web Domain", category: "Web Architecture", location: "Dubai, UAE", desc: "A high-fidelity digital domain for luxury real estate. Features bilingual Khaleeji NLP integration and real-time inventory syncing. Revenue attribution up 240%.", img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format,compress&fm=webp&q=75&w=1200", link: "#" },
  { id: 3, title: "Gulf Logistics — Operational Resilience Shield", category: "Sovereign AI", location: "Dubai, UAE", desc: "End-to-end logistics automation using locally-hosted reasoning models. Automated 85% of shipment triage and reduced human latency by 2,400 hours monthly.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fm=webp&q=75&w=1200", link: "#" },
  { id: 4, title: "AutoElite Sharjah — AEO Dominance Protocol", category: "AEO & SEO", location: "Sharjah, UAE", desc: "Answer Engine Optimization (AEO) for Google Gemini and Perplexity. Captured 64% of high-intent search queries for 'Luxury Auto Sharjah' in 8 weeks.", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format,compress&fm=webp&q=75&w=1200", link: "#" },
  { id: 5, title: "Aurum Corporate — Institutional Identity", category: "Branding", location: "Abu Dhabi, UAE", desc: "Complete visual sovereignty for a GCC investment group. 120-page strategic brand guide and bilingual executive suite. Established market authority within 4 months.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format,compress&fm=webp&q=75&w=1200", link: "#" },
  { id: 6, title: "Meza Health — Sovereign SaaS Redesign", category: "UI/UX", location: "Dubai, UAE", desc: "Architecture of a telemedicine SaaS interface prioritizing patient data residency and Khaleeji UX patterns. NPS improved from 28 to 74.", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format,compress&fm=webp&q=75&w=1200", link: "#" },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="pt-20">
      <SEO
        title="Proven Architectures | Asif Digital Sovereign Portfolio"
        description="Explore the proven AI architectures and strategic digital domains engineered by Asif Digital for GCC enterprises."
      />

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="max-w-4xl"
        >
          <span className="micro-label block mb-4">Case Library</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">
            Proven <span className="italic text-white/50">Architectures.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
            A selection of clinical deployments where autonomous intelligence and strategic architecture have delivered unshakeable market dominance.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-12 mb-20 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${activeFilter === cat ? "bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] mb-8 border border-white/5 bg-[#0a0a0a]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm bg-black/40">
                    <a href={item.link} className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-500 shadow-2xl">
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                
                <div className="px-4">
                  <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                    <h3 className="text-3xl font-serif tracking-tight leading-tight group-hover:text-[#0066FF] transition-colors duration-500">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-white/30 mb-6">
                    <span className="text-[#0066FF]">{item.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-white/50 font-light leading-relaxed text-base max-w-xl">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Global Results Banner */}
      <section className="px-6 md:px-12 py-32 bg-[#0066FF] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <TrendingUp className="w-[800px] h-[800px] absolute -right-40 -bottom-40" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-1">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Proven Aggregation</h2>
            <p className="text-white/80 font-light text-lg">Our architectures have processed over AED 400M in revenue across the GCC territory.</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <div className="text-6xl font-serif mb-2">92%</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">Human Latency Reduction</div>
            </div>
            <div>
              <div className="text-6xl font-serif mb-2">4.2x</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">Average ROI Multiplier</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-[#0066FF] mb-12">
          <Zap className="w-4 h-4 animate-pulse" /> Live Deployment Slots Available
        </div>
        <h2 className="text-4xl md:text-7xl font-serif mb-12">Architect Your <span className="italic">Future.</span></h2>
        <Link to="/contact" className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#0066FF] hover:text-white transition-all duration-500 shadow-2xl inline-flex items-center gap-3">
          Book Resilience Audit <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
