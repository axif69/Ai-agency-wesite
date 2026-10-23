"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, AlertTriangle, Bell, Clock, FileText, CheckCircle2, 
  ArrowRight, Sparkles, Building2, UserCheck, ShieldAlert, Zap, 
  Check, ChevronDown, Lock, Phone, MessageSquare, ExternalLink,
  Laptop, Calendar, Sliders
} from "lucide-react";
import { trackEvent } from "../../utils/analytics";

export default function ExpiryWatchView() {
  // Fine Risk Interactive Calculator State
  const [docCount, setDocCount] = useState<number>(25);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Average UAE missed renewal penalty risk estimate: ~AED 1,200 per document (MOHRE, GDRFA, DED late fees)
  const estimatedFineRisk = docCount * 1250;
  const estimatedHoursSaved = Math.round(docCount * 1.8);

  const handleCTA = (label: string, destination: string) => {
    trackEvent("generate_lead", {
      service_name: "ExpiryWatch",
      cta_location: "product_landing",
      cta_text: label,
      link_url: destination
    });
  };

  const faqs = [
    {
      q: "Which UAE documents can ExpiryWatch monitor?",
      a: "ExpiryWatch tracks Trade Licenses (all UAE DEDs and Free Zones including DMCC, DAFZA, SAIF Zone, Shams), Corporate Visas, Emirates IDs, Tenancy Contracts (Ejari), Commercial Vehicle Registrations, Work Permits, and Corporate Health/Fire Insurance Policies."
    },
    {
      q: "How does ExpiryWatch alert my team before documents expire?",
      a: "ExpiryWatch uses a 4-tier alert schedule: 60 days, 30 days, 14 days, and 7 days prior to expiry. Alerts are dispatched directly via automated WhatsApp notifications and prioritized email digests with direct renewal checklists."
    },
    {
      q: "Is client and employee document data kept private?",
      a: "Yes. Document data is encrypted both in transit (TLS 1.3) and at rest (AES-256). ExpiryWatch operates strictly under UAE compliance standards and never shares or sells proprietary company records."
    },
    {
      q: "Can I try ExpiryWatch for free?",
      a: "Yes. Our Free Starter Tier allows tracking for up to 10 company documents forever with full WhatsApp alert capabilities. No credit card is required to begin."
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* ── 1. Hero Section ── */}
      <section className="relative px-6 pt-28 pb-20 md:pt-36 md:pb-28 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Proprietary Compliance SaaS • UAE Enterprise Copilot
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-[1.08] mb-6">
            Eliminate Late Renewal Fines. <br />
            <span className="text-white/40 italic font-light">Zero Expired Documents in the UAE.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-sans font-light leading-relaxed mb-10">
            Never miss a Trade License, Visa, Emirates ID, Ejari, or Insurance renewal again. ExpiryWatch monitors your company documents 24/7 and triggers automated WhatsApp &amp; Email alerts before penalties hit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://expirywatch.asifdigital.agency"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Start Free Trial", "https://expirywatch.asifdigital.agency")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-400 text-black font-semibold text-sm hover:bg-emerald-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(52,211,153,0.3)]"
            >
              Start Free Trial (10 Documents Free)
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%2C%20I%20want%20a%20demo%20of%20ExpiryWatch%20for%20my%20UAE%20company"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Request WhatsApp Demo", "https://wa.me/971545866094")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 bg-white/[0.03] text-white font-medium text-sm hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Book Live WhatsApp Demo
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 font-mono">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero Credit Card Required</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald-400" /> 3-Minute Fast Onboarding</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated UAE WhatsApp Alerts</span>
          </div>
        </div>

        {/* ── Dashboard Interactive Mockup ── */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono text-white/40 ml-2">https://expirywatch.asifdigital.agency/dashboard</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold">
              Live UAE Audit Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                <span>Active Documents</span>
                <FileText className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">48 Monitored</div>
              <div className="text-[11px] text-emerald-400 mt-1">100% Verified in Sync</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/[0.03] border border-amber-500/20">
              <div className="flex items-center justify-between text-xs text-amber-300/80 mb-2">
                <span>Upcoming (30 Days)</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-amber-300">3 Renewals</div>
              <div className="text-[11px] text-white/60 mt-1">WhatsApp alerts dispatched</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                <span>Penalties Averted</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400">AED 18,500</div>
              <div className="text-[11px] text-white/60 mt-1">0 Late fines accrued</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Interactive Penalty Risk Calculator ── */}
      <section className="py-20 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
              UAE Regulatory Fine Estimator
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Calculate Your Company&apos;s Late Renewal Exposure
            </h2>
            <p className="text-sm text-white/60 mt-3 max-w-xl mx-auto font-sans font-light">
              MOHRE labor fines, DED trade license delays, and GDRFA immigration penalties accumulate daily in the UAE.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-[#0A0A0A]">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-white/90">
                  Total Corporate Documents &amp; Visas Monitored:
                </label>
                <span className="text-2xl font-mono font-bold text-emerald-400">
                  {docCount} Documents
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={docCount}
                onChange={(e) => setDocCount(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-white/40 mt-2">
                <span>5 (Small Business)</span>
                <span>100 (Mid-Sized Agency)</span>
                <span>250+ (Group of Companies)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="p-6 rounded-2xl bg-red-500/[0.04] border border-red-500/20">
                <span className="text-xs font-mono uppercase text-red-300 block mb-1">
                  Estimated Unmonitored Fine Risk
                </span>
                <div className="text-3xl md:text-4xl font-mono font-bold text-red-400">
                  AED {estimatedFineRisk.toLocaleString()}
                </div>
                <p className="text-xs text-white/60 mt-2">
                  Based on cumulative UAE late fees across trade license, residency visas, and mandatory health insurance lapses.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20">
                <span className="text-xs font-mono uppercase text-emerald-300 block mb-1">
                  HR &amp; PRO Hours Recovered
                </span>
                <div className="text-3xl md:text-4xl font-mono font-bold text-emerald-400">
                  {estimatedHoursSaved} Hours / Year
                </div>
                <p className="text-xs text-white/60 mt-2">
                  Time saved from manual calendar checks, Excel tracking sheets, and panic renewal coordination.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://expirywatch.asifdigital.agency"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTA("Secure My Documents Now", "https://expirywatch.asifdigital.agency")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-400 text-black font-semibold text-sm hover:bg-emerald-300 transition-all duration-300"
              >
                Secure My Documents for Free
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. The 4-Tier Automated Alert Engine ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
            Automated Escalation Protocol
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            The 4-Stage UAE Compliance Schedule
          </h2>
          <p className="text-sm text-white/60 mt-3 max-w-xl mx-auto font-sans font-light">
            Notifications are sent directly to designated managers, PROs, or founders via WhatsApp and Email.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              day: "60 Days Prior",
              title: "Early Window Notice",
              desc: "Allows ample runway to request board approvals, audit financial statements, and prepare lease renewals without surge costs.",
              channel: "Email Digest",
              badge: "bg-blue-500/10 text-blue-400 border-blue-500/20"
            },
            {
              day: "30 Days Prior",
              title: "Action Window Notice",
              desc: "Prompts required government portal submissions (DED / Free Zone / GDRFA) with a pre-filled renewal document checklist.",
              channel: "WhatsApp + Email",
              badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            },
            {
              day: "14 Days Prior",
              title: "Priority Escalation",
              desc: "Triggers urgent alerts to company operations leaders if renewal submissions have not yet been marked in progress.",
              channel: "Urgent WhatsApp Alert",
              badge: "bg-amber-500/10 text-amber-400 border-amber-500/20"
            },
            {
              day: "7 Days Prior",
              title: "Critical Lockdown Alert",
              desc: "Final emergency notification detailing exact daily fine penalties and immediate steps to avoid license suspension.",
              channel: "High-Priority WhatsApp",
              badge: "bg-red-500/10 text-red-400 border-red-500/20"
            }
          ].map((tier, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-[#0A0A0A] hover:border-emerald-500/30 transition-all duration-300">
              <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold border mb-4 ${tier.badge}`}>
                {tier.day}
              </span>
              <h3 className="text-base font-semibold text-white mb-2">{tier.title}</h3>
              <p className="text-xs text-white/65 leading-relaxed font-sans font-light mb-4">
                {tier.desc}
              </p>
              <div className="text-[11px] font-mono text-emerald-400/80 flex items-center gap-1.5 pt-3 border-t border-white/5">
                <Bell className="w-3.5 h-3.5" />
                {tier.channel}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Supported Document Types Matrix ── */}
      <section className="py-20 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
              Comprehensive Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Built for Every UAE Regulatory Authority
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Corporate & Business Licenses",
                items: [
                  "Dubai Economy & Tourism (DET / DED) Mainland Licenses",
                  "Sharjah Economic Development Department (SEDD)",
                  "Abu Dhabi Department of Economic Development (ADDED)",
                  "Free Zone Licenses (DMCC, DAFZA, SAIF Zone, Shams, RAKEZ)",
                  "Chamber of Commerce Registrations & Municipal Permits"
                ]
              },
              {
                title: "Visas & Immigration Records",
                items: [
                  "Employee Residency Visas & Quota Authorizations",
                  "Investor / Partner & Golden Visas",
                  "Emirates ID Expiry Dates & Medical Test Windows",
                  "MOHRE Work Permits & Labor Cards",
                  "Dependents & Domestic Worker Visas"
                ]
              },
              {
                title: "Real Estate & Leases",
                items: [
                  "Ejari Certificates & Commercial Tenancy Contracts",
                  "Warehouse & Office Lease Expirations",
                  "Landlord Security Deposit Refund Deadlines",
                  "Civil Defense & Fire Safety Clearances"
                ]
              },
              {
                title: "Insurance & Assets",
                items: [
                  "Corporate Health Insurance Policies & Annual Renewals",
                  "Commercial Fleet / Vehicle Mulkiya Registrations",
                  "Workmen's Compensation & Public Liability Policies",
                  "Key Supplier & Vendor Service Contracts"
                ]
              }
            ].map((cat, idx) => (
              <div key={idx} className="p-6 md:p-8 rounded-2xl border border-white/10 bg-[#0A0A0A]">
                <h3 className="text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  {cat.title}
                </h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/70 font-sans font-light">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Pricing Tiers ── */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Start Free, Scale as Your Company Grows
          </h2>
          <p className="text-sm text-white/60 mt-3 font-sans font-light">
            No long-term contracts. Pause or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="p-8 rounded-3xl border border-white/10 bg-[#0A0A0A] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-2">Starter Tier</span>
              <div className="text-3xl font-bold font-mono text-white mb-2">Free</div>
              <div className="text-xs text-emerald-400 mb-6">Forever Free • No Credit Card</div>
              <p className="text-xs text-white/60 mb-6 font-sans font-light">
                Perfect for startups and independent consultants in the UAE.
              </p>
              <ul className="space-y-3 text-xs text-white/75 font-sans font-light">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 10 Monitored Documents</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Automated Email Alerts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Centralized Cloud Vault</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic WhatsApp Notifications</li>
              </ul>
            </div>
            <a
              href="https://expirywatch.asifdigital.agency"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Start Free", "https://expirywatch.asifdigital.agency")}
              className="mt-8 w-full py-3 rounded-xl border border-white/15 bg-white/[0.03] text-white text-center text-xs font-semibold hover:bg-white/[0.08] transition-all"
            >
              Get Started Free
            </a>
          </div>

          {/* Business (Featured) */}
          <div className="p-8 rounded-3xl border-2 border-emerald-500/40 bg-[#0C120E] flex flex-col justify-between relative shadow-[0_20px_60px_rgba(16,185,129,0.15)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-400 text-black text-[10px] font-mono font-bold uppercase tracking-wider">
              Most Popular in UAE
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2">Business</span>
              <div className="text-3xl font-bold font-mono text-white mb-2">AED 299 <span className="text-xs font-normal text-white/50">/ month</span></div>
              <div className="text-xs text-emerald-400 mb-6">Billed Monthly or Annually</div>
              <p className="text-xs text-white/70 mb-6 font-sans font-light">
                Designed for growing UAE companies, trading houses, and agencies.
              </p>
              <ul className="space-y-3 text-xs text-white/85 font-sans font-light">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 100 Monitored Documents</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Priority WhatsApp &amp; SMS Alerts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Multi-Manager Access (3 Admins)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 4-Tier Escalation Schedule</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated UAE WhatsApp Support</li>
              </ul>
            </div>
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%2C%20I%20want%20to%20subscribe%20to%20ExpiryWatch%20Business%20plan"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Get Business Plan", "https://wa.me/971545866094")}
              className="mt-8 w-full py-3 rounded-xl bg-emerald-400 text-black text-center text-xs font-semibold hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              Start Business Plan
            </a>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-3xl border border-white/10 bg-[#0A0A0A] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-2">Enterprise &amp; Groups</span>
              <div className="text-3xl font-bold font-mono text-white mb-2">Custom</div>
              <div className="text-xs text-white/50 mb-6">Tailored to Your Fleet &amp; Staff</div>
              <p className="text-xs text-white/60 mb-6 font-sans font-light">
                For holding groups, property managers, and facilities with 100+ documents.
              </p>
              <ul className="space-y-3 text-xs text-white/75 font-sans font-light">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Documents &amp; Visas</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom API &amp; ERP Integration</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Manager Seats</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> On-Premise / Private Vault Options</li>
              </ul>
            </div>
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%2C%20I%20need%20an%20Enterprise%20quote%20for%20ExpiryWatch"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Contact Enterprise", "https://wa.me/971545866094")}
              className="mt-8 w-full py-3 rounded-xl border border-white/15 bg-white/[0.03] text-white text-center text-xs font-semibold hover:bg-white/[0.08] transition-all"
            >
              Contact Solutions Architect
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ Section ── */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
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
                <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
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

      {/* ── 7. Final Call to Action ── */}
      <section className="py-20 px-6 md:px-12 text-center bg-gradient-to-b from-transparent to-emerald-950/20 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Take Control of Your UAE Compliance Today
          </h2>
          <p className="text-base text-white/65 font-sans font-light mb-8 max-w-xl mx-auto">
            Stop checking spreadsheets manually. Upload your first document in 60 seconds and automate your peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://expirywatch.asifdigital.agency"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTA("Bottom Start Free", "https://expirywatch.asifdigital.agency")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-400 text-black font-semibold text-sm hover:bg-emerald-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Free Trial (10 Documents Free)
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+971545866094"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 bg-white/[0.03] text-white font-medium text-sm hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Call +971 54 586 6094
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
