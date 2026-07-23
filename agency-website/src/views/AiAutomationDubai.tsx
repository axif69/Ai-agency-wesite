"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Database,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Workflow,
  Zap,
} from "lucide-react";

const problems = [
  "Leads come from website forms, WhatsApp, Instagram, calls and email — but nobody follows up fast enough.",
  "Your team copies the same customer details into spreadsheets, CRM, email and WhatsApp again and again.",
  "Managers do not know which enquiries are new, pending, qualified, lost or waiting for action.",
  "Customers ask the same questions every day and your staff waste time replying manually.",
];

const automations = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Lead capture + WhatsApp follow-up",
    desc: "When someone fills a form or messages you, the system captures the enquiry, asks basic qualification questions and alerts your team instantly.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "CRM routing and updates",
    desc: "Send each lead to the right person with source, service interest, budget, language, phone number and next action already attached.",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email and document automation",
    desc: "Generate confirmations, proposal drafts, intake summaries, quotation notes and follow-up reminders without manual copy-paste.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Reports and dashboards",
    desc: "Create simple dashboards showing new leads, response time, follow-up status, source quality and bottlenecks.",
  },
];

const localUseCases = [
  "Real estate agencies that need faster portal, website and WhatsApp lead follow-up.",
  "Clinics, salons and service businesses that want enquiries converted into booked appointments.",
  "Ecommerce and trading companies that need order, quotation and customer support workflows.",
  "Consultants and B2B teams that need CRM updates, reminders and pipeline visibility.",
];

const pricingSignals = [
  {
    title: "Starter workflow",
    price: "From AED 1,500",
    desc: "A simple lead capture, WhatsApp notification, Google Sheet or CRM update, and follow-up reminder flow.",
  },
  {
    title: "Business automation system",
    price: "AED 3,000-8,000+",
    desc: "Multiple connected workflows across forms, WhatsApp, email, CRM, reports and team notifications.",
  },
  {
    title: "Custom AI agent setup",
    price: "Scoped after audit",
    desc: "For advanced use cases such as customer intake, document summaries, sales qualification or internal operations.",
  },
];

const exampleWorkflows = [
  {
    title: "Website enquiry to sales call",
    steps: ["Form submitted", "Lead saved", "WhatsApp confirmation sent", "Team notified", "Follow-up task created"],
  },
  {
    title: "WhatsApp FAQ to qualified lead",
    steps: ["Customer asks question", "Bot answers", "Bot collects details", "Lead tagged", "Human takes over"],
  },
  {
    title: "Daily manager report",
    steps: ["CRM checked", "Open leads counted", "Slow replies flagged", "Summary generated", "Report sent"],
  },
];

const process = [
  {
    step: "01",
    title: "Free workflow audit",
    desc: "We look at how leads and tasks currently move through your business and identify the biggest manual bottleneck.",
  },
  {
    step: "02",
    title: "Simple automation plan",
    desc: "You get a practical plan showing what should be automated first, what tools are needed and what result to expect.",
  },
  {
    step: "03",
    title: "Build and connect",
    desc: "We connect forms, WhatsApp, email, CRM, sheets, dashboards or internal tools depending on your workflow.",
  },
  {
    step: "04",
    title: "Test and improve",
    desc: "We test the flow with real scenarios, add human handoff rules and improve based on what your team actually uses.",
  },
];

const faqs = [
  {
    q: "What does an AI automation agency actually do?",
    a: "We find repetitive work inside your business and build systems that handle it automatically. That can include lead capture, WhatsApp replies, CRM updates, follow-up reminders, reports, email drafts, customer intake and internal task routing.",
  },
  {
    q: "Do I need a CRM before starting?",
    a: "No. If you already have a CRM, we can connect it. If you do not, we can start with a simple workflow using forms, email, WhatsApp and Google Sheets, then move to CRM when the business is ready.",
  },
  {
    q: "Will AI reply to customers without human control?",
    a: "Only if you want that. For most businesses, we recommend a safe setup where AI answers common questions and collects details, while important or sensitive enquiries go to a human.",
  },
  {
    q: "How much does AI automation cost in Dubai?",
    a: "A small workflow can start from around AED 1,500, while a fuller business automation system with CRM, WhatsApp, reporting and multiple integrations can cost more depending on complexity. We normally start with a free workflow audit so the first build solves a real bottleneck.",
  },
  {
    q: "How fast can we launch the first automation?",
    a: "A simple lead capture or follow-up automation can usually be mapped and built quickly. More complex CRM, reporting or internal workflow systems need more planning and testing.",
  },
];

