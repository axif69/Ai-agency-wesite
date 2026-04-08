import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Map, Truck, BarChart, HardDrive, ShieldAlert, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import Meteors from "../../components/animations/Meteors";

export default function LogisticsResilience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    {
      question: "How does AI improve logistics resilience in the UAE?",
      answer: "Our AI agents monitor regional data feeds in real-time to predict disruptions. They can autonomously analyze thousands of rerouting permutations and execute bookings via API in seconds, far faster than human dispatchers."
    },
    {
      question: "Is the logistics AI hosted locally in the UAE?",
      answer: "Yes. We prioritize UAE data sovereignty by deploying on local infrastructure like G42 Khazna compute and AWS UAE regions, ensuring low latency and protection from global network issues."
    },
    {
      question: "Can these agents integrate with my existing ERP?",
      answer: "Absolutely. Our agents are built to bridge sea, land, and air APIs natively, integrating directly with your existing logistics management software or ERP for a unified conversational interface."
    },
    {
      question: "What is the typical deployment timeline?",
      answer: "A standard supply chain resilience audit and agent pilot deployment typically takes 45 to 60 days, depending on the complexity of your current integrations."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Logistics AI Resilience UAE | Sovereign Supply Chain Architecture"
        description="Automate supply chain rerouting and logistics management. 24/7 autonomous operations for trade hubs in Dubai and Sharjah to counter cargo disruption."
        keywords="AI supply chain optimization, Logistics rerouting UAE, Jebel Ali AI automation, Sovereign logistics AI UAE"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Logistics AI Resilience",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Sharjah" }
          ],
          "description": "Autonomous supply chain rerouting and logistics management agents for UAE trade hubs, ensuring operational resilience against disruptions."
        }}
        faqSchema={faqs}
      />
      
      {/* ── 1. Immersive Hero ── */}
      <section className="relative min-h-[90svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex items-center justify-center gap-3">
             <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/80">
              Tier 1: Sovereign AI Solutions
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 leading-[0.9]">
            Logistics & Cargo <br/><span className="italic text-white/40">Resilience.</span>
          </motion.h1>
          {/* Hidden SEO Image */}
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format,compress&fm=webp&q=75&w=1200" 
            alt="Autonomous Logistics and Supply Chain Resilience AI UAE Dubai" 
            className="sr-only"
            loading="lazy"
          />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            When maritime choke points close, a human dispatcher takes 48 hours to secure a reroute. A Sovereign logistics Agentic swarm takes 2.3 seconds. We build war-agnostic supply chain architectures.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(0,100,255,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto">
              Initiate Supply Chain Audit <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
        <Meteors number={30} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_rgba(0,150,255,0.03)_0%,_transparent_70%)] pointer-events-none blur-[100px]" />
      </section>

      {/* ── 2. The FOMO / Market Context ── */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">In the Middle East, <br /><span className="italic text-white/40">hesitation is devastating.</span></h2>
            <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
              <p>The Strait of Hormuz and the wider GCC logistics grid operate on razor-thin margins. In a 2026 geopolitical disruption, insurance premiums skyrocket and human freight forwarders become paralyzed by overwhelmed communication channels.</p>
              <p>Most UAE logistics firms rely on large banks of human dispatchers. If a crisis triggers a remote-work mandate, access to secure on-premise routing software is severed. A single delayed container ship reroute can write down millions in perishable losses or manufacturing delays.</p>
              <p className="text-white font-medium border-l-2 border-white pl-4 mt-8">
                Autonomous Agents predict regional disruption through real-time data feeds, preemptively securing air-freight and secondary port routing before competitors even realize a route is closed.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                 <div className="text-2xl font-serif text-white">40%+</div>
                 <ShieldAlert className="w-5 h-5 text-red-500/80" />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-red-500/80 font-bold mb-4">Spot Rate Spike</div>
              <p className="text-xs text-white/50">Average increase in alternative freight rates within 6 hours of a regional kinetic event.</p>
            </div>
            <div className="p-8 border border-blue-500/20 bg-blue-500/5 rounded-2xl">
              <div className="text-3xl font-serif text-white mb-2">2.3 Sec</div>
              <div className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-4">Agentic Response Time</div>
              <p className="text-xs text-white/50">Time taken to analyze 1,400 alternative routing permutations and execute a booking API call.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-blue-400 text-[10px] font-bold uppercase tracking-widest">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">Logistics Resilience FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-blue-400 transition-colors">
                  {faq.question}
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-white/60 font-light leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Synergy Grid */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="micro-label block mb-4 text-[10px] font-bold uppercase tracking-widest">Strategic Synergy</span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Related Solutions</h2>
            </div>
            <Link to="/services" className="text-xs font-bold uppercase tracking-widest hover:text-white/70 transition-colors">View All Services —</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Agentic Finance", link: "/services/agentic-finance-compliance-automation-uae", desc: "Automate financial audits and trade compliance alongside logistics." },
              { title: "SaaS Development", link: "/services/saas-development-specialist-uae", desc: "Build unshakeable cloud infrastructure to power your logistics agents." },
              { title: "AI HR & Workforce", link: "/services/ai-hr-emiratization-tracking-uae", desc: "Manage your field workforce and personnel tracking with intelligent AI agents." }
            ].map((s, i) => (
              <Link key={i} to={s.link} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                <h3 className="text-xl font-serif mb-4 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed mb-6">{s.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white">Explore Solution</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
