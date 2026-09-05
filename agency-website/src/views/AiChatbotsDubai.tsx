"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, MessageSquare, Sparkles, Clock, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Globe, PhoneCall, 
  HelpCircle, Building2, BarChart3, Users, RefreshCw,
  Cpu, Send, Database, Layers, Check, AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function AiChatbotsDubai() {
  // Interactive After-Hours Lead Recovery Simulator State
  const [monthlyWebsiteVisitors, setMonthlyWebsiteVisitors] = useState(12000);
  const [afterHoursVisitorPercent, setAfterHoursVisitorPercent] = useState(55); // % of visitors browsing outside 9am-6pm
  const [avgLeadContractValue, setAvgLeadContractValue] = useState(18000); // AED

  // Calculations
  const afterHoursVisitors = Math.round(monthlyWebsiteVisitors * (afterHoursVisitorPercent / 100));
  const lostLeadsWithoutChatbot = Math.round(afterHoursVisitors * 0.012); // ~1.2% would-be leads lost due to no instant assistance
  const lostMonthlyRevenue = lostLeadsWithoutChatbot * avgLeadContractValue * 0.15; // Assuming 15% close rate
  
  const recoveredLeadsWithAiChatbot = Math.round(afterHoursVisitors * 0.042); // 4.2% conversion with instant conversational response
  const recoveredMonthlyRevenue = Math.round(recoveredLeadsWithAiChatbot * avgLeadContractValue * 0.15);
  const annualRecoveredRevenue = recoveredMonthlyRevenue * 12;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "WhatsApp & AI Chatbot Development Dubai",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital: AI Automation, Web & Graphic Design",
      "telephone": "+971545866094",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Muwaileh Commercial - Industrial Area",
        "addressLocality": "Sharjah",
        "addressRegion": "Sharjah",
        "addressCountry": "AE"
      },
      "url": "https://www.asifdigital.agency"
    },
    "serviceType": "Conversational AI and WhatsApp Business Automation",
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "Custom WhatsApp and AI chatbot development in Dubai. Official Meta WhatsApp Business Platform automation, bilingual Arabic/English conversational NLP, CRM integration, and lead qualification."
  };

  const faqData = [
    {
      q: "What is the difference between an AI Chatbot and a legacy button-based chatbot?",
      a: "Legacy chatbots rely on rigid decision trees ('Press 1 for Sales') and fail whenever a user asks a complex question. Our Generative AI chatbots interpret natural language, typos, and nuanced business context in both English and Arabic. They answer inquiries directly from your verified documents and guide prospects through structured qualification flows."
    },
    {
      q: "Is your WhatsApp automation built on the official Meta Business Platform?",
      a: "Yes. We build exclusively on the official WhatsApp Business Platform (Cloud API). This ensures high message delivery reliability, policy-compliant messaging workflows, multi-agent inbox support, and eligibility for official Meta business verification assistance without third-party scraping risks."
    },
    {
      q: "How fast does the automated WhatsApp chatbot respond to incoming leads?",
      a: "Under normal network conditions, automated responses are delivered within seconds of receiving an inquiry. This immediate response is critical in competitive UAE markets like real estate and professional services where buyer engagement drops sharply after the first few minutes."
    },
    {
      q: "Does the AI support Arabic and Gulf (Khaleeji) conversational phrasing?",
      a: "Yes. Our conversational models handle Modern Standard Arabic (MSA), common Gulf phrasing, and Arabizi (Arabic written in Latin characters with numbers). When a user switches between Arabic and English mid-sentence, the chatbot adapts seamlessly while preserving right-to-left (RTL) formatting."
    },
    {
      q: "Can the chatbot transfer a conversation to a human sales agent?",
      a: "Yes. When a prospect reaches a high-intent threshold (such as an enterprise budget or urgent viewing request) or asks to speak with a representative, the system alerts your on-duty team via WhatsApp or CRM notification and hands over the full conversation transcript for a live takeover."
    },
    {
      q: "Which CRM and calendar platforms can be integrated?",
      a: "We support bi-directional synchronization with HubSpot, Zoho CRM, Salesforce, Odoo, Google Sheets, Calendly, Microsoft Bookings, and custom webhook databases to ensure every contact record, message history, and appointment is stored automatically."
    },
    {
      q: "What factors determine the cost of developing a custom WhatsApp & AI chatbot?",
      a: "Pricing is determined by the number of conversational workflows required, integration depth (CRM, ERP, payment gateways), monthly messaging volumes, and knowledge-base complexity. We scope each project with a clear functional specification before implementation."
    },
    {
      q: "How are customer data and conversational records protected under UAE law?",
      a: "All conversation records and customer details are transmitted through encrypted connections and processed in alignment with UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection. Client data is strictly kept within your own cloud or private database environments."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── 1. Hero Section ── */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 25 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="text-white/90 text-xs font-mono uppercase tracking-[0.25em] mb-4 block flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-400" /> WhatsApp Business Platform &bull; Conversational AI &bull; Dubai &amp; GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-6">
            AI Chatbot &amp; WhatsApp <br />
            <span className="italic text-white/50 font-normal">Automation Development in Dubai.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-8 max-w-3xl">
            Asif Digital builds custom AI chatbots and official Meta WhatsApp automation systems for UAE businesses, connecting 24/7 client conversations with your CRM, lead qualification, and operations.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request Custom Chatbot Architecture <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Direct Answer Block (AI & Human Clarity) ── */}
      <section className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
        <div className="border border-emerald-500/20 bg-emerald-950/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm uppercase tracking-widest font-mono text-emerald-400 font-bold">
              What Asif Digital Builds for UAE Businesses
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-white/80 font-light">
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> WhatsApp AI Chatbots
              </div>
              <p className="text-xs text-white/60">Built on the official WhatsApp Business Platform with policy-compliant, multi-agent workflows.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Website Conversational Agents
              </div>
              <p className="text-xs text-white/60">Grounding responses strictly in your company documentation with RAG to eliminate hallucinations.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Automated Speed-to-Lead
              </div>
              <p className="text-xs text-white/60">Delivering automated inquiry responses in seconds to capture high-intent buyers before they bounce.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Bi-Directional CRM Sync
              </div>
              <p className="text-xs text-white/60">Instant pipeline logging and contact creation in HubSpot, Zoho CRM, Salesforce, or Odoo.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Bilingual Arabic &amp; English
              </div>
              <p className="text-xs text-white/60">Handling Modern Standard Arabic, common Gulf phrasing, and Arabizi with RTL support.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Live Human Agent Handover
              </div>
              <p className="text-xs text-white/60">Seamless handoff with complete conversational history to your sales team whenever requested.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WhatsApp Chatbot Development Dubai (Primary Commercial Hub) ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block">
              Primary UAE Communication Channel
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight leading-tight">
              WhatsApp Chatbot Development in Dubai
            </h2>
            <p className="text-white/75 font-light text-base leading-relaxed">
              In the UAE and broader GCC, over 80% of consumer and B2B inquiries initiate on WhatsApp. Relying solely on email forms causes severe drop-off. We develop production-grade WhatsApp chatbots engineered for fast lead qualification, customer service, and appointment booking.
            </p>
            <div className="space-y-3 pt-2">
              {[
                "Official WhatsApp Business Platform: Direct Cloud API connection with policy-compliant messaging.",
                "Multi-Agent Support Inbox: Route incoming WhatsApp conversations across multiple team members.",
                "Meta Verification Support: Guidance through business documentation and verified badge requirements.",
                "Zero Personal Device Dependency: Operates on sovereign cloud servers without needing a dedicated phone kept online."
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-white/80 font-light">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-xs font-mono text-white/70">WhatsApp Lead Qualification Flow</div>
            </div>
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="text-emerald-400 block font-bold">1. Inbound Ingestion (Instant)</span>
                <p className="text-white/70 font-sans text-xs">Buyer sends message from WhatsApp ad, QR code, or website link.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="text-emerald-400 block font-bold">2. Conversational Qualification</span>
                <p className="text-white/70 font-sans text-xs">Bot collects project scope, budget range, and timeline through natural dialogue.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="text-emerald-400 block font-bold">3. CRM Record &amp; Pipeline Assignment</span>
                <p className="text-white/70 font-sans text-xs">Contact profile created in HubSpot/Zoho with tagged intent and source attribution.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                <span className="text-emerald-300 block font-bold">4. Live Agent Notification &amp; Booking</span>
                <p className="text-white/80 font-sans text-xs">Sales rep alerted via mobile with pre-scheduled meeting confirmed in calendar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. AI Chatbot Development for Web & Omnichannel ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
            Omnichannel Conversational Engineering
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
            AI Chatbot Development for Websites &amp; Applications
          </h2>
          <p className="text-white/70 font-light text-base mt-4 leading-relaxed">
            Beyond WhatsApp, we deploy custom AI conversational widgets embedded directly on your website or portal. These agents use Retrieval-Augmented Generation (RAG) to query your uploaded service guides and pricing documents with zero hallucinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <Bot className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">24/7 Virtual Sales Agent</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Engages website visitors outside of business hours, answering detailed technical questions and capturing contact details before they bounce.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <Clock className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">In-Chat Calendar Booking</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Integrates directly with Calendly, Google Calendar, or Microsoft Bookings to schedule consultations within the chat window without external link redirects.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">Strict Document Grounding</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Trained strictly on your verified brochures, PDFs, and FAQ repositories. The AI refuses to answer out-of-scope inquiries or invent unapproved terms.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Demonstrated Bilingual Arabic & English Capabilities ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
            Linguistic Localization
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
            Demonstrated Bilingual Arabic &amp; English NLP
          </h2>
          <p className="text-white/70 font-light text-base mt-4 leading-relaxed">
            Operating in Dubai requires genuine linguistic adaptability. We configure conversational models to comprehend formal, informal, and mixed communications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" /> Supported Arabic Variations
            </h3>
            <ul className="space-y-3 text-sm text-white/75 font-light">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Modern Standard Arabic (MSA):</strong> Formal inquiries, official corporate documentation, and institutional customer service.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Gulf (Khaleeji) Conversational Expressions:</strong> Recognizes colloquial phrasing commonly used in local consumer messages.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Arabizi Interpretation:</strong> Capable of interpreting Arabic written in Latin characters and numerals (e.g. 3 for ع, 7 for ح).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Right-to-Left (RTL) Layouts:</strong> Dynamic RTL and LTR text formatting preserved across all conversational interfaces.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" /> Human Escalation Protocol
            </h3>
            <p className="text-sm text-white/75 font-light leading-relaxed">
              When an inquiry involves complex negotiations, nuanced legal terms, or an explicit request to speak with a staff member, the AI initiates a clean handoff:
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs font-mono">
              <div className="text-white/90">✓ Captures caller phone &amp; verified email</div>
              <div className="text-white/90">✓ Transmits full conversation summary to CRM</div>
              <div className="text-white/90">✓ Sends immediate SMS / WhatsApp ping to duty agent</div>
              <div className="text-white/90">✓ Allows agent to reply directly into the same thread</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CRM & Business Systems Integration ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
            Operational Synchronization
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
            Integrated with Your Existing UAE Tech Stack
          </h2>
          <p className="text-white/70 font-light text-base mt-4 leading-relaxed">
            A chatbot that operates in isolation creates data silos. We integrate conversational endpoints directly with your core customer databases and business platforms.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { name: "HubSpot CRM", desc: "Contact creation & lifecycle deals" },
            { name: "Zoho CRM", desc: "Module updates & lead assignment" },
            { name: "Salesforce", desc: "Enterprise pipeline synchronization" },
            { name: "Odoo ERP", desc: "Customer tickets & sales orders" },
            { name: "Google Calendar", desc: "Automated booking verification" },
            { name: "Microsoft 365", desc: "Outlook calendar & team alerts" },
            { name: "Custom Webhooks", desc: "Direct REST API database sync" },
            { name: "Google Sheets", desc: "Instant spreadsheet backup logging" }
          ].map((c, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <Database className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-sm font-bold text-white">{c.name}</div>
              <div className="text-xs text-white/50 font-light mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. UAE Industry Use Cases ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
            Targeted Implementations
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
            UAE Industry Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-serif text-white">Real Estate &amp; Brokerages</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Auto-qualifying buyers, sending off-plan PDF brochures via WhatsApp, and scheduling agent property viewings.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <Users className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-serif text-white">Clinics &amp; Healthcare</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Triage doctor availability, answer insurance coverage questions, and confirm clinical appointment bookings.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <Layers className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-serif text-white">B2B &amp; Professional Services</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Screening legal, corporate tax, and consultancy inquiries before routing high-ticket briefs to senior partners.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-serif text-white">Retail &amp; E-Commerce</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Instant delivery status tracking, return policy assistance, and conversational product recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. Interactive After-Hours Lead Recovery Simulator ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Interactive ROI Simulator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Simulate After-Hours Lead Recovery Revenue
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              When prospective buyers browse outside normal 9am–6pm business hours, static forms result in massive abandonment. Adjust your numbers below to estimate recoverable pipeline value.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Inbound Visitors / Inquiries:</span>
                  <span className="text-white font-bold">{monthlyWebsiteVisitors.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="50000" 
                  step="1000" 
                  value={monthlyWebsiteVisitors} 
                  onChange={(e) => setMonthlyWebsiteVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">% Browsing Outside Regular Hours:</span>
                  <span className="text-white font-bold">{afterHoursVisitorPercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="80" 
                  step="5" 
                  value={afterHoursVisitorPercent} 
                  onChange={(e) => setAfterHoursVisitorPercent(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Average Deal / Client Value:</span>
                  <span className="text-white font-bold">AED {avgLeadContractValue.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="100000" 
                  step="2000" 
                  value={avgLeadContractValue} 
                  onChange={(e) => setAvgLeadContractValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Monthly Recovered Deal Value
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  +AED {recoveredMonthlyRevenue.toLocaleString()} <span className="text-xs font-sans text-white/50">/ month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">After-Hours Inquiries:</span>
                  <span className="text-white text-sm font-bold">~{recoveredLeadsWithAiChatbot} leads / mo</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Annual Estimated Lift:</span>
                  <span className="text-emerald-300 text-sm font-bold">AED {annualRecoveredRevenue.toLocaleString()} / yr</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Deploy Your WhatsApp &amp; AI Chatbot <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Implementation Timeline & Cost Variables ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
              Implementation Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight mb-6">
              Structured 2–3 Week Delivery Protocol
            </h2>
            <div className="space-y-4">
              {[
                { step: "Stage 1: Discovery & Architecture (Days 1–4)", text: "Mapping conversation logic, qualifying decision branches, and ingesting approved business knowledge." },
                { step: "Stage 2: API & Integration Setup (Days 5–10)", text: "Configuring Meta WhatsApp Business Platform credentials, web chat widgets, and bi-directional CRM endpoints." },
                { step: "Stage 3: Linguistic QA & Boundary Testing (Days 11–15)", text: "Rigorous testing of 100+ prompt edge-cases in Arabic and English to ensure strict adherence to company guidelines." },
                { step: "Stage 4: Live Rollout & Agent Training (Days 16–21)", text: "Production deployment, live human handover alerts verification, and team training on inbox management." }
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="text-xs font-bold text-emerald-400 font-mono mb-1">{s.step}</div>
                  <p className="text-xs text-white/70 font-light">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
              Transparent Factors
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight mb-6">
              What Determines Development Cost in the UAE?
            </h2>
            <p className="text-sm text-white/75 font-light leading-relaxed mb-6">
              Rather than charging arbitrary flat packages, chatbot development investments are determined by clear technical parameters:
            </p>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <strong className="text-white block mb-1">1. Number of Unique Conversational Workflows</strong>
                <span className="text-white/60 font-sans text-xs">Simple FAQ lookup vs multi-step qualification, quotation generation, and dynamic booking.</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <strong className="text-white block mb-1">2. CRM &amp; Database Connectors</strong>
                <span className="text-white/60 font-sans text-xs">Standard native CRM webhooks vs custom ERP logic, custom APIs, or inventory lookups.</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <strong className="text-white block mb-1">3. Monthly Messaging Volume Tiers</strong>
                <span className="text-white/60 font-sans text-xs">Meta Cloud API per-conversation utility and marketing rates based on your monthly dialogue count.</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <strong className="text-white block mb-1">4. Arabic Dialect &amp; Knowledge Complexity</strong>
                <span className="text-white/60 font-sans text-xs">Scope of uploaded documentation requiring semantic vector indexing and specialized phrasing fine-tuning.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Frequently Asked Questions (8 High-Value FAQs) ── */}
      <section className="py-20 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
              Practical Questions &amp; Answers
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-base md:text-lg font-serif cursor-pointer list-none flex justify-between items-center hover:text-emerald-300 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-2xl text-white/40 group-open:rotate-45 group-open:text-emerald-400 transition-transform ml-4 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-white/75 font-light leading-relaxed text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Call to Action ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block font-semibold">
            Deploy Official Conversational Automation
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Automate Your Customer Conversations.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Capture incoming leads in seconds, eliminate manual qualification overhead, and synchronize inquiries with your CRM 24/7.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Request Chatbot Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
