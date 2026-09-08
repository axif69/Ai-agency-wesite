"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Building,
  CheckCircle2,
  Clock,
  Compass,
  Database,
  ExternalLink,
  Globe,
  Headphones,
  HelpCircle,
  Hotel,
  Key,
  Layers,
  MessageSquare,
  PhoneCall,
  RefreshCw,
  Send,
  Shield,
  Sparkles,
  Users,
  Utensils,
  Zap,
  ChevronDown,
} from "lucide-react";

interface WorkflowModule {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
}

const workflows: WorkflowModule[] = [
  {
    number: "01",
    title: "24/7 Multilingual WhatsApp Concierge",
    subtitle: "In-Stay Guest Assistance & Information",
    description:
      "Automating answers for check-in/out policies, Wi-Fi access, pool and beach club hours, spa reservations, and curated Dubai/UAE city itineraries directly through official WhatsApp Business infrastructure.",
    capabilities: [
      "Multilingual guest workflows with Arabic/English and additional languages configured and validated for the property’s guest mix",
      "Dynamic hotel amenities and operating schedule directory",
      "Concierge recommendations for regional dining, excursions, and beach clubs",
      "Voice note processing for conversational guest inquiries where enabled",
    ],
  },
  {
    number: "02",
    title: "Direct Booking Inquiry Support",
    subtitle: "Direct Booking Inquiry Support & Upsell Routing",
    description:
      "Assisting prospective guests with room inquiries, availability questions, and direct booking links to support direct reservation share alongside third-party OTA channels.",
    capabilities: [
      "Automated room rate, availability, and suite category information assistance",
      "Direct handoff to hotel booking engine with secure payment gateway redirection",
      "Pre-arrival room upgrade and airport transfer inquiry routing",
      "Follow-up sequences for abandoned booking inquiries",
    ],
  },
  {
    number: "03",
    title: "In-Stay Service & Maintenance Request Dispatch",
    subtitle: "Automated Housekeeping & Engineering Routing",
    description:
      "Empowering guests to request extra amenities, luggage assistance, housekeeping timing, or technical maintenance through messaging, instantly generating structured tickets for department queues.",
    capabilities: [
      "Natural language request classification (Housekeeping, Maintenance, In-Room Dining)",
      "Automated room-number validation and ticket dispatch to departmental dashboards",
      "Real-time status updates delivered back to the guest upon request completion",
      "Escalation timers alerting the Duty Manager if priority requests exceed SLA thresholds",
    ],
  },
  {
    number: "04",
    title: "PMS Integration Options & Guest Data Pathways",
    subtitle: "Property Management System Integration Middleware",
    description:
      "Middleware integration options connecting conversational channels to hotel Property Management Systems (PMS), subject to API access, property permissions, and existing technology stack.",
    capabilities: [
      "Integration options for PMS platforms (such as Oracle Opera, Protel, Cloudbeds, or specialized engines) subject to API access",
      "Reservation retrieval and inquiry verification using confirmation details",
      "Guest preference logging (dietary requests, floor preference, amenity timing)",
      "Tokenized data handling protecting sensitive guest registration folios",
    ],
  },
  {
    number: "05",
    title: "VIP & Loyalty Tier Intelligent Routing",
    subtitle: "Recognition & Executive Notification Protocol",
    description:
      "Automatically identifying recognized loyalty members, repeat corporate clients, and suite bookers to trigger personalized greetings and instant staff notifications.",
    capabilities: [
      "Instant PMS loyalty tier lookup across frequent guest databases where integrated",
      "Automated internal Slack/Teams push alerts to General Manager & Guest Relations",
      "Priority queuing for VIP concierge inquiries and bespoke dining reservations",
      "Customized welcome itineraries based on historical stay preferences",
    ],
  },
  {
    number: "06",
    title: "Human-in-the-Loop Duty Manager Escalation",
    subtitle: "Zero-Risk Service Recovery Safeguards",
    description:
      "Strict conversational boundaries ensuring that billing disputes, guest dissatisfaction, or complex bespoke requests are routed instantly to the on-duty front office team.",
    capabilities: [
      "Automated sentiment detection triggering immediate human staff takeover",
      "Full conversation transcript and guest history delivered to front desk agents",
      "Seamless shift from automated concierge to human staff within the same WhatsApp thread",
      "Post-recovery logging for management review and quality assurance",
    ],
  },
];

