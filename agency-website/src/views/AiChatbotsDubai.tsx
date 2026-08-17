"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, MessageSquare, Sparkles, Clock, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Globe, PhoneCall, 
  HelpCircle, Building2, BarChart3, Users, RefreshCw
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
  
  const recoveredLeadsWithAiChatbot = Math.round(afterHoursVisitors * 0.042); // 4.2% conversion with instant 24/7 conversational AI
  const recoveredMonthlyRevenue = Math.round(recoveredLeadsWithAiChatbot * avgLeadContractValue * 0.15);
  const annualRecoveredRevenue = recoveredMonthlyRevenue * 12;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital AI Chatbots Agency Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/ai-chatbots-dubai",
    "telephone": "+971545866094",
    "priceRange": "AED 6,000 - AED 38,000 / setup",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "Enterprise Conversational AI Chatbots and Omnichannel Virtual Assistants in Dubai and Sharjah. Native Khaleeji Arabic & English NLP, 24/7 after-hours lead qualification, automated meeting booking, and live agent handoff."
  };

  const faqData = [
    {
      q: "What is the difference between an AI Chatbot and an old-fashioned rule-based chatbot?",
      a: "Old-fashioned rule-based chatbots rely on static decision trees and force users to click rigid buttons ('Press 1 for Sales'). If a user asks a complex or natural question, the chatbot fails and says 'Sorry, I don't understand'. Our Generative AI Chatbots understand natural conversational language, typos, slang, and context in both English and Arabic, answering detailed technical questions from your knowledge base and guiding prospects through natural sales conversations."
    },
    {
      q: "How does 24/7 after-hours lead capture increase revenue in the UAE?",
      a: "Over 50% of website visits in the UAE occur during evenings, weekends, and public holidays when human sales teams are offline. If a prospective buyer cannot get instant answers, they bounce and visit a competitor. Our conversational AI engages visitors immediately at 11 PM or during Friday prayers, answers their questions, captures their verified contact details, and books a call directly on your team's calendar."
    },
    {
      q: "Does the AI Chatbot understand Gulf Arabic (Khaleeji) and informal Arabic spelling?",
      a: "Yes! Our language models are trained on regional Gulf Arabic dialects (Emirati, Saudi, Kuwaiti, Qatari) as well as Arabizi (Arabic written in English letters with numbers like 3, 7, 5). The chatbot responds naturally in the user's preferred language and tone."
    },
    {
      q: "How does the chatbot know our specific company policies, services, and pricing?",
      a: "We train the AI model on your exact company documentation: service brochures, pricing sheets, technical specifications, and FAQ databases using Retrieval-Augmented Generation (RAG). The AI is strictly bounded to only state verified facts about your business, preventing fabricated answers."
    },
    {
      q: "Can the chatbot hand over conversations to human agents in real-time?",
      a: "Yes! When a prospect asks to speak with a human or reaches a high-intent VIP threshold (e.g. enterprise project budget), the chatbot alerts your on-duty team via WhatsApp or CRM and transfers the live chat window to a human agent seamlessly with the full conversation history."
    },
    {
      q: "Can we deploy the same AI chatbot across Website, WhatsApp, and Instagram?",
      a: "Yes! We build omnichannel conversational backends where the same intelligent knowledge base powers your Website live chat widget, official WhatsApp Business API number, Instagram DMs, and Facebook Messenger simultaneously."
    },
    {
      q: "Can the AI Chatbot book consultation meetings directly into Google Calendar or Outlook?",
      a: "Yes. The AI connects with Calendly, HubSpot Meetings, Microsoft Bookings, or Google Calendar, checking real-time availability and confirming meetings within the chat interface without sending external links."
    },
    {
      q: "How are customer contact details and conversation transcripts stored?",
      a: "Every lead captured by the chatbot (name, email, phone, company, project budget, chat transcript) is automatically pushed to your CRM (HubSpot, Salesforce, Zoho, or Google Sheets) in real-time."
    },
    {
      q: "What security measures prevent the chatbot from leaking internal data?",
      a: "We implement multi-layered prompt security guards that prevent prompt injection attacks, restrict the AI from answering out-of-scope political or competitor questions, and ensure user personal data is encrypted in compliance with UAE Federal Decree-Law No. 45 on Data Protection."
    },
    {
      q: "What is the typical setup timeline for an AI Chatbot in Dubai?",
      a: "A custom-trained website and WhatsApp AI chatbot typically launches in 2 to 3 weeks, including document ingestion, Arabic dialect tuning, CRM syncing, and rigorous edge-case testing."
    },
    {
      q: "How does Asif Digital's AI Chatbot compare to cheap subscription widgets?",
      a: "Cheap SaaS widgets charge monthly per-message fees, leak customer data to overseas servers, and offer zero custom engineering. Asif Digital builds custom enterprise conversational architectures on local UAE cloud servers with zero hallucination guardrails and full CRM automation."
    },
    {
      q: "How do we test a live AI Chatbot demo for our business?",
      a: "Contact our AI conversational desk on +971 54 586 6094 or submit an inquiry on our contact page. We will configure a live interactive chatbot prototype trained on your website data within 24 hours."
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
    "name": "How to Deploy an Enterprise Conversational AI Chatbot in Dubai",
    "description": "The 5-stage deployment protocol for implementing 24/7 conversational AI virtual assistants in the UAE.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Knowledge Base & Policy Ingestion",
        "text": "We ingest your service catalogs, pricing guides, and technical FAQs into an encrypted semantic vector database."
      },
      {
        "@type": "HowToStep",
        "name": "Bilingual Persona & Dialect Fine-Tuning",
        "text": "We configure the AI's brand voice, tone, and bilingual English/Gulf Arabic reasoning rules."
      },
      {
        "@type": "HowToStep",
        "name": "CRM & Calendar API Integration",
        "text": "We establish live connectors to HubSpot, Salesforce, Zoho, and Google Calendar for instant lead routing."
      },
      {
        "@type": "HowToStep",
        "name": "Live Human Handoff & Edge-Case QA",
        "text": "We test 150+ user inquiry paths to verify zero hallucinations, correct meeting scheduling, and live agent alerts."
      },
      {
        "@type": "HowToStep",
        "name": "Omnichannel Deployment & Monitoring",
        "text": "We embed the chat widget on your website and connect WhatsApp/Instagram channels with 24/7 analytics tracking."
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
            <Bot className="w-4 h-4 text-emerald-400" /> Conversational AI &bull; 24/7 Virtual Assistants &bull; Dubai & GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            AI Chatbots <br />
            <span className="italic text-white/50 font-normal">Agency Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Never let an evening or weekend lead slip away. We build intelligent, bilingual AI chatbots and virtual sales assistants that converse fluently in English and Gulf Arabic, qualify prospective buyers, answer technical questions, and book meetings directly into your calendar 24/7.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Test Live Chatbot Prototype <ArrowRight className="w-4 h-4" />
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
            { metric: "24/7/365", label: "Zero Downtime Response", sub: "Capture Evening & Weekend Leads" },
            { metric: "Bilingual", label: "Khaleeji Arabic & English", sub: "Deep Dialect Understanding" },
            { metric: "1-Click", label: "Live Human Agent Handoff", sub: "Instant WhatsApp & CRM Alerts" },
            { metric: "100%", label: "Zero Hallucination Guardrails", sub: "Strict Document Grounding" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive After-Hours Lead Recovery Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Revenue Recovery Calculator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Simulate After-Hours Lead Recovery Revenue
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              When prospective clients browse your website outside of business hours, static forms result in massive drop-off. Adjust your monthly traffic to see how 24/7 conversational engagement captures hidden pipeline revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Website Traffic:</span>
                  <span className="text-white font-bold">{monthlyWebsiteVisitors.toLocaleString()} visitors</span>
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
                  <span className="text-white/70">% Browsing After-Hours &amp; Weekends:</span>
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
                  <span className="text-white/40 block mb-1">After-Hours Leads:</span>
                  <span className="text-white text-sm font-bold">~{recoveredLeadsWithAiChatbot} inquiries / mo</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Annual Pipeline Lift:</span>
                  <span className="text-emerald-300 text-sm font-bold">AED {annualRecoveredRevenue.toLocaleString()} / yr</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Deploy Your 24/7 AI Chatbot <ArrowRight className="w-4 h-4" />
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
            How Intelligent Conversational AI Outperforms Basic Chatbots
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Chatbot Architecture</th>
                <th className="py-4 px-4 text-white/40">Static Contact Form</th>
                <th className="py-4 px-4 text-white/40">Rule-Based Button Chatbot</th>
                <th className="py-4 px-4 text-white/40">Offshore Outsourced Chat</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Conversational AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Natural Conversation Flow</td>
                <td className="py-5 px-4 text-red-400">None (passive form)</td>
                <td className="py-5 px-4 text-red-400">Rigid button tree only</td>
                <td className="py-5 px-4 text-yellow-400">Scripted human agent</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Fluid LLM Reasoning &amp; Semantic Understanding</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Khaleeji Arabic Fluency</td>
                <td className="py-5 px-4 text-red-400">Static text</td>
                <td className="py-5 px-4 text-red-400">Broken menu options</td>
                <td className="py-5 px-4 text-red-400">Rarely speaks Arabic</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native Gulf Arabic Text &amp; Arabizi Dialects</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Knowledge Grounding</td>
                <td className="py-5 px-4 text-red-400">N/A</td>
                <td className="py-5 px-4 text-red-400">Max 10 pre-set answers</td>
                <td className="py-5 px-4 text-yellow-400">Limited training binder</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Full RAG Ingestion of 1,000+ Company Docs</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Calendar Meeting Booking</td>
                <td className="py-5 px-4 text-red-400">Manual follow-up call</td>
                <td className="py-5 px-4 text-red-400">Sends external link</td>
                <td className="py-5 px-4 text-yellow-400">Manual booking</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native In-Chat Real-Time Calendar Confirmation</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Live Agent Handoff</td>
                <td className="py-5 px-4 text-red-400">Email notification</td>
                <td className="py-5 px-4 text-red-400">Leaves user waiting</td>
                <td className="py-5 px-4 text-yellow-400">Slow escalation</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Instant VIP WhatsApp Alert &amp; Live Chat Takeover</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full AI Chatbot Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Complete Virtual Assistant Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Enterprise Conversational AI Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="w-6 h-6 text-emerald-400" />,
                title: "24/7 Intelligent Virtual Sales Assistant",
                desc: "Engages website visitors instantly at any hour, answering detailed product questions and converting curiosity into booked consultation calls."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "Bilingual Gulf Arabic & English NLP",
                desc: "Fluent understanding of regional Khaleeji terminology, colloquial Emirati expressions, and formal Modern Standard Arabic (MSA)."
              },
              {
                icon: <Clock className="w-6 h-6 text-emerald-400" />,
                title: "Automated Calendar Meeting Booking",
                desc: "Connects with Google Calendar, Outlook, or Calendly to verify real-time sales availability and book appointments directly inside the chat."
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
                title: "Real-Time CRM Data Synchronization",
                desc: "Automatically pushes prospect contact information, qualification criteria, and full chat transcripts into HubSpot, Salesforce, or Zoho."
              },
              {
                icon: <Users className="w-6 h-6 text-emerald-400" />,
                title: "Seamless Live Human Handoff",
                desc: "Detects high-value intent or complex inquiries and instantly pings your on-call team via WhatsApp for 1-click live chat takeover."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "Zero-Hallucination Guardrails",
                desc: "Strict RAG document grounding ensuring the AI only provides accurate, authorized company facts with zero made-up answers."
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
            Deployment Lifecycle
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage AI Chatbot Launch Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Knowledge Intake", text: "We ingest your company brochures, pricing sheets, and technical FAQs into a secure vector database." },
            { step: "02", title: "Persona & NLP", text: "We calibrate brand voice, qualifying question trees, and bilingual Arabic/English reasoning." },
            { step: "03", title: "CRM & Calendar", text: "We configure live API connectors to your CRM and sales scheduling software." },
            { step: "04", title: "Sandbox Testing", text: "We test 150+ user questions to guarantee zero hallucinations and flawless meeting booking." },
            { step: "05", title: "Live Launch", text: "We embed the chat widget across your website and activate 24/7 conversation analytics." }
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
              Conversational AI Knowledge
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE business executives need to know about implementing conversational AI chatbots and virtual assistants.
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
            Capture Inquiries 24/7/365
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Deploy an Intelligent Virtual Assistant.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Never lose another customer to slow after-hours response times. Test a live conversational AI prototype trained on your company's data today.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Test Live Chatbot Prototype <ArrowRight className="w-4 h-4" />
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
