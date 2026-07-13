"use client";

import { motion } from "framer-motion";
import { 
  Building, UserCheck, ArrowRight, ShieldAlert, Cpu, 
  MessageSquare, Phone, CheckCircle, GraduationCap, Calendar, User,
  FileText, Check, AlertCircle, Sparkles, HelpCircle
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { trackEvent } from "../utils/analytics";

export default function AiRealEstateUAE() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "phone" | "consultation", destinationUrl: string) => {
    let eventName = "whatsapp_click";
    if (type === "phone") eventName = "phone_click";
    if (type === "consultation") eventName = "consultation_click";

    trackEvent(eventName, {
      service_name: "Real Estate AI Hub",
      cta_location: ctaLocation,
      cta_text: ctaText,
      link_url: destinationUrl
    });
  };

  const handleFaq = (index: number, question: string) => {
    if (activeFaq !== index) {
      trackEvent("faq_expand", {
        service_name: "Real Estate AI Hub",
        cta_text: question
      });
    }
    setActiveFaq(activeFaq === index ? null : index);
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.asifdigital.agency/ai-real-estate-uae#webpage",
        "url": "https://www.asifdigital.agency/ai-real-estate-uae",
        "name": "AI for Real Estate in the UAE | Practical Business Guide",
        "isPartOf": { "@id": "https://www.asifdigital.agency/#website" },
        "breadcrumb": { "@id": "https://www.asifdigital.agency/ai-real-estate-uae#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.asifdigital.agency/ai-real-estate-uae#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.asifdigital.agency"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Real Estate AI Hub",
            "item": "https://www.asifdigital.agency/ai-real-estate-uae"
          }
        ]
      },
      {
        "@type": "Article",
        "@id": "https://www.asifdigital.agency/ai-real-estate-uae#article",
        "isPartOf": { "@id": "https://www.asifdigital.agency/ai-real-estate-uae#webpage" },
        "headline": "How Real Estate Businesses in the UAE Can Use AI",
        "description": "Learn how UAE real estate agencies, landlords and property teams can use AI for enquiries, follow-ups, tenant support and everyday operations.",
        "author": {
          "@type": "Person",
          "name": "Asif Khan",
          "jobTitle": "Founder & Digital Strategist",
          "worksFor": {
            "@type": "Organization",
            "name": "Asif Digital"
          }
        },
        "publisher": {
          "@id": "https://www.asifdigital.agency/#organization"
        },
        "datePublished": "2026-07-10",
        "dateModified": "2026-07-13"
      },
      {
        "@type": "Organization",
        "@id": "https://www.asifdigital.agency/#organization",
        "name": "Asif Digital",
        "url": "https://www.asifdigital.agency/",
        "logo": "https://www.asifdigital.agency/images/logo.png",
        "telephone": "+971 54 586 6094",
        "email": "hello@asifdigital.agency"
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* Hidden Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* ── 1. Compact Breadcrumb (High Contrast) ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/" className="hover:text-green-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95">REAL ESTATE AI HUB</span>
      </div>

      {/* ── 2. Hero Section (Reduced vertical padding) ── */}
      <section className="px-6 md:px-12 py-10 max-w-7xl mx-auto text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 bg-white/5 border border-white/10 text-green-400 text-[13px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Real Estate AI Hub
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.15] tracking-tight mb-6">
            How UAE Real Estate Businesses <br className="hidden md:inline" />
            <span className="italic text-white/50 font-light tracking-normal">Can Use AI</span>
          </h1>
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 max-w-3xl mx-auto mb-8 font-sans font-light">
            A comprehensive, plain-English guide to artificial intelligence in the Gulf property sector. Learn how developers, landlords, and brokerages use systems to improve efficiency without losing the human relationships that close deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20see%20how%20AI%20could%20handle%20property%20enquiries%20for%20my%20real-estate%20business." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Free consultation", "Hero CTA", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20see%20how%20AI%20could%20handle%20property%20enquiries%20for%20my%20real-estate%20business.")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              WhatsApp Free consultation <MessageSquare className="w-4 h-4 text-black" />
            </a>
            <a 
              href="tel:+971545866094" 
              onClick={() => handleCTA("Call Our Strategist", "Hero CTA", "consultation", "tel:+971545866094")}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-3 h-[52px] font-sans"
            >
              Call Our Strategist <Phone className="w-4 h-4 text-white" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[13px] text-white/70 tracking-wider font-mono">
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-green-400" /> AUTHOR: ASIF KHAN</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-green-400" /> LAST UPDATED: JULY 2026</span>
          </div>
        </motion.div>
      </section>

      {/* Hero Image Section (UAE Real-Estate AI visual - WebP) */}
      <section className="px-6 md:px-12 pb-14 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] w-full bg-neutral-900 shadow-2xl">
          <Image 
            src="/images/real_estate_uae_hero_new.png"
            alt="A UAE real estate professional reviewing property enquiries on a laptop in a modern Dubai office"
            width={1200}
            height={675}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[13px] font-mono tracking-widest uppercase text-white/80">
            Demonstration — Not Client Data
          </div>
        </div>
      </section>

      {/* ── 3. Direct Plain-Language Definition (AEO/GEO Target) ── */}
      <section className="px-6 md:px-12 py-10 max-w-3xl mx-auto text-left">
        <div className="p-8 md:p-10 border border-white/10 bg-white/[0.01] rounded-3xl">
          <h2 className="text-xl md:text-2xl font-serif text-white mb-4">What does AI actually mean for UAE real estate?</h2>
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/95 font-light mb-4 font-sans">
            AI in UAE real estate refers to software systems configured to answer buyer queries, manage property maintenance records, draft local listings, and categorize client information automatically. Rather than replacing human agents, AI handles repetitive typing and administration so your team can focus on closing deals.
          </p>
        </div>
      </section>

      {/* ── 4. Author Box (Asif Khan) ── */}
      <section className="px-6 md:px-12 py-6 max-w-3xl mx-auto">
        <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl flex flex-col md:flex-row gap-6 items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-500 to-emerald-700 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold font-mono">AK</span>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-green-400 mb-1">Written by Asif Khan</h4>
            <p className="text-xs text-white/70 mb-2 font-mono">FOUNDER & DIGITAL STRATEGIST AT ASIF DIGITAL</p>
            <p className="text-[17px] md:text-[18px] text-white/80 leading-[1.7] font-sans font-light">
              Asif Khan is the founder and digital strategist at Asif Digital. Based in the UAE, he specializes in building website infrastructures, CRM connections, and custom business integrations for real estate and hospitality teams. He writes practical guides to help local business owners navigate automation tools without technical jargon.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Where AI Fits Diagram (Interactive-styled Flow) ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">Where AI Fits in a UAE Property Business</h2>
        <p className="text-sm text-white/70 max-w-xl mx-auto mb-8 font-sans font-light">
          A visual overview of how inbound lead communications interface with automation systems before reaching your human brokers.
        </p>

        {/* Responsive CSS Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 border border-white/5 bg-white/[0.01] rounded-3xl text-left relative">
          
          {/* Step 1 */}
          <div className="p-6 bg-black border border-white/10 rounded-2xl relative">
            <span className="absolute -top-3 left-6 px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-[13px] font-mono uppercase rounded-full">
              Inbound Channels
            </span>
            <h3 className="text-base font-bold text-white mb-3 mt-1 font-sans">1. Property Queries</h3>
            <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
              Incoming customer requests arrive via property listing portals (Property Finder, Bayut), emails, website forms, or WhatsApp.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-black border border-green-500/20 rounded-2xl relative shadow-[0_0_15px_rgba(34,197,94,0.05)]">
            <span className="absolute -top-3 left-6 px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-[13px] font-mono uppercase rounded-full">
              AI Filter Layer
            </span>
            <h3 className="text-base font-bold text-green-400 mb-3 mt-1 font-sans">2. AI Lead Qualification</h3>
            <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
              The script parses layout details, identifies the location and budget, sends pre-configured developer PDF brochures, and schedules appointments.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-black border border-white/10 rounded-2xl relative">
            <span className="absolute -top-3 left-6 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[13px] font-mono uppercase rounded-full">
              Human Action
            </span>
            <h3 className="text-base font-bold text-white mb-3 mt-1 font-sans">3. Human Broker Takes Over</h3>
            <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
              The qualified details are pushed into your CRM, notifying the assigned broker with complete context for the physical viewing and closing.
            </p>
          </div>

          <div className="col-span-1 md:col-span-3 text-center text-[13px] text-white/50 uppercase tracking-widest font-mono pt-4">
            Demonstration — Not Client Data
          </div>
        </div>
      </section>

      {/* ── 6. Uses by Sector (Deep Content Expansion) ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-white/70 text-xs font-bold tracking-[0.3em] uppercase block mb-3 font-mono">Operations Audit</span>
            <h2 className="text-3xl md:text-5xl font-serif">How UAE Real Estate Businesses Can Use AI</h2>
          </div>

          <div className="space-y-8">
            {[
              { 
                role: "For Real Estate Brokerages",
                desc: "Sales teams configure automated scripts to handle the first 10 minutes of a portal query. The system reads buyer parameters (budget, unit size, area preferences), checks local matching projects, sends developer files on WhatsApp, and alerts the broker only when the client requests a call."
              },
              { 
                role: "For Property Management Teams",
                desc: "Property managers use scheduled task queues to send friendly rent cheque reminders, answer standard renewal schedule queries, capture maintenance photo attachments, and log clean maintenance tickets without manual spreadsheet entry."
              },
              { 
                role: "For Property Developers",
                desc: "Developers launch interactive multilingual tools to coordinate launch announcements, handle agent brochure requests, and update internal sales staff on unit inventory availability in real-time."
              },
              { 
                role: "For Individual Landlords",
                desc: "Landlords with large portfolios run simple pipelines to track rental payment receipts, log tax records, check contract expiry dates, and receive maintenance contractor quotes."
              }
            ].map((use, i) => (
              <div key={i} className="p-8 border border-white/5 bg-black rounded-2xl hover:border-green-500/20 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3 font-sans">{use.role}</h3>
                <p className="text-[16px] text-white/80 leading-[1.7] font-sans font-light">{use.desc}</p>
                <div className="text-[13px] text-white/40 mt-4 font-mono">Demonstration — Not Client Data</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Tasks AI Can Assist With Diagram (Balanced Overview) ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif">Tasks AI Can Assist With vs. Tasks That Need People</h2>
          <p className="text-sm text-white/70 font-sans font-light mt-2">
            A transparent overview of the limits of automation in your property operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* AI Columns */}
          <div className="p-8 border border-green-500/10 bg-green-500/[0.01] rounded-3xl">
            <h3 className="text-lg font-bold text-green-400 mb-6 flex items-center gap-2 font-sans">
              <Check className="w-5 h-5" /> Tasks AI Can Automate
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-[16px] text-white/90 leading-[1.7] font-sans font-light">
                <span className="text-green-500 font-mono font-bold">01.</span>
                <span>Qualifying buyer budget and location on WhatsApp.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/90 leading-[1.7] font-sans font-light">
                <span className="text-green-500 font-mono font-bold">02.</span>
                <span>Formatting listing text for property portals.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/90 leading-[1.7] font-sans font-light">
                <span className="text-green-500 font-mono font-bold">03.</span>
                <span>Scheduling viewing calendars and agent callbacks.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/90 leading-[1.7] font-sans font-light">
                <span className="text-green-500 font-mono font-bold">04.</span>
                <span>Sending automated rent cheque reminder alerts.</span>
              </li>
            </ul>
          </div>

          {/* Human Column */}
          <div className="p-8 border border-red-500/10 bg-red-500/[0.01] rounded-3xl">
            <h3 className="text-lg font-bold text-red-400 mb-6 flex items-center gap-2 font-sans">
              <AlertCircle className="w-5 h-5" /> Must Remain Human
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-[16px] text-white/90 leading-[1.7] font-sans font-light">
                <span className="text-red-500 font-mono font-bold">01.</span>
                <span>Closing lease negotiations and transaction fees.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/90 leading-[1.7] font-sans font-light">
                <span className="text-red-500 font-mono font-bold">02.</span>
                <span>Resolving landlord-tenant rental disputes.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/90 leading-[1.7] font-sans font-light">
                <span className="text-red-500 font-mono font-bold">03.</span>
                <span>Verifying wire transfer bank receipts.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/90 leading-[1.7] font-sans font-light">
                <span className="text-red-500 font-mono font-bold">04.</span>
                <span>Writing complex legal contracts and Ejari forms.</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 text-center text-[13px] text-white/50 uppercase tracking-widest font-mono pt-2">
            Demonstration — Not Client Data
          </div>
        </div>
      </section>

      {/* ── 8. How to Implement & Requirements ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-12 text-left">
          
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Information Needed Before Implementation</h2>
            <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 font-light mb-6 font-sans">
              To build a reliable system, we need to map your current processes. Before writing code, we work with your team to collect:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[16px] text-white/80 leading-[1.7] font-sans">
                <span className="h-2 w-2 rounded-full bg-white/40 mt-2 shrink-0" />
                <span>Spreadsheets containing your property details, payment schedules, and agent contact details.</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-white/80 leading-[1.7] font-sans">
                <span className="h-2 w-2 rounded-full bg-white/40 mt-2 shrink-0" />
                <span>Access tokens for your CRM platform (e.g. HubSpot, Salesforce) and WhatsApp API providers.</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-white/80 leading-[1.7] font-sans">
                <span className="h-2 w-2 rounded-full bg-white/40 mt-2 shrink-0" />
                <span>Historical logs of common buyer and tenant inquiries to help calibrate the response rules.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Typical Setup Stages</h2>
            <div className="space-y-6">
              {[
                { stage: "Stage 1: Process Map", text: "We audit how you collect leads and write down the exact rules for qualifying enquiries." },
                { stage: "Stage 2: Database Setup", text: "We clean your property listings and connect them to a private database." },
                { stage: "Stage 3: Pipeline Code", text: "We write the custom scripts that receive API requests from listing portals and send automatic replies." },
                { stage: "Stage 4: Staff Testing", text: "We run simulated queries to ensure your agents receive correct notifications before going live." }
              ].map((st, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="h-7 w-7 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono flex items-center justify-center shrink-0 mt-1">{i+1}</span>
                  <div>
                    <h4 className="text-base font-bold text-white font-sans">{st.stage}</h4>
                    <p className="text-[16px] text-white/77 leading-[1.7] font-sans font-light">{st.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Pricing Factors</h2>
            <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 font-light mb-4 font-sans">
              Pricing is calculated based on project scope rather than flat templates. The cost is determined by:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[16px] text-white/80 font-sans">
                <span className="h-2 w-2 rounded-full bg-white/40 mt-2 shrink-0" />
                <span>The number of listing portal webhooks we need to connect.</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-white/80 font-sans">
                <span className="h-2 w-2 rounded-full bg-white/40 mt-2 shrink-0" />
                <span>The configuration complexity of your CRM pipelines and contact groups.</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-white/80 font-sans">
                <span className="h-2 w-2 rounded-full bg-white/40 mt-2 shrink-0" />
                <span>Language requirements—specifically if you need customized Arabic and English models.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Provider-Selection Checklist</h2>
            <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 font-light mb-6 font-sans">
              If you are selecting a team to build your property automation, make sure they verify the following requirements:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Does the provider offer a local UAE support number for urgent system errors?</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Do they sign clear agreements confirming your database keys are private and not shared?</span>
              </li>
              <li className="flex items-start gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Do they write clean custom scripts rather than routing customer contacts through third-party templates?</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── 9. Detailed Q&A (Crawlable Q&A for AEO/GEO Search) ── */}
      <section className="py-14 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-white/70 text-xs font-bold tracking-[0.3em] uppercase block mb-3 font-mono">Educational Q&A</span>
          <h2 className="text-3xl font-serif">Deep-Dive Questions</h2>
        </div>
        <div className="space-y-6">
          {[
            {
              q: "What is AI in real estate?",
              a: "AI in real estate involves using software tools to qualify incoming buyer leads, automate property listing copy, update client databases, and manage tenant maintenance tickets without manual data entry."
            },
            {
              q: "Does AI replace real estate agents in Dubai?",
              a: "No. AI does not replace agents. It handles administrative work—such as typing replies to portal inquiries and sending brochures—so your agents have more time to conduct viewings and close property sales."
            },
            {
              q: "Is client information safe when using property automation?",
              a: "Yes. All property lead databases are configured with secure API keys. We discuss your data-handling requirements before deciding which tools, hosting locations and integrations are suitable."
            },
            {
              q: "How does the software handle Arabic enquiries?",
              a: "We configure the text parser to recognize local UAE and Gulf dialects, allowing it to translate parameters and save records in your CRM in English."
            },
            {
              q: "Which local UAE portals are compatible?",
              a: "The system is compatible with major portals (Property Finder, Bayut, Dubizzle) via standard email parses or webhook APIs, depending on your account permissions."
            }
          ].map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-6">
              <button
                className="w-full text-left text-[17px] md:text-[19px] font-sans font-semibold py-4 flex justify-between items-center hover:text-white/70 transition-colors"
                onClick={() => handleFaq(i, faq.q)}
              >
                <span>{faq.q}</span>
                <span className="text-green-400 text-xl">{activeFaq === i ? "−" : "+"}</span>
              </button>
              {activeFaq === i && (
                <p className="mt-2 text-[16px] text-white/80 font-light leading-[1.7] max-w-2xl font-sans">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. CTA Section ── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[13px] font-bold uppercase tracking-[0.3em] text-black/40 block mb-6 font-mono">Build Your Digital Advantage</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8">
            Ready to Streamline Your <br />
            <span className="italic text-black/50 font-light tracking-normal">Property Operations?</span>
          </h2>
          <p className="text-black/60 font-light text-[17px] md:text-[18px] max-w-xl mx-auto leading-[1.7] mb-12 font-sans">
            Get a free review of your current property database and inquiry setup. We will explain how to automate your administrative tasks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20see%20how%20AI%20could%20handle%20property%20enquiries%20for%20my%20real-estate%20business." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Us", "CTA Block", "whatsapp", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20see%20how%20AI%20could%20handle%20property%20enquiries%20for%20my%20real-estate%20business.")}
              className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              WhatsApp Us <MessageSquare className="w-4 h-4 text-white" />
            </a>
            <a 
              href="tel:+971545866094" 
              onClick={() => handleCTA("Call: +971 54 586 6094", "CTA Block", "phone", "tel:+971545866094")}
              className="bg-transparent text-black border border-black/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center justify-center gap-3 h-[52px] font-sans"
            >
              Call: +971 54 586 6094 <Phone className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 11. Related Service Links (High Contrast) ── */}
      <div className="py-6 bg-black border-t border-white/5 text-center text-xs tracking-wider text-white/70 font-mono">
        <Link href="/ai-real-estate-agencies-dubai" className="hover:text-green-400 transition-colors mx-4">AI Real Estate Agencies</Link>
        <span className="text-white/20">|</span>
        <Link href="/ai-property-management-uae" className="hover:text-green-400 transition-colors mx-4">AI Property Management</Link>
        <span className="text-white/20">|</span>
        <Link href="/real-estate-digital-solutions-uae" className="hover:text-green-400 transition-colors mx-4">Real Estate Digital Solutions</Link>
      </div>

      {/* Sticky Mobile CTA (WCAG Compliant) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0ced]/90 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-4 md:hidden">
        <a 
          href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20see%20how%20AI%20could%20handle%20property%20enquiries%20for%20my%20real-estate%20business."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCTA("Sticky WhatsApp Mobile", "Sticky Footer", "whatsapp", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20see%20how%20AI%20could%20handle%20property%20enquiries%20for%20my%20real-estate%20business.")}
          className="flex-1 bg-[#25d366] text-white text-center font-bold uppercase tracking-wider text-[10px] py-3 rounded-xl flex items-center justify-center gap-2 h-11"
        >
          <MessageSquare className="w-4 h-4" /> WhatsApp Us
        </a>
        <a 
          href="tel:+971545866094"
          onClick={() => handleCTA("Sticky Phone Mobile", "Sticky Footer", "phone", "tel:+971545866094")}
          className="flex-1 bg-white text-black text-center font-bold uppercase tracking-wider text-[10px] py-3 rounded-xl flex items-center justify-center gap-2 h-11"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
      </div>

    </div>
  );
}
