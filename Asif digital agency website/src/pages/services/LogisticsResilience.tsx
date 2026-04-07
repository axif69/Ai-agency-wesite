import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import SEO from "../../components/SEO";
import { ArrowRight, Map, Truck, BarChart, HardDrive, ShieldAlert, Cpu } from "lucide-react";
import Meteors from "../../components/animations/Meteors";

export default function LogisticsResilience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Logistics AI Resilience UAE | Sovereign Supply Chain Architecture"
        description="Automate supply chain rerouting and logistics management. 24/7 autonomous operations for trade hubs in Dubai and Sharjah to counter cargo disruption."
        keywords="AI supply chain optimization, Logistics rerouting UAE, Jebel Ali AI automation, Sovereign logistics AI UAE"
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
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-2xl sm:col-span-2">
              <div className="text-3xl font-serif text-white mb-2">22% Cost Reduction</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-4">Operational Alpha</div>
              <p className="text-xs text-white/50">By tracking global bunker fuel prices and dynamic slot availability simultaneously without fatigue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Technical Implementation Overview ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4 block">Unshakeable Systems</span>
          <h2 className="text-4xl md:text-6xl font-serif">UAE Data Sovereignty Meets <br/><span className="italic text-white/40">Global Procurement.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg">Your agent swarms operate on protected digital soil. We integrate directly into AWS UAE Region and G42 Khazna compute, assuring zero latency and protection from global fiber-optic sabotage.</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center bg-white/[0.02]">
            <Map className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Geospatial Intelligence</h3>
            <p className="text-sm text-white/50 font-light">Direct integration with satellite routing APIs, predicting delays caused by port congestion at Jebel Ali or globally.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center bg-white/[0.02]">
             <Cpu className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Edge Compute</h3>
            <p className="text-sm text-white/50 font-light">Critical routing fallback systems deployed locally on edge networks within UAE borders to maintain functioning ports even during cloud outages.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center bg-white/[0.02]">
            <HardDrive className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Multi-Modal Integration</h3>
            <p className="text-sm text-white/50 font-light">Bridging sea, land, and air APIs natively into one conversational WhatsApp or Slack interface for rapid executive decisions.</p>
          </div>
        </div>
      </section>

      {/* ── 4. Capabilities ── */}
      <section className="py-32 px-6 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Autonomous Workflows <span className="italic text-white/40">in Action.</span></h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="p-10 border border-white/10 rounded-3xl bg-[#0a0a0a]">
                <Truck className="w-10 h-10 text-white/50 mb-6" />
                <h3 className="text-2xl font-serif mb-4">The 24/7 Digital Dispatcher</h3>
                <p className="text-white/50 font-light mb-6">Human dispatchers leave at 6 PM. Autonomous dispatchers coordinate trucking arrivals at Khalifa Port and Jebel Ali directly with port customs systems in real time. The agent autonomously modifies loading bay schedules automatically if geofencing indicates a truck delay.</p>
              </div>
              
              <div className="p-10 border border-white/10 rounded-3xl bg-[#0a0a0a]">
                <BarChart className="w-10 h-10 text-white/50 mb-6" />
                <h3 className="text-2xl font-serif mb-4">Spot Market Predation</h3>
                <p className="text-white/50 font-light mb-6">AI models dynamically scrape sea freight spot prices worldwide. When a cancellation opens up a TEU slot at a discounted rate, the system secures the booking via API instantly before human brokers are even notified.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Final CTA ── */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-serif mb-8">Disruption is inevitable. <br/><span className="italic text-white/40">Paralysis is a choice.</span></h2>
        <p className="text-lg text-white/50 font-light mb-12">Fortify your logistics architecture with Sovereign AI in 60 days. Secure the chain today.</p>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 mx-auto">
          Begin Resilience Audit <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
