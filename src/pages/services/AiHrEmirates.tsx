import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import SEO from "../../components/SEO";
import { ArrowRight, Users, CheckCircle, Clock, Database, Globe, AlertTriangle, ShieldCheck } from "lucide-react";
import SpotlightCard from "../../components/animations/SpotlightCard";

export default function AiHrEmirates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="AI HR & Emiratization Tracking Dubai UAE | Sovereign Architecture"
        description="Manage Emiratization quotas autonomously. Protect your business from AED 108,000+ fines. Accelerate onboarding with AI HR Agents hosted on UAE native compute."
        keywords="Emiratization software UAE, AI HR agent Dubai, Automate HR UAE, WPS compliance UAE, Nafis software tracking"
      />
      
      {/* ── 1. Immersive Hero ── */}
      <section className="relative min-h-[90svh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex items-center justify-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80">
              Tier 1: Sovereign AI Solutions
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8 leading-[0.9]">
            AI HR Architecture <br/><span className="italic text-white/40">& Emiratization.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Automate onboarding, streamline visa lifecycle tracking, and systematically hit Emiratization quotas without hiring massive HR departments. Protected by UAE-native data sovereignty.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto">
              Initiate HR Audit <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
        
        {/* Background gradient effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none blur-[100px]" />
      </section>

      {/* ── 2. The FOMO / Market Context ── */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Human error in MoHRE compliance <br /><span className="italic text-white/40">carries a severe price.</span></h2>
            <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
              <p>Mainland companies in the UAE are entering the final phase of Emiratization targets. The government requires a steady increase in skilled national roles, and failure to comply results in devastating financial penalties. Yet, most companies rely on disjointed spreadsheets to track Nafis metrics.</p>
              <p>Beyond compliance, the 2026 expat labor market is volatile. High turnover due to geopolitical shifts creates an onboarding nightmare for understaffed HR teams. Human HR staff simply cannot process visa tracking, WPS management, and talent acquisition at the speed required in a regional crisis.</p>
              <p className="text-white font-medium border-l-2 border-white pl-4 mt-8">
                An AI HR Agent natively models MoHRE regulations, never sleeps, and manages the entire lifecycle of thousands of employees flawlessly.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                 <div className="text-2xl font-serif text-white">AED 108k+</div>
                 <AlertTriangle className="w-5 h-5 text-red-500/80" />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-red-500/80 font-bold mb-4">Emiratization Fine</div>
              <p className="text-xs text-white/50">Annual fine *per missing Emirati* employee if MoHRE quotas are missed.</p>
            </div>
            <div className="p-8 border border-green-500/20 bg-green-500/5 rounded-2xl">
              <div className="text-3xl font-serif text-white mb-2">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-green-500/80 font-bold mb-4">Nafis Tracking Accuracy</div>
              <p className="text-xs text-white/50">Autonomous monitoring of national talent pipelines against government mandates.</p>
            </div>
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-2xl sm:col-span-2">
              <div className="text-3xl font-serif text-white mb-2">5 Days → 4 Mins</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-4">Onboarding Velocity</div>
              <p className="text-xs text-white/50">Agents instantly verify Emirates IDs, draft offer letters, provision software access, and trigger visa staging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Sovereign Infrastructure & Operations ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4 block">Engineered for the Emirates</span>
          <h2 className="text-4xl md:text-6xl font-serif">UAE Native Data. <br/><span className="italic text-white/40">Total Privacy.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg">Employee data is hyper-sensitive. Our HR agents rely on UAE sovereign networks (G42/Khazna) so PII data never crosses borders into foreign servers.</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center bg-white/[0.02]">
            <Database className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Sovereign Data Centers</h3>
            <p className="text-sm text-white/50 font-light">Hosted entirely within Abu Dhabi and Dubai. Complies with the UAE Data Protection Law automatically.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center bg-white/[0.02]">
             <Globe className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Multilingual Capability</h3>
            <p className="text-sm text-white/50 font-light">Bilingual (Khaleeji Arabic / English) internal support chatbots capable of resolving complex employee queries.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-2xl flex flex-col items-center text-center bg-white/[0.02]">
            <ShieldCheck className="w-10 h-10 text-white/30 mb-6" />
            <h3 className="text-xl font-bold mb-3">Military-Grade Security</h3>
            <p className="text-sm text-white/50 font-light">Salary data, passports, and visas are processed in secure, isolated containers with granular role-based access.</p>
          </div>
        </div>
      </section>

      {/* ── 4. Core Capabilities Detailed ── */}
      <section className="py-32 px-6 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Agentic HR <span className="italic text-white/40">Capabilities.</span></h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <SpotlightCard className="p-10 border border-white/10 rounded-3xl bg-[#0a0a0a]">
                <Users className="w-10 h-10 text-white/50 mb-6" />
                <h3 className="text-2xl font-serif mb-4 relative z-10">Emiratization Autopilot</h3>
                <p className="text-white/50 font-light mb-6 relative z-10">Never miss a MoHRE deadline. The AI syncs with your current headcount via your ERP, calculates EXACT current quotas dynamically, and pre-screens Emirati candidates automatically from Nafis job boards. It alerts executives the moment compliance drops below federal thresholds.</p>
              </SpotlightCard>
              
              <SpotlightCard className="p-10 border border-white/10 rounded-3xl bg-[#0a0a0a]">
                <Clock className="w-10 h-10 text-white/50 mb-6" />
                <h3 className="text-2xl font-serif mb-4 relative z-10">Autonomous Visa Lifecycle Tracking</h3>
                <p className="text-white/50 font-light mb-6 relative z-10">No more last-minute flight bookings because an admin forgot a visa expiry date. Agents track hundreds of passport and EID expiries across the company, triggering automated health insurance renewals and typing center dispatches weeks ahead of expiration dates.</p>
              </SpotlightCard>

               <SpotlightCard className="p-10 border border-white/10 rounded-3xl bg-[#0a0a0a] md:col-span-2 flex flex-col md:flex-row gap-10 items-center">
                 <div className="md:w-1/2 relative z-10">
                   <CheckCircle className="w-12 h-12 text-green-500/50 mb-6" />
                   <h3 className="text-3xl font-serif mb-4">Wage Protection System (WPS) Validation API</h3>
                   <p className="text-white/50 font-light text-lg">WPS blocks can freeze a company's ability to issue new visas. Our AI agents perform pre-flight checks on all monthly payroll data against MoHRE SIFF file requirements, guaranteeing a 100% acceptance rate from partner banks and clearing houses.</p>
                 </div>
                 <div className="md:w-1/2 bg-black border border-white/5 rounded-2xl p-8 relative overflow-hidden z-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[40px]"></div>
                    <div className="font-mono text-sm text-green-400 space-y-2 opacity-80">
                      <div>&gt; INITIATING PAYROLL PRE-CHECK...</div>
                      <div>&gt; SCANNING 452 EMPLOYEE RECORDS...</div>
                      <div>&gt; DETECTED: IBAN MISMATCH (EMP_ID 341)</div>
                      <div>&gt; AUTOCORRECTING VIA PREVIOUS LEDGER...</div>
                      <div className="text-white bg-green-600 inline-block px-2 mt-2">&gt; WPS_SIFF_GENERATED_SUCCESSFULLY.</div>
                    </div>
                 </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Final CTA ── */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-serif mb-8">Scale your workforce, <br/><span className="italic text-white/40">not your overhead.</span></h2>
        <p className="text-lg text-white/50 font-light mb-12">Deployment timeline for autonomous UAE compliance tracking is approximately 30 days. Contact Khalid to review technical integrations.</p>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 mx-auto">
          Begin HR Architecture Audit <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
