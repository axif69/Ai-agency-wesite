"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import MagneticButton from "../components/animations/MagneticButton";
import {
  Network, Database, Brain, Globe, Shield, Activity, ChevronRight,
  Play, Server, ArrowRight, TrendingUp, MessageSquare, Briefcase,
  Zap, Workflow, Languages, Phone, Gauge, BrainCircuit, BarChart3,
  Smartphone, CheckCircle2, Sliders, Layers, Sparkles, Filter
} from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudyData";
import { BLOG_POSTS } from "../data/blogData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── DATA & DEFINITIONS ─── */

export interface ServiceItem {
  id: string;
  category: "websites" | "ai-automation" | "real-estate" | "growth" | "software";
  categoryLabel: string;
  title: string;
  tag: string;
  desc: string;
  icon: React.ReactNode;
  link: string;
}

const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "websites", label: "Websites & Conversion" },
  { id: "ai-automation", label: "AI & WhatsApp Automation" },
  { id: "real-estate", label: "Real Estate & CRM" },
  { id: "growth", label: "SEO & Paid Growth" },
  { id: "software", label: "Custom Software" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const ALL_SERVICES: ServiceItem[] = [
  // 1. Websites & Conversion
  {
    id: "web-design",
    category: "websites",
    categoryLabel: "Websites & Conversion",
    title: "Web Design & Development Dubai",
    tag: "High Conversion",
    desc: "Lightning-fast Next.js websites built to rank on Google and convert first-time visitors into calls, WhatsApp enquiries, and booked consultations.",
    icon: <Briefcase className="w-6 h-6" role="img" aria-label="Web Design Icon" />,
    link: "/services/web-design-dubai",
  },
  {
    id: "ecommerce",
    category: "websites",
    categoryLabel: "Websites & Conversion",
    title: "Ecommerce Website Development",
    tag: "Online Stores",
    desc: "High-performance storefronts engineered for fast checkout, seamless payment gateways (Stripe/Tabby/Tamara), and high mobile conversion rates.",
    icon: <Globe className="w-6 h-6" role="img" aria-label="Ecommerce Icon" />,
    link: "/services/ecommerce-website-development-dubai",
  },
  {
    id: "branding",
    category: "websites",
    categoryLabel: "Websites & Conversion",
    title: "Corporate Branding & Identity",
    tag: "Brand Architecture",
    desc: "Strategic brand design, visual identities, typography guidelines, and corporate guidelines tailored for UAE and GCC enterprises.",
    icon: <Shield className="w-6 h-6" role="img" aria-label="Branding Shield Icon" />,
    link: "/services/branding-agency-dubai-sharjah",
  },

  // 2. AI & WhatsApp Automation
  {
    id: "ai-automation",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "AI Automation Agency Dubai",
    tag: "Workflows",
    desc: "End-to-end automation for UAE teams: web lead capture, CRM pipeline routing, automated follow-up reminders, and reporting pipelines.",
    icon: <Workflow className="w-6 h-6" role="img" aria-label="Workflow Automation Icon" />,
    link: "/ai-automation-agency-dubai",
  },
  {
    id: "whatsapp-chatbots",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "WhatsApp AI Chatbot Dubai",
    tag: "24/7 Assistants",
    desc: "Intelligent bilingual assistants that answer customer questions in seconds, qualify intent, collect contact info, and ping your sales team.",
    icon: <MessageSquare className="w-6 h-6" role="img" aria-label="WhatsApp AI Icon" />,
    link: "/ai-chatbots-dubai",
  },
  {
    id: "arabic-ai",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    title: "Arabic Intelligence Hub",
    tag: "Khaleeji NLP",
    desc: "Native Arabic and English AI models for UAE websites, customer support, WhatsApp automation, and multi-lingual customer journeys.",
    icon: <Languages className="w-6 h-6" role="img" aria-label="Arabic Language Icon" />,
    link: "/arabic-ai-hub",
  },

  // 3. Real Estate & CRM Workflows
  {
    id: "re-crm",
    category: "real-estate",
    categoryLabel: "Real Estate & CRM",
    title: "Real Estate CRM Dubai",
    tag: "Lead Routing",
    desc: "Custom CRM architectures, speed-to-lead routing, portal integration, and automated broker pipeline assignment for Dubai brokerages.",
    icon: <Database className="w-6 h-6" role="img" aria-label="Real Estate CRM Icon" />,
    link: "/real-estate-crm-dubai",
  },
  {
    id: "re-whatsapp",
    category: "real-estate",
    categoryLabel: "Real Estate & CRM",
    title: "Real Estate WhatsApp Automation",
    tag: "Off-Plan & Secondary",
    desc: "Sub-10s buyer qualification, automated project brochure delivery, voice note transcription, and instant broker handover notifications.",
    icon: <MessageSquare className="w-6 h-6" role="img" aria-label="Real Estate WhatsApp Icon" />,
    link: "/real-estate/whatsapp-ai-automation",
  },
  {
    id: "re-dashboard",
    category: "real-estate",
    categoryLabel: "Real Estate & CRM",
    title: "Unified Real Estate Lead Dashboard",
    tag: "Lead Attribution",
    desc: "Consolidated source attribution across Meta, Google Ads, Property Finder, and Bayut with lead scoring and broker response intelligence.",
    icon: <BarChart3 className="w-6 h-6" role="img" aria-label="Lead Dashboard Icon" />,
    link: "/real-estate/ai-lead-dashboard",
  },
  {
    id: "re-property-mgmt",
    category: "real-estate",
    categoryLabel: "Real Estate & CRM",
    title: "AI Property Management UAE",
    tag: "Operations",
    desc: "Tenant support intake, maintenance request categorization, lease renewal notices, and operational reminders for property managers.",
    icon: <Phone className="w-6 h-6" role="img" aria-label="Property Management Icon" />,
    link: "/ai-property-management-uae",
  },
  {
    id: "re-digital-solutions",
    category: "real-estate",
    categoryLabel: "Real Estate & CRM",
    title: "Real Estate Digital Solutions UAE",
    tag: "Full Stack",
    desc: "The unified web foundation connecting property portals, broker workflows, WhatsApp assistants, and CRM databases into one system.",
    icon: <Server className="w-6 h-6" role="img" aria-label="Digital Solutions Icon" />,
    link: "/real-estate-digital-solutions-uae",
  },
  {
    id: "re-hub",
    category: "real-estate",
    categoryLabel: "Real Estate & CRM",
    title: "Real Estate AI Solutions Hub",
    tag: "Pillar Overview",
    desc: "The complete UAE property intelligence overview connecting lead qualification, CRM synchronization, and technical SEO architecture.",
    icon: <TrendingUp className="w-6 h-6" role="img" aria-label="Real Estate Hub Icon" />,
    link: "/real-estate",
  },

  // 4. SEO & Paid Growth
  {
    id: "ai-seo",
    category: "growth",
    categoryLabel: "SEO & Growth",
    title: "AI SEO Agency Dubai",
    tag: "Search Architecture",
    desc: "Technical SEO, topic clustering, answer engine optimization (AEO), and high-intent landing pages engineered to rank on Google in the UAE.",
    icon: <TrendingUp className="w-6 h-6" role="img" aria-label="SEO Agency Icon" />,
    link: "/ai-seo-agency-dubai",
  },
  {
    id: "ai-marketing",
    category: "growth",
    categoryLabel: "SEO & Growth",
    title: "AI Marketing & Growth Systems",
    tag: "Customer Acquisition",
    desc: "Data-driven marketing systems, commercial copy, and AI-assisted campaigns designed to generate measurable, qualified inbound enquiries.",
    icon: <Zap className="w-6 h-6" role="img" aria-label="Marketing Icon" />,
    link: "/ai-marketing-dubai",
  },
  {
    id: "ppc-ads",
    category: "growth",
    categoryLabel: "SEO & Growth",
    title: "Search & Paid Media (PPC / Google Ads)",
    tag: "Paid Advertising",
    desc: "Precision Google Ads and Meta campaign architecture with conversion tracking, zero-PII analytics, and transparent return-on-ad-spend reporting.",
    icon: <BarChart3 className="w-6 h-6" role="img" aria-label="PPC Ads Icon" />,
    link: "/services/ppc-google-ads-agency-dubai",
  },

  // 5. Custom Software
  {
    id: "ai-app-dev",
    category: "software",
    categoryLabel: "Custom Software",
    title: "AI App Development Dubai",
    tag: "SaaS & Mobile",
    desc: "Custom web applications, AI micro-tools, customer portals, and internal workflow tools built with Next.js, Python, and scalable APIs.",
    icon: <Smartphone className="w-6 h-6" role="img" aria-label="Mobile App Icon" />,
    link: "/ai-app-development-dubai",
  },
  {
    id: "custom-web-app",
    category: "software",
    categoryLabel: "Custom Software",
    title: "Custom Web App & Software Development",
    tag: "Enterprise Portals",
    desc: "Bespoke database architectures, role-based client dashboards, and secure digital infrastructure tailored to your exact business operations.",
    icon: <Server className="w-6 h-6" role="img" aria-label="Server Infrastructure Icon" />,
    link: "/services/web-development-dubai-uae",
  },
  {
    id: "sales-agent",
    category: "software",
    categoryLabel: "Custom Software",
    title: "Sovereign B2B Sales Agent",
    tag: "Governed Outbound",
    desc: "Multi-worker AI research system that discovers UAE target accounts, finds decision-makers, and prepares drafts with mandatory human-in-the-loop review.",
    icon: <BrainCircuit className="w-6 h-6" role="img" aria-label="Sales Agent Brain Icon" />,
    link: "/sovereign-sales-agent",
  },
];

const PLATFORM_BRANDS = [
  { name: "OpenAI", mark: "OAI" },
  { name: "Google Cloud", mark: "G" },
  { name: "Google Analytics", mark: "GA" },
  { name: "Google Ads", mark: "GAds" },
  { name: "Meta", mark: "M" },
  { name: "Meta Ads", mark: "MAds" },
  { name: "WhatsApp", mark: "WA" },
  { name: "Next.js", mark: "N" },
  { name: "Vercel", mark: "V" },
  { name: "n8n", mark: "n8n" },
  { name: "Zapier", mark: "Z" },
  { name: "Shopify", mark: "S" },
  { name: "WooCommerce", mark: "Woo" },
  { name: "Stripe", mark: "St" },
  { name: "HubSpot", mark: "H" },
  { name: "Twilio", mark: "Tw" },
  { name: "Microsoft Azure", mark: "AZ" }
];

/* ─── CASE STUDY OUTCOMES (VERIFIED DELIVERABLES) ─── */
const CASE_STUDY_OUTCOMES: Record<string, string[]> = {
  "luxury-real-estate-ai-concierge": [
    "Multi-channel inquiry ingestion connecting Meta & Google Ads to Supabase CRM",
    "Automated WhatsApp qualification assistant with 1-click human broker takeover"
  ],
  "governed-sales-engine": [
    "Mandatory human-in-the-loop (HITL) review requiring explicit approval before dispatch",
    "Automated MX domain validation and delivery pacing to protect sender reputation"
  ]
};

/* ─── TRANSPARENT OPERATIONAL CAPACITY CALCULATOR ─── */
function RoiCalculator() {
  const [teamMembers, setTeamMembers] = useState(3);
  const [weeklyRepetitiveHours, setWeeklyRepetitiveHours] = useState(8);
  const [automationPercent, setAutomationPercent] = useState(40);
  const [hourlyRate, setHourlyRate] = useState(65);
  const annualAutomationCost = 12000; // Illustrative annual automation setup, messaging, & platform cost assumption

  // Capacity calculations (using unrounded hours for exact mathematical integrity)
  const totalAnnualRepetitiveHours = teamMembers * weeklyRepetitiveHours * 52;
  const rawHoursReclaimed = totalAnnualRepetitiveHours * (automationPercent / 100);
  const estimatedLaborValueEquivalent = rawHoursReclaimed * hourlyRate;
  const estimatedNetModeledValue = estimatedLaborValueEquivalent - annualAutomationCost;

  const isNetPositive = estimatedNetModeledValue >= 0;
  const formattedHoursReclaimed = rawHoursReclaimed % 1 === 0
    ? rawHoursReclaimed.toLocaleString()
    : rawHoursReclaimed.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const formattedNetValue = isNetPositive
    ? `~AED ${Math.round(estimatedNetModeledValue).toLocaleString()}`
    : `-AED ${Math.abs(Math.round(estimatedNetModeledValue)).toLocaleString()}`;

  return (
    <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
      {/* User-Adjustable Assumptions Controls */}
      <div className="mb-10 space-y-7">
        {/* Input 1: Team members */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-1 mb-2.5">
            <div>
              <label htmlFor="calc-team-members" className="text-sm sm:text-base uppercase tracking-wider font-bold text-white/90 block">
                1. Team Members Handling Routine Inquiries
              </label>
              <span className="text-xs sm:text-sm text-white/65 mt-0.5 block">Staff answering repetitive questions, routine screening, and lead data entry</span>
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl sm:text-3xl font-serif text-white font-bold">{teamMembers}</span>
              <span className="text-xs sm:text-sm text-white/60">staff</span>
            </div>
          </div>
          <input
            id="calc-team-members"
            type="range"
            min="1"
            max="20"
            step="1"
            value={teamMembers}
            onChange={(e) => setTeamMembers(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            aria-label="Team members count slider"
          />
          <div className="flex justify-between text-xs font-mono text-white/60 font-medium mt-1.5">
            <span>1 Staff</span>
            <span>10 Staff</span>
            <span>20 Staff</span>
          </div>
        </div>

        {/* Input 2: Repetitive hours per member per week */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-1 mb-2.5">
            <div>
              <label htmlFor="calc-weekly-hours" className="text-sm sm:text-base uppercase tracking-wider font-bold text-white/90 block">
                2. Average Repetitive Task Time per Member
              </label>
              <span className="text-xs sm:text-sm text-white/65 mt-0.5 block">Hours per week spent on routine messages, FAQs, and manual updates</span>
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl sm:text-3xl font-serif text-white font-bold">{weeklyRepetitiveHours}</span>
              <span className="text-xs sm:text-sm text-white/60">hrs / wk</span>
            </div>
          </div>
          <input
            id="calc-weekly-hours"
            type="range"
            min="2"
            max="20"
            step="1"
            value={weeklyRepetitiveHours}
            onChange={(e) => setWeeklyRepetitiveHours(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            aria-label="Weekly repetitive task hours slider"
          />
          <div className="flex justify-between text-xs font-mono text-white/60 font-medium mt-1.5">
            <span>2 hrs/wk</span>
            <span>8 hrs/wk</span>
            <span>20 hrs/wk</span>
          </div>
        </div>

        {/* Input 3: Estimated % handled by automation */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-1 mb-2.5">
            <div>
              <label htmlFor="calc-automation-percent" className="text-sm sm:text-base uppercase tracking-wider font-bold text-white/90 block">
                3. Estimated Repetitive Workload Handled by Automation
              </label>
              <span className="text-xs sm:text-sm text-white/65 mt-0.5 block">Routine FAQs, after-hours intake, brochure delivery, and initial screening</span>
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl sm:text-3xl font-serif text-green-400 font-bold">{automationPercent}%</span>
              <span className="text-xs sm:text-sm text-white/60">workload</span>
            </div>
          </div>
          <input
            id="calc-automation-percent"
            type="range"
            min="20"
            max="70"
            step="5"
            value={automationPercent}
            onChange={(e) => setAutomationPercent(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            aria-label="Automation percent slider"
          />
          <div className="flex justify-between text-xs font-mono text-white/60 font-medium mt-1.5">
            <span>20% (Basic FAQs)</span>
            <span>40% (FAQs + Intake)</span>
            <span>70% (Full Triage)</span>
          </div>
        </div>

        {/* Input 4: Explicit hourly labor cost assumption */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-1 mb-2.5">
            <div>
              <label htmlFor="calc-hourly-rate" className="text-sm sm:text-base uppercase tracking-wider font-bold text-white/90 block">
                4. Illustrative Hourly Labor Cost Assumption (AED)
              </label>
              <span className="text-xs sm:text-sm text-white/65 mt-0.5 block">Adjustable planning assumption (compensation, visas, overhead) — not an industry benchmark or universal rate</span>
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl sm:text-3xl font-serif text-white font-bold">AED {hourlyRate}</span>
              <span className="text-xs sm:text-sm text-white/60">/ hr</span>
            </div>
          </div>
          <input
            id="calc-hourly-rate"
            type="range"
            min="40"
            max="150"
            step="5"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            aria-label="Hourly rate slider"
          />
          <div className="flex justify-between text-xs font-mono text-white/60 font-medium mt-1.5">
            <span>AED 40/hr (planning)</span>
            <span>AED 65/hr (illustrative baseline)</span>
            <span>AED 150/hr (senior)</span>
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
        <div className="roi-card-left p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
          <div>
            <div className="min-h-[44px] flex items-center">
              <h3 className="text-sm uppercase tracking-wider text-white/80 font-bold">
                Current Repetitive Hours Baseline
              </h3>
            </div>
            <div className="text-3xl sm:text-4xl font-serif text-white font-bold mt-2 mb-2">
              {totalAnnualRepetitiveHours.toLocaleString()} <span className="text-xs sm:text-sm font-sans text-white/50 font-normal">hrs / year</span>
            </div>
            <ul className="text-sm sm:text-[0.95rem] font-normal text-white/85 space-y-3 mt-4 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-white/40 font-bold">•</span>
                <span>{teamMembers} team member(s) spending ~{weeklyRepetitiveHours} hrs/week each on routine inquiries</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-white/40 font-bold">•</span>
                <span>Total repetitive commitment: ~{teamMembers * weeklyRepetitiveHours} hours per week across the team</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-white/40 font-bold">•</span>
                <span>Modeled labor cost basis: AED {hourlyRate}/hr (AED {(totalAnnualRepetitiveHours * hourlyRate).toLocaleString()} annual allocation)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="roi-card-right p-6 sm:p-7 rounded-2xl border border-green-500/20 bg-green-500/5 flex flex-col justify-between">
          <div>
            <div className="min-h-[44px] flex items-center">
              <h3 className="text-sm uppercase tracking-wider text-green-400 font-bold">
                Potential Capacity Reclaimed
              </h3>
            </div>
            <div className="text-3xl sm:text-4xl font-serif text-white font-bold mt-2 mb-2">
              ~{formattedHoursReclaimed} <span className="text-xs sm:text-sm font-sans text-white/50 font-normal">hrs / year reclaimed</span>
            </div>
            <ul className="text-sm sm:text-[0.95rem] font-normal text-white/85 space-y-3 mt-4 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-green-400 font-bold">•</span>
                <span>Equivalent labor value: ~AED {Math.round(estimatedLaborValueEquivalent).toLocaleString()} / year</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-green-400 font-bold">•</span>
                <span>Estimated annual automation platform & setup cost: ~AED {annualAutomationCost.toLocaleString()} / yr (illustrative planning assumption; varies by technical scope and tools)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-green-400 font-bold">•</span>
                <span>Shifts ~{automationPercent}% of routine inquiries to automated qualification and instant routing</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-green-400 font-bold">•</span>
                <span>Reclaimed team hours are redirected toward high-value client advisory and closing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reclaimed Capacity Output */}
      <div className="roi-savings-container text-center pt-8 border-t border-white/10">
        <div className="text-xs sm:text-sm uppercase tracking-wider text-white/75 font-bold mb-3">
          Estimated Net Modeled Value (Reclaimed Labor Value Minus Platform Cost)
        </div>
        <div
          id="roi-savings-value"
          className={`text-3xl sm:text-5xl md:text-6xl font-serif font-bold transition-colors ${
            isNetPositive ? "text-green-400" : "text-amber-400"
          }`}
        >
          {formattedNetValue}
        </div>
        {!isNetPositive && (
          <p className="text-amber-300/90 text-sm font-mono max-w-xl mx-auto mt-3 leading-relaxed">
            Note: When repetitive hours are relatively low, the illustrative annual platform cost may exceed modeled labor value. In low-volume settings, automation is typically adopted for 24/7 responsiveness rather than labor-hour savings alone.
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-6 text-left">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-xs uppercase font-mono text-white/60 font-semibold block">Potential Reclaimed Time</span>
            <span className="text-base sm:text-lg font-serif text-white font-bold">{formattedHoursReclaimed} hrs / yr</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-xs uppercase font-mono text-white/60 font-semibold block">Equivalent Labor Value</span>
            <span className="text-base sm:text-lg font-serif text-white font-bold">AED {Math.round(estimatedLaborValueEquivalent).toLocaleString()} / yr</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-xs uppercase font-mono text-white/60 font-semibold block">Illustrative Platform Cost</span>
            <span className="text-base sm:text-lg font-serif text-white/80 font-bold">~AED {annualAutomationCost.toLocaleString()} / yr</span>
            <span className="text-xs text-white/50 font-mono block mt-0.5">Planning assumption</span>
          </div>
        </div>
        <p className="text-white/70 text-sm sm:text-base mt-6 font-normal max-w-3xl mx-auto leading-relaxed">
          Illustrative capacity model based on your selected operational inputs. Equivalent labor value represents the modeled economic worth of staff hours redirected from repetitive inquiry handling toward client-facing, revenue-generating activities. This figure does not represent cash payroll savings, cash in hand, or employee layoffs; it models capacity expansion without adding administrative headcount. All labor rates and annual platform figures are illustrative planning assumptions, not guaranteed prices, fixed quotes, or industry benchmarks.
        </p>
      </div>
    </div>
  );
}

/* ─── MAIN HOME COMPONENT ─── */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useGSAP(() => {
    // Reveal animations for headings/paragraphs with once: true
    const reveals = gsap.utils.toArray(".gsap-reveal");
    reveals.forEach((elem: any) => {
      gsap.fromTo(
        elem,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // Why Now section GSAP animations
    gsap.fromTo(
      ".why-now-text",
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-now-text",
          start: "top 80%",
          once: true,
        },
      }
    );

    const whyNowTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".why-now-graphic",
        start: "top 75%",
        once: true,
      },
    });

    whyNowTl.fromTo(
      ".why-now-graphic",
      { scale: 0.96, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(
      ".legacy-card",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(
      ".arrow-graphic",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.2"
    )
    .fromTo(
      ".automated-card",
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.3"
    );

    // ROI Calculator animations with once: true
    gsap.fromTo(
      ".roi-card-left",
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".roi-card-left",
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".roi-card-right",
      { x: 20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".roi-card-right",
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".roi-savings-container",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: ".roi-savings-container",
          start: "top 90%",
          once: true,
        },
      }
    );
  }, { dependencies: [] });

  const displayedServices = selectedCategory === "all"
    ? ALL_SERVICES
    : ALL_SERVICES.filter(s => s.category === selectedCategory);

  return (
    <div ref={containerRef} className="relative bg-[#050505] text-white selection:bg-green-500 selection:text-black">
      {/* ── 1. The Authority Hero Section ── */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100svh-var(--header-height,5.75rem))] flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 sm:pt-28 md:pt-32 md:pb-20"
      >
        <motion.div style={{ y, opacity }} className="relative z-10 text-center flex flex-col items-center w-full max-w-5xl mx-auto">
          {/* Status pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-5 flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-green-500/25 bg-green-500/10 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-green-300">
              Websites, WhatsApp Assistants & AI Automation • UAE
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-serif font-bold leading-[1.12] tracking-tight mb-6 max-w-4xl mx-auto drop-shadow-2xl text-white"
          >
            Websites and AI Automation, <br />
            <span className="italic text-white/70 tracking-normal font-normal">Built to Turn Visitors Into Enquiries.</span>
          </motion.h1>

          {/* Clear Supporting Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 font-normal max-w-3xl mx-auto leading-relaxed mb-10 font-sans"
          >
            Asif Digital Agency helps UAE businesses improve websites, automate customer conversations on WhatsApp, and eliminate lead drop-off with fast follow-up systems.
          </motion.p>

          {/* Primary & Secondary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0 justify-center z-10"
          >
            <MagneticButton>
              <Link
                href="/free-growth-audit"
                aria-label="Book Free Growth Audit"
                className="bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-green-400 hover:text-black transition-all flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(255,255,255,0.25)] cursor-pointer min-h-[48px]"
              >
                Book Free Growth Audit <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#services"
                aria-label="Explore Services"
                className="bg-white/5 text-white border border-white/15 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-white/10 hover:border-green-400/50 transition-all flex items-center justify-center gap-3 backdrop-blur-md cursor-pointer min-h-[48px]"
              >
                Explore Services <ChevronRight className="w-4 h-4" role="img" aria-label="Chevron icon" />
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. Trust Signals Bar ── */}
      <section className="py-6 sm:py-8 bg-black border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6 sm:gap-8 text-xs sm:text-sm uppercase font-semibold tracking-wide text-white/85">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-green-400" role="img" aria-label="Shield icon" />
            <span>No CMS Bloat or Passwords</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Database className="w-4 h-4 text-green-400" role="img" aria-label="Database icon" />
            <span>Search-Engine Ready Next.js</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Brain className="w-4 h-4 text-green-400" role="img" aria-label="AI brain icon" />
            <span>Instant WhatsApp Qualification</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-green-400" role="img" aria-label="Globe icon" />
            <span>Free 15-Minute Audit First</span>
          </div>
        </div>
      </section>

      {/* ── 3. Technology Ecosystem Marquee ── */}
      <section className="relative z-20 overflow-hidden border-b border-white/5 bg-[#070707] py-10 sm:py-12" aria-labelledby="platform-ecosystem-heading">
        <div className="px-6 md:px-12 mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3 max-w-7xl mx-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-2">
              Technology Ecosystem
            </span>
            <h2 id="platform-ecosystem-heading" className="text-2xl md:text-3xl font-serif tracking-tight text-white">
              Platforms we build with & connect to
            </h2>
          </div>
          <p className="text-white/70 text-sm sm:text-base max-w-xl leading-relaxed">
            Technologies selected according to each project&apos;s workflow, security, CRM data, commerce, and growth requirements.
          </p>
        </div>

        <div className="brand-marquee" role="region" aria-label="Technology platforms used by Asif Digital">
          <div className="brand-marquee-track">
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="brand-marquee-set" aria-hidden={setIndex === 1}>
                {PLATFORM_BRANDS.map((brand) => (
                  <div key={`${setIndex}-${brand.name}`} className="brand-marquee-item" title={brand.name}>
                    <span className="brand-marquee-mark" aria-hidden="true">{brand.mark}</span>
                    <span>{brand.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Start Here: Fastest Path to More Enquiries ── */}
      <section className="px-6 md:px-12 py-16 sm:py-20 max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3 gsap-reveal">
              Start Here
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight gsap-reveal text-white">
              Pick the fastest path to more enquiries.
            </h2>
          </div>
          <p className="text-white/75 text-base sm:text-lg max-w-xl gsap-reveal leading-relaxed">
            Start with the service that fixes your biggest commercial bottleneck: an outdated website, slow customer messaging, or fragmented CRM lead management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Web Design & Conversion",
              desc: "Build a high-performance Next.js website engineered to rank on Google in the UAE and turn search traffic into calls and enquiries.",
              href: "/services/web-design-dubai",
              label: "Website Architecture"
            },
            {
              title: "WhatsApp AI & Chatbots",
              desc: "Deploy a 24/7 bilingual assistant that answers questions in under 10 seconds, qualifies intent, and sends lead details to your sales team.",
              href: "/ai-chatbots-dubai",
              label: "Instant Qualification"
            },
            {
              title: "AI Workflows & CRM Systems",
              desc: "Connect web forms, portals, and follow-up flows into your CRM so no prospective client slips through the cracks.",
              href: "/ai-automation-agency-dubai",
              label: "Pipeline Operations"
            }
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group relative block p-7 sm:p-8 rounded-[1.75rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-green-400/40 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            >
              <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-green-400 mb-3 block">{item.label}</span>
                <h3 className="text-2xl sm:text-[1.65rem] font-serif text-white mb-3 leading-snug group-hover:text-green-300 transition-colors">{item.title}</h3>
                <p className="text-white/80 text-base leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8 pt-5 border-t border-white/5 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white/70 group-hover:text-green-300 transition-colors">
                Explore Solution <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. The Problems We Solve (Educational Contrast) ── */}
      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black relative z-20" aria-labelledby="problems-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
              Common Commercial Bottlenecks
            </span>
            <h2 id="problems-heading" className="text-3xl md:text-5xl font-serif tracking-tight leading-tight mb-6 text-white">
              Why most UAE business websites lose enquiries.
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              Most business websites fail not because the service is bad, but because visitors encounter friction: unclear offers, buried WhatsApp buttons, and manual follow-up processes that let warm leads go cold.
            </p>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3.5 text-sm sm:text-base text-white/90">
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>Clear value propositions above the fold</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>Frictionless WhatsApp and form intake</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>Automated lead routing to team mobile devices</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                problem: "Unclear Offers & High Bounce",
                desc: "Visitors exit within seconds when websites are slow or fail to state the business outcome clearly.",
                solution: "Conversion Web Design",
                href: "/services/web-design-dubai"
              },
              {
                problem: "Delayed WhatsApp Replies",
                desc: "UAE prospects message after hours. Slow responses cause them to immediately contact your competitor.",
                solution: "WhatsApp AI Assistant",
                href: "/ai-chatbots-dubai"
              },
              {
                problem: "Spreadsheets & Lost Leads",
                desc: "Portal and ad enquiries get lost without structured CRM assignment and speed-to-lead follow-up.",
                solution: "CRM Lead Automation",
                href: "/real-estate-crm-dubai"
              }
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-green-400/30 hover:bg-white/[0.05] transition-colors flex flex-col justify-between h-full group"
              >
                <div>
                  <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-2">Friction Point</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-3 leading-snug group-hover:text-green-300 transition-colors">{item.problem}</h3>
                  <p className="text-sm text-white/75 leading-relaxed mb-6">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <span className="text-xs uppercase tracking-wider font-bold text-white/50 block mb-1">Our Fix</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-400">
                    {item.solution} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Dubai & Sharjah Service Directory (Balanced Grid) ── */}
      <section className="px-6 md:px-12 py-16 sm:py-20 bg-[#050505] border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
                Local Presence • Dubai & Sharjah
              </span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight text-white">
                Find the right service for your emirate.
              </h2>
            </div>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Direct access to our dedicated service hubs across Dubai and Sharjah. Select your local market below or request our free growth audit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "AI Automation Agency Dubai", href: "/ai-automation-agency-dubai", meta: "Dubai Lead & CRM Workflows", desc: "Automate enquiries, lead scoring, and team notifications across Dubai enterprises." },
              { title: "AI Automation Agency Sharjah", href: "/ai-automation-sharjah", meta: "Sharjah Operations & AI", desc: "Local operational automation and customer qualification for Sharjah businesses." },
              { title: "WhatsApp Chatbot Dubai", href: "/ai-chatbots-dubai", meta: "Dubai Instant Qualification", desc: "24/7 bilingual customer engagement and lead capture via WhatsApp Business API." },
              { title: "WhatsApp Chatbot Sharjah", href: "/whatsapp-chatbot-sharjah", meta: "Sharjah Customer Messaging", desc: "Arabic and English conversational assistants tailored to Sharjah business inquiries." },
              { title: "Web Design Company Dubai", href: "/services/web-design-dubai", meta: "Dubai Conversion Websites", desc: "Search-optimized Next.js web applications built for commercial lead capture." },
              { title: "Web Design Company Sharjah", href: "/web-design-sharjah", meta: "Sharjah Corporate Web Design", desc: "Fast, reliable web design and digital branding for established Sharjah firms." }
            ].map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-green-400/30 hover:bg-white/[0.05] transition-all flex flex-col justify-between h-full"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold text-green-400">{page.meta}</span>
                  <h3 className="mt-3 font-serif text-xl sm:text-2xl leading-snug text-white group-hover:text-green-300 transition-colors">{page.title}</h3>
                  <p className="mt-2.5 text-sm sm:text-[0.95rem] text-white/75 leading-relaxed">{page.desc}</p>
                </div>
                <span className="mt-6 pt-4 border-t border-white/5 inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider font-bold text-white/60 group-hover:text-green-300">
                  Open Hub <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Free AI Growth Diagnostic Tools ── */}
      <section className="px-6 md:px-12 py-20 sm:py-24 bg-[#080808] border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
                Free Diagnostic Tools
              </span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white">
                Diagnose before you invest.
              </h2>
            </div>
            <div className="max-w-xl">
              <p className="text-white/75 text-base sm:text-lg leading-relaxed font-normal">
                Interactive diagnostic calculators to benchmark your website performance, marketing channel mix, and ad acquisition economics before allocating capital.
              </p>
              <Link href="/tools" className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-green-400 hover:text-green-300">
                Explore all free calculators <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "AI Website Grader",
                desc: "Inspect website speed, technical SEO parameters, conversion architecture, and AI search visibility.",
                href: "/tools/ai-website-grader",
                icon: <Gauge className="w-6 h-6" />,
                meta: "5 Diagnostic Audits"
              },
              {
                title: "Marketing Strategy Generator",
                desc: "Generate a directional 90-day UAE marketing channel roadmap structured around your commercial goals.",
                href: "/tools/ai-marketing-strategy-generator",
                icon: <BrainCircuit className="w-6 h-6" />,
                meta: "Channel Mix Model"
              },
              {
                title: "Ad Spend Efficiency Analyzer",
                desc: "Calculate customer acquisition costs (CAC), target cost-per-lead (CPL), and break-even advertising thresholds.",
                href: "/tools/ad-spend-efficiency-analyzer",
                icon: <BarChart3 className="w-6 h-6" />,
                meta: "Transparent Math"
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-[2rem] border border-white/10 bg-black p-7 md:p-8 hover:border-green-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-green-400/10 text-green-400 flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <h3 className="mt-6 text-2xl sm:text-[1.7rem] font-serif text-white group-hover:text-green-300 transition-colors leading-snug">
                    {tool.title}
                  </h3>
                  <p className="mt-3 text-base text-white/75 leading-relaxed font-normal">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-7 pt-5 border-t border-white/5 flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-wider font-mono text-white/60 font-semibold">{tool.meta}</span>
                  <ArrowRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. The Conversation Flow ("Why Now") ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="why-now-text opacity-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-[1.12] mb-8 text-white">
              A good website should not just look nice. <br/>
              <span className="italic text-white/70 font-normal">It should start conversations.</span>
            </h2>
            <div className="space-y-6 text-white/85 font-normal text-lg sm:text-xl leading-relaxed">
              <p>
                Most leads do not disappear because the business is bad. They disappear because the page is unclear, the WhatsApp button is buried, or nobody follows up fast enough.
              </p>
              <p className="text-white font-medium text-base sm:text-lg border-l-2 border-green-400 pl-4 py-2.5 bg-white/[0.01]">
                We build fast websites, WhatsApp assistants, and simple automation flows that help visitors understand your offer, ask questions, and send real enquiries to your team.
              </p>
            </div>
            <div className="mt-10 flex gap-8">
              <div>
                <div className="text-3xl sm:text-4xl font-serif text-white mb-1">24/7</div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-green-400 font-bold">Always Online Chatbots</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-serif text-white mb-1">SEO-Ready</div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-green-400 font-bold">Technical SEO Foundations</div>
              </div>
            </div>
          </div>

          <div className="why-now-graphic relative min-h-[420px] rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 md:p-10 flex flex-col justify-center opacity-0">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-20 z-[1]" />

             <div className="relative z-10 space-y-6 my-auto">
                <div className="legacy-card p-6 border border-red-500/20 bg-red-500/5 hover:border-red-500/40 rounded-xl opacity-0 transition-all duration-300">
                  <h4 className="text-red-400 font-bold text-xs sm:text-sm uppercase tracking-wider mb-2">The Broken Flow</h4>
                  <p className="text-white/85 font-normal text-base leading-relaxed">Outdated websites with weak forms, confusing menus, and delayed follow-up.</p>
                </div>
                <div className="arrow-graphic flex justify-center opacity-0">
                  <ArrowRight className="w-6 h-6 rotate-90 text-white/30" />
                </div>
                <div className="automated-card p-6 border border-green-500/30 bg-green-500/10 hover:border-green-500/50 rounded-xl opacity-0 transition-all duration-300">
                  <h4 className="text-green-400 font-bold text-xs sm:text-sm uppercase tracking-wider mb-2">The Better Flow</h4>
                  <p className="text-white/95 font-normal text-base leading-relaxed">Clear landing pages, instant WhatsApp responses, and CRM routing to your team.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── 9. Main Services Showcase with Categorized Navigation (Solves Wall of Choices) ── */}
      <section id="services" className="relative py-24 bg-[#080808] border-y border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-2 gsap-reveal">
                Service Directory
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white gsap-reveal">
                Services engineered for growth & conversion
              </h2>
            </div>
            <p className="text-white/75 text-base sm:text-lg max-w-md gsap-reveal leading-relaxed font-normal">
              Filter by capability to explore our dedicated service architectures, or view the complete agency catalogue below.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-white/10" role="tablist" aria-label="Service categories">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer min-h-[44px] ${
                    isActive
                      ? "bg-white text-black font-bold shadow-lg shadow-white/10"
                      : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Categorized Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-7 md:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 backdrop-blur-sm"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3.5 rounded-2xl border border-white/10 bg-white/5 text-green-400 group-hover:bg-green-400 group-hover:text-black transition-colors duration-300">
                      {service.icon}
                    </div>
                    <span className="text-xs uppercase font-mono font-bold tracking-wider text-green-400">
                      {service.tag}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-white/50 block mb-2">
                    {service.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-serif text-white mb-3 leading-snug group-hover:text-green-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/80 font-normal text-base leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>
                <Link
                  href={service.link}
                  aria-label={`Explore ${service.title}`}
                  className="relative z-10 inline-flex items-center gap-2 text-xs sm:text-sm uppercase font-bold tracking-wider text-white/70 group-hover:text-green-300 transition-colors pt-4 border-t border-white/10 mt-auto"
                >
                  Explore Service <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}

            {/* Balanced Closing CTA Banner inside grid when viewing All */}
            {selectedCategory === "all" && (
              <div className="rounded-[2rem] border border-green-500/30 bg-gradient-to-br from-green-500/10 via-black to-black p-7 md:p-8 flex flex-col justify-between h-full backdrop-blur-sm lg:col-span-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs sm:text-sm uppercase font-bold text-green-400 tracking-wider block mb-2">
                      Next Practical Step
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-2 leading-snug">
                      Unsure which service will deliver the fastest ROI?
                    </h3>
                    <p className="text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed">
                      Book a free 15-minute growth audit. We will review your current website, WhatsApp setup, and lead pipeline with zero sales pressure.
                    </p>
                  </div>
                  <Link
                    href="/free-growth-audit"
                    className="inline-flex items-center justify-center gap-3 bg-white text-black py-4 px-8 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-green-400 hover:text-black transition-all shrink-0 min-h-[48px]"
                  >
                    Request Free Audit <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 10. Engagement Standards & What You Can Expect ── */}
      <section className="py-24 px-6 md:px-12 bg-[#050505] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3 gsap-reveal">
              Our Commitments
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 gsap-reveal">
              What you can expect working with us
            </h2>
            <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto gsap-reveal font-normal leading-relaxed">
              Clear engineering standards, transparent delivery milestones, and direct technical communication throughout your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tag: "Direct Architecture",
                title: "No Account Manager Friction",
                desc: "You work directly with the systems architect designing your website, WhatsApp assistant, and CRM integration. No junior intermediaries or diluted technical handoffs.",
                icon: <Shield className="w-6 h-6 text-green-400" />
              },
              {
                tag: "Defined Milestones",
                title: "Transparent Timelines & Scope",
                desc: "Every project begins with a documented scope and clear technical milestones. We agree on deliverables upfront and provide regular progress updates throughout implementation.",
                icon: <Workflow className="w-6 h-6 text-green-400" />
              },
              {
                tag: "Data Privacy",
                title: "Privacy & Operational Security",
                desc: "We configure private API integrations, encrypted data transit, and access controls designed to keep your customer records and CRM credentials protected.",
                icon: <Database className="w-6 h-6 text-green-400" />
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.03] transition-colors flex flex-col justify-between h-full group hover:border-green-400/30">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-green-400 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-green-400 font-bold block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-2xl sm:text-[1.65rem] font-serif text-white mb-3 leading-snug group-hover:text-green-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-normal text-base sm:text-[1.05rem] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-8 flex items-center gap-2 text-xs sm:text-sm font-mono text-white/60 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span>Standard Delivery Principle</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Industries Served / Selected Use Cases ── */}
      <section className="relative z-20 py-24 sm:py-32 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3 gsap-reveal">
              Selected Use Cases
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-4 gsap-reveal text-white">
              Where this delivers highest impact
            </h2>
            <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto gsap-reveal font-normal leading-relaxed">
              We focus on commercial scenarios where missed enquiries, slow follow-up, and unclear websites directly hurt revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                industry: "Real Estate & Property Development",
                desc: "Qualify prospective buyers in seconds, automate off-plan brochure dispatch via WhatsApp, sync lead profiles to CRM, and capture international inquiries 24/7.",
                features: ["Lead Source Attribution", "WhatsApp Off-Plan Assistant", "Bilingual Lead Qualification"]
              },
              {
                industry: "Professional Services & Legal Firms",
                desc: "Eliminate administrative scheduling bottlenecks. Pre-qualify consultation scope, automate onboarding questionnaires, and route qualified files directly to partners.",
                features: ["Intelligent Client Intake", "Automated Billing Workflows", "CRM & Calendar Sync"]
              },
              {
                industry: "Ecommerce & Local Services",
                desc: "Recover abandoned enquiries and missed messages. Help customers get instant answers about services, availability, and pricing without delays.",
                features: ["Instant Cart Inquiries", "WhatsApp Follow-Up", "Service Booking Routing"]
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between h-full group hover:border-green-400/30">
                <div>
                  <h3 className="text-2xl sm:text-[1.7rem] font-serif text-white mb-4 leading-snug group-hover:text-green-300 transition-colors">{item.industry}</h3>
                  <p className="text-base sm:text-[1.05rem] text-white/80 leading-relaxed mb-8">{item.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {item.features.map((f, j) => (
                    <span key={j} className="text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/5 text-white/80 border border-white/5 font-mono">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Integrations & Unified Tech Stack ── */}
      <section className="relative z-20 py-20 sm:py-24 px-6 md:px-12 bg-[#080808] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3 gsap-reveal">
                Unified Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-6 gsap-reveal text-white">
                Seamless integration with your tech stack
              </h2>
              <p className="text-white/85 leading-relaxed text-base sm:text-lg mb-6 font-normal">
                Our AI workflows connect cleanly into your existing business infrastructure — CRM suites, email platforms, payment gateways, and team communication channels.
              </p>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed font-normal">
                We build custom API and webhook integrations using automation platforms such as n8n, Make.com, and Zapier, depending on your workflow and platform access.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: "n8n & Make.com", type: "Automation Engines" },
                { name: "Salesforce", type: "CRM Ecosystem" },
                { name: "HubSpot", type: "Sales & Marketing" },
                { name: "OpenAI / Anthropic", type: "LLM Orchestration" },
                { name: "WhatsApp Business API", type: "Customer Messaging" },
                { name: "Zapier", type: "Cloud Connectors" }
              ].map((stack, i) => (
                <div key={i} className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.04] hover:border-green-400/20 transition-all text-center">
                  <div className="text-white font-bold text-base sm:text-lg mb-1">{stack.name}</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider font-mono font-medium">{stack.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. Human vs Automation ROI Estimator ── */}
      <section className="relative z-20 py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#050505]">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
            Operational Capacity Planning
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white">
            Human Team & Automation: <span className="italic text-white/50 font-normal">Model Your Capacity.</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
            Adjust the assumptions below to see how automating routine inquiries and after-hours messaging reclaims hours for your team.
          </p>
        </div>

        <RoiCalculator />
      </section>

      {/* ── 14. Documented Case Studies ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
                Documented Implementations
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight mb-4 text-white">
                Real results for <span className="italic text-white/60 font-normal">UAE enterprises.</span>
              </h2>
              <p className="text-white/75 text-base sm:text-lg font-normal leading-relaxed">
                Detailed breakdowns of delivered client architectures and proprietary operational frameworks.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="group flex items-center gap-2 text-white/75 hover:text-white transition-colors uppercase tracking-wider text-xs sm:text-sm font-bold"
            >
              View All Case Studies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {CASE_STUDIES.slice(0, 2).map((study, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] hover:border-green-400/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-video overflow-hidden border-b border-white/10 relative">
                  <Image
                    src={study.img || "/images/dubai_real_estate_ai_dashboard.webp"}
                    alt={study.title || study.client}
                    width={800}
                    height={450}
                    sizes="(max-width: 768px) 100vw, 500px"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-[1.03] group-hover:opacity-100 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-7 sm:p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-green-400 font-bold">{study.industry}</span>
                    <span className="text-xs uppercase font-mono px-2.5 py-1 rounded bg-white/10 text-white/80 font-medium">{study.classification}</span>
                  </div>
                  <h3 className="text-2xl sm:text-[1.65rem] font-serif mb-3 leading-snug text-white group-hover:text-green-300 transition-colors">
                    {study.title || study.client}
                  </h3>
                  <p className="text-white/80 font-normal text-base sm:text-[1.05rem] mb-6 leading-relaxed flex-grow">
                    {study.desc || study.challenge}
                  </p>
                  <div className="space-y-3 mt-auto pt-6 border-t border-white/5">
                    {(CASE_STUDY_OUTCOMES[study.id] || (study.results ? study.results.slice(0, 2) : (study.highlights || []).slice(0, 2))).map((item, j) => (
                      <div key={j} className="flex items-start gap-2.5 text-sm sm:text-[0.95rem] text-white/90 font-normal leading-relaxed">
                        <TrendingUp className="w-4 h-4 mt-0.5 text-green-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. AI Chatbot In Action ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
                Website & WhatsApp Assistant
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-[1.1] mb-6 text-white">
                Make it easy for customers to <br /><span className="italic text-white/60 font-normal">enquire 24 hours a day.</span>
              </h2>
              <p className="text-white/85 font-normal leading-relaxed mb-8 text-lg sm:text-xl max-w-xl">
                Add an intelligent assistant to your website and WhatsApp so visitors can ask questions, explore pricing ranges, and request callbacks without waiting for a manual reply.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { stat: "3–4 Days", label: "Setup Timeline" },
                  { stat: "24/7", label: "Instant Response" },
                  { stat: "Arabic & English", label: "Bilingual NLP" },
                  { stat: "Zero Lock-In", label: "Client Owned" },
                ].map((item, i) => (
                  <div key={i} className="p-4 sm:p-5 border border-white/10 bg-white/[0.02] rounded-2xl">
                    <div className="text-2xl sm:text-3xl font-serif text-white mb-1 font-bold">{item.stat}</div>
                    <div className="text-xs uppercase tracking-wider text-white/75 font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>
              <div
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                aria-label="See the AI Chatbot in Action"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 sm:py-5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-green-400 hover:text-black transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer min-h-[48px]"
              >
                Test Interactive Chatbot <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="space-y-4">
              {[
                { title: "Answers Commercial FAQs Instantly", desc: "Trained on your business documentation, services, pricing parameters, and locations in English or Arabic." },
                { title: "Runs Directly on WhatsApp", desc: "Customers can continue conversations on WhatsApp where UAE buyers prefer to communicate, with instant team alerts." },
                { title: "Captures Qualified Lead Data", desc: "Collects customer requirements, timeline, contact details, and intent before routing the record to your CRM." },
                { title: "Assists Appointment Scheduling", desc: "Guides high-intent visitors toward discovery calls, viewing appointments, or consultation bookings." },
              ].map((f, i) => (
                <div key={i} className="flex gap-5 p-6 border border-white/10 bg-white/[0.02] rounded-2xl group hover:border-green-400/30 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 font-mono font-bold text-base">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-serif text-white mb-2 leading-snug">{f.title}</h4>
                    <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 16. B2B Sales Agent Architecture ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
              B2B Research & Outbound Governance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-[1.1] mb-6 text-white">
              Discover verified B2B leads with human approval.
            </h2>
            <p className="text-white/85 font-normal leading-relaxed text-lg sm:text-xl mb-8 max-w-2xl">
              Asif Digital&apos;s Sovereign B2B Agent researches UAE companies, identifies verified decision-makers, and drafts personalized communications — with mandatory human approval before anything is sent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sovereign-sales-agent" className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-green-400 transition-all min-h-[48px]">
                View Sales Architecture <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/free-growth-audit" className="inline-flex items-center justify-center gap-3 border border-white/15 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:border-green-400 hover:text-green-300 transition-all min-h-[48px]">
                Book Free Audit
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-[2rem] border border-green-400/20 bg-white/[0.03] p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["01", "Identify Target Accounts", "Compile structured UAE corporate targets matching your sector, geography, and ideal buyer criteria."],
                ["02", "Assess Commercial Fit", "Evaluate target companies by web presence, service alignment, and operational indicators."],
                ["03", "Map Decision-Makers", "Identify founders, directors, and operational heads with verified corporate contact pathways."],
                ["04", "Human Approval Gate", "Every generated communication requires explicit human review and approval before dispatch."],
              ].map(([num, title, desc]) => (
                <div key={title} className="group rounded-2xl border border-white/10 bg-black/50 p-5 hover:border-green-400/40 transition-all duration-300">
                  <div className="text-green-400 font-mono font-bold text-sm tracking-wider mb-4">{num}</div>
                  <h3 className="font-serif text-xl sm:text-2xl leading-snug text-white mb-2">{title}</h3>
                  <p className="text-white/75 text-sm sm:text-base leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 17. Custom AI Applications & Software Engineering ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-[#060606] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
                Software Engineering • UAE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white">
                Custom AI Applications <br className="hidden sm:block" />
                <span className="italic text-white/60 font-normal">& Intelligent Software.</span>
              </h2>
            </div>
            <Link
              href="/ai-app-development-dubai"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-all shrink-0 min-h-[48px]"
            >
              Explore App Development <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Globe className="w-6 h-6 text-blue-400" />,
                title: "AI SaaS & Web Platforms",
                desc: "Cloud applications built with Next.js 14, Python FastAPI, and PostgreSQL with sub-100ms API response times.",
                tags: ["Next.js 14", "FastAPI", "PostgreSQL"],
                link: "/ai-app-development-dubai"
              },
              {
                icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
                title: "AI Mobile Apps (iOS & Android)",
                desc: "Cross-platform mobile applications with offline ML inference and native Khaleeji Arabic conversational interfaces.",
                tags: ["React Native", "iOS / Android", "Bilingual NLP"],
                link: "/ai-app-development-dubai"
              },
              {
                icon: <Workflow className="w-6 h-6 text-purple-400" />,
                title: "Internal Operations Portals",
                desc: "Custom operational software automating document classification and CRM pipeline synchronization with human review.",
                tags: ["Document OCR", "CRM Sync", "RBAC Security"],
                link: "/ai-app-development-dubai"
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-amber-400" />,
                title: "AI Micro-Tools & Calculators",
                desc: "Assessment tools, ROI calculators, and quotation engines engineered to capture high-intent commercial demand.",
                tags: ["ROI Engines", "Lead Attribution", "Edge Compute"],
                link: "/ai-app-development-dubai"
              }
            ].map((app, idx) => (
              <div
                key={idx}
                className="group p-7 rounded-[2rem] border border-white/10 bg-white/[0.015] hover:bg-white/[0.04] hover:border-green-400/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    {app.icon}
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2.5 leading-snug group-hover:text-green-300 transition-colors">{app.title}</h3>
                  <p className="text-white/75 text-sm sm:text-base font-normal leading-relaxed mb-6">{app.desc}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {app.tags.map((t, ti) => (
                      <span key={ti} className="px-3 py-1 rounded-md bg-white/5 text-xs font-mono text-white/80 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={app.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-400 group-hover:translate-x-1 transition-transform"
                  >
                    View Specifications <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 18. Technical Blog & Practical Guides ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6 text-center md:text-left">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
              Guides & Technical Analysis
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white">
              Practical Insights for UAE Operators
            </h2>
          </div>
          <Link href="/blog" aria-label="Explore all blog articles" className="bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs border border-white/10 transition-all flex items-center gap-2 group shrink-0 min-h-[48px]">
            Read All Articles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" role="img" aria-label="Chevron Right icon" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
            <Link
              key={i}
              href={`/blog/${post.slug}`}
              aria-label={`Read Article: ${post.title}`}
              className="group block p-7 sm:p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-green-400/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-green-400 font-bold mb-4">
                {post.category}
              </div>
              <h3 className="text-2xl sm:text-[1.65rem] font-serif mb-4 text-white leading-snug group-hover:text-green-300 transition-colors flex-grow">
                {post.title}
              </h3>
              <p className="text-sm sm:text-base text-white/75 font-normal leading-relaxed mb-6 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white/70 group-hover:text-green-300 transition-colors pt-4 border-t border-white/5 mt-auto">
                Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" role="img" aria-label="Arrow Right icon" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 19. How We Work (Clear 4-Step Process) ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-[#080808] border-t border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
                Simple Engagement Process
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-white">
                How it works. <span className="italic text-white/60 font-normal">Fast, clear, accountable.</span>
              </h2>
            </div>
            <p className="text-white/60 font-normal max-w-sm mb-2 text-sm leading-relaxed">
              A practical engineering approach with clear delivery milestones, regular check-ins, and zero technical jargon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Free Discovery Audit",
                desc: "A focused 15-minute diagnostic call to review your current website, WhatsApp setup, and conversion friction. Grounded recommendations with zero pressure.",
                tags: ["15 Minutes", "No Obligation"]
              },
              {
                step: "02",
                title: "Architecture & Planning",
                desc: "We map your website wireframes, write high-converting commercial copy, and diagram how your WhatsApp assistant handles customer qualification.",
                tags: ["Wireframes", "Workflow Logic"]
              },
              {
                step: "03",
                title: "Build & Integration",
                desc: "We engineer your fast Next.js website, train your AI assistants on verified business documentation, and connect all forms to your CRM.",
                tags: ["Next.js Build", "CRM Sync"]
              },
              {
                step: "04",
                title: "Launch & Training",
                desc: "We deploy to high-speed UAE cloud infrastructure, train your team on pipeline management, and verify technical SEO indexing.",
                tags: ["Live Deployment", "Team Handover"]
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-green-400/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl font-serif font-bold text-green-400 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-serif mb-3 text-white leading-snug group-hover:text-green-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {step.tags.map(tag => (
                    <span key={tag} className="text-xs uppercase font-mono tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/5 text-white/75 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 20. Founder-Led Engineering ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-green-500/10 rounded-[2.5rem] blur-[80px] pointer-events-none" />
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
              <Image
                src="/images/asif-khan.webp"
                alt="Asif Khan — Founder & Principal Systems Architect"
                width={1122}
                height={1402}
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10">
                <div className="font-serif text-2xl text-white mb-1">Asif Khan</div>
                <div className="text-green-400 text-xs uppercase tracking-wider font-mono font-bold">
                  Founder & Principal Systems Architect
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
                Founder-Led Engineering
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-[1.1] text-white mb-6">
                Direct Technical Architecture. <br />
                <span className="italic text-white/60 font-normal">Zero Account Manager Friction.</span>
              </h2>
              <p className="text-white/85 text-lg sm:text-xl font-normal leading-relaxed mb-8">
                At Asif Digital, you work directly with the systems architect engineering your websites, WhatsApp workflows, and search infrastructure — not junior account intermediaries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="font-serif text-lg sm:text-xl text-white mb-2 font-bold">Direct Ownership</h3>
                <p className="text-sm sm:text-[0.95rem] text-white/75 font-normal leading-relaxed">
                  Every pipeline, database schema, and custom chatbot is architected directly by the technical lead.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="font-serif text-lg sm:text-xl text-white mb-2 font-bold">Local UAE Presence</h3>
                <p className="text-sm sm:text-[0.95rem] text-white/75 font-normal leading-relaxed">
                  Direct local collaboration with private cloud hosting pathways and encrypted communication channels.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="font-serif text-lg sm:text-xl text-white mb-2 font-bold">Accountable ROI</h3>
                <p className="text-sm sm:text-[0.95rem] text-white/75 font-normal leading-relaxed">
                  No bloated retainers or vanity traffic. We engineer measurable, enquiry-producing systems.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://wa.me/971545866094?text=Hi%20Asif,%20I%20would%20like%20to%20discuss%20an%20AI%20or%20web%20development%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-green-400 transition-all shadow-[0_0_25px_rgba(34,197,94,0.3)] min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4" />
                Speak Directly with Asif
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-all min-h-[48px]"
              >
                About Our Firm <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 21. Frequently Asked Questions ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400 block mb-3">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "Do I need a new website to implement a WhatsApp AI assistant?",
              a: "No. We can integrate an AI assistant with your current website and WhatsApp Business number directly. However, if your existing site is slow or struggles to convert visitors, our combined Web + WhatsApp architecture produces significantly higher enquiry rates."
            },
            {
              q: "How does the WhatsApp AI qualification process work?",
              a: "We train the assistant on your exact service scope, pricing parameters, location details, qualification criteria, and preferred next steps. When a prospect messages, it answers their questions in English or Arabic, captures their contact info, and alerts your team."
            },
            {
              q: "What is the typical investment for a website and AI chatbot package?",
              a: "Our core packages range between AED 2,500 and AED 10,000 depending on website scope, bespoke integrations, and CRM complexity. We provide a transparent, fixed-scope quote during our initial free discovery audit."
            },
            {
              q: "How long does implementation take from start to finish?",
              a: "Timelines depend on project scope and third-party API access. A standard landing page or WhatsApp assistant setup is typically delivered in 2 to 4 weeks, with clear milestone reviews along the way."
            },
            {
              q: "Will our new website be optimized to rank on Google in the UAE?",
              a: "Yes. Every website is built on Next.js with semantic HTML5, localized Schema.org metadata, fast Core Web Vitals, and keyword architecture targeting commercial Dubai and Sharjah search queries from day one."
            }
          ].map((faq, i) => (
            <details key={i} className="group border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden">
              <summary className="p-6 sm:p-8 cursor-pointer list-none flex justify-between items-center hover:bg-white/[0.04] transition-colors">
                <span className="text-lg sm:text-xl md:text-2xl font-serif text-white pr-4 leading-snug">{faq.q}</span>
                <ChevronRight className="w-5 h-5 text-white/50 group-open:rotate-90 transition-transform flex-shrink-0" role="img" aria-label="Toggle Answer icon" />
              </summary>
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-white/85 font-normal leading-relaxed text-base sm:text-lg">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── 22. High-Contrast Final Call to Action ── */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-white text-neutral-950 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 bg-neutral-950 rounded-full flex items-center justify-center text-white shadow-2xl">
            <Phone className="w-7 h-7 sm:w-8 sm:h-8" role="img" aria-label="Phone icon" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight mb-6 text-neutral-950"
          >
            Ready for More Website and <br className="hidden sm:block" />
            <span className="italic text-neutral-800">WhatsApp Enquiries?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-neutral-900 font-medium text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Book your free 15-minute audit. We will evaluate your website, WhatsApp response flow, and lead handoff, then deliver practical steps to increase your conversion velocity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton>
              <Link
                href="/free-growth-audit"
                className="bg-neutral-950 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm border border-neutral-950 hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-2xl min-h-[48px]"
              >
                Book Free Growth Audit <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://wa.me/971545866094?text=Hi%20Asif,%20I%20would%20like%20to%20book%20a%20free%20growth%20audit%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-neutral-950 border border-neutral-950/40 hover:border-neutral-950 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-100 transition-all flex items-center justify-center gap-3 min-h-[48px]"
              >
                WhatsApp Us Now <MessageSquare className="w-4 h-4" role="img" aria-label="WhatsApp icon" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── 23. Footer SEO Link Hub ── */}
      <section className="py-16 sm:py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center text-white/80 text-xs sm:text-sm uppercase tracking-wider font-semibold text-center">
            <Link href="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/services/web-design-dubai" className="hover:text-white transition-colors">Web Design Company Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/real-estate-digital-solutions-uae" className="hover:text-white transition-colors">Real Estate Digital Solutions UAE</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/ai-chatbots-dubai" className="hover:text-white transition-colors">WhatsApp AI Chatbot Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/ai-seo-agency-dubai" className="hover:text-white transition-colors">AI SEO Agency Dubai</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/ai-property-management-uae" className="hover:text-white transition-colors">AI Property Management UAE</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/real-estate" className="hover:text-white transition-colors">AI Real Estate Automation</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/arabic-ai-hub" className="hover:text-white transition-colors">Arabic AI Hub</Link>
          </div>
        </div>
      </section>
    </div>
  );
}


