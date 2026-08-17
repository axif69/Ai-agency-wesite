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
  Code2,
  Database,
  FileCode,
  Globe,
  Headphones,
  Layers,
  LayoutDashboard,
  LockKeyhole,
  MessageSquare,
  Mic,
  PieChart,
  Radio,
  RefreshCw,
  Send,
  ShieldCheck,
  Zap,
} from "lucide-react";

const calendlyUrl = "https://calendly.com/asifdigitalagency";
const whatsappUrl = "https://wa.me/971545866094";

const faqs = [
  {
    q: "How does the Bayut and Property Finder WhatsApp Lead Control Panel work?",
    a: "The Bayut & Property Finder WhatsApp Lead Control Panel connects real-time API webhooks from Bayut, Property Finder, Dubizzle, Meta Ads, and Google Search directly to your WhatsApp Business Cloud API and private CRM database. When a buyer submits an inquiry on Bayut or Property Finder, the webhook fires in under 0.85 seconds, parsing the listing ID, property community, price, and buyer contact details. The AI instantly initiates a personalized WhatsApp conversation, greets the buyer in their preferred language (English, Arabic, Russian, French), answers property questions, and logs the lead state into your control panel.",
  },
  {
    q: "Can this system route portal leads to specific brokers based on area or language?",
    a: "Yes. The control panel includes intelligent lead routing rules. You can route inquiries by property community (e.g. Dubai Marina leads to Broker A, Downtown Dubai to Broker B), language preference, or round-robin distribution. If the assigned broker does not respond within your defined SLA time window (e.g. 5 minutes), the control panel automatically escalates the lead to the next available agent.",
  },
  {
    q: "Is it compliant with UAE PDPL data protection laws?",
    a: "100% Yes. All lead records, conversation transcripts, and portal webhook payloads are stored in a dedicated, private Supabase PostgreSQL database owned by your brokerage. Unlike third-party SaaS tools that retain your client data on shared external servers, Asif Digital builds the pipeline directly on your private infrastructure, ensuring full compliance with UAE Personal Data Protection Law (PDPL).",
  },
  {
    q: "What CRM systems can connect with the Bayut & Property Finder Control Panel?",
    a: "The control panel seamlessly syncs with all major real estate CRMs including PropSpace, Ruby CRM, Salesforce, HubSpot, Zoho CRM, Masterkey, and custom PostgreSQL databases. Leads, conversation briefs, and heat scores auto-sync bi-directionally in real time.",
  },
  {
    q: "How does the system handle duplicate leads from multiple portals?",
    a: "The control panel features automated deduplication rules based on phone number, email, and timestamp. If a buyer submits an inquiry on Property Finder and then 10 minutes later submits another inquiry for a different listing on Bayut, the system merges the interactions into a single buyer profile, updating their property preference history in your CRM.",
  },
  {
    q: "What happens if a portal API or webhook experiences downtime?",
    a: "Our architecture includes an automated webhook retry queue with exponential backoff. If a portal API endpoint is temporarily slow or down, the system queues incoming payloads and retries them automatically without losing a single lead payload or inquiry event.",
  },
  {
    q: "Can the AI answer specific off-plan payment plan questions for Dubai developers?",
    a: "Yes. The AI is pre-loaded with official payment plan structures for major UAE developers including Sobha Realty, Emaar, Danube, Binghatti, Nakheel, and Select Group. It can output 20% down payment amounts, 1% monthly installment schedules, and DLD fee estimates directly on WhatsApp.",
  },
  {
    q: "How long does implementation take for a Dubai real estate brokerage?",
    a: "Standard setup and live deployment take 7 to 10 working days. This includes Meta WhatsApp API registration, portal webhook connection (Bayut, Property Finder, Dubizzle), CRM pipeline integration, AI training on your property portfolio, and broker team onboarding.",
  },
];

