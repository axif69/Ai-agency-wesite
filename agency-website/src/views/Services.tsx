"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Code, Megaphone, ArrowRight, Monitor, ShoppingCart, 
  Server, HeadphonesIcon, Search, MousePointerClick, 
  Bot, Palette, Workflow, Languages, Target, 
  Shield, Database, MessageSquare, Phone
} from "lucide-react";

interface ServiceItem {
  title: string;
  desc: string;
  features: string[];
  link: string;
  icon: React.ReactNode;
  ctaText: string;
}

interface ServiceCategory {
  name: string;
  icon: React.ReactNode;
  subtitle: string;
  services: ServiceItem[];
}

const categories: ServiceCategory[] = [
  {
    name: "Conversion Websites & Digital Platforms",
    icon: <Monitor className="w-5 h-5 text-blue-400" />,
    subtitle: "High-speed corporate websites, custom web applications, and secure digital platforms engineered to turn visitors into enquiries.",
    services: [
      {
        title: "Web Design Dubai",
        desc: "Fast, bespoke company websites built on Next.js to turn local UAE visitors into phone calls, WhatsApp enquiries, and booked consultations.",
        features: ["Bespoke UI/UX", "Mobile-First Design", "Next.js Performance", "Local UAE SEO"],
        link: "/services/web-design-dubai",
        icon: <Monitor className="w-8 h-8" />,
        ctaText: "Explore Web Design"
      },
      {
        title: "Custom Web & Software Development",
        desc: "Custom web portals, client dashboards, and secure internal tools built around your team's exact operational and reporting workflow.",
        features: ["React & Next.js", "API Integrations", "Client Dashboards", "Secure Databases"],
        link: "/services/web-development-dubai-uae",
        icon: <Code className="w-8 h-8" />,
        ctaText: "Explore Web Development"
      },
      {
        title: "Headless & Custom Ecommerce",
        desc: "Conversion-optimized online stores for UAE brands with seamless integrations for local payment gateways including Telr, PayFort, and Stripe.",
        features: ["Shopify & Custom Stores", "UAE Payment Gateways", "Cart Optimization", "Product Schema"],
        link: "/services/ecommerce-website-development-dubai",
        icon: <ShoppingCart className="w-8 h-8" />,
        ctaText: "Explore Ecommerce"
      },
      {
        title: "Managed Hosting & Infrastructure",
        desc: "Regional hosting configurations with regular backups, SSL security setup, uptime monitoring, and documented provider commitments.",
        features: ["Regional Hosting", "Daily Backups", "SSL Certificates", "Uptime Monitoring"],
        link: "/services/web-hosting-uae",
        icon: <Server className="w-8 h-8" />,
        ctaText: "Explore Hosting"
      }
    ]
  },
  {
    name: "WhatsApp & Conversational AI Workflows",
    icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
    subtitle: "Automate initial customer intake, speed up follow-up times, and connect WhatsApp directly into your team's CRM.",
    services: [
      {
        title: "WhatsApp Business Automation",
        desc: "WhatsApp Business Platform integrations. Shared team inboxes, automated customer intake, and fast response times for customer enquiries.",
        features: ["Cloud API Setup", "Shared Team Inbox", "Lead Triage", "CRM Sync"],
        link: "/services/whatsapp-automation-gcc",
        icon: <MessageSquare className="w-8 h-8" />,
        ctaText: "Explore WhatsApp Automation"
      },
      {
        title: "Arabic AI Solutions",
        desc: "Arabic and English conversational workflows designed for UAE customer journeys, with language handling validated for each use case.",
        features: ["Bilingual Support", "UAE Context Handling", "Customer FAQs", "CRM Logging"],
        link: "/arabic-ai-hub",
        icon: <Languages className="w-8 h-8" />,
        ctaText: "Explore Arabic AI Hub"
      },
      {
        title: "AI Automation Agency Dubai",
        desc: "Connect your CRM, email, and internal tools to reduce repetitive manual data entry and keep your sales team focused on closing.",
        features: ["Process Automation", "CRM Integration", "Document Intake", "Team Routing"],
        link: "/ai-automation-agency-dubai",
        icon: <Workflow className="w-8 h-8" />,
        ctaText: "Explore Automation Agency"
      },
      {
        title: "B2B Sales Outreach Workflow",
        desc: "Structured B2B research and outreach preparation that helps sales teams identify relevant UAE companies and draft tailored outreach with human review.",
        features: ["Company Research", "Decision-Maker Signals", "Human Review Queue", "Outreach Drafting"],
        link: "/sovereign-sales-agent",
        icon: <Target className="w-8 h-8" />,
        ctaText: "Explore Sales Workflows"
      }
    ]
  },
  {
    name: "Real Estate Technology & CRM Solutions",
    icon: <BuildingIcon className="w-5 h-5 text-amber-400" />,
    subtitle: "Purpose-built digital systems for UAE property brokerages, developers, and property management operators.",
    services: [
      {
        title: "Real Estate AI Solutions Hub",
        desc: "A comprehensive overview of digital systems connecting WhatsApp intake, property search websites, CRM tracking, and tenant management.",
        features: ["Brokerage Tech Stack", "Portal Connections", "CRM Pipelines", "Tenant Workflows"],
        link: "/real-estate",
        icon: <Bot className="w-8 h-8" />,
        ctaText: "Explore Real Estate Hub"
      },
      {
        title: "AI Solutions for Brokerages",
        desc: "Automated WhatsApp intake, buyer qualification and agent routing for property enquiries across Bayut, Property Finder, and ad campaigns.",
        features: ["Portal Lead Routing", "Buyer Qualification", "Agent Notification", "Viewing Tracking"],
        link: "/ai-real-estate-agencies-dubai",
        icon: <Workflow className="w-8 h-8" />,
        ctaText: "Explore Brokerage AI"
      },
      {
        title: "Real Estate CRM Dubai",
        desc: "Specialized CRM pipelines tracking agency deal milestones from viewing through to DLD trustee office appointments and commission payouts.",
        features: ["Bayut & PF Intake", "DLD Milestone Steps", "Agent Performance", "SLA Follow-up"],
        link: "/real-estate-crm-dubai",
        icon: <Database className="w-8 h-8" />,
        ctaText: "Explore Real Estate CRM"
      },
      {
        title: "AI Property Management UAE",
        desc: "Tenant communication, maintenance intake triage, lease renewal reminders, and document collection with human staff approvals.",
        features: ["Maintenance Triage", "Renewal Reminders", "Staff Approval Gates", "Tenant Portal"],
        link: "/ai-property-management-uae",
        icon: <HeadphonesIcon className="w-8 h-8" />,
        ctaText: "Explore Property Management"
      },
      {
        title: "Real Estate Digital Solutions",
        desc: "Custom property search websites with XML portal syndication for Bayut and Property Finder, off-plan feeds, and CRM middleware.",
        features: ["Property Search Sites", "XML Portal Feeds", "Off-Plan Showcases", "Fast Mobile UX"],
        link: "/real-estate-digital-solutions-uae",
        icon: <Code className="w-8 h-8" />,
        ctaText: "Explore Digital Solutions"
      }
    ]
  },
  {
    name: "Search Growth & Customer Acquisition",
    icon: <Megaphone className="w-5 h-5 text-purple-400" />,
    subtitle: "Targeted customer acquisition through search visibility, performance advertising, and corporate brand positioning.",
    services: [
      {
        title: "AI SEO & Search Visibility",
        desc: "Improve how your business is understood and surfaced across Google, ChatGPT, Perplexity and other AI-powered search experiences.",
        features: ["Entity Architecture", "Local UAE SEO", "Knowledge Graph Schema", "Commercial Citations"],
        link: "/ai-seo-agency-dubai",
        icon: <Search className="w-8 h-8" />,
        ctaText: "Explore AI SEO Agency"
      },
      {
        title: "Paid Media & PPC Management",
        desc: "Performance ad campaigns across Google and Meta Ads managed around cost per qualified inquiry and real customer acquisition.",
        features: ["Google Ads (Search & PMax)", "Meta Lead Campaigns", "CPL Optimization", "Conversion Tracking"],
        link: "/services/ppc-google-ads-agency-dubai",
        icon: <MousePointerClick className="w-8 h-8" />,
        ctaText: "Explore Paid Media"
      },
      {
        title: "Corporate Branding & Identity",
        desc: "Professional brand identity design, bilingual typography, and comprehensive brand guidelines tailored for UAE and GCC corporate markets.",
        features: ["Bilingual Logos", "Brand Guidelines", "Corporate Collateral", "Digital Brand Kits"],
        link: "/services/branding-agency-dubai-sharjah",
        icon: <Palette className="w-8 h-8" />,
        ctaText: "Explore Branding Services"
      }
    ]
  }
];

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
      <path d="M12 10h.01"/><path d="M12 14h.01"/>
      <path d="M16 10h.01"/><path d="M16 14h.01"/>
      <path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  );
}

