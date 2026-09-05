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
      "Formatting commercial and technical pages so search engines extract direct, authoritative answers for Google AI Overviews, featured snippets, and voice search queries across the UAE.",
    capabilities: [
      "Direct concise summary answers placed in high-visibility HTML zones",
      "Semantic comparison matrices and structured decision tables",
      "Search-intent aligned FAQ architecture with verified schema markup",
      "High-extractability listicles, process roadmaps, and boundary definitions",
    ],
  },
  {
    number: "02",
    title: "Generative Engine Optimization (GEO)",
    subtitle: "LLM Citation Readiness for ChatGPT, Perplexity & Gemini",
    description:
      "Structuring your organization's entity footprint, topical authority, and brand citations across the web so AI models recognize, cite, and recommend your services in conversational answers.",
    capabilities: [
      "Entity graph mapping establishing brand-to-service relationships",
      "Co-citation engineering across authoritative regional directories and publications",
      "Topical depth modeling covering complete industry domain semantics",
      "Factual consistency checks across external web mentions and digital PR",
    ],
  },
  {
    number: "03",
    title: "Technical SEO & Semantic Knowledge Graph",
    subtitle: "Machine-Readable Architecture & Performance Engineering",
    description:
      "Clean crawl topologies, performance-focused Next.js architecture, and multi-layered JSON-LD schema networks that give search crawlers clear entity definitions regarding your service taxonomy.",
    capabilities: [
      "Full JSON-LD structured data (ProfessionalService, Breadcrumbs, FAQs, Services)",
      "Strict canonical discipline supporting a clean crawl architecture",
      "Fast Largest Contentful Paint (LCP) and accessible mobile rendering",
      "Sitemap priority engineering and clean URL routing architecture",
    ],
  },
  {
    number: "04",
    title: "Search Intent Architecture & Semantic Silos",
    subtitle: "Clean Intent Demarcation & Internal Link Topology",
    description:
      "Organizing every page into precise intent tiers—informational guides, commercial service hubs, and product features—connected through contextual bridge links with orphan-page prevention and internal-link auditing.",
    capabilities: [
      "Strict intent mapping preventing informational-commercial keyword dilution",
      "Contextual topic silos connecting high-ranking guides to conversion hubs",
      "Keyword cannibalization elimination across singular/plural and geo variants",
      "Anchor text diversification reflecting natural commercial search patterns",
    ],
  },
  {
    number: "05",
    title: "Content Refresh & Decay Prevention Engine",
    subtitle: "Algorithmic Monitoring & Continuous Authority Updates",
    description:
      "Systematic tracking of query impressions, CTR, and SERP shifts to trigger scheduled content refreshes before competitive decay impacts commercial positions.",
    capabilities: [
      "GSC impression and average position velocity tracking by cluster",
      "Automated triggers for updating technical specs, pricing, and FAQ blocks",
      "Competitor depth delta analysis identifying newly emerging search intents",
      "Continuous algorithmic pruning and redirection of obsolete URL paths",
    ],
  },
];

