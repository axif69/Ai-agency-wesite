"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, Clock, FileText, MessageSquare, Settings, ShieldCheck, Workflow } from "lucide-react";

const painPoints = [
  "Leads arrive on WhatsApp, Instagram, website forms and calls, but nobody follows up fast enough.",
  "Customer details sit in spreadsheets, chats and notebooks instead of one clear CRM pipeline.",
  "Managers do not know which enquiries were answered, quoted, lost or still pending.",
  "Staff spend hours on reminders, reports, repeated replies and manual admin work."
];

const automations = [
  {
    title: "Website + WhatsApp lead capture",
    copy: "Every enquiry can be captured with source, service interest, budget, urgency and contact details, then routed to the right person."
  },
  {
    title: "CRM and spreadsheet updates",
    copy: "We connect forms, WhatsApp, email and sales sheets so your team stops copying the same customer details again and again."
  },
  {
    title: "Follow-up reminders",
    copy: "The system can remind your team when a lead has not been contacted, quoted or followed up after a set time."
  },
  {
    title: "Daily reporting dashboards",
    copy: "Owners can see leads, response times, open deals, pending quotations and missed opportunities without asking every department."
  }
];

const useCases = [
  "Trading and industrial suppliers in Sharjah who receive quote requests from contractors and B2B buyers.",
  "Clinics, salons and service businesses that need faster appointment replies and reminders.",
  "Real estate, maintenance and home-service companies handling many WhatsApp enquiries every week.",
  "Consultants, training centres and professional service firms that need cleaner lead qualification."
];

const faqs = [
  {
    q: "What does an AI automation agency in Sharjah actually do?",
    a: "An AI automation agency studies your repeated manual work, then builds systems that capture leads, update records, send reminders, answer common questions and produce reports. The goal is not to replace your team blindly; it is to remove repetitive tasks and make follow-up faster."
  },
  {
    q: "Can you connect WhatsApp with my CRM or Google Sheet?",
    a: "Yes. Depending on your setup, we can connect website forms, WhatsApp lead capture, email alerts, Google Sheets, HubSpot-style CRM pipelines and reporting dashboards. If you do not have a CRM yet, we can start with a simple structured pipeline first."
  },
  {
    q: "How much does AI automation cost in Sharjah?",
    a: "Simple automations usually start from AED 1,500 to AED 3,500. More advanced systems with CRM routing, WhatsApp workflows, dashboards and AI replies can cost more depending on complexity, integrations and approval rules."
  },
  {
    q: "Will AI reply to customers without human control?",
    a: "Only if you want it to. Many Sharjah businesses start with human-in-the-loop automation, where AI drafts, classifies or prepares responses, while your team approves important replies and quotations."
  },
  {
    q: "Do you only work with Sharjah companies?",
    a: "No. We work with businesses across Sharjah, Dubai, Ajman, Abu Dhabi and the wider UAE, but this page is written for companies searching specifically for an AI automation agency in Sharjah."
  }
];

export default function AiAutomationSharjah() {
  return (
    <main className="bg-[#050505] min-h-screen text-white pt-24">
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <p className="micro-label mb-5">AI Automation Agency Sharjah</p>
          <h1 className="text-5xl md:text-7xl font-serif leading-[0.95] tracking-tight">
            AI Automation Agency Sharjah for leads, CRM and WhatsApp workflows.
          </h1>
          <p className="mt-7 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
            Asif Digital builds practical AI automation systems for Sharjah businesses that need faster lead follow-up, cleaner customer records, WhatsApp routing, reminders and simple reporting dashboards.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <Link href="/free-growth-audit" className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-100">
              Book Free Automation Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ai-chatbots-dubai" className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/15 px-7 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">
              See WhatsApp Chatbots
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="w-5 h-5 text-emerald-400" />
            <h2 className="font-semibold">Example Sharjah workflow</h2>
          </div>
          {["Customer submits enquiry", "AI classifies service need", "Lead added to CRM or sheet", "WhatsApp/email alert sent", "Follow-up reminder created", "Owner sees daily report"].map((step, i) => (
            <div key={step} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3 mb-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black text-xs font-bold">{i + 1}</span>
              <span className="text-sm text-white/80">{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="micro-label mb-4">Why Sharjah teams need it</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">Most businesses do not need “more tools.” They need better follow-up.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {painPoints.map((point, i) => (
              <div key={point} className="rounded-2xl border border-white/10 bg-black p-5">
                <span className="text-emerald-400 text-xs font-bold">0{i + 1}</span>
                <p className="mt-3 text-white/70 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <p className="micro-label mb-4">What we automate</p>
        <h2 className="text-4xl md:text-5xl font-serif mb-10">Practical AI automation for Sharjah companies.</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {automations.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <Workflow className="w-5 h-5 text-emerald-400 mb-5" />
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/65 leading-relaxed">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 bg-white text-black rounded-[2rem] mx-4 md:mx-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <div>
            <p className="micro-label text-black/50 mb-4">Local use cases</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">Built for real Sharjah business operations.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((item) => (
              <div key={item} className="rounded-2xl border border-black/10 bg-black/[0.03] p-5">
                <CheckCircle2 className="w-5 h-5 mb-4" />
                <p className="text-black/70 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        <div>
          <p className="micro-label mb-4">Cost and rollout</p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">Start small. Prove value. Then scale.</h2>
          <p className="mt-6 text-white/65 leading-relaxed">
            A useful automation project does not need to start with a huge platform. We usually begin with one high-value workflow: lead capture, WhatsApp routing, quote follow-up, CRM cleanup or reporting.
          </p>
          <Link href="/free-growth-audit" className="mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-100">
            Request Free Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ["01", "Workflow audit", "We map where leads, customer details and follow-ups currently break."],
            ["02", "Simple automation plan", "We define what should be automated first and what should stay human."],
            ["03", "Build and connect", "We connect forms, WhatsApp, CRM/sheets, alerts and reports."],
            ["04", "Test and improve", "We review actual usage and improve the workflow based on your team."]
          ].map(([num, title, copy]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="text-emerald-400 text-xs font-bold">{num}</span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-5xl mx-auto">
        <p className="micro-label mb-4">FAQ</p>
        <h2 className="text-4xl md:text-5xl font-serif mb-8">Questions Sharjah business owners ask before automating.</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <summary className="cursor-pointer font-semibold">{faq.q}</summary>
              <p className="mt-4 text-white/65 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 text-center border-t border-white/5">
        <Settings className="w-8 h-8 text-emerald-400 mx-auto mb-6" />
        <h2 className="text-4xl md:text-6xl font-serif max-w-3xl mx-auto leading-tight">Want to know what your Sharjah business should automate first?</h2>
        <p className="mt-6 text-white/60 max-w-2xl mx-auto">Send your website and current process. We will suggest the first automation that can save time or recover missed leads.</p>
        <Link href="/free-growth-audit" className="mt-9 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-100">
          Book Free Automation Audit <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
