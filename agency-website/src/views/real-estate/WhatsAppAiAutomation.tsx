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
  FileText,
  Globe,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Layers,
  LayoutDashboard,
  LockKeyhole,
  MessageSquare,
  Mic,
  PhoneCall,
  Radio,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

const calendlyUrl = "https://calendly.com/asifdigitalagency";
const whatsappUrl = "https://wa.me/971545866094";

const faqs = [
  {
    q: "How to automate WhatsApp lead replies for a Dubai real estate agency?",
    a: "Automating WhatsApp lead replies for a Dubai real estate agency requires integrating Meta WhatsApp Cloud API with your property portal webhooks (Bayut, Property Finder, Dubizzle) and Meta Ads. Asif Digital configures a 24/7 AI concierge pre-trained on your off-plan property inventory, developer payment plans (Sobha, Emaar, Danube, Binghatti), and preferred broker calendar schedules. Inbound inquiries receive a personalized, qualified reply within 6.2 seconds — complete with PDF brochure downloads, payment plan calculators, and instant broker alerts on WhatsApp.",
  },
  {
    q: "How does automated off-plan brochure delivery work on WhatsApp in the UAE?",
    a: "When a potential buyer asks about an off-plan project (e.g. Dubai Hills 2-bedroom), the AI instantly matches their budget and location criteria against your property database. Within 5 seconds, it sends the official developer PDF brochure, floor plans, 1% monthly payment schedule, and video walkthrough links directly inside the WhatsApp conversation, logging the download event into your CRM.",
  },
  {
    q: "How does the AI handle audio voice notes sent by UAE buyers on WhatsApp?",
    a: "In the UAE market, property buyers frequently send audio voice notes on WhatsApp instead of typing text messages. Our AI automatically transcribes audio voice notes in real time (supporting Khaleeji Arabic, English, Russian, and French). It extracts buyer requirements (budget, preferred community, timeline) and continues the conversation smoothly without waiting for a human agent to listen to the audio file.",
  },
  {
    q: "Can the AI calculate off-plan payment plans for Dubai developers?",
    a: "Yes. The knowledge engine is pre-loaded with official payment plan structures for major UAE developers including Sobha Realty, Danube Properties, Binghatti Developers, Emaar Properties, Nakheel, and Select Group. When a buyer asks about a specific project, the AI provides the booking deposit percentage, post-handover payment schedule, DLD fee eligibility, and 1% monthly payment calculations instantly on WhatsApp.",
  },
  {
    q: "What happens when a high-net-worth client requests a human broker?",
    a: "The AI detects escalation signals — requests for callbacks, VIP property viewings, high-budget declarations above a defined threshold, or explicit requests to speak to someone. When triggered, it: (1) sends an instant WhatsApp alert to the assigned area broker with the full conversation transcript, (2) generates a lead brief summarising budget, intent, and language, and (3) provides three AI-suggested reply options for the broker's first message.",
  },
  {
    q: "Is Asif Digital's WhatsApp AI compliant with UAE data protection laws (PDPL)?",
    a: "100% Yes. All lead records, conversation transcripts, and client data are stored in a private Supabase PostgreSQL database owned exclusively by your brokerage. We do not retain your data on shared third-party SaaS servers, ensuring complete compliance with the UAE Personal Data Protection Law (PDPL).",
  },
  {
    q: "Which CRMs can connect with this WhatsApp AI system?",
    a: "The system connects seamlessly with all major real estate CRMs used in the UAE, including PropSpace, Ruby CRM, Salesforce, HubSpot, Zoho CRM, Masterkey, and custom databases. Leads, conversation briefs, and heat scores auto-sync in real time.",
  },
  {
    q: "Will our brokers find this tool easy to use?",
    a: "Yes. Your brokers do not need to learn any complex new software. They continue using WhatsApp and your existing CRM. When a lead is qualified, the AI sends an alert to the broker's WhatsApp phone with a pre-formatted lead summary and 3 ready-to-send reply buttons.",
  },
  {
    q: "What happens to inquiries received at night or on weekends?",
    a: "Over 68% of property inquiries in Dubai arrive between 8:00 PM and 2:00 AM. Night inquiries receive an immediate sub-10 second WhatsApp reply, complete with property brochures, payment plan details, and a calendar booking link for a morning viewing.",
  },
  {
    q: "How long does implementation take for our real estate brokerage?",
    a: "Standard setup and live deployment take 7 to 10 working days. This includes Meta WhatsApp API registration, portal webhook connection (Bayut, Property Finder), CRM pipeline integration, AI training on your property portfolio, and broker team onboarding.",
  },
  {
    q: "Can the AI handle multiple languages common in Dubai?",
    a: "Yes. The AI is fluent in English, Khaleeji Arabic, Russian, French, and German. It automatically detects the buyer's language and responds naturally in that exact language.",
  },
  {
    q: "How do we get started?",
    a: "Click 'Book a Live Demo' or message us directly on WhatsApp at +971 54 586 6094 to schedule a free 1-on-1 automation audit for your agency.",
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

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Automate Real Estate WhatsApp Lead Replies in Dubai",
    description: "Step-by-step guide to deploying a 24/7 AI WhatsApp concierge for Dubai property brokerages.",
    step: [
      {
        "@type": "HowToStep",
        name: "Connect WhatsApp Business API & Portals",
        text: "Link Meta WhatsApp Cloud API with Bayut, Property Finder, Dubizzle, and Meta Ads webhooks in < 1 second.",
      },
      {
        "@type": "HowToStep",
        name: "Configure AI Inventory & Payment Calculators",
        text: "Load off-plan project PDFs, floor plans, and 1% monthly payment plan rules into the AI knowledge base.",
      },
      {
        "@type": "HowToStep",
        name: "Enable Broker Alerts & CRM Auto-Sync",
        text: "Sync qualified lead data into PropSpace or Zoho and send instant WhatsApp alerts to area brokers.",
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
              Real Estate AI Automation Dubai
            </span>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.05] text-white mb-6">
              Real Estate AI WhatsApp Automation Dubai
            </h1>

            {/* Display Sub-headline */}
            <p className="text-2xl md:text-3xl font-serif text-white/90 leading-tight mb-6">
              While Your Brokers Are Showing Properties, <br />
              <span className="text-white/70 italic font-normal">Our AI Is Qualifying the Next 50 Buyers on WhatsApp.</span>
            </p>

            <p className="text-base text-white/65 font-light leading-relaxed mb-8 max-w-2xl">
              24/7 multilingual AI concierge that greets property buyers in sub-10s, transcribes audio voice notes, calculates 1% monthly off-plan payment plans, delivers PDF brochures, and books qualified viewings directly into broker calendars.
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

      {/* ── 2. EXECUTIVE SUMMARY: SPEED-TO-LEAD ECONOMICS ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Speed-to-Lead Economics
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              Why Sub-10 Second WhatsApp Response Times Change Real Estate Brokerage Revenue
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              In Dubai&apos;s fast-paced property market, lead response speed is the single biggest factor determining whether an agency closes a deal or loses it to a competitor. When a serious buyer inquires about a villa or off-plan launch, they expect an immediate response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">78%</div>
              <h3 className="text-lg font-serif text-white mb-2">Buy From First Responder</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                78% of property buyers in the UAE do business with the first agency that responds to their inquiry on WhatsApp. Responding in seconds secures the buyer before competitors even open the email.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">68%</div>
              <h3 className="text-lg font-serif text-white mb-2">After-Hours Inquiries</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Over 68% of portal and ad inquiries arrive between 8:00 PM and 2:00 AM. 24/7 WhatsApp AI automation converts night inquiries into booked morning viewings while brokers sleep.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">89%</div>
              <h3 className="text-lg font-serif text-white mb-2">WhatsApp Engagement Rate</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Emails achieve sub-12% open rates, whereas WhatsApp messages get an 89% response rate in the UAE market. WhatsApp is the primary business channel for property sales in Dubai.
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
              How Our Real Estate WhatsApp AI System Works in 4 Simple Steps
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              We built our WhatsApp AI system to be 100% effortless for your sales team. Here is how simple the process is for your brokerage:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">1. Instant Greeting (&lt; 10s)</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                When a buyer inquires on Bayut, Property Finder, or Meta Ads, the AI greets them on WhatsApp in under 10 seconds in their preferred language.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">2. Buyer Qualification</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The AI politely confirms budget, property interest, and viewing timeline, transcribing any audio voice notes sent by the buyer in real time.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">3. Automated PDF Delivery</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The AI automatically delivers official PDF property brochures, floor plans, and 1% monthly payment plan calculations directly in the chat.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                04
              </div>
              <h3 className="text-base font-semibold text-white mb-2">4. Broker Handoff</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                When a buyer qualifies as serious, the system sends an alert to your area broker with a summary brief and 3 pre-written 1-click reply options.
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
              Traditional Broker Manual Handling vs. Asif Digital WhatsApp AI Automation
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-sans">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-mono tracking-wider text-white/50">
                  <th className="py-4 px-6">Capability</th>
                  <th className="py-4 px-6">Manual Broker Process</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20 rounded-t-xl">Asif Digital WhatsApp AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Initial Response Time</td>
                  <td className="py-4 px-6 text-red-400">30 minutes to 4 hours</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">&lt; 10 Seconds (24/7 Instant)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">After-Hours Coverage (8PM-2AM)</td>
                  <td className="py-4 px-6 text-red-400">Ignored until next morning</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">24/7 Automated Qualification &amp; Booking</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Voice Note Handling</td>
                  <td className="py-4 px-6 text-yellow-400">Manual listen when free</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Real-Time OpenAI Whisper Transcription</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Off-Plan Payment Calculations</td>
                  <td className="py-4 px-6 text-yellow-400">Manual calculation</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Automated 1% Monthly Plan Calculation</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">UAE Data Privacy &amp; PDPL</td>
                  <td className="py-4 px-6 text-red-400">Stored on personal broker phones</td>
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
            Everything real estate directors ask about our WhatsApp AI Automation system.
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
            Zero Lead Decay Guarantee
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Ready to Automate Your Real Estate WhatsApp Lead Follow-Up?
          </h2>
          <p className="text-lg text-white/70 font-light mb-10 max-w-2xl mx-auto">
            Book a free 1-on-1 automation audit with Asif Digital. We will show you how to reduce response times to under 10 seconds and convert more inquiries into viewings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-2xl"
            >
              Book a Live Demo <ArrowRight className="w-4 h-4" />
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
