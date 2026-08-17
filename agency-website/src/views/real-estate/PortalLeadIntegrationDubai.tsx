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
    q: "In simple terms, how does the Bayut and Property Finder WhatsApp Control Panel work?",
    a: "Imagine a dedicated 24/7 digital assistant standing by for your agency. The exact second a potential buyer submits an inquiry form on Bayut, Property Finder, or Dubizzle, our system receives the lead details in under 1 second. Instead of sending a slow email that sits unread for hours, the assistant immediately sends a polite, personalized WhatsApp message to the buyer in their preferred language (English, Arabic, Russian, or French). It introduces your brokerage, answers questions about the specific listing, asks about their budget and timeline, and passes the qualified lead to your broker with a full summary.",
  },
  {
    q: "Will my real estate brokers find this easy to use?",
    a: "Yes, extremely easy. Your brokers do not need to install complex new software or learn complicated technical tools. They continue using WhatsApp and your existing CRM (such as PropSpace, Zoho, or Salesforce). When the AI finishes qualifying a buyer, it sends an instant WhatsApp alert to the assigned broker's phone with a summary brief (name, budget, property interest, timeline) and 3 ready-to-send reply options. The broker simply taps one option to take over the conversation.",
  },
  {
    q: "What happens to inquiries that arrive late at night or over the weekend?",
    a: "Over 68% of property inquiries in Dubai arrive between 8:00 PM and 2:00 AM, when brokers are off duty. Without automation, these leads cool down overnight and inquiry competitors first thing in the morning. With Asif Digital's control panel, night inquiries receive an immediate sub-10 second WhatsApp reply, complete with property brochures, payment plan details, and a calendar booking link for a morning callback. Your team wakes up to pre-qualified viewings already booked in their calendars.",
  },
  {
    q: "How does the AI handle audio voice notes sent by UAE buyers on WhatsApp?",
    a: "In the UAE market, buyers frequently send voice notes on WhatsApp instead of typing text messages. Our AI automatically transcribes audio voice notes in real time (supporting Khaleeji Arabic, English, Russian, and French). It reads the buyer's spoken words, extracts their budget and property preference, and replies in text or voice format without waiting for a human agent to listen to the recording.",
  },
  {
    q: "Can the AI send official off-plan brochures and payment schedules on WhatsApp?",
    a: "Yes. The AI is trained on your specific property inventory and developer projects (such as Sobha Realty, Emaar Properties, Danube, Binghatti, Nakheel, and Select Group). When a buyer inquires about a specific project, the AI can instantly attach the official PDF brochure, floor plans, DLD fee estimates, and 1% monthly payment plan schedules directly inside the WhatsApp chat.",
  },
  {
    q: "Can leads be assigned to specific brokers based on location or language?",
    a: "Yes. You have full control over lead routing rules. For example, you can automatically route Dubai Marina and JBR inquiries to Broker A, Downtown and Business Bay inquiries to Broker B, and Russian-speaking buyers to your Russian desk. If an assigned broker is busy or does not reply within your chosen SLA window (e.g., 5 minutes), the control panel can automatically offer the lead to the next available agent so no lead is left waiting.",
  },
  {
    q: "Is our client data safe, private, and compliant with UAE laws?",
    a: "100% Yes. All lead records, client contact details, and conversation histories are stored in a private database built specifically for your brokerage. We do not store your data on shared third-party SaaS servers. Your data remains your exclusive property and complies fully with the UAE Personal Data Protection Law (PDPL).",
  },
  {
    q: "Which real estate CRMs can connect with this system?",
    a: "The control panel seamlessly syncs with all popular real estate CRMs used in the UAE, including PropSpace, Ruby CRM, Salesforce, HubSpot, Zoho CRM, Masterkey, and custom databases. Leads, conversation notes, and buyer ratings update automatically in your CRM pipeline.",
  },
  {
    q: "How does the system prevent duplicate leads when a buyer inquires on multiple portals?",
    a: "When a buyer inquires on Property Finder and then 15 minutes later submits another inquiry on Bayut for a different listing, our system recognizes their phone number and merges the inquiries into a single buyer profile. It updates their property interest history in your CRM so your brokers have the complete picture without spamming the buyer.",
  },
  {
    q: "How long does implementation take for our brokerage?",
    a: "Standard setup and live deployment take 7 to 10 working days. Our team handles everything: connecting your Meta WhatsApp Business API, linking your Bayut and Property Finder accounts, configuring your CRM, training the AI on your property listings, and providing a quick walkthrough for your sales team.",
  },
  {
    q: "What is the pricing model for Asif Digital's control panel?",
    a: "We offer clear, transparent pricing based on your brokerage size and lead volume. Unlike expensive SaaS platforms that charge high per-user monthly fees forever, Asif Digital builds custom solutions that you own. Contact us for a free 1-on-1 audit and tailored proposal.",
  },
  {
    q: "How do we get started?",
    a: "Simply click the 'Book Free Integration Audit' button or send us a message on WhatsApp at +971 54 586 6094. We will review your current portal lead process and show you a live demonstration of how the system works for your specific listings.",
  },
];

