"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, MessageCircle, Bot, Zap, CheckCircle2, 
  ArrowRight, ShieldCheck, Globe, PhoneCall, HelpCircle, 
  Cpu, Building2, BarChart3, Clock, Layers, Users, RefreshCw,
  GitBranch, Server, Lock
} from "lucide-react";
import Link from "next/link";
import { trackEvent } from "../../utils/analytics";

export default function WhatsAppAutomationGCC() {
  // Interactive Speed-to-Lead & WhatsApp Conversion Simulator State
  const [monthlyInboundInquiries, setMonthlyInboundInquiries] = useState(800);
  const [currentResponseTimeHours, setCurrentResponseTimeHours] = useState(4); // hours to first human reply
  const [averageDealSize, setAverageDealSize] = useState(8500); // AED

  // Calculations
  const currentLeadConversionRate = currentResponseTimeHours > 6 ? 1.5 : currentResponseTimeHours > 2 ? 3.0 : currentResponseTimeHours > 0.5 ? 5.5 : 9.0;
  const currentConvertedDeals = Math.round(monthlyInboundInquiries * (currentLeadConversionRate / 100));
  const currentMonthlyRevenue = currentConvertedDeals * averageDealSize;

  const automatedConversionRate = 12.5; // Sub-30s instant WhatsApp AI qualifying & booking
  const automatedConvertedDeals = Math.round(monthlyInboundInquiries * (automatedConversionRate / 100));
  const automatedMonthlyRevenue = automatedConvertedDeals * averageDealSize;
  const monthlyRevenueLift = Math.max(0, automatedMonthlyRevenue - currentMonthlyRevenue);
  const annualRevenueLift = monthlyRevenueLift * 12;

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "consultation") => {
    trackEvent(type === "whatsapp" ? "whatsapp_click" : "consultation_click", {
      service_name: "WhatsApp Automation GCC",
      cta_location: ctaLocation,
      cta_text: ctaText
    });
  };

  const faqData = [
    {
      q: "What is the difference between the standard WhatsApp Business App and the official Meta Cloud API?",
      a: "The standard WhatsApp Business App is designed for single-user smartphones and is limited to manual replies and basic away messages. The official Meta WhatsApp Business Cloud API allows enterprise teams to connect multiple human agents simultaneously, deploy automated conversational qualification, integrate with corporate CRMs (HubSpot, Salesforce, Zoho), trigger policy-compliant notifications, and manage high concurrent message volumes without phone-level hardware bottlenecks."
    },
    {
      q: "How does enterprise multi-agent routing work across branches in the UAE and GCC?",
      a: "Our architecture evaluates incoming conversation data—such as language, city/country code (UAE, Saudi Arabia, Qatar), product interest, or urgency—and programmatically routes the thread to the appropriate department, regional office, or on-duty sales specialist in your CRM with full context attached."
    },
    {
      q: "Which CRMs and enterprise databases can be connected via Meta Cloud API?",
      a: "We configure bi-directional API and webhook connectors for HubSpot, Salesforce, Zoho CRM, Microsoft Dynamics 365, Odoo, Google Workspace, and private SQL/PostgreSQL databases, ensuring every contact record, message history, and deal stage update synchronizes automatically."
    },
    {
      q: "Does the system support bilingual Arabic and English communications?",
      a: "Yes. Our messaging workflows natively support both Arabic and English. The system detects incoming customer language, parses text inquiries as well as transcribed voice notes, and responds with culturally natural phrasing appropriate for GCC enterprise interactions."
    },
    {
      q: "How do you handle WhatsApp template approvals and broadcast opt-in compliance?",
      a: "Under Meta's Business Platform policies and regional telecommunications standards, outbound broadcasts require pre-approved message templates and verified user opt-in. We structure policy-compliant template approval workflows, configure double opt-in checkboxes on your web intake forms, and implement automated unsubscribe handlers to preserve high sender reputation."
    },
    {
      q: "Can the automation trigger secure payment links or invoice notifications in chat?",
      a: "Yes. The automation can connect via webhooks to your accounting platform or payment gateway to generate secure, itemized payment links or invoice notifications and deliver them directly into the customer's WhatsApp conversation."
    },
    {
      q: "What is the typical deployment timeline for an enterprise WhatsApp automation setup?",
      a: "A standard enterprise Meta Cloud API rollout—including business manager onboarding assistance, knowledge base ingestion, CRM integration, and team routing rules—is typically completed in 2 to 4 weeks, followed by staging testing and staff handover."
    },
    {
      q: "How does this enterprise service differ from a local customer service chatbot?",
      a: "While a standalone chatbot answers basic website FAQs, enterprise WhatsApp automation represents a complete operational integration layer: multi-agent inbox management, CRM/ERP bi-directional synchronization, webhook queues, automated document dispatch, and multi-branch routing across the GCC."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* ── 1. Compact Breadcrumb ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/" className="hover:text-emerald-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <Link href="/services" className="hover:text-emerald-400 transition-colors">SERVICES</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95 font-sans">WHATSAPP BUSINESS AUTOMATION GCC</span>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 25 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="text-white/95 text-xs font-bold tracking-[0.25em] uppercase mb-6 flex items-center gap-2 font-mono">
            <MessageSquare className="w-4 h-4 text-emerald-400" /> Meta Cloud API &bull; Multi-Agent Routing &bull; UAE &amp; GCC
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Enterprise WhatsApp Business <br />
            <span className="italic text-white/50 font-light">Automation for UAE &amp; GCC</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            We architect and deploy enterprise Meta WhatsApp Business Cloud API systems, multi-agent CRM routing, policy-compliant template workflows, and bilingual Arabic &amp; English automated customer pipelines for organizations across the UAE and GCC.
          </p>

          <div className="flex flex-wrap items-center gap-4 font-sans">
            <Link 
              href="/contact" 
              onClick={() => handleCTA("Request Enterprise Architecture Audit", "Hero CTA", "consultation")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Request Architecture Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20enterprise%20WhatsApp%20business%20automation." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Hero CTA", "whatsapp")}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" /> WhatsApp Strategic Desk
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[12px] text-white/60 tracking-wider font-mono mt-10">
            <span>✓ OFFICIAL META CLOUD API</span>
            <span>✓ MULTI-AGENT CRM ROUTING</span>
            <span>✓ BILINGUAL ARABIC &amp; ENGLISH</span>
            <span>✓ POLICY-COMPLIANT BROADCASTS</span>
          </div>
        </motion.div>
      </section>

      {/* ── 3. Dedicated Intent Bridge Card: AI Chatbots Dubai ── */}
      <section className="px-6 md:px-12 py-8 max-w-5xl mx-auto">
        <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-400 text-[12px] font-bold uppercase tracking-[0.2em] font-mono block mb-2">
              Conversational Chatbot Development
            </span>
            <h2 className="text-xl md:text-2xl font-serif text-white mb-2">
              Looking specifically for a customer-facing conversational chatbot?
            </h2>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              If your business needs a local customer service bot or lead capture widget for your Dubai business, visit our dedicated Dubai AI Chatbot development service.
            </p>
          </div>
          <Link
            href="/ai-chatbots-dubai"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-emerald-400 text-white text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            Explore AI Chatbots Dubai <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── 4. Key Performance Capabilities Ribbon ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "Sub-30s", label: "Speed-to-Lead Response", sub: "Instant Inbound Engagement" },
            { metric: "Bilingual", label: "Arabic & English NLP", sub: "Text & Audio Transcriptions" },
            { metric: "2-Way", label: "CRM & ERP Sync", sub: "HubSpot, Salesforce, Zoho" },
            { metric: "Official", label: "Meta Cloud API", sub: "Enterprise Platform Standards" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Interactive WhatsApp Speed-to-Lead Simulator ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Conversion Decay Simulator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Calculate the Impact of Sub-Minute Speed-to-Lead
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              When a prospective buyer contacts your business on WhatsApp, response latency directly impacts conversion. Adjust your parameters below to evaluate the revenue difference.
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
                  <span className="text-emerald-400 block mb-1">With Automated Qualification:</span>
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
                  Schedule Your WhatsApp Infrastructure Build <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Strategic Comparison: Enterprise Cloud API vs Phone Handsets ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
            Architecture Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Enterprise Meta Cloud API vs. Manual Staff Handsets
          </h2>
          <p className="text-white/60 font-light text-sm max-w-2xl mt-3">
            Why growing organizations in the UAE transition from physical smartphones to enterprise API infrastructure.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Operational Layer</th>
                <th className="py-4 px-4 text-white/40">Manual Staff Handset</th>
                <th className="py-4 px-4 text-white/40">Basic WhatsApp App</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Enterprise Cloud API Infrastructure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Concurrency &amp; Scale</td>
                <td className="py-5 px-4 text-white/50">1 agent per physical phone</td>
                <td className="py-5 px-4 text-white/50">Max 4 linked devices</td>
                <td className="py-5 pl-6 text-white font-normal bg-emerald-500/[0.02]">High-volume concurrent sessions; multi-agent team inboxes</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">CRM Synchronization</td>
                <td className="py-5 px-4 text-white/50">Manual copy-pasting by staff</td>
                <td className="py-5 px-4 text-white/50">No native CRM connectivity</td>
                <td className="py-5 pl-6 text-white font-normal bg-emerald-500/[0.02]">Automated 2-way sync with HubSpot, Salesforce, Zoho, ERP</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Branch &amp; Territory Routing</td>
                <td className="py-5 px-4 text-white/50">Manual forwarding between reps</td>
                <td className="py-5 px-4 text-white/50">Static business greeting</td>
                <td className="py-5 pl-6 text-white font-normal bg-emerald-500/[0.02]">Automated routing by country code, language, or inquiry type</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Outbound Messaging</td>
                <td className="py-5 px-4 text-white/50">High risk of phone number blocking</td>
                <td className="py-5 px-4 text-white/50">Limited broadcast lists (256 contacts)</td>
                <td className="py-5 pl-6 text-white font-normal bg-emerald-500/[0.02]">Policy-compliant pre-approved templates &amp; opt-in workflows</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Data Security &amp; Logging</td>
                <td className="py-5 px-4 text-white/50">Chats stored on individual phones</td>
                <td className="py-5 px-4 text-white/50">Device backup dependencies</td>
                <td className="py-5 pl-6 text-white font-normal bg-emerald-500/[0.02]">Enterprise access controls, audit logs &amp; private API tokens</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. Enterprise WhatsApp Modules ── */}
      <section className="px-6 md:px-12 py-20 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Integration Architecture
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Enterprise WhatsApp Modules We Deploy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "Speed-to-Lead Ingestion",
                desc: "Connect website forms, Google Ads, and Meta Click-to-WhatsApp campaigns to initiate automated qualification within seconds."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "Bilingual Arabic & English Routing",
                desc: "Automated language detection and natural NLP routing supporting English and Arabic text inquiries and voice note transcriptions."
              },
              {
                icon: <Users className="w-6 h-6 text-emerald-400" />,
                title: "Multi-Agent Team Routing",
                desc: "Routes qualified customer conversations to specific departments, regional offices, or sales specialists based on territory and product interest."
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
                title: "2-Way CRM & ERP Synchronization",
                desc: "Synchronizes contact details, conversation summaries, tags, and calendar bookings into HubSpot, Salesforce, Zoho, or internal SQL databases."
              },
              {
                icon: <Layers className="w-6 h-6 text-emerald-400" />,
                title: "Automated Document & PDF Dispatch",
                desc: "Retrieves and delivers product catalogs, PDF brochures, price sheets, and location pins based on customer-requested details."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                title: "Meta Business Manager Verification Support",
                desc: "End-to-end guidance through Meta Business Manager setup, message template approvals, and official Cloud API token provisioning."
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

      {/* ── 8. Step-by-Step Delivery Roadmap ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Rollout Framework
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            5-Stage WhatsApp Deployment Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Meta Setup", text: "We assist with Meta Business Manager onboarding, provision Cloud API tokens, and register official phone numbers." },
            { step: "02", title: "Workflow Mapping", text: "We configure conversational intake flows, qualification logic, and customer routing rules." },
            { step: "03", title: "CRM Integration", text: "We configure live 2-way connectors between WhatsApp, your CRM, and sales scheduling calendars." },
            { step: "04", title: "Sandbox Testing", text: "We test bilingual message routing, voice note transcriptions, and sales escalation triggers in a staging environment." },
            { step: "05", title: "Live Activation", text: "We connect the live numbers, train internal staff on the shared inbox, and establish uptime monitoring." }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-3xl font-serif text-emerald-400 mb-4 font-bold">{s.step}</div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Frequently Asked Questions ── */}
      <section className="py-20 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
              Operational Answers
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-3">
              Technical, architectural, and operational questions regarding enterprise WhatsApp Business Cloud API.
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

      {/* ── 10. Call to Action ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block font-semibold">
            Scale Inbound Communications
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Connect Your WhatsApp Channel to Enterprise Infrastructure.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Eliminate lead response delays, centralize customer communications across your team, and synchronize every interaction with your CRM.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4 font-sans">
            <Link 
              href="/contact" 
              onClick={() => handleCTA("Book Enterprise Consultation", "Final CTA", "consultation")}
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Schedule Systems Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20enterprise%20WhatsApp%20business%20automation." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Final CTA", "whatsapp")}
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </div>
      </section>

      {/* ── 11. Topic Cluster Footer Navigation ── */}
      <section className="py-12 border-t border-white/5 bg-black/40 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Related Automation Infrastructure
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/services/whatsapp-automation-gcc" className="hover:text-white transition-colors text-emerald-400 font-medium">Enterprise WhatsApp GCC</Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-chatbots-dubai" className="hover:text-white transition-colors">AI Chatbots Dubai (Customer Service Bots)</Link>
            <span className="text-white/20">•</span>
            <Link href="/workflow-automation-uae" className="hover:text-white transition-colors">Workflow Automation UAE</Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate/whatsapp-ai-automation" className="hover:text-white transition-colors">Real Estate WhatsApp AI</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
