"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Menu, X, Code, Megaphone, PenTool, ChevronDown } from "lucide-react";
import { trackEvent } from "../utils/analytics";

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });
const KhalidChatbot = dynamic(() => import("./KhalidChatbot"), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
  const [dubaiTime, setDubaiTime] = useState<string>("");

  useEffect(() => {
    setDubaiTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit" }));
  }, []);

  const toggleAccordion = (name: string) => {
    setOpenMobileAccordion((prev) => (prev === name ? null : name));
  };

  const [footerEmail, setFooterEmail] = useState("");
  const [footerBrief, setFooterBrief] = useState("");
  const [isBriefSubmitting, setIsBriefSubmitting] = useState(false);
  const [isBriefSuccess, setIsBriefSuccess] = useState(false);
  const [briefError, setBriefError] = useState("");

  const handleBriefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim() || !footerBrief.trim() || isBriefSubmitting) return;
    
    setIsBriefSubmitting(true);
    setBriefError("");
    
    try {
      const accessKey = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "").trim();
      if (!accessKey) {
        throw new Error("Brief delivery service is currently unavailable. Please reach us via WhatsApp (+971 54 586 6094).");
      }

      const submissionData = new FormData();
      submissionData.append("access_key", accessKey);
      submissionData.append("email", footerEmail);
      submissionData.append("message", footerBrief);
      submissionData.append("subject", `New Project Brief from Footer`);
      submissionData.append("from_name", "Asif Digital Brief Intake");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.message || "Submission failed");

      // Confirmed GA4 conversion tracking: single generate_lead event
      trackEvent("generate_lead", {
        form_name: "Footer Project Brief",
        lead_type: "footer_brief"
      });

      setIsBriefSuccess(true);
      setFooterEmail("");
      setFooterBrief("");
      setTimeout(() => setIsBriefSuccess(false), 6000);
    } catch (error: any) {
      console.error("Brief Error:", error);
      setBriefError(error?.message || "Failed to submit brief. Please connect via WhatsApp (+971 54 586 6094).");
    } finally {
      setIsBriefSubmitting(false);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMobileAccordion(null);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Sovereign AI", path: "/sovereign-sales-agent" },
    { name: "Strategic Pillars", path: "/services" },
    { name: "Arabic AI", path: "/arabic-ai-hub" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Free Tools", path: "/tools" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-green-500/30 font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-6 focus:py-3 focus:rounded-full focus:font-bold">
        Skip to Content
      </a>
      <WhatsAppButton />
      <KhalidChatbot />

      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/10 transition-colors">
        {/* Sovereign Status Bar */}
        <div className="hidden sm:flex bg-[#0a0a0a]/80 border-b border-white/5 py-1.5 px-6 md:px-12 justify-between items-center text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-green-500/80">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Sovereign Network: Active
            </span>
            <span className="text-white/20">|</span>
            <span className="italic">Dubai Node: DXB-PRIME</span>
          </div>
          <div className="flex items-center gap-4">
            <span suppressHydrationWarning>{dubaiTime || '05:00 PM'} GST</span>
            <span className="text-white/20">|</span>
            <Link href="/contact" className="hover:text-white transition-colors">Project Intake</Link>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 md:px-12">
          <Link href="/" aria-label="Asif Digital Home" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/images/asif-digital-ad-mark.png"
              alt=""
              aria-hidden="true"
              width={36}
              height={36}
              priority
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
            />
            <span className="text-[20px] sm:text-[23px] leading-none font-serif font-bold tracking-tight text-white">
              Asif Digital.
            </span>
          </Link>
          
          <button
            className="md:hidden z-50 p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.16em]">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group">
              <Link
                href={link.path}
                aria-label={`Navigate to ${link.name}`}
                className="relative text-white/75 hover:text-white transition-colors py-3 inline-block"
              >
                {link.name}
                <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              
              {/* Sovereign AI Dropdown - 3-Column Streamlined Mega Menu (4 Curated Outcomes per Column) */}
              {link.name === "Sovereign AI" && (
                <div style={{ mixBlendMode: 'normal' }} className="absolute left-1/2 -translate-x-1/2 top-full w-[960px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-[100] pt-6">
                  <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden font-sans normal-case tracking-normal text-left p-6 grid grid-cols-3 gap-6">
                    {/* Column 1: Enterprise Automation */}
                    <div className="space-y-1 border-r border-white/10 pr-5">
                      <div className="pb-2.5 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block">Enterprise Automation</span>
                        <span className="px-1.5 py-0.5 text-[8.5px] font-mono font-bold tracking-wider rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          WORKFLOWS
                        </span>
                      </div>
                      <Link 
                        href="/business-task-automation-dubai" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">Business Task Automation</div>
                        <div className="text-[11px] text-white/50">Lead sync, invoice OCR &amp; spreadsheet fixes</div>
                      </Link>
                      <Link 
                        href="/ai-chatbots-dubai" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">WhatsApp AI &amp; Chatbots</div>
                        <div className="text-[11px] text-white/50">24/7 bilingual inquiry qualification &amp; routing</div>
                      </Link>
                      <Link 
                        href="/ai-app-development-dubai" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">Custom AI App Development</div>
                        <div className="text-[11px] text-white/50">Next.js portals &amp; custom software tools</div>
                      </Link>
                      <Link 
                        href="/arabic-ai-hub" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">Arabic AI Solutions Hub</div>
                        <div className="text-[11px] text-white/50">Bilingual Khaleeji &amp; MSA conversational models</div>
                      </Link>
                      <Link href="/services" className="text-emerald-400 hover:text-emerald-300 transition-all text-[12px] font-mono font-medium block pt-3 hover:translate-x-1 duration-200">
                        View All Automation Services →
                      </Link>
                    </div>

                    {/* Column 2: Client Acquisition & Growth */}
                    <div className="space-y-1 border-r border-white/10 pr-5">
                      <div className="pb-2.5 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block">Client Acquisition</span>
                        <span className="px-1.5 py-0.5 text-[8.5px] font-mono font-bold tracking-wider rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          PERFORMANCE
                        </span>
                      </div>
                      <Link 
                        href="/services/interior-fitout-lead-generation-uae" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">Fitout &amp; Renovation Lead Gen</div>
                        <div className="text-[11px] text-white/50">Direct contractor enquiries with 0% commission</div>
                      </Link>
                      <Link 
                        href="/ai-seo-agency-dubai" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">AI SEO, AEO &amp; Search Visibility</div>
                        <div className="text-[11px] text-white/50">Rank in Google AI Overviews &amp; Perplexity</div>
                      </Link>
                      <Link 
                        href="/ai-ppc-agency-dubai" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">AI PPC &amp; Meta Tracking</div>
                        <div className="text-[11px] text-white/50">CAPI, offline conversions &amp; ad waste reduction</div>
                      </Link>
                      <Link 
                        href="/free-growth-audit" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-emerald-400">Free Growth &amp; AI Audit</div>
                        <div className="text-[11px] text-white/50">1-page diagnostic action plan in 2 days</div>
                      </Link>
                      <Link href="/services" className="text-emerald-400 hover:text-emerald-300 transition-all text-[12px] font-mono font-medium block pt-3 hover:translate-x-1 duration-200">
                        View Growth Services →
                      </Link>
                    </div>

                    {/* Column 3: Real Estate Technology */}
                    <div className="space-y-1">
                      <div className="pb-2.5 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block">Real Estate Tech</span>
                        <Link href="/real-estate" className="text-[10px] font-mono text-white/50 hover:text-emerald-300">Pillar Hub</Link>
                      </div>
                      <Link 
                        href="/real-estate" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">Real Estate AI Hub</div>
                        <div className="text-[11px] text-white/50">Master overview for brokerages &amp; developers</div>
                      </Link>
                      <Link 
                        href="/real-estate-crm-dubai" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">Real Estate CRM &amp; Lead Routing</div>
                        <div className="text-[11px] text-white/50">60-second speed-to-lead &amp; broker SLA</div>
                      </Link>
                      <Link 
                        href="/real-estate/portal-lead-integration-dubai" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">Portal Lead Integration</div>
                        <div className="text-[11px] text-white/50">Instant Bayut &amp; Property Finder webhooks</div>
                      </Link>
                      <Link 
                        href="/ai-property-management-uae" 
                        className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-2.5 hover:pl-1.5 duration-200 border-b border-white/5"
                      >
                        <div className="font-semibold text-white">Property Management AI</div>
                        <div className="text-[11px] text-white/50">Tenant renewals &amp; WhatsApp ticket dispatch</div>
                      </Link>
                      <Link href="/real-estate" className="text-emerald-400 hover:text-emerald-300 transition-all text-[12px] font-mono font-medium block pt-3 hover:translate-x-1 duration-200">
                        View Real Estate Solutions →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Mega Menu Dropdown - Strategic Pillars */}
              {link.name === "Strategic Pillars" && (
                <div style={{ mixBlendMode: 'normal' }} className="absolute left-1/2 -translate-x-1/2 top-full w-[960px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-[100] pt-6">
                  <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden font-sans normal-case tracking-normal text-left p-6 grid grid-cols-3 gap-6">
                    
                    {/* Web Column */}
                    <div className="space-y-1 border-r border-white/10 pr-5">
                      <div className="pb-2.5 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5 text-emerald-400" role="img" aria-label="Code Icon" /> Web &amp; Systems
                        </span>
                        <span className="px-1.5 py-0.5 text-[8.5px] font-mono font-bold tracking-wider rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ENGINEERING
                        </span>
                      </div>
                      <Link href="/ai-app-development-dubai" className="text-emerald-400 hover:text-emerald-300 transition-all text-[13.5px] font-semibold block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        AI App Development Dubai
                      </Link>
                      <Link href="/custom-crm-development-dubai" className="text-white/90 hover:text-emerald-300 transition-all text-[13.5px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Custom CRM Development Dubai
                      </Link>
                      <Link href="/services/web-design-dubai" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Web Design Dubai
                      </Link>
                      <Link href="/web-design-sharjah" className="text-emerald-400 hover:text-emerald-300 transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Web Design Sharjah
                      </Link>
                      <Link href="/services/web-development-dubai-uae" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Web Development
                      </Link>
                      <Link href="/services/ecommerce-website-development-dubai" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Ecommerce Websites
                      </Link>
                      <Link href="/services/web-hosting-uae" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Web Hosting UAE
                      </Link>
                      <Link href="/services/website-maintenance-support-dubai" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Website Support &amp; SLA
                      </Link>
                      <Link href="/services/web-development-dubai-uae" className="text-emerald-400 hover:text-emerald-300 transition-all text-[12px] font-mono font-medium block pt-2.5 hover:translate-x-1 duration-200">
                        View All Web Engineering →
                      </Link>
                    </div>
                    
                    {/* Digital Marketing Column */}
                    <div className="space-y-1 border-r border-white/10 pr-5">
                      <div className="pb-2.5 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
                          <Megaphone className="w-3.5 h-3.5 text-emerald-400" role="img" aria-label="Megaphone Icon" /> Performance Media
                        </span>
                        <span className="px-1.5 py-0.5 text-[8.5px] font-mono font-bold tracking-wider rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          MEDIA
                        </span>
                      </div>
                      <Link href="/ai-ppc-agency-dubai" className="text-emerald-400 hover:text-emerald-300 transition-all text-[13.5px] font-semibold block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        AI PPC Agency
                      </Link>
                      <Link href="/ai-seo-agency-dubai" className="text-emerald-400 hover:text-emerald-300 transition-all text-[13.5px] font-semibold block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        AI SEO &amp; AEO Agency
                      </Link>
                      <Link href="/services/ppc-google-ads-agency-dubai" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Traditional PPC Ads
                      </Link>
                      <Link href="/services/seo-agency-dubai-sharjah-uae" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Traditional SEO
                      </Link>
                      <Link href="/services/social-media-management-dubai-uae" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Social Media Management
                      </Link>
                      <Link href="/services" className="text-emerald-400 hover:text-emerald-300 transition-all text-[12px] font-mono font-medium block pt-3 hover:translate-x-1 duration-200">
                        View All Media Solutions →
                      </Link>
                    </div>

                    {/* Creative Column */}
                    <div className="space-y-1">
                      <div className="pb-2.5 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
                          <PenTool className="w-3.5 h-3.5 text-emerald-400" role="img" aria-label="Pen Tool Icon" /> Creative &amp; Brand
                        </span>
                        <span className="px-1.5 py-0.5 text-[8.5px] font-mono font-bold tracking-wider rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          IDENTITY
                        </span>
                      </div>
                      <Link href="/services/branding-agency-dubai-sharjah" className="text-white/90 hover:text-white transition-all text-[13.5px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Brand Strategy
                      </Link>
                      <Link href="/services/graphic-design-agency-dubai-sharjah" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Graphic Design
                      </Link>
                      <Link href="/services/ui-ux-design-agency-dubai" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        UI/UX Design
                      </Link>
                      <Link href="/services/web-development-dubai-uae" className="text-white/85 hover:text-white transition-all text-[13px] font-medium block py-1.5 hover:pl-1.5 duration-200 border-b border-white/5">
                        Creative Web Design
                      </Link>
                      <Link href="/portfolio" className="text-emerald-400 hover:text-emerald-300 transition-all text-[12px] font-mono font-medium block pt-3 hover:translate-x-1 duration-200">
                        View Creative Portfolio →
                      </Link>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        </div>
      </header>

      {/* Dedicated Mobile Navigation Drawer (Zero Emojis, Single-Open Accordions, Min 44-48px Touch Targets) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#070707] flex flex-col md:hidden overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          {/* Mobile Drawer Top Bar */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0a0a0a] shrink-0">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5"
              aria-label="Asif Digital Home"
            >
              <Image
                src="/images/asif-digital-ad-mark.png"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className="w-7 h-7 object-contain"
              />
              <span className="text-[19px] leading-none font-serif font-bold tracking-tight text-white">
                Asif Digital.
              </span>
            </Link>
            
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setOpenMobileAccordion(null);
              }}
              className="p-2.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 overscroll-contain">
            {/* Quick Links */}
            <div className="space-y-1 pb-3 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                About
              </Link>
            </div>

            {/* AI Solutions Accordions (Single-Open Controlled State) */}
            <div className="space-y-2 pb-3 border-b border-white/10">
              <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold mb-2">
                AI Systems &amp; Solutions
              </div>

              {/* Accordion 1: Enterprise Automation */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion("enterprise")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left text-[15px] font-semibold text-white hover:text-emerald-300 transition-colors py-2"
                  aria-expanded={openMobileAccordion === "enterprise"}
                >
                  <span>Enterprise Automation</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${openMobileAccordion === "enterprise" ? "rotate-180 text-emerald-400" : ""}`} />
                </button>
                {openMobileAccordion === "enterprise" && (
                  <div className="pl-3 py-2 space-y-1 border-l border-emerald-500/30 ml-2">
                    <Link href="/business-task-automation-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                      Business Task Automation
                    </Link>
                    <Link href="/ai-chatbots-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      WhatsApp AI &amp; Chatbots
                    </Link>
                    <Link href="/ai-app-development-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Custom AI App Development
                    </Link>
                    <Link href="/arabic-ai-hub" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Arabic AI Solutions Hub
                    </Link>
                    <Link href="/services" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[13px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors pt-1">
                      View All Automation Services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 2: Client Acquisition & Growth */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion("growth")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left text-[15px] font-semibold text-white hover:text-emerald-300 transition-colors py-2"
                  aria-expanded={openMobileAccordion === "growth"}
                >
                  <span>Client Acquisition &amp; Growth</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${openMobileAccordion === "growth" ? "rotate-180 text-emerald-400" : ""}`} />
                </button>
                {openMobileAccordion === "growth" && (
                  <div className="pl-3 py-2 space-y-1 border-l border-emerald-500/30 ml-2">
                    <Link href="/services/interior-fitout-lead-generation-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                      Fitout &amp; Renovation Lead Gen
                    </Link>
                    <Link href="/ai-seo-agency-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI SEO, AEO &amp; Search Visibility
                    </Link>
                    <Link href="/ai-ppc-agency-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      AI PPC &amp; Performance Ads
                    </Link>
                    <Link href="/free-growth-audit" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Free Growth &amp; AI Audit
                    </Link>
                    <Link href="/services" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[13px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors pt-1">
                      View Growth Services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 3: Real Estate Technology */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion("realestate")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left text-[15px] font-semibold text-white hover:text-emerald-300 transition-colors py-2"
                  aria-expanded={openMobileAccordion === "realestate"}
                >
                  <span>Real Estate Tech</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${openMobileAccordion === "realestate" ? "rotate-180 text-emerald-400" : ""}`} />
                </button>
                {openMobileAccordion === "realestate" && (
                  <div className="pl-3 py-2 space-y-1 border-l border-emerald-500/30 ml-2">
                    <Link href="/real-estate" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Real Estate AI Hub
                    </Link>
                    <Link href="/real-estate-crm-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Real Estate CRM &amp; Lead Routing
                    </Link>
                    <Link href="/real-estate/portal-lead-integration-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Portal Lead Integration
                    </Link>
                    <Link href="/ai-property-management-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Property Management AI
                    </Link>
                    <Link href="/real-estate" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[13px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors pt-1">
                      View Real Estate Solutions →
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 4: Strategic Pillars */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion("pillars")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left text-[15px] font-semibold text-white hover:text-emerald-300 transition-colors py-2"
                  aria-expanded={openMobileAccordion === "pillars"}
                >
                  <span>Strategic Pillars</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${openMobileAccordion === "pillars" ? "rotate-180 text-emerald-400" : ""}`} />
                </button>
                {openMobileAccordion === "pillars" && (
                  <div className="pl-3 py-2 space-y-1 border-l border-emerald-500/30 ml-2">
                    <Link href="/ai-app-development-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                      AI App Development Dubai
                    </Link>
                    <Link href="/custom-crm-development-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Custom CRM Development Dubai
                    </Link>
                    <Link href="/services/web-design-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Web Design Dubai
                    </Link>
                    <Link href="/web-design-sharjah" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                      Web Design Sharjah
                    </Link>
                    <Link href="/services/web-development-dubai-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Web Development
                    </Link>
                    <Link href="/services/ecommerce-website-development-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Ecommerce Websites
                    </Link>
                    <Link href="/services/seo-agency-dubai-sharjah-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      SEO &amp; Performance Media
                    </Link>
                    <Link href="/services/branding-agency-dubai-sharjah" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Branding &amp; Design
                    </Link>
                    <Link href="/business-task-automation-dubai" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                      Business Task Automation Dubai
                    </Link>
                    <Link href="/services/interior-fitout-lead-generation-uae" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-emerald-300 transition-colors">
                      Interior Fitout Lead Gen UAE
                    </Link>
                    <Link href="/services" onClick={() => setIsMenuOpen(false)} className="min-h-[44px] flex items-center text-[13px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors pt-1">
                      View All Pillars →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Links */}
            <div className="space-y-1 pb-3 border-b border-white/10">
              <Link
                href="/arabic-ai-hub"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Arabic AI Hub
              </Link>
              <Link
                href="/case-studies"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Case Studies
              </Link>
              <Link
                href="/tools"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Free Tools
              </Link>
              <a
                href="https://expirywatch.asifdigital.agency"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center justify-between text-[15px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>ExpiryWatch (UAE Compliance AI)</span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE
                </span>
              </a>
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="min-h-[44px] flex items-center text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                Insights &amp; Blog
              </Link>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-2 pb-6 space-y-3">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full min-h-[48px] bg-white text-black font-bold rounded-xl flex items-center justify-center text-[12px] uppercase tracking-wider hover:bg-white/90 transition-all shadow-xl"
              >
                Book Strategic Consultation
              </Link>
              <a
                href="https://wa.me/971545866094"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] border border-white/15 bg-white/[0.03] text-white/80 hover:text-white rounded-xl flex items-center justify-center text-[12px] font-mono tracking-wider transition-colors"
              >
                Direct WhatsApp: +971 54 586 6094
              </a>
            </div>
          </div>
        </div>
      )}

      <main
        id="main-content"
        key={pathname}
        className="min-h-screen outline-none"
      >
        <Suspense fallback={<div className="min-h-[40vh]" />}>
          {children}
        </Suspense>
      </main>

      <footer className="py-20 sm:py-24 px-6 md:px-12 border-t border-white/5 mt-16 bg-black relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link href="/" aria-label="Asif Digital Home" className="inline-flex items-center gap-3">
                <Image
                  src="/images/asif-digital-ad-mark.png"
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain shrink-0"
                />
                <span className="text-3xl sm:text-4xl leading-none font-serif font-bold tracking-tight text-white">Asif Digital.</span>
              </Link>
              <p className="text-white/80 font-normal text-sm max-w-xs leading-relaxed">
                Specialized client acquisition and workflow automation systems engineered for UAE enterprises.
              </p>
              <div className="flex gap-3 pt-2">
                {[
                  { name: 'LN', label: 'LinkedIn company page', href: 'https://www.linkedin.com/company/asif-digital-agency/' },
                  { name: 'TW', label: 'X profile', href: 'https://x.com' },
                  { name: 'IG', label: 'Instagram profile', href: 'https://www.instagram.com' }
                ].map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`Visit our ${social.label}`} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all text-xs font-bold group">
                    <span className="group-hover:scale-110 transition-transform">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Section */}
            <div>
              <h4 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/95 font-bold mb-6 font-mono">Navigation</h4>
              <ul className="space-y-3.5">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-white/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Solutions & Direct Contact */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-emerald-400 font-bold mb-5 font-mono">Core Solutions</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/custom-crm-development-dubai" className="text-white/80 hover:text-emerald-300 transition-colors text-sm font-medium block">
                      Custom CRM Development Dubai
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/web-development-dubai-uae" className="text-white/80 hover:text-emerald-300 transition-colors text-sm font-medium block">
                      Custom Web Development UAE
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/interior-fitout-lead-generation-uae" className="text-white/80 hover:text-emerald-300 transition-colors text-sm font-medium block">
                      Interior Fitout Lead Gen UAE
                    </Link>
                  </li>
                  <li>
                    <Link href="/business-task-automation-dubai" className="text-white/80 hover:text-emerald-300 transition-colors text-sm font-medium block">
                      Business Task Automation Dubai
                    </Link>
                  </li>
                  <li>
                    <Link href="/real-estate-digital-solutions-uae" className="text-white/80 hover:text-emerald-300 transition-colors text-sm font-medium block">
                      Real Estate Digital Systems
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-automation-agency-dubai" className="text-white/80 hover:text-emerald-300 transition-colors text-sm font-medium block">
                      AI Automation Agency Dubai
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/expirywatch" className="text-white/80 hover:text-emerald-300 transition-colors text-sm font-medium inline-flex items-center gap-2">
                      <span>ExpiryWatch Compliance AI</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        LIVE
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/95 font-bold mb-4 font-mono">Direct Contact</h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>
                    <a href="https://wa.me/971545866094" className="text-white hover:text-emerald-300 transition-colors font-medium">
                      +971 54 586 6094 (WhatsApp)
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hello@asifdigital.agency" className="text-white/80 hover:text-emerald-300 transition-colors break-all">
                      hello@asifdigital.agency
                    </a>
                  </li>
                  <li className="text-white/60 text-xs leading-relaxed">
                    Muwaileh Commercial, Sharjah, UAE
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div>
              <h4 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/95 font-bold mb-6 font-mono">Quick Project Brief</h4>
              {isBriefSuccess ? (
                <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center text-sm font-normal text-emerald-400">
                  Brief Received. Our team reviews submissions during UAE business hours and connects via email or WhatsApp to discuss next steps.
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleBriefSubmit} aria-label="Quick Project Briefing Form">
                  <div className="relative group">
                    <label htmlFor="footer-email" className="sr-only">Corporate Email</label>
                    <input 
                      id="footer-email"
                      type="email" 
                      placeholder="Corporate Email" 
                      autoComplete="email"
                      required
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                      disabled={isBriefSubmitting}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/70 text-white"
                    />
                  </div>
                  <div className="relative group">
                    <label htmlFor="footer-brief" className="sr-only">Project Brief</label>
                    <textarea 
                      id="footer-brief"
                      placeholder="Tell us about your project or enquiry goals..." 
                      rows={3}
                      required
                      value={footerBrief}
                      onChange={(e) => setFooterBrief(e.target.value)}
                      disabled={isBriefSubmitting}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-white/50 transition-colors resize-none placeholder:text-white/70 text-white"
                    ></textarea>
                  </div>
                  {briefError && (
                    <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs text-center leading-relaxed">
                      {briefError}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isBriefSubmitting}
                    aria-label="Submit your project briefing" 
                    className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-full hover:bg-white/90 transition-all text-xs shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isBriefSubmitting ? "Sending..." : "Submit Brief"}
                  </button>
                </form>
              )}
            </div>
          </div>

<div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xs text-white/70 uppercase tracking-wider font-medium">
              &copy; 2026 Asif Digital &mdash; Intelligent Systems.
            </div>
            <div className="flex gap-8 sm:gap-12 text-xs text-white/70 uppercase tracking-wider font-medium">
              <Link href="/privacy-policy" className="hover:text-white transition-colors" aria-label="Read our Privacy Architecture">Privacy Architecture</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors" aria-label="Review our Legal Framework">Legal Framework</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
