"use client";

import { motion } from "framer-motion";
import { 
  Building, ArrowRight, ShieldAlert, Cpu, 
  MessageSquare, Phone, CheckCircle, Server, Code, Settings,
  Check, AlertTriangle, Play, HelpCircle
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { trackEvent } from "../../utils/analytics";

export default function AiPropertyManagementUAE() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "phone" | "consultation", destinationUrl: string) => {
    let eventName = "whatsapp_click";
    if (type === "phone") eventName = "phone_click";
    if (type === "consultation") eventName = "consultation_click";

    trackEvent(eventName, {
      service_name: "AI Property Management",
      cta_location: ctaLocation,
      cta_text: ctaText,
      link_url: destinationUrl
    });
  };

  const handleFaq = (index: number, question: string) => {
    if (activeFaq !== index) {
      trackEvent("faq_expand", {
        service_name: "AI Property Management",
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
        "@id": "https://www.asifdigital.agency/ai-property-management-uae#webpage",
        "url": "https://www.asifdigital.agency/ai-property-management-uae",
        "name": "AI Property Management Automation | UAE Landlords",
        "isPartOf": { "@id": "https://www.asifdigital.agency/#website" },
        "breadcrumb": { "@id": "https://www.asifdigital.agency/ai-property-management-uae#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.asifdigital.agency/ai-property-management-uae#breadcrumb",
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
            "name": "AI Property Management",
            "item": "https://www.asifdigital.agency/ai-property-management-uae"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.asifdigital.agency/ai-property-management-uae#service",
        "name": "AI Property Management Automation for UAE Landlords and Teams",
        "description": "Organise tenant messages, rent reminders, maintenance requests and property documents in one connected workflow.",
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
        <span className="text-white/95">AI PROPERTY MANAGEMENT</span>
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
            Property Management Automation
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.15] tracking-tight mb-6">
            AI Property Management Automation <br className="hidden md:inline" />
            <span className="italic text-white/50 font-light tracking-normal">for UAE Landlords and Teams</span>
          </h1>
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 max-w-3xl mx-auto mb-8 font-sans font-light">
            Organise tenant messages, rent reminders, maintenance requests and property documents in one connected workflow—without replacing your existing property-management team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Hero CTA", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests.")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              WhatsApp Us <MessageSquare className="w-4 h-4 text-black" />
            </a>
            <a 
              href="tel:+971545866094" 
              onClick={() => handleCTA("Call Phone", "Hero CTA", "consultation", "tel:+971545866094")}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-3 h-[52px] font-sans"
            >
              Call +971 54 586 6094 <Phone className="w-4 h-4 text-white" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[13px] text-white/70 tracking-wider font-mono">
            <span>✓ UAE SUPPORT NUMBER</span>
            <span>✓ SUPPORTS LANDLORDS & TEAMS</span>
            <span>✓ BILINGUAL ENGLISH & ARABIC</span>
          </div>
        </motion.div>
      </section>

      {/* Hero Visual Section - WebP */}
      <section className="px-6 md:px-12 pb-14 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] w-full bg-neutral-900 shadow-2xl">
          <Image 
            src="/images/property_management_hero_new.png"
            alt="A property management dashboard showing tenant enquiries by unit number, maintenance tickets with status labels, and a rent reminder calendar"
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
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/95 font-sans font-light">
            We build and configure automated text response pipelines that receive and organize tenant inquiries, rental reminders, and maintenance requests. The system captures information on tenant queries and notifies your staff, assisting your team rather than making legal, financial, or tenancy decisions without human approval.
          </p>
        </div>
      </section>

      {/* ── 4. Prominent Limitations Box (What AI Cannot Decide) ── */}
      <section className="px-6 md:px-12 py-6 max-w-3xl mx-auto text-left">
        <div className="p-8 border border-red-500/20 bg-red-500/[0.02] rounded-3xl flex gap-4 items-start">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-red-400 font-sans">What AI Cannot Decide</h3>
            <p className="text-sm text-white/80 leading-relaxed font-sans font-light">
              <strong>Important Notice:</strong> Our systems are built purely to intake and organize text communications. Your property staff retain absolute control and final authorization over:
            </p>
            <ul className="space-y-3 text-[16px] text-white/70 font-sans font-light">
              <li className="flex items-start gap-3"><span className="text-red-400 mt-0.5">✕</span> Rent payment approvals and bank transaction validations</li>
              <li className="flex items-start gap-3"><span className="text-red-400 mt-0.5">✕</span> Hiring and contracting physical maintenance vendors</li>
              <li className="flex items-start gap-3"><span className="text-red-400 mt-0.5">✕</span> Rent pricing increases or lease contract renewals</li>
              <li className="flex items-start gap-3"><span className="text-red-400 mt-0.5">✕</span> Eviction notices, legal filings, and municipal tenancy dispute compliance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. Recognisable Customer Problems ── */}
      <section className="py-14 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">Inconveniences Property Teams Face</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Manual Rent Follow-ups", desc: "Teams waste hours texting tenants about upcoming cheques and bank payments every month." },
            { title: "Unstructured Maintenance Requests", desc: "Tenants send vague text messages about maintenance problems without sharing details or property IDs." },
            { title: "Delayed Renewal Notices", desc: "Expiry dates get missed, causing tenancy disputes or delayed renewals under local regulations." }
          ].map((prob, i) => (
            <div key={i} className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl">
              <span className="text-[13px] font-mono text-green-400 block mb-4">PROBLEM 0{i+1}</span>
              <h3 className="text-lg font-bold mb-3 font-sans">{prob.title}</h3>
              <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">{prob.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Visual: Example WhatsApp Tenant Chat Mockup ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif mb-3">Example Tenant WhatsApp Conversation</h2>
          <p className="text-sm text-white/70 mb-8 font-sans font-light">
            A visual scenario of a tenant reporting an emergency leak to the automated assistant.
          </p>

          <div className="p-6 border border-white/10 bg-black rounded-3xl max-w-md mx-auto text-left space-y-4 shadow-2xl relative">
            <span className="absolute top-4 right-4 bg-green-500/10 border border-green-500/30 text-green-400 text-[13px] font-mono uppercase px-2 py-0.5 rounded-full">
              Demonstration — Not Client Data
            </span>
            
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs shrink-0 text-white/80">T</div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-white/90 leading-relaxed font-sans">
                Hello, there is an AC leak in my apartment (Unit 1402, Al Majaz Tower). Water is dripping on the floor.
              </div>
            </div>
            <div className="flex gap-3 items-start justify-end">
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm text-white/90 leading-relaxed font-sans">
                Hello! Leak reported. Can you please reply with a short 5-second video or photo of the AC unit so I can register this ticket for the maintenance team?
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center font-bold text-xs shrink-0 text-green-400">AI</div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs shrink-0 text-white/80">T</div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-white/90 leading-relaxed font-sans">
                [Sent Attachment: image_ac_leak.jpg]
              </div>
            </div>
            <div className="flex gap-3 items-start justify-end">
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm text-white/90 leading-relaxed font-sans">
                Thank you. Ticket #1084 has been logged for Unit 1402. Our property manager has been notified to assign a maintenance technician. I will update you as soon as they are booked.
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center font-bold text-xs shrink-0 text-green-400">AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Flowchart: AC Maintenance Flow ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">AC Maintenance Workflow</h2>
        <p className="text-sm text-white/70 mb-8 font-sans font-light">
          From the initial WhatsApp drip to dispatching the technician.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left p-6 border border-white/5 bg-white/[0.01] rounded-3xl relative">
          {[
            { title: "1. Tenant Reports", desc: "Tenant sends message and AC leak photo via WhatsApp." },
            { title: "2. Ticket Logged", desc: "AI parses details, extracts unit ID, and creates a draft ticket." },
            { title: "3. Staff Assigns", desc: "Property manager reviews details and assigns a local contractor." },
            { title: "4. Status Alert", desc: "System updates tenant with contractor details and arrival window." }
          ].map((flow, i) => (
            <div key={i} className="p-5 bg-black border border-white/10 rounded-2xl relative flex flex-col justify-between">
              <div>
                <h4 className="text-[17px] font-semibold text-green-400 mb-2 font-sans">{flow.title}</h4>
                <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">{flow.desc}</p>
              </div>
              {i < 3 && <ArrowRight className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 z-10 bg-black rounded-full p-1 border border-white/10" />}
            </div>
          ))}
          <div className="col-span-1 sm:col-span-4 text-center text-[13px] text-white/50 uppercase tracking-widest font-mono pt-2">
            Demonstration — Not Client Data
          </div>
        </div>
      </section>

      {/* ── 8. Visual: Example Logged Maintenance Ticket ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">Example Logged Maintenance Ticket</h2>
        <p className="text-sm text-white/70 mb-8 font-sans font-light">
          A visual mock-up showing the structured details logged inside your team's dashboard.
        </p>

        <div className="p-8 border border-white/10 bg-black rounded-3xl max-w-md mx-auto text-left space-y-4 shadow-2xl relative">
          <span className="absolute top-4 right-4 bg-green-500/10 border border-green-500/30 text-green-400 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full">
            Demonstration — Not Client Data
          </span>
          <h3 className="text-base font-bold text-white font-sans border-b border-white/10 pb-2">Maintenance Job #1084</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-white/60">Property:</span> <span className="font-bold">Al Majaz Tower, Unit 1402</span></div>
            <div className="flex justify-between"><span className="text-white/60">Tenant Name:</span> <span>Sarah Jenkins</span></div>
            <div className="flex justify-between"><span className="text-white/60">Category:</span> <span className="text-red-400">AC & Cooling (Urgent)</span></div>
            <div className="flex justify-between"><span className="text-white/60">Description:</span> <span>AC unit leaking water onto living room parquet</span></div>
            <div className="flex justify-between"><span className="text-white/60">Attachment:</span> <span className="underline text-green-400 cursor-pointer">image_ac_leak.jpg</span></div>
            <div className="flex justify-between"><span className="text-white/60">Date Logged:</span> <span>July 13, 2026</span></div>
            <div className="flex justify-between"><span className="text-white/60">Status:</span> <span className="px-2 py-0.5 bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 text-[10px] rounded">Awaiting Staff Assignment</span></div>
          </div>
        </div>
      </section>

      {/* ── 9. What We Configure ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-serif mb-6">What We Configure</h2>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-8">
            We configure automated text flows to assist property teams. All updates and alerts are routed to your staff for approval before any actions take place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-white/5 bg-black rounded-xl">
              <h3 className="font-bold text-white mb-2 font-sans">WhatsApp Maintenance Intake</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                Collects property codes, issue descriptions, and photographs from tenants, organizing them in one file.
              </p>
            </div>
            <div className="p-6 border border-white/5 bg-black rounded-xl">
              <h3 className="font-bold text-white mb-2 font-sans">Automatic Rent Alerts</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                Sends friendly pre-expiry reminders and bank details via WhatsApp or email prior to rental payment dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. How the System Works Step by Step ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">How the System Works</h2>
        <div className="space-y-6 text-left">
          {[
            "The system reads tenant profiles and contract expiry dates from your database.",
            "Alert reminders are automatically sent out before rent cheque dates or lease expiries.",
            "Tenants can submit maintenance issues via a WhatsApp conversation.",
            "The system gathers photos, descriptions, and registers a maintenance ticket.",
            "The ticket is routed to your property manager to assign a local contractor.",
            "The system keeps the tenant updated on when the technician is dispatched.",
            "Human approval is required for all payments, contracts, and dispute resolutions."
          ].map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="h-6 w-6 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
              <p className="text-sm text-white/80 font-sans font-light leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 11. Exact Deliverables ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-serif mb-8 text-center">What You Receive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 border border-white/5 bg-black rounded-2xl">
              <h3 className="text-xl font-bold mb-4 font-sans">Core Deliverables</h3>
              <ul className="space-y-3 text-[16px] text-white/70 font-sans font-light">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Custom WhatsApp tenant intake program</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Automated rent reminder text alerts</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Maintenance logging ticket dashboard</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Document checklist capture forms</li>
              </ul>
            </div>
            <div className="p-8 border border-white/5 bg-black rounded-2xl">
              <h3 className="text-xl font-bold mb-4 font-sans">Security & Guides</h3>
              <ul className="space-y-3 text-[16px] text-white/70 font-sans font-light">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Custom user guide for property managers</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> 30 days of post-setup monitoring</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Secure database access setups</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Private custom server options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. Practical Use-Case Scenario ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-left">
        <h2 className="text-2xl md:text-4xl font-serif mb-6 text-center">Practical Example: Maintenance Ticket (Example workflow)</h2>
        <div className="p-8 border border-white/5 bg-white/[0.01] rounded-3xl space-y-4">
          <p className="text-xs text-green-400 font-mono tracking-widest uppercase">Example workflow</p>
          <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
            A tenant reports an air-conditioning problem on WhatsApp. The system collects the property number, issue details and photos, creates a maintenance request, notifies the assigned team member and sends the tenant status updates.
          </p>
        </div>
      </section>

      {/* ── 13. Why Choose Asif Digital ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-8 text-center">Why Work With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Local UAE Presence</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">Reach us on +971 54 586 6094 for support.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Safe Data Handling</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">All tenant files and logs are kept secure. We discuss your data-handling requirements before deciding which tools, hosting locations and integrations are suitable.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Human Oversight</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">We ensure your staff retains full final approval before scheduling vendors.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Transparent Setup</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">We configure clean APIs without unnecessary code.</p>
          </div>
        </div>
      </section>

      {/* ── 14. Setup Process ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">Setup Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-sans">
            {[
              { step: "1. Audit", desc: "Assess tenant list layouts." },
              { step: "2. Build", desc: "Set up reminder schedules." },
              { step: "3. Connect", desc: "Verify alerts are sent correctly." }
            ].map((st, i) => (
              <div key={i} className="p-6 border border-white/5 bg-black rounded-xl">
                <h3 className="font-bold text-white mb-2 text-sm">{st.step}</h3>
                <p className="text-xs text-white/70 font-light">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. FAQ Accordion ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Can the AI resolve tenant disputes?",
              a: "No. The system only gathers information and routes it to your team. All final decisions must be approved by your property manager."
            },
            {
              q: "Is tenant personal data kept private?",
              a: "Yes. All databases are configured to protect tenant personal records. We discuss your data-handling requirements before deciding which tools, hosting locations and integrations are suitable."
            },
            {
              q: "Does this require us to change our property managers?",
              a: "No. The system assists your existing staff, removing manual coordination tasks so they can focus on client relations."
            }
          ].map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-6">
              <button
                className="w-full text-left text-lg md:text-xl font-serif py-4 flex justify-between items-center hover:text-white/70 transition-colors font-sans"
                onClick={() => handleFaq(i, faq.q)}
              >
                <span>{faq.q}</span>
                <span className="text-green-400 text-xl">{activeFaq === i ? "−" : "+"}</span>
              </button>
              {activeFaq === i && (
                <p className="mt-2 text-white/75 font-light leading-relaxed text-sm max-w-3xl font-sans">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 16. Final CTA ── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-6xl font-serif tracking-tight mb-8">
            Want to Reduce Repetitive <br />
            <span className="italic text-black/50 font-light tracking-normal">Tenant Messages?</span>
          </h2>
          <p className="text-black/60 font-light text-base max-w-xl mx-auto leading-relaxed mb-12 font-sans">
            Schedule a 15-minute call. We will explain how to set up tenant reminders and maintenance loggers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Final CTA Block", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests.")}
              className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              WhatsApp Us <MessageSquare className="w-4 h-4 text-white" />
            </a>
            <a 
              href="tel:+971545866094" 
              onClick={() => handleCTA("Call Phone", "Final CTA Block", "phone", "tel:+971545866094")}
              className="bg-transparent text-black border border-black/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center justify-center gap-3 h-[52px] font-sans"
            >
              Call: +971 54 586 6094 <Phone className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 17. Related Service Links (High Contrast) ── */}
      <div className="py-6 bg-black border-t border-white/5 text-center text-xs tracking-wider text-white/70 font-mono">
        <Link href="/ai-real-estate-uae" className="hover:text-green-400 transition-colors mx-4">AI Real Estate Hub</Link>
        <span className="text-white/20">|</span>
        <Link href="/ai-real-estate-agencies-dubai" className="hover:text-green-400 transition-colors mx-4">AI Real Estate Agencies</Link>
        <span className="text-white/20">|</span>
        <Link href="/real-estate-digital-solutions-uae" className="hover:text-green-400 transition-colors mx-4">Real Estate Digital Solutions</Link>
      </div>

      {/* Sticky Mobile CTA (WCAG Compliant) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0ced]/90 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-4 md:hidden font-sans">
        <a 
          href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCTA("Sticky WhatsApp Mobile", "Sticky Footer", "whatsapp", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests.")}
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
