import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { ArrowRight, Shield, Cpu, Network, Zap, CheckCircle } from "lucide-react";

const sovereignPillars = [
  { icon: <Shield className="w-6 h-6" />, title: "Operational Resilience", desc: "We don't just build software; we engineer unshakeable systems. Our mission is to ensure your business remains dominant regardless of market volatility or technical shifts." },
  { icon: <Cpu className="w-6 h-6" />, title: "Neural Architecture", desc: "Every deployment is built on custom reasoning chains. We move beyond generic LLMs to create sovereign intelligence that belongs solely to your organization." },
  { icon: <Network className="w-6 h-6" />, title: "GCC Data Sovereignty", desc: "We are committed to UAE Federal Decree-Law No. 45. All intelligence layers are architected for G42/Azure UAE North residency, ensuring 100% regional compliance." },
  { icon: <Zap className="w-6 h-6" />, title: "Autonomous Yield", desc: "We engineer systems that operate 24/7. Our goal is to eliminate human latency in high-stakes acquisition, allowing your firm to scale at the speed of computation." },
];

const evolution = [
  { year: "2020", title: "Inception", desc: "Asif Digital founded by Asif Khan with a focus on high-performance digital infrastructure for the UAE market." },
  { year: "2022", title: "Agentic Pivot", desc: "Shifted focus from standard marketing to AI-driven automation and early-stage agentic reasoning models." },
  { year: "2024", title: "Sovereign Shift", desc: "Formalized the 'Sovereign AI' framework, prioritizing data residency and locally-hosted intelligence for GCC enterprises." },
  { year: "2025", title: "Architectural Dominance", desc: "Transitioned to an elite AI Architectural Firm, deploying autonomous sales swarms and resilience shields for UHNW and institutional clients." },
];

export default function About() {
  return (
    <div className="pt-20">
      <SEO
        title="About Asif Digital | Sovereign AI Architectural Firm Dubai"
        description="Asif Digital is an elite AI architectural firm in Dubai, UAE. We specialize in sovereign intelligence, agentic automation, and GCC-compliant digital transformation."
      />

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="micro-label block mb-4">The Firm</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">
            The <span className="italic text-white/50">Architects</span> of Resilience.
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
            Asif Digital is a high-ticket Sovereign AI Architectural Firm. We engineer autonomous intelligence layers for the GCC's most ambitious enterprises, transforming legacy friction into unshakeable revenue domains.
          </p>
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="px-6 md:px-12 py-32 bg-white/[0.02] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#0066FF]/10 rounded-[3rem] blur-[100px] pointer-events-none" />
            <img
              src="https://lh3.googleusercontent.com/d/1ChELaq_hCpBMzUpw9Z7H1TBYZ9nW_JU0"
              alt="Asif Khan — Founder, Asif Digital"
              className="w-full h-auto rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10 relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-10 left-10 z-20 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-8 py-6">
              <div className="font-serif text-2xl text-white mb-1">Asif Khan</div>
              <div className="text-[#0066FF] text-[10px] uppercase tracking-[0.3em] font-bold">Founder & Principal Architect</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Beyond the Agency <span className="italic">Standard.</span></h2>
              <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
                <p>
                  Asif Digital was founded by Asif Khan with a single mission: to provide UAE enterprises with a level of digital certainty that standard agencies cannot match.
                </p>
                <p>
                  We have moved beyond the "Digital Marketing" label. Today, we function as a specialized architectural firm, designing the neural frameworks that allow companies in Dubai, Riyadh, and Abu Dhabi to operate autonomously.
                </p>
                <p>
                  Our commitment to <span className="text-white">Sovereign AI</span> means we prioritize your data residency above all else. In an era of global volatility, we ensure your intelligence remains your most guarded and productive asset.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[{ n: "150+", l: "GCC Clients" }, { n: "Sovereign", l: "Protocol" }, { n: "24/7", l: "Autonomous" }].map((s, i) => (
                <div key={i} className="p-6 border border-white/5 rounded-3xl text-center bg-white/[0.01]">
                  <div className="text-2xl font-serif mb-1">{s.n}</div>
                  <div className="text-white/40 text-[9px] uppercase tracking-widest font-bold">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sovereign Pillars */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="micro-label block mb-4">Our Methodology</span>
          <h2 className="text-4xl md:text-6xl font-serif">The Sovereign Protocol</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sovereignPillars.map((pillar, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }} 
              className="p-10 border border-white/5 rounded-[2.5rem] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 group"
            >
              <div className="text-[#0066FF] mb-8 group-hover:scale-110 transition-transform duration-500">{pillar.icon}</div>
              <h3 className="text-2xl font-serif mb-4">{pillar.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-12 py-32 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="micro-label block mb-4">Our Evolution</span>
            <h2 className="text-4xl md:text-5xl font-serif">The Trajectory of Intelligence</h2>
          </div>
          <div className="space-y-0">
            {evolution.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                className="flex flex-col md:flex-row gap-8 py-12 border-b border-white/5 last:border-0 items-start md:items-center"
              >
                <div className="flex-shrink-0 w-24">
                  <span className="text-[#0066FF] text-xl font-serif">{m.year}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-serif mb-2">{m.title}</h3>
                  <p className="text-white/50 font-light text-base leading-relaxed max-w-3xl">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
        <div className="p-16 rounded-[4rem] bg-white text-black text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full -mr-32 -mt-32" />
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Secure Your <span className="italic">Domain.</span></h2>
          <p className="text-black/60 text-xl font-light max-w-2xl mx-auto mb-12">
            The Agentic Shift is already underway in the UAE. Do not let your operations remain vulnerable to legacy friction. Speak with our Principal Architect today.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl">
            Book Strategic Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