export default function AiAutomationDubai() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <section className="relative overflow-hidden px-6 md:px-12 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_35%),linear-gradient(to_bottom,#050505,#080808)]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-green-400 block mb-6">
              AI Automation Agency Dubai
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.92] tracking-tight mb-8">
              AI Automation Agency Dubai.
            </h1>
            <p className="text-lg md:text-xl text-white/65 font-light leading-relaxed max-w-3xl mb-10">
              Automate leads, CRM updates, WhatsApp replies and daily workflows. Asif Digital builds AI agents and business automation systems for UAE companies that want faster follow-up, practical reporting and fewer repetitive manual tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/free-growth-audit" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/85 transition-colors inline-flex items-center justify-center gap-3">
                Book Free Automation Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/ai-chatbots-dubai" className="border border-white/15 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-green-400/50 transition-colors inline-flex items-center justify-center gap-3">
                See WhatsApp Chatbots
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center text-green-300">
                <Workflow className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl">Example automation</h2>
                <p className="text-white/45 text-sm">Website lead → WhatsApp → CRM → sales task</p>
              </div>
            </div>
            <div className="space-y-3">
              {["New enquiry received", "Customer details saved", "WhatsApp confirmation sent", "Sales owner notified", "Follow-up reminder created"].map((item, i) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/40 p-4">
                  <span className="w-7 h-7 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-sm text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <span className="micro-label block mb-4 text-green-400">The real problem</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">Most businesses do not need more tools. They need their tools to talk to each other.</h2>
            <p className="text-white/55 leading-relaxed">
              If leads are sitting in WhatsApp chats, emails, spreadsheets and missed calls, our AI automation agency in Dubai can help you respond faster without hiring more admin staff.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((problem) => (
              <div key={problem} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <CheckCircle className="w-5 h-5 text-green-400 mb-4" />
                <p className="text-sm text-white/60 leading-relaxed">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="micro-label block mb-4 text-green-400">What we automate</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">Practical AI automation for UAE teams.</h2>
            <p className="text-white/55 leading-relaxed">
              We focus on useful workflows first — the kind that save time, protect leads and make follow-up easier.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automations.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-8 hover:border-green-400/30 transition-colors">
                <div className="text-green-300 mb-6">{item.icon}</div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white text-black rounded-[2.5rem] mx-4 md:mx-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-black/45 block mb-4">Example workflows</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">Simple flows your team can understand.</h2>
            </div>
            <p className="text-black/55 max-w-lg leading-relaxed">
              Good automation should be easy to explain. If your team cannot understand the workflow, it will not use it properly.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {exampleWorkflows.map((workflow) => (
              <div key={workflow.title} className="rounded-3xl border border-black/10 bg-black/[0.03] p-7">
                <h3 className="text-2xl font-serif mb-6">{workflow.title}</h3>
                <div className="space-y-3">
                  {workflow.steps.map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <span className="text-sm text-black/65">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          <div>
            <span className="micro-label block mb-4 text-green-400">Built for Dubai and UAE teams</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">Local businesses need automation that fits how enquiries actually arrive.</h2>
            <p className="text-white/55 leading-relaxed">
              In Dubai, customers often move between Google Search, your website, WhatsApp, phone calls and Instagram before they decide. We design automation around that real buying journey, not around complicated software your team will ignore.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {localUseCases.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
                <CheckCircle className="w-5 h-5 text-green-400 mb-5" />
                <p className="text-white/60 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="micro-label block mb-4 text-green-400">Cost and starting point</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">How much does AI automation cost in Dubai?</h2>
            <p className="text-white/55 leading-relaxed">
              The honest answer is: it depends on how many tools, handoffs and approvals are involved. So we start with one useful workflow, prove it works, then expand only if it saves time or protects more leads.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pricingSignals.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-8">
                <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                <p className="text-green-300 font-bold tracking-wide mb-5">{item.price}</p>
                <p className="text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div>
            <span className="micro-label block mb-4 text-green-400">Our process</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">Start small. Prove value. Then scale.</h2>
            <p className="text-white/55 leading-relaxed mb-8">
              We do not start by selling a massive system. We start with one painful workflow and build from there.
            </p>
            <Link href="/free-growth-audit" className="inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-bold uppercase tracking-widest text-xs">
              Request Free Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {process.map((item) => (
              <div key={item.step} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
                <span className="text-green-400 text-xs font-bold tracking-widest">{item.step}</span>
                <h3 className="text-xl font-serif mt-5 mb-3">{item.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: <Clock className="w-5 h-5" />, title: "Faster response", desc: "Reduce the delay between enquiry and first reply." },
            { icon: <Shield className="w-5 h-5" />, title: "Human control", desc: "Keep approvals and human handoff where they matter." },
            { icon: <Phone className="w-5 h-5" />, title: "More calls booked", desc: "Make it easier for serious prospects to reach you." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
              <div className="text-green-300 mb-5">{item.icon}</div>
              <h3 className="text-xl font-serif mb-3">{item.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <span className="micro-label block mb-4 text-green-400">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-10">Questions business owners ask before automating.</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-bold mb-3">{faq.q}</h3>
                <p className="text-white/55 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28 text-center bg-[#080808] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Zap className="w-10 h-10 text-green-400 mx-auto mb-8" />
          <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-8">Want to know what your business should automate first?</h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10">
            Send us your website and a short description of your current lead process. We will suggest the first automation that can save time or protect more enquiries.
          </p>
          <Link href="/free-growth-audit" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/85 transition-colors inline-flex items-center justify-center gap-3">
            Book Free Automation Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