export default function PortalLeadIntegrationDubaiView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPortal, setSelectedPortal] = useState<"all" | "bayut" | "pf" | "dubizzle">("all");

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bayut & Property Finder WhatsApp Lead Control Panel Dubai",
    provider: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
    serviceType: "Real Estate Portal Integration & WhatsApp Lead Automation",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
    description:
      "Enterprise Bayut & Property Finder WhatsApp Lead Control Panel Dubai. Connect Property Finder, Bayut, and Dubizzle leads directly to WhatsApp in under 1 second. Sub-10s qualification, automated off-plan brochure delivery, voice note transcription, and 100% UAE PDPL compliance.",
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

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden px-6 md:px-12 pt-28 pb-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
              Bayut · Property Finder · Dubizzle · Meta Ads Integration
            </span>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.05] text-white mb-6">
              Bayut &amp; Property Finder <br />
              WhatsApp Lead Control Panel
            </h1>

            <p className="text-2xl md:text-3xl font-serif text-white/90 leading-tight mb-6">
              Stop Losing Portal Inquiries to Slow Response Times. <br />
              <span className="text-white/70 italic font-normal">Connect Every Bayut &amp; Property Finder Lead Directly to WhatsApp in Under 1 Second.</span>
            </p>

            <p className="text-base text-white/65 font-light leading-relaxed mb-8 max-w-2xl">
              When a buyer submits an inquiry on Bayut, Property Finder, or Dubizzle, our control panel instantly triggers a polite 24/7 WhatsApp greeting, qualifies buyer budget and timeline in English, Arabic, or Russian, sends PDF brochures, and alerts your area brokers before competitors even open the lead notification.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
              >
                Book a Free Integration Audit <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                Test Portal Control Panel Live
              </a>
            </div>
          </motion.div>

          {/* Interactive Portal Control Panel Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[2.5rem] border border-white/10 bg-black/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
          >
            {/* Control Panel Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Live Portal Lead Stream</h3>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Instant Intake: 0.82s
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                100% Sync Active
              </span>
            </div>

            {/* Portal Source Filter Buttons */}
            <div className="flex gap-2 mb-5">
              {(["all", "bayut", "pf", "dubizzle"] as const).map((portal) => (
                <button
                  key={portal}
                  onClick={() => setSelectedPortal(portal)}
                  className={`text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
                    selectedPortal === portal
                      ? "bg-white text-black font-bold border-white"
                      : "border-white/10 text-white/60 hover:border-white/30"
                  }`}
                >
                  {portal === "all" ? "All Channels" : portal === "bayut" ? "Bayut.com" : portal === "pf" ? "Property Finder" : "Dubizzle"}
                </button>
              ))}
            </div>

            {/* Simulated Live Portal Inquiries Stream */}
            <div className="space-y-3 font-sans text-xs">
              {(selectedPortal === "all" || selectedPortal === "bayut") && (
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-emerald-400/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                      BAYUT
                    </div>
                    <div>
                      <div className="text-white font-medium text-xs">Alexander V. · Dubai Marina 2BR</div>
                      <div className="text-[10px] text-white/50 font-mono">Ref: B-88219 · Budget AED 3.4M</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                    WhatsApp AI Engaged (0.8s)
                  </span>
                </div>
              )}

              {(selectedPortal === "all" || selectedPortal === "pf") && (
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-blue-400/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[10px]">
                      PF
                    </div>
                    <div>
                      <div className="text-white font-medium text-xs">Sarah K. · Downtown Villa</div>
                      <div className="text-[10px] text-white/50 font-mono">Ref: PF-44012 · Budget AED 8.2M</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-400/30 px-2.5 py-1 rounded-full">
                    Brokered Handoff (HOT)
                  </span>
                </div>
              )}

              {(selectedPortal === "all" || selectedPortal === "dubizzle") && (
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-purple-400/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-[10px]">
                      DUB
                    </div>
                    <div>
                      <div className="text-white font-medium text-xs">Rashid M. · Palm Jumeirah Apt</div>
                      <div className="text-[10px] text-white/50 font-mono">Ref: DUB-99120 · Budget AED 5.5M</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 border border-purple-400/30 px-2.5 py-1 rounded-full">
                    PDF Brochure Sent
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> PropSpace &amp; Zoho Synced
              </span>
              <span>Zero Lead Decay</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. EXECUTIVE SUMMARY: THE REAL COST OF DELAYED PORTAL LEADS ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              The Dubai Property Market Reality
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              Why Real Estate Agencies in Dubai Lose 82% of Portal Leads to Faster Competitors
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              Every month, UAE real estate brokerages spend thousands of dirhams on Bayut, Property Finder, and Dubizzle packages. However, most agencies suffer from a silent revenue bottleneck: delayed response times. When a serious property buyer submits an inquiry, they expect an immediate response. If your team takes hours to reply, the buyer simply clicks on another agency&apos;s listing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">78%</div>
              <h3 className="text-lg font-serif text-white mb-2">Buy From First Responder</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Industry studies in the UAE show that 78% of property buyers move forward with the first agency that responds to their inquiry on WhatsApp. Speed is your single biggest competitive advantage.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">68%</div>
              <h3 className="text-lg font-serif text-white mb-2">After-Hours Inquiries</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Over 68% of portal inquiries arrive between 8:00 PM and 2:00 AM, when brokers are off duty. Without automation, these high-value leads cool down overnight and buy elsewhere.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">94%</div>
              <h3 className="text-lg font-serif text-white mb-2">Prefer WhatsApp</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                UAE buyers rarely answer phone calls from unknown numbers or check email replies. Over 94% prefer a fast, structured WhatsApp conversation with instant property brochures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW THE CONTROL PANEL WORKS (SIMPLE STEP-BY-STEP FLOW) ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              How Asif Digital Connects Your Portal Leads to WhatsApp &amp; CRM in 4 Easy Steps
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              We built our control panel to be completely frictionless. Your real estate brokers do not need to learn complicated new software. Here is how simple the process is for your agency:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Instant Lead Capture</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The exact second a buyer inquires on Bayut, Property Finder, Dubizzle, or Meta Ads, our control panel receives the lead details in under 1 second.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">24/7 AI Qualification</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The AI greets the buyer on WhatsApp in English, Arabic, Russian, or French, confirming their budget, property interest, and viewing timeline.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Brochure &amp; Payment Calc</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The AI automatically delivers official PDF property brochures, floor plans, and 1% monthly payment plan schedules directly inside the WhatsApp chat.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                04
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Broker Handoff &amp; CRM Sync</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                When a buyer qualifies as serious, the system alerts your designated area broker on WhatsApp with a full brief and 3 pre-written reply options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. 5 CORE FEATURES REAL ESTATE DIRECTORS LOVE ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Agency Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              5 Key Features Designed Specifically for UAE Real Estate Agencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">1. Sub-10 Second Speed-to-Lead Response</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Never leave a portal lead waiting again. Our control panel engages every buyer within 6 to 10 seconds of inquiry submission, day or night, weekdays or holidays.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">2. Voice Note Transcription (Arabic &amp; English)</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  UAE buyers frequently send audio voice notes on WhatsApp while driving or on the move. Our AI transcribes voice notes instantly, extracts buyer requirements, and continues the conversation smoothly.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">3. Automated Off-Plan Brochure &amp; Payment Plan Engine</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Pre-loaded with developer inventory for Sobha Realty, Emaar Properties, Danube, Binghatti, and Nakheel. Delivers official PDF brochures and calculates 20% down payment + 1% monthly plans on demand.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">4. Smart Area &amp; Broker Lead Routing</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Route inquiries automatically based on property location, budget threshold, or agent language skills. Includes automated SLA escalation if a broker is busy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PERFORMANCE COMPARISON TABLE ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Performance Comparison
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Traditional Email Intake vs. Asif Digital Webhook Control Panel
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-sans">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-mono tracking-wider text-white/50">
                  <th className="py-4 px-6">Capability</th>
                  <th className="py-4 px-6">Traditional Email Intake</th>
                  <th className="py-4 px-6">Manual WhatsApp Calling</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20 rounded-t-xl">Asif Digital Control Panel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Speed-to-Lead SLA</td>
                  <td className="py-4 px-6 text-red-400">3 to 6 Hours</td>
                  <td className="py-4 px-6 text-yellow-400">30 to 90 Minutes</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">&lt; 1 Second (Instant)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">After-Hours Inquiries (8PM-2AM)</td>
                  <td className="py-4 px-6 text-red-400">Lost (Ignored until next morning)</td>
                  <td className="py-4 px-6 text-red-400">Delayed (Brokers off-duty)</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">24/7 Instant WhatsApp Engagement</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Voice Note Handling</td>
                  <td className="py-4 px-6 text-red-400">Unsupported</td>
                  <td className="py-4 px-6 text-yellow-400">Manual listen &amp; reply</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Real-Time AR/EN Transcription</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Off-Plan Payment Calculators</td>
                  <td className="py-4 px-6 text-red-400">Manual spreadsheet lookup</td>
                  <td className="py-4 px-6 text-yellow-400">Broker calculates manually</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Automated 1% Plan Calculation</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">UAE Data Privacy &amp; PDPL</td>
                  <td className="py-4 px-6 text-yellow-400">Stored in third-party mail servers</td>
                  <td className="py-4 px-6 text-red-400">Stored on personal broker phones</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20 rounded-b-xl">Private Database Owned by Agency</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 6. FREQUENTLY ASKED QUESTIONS (FAQS) ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-white/60 font-light text-center mb-12">
            Everything real estate agency directors ask about our Bayut &amp; Property Finder WhatsApp Control Panel.
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

      {/* ── 7. FINAL HIGH-CONVERTING CTA SECTION ── */}
      <section className="py-24 px-6 md:px-12 text-center bg-gradient-to-b from-black to-emerald-950/30">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
            Zero Lead Decay Guarantee
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Ready to Connect Your Bayut &amp; Property Finder Leads Directly to WhatsApp?
          </h2>
          <p className="text-lg text-white/70 font-light mb-10 max-w-2xl mx-auto">
            Book a free 1-on-1 automation audit with Asif Digital. We will analyze your current portal lead intake and show you how to reduce response times to under 1 second.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-2xl"
            >
              Book Free Integration Audit <ArrowRight className="w-4 h-4" />
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
