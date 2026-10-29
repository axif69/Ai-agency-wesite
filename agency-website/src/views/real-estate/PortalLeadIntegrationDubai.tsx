"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Cpu,
  Database,
  FileText,
  Filter,
  Globe,
  Headphones,
  HelpCircle,
  Layers,
  LockKeyhole,
  MessageSquare,
  Mic,
  Radio,
  RefreshCw,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Zap,
  AlertCircle,
  SlidersHorizontal,
} from "lucide-react";

const whatsappUrl = "https://wa.me/971545866094";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "How does the portal lead integration pipeline work from Bayut, Property Finder, and Dubizzle?",
    a: "When a prospective buyer or tenant submits an inquiry on Bayut, Property Finder, or Dubizzle, the portal dispatches a lead notification. Depending on your brokerage's subscription tier, portal permissions, and available integration options, this data is captured either via real-time HTTP webhooks (where supported by the portal account, such as Bayut Pro or Property Finder Manager) or via automated parsing of structured lead notification emails. Our integration endpoint processes the payload, normalizes contact and property reference details, validates phone numbers into international E.164 format (+971 for UAE), checks for existing CRM records, and syncs the inquiry into your CRM pipeline.",
  },
  {
    q: "How does the system handle lead deduplication across multiple portals?",
    a: "Property buyers in Dubai frequently inquire on multiple listings across both Bayut and Property Finder within short time windows. Our normalization engine indexes incoming leads by verified phone number and email address. When a matching contact already exists in your CRM, the system updates the existing profile with the new property interest, community tag, and portal source rather than generating a confusing duplicate record. This ensures your sales brokers see the buyer's complete search history without sending duplicate outreach messages.",
  },
  {
    q: "What happens if a portal lead arrives with incomplete data or an invalid phone number?",
    a: "If a lead payload is missing a phone number or contains an unparseable international format, the engine isolates the record and tags it for administrative review. If an email address is present, an automated verification check is performed, and the record is logged into your CRM under an 'Incomplete Contact' queue. A notification is dispatched to your operations desk so a coordinator can cross-reference the portal reference number directly in Bayut Pro or Property Finder Manager.",
  },
  {
    q: "What happens if our CRM or the WhatsApp API experiences downtime?",
    a: "The integration architecture incorporates persistent retry buffering. If your CRM API or WhatsApp endpoint returns a 5xx error or rate limit, incoming payloads are held in a retry queue with exponential backoff. Auxiliary backup logging (such as an encrypted administrative alert or secondary data store) is maintained to capture inquiries during downstream outages, facilitating delivery reconciliation once services recover.",
  },
  {
    q: "How are leads assigned to brokers across our agency?",
    a: "Lead assignment rules are customized to your brokerage structure. Common routing configurations include round-robin distribution among active sales agents, territory-based routing by community (e.g., Downtown Dubai, Dubai Marina, Palm Jumeirah), transaction specialization (Off-Plan vs. Secondary/Resale vs. Leasing), and language matching (Arabic, English, Russian, French). If an assigned agent does not acknowledge or open the lead within a configured SLA window (e.g., 15 minutes), the system can automatically escalate the notification to a team lead or the next available agent.",
  },
  {
    q: "Do our brokers need to learn a new software application?",
    a: "No. Your brokers continue working in the tools they already use every day: their existing CRM (such as PropSpace, Zoho, Salesforce, or HubSpot) and WhatsApp. When a qualified portal lead arrives, the assigned broker receives an instant WhatsApp alert containing a structured summary (buyer name, phone number, property reference, community, budget, and inquiry source) along with a direct one-tap link to open the CRM deal card.",
  },
  {
    q: "Can the integration trigger automated WhatsApp messages to portal buyers?",
    a: "Yes, when configured with the official Meta WhatsApp Business Platform (Cloud API) and subject to applicable Meta messaging policies. Outbound automated messages must use pre-approved Meta Message Templates (typically under Utility categories) and must align with user consent and opt-in guidelines. Third-party portal inquiries do not permit unrestricted promotional broadcasting; automated messages are restricted to acknowledging the requested property details, sharing relevant collateral, and facilitating direct broker follow-up.",
  },
  {
    q: "Can voice notes be transcribed if an inbound buyer responds with audio on WhatsApp?",
    a: "As an optional, implementation-dependent module, automated WhatsApp pipelines can connect to external speech-to-text AI models to transcribe incoming audio voice notes (supporting languages such as Arabic, English, Russian, and French). Where implemented, transcription summaries are logged directly to the buyer's CRM timeline to assist the assigned broker. Speech recognition accuracy varies by audio clarity, background noise, and dialect.",
  },
  {
    q: "Which real estate CRMs are supported in the UAE?",
    a: "We integrate with CRM platforms that provide accessible REST APIs, webhook receivers, or structured email ingestion. This includes major platforms like HubSpot, Zoho CRM, and Salesforce. Integration with specialized UAE real estate systems (such as PropSpace, Masterkey, or Ruby CRM) is subject to the vendor-supported API capabilities, developer permissions, and add-on access included in your brokerage's subscription plan.",
  },
  {
    q: "What technical prerequisites and accounts does our brokerage need to get started?",
    a: "Your agency needs: (1) An active brokerage subscription with Bayut and/or Property Finder with webhook delivery or automated lead email forwarding enabled; (2) Administrative or API credentials for your CRM; (3) A verified Meta Business Manager account with access to the WhatsApp Business Platform and a clean, dedicated phone number if automated WhatsApp outreach is required; and (4) Updated project collateral (PDF brochures and floorplans) if automated off-plan collateral dispatch is planned.",
  },
  {
    q: "What factors determine the implementation timeline and engineering scope?",
    a: "Timeline and scope depend on your existing technical infrastructure: whether your portal package provides direct webhooks or requires email payload parsing; the complexity of your broker routing logic (single round-robin vs. multi-tier language, community, and shift-based rules); the depth of custom fields required in your CRM; and whether Meta WhatsApp template approvals and automated brochure delivery are part of the initial deployment.",
  },
  {
    q: "How is buyer and inquiry data handled regarding privacy?",
    a: "Data pipelines are built using privacy-conscious engineering practices aligned with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL) principles. All ingestion endpoints enforce encrypted HTTPS/TLS transport, API credentials and webhook secrets are stored in encrypted environment vaults, and lead payloads are dispatched directly to your brokerage's authorized CRM without third-party data monetization or external audience pooling. Deployment in specific geographic cloud regions can be configured based on your firm's data residency requirements.",
  },
];

