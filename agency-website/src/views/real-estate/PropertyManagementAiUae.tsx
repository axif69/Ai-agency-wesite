"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  FileCheck,
  FileText,
  Globe,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Home,
  Key,
  Layers,
  LayoutDashboard,
  LockKeyhole,
  MessageSquare,
  Mic,
  PhoneCall,
  PieChart,
  Radio,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

const calendlyUrl = "https://calendly.com/asifdigitalagency";
const whatsappUrl = "https://wa.me/971545866094";

const faqs = [
  {
    q: "How does AI Property Management & Tenant Intake work on WhatsApp?",
    a: "Our AI tenant intake system operates on WhatsApp 24/7. When a prospective tenant inquires about a property or an existing tenant reports a maintenance issue (e.g. AC leaking, water heater repair), the AI greets them on WhatsApp, logs their building/unit number, transcribes voice notes, categorizes the issue urgency, and creates a maintenance ticket in your property manager dashboard with zero delay.",
  },
  {
    q: "Can the system send automated WhatsApp rent payment reminders in the UAE?",
    a: "Yes. The control panel schedules automated WhatsApp rent payment reminders 30 days, 14 days, and 3 days prior to cheque or bank transfer due dates. Tenants can acknowledge payment, upload transfer receipts on WhatsApp, or request lease renewal terms directly through the chat.",
  },
  {
    q: "How does the AI assist with Ejari renewals and tenancy contract checklists?",
    a: "The AI automates the document collection workflow for Ejari registration and tenancy renewals. It requests Emirates ID copies, passport scans, visa pages, and signed tenancy agreements directly over WhatsApp, verifying file completeness before forwarding the package to your property administrator.",
  },
  {
    q: "Can property managers approve or assign vendors before maintenance work starts?",
    a: "Yes. The AI does not hire contractors or approve financial transactions autonomously. It categorizes the maintenance ticket, prepares vendor cost estimates, and alerts your property manager on WhatsApp for 1-click human approval before dispatching maintenance technicians.",
  },
  {
    q: "Will this replace our property managers or make their work easier?",
    a: "It makes your property managers' work significantly easier and 3x more productive. By automating repetitive tenant inquiries, maintenance logging, and document collection, property managers can manage 300+ units per person without stress or administrative burnout.",
  },
  {
    q: "Is Asif Digital's Property Management AI compliant with UAE PDPL data privacy laws?",
    a: "100% Yes. All tenant documents, lease contracts, and maintenance logs are stored in a private Supabase PostgreSQL database owned exclusively by your property management company. We do not store your client data on shared third-party SaaS servers.",
  },
  {
    q: "Which property management software can connect with this system?",
    a: "The system connects seamlessly with all major UAE property management and CRM software, including PropSpace, Yardi, MRI Software, Masterkey, Zoho CRM, and custom databases.",
  },
  {
    q: "Can the AI handle tenant messages in Arabic, English, and Russian?",
    a: "Yes. The AI automatically detects the tenant's language and responds fluently in Khaleeji Arabic, English, Russian, or French.",
  },
  {
    q: "How does the system handle urgent after-hours maintenance emergencies?",
    a: "If a tenant reports an urgent emergency (such as a major water pipe burst or gas odor) at 2:00 AM, the AI classifies the ticket as 'EMERGENCY' and triggers an immediate phone call or high-priority WhatsApp alert to your on-call maintenance supervisor.",
  },
  {
    q: "How long does implementation take for a UAE property management company?",
    a: "Standard setup and live deployment take 7 to 10 working days. Our team handles Meta WhatsApp API registration, building portfolio loading, document checklist setup, CRM integration, and property team training.",
  },
  {
    q: "What is the cost of implementing this system for our property portfolio?",
    a: "We offer transparent pricing based on your total unit count. Unlike legacy property software charging steep monthly per-unit fees, we build custom solutions that you own. Contact us for a free portfolio audit and proposal.",
  },
  {
    q: "How do we get started?",
    a: "Click 'Book Property AI Demo' or send us a message on WhatsApp at +971 54 586 6094 to schedule a free 1-on-1 automation audit for your property management team.",
  },
];

