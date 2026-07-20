"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, ExternalLink, Gauge, Loader2, RefreshCw, Search, Smartphone, Sparkles, Target } from "lucide-react";
import ToolLeadForm from "../../components/tools/ToolLeadForm";
import ToolPageFrame, { fieldClass, labelClass, panelClass } from "../../components/tools/ToolPageFrame";
import ScoreRing from "../../components/tools/ScoreRing";
import { trackEvent } from "../../utils/analytics";

type Audit = {
  url: string;
  testedAt: string;
  overall: number;
  scores: Record<string, number>;
  metrics: { lcpMs: number | null; cls: number | null; tbtMs: number | null; pageSpeedAvailable: boolean };
  findings: string[];
};

const categories = [
  ["performance", "Performance", Gauge],
  ["technicalSeo", "Technical SEO", Search],
  ["mobileAccessibility", "Mobile & Accessibility", Smartphone],
  ["conversionReadiness", "Conversion Readiness", Target],
  ["aiSearchReadiness", "AI Search Readiness", Sparkles],
] as const;

function band(score: number) {
  if (score >= 80) return "Strong foundation";
  if (score >= 55) return "Growth opportunity";
  return "Priority fixes required";
}

export default function WebsiteGrader() {
  const [form, setForm] = useState({ url: "", industry: "", market: "UAE", goal: "Generate qualified leads" });
  const [audit, setAudit] = useState<Audit | null>(null);
  const [ai, setAi] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function analyze(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading"); setError(""); setAudit(null); setAi(null);
    trackEvent("tool_start", { tool_name: "AI Website Grader", industry: form.industry, market: form.market });
    try {
      const response = await fetch("/api/tools/website-audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: form.url }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Audit failed");
      setAudit(result);
      setStatus("idle");
      trackEvent("tool_analysis_success", { tool_name: "AI Website Grader", result_band: band(result.overall) });
      fetch("/api/tools/generate-report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tool: "website-grader", facts: { ...form, audit: result } }) })
        .then((res) => res.ok ? res.json() : null).then((data) => data?.report && setAi(data.report)).catch(() => null);
    } catch (err: any) {
      setError(err.message || "We could not analyze this website.");
      setStatus("error");
    }
  }

  const summary = audit ? `${audit.url} scored ${audit.overall}/100. ${ai?.summary || `The lowest measured areas are ${Object.entries(audit.scores).sort((a, b) => a[1] - b[1]).slice(0, 2).map(([key]) => key).join(" and ")}.`} Priority fixes: ${audit.findings.join(" ")}` : "";

  return (
    <ToolPageFrame
      eyebrow="AI Website Grader"
      title="Free AI Website Grader for UAE Businesses"
      description="Enter a public website URL to receive a measured audit across performance, technical SEO, mobile accessibility, conversion readiness and AI-search clarity."
      methodologyTitle="How the website score is calculated"
      methodology={[
        "Performance uses Google PageSpeed and Lighthouse when available, including mobile lab data and Core Web Vitals diagnostics.",
        "Technical SEO checks observable page signals such as the title, description, canonical, primary heading, indexable text and structured data.",
        "Conversion readiness checks whether visitors can understand the next action and reach a form, phone number or WhatsApp journey with appropriate trust signals.",
        "AI-search readiness evaluates entity clarity, extractable answers, authorship, sources, About/contact evidence and structured data that matches visible content.",
      ]}
      guideTitle="A high score is a foundation—not a ranking guarantee"
      guide={[
        { title: "Performance versus business performance", text: "A fast page creates a better foundation, but speed alone cannot prove that the offer, message or lead journey converts. The report separates technical quality from conversion readiness." },
        { title: "Why mobile matters in the UAE", text: "Search, social and WhatsApp journeys frequently begin on mobile. The grader therefore treats mobile accessibility and a clear contact path as core business requirements." },
        { title: "What AI-search readiness means", text: "Search and answer engines need clear, crawlable facts about who you are, what you provide, where you operate and why your claims should be trusted." },
        { title: "What the grader cannot see", text: "One public URL cannot reveal your full analytics, CRM data, rankings, revenue, private integrations or customer feedback. A full audit adds those sources." },
      ]}
      faqs={[
        { q: "Is the Website Grader free?", a: "Yes. You receive the score and prioritized findings without creating an account or entering contact details." },
        { q: "Does the grader change my website?", a: "No. It only requests public page data and performs a read-only analysis." },
        { q: "Is PageSpeed the same as SEO?", a: "No. PageSpeed measures performance and related diagnostics. SEO also depends on relevance, content quality, crawlability, authority and competition." },
        { q: "What does AI-search readiness mean?", a: "It describes how clearly a page exposes useful facts, direct answers, entity information and trust evidence that search and answer systems can retrieve." },
        { q: "Will a high score guarantee Google rankings?", a: "No. No grader can guarantee rankings. This score identifies observable foundations and gaps on the tested page." },
        { q: "Can it audit Arabic and English websites?", a: "It can inspect the same technical signals on both. A deeper bilingual review is recommended for language quality and regional search intent." },
      ]}
      related={[
        { title: "AI Marketing Strategy Generator", href: "/tools/ai-marketing-strategy-generator", description: "Turn your business context into a focused 90-day UAE marketing plan." },
        { title: "Ad Spend Efficiency Analyzer", href: "/tools/ad-spend-efficiency-analyzer", description: "Calculate advertising economics and identify measurement gaps." },
      ]}
    >
      {!audit ? (
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={analyze} className={panelClass}>
            <h2 className="text-2xl font-serif">Enter the page you want to test</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/50">Use a complete public URL. We never ask for your CMS or analytics password.</p>
            <div className="mt-7"><label className={labelClass} htmlFor="grader-url">Website URL</label><input id="grader-url" required type="text" inputMode="url" placeholder="https://www.example.ae" className={fieldClass} value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} /></div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div><label className={labelClass} htmlFor="grader-industry">Industry (optional)</label><select id="grader-industry" className={fieldClass} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}><option value="">Select industry</option><option>Real estate</option><option>Professional services</option><option>E-commerce</option><option>Healthcare</option><option>Hospitality</option><option>SaaS</option><option>Other</option></select></div>
              <div><label className={labelClass} htmlFor="grader-market">Primary market</label><select id="grader-market" className={fieldClass} value={form.market} onChange={(e) => setForm({ ...form, market: e.target.value })}><option>Dubai</option><option>Abu Dhabi</option><option>Sharjah</option><option>UAE</option><option>GCC</option><option>International</option></select></div>
            </div>
            {status === "error" && <div className="mt-5 flex gap-3 rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-200"><AlertCircle className="h-5 w-5 shrink-0" />{error}</div>}
            <button disabled={status === "loading"} className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:bg-green-300 disabled:opacity-60">{status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />}{status === "loading" ? "Testing performance and page signals..." : "Analyze My Website"}</button>
          </form>
          <div className={`${panelClass} flex flex-col justify-between bg-gradient-to-br from-green-400/[0.07] to-transparent`}>
            <div><span className="micro-label text-green-400">Your report includes</span><h2 className="mt-4 text-3xl font-serif md:text-4xl">Five scores. One prioritized roadmap.</h2></div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">{categories.map(([key, title, Icon]) => <div key={key} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/40 p-4"><Icon className="h-5 w-5 text-green-400" /><span className="text-sm text-white/70">{title}</span></div>)}</div>
            <p className="mt-8 text-xs leading-relaxed text-white/35">A live audit usually takes 30–60 seconds. If PageSpeed is temporarily unavailable, the report clearly labels the partial result.</p>
          </div>
        </div>
      ) : (
        <div aria-live="polite" className="space-y-8">
          <div className={`${panelClass} grid gap-10 lg:grid-cols-[240px_1fr] lg:items-center`}><ScoreRing score={audit.overall} label={band(audit.overall)} /><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-serif md:text-4xl">Website audit complete</h2><a href={audit.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-green-300">View tested page <ExternalLink className="h-3 w-3" /></a></div><p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60">{ai?.summary || "The report combines live technical measurements with observable conversion and content signals. Start with the lowest-scoring category and the priority fixes below."}</p><button onClick={() => { setAudit(null); setAi(null); }} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white"><RefreshCw className="h-4 w-4" /> Test another page</button></div></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{categories.map(([key, title, Icon]) => <div key={key} className="rounded-2xl border border-white/10 bg-black p-5"><Icon className="h-5 w-5 text-green-400" /><div className="mt-5 text-3xl font-serif">{audit.scores[key]}</div><div className="mt-1 text-xs text-white/45">{title}</div></div>)}</div>
          {audit.metrics.pageSpeedAvailable && <div className="grid gap-4 md:grid-cols-3">{[["LCP", audit.metrics.lcpMs != null ? `${(audit.metrics.lcpMs / 1000).toFixed(1)}s` : "N/A", "Good: 2.5s or less"], ["CLS", audit.metrics.cls != null ? audit.metrics.cls.toFixed(3) : "N/A", "Good: 0.1 or less"], ["TBT", audit.metrics.tbtMs != null ? `${Math.round(audit.metrics.tbtMs)}ms` : "N/A", "Lab proxy for responsiveness"]].map(([name, value, note]) => <div key={name} className={panelClass}><div className="text-xs uppercase tracking-widest text-white/40">{name}</div><div className="mt-3 text-3xl font-serif">{value}</div><p className="mt-2 text-xs text-white/35">{note}</p></div>)}</div>}
          <div className={panelClass}><h3 className="text-2xl font-serif">Priority fix plan</h3><div className="mt-6 grid gap-4 md:grid-cols-2">{(ai?.priorities || audit.findings.map((action, index) => ({ title: `Priority ${index + 1}`, reason: "This signal was missing or weak on the tested page.", action }))).slice(0, 6).map((item: any, index: number) => <div key={`${item.title}-${index}`} className="rounded-2xl border border-white/5 bg-white/[0.025] p-5"><div className="flex gap-3"><span className="font-serif text-green-400">{String(index + 1).padStart(2, "0")}</span><div><h4 className="font-semibold">{item.title}</h4><p className="mt-2 text-xs leading-relaxed text-white/45">{item.reason}</p><p className="mt-3 text-sm leading-relaxed text-white/70">{item.action}</p></div></div></div>)}</div></div>
          <ToolLeadForm tool="AI Website Grader" summary={summary} heading="Want the Fix Plan Prioritized for Your Business?" />
        </div>
      )}
    </ToolPageFrame>
  );
}