export default function Services() {
  return (
    <div className="pt-20 bg-[#050505] min-h-screen text-white selection:bg-white/30 font-sans">
      
      {/* ── 1. Hero Section ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/70 font-semibold">
              COMMERCIAL SERVICES &amp; SOLUTIONS
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight mb-6">
            Websites, WhatsApp Automation &amp; <br />
            <span className="italic text-white/70 font-light">AI Systems Built for UAE Businesses.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl leading-relaxed mb-8">
            Explore our core service capabilities. From conversion-focused websites and WhatsApp Business automation to custom CRM workflows and AI search visibility, we build digital infrastructure that turns customer traffic into qualified enquiries.
          </p>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <Link 
              href="/free-growth-audit" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all flex items-center gap-2"
            >
              Request Your Free Growth Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hello%20Asif%20Digital,%20I%20would%20like%20to%20discuss%20services%20for%20my%20business." 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-white/20 text-white/90 px-8 py-4 rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Services Pillars ── */}
      <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="mb-28 last:mb-0">
            <div className="mb-10 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <span>{cat.icon}</span>
                <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white/70 font-mono">
                  {cat.name}
                </h2>
              </div>
              <p className="text-sm md:text-base text-white/50 font-light max-w-3xl">
                {cat.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {cat.services.map((service, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-30px" }} 
                  transition={{ delay: i * 0.06 }} 
                  className="p-8 md:p-10 border border-white/10 rounded-3xl bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/20 transition-all duration-500 group flex flex-col relative overflow-hidden"
                >
                  <div className="mb-6 text-white/30 group-hover:text-white/80 transition-colors">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-serif mb-3 text-white group-hover:translate-x-1 transition-transform duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/60 font-light leading-relaxed mb-6 flex-grow text-sm">
                    {service.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.map((f, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/50">
                        {f}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={service.link} 
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 uppercase tracking-[0.15em] text-[11px] font-bold text-white/80 hover:text-white transition-colors"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── 3. Bottom Commercial Diagnostic CTA ── */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-y border-white/10 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <Shield className="w-12 h-12 text-white/40 mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white">
            Not Sure Which Service Fits Your Current Growth Stage?
          </h2>
          
          <p className="text-base md:text-lg text-white/60 font-light mb-10 leading-relaxed">
            Tell us about your current operational bottleneck—whether it is an outdated website, slow customer response times, or repetitive manual data entry. We will review your public presence and share practical, grounded recommendations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/free-growth-audit" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all shadow-xl"
            >
              Request Your Free Growth Audit
            </Link>
            <a 
              href="https://wa.me/971545866094?text=Hello%20Asif%20Digital,%20I%20would%20like%20to%20discuss%20which%20service%20is%20best%20for%20my%20business." 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-full border border-white/20 text-white font-semibold uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-green-400" /> WhatsApp (+971 54 586 6094)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