export default function PortalLeadIntegrationDubaiView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPortal, setSelectedPortal] = useState<"all" | "bayut" | "pf" | "dubizzle">("all");

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bayut & Property Finder Lead Integration Dubai",
    provider: {
      "@type": "Organization",
      name: "Asif Digital Agency",
      url: "https://www.asifdigital.agency",
    },
    serviceType: "Real Estate Portal Integration & WhatsApp Lead Automation",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
    description:
      "Connect Bayut, Property Finder and Dubizzle leads to WhatsApp and CRM workflows for faster routing, qualification and follow-up in Dubai.",
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-400/30">
      {/* Head JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden px-6 md:px-12 pt-28 pb-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
              Bayut · Property Finder · Dubizzle · Meta Ingestion
            </span>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.08] text-white mb-6">
              Bayut &amp; Property Finder <br />
              Lead Integration in Dubai
            </h1>

            <p className="text-xl md:text-2xl font-serif text-white/90 leading-snug mb-6">
              Connect Inbound Portal Inquiries to CRM Records, Broker Assignments, and WhatsApp Follow-Up Workflows.
            </p>

            <p className="text-base text-white/70 font-light leading-relaxed mb-8 max-w-2xl">
              When a prospective buyer or investor submits an inquiry on Bayut, Property Finder, or Dubizzle, delayed follow-up reduces viewing conversion. We build resilient webhook and API pipelines that capture incoming portal payloads, validate and deduplicate buyer records, update your CRM in real time, and trigger structured WhatsApp follow-ups with instant broker notifications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/real-estate-crm-dubai#crm-enquiry"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg"
              >
                Request Integration Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/free-growth-audit"
                className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                Free Real Estate Systems Audit
              </Link>
            </div>
          </motion.div>

          {/* Interactive Portal Control Panel Mockup */}
          <div>
            <div className="mb-4 p-3.5 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 text-[11px] text-white/80 leading-relaxed flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0 animate-pulse" />
              <div>
                <strong className="text-white block font-medium">Live Pipeline Simulation</strong>
                Demonstrates how incoming lead data from Bayut Pro, Property Finder Manager, and Dubizzle (via webhooks or automated email parsing, depending on portal account tier and permissions) is normalized, deduplicated, and routed into CRM deal stages with broker alerts.
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-[2.5rem] border border-white/10 bg-black/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
            >
              {/* Control Panel Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">Inbound Lead Stream</h3>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Real-Time Webhook Listener
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  Resilient Queue Active
                </span>
              </div>

              {/* Portal Source Filter Buttons */}
              <div className="flex gap-2 mb-5">
                {(["all", "bayut", "pf", "dubizzle"] as const).map((portal) => (
                  <button
                    key={portal}
                    onClick={() => setSelectedPortal(portal)}
                    className={`text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
                      selectedPortal === portal
                        ? "bg-white text-black font-bold border-white"
                        : "border-white/10 text-white/60 hover:border-white/30"
                    }`}
                  >
                    {portal === "all" ? "All Channels" : portal === "bayut" ? "Bayut Pro" : portal === "pf" ? "Property Finder" : "Dubizzle"}
                  </button>
                ))}
              </div>

              {/* Simulated Live Portal Inquiries Stream */}
              <div className="space-y-3 font-sans text-xs">
                {(selectedPortal === "all" || selectedPortal === "bayut") && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-emerald-400/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                        BAYUT
                      </div>
                      <div>
                        <div className="text-white font-medium text-xs">Mohamed A. · Downtown Dubai (2BR Off-Plan)</div>
                        <div className="text-[10px] text-white/50 font-mono">Ref: B-7182 · Budget: AED 3.2M · E.164 Clean</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                      CRM Synced · WhatsApp Sent
                    </span>
                  </div>
                )}

                {(selectedPortal === "all" || selectedPortal === "pf") && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-blue-400/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[10px]">
                        PF
                      </div>
                      <div>
                        <div className="text-white font-medium text-xs">Elena R. · Dubai Marina (1BR Resale)</div>
                        <div className="text-[10px] text-white/50 font-mono">Ref: PF-9941 · Budget: AED 1.85M · Deduplicated</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-400/30 px-2.5 py-1 rounded-full">
                      Marina Desk Assigned
                    </span>
                  </div>
                )}

                {(selectedPortal === "all" || selectedPortal === "dubizzle") && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-purple-400/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-[10px]">
                        DUB
                      </div>
                      <div>
                        <div className="text-white font-medium text-xs">Tariq K. · Palm Jumeirah (Luxury Villa)</div>
                        <div className="text-[10px] text-white/50 font-mono">Ref: DBZ-3320 · Budget: AED 14.5M · VIP Lead</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 border border-purple-400/30 px-2.5 py-1 rounded-full">
                      Direct Director Alert
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Status Bar */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zoho, HubSpot &amp; PropSpace API Compatible
                </span>
                <span>Fault-Tolerant Queue Buffer</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. OPERATIONAL REALITY & LEAD INTAKE BOTTLENECKS ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Market Context &amp; Intake Challenges
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              Why Manual Portal Processing Slows Down Dubai Brokerage Growth
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              Real estate brokerages in Dubai invest heavily in monthly listing subscriptions across Bayut, Property Finder, and Dubizzle. Yet, inquiries often arrive as unformatted email alerts or fragmented portal notifications that sit unaddressed during peak inquiry surges or outside standard working hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-6 font-mono font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white mb-3">Response Latency Friction</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Serious property seekers frequently submit inquiries on three to five listings simultaneously. When an agency takes hours to review an email notification, the prospective buyer has already engaged with a faster-responding competitor.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-6 font-mono font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white mb-3">Multi-Timezone Inquiries</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Dubai&apos;s real estate market attracts international investors from the UK, Europe, the GCC, and Asia. A substantial portion of portal inquiries arrive during evening hours or weekends when front-office staff are offline, requiring automated intake and structured scheduling.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-6 font-mono font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white mb-3">WhatsApp Buyer Preference</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                In the UAE, property buyers rarely respond to unknown phone numbers or check email inboxes for listing updates. They expect immediate, structured WhatsApp communication with verified floorplans, brochures, and payment terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE 6-STEP INTAKE & ROUTING ARCHITECTURE ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Technical Pipeline
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              The 6-Step Portal Ingestion &amp; Broker Routing Architecture
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              Here is how an incoming inquiry moves from a portal listing into your CRM database and your broker&apos;s active workflow without manual copy-pasting:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-5 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Portal Data Ingestion &amp; Capture</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                When an inquiry is submitted on Bayut, Property Finder, or Dubizzle, our endpoint captures the data via available account webhooks or automated email parsing (depending on your portal subscription and tier), extracting buyer contact information, listing ID, community, and price.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-5 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Normalization &amp; Phone Cleansing</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Raw telephone inputs are converted to strict international E.164 format (+971 for UAE numbers, standardizing country codes for overseas buyers). Text fields are sanitized to remove formatting errors before processing.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-5 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Deduplication &amp; Contact Matching</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The engine queries your CRM for existing contacts matching the phone or email. If found, it appends the new listing inquiry to the existing contact card rather than cluttering your database with duplicate deals.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-5 font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-semibold text-white mb-2">CRM Deal &amp; Activity Ingestion</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                A new deal or inquiry record is created in your supported CRM (such as HubSpot, Zoho, Salesforce, or API-enabled PropSpace accounts) with lead source attribution (Bayut, PF, Dubizzle), property specs, inquiry timestamp, and campaign tags.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-5 font-mono font-bold text-sm">
                05
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Compliant WhatsApp Follow-Up</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Where WhatsApp automation is enabled, an approved Meta Utility Message Template is dispatched in compliance with Meta&apos;s messaging policies and consent guidelines. It acknowledges the specific listing requested, delivers approved collateral, and transitions the conversation to a broker.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-5 font-mono font-bold text-sm">
                06
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Broker Assignment &amp; Handoff</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                The designated sales broker receives an instant WhatsApp alert containing the full lead summary, buyer responses, and a one-click link to claim or call the lead directly from their mobile device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. EDGE CASES, FAILOVER & RELIABILITY ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Resilience &amp; Error Handling
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              How the System Manages Edge Cases, Duplicate Inquiries, and API Downtime
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              Production integrations must withstand real-world conditions: spotty portal payloads, multiple inquiries from the same buyer, and third-party API rate limits. Here is how our architecture maintains data integrity:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Duplicate Inquiry Management</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  When a buyer inquires on multiple listings within hours, the engine matches their E.164 phone number, logs the additional listing interest on their active CRM timeline, and notifies the assigned broker of the expanded search parameters without creating redundant contact profiles.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Incomplete Payload Isolation</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  If a portal payload is missing essential phone digits or contains corrupted characters, the system flags the lead for manual review and pushes an alert to your operations coordinator with the portal reference ID, preventing broken CRM entries.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Queue Buffering &amp; API Failover</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  If your CRM undergoes maintenance or Meta&apos;s WhatsApp API encounters temporary latency, incoming portal leads are held in a resilient FIFO queue buffer. The system automatically retries delivery with exponential backoff until acknowledged, minimizing unhandled payload loss and logging delivery exceptions for audit reconciliation.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex-shrink-0 flex items-center justify-center">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Broker SLA Escalation Timers</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Broker responsiveness can be monitored via configurable SLA timers. If an assigned broker does not open or claim an inquiry within a specified threshold (e.g., 15 minutes during business hours), the lead automatically cascades to a backup agent or sales director.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TECHNICAL PREREQUISITES & CLIENT CHECKLIST ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Deployment Prerequisites
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              What Your Brokerage Needs in Place Before Implementation
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              To ensure a seamless deployment without integration roadblocks, here are the core technical accounts and assets required from your team:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">1. Portal Accounts</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Active brokerage subscriptions on Bayut Pro, Property Finder Manager, or Dubizzle, with administrative access to configure webhook endpoints (where supported by your package) or automated email forwarding rules.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">2. CRM API Access</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Administrative credentials or REST API tokens for your CRM (such as Zoho, HubSpot, Salesforce, or vendor-authorized API access for PropSpace/Masterkey) to enable automated contact and deal creation.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">3. Meta WhatsApp API</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                A verified Meta Business Manager account and a clean, dedicated business phone number (not linked to a mobile WhatsApp app) if automated WhatsApp follow-ups are included.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">4. Listing Collateral</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed">
                Current developer brochures, floorplan PDFs, and payment schedule sheets hosted in cloud storage if automated brochure delivery is part of your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. IMPLEMENTATION STAGES & COST DRIVERS ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Delivery Roadmap
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
              Implementation Stages &amp; Project Scope Factors
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              We engineer custom integrations tailored to your brokerage&apos;s specific CRM schema and operational structure. Here is how projects are delivered and what influences investment scope:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            {/* Delivery Stages */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-white mb-4">5-Stage Engineering Process</h3>
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">1</span>
                  <h4 className="font-semibold text-sm text-white">Discovery &amp; Schema Audit</h4>
                </div>
                <p className="text-xs text-white/65 font-light leading-relaxed pl-9">
                  We audit your active portal subscription tiers, CRM pipeline stages, custom fields, and current broker routing rules to produce a technical integration blueprint.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">2</span>
                  <h4 className="font-semibold text-sm text-white">Webhook Endpoint &amp; Normalization Engineering</h4>
                </div>
                <p className="text-xs text-white/65 font-light leading-relaxed pl-9">
                  We deploy secure, serverless webhook listeners, build phone normalization logic (E.164), and configure deduplication filters to ensure clean data ingestion.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">3</span>
                  <h4 className="font-semibold text-sm text-white">CRM &amp; Messaging Configuration</h4>
                </div>
                <p className="text-xs text-white/65 font-light leading-relaxed pl-9">
                  We map custom fields in your CRM, submit WhatsApp Business Message Templates to Meta for approval, and establish broker alert notifications.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">4</span>
                  <h4 className="font-semibold text-sm text-white">End-to-End Simulation &amp; Failover Testing</h4>
                </div>
                <p className="text-xs text-white/65 font-light leading-relaxed pl-9">
                  We run simulated payload injections across Bayut and Property Finder formats, validating duplicate handling, queue buffering, and broker handoffs.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">5</span>
                  <h4 className="font-semibold text-sm text-white">Broker Onboarding &amp; Production Go-Live</h4>
                </div>
                <p className="text-xs text-white/65 font-light leading-relaxed pl-9">
                  We conduct a walkthrough for your sales team, verify live production portal traffic, and monitor telemetry to ensure stable, reliable lead throughput.
                </p>
              </div>
            </div>

            {/* Scope & Cost Drivers */}
            <div className="p-8 rounded-3xl border border-white/10 bg-black/40">
              <h3 className="text-xl font-serif text-white mb-4">Scope &amp; Cost Factors</h3>
              <p className="text-xs text-white/65 font-light leading-relaxed mb-6">
                Rather than charging high recurring per-seat SaaS subscription fees, Asif Digital builds custom engineering infrastructure owned by your agency. Project investment is scoped based on:
              </p>

              <div className="space-y-4 text-xs text-white/70 font-light">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">Number of Ingestion Channels</strong>
                    Direct webhooks vs. email parsing across Bayut, Property Finder, Dubizzle, website forms, and paid Meta/Google campaigns.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">Routing Complexity</strong>
                    Simple round-robin vs. multi-tiered rules based on community territories, price thresholds, language desks, and shift hours.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">CRM Architecture Depth</strong>
                    Standard deal creation vs. bi-directional synchronization, custom deal stages, automated task creation, and analytics tagging.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">Meta Conversation Volume</strong>
                    Official WhatsApp Cloud API conversation fees are billed directly to your brokerage by Meta according to their standard category rates.
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/real-estate-crm-dubai#crm-enquiry"
                  className="w-full bg-emerald-400 text-black py-3.5 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors shadow-lg"
                >
                  Request Tailored Scope &amp; Proposal <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PERFORMANCE COMPARISON TABLE ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-3">
              Operational Comparison
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Manual Portal Ingestion vs. Asif Digital Webhook Pipeline
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-sans">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-mono tracking-wider text-white/50">
                  <th className="py-4 px-6">Capability</th>
                  <th className="py-4 px-6">Manual Inbox Management</th>
                  <th className="py-4 px-6">Generic Email Importers</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20 rounded-t-xl">Asif Digital Integration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Intake Latency</td>
                  <td className="py-4 px-6 text-red-400">Hours (Depends on staff checking inbox)</td>
                  <td className="py-4 px-6 text-yellow-400">15 to 45 minutes (Polling batch runs)</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Seconds (Real-time webhook capture)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">After-Hours &amp; Weekend Leads</td>
                  <td className="py-4 px-6 text-red-400">Unanswered until next working day</td>
                  <td className="py-4 px-6 text-yellow-400">Logged in CRM, no immediate engagement</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">24/7 Automated WhatsApp Acknowledgment</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Deduplication Logic</td>
                  <td className="py-4 px-6 text-red-400">Manual review (Duplicate contacts created)</td>
                  <td className="py-4 px-6 text-yellow-400">Basic email match only</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Normalized E.164 Phone &amp; Email Matching</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Broker Notification</td>
                  <td className="py-4 px-6 text-red-400">Internal email or verbal alert</td>
                  <td className="py-4 px-6 text-yellow-400">Standard CRM task notification</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20">Instant Mobile WhatsApp Alert with Brief</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Failover &amp; Error Buffering</td>
                  <td className="py-4 px-6 text-red-400">Lost if email is missed or deleted</td>
                  <td className="py-4 px-6 text-red-400">Failures drop silently during CRM outage</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold bg-emerald-950/20 rounded-b-xl">Resilient Retry Queue + Backup Log</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED QUESTIONS (FAQS) ── */}
      <section className="py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-white/60 font-light text-center mb-12">
            Detailed answers regarding portal webhooks, CRM connectivity, broker routing, and data protection for UAE agencies.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 text-base font-serif text-white hover:text-emerald-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 transition-transform ${
                      openFaq === idx ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CALL-TO-ACTION SECTION ── */}
      <section className="py-24 px-6 md:px-12 text-center bg-gradient-to-b from-black to-emerald-950/30">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-4">
            Custom Real Estate Systems Engineering
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Connect Your Portal Leads to Structured Follow-Up Workflows
          </h2>
          <p className="text-lg text-white/70 font-light mb-10 max-w-2xl mx-auto">
            Schedule a technical consultation with Asif Digital. We will review your current portal subscriptions, CRM architecture, and broker routing rules to design a reliable integration pipeline.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/real-estate-crm-dubai#crm-enquiry"
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-2xl"
            >
              Request Integration Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              Discuss Technical Scope on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
