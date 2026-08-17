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
  Flame,
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
  PieChart,
  Radio,
  RefreshCw,
  Send,
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
    q: "What is the AI 1-Click Reply Co-Pilot for Property Brokers?",
    a: "The AI 1-Click Reply Co-Pilot is an executive assistant for real estate brokers. When the AI finishes qualifying a lead on WhatsApp, it hands over the chat to an area broker with a full buyer brief (name, budget, property interest, timeline), an intent score (HOT, WARM, COLD), and 3 pre-written AI suggestions (Option A: Direct Appointment Close, Option B: Investment ROI Framing, Option C: High-Touch VIP Experience). The broker simply selects one option and sends it in 1 tap, reducing human response time to under 60 seconds.",
  },
  {
    q: "Will my brokers find this system easy to use on their mobile phones?",
    a: "Yes, extremely easy. Your brokers do not need to install complex software or change their daily routines. They receive an instant WhatsApp alert on their phone with the lead summary and 3 ready-to-send reply buttons. They can send the AI suggestion as-is or edit it in seconds before sending.",
  },
  {
    q: "How does the Real Estate Broker SLA Tracker monitor response times?",
    a: "The control panel tracks the exact time elapsed between an inquiry arriving and a broker responding. If a broker does not engage a HOT lead within your chosen SLA window (e.g., 5 minutes), the system automatically reassigns the lead to the next available agent and alerts the sales director, ensuring zero lead decay.",
  },
  {
    q: "How does VIP Buyer Intent Scoring grade leads into HOT, WARM, and COLD?",
    a: "Buyer intent scores are calculated automatically based on conversation data: HOT (Budget confirmed within inventory range, timeline under 90 days, viewing requested), WARM (Budget indicated, timeline 3-12 months, active engagement), and COLD (Budget below inventory threshold or non-responsive). Scores update dynamically after every message.",
  },
  {
    q: "Does the AI Co-Pilot work for both Off-Plan and Secondary Market brokers?",
    a: "Yes. For off-plan brokers, the Co-Pilot suggests developer payment plan options and brochure links. For secondary market brokers, it suggests viewing availability, DLD transfer requirements, and mortgage pre-approval steps.",
  },
  {
    q: "Can brokers edit the AI-suggested replies before sending them to buyers?",
    a: "Yes. Brokers have 100% control. They can tap to send the AI suggestion instantly or tap to edit the text before sending, adding a personal note or custom viewing time.",
  },
  {
    q: "Is Asif Digital's Broker Co-Pilot compliant with UAE PDPL data privacy laws?",
    a: "100% Yes. All client records, conversation transcripts, and lead briefs are stored in a private Supabase PostgreSQL database owned exclusively by your brokerage. We do not retain your client data on shared third-party SaaS servers.",
  },
  {
    q: "Which CRMs can connect with the Broker Co-Pilot?",
    a: "The Co-Pilot syncs bi-directionally with PropSpace, Ruby CRM, Salesforce, HubSpot, Zoho CRM, Masterkey, and custom databases in real time.",
  },
  {
    q: "Can the Co-Pilot suggest replies in Russian, Arabic, and French?",
    a: "Yes. The AI automatically detects the buyer's language and generates all 3 reply options in fluent English, Khaleeji Arabic, Russian, French, or German.",
  },
  {
    q: "How long does implementation take for a Dubai real estate sales team?",
    a: "Standard setup and live deployment take 7 to 10 working days. Our team handles everything: Meta WhatsApp API connection, CRM pipeline setup, AI prompt calibration, and broker team onboarding.",
  },
  {
    q: "How does this co-pilot improve agency revenue?",
    a: "By reducing broker handover response time from hours to under 60 seconds and providing high-converting reply templates, agencies see a 3x increase in viewing bookings and a 42% boost in closed commission deals.",
  },
  {
    q: "How do we schedule a live demonstration for our sales director?",
    a: "Click 'Book Broker Co-Pilot Demo' or send us a message on WhatsApp at +971 54 586 6094 to schedule a free 1-on-1 automation audit for your sales team.",
  },
];

