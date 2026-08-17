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
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  Download,
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
  Percent,
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
    q: "How does the AI Off-Plan Property Matcher work on WhatsApp?",
    a: "When a potential buyer or investor sends an inquiry on WhatsApp (or via Meta Ads / portal lead form), our AI asks 3 quick qualifying questions: (1) Preferred location (e.g. Dubai Hills, Business Bay, Palm Jumeirah), (2) Target property type and bedroom count (e.g. 1BR or 2BR apartment), and (3) Budget range. Within 3 seconds, the AI scans your developer portfolio, matches the buyer's criteria against available off-plan units, and sends the top 3 matching projects directly inside WhatsApp with official PDF brochures, floor plans, and 1% monthly payment calculations.",
  },
  {
    q: "Can the AI auto-calculate 1% monthly payment plans for Dubai developers?",
    a: "Yes. The AI is pre-loaded with official payment plan structures for major UAE developers including Sobha Realty, Emaar Properties, Danube Properties, Binghatti Developers, Nakheel, and Select Group. When a buyer asks about a specific project, the AI calculates the exact 20% down payment amount, DLD 4% registration fees, 1% monthly installments, and post-handover payment breakdown instantly.",
  },
  {
    q: "How does automated off-plan brochure delivery work on WhatsApp?",
    a: "Instead of making buyers wait hours for an agent to email a heavy PDF attachment, our system delivers high-resolution developer brochures, masterplan maps, floor plans, and video walkthrough links directly inside WhatsApp within 5 seconds of request. The download event is logged in your CRM so your sales team knows exactly which brochure the buyer viewed.",
  },
  {
    q: "Can this system handle high-volume off-plan project launches?",
    a: "Yes. During a major Dubai developer project launch, an agency can receive 300 to 1,000 inquiries per hour from Meta Ads and Google PPC. Our serverless architecture handles unlimited simultaneous WhatsApp conversations with zero delay, ensuring every single buyer is greeted, qualified, and matched without placing a burden on your human brokers.",
  },
  {
    q: "Will our brokers get alerts when a serious off-plan buyer qualifies?",
    a: "Yes. When a buyer confirms their budget, timeline (e.g. ready to book within 14 days), and unit preference, the AI tags the lead as 'HOT' and sends an instant WhatsApp alert to your designated off-plan sales manager. The alert includes a full buyer brief and 3 pre-written 1-click reply options so the broker can close the deal fast.",
  },
  {
    q: "Is Asif Digital's off-plan AI system compliant with UAE PDPL data privacy laws?",
    a: "100% Yes. All lead profiles, client contact details, and conversation transcripts are stored in a private Supabase PostgreSQL database owned exclusively by your brokerage. We do not store your data on shared third-party SaaS servers, ensuring complete compliance with the UAE Personal Data Protection Law (PDPL).",
  },
  {
    q: "Which CRMs can connect with this off-plan AI system?",
    a: "The system connects seamlessly with all major real estate CRMs used in the UAE, including PropSpace, Ruby CRM, Salesforce, HubSpot, Zoho CRM, Masterkey, and custom databases. Leads, conversation briefs, and payment plan calculations auto-sync in real time.",
  },
  {
    q: "Can the AI answer questions in Russian, Arabic, and French?",
    a: "Yes. Given Dubai's international buyer demographic, the AI automatically detects the buyer's language and responds fluently in English, Khaleeji Arabic, Russian, French, and German, maintaining a polite, executive tone.",
  },
  {
    q: "How does the system handle audio voice notes sent by off-plan buyers?",
    a: "In the UAE market, buyers frequently send voice notes on WhatsApp instead of typing text messages. Our AI automatically transcribes audio voice notes in real time using OpenAI Whisper, extracts budget and unit requirements, and responds in text or voice format without making agents listen to recordings manually.",
  },
  {
    q: "Can we customize the developer payment plan formulas?",
    a: "Yes. You have full admin control to update down payment percentages, post-handover installment schedules, handover dates, and service charge estimates whenever a developer releases a new off-plan project or updates pricing.",
  },
  {
    q: "How long does setup take for our off-plan agency?",
    a: "Standard setup and live deployment take 7 to 10 working days. Our team handles everything: WhatsApp API connection, developer project portfolio loading, CRM integration, AI prompt training, and sales team walkthroughs.",
  },
  {
    q: "How do we get started with a demo for our off-plan team?",
    a: "Click 'Book Off-Plan AI Demo' or send us a message on WhatsApp at +971 54 586 6094 to schedule a free 1-on-1 automation audit for your brokerage.",
  },
];

