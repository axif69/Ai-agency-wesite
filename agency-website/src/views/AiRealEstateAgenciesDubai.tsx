"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Building, UserCheck, ArrowRight, ShieldAlert, Cpu, 
  MessageSquare, Phone, CheckCircle, HelpCircle, Server, Code, Settings,
  Check, AlertCircle, RefreshCw, Send, Sparkles, User, Calendar,
  ChevronDown, ExternalLink, Database, Layers, Target, Clock, Shield
} from "lucide-react";
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

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">

      {/* ── 1. Compact Breadcrumb ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/" className="hover:text-emerald-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <Link href="/real-estate" className="hover:text-emerald-400 transition-colors">REAL ESTATE AI HUB</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95 font-sans">AI FOR AGENCIES</span>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="px-6 md:px-12 py-12 max-w-6xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 py-2 px-5 bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-8 font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Bespoke Agency AI Systems • Dubai & UAE Brokerages
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-6">
          AI for Real Estate Agencies <br className="hidden md:inline" />
          <span className="italic text-white/60 font-light tracking-normal">in Dubai</span>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-white/80 max-w-3xl mx-auto mb-10 font-sans font-light">
          We engineer end-to-end AI infrastructure for Dubai brokerage firms: automated portal lead intake, automated conversational WhatsApp qualification, intelligent broker routing, and continuous CRM synchronization.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20AI%20Real%20Estate%20Agency%20system." 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => handleCTA("Request WhatsApp Demo", "Hero CTA", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20AI%20Real%20Estate%20Agency%20system.")}
            className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-2xl h-[52px]"
          >
            Request Live Demo <MessageSquare className="w-4 h-4 text-black" />
          </a>
          <Link 
            href="/contact" 
            className="w-full sm:w-auto border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2 h-[52px]"
          >
            Book Agency Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <a 
            href="tel:+971545866094" 
            onClick={() => handleCTA("Call Now", "Hero CTA", "phone", "tel:+971545866094")}
            className="w-full sm:w-auto border border-white/10 bg-white/[0.02] text-white/80 px-6 py-4 rounded-full font-mono text-xs hover:text-white transition-all flex items-center justify-center gap-2 h-[52px]"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" /> +971 54 586 6094
          </a>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-white/60 tracking-wider font-mono">
          <span>✓ PROPERTY FINDER & BAYUT WEBHOOKS</span>
          <span>✓ BILINGUAL ARABIC & ENGLISH</span>
          <span>✓ HUBSPOT, SALESFORCE & ZOHO SYNC</span>
        </div>
      </section>

      {/* ── 3. Immediate Plain-Language Answer Block (AEO / GEO Definition) ── */}
      <section className="px-6 md:px-12 py-10 max-w-5xl mx-auto">
        <div className="p-8 md:p-10 border border-white/15 bg-white/[0.02] rounded-3xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
            <Sparkles className="w-4 h-4" />
            Executive Operational Definition
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
            How Does AI Transform Real Estate Agency Operations in Dubai?
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-white/85 font-sans font-light mb-4">
            In the UAE property market, an <strong>AI system for real estate agencies</strong> acts as an automated operational backbone connecting your advertising campaigns and property portal leads directly to your sales floor. 
          </p>
          <p className="text-sm md:text-base leading-relaxed text-white/70 font-sans font-light">
            When an overseas investor or local buyer registers interest on Property Finder, Bayut, Meta, or your website, the AI system initiates automated conversational qualification after the lead trigger is received. It verifies budget range, financing status (cash vs. mortgage), purchase timeline, and preferred communities (e.g. Palm Jumeirah, Dubai Marina, Dubai Hills). Once verified, the lead receives relevant project brochures, and a fully structured dossier is pushed directly to the specific community broker's phone and CRM.
          </p>
        </div>
      </section>

      {/* ── 4. Manual Operations vs. AI-Powered Agency Operations ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Operational Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            Traditional Manual Brokerage Follow-Up vs. Automated Agency Workflow Infrastructure
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm md:text-base">
            Where Dubai agencies lose deals today and how intelligent automation fixes the pipeline leakage.
          </p>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-3xl bg-white/[0.01]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-5 px-6 font-semibold text-white/60 font-mono text-xs uppercase">Operational Process</th>
                <th className="py-5 px-6 font-semibold text-red-400/80 font-mono text-xs uppercase">Traditional Manual Brokerage Follow-Up</th>
                <th className="py-5 px-6 font-semibold text-emerald-400 font-mono text-xs uppercase">Automated Agency Workflow Infrastructure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light text-white/80">
              <tr>
                <td className="py-5 px-6 font-medium text-white">First Response Time</td>
                <td className="py-5 px-6 text-white/50">2 to 6 hours (often next morning for late-night inquiries)</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Automated conversational reply upon trigger reception</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Portal Lead Processing</td>
                <td className="py-5 px-6 text-white/50">Manual copy-paste from Bayut / Property Finder emails</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Webhook parsing, deduplication, and automated greeting</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Buyer Qualification</td>
                <td className="py-5 px-6 text-white/50">Agents spend 60% of their day calling unqualified or fake leads</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Automated budget, timeline, and location filtering before agent handoff</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Broker Lead Routing</td>
                <td className="py-5 px-6 text-white/50">Round-robin spreadsheets without considering community specialization</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Intelligent routing matching buyer area/budget to community specialists</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Brochure & Floorplan Dispatch</td>
                <td className="py-5 px-6 text-white/50">Broker searches local folders and forwards PDFs hours later</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Dynamic floorplan and unit layout delivery directly inside WhatsApp chat</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Stale Lead Re-Engagement</td>
                <td className="py-5 px-6 text-white/50">Thousands of older CRM contacts go untouched and decay</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Automated re-engagement campaigns when new off-plan launches match saved criteria</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Six Core Real Estate Agency Modules ── */}
      <section className="py-20 bg-white/[0.01] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
              Comprehensive Platform Architecture
            </span>
            <h2 className="text-3xl md:text-5xl font-serif">
              6 Core Modules Built for Dubai Brokerages
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm md:text-base">
              A modular suite configured around your existing agency workflows, property inventory, and sales team hierarchy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Module 1 */}
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">1. Multi-Channel Lead Intake</h3>
                <p className="text-white/70 font-light text-xs leading-relaxed mb-4">
                  Capture inbound inquiries from Property Finder, Bayut, Meta Ads, Google PPC, and your agency website into a unified intake engine. No lead slips through unacknowledged.
                </p>
                <ul className="space-y-1.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Portal webhook integrations</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Click-to-WhatsApp ad tracking</li>
                </ul>
              </div>
            </div>

            {/* Module 2 */}
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">2. WhatsApp Qualification</h3>
                <p className="text-white/70 font-light text-xs leading-relaxed mb-4">
                  Engage prospects in natural English or native Arabic. Verify budget, target property type, investment vs. end-use, and timeframe in under 60 seconds without feeling robotic.
                </p>
                <ul className="space-y-1.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Multilingual dialect recognition</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Spam and invalid number filtering</li>
                </ul>
              </div>
            </div>

            {/* Module 3 */}
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">3. Intelligent Broker Routing</h3>
                <p className="text-white/70 font-light text-xs leading-relaxed mb-4">
                  Match high-value prospects to the exact broker specializing in that sector. Downtown off-plan leads go to your Downtown team; luxury villas route directly to senior listing directors.
                </p>
                <ul className="space-y-1.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Location & tier-based routing</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Instant agent SMS/WhatsApp alerts</li>
                </ul>
              </div>
            </div>

            {/* Module 4 */}
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">4. Dynamic Property Matching</h3>
                <p className="text-white/70 font-light text-xs leading-relaxed mb-4">
                  Instantly query your available off-plan and secondary inventory. The bot shares project overviews, payment plans, and floorplan PDFs with the buyer directly inside the chat.
                </p>
                <ul className="space-y-1.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Instant PDF brochure delivery</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Payment plan breakdowns</li>
                </ul>
              </div>
            </div>

            {/* Module 5 */}
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">5. Broker AI Copilot</h3>
                <p className="text-white/70 font-light text-xs leading-relaxed mb-4">
                  Equip your agents with an internal AI assistant. Brokers can instantly look up developer commission terms, unit availabilities, service charges, and DLD fees in seconds.
                </p>
                <ul className="space-y-1.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> On-the-go inventory lookup</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Mortgage calculation support</li>
                </ul>
              </div>
            </div>

            {/* Module 6 */}
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">6. Pipeline Sync & Attribution</h3>
                <p className="text-white/70 font-light text-xs leading-relaxed mb-4">
                  Synchronize qualified leads, conversation logs, and viewing statuses directly into HubSpot, Salesforce, or Zoho. Track marketing ROI back to individual developers.
                </p>
                <ul className="space-y-1.5 text-xs text-white/60 font-light">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Automatic CRM contact creation</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Marketing source attribution</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Visual Demonstrations: Conversation & CRM Summary ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Real-World Visual Interface
          </span>
          <h2 className="text-3xl md:text-4xl font-serif">
            What the Buyer Sees vs. What the Broker Receives
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-3 text-sm">
            Frictionless conversation for the buyer; structured high-intent intelligence for your sales team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* WhatsApp Chat Simulation */}
          <div className="p-6 md:p-8 border border-white/10 bg-black rounded-3xl shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  AI
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Agency Assistant</div>
                  <div className="text-[11px] text-emerald-400 font-mono">Verified WhatsApp Business API</div>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase bg-white/5 px-2.5 py-1 rounded-full text-white/60">
                Live Simulation
              </span>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-bold text-[11px] shrink-0 text-white/80">U</div>
                <div className="bg-white/5 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-white/90 leading-relaxed">
                  Hi, I saw your Property Finder listing for the 3BR duplex in Dubai Hills. Is it still available?
                </div>
              </div>

              <div className="flex gap-2.5 items-start justify-end">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl rounded-tr-none max-w-[85%] text-white/90 leading-relaxed">
                  Hello! Yes, we have active units in Dubai Hills. To share the right floorplans, are you looking for an investment or family residence? And what is your expected timeline?
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-[11px] shrink-0 text-emerald-400">AI</div>
              </div>

              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-bold text-[11px] shrink-0 text-white/80">U</div>
                <div className="bg-white/5 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-white/90 leading-relaxed">
                  Family home. Budget is AED 5.5 Million cash. We are moving from the UK in October and want to arrange viewings next week.
                </div>
              </div>

              <div className="flex gap-2.5 items-start justify-end">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl rounded-tr-none max-w-[85%] text-white/90 leading-relaxed">
                  Excellent. I have logged your criteria. Attached is the project layout brochure [Dubai_Hills_Duplex.pdf]. Our Dubai Hills Senior Specialist, Tariq, has been assigned and will call you in 5 minutes to confirm viewing slots.
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-[11px] shrink-0 text-emerald-400">AI</div>
              </div>
            </div>
          </div>

          {/* Broker CRM Summary Card */}
          <div className="p-6 md:p-8 border border-white/10 bg-black rounded-3xl shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                  CRM
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Formatted Broker Dossier</div>
                  <div className="text-[11px] text-blue-400 font-mono">HubSpot / Zoho Instant Dispatch</div>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full text-emerald-400">
                Score: 94 / High-Intent
              </span>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/50">Prospect Name:</span>
                <span className="font-semibold text-white">David Harrison</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/50">Contact:</span>
                <span className="text-white font-mono">+44 7700 900123</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/50">Lead Origin:</span>
                <span className="text-white">Property Finder (Verified Webhook)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/50">Target Community:</span>
                <span className="text-emerald-400 font-medium">Dubai Hills Estate (3BR Duplex)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/50">Budget & Financing:</span>
                <span className="text-emerald-400 font-medium">AED 5,500,000 (Cash Buyer)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/50">Move Timeline:</span>
                <span className="text-white">October 2026 (Viewing next week)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-white/50">Assigned Specialist:</span>
                <span className="text-white font-semibold">Tariq M. (Dubai Hills Lead)</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono">
              <span>Status: Routed via WhatsApp bot</span>
              <span>Latency: 28 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Human Takeover & Ethical Governance ── */}
      <section className="py-20 bg-white/[0.01] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
            <Shield className="w-4 h-4" />
            Operational Governance
          </div>
          <h2 className="text-3xl font-serif mb-6">
            Human Oversight & Takeover Protocols
          </h2>
          <p className="text-white/80 font-light text-base leading-relaxed mb-8">
            AI is designed to eliminate repetitive qualification and data-entry friction—<strong>not to replace licensed brokers</strong>. In the Dubai real estate market, trust and negotiation belong to experienced agents. Our systems operate under strict architectural boundaries:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <h4 className="font-semibold text-sm text-white mb-2">1. Explicit Handover</h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                When a buyer requests a personal callback or asks complex legal/mortgage questions, the bot immediately halts and notifies the assigned broker.
              </p>
            </div>
            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <h4 className="font-semibold text-sm text-white mb-2">2. High-Intent Alerts</h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Cash buyers or off-plan investors with budgets over AED 5M trigger high-priority alerts directly to sales directors for immediate personal handling.
              </p>
            </div>
            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <h4 className="font-semibold text-sm text-white mb-2">3. UAE Data Compliance</h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                All client conversations, passport copies, and contact data are processed in compliance with UAE Federal Decree-Law No. 45 on Personal Data Protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Frequently Asked Questions (Aligned with GSC Intent) ── */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Clear Answers
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm">
            Everything brokerage owners and marketing directors ask before deploying our real estate AI systems.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does the system integrate with Property Finder and Bayut?",
              a: "We connect to your portal accounts using secure incoming webhook feeds or email parsing bridges. The moment a lead registers on a listing, our system triggers an instant automated WhatsApp intake message in under 30 seconds."
            },
            {
              q: "Does this require our agency to switch CRMs?",
              a: "No. Our architecture is built to integrate with whatever CRM your agency currently uses—including HubSpot, Salesforce, Zoho CRM, or custom internal spreadsheets and databases."
            },
            {
              q: "Can the AI handle Arabic and overseas buyers accurately?",
              a: "Yes. The conversational engine natively detects Arabic inputs (including Khaleeji, Levantine, and Egyptian dialects) as well as English, French, and Russian, responding in the prospect's language with culturally appropriate phrasing."
            },
            {
              q: "How does the broker copilot access our property inventory?",
              a: "We ingest your active off-plan inventory, developer payment plans, brochures, and secondary listings into a secure, private retrieval database. Your brokers can ask questions on-the-go and receive immediate unit information."
            },
            {
              q: "What is the difference between this agency system and the Real Estate AI Lead Dashboard?",
              a: "This commercial system provides end-to-end operational automation (multi-channel lead intake, WhatsApp qualification, and broker routing). The Real Estate AI Lead Dashboard is our specialized product module dedicated specifically to cross-channel advertising attribution and marketing ROI reporting."
            }
          ].map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-white/10 bg-white/[0.01] rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => handleFaq(idx, faq.q)}
                className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
              >
                <span className="text-base font-medium text-white/90">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-200 ${activeFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Final CTA ── */}
      <section className="py-24 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight mb-6">
            Scale Your Dubai Brokerage with <br />
            <span className="text-white/50 italic font-light">Sub-Minute AI Automation</span>
          </h2>
          <p className="text-white/60 font-light text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Eliminate lead decay, equip your brokers with instant qualification, and turn more portal inquiries into closed property transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            >
              Schedule Operational Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20AI%20Real%20Estate%20Agency%20system." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 bg-white/[0.02] text-white px-8 py-5 rounded-full font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Strategic Desk
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. Topic Cluster Internal Navigation ── */}
      <section className="py-12 border-t border-white/5 bg-black/40 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Related Real Estate AI Infrastructure
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/real-estate" className="hover:text-white transition-colors">Real Estate AI Hub</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate/ai-lead-dashboard" className="hover:text-white transition-colors">Real Estate AI Lead Dashboard</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate/broker-ai-copilot-dubai" className="hover:text-white transition-colors">Broker AI Copilot</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate/portal-lead-integration-dubai" className="hover:text-white transition-colors">Portal Lead Integration</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate-digital-solutions-uae" className="hover:text-white transition-colors">Real Estate Digital Solutions</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
