"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Eye,
  FileSearch,
  Globe,
  HelpCircle,
  Layers,
  LineChart,
  Lock,
  MessageSquare,
  Network,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  Terminal,
  Zap,
  ChevronDown,
  Building2,
  Check,
  AlertCircle,
  BarChart3,
  SlidersHorizontal,
} from "lucide-react";

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "Answer Engine Optimization (AEO)",
    subtitle: "Direct-Answer Architecture for Google AI Overviews",
    description:
      "Formatting commercial and service pages so search engines can readily extract direct, authoritative summaries for Google AI Overviews, featured snippets, and voice queries across the UAE.",
    capabilities: [
      "Direct, concise answer summaries positioned in high-visibility content zones",
      "Semantic comparison matrices and structured decision tables",
      "Search-intent aligned FAQ architecture with verified schema markup",
      "Clear process workflows, boundary definitions, and structured bullet lists",
    ],
  },
  {
    number: "02",
    title: "Generative Engine Optimization (GEO)",
    subtitle: "Entity Authority for ChatGPT, Perplexity & Gemini",
    description:
      "Structuring your organization's entity profile, topical authority, and online citations so AI answer engines can identify, understand, and reference your business in conversational search responses.",
    capabilities: [
      "Entity graph mapping establishing verified brand-to-service relationships",
      "Co-citation development across authoritative regional directories and industry portals",
      "Comprehensive topical coverage addressing common commercial buyer questions",
      "Factual consistency checks across external web mentions, trade profiles, and digital PR",
    ],
  },
  {
    number: "03",
    title: "Technical SEO & Semantic Knowledge Graph",
    subtitle: "Machine-Readable Architecture & Core Web Vitals",
    description:
      "Clean crawl paths, performance-focused Next.js architecture, and multi-layered JSON-LD schema networks that give search crawlers unambiguous entity definitions for your service taxonomy.",
    capabilities: [
      "Comprehensive JSON-LD structured data (Organization, ProfessionalService, FAQs, Services)",
      "Strict canonical discipline supporting a clean crawl architecture",
      "Fast Largest Contentful Paint (LCP) and responsive mobile rendering",
      "Clean sitemap hierarchies and structured URL routing architecture",
    ],
  },
  {
    number: "04",
    title: "Search Intent Architecture & Topic Silos",
    subtitle: "Intent Demarcation & Internal Link Topology",
    description:
      "Organizing every page into clear intent categories—informational guides, commercial service hubs, and conversion pages—connected through contextual internal links, eliminating orphaned pages.",
    capabilities: [
      "Clear intent mapping preventing informational vs. commercial keyword dilution",
      "Contextual topic silos connecting high-traffic research guides to conversion hubs",
      "Elimination of internal keyword cannibalization across geographic and service terms",
      "Natural anchor text diversification reflecting genuine commercial search behavior",
    ],
  },
  {
    number: "05",
    title: "Serps Freshness & Continuous Optimization",
    subtitle: "Query Monitoring & Search Performance Refinement",
    description:
      "Systematic tracking of Google Search Console impressions, average rankings, and SERP layout shifts to guide data-driven content updates and maintain search visibility over time.",
    capabilities: [
      "GSC impression and average position monitoring across core query clusters",
      "Scheduled updates for technical specifications, pricing models, and FAQ blocks",
      "Competitor gap analysis identifying newly emerging commercial search intents",
      "Periodic pruning, consolidation, and redirection of outdated or redundant URLs",
    ],
  },
];

