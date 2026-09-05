"use client";

import { motion } from "framer-motion";
import { 
  Building, ArrowRight, ShieldAlert, Cpu, 
  MessageSquare, Phone, CheckCircle, Server, Code, Settings,
  Check, AlertTriangle, HelpCircle, FileText, Clock, Users,
  Database, Layers, ArrowUpRight, Wrench, Calendar, FileCheck,
  Send, Bot, ChevronDown
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
        "name": "AI Property Management UAE | Tenant, Leasing & Operations Automation",
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
            "item": "https://www.asifdigital.agency/real-estate"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI Property Management UAE",
            "item": "https://www.asifdigital.agency/ai-property-management-uae"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.asifdigital.agency/ai-property-management-uae#service",
        "name": "AI Property Management Automation for UAE Property Companies",
        "description": "AI property management automation for UAE property companies. Automate tenant inquiries, maintenance triage, lease workflows, and rent collection reminders with human oversight.",
        "provider": { "@id": "https://www.asifdigital.agency/#organization" }
      },
      {
        "@type": "Organization",
        "@id": "https://www.asifdigital.agency/#organization",
        "name": "Asif Digital",
        "url": "https://www.asifdigital.agency/",
        "logo": "https://www.asifdigital.agency/images/asif-digital-ad-mark.png",
        "telephone": "+971 54 586 6094",
        "email": "hello@asifdigital.agency"
      }
    ]
  };

  const comparisonData = [
    {
      workflow: "Tenant Inquiries",
      manual: "Staff manually checks shared inboxes, missed calls, and scattered WhatsApp chats throughout the day.",
      automated: "AI assistant instantly classifies intent, answers verified building FAQs, and escalates complex requests to assigned staff."
    },
    {
      workflow: "Maintenance Triage",
      manual: "Vague texts or voice notes require 3–4 follow-ups to gather unit number, issue description, and photos.",
      automated: "Guided conversational intake collects structured issue categories, photos/videos, and drafts work orders for manager approval."
    },
    {
      workflow: "Lease & Tenancy Prep",
      manual: "Staff repeatedly chases tenants for Emirates ID copies, passport scans, and signatures across email threads.",
      automated: "Automated document checklist collection gathers and validates required files, queuing complete packets for staff review."
    },
    {
      workflow: "Renewals & Rent Alerts",
      manual: "Staff relies on calendar spreadsheets and manually drafts payment reminders right before cheque deposit dates.",
      automated: "Scheduled milestone notifications trigger at 90, 60, and 30 days with automated response classification for staff follow-up."
    },
    {
      workflow: "Owner & Asset Reporting",
      manual: "Property managers spend days at month-end manually compiling maintenance logs and rent collection tables.",
      automated: "Operational events log continuously into a unified dashboard, generating structured executive summaries on demand."
    }
  ];

  const targetAudiences = [
    {
      title: "Property Management Companies",
      desc: "Firms managing residential towers, commercial offices, or master-community portfolios needing centralized communication control."
    },
    {
      title: "Real Estate Brokerage Groups",
      desc: "Agencies operating dedicated property management divisions looking to scale managed units without linear headcount growth."
    },
    {
      title: "Build-to-Rent & Private Operators",
      desc: "Institutional landlords and residential operators seeking high tenant retention, swift maintenance resolution, and SLA adherence."
    },
    {
      title: "Portfolio Landlords (10+ Units)",
      desc: "Private asset owners who require structured oversight of rent collections, tenancy expiries, and vendor jobs across multiple buildings."
    },
    {
      title: "Facility & Operations Teams",
      desc: "On-site operations supervisors coordinating multi-vendor technical maintenance, dispatch logs, and tenant satisfaction."
    }
  ];

  const faqs = [
    {
      q: "Can the AI resolve legal disputes or issue eviction notices?",
      a: "No. The system strictly assists communication intake, triage, and task tracking. All legal notices, lease terminations, tenancy disputes, and rental tribunal matters remain 100% under the manual authorization and execution of your licensed property management team."
    },
    {
      q: "How does the system integrate with our existing property software or CRM?",
      a: "We connect via secure APIs, webhooks, or direct database sync. Whether your agency uses Yardi, MRI Software, Propertybase, custom SQL databases, or structured Google Sheets, the automation functions as an intelligent middleware layer between tenant channels and your central system."
    },
    {
      q: "Is tenant communication and personal data protected under UAE regulations?",
      a: "Yes. All data storage, webhook relays, and message logs comply with the UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (UAE PDPL). Client records remain encrypted, with dedicated server deployment options available for enterprise operators."
    },
    {
      q: "Does this replace our property managers or maintenance coordinators?",
      a: "No. Our systems remove repetitive administrative coordination—such as gathering missing photos, answering parking FAQs, and sending cheque reminders—allowing your property managers to focus on high-value tenant relations and property inspections."
    },
    {
      q: "How long does implementation take?",
      a: "A typical property management workflow automation deploys in 2 to 4 weeks. This includes workflow audit, conversational logic design, API/webhook connection, team training, and 30 days of active post-launch optimization."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* Hidden Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* ── 1. Compact Breadcrumb ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/" className="hover:text-green-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <Link href="/real-estate" className="hover:text-green-400 transition-colors">REAL ESTATE AI HUB</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95">AI PROPERTY MANAGEMENT UAE</span>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 bg-white/5 border border-white/10 text-emerald-400 text-[13px] font-bold uppercase tracking-[0.3em] rounded-full mb-6 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Property Management Automation
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.12] tracking-tight mb-6">
            AI Property Management Automation <br className="hidden md:inline" />
            <span className="italic text-white/60 font-light tracking-normal">for UAE Property Companies</span>
          </h1>
          <p className="text-[17px] md:text-[19px] leading-[1.7] text-white/80 max-w-3xl mx-auto mb-10 font-sans font-light">
            Automate tenant inquiries, maintenance triage, lease workflows, and rent renewal reminders across WhatsApp and your internal systems—keeping your operations team in complete control of approvals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link 
              href="/free-growth-audit"
              onClick={() => handleCTA("Audit Consultation", "Hero Primary CTA", "consultation", "/free-growth-audit")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-emerald-100 transition-all flex items-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              Book Workflow Audit <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20property%20management%20workflows%20in%20the%20UAE." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Hero Secondary CTA", "whatsapp", "https://wa.me/971545866094")}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-3 h-[52px] font-sans"
            >
              Talk to Us on WhatsApp <MessageSquare className="w-4 h-4 text-emerald-400" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[13px] text-white/70 tracking-wider font-mono">
            <span>✓ UAE OPERATIONAL COMPLIANCE</span>
            <span>✓ HUMAN-IN-THE-LOOP APPROVALS</span>
            <span>✓ BILINGUAL ARABIC &amp; ENGLISH</span>
          </div>
        </motion.div>
      </section>

      {/* Hero Visual Section */}
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
            Demonstration — Production Architecture
          </div>
        </div>
      </section>

      {/* ── 3. Direct-Answer Block / Executive Summary ── */}
      <section className="px-6 md:px-12 py-10 max-w-4xl mx-auto text-left">
        <div className="p-8 md:p-12 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-3xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Executive Definition</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif mb-4 text-white">What is AI Property Management?</h2>
          <p className="text-[17px] md:text-[18px] leading-[1.75] text-white/95 font-sans font-light mb-6">
            AI property management uses automation and conversational AI to handle repetitive property operations such as tenant inquiries, maintenance triage, lease workflows, renewal reminders, reporting, and staff task routing while keeping human teams in control of approvals and exceptions.
          </p>
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-white/75 font-sans font-light">
            Asif Digital designs these workflows for UAE property management companies, real estate groups, and portfolio landlords seeking to eliminate communication delays and manual admin without compromising compliance or data ownership.
          </p>
        </div>
      </section>

      {/* ── 4. Prominent Operational Boundaries (What AI Cannot Decide) ── */}
      <section className="px-6 md:px-12 py-6 max-w-4xl mx-auto text-left">
        <div className="p-8 border border-red-500/20 bg-red-500/[0.02] rounded-3xl flex gap-4 items-start">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-red-400 font-sans">Strict Operational Boundaries</h3>
            <p className="text-sm text-white/80 leading-relaxed font-sans font-light">
              <strong>Human-in-the-Loop Safeguards:</strong> Our automation handles communication intake, structured data sorting, and notification routing. Your licensed staff retain sole authority over:
            </p>
            <ul className="space-y-3 text-[16px] text-white/70 font-sans font-light pt-2">
              <li className="flex items-start gap-3"><span className="text-red-400 mt-0.5">✕</span> Rent payment approvals, cheque banking, and financial reconciliations</li>
              <li className="flex items-start gap-3"><span className="text-red-400 mt-0.5">✕</span> Contracting and issuing final payments to physical maintenance vendors</li>
              <li className="flex items-start gap-3"><span className="text-red-400 mt-0.5">✕</span> Rental valuation increases and formal tenancy contract alterations</li>
              <li className="flex items-start gap-3"><span className="text-red-400 mt-0.5">✕</span> Eviction notices, legal dispute filings, and municipal tribunal proceedings</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. Core Commercial Workflows (The 5 Pillars) ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Core Operational Systems</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">The 5 Workflows We Automate for UAE Property Teams</h2>
          <p className="mt-4 text-white/70 text-base leading-relaxed">
            Instead of generic chat tools, we engineer deterministic pipelines that process everyday property events from initial message to resolved ticket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Workflow 1: Tenant Inquiry */}
          <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Tenant Inquiry Automation</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
                Handles common tenant requests across WhatsApp, web, and email without tying up reception staff.
              </p>
              <div className="space-y-2.5 text-xs text-white/75 font-mono pt-4 border-t border-white/10">
                <div className="flex items-center gap-2"><span>1.</span> Tenant message received</div>
                <div className="flex items-center gap-2"><span>2.</span> AI classifies request &amp; context</div>
                <div className="flex items-center gap-2"><span>3.</span> Answers verified FAQs immediately</div>
                <div className="flex items-center gap-2"><span>4.</span> Escalates complex issues to team</div>
              </div>
            </div>
          </div>

          {/* Workflow 2: Maintenance Request */}
          <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Maintenance Request Automation</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
                Transforms unstructured complaints into complete, structured work orders with photos and urgency ratings.
              </p>
              <div className="space-y-2.5 text-xs text-white/75 font-mono pt-4 border-t border-white/10">
                <div className="flex items-center gap-2"><span>1.</span> Tenant reports issue on WhatsApp</div>
                <div className="flex items-center gap-2"><span>2.</span> AI requests unit ID &amp; photos</div>
                <div className="flex items-center gap-2"><span>3.</span> Draft work order generated</div>
                <div className="flex items-center gap-2"><span>4.</span> Manager approves vendor dispatch</div>
              </div>
            </div>
          </div>

          {/* Workflow 3: Lease & Tenancy */}
          <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Lease &amp; Tenancy Workflow Automation</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
                Prepares lease packets, validates required tenant documentation, and manages renewal checklists for staff approval.
              </p>
              <div className="space-y-2.5 text-xs text-white/75 font-mono pt-4 border-t border-white/10">
                <div className="flex items-center gap-2"><span>1.</span> Tenant details &amp; KYC gathered</div>
                <div className="flex items-center gap-2"><span>2.</span> Document checklist verified</div>
                <div className="flex items-center gap-2"><span>3.</span> Packet routed for staff review</div>
                <div className="flex items-center gap-2"><span>4.</span> PMS / CRM system updated</div>
              </div>
            </div>
          </div>

          {/* Workflow 4: Rent & Cheque Renewals */}
          <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Rent Collection &amp; Renewal Workflows</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
                Automates timely pre-expiry notifications and cheque collection milestones, classifying tenant responses.
              </p>
              <div className="space-y-2.5 text-xs text-white/75 font-mono pt-4 border-t border-white/10">
                <div className="flex items-center gap-2"><span>1.</span> 90/60/30-day milestone triggered</div>
                <div className="flex items-center gap-2"><span>2.</span> Courteous WhatsApp alert sent</div>
                <div className="flex items-center gap-2"><span>3.</span> Tenant response auto-classified</div>
                <div className="flex items-center gap-2"><span>4.</span> Payment exceptions escalated</div>
              </div>
            </div>
          </div>

          {/* Workflow 5: Owner Reporting */}
          <div className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Owner &amp; Management Reporting</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
                Consolidates property operational logs into structured performance summaries for landlords and asset managers.
              </p>
              <div className="space-y-2.5 text-xs text-white/75 font-mono pt-4 border-t border-white/10">
                <div className="flex items-center gap-2"><span>1.</span> Daily property events logged</div>
                <div className="flex items-center gap-2"><span>2.</span> Ticket resolution times tracked</div>
                <div className="flex items-center gap-2"><span>3.</span> Monthly report draft compiled</div>
                <div className="flex items-center gap-2"><span>4.</span> High-priority exceptions flagged</div>
              </div>
            </div>
          </div>

          {/* Fast Fact Card */}
          <div className="p-7 border border-emerald-500/20 bg-emerald-500/[0.03] rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Operational Advantage</span>
              <h3 className="text-xl font-serif font-bold mb-3 text-white">Faster Resolution, Zero Staff Burnout</h3>
              <p className="text-sm text-white/75 leading-relaxed font-light">
                By standardizing how requests are logged and routed, property teams eliminate hours spent piecing together unorganized WhatsApp chat histories.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <Link href="/free-growth-audit" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300">
                Audit Your Workflows <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. WhatsApp-Powered Property Operations ── */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Primary UAE Channel</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight mb-6">
              Why WhatsApp is the Backbone of UAE Property Operations
            </h2>
            <p className="text-base text-white/80 leading-relaxed font-light mb-6">
              In the UAE, email has low engagement for urgent tenant requests. Over 90% of tenants, facility contractors, and landlords prefer WhatsApp. Our systems run on the official Meta Cloud API, providing verified business profiles, reliable webhook deliveries, and enterprise security.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 bg-black/40 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">Voice Note Transcription</h4>
                <p className="text-xs text-white/65 leading-relaxed">Converts Arabic and English audio notes into structured text records.</p>
              </div>
              <div className="p-4 border border-white/10 bg-black/40 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">Photo &amp; Video Intake</h4>
                <p className="text-xs text-white/65 leading-relaxed">Direct media collection attached immediately to maintenance tickets.</p>
              </div>
              <div className="p-4 border border-white/10 bg-black/40 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">Official Meta Cloud API</h4>
                <p className="text-xs text-white/65 leading-relaxed">Safe from account bans with full broadcast and template compliance.</p>
              </div>
              <div className="p-4 border border-white/10 bg-black/40 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-1">Seamless Staff Handoff</h4>
                <p className="text-xs text-white/65 leading-relaxed">One-click escalation to human property managers for complex cases.</p>
              </div>
            </div>
          </div>

          <div className="p-6 border border-white/10 bg-black rounded-3xl max-w-md mx-auto w-full space-y-4 shadow-2xl relative">
            <span className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono uppercase px-2 py-0.5 rounded-full">
              Live Mockup
            </span>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 border-b border-white/10 pb-3">Tenant Interaction Flow</h4>
            
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs shrink-0 text-white/80">T</div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                Hello, there is a water leak under the kitchen sink in Unit 804, Marina Heights.
              </div>
            </div>
            <div className="flex gap-3 items-start justify-end">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl rounded-tr-none text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                Hello! We have registered your issue for Unit 804. Please reply with a quick photo of the pipe leak so our plumbing team can bring the right replacement parts.
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0 text-emerald-400">AI</div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs shrink-0 text-white/80">T</div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                [Sent photo: sink_pipe_leak.jpg]
              </div>
            </div>
            <div className="flex gap-3 items-start justify-end">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl rounded-tr-none text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                Photo received. Work order #1420 has been opened and routed to property manager for contractor assignment. You will receive an arrival window shortly.
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0 text-emerald-400">AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Integration Architecture (System Blueprint) ── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">System Architecture</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">How AI Connects to Your Existing Infrastructure</h2>
          <p className="mt-4 text-white/70 text-base leading-relaxed">
            Our systems do not force your team to abandon current databases. We build an intelligent orchestration bridge between tenant touchpoints and back-office software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 block mb-3 font-bold uppercase">Layer 01</span>
              <h3 className="text-lg font-bold text-white mb-2">Incoming Channels</h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">The entry points where tenants, landlords, and contractors reach out.</p>
            </div>
            <ul className="space-y-2 text-xs text-white/80 font-mono pt-4 border-t border-white/10">
              <li>• WhatsApp Business API</li>
              <li>• Property Website Portal</li>
              <li>• Operations Email Inboxes</li>
            </ul>
          </div>

          <div className="p-6 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 block mb-3 font-bold uppercase">Layer 02</span>
              <h3 className="text-lg font-bold text-white mb-2">AI Orchestration</h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">Processes, classifies, and routes incoming communication safely.</p>
            </div>
            <ul className="space-y-2 text-xs text-white/80 font-mono pt-4 border-t border-white/10">
              <li>• Intent Classification</li>
              <li>• Context Retrieval &amp; KYC</li>
              <li>• Escalation Rules &amp; Triggers</li>
            </ul>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 block mb-3 font-bold uppercase">Layer 03</span>
              <h3 className="text-lg font-bold text-white mb-2">Business Systems</h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">Your core records and operational operational software.</p>
            </div>
            <ul className="space-y-2 text-xs text-white/80 font-mono pt-4 border-t border-white/10">
              <li>• Property Management (PMS)</li>
              <li>• Custom CRM / Databases</li>
              <li>• Shared Google Sheets / API</li>
            </ul>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 block mb-3 font-bold uppercase">Layer 04</span>
              <h3 className="text-lg font-bold text-white mb-2">Human Team</h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">Accountable professionals with 100% final sign-off authority.</p>
            </div>
            <ul className="space-y-2 text-xs text-white/80 font-mono pt-4 border-t border-white/10">
              <li>• Property Managers</li>
              <li>• Leasing Officers</li>
              <li>• Maintenance Supervisors</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── 8. Comparison Table (Manual vs AI-Assisted) ── */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Operational Benchmark</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">Manual Operations vs. AI-Assisted System</h2>
            <p className="mt-4 text-white/70 text-base leading-relaxed">
              A factual overview of how structured automation removes day-to-day administrative friction across standard property workflows.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-white font-mono text-xs uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-5">Operational Workflow</th>
                  <th className="p-5 text-white/60">Manual Property Management</th>
                  <th className="p-5 text-emerald-400">AI-Assisted Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light">
                {comparisonData.map((row) => (
                  <tr key={row.workflow} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-5 font-semibold text-white font-sans">{row.workflow}</td>
                    <td className="p-5 text-white/60 leading-relaxed">{row.manual}</td>
                    <td className="p-5 text-white/90 leading-relaxed font-sans">{row.automated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 9. Mid-Page Contextual CTA ── */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <div className="p-8 md:p-12 border border-white/10 bg-white/[0.02] rounded-3xl">
          <h2 className="text-2xl md:text-4xl font-serif mb-4">Want to review your current property workflow?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Schedule a 20-minute operational audit. We map how tenant messages, maintenance requests, and renewals currently flow through your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/free-growth-audit"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-emerald-100 transition-all flex items-center gap-3 h-[50px]"
            >
              Book Workflow Audit <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20review%20our%20property%20management%20workflow." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-3 h-[50px]"
            >
              Talk to Us on WhatsApp <MessageSquare className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. Who This Is For ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Qualified Operators</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">Who This System is Engineered For</h2>
          <p className="mt-4 text-white/70 text-base leading-relaxed">
            We work with established real estate operations in Dubai, Sharjah, Abu Dhabi, and across the UAE that handle ongoing tenant communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {targetAudiences.map((aud, i) => (
            <div key={aud.title} className="p-7 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-3">0{i+1}</span>
                <h3 className="text-lg font-bold text-white mb-2 font-sans">{aud.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed font-light">{aud.desc}</p>
              </div>
            </div>
          ))}
          <div className="p-7 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-3">Requirement</span>
              <h3 className="text-lg font-bold text-white mb-2 font-sans">Minimum Operational Scale</h3>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                Best suited for teams managing at least 10–15 units or handling more than 50 tenant touchpoints per month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Implementation Process & Pricing Factors ── */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Rollout Methodology</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight mb-6">
              2 to 4-Week Implementation
            </h2>
            <p className="text-base text-white/75 leading-relaxed font-light mb-8">
              We deploy systems methodically to ensure zero disruption to existing tenants and staff workflows.
            </p>
            <div className="space-y-4">
              {[
                { phase: "Week 1", title: "Workflow Audit & Mapping", desc: "Audit tenant intake channels, frequent FAQs, and current PMS or spreadsheet structure." },
                { phase: "Week 2", title: "Logic Design & Webhooks", desc: "Configure conversation logic, document upload forms, and automated CRM integration." },
                { phase: "Week 3", title: "Internal Testing & Staging", desc: "Staff dry runs, escalation rule tests, and bilingual dialogue verification." },
                { phase: "Week 4", title: "Live Launch & 30-Day Support", desc: "Supervised tenant rollout with 30 days of active log monitoring and prompt tuning." }
              ].map((step) => (
                <div key={step.phase} className="p-4 border border-white/10 bg-black/40 rounded-xl flex gap-4 items-start">
                  <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 mt-1">{step.phase}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-xs text-white/65 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Transparent Commercials</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight mb-6">
              Clear Pricing Factors
            </h2>
            <p className="text-base text-white/75 leading-relaxed font-light mb-8">
              We do not invent arbitrary packages. Implementation costs depend strictly on the technical variables of your portfolio:
            </p>
            <div className="space-y-4">
              <div className="p-6 border border-white/10 bg-black/40 rounded-2xl">
                <h4 className="text-base font-semibold text-white mb-2">1. Portfolio Size &amp; Unit Volume</h4>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  Managing 25 residential units involves different concurrency and database requirements than a 500-unit portfolio across multiple towers.
                </p>
              </div>
              <div className="p-6 border border-white/10 bg-black/40 rounded-2xl">
                <h4 className="text-base font-semibold text-white mb-2">2. Database &amp; PMS Integration Depth</h4>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  Simple webhook alerts to Google Sheets or Slack are faster to deploy than two-way enterprise integrations with enterprise PMS platforms.
                </p>
              </div>
              <div className="p-6 border border-white/10 bg-black/40 rounded-2xl">
                <h4 className="text-base font-semibold text-white mb-2">3. Approval Hierarchy &amp; Escalation Complexity</h4>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  Custom routing rules per building, vendor assignment tiers, and specialized bilingual Arabic support adjust the initial setup scope.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. Related UAE Real Estate Automation Ecosystem ── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Topical Ecosystem</span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight">Connected UAE Real Estate Technology</h2>
          <p className="mt-3 text-white/70 text-base leading-relaxed">
            Property management is one layer of our comprehensive digital and automation suite for UAE property businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Real Estate Digital Solutions",
              href: "/real-estate-digital-solutions-uae",
              desc: "Complete digital infrastructure, custom agency websites, and lead pipelines."
            },
            {
              title: "Broker AI Copilot Dubai",
              href: "/real-estate/broker-ai-copilot-dubai",
              desc: "Instant agent copilot for off-plan inventory, brochures, and lead qualification."
            },
            {
              title: "Portal Lead Integration",
              href: "/real-estate/portal-lead-integration-dubai",
              desc: "Automated webhook capture from Bayut, Property Finder, and Dubizzle."
            },
            {
              title: "AI Lead Dashboard",
              href: "/real-estate/ai-lead-dashboard",
              desc: "Cross-channel attribution and lead response SLA monitoring for agency executives."
            }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-emerald-400/40 hover:bg-white/[0.05] transition-all group flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-serif font-semibold text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {link.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">{link.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                Explore Solution <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 13. FAQ Accordion ── */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-[12px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">Common Questions</span>
          <h2 className="text-3xl md:text-5xl font-serif">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-white/[0.015] rounded-2xl p-6">
              <button
                className="w-full text-left text-lg md:text-xl font-serif flex justify-between items-center hover:text-emerald-300 transition-colors"
                onClick={() => handleFaq(i, faq.q)}
              >
                <span>{faq.q}</span>
                <span className="text-emerald-400 text-2xl font-mono">{activeFaq === i ? "−" : "+"}</span>
              </button>
              {activeFaq === i && (
                <p className="mt-4 text-white/75 font-light leading-relaxed text-sm md:text-base border-t border-white/10 pt-4 font-sans">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 14. Final CTA Block ── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-6xl font-serif tracking-tight mb-6">
            Eliminate Repetitive Tenant Admin. <br />
            <span className="italic text-black/55 font-light tracking-normal">Protect Operations Time.</span>
          </h2>
          <p className="text-black/70 font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-sans">
            Schedule a 20-minute workflow discovery call. We will review your current communication bottlenecks and outline a practical automation blueprint.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/free-growth-audit"
              onClick={() => handleCTA("Audit Consultation", "Final CTA Block", "consultation", "/free-growth-audit")}
              className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              Book Workflow Audit <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20property%20management%20workflows%20in%20the%20UAE." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Final CTA Block", "whatsapp", "https://wa.me/971545866094")}
              className="bg-transparent text-black border border-black/25 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center justify-center gap-3 h-[52px] font-sans"
            >
              WhatsApp Us <MessageSquare className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 15. Ecosystem Footer Strip ── */}
      <div className="py-6 bg-black border-t border-white/5 text-center text-xs tracking-wider text-white/70 font-mono">
        <Link href="/real-estate" className="hover:text-emerald-400 transition-colors mx-3">Real Estate AI Hub</Link>
        <span className="text-white/20">|</span>
        <Link href="/real-estate-digital-solutions-uae" className="hover:text-emerald-400 transition-colors mx-3">Real Estate Digital Solutions</Link>
        <span className="text-white/20">|</span>
        <Link href="/real-estate/broker-ai-copilot-dubai" className="hover:text-emerald-400 transition-colors mx-3">Broker AI Copilot</Link>
        <span className="text-white/20">|</span>
        <Link href="/real-estate/portal-lead-integration-dubai" className="hover:text-emerald-400 transition-colors mx-3">Portal Lead Integration</Link>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0ced]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-4 md:hidden font-sans">
        <a 
          href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20property%20management%20workflows%20in%20the%20UAE."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCTA("Sticky WhatsApp Mobile", "Sticky Footer", "whatsapp", "https://wa.me/971545866094")}
          className="flex-1 bg-[#25d366] text-white text-center font-bold uppercase tracking-wider text-[10px] py-3 rounded-xl flex items-center justify-center gap-2 h-11 font-sans"
        >
          <MessageSquare className="w-4 h-4" /> WhatsApp Us
        </a>
        <Link 
          href="/free-growth-audit"
          onClick={() => handleCTA("Sticky Audit Mobile", "Sticky Footer", "consultation", "/free-growth-audit")}
          className="flex-1 bg-white text-black text-center font-bold uppercase tracking-wider text-[10px] py-3 rounded-xl flex items-center justify-center gap-2 h-11 font-sans"
        >
          Book Audit
        </Link>
      </div>

    </div>
  );
}
