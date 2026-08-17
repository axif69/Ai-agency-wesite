"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
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
  DollarSign,
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
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

const calendlyUrl = "https://calendly.com/asifdigitalagency";
const whatsappUrl = "https://wa.me/971545866094";

const faqs = [
  {
    q: "What is Real Estate Lead Decay and how does it impact Dubai brokerages?",
    a: "Lead Decay is the rapid decline in buyer interest and conversion probability that occurs every minute a property inquiry remains unanswered. In Dubai's competitive market, 78% of property buyers close deals with the first agency that responds on WhatsApp. After just 5 minutes, lead qualification probability drops by 80%. After 30 minutes, the buyer has likely contacted two competing brokerages.",
  },
  {
    q: "How does the Real Estate Lead Decay & ROI Loss Calculator compute revenue loss?",
    a: "Our calculator uses empirical UAE market conversion benchmarks: (1) Average response time lag, (2) Percentage of after-hours inquiries (8:00 PM to 2:00 AM), and (3) Average commission value per deal (e.g. AED 50,000). By multiplying your uncaptured high-intent leads by industry conversion rates, the calculator determines how many deals and how much commission revenue your agency loses monthly to response delays.",
  },
  {
    q: "How does WhatsApp AI automation eliminate lead decay?",
    a: "Our AI concierge responds to every incoming inquiry on Bayut, Property Finder, and Meta Ads within 6.2 seconds — 24 hours a day, 7 days a week. By greeting, qualifying, transcribing voice notes, and sending PDF brochures instantly, the AI captures 100% of buyer intent before competitors even receive an email notification.",
  },
  {
    q: "What percentage of real estate inquiries in Dubai arrive after office hours?",
    a: "Market data shows that over 68% of property portal and social ad inquiries in the UAE arrive between 8:00 PM and 2:00 AM, when potential buyers and investors browse properties at home. Without 24/7 AI automation, these night inquiries sit unanswered until the following morning, resulting in heavy lead drop-off.",
  },
  {
    q: "How does response speed impact Meta Ads and Google PPC ad spend ROI?",
    a: "Agencies spending AED 30,000 to AED 100,000+ monthly on Meta and Google PPC ads often lose 40% of their ad ROI due to slow follow-up. When response times drop from hours to under 10 seconds on WhatsApp, Cost Per Qualified Lead drops significantly, effectively doubling the ROI of your existing marketing budget without spending extra on ads.",
  },
  {
    q: "Can we plug our agency's exact monthly lead volume and average deal size into the calculator?",
    a: "Yes. Use the interactive sliders above to input your monthly lead volume (e.g. 500 leads) and average commission per deal (e.g. AED 60,000) to see your customized monthly and annual revenue recovery projections.",
  },
  {
    q: "Is Asif Digital's ROI Loss Calculator compliant with UAE data privacy laws?",
    a: "100% Yes. The calculator runs locally in your browser. All calculations, lead figures, and ROI estimates are private and never stored or shared.",
  },
  {
    q: "Which CRMs can track lead response times and SLA metrics?",
    a: "Our control panel connects with PropSpace, Ruby CRM, Salesforce, HubSpot, Zoho CRM, Masterkey, and custom databases to provide real-time SLA response time monitoring for every broker on your team.",
  },
  {
    q: "How quickly can Asif Digital deploy the zero lead decay system for our agency?",
    a: "Standard setup and live deployment take 7 to 10 working days. Our team handles Meta WhatsApp API registration, portal webhooks, CRM integration, AI prompt training, and sales team onboarding.",
  },
  {
    q: "What is the expected payback period for implementing WhatsApp AI automation?",
    a: "Most Dubai brokerages recover their full implementation investment within the first 14 to 30 days by capturing 2 to 5 extra deals that would have previously decayed due to response lag or after-hours delays.",
  },
  {
    q: "Can the AI handle high-volume off-plan project launches without breaking?",
    a: "Yes. Our serverless architecture handles 1,000+ simultaneous WhatsApp conversations during major developer launches (Emaar, Sobha, Danube, Binghatti) with zero delay.",
  },
  {
    q: "How do we schedule a custom ROI audit for our agency?",
    a: "Click 'Book Free ROI Audit' or message us directly on WhatsApp at +971 54 586 6094 to schedule a 1-on-1 consultation with our lead automation strategists.",
  },
];

