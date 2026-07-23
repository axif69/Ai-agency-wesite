"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Loader2, MessageSquare, Search, Send, Workflow, Zap } from "lucide-react";

const reviewItems = [
  "Website clarity, speed and conversion flow",
  "WhatsApp reply path and missed-lead risk",
  "Lead forms, booking CTAs and follow-up process",
  "CRM, spreadsheet or manual admin bottlenecks",
  "Local SEO basics for Dubai and UAE search intent",
];

const outcomes = [
  "Your 3 biggest lead leaks",
  "One practical website improvement",
  "One WhatsApp follow-up improvement",
  "One automation you should build first",
];

const audiences = [
  "Dubai service businesses",
  "Real estate agencies",
  "Clinics, salons and appointment businesses",
  "Ecommerce and trading companies",
  "Consultants and B2B teams",
];

export default function FreeGrowthAudit() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const website = String(data.get("website") || "Not provided");
    const service = String(data.get("service") || "Not sure yet");
    const message = String(data.get("message") || "");

    try {
      const response = await fetch("/api/tools/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company: website,
          tool: "Free Growth Audit",
          consent: true,
          summary: [
            `Main service needed: ${service}`,
            `Website URL: ${website}`,
            `Current problem: ${message}`,
          ].join("\n\n"),
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <section className="relative overflow-hidden px-6 md:px-12 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.13),transparent_36%),linear-gradient(to_bottom,#050505,#080808)]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-14 items-center">
          <div>
            <span className="micro-label block mb-6 text-green-400">Free Growth Audit Dubai</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.92] tracking-tight mb-8">
              Find the leaks costing you leads.
            </h1>
            <p className="text-lg md:text-xl text-white/65 font-light leading-relaxed max-w-3xl mb-10">
              Get a free review of your website, WhatsApp follow-up, lead capture and automation opportunities. We show you what to fix first so more visitors turn into calls, enquiries and bookings.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Website", "WhatsApp", "AI Automation"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70">{item}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center text-green-300">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl">What you receive</h2>
                <p className="text-white/45 text-sm">A practical first-step action plan</p>
              </div>
            </div>
            <div className="space-y-3">
              {outcomes.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/40 p-4">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <span className="micro-label block mb-4 text-green-400">What we review</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">We check the full journey from search to enquiry.</h2>
            <p className="text-white/55 leading-relaxed">Most businesses do not have one big problem. They have small leaks across website clarity, WhatsApp response, lead capture and follow-up.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewItems.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <CheckCircle className="w-5 h-5 text-green-400 mb-4" />
                <p className="text-sm text-white/60 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12">
          <div>
            <span className="micro-label block mb-4 text-green-400">Who this is for</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">Built for businesses that need calls, bookings and project enquiries.</h2>
            <p className="text-white/55 leading-relaxed">If you are getting little traffic, low enquiries, slow WhatsApp replies or no clear booking flow, this audit gives you a practical starting point.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {audiences.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
                <p className="text-white/65 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white text-black rounded-[2.5rem] mx-4 md:mx-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-black/45 block mb-4">Request your audit</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">Tell us where leads are getting stuck.</h2>
            <p className="text-black/55 leading-relaxed">No passwords. No admin access. Just your website, current problem and the service you want to improve first.</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-6 md:p-8 space-y-5">
            <input name="tool" type="hidden" value="Free Growth Audit" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/45">Name</span>
                <input name="name" required className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none" placeholder="Your name" />
              </label>
              <label className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/45">Work email</span>
                <input name="email" type="email" required className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none" placeholder="you@company.com" />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/45">WhatsApp</span>
                <input name="phone" required className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none" placeholder="+971..." />
              </label>
              <label className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/45">Website URL</span>
                <input name="website" className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none" placeholder="https://yourwebsite.com" />
              </label>
            </div>
            <label className="space-y-2 block">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/45">Main service needed</span>
              <select name="service" required className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none">
                <option value="">Select one</option>
                <option>AI Automation Agency Dubai</option>
                <option>WhatsApp Chatbot Dubai</option>
                <option>Web Design Company Dubai</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label className="space-y-2 block">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/45">Current problem</span>
              <textarea name="message" required rows={4} className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none resize-none" placeholder="Example: website gets traffic but no calls, WhatsApp replies are slow, leads are not tracked..." />
            </label>
            {status === "success" && <p className="text-green-700 font-semibold">Audit request received. We will review it and reply soon.</p>}
            {status === "error" && <p className="text-red-600 font-semibold">Form could not be sent. Please WhatsApp us or try again.</p>}
            <button type="submit" disabled={status === "loading"} className="w-full rounded-full bg-black text-white px-8 py-5 font-bold uppercase tracking-[0.25em] text-xs inline-flex items-center justify-center gap-3 disabled:opacity-60">
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Request Free Audit
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <Zap className="w-10 h-10 text-green-400 mx-auto mb-8" />
          <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-8">Not sure what you need first?</h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10">That is exactly what the audit is for. We will tell you whether your first priority is website clarity, WhatsApp follow-up or automation.</p>
          <Link href="/ai-automation-agency-dubai" className="inline-flex items-center gap-3 text-white/80 hover:text-white">
            See our AI automation service <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