export default function BrokerAiCopilotDubaiView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C">("A");

  const optionTexts = {
    A: "Ahlan Alexander! I have reserved 2:00 PM tomorrow for your Dubai Marina 2BR viewing. Shall I send the location pin to your WhatsApp now?",
    B: "Hi Alexander! This 2BR layout in Dubai Marina yields an estimated 8.4% net ROI with high short-term rental demand. Let's inspect it tomorrow at 2:00 PM?",
    C: "Good afternoon Alexander. As a VIP client, I have arranged private access to the penthouse lounge prior to your 2:00 PM viewing tomorrow. Looking forward to meeting you.",
  };

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI 1-Click Reply Co-Pilot for Property Brokers UAE",
    provider: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
    serviceType: "Real Estate Broker AI Co-Pilot & SLA Handoff Automation",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
    description:
      "Enterprise AI 1-Click Reply Co-Pilot for Property Brokers UAE. Sub-60s SLA handoff, instant buyer intent scoring (HOT/WARM/COLD), 3 pre-written AI suggestions, and 100% UAE PDPL compliance.",
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
    name: "How to Enable AI 1-Click Reply Co-Pilot for Real Estate Brokers",
    description: "Step-by-step guide to empowering property brokers with instant AI lead briefs and 1-click WhatsApp replies in under 60 seconds.",
    step: [
      {
        "@type": "HowToStep",
        name: "Receive Qualified Lead Alert",
        text: "Broker receives an instant WhatsApp notification when AI qualifies a buyer as HOT (budget, timeline, location confirmed).",
      },
      {
        "@type": "HowToStep",
        name: "Review AI Lead Brief & Intent Score",
        text: "Broker views buyer requirements summary, language preference, and heat score in 5 seconds.",
      },
      {
        "@type": "HowToStep",
        name: "Tap 1-Click AI Reply Suggestion",
        text: "Broker selects from 3 pre-written AI suggestions (Direct Close, ROI Framing, VIP) and sends on WhatsApp with 1 tap.",
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
              Real Estate Broker AI Co-Pilot · UAE Sales Command
            </span>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.05] text-white mb-6">
              AI 1-Click Reply Co-Pilot <br />
              for Property Brokers UAE
            </h1>

            <p className="text-2xl md:text-3xl font-serif text-white/90 leading-tight mb-6">
              Empower Your Brokers to Reply to Qualified Buyers <br />
              <span className="text-white/70 italic font-normal">In Under 60 Seconds with 1-Tap AI Co-Pilot.</span>
            </p>

            <p className="text-base text-white/65 font-light leading-relaxed mb-8 max-w-2xl">
              When our AI qualifies a buyer on WhatsApp, it hands over the chat to your area broker with an instant buyer brief, intent score (HOT/WARM/COLD), and 3 pre-written AI suggestions. Brokers tap once to send professional, high-converting replies instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
              >
                Book Broker Co-Pilot Demo <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                Test 1-Click Co-Pilot Live
              </a>
            </div>
          </motion.div>

          {/* Interactive Broker 1-Click Co-Pilot Simulator */}
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
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Broker 1-Click Reply Co-Pilot</h3>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Lead Brief Ready · SLA: 42s
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 flex items-center gap-1">
                <Flame className="w-3 h-3 text-emerald-400 fill-emerald-400" /> HOT LEAD (Score 96)
              </span>
            </div>

            {/* Buyer Brief Summary */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-sans mb-4 space-y-1">
              <div className="flex justify-between font-mono text-[11px] text-white/60">
                <span>Client: Alexander V.</span>
                <span>Source: Bayut.com</span>
              </div>
              <div className="text-white font-medium">Interest: Dubai Marina 2BR Apartment</div>
              <div className="text-white/70 font-mono text-[11px]">Budget: AED 3.4M · Timeline: Viewing Tomorrow</div>
            </div>

            {/* 3 Interactive AI Reply Options */}
            <div className="space-y-2.5 text-xs font-sans mb-4">
              <span className="text-[10px] uppercase font-mono text-white/50 tracking-wider">Select 1-Click AI Reply:</span>
              
              <button
                onClick={() => setSelectedOption("A")}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  selectedOption === "A"
                    ? "bg-emerald-950/60 border-emerald-400 text-white"
                    : "bg-white/[0.02] border-white/10 text-white/70 hover:border-white/30"
                }`}
              >
                <div className="font-bold text-[11px] text-emerald-400 mb-1">Option A: Direct Close (Recommended)</div>
                <p className="text-[11px] font-light leading-relaxed">{optionTexts.A}</p>
              </button>

              <button
                onClick={() => setSelectedOption("B")}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  selectedOption === "B"
                    ? "bg-emerald-950/60 border-emerald-400 text-white"
                    : "bg-white/[0.02] border-white/10 text-white/70 hover:border-white/30"
                }`}
              >
                <div className="font-bold text-[11px] text-emerald-400 mb-1">Option B: Investment ROI Framing</div>
                <p className="text-[11px] font-light leading-relaxed">{optionTexts.B}</p>
              </button>

              <button
                onClick={() => setSelectedOption("C")}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  selectedOption === "C"
                    ? "bg-emerald-950/60 border-emerald-400 text-white"
                    : "bg-white/[0.02] border-white/10 text-white/70 hover:border-white/30"
                }`}
              >
                <div className="font-bold text-[11px] text-emerald-400 mb-1">Option C: High-Touch VIP Experience</div>
                <p className="text-[11px] font-light leading-relaxed">{optionTexts.C}</p>
              </button>
            </div>

            {/* Tap to Send Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-bold uppercase tracking-widest text-[11px] rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <Send className="w-4 h-4" /> Tap to Send Selected Option on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 2. EXECUTIVE SUMMARY: THE HUMAN BROKER HANDOFF BOTTLENECK ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Sales Director Intelligence
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              Why 64% of Qualified Real Estate Leads Cool Down During Human Broker Handoff
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              In many Dubai brokerages, AI or receptionists qualify a buyer, but when the lead is passed to a human broker, the momentum stops. Brokers who are busy on viewings or driving take 45 to 90 minutes to reply. By the time they type a message, the buyer has moved on. Our 1-Click Co-Pilot reduces broker response times to under 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">&lt; 60s</div>
              <h3 className="text-lg font-serif text-white mb-2">1-Tap Response SLA</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Brokers do not waste time drafting messages from scratch. They select one of 3 pre-written AI suggestions tailored to the buyer&apos;s history and send it with 1 tap.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">100%</div>
              <h3 className="text-lg font-serif text-white mb-2">Consistent Reply Quality</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Eliminates poor spelling, weak sales language, or unprofessional replies. Every broker on your team sends polished, high-converting responses calibrated to executive standards.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">3x</div>
              <h3 className="text-lg font-serif text-white mb-2">Higher Viewing Bookings</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Agencies using the 1-Click Reply Co-Pilot see a 3x increase in confirmed property viewings because qualified buyers are engaged while their intent is at its highest.
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
              How the Broker AI Co-Pilot Works in 4 Simple Steps
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              We built our Co-Pilot to make life simple for your brokers. Here is how easy the workflow is:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">1. AI Lead Qualification</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The AI greets the buyer on WhatsApp, confirms budget, property interest, and timeline, and grades the buyer intent as HOT, WARM, or COLD.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">2. Instant Broker WhatsApp Alert</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                When a buyer qualifies as HOT, the control panel dispatches an instant WhatsApp alert to the assigned area broker&apos;s phone.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">3. 3 AI Reply Suggestions</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The alert includes a full buyer brief and 3 pre-written AI suggestions (Direct Close, Investment ROI, or VIP Presentation).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                04
              </div>
              <h3 className="text-base font-semibold text-white mb-2">4. 1-Tap Handoff &amp; CRM Sync</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The broker taps once to send the selected reply on WhatsApp. The conversation status and viewing appointment auto-sync into your CRM.
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
              Traditional Broker Handoff vs. Asif Digital 1-Click AI Co-Pilot
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-sans">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-mono tracking-wider text-white/50">
                  <th className="py-4 px-6 font-semibold">Capability</th>
                  <th className="py-4 px-6 font-semibold">Traditional Broker Handoff</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20 rounded-t-xl font-semibold">Asif Digital 1-Click Co-Pilot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Broker Response SLA</td>
                  <td className="py-4 px-6 text-red-400">45 to 90 Minutes</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">&lt; 60 Seconds (1-Tap Send)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Buyer Intent Brief</td>
                  <td className="py-4 px-6 text-red-400">Broker enters chat cold</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Instant Summary (Budget, Area, Timeline)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Reply Template Quality</td>
                  <td className="py-4 px-6 text-yellow-400">Varies by individual broker skill</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">3 Pre-Written AI Executive Options</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">SLA Escalation Tracking</td>
                  <td className="py-4 px-6 text-red-400">No tracking for missed leads</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Automated Reassignment after 5 min</td>
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
            Everything real estate sales directors ask about our Broker AI 1-Click Co-Pilot.
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
            Ready to Empower Your Brokers With 1-Click AI Replies?
          </h2>
          <p className="text-lg text-white/70 font-light mb-10 max-w-2xl mx-auto">
            Book a free 1-on-1 sales automation audit with Asif Digital. We will show you how to reduce broker response times to under 60 seconds and triple your property viewings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-2xl"
            >
              Book Broker Co-Pilot Demo <ArrowRight className="w-4 h-4" />
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
