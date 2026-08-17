"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, MessageCircle, Bot, Zap, CheckCircle2, 
  ArrowRight, ShieldCheck, Globe, PhoneCall, HelpCircle, 
  Cpu, Building2, BarChart3, Clock, Layers, Users, RefreshCw
} from "lucide-react";
import Link from "next/link";

export default function WhatsAppAutomationGCC() {
  // Interactive Speed-to-Lead & WhatsApp Conversion Simulator State
  const [monthlyInboundInquiries, setMonthlyInboundInquiries] = useState(800);
  const [currentResponseTimeHours, setCurrentResponseTimeHours] = useState(4); // hours to first human reply
  const [averageDealSize, setAverageDealSize] = useState(8500); // AED

  // Calculations
  // Lead decay: In the UAE, answering within 60 seconds vs 4 hours results in ~4.5x higher conversion
  const currentLeadConversionRate = currentResponseTimeHours > 6 ? 1.5 : currentResponseTimeHours > 2 ? 3.0 : currentResponseTimeHours > 0.5 ? 5.5 : 9.0;
  const currentConvertedDeals = Math.round(monthlyInboundInquiries * (currentLeadConversionRate / 100));
  const currentMonthlyRevenue = currentConvertedDeals * averageDealSize;

  const automatedConversionRate = 12.5; // Sub-30s instant WhatsApp AI qualifying & booking
  const automatedConvertedDeals = Math.round(monthlyInboundInquiries * (automatedConversionRate / 100));
  const automatedMonthlyRevenue = automatedConvertedDeals * averageDealSize;
  const monthlyRevenueLift = Math.max(0, automatedMonthlyRevenue - currentMonthlyRevenue);
  const annualRevenueLift = monthlyRevenueLift * 12;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital WhatsApp Business Automation GCC UAE",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/whatsapp-automation-gcc",
    "telephone": "+971545866094",
    "priceRange": "AED 5,500 - AED 35,000 / setup",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "Saudi Arabia", "Qatar", "GCC"],
    "description": "Enterprise Meta WhatsApp Business Cloud API automation and conversational AI in Dubai, Sharjah, and the GCC. Sub-30 second speed-to-lead, bilingual Gulf Arabic/English NLP, multi-agent CRM synchronization, and automated sales booking."
  };

  const faqData = [
    {
      q: "What is the difference between the standard WhatsApp Business App and the official Meta Cloud API?",
      a: "The standard WhatsApp Business App is designed for single-user smartphones and is limited to simple away messages and manual replies. The official Meta WhatsApp Business Cloud API allows an enterprise to connect multiple human agents simultaneously, deploy autonomous AI conversational reasoning, integrate with company CRMs (HubSpot, Salesforce, Zoho), send automated transactional alerts, and handle thousands of concurrent conversations with zero risk of phone number banning."
    },
    {
      q: "How does sub-30-second speed-to-lead increase sales in Dubai and the GCC?",
      a: "In the UAE and GCC, over 85% of commercial and real estate inquiries happen on WhatsApp. Studies prove that leads contacted within 60 seconds convert at a 391% higher rate than leads contacted after 1 hour. When a buyer submits a form or ad lead, our AI initiates an instant, personalized WhatsApp conversation within seconds, answering questions and booking a meeting while the buyer's intent is at its peak."
    },
    {
      q: "Does the AI understand spoken voice notes and native Gulf / Khaleeji Arabic dialects?",
      a: "Yes! Our conversational models are trained specifically on Khaleeji and regional Gulf Arabic dialects (Emirati, Saudi, Qatari, Kuwaiti) as well as modern standard Arabic and English. The AI can transcribe incoming voice notes, understand the customer's intent, and reply intelligently via text or synthesized audio."
    },
    {
      q: "How does the AI hand off hot leads to our human sales team?",
      a: "The AI conducts preliminary qualification (asking for budget, timeline, required service, and property preferences). As soon as the prospect meets your qualified buyer criteria or explicitly requests a human specialist, the AI automatically assigns the chat to the on-duty sales rep in your CRM and pings their phone with an instant VIP alert."
    },
    {
      q: "Which CRMs and database platforms do you integrate with?",
      a: "We natively synchronize with HubSpot, Salesforce, Zoho CRM, Odoo, Pipedrive, LeadSquared, Microsoft Dynamics 365, Google Sheets, and custom SQL databases via secure Webhooks and REST APIs."
    },
    {
      q: "Can the AI send automated PDF brochures, floor plans, and price lists?",
      a: "Yes! The AI can dynamically retrieve and dispatch PDF brochures, price lists, video links, and location pins based on exactly what the customer asks for during the chat session."
    },
    {
      q: "Can we use our existing official landline or 05X mobile number for WhatsApp API?",
      a: "Yes. You can use your existing UAE toll-free number (800-XXX), landline (04 / 06 / 02), or corporate mobile number. We guide you through the official Meta Business Manager verification process to secure the coveted Green Checkmark badge."
    },
    {
      q: "What are the rules regarding WhatsApp Broadcast marketing and opt-in compliance?",
      a: "Under Meta's Business Policies and UAE telecommunications regulations, promotional broadcasts may only be sent to users who have explicitly opted in. We configure automated double opt-in checkboxes on your website and landing pages and program automated 'Unsubscribe / Stop' handlers to maintain high account health scores."
    },
    {
      q: "Can the WhatsApp AI process payments and order checkouts directly in the chat?",
      a: "Yes! We can integrate native WhatsApp Catalog and regional payment gateways (Stripe UAE, Tap, Telr, or Checkout.com) allowing customers to browse products, select quantities, and complete secure card payments directly within the WhatsApp chat window."
    },
    {
      q: "What is the typical setup timeline for an enterprise WhatsApp automation workflow?",
      a: "Standard Meta API registration, AI knowledge base training, and CRM synchronization are completed within 2 to 3 weeks. Complex multi-agent routing or bespoke ERP payment workflows typically take 4 to 6 weeks."
    },
    {
      q: "How does Asif Digital's WhatsApp AI compare to cheap rule-based chatbots?",
      a: "Old-fashioned chatbots force users to press buttons (1 for Sales, 2 for Support) and break immediately when a customer types a natural sentence. Asif Digital deploys reasoning LLM agents that understand fluid, conversational context, handle interruptions, and negotiate meeting times naturally."
    },
    {
      q: "How do we get started with an automated WhatsApp workflow consultation?",
      a: "Contact our conversational AI desk on +971 54 586 6094 or submit an inquiry on our contact page. We will configure an interactive live demo on your smartphone showing how our AI handles customer inquiries in real-time."
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

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Deploy Enterprise WhatsApp Business Cloud API Automation in Dubai",
    "description": "The 5-stage deployment protocol for implementing autonomous WhatsApp sales and customer support in the UAE.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Meta Business Manager & API Verification",
        "text": "We verify your UAE business license, configure Meta Cloud API tokens, and register your official phone number."
      },
      {
        "@type": "HowToStep",
        "name": "Knowledge Base Ingestion & Dialect Tuning",
        "text": "We train the conversational AI on your company services, pricing, FAQ databases, and Gulf Arabic dialects."
      },
      {
        "@type": "HowToStep",
        "name": "CRM & Calendar Integration",
        "text": "We configure bi-directional API connectors between WhatsApp, your CRM (HubSpot/Zoho), and sales calendars."
      },
      {
        "@type": "HowToStep",
        "name": "Multi-Agent Routing & Human Handoff QA",
        "text": "We stress-test automated qualifying questions, PDF attachment dispatch, and live sales rep escalation rules."
      },
      {
        "@type": "HowToStep",
        "name": "Live Go-Live & 24/7 Analytics Telemetry",
        "text": "We launch the live system, monitor response latency, and provide real-time conversion dashboards."
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ── 1. Hero Section ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" /> Meta WhatsApp Cloud API &bull; GCC &bull; Dubai & Sharjah &bull; UAE
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            WhatsApp Business <br />
            <span className="italic text-white/50 font-normal">Automation GCC.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            In the UAE, slow WhatsApp replies kill deals. We deploy autonomous Meta Cloud API AI agents that qualify incoming leads in under 30 seconds, speak fluent Khaleeji Arabic &amp; English, answer technical questions, send PDF brochures, and sync directly with your CRM 24/7.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Test Live WhatsApp Demo <ArrowRight className="w-4 h-4" />
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

      {/* ── 2. Performance Metrics Ribbon ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "sub-30s", label: "Speed to Lead Response", sub: "24/7/365 Instant Engagement" },
            { metric: "Bilingual", label: "Khaleeji Arabic & English", sub: "Text & Voice Note Understanding" },
            { metric: "+390%", label: "Lead Conversion Lift", sub: "Zero Unanswered Inquiries" },
            { metric: "100%", label: "Meta Cloud API Compliant", sub: "Zero Phone Ban Risk" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive WhatsApp Speed-to-Lead Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Conversion Decay Simulator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Calculate the Impact of Instant Speed-to-Lead
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              When a prospective buyer contacts your business on WhatsApp, response latency directly determines whether you win the deal or they message your competitor. Adjust your numbers below to see the revenue difference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Inbound Inquiries (All Channels):</span>
                  <span className="text-white font-bold">{monthlyInboundInquiries} leads / month</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="5000" 
                  step="50" 
                  value={monthlyInboundInquiries} 
                  onChange={(e) => setMonthlyInboundInquiries(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Current Average First Response Delay:</span>
                  <span className="text-white font-bold">{currentResponseTimeHours} hours</span>
                </div>
                <input 
                  type="range" 
                  min="0.25" 
                  max="12" 
                  step="0.25" 
                  value={currentResponseTimeHours} 
                  onChange={(e) => setCurrentResponseTimeHours(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Average Deal / Customer Lifetime Value:</span>
                  <span className="text-white font-bold">AED {averageDealSize.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="50000" 
                  step="1000" 
                  value={averageDealSize} 
                  onChange={(e) => setAverageDealSize(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Monthly Revenue Expansion
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  +AED {monthlyRevenueLift.toLocaleString()} <span className="text-xs font-sans text-white/50">/ month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Current Closed Deals:</span>
                  <span className="text-white text-sm font-bold">{currentConvertedDeals} deals / mo</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">With 30s WhatsApp AI:</span>
                  <span className="text-emerald-300 text-sm font-bold">{automatedConvertedDeals} deals / mo</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-white/60 block mb-3 font-light">
                  Annual Growth Potential: <strong className="text-white font-bold">+AED {annualRevenueLift.toLocaleString()} / year</strong>
                </span>
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Schedule Your WhatsApp AI Build <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Strategic Comparison Benchmark ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Technology Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Why Enterprise Meta Cloud API Beats Phone-Based Chatbots
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">WhatsApp Architecture</th>
                <th className="py-4 px-4 text-white/40">Manual Staff Handset</th>
                <th className="py-4 px-4 text-white/40">Basic WhatsApp App</th>
                <th className="py-4 px-4 text-white/40">Cheap Button Chatbot</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Autonomous AI Swarm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">First Response Speed</td>
                <td className="py-5 px-4 text-red-400">1 to 8 hours (business hours)</td>
                <td className="py-5 px-4 text-yellow-400">Static away message</td>
                <td className="py-5 px-4 text-yellow-400">Instant button tree</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Sub-30s Conversational Reasoning (24/7)</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Arabic &amp; Dialect Support</td>
                <td className="py-5 px-4 text-white">Dependent on staff</td>
                <td className="py-5 px-4 text-red-400">None</td>
                <td className="py-5 px-4 text-red-400">Broken menu clicks</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native Khaleeji Arabic Text &amp; Voice Notes</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Multi-Agent Human Handoff</td>
                <td className="py-5 px-4 text-red-400">1 physical phone only</td>
                <td className="py-5 px-4 text-yellow-400">Max 4 linked devices</td>
                <td className="py-5 px-4 text-yellow-400">Basic ticket queue</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Unlimited Multi-Agent Shared Inbox &amp; CRM Routing</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">CRM &amp; Database Sync</td>
                <td className="py-5 px-4 text-red-400">Manual copy-pasting</td>
                <td className="py-5 px-4 text-red-400">No integration</td>
                <td className="py-5 px-4 text-yellow-400">Basic Zapier hook</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">2-Way Live Sync (HubSpot, Salesforce, Zoho, ERP)</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Phone Ban Protection</td>
                <td className="py-5 px-4 text-red-400">High risk on broadcasts</td>
                <td className="py-5 px-4 text-red-400">High ban risk</td>
                <td className="py-5 px-4 text-yellow-400">Unofficial scraping risk</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">100% Official Meta Cloud API Green Badge Verified</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full WhatsApp Automation Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Complete Conversational Ecosystem
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Our WhatsApp Automation Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "Sub-30s Speed-to-Lead Ingestion",
                desc: "Instant engagement for inbound ad leads (Facebook, Instagram, Google, Website forms) qualifying budget, timeline, and requirements before handoff."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "Khaleeji & Gulf Arabic Conversational NLP",
                desc: "Fluid understanding of Emirati, Saudi, and regional Gulf slang, spelling variations, and audio voice note transcriptions."
              },
              {
                icon: <Users className="w-6 h-6 text-emerald-400" />,
                title: "Multi-Agent Team Routing & Handoff",
                desc: "Seamlessly routes qualified VIP conversations to specific sales managers or support agents based on department, territory, or language."
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
                title: "2-Way CRM & ERP Synchronization",
                desc: "Automatically logs all chat transcripts, contact details, tags, and meeting appointments directly into HubSpot, Salesforce, or Zoho."
              },
              {
                icon: <Layers className="w-6 h-6 text-emerald-400" />,
                title: "Automated Collateral & PDF Dispatch",
                desc: "Sends personalized product catalogs, PDF brochures, floor plans, and video links in response to specific customer inquiries in real-time."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "Official Meta Cloud API Verification",
                desc: "Complete end-to-end setup of official Meta developer credentials, message template approvals, and Green Checkmark verification."
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors">
                <div className="mb-5">{f.icon}</div>
                <h3 className="text-xl font-serif text-white mb-3">{f.title}</h3>
                <p className="text-white/70 font-light text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Step-by-Step Delivery Roadmap ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Implementation Lifecycle
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage WhatsApp Deployment Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Meta Setup", text: "We verify your Meta Business Manager, provision Cloud API tokens, and register your corporate number." },
            { step: "02", title: "Knowledge Ingestion", text: "We train the AI model on your exact product catalogs, FAQs, pricing, and qualification logic." },
            { step: "03", title: "CRM & Calendar Sync", text: "We establish live 2-way connectors between WhatsApp, your CRM, and sales scheduling tools." },
            { step: "04", title: "Sandbox Testing", text: "We stress-test Arabic/English conversational flows, voice note handling, and human handoff triggers." },
            { step: "05", title: "Live Launch", text: "We activate the live WhatsApp bot across your ads and website, monitoring response metrics 24/7." }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-3xl font-serif text-emerald-400 mb-4 font-bold">{s.step}</div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions (12 FAQs) ── */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
              Conversational AI Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE enterprise leaders need to know about official WhatsApp automation, Meta Cloud API, and CRM integration.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-lg md:text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-emerald-300 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-2xl text-white/40 group-open:rotate-45 group-open:text-emerald-400 transition-transform ml-4 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-white/75 font-light leading-relaxed text-sm md:text-base">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Call to Action ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block font-semibold">
            Never Miss Another Qualified Lead
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Automate Your WhatsApp Sales Channel.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Respond to every inquiry in under 30 seconds, qualify buyers automatically, and book more meetings directly into your calendar. Experience a live demo today.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Book WhatsApp AI Consultation <ArrowRight className="w-4 h-4" />
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
