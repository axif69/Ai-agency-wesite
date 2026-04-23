import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SEO from "../components/SEO";
import { 
  Activity, Shield, Database, Brain, 
  TrendingUp, Users, MessageSquare, Globe, 
  Terminal, Zap, CheckCircle, AlertCircle,
  ArrowUpRight, Clock, Eye, Layers
} from "lucide-react";

export default function SovereignDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState(1420);
  const [savings, setSavings] = useState(420500);
  const [logs, setLogs] = useState<string[]>([
    "Initiating Khaleeji NLP fine-tuning...",
    "Scanning DLD transaction records for HNW patterns...",
    "Autonomous SDR Agent 04: Meeting secured with Al-Maktoum group.",
    "Bilingual Sentiment Check: 98.4% accuracy in professional Arabic.",
    "System Health: Sovereign Cloud (Dubai North) optimal."
  ]);

  // Simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setLeads(prev => prev + Math.floor(Math.random() * 2));
      setSavings(prev => prev + Math.floor(Math.random() * 50));
      
      const newLogs = [
        "Agent 09: Negotiating luxury off-plan lead in Palm Jumeirah...",
        "Updating Vector Database with live RERA regulations...",
        "Analyzing global capital flight signals (Asia -> Dubai)...",
        "Zero-Data-Leakage check: Passed.",
        "Response time: 0.8ms (Locally Hosted)",
        "Sharia-Compliance Check: AI logic verified.",
        "Sovereign Node: Load balancing across G42 clusters...",
        "Lead Intent: High-velocity capital movement detected."
      ];
      setLogs(prev => [newLogs[Math.floor(Math.random() * newLogs.length)], ...prev.slice(0, 5)]);
    }, 2500); // Increased frequency
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 pb-20 selection:bg-white/30">
      <SEO 
        title="Sovereign AI Analytics | Live Agentic Dashboard"
        description="Monitor your autonomous AI swarms in real-time. Transparent intelligence, sovereign data residency, and high-fidelity lead acquisition metrics for UAE enterprise."
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <span className="flex h-2 w-2 relative">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/80 italic">
                 Sovereign Node: UAE-DXB-01-ACTIVE
               </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif">Command & Control.</h1>
          </div>
          <div className="flex gap-4 p-1 bg-white/[0.03] border border-white/5 rounded-full">
            {["overview", "agents", "security"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === tab ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Left Column: Real-time Stats */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Primary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-8 border border-white/5 bg-white/[0.02] rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Users className="w-8 h-8" /></div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Total Leads Acquired</h4>
                  <div className="text-5xl font-serif mb-2 tracking-tighter tabular-nums">{leads.toLocaleString()}</div>
                  <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold">
                    <ArrowUpRight className="w-3 h-3" /> +12.4% THIS MONTH
                  </div>
               </div>
               <div className="p-8 border border-white/5 bg-white/[0.02] rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><TrendingUp className="w-8 h-8" /></div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Operational Savings (AED)</h4>
                  <div className="text-5xl font-serif mb-2 tracking-tighter tabular-nums">{(savings / 1000).toFixed(1)}K</div>
                  <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold">
                    <ArrowUpRight className="w-3 h-3" /> 74.2% ROI EFFICIENCY
                  </div>
               </div>
               <div className="p-8 border border-white/5 bg-white/[0.02] rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Brain className="w-8 h-8" /></div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">Agentic Reasoning Cycles</h4>
                  <div className="text-5xl font-serif mb-2 tracking-tighter tabular-nums">2.4M</div>
                  <div className="flex items-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                    Active Across 14 Sectors
                  </div>
               </div>
            </div>

            {/* Visual Chart Area with Shimmer */}
            <div className="p-10 border border-white/5 bg-white/[0.01] rounded-[3rem] min-h-[500px] flex flex-col relative overflow-hidden group">
               {/* Pulsing Scanline Effect */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0066FF]/5 to-transparent h-1/2 w-full -translate-y-full animate-[scanline_8s_linear_infinite] pointer-events-none" />
               
               <div className="flex justify-between items-center mb-12 relative z-10">
                  <h3 className="text-xl font-serif">Intent Density Heatmap (GCC)</h3>
                  <div className="flex gap-4">
                     <span className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                       <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" /> Dubai
                     </span>
                     <span className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                       <span className="w-2 h-2 rounded-full bg-white/20" /> Riyadh
                     </span>
                  </div>
               </div>
               
               <div className="flex-grow flex items-end justify-between gap-4 relative z-10">
                  {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 85].map((h, i) => (
                    <div key={i} className="flex-grow group/bar relative">
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         transition={{ duration: 1, delay: i * 0.05 }}
                         className={`w-full rounded-t-xl transition-all duration-500 cursor-pointer relative overflow-hidden ${i === 8 ? 'bg-[#0066FF] shadow-[0_0_30px_rgba(0,102,255,0.4)]' : 'bg-white/10 group-hover/bar:bg-white/20'}`}
                       >
                          {/* Shimmer effect on bars */}
                          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                       </motion.div>
                       <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                         {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes scanline {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(200%); }
            }
          `}} />

          {/* Right Column: Live Feed & System Health */}
          <div className="space-y-6">
            
            {/* Live Reasoning Feed */}
            <div className="p-8 border border-white/5 bg-black rounded-3xl h-[400px] flex flex-col">
               <div className="flex items-center gap-3 mb-6">
                  <Terminal className="w-4 h-4 text-[#0066FF]" />
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">Live Reasoning Logs</h4>
               </div>
               <div className="space-y-4 flex-grow overflow-hidden relative">
                  <AnimatePresence mode="popLayout">
                    {logs.map((log, i) => (
                      <motion.div 
                        key={log}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1 - (i * 0.2), x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-[11px] font-mono leading-relaxed"
                      >
                        <span className="text-white/20 mr-2">[{new Date().toLocaleTimeString()}]</span>
                        <span className={i === 0 ? 'text-[#0066FF]' : 'text-white/50'}>
                          {log}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
               </div>
            </div>

            {/* System Status Indicators */}
            <div className="p-8 border border-white/5 bg-white/[0.02] rounded-3xl space-y-8">
               <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 mb-6 italic">Infrastructure Health</h4>
               
               {[
                 { label: "Sovereign Cloud (G42)", status: "Optimal", color: "text-green-500" },
                 { label: "Khaleeji NLP Engine", status: "Active", color: "text-green-500" },
                 { label: "OSINT Scraping Swarms", status: "High Velocity", color: "text-blue-500" },
                 { label: "Zero-Leakage Tunnel", status: "Secure", color: "text-green-500" },
                 { label: "Agentic Response Latency", status: "1.2ms", color: "text-white" }
               ].map((sys, i) => (
                 <div key={i} className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-white/30 uppercase tracking-widest">{sys.label}</span>
                    <span className={`${sys.color} uppercase tracking-widest`}>{sys.status}</span>
                 </div>
               ))}
               
               <div className="pt-6 border-t border-white/5">
                  <button className="w-full py-4 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">
                    Initiate Security Audit
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Vertical Mastery Section */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="micro-label block mb-4 text-white/30">Intelligence distribution</span>
              <h2 className="text-3xl md:text-5xl font-serif">Vertical Penetration.</h2>
            </div>
            <p className="text-white/40 text-sm font-light max-w-xl text-right">
              Monitoring the autonomous dominance of our agents across the GCC's primary economic sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { industry: "Real Estate", saturation: "84%", volume: "AED 4.2B", icon: <Globe className="w-5 h-5" /> },
              { industry: "Institutional Finance", saturation: "62%", volume: "$1.4B", icon: <Shield className="w-5 h-5" /> },
              { industry: "Legal & Compliance", saturation: "91%", volume: "14K Docs", icon: <Layers className="w-5 h-5" /> },
              { industry: "Logistics", saturation: "48%", volume: "800K Units", icon: <Activity className="w-5 h-5" /> }
            ].map((sector, i) => (
              <div key={i} className="p-8 border border-white/5 bg-white/[0.01] rounded-[2rem] group hover:bg-white/[0.03] transition-all">
                <div className="text-white/20 mb-6 group-hover:text-[#0066FF] transition-colors">{sector.icon}</div>
                <h4 className="text-lg font-serif mb-2">{sector.industry}</h4>
                <div className="flex justify-between items-end">
                   <div>
                     <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Saturation</div>
                     <div className="text-xl font-serif">{sector.saturation}</div>
                   </div>
                   <div className="text-right">
                     <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Volume</div>
                     <div className="text-xl font-serif">{sector.volume}</div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA: Access */}
        <section className="mt-40 p-20 border border-[#0066FF]/30 bg-[#0066FF]/5 rounded-[4rem] text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.1)_0%,transparent_70%)]" />
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-serif mb-10">Request Private Command Access.</h2>
              <p className="text-white/60 text-xl font-light mb-12 max-w-2xl mx-auto">
                Ready to deploy your own Sovereign Intelligence? Our command centers are currently at 85% capacity for Q2. Secure your enterprise intake now.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                 <button className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                   Initiate Strategic Audit
                 </button>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 italic">
                   4 slots remaining for UAE-Enterprise Intake
                 </span>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