const faqs = [
  {
    q: "What is the difference between traditional SEO, AI SEO, and AEO?",
    a: "Traditional SEO focuses on earning visibility in standard organic search listings (the blue links on Google) through technical health, keyword relevance, and backlinks. AI SEO and Answer Engine Optimization (AEO) build upon traditional SEO by formatting content into concise direct answers, comparison matrices, and machine-readable entity schemas. This enables search engines and conversational AI models (such as Google AI Overviews, ChatGPT Search, and Perplexity) to extract and cite your business when formulating synthesized answers.",
  },
  {
    q: "Why should a UAE business optimize for both traditional SEO and AEO together?",
    a: "Search behavior is diversified: some prospective buyers click directly through to comprehensive websites to evaluate case studies, team credentials, and pricing structures, while others rely on AI-synthesized summaries for initial vendor shortlisting. Optimizing for both traditional SEO and AEO ensures your business maintains organic visibility across both standard Google search results and modern AI answer engines.",
  },
  {
    q: "Can an AI SEO agency guarantee #1 rankings or inclusion in Google AI Overviews?",
    a: "No reputable agency can guarantee a #1 ranking, inclusion in Google AI Overviews, or citations inside third-party LLMs like ChatGPT. Search algorithms and generative retrieval models update continuously based on user intent, competitive content, and proprietary parameters. What Asif Digital delivers is architectural rigor: clean technical code, semantic schema clarity, verified topical authority, and direct-answer structuring that maximize your eligibility for high visibility.",
  },
  {
    q: "How does Google decide which websites to cite in AI Overviews?",
    a: "Google's AI Overviews synthesize answers by retrieving information from pages that demonstrate strong E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness). The system favors content that answers the user's specific query directly, is backed by clean schema markup, possesses factual consistency across reputable web sources, and loads quickly on mobile devices.",
  },
  {
    q: "How do conversational engines like ChatGPT and Perplexity find information about UAE businesses?",
    a: "Conversational search engines utilize live web retrieval systems (such as Bing Search, Google, or proprietary crawlers) to find real-time information. They evaluate brand mentions, third-party directory profiles, commercial registries, customer reviews, and authoritative content on your website. When your brand entity is clearly defined with consistent data across the web, AI engines are more likely to reference your company in response to commercial prompts.",
  },
  {
    q: "How does AI search visibility relate to our paid advertising campaigns (PPC)?",
    a: "AI SEO builds long-term, organic search authority and trust that compounds over time without per-click media costs. Paid advertising (such as Google Ads and Meta Ads) provides immediate traffic and rapid message testing. The two strategies complement each other: high-intent paid campaigns capture immediate demand while organic AI search optimization establishes sustainable market authority.",
  },
  {
    q: "Do you use automated AI tools to generate website content?",
    a: "No. Fully automated, unedited AI content frequently results in generic, unverified text that fails Google's Helpful Content standards and lacks real UAE commercial context. We utilize AI tools for research, keyword clustering, and schema modeling, but all client content is authored with verified technical accuracy, local commercial context, and human editorial oversight.",
  },
  {
    q: "How long does it typically take to see measurable search improvements?",
    a: "Technical crawl and schema improvements are typically indexed by search engines within 1 to 3 weeks of deployment. Measurable improvements in query impressions, average ranking positions, and organic search inquiries generally develop over 6 to 12 weeks, depending on your domain's existing authority, competitive density in your sector, and search crawl frequency in the UAE.",
  },
];

