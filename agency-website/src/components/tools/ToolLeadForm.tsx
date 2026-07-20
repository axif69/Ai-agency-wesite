"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { trackEvent } from "../../utils/analytics";
import { fieldClass, labelClass } from "./ToolPageFrame";

export default function ToolLeadForm({ tool, summary, heading = "Want a Human Review of This Result?" }: { tool: string; summary: string; heading?: string }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", consent: false });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("loading");
    try {
      const response = await fetch("/api/tools/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tool, summary }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setState("success");
      trackEvent("tool_lead_submit", { tool_name: tool, form_name: `${tool} report review` });
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return <div className="rounded-[2rem] border border-green-400/20 bg-green-400/[0.06] p-8 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-green-400" /><h3 className="mt-4 text-2xl font-serif">Request received.</h3><p className="mt-3 text-sm text-white/60">Asif Digital will review the context and contact you shortly.</p></div>;
  }

  return (
    <div className="rounded-[2rem] border border-green-400/20 bg-gradient-to-br from-green-400/[0.08] to-white/[0.02] p-6 md:p-9">
      <h3 className="text-2xl font-serif md:text-3xl">{heading}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">Share your contact details after viewing the result. We will use the report context to make the first conversation practical.</p>
      <form onSubmit={submit} className="mt-7 grid gap-4 md:grid-cols-2">
        <div><label className={labelClass} htmlFor={`${tool}-name`}>Name</label><input id={`${tool}-name`} required className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><label className={labelClass} htmlFor={`${tool}-email`}>Work email</label><input id={`${tool}-email`} required type="email" className={fieldClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><label className={labelClass} htmlFor={`${tool}-company`}>Company</label><input id={`${tool}-company`} className={fieldClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
        <div><label className={labelClass} htmlFor={`${tool}-phone`}>WhatsApp (optional)</label><input id={`${tool}-phone`} className={fieldClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        <label className="md:col-span-2 flex items-start gap-3 text-xs leading-relaxed text-white/50"><input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 accent-green-400" />I agree that Asif Digital may use these details to respond to my request. No passwords or customer data are required.</label>
        {state === "error" && <p className="md:col-span-2 text-sm text-red-300">The form could not be sent. Please use the WhatsApp button or try again.</p>}
        <button disabled={state === "loading"} className="md:col-span-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:bg-green-300 disabled:opacity-60">
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{state === "loading" ? "Sending..." : "Request My Review"}
        </button>
      </form>
    </div>
  );
}