const faqs = [
  {
    q: "Which hotel Property Management Systems (PMS) can you integrate with?",
    a: "We engineer integration options for hotel Property Management Systems (PMS), subject to API access, property permissions, and the property's existing technology stack (such as Oracle Opera, Protel, Cloudbeds, or specialized booking engines). For independent boutique properties or serviced apartment groups using custom databases, we configure webhook-based data pathways.",
  },
  {
    q: "How does the AI concierge handle multilingual guests in the UAE?",
    a: "Our conversational architecture provides multilingual guest workflows with Arabic and English as standard, with additional languages configured and validated for the property's guest mix. Guests can submit inquiries in their preferred language while staff receive structured notifications in their primary operational language.",
  },
  {
    q: "Are payment card details processed through WhatsApp or AI chat?",
    a: "No. In strict compliance with PCI-DSS standards and hotel security guidelines, sensitive credit card details are never collected or stored over plain messaging. For reservation confirmations, deposits, or dining prepayments, the system generates secure, tokenized payment gateway links directing guests to the hotel's PCI-compliant booking engine.",
  },
  {
    q: "Can the AI take over our front-desk or concierge staff?",
    a: "No. Hospitality AI is designed to assist and elevate staff, not replace human hospitality. It resolves a significant volume of routine operational questions (such as Wi-Fi instructions, facility schedules, luggage requests, and check-out policies), allowing your front-desk and concierge professionals to focus on genuine guest hospitality, face-to-face service recovery, and VIP care.",
  },
  {
    q: "What happens when a guest submits a complaint or service issue?",
    a: "The system features automated sentiment analysis and strict escalation boundaries. When a complaint, dissatisfaction, or sensitive issue is detected, the AI acknowledges the concern with professional empathy, refrains from hallucinating solutions, and immediately alerts the Front Office Duty Manager with the guest's room number and complete chat log.",
  },
  {
    q: "How long does deployment take for a hotel or resort in Dubai?",
    a: "An indicative hotel implementation typically spans 3 to 6 weeks, depending on property scope, system access, and integration complexity. Phase 1 covers property knowledge base curation and WhatsApp Business API verification; Phase 2 covers PMS middleware connection and department ticket routing; Phase 3 involves staff training, sandbox testing, and staged go-live.",
  },
];

