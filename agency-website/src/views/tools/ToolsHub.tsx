import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, Gauge, ShieldCheck, Sparkles } from "lucide-react";

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
      <section className="px-6 pb-24 pt-28 md:px-12 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <span className="micro-label mb-5 block text-green-400">Free AI Growth Tools</span>
          <h1 className="max-w-6xl text-5xl font-serif font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl">Make Better Digital Decisions <span className="italic text-white/45">Before You Spend More.</span></h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">Three practical tools built for UAE businesses to diagnose website weaknesses, create a focused marketing plan and understand what advertising is producing. Get an immediate result without creating an account.</p>
          <div className="mt-9 flex flex-wrap gap-5 text-xs font-semibold text-white/55"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-400" /> Useful result first</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-400" /> No platform passwords</span><span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-green-400" /> AI-assisted explanations</span></div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#080808] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="group flex min-h-[390px] flex-col rounded-[2.5rem] border border-white/10 bg-black p-8 transition duration-300 hover:-translate-y-2 hover:border-green-400/35 hover:shadow-[0_25px_80px_rgba(0,0,0,.45)] md:p-10">
                <div className="flex items-center justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-green-400/10 text-green-400"><Icon className="h-7 w-7" /></span><span className="text-[9px] font-bold uppercase tracking-[0.22em] text-green-400/70">Free Tool</span></div>
                <h2 className="mt-12 text-3xl font-serif leading-tight group-hover:text-green-300">{tool.title}</h2>
                <p className="mt-5 flex-grow text-sm leading-relaxed text-white/55">{tool.promise}</p>
                <div className="mt-8 border-t border-white/5 pt-6"><p className="mb-4 text-xs text-white/35">{tool.detail}</p><span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em]">{tool.action}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
              </Link>
            );
          })}
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

