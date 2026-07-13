"use client";

import { motion } from "framer-motion";
import { 
  Building, UserCheck, ArrowRight, ShieldAlert, Cpu, 
  MessageSquare, Phone, CheckCircle, HelpCircle, Server, Code, Settings,
  Check, AlertCircle, RefreshCw, Send, Sparkles, User, Calendar
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { trackEvent } from "../utils/analytics";

export default function AiRealEstateAgenciesDubai() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "phone" | "consultation", destinationUrl: string) => {
    let eventName = "whatsapp_click";
    if (type === "phone") eventName = "phone_click";
    if (type === "consultation") eventName = "consultation_click";

    trackEvent(eventName, {
      service_name: "AI Real Estate Agencies",
      cta_location: ctaLocation,
      cta_text: ctaText,
      link_url: destinationUrl
    });
  };

  const handleFaq = (index: number, question: string) => {
    if (activeFaq !== index) {
      trackEvent("faq_expand", {
        service_name: "AI Real Estate Agencies",
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
        "@id": "https://www.asifdigital.agency/ai-real-estate-agencies-dubai#webpage",
        "url": "https://www.asifdigital.agency/ai-real-estate-agencies-dubai",
        "name": "AI Automation for Dubai Real Estate Agencies | WhatsApp & Lead Tech",
        "isPartOf": { "@id": "https://www.asifdigital.agency/#website" },
        "breadcrumb": { "@id": "https://www.asifdigital.agency/ai-real-estate-agencies-dubai#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.asifdigital.agency/ai-real-estate-agencies-dubai#breadcrumb",
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI for Real Estate Agencies",
            "item": "https://www.asifdigital.agency/ai-real-estate-agencies-dubai"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.asifdigital.agency/ai-real-estate-agencies-dubai#service",
        "name": "AI Automation for Real Estate Agencies in Dubai",
        "description": "Automate lead response and qualification for Dubai real estate agencies via WhatsApp and CRM setups.",
        "provider": { "@id": "https://www.asifdigital.agency/#organization" }
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
      
      {/* Hidden Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* ── 1. Compact Breadcrumb (High Contrast) ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/" className="hover:text-green-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <Link href="/ai-real-estate-uae" className="hover:text-green-400 transition-colors">REAL ESTATE AI HUB</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95 font-sans">AI FOR AGENCIES</span>
      </div>

      {/* ── 2. Hero Section (Reduced vertical padding) ── */}
      <section className="px-6 md:px-12 py-10 max-w-7xl mx-auto text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 bg-white/5 border border-white/10 text-green-400 text-[13px] font-bold uppercase tracking-[0.3em] rounded-full mb-6 font-mono">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Bespoke Lead Automations
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.15] tracking-tight mb-6">
            AI Automation for <br className="hidden md:inline" />
            <span className="italic text-white/50 font-light tracking-normal">Dubai Real Estate Agencies</span>
          </h1>
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 max-w-3xl mx-auto mb-8 font-sans font-light">
            Reply to property enquiries, qualify buyers and help book viewings through WhatsApp, with lead details sent to your preferred sales workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20AI%20Broker%20system." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("See a Free WhatsApp Demo", "Hero CTA", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20AI%20Broker%20system.")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              See a Free WhatsApp Demo <MessageSquare className="w-4 h-4 text-black" />
            </a>
            <a 
              href="tel:+971545866094" 
              onClick={() => handleCTA("Call Now", "Hero CTA", "phone", "tel:+971545866094")}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-3 h-[52px] font-sans"
            >
              Call +971 54 586 6094 <Phone className="w-4 h-4 text-white" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[13px] text-white/70 tracking-wider font-mono">
            <span>✓ ARABIC & ENGLISH SUPPORT</span>
            <span>✓ SYNC TO CRM & SPREADSHEETS</span>
            <span>✓ BUILT FOR DUBAI BROKERAGES</span>
          </div>
        </motion.div>
      </section>

      {/* Hero Visual Section - WebP */}
      <section className="px-6 md:px-12 pb-14 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] w-full bg-neutral-900 shadow-2xl">
          <Image 
            src="/images/ai_whatsapp_broker_chat.webp"
            alt="A mockup of a mobile screen showing a WhatsApp conversation between a customer and an automated inquiry assistant"
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

      {/* ── 3. Immediate Plain-Language Answer ── */}
      <section className="px-6 md:px-12 py-10 max-w-3xl mx-auto text-left">
        <div className="p-8 md:p-10 border border-white/10 bg-white/[0.01] rounded-3xl">
          <h2 className="text-xl md:text-2xl font-serif text-white mb-4">How does AI lead qualification work for Dubai agencies?</h2>
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/95 font-sans font-light">
            We build custom conversational chat systems that answer inbound property inquiries on WhatsApp and your website. The second a lead registers, the system qualifies their budget, timing, and location, recommends matching active properties, and routes the qualified data to your sales team's phones.
          </p>
        </div>
      </section>

      {/* ── 4. Customer Experience Breakdown (What Buyer Experiences vs Agent Receives) ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">The Qualified Enquiry Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Buyer Experience */}
          <div className="p-8 border border-white/5 bg-white/[0.01] rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-green-400 font-sans">What the Buyer Experiences</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-[16px] text-white/80 leading-[1.6] font-sans font-light">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Instant greeting in under 60 seconds on WhatsApp, in English or Arabic depending on their inbound message language.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/80 leading-[1.6] font-sans font-light">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Structured questions to verify their target Dubai location (e.g. Downtown, Marina), purchase timeline, and cash vs. mortgage status.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/80 leading-[1.6] font-sans font-light">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Immediate delivery of relevant project floorplans and PDF brochures directly within the chat window.</span>
              </li>
            </ul>
          </div>

          {/* Agent Receives */}
          <div className="p-8 border border-white/5 bg-white/[0.01] rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white font-sans">What the Agent Receives</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-[16px] text-white/80 leading-[1.6] font-sans font-light">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>A clean, formatted text summary pushed directly to their phone and CRM containing the buyer's name, phone, budget, and project preference.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/80 leading-[1.6] font-sans font-light">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>No time wasted on manual copy-pasting or calling cold numbers that never pick up the phone.</span>
              </li>
              <li className="flex gap-3 text-[16px] text-white/80 leading-[1.6] font-sans font-light">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Immediate notification if the lead is high-value or requests a physical site viewing callback.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── 5. Visual: Labelled WhatsApp Property Enquiry Mockup ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif mb-3">Example WhatsApp Property Enquiry</h2>
          <p className="text-sm text-white/70 mb-8 font-sans font-light">
            A visual example showing how the conversational program qualifies coordinates in real-time.
          </p>

          <div className="p-6 border border-white/10 bg-black rounded-3xl max-w-md mx-auto text-left space-y-4 shadow-2xl relative">
            <span className="absolute top-4 right-4 bg-green-500/10 border border-green-500/30 text-green-400 text-[13px] font-mono uppercase px-2 py-0.5 rounded-full">
              Demonstration — Not Client Data
            </span>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs shrink-0 text-white/80">C</div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-white/90 leading-relaxed font-sans">
                Hi, I'm interested in the 2-bedroom off-plan project you advertised in Downtown. Is it still available?
              </div>
            </div>
            <div className="flex gap-3 items-start justify-end">
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm text-white/90 leading-relaxed font-sans">
                Hello! Yes, we have active units available. To send you the correct brochure, are you looking for personal use or investment? And what is your target budget?
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center font-bold text-xs shrink-0 text-green-400">AI</div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs shrink-0 text-white/80">C</div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-white/90 leading-relaxed font-sans">
                It's for investment. Budget is around AED 2.5 Million. I am based in London and plan to visit Dubai next month.
              </div>
            </div>
            <div className="flex gap-3 items-start justify-end">
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm text-white/90 leading-relaxed font-sans">
                Perfect. I have logged your Downtown preferences. Here is the layout brochure PDF [Floorplan_Downtown.pdf]. Would you like to schedule a 10-minute Zoom call with our Downtown specialist next week?
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center font-bold text-xs shrink-0 text-green-400">AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Flow Diagram: Portal to CRM to Agent ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">Enquiry to Viewing Flow</h2>
        <p className="text-sm text-white/70 mb-8 font-sans font-light">
          A visual diagram showing how leads are processed automatically and routed to agents.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left p-6 border border-white/5 bg-white/[0.01] rounded-3xl relative">
          {[
            { title: "1. Portal Enquiry", desc: "A client submits a form on Property Finder or your website." },
            { title: "2. Instant WhatsApp", desc: "AI assistant reaches out within 60 seconds to initiate qualification." },
            { title: "3. CRM Log & Routing", desc: "The profile is updated in HubSpot and routed to the community broker." },
            { title: "4. Agent Follow-Up", desc: "The broker calls the buyer to arrange the physical property viewing." }
          ].map((fl, i) => (
            <div key={i} className="p-5 bg-black border border-white/10 rounded-2xl relative flex flex-col justify-between">
              <div>
                <h4 className="text-[17px] font-semibold text-green-400 mb-2 font-sans">{fl.title}</h4>
                <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">{fl.desc}</p>
              </div>
              {i < 3 && <ArrowRight className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 z-10 bg-black rounded-full p-1 border border-white/10" />}
            </div>
          ))}
          <div className="col-span-1 sm:col-span-4 text-center text-[13px] text-white/50 uppercase tracking-widest font-mono pt-2">
            Demonstration — Not Client Data
          </div>
        </div>
      </section>

      {/* ── 7. Human Takeover Process (Educational Content) ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8 text-left">
          <h2 className="text-2xl md:text-3xl font-serif">The Human Takeover Process</h2>
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 font-light font-sans">
            Our systems do not make final business decisions or sign lease contracts. We program clean boundaries to hand over conversations to your human sales team in the following scenarios:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-[16px] text-white/80 leading-[1.6] font-sans font-light">
              <span className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
              <span><strong>Explicit Request:</strong> The client explicitly asks to speak to an agent or asks a complex question outside the standard brochure details.</span>
            </li>
            <li className="flex items-start gap-3 text-[16px] text-white/80 leading-[1.6] font-sans font-light">
              <span className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
              <span><strong>High-Intent Triggers:</strong> The client inputs high-intent criteria (e.g. cash buyer ready to view tomorrow). The system halts automation and alerts the agent instantly.</span>
            </li>
            <li className="flex items-start gap-3 text-[16px] text-white/80 leading-[1.6] font-sans font-light">
              <span className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
              <span><strong>Manual Takeover:</strong> Your agent can view the chat history in the dashboard and take over the live WhatsApp chat at any time.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── 8. Visual: Example Qualified Lead Summary Card ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">Example CRM Lead Summary</h2>
        <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/70 mb-8 font-sans font-light">
          A visual mockup of the details sent to your broker's CRM dashboard once qualified.
        </p>

        <div className="p-8 border border-white/10 bg-black rounded-3xl max-w-md mx-auto text-left space-y-4 shadow-2xl relative">
          <span className="absolute top-4 right-4 bg-green-500/10 border border-green-500/30 text-green-400 text-[13px] font-mono uppercase px-2 py-0.5 rounded-full">
            Demonstration — Not Client Data
          </span>
          <h3 className="text-base font-bold text-white font-sans border-b border-white/10 pb-2">Julian Sterling Profile</h3>
          
          <div className="space-y-2 text-[16px] font-sans font-light">
            <div className="flex justify-between"><span className="text-white/60">Lead Name:</span> <span className="font-bold">Julian Sterling</span></div>
            <div className="flex justify-between"><span className="text-white/60">Phone:</span> <span>+44 7911 123456</span></div>
            <div className="flex justify-between"><span className="text-white/60">Target Location:</span> <span className="text-green-400">Palm Jumeirah / Dubai Marina</span></div>
            <div className="flex justify-between"><span className="text-white/60">Budget Range:</span> <span>AED 4.5M - 5.0M</span></div>
            <div className="flex justify-between"><span className="text-white/60">Buyer Profile:</span> <span>Investor, Cash Buyer, UK Resident</span></div>
            <div className="flex justify-between"><span className="text-white/60">Timeline:</span> <span>Visiting Dubai in 2 weeks (August 2026)</span></div>
            <div className="flex justify-between"><span className="text-white/60">Assigned Agent:</span> <span>Marina Off-Plan Specialist</span></div>
          </div>
        </div>
      </section>

      {/* ── 9. Portal Compatibility & Requirements (Conditional Copy) ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8 text-left">
          <h2 className="text-2xl md:text-3xl font-serif">System Compatibility & Requirements</h2>
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 font-light font-sans">
            To connect the database pipelines, we configure secure hooks. We do not require you to rebuild your current spreadsheets. The setup runs on:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[16px]">
            <div className="space-y-2">
              <h4 className="font-bold text-white font-sans">Portal Integration compatibility</h4>
              <p className="text-white/70 leading-[1.7] font-sans font-light">
                The system integrates via portal webhooks or email parsing, depending on portal account levels and system access. Compatible with standard feeds.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-white font-sans">What We Require From You</h4>
              <p className="text-white/70 leading-[1.7] font-sans font-light">
                To build your system, we need access to your inventory spreadsheet, developer brochure PDFs, and standard CRM API tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Why Choose Asif Digital ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">Why Work With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Local UAE Support</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">We are based here in the UAE and work directly with your team.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">No Generic Templates</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">We build and test custom dialogue flows for your inventory neighborhoods.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Secure Data</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">All client communication records are kept private and never sent to public directories. We discuss your data-handling requirements before deciding which tools, hosting locations and integrations are suitable.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Verifiable Setup</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">We explain exactly what technology is configured and how it functions.</p>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ Accordion ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How does the assistant send qualified leads to agents?",
              a: "Once a prospect confirms their budget and target area, the system logs the details and immediately routes them to the agent specializing in that community."
            },
            {
              q: "Does this require us to replace our current database?",
              a: "No. The system connects directly to your existing spreadsheets, email accounts, or CRM setups."
            },
            {
              q: "How does it handle Arabic inquiries?",
              a: "We configure localized language models that understand Arabic inputs and reply appropriately in the correct dialect."
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

      {/* ── 12. Final CTA ── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8">
            Ready to Automate Your <br />
            <span className="italic text-black/50 font-light tracking-normal">Lead Qualification?</span>
          </h2>
          <p className="text-black/60 font-light text-[17px] md:text-[18px] max-w-xl mx-auto leading-[1.7] mb-12 font-sans">
            Schedule a 15-minute call. We will explain how to qualify your leads and reduce missed inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-sans">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20AI%20Broker%20system." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("See a Free WhatsApp Demo", "Final CTA Block", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20AI%20Broker%20system.")}
              className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl h-[52px]"
            >
              See a Free WhatsApp Demo <MessageSquare className="w-4 h-4 text-white" />
            </a>
            <a 
              href="tel:+971545866094" 
              onClick={() => handleCTA("Call Phone", "Final CTA Block", "phone", "tel:+971545866094")}
              className="bg-transparent text-black border border-black/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center justify-center gap-3 h-[52px]"
            >
              Call: +971 54 586 6094 <Phone className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 13. Related Service Links (High Contrast) ── */}
      <div className="py-6 bg-black border-t border-white/5 text-center text-xs tracking-wider text-white/70 font-mono">
        <Link href="/ai-real-estate-uae" className="hover:text-green-400 transition-colors mx-4">AI Real Estate Hub</Link>
        <span className="text-white/20">|</span>
        <Link href="/ai-property-management-uae" className="hover:text-green-400 transition-colors mx-4">AI Property Management</Link>
        <span className="text-white/20">|</span>
        <Link href="/real-estate-digital-solutions-uae" className="hover:text-green-400 transition-colors mx-4">Real Estate Digital Solutions</Link>
      </div>

      {/* Sticky Mobile CTA (WCAG Compliant) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0ced]/90 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-4 md:hidden font-sans">
        <a 
          href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20AI%20Broker%20system."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCTA("Sticky WhatsApp Mobile", "Sticky Footer", "whatsapp", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20AI%20Broker%20system.")}
          className="flex-1 bg-[#25d366] text-white text-center font-bold uppercase tracking-wider text-[13px] py-3 rounded-xl flex items-center justify-center gap-2 h-11"
        >
          <MessageSquare className="w-4 h-4" /> WhatsApp Us
        </a>
        <a 
          href="tel:+971545866094"
          onClick={() => handleCTA("Sticky Phone Mobile", "Sticky Footer", "phone", "tel:+971545866094")}
          className="flex-1 bg-white text-black text-center font-bold uppercase tracking-wider text-[13px] py-3 rounded-xl flex items-center justify-center gap-2 h-11"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
      </div>

    </div>
  );
}
