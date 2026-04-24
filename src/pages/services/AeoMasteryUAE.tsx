import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { Search, TrendingUp, Target, BarChart, Globe, CheckCircle2, Cpu, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Meteors from "../../components/animations/Meteors";

export default function AeoMasteryUAE() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="AEO Mastery UAE | Google SGE & AI Search Optimization"
        description="Dominate AI search in Dubai and Sharjah. Optimize your brand for Google's Search Generative Experience (SGE), ChatGPT, and Gemini."
        keywords="AEO Dubai, Google SGE optimization UAE, AI Search Sharjah, LLM optimization Dubai, Answer Engine Optimization UAE"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "AEO & AI Search Mastery",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
          "description": "Technical optimization for AI search engines and Google SGE in the Middle East."
        }}
        faqSchema={[
          {
            question: "How do I rank in Google's AI Overviews (SGE) in the UAE?",
            answer: "Google SGE prioritizes Entity Authority. We optimize your business by structuring data in the Knowledge Graph, ensuring your brand is the primary source for AI-generated summaries in Dubai and Sharjah."
          },
          {
            question: "Is LLM Optimization (LLMO) different from traditional SEO?",
            answer: "Yes. While SEO focuses on keywords, LLMO focuses on 'semantic readability.' We structure your content so that models like ChatGPT and Gemini can cite your brand as an expert source in the GCC region."
          }
        ]}
      />
      
      {/* ── Hero ── */}
      <section className="relative min-h-[80svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.3em] text-white/40">
             <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
             SEARCH 3.0 PROTOCOL: ACTIVE
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 leading-[0.9]">
            AEO <br/><span className="italic text-white/40">Mastery.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Stop ranking for links. Start ranking as the Answer. We optimize your UAE brand for the era of AI Search (SGE), Gemini, and ChatGPT.
          </motion.p>
        </motion.div>
        <Meteors number={15} />
      </section>

      {/* ── Technical Solutions ── */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-20 text-center">The New Search <span className="italic">Frontier.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Target className="w-8 h-8 text-white" />, 
                title: "Entity Authority", 
                desc: "Establishing your brand as a verifiable entity in the Google Knowledge Graph for the UAE market." 
              },
              { 
                icon: <Cpu className="w-8 h-8 text-white" />, 
                title: "LLM Readability", 
                desc: "Structuring your site architecture so AI models can parse and cite your data with zero friction." 
              },
              { 
                icon: <Zap className="w-8 h-8 text-white" />, 
                title: "SGE Dominance", 
                desc: "Optimizing for Google's Search Generative Experience to ensure you are the featured AI summary." 
              }
            ].map((s, i) => (
              <div key={i} className="p-10 border border-white/5 bg-white/[0.02] rounded-3xl hover:bg-white/[0.05] transition-all">
                <div className="mb-8">{s.icon}</div>
                <h3 className="text-2xl font-serif mb-4">{s.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── "Proper Answer" Section ── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6 block">Search Intelligence Report</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">Be the <br/><span className="italic text-white/40">Definitive Source.</span></h2>
          <div className="space-y-12">
            <div className="p-8 border-l-2 border-white/20 bg-white/5 rounded-r-3xl">
              <h3 className="text-xl font-bold mb-6">The AEO vs. SEO Architecture Gap</h3>
              <p className="text-white/60 font-light leading-relaxed mb-8">
                Traditional SEO focuses on backlinks and keywords. AEO focuses on **Entity Proximity** and **Knowledge Graph Ingress**. Here is how we bridge the gap for UAE brands:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Knowledge Graph Nodes</h4>
                  <p className="text-xs text-white/70 leading-relaxed">We don't just write blogs; we create JSON-LD schema swarms that define your UAE business as a 'Sovereign Entity' within the global Knowledge Graph, ensuring AI models cite you as a primary source.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Semantic Readability</h4>
                  <p className="text-xs text-white/70 leading-relaxed">Our content is optimized for LLM 'Perplexity' scores. We structure data so that Gemini and ChatGPT can parse your service offerings as definitive facts rather than marketing claims.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Entity Authority (UAE)</h4>
                  <p className="text-xs text-white/70 leading-relaxed">By building high-fidelity local citations and 'Regional Signals' in Arabic and English, we verify your authority as the leading voice for your industry in the GCC.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">SGE Snippet Capture</h4>
                  <p className="text-xs text-white/70 leading-relaxed">We reverse-engineer the 'Answer-Box' triggers for Google SGE, positioning your brand as the 'Recommended AI Summary' for high-value transactional queries.</p>
                </div>
              </div>
            </div>
            <div className="p-8 border-l-2 border-white/20 bg-white/5 rounded-r-3xl">
              <h3 className="text-xl font-bold mb-4 text-white/90">From Ranking to Recommended</h3>
              <p className="text-white/60 font-light leading-relaxed">
                In 2026, being on Page 1 is insufficient. If a user asks "What is the best AI agency in Dubai?", the AI will summarize the top three entities it trusts. Our AEO strategy ensures you are not just a link on the page, but the trusted entity that the AI recommends by name.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-white/5 text-center">
        <h2 className="text-4xl font-serif mb-10">Ready to <span className="italic">Dominate AI Search?</span></h2>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
          Initiate AEO Audit
        </button>
      </section>
    </div>
  );
}
