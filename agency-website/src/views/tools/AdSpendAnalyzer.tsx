"use client";

import { useMemo, useState } from "react";
import { BarChart3, Calculator, CheckCircle2, Loader2, RefreshCw, TriangleAlert, Upload } from "lucide-react";
import ToolLeadForm from "../../components/tools/ToolLeadForm";
import ToolPageFrame, { fieldClass, labelClass, panelClass } from "../../components/tools/ToolPageFrame";
import ScoreRing from "../../components/tools/ScoreRing";
import { trackEvent } from "../../utils/analytics";

const initial = { currency: "AED", period: "30 days", spend: "", clicks: "", leads: "", qualified: "", customers: "", revenue: "", saleValue: "", margin: "", industry: "Real estate", market: "Dubai", platforms: "Google Ads, Meta", tracking: "basic", whatsapp: false, crm: false, offline: false, response: "1–4 hours", intent: false, testing: false };
const n = (value: string) => { const parsed = Number(value); return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0; };
const div = (a: number, b: number) => b > 0 ? a / b : null;
const money = (value: number | null, currency: string) => value == null ? "N/A" : `${currency} ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

function calculate(form: typeof initial) {
  const spend = n(form.spend), clicks = n(form.clicks), leads = n(form.leads), qualified = n(form.qualified), customers = n(form.customers), revenue = n(form.revenue), saleValue = n(form.saleValue), margin = n(form.margin) / 100;
  const cpc = div(spend, clicks), cpl = div(spend, leads), cpql = div(spend, qualified), cpa = div(spend, customers), roas = div(revenue, spend), leadToCustomer = div(customers, leads);
  const breakEvenCpa = saleValue > 0 && margin > 0 ? saleValue * margin : null;
  const breakEvenRoas = margin > 0 ? 1 / margin : null;
  const maxCpl = breakEvenCpa != null && leadToCustomer != null ? breakEvenCpa * leadToCustomer : null;
  const measurement = Math.min(100, (form.tracking === "advanced" ? 30 : form.tracking === "basic" ? 15 : 0) + (form.whatsapp ? 20 : 0) + (form.crm ? 20 : 0) + (form.offline ? 20 : 0) + (revenue > 0 ? 10 : 0));
  const funnel = Math.min(100, (leads > 0 ? 20 : 0) + (qualified > 0 ? 20 : 0) + (customers > 0 ? 20 : 0) + (form.response === "Under 15 minutes" ? 25 : form.response === "15–60 minutes" ? 18 : form.response === "1–4 hours" ? 10 : 2) + (form.crm ? 15 : 0));
  const control = Math.min(100, (form.intent ? 35 : 0) + (form.testing ? 30 : 0) + (form.platforms ? 15 : 0) + (form.market ? 10 : 0) + (form.industry ? 10 : 0));
  const status = !spend || !leads ? "Insufficient data" : roas != null && breakEvenRoas != null && roas >= breakEvenRoas ? "Profitable and measurable" : measurement < 55 ? "Promising but under-measured" : cpa != null && breakEvenCpa != null && cpa > breakEvenCpa ? "Below break-even" : "Performance needs context";
  return { spend, clicks, leads, qualified, customers, revenue, cpc, cpl, cpql, cpa, roas, leadToCustomer, breakEvenCpa, breakEvenRoas, maxCpl, measurement, funnel, control, status };
}

function parseCsvLine(line: string) {
  const cells: string[] = []; let current = ""; let quoted = false;
  for (let index = 0; index < line.length; index += 1) { const char = line[index]; if (char === '"') { if (quoted && line[index + 1] === '"') { current += '"'; index += 1; } else quoted = !quoted; } else if (char === "," && !quoted) { cells.push(current.trim()); current = ""; } else current += char; }
  cells.push(current.trim()); return cells;
}

function csvNumber(value: string) { const parsed = Number(String(value || "").replace(/[^0-9.-]/g, "")); return Number.isFinite(parsed) ? parsed : 0; }

function analyzeCsv(text: string) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error("The CSV has no data rows.");
  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase().replace(/[_-]/g, " ").replace(/\s+/g, " ").trim());
  const rows = lines.slice(1).map(parseCsvLine);
  const find = (terms: string[]) => headers.findIndex((header) => terms.some((term) => header === term || header.includes(term)));
  const indexes = { spend: find(["amount spent", "spend", "cost"]), clicks: find(["link clicks", "clicks"]), leads: find(["leads", "conversions", "results"]), customers: find(["purchases", "customers", "sales"]), revenue: find(["purchase conversion value", "conversion value", "revenue"]) };
  const totals: Record<string, number> = {};
  Object.entries(indexes).forEach(([key, column]) => { if (column >= 0) totals[key] = rows.reduce((sum, row) => sum + csvNumber(row[column]), 0); });
  const mapped = Object.keys(totals);
  if (!mapped.includes("spend") || !mapped.includes("leads")) throw new Error("The CSV must contain recognizable spend/cost and leads/conversions/results columns.");
  return { totals, mapped, rows: rows.length };
}

export default function AdSpendAnalyzer() {
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState<any>(null);
  const [ai, setAi] = useState<any>(null);
  const [aiStatus, setAiStatus] = useState<"idle" | "loading" | "complete" | "unavailable">("idle");
  const [dataSource, setDataSource] = useState("Manual inputs");
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const calc = useMemo(() => calculate(form), [form]);
  const set = (key: keyof typeof initial, value: any) => setForm({ ...form, [key]: value });

  async function analyze(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setResult(calc); setAi(null); setAiStatus("loading");
    trackEvent("tool_start", { tool_name: "Ad Spend Efficiency Analyzer", industry: form.industry, market: form.market });
    try {
      const response = await fetch("/api/tools/generate-report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tool: "ad-spend-analyzer", facts: { dataSource, inputs: form, metrics: calc } }) });
      if (!response.ok) throw new Error("AI unavailable");
      const data = await response.json();
      if (data.report) { setAi(data.report); setAiStatus("complete"); } else setAiStatus("unavailable");
    } catch { setAiStatus("unavailable"); }
    setLoading(false);
    trackEvent("tool_analysis_success", { tool_name: "Ad Spend Efficiency Analyzer", result_band: calc.status });
  }

  const input = (key: keyof typeof initial, label: string, required = false) => <div><label className={labelClass} htmlFor={`ads-${key}`}>{label}</label><input id={`ads-${key}`} required={required} type="number" min="0" step="any" className={fieldClass} value={form[key] as string} onChange={(e) => set(key, e.target.value)} /></div>;
  const summary = result ? `${result.status}. Spend ${money(result.spend, form.currency)}, CPL ${money(result.cpl, form.currency)}, CPA ${money(result.cpa, form.currency)}, ROAS ${result.roas == null ? "not available" : `${result.roas.toFixed(2)}x`}. Measurement confidence ${result.measurement}/100. ${ai?.summary || ""}` : "";

  async function importCsv(file?: File) {
    if (!file) return;
    try {
      const parsed = analyzeCsv(await file.text());
      setForm((current) => ({ ...current, ...Object.fromEntries(Object.entries(parsed.totals).map(([key, value]) => [key, String(Math.round(value * 100) / 100)])) }));
      setDataSource(`${file.name} (${parsed.rows} campaign rows)`);
      setUploadMessage(`Imported real totals for: ${parsed.mapped.join(", ")}. Please verify the mapped fields before analyzing.`);
      trackEvent("tool_csv_import", { tool_name: "Ad Spend Efficiency Analyzer", mapped_fields: parsed.mapped.join(",") });
    } catch (error: any) { setUploadMessage(error.message || "The CSV could not be read."); }
  }

  return <ToolPageFrame eyebrow="Ad Spend Efficiency Analyzer" title="Understand What Your Ad Spend Is Actually Producing" description="Enter your real campaign and sales numbers to calculate CPL, CPA, ROAS and break-even thresholds, then identify tracking and funnel gaps. No ad-account login required."
    methodologyTitle="Transparent formulas—not invented benchmarks" methodology={["CPL, CPA, conversion rate and ROAS are calculated directly from the numbers you provide using standard advertising definitions.", "Break-even CPA and ROAS are shown only when average sale value and gross margin are available.", "Measurement, funnel and campaign-control scores diagnose data completeness and operating discipline; they do not pretend to be platform performance benchmarks.", "If the evidence is incomplete, the tool says so instead of presenting a false wasted-spend number."]}
    guideTitle="Advertising efficiency depends on the full customer journey" guide={[{ title: "CPL is not customer acquisition cost", text: "A low-cost lead can still be unprofitable if qualification or sales conversion is weak. CPA and gross profit provide more useful commercial context." }, { title: "ROAS versus ROI", text: "ROAS compares attributed conversion value with advertising spend. ROI considers profit and costs. A campaign can show positive ROAS while still failing to produce acceptable profit." }, { title: "WhatsApp and offline attribution", text: "UAE leads often move from an ad into WhatsApp, a phone call or an offline sales process. If those outcomes are not connected, platform reports cannot show the complete journey." }, { title: "Response time is part of media performance", text: "Paid media creates opportunities, but slow routing and follow-up can destroy value after the platform has delivered the lead." }]}
    faqs={[{ q: "What is a good ROAS?", a: "There is no universal answer. A viable ROAS depends on gross margin, operating costs, customer lifetime value and cash-flow requirements." }, { q: "What is the difference between ROAS and ROI?", a: "ROAS is conversion value divided by ad spend. ROI considers profit relative to total investment and therefore needs more complete cost information." }, { q: "How is break-even CPA calculated?", a: "This tool multiplies average sale value by gross margin. For a lead funnel, it can then use the lead-to-customer rate to estimate a maximum affordable CPL." }, { q: "Does it access Google or Meta accounts?", a: "No. Version one uses only the summary numbers you enter and never asks for an account password." }, { q: "Is estimated spend at risk confirmed waste?", a: "No. A risk estimate highlights incomplete measurement or control. Confirmed waste requires account-level and sales data." }, { q: "Can Asif Digital audit the campaigns directly?", a: "Yes. A human review can examine tracking, search terms, audiences, creative, landing pages, CRM routing and sales outcomes." }]}
    related={[{ title: "AI Marketing Strategy Generator", href: "/tools/ai-marketing-strategy-generator", description: "Build the wider 90-day plan around your commercial goals." }, { title: "AI Website Grader", href: "/tools/ai-website-grader", description: "Check whether the landing experience supports paid traffic." }]}
  >
    {!result ? <form onSubmit={analyze} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className={panelClass}><h2 className="text-2xl font-serif">Campaign and sales inputs</h2><p className="mt-3 text-sm text-white/50">Use one consistent reporting period, or import a Google/Meta-style CSV export. The tool never logs into your ad account.</p>
        <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-green-400/30 bg-green-400/5 p-5 hover:bg-green-400/10"><span><span className="flex items-center gap-2 font-semibold"><Upload className="h-4 w-4 text-green-400" /> Import campaign CSV</span><span className="mt-1 block text-xs text-white/40">Recognizes spend/cost, clicks, leads/conversions/results, customers/purchases and conversion value/revenue.</span></span><input type="file" accept=".csv,text/csv" className="sr-only" onChange={(event) => importCsv(event.target.files?.[0])} /></label>
        {uploadMessage && <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/60">{uploadMessage}</div>}
        <div className="mt-7 grid gap-5 md:grid-cols-3"><div><label className={labelClass} htmlFor="ads-currency">Currency</label><select id="ads-currency" className={fieldClass} value={form.currency} onChange={(e) => set("currency", e.target.value)}>{["AED", "SAR", "USD", "QAR", "KWD", "BHD", "OMR"].map((x) => <option key={x}>{x}</option>)}</select></div><div><label className={labelClass} htmlFor="ads-period">Reporting period</label><select id="ads-period" className={fieldClass} value={form.period} onChange={(e) => set("period", e.target.value)}><option>30 days</option><option>60 days</option><option>90 days</option></select></div>{input("spend", "Total ad spend", true)}</div>
        <div className="mt-8 border-t border-white/5 pt-7"><h3 className="font-semibold">Funnel performance</h3><div className="mt-5 grid gap-5 md:grid-cols-3">{input("clicks", "Clicks / visits")}{input("leads", "Leads / conversions", true)}{input("qualified", "Qualified leads")}{input("customers", "Customers / sales")}{input("revenue", "Attributed revenue")}{input("saleValue", "Average sale value")}{input("margin", "Gross margin %")}</div></div>
        <div className="mt-8 border-t border-white/5 pt-7"><h3 className="font-semibold">Measurement and control</h3><div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3"><div><label className={labelClass} htmlFor="ads-platforms">Platforms</label><input id="ads-platforms" className={fieldClass} value={form.platforms} onChange={(e) => set("platforms", e.target.value)} /></div><div><label className={labelClass} htmlFor="ads-industry">Industry</label><select id="ads-industry" className={fieldClass} value={form.industry} onChange={(e) => set("industry", e.target.value)}><option>Real estate</option><option>Professional services</option><option>E-commerce</option><option>Healthcare</option><option>Hospitality</option><option>SaaS</option><option>Other</option></select></div><div><label className={labelClass} htmlFor="ads-market">Market</label><select id="ads-market" className={fieldClass} value={form.market} onChange={(e) => set("market", e.target.value)}><option>Dubai</option><option>Abu Dhabi</option><option>Sharjah</option><option>UAE</option><option>GCC</option></select></div><div><label className={labelClass} htmlFor="ads-tracking">Conversion tracking</label><select id="ads-tracking" className={fieldClass} value={form.tracking} onChange={(e) => set("tracking", e.target.value)}><option value="none">None</option><option value="basic">Basic platform tracking</option><option value="advanced">Enhanced + CRM attribution</option></select></div><div><label className={labelClass} htmlFor="ads-response">Lead response time</label><select id="ads-response" className={fieldClass} value={form.response} onChange={(e) => set("response", e.target.value)}><option>Under 15 minutes</option><option>15–60 minutes</option><option>1–4 hours</option><option>Same day</option><option>Next day or later</option></select></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{[["whatsapp", "Calls and WhatsApp tracked"], ["crm", "CRM source captured"], ["offline", "Offline sales attributed"], ["intent", "Campaigns separated by intent"], ["testing", "Creative tested regularly"]].map(([key, label]) => <label key={key} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-sm text-white/60"><input type="checkbox" className="accent-green-400" checked={form[key as keyof typeof form] as boolean} onChange={(e) => set(key as keyof typeof initial, e.target.checked)} />{label}</label>)}</div></div>
        <button disabled={loading} className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-black hover:bg-green-300 disabled:opacity-60">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calculator className="h-4 w-4" />}{loading ? "Analyzing economics..." : "Analyze My Ad Spend"}</button>
      </div>
      <aside className={`${panelClass} h-fit lg:sticky lg:top-32`}><span className="micro-label text-green-400">Live calculation preview</span><div className="mt-8 grid grid-cols-2 gap-4">{[["CPL", money(calc.cpl, form.currency)], ["CPA", money(calc.cpa, form.currency)], ["ROAS", calc.roas == null ? "N/A" : `${calc.roas.toFixed(2)}x`], ["Break-even CPA", money(calc.breakEvenCpa, form.currency)]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/5 bg-black p-4"><div className="text-[9px] uppercase tracking-widest text-white/35">{label}</div><div className="mt-2 text-lg font-serif">{value}</div></div>)}</div><p className="mt-7 text-xs leading-relaxed text-white/35">These values update from your inputs. Missing information remains “N/A” rather than being treated as zero.</p></aside>
    </form> : <div aria-live="polite" className="space-y-8">
      <div className={panelClass}><div className="flex flex-col justify-between gap-6 md:flex-row"><div><div className="flex flex-wrap items-center gap-3"><span className="micro-label text-green-400">Verified calculation status</span><span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] uppercase tracking-widest text-white/55">Source: {dataSource}</span></div><h2 className="mt-4 text-4xl font-serif md:text-6xl">{result.status}</h2><p className="mt-5 max-w-4xl text-sm leading-relaxed text-white/60">{ai?.summary || (aiStatus === "loading" ? "The formulas are complete. AI is now analyzing the supplied metrics and missing evidence." : "The verified calculations remain valid, but the AI explanation is currently unavailable.")}</p><p className={`mt-4 text-xs ${aiStatus === "complete" ? "text-green-300" : "text-white/35"}`}>{aiStatus === "loading" ? "AI analysis in progress…" : aiStatus === "complete" ? "AI analysis completed from the displayed numbers" : "AI analysis unavailable — no AI recommendations substituted"}</p></div><button onClick={() => { setResult(null); setAi(null); setAiStatus("idle"); }} className="inline-flex h-fit items-center gap-2 text-xs uppercase tracking-widest text-white/45 hover:text-white"><RefreshCw className="h-4 w-4" /> Start again</button></div></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[["Spend", money(result.spend, form.currency)], ["CPL", money(result.cpl, form.currency)], ["CPA", money(result.cpa, form.currency)], ["ROAS", result.roas == null ? "N/A" : `${result.roas.toFixed(2)}x`], ["Break-even CPA", money(result.breakEvenCpa, form.currency)]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-black p-5"><div className="text-[9px] uppercase tracking-widest text-white/35">{label}</div><div className="mt-3 text-2xl font-serif">{value}</div></div>)}</div>
      <div className="grid gap-6 md:grid-cols-3"><ScoreRing score={result.measurement} label="Measurement confidence" /><ScoreRing score={result.funnel} label="Funnel efficiency" /><ScoreRing score={result.control} label="Campaign control" /></div>
      {(result.roas == null || result.breakEvenRoas == null) && <div className="flex gap-4 rounded-2xl border border-yellow-300/20 bg-yellow-300/5 p-5 text-sm leading-relaxed text-yellow-100/80"><TriangleAlert className="h-5 w-5 shrink-0" />We cannot responsibly estimate confirmed wasted spend from the available inputs. Add attributed revenue, average sale value, margin and sales conversions to establish break-even economics.</div>}
      {aiStatus === "complete" && ai?.evidenceUsed?.length ? <div className={panelClass}><h3 className="text-2xl font-serif">Evidence the AI used</h3><div className="mt-5 grid gap-3 md:grid-cols-2">{ai.evidenceUsed.map((item: string) => <div key={item} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-sm text-white/60">{item}</div>)}</div></div> : null}
      {aiStatus === "complete" && ai?.priorities?.length ? <div className={panelClass}><h3 className="text-2xl font-serif">AI-prioritized action plan</h3><p className="mt-2 text-xs text-white/35">Every reason below is required to cite a supplied number or missing field.</p><div className="mt-6 grid gap-4 md:grid-cols-2">{ai.priorities.map((item: any, index: number) => <div key={`${item.area}-${index}`} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400"><CheckCircle2 className="h-4 w-4" />{item.area}</div><h4 className="mt-4 font-semibold">{item.action}</h4><p className="mt-2 text-xs leading-relaxed text-white/45">{item.reason}</p></div>)}</div></div> : aiStatus === "unavailable" ? <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/5 p-5 text-sm text-yellow-100/70">AI recommendations could not be generated. The displayed CPL, CPA, ROAS and break-even values are still exact mathematical results from the supplied data.</div> : null}
      <ToolLeadForm tool="Ad Spend Efficiency Analyzer" summary={summary} heading="Get a Human Review of the Numbers" />
    </div>}
  </ToolPageFrame>;
}
