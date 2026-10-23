"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Wrench, CheckCircle2, AlertCircle, Clock, Smartphone, QrCode, 
  ArrowRight, ShieldCheck, Zap, Check, ChevronDown, Phone, 
  MessageSquare, Camera, Users, Building, FileText, CheckCircle
} from "lucide-react";
import { trackEvent } from "../../utils/analytics";

export default function TicketFlowView() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Mini Interactive Ticket Simulator State
  const [selectedIssue, setSelectedIssue] = useState<string>("AC Cooling Failure");
  const [ticketStatus, setTicketStatus] = useState<"idle" | "submitting" | "dispatched">("idle");

  const handleSimulateTicket = () => {
    setTicketStatus("submitting");
    setTimeout(() => {
      setTicketStatus("dispatched");
    }, 1200);
  };

  const handleCTA = (label: string, destination: string) => {
    trackEvent("generate_lead", {
      service_name: "TicketFlow",
      cta_location: "product_landing",
      cta_text: label,
      link_url: destination
    });
  };

  const faqs = [
    {
      q: "How do tenants submit maintenance requests without downloading an app?",
      a: "Tenants simply scan a designated building QR code in the lobby, elevator, or inside their unit, or message your property WhatsApp bot directly. They can upload photos, record voice notes, or submit repair details instantly with zero app download required."
    },
    {
      q: "How does TicketFlow assign technicians?",
      a: "TicketFlow automatically categorizes issues (e.g., HVAC/AC, Plumbing, Electrical, Handyman) based on the tenant's report and routes the work order directly to your in-house technician or pre-approved third-party maintenance vendor with complete photos and location tags."
    },
    {
      q: "Can property managers approve repair quotations before work starts?",
      a: "Yes. For repairs exceeding your building's pre-approved maintenance limit, the system alerts the property manager via WhatsApp or email for one-click authorization before materials are purchased or vendors dispatched."
    },
    {
      q: "Does TicketFlow integrate with WhatsApp Business?",
      a: "Yes! TicketFlow is engineered natively for the UAE market where WhatsApp is the primary communication channel. Tenants receive real-time status updates ('Technician Assigned', 'En Route', 'Issue Resolved') directly on WhatsApp."
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* ── 1. Hero Section ── */}
      <section className="relative px-6 pt-28 pb-20 md:pt-36 md:pb-28 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Proprietary PropTech SaaS • UAE Maintenance Dispatch
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-[1.08] mb-6">
            Zero-Friction Tenant Maintenance. <br />
            <span className="text-white/40 italic font-light">From WhatsApp to Resolved in Minutes.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-sans font-light leading-relaxed mb-10">
            Engineered for UAE property managers, landlords, and facility teams. Eliminate frantic phone calls and chaotic WhatsApp chats with automated QR-code photo intake and real-time technician dispatch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%2C%20I%20want%20to%20see%20a%20live%20demo%20of%20TicketFlow%20for%20my%20UAE%20properties"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Request Live Demo", "https://wa.me/971545866094")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              Book 15-Minute Landlord Demo
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="tel:+971545866094"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 bg-white/[0.03] text-white font-medium text-sm hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              Direct Support: +971 54 586 6094
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 font-mono">
            <span className="flex items-center gap-1.5"><QrCode className="w-4 h-4 text-cyan-400" /> Instant QR Code Unit Intake</span>
            <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-cyan-400" /> Automated UAE WhatsApp Routing</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-cyan-400" /> 40% Faster Resolution Times</span>
          </div>
        </div>

        {/* ── Interactive Live Ticket Simulator ── */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                Interactive Simulator: Tenant Maintenance Dispatch
              </span>
            </div>
            <span className="text-xs font-mono text-white/40 hidden sm:inline-block">Unit 1402 • Downtown Dubai</span>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="text-xs font-mono uppercase text-white/50 block mb-2">1. Select Maintenance Issue:</label>
              <div className="space-y-2 mb-5">
                {[
                  "AC Cooling Failure (Urgent)",
                  "Master Bathroom Water Leak",
                  "Kitchen Electrical Tripping",
                  "Main Door Electronic Lock Jam"
                ].map((issue, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedIssue(issue);
                      setTicketStatus("idle");
                    }}
                    className={`w-full p-3 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border ${
                      selectedIssue === issue 
                        ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300" 
                        : "bg-white/[0.02] border-white/5 text-white/70 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>{issue}</span>
                    {selectedIssue === issue && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSimulateTicket}
                disabled={ticketStatus === "submitting"}
                className="w-full py-3.5 rounded-xl bg-cyan-400 text-black font-semibold text-xs hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
              >
                {ticketStatus === "submitting" ? "Processing Auto-Dispatch..." : "Dispatch Automated Work Order"}
                <Zap className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Status Box */}
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 h-full flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-white/40 block mb-3">Live Dispatch Status</span>
                
                {ticketStatus === "idle" && (
                  <div className="py-8 text-center text-xs text-white/50 font-sans font-light">
                    Select an issue on the left and click &apos;Dispatch Automated Work Order&apos; to simulate the 60-second UAE dispatch cycle.
                  </div>
                )}

                {ticketStatus === "submitting" && (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-cyan-300 font-mono">Auto-evaluating vendor SLA &amp; availability...</p>
                  </div>
                )}

                {ticketStatus === "dispatched" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-emerald-300">Ticket #TF-8942 Created</div>
                        <div className="text-[10px] text-white/60">Category: {selectedIssue}</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-white/80 space-y-1 font-mono">
                      <div className="text-white/40 text-[10px] uppercase">Automated Route:</div>
                      <div>👉 Assigned to: Express Air Care UAE</div>
                      <div>👉 ETA: 45 Minutes</div>
                      <div>👉 Tenant Status: WhatsApp Confirmed</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-[10px] font-mono text-white/30 pt-4 border-t border-white/5">
                Zero manual admin intervention required.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. The Tenant vs Landlord Experience ── */}
      <section className="py-20 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              Dual-Engine Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Effortless for Tenants. Powerful for Property Managers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tenant Side */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0A0A0A]">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">The Resident Experience</h3>
              <p className="text-xs text-white/65 leading-relaxed font-sans font-light mb-6">
                Tenants hate filling out clunky portals or waiting on hold. TicketFlow makes reporting problems as simple as texting a friend.
              </p>
              <ul className="space-y-3.5 text-xs text-white/80 font-sans font-light">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>1-Tap QR Scan:</strong> Pre-fills building name, unit number, and lease details automatically.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Photo &amp; Video Intake:</strong> Upload leaks or electrical malfunctions directly from their phone camera.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Real-Time WhatsApp Updates:</strong> Never wonder if the landlord saw the message. Live notifications at every step.</span>
                </li>
              </ul>
            </div>

            {/* Manager Side */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0A0A0A]">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">The Property Manager Dashboard</h3>
              <p className="text-xs text-white/65 leading-relaxed font-sans font-light mb-6">
                Full transparency across your entire UAE building portfolio without endless WhatsApp groups or spreadsheet chaos.
              </p>
              <ul className="space-y-3.5 text-xs text-white/80 font-sans font-light">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Automated Dispatch &amp; Routing:</strong> Assigns jobs based on skill, building location, and vendor contracts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Cost Limit Thresholds:</strong> Auto-approve routine repairs under AED 300; prompt managers for higher quotes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Vendor Accountability &amp; SLA Tracking:</strong> Measures time-to-arrival and resolution times across all technicians.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Core Features Grid ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            Built for GCC Real Estate
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Features Tailored for Dubai &amp; UAE Properties
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: QrCode,
              title: "Lobby & Unit QR Codes",
              desc: "Deploy custom laminated QR stickers inside tenant utility panels, elevator vestibules, or lobby concierge desks."
            },
            {
              icon: MessageSquare,
              title: "Bilingual WhatsApp Chat",
              desc: "Automated conversations in English & Arabic. Handles follow-ups, appointment rescheduling, and completion sign-offs."
            },
            {
              icon: Camera,
              title: "Visual Proof of Work",
              desc: "Technicians must upload mandatory before-and-after photos before closing any maintenance ticket in the system."
            },
            {
              icon: Clock,
              title: "SLA & Delay Alerts",
              desc: "If an AC failure or flood isn't acknowledged within 30 minutes, the system escalates directly to the head of operations."
            },
            {
              icon: FileText,
              title: "Detailed Audit History",
              desc: "Export comprehensive maintenance log reports for building owners, RERA audits, and dispute resolution."
            },
            {
              icon: ShieldCheck,
              title: "Secure UAE Data Hosting",
              desc: "All resident records and property files are stored securely with localized privacy and compliance configurations."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-[#0A0A0A] hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-white/65 leading-relaxed font-sans font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FAQ Section ── */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-serif font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-2xl bg-[#0A0A0A] overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="text-base font-semibold text-white">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 text-sm text-white/70 font-sans font-light leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Final CTA ── */}
      <section className="py-20 px-6 md:px-12 text-center bg-gradient-to-b from-transparent to-cyan-950/20 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Upgrade Your Property Maintenance Today
          </h2>
          <p className="text-base text-white/65 font-sans font-light mb-8 max-w-xl mx-auto">
            Book a 15-minute live demo. We will show you how TicketFlow configures for your specific buildings and existing maintenance vendor contracts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%2C%20I%20want%20to%20schedule%20a%20TicketFlow%20demo%20for%20my%20UAE%20portfolio"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Bottom WhatsApp Demo", "https://wa.me/971545866094")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Book 15-Minute WhatsApp Demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+971545866094"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 bg-white/[0.03] text-white font-medium text-sm hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              Call +971 54 586 6094
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
