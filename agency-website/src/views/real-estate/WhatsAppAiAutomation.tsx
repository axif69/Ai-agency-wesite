"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  Globe,
  Headphones,
  MessageSquare,
  Mic,
  ShieldCheck,
  Zap,
} from "lucide-react";

const calendlyUrl = "https://calendly.com/asifdigitalagency";
const whatsappUrl = "https://wa.me/971545866094";

const faqs = [
  {
    q: "Is Asif Digital's platform compliant with UAE data protection law?",
    a: "Yes. All lead data, conversation logs, and qualification records are stored in a private Supabase PostgreSQL database owned by your brokerage — not on Asif Digital's shared infrastructure. This architecture is designed to comply with the UAE Personal Data Protection Law (PDPL), which requires that personal data collected from UAE residents is handled under defined data processing agreements and stored in controlled environments. Unlike SaaS vendors that retain your client data on their servers, we deliver the codebase and database access to your organisation on completion.",
  },
  {
    q: "How long does WhatsApp AI automation setup take for real estate agencies?",
    a: "The standard implementation timeline is 7 to 14 working days from project kickoff to live deployment. This covers: Meta WhatsApp Cloud API registration and phone number verification, AI training on your specific developer portfolio and property inventory, Bayut and Property Finder webhook configuration and testing, CRM integration (HubSpot, PropSpace, Salesforce, or Zoho), agent handoff flow testing with your broker team, and Google Calendar sync configuration. Complex enterprise deployments with multiple property portals and CRM systems typically require 14 to 21 days.",
  },
  {
    q: "How does the AI handle audio voice notes sent by UAE buyers on WhatsApp?",
    a: "Audio messages are routed through OpenAI Whisper, which transcribes them in real time. The transcript is then processed by the qualification engine to extract: property type preference, budget range, preferred area or development, timeline, and buyer vs investor intent. The AI continues the qualification conversation based on the extracted parameters — without waiting for a human to listen to the voice note first. This eliminates a common failure point in UAE property sales where agents are on viewings and cannot process audio messages for hours.",
  },
  {
    q: "Can the AI calculate off-plan payment plans for Dubai developers?",
    a: "Yes. The knowledge engine is pre-loaded with payment plan structures for major UAE developers including Sobha Realty, Danube Properties, Binghatti Developers, Emaar Properties, and others upon request. When a buyer asks about a specific project, the AI can provide: the booking deposit percentage, post-handover payment schedule, DLD fee eligibility, service charge estimates, and handover date projections. This data is updated during the onboarding phase and can be refreshed whenever a developer releases a new payment plan.",
  },
  {
    q: "What happens when a high-net-worth client requests a human broker?",
    a: "The AI detects escalation signals — requests for callbacks, VIP property viewings, high-budget declarations above a defined threshold, or explicit requests to \"speak to someone.\" When triggered, it: (1) sends an instant WhatsApp alert to the assigned broker with the full conversation transcript, (2) generates a lead brief summarising budget, intent, and language, (3) provides three AI-suggested reply options for the broker's first message, and (4) optionally books a time slot into the broker's Google Calendar. The buyer receives a confirmation that a senior consultant will be in contact. The broker never enters a conversation cold.",
  },
];