export default function OffPlanAiAutomationDubaiView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [propertyPrice, setPropertyPrice] = useState(2500000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [monthlyInstallmentPct, setMonthlyInstallmentPct] = useState(1);

  const downPaymentAmount = (propertyPrice * downPaymentPct) / 100;
  const dldFee = propertyPrice * 0.04;
  const monthlyInstallmentAmount = (propertyPrice * monthlyInstallmentPct) / 100;

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Off-Plan Property Matcher & Payment Plan Calculator Dubai",
    provider: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
    serviceType: "Off-Plan Real Estate AI Automation & Payment Plan Calculators",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
    description:
      "Enterprise AI Off-Plan Property Matcher & Payment Plan Calculator Dubai. Instant 1% monthly payment calculation, automated PDF brochure delivery on WhatsApp, sub-10s buyer qualification, and 100% UAE PDPL compliance.",
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
    name: "How to Automate Off-Plan Property Matching & Payment Plan Calculation on WhatsApp",
    description: "Step-by-step guide to delivering 1% monthly payment plans and PDF brochures to Dubai property buyers on WhatsApp in under 5 seconds.",
    step: [
      {
        "@type": "HowToStep",
        name: "Capture Buyer Criteria",
        text: "AI greets incoming off-plan leads on WhatsApp and confirms budget, preferred location, and bedroom count in < 10 seconds.",
      },
      {
        "@type": "HowToStep",
        name: "Match Inventory & Calculate Payment Plan",
        text: "AI scans developer database (Sobha, Emaar, Danube, Binghatti) and auto-calculates 20% down payment + 1% monthly schedules.",
      },
      {
        "@type": "HowToStep",
        name: "Deliver PDF Brochure & Alert Off-Plan Broker",
        text: "Delivers official developer PDF brochure in chat and dispatches instant WhatsApp alert to off-plan sales manager.",
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
              AI Off-Plan Property Matcher · UAE Developer Engine
            </span>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.05] text-white mb-6">
              AI Off-Plan Property Matcher &amp; <br />
              Payment Plan Calculator
            </h1>

            <p className="text-2xl md:text-3xl font-serif text-white/90 leading-tight mb-6">
              Deliver 1% Monthly Payment Plans &amp; Off-Plan PDF Brochures on WhatsApp <br />
              <span className="text-white/70 italic font-normal">In Under 5 Seconds — 24 Hours a Day.</span>
            </p>

            <p className="text-base text-white/65 font-light leading-relaxed mb-8 max-w-2xl">
              During off-plan launches, buyers demand instant project information. Our AI automatically matches buyer budgets against your developer portfolio (Sobha, Emaar, Danube, Binghatti, Nakheel), calculates 20% down payment + 1% monthly installments, and delivers brochures directly on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
              >
                Book Off-Plan AI Demo <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                Test Payment Plan Bot Live
              </a>
            </div>
          </motion.div>

          {/* Interactive Off-Plan Payment Plan Calculator Simulator */}
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
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Off-Plan Payment Plan Calculator</h3>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live UAE Developer Engine
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                1% Monthly Calculator
              </span>
            </div>

            {/* Interactive Sliders */}
            <div className="space-y-4 text-xs font-sans">
              <div>
                <div className="flex justify-between text-white/70 mb-1">
                  <span>Property Value (AED):</span>
                  <span className="font-mono font-bold text-white">AED {propertyPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="15000000"
                  step="250000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-emerald-400 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Calculated Breakdown Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-emerald-400/30 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-white/80">
                  <span>Down Payment ({downPaymentPct}%):</span>
                  <span className="text-emerald-400 font-bold">AED {downPaymentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>DLD Fee (4%):</span>
                  <span className="text-white/70">AED {dldFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/80 pt-2 border-t border-white/10">
                  <span>Monthly Installment (1%/mo):</span>
                  <span className="text-emerald-300 font-bold text-sm">AED {monthlyInstallmentAmount.toLocaleString()}/mo</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-400/20 text-[11px] text-emerald-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Delivered on WhatsApp in 3s
                </span>
                <span className="font-mono text-[10px] text-white/50">PDF Brochure Attached</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. EXECUTIVE SUMMARY: THE OFF-PLAN LAUNCH BOTTLENECK ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Off-Plan Market Bottleneck
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              Why Dubai Real Estate Agencies Miss 70% of Off-Plan Buyers During Project Launches
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              When major developers like Emaar, Sobha, Danube, or Binghatti launch a new off-plan project, buyer demand spikes instantly. Agencies run aggressive Meta and Google ad campaigns, producing hundreds of lead forms per day. However, human brokers cannot manually qualify 500 leads in an afternoon, leading to missed sales and wasted ad budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">5 Sec</div>
              <h3 className="text-lg font-serif text-white mb-2">Instant PDF Delivery</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Off-plan buyers want project floor plans and payment terms immediately. Delivering PDF brochures in 5 seconds on WhatsApp keeps buyers engaged with your agency before they look elsewhere.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">100%</div>
              <h3 className="text-lg font-serif text-white mb-2">Automated 1% Calculations</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Brokers waste hours calculating down payments and monthly installments manually. Our AI calculates exact 20% down + 1% monthly terms for any property value in real time.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">24/7</div>
              <h3 className="text-lg font-serif text-white mb-2">Launch Capacity</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Our serverless architecture handles 1,000+ simultaneous WhatsApp inquiries during launch day with zero delay, ensuring every single buyer is greeted and qualified instantly.
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
              How Our AI Off-Plan Matcher &amp; Calculator Works in 4 Simple Steps
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              We designed this system to make off-plan sales effortless for your brokerage. Here is how simple the process is:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">1. Instant Greeting (&lt; 10s)</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                When a buyer inquires on Meta Ads, Google PPC, or property portals, the AI greets them on WhatsApp in under 10 seconds in their preferred language.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">2. Budget &amp; Area Matching</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The AI confirms buyer budget, preferred community (Dubai Hills, Business Bay, Downtown), and bedroom requirement, matching unit availability instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">3. Brochure &amp; 1% Plan Delivery</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The AI calculates exact 20% down payment + 1% monthly installments and sends the official developer PDF brochure directly in the WhatsApp chat.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                04
              </div>
              <h3 className="text-base font-semibold text-white mb-2">4. HOT Lead Broker Handoff</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                When a buyer confirms intent to book, the system alerts your off-plan sales manager on WhatsApp with a buyer brief and 3 pre-written reply options.
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
              Manual Launch Handling vs. Asif Digital AI Off-Plan Matcher
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-sans">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-mono tracking-wider text-white/50">
                  <th className="py-4 px-6 font-semibold">Capability</th>
                  <th className="py-4 px-6 font-semibold">Manual Launch Process</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20 rounded-t-xl font-semibold">Asif Digital AI Matcher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Launch Inquiries Capacity</td>
                  <td className="py-4 px-6 text-red-400">10-20 leads per broker/day max</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Unlimited Simultaneous Inquiries</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">PDF Brochure Delivery Speed</td>
                  <td className="py-4 px-6 text-red-400">2 to 6 Hours</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">&lt; 5 Seconds on WhatsApp</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">1% Monthly Plan Math</td>
                  <td className="py-4 px-6 text-yellow-400">Manual calculation</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Instant Automated Breakdown</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Audio Voice Note Handling</td>
                  <td className="py-4 px-6 text-red-400">Manual listen when free</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Real-Time OpenAI Whisper Transcription</td>
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
            Everything off-plan real estate directors ask about our AI Off-Plan Property Matcher &amp; Payment Plan Calculator.
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
            Ready to Automate Off-Plan Matching &amp; 1% Payment Plan Delivery?
          </h2>
          <p className="text-lg text-white/70 font-light mb-10 max-w-2xl mx-auto">
            Book a free 1-on-1 automation audit with Asif Digital. We will show you how to deliver instant PDF brochures and payment calculations to off-plan buyers on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-2xl"
            >
              Book Off-Plan AI Demo <ArrowRight className="w-4 h-4" />
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
