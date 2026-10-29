"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot, MessageSquare, Sparkles, Clock, CheckCircle2,
  ArrowRight, ShieldCheck, Zap, Globe, PhoneCall,
  HelpCircle, Building2, BarChart3, Users, RefreshCw,
  Cpu, Send, Database, Layers, Check, AlertCircle, FileText, Calendar
} from "lucide-react";
import Link from "next/link";

export default function AiChatbotsDubai() {
  // Operational Inquiry & Triage Capacity Estimator State
  const [monthlyInquiries, setMonthlyInquiries] = useState(1500);
  const [afterHoursPercent, setAfterHoursPercent] = useState(50); // % of inquiries outside 9am-6pm
  const [minsPerInquiry, setMinsPerInquiry] = useState(10); // Average manual minutes spent per qualification

  // Objective operational calculations (No speculative revenue guarantees)
  const afterHoursInquiries = Math.round(monthlyInquiries * (afterHoursPercent / 100));
  const monthlyHoursSaved = Math.round((monthlyInquiries * 0.70 * minsPerInquiry) / 60); // Assuming ~70% routine qualification/FAQ triage
  const annualHoursSaved = monthlyHoursSaved * 12;

  const faqData = [
    {
      q: "What is the difference between an official WhatsApp Cloud API chatbot and standard web scrapers?",
      a: "Standard third-party chatbot tools often rely on unofficial web scraping or linked desktop sessions, which violate Meta terms of service and frequently lead to permanent phone number bans. We build exclusively on the official WhatsApp Business Platform (Cloud API) hosted on enterprise infrastructure. This guarantees compliant messaging, high delivery reliability, multi-agent inbox capabilities, and eligibility for official Meta business verification."
    },
    {
      q: "How does the chatbot qualify incoming leads before alerting our team?",
      a: "When a prospect messages your WhatsApp number from a website link, Google Ad, or property portal, the chatbot engages in structured natural dialogue. It collects essential qualification criteria—such as project requirements, community preferences, budget parameters, and contact details—and logs the record into your CRM before notifying an on-duty team member."
    },
    {
      q: "How does live human handover work during or after business hours?",
      a: "When an inquiry reaches a high-intent threshold (such as an enterprise budget or an urgent viewing request) or when a prospect explicitly asks to speak with a person, the system triggers an immediate alert via WhatsApp, mobile notification, or CRM webhook. Your on-duty sales rep can claim the conversation and reply directly inside the same WhatsApp thread with the complete dialogue transcript intact."
    },
    {
      q: "Does the system support Arabic and Gulf (Khaleeji) conversational expressions?",
      a: "Yes. Our conversational models are configured to understand Modern Standard Arabic (MSA), common Gulf expressions, and Arabizi (Arabic written in Latin characters and numerals). When users switch between English and Arabic mid-sentence, the chatbot comprehends the context and responds appropriately with proper Right-to-Left (RTL) formatting."
    },
    {
      q: "Which CRMs, databases, and calendar tools can be integrated?",
      a: "We engineer bi-directional connections with HubSpot, Zoho CRM, Salesforce, Odoo ERP, Google Calendar, Calendly, Microsoft Bookings, Google Sheets, and custom REST API webhooks. New contact profiles, qualification tags, appointment confirmations, and conversation summaries are synchronized automatically."
    },
    {
      q: "How are Meta messaging fees billed?",
      a: "Meta charges for WhatsApp Business Platform messaging on a conversation basis within 24-hour windows, categorized by conversation type (Service, Utility, Authentication, or Marketing). These message fees are billed directly to your own Meta Business Manager payment method without agency markups. Our agency fee covers technical architecture, conversational flow engineering, API integrations, and maintenance."
    },
    {
      q: "What factors determine the cost of custom chatbot development?",
      a: "Development investment depends on four objective technical factors: the number of distinct conversational workflows, the depth of CRM/ERP database integrations, knowledge-base indexing complexity (e.g. parsing hundreds of property or technical PDFs), and required custom logic. We provide a fixed-scope proposal after an initial discovery audit."
    },
    {
      q: "How are customer data and conversational records protected under UAE law?",
      a: "All message data is transmitted over TLS-encrypted connections and processed in alignment with UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL). Client conversation data, CRM customer records, and internal documents are never utilized to train public artificial intelligence models."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      {/* ── 1. Hero Section ── */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="text-white/90 text-xs font-mono uppercase tracking-[0.25em] mb-4 block flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-400" /> Official Meta Cloud API &bull; UAE Business Automation &bull; Dubai &amp; GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-6">
            WhatsApp Chatbot Development &amp; <br />
            <span className="italic text-white/50 font-normal">Conversational AI in Dubai.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-8 max-w-3xl">
            Asif Digital engineers official Meta WhatsApp Cloud API automation, automated bilingual lead qualification, and CRM integrations for UAE companies. Eliminate enquiry response delay, answer customer questions 24/7, and route qualified buyers to your sales team automatically.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/free-growth-audit"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request WhatsApp &amp; Chatbot Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
            <Link
              href="/contact"
              className="text-white/60 hover:text-white px-4 py-4 font-mono uppercase tracking-widest text-xs transition-colors"
            >
              Contact Scope &rarr;
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Direct Answer Block (Core Capabilities) ── */}
      <section className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
        <div className="border border-emerald-500/20 bg-emerald-950/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm uppercase tracking-widest font-mono text-emerald-400 font-bold">
              What We Engineer for UAE Commercial Teams
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-white/80 font-light">
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Official WhatsApp Cloud API
              </div>
              <p className="text-xs text-white/60">Built strictly on Meta's official Cloud API infrastructure with direct webhook callbacks and multi-agent support.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Automated Speed-to-Lead
              </div>
              <p className="text-xs text-white/60">Instant conversational acknowledgement under normal network conditions to engage prospects while interest is highest.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Document Grounding (RAG)
              </div>
              <p className="text-xs text-white/60">Grounding chatbot answers strictly in your approved brochures, price sheets, and FAQs to prevent inaccurate statements.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Bi-Directional CRM Sync
              </div>
              <p className="text-xs text-white/60">Automatic contact logging, deal creation, and conversation history updates in HubSpot, Zoho CRM, Salesforce, or Odoo.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Bilingual Arabic &amp; English
              </div>
              <p className="text-xs text-white/60">Natural comprehension of Modern Standard Arabic, common Gulf phrasing, Arabizi, and English with dynamic RTL formatting.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Live Human Agent Handover
              </div>
              <p className="text-xs text-white/60">Immediate alert to on-duty sales representatives with complete context when high-intent criteria are reached.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WhatsApp Chatbot Development Dubai (Primary Hub) ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block">
              Primary UAE Business Communication Channel
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight leading-tight">
              WhatsApp Chatbot Development in Dubai
            </h2>
            <p className="text-white/75 font-light text-base leading-relaxed">
              In Dubai and the wider UAE, WhatsApp is the dominant channel for consumer enquiries, real estate viewings, and commercial B2B requests. Relying solely on static email contact forms creates response friction that drives prospects to competitors. We build compliant, production-grade WhatsApp chatbots engineered for prompt qualification and operational handover.
            </p>
            <div className="space-y-3 pt-2">
              {[
                "Official WhatsApp Business Platform: Direct Cloud API connection with policy-compliant messaging.",
                "Multi-Agent Support Inbox: Route incoming WhatsApp conversations across multiple sales team members.",
                "Meta Verification Guidance: Technical guidance through Meta Business Manager documentation to support Cloud API onboarding and messaging-tier eligibility (subject to Meta review).",
                "Zero Personal Device Dependency: Operates on cloud server webhooks without needing an office smartphone kept on."
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
                <span className="text-emerald-400 block font-bold">1. Inbound Ingestion (Automated)</span>
                <p className="text-white/70 font-sans text-xs">Buyer sends message from WhatsApp ad, QR code, website click, or property portal.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="text-emerald-400 block font-bold">2. Conversational Qualification</span>
                <p className="text-white/70 font-sans text-xs">Bot collects project scope, budget parameters, and timeline through natural dialogue.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="text-emerald-400 block font-bold">3. CRM Record &amp; Pipeline Assignment</span>
                <p className="text-white/70 font-sans text-xs">Contact profile created in HubSpot/Zoho with tagged intent, transcripts, and source attribution.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                <span className="text-emerald-300 block font-bold">4. Live Agent Notification &amp; Booking</span>
                <p className="text-white/80 font-sans text-xs">Sales rep alerted on mobile with pre-scheduled meeting confirmed in calendar or direct takeover.</p>
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
            Beyond WhatsApp, we deploy custom AI conversational widgets embedded directly on your website or portal. These assistants use Retrieval-Augmented Generation (RAG) to reference your uploaded service guides and pricing documents with zero ungrounded responses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <Bot className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">24/7 Virtual Inquiry Intake</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Engages website visitors outside of business hours, answering detailed operational questions and capturing verified contact details.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <Clock className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">In-Chat Calendar Booking</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Integrates directly with Calendly, Google Calendar, or Microsoft Bookings to schedule consultations within the chat window without external redirects.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">Strict Document Grounding</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Trained strictly on your verified brochures, PDFs, and FAQ repositories. The AI declines to answer out-of-scope enquiries or invent unapproved terms.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Bilingual Arabic & English Capabilities ── */}
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
              When an inquiry involves complex negotiations, nuanced contract terms, or an explicit request to speak with a staff member, the AI initiates a clean handoff:
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs font-mono">
              <div className="text-white/90">&bull; Captures caller phone &amp; verified email address</div>
              <div className="text-white/90">&bull; Transmits complete conversation summary to your CRM</div>
              <div className="text-white/90">&bull; Sends immediate WhatsApp / mobile alert to on-duty team</div>
              <div className="text-white/90">&bull; Allows sales agent to reply directly into the same thread</div>
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
            A chatbot operating in isolation creates disconnected data silos. We integrate conversational endpoints directly with your core customer databases and business platforms.
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
          <p className="text-white/70 font-light text-base mt-4 leading-relaxed">
            Every sector handles distinct customer journeys. We tailor qualification logic, reference documents, and routing rules around actual commercial workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-serif text-white">Real Estate &amp; Brokerages</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Auto-qualifying buyers by community and budget, distributing off-plan PDF brochures via WhatsApp, and scheduling agent property viewings.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <Users className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-serif text-white">Clinics &amp; Healthcare</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Triaging doctor specialties and branch availability, answering coverage FAQs, and confirming clinical consultation appointments.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <Layers className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-serif text-white">B2B &amp; Professional Services</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Screening legal, corporate tax, audit, and logistics enquiries before routing qualified briefs to senior practice partners.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-serif text-white">Trading &amp; Commercial Hubs</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Capturing Request for Quotation (RFQ) specs, sharing digital product catalogs, and automating supplier inquiry intake.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. Operational Triage & Capacity Estimator (Factual, No Speculative Guarantees) ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Operational Planning Tool
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Estimate Your Inquiry Handling Capacity
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Assess how much administrative time your team spends manually answering repetitive FAQs and qualifying incoming enquiries. Use the sliders below to calculate potential operational hours automated.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Estimated Monthly Inquiries:</span>
                  <span className="text-white font-bold">{monthlyInquiries.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="10000"
                  step="100"
                  value={monthlyInquiries}
                  onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">% Received Outside Business Hours:</span>
                  <span className="text-white font-bold">{afterHoursPercent}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={afterHoursPercent}
                  onChange={(e) => setAfterHoursPercent(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Avg Manual Minutes Spent per Routine Chat:</span>
                  <span className="text-white font-bold">{minsPerInquiry} minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={minsPerInquiry}
                  onChange={(e) => setMinsPerInquiry(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Monthly Administrative Hours Automated
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  ~{monthlyHoursSaved} hours <span className="text-xs font-sans text-white/50">/ month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">After-Hours Inquiries Addressed:</span>
                  <span className="text-white text-sm font-bold">~{afterHoursInquiries} chats / mo</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Annual Operational Time Saved:</span>
                  <span className="text-emerald-300 text-sm font-bold">~{annualHoursSaved} hours / yr</span>
                </div>
              </div>

              <p className="text-[11px] text-white/50 font-light leading-relaxed pt-2">
                *Illustrative operational modelling assumption based on approximately 70% of routine inbound enquiries being suitable for automated resolution, with the remaining 30% escalating to staff. This is an exploratory estimate, not a measured automation rate or guaranteed amount of time saved.
              </p>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/free-growth-audit"
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Request Technical Automation Audit <ArrowRight className="w-4 h-4" />
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
                { step: "Stage 1: Discovery & Architecture (Days 1–4)", text: "Mapping conversational logic, qualifying decision branches, and ingesting approved business knowledge." },
                { step: "Stage 2: API & Integration Setup (Days 5–10)", text: "Configuring Meta WhatsApp Business Platform credentials, web chat widgets, and bi-directional CRM endpoints." },
                { step: "Stage 3: Linguistic QA & Boundary Testing (Days 11–15)", text: "Testing prompt edge-cases in Arabic and English to ensure strict adherence to company guidelines and zero hallucinations." },
                { step: "Stage 4: Live Rollout & Agent Training (Days 16–21)", text: "Production deployment, live human handover verification, and sales team training on multi-agent inbox management." }
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
                <span className="text-white/60 font-sans text-xs">Simple FAQ lookup vs multi-step qualification, dynamic quotation routing, and calendar booking.</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <strong className="text-white block mb-1">2. CRM &amp; Database Connectors</strong>
                <span className="text-white/60 font-sans text-xs">Standard native CRM webhooks vs custom ERP endpoints, bespoke APIs, or live property inventory lookups.</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <strong className="text-white block mb-1">3. Monthly Messaging Volume Tiers</strong>
                <span className="text-white/60 font-sans text-xs">Applicable Meta Cloud API message-category charges (utility, marketing, authentication, or service) billed directly by Meta based on volume, separate from implementation.</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <strong className="text-white block mb-1">4. Arabic Dialect &amp; Knowledge Complexity</strong>
                <span className="text-white/60 font-sans text-xs">Scope of uploaded documentation requiring semantic vector indexing and specialized phrasing fine-tuning.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Operational Demarcation & Scope Boundaries ── */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-4 h-4" /> Client Accounts &amp; Direct Subscriptions
            </div>
            <h3 className="text-lg font-serif text-white">What Your Organization Holds Directly</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              To guarantee complete ownership and compliance with Meta platform policies, your organization maintains direct ownership of foundational accounts:
            </p>
            <ul className="space-y-2 text-xs text-white/75 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">&bull;</span>
                <span><strong>Meta Business Manager:</strong> Verified UAE business account holding your WhatsApp Business Account (WABA).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">&bull;</span>
                <span><strong>Dedicated Phone Number:</strong> A dedicated mobile or landline number (new or an eligible existing business number unlinked from mobile WhatsApp apps).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">&bull;</span>
                <span><strong>Direct Meta Messaging Fees:</strong> Official Meta message-category rates (utility, marketing, service) billed directly to your payment method by Meta.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">&bull;</span>
                <span><strong>LLM API Credits:</strong> Model usage (OpenAI, Anthropic, or Azure) billed to your cloud account to ensure zero markup.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <Cpu className="w-4 h-4" /> Asif Digital Deliverables &amp; Engineering
            </div>
            <h3 className="text-lg font-serif text-white">What Asif Digital Architects &amp; Maintains</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              We engineer the complete backend middleware, conversation flows, and data integration layer that transforms raw APIs into an operational asset:
            </p>
            <ul className="space-y-2 text-xs text-white/75 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">&bull;</span>
                <span><strong>Webhook Middleware &amp; Session Engine:</strong> Cloud webhook listeners handling incoming messages, state memory, and 24-hr session windows.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">&bull;</span>
                <span><strong>RAG Knowledge Indexing:</strong> Vector embeddings generated from your verified service docs, PDFs, and price lists.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">&bull;</span>
                <span><strong>Bi-Directional CRM Sync:</strong> Instant contact creation, pipeline stage updates, and conversation transcripts in HubSpot, Zoho, or Odoo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">&bull;</span>
                <span><strong>Human Escalation Triggers:</strong> Automated alerts sent to on-duty sales agents via WhatsApp/CRM when high-intent thresholds are met.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Client Preparation Checklist ── */}
        <div className="mt-8 p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <FileText className="w-4 h-4" /> Onboarding Checklist
          </div>
          <h3 className="text-xl font-serif text-white">What You Need to Get Started</h3>
          <p className="text-sm text-white/70 font-light leading-relaxed max-w-3xl">
            To ensure rapid deployment within our standard 2–3 week timeline, we guide your team through assembling four straightforward assets:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs font-mono">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-emerald-400 block font-bold">1. Trade License</span>
              <p className="text-white/60 font-sans text-xs">Standard UAE commercial license document required for official Meta Business Manager verification.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-emerald-400 block font-bold">2. Dedicated Phone Number</span>
              <p className="text-white/60 font-sans text-xs">A new number or an eligible existing business number that can be unlinked from standard mobile WhatsApp apps, subject to Meta migration requirements.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-emerald-400 block font-bold">3. Reference Materials</span>
              <p className="text-white/60 font-sans text-xs">Approved service brochures, price lists, or FAQs for vector embedding knowledge indexing.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-emerald-400 block font-bold">4. CRM Credentials</span>
              <p className="text-white/60 font-sans text-xs">API access or webhook permissions for your destination CRM (HubSpot, Zoho, Salesforce, or Sheets).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Frequently Asked Questions ── */}
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
            Eliminate enquiry response delay, automate routine qualification, and synchronize WhatsApp communications with your CRM 24/7.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              href="/free-growth-audit"
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Request Free Bot &amp; Growth Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
            <Link
              href="/contact"
              className="border border-white/10 text-white/70 hover:text-white px-8 py-5 rounded-full font-mono uppercase tracking-widest text-xs transition-colors"
            >
              Custom Architecture RFP &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── 12. Related Automation & Conversational Solutions Cluster ── */}
      <section className="py-12 border-t border-white/5 bg-black/40 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Conversational &amp; Automation Architecture Hub
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/services/whatsapp-automation-gcc" className="hover:text-white transition-colors text-emerald-400 font-medium">WhatsApp Automation GCC</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate/whatsapp-ai-automation" className="hover:text-white transition-colors">Real Estate WhatsApp AI</Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-automation-agency-dubai" className="hover:text-white transition-colors">Enterprise AI Automation Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/workflow-automation-uae" className="hover:text-white transition-colors">Workflow Automation UAE</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate-crm-dubai" className="hover:text-white transition-colors">Dubai Real Estate CRM</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