const faqs = [
  {
    q: "What is the difference between AI SEO, AEO, and traditional SEO in Dubai?",
    a: "Traditional SEO focuses primarily on keyword density, backlink quantity, and ranking among the standard 10 blue links on Google. AI SEO and Answer Engine Optimization (AEO) re-engineer content for machine comprehension—structuring data into concise direct answers, comparison matrices, and entity graphs so that search engines feature your brand in Google AI Overviews and conversational AI engines (ChatGPT Search, Perplexity, Gemini).",
  },
  {
    q: "Can an AI SEO agency guarantee #1 rankings or guaranteed ChatGPT citations?",
    a: "No honest agency can guarantee rank #1 or guaranteed LLM citations. Search algorithms and generative AI models update continuously, incorporating dynamic user signals, competition, and index shifts. Asif Digital guarantees architectural rigor: establishing the highest standard of technical speed, schema clarity, intent demarcation, and topical depth that maximize your site's eligibility for top visibility.",
  },
  {
    q: "How does AI search visibility relate to our paid advertising (PPC)?",
    a: "AI SEO builds compounding, zero-cost organic discovery, establishing lasting topical authority and brand trust. Paid advertising (Google Ads & Meta Ads) provides immediate traffic and rapid message testing. For organizations seeking rapid full-funnel growth, we coordinate organic search signals with predictive PPC campaigns.",
  },
  {
    q: "How long does it take for AEO and GEO optimizations to show results?",
    a: "Technical crawl and schema improvements are recognized by search engines within 1 to 3 weeks of re-indexing. Direct answer inclusion in Google AI Overviews and notable ranking improvements typically materialize over 4 to 12 weeks, depending on existing domain authority, crawl frequency, and regional competition in the UAE.",
  },
  {
    q: "Do you use automated AI tools to write all content?",
    a: "No. Pure unedited AI-generated text often produces generic, non-authoritative content that fails Google's Helpful Content standards and lacks genuine local UAE business context. We use AI for computational research, query clustering, and semantic schema modeling, but all customer-facing content is architected with verified technical precision, local UAE operational realities, and human editorial review.",
  },
  {
    q: "How do you measure and report AI search performance?",
    a: "We track both traditional search metrics (impressions, clicks, average position, organic conversions) and AI-era visibility indicators (AI Overview appearances, brand entity co-citations, conversational answer mentions, and multi-touch lead attribution in your CRM).",
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
              AEO • GEO • AI Search Visibility Dubai
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.05] mb-6">
            AI SEO, AEO &amp; AI Search Visibility <br />
            <span className="italic text-white/50 font-light">Agency in Dubai</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 font-light leading-relaxed mb-8 max-w-3xl">
            We engineer advanced Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and semantic entity architecture for UAE enterprises—ensuring your brand dominates Google search, AI Overviews, and conversational engines like ChatGPT and Perplexity.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/10"
            >
              Request AI Search Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20audit%20our%20AI%20SEO%20and%20AEO%20search%20visibility."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Strategic Desk
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-white/50 tracking-wider font-mono mt-10">
            <span>✓ ANSWER ENGINE OPTIMIZATION</span>
            <span>✓ LLM CITATION READINESS</span>
            <span>✓ ENTITY GRAPH MAPPING</span>
            <span>✓ ZERO RANKING GIMMICKS</span>
          </div>
        </div>
      </section>

      {/* ── 3. Direct System Definition & AEO Answer Block ── */}
      <section className="py-16 px-6 md:px-12 bg-white/[0.015] border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] uppercase tracking-widest text-emerald-400 font-mono mb-3 font-semibold">
            System Definition &amp; AEO Target Block
          </div>
          <h2 className="text-2xl md:text-4xl font-serif mb-6 text-white">
            What is AI SEO &amp; Answer Engine Optimization?
          </h2>
          <p className="text-white/80 font-light text-base md:text-lg leading-relaxed mb-6">
            <strong>AI SEO</strong> represents the evolution of search engine optimization from keyword-focused page rankings to machine-comprehensible entity positioning. It combines <strong>Answer Engine Optimization (AEO)</strong>—formatting content as structured, direct answers eligible for Google AI Overviews—with <strong>Generative Engine Optimization (GEO)</strong>, which establishes brand authority, factual citations, and semantic co-occurrences so conversational LLMs (ChatGPT, Gemini, Perplexity) actively reference your enterprise.
          </p>
          <div className="p-6 rounded-2xl border border-white/10 bg-black/50 text-sm text-white/70 leading-relaxed font-light">
            <span className="text-emerald-400 font-mono text-xs uppercase block mb-1 font-semibold">
              The Dubai Market Reality
            </span>
            In high-competition UAE sectors like real estate, corporate services, luxury hospitality, and technology, an increasing share of commercial search journeys now surface AI-generated summaries alongside traditional organic listings. Organizations lacking structured entity data, direct answer formats, and clear topical silos face reduced visibility in conversational answers.
          </div>
        </div>
      </section>

      {/* ── 4. Traditional SEO vs. AI SEO Comparison ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2 font-semibold">
            Architectural Evolution
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Traditional SEO Retainers vs. AI Search Architecture
          </h2>
          <p className="text-white/60 font-light text-sm md:text-base max-w-2xl mx-auto mt-3">
            Why conventional agency keyword tactics fail to capture modern AI search demand in the UAE.
          </p>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-3xl bg-white/[0.01]">
          <table className="w-full text-left border-collapse text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-5 px-6 font-semibold text-white/60 font-mono text-xs uppercase">Evaluation Dimension</th>
                <th className="py-5 px-6 font-semibold text-red-400/80 font-mono text-xs uppercase">Traditional Dubai SEO Agency</th>
                <th className="py-5 px-6 font-semibold text-emerald-400 font-mono text-xs uppercase">Asif Digital AI SEO System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light text-white/80">
              <tr>
                <td className="py-5 px-6 font-medium text-white">Target Search Mechanism</td>
                <td className="py-5 px-6 text-white/50">Standard 10 blue links on Google SERP</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Google AI Overviews, Perplexity, ChatGPT Search, Gemini</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Optimization Philosophy</td>
                <td className="py-5 px-6 text-white/50">Keyword density, meta tags, and high-volume link blasts</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Entity graph nodes, direct answer blocks, semantic schema</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Content Strategy</td>
                <td className="py-5 px-6 text-white/50">Unfocused monthly 800-word blogs disconnected from sales</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Commercial intent hubs, comparison tables &amp; structured FAQs</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Technical Architecture</td>
                <td className="py-5 px-6 text-white/50">Slow CMS templates, basic sitemaps, missing schemas</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">Sub-second Next.js headless performance, nested JSON-LD graphs</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-medium text-white">Reporting &amp; Measurement</td>
                <td className="py-5 px-6 text-white/50">Vanity keyword rankings that don't generate qualified revenue</td>
                <td className="py-5 px-6 text-emerald-300 font-normal">AI citation share, GSC impression velocity, and CRM lead match</td>
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
            Our comprehensive framework engineered specifically to secure dominance across both traditional search algorithms and generative AI answer engines.
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

      {/* ── 6. Interactive AEO Readiness Assessment ── */}
      <section className="py-24 px-6 md:px-12 bg-[#070707] border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono block mb-2 font-semibold">
              Interactive Diagnostic
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-3">
              AEO &amp; AI Search Readiness Calculator
            </h2>
            <p className="text-white/60 font-light text-sm max-w-xl mx-auto">
              Evaluate your website's structural readiness to capture AI Overviews and conversational citations in the UAE.
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
                { label: "Brand Entity Mentions & Verified Co-Citations", checked: hasEntityGraph, setter: setHasEntityGraph },
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
                Estimated AI Search Readiness Score
              </span>
              <div className="text-6xl md:text-7xl font-serif text-white">
                {aeoScore}<span className="text-2xl text-white/40">/100</span>
              </div>
              <p className="text-xs text-white/60 font-light max-w-xs mx-auto leading-relaxed">
                {aeoScore >= 80
                  ? "Strong foundation. Eligible for advanced Answer Engine extraction and conversational citations."
                  : aeoScore >= 50
                  ? "Moderate baseline. Missing key direct-answer blocks or entity signals required for AI Overviews."
                  : "Critical deficit. At risk of becoming invisible as conversational engines displace traditional blue links."}
              </p>
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="w-full bg-emerald-400 text-black py-3.5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Get Comprehensive Architecture Audit <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Operational Boundaries & Zero Guarantees Policy ── */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto border-b border-white/5">
        <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl md:text-2xl font-serif text-white">
              Ethical Governance: Our Zero Ranking Guarantees Policy
            </h3>
          </div>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-4">
            In compliance with Google Search Essentials and international marketing ethics, Asif Digital does not promise or guarantee specific #1 Google rankings or guaranteed citations inside third-party LLMs like ChatGPT or Perplexity.
          </p>
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            Search engines update their ranking parameters thousands of times per year, and AI models continuously revise retrieval and summarization thresholds. What we guarantee is rigorous engineering: establishing superior code speed, semantic clarity, structured schemas, authentic topical authority, and continuous measurement that position your business ahead of competitors.
          </p>
        </div>
      </section>

      {/* ── 8. Dedicated Intent Bridge Cards ── */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bridge to AI Marketing */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
                Paid Acquisition &amp; Revenue Systems
              </span>
              <h3 className="text-2xl font-serif text-white mb-3">Looking for Paid Ads &amp; Lead Funnels?</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                While AI SEO optimizes long-term organic search authority and AI Overviews, our specialized AI Marketing division manages predictive Google &amp; Meta ad spend, CAPI integrations, and instant WhatsApp conversion pipelines.
              </p>
            </div>
            <Link
              href="/ai-marketing-dubai"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Explore AI Marketing Agency Dubai <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bridge to Technical Tools & Research Guide */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
                Audit Tools &amp; Research
              </span>
              <h3 className="text-2xl font-serif text-white mb-3">Audit Your Current Search Architecture</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                Run an instant technical assessment of your website code speed, mobile responsiveness, and meta structures using our proprietary AI Website Grader, or read our in-depth UAE AI Search Visibility Guide.
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
                href="/blog/ai-search-visibility-uae-measurement-guide"
                className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors"
              >
                Read UAE AI Visibility Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Frequently Asked Questions ── */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-3">Frequently Asked Questions</h2>
          <p className="text-white/50 text-sm font-light">
            Answers to key technical questions about AI SEO, AEO, and search authority in Dubai.
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
            Future-Proof Your Search Authority
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Let us audit your current digital architecture, uncover schema deficiencies, and engineer the direct-answer signals needed to win visibility in the AI era.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-emerald-400 text-black px-10 py-5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20"
            >
              Book Architecture Audit <ArrowRight className="w-4 h-4" />
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
            Search, AI &amp; Automation Hub
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="/ai-seo-agency-dubai" className="hover:text-white transition-colors text-emerald-400 font-medium">AI SEO Agency Dubai</Link>
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
