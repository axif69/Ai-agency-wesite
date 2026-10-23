"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Wrench, CheckCircle2, Clock, Smartphone, QrCode, 
  ArrowRight, ShieldCheck, Zap, Check, ChevronDown, Phone, 
  MessageSquare, Camera, Users, Building, FileText, CheckCircle,
  AlertTriangle, Download, ArrowUpRight, Lock, ExternalLink
} from "lucide-react";
import { trackEvent } from "../../utils/analytics";

export default function TicketFlowView() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Live Simulator State (Reflecting exact 1.0 architecture: Al Khuwair Residence / Unit 402)
  const [selectedIssue, setSelectedIssue] = useState<string>("AC & Chiller: Water Leakage");
  const [simState, setSimState] = useState<"idle" | "dispatching" | "dispatched">("idle");

  const handleSimulateDispatch = () => {
    setSimState("dispatching");
    setTimeout(() => {
      setSimState("dispatched");
    }, 900);
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
      a: "Each property is provisioned with custom printable A4 QR code posters for lobbies, elevators, and utility panels. Tenants point their standard phone camera at the QR code, which instantly opens a fast, lightweight mobile web form. They select their unit, choose their category, snap high-res photos, and submit in under 30 seconds. Zero app downloads, zero logins, and zero account registration required."
    },
    {
      q: "Do technicians need to download an app or create an account?",
      a: "No. Technicians receive a pre-formatted WhatsApp work order with tenant photos, building name, apartment unit, and a secure 1-click job link. They tap the link directly on their mobile browser to hit 'Accept Job' and 'Mark Complete' once work is done. Your central dashboard updates in real time with zero technician logins."
    },
    {
      q: "Can managers review and control dispatch before contractors visit?",
      a: "Yes. Every ticket lands immediately inside your central triage dashboard. Property managers review tenant photo evidence, unit details, and priority levels before triggering 1-click dispatch to their pre-approved contractor roster."
    },
    {
      q: "Does TicketFlow replace or integrate with CAFM / ERP systems?",
      a: "TicketFlow is engineered as a lightweight, zero-bloat dispatch system deployed in under 24 hours. You can export complete, time-stamped maintenance logs to CSV with one click anytime to reconcile with accounting, Yardi, or ERP databases."
    }
  ];

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen selection:bg-cyan-500/30">
      {/* ── 1. Hero Section ── */}
      <section className="relative px-6 pt-28 pb-20 md:pt-36 md:pb-28 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Proprietary PropTech SaaS • UAE &amp; GCC Dispatch Architecture
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-[1.08] mb-6">
            Zero-Friction Tenant Maintenance. <br />
            <span className="text-white/40 italic font-light">From QR Code to WhatsApp Dispatch in Seconds.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-sans font-light leading-relaxed mb-10">
            Engineered for UAE &amp; GCC property managers, landlords, and facility teams. Eliminate frantic phone calls and unorganized WhatsApp groups with automated QR-code photo intake, live SLA triage, and 1-click WhatsApp technician dispatch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%2C%20I%20want%20to%20test%20the%20TicketFlow%20live%20demo%20for%20my%20properties"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Try Live Demo", "https://wa.me/971545866094")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              Try Live Demo
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%2C%20I%20want%20to%20book%20a%2015-minute%20walkthrough%20of%20TicketFlow"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Book 15-Min Walkthrough", "https://wa.me/971545866094")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 bg-white/[0.03] text-white font-medium text-sm hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Book 15-Min Walkthrough
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 font-mono">
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-cyan-400" /> Deploy in Under 24 Hours</span>
            <span className="flex items-center gap-1.5"><QrCode className="w-4 h-4 text-cyan-400" /> Zero App Downloads Required</span>
            <span className="flex items-center gap-1.5"><Building className="w-4 h-4 text-cyan-400" /> Oman (+968) &amp; UAE (+971) Ready</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> GCC Privacy Compliant</span>
          </div>
        </div>

        {/* ── Realistic Split CSS Hero Window (Intake vs Dispatch) ── */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#070A12] p-6 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                Live System Window: Al Khuwair Residence (Oman / UAE Operations)
              </span>
            </div>
            <span className="text-xs font-mono text-white/40 hidden sm:inline-block">TICKET REF: #ALK-2026-0001</span>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Tenant QR Mobile Web Intake */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" /> 1. Tenant Mobile Intake
                </span>
                <span className="text-[10px] font-mono text-white/40">QR Scan • No Login</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/40 block mb-1">Select Property &amp; Unit</label>
                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white/90 font-mono">
                    Al Khuwair Residence — Unit 402
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-white/40 block mb-1">Issue Category</label>
                  <div className="space-y-1.5">
                    {[
                      "AC & Chiller: Water Leakage",
                      "Plumbing: Water Heater Tripping",
                      "Electrical: Main DB Breaker"
                    ].map((issue, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedIssue(issue);
                          setSimState("idle");
                        }}
                        className={`w-full p-2.5 rounded-lg text-left text-xs font-mono transition-all flex items-center justify-between border ${
                          selectedIssue === issue 
                            ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300" 
                            : "bg-black/30 border-white/5 text-white/70 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span>{issue}</span>
                        {selectedIssue === issue && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/15 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Camera className="w-4 h-4" />
                    <span>Photo Evidence Attached (2.4 MB)</span>
                  </div>
                  <span className="text-[10px] text-white/40">JPG / PNG</span>
                </div>
              </div>
            </div>

            {/* Right: Property Manager Triage & 1-Click WhatsApp Dispatch */}
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" /> 2. Manager Triage Console
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Urgent SLA: 1h 45m left
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="text-white/40 text-[10px] uppercase">Selected Work Order:</div>
                    <div className="text-white font-medium">{selectedIssue}</div>
                    <div className="text-[11px] text-white/60">Tenant: Tariq Al-Balushi • +968 9123 4567</div>
                  </div>

                  {simState === "idle" && (
                    <div className="p-4 rounded-xl border border-dashed border-white/10 text-center">
                      <p className="text-[11px] text-white/50 mb-3">
                        Work order generated. Ready for pre-approved contractor assignment.
                      </p>
                      <button
                        onClick={handleSimulateDispatch}
                        className="w-full py-2.5 rounded-lg bg-emerald-400 text-black font-semibold text-xs hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        1-Click WhatsApp Dispatch Ready
                      </button>
                    </div>
                  )}

                  {simState === "dispatching" && (
                    <div className="py-6 text-center space-y-2">
                      <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-[11px] text-cyan-300 font-mono">Generating formatted wa.me dispatch link...</p>
                    </div>
                  )}

                  {simState === "dispatched" && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-2 animate-fade-in">
                      <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <span>Work Order Dispatched to Contractor</span>
                      </div>
                      <div className="text-[10px] text-white/70 space-y-0.5">
                        <div>• Assigned Vendor: QuickFix HVAC Services</div>
                        <div>• Direct Job Link: Sent to +968 9876 5432</div>
                        <div>• Contractor Access: Passwordless Portal Ready</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[10px] font-mono text-white/30 pt-4 border-t border-white/5">
                Technician resolves with zero app installs via secure token link.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. The Tenant vs Manager Architecture ── */}
      <section className="py-20 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              Dual-Engine Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Effortless for Tenants, Powerful for Property Managers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resident Experience */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#070A12]">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">The Resident Experience</h3>
              <p className="text-xs text-white/65 leading-relaxed font-sans font-light mb-6">
                Tenants hate downloading specialized apps or waiting on hold. TicketFlow makes maintenance intake frictionless.
              </p>
              <ul className="space-y-4 text-xs text-white/80 font-sans font-light">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Zero App Downloads:</strong> Tenants point their standard phone camera at the lobby or unit QR poster. Opens immediately in mobile Safari or Chrome.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Instant Photo Intake:</strong> Snap photos of leaks, AC faults, or electrical issues directly from their phone camera (supports up to 5MB JPG/PNG).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>1-Click Status Alerts:</strong> Receive direct WhatsApp updates from the property manager with technician arrival details and reference numbers.</span>
                </li>
              </ul>
            </div>

            {/* Property Manager Dashboard */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#070A12]">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">The Property Manager Dashboard</h3>
              <p className="text-xs text-white/65 leading-relaxed font-sans font-light mb-6">
                Full operational control over tenant issues without disorganized WhatsApp groups or spreadsheet chaos.
              </p>
              <ul className="space-y-4 text-xs text-white/80 font-sans font-light">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Centralized Triage:</strong> Live dashboard with automated SLA countdown clocks (Emergency: 2h, Urgent: 4h, Normal: 24h) to avoid tenant disputes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>1-Click WhatsApp Dispatch:</strong> Pre-fills complete work orders with tenant issue, apartment unit, photo links, and a secure technician job portal.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Passwordless Tech Resolution:</strong> Technicians accept jobs and mark them complete directly on their phones with zero app downloads or passwords.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 6 Enterprise Capabilities Grid ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            Verified Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Enterprise Capabilities Built for UAE &amp; GCC Properties
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: QrCode,
              title: "Lobby & Elevator QR Posters",
              desc: "Deploy custom printable vector A4 posters with high-density QR codes for lobby concierges, elevator vestibules, and utility closets."
            },
            {
              icon: MessageSquare,
              title: "1-Click WhatsApp Work Orders",
              desc: "Generate pre-formatted wa.me dispatch links containing tenant issue details, unit reference, and direct photo evidence URLs."
            },
            {
              icon: Users,
              title: "Contractor Trade Roster",
              desc: "Organize approved maintenance vendors by trade (AC & Chiller, Plumbing, Electrical, Handyman) with contact numbers."
            },
            {
              icon: Clock,
              title: "SLA & Urgency Clocks",
              desc: "Color-coded response countdowns (2h Emergency, 4h Urgent, 24h Normal) ensure critical tenant leaks are acknowledged immediately."
            },
            {
              icon: Lock,
              title: "Passwordless Tech Resolution",
              desc: "Technicians receive secure, token-authenticated mobile links to accept and close jobs without remembering complex passwords."
            },
            {
              icon: Download,
              title: "Exportable Audit History",
              desc: "One-click CSV exports of complete, time-stamped maintenance logs for building owners, landlord reporting, and ERP reconciliation."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-[#070A12] hover:border-cyan-500/30 transition-all duration-300">
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

      {/* ── 4. Truthful FAQ Accordion ── */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            Clear Answers
          </span>
          <h2 className="text-3xl font-serif font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-2xl bg-[#070A12] overflow-hidden">
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
            Deploy TicketFlow across your portfolio in under 24 hours. No complex integrations, no heavy app installs, and zero onboarding friction for tenants.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%2C%20I%20want%20to%20schedule%20a%20TicketFlow%20walkthrough%20for%20my%20properties"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Bottom WhatsApp Demo", "https://wa.me/971545866094")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            >
              Book 15-Minute Walkthrough
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