export default function PropertyManagementAiUaeView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ticketCategory, setTicketCategory] = useState<"ac" | "plumbing" | "ejari">("ac");

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Property Management & Tenant Intake UAE",
    provider: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
    serviceType: "Property Management AI Automation & WhatsApp Tenant Concierge",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
    description:
      "Enterprise AI Property Management & Tenant Intake UAE. Automated WhatsApp maintenance logging, Ejari document checklists, rent payment reminders, and 100% UAE PDPL compliance.",
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Automate Tenant Maintenance Logging & Ejari Intake on WhatsApp",
    description: "Step-by-step guide to deploying a 24/7 AI tenant concierge for Dubai property management companies.",
    step: [
      {
        "@type": "HowToStep",
        name: "Receive Tenant WhatsApp Request",
        text: "Tenant messages WhatsApp to report a maintenance issue or submit Ejari renewal documents in < 10 seconds.",
      },
      {
        "@type": "HowToStep",
        name: "Log Ticket & Transcribe Voice Notes",
        text: "AI transcribes voice notes, categorizes issue urgency (Emergency vs Routine), and creates a ticket in the dashboard.",
      },
      {
        "@type": "HowToStep",
        name: "Dispatch Vendor & Alert Property Manager",
        text: "Property manager approves technician dispatch with 1 tap on WhatsApp, sending arrival confirmation to tenant.",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-400/30">
      {/* Head JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden px-6 md:px-12 pt-28 pb-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
              AI Property Management · UAE Tenant Concierge
            </span>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.05] text-white mb-6">
              AI Property Management &amp; <br />
              Tenant Intake UAE
            </h1>

            <p className="text-2xl md:text-3xl font-serif text-white/90 leading-tight mb-6">
              Automate WhatsApp Tenant Maintenance Logging &amp; Ejari Renewals <br />
              <span className="text-white/70 italic font-normal">While Keeping Your Property Managers in 100% Control.</span>
            </p>

            <p className="text-base text-white/65 font-light leading-relaxed mb-8 max-w-2xl">
              24/7 WhatsApp AI concierge that logs tenant maintenance requests, transcribes audio voice notes, collects Ejari renewal documents, and sends automated rent payment reminders — freeing your team to manage 300+ units per person.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
              >
                Book Property AI Demo <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                Test Tenant Bot Live
              </a>
            </div>
          </motion.div>

          {/* Interactive Tenant Maintenance Simulator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[2.5rem] border border-white/10 bg-black/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Tenant Maintenance &amp; Ejari Bot</h3>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 24/7 Live Intake Stream
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                Ticket #8841 Active
              </span>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTicketCategory("ac")}
                className={`text-[10px] uppercase font-mono px-3 py-1.5 rounded-full border transition-all ${
                  ticketCategory === "ac" ? "bg-white text-black font-bold border-white" : "border-white/10 text-white/60"
                }`}
              >
                AC Repair Ticket
              </button>
              <button
                onClick={() => setTicketCategory("plumbing")}
                className={`text-[10px] uppercase font-mono px-3 py-1.5 rounded-full border transition-all ${
                  ticketCategory === "plumbing" ? "bg-white text-black font-bold border-white" : "border-white/10 text-white/60"
                }`}
              >
                Plumbing Emergency
              </button>
              <button
                onClick={() => setTicketCategory("ejari")}
                className={`text-[10px] uppercase font-mono px-3 py-1.5 rounded-full border transition-all ${
                  ticketCategory === "ejari" ? "bg-white text-black font-bold border-white" : "border-white/10 text-white/60"
                }`}
              >
                Ejari Renewal Docs
              </button>
            </div>

            {/* Ticket Card Content */}
            <div className="space-y-3 font-sans text-xs">
              {ticketCategory === "ac" && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-emerald-400/30 space-y-2">
                  <div className="flex justify-between text-white/70 font-mono text-[11px]">
                    <span>Unit: Executive Tower B, Apt 1402</span>
                    <span className="text-emerald-400 font-bold">ROUTINE TICKET</span>
                  </div>
                  <div className="text-white font-medium">Issue: Master Bedroom AC Cooling Fault</div>
                  <div className="text-white/60 text-[11px] italic">&quot;Audio voice note transcribed: Cooling stopped 1 hr ago.&quot;</div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                    <span className="text-emerald-300 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Technician Assigned: 2:30 PM Today
                    </span>
                  </div>
                </div>
              )}

              {ticketCategory === "plumbing" && (
                <div className="p-4 rounded-2xl bg-red-950/20 border border-red-400/30 space-y-2">
                  <div className="flex justify-between text-white/70 font-mono text-[11px]">
                    <span>Unit: Dubai Marina Gate 1, Apt 2204</span>
                    <span className="text-red-400 font-bold animate-pulse">EMERGENCY TICKET</span>
                  </div>
                  <div className="text-white font-medium">Issue: Main Water Line Leak Under Sink</div>
                  <div className="text-white/60 text-[11px] italic">&quot;Water leaking fast, need urgent plumber!&quot;</div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                    <span className="text-red-300 font-mono flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> Supervisor Alerted &amp; Called Immediately
                    </span>
                  </div>
                </div>
              )}

              {ticketCategory === "ejari" && (
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-400/30 space-y-2">
                  <div className="flex justify-between text-white/70 font-mono text-[11px]">
                    <span>Unit: Business Bay Tower 3, Apt 809</span>
                    <span className="text-blue-400 font-bold">DOCUMENT INTAKE</span>
                  </div>
                  <div className="text-white font-medium">Status: Emirates ID &amp; Passport Verified</div>
                  <div className="text-white/60 text-[11px] font-mono">• 3 Files Captured on WhatsApp (PDFs)</div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                    <span className="text-blue-300 font-mono flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" /> Ready for Ejari Registration Submission
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. EXECUTIVE SUMMARY: THE PROPERTY MANAGEMENT BOTTLENECK ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Property Management Reality
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              Why Property Management Companies in Dubai Suffer From Operational Burnout
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              Managing 300+ tenancy contracts across Dubai, Abu Dhabi, or Sharjah involves endless phone calls, lost maintenance emails, manual cheque tracking, and chaotic Ejari renewal document requests. Property managers spend 70% of their day answering repetitive tenant questions instead of focusing on portfolio growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">300+</div>
              <h3 className="text-lg font-serif text-white mb-2">Units Per Property Manager</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                By automating tenant inquiries and maintenance intake on WhatsApp, each property manager can comfortably manage 300+ units without administrative stress.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">100%</div>
              <h3 className="text-lg font-serif text-white mb-2">Human Approval Oversight</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                The AI logs tickets and collects documents, but your human property managers retain 100% final approval before hiring contractors or approving lease renewals.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">0%</div>
              <h3 className="text-lg font-serif text-white mb-2">Missed Rent Payments</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Automated WhatsApp rent payment reminders sent 30, 14, and 3 days before due dates ensure timely cheque deposits and bank transfers across your portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SIMPLE 4-STEP PROCESS ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              How Property Management AI Works in 4 Simple Steps
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              We designed this system to make property administration smooth and organized. Here is how simple the process is:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">1. Tenant Inquires on WhatsApp</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Tenant messages WhatsApp to report a maintenance issue, upload Ejari documents, or inquire about lease renewal terms.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">2. AI Logs &amp; Transcribes</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                AI transcribes voice notes, confirms building and unit numbers, and classifies issue urgency (Emergency vs Routine).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">3. Property Manager Approves</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Property manager receives a pre-formatted ticket alert on WhatsApp and approves vendor technician dispatch with 1 tap.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                04
              </div>
              <h3 className="text-base font-semibold text-white mb-2">4. Auto-Sync &amp; Notification</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Tenant receives arrival time confirmation on WhatsApp, and the maintenance event auto-syncs into your PropSpace or Yardi CRM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PERFORMANCE COMPARISON TABLE ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Performance Benchmark
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Traditional Property Management vs. Asif Digital Tenant AI
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-sans">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-mono tracking-wider text-white/50">
                  <th className="py-4 px-6 font-semibold">Capability</th>
                  <th className="py-4 px-6 font-semibold">Traditional Property Management</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20 rounded-t-xl font-semibold">Asif Digital Tenant AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Maintenance Logging SLA</td>
                  <td className="py-4 px-6 text-red-400">4 to 24 Hours</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">&lt; 10 Seconds (24/7 Instant)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Voice Note Transcriptions</td>
                  <td className="py-4 px-6 text-yellow-400">Manual listen by manager</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Real-Time OpenAI Whisper Transcription</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Ejari Document Collection</td>
                  <td className="py-4 px-6 text-yellow-400">Manual email back-and-forth</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Automated WhatsApp Document Checklist</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Rent Payment Reminders</td>
                  <td className="py-4 px-6 text-red-400">Manual phone calls &amp; letters</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Automated Scheduled WhatsApp Reminders</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">UAE Data Privacy &amp; PDPL</td>
                  <td className="py-4 px-6 text-red-400">Stored on personal staff phones</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20 rounded-b-xl">Private Database Owned by Agency</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 5. FREQUENTLY ASKED QUESTIONS (FAQS) ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-white/60 font-light text-center mb-12">
            Everything property management directors ask about our AI Tenant Concierge &amp; Maintenance Bot.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 text-base font-serif text-white hover:text-emerald-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 transition-transform ${
                      openFaq === idx ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL HIGH-CONVERTING CTA SECTION ── */}
      <section className="py-24 px-6 md:px-12 text-center bg-gradient-to-b from-black to-emerald-950/30">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
            Zero Operational Lag
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Ready to Automate Tenant Intake &amp; Maintenance Logging on WhatsApp?
          </h2>
          <p className="text-lg text-white/70 font-light mb-10 max-w-2xl mx-auto">
            Book a free 1-on-1 property management audit with Asif Digital. We will show you how to streamline Ejari renewals, rent reminders, and maintenance tickets on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-2xl"
            >
              Book Property AI Demo <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              Speak With Strategist on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
