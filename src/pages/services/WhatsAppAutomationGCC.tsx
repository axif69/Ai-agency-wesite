import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import SEO from "../../components/SEO";
import { ArrowRight, MessageSquare, Bot, LineChart, ShieldCheck, Database, Zap } from "lucide-react";
import MagneticButton from "../../components/animations/MagneticButton";

export default function WhatsAppAutomationGCC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="B2B Autonomous Sales Swarms UAE | Sovereign WhatsApp AI Agents"
        description="Automate your B2B sales pipeline with AI WhatsApp Agents hosted on UAE native infrastructure. 24/7 lead qualification and negotiation without human limits."
        keywords="WhatsApp Business API UAE, AI Sales Agent Dubai, Autonomous Lead Gen, Sovereign AI UAE"
      />
      
      {/* ── 1. Immersive Hero ── */}
      <section className="relative min-h-[90svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex items-center justify-center gap-3">
             <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400/80">
              Tier 1: Sovereign AI Solutions
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 leading-[0.9]">
            Autonomous B2B <br/><span className="italic text-white/40">Sales Swarms.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Human sales teams sleep. They burn out. They require visas. Our Agentic swarms live on UAE-native compute, qualifying enterprise leads via WhatsApp in under 3 seconds—in flawless Khaleeji Arabic and English.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
            <MagneticButton>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,150,0,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto z-10">
                Initiate Revenue Audit <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_rgba(255,100,0,0.03)_0%,_transparent_70%)] pointer-events-none blur-[100px]" />
      </section>

      {/* ── 2. The FOMO / Market Context ── */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Your funnel is leaking while <br /><span className="italic text-white/40">your competitors automate.</span></h2>
            <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
              <p>In the high-ticket B2B landscape of Dubai (Real Estate, Corporate SaaS, Consulting), the first vendor to respond wins the deal 78% of the time. Yet, the average human SDR takes 4 hours to respond to a web lead.</p>
              <p>Worse, human sales teams are expensive to scale here. Expanding a regional sales team involves high base salaries, extensive visa processing, and long onboarding cycles. When a crisis hits, or a remote mandate is issued, productivity plummets.</p>
              <p className="text-white font-medium border-l-2 border-white pl-4 mt-8">
                Autonomous Sales Swarms engage every single inbound inquiry within 3 seconds, qualify the budget, answer technical objections, and only push the deal to a human closer when revenue is guaranteed.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-2xl">
              <div className="text-3xl font-serif text-white mb-2">4+ Hours</div>
              <div className="text-[10px] uppercase tracking-widest text-red-500/80 font-bold mb-4">Human Latency</div>
              <p className="text-xs text-white/50">Average time for a human SDR in the UAE to reply to an inbound B2B lead.</p>
            </div>
            <div className="p-8 border border-green-500/20 bg-green-500/5 rounded-2xl">
              <div className="text-3xl font-serif text-white mb-2">3 Sec</div>
              <div className="text-[10px] uppercase tracking-widest text-green-500/80 font-bold mb-4">Agentic Response</div>
              <p className="text-xs text-white/50">AI connection speed across WhatsApp Business API, 24 hours a day, 7 days a week.</p>
            </div>
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-2xl sm:col-span-2">
              <div className="text-3xl font-serif text-white mb-2">4x - 7x</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-4">Conversion Multiplier</div>
              <p className="text-xs text-white/50">Increase in booked appointments when moving from static Web Forms to WhatsApp Agentic Qualification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. High-Tier Architecture ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4 block">G42 / Khazna Hosted</span>
          <h2 className="text-4xl md:text-6xl font-serif">Enterprise-Grade <br/><span className="italic text-white/40">Data Privacy.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg">Your proprietary sales scripts and customer data remain entirely within the UAE. We leverage state-backed compute to ensure zero data leakage.</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center bg-white/[0.02]">
            <Database className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Sovereign CRM Sync</h3>
            <p className="text-sm text-white/50 font-light">Direct API linkage with Salesforce and HubSpot, hosted securely. PII never routes through third-party foreign APIs.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center bg-white/[0.02]">
             <Bot className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Jais Arabic LLM</h3>
            <p className="text-sm text-white/50 font-light">Trained on G42's powerful Arabic language models to perfectly mirror the linguistic nuances of Emirati and Gulf decision-makers.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center bg-white/[0.02]">
            <ShieldCheck className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Role-Based Guardrails</h3>
            <p className="text-sm text-white/50 font-light">Strict pricing floors and negotiation parameters. The agent knows exactly when to offer a discount and when to hold firm.</p>
          </div>
        </div>
      </section>

      {/* ── 4. Capabilities ── */}
      <section className="py-32 px-6 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Agentic Sales <span className="italic text-white/40">in Action.</span></h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="p-10 border border-white/10 rounded-3xl bg-[#0a0a0a]">
                <MessageSquare className="w-10 h-10 text-white/50 mb-6" />
                <h3 className="text-2xl font-serif mb-4">Deep Contextual Qualification</h3>
                <p className="text-white/50 font-light mb-6">Unlike simple decision-tree chatbots from 2022, Agentic Swarms parse natural language. If a prospect asks, <i>"Does your SaaS integrate with Oracle on-premise?"</i>, the agent consults your technical documentation instantly and replies accurately, keeping the prospect engaged.</p>
              </div>
              
              <div className="p-10 border border-white/10 rounded-3xl bg-[#0a0a0a]">
                <Zap className="w-10 h-10 text-white/50 mb-6" />
                <h3 className="text-2xl font-serif mb-4">The "Hot Handoff" Protocol</h3>
                <p className="text-white/50 font-light mb-6">The agent asks BANT (Budget, Authority, Need, Timeline) questions会話ically. The second a lead hits your high-ticket threshold (e.g., AED 1M+ budget), the agent pings your human Senior Closer on Slack to step into the WhatsApp chat live, while the agent silently transcribes the rest of the call.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Final CTA ── */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-serif mb-8">Scale your revenue, <br/><span className="italic text-white/40">not your headcount.</span></h2>
        <p className="text-lg text-white/50 font-light mb-12">Replace the "invisible funnel" drop-off with 100% lead engagement. Full Agentic WhatsApp deployment takes roughly 14 days.</p>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 mx-auto">
          Begin Pipeline Audit <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
