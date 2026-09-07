"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Search, 
  Send, 
  Workflow, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Check, 
  ChevronDown, 
  Layers, 
  Cpu, 
  Clock, 
  Database,
  BarChart3,
  Network,
  Lock,
  MessageSquare
} from "lucide-react";
import { trackEvent } from "../utils/analytics";

const reviewPillars = [
  {
    icon: <Cpu className="w-5 h-5 text-green-400" />,
    title: "AI & Automation Readiness",
    desc: "We analyze repetitive operational tasks, manual data transfers, and determine where LLMs, workflow agents, or deterministic logic actually make commercial sense."
  },
  {
    icon: <Workflow className="w-5 h-5 text-green-400" />,
    title: "Workflow Bottlenecks & Handoffs",
    desc: "We map where delays occur between lead capture, internal team alerts, customer qualification, and appointment booking or contract generation."
  },
  {
    icon: <Database className="w-5 h-5 text-green-400" />,
    title: "CRM & Lead-Flow Architecture",
    desc: "We evaluate your pipeline stages, contact enrichment, automated stage transitions, and identify where prospective buyers fall through administrative cracks."
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-green-400" />,
    title: "Funnel & Conversion Tracking",
    desc: "We inspect your public landing pages, form speed, WhatsApp triggers, and conversion tracking cues to ensure marketing spend produces measurable inquiries."
  },
  {
    icon: <Network className="w-5 h-5 text-green-400" />,
    title: "Tech Stack Integration Gaps",
    desc: "We review how your disparate systems communicate—evaluating webhooks, API bridges, n8n/Make compatibility, and isolated spreadsheet silos."
  },
  {
    icon: <Zap className="w-5 h-5 text-green-400" />,
    title: "Missed Automation Opportunities",
    desc: "We identify practical automation opportunities that may reduce repetitive manual work, improve response speed, and make follow-up more consistent."
  }
];

const deliverables = [
  {
    icon: <FileText className="w-5 h-5 text-green-400" />,
    title: "Concise Executive Summary",
    desc: "A clear breakdown of observed workflow gaps, lead-response friction, automation opportunities, and technical constraints."
  },
  {
    icon: <Layers className="w-5 h-5 text-green-400" />,
    title: "Prioritized Action Matrix",
    desc: "Clear categorization separating immediate 'Quick Wins' (< 7-day implementation) from high-impact 'Strategic Systems'."
  },
  {
    icon: <Network className="w-5 h-5 text-green-400" />,
    title: "Architecture & Tool Recommendations",
    desc: "Pragmatic software and middleware stack suggestions (n8n, Make, custom Next.js APIs, CRM webhooks) matched to your team."
  },
  {
    icon: <Clock className="w-5 h-5 text-green-400" />,
    title: "Practical Next-Step Roadmap",
    desc: "A phased rollout blueprint you can execute internally with your own developers or commission as an agency project."
  }
];

const auditSteps = [
  {
    step: "01",
    title: "Intake & Operational Context",
    time: "2 Minutes",
    desc: "Submit your website, primary bottleneck, and current tools via the form below. We never ask for sensitive passwords or internal database logins."
  },
  {
    step: "02",
    title: "Technical Triage & Review",
    time: "2–3 Business Days",
    desc: "Our automation engineers and digital strategists manually review your customer touchpoints, response pathways, and operational bottlenecks."
  },
  {
    step: "03",
    title: "Deliverable Delivery & Debrief",
    time: "Executive Briefing",
    desc: "You receive your diagnostic report via email and WhatsApp, complete with prioritized action steps and an optional walkthrough."
  }
];