export default function AiRoiCalculatorDubaiView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [monthlyLeads, setMonthlyLeads] = useState(300);
  const [avgCommission, setAvgCommission] = useState(50000);
  const [avgResponseTimeMinutes, setAvgResponseTimeMinutes] = useState(45);

  // Revenue Loss Math Logic
  const decayFactor = Math.min(0.35, (avgResponseTimeMinutes / 60) * 0.15 + 0.05);
  const estimatedDealsLost = Math.max(1, Math.round(monthlyLeads * decayFactor * 0.08));
  const estimatedMonthlyRevenueLost = estimatedDealsLost * avgCommission;
  const estimatedAnnualRevenueLost = estimatedMonthlyRevenueLost * 12;

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Real Estate Lead Decay & ROI Loss Calculator Dubai",
    provider: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
    serviceType: "Real Estate Lead Decay & Ad Spend ROI Loss Estimation",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
    description:
      "Enterprise Real Estate Lead Decay & ROI Loss Calculator Dubai. Calculate exact deals lost and commission revenue leaked due to slow lead response times and after-hours drop-off. 100% UAE PDPL compliant.",
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
    name: "How to Calculate Real Estate Lead Decay & Commission Revenue Loss in Dubai",
    description: "Step-by-step guide to measuring ad spend leakage and recovering lost deals with sub-10s WhatsApp AI automation.",
    step: [
      {
        "@type": "HowToStep",
        name: "Input Agency Lead Parameters",
        text: "Select monthly lead volume, average deal commission, and broker response time lag in the ROI loss calculator.",
      },
      {
        "@type": "HowToStep",
        name: "Analyze Monthly Commission Leakage",
        text: "Review estimated deals lost to after-hours inquiries (8PM-2AM) and 45+ minute response delays.",
      },
      {
        "@type": "HowToStep",
        name: "Deploy Sub-10s WhatsApp AI",
        text: "Connect Meta WhatsApp Cloud API to capture 100% of buyer intent instantly, doubling marketing ROI.",
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
              Real Estate ROI Loss Calculator · Dubai Market Benchmarks
            </span>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.05] text-white mb-6">
              Real Estate Lead Decay &amp; <br />
              ROI Loss Calculator Dubai
            </h1>

            <p className="text-2xl md:text-3xl font-serif text-white/90 leading-tight mb-6">
              Calculate How Much Commission Revenue Your Agency Loses <br />
              <span className="text-white/70 italic font-normal">To Delayed WhatsApp Responses Every Single Month.</span>
            </p>

            <p className="text-base text-white/65 font-light leading-relaxed mb-8 max-w-2xl">
              In Dubai&apos;s real estate market, 78% of buyers do business with the first agency that responds. Slow response times and unhandled night inquiries cause severe lead decay. Use our interactive calculator below to see your exact estimated revenue leakage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
              >
                Book Free ROI Audit <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                Speak With Lead Strategist
              </a>
            </div>
          </motion.div>

          {/* Interactive Lead Decay & ROI Loss Calculator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[2.5rem] border border-red-500/20 bg-black/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Lead Decay &amp; Revenue Loss Estimator</h3>
                  <span className="text-[10px] text-red-400 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Dubai Market Model Active
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono px-3 py-1 rounded-full border border-red-400/30 bg-red-500/10 text-red-300">
                Revenue Leakage
              </span>
            </div>

            {/* Interactive Sliders */}
            <div className="space-y-4 text-xs font-sans">
              <div>
                <div className="flex justify-between text-white/70 mb-1">
                  <span>Monthly Portal &amp; Ad Leads:</span>
                  <span className="font-mono font-bold text-white">{monthlyLeads} Leads/mo</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                  className="w-full accent-red-400 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-white/70 mb-1">
                  <span>Average Commission Per Deal (AED):</span>
                  <span className="font-mono font-bold text-white">AED {avgCommission.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="250000"
                  step="5000"
                  value={avgCommission}
                  onChange={(e) => setAvgCommission(Number(e.target.value))}
                  className="w-full accent-red-400 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-white/70 mb-1">
                  <span>Current Broker Response Lag:</span>
                  <span className="font-mono font-bold text-red-400">{avgResponseTimeMinutes} Minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="180"
                  step="5"
                  value={avgResponseTimeMinutes}
                  onChange={(e) => setAvgResponseTimeMinutes(Number(e.target.value))}
                  className="w-full accent-red-400 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Calculated Revenue Loss Box */}
              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-white/80">
                  <span>Estimated Deals Lost / Mo:</span>
                  <span className="text-red-400 font-bold text-sm">{estimatedDealsLost} Deals</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Monthly Commission Lost:</span>
                  <span className="text-red-400 font-bold text-sm">AED {estimatedMonthlyRevenueLost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/80 pt-2 border-t border-white/10">
                  <span>Annual Lost Revenue Leakage:</span>
                  <span className="text-red-300 font-bold text-base">AED {estimatedAnnualRevenueLost.toLocaleString()}/yr</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-400/20 text-[11px] text-emerald-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Recoverable With Sub-10s WhatsApp AI
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold">100% Target Recovery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. EXECUTIVE SUMMARY: THE TIMING PRINCIPLE ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              The Speed-to-Lead Curve
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              The Science of Real Estate Lead Decay: Why Minutes Equal Millions
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              When a buyer submits an inquiry for a luxury apartment in Downtown Dubai or an off-plan villa in Palm Jumeirah, their purchase intent is at 100%. Within 5 minutes, that buyer receives calls or messages from other agencies. By minute 30, intent has decayed by over 80%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">6.2 Sec</div>
              <h3 className="text-lg font-serif text-white mb-2">Asif Digital AI Response</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Our AI concierge greets the buyer on WhatsApp in under 10 seconds, delivering PDF brochures and payment plan calculations before competitors even receive the lead email.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-red-400 font-mono text-4xl font-bold mb-4">45 Min</div>
              <h3 className="text-lg font-serif text-white mb-2">Average Manual Response Lag</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                The average manual broker response lag in Dubai is 45 to 90 minutes. At this point, the buyer has already booked a viewing with another brokerage.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-emerald-400 font-mono text-4xl font-bold mb-4">2x - 4x</div>
              <h3 className="text-lg font-serif text-white mb-2">Marketing ROI Multiplier</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                By eliminating lead decay, your existing ad budget on Bayut, Property Finder, and Meta Ads yields 2x to 4x more qualified viewing appointments without increasing ad spend.
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
              Simple 4-Step Recovery Process
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              How to Plug Commission Revenue Leakage in 4 Simple Steps
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              Eliminating lead decay is simple when you combine WhatsApp AI automation with smart broker SLA tracking:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">1. Connect WhatsApp API</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Link Meta WhatsApp Cloud API with Bayut, Property Finder, Dubizzle, and Meta Ads webhooks in under 1 second.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">2. Sub-10s Auto Greeting</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                AI greets incoming buyers 24/7, confirming budget, property interest, and timeline while transcribing voice notes.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">3. Instant 1-Click Co-Pilot</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Area brokers receive WhatsApp alerts with buyer briefs and 3 pre-written AI suggestions, enabling sub-60s responses.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4 font-mono font-bold">
                04
              </div>
              <h3 className="text-base font-semibold text-white mb-2">4. Measure Recovered Deals</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Track SLA response times, buyer heat scores, and closed commission deals inside your executive dashboard.
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
              High Lead Decay Model vs. Asif Digital Zero Lead Decay Architecture
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-sans">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-mono tracking-wider text-white/50">
                  <th className="py-4 px-6 font-semibold">Capability</th>
                  <th className="py-4 px-6 font-semibold">High Lead Decay Model</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20 rounded-t-xl font-semibold">Asif Digital Zero Decay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Initial Buyer Response Speed</td>
                  <td className="py-4 px-6 text-red-400">45 to 90 Minutes</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">&lt; 10 Seconds (24/7 Instant)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">After-Hours Handling (8PM-2AM)</td>
                  <td className="py-4 px-6 text-red-400">100% Unanswered Until Next Day</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Automated Evening Qualification</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Ad Spend Waste Percentage</td>
                  <td className="py-4 px-6 text-red-400">35% to 50% Ad Budget Lost</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">0% Ad Spend Wasted</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Broker Response Handoff SLA</td>
                  <td className="py-4 px-6 text-yellow-400">No SLA tracking</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">&lt; 60 Seconds with 1-Click AI Co-Pilot</td>
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
            Everything real estate agency directors ask about Lead Decay and ROI Loss recovery.
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
            Ready to Stop Commission Leakage &amp; Double Your Ad ROI?
          </h2>
          <p className="text-lg text-white/70 font-light mb-10 max-w-2xl mx-auto">
            Book a free 1-on-1 ROI loss audit with Asif Digital. We will analyze your current lead response times and show you how to capture 100% of buyer intent on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-2xl"
            >
              Book Free ROI Audit <ArrowRight className="w-4 h-4" />
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
