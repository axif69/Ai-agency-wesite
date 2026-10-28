"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, MessageCircle } from "lucide-react";
import { trackEvent } from "../../utils/analytics";
import { fieldClass, labelClass } from "./ToolPageFrame";

export default function ToolLeadForm({ tool, summary, heading = "Want a Human Review of This Result?" }: { tool: string; summary: string; heading?: string }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", consent: false });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("loading");
    try {
      const accessKey = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "").trim();
      if (!accessKey) throw new Error("Form delivery is not configured");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          company: form.company || "Not provided",
          phone: form.phone || "Not provided",
          tool,
          message: summary || "The visitor requested a review of their tool result.",
          subject: `${tool} lead from ${form.name}`,
          from_name: "Asif Digital Free Tools",
          botcheck: "",
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.message || "Submission failed");
      setState("success");
      trackEvent("generate_lead", { form_name: "Tool Lead Form", tool_name: tool, lead_type: "tool_review" });
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return <div className="rounded-[2rem] border border-green-400/20 bg-green-400/[0.06] p-8 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-green-400" /><h3 className="mt-4 text-2xl font-serif">Request received.</h3><p className="mt-3 text-sm text-white/60">Asif Digital will review the context and contact you shortly.</p></div>;
  }

  const waMessage = encodeURIComponent(
    `Hi Asif, I just used the ${tool} on your website and would like a strategic review:\n\n${summary || "Please review our performance & automation potential."}`
  );
  const waUrl = `https://wa.me/971545866094?text=${waMessage}`;

  return (
    <div className="rounded-[2rem] border border-green-400/20 bg-gradient-to-br from-green-400/[0.08] to-white/[0.02] p-6 md:p-9">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h3 className="text-2xl font-serif md:text-3xl">{heading}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
            Get an instant expert audit of your figures, tracking setup, and automation opportunities.
          </p>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("tool_whatsapp_lead_click", { tool_name: tool })}
          className="shrink-0 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          <span>Chat on WhatsApp (+971)</span>
        </a>
      </div>
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