export default function WhatsAppAiAutomationView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Real Estate AI WhatsApp Automation Dubai",
    provider: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
    serviceType: "Real Estate AI WhatsApp Automation & Conversational Intelligence",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "GCC"],
    description:
      "Enterprise Real Estate AI WhatsApp Automation Dubai. 24/7 multilingual AI concierge, sub-10s response SLA, OpenAI Whisper voice note transcription, Bayut & Property Finder direct webhooks, off-plan payment plan engine, and 100% UAE PDPL compliance.",
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

      {/* ── 1. HERO SECTION (BIG HEADINGS ARE PURE WHITE/NEUTRAL) ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden px-6 md:px-12 pt-28 pb-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
              Real Estate AI Automation Dubai
            </span>

            {/* Big H1 - 100% Pure White */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.05] text-white mb-6">
              Real Estate AI WhatsApp Automation Dubai
            </h1>

            {/* Display Sub-headline - White and Soft Silver (Zero Green Headings) */}
            <p className="text-2xl md:text-3xl font-serif text-white/90 leading-tight mb-6">
              While Your Brokers Are Showing Properties, <br />
              <span className="text-white/70 italic font-normal">Our AI Is Qualifying the Next 50 Buyers on WhatsApp.</span>
            </p>

            <p className="text-base text-white/65 font-light leading-relaxed mb-8 max-w-2xl">
              24/7 multilingual AI concierge that greets buyers in sub-10s, transcribes audio voice notes, calculates off-plan payment plans, and books qualified viewings directly into broker calendars.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
              >
                Book a Live Demo <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                Test Bot Live on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Hero Simulated WhatsApp UI Mockup */}
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
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Asif Digital RE Concierge AI</h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live SLA: 6.2 Seconds
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/50">
                Khaleeji AR / EN / RU
              </span>
            </div>

            {/* Chat Thread */}
            <div className="space-y-3.5 text-xs md:text-sm font-sans">
              <div className="flex justify-start">
                <div className="bg-white/[0.04] text-white rounded-2xl rounded-tl-none p-4 max-w-[88%] border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1 text-[11px] font-mono">
                    <Mic className="w-3.5 h-3.5" /> Voice Note Transcribed (Khaleeji AR / EN)
                  </div>
                  <p className="italic text-white/70">
                    &quot;Marhaba, I am looking for a 2-bedroom off-plan apartment in Dubai Hills with a 1% monthly payment plan. Budget AED 2.2M.&quot;
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-emerald-950/40 text-white rounded-2xl rounded-tr-none p-4 max-w-[90%] border border-emerald-400/30">
                  <p className="leading-relaxed">
                    Ahlan! We have 3 premium 2-bedroom layouts in Dubai Hills starting at <strong>AED 2.18M</strong> with 20% down and 1% monthly terms.
                  </p>
                  <div className="mt-2.5 text-[11px] bg-black/40 rounded-xl p-3 font-mono text-emerald-300 border border-emerald-400/20 space-y-1">
                    <div>• Down Payment (20%): AED 436,000</div>
                    <div>• Monthly Installment (1%): AED 21,800/mo</div>
                  </div>
                  <p className="mt-2 text-xs text-white/70">Would you like to schedule a viewing tomorrow at 11:00 AM?</p>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <span className="bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 text-[11px] font-mono px-4 py-1.5 rounded-full flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Viewing Synced · Broker Alert Dispatched
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SPEED-TO-LEAD ECONOMICS (WITH VISIBLE SOURCE ATTRIBUTION) ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Speed-to-Lead Economics
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white">
              The Cost of Latency in Dubai Real Estate.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65 font-light">
              In Dubai&apos;s 24/7 property market, response time is not a customer service metric — it is a revenue metric. Delaying a WhatsApp reply by even 30 minutes drops deal qualification rates by 85%.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">78% Rule</span>
                <div className="text-4xl font-serif font-bold text-white mb-2">78%</div>
                <h3 className="font-serif text-xl text-white mb-3">First Responder Dominance</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  78% of UAE property buyers close with the first brokerage that replies to their inquiry. Slower response time directly transfers commission to your competitors.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 mt-6 pt-4 border-t border-white/5 block">
                Source: InsideSales / PropPilot Mystery Shopper Study
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">21x Multiplier</span>
                <div className="text-4xl font-serif font-bold text-white mb-2">21x</div>
                <h3 className="font-serif text-xl text-white mb-3">5-Minute Qualification Window</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Leads contacted in under 5 minutes qualify at 21 times the rate of those reached after 30 minutes. AI WhatsApp automation is the only method to achieve this at volume.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 mt-6 pt-4 border-t border-white/5 block">
                Source: MIT / Lead Response Management Research
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">68% After-Hours</span>
                <div className="text-4xl font-serif font-bold text-white mb-2">68%</div>
                <h3 className="font-serif text-xl text-white mb-3">8PM — 2AM Traffic Peak</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  68% of International property inquiries in Dubai arrive between 8PM and 2AM local time — after human brokers are offline. AI handles this shift without overtime.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 mt-6 pt-4 border-t border-white/5 block">
                Source: 2026 Dubai Real Estate Inquiry Data
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SYSTEM ARCHITECTURE (60-80 WORDS PER CARD MINIMUM) ── */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              System Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white">
              Engineered for High-Ticket UAE Real Estate.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Sub-10s Response SLA",
                body: "Contextual, intelligent replies delivered to 10 seconds across all international time zones — UK, European, CIS, and GCC buyers included. Response latency is monitored in real time on your command dashboard. If any inbound lead exceeds the threshold, a red-badge alert fires to the team lead's WhatsApp instantly. Every second of delay costs qualification probability.",
              },
              {
                icon: Globe,
                title: "Khaleeji Arabic + 5 Languages",
                body: "Native NLP fluency in Khaleeji Arabic (not just Modern Standard Arabic), English, Russian, French, and Mandarin — capturing the 40% of international property inquiries that arrive in non-English languages. Language detection is automatic. The AI switches within the same conversation when a buyer moves from Arabic to English mid-message — a behaviour common in UAE buyer-broker exchanges.",
              },
              {
                icon: Headphones,
                title: "OpenAI Whisper Audio Transcriber",
                body: "Dubai property buyers frequently send voice notes explaining their requirements. Most WhatsApp automation tools cannot process audio — they wait for an agent to listen. Our system routes voice messages through OpenAI Whisper in real time, extracts budget, location preferences, and timeline parameters, and continues the qualification flow without any human involvement. Voice notes are no longer a bottleneck.",
              },
              {
                icon: Database,
                title: "Bayut & Property Finder Webhooks",
                body: "When a buyer clicks \"WhatsApp\" on a Bayut or Property Finder listing, our webhook captures the inquiry within 5 seconds and fires a personalised AI response referencing the exact property — unit type, price range, and developer. No email parsing. No 2-minute processing delay. Direct API integration means the buyer receives an intelligent reply before they have scrolled to the next listing.",
              },
              {
                icon: Clock,
                title: "Off-Plan Payment Engine",
                body: "Pre-loaded with developer inventory across Sobha Realty, Danube Properties, Binghatti Developers, and Emaar. The AI can answer complex off-plan payment queries instantly: 20% on booking, 1% monthly post-handover, DLD waiver eligibility, and service charge estimates. No manual lookup by a broker. No \"I'll get back to you.\" Buyers receive accurate financial answers within the first WhatsApp exchange.",
              },
              {
                icon: Calendar,
                title: "Human Handoff & Calendar Sync",
                body: "When a buyer signals high intent — asking for a callback, a site visit, or a meeting with a senior broker — the AI immediately generates a qualification brief and alerts the right team member via WhatsApp. The brief contains: budget confirmed, property interest, timeline, language preference, and three AI-suggested reply options for the broker's first human message. Viewing slots sync directly to Google Calendar.",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-emerald-400/30 transition-all flex flex-col justify-between">
                  <div>
                    <Icon className="h-6 w-6 text-emerald-400 mb-4" />
                    <h3 className="font-serif text-xl text-white mb-3">{card.title}</h3>
                    <p className="text-sm text-white/65 font-light leading-relaxed">{card.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. COMPLIANCE & DATA SOVEREIGNTY ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              UAE PDPL & Official Meta API Governance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white mb-4">
              Enterprise-Grade Compliance. Zero Ban Risk.
            </h2>
            <p className="text-base text-white/65 font-light leading-relaxed max-w-3xl">
              Built exclusively on the Official Meta WhatsApp Cloud API and private database architecture in full compliance with UAE Personal Data Protection Law (PDPL).
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 text-sm font-mono text-white/70">
            {[
              "Official Meta WhatsApp Cloud API (Zero Ban Risk)",
              "100% Private Supabase Database Ownership",
              "UAE PDPL-Compliant Data Architecture",
              "TDRA-Aligned Messaging Infrastructure",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COMPARISON TABLE ── */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Competitive Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white">
              Asif Digital vs. Offshore SaaS Vendors.
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
            <table className="w-full text-left text-sm font-light">
              <thead className="bg-white/[0.04] text-xs uppercase font-mono text-white/50 border-b border-white/10">
                <tr>
                  <th className="p-5">Feature</th>
                  <th className="p-5">Offshore SaaS (BotSense / PropPilot)</th>
                  <th className="p-5 text-emerald-400 font-bold">Asif Digital — Custom Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/70">
                <tr>
                  <td className="p-5 font-serif text-white">Origin & Provider</td>
                  <td className="p-5">Offshore SaaS (BotSense: Indore, India)</td>
                  <td className="p-5 text-white font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> UAE-Native Agency & Architecture
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-serif text-white">UAE PDPL Compliance</td>
                  <td className="p-5">Vendor servers in non-UAE jurisdictions</td>
                  <td className="p-5 text-white font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Private Database Ownership (UAE PDPL)
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-serif text-white">Code Ownership</td>
                  <td className="p-5">Monthly SaaS subscription rental</td>
                  <td className="p-5 text-white font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 100% Owned Next.js Codebase
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-serif text-white">Portal Integrations</td>
                  <td className="p-5">Email parsing only (delays)</td>
                  <td className="p-5 text-white font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Direct Bayut & Property Finder Webhooks
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-serif text-white">Voice Note Intelligence</td>
                  <td className="p-5">Not supported</td>
                  <td className="p-5 text-white font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> OpenAI Whisper Audio Transcription
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="py-24 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white">
              Real Estate WhatsApp AI FAQ.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-serif text-lg text-white pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-emerald-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm leading-relaxed text-white/60 font-light border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ── */}
      <section className="py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-10 md:p-16 text-center shadow-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
            Urgent Growth Opportunity
          </span>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white max-w-3xl mx-auto mb-6">
            Stop Losing Property Buyers to Delayed Replies.
          </h2>
          <p className="text-base text-white/65 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy an automated WhatsApp concierge trained on your property inventory and go live in 7 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
            >
              Book a Live Demo <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              Contact Agency
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