export default function AiSeoAgencyDubai() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive AEO Readiness Calculator State
  const [hasSchema, setHasSchema] = useState(true);
  const [hasDirectAnswers, setHasDirectAnswers] = useState(false);
  const [hasEntityGraph, setHasEntityGraph] = useState(false);
  const [hasSpeedBelowOneSec, setHasSpeedBelowOneSec] = useState(true);
  const [hasClusterSilos, setHasClusterSilos] = useState(false);

  const calculateScore = () => {
    let score = 20;
    if (hasSchema) score += 20;
    if (hasDirectAnswers) score += 20;
    if (hasEntityGraph) score += 15;
    if (hasSpeedBelowOneSec) score += 15;
    if (hasClusterSilos) score += 10;
    return score;
  };

  const aeoScore = calculateScore();

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-emerald-400/30">
      {/* ── 1. Breadcrumbs ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 text-xs font-mono text-white/50 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-400 transition-colors">HOME</Link>
        <span>&gt;</span>
        <Link href="/services" className="hover:text-emerald-400 transition-colors">SERVICES</Link>
        <span>&gt;</span>
        <span className="text-white/90">AI SEO AGENCY DUBAI</span>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.1),transparent_40%)] pointer-events-none" />

        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
              SEO · AEO · Generative Search Visibility Dubai
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.08] mb-6">
            AI SEO, AEO &amp; Search Visibility <br />
            <span className="italic text-white/50 font-light">Agency in Dubai</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 font-light leading-relaxed mb-8 max-w-3xl">
            Search behavior in the UAE has evolved. Buyers still use Google search, but they also evaluate direct AI Overviews and ask conversational questions in ChatGPT and Perplexity. We structure your website&apos;s content architecture, technical schema, and entity profile so search engines and AI assistants can clearly understand, index, and reference your business.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/free-growth-audit"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/10"
            >
              Request Free AI Search Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20audit%20our%20AI%20SEO%20and%20AEO%20search%20visibility."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Discuss Your Search Goals on WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-white/50 tracking-wider font-mono mt-10">
            <span>✓ SEO &amp; AEO UNIFIED STRATEGY</span>
            <span>✓ GOOGLE AI OVERVIEW READINESS</span>
            <span>✓ CHATGPT &amp; PERPLEXITY CITATION READINESS</span>
            <span>✓ TRANSPARENT, EVIDENCE-BASED ENGINEERING</span>
          </div>
        </div>
      </section>

      {/* ── 3. Direct System Definition: Traditional SEO vs. AI SEO & AEO ── */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.015] border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] uppercase tracking-widest text-emerald-400 font-mono mb-3 font-semibold">
            Service Definition &amp; Search Dynamics
          </div>
          <h2 className="text-2xl md:text-4xl font-serif mb-6 text-white">
            What is AI SEO &amp; Answer Engine Optimization (AEO)?
          </h2>
          <p className="text-white/80 font-light text-base md:text-lg leading-relaxed mb-4">
            Traditional SEO is designed to earn rankings among the standard organic search listings on Google through keyword matching, technical health, and external links. AI SEO and Answer Engine Optimization (AEO) represent the natural evolution of search: structuring content so search algorithms and AI models can synthesize direct, verified answers to complex commercial queries.
          </p>
          <p className="text-white/80 font-light text-base md:text-lg leading-relaxed mb-6">
            Instead of relying solely on keyword repetition, we engineer concise direct-answer blocks, structured comparison tables, and nested JSON-LD schema networks. This makes it straightforward for search engines (like Google) and conversational AI engines (like ChatGPT and Perplexity) to recognize your business entity and cite your expertise accurately.
          </p>
          <div className="p-6 rounded-2xl border border-white/10 bg-black/50 text-sm text-white/70 leading-relaxed font-light">
            <span className="text-emerald-400 font-mono text-xs uppercase block mb-1 font-semibold">
              The Dubai Market Reality
            </span>
            In competitive UAE sectors—such as commercial real estate, corporate services, B2B technology, healthcare, and logistics—business buyers frequently use conversational AI tools to research vendors and compare solutions. Organizations that optimize solely for traditional blue links risk missing prospects who review synthesized AI answers before ever clicking an organic search listing.
          </div>
        </div>
      </section>

      {/* ── 4. Traditional SEO vs. AI SEO Comparison Table ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2 font-semibold">
            Operational Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Traditional SEO Retainers vs. Unified AI SEO &amp; AEO
          </h2>
          <p className="text-white/60 font-light text-sm md:text-base max-w-2xl mx-auto mt-3">
            Why conventional agency keyword tactics fail to capture modern AI-driven search demand in the UAE:
          </p>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-3xl bg-white/[0.01]">
          <table className="w-full text-left border-collapse text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-5 px-6 font-semibold text-white/60 font-mono text-xs uppercase">Evaluation Dimension</th>
                <th className="py-5 px-6 font-semibold text-red-400/80 font-mono text-xs uppercase">Traditional Dubai SEO Retainers</th>
                <th className="py-5 px-6 font-semibold text-emerald-400 font-mono text-xs uppercase">Asif Digital AI SEO &amp; AEO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light text-white/80">
              <tr>
                <td className="py-5 px-6 font-medium text-white">Target Search Mechanism</td>
                <td className="py-5 px-6 text-white/50">Standard 10 blue links on Google SERP only</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Google Search, Google AI Overviews, Perplexity, and ChatGPT Search</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Optimization Strategy</td>
                <td className="py-5 px-6 text-white/50">Keyword repetition, meta descriptions, and generic directory links</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Direct answer summaries, nested schema markup, and verified entity relationships</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Content Structure</td>
                <td className="py-5 px-6 text-white/50">Generic monthly blog posts disconnected from commercial services</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Commercial intent hubs, comparison tables, verified FAQs, and structured service guides</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Technical Foundation</td>
                <td className="py-5 px-6 text-white/50">Bloated CMS plugins, slow mobile loading, missing schema markup</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Fast Next.js architecture, clean mobile Core Web Vitals, and comprehensive JSON-LD schemas</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Performance Measurement</td>
                <td className="py-5 px-6 text-white/50">Vanity keyword rankings that produce low conversion value</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Google Search Console impression velocity, CTR trends, and qualified inbound inquiries</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. The 5 Core AI SEO Pillars ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2 font-semibold">
            Methodology &amp; Framework
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            The 5 Pillars of Modern AI Search Visibility
          </h2>
          <p className="text-white/60 font-light text-base leading-relaxed">
            Our comprehensive framework engineered to capture visibility across both traditional search algorithms and generative AI answer engines:
          </p>
        </div>

        <div className="space-y-8">
          {pillars.map((p) => (
            <div
              key={p.number}
              className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.015] hover:border-emerald-400/30 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-serif text-emerald-400 font-bold">{p.number}</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">{p.subtitle}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white">{p.title}</h3>
                </div>
              </div>

              <p className="text-white/70 font-light text-base leading-relaxed mb-6 max-w-4xl">
                {p.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-white/5">
                {p.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-white/80 font-light">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Deliverables & Engagement Stages ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2 font-semibold">
            Scope &amp; Deliverables
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            What is Included in an AI SEO Engagement?
          </h2>
          <p className="text-white/60 font-light text-base leading-relaxed">
            We provide a structured, transparent process with clear technical deliverables rather than vague monthly retainer hours:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-semibold text-white">Technical &amp; Schema Audit</h3>
            <p className="text-xs text-white/65 font-light leading-relaxed">
              We audit site crawlability, mobile Core Web Vitals, existing schema markup errors, and content extraction obstacles that prevent search engines from parsing your data.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-semibold text-white">Direct-Answer Content</h3>
            <p className="text-xs text-white/65 font-light leading-relaxed">
              We restructure commercial and service pages with concise direct answers, comparison matrices, and FAQ blocks tailored to high-intent buyer searches in the UAE.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-semibold text-white">Entity Graph Engineering</h3>
            <p className="text-xs text-white/65 font-light leading-relaxed">
              We implement nested JSON-LD schema networks (Organization, ProfessionalService, FAQs) and build verified brand co-citations across reputable UAE business registries.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              04
            </div>
            <h3 className="text-base font-semibold text-white">Monitoring &amp; Reporting</h3>
            <p className="text-xs text-white/65 font-light leading-relaxed">
              We track Google Search Console impression velocity, click-through rates, ranking trends, and qualified inbound inquiries with transparent monthly review sessions.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Interactive AEO Readiness Assessment ── */}
      <section className="py-24 px-6 md:px-12 bg-[#070707] border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2 font-semibold">
              Interactive Diagnostic
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-3">
              AEO &amp; AI Search Readiness Assessment
            </h2>
            <p className="text-white/60 font-light text-sm max-w-xl mx-auto">
              Self-evaluate your website&apos;s structural readiness to capture Google AI Overviews and answer engine visibility in the UAE:
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono text-white/40 tracking-wider block mb-2">
                Select Your Current Technical Attributes
              </span>

              {[
                { label: "Valid JSON-LD Schema (Organization, Service, FAQ)", checked: hasSchema, setter: setHasSchema },
                { label: "Direct Answer Summaries (< 60 words) for Core Topics", checked: hasDirectAnswers, setter: setHasDirectAnswers },
                { label: "Brand Entity Mentions & Verified Regional Citations", checked: hasEntityGraph, setter: setHasEntityGraph },
                { label: "Performance-Focused Mobile Architecture (< 1.5s LCP)", checked: hasSpeedBelowOneSec, setter: setHasSpeedBelowOneSec },
                { label: "Semantic Topic Clusters with Orphan-Page Auditing", checked: hasClusterSilos, setter: setHasClusterSilos },
              ].map((item, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors text-sm font-light text-white/85"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => item.setter(e.target.checked)}
                    className="w-4 h-4 rounded accent-emerald-400 cursor-pointer"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 text-center space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold block">
                Estimated Readiness Score
              </span>
              <div className="text-6xl md:text-7xl font-serif text-white">
                {aeoScore}<span className="text-2xl text-white/40">/100</span>
              </div>
              <p className="text-xs text-white/60 font-light max-w-xs mx-auto leading-relaxed">
                {aeoScore >= 80
                  ? "Strong structural foundation for AI search discovery and machine-readable direct answers."
                  : aeoScore >= 50
                  ? "Moderate foundation. Direct-answer summaries, entity clarity, or structured schema markup could be strengthened."
                  : "Needs structural modernization. Essential content and entity signals may be difficult for search crawlers to interpret consistently."}
              </p>
              <p className="text-[11px] text-white/40 italic">
                Illustrative diagnostic guide. Actual rankings and answer engine inclusion depend on search algorithm updates and competitive market signals.
              </p>
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/free-growth-audit"
                  className="w-full bg-emerald-400 text-black py-3.5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Request Technical Architecture Audit <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Operational Boundaries & Ethical Policy ── */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto border-b border-white/5">
        <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl md:text-2xl font-serif text-white">
              Ethical Governance: No Ranking Guarantees Policy
            </h3>
          </div>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-4">
            In compliance with Google Search Essentials and professional engineering standards, Asif Digital does not promise or guarantee specific #1 Google rankings, guaranteed inclusion in Google AI Overviews, or mandatory citations inside third-party LLMs like ChatGPT or Perplexity.
          </p>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Search engines update their ranking criteria continuously, and AI models dynamically adjust retrieval and summarization parameters. What we deliver is verified technical and architectural quality: high-speed code, structured schemas, authentic topical depth, and transparent reporting that give your business the best possible opportunity to earn lasting visibility.
          </p>
        </div>
      </section>

      {/* ── 9. Intent Bridges & Related Services ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bridge to Paid Search & Marketing */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
                Paid Acquisition &amp; Immediate Demand
              </span>
              <h3 className="text-2xl font-serif text-white mb-3">Need Immediate Inbound Leads?</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                While AI SEO establishes compounding long-term search authority and answer engine readiness, our PPC team manages high-intent Google Search and Meta advertising campaigns for immediate demand capture.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/services/ppc-google-ads-agency-dubai"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Explore PPC &amp; Google Ads Dubai <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-marketing-dubai"
                className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
              >
                AI Marketing Agency Dubai →
              </Link>
            </div>
          </div>

          {/* Bridge to Traditional Local SEO & Tools */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
                Audit Tools &amp; Local Search
              </span>
              <h3 className="text-2xl font-serif text-white mb-3">Audit Your Current Digital Architecture</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                Evaluate your website speed, mobile responsiveness, and metadata using our AI Website Grader, or review our dedicated local search engine optimization services for Dubai and Sharjah.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/tools/ai-website-grader"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-emerald-400 transition-colors"
              >
                Launch AI Website Grader <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/seo-agency-dubai-sharjah-uae"
                className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
              >
                SEO Agency Dubai &amp; Sharjah →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Frequently Asked Questions ── */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-3">Frequently Asked Questions</h2>
          <p className="text-white/50 text-sm font-light">
            Answers to key technical and commercial questions about AI SEO, AEO, and search authority in Dubai.
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

      {/* ── 11. Final CTA ── */}
      <section className="py-28 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#0a120e]">
        <div className="max-w-4xl mx-auto relative z-10">
          <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">
            Future-Proof Your Search Authority
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Let us audit your current digital architecture, uncover schema deficiencies, and engineer the direct-answer signals needed for lasting organic visibility in Google and AI answer engines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/free-growth-audit"
              className="bg-emerald-400 text-black px-10 py-5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20"
            >
              Request Free AI Search Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-9 py-5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:bg-white/5 transition-colors text-white/80"
            >
              Discuss Scope on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── 12. Topic Cluster Footer Navigation ── */}
      <section className="py-12 border-t border-white/5 bg-black text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4 font-mono">
            Search, AI &amp; Automation Hub
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/ai-seo-agency-dubai" className="hover:text-white transition-colors text-emerald-400 font-medium">AI SEO Agency Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/services/seo-agency-dubai-sharjah-uae" className="hover:text-white transition-colors">SEO Agency Dubai &amp; Sharjah</Link>
            <span className="text-white/20">•</span>
            <Link href="/ai-marketing-dubai" className="hover:text-white transition-colors">AI Marketing Agency Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/services/ppc-google-ads-agency-dubai" className="hover:text-white transition-colors">PPC &amp; Google Ads Dubai</Link>
            <span className="text-white/20">•</span>
            <Link href="/workflow-automation-uae" className="hover:text-white transition-colors">Workflow Automation UAE</Link>
            <span className="text-white/20">•</span>
            <Link href="/arabic-ai-hub" className="hover:text-white transition-colors">Arabic AI Hub</Link>
            <span className="text-white/20">•</span>
            <Link href="/tools/ai-website-grader" className="hover:text-white transition-colors">AI Website Grader</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
