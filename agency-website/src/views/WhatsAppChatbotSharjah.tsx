"use client";

import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, Clock, Database, HelpCircle, Languages, MessageSquare, ShieldCheck, UserCheck } from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Instant WhatsApp replies",
    desc: "Answer common questions quickly after working hours, weekends and busy periods, while keeping human handoff available."
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "Lead qualification",
    desc: "Collect name, phone, area, service requirement, urgency and budget before your team spends time on the conversation."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "CRM or sheet handoff",
    desc: "Send qualified enquiries to Google Sheets, email alerts, CRM pipelines or a simple dashboard your team can actually use."
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: "Arabic and English flows",
    desc: "Build bilingual chatbot journeys for Sharjah customers who prefer Arabic, English or mixed-language WhatsApp conversations."
  }
];

const useCases = [
  "Clinics, salons and wellness businesses can answer FAQs, collect details and push customers toward appointments.",
  "Maintenance, contracting and home-service companies can collect area, issue type, urgency and photos before calling back.",
  "Trading and B2B suppliers can collect product interest, quantity, delivery area and buyer details before quotation.",
  "Education centres, consultants and professional services can qualify enquiries and route serious prospects to a human."
];

const faqs = [
  {
    q: "What does a WhatsApp chatbot company in Sharjah build?",
    a: "It builds automated WhatsApp flows that answer common questions, collect lead details, qualify enquiries, book calls or appointments, and pass serious customers to your team."
  },
  {
    q: "Can the chatbot work in Arabic and English?",
    a: "Yes. We can build Arabic, English or bilingual flows. For complex or sensitive replies, we can keep human approval and escalation rules."
  },
  {
    q: "How much does a WhatsApp chatbot cost in Sharjah?",
    a: "A simple WhatsApp lead bot can start from around AED 1,500. More complete systems with website chat, CRM updates, appointment routing and reporting cost more depending on the workflow."
  },
  {
    q: "Can it connect to my website forms and CRM?",
    a: "Yes. The chatbot can be connected with website enquiries, Google Sheets, email notifications, CRM systems and dashboards depending on your existing setup."
  },
  {
    q: "Will the bot replace my sales team?",
    a: "No. The best chatbot helps your sales team respond faster. It handles repetitive questions and data collection, then hands off important conversations to a human."
  }
];

export default function WhatsAppChatbotSharjah() {
  return (
    <main className="bg-[#050505] min-h-screen text-white pt-24">
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">
        <div>
          <p className="micro-label text-green-400 mb-5">WhatsApp Chatbot Sharjah</p>
          <h1 className="text-5xl md:text-7xl font-serif leading-[0.95] tracking-tight">
            WhatsApp Chatbot Sharjah for faster replies and better qualified leads.
          </h1>
          <p className="mt-7 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
            Asif Digital builds WhatsApp chatbots for Sharjah businesses that need instant replies, lead qualification, appointment routing, Arabic-English FAQs and cleaner CRM handoff.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <Link href="/free-growth-audit" className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-100">
              Book Free Chatbot Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ai-automation-sharjah" className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/15 px-7 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">
              See Sharjah Automation
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="w-6 h-6 text-green-400" />
            <h2 className="font-serif text-2xl">Example chatbot flow</h2>
          </div>
          {["Customer sends WhatsApp message", "Bot answers common question", "Bot collects service need and area", "Lead is saved and tagged", "Team receives handoff alert"].map((step, i) => (
            <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 mb-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-black text-xs font-bold">{i + 1}</span>
              <span className="text-sm text-white/75">{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="micro-label text-green-400 mb-4">The real problem</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Sharjah customers message fast. Your business has to respond faster.
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed">
              Missed WhatsApp replies become missed revenue. A chatbot helps your business answer the first questions, collect the right details and move serious enquiries to a human quickly.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {["24/7 first response", "Lead qualification", "Appointment routing", "CRM handoff"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black p-6">
                <CheckCircle2 className="w-5 h-5 text-green-400 mb-4" />
                <p className="text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <p className="micro-label text-green-400 mb-4">What we build</p>
        <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-10">Practical WhatsApp chatbot systems.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-8">
              <div className="text-green-300 mb-6">{item.icon}</div>
              <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
              <p className="text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 bg-white text-black rounded-[2rem] mx-4 md:mx-10">
        <div className="max-w-7xl mx-auto">
          <p className="micro-label text-black/50 mb-4">Sharjah use cases</p>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-10">Built around how local customers ask questions.</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((item) => (
              <div key={item} className="rounded-3xl border border-black/10 bg-black/[0.03] p-7">
                <p className="text-black/65 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid md:grid-cols-3 gap-5">
        {[
          { icon: <Clock className="w-5 h-5" />, title: "Faster response", desc: "Reply before the lead contacts another provider." },
          { icon: <Languages className="w-5 h-5" />, title: "Arabic and English", desc: "Support bilingual enquiries with clear escalation rules." },
          { icon: <ShieldCheck className="w-5 h-5" />, title: "Human control", desc: "Keep your team involved for high-value or sensitive chats." }
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
            <div className="text-green-300 mb-5">{item.icon}</div>
            <h3 className="text-xl font-serif mb-3">{item.title}</h3>
            <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black">
        <div className="max-w-5xl mx-auto">
          <HelpCircle className="w-10 h-10 text-green-400 mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif mb-10">WhatsApp chatbot Sharjah FAQs.</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-bold mb-3">{faq.q}</h3>
                <p className="text-white/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-serif max-w-3xl mx-auto leading-tight">Want WhatsApp to capture better Sharjah leads?</h2>
        <p className="mt-6 text-white/60 max-w-2xl mx-auto">Send us your current website and WhatsApp process. We will suggest the first chatbot flow that can save time and protect more enquiries.</p>
        <Link href="/free-growth-audit" className="mt-9 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-100">
          Book Free Chatbot Audit <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
