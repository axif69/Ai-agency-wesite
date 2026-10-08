import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, Gauge, ShieldCheck, Sparkles, FileText, Calendar, Bell, ArrowUpRight } from "lucide-react";

const tools = [
  {
    title: "AI Website Grader",
    href: "/tools/ai-website-grader",
    icon: Gauge,
    promise: "Audit one public URL across performance, SEO, accessibility, conversion readiness and AI-search clarity.",
    action: "Grade My Website",
    detail: "Measured website signals + prioritized fix plan",
  },
  {
    title: "AI Marketing Strategy Generator",
    href: "/tools/ai-marketing-strategy-generator",
    icon: BrainCircuit,
    promise: "Turn your goals, market, sales cycle and resources into a focused 90-day UAE/GCC marketing plan.",
    action: "Build My Strategy",
    detail: "Channel mix + 30/60/90-day roadmap",
  },
  {
    title: "Ad Spend Efficiency Analyzer",
    href: "/tools/ad-spend-efficiency-analyzer",
    icon: BarChart3,
    promise: "Calculate CPL, CPA, ROAS and break-even economics, then identify tracking and funnel gaps.",
    action: "Analyze My Ad Spend",
    detail: "Transparent formulas + efficiency diagnosis",
  },
];

export default function ToolsHub() {
  return (
    <div className="bg-[#050505]">
      {/* Hero Section */}
      <section className="px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <span className="micro-label mb-5 block text-emerald-400">Digital Intelligence &amp; Software Hub</span>
          <h1 className="max-w-6xl text-5xl font-serif font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl">
            Make Better Digital Decisions <span className="italic text-white/45">Before You Spend More.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">
            Explore our flagship AI compliance software and diagnostic growth tools engineered specifically for UAE businesses, founders, and operations leaders.
          </p>
          <div className="mt-9 flex flex-wrap gap-5 text-xs font-semibold text-white/55">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Useful result first</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> No platform passwords</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-400" /> AI-assisted explanations</span>
          </div>
        </div>
      </section>

      {/* Flagship SaaS Product Spotlight — ExpiryWatch */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-7xl">
          {/* Subtle eyebrow separator */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-emerald-500/60" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-emerald-400">
                Flagship Proprietary SaaS
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono text-white/40 tracking-wider">
              UAE Regulatory Compliance Copilot
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0A0A0A] p-8 md:p-12 lg:p-14 transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_25px_90px_rgba(0,0,0,0.85)] group">
            {/* Ambient emerald radial aura */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-[110px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Product Story, Value & Metrics (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full bg-white/[0.04] text-white/80 border border-white/10">
                    Proprietary AI SaaS
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold tracking-wider rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE PRODUCTION
                  </span>
                  <span className="text-[11px] font-mono text-white/40">
                    Dubai &amp; GCC Native
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-white leading-[1.1]">
                  ExpiryWatch<span className="text-emerald-400">.</span>
                  <span className="block mt-2 text-xl sm:text-2xl lg:text-3xl font-light text-white/60">
                    Automated UAE Document Expiry &amp; Compliance Copilot
                  </span>
                </h2>

                <p className="mt-5 text-sm sm:text-base text-white/65 leading-relaxed font-light">
                  Zero-touch multimodal AI engineered for UAE corporations, SMEs, and PROs. Drop any UAE Trade License, Employment Visa, Emirates ID, Commercial Ejari, or Corporate Insurance Policy. Proprietary OCR extracts statutory expiries in 3 seconds and deploys proactive WhatsApp &amp; Email alerts before DED, ICP, or MOHRE fines hit.
                </p>

                {/* 3 Key Metrics Row */}
                <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-lg">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white">3 Sec</div>
                    <div className="text-[10px] sm:text-[11px] font-medium text-white/40 uppercase tracking-wider mt-0.5">
                      OCR Extraction
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">AED 0</div>
                    <div className="text-[10px] sm:text-[11px] font-medium text-white/40 uppercase tracking-wider mt-0.5">
                      Fines Incurred
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white">4-Tier</div>
                    <div className="text-[10px] sm:text-[11px] font-medium text-white/40 uppercase tracking-wider mt-0.5">
                      30/14/7/1d Alerts
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive UI Compliance Preview Widget (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-7 shadow-2xl relative overflow-hidden transition duration-300 hover:border-emerald-500/25">
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/80 via-emerald-400 to-transparent" />

                  {/* Header: Document identification */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Commercial Trade License</div>
                        <div className="text-[10px] font-mono text-white/40">DED / DET Dubai • LLC License</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                      ACTIVE SHIELD
                    </span>
                  </div>

                  {/* Body: Live statutory indicators */}
                  <div className="py-4 space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50 flex items-center gap-1.5 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-white/40" /> Expiry Status
                      </span>
                      <span className="font-mono font-semibold text-amber-400 text-[11px]">14 Days Remaining</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50 flex items-center gap-1.5 font-mono text-[11px]">
                        <Bell className="w-3.5 h-3.5 text-white/40" /> Automated Triggers
                      </span>
                      <span className="font-mono text-emerald-400 text-[11px]">WhatsApp + Email Queued</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50 flex items-center gap-1.5 font-mono text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-white/40" /> Penalty Protection
                      </span>
                      <span className="font-mono font-semibold text-white text-[11px]">AED 250 Late Fine Prevented</span>
                    </div>
                  </div>

                  {/* Action Button & Launch Link */}
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
                    <a
                      href="https://expirywatch.asifdigital.agency"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-[0.16em] hover:bg-emerald-400 hover:text-black transition-all duration-300 shadow-xl group/btn hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Launch App</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                    <div className="flex items-center justify-between px-1 text-[10px] font-mono text-white/40">
                      <span>Live SaaS Deployment</span>
                      <span className="text-emerald-400/80">expirywatch.asifdigital.agency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Utility Calculators Grid */}
      <section className="border-y border-white/5 bg-[#080808] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/40 block mb-2">
              Instant Diagnostics
            </span>
            <h2 className="text-3xl font-serif tracking-tight text-white sm:text-4xl">
              Free Growth &amp; Performance Tools
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href} className="group flex min-h-[390px] flex-col rounded-[2.5rem] border border-white/10 bg-black p-8 transition duration-300 hover:-translate-y-2 hover:border-green-400/35 hover:shadow-[0_25px_80px_rgba(0,0,0,.45)] md:p-10">
                  <div className="flex items-center justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-green-400/10 text-green-400"><Icon className="h-7 w-7" /></span><span className="text-[9px] font-bold uppercase tracking-[0.22em] text-green-400/70">Free Tool</span></div>
                  <h3 className="mt-12 text-3xl font-serif leading-tight group-hover:text-green-300">{tool.title}</h3>
                  <p className="mt-5 flex-grow text-sm leading-relaxed text-white/55">{tool.promise}</p>
                  <div className="mt-8 border-t border-white/5 pt-6"><p className="mb-4 text-xs text-white/35">{tool.detail}</p><span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em]">{tool.action}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-14 lg:grid-cols-2">
          <div><span className="micro-label mb-4 block text-green-400">Why these tools are different</span><h2 className="text-4xl font-serif tracking-tight md:text-6xl">Measured first. Explained by AI.</h2></div>
          <div className="space-y-8 text-white/60">
            <div><h3 className="text-lg font-semibold text-white">Transparent inputs and calculations</h3><p className="mt-2 text-sm leading-relaxed">Website scores come from observable signals. Advertising metrics use your numbers and published formulas. Strategy recommendations use a visible decision framework.</p></div>
            <div><h3 className="text-lg font-semibold text-white">Built around UAE buying journeys</h3><p className="mt-2 text-sm leading-relaxed">Recommendations account for WhatsApp enquiries, bilingual journeys, high-value services, local sales cycles and the realities of tracking offline conversions.</p></div>
            <div><h3 className="text-lg font-semibold text-white">Honest limitations</h3><p className="mt-2 text-sm leading-relaxed">AI explains and prioritizes; it does not invent traffic, revenue, benchmarks or guaranteed outcomes. Each report states what can and cannot be concluded.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