export default function HospitalityAiAutomationUAE() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Operational Modeling Calculator State
  const [roomCount, setRoomCount] = useState(250);
  const [dailyInquiriesPerRoom, setDailyInquiriesPerRoom] = useState(1.5);
  const [minutesPerInquiry, setMinutesPerInquiry] = useState(4);

  // Calculations: Routine Guest Inquiry Volume & Front-Desk Handling Hours Model
  const monthlyInquiries = Math.round(roomCount * dailyInquiriesPerRoom * 30);
  const hoursSavedPerMonth = Math.round((monthlyInquiries * (minutesPerInquiry / 60)) * 0.50); // conservative 50% automated resolution model
  const routineQuestionsResolved = Math.round(monthlyInquiries * 0.50);

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-emerald-400/30">
      {/* ── 1. Breadcrumbs ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 text-xs font-mono text-white/50 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-400 transition-colors">HOME</Link>
        <span>&gt;</span>
        <Link href="/services" className="hover:text-emerald-400 transition-colors">SERVICES</Link>
        <span>&gt;</span>
        <span className="text-white/90">HOSPITALITY AI AUTOMATION UAE</span>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.1),transparent_40%)] pointer-events-none" />

        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 mb-6">
            <Hotel className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
              Luxury Hotels • Resorts • Serviced Apartments UAE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.05] mb-6">
            Hospitality AI &amp; Hotel <br />
            <span className="italic text-white/50 font-light">Workflow Automation in the UAE</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 font-light leading-relaxed mb-8 max-w-3xl">
            We engineer 24/7 multilingual WhatsApp AI concierge desks, PMS middleware integration options, direct booking inquiry support, and automated housekeeping dispatch for luxury hotels, resorts, and hospitality groups across Dubai, Abu Dhabi, and the GCC.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/10"
            >
              Schedule Hospitality Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20hospitality%20AI%20and%20hotel%20workflow%20automation."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" /> WhatsApp Strategic Desk
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-white/50 tracking-wider font-mono mt-10">
            <span>✓ 24/7 WHATSAPP CONCIERGE</span>
            <span>✓ PMS INTEGRATION OPTIONS</span>
            <span>✓ BILINGUAL ARABIC &amp; ENGLISH</span>
            <span>✓ AUTOMATED SERVICE DISPATCH</span>
          </div>
        </div>
      </section>

      {/* ── 3. Direct System Definition & AEO Target Block ── */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.015] border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] uppercase tracking-widest text-emerald-400 font-mono mb-3 font-semibold">
            Industry Solution Overview
          </div>
          <h2 className="text-2xl md:text-4xl font-serif mb-6 text-white">
            What is Hospitality AI &amp; Hotel Workflow Automation?
          </h2>
          <p className="text-white/80 font-light text-base md:text-lg leading-relaxed mb-6">
            In the UAE luxury hospitality market, <strong>hotel workflow automation</strong> connects front-facing guest messaging channels (official WhatsApp Business API, web chat, in-room QR portals) to back-of-house operational systems—including Property Management Systems (PMS), housekeeping management software, maintenance ticketing queues, and direct reservation inquiry pathways.
          </p>
          <div className="p-6 rounded-2xl border border-white/10 bg-black/50 text-sm text-white/70 leading-relaxed font-light">
            <span className="text-emerald-400 font-mono text-xs uppercase block mb-1 font-semibold">
              The UAE Luxury Standard
            </span>
            Dubai and Abu Dhabi guests expect instantaneous, personalized, and multilingual service at all hours. By automating routine inquiries, amenity requests, and dining bookings within seconds, hotels reduce front-desk telephone strain, elevate Guest Satisfaction Scores (GSS), and support direct booking inquiries alongside third-party OTA channels.
          </div>
        </div>
      </section>

      {/* ── 4. Traditional Front Desk vs. Automated Hospitality AI ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2 font-semibold">
            Operational Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Conventional Hotel Front-Desk vs. Automated Hospitality AI
          </h2>
          <p className="text-white/60 font-light text-sm md:text-base max-w-2xl mx-auto mt-3">
            Why leading UAE luxury properties are deploying automated messaging middleware alongside their service staff.
          </p>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-3xl bg-white/[0.01]">
          <table className="w-full text-left border-collapse text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-5 px-6 font-semibold text-white/60 font-mono text-xs uppercase">Operational Layer</th>
                <th className="py-5 px-6 font-semibold text-red-400/80 font-mono text-xs uppercase">Traditional Hotel Desk</th>
                <th className="py-5 px-6 font-semibold text-emerald-400 font-mono text-xs uppercase">Asif Digital Hospitality AI System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light text-white/80">
              <tr>
                <td className="py-5 px-6 font-medium text-white">Guest Response Time</td>
                <td className="py-5 px-6 text-white/50">3 to 15 min phone queue or physical desk wait</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Instant &lt; 15 seconds 24/7 via WhatsApp</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Direct Booking Inquiries</td>
                <td className="py-5 px-6 text-white/50">Lost to OTAs during late night and peak shift hours</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Immediate qualification with direct booking link generation</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Service Request Dispatch</td>
                <td className="py-5 px-6 text-white/50">Manual paper log or verbal walkie-talkie relays</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Direct webhook ticketing into Housekeeping/Maintenance</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Multilingual Coverage</td>
                <td className="py-5 px-6 text-white/50">Constrained by on-duty staff language capabilities</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Native handling across 20+ languages including Arabic &amp; Russian</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">VIP Guest Recognition</td>
                <td className="py-5 px-6 text-white/50">Manual review of daily VIP arrival lists</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Automated PMS loyalty tier lookup with instant manager alerts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. The 6 Core Hospitality AI Workflows ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2 font-semibold">
            Enterprise Architecture
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            6 Specialized Hospitality AI Workflows
          </h2>
          <p className="text-white/60 font-light text-base leading-relaxed">
            Custom-engineered workflows designed specifically around the daily operating cadence of UAE hotels, luxury resorts, and serviced residences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workflows.map((wf) => (
            <div
              key={wf.number}
              className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.015] hover:border-emerald-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-serif text-emerald-400 font-bold">{wf.number}</span>
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                    {wf.subtitle}
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-white mb-3">{wf.title}</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                  {wf.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  {wf.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Interactive Hospitality Operational Workload Model ── */}
      <section className="py-24 px-6 md:px-12 bg-[#070707] border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2 font-semibold">
              Operational Modeling
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-3">
              Hospitality Operational Workload &amp; Efficiency Model
            </h2>
            <p className="text-white/60 font-light text-sm max-w-xl mx-auto">
              Model monthly routine inquiry volume and front-desk handling hours based on your property inventory.
            </p>
          </div>

          <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/60 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/70">Property Room / Key Count:</span>
                  <span className="text-white font-bold">{roomCount} Keys</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={800}
                  step={25}
                  value={roomCount}
                  onChange={(e) => setRoomCount(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-white/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1">
                  <span>50 Keys (Boutique)</span>
                  <span>400 Keys</span>
                  <span>800 Keys (Resort)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/70">Avg Daily Inquiries Per Room:</span>
                  <span className="text-white font-bold">{dailyInquiriesPerRoom} Inquiries</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={3.0}
                  step={0.1}
                  value={dailyInquiriesPerRoom}
                  onChange={(e) => setDailyInquiriesPerRoom(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-white/70">Staff Minutes Spent Per Inquiry:</span>
                  <span className="text-white font-bold">{minutesPerInquiry} Minutes</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={8}
                  step={0.5}
                  value={minutesPerInquiry}
                  onChange={(e) => setMinutesPerInquiry(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 text-center space-y-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold block mb-1">
                  Estimated Monthly Guest Inquiries
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {monthlyInquiries.toLocaleString()} <span className="text-base font-sans text-white/50">inquiries / mo</span>
                </div>
                <p className="text-xs text-white/60 font-light mt-1">
                  ~{routineQuestionsResolved.toLocaleString()} routine queries addressable via automated WhatsApp concierge
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs uppercase font-mono tracking-widest text-emerald-400/80 font-semibold block mb-1">
                  Estimated Staff Time Reallocated
                </span>
                <div className="text-3xl md:text-4xl font-serif text-white">
                  ~{hoursSavedPerMonth.toLocaleString()} <span className="text-xs font-sans text-white/50">hrs / mo</span>
                </div>
                <p className="text-xs text-white/50 font-light mt-1">
                  Equivalent to ~{Math.round(hoursSavedPerMonth / 160 * 10) / 10} staff hours redirectable to face-to-face guest hospitality
                </p>
              </div>

              <Link
                href="/contact"
                className="w-full bg-emerald-400 text-black py-3.5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
              >
                Schedule Technical Property Audit <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <p className="text-[11px] text-white/40 italic mt-8 text-center border-t border-white/5 pt-4 max-w-2xl mx-auto">
            *Disclaimer: Figures are illustrative projections based on modeled inquiry frequencies. Actual time reallocation depends on property guest profile, amenity mix, season, and existing staff workflows.
          </p>
        </div>
      </section>

      {/* ── 7. Operational Boundaries & Data Governance ── */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto border-b border-white/5">
        <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl md:text-2xl font-serif text-white">
              Data Privacy &amp; Operational Boundaries
            </h3>
          </div>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-4">
            All hospitality AI workflows are engineered in compliance with the UAE Personal Data Protection Law (PDPL) and PCI-DSS compliance standards. Guest payment details are never processed over unencrypted messaging channels; tokenized payment redirects are utilized exclusively.
          </p>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Asif Digital provides software engineering, API integration, and conversational automation middleware. Physical hospitality execution, guest check-in verification, key card handover, and food service delivery remain the exclusive responsibility of your hotel operating team.
          </p>
        </div>
      </section>

      {/* ── 8. Intent Bridge Cards ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bridge to Workflow Automation */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
                Enterprise Process Middleware
              </span>
              <h3 className="text-2xl font-serif text-white mb-3">Enterprise Workflow Automation UAE</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                Explore our full-stack workflow automation systems built on n8n and Make, connecting CRM pipelines, ERP systems, accounting software, and operational dispatch across the UAE.
              </p>
            </div>
            <Link
              href="/workflow-automation-uae"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Explore Workflow Automation UAE <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bridge to Arabic AI Hub */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
                Bilingual Regional Experience
              </span>
              <h3 className="text-2xl font-serif text-white mb-3">Bilingual Arabic AI Solutions</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                Discover our bilingual Arabic and Khaleeji conversational systems, custom-built for regional GCC guests, local etiquette, and culturally aligned customer service.
              </p>
            </div>
            <Link
              href="/arabic-ai-hub"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-emerald-400 transition-colors"
            >
              Explore Arabic AI Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. Frequently Asked Questions ── */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-3">Frequently Asked Questions</h2>
          <p className="text-white/50 text-sm font-light">
            Answers to key technical and operational questions about deploying AI in UAE hotels and resorts.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <h3 className="text-base md:text-lg font-serif text-white pr-4">{faq.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5">
                    <p className="text-sm text-white/70 leading-relaxed font-light">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 10. Final CTA ── */}
      <section className="py-28 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#0a120e]">
        <div className="max-w-4xl mx-auto relative z-10">
          <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">
            Elevate Your Guest Experience
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Let us audit your current guest communication touchpoints, PMS integration readiness, and housekeeping dispatch queues to design a tailored hospitality automation roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-emerald-400 text-black px-10 py-5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20"
            >
              Book Property Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-9 py-5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:bg-white/5 transition-colors text-white/80"
            >
              Direct Strategist Chat
            </a>
          </div>
        </div>
      </section>

      {/* ── 11. Topic Cluster Footer Navigation ── */}
      <section className="py-12 border-t border-white/5 bg-black text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Hospitality &amp; Operational Automation Hub
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/hospitality-ai-automation-uae" className="hover:text-white transition-colors text-emerald-400 font-medium">Hospitality AI Automation UAE</Link>
            <span className="text-white/20">•</span>
            <Link href="/workflow-automation-uae" className="hover:text-white transition-colors">Workflow Automation UAE</Link>
            <span className="text-white/20">•</span>
            <Link href="/services/whatsapp-automation-gcc" className="hover:text-white transition-colors">WhatsApp Automation GCC</Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/arabic-ai-hub" className="hover:text-white transition-colors">Arabic AI Hub</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