export default function PortalLeadIntegrationDubaiView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPortal, setSelectedPortal] = useState<"all" | "bayut" | "pf" | "dubizzle">("all");
  const [activeTab, setActiveTab] = useState<"comparison" | "payload" | "timeline">("comparison");

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
      "Enterprise Bayut & Property Finder WhatsApp Lead Control Panel Dubai. Instant webhook sync, sub-1s lead intake, 24/7 AI qualification, automated broker dispatch, and 100% UAE PDPL data compliance.",
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
    name: "How to Automate Bayut & Property Finder Leads on WhatsApp",
    description: "Step-by-step guide to connecting UAE property portal leads directly to WhatsApp and CRM in under 1 second.",
    step: [
      {
        "@type": "HowToStep",
        name: "Connect Webhook APIs",
        text: "Configure direct webhooks from Bayut, Property Finder, and Dubizzle to fire incoming inquiry payloads to Supabase edge functions in < 0.85s.",
      },
      {
        "@type": "HowToStep",
        name: "Deploy 24/7 WhatsApp AI Concierge",
        text: "Train the AI model on your property inventory, developer payment plans, and multi-language Khaleeji AR/EN/RU/FR prompts.",
      },
      {
        "@type": "HowToStep",
        name: "Auto-Sync with CRM & Dispatch Brokers",
        text: "Sync lead profiles and heat scores into PropSpace or Zoho, sending instant broker alerts on WhatsApp for HOT qualified buyers.",
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
              When a buyer submits an inquiry on Bayut, Property Finder, or Dubizzle, our webhook engine instantly triggers a 24/7 AI WhatsApp greeting, qualifies buyer budget and timeline, and logs the lead directly into your CRM before competitors even see the notification.
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
                Test Portal Webhook Live
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
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Webhook Latency: 0.82s
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

      {/* ── 2. COMPREHENSIVE COMPARISON MATRIX TABLE ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Performance Benchmark
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Traditional Email Intake vs. Asif Digital Webhook Control Panel
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-sans">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-mono tracking-wider text-white/50">
                  <th className="py-4 px-6">Metric / Capability</th>
                  <th className="py-4 px-6">Traditional Email Intake</th>
                  <th className="py-4 px-6">Manual WhatsApp Calling</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20 rounded-t-xl">Asif Digital Control Panel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Average Speed-to-Lead SLA</td>
                  <td className="py-4 px-6 text-red-400">3 to 6 Hours</td>
                  <td className="py-4 px-6 text-yellow-400">30 to 90 Minutes</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">&lt; 0.85 Seconds (Instant)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">After-Hours Inquiries (8PM-2AM)</td>
                  <td className="py-4 px-6 text-red-400">Lost (Ignored until next morning)</td>
                  <td className="py-4 px-6 text-red-400">Delayed (Brokers off-duty)</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">24/7 AI Instant WhatsApp Engagement</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Audio Voice Note Handling</td>
                  <td className="py-4 px-6 text-red-400">Unsupported</td>
                  <td className="py-4 px-6 text-yellow-400">Manual listen &amp; reply</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">OpenAI Whisper Real-Time AR/EN Transcription</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Multi-Channel Attribution</td>
                  <td className="py-4 px-6 text-red-400">Manual guesswork</td>
                  <td className="py-4 px-6 text-red-400">No source link</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Full UTM &amp; Listing Ref ID Tracking</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">UAE Data Sovereignty &amp; PDPL</td>
                  <td className="py-4 px-6 text-yellow-400">Stored in third-party mail servers</td>
                  <td className="py-4 px-6 text-red-400">Stored on personal broker phones</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20 rounded-b-xl">Private Supabase DB Owned by Brokerage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 3. TECHNICAL DEEP DIVE: WEBHOOK PAYLOAD PARSING ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Developer &amp; Technical Deep Dive
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              How Our Edge Functions Parse Bayut &amp; Property Finder Webhook Payloads
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed mb-6">
              When a lead submits an inquiry on Bayut or Property Finder, their API sends an encrypted POST request to our Supabase Edge Function endpoint. The payload contains buyer contact details, listing reference IDs, community names, and budget parameters.
            </p>
            <div className="space-y-3 font-mono text-xs text-white/80">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Real-time JSON validation &amp; payload sanitization
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Automatic phone number normalization to E.164 (+971)
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Bi-directional sync with PropSpace, Zoho, or Salesforce
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-black/90 font-mono text-xs overflow-x-auto text-emerald-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-white/50 text-[10px]">
              <span className="flex items-center gap-2"><FileCode className="w-4 h-4 text-emerald-400" /> webhook_handler.ts</span>
              <span>HTTP 200 OK</span>
            </div>
            <pre className="leading-relaxed">
{`// Supabase Edge Function Webhook Handler
export async function handlePortalWebhook(req: Request) {
  const payload = await req.json();
  const { listing_id, buyer_phone, buyer_name, portal_source } = payload;
  
  // 1. Normalize Phone Number to UAE E.164
  const cleanPhone = formatUAEPhone(buyer_phone);
  
  // 2. Fetch Property Specs from Inventory DB
  const property = await getListingById(listing_id);
  
  // 3. Trigger WhatsApp AI Greeting in < 0.85s
  await sendWhatsAppGreeting({
    to: cleanPhone,
    name: buyer_name,
    property: property.title,
    price: property.price
  });
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── 4. FREQUENTLY ASKED QUESTIONS (FAQS) ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-10 text-center">
            Frequently Asked Technical &amp; Operational Questions
          </h2>

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

      {/* ── 5. FINAL HIGH-CONVERTING CTA SECTION ── */}
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
