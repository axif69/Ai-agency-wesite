"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, CheckCircle2, ChevronDown, 
  HelpCircle, Layers, MessageSquare, Shield, 
  Sparkles, Target, Zap, BarChart3, Database, 
  RefreshCw, PhoneCall, ExternalLink, Cpu, 
  FileText, Truck, Building, DollarSign, Users,
  Workflow, GitBranch, ArrowDown, Lock
} from "lucide-react";
import { trackEvent } from "../utils/analytics";

export default function WorkflowAutomationUAE() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "consultation") => {
    trackEvent(type === "whatsapp" ? "whatsapp_click" : "consultation_click", {
      service_name: "Workflow Automation UAE",
      cta_location: ctaLocation,
      cta_text: ctaText
    });
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* ── 1. Compact Breadcrumb ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/" className="hover:text-emerald-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <Link href="/services" className="hover:text-emerald-400 transition-colors">SERVICES</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95 font-sans">WORKFLOW AUTOMATION UAE</span>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.02] rounded-full blur-[130px]" />
        </div>

        <div className="max-w-5xl relative z-10 mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono uppercase tracking-widest text-white/70 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Business Process & Systems Integration • UAE & GCC Operations
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.08] mb-8">
            Workflow Automation & <br />
            <span className="text-white/60 italic font-light">Systems Integration in the UAE</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            We engineer robust operational workflows that bridge disconnected enterprise software: automated document parsing, ERP & CRM synchronization, procurement matching, and approval pipelines using n8n, Make, and custom APIs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              onClick={() => handleCTA("Book Systems Audit", "Hero CTA", "consultation")}
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-semibold uppercase tracking-wider text-xs hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            >
              Book Operational Systems Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20we%20want%20to%20automate%20our%20business%20workflows%20in%20the%20UAE." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Consultation", "Hero CTA", "whatsapp")}
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 bg-white/[0.02] text-white px-8 py-5 rounded-full font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Operations Desk
            </a>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
            <div>
              <div className="text-2xl font-serif font-bold text-white">Event-Driven</div>
              <div className="text-xs text-white/50 font-light mt-1">Webhook & API Pipelines</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-white">Zero Silos</div>
              <div className="text-xs text-white/50 font-light mt-1">ERP, CRM & DB Sync</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-white">Audited</div>
              <div className="text-xs text-white/50 font-light mt-1">Human-in-the-Loop Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-white">UAE Sovereign</div>
              <div className="text-xs text-white/50 font-light mt-1">Federal Decree-Law No. 45</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Direct Answer Block (AEO / GEO Knowledge Graph) ── */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="p-8 md:p-10 border border-white/15 bg-white/[0.02] rounded-3xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
            <Sparkles className="w-4 h-4" />
            Operational Architecture & Definition
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
            What is Workflow Automation in the UAE?
          </h2>
          <p className="text-white/80 font-light text-base md:text-lg leading-relaxed mb-4">
            In the UAE commercial environment, <strong>workflow automation</strong> is the practice of orchestrating disparate business applications—such as ERPs, CRMs, logistics databases, customs portals, and billing platforms—into unified, event-driven pipelines.
          </p>
          <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
            Rather than relying on administrative teams to manually download PDFs, copy numbers across spreadsheets, or forward emails between departments, workflow automation systems capture triggers (like a new trade RFQ, customs manifest, or supplier invoice), extract and validate the data, update core business databases, and request human management authorization before executing critical financial or operational hand-offs.
          </p>
        </div>
      </section>

      {/* ── 4. High-Contrast Architectural Diagram ── */}
      <section className="py-20 bg-white/[0.01] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
              Technical Topology
            </span>
            <h2 className="text-3xl md:text-4xl font-serif">
              End-to-End Workflow Architecture
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto mt-3 text-sm">
              How data flows securely from incoming triggers through automated validation to target business databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left relative">
            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <div className="text-xs uppercase font-mono text-emerald-400 mb-2">Layer 01</div>
              <h3 className="text-base font-semibold mb-2">Trigger / Inbound</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Inbound supplier PDFs, trade RFQs, customs documents, webhooks, or CRM deal stage updates.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <div className="text-xs uppercase font-mono text-emerald-400 mb-2">Layer 02</div>
              <h3 className="text-base font-semibold mb-2">Orchestration</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Middleware execution via self-hosted n8n, Make, or custom Node.js/Python webhook listeners.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <div className="text-xs uppercase font-mono text-emerald-400 mb-2">Layer 03</div>
              <h3 className="text-base font-semibold mb-2">Data Validation</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                VAT field validation and invoice checks, line-item matching against POs, currency normalization.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-black rounded-2xl">
              <div className="text-xs uppercase font-mono text-emerald-400 mb-2">Layer 04</div>
              <h3 className="text-base font-semibold mb-2">Approval & Sync</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Slack/Teams notification to manager with one-click approval before ERP record release.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Five Real UAE Operational Workflows ── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Production Use Cases
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            5 Operational Workflows We Engineer for UAE Firms
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm md:text-base">
            Engineered around realistic operational bottlenecks in logistics, wholesale trading, hospitality, and corporate finance.
          </p>
        </div>

        <div className="space-y-8">
          {/* Workflow 1 */}
          <div className="p-8 md:p-10 border border-white/10 bg-white/[0.01] rounded-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase text-emerald-400 mb-4">
              <Truck className="w-4 h-4" /> Workflow 01 • Logistics & Supply Chain
            </div>
            <h3 className="text-2xl font-serif mb-3">
              Logistics & Re-Export Documentation Workflows
            </h3>
            <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
              Eliminate delays in Free Zone customs documentation workflows. Automated pipelines ingest carrier paperwork, cross-reference shipment codes, and prepare clearance filings without manual data re-entry.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-white/40 uppercase font-mono text-[10px] mb-1">1. Input Trigger</div>
                <div className="text-white font-medium">Carrier Bill of Lading, packing list, or commercial invoice (PDF/CSV).</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-emerald-400 uppercase font-mono text-[10px] mb-1">2. Automation Layer</div>
                <div className="text-white/80 font-light">Data extraction, HS code verification, and container number cross-referencing.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-blue-400 uppercase font-mono text-[10px] mb-1">3. System Integration</div>
                <div className="text-white/80 font-light">Populates ERP dispatch record; generates standardized Free Zone documentation draft.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-amber-400 uppercase font-mono text-[10px] mb-1">4. Human Approval</div>
                <div className="text-white/80 font-light">Operations director reviews flagged weight/code discrepancies before portal upload.</div>
              </div>
            </div>
          </div>

          {/* Workflow 2 */}
          <div className="p-8 md:p-10 border border-white/10 bg-white/[0.01] rounded-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase text-emerald-400 mb-4">
              <FileText className="w-4 h-4" /> Workflow 02 • B2B Commerce & Distribution
            </div>
            <h3 className="text-2xl font-serif mb-3">
              B2B Trading & Procurement RFQ Processing
            </h3>
            <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
              Speed up trade quote generation in Dubai wholesale and distribution sectors. Inbound supplier quotations in different currencies and formats are standardized into comparison sheets.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-white/40 uppercase font-mono text-[10px] mb-1">1. Input Trigger</div>
                <div className="text-white font-medium">Inbound vendor quote PDFs or structured emails in USD, EUR, or AED.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-emerald-400 uppercase font-mono text-[10px] mb-1">2. Automation Layer</div>
                <div className="text-white/80 font-light">Extracts line items, calculates duty and FX margins, compiles comparison matrix.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-blue-400 uppercase font-mono text-[10px] mb-1">3. System Integration</div>
                <div className="text-white/80 font-light">Updates procurement spreadsheet and drafts internal Purchase Requisition in ERP.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-amber-400 uppercase font-mono text-[10px] mb-1">4. Human Approval</div>
                <div className="text-white/80 font-light">Procurement manager reviews ranked vendor options and clicks to authorize Purchase Order.</div>
              </div>
            </div>
          </div>

          {/* Workflow 3 */}
          <div className="p-8 md:p-10 border border-white/10 bg-white/[0.01] rounded-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase text-emerald-400 mb-4">
              <Building className="w-4 h-4" /> Workflow 03 • Hospitality & Property Assets
            </div>
            <h3 className="text-2xl font-serif mb-3">
              Hospitality Operations & Guest Service Coordination
            </h3>
            <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
              Ensure zero drop-off in high-touch Dubai hospitality and luxury serviced residence environments. Coordinate guest operations and booking-system synchronization automatically.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-white/40 uppercase font-mono text-[10px] mb-1">1. Input Trigger</div>
                <div className="text-white font-medium">New VIP reservation or WhatsApp concierge service request.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-emerald-400 uppercase font-mono text-[10px] mb-1">2. Automation Layer</div>
                <div className="text-white/80 font-light">Classifies request urgency, tags guest preferences, and generates pre-arrival dossier.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-blue-400 uppercase font-mono text-[10px] mb-1">3. System Integration</div>
                <div className="text-white/80 font-light">Syncs task tickets into operational PMS and sends WhatsApp alert to duty manager.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-amber-400 uppercase font-mono text-[10px] mb-1">4. Human Approval</div>
                <div className="text-white/80 font-light">Concierge manager authorizes VIP complimentary amenities or suite modifications.</div>
              </div>
            </div>
          </div>

          {/* Workflow 4 */}
          <div className="p-8 md:p-10 border border-white/10 bg-white/[0.01] rounded-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase text-emerald-400 mb-4">
              <DollarSign className="w-4 h-4" /> Workflow 04 • Finance & Accounts Payable
            </div>
            <h3 className="text-2xl font-serif mb-3">
              Invoice & Accounts Payable Processing
            </h3>
            <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
              Streamline finance operations without risk. Automatic VAT field validation and invoice checks match bills against approved purchase orders before entering accounting records.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-white/40 uppercase font-mono text-[10px] mb-1">1. Input Trigger</div>
                <div className="text-white font-medium">Supplier invoice PDF received via dedicated billing inbox or supplier portal.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-emerald-400 uppercase font-mono text-[10px] mb-1">2. Automation Layer</div>
                <div className="text-white/80 font-light">TRN validation, line-item arithmetic check, and 2-way match against original PO.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-blue-400 uppercase font-mono text-[10px] mb-1">3. System Integration</div>
                <div className="text-white/80 font-light">Creates draft bill in Zoho Books, Xero, or QuickBooks with source document attached.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-amber-400 uppercase font-mono text-[10px] mb-1">4. Human Approval</div>
                <div className="text-white/80 font-light">Finance controller reviews match summary and signs off on payment release.</div>
              </div>
            </div>
          </div>

          {/* Workflow 5 */}
          <div className="p-8 md:p-10 border border-white/10 bg-white/[0.01] rounded-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase text-emerald-400 mb-4">
              <Database className="w-4 h-4" /> Workflow 05 • Sales Operations & Data Sync
            </div>
            <h3 className="text-2xl font-serif mb-3">
              CRM & Multi-Database Synchronization
            </h3>
            <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
              Maintain absolute data fidelity across commercial branches. Continuous two-way synchronization ensures client records, signed contracts, and inventory data remain identical across systems.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-white/40 uppercase font-mono text-[10px] mb-1">1. Input Trigger</div>
                <div className="text-white font-medium">Deal closed or contact updated in HubSpot, Salesforce, or Zoho CRM.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-emerald-400 uppercase font-mono text-[10px] mb-1">2. Automation Layer</div>
                <div className="text-white/80 font-light">Normalizes field syntax, checks for duplicates, and updates related record links.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-blue-400 uppercase font-mono text-[10px] mb-1">3. System Integration</div>
                <div className="text-white/80 font-light">Syncs updates across PostgreSQL/MySQL database, Google Sheets, and team channels.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black">
                <div className="text-amber-400 uppercase font-mono text-[10px] mb-1">4. Human Approval</div>
                <div className="text-white/80 font-light">Sales operations manager alerted only on field collisions or account reassignments.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Operational Governance: What We Automate vs Human Approval ── */}
      <section className="py-20 bg-white/[0.01] border-y border-white/5 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-3">
              Operational Boundaries & Trust
            </span>
            <h2 className="text-3xl md:text-4xl font-serif">
              What We Automate — And What Still Requires Human Approval
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto mt-3 text-sm">
              We build automation systems with rigid safety perimeters. AI accelerates execution; humans retain executive authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-white/10 bg-black rounded-3xl">
              <div className="flex items-center gap-2.5 text-emerald-400 font-semibold mb-6 text-base">
                <CheckCircle2 className="w-5 h-5" /> What We Automate (Zero-Touch Execution)
              </div>
              <ul className="space-y-4 text-xs text-white/70 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Document ingestion, OCR parsing, and field extraction from invoices, bills of lading, and quotations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Two-way cross-referencing between ERP purchase orders, customs paperwork, and supplier receipts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Routine status notifications and multi-channel logging across WhatsApp, Slack, and email.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Database normalization, deduplication, and synchronization between CRM and internal SQL servers.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 border border-white/10 bg-black rounded-3xl">
              <div className="flex items-center gap-2.5 text-amber-400 font-semibold mb-6 text-base">
                <Lock className="w-5 h-5" /> What Requires Human Approval (Safety Boundaries)
              </div>
              <ul className="space-y-4 text-xs text-white/70 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Final payment disbursement authorization and bank transfer releases.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Official customs declaration filings where regulatory liability rests with licensed broker.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Contractual commitments, terms renegotiations, or supplier discount overrides.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Credit line extension adjustments and sensitive commercial dispute escalations.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Platforms & Middleware We Genuinely Support ── */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Integration Stack
          </span>
          <h2 className="text-3xl font-serif">
            Platforms & Middleware We Genuinely Support
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-3 text-sm">
            We do not claim universal compatibility with obscure legacy mainframes. We specialize in modern, reliable integration tooling:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left text-xs font-mono">
          <div className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="text-emerald-400 font-bold mb-1">n8n Middleware</div>
            <div className="text-white/50 text-[11px]">Self-hosted UAE compute or cloud execution.</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="text-emerald-400 font-bold mb-1">Make (Integromat)</div>
            <div className="text-white/50 text-[11px]">Rapid visual workflow orchestration.</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="text-emerald-400 font-bold mb-1">Custom Webhooks</div>
            <div className="text-white/50 text-[11px]">Event-driven Node.js / Python microservices.</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="text-emerald-400 font-bold mb-1">HubSpot & Salesforce</div>
            <div className="text-white/50 text-[11px]">Enterprise CRM REST API sync.</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="text-emerald-400 font-bold mb-1">Zoho Suite</div>
            <div className="text-white/50 text-[11px]">Zoho CRM, Books, and Inventory.</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="text-emerald-400 font-bold mb-1">PostgreSQL & MySQL</div>
            <div className="text-white/50 text-[11px]">Direct transactional database queries.</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="text-emerald-400 font-bold mb-1">Microsoft 365</div>
            <div className="text-white/50 text-[11px]">SharePoint, Outlook, and Teams webhooks.</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="text-emerald-400 font-bold mb-1">WhatsApp Cloud API</div>
            <div className="text-white/50 text-[11px]">Official Meta Business Platform gateway.</div>
          </div>
        </div>
      </section>

      {/* ── 8. Frequently Asked Questions ── */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block mb-3">
            Clear Answers
          </span>
          <h2 className="text-3xl md:text-5xl font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto mt-4 text-sm">
            Common technical and commercial questions about deploying workflow automation across the UAE.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does workflow automation differ from hiring an AI development agency?",
              a: "While an AI development agency often focuses on building custom AI models or chat interfaces from scratch, workflow automation focuses on connecting and streamlining your existing operational software (ERPs, CRMs, billing tools, and email) using secure middleware and automated data validation."
            },
            {
              q: "Do you support self-hosted n8n instances within the UAE?",
              a: "Yes. We configure self-hosted or dedicated n8n instances designed with UAE PDPL-aligned data handling, role-based access controls, customer-owned credentials, and optional UAE-region hosting where required by client governance policy."
            },
            {
              q: "Can you automate document processing for Free Zone logistics and trading?",
              a: "Yes. We build pipelines that parse carrier bills of lading, packing lists, and commercial invoices, extracting container details and line items to accelerate internal Free Zone customs documentation workflows."
            },
            {
              q: "Does your invoice workflow verify legal tax compliance?",
              a: "No. We perform VAT field validation and invoice checks—such as checking that TRN syntax is formatted correctly, line items match purchase orders, and mathematical totals align. Final legal tax determinations remain the responsibility of your licensed tax auditor or internal finance director."
            },
            {
              q: "How long does a standard workflow integration take to deploy?",
              a: "A single targeted workflow (such as CRM-to-billing synchronization or invoice parsing) typically deploys in 2 to 3 weeks, including sandbox testing and staff approval training."
            }
          ].map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-white/10 bg-white/[0.01] rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
              >
                <span className="text-base font-medium text-white/90">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
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
            Eliminate Repetitive Operational Friction <br />
            <span className="text-white/50 italic font-light">Across Your UAE Business</span>
          </h2>
          <p className="text-white/60 font-light text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Let us audit your current manual hand-offs and architect reliable, event-driven pipelines between your software systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              onClick={() => handleCTA("Book Systems Audit", "Final CTA", "consultation")}
              className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            >
              Schedule Systems Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20to%20discuss%20workflow%20automation." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Final CTA", "Final CTA", "whatsapp")}
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 bg-white/[0.02] text-white px-8 py-5 rounded-full font-semibold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Strategic Desk
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. Topic Cluster Internal Navigation & Cross-Link ── */}
      <section className="py-12 border-t border-white/5 bg-black/40 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Related AI & Automation Infrastructure
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/ai-automation-agency-dubai" className="hover:text-white transition-colors text-emerald-400 font-medium">AI Automation Agency Dubai (Commercial Hub)</Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-marketing-dubai" className="hover:text-white transition-colors">AI Marketing Agency Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/real-estate" className="hover:text-white transition-colors">Real Estate AI Hub</Link>
            <span className="text-white/20">•</span>
            <Link href="/free-growth-audit" className="hover:text-white transition-colors">Free Growth Audit</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