const targetAudiences = [
  {
    category: "Established UAE Service Firms",
    detail: "Commercial agencies, consultancies, and professional service providers managing high inquiry volumes manually."
  },
  {
    category: "Real Estate Brokerages & Developers",
    detail: "Property firms needing unified portal lead capture, WhatsApp routing, and automated CRM pipeline progression."
  },
  {
    category: "High-Ticket B2B & Trading Companies",
    detail: "B2B suppliers, distributors, and logistics operations with complex inquiry-to-quote quotation bottlenecks."
  },
  {
    category: "Clinics, Healthcare & Appointment Hubs",
    detail: "Medical, wellness, and specialized service clinics looking to automate appointment bookings and reminders."
  }
];

const nonAudiences = [
  "Pre-revenue concept ideas or academic student inquiries without active business operations.",
  "Businesses seeking instant 'get-rich' marketing schemes or automated spam outbound bots.",
  "Teams looking for guaranteed financial return promises rather than technical operational triage."
];

const ethicalGuardrails = [
  {
    title: "No Guaranteed Revenue or Savings",
    desc: "Operational automation eliminates friction and reclaims wasted labor hours; it does not replace a solid business model or market demand."
  },
  {
    title: "No Fake Valuation Claims",
    desc: "We do not claim this review is 'valued at AED 15,000'. It is an honest introductory technical assessment demonstrating our capability."
  },
  {
    title: "No Automated Vanity Scraping",
    desc: "Every submitted audit is triaged by an experienced human automation specialist, not an automated script spitting generic scores."
  },
  {
    title: "No High-Pressure Sales Harassment",
    desc: "Your action plan stands on its own technical merit. You are entirely free to implement recommendations internally with your own team."
  }
];

const faqs = [
  {
    q: "Is this growth and automation audit free?",
    a: "Yes. There is no payment or credit card required for the initial diagnostic review, and there is no obligation to hire us afterward."
  },
  {
    q: "How long does it take to receive our audit deliverable?",
    a: "Audits are typically completed and delivered within 2 to 3 business days. Because each audit involves hands-on review by our technical team, we take the time to evaluate your actual workflows carefully."
  },
  {
    q: "Do we need to give you admin passwords or internal system access?",
    a: "No. We never ask for admin credentials, database passwords, or private customer records for this audit. We evaluate public customer touchpoints, response speed, forms, and the operational context you provide in the form."
  },
  {
    q: "What if we want to implement the recommendations ourselves?",
    a: "You are completely free to do so. The action plan and architecture recommendations are yours to keep and execute with your internal IT team, developers, or external partners."
  },
  {
    q: "Can we schedule a call to discuss the audit findings?",
    a: "Yes. Along with your written diagnostic deliverable, we provide an invitation for an optional 20-minute video walkthrough to answer any questions and explain the technical architecture."
  }
];

export default function FreeGrowthAudit() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const website = String(data.get("website") || "Not provided");
    const service = String(data.get("service") || "Growth & Automation Audit");
    const leadVolume = String(data.get("leadVolume") || "Not specified");
    const message = String(data.get("message") || "");

    try {
      const accessKey = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "3fcd0399-3b92-41b4-b3f4-1d8160e70686").trim();
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone || "Not provided");
      formData.append("company", website || "Not provided");
      formData.append("service", service);
      formData.append("subject", `Free Growth Audit Request: ${name} (${service})`);
      formData.append("from_name", "Asif Digital Diagnostic Intake");
      formData.append("message", [
        `Primary Area of Review: ${service}`,
        `Website URL: ${website}`,
        `Estimated Monthly Inquiries: ${leadVolume}`,
        `Current Operational Bottleneck: ${message || "Not specified"}`
      ].join("\n\n"));

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.message || "Submission failed");
      
      // GA4 Tracking: Standard form submit and high-intent conversion event
      trackEvent("form_submit", {
        form_name: "Free Growth Audit Intake Form",
        service_name: service,
        link_url: "https://www.asifdigital.agency/free-growth-audit"
      });

      trackEvent("generate_lead", {
        form_name: "Free Growth Audit Intake Form",
        service_name: service,
        lead_type: "Diagnostic Audit",
        value: 1
      });

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      
      {/* ── 1. Hero & Diagnostic Intake Section ── */}
      <section className="relative overflow-hidden px-6 md:px-12 py-20 md:py-28 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_40%),linear-gradient(to_bottom,#050505,#080808)]" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-mono text-green-400 mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DIAGNOSTIC AUDIT & READINESS REVIEW</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.05] tracking-tight mb-6">
              Get a Free AI, Automation & Growth Audit
            </h1>

            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed mb-8 max-w-2xl">
              Identify the workflow bottlenecks, lead leakage, and manual handoffs slowing down your business. We review your public funnel, submitted context, CRM process, and automation readiness so you can see the next practical steps clearly.
            </p>

            {/* Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-8 max-w-xl">
              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <Check className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-xs text-white/80 font-medium">No Admin Passwords Required</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <Clock className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-xs text-white/80 font-medium">Typical 2-3 Business Day Review</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <FileText className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-xs text-white/80 font-medium">Practical 1-Page Action Plan</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <Lock className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-xs text-white/80 font-medium">Handled Confidentially</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] max-w-xl text-xs text-white/60 leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
              <span>
                Looking for end-to-end multi-agent development or middleware implementation? View our primary commercial services at{" "}
                <Link href="/ai-automation-agency-dubai" className="text-green-400 hover:underline">
                  AI Automation Agency Dubai
                </Link>.
              </span>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative">
            <div className="mb-6">
              <h2 className="font-serif text-2xl text-white mb-2">Request Your Diagnostic Review</h2>
              <p className="text-white/60 text-xs sm:text-sm">
                Complete the operational intake below. We will review your workflow context and prepare practical recommendations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="tool" type="hidden" value="Free Growth Audit" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1.5">
                  <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Your Name *</span>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-green-400/60 focus:outline-none transition-colors"
                    placeholder="e.g. Tariq Al-Mansoor"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Work Email *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-green-400/60 focus:outline-none transition-colors"
                    placeholder="tariq@company.ae"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1.5">
                  <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">WhatsApp / Phone *</span>
                  <input
                    name="phone"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-green-400/60 focus:outline-none transition-colors"
                    placeholder="+971 50 ..."
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Website URL</span>
                  <input
                    name="website"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-green-400/60 focus:outline-none transition-colors"
                    placeholder="https://company.ae"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1.5">
                  <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Primary Review Area</span>
                  <select
                    name="service"
                    className="w-full rounded-xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white focus:border-green-400/60 focus:outline-none transition-colors"
                  >
                    <option value="AI & Workflow Automation">AI & Workflow Automation</option>
                    <option value="CRM & Lead Management">CRM & Lead-Flow Architecture</option>
                    <option value="WhatsApp Follow-Up & Bots">WhatsApp Follow-Up & Qualification</option>
                    <option value="Web & Conversion Flow">Website & Funnel Conversion</option>
                    <option value="Full Comprehensive Audit">Full Operational Technology Audit</option>
                  </select>
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Monthly Inquiries</span>
                  <select
                    name="leadVolume"
                    className="w-full rounded-xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white focus:border-green-400/60 focus:outline-none transition-colors"
                  >
                    <option value="1–50 inquiries/mo">1–50 inquiries / month</option>
                    <option value="50–200 inquiries/mo">50–200 inquiries / month</option>
                    <option value="200–1000 inquiries/mo">200–1,000 inquiries / month</option>
                    <option value="1000+ inquiries/mo">1,000+ inquiries / month</option>
                  </select>
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Current Bottleneck / Challenge *</span>
                <textarea
                  name="message"
                  required
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-green-400/60 focus:outline-none transition-colors resize-none"
                  placeholder="Describe your current manual delays: e.g. leads wait hours for a reply, team manually copies data between sheets, CRM isn't tracking WhatsApp conversions..."
                />
              </label>

              {status === "success" && (
                <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 text-xs leading-relaxed flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Audit request successfully received.</strong> We will review your submission and aim to provide your diagnostic recommendations within 2-3 business days.
                  </span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Submission could not be completed. Please try again or reach our team directly on WhatsApp (+971 54 586 6094).</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-4 font-semibold text-sm inline-flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Audit Intake...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Request Free Growth Audit</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-white/40 text-center">
                Your submitted details are used only to prepare this review and are handled with care.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── 2. What We Review (6 Diagnostic Pillars) ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono text-green-400 uppercase tracking-wider block mb-3">Diagnostic Scope</span>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-4">
            What We Review: The 6 Diagnostic Pillars
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Most businesses do not have one single issue. Customer drop-off often comes from small, compounding friction points across tools, handoffs, and delayed follow-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewPillars.map((pillar) => (
            <div key={pillar.title} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-base font-medium text-white mb-2">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. What You Receive (Deliverables Breakdown) ── */}
      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono text-green-400 uppercase tracking-wider block mb-3">Deliverables</span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-4">
              What You Receive Upon Delivery
            </h2>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
              We keep the output concise and practical. You receive a focused briefing prepared around the business context you submit and the public customer journey we can inspect.
          </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How the Review Works (3-Step Practical Process) ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono text-green-400 uppercase tracking-wider block mb-3">Timeline & Process</span>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-4">
            How the Review Works
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            A low-friction technical triage that avoids sensitive system access and keeps the review focused on practical next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {auditSteps.map((step) => (
            <div key={step.step} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] relative">
              <div className="text-xs font-mono text-green-400/80 mb-2">PHASE {step.step}</div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">{step.title}</h3>
              </div>
              <div className="inline-block rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-mono text-white/60 mb-3">
                {step.time}
              </div>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Who This Audit Is For (and Who It Is NOT For) ── */}
      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Target Audience */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-green-400 uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>Who This Audit Is Designed For</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-6">
              Built for Active UAE Businesses
            </h2>
            <div className="space-y-4">
              {targetAudiences.map((item) => (
                <div key={item.category} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <h4 className="text-sm font-semibold text-white mb-1">{item.category}</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Not Intended For */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-3">
              <AlertCircle className="w-4 h-4" />
              <span>Who This Audit Is NOT For</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-6">
              When This Review Is Not a Good Fit
            </h2>
            <div className="space-y-4">
              {nonAudiences.map((reason) => (
                <div key={reason} className="p-4 rounded-xl border border-red-500/10 bg-red-500/[0.02] flex items-start gap-3">
                  <span className="text-red-400 text-sm mt-0.5">✕</span>
                  <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. What We Do NOT Promise (Anti-Hype Compliance Guardrails) ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-white/50 uppercase tracking-wider block mb-3">Ethics & Transparency</span>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-4">
            What We Do Not Promise
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            This is a diagnostic review, not a guaranteed outcome pitch. We keep the recommendations practical, evidence-based, and clear about assumptions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ethicalGuardrails.map((guardrail) => (
            <div key={guardrail.title} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2.5 mb-2 text-white font-medium text-sm sm:text-base">
                <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                <span>{guardrail.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">{guardrail.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Commercial Bridge: Full Implementation Services ── */}
      <section className="px-6 md:px-12 py-16 border-t border-white/5 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.02]">
          <span className="text-xs font-mono text-green-400 uppercase tracking-wider block mb-3">Enterprise Systems & Scale</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-white mb-4">
            Looking for Full Enterprise System Implementation?
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            While this audit identifies friction points and architecture options, organizations requiring full-scale multi-agent development, middleware engineering, and ERP automation can partner with our dedicated service team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ai-automation-agency-dubai"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              <span>Explore AI Automation Agency Dubai</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] text-white px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <span>Direct Strategy Contact</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. Frequently Asked Questions ── */}
      <section className="px-6 md:px-12 py-20 border-t border-white/5 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-green-400 uppercase tracking-wider block mb-3">Common Questions</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 text-sm sm:text-base font-medium text-white hover:text-white/80 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-white/65 font-light leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
