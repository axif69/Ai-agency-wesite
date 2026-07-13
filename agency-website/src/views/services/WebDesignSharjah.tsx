"use client";

import { motion } from "framer-motion";
import { 
  Building, ArrowRight, ShieldAlert, Cpu, 
  MessageSquare, Phone, CheckCircle, Server, Code, Settings,
  Check, Laptop, Tablet, Smartphone, HelpCircle
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { trackEvent } from "../../utils/analytics";

export default function WebDesignSharjah() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "phone" | "consultation", destinationUrl: string) => {
    let eventName = "whatsapp_click";
    if (type === "phone") eventName = "phone_click";
    if (type === "consultation") eventName = "consultation_click";

    trackEvent(eventName, {
      service_name: "Web Design Sharjah",
      cta_location: ctaLocation,
      cta_text: ctaText,
      link_url: destinationUrl
    });
  };

  const handleFaq = (index: number, question: string) => {
    if (activeFaq !== index) {
      trackEvent("faq_expand", {
        service_name: "Web Design Sharjah",
        cta_text: question
      });
    }
    setActiveFaq(activeFaq === index ? null : index);
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.asifdigital.agency/web-design-sharjah#webpage",
        "url": "https://www.asifdigital.agency/web-design-sharjah",
        "name": "Web Design Company in Sharjah | Custom Website Design",
        "isPartOf": { "@id": "https://www.asifdigital.agency/#website" },
        "breadcrumb": { "@id": "https://www.asifdigital.agency/web-design-sharjah#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.asifdigital.agency/web-design-sharjah#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.asifdigital.agency"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Web Design Sharjah",
            "item": "https://www.asifdigital.agency/web-design-sharjah"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.asifdigital.agency/web-design-sharjah#service",
        "name": "Web Design Company in Sharjah for Websites That Generate Enquiries",
        "description": "Custom web design company in Sharjah. We build fast, mobile-friendly websites that explain your services and generate local inquiries.",
        "provider": { "@id": "https://www.asifdigital.agency/#organization" }
      },
      {
        "@type": "Organization",
        "@id": "https://www.asifdigital.agency/#organization",
        "name": "Asif Digital",
        "url": "https://www.asifdigital.agency/",
        "logo": "https://www.asifdigital.agency/images/logo.png",
        "telephone": "+971 54 586 6094",
        "email": "hello@asifdigital.agency"
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30 font-sans">
      
      {/* Hidden Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* ── 1. Compact Breadcrumb (High Contrast) ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-3 text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/" className="hover:text-green-400 transition-colors">HOME</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95">WEB DESIGN SHARJAH</span>
      </div>

      {/* ── 2. Hero Section (Reduced vertical padding) ── */}
      <section className="px-6 md:px-12 py-10 max-w-7xl mx-auto text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 bg-white/5 border border-white/10 text-green-400 text-[13px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 font-mono">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Sharjah Web Design Agency
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.15] tracking-tight mb-6">
            Web Design Company in Sharjah <br className="hidden md:inline" />
            <span className="italic text-white/50 font-light tracking-normal">for Websites That Generate Enquiries</span>
          </h1>
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 max-w-3xl mx-auto mb-8 font-sans font-light">
            We design fast, mobile-friendly websites that clearly explain your services, appear professionally in search and make it easy for customers to call, WhatsApp or request a quote.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20a%20free%20review%20of%20my%20current%20website." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("Get a Free Website Review", "Hero CTA", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20a%20free%20review%20of%20my%20current%20website.")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white/80 transition-all flex items-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              Get a Free Website Review <MessageSquare className="w-4 h-4 text-black" />
            </a>
            <a 
              href="tel:+971545866094" 
              onClick={() => handleCTA("Call Phone", "Hero CTA", "consultation", "tel:+971545866094")}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white/5 transition-all flex items-center gap-3 h-[52px] font-sans"
            >
              Call +971 54 586 6094 <Phone className="w-4 h-4 text-white" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[13px] text-white/70 tracking-wider font-mono">
            <span>✓ UAE CONTACT NUMBER</span>
            <span>✓ SEARCH-FRIENDLY INFRASTRUCTURE</span>
            <span>✓ BUILT FOR SHARJAH BUSINESSES</span>
          </div>
        </motion.div>
      </section>

      {/* Hero Visual Section - WebP */}
      <section className="px-6 md:px-12 pb-14 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] w-full bg-neutral-900 shadow-2xl">
          <Image 
            src="/images/sharjah_web_design_hero_new.png"
            alt="A modern Sharjah business website displayed across desktop, tablet, and mobile devices with services, contact form and WhatsApp button"
            width={1200}
            height={675}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[13px] font-mono tracking-widest uppercase text-white/80">
            Demonstration — Not Client Data
          </div>
        </div>
      </section>

      {/* ── 3. Immediate Plain-Language Answer ── */}
      <section className="px-6 md:px-12 py-10 max-w-3xl mx-auto text-left">
        <div className="border-l-4 border-green-500 pl-6">
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/95 font-sans font-light">
            We build custom, mobile-responsive websites designed to generate customer inquiries for businesses in Sharjah. By coding your website with a search-friendly technical foundation, we optimize performance and speed, helping you engage local visitors on mobile and desktop viewports.
          </p>
        </div>
      </section>

      {/* ── 4. Responsive Device Layout Mockup (Custom CSS/HTML Diagram) ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">Responsive Layout Structure</h2>
        <p className="text-[17px] text-white/70 mb-8 font-sans font-light leading-[1.7]">
          Our code adjusts automatically to fit every viewport size perfectly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-white/5 bg-white/[0.01] rounded-3xl text-left relative">
          
          {/* Desktop */}
          <div className="p-6 bg-black border border-white/10 rounded-2xl">
            <Laptop className="w-8 h-8 text-green-400 mb-4" />
            <h4 className="text-base font-bold text-white font-sans mb-2">Desktop Viewport (1440px)</h4>
            <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
              Full grid layouts, hovering micro-animations, and high-resolution visuals configured for office laptops and monitors.
            </p>
          </div>

          {/* Tablet */}
          <div className="p-6 bg-black border border-white/10 rounded-2xl">
            <Tablet className="w-8 h-8 text-green-400 mb-4" />
            <h4 className="text-base font-bold text-white font-sans mb-2">Tablet Viewport (768px)</h4>
            <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
              Collapsible sidebar navigation and wrapping grids to guarantee legibility on iPads and vertical displays.
            </p>
          </div>

          {/* Mobile */}
          <div className="p-6 bg-black border border-green-500/20 rounded-2xl shadow-[0_0_15px_rgba(34,197,94,0.05)]">
            <Smartphone className="w-8 h-8 text-green-400 mb-4" />
            <h4 className="text-base font-bold text-green-400 font-sans mb-2">Mobile Viewport (390px)</h4>
            <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
              Large touch targets, readable 16px+ typography, sticky CTAs, and light assets optimized for 4G/5G mobile signals.
            </p>
          </div>

          <div className="col-span-1 md:col-span-3 text-center text-[13px] text-white/50 uppercase tracking-widest font-mono pt-2">
            Demonstration — Not Client Data
          </div>
        </div>
      </section>

      {/* ── 5. Features we can add depending on your website requirements ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-white/70 text-[13px] font-bold tracking-[0.3em] uppercase block mb-3 font-mono">Website Capabilities</span>
            <h2 className="text-2xl md:text-3xl font-serif">Features we can add depending on your website requirements</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div className="flex gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white">WhatsApp Integration Buttons:</strong> Direct client-chat entry points pre-filled with the exact page URL.
                </div>
              </div>
              <div className="flex gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white">Custom Quotation Forms:</strong> Forms built to collect client details, service choices, and file uploads.
                </div>
              </div>
              <div className="flex gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white">Calendar Appointment Booking:</strong> Embedded schedule forms that let clients book slots directly.
                </div>
              </div>
              <div className="flex gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white">Bilingual Arabic/English Layouts:</strong> Dynamic RTL (right-to-left) text formatting for Arabic page displays.
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white">Google Maps Integrations:</strong> Interactive localized maps displaying your office location.
                </div>
              </div>
              <div className="flex gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white">Service & Product Catalogues:</strong> Structured portfolios with sorting filters to view items.
                </div>
              </div>
              <div className="flex gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white">Ecommerce & Online Payments:</strong> Payment integrations supporting local cards and Apple Pay.
                </div>
              </div>
              <div className="flex gap-3 text-[16px] text-white/80 font-sans">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white">Connected CRM Routing:</strong> Pipelines that push lead entries to HubSpot, spreadsheets, or email logs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Website Concepts for Sharjah Businesses (Authority Copy) ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-white/70 text-[13px] font-bold tracking-[0.3em] uppercase block mb-3 font-mono">Custom Layout Concepts</span>
          <h2 className="text-2xl md:text-3xl font-serif">Website Examples for Sharjah Businesses</h2>
          <p className="text-[13px] text-white/50 leading-[1.7] font-mono max-w-xl mx-auto mt-2">
            The following examples represent custom website concepts we can build for businesses in Sharjah, and do not represent active client partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { 
              biz: "Muwaileh Medical Clinic", 
              concept: "Patient Appointment Concept",
              desc: "A clean clinic interface with online booking features, doctor profiles, and Arabic/English language layouts. Designed to decrease call queues."
            },
            { 
              biz: "SAIF Zone Logistics Provider", 
              concept: "B2B Quote Intake Concept",
              desc: "A high-performance portal designed for logistics. Features a custom shipping volume calculator and secure document request upload forms."
            },
            { 
              biz: "Al Majaz Boutique Café", 
              concept: "Visual Booking Concept",
              desc: "A visually styled website optimized for mobile, featuring high-quality photography, table reservations, and digital menu navigation."
            }
          ].map((item, i) => (
            <div key={i} className="p-6 border border-white/10 bg-white/[0.01] rounded-2xl hover:border-green-500/20 transition-colors relative">
              <span className="text-[13px] font-mono text-green-400 block mb-2">{item.concept}</span>
              <h4 className="text-base font-bold text-white font-sans mb-3">{item.biz}</h4>
              <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light mb-4">{item.desc}</p>
              <div className="text-[13px] text-white/40 font-mono mt-auto pt-2 border-t border-white/5">
                Demonstration — Not Client Data
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Before/After Conversion Website Example (Mockup Display) ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-center border-t border-white/5">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">Before and After: A Clearer Customer Journey</h2>
        <p className="text-[17px] text-white/70 mb-8 font-sans font-light leading-[1.7]">
          A comparison of common UX issues on old websites and how a custom redesign improves the visitor experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
          
          {/* Before */}
          <div className="p-6 border border-red-500/20 bg-red-500/[0.01] rounded-3xl relative">
            <span className="absolute -top-3 left-6 px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] font-mono uppercase rounded-full">
              Typical Old Website
            </span>
            <ul className="space-y-3 text-[16px] text-white/80 font-sans font-light mt-2">
              <li className="flex gap-2">❌ <span>Slow loading speeds (7-10 seconds) on 4G.</span></li>
              <li className="flex gap-2">❌ <span>Confusing service text with abstract jargon.</span></li>
              <li className="flex gap-2">❌ <span>Hard-to-find telephone numbers or email links.</span></li>
              <li className="flex gap-2">❌ <span>Generic, slow templates using massive libraries.</span></li>
            </ul>
          </div>

          {/* After */}
          <div className="p-6 border border-green-500/20 bg-green-500/[0.01] rounded-3xl relative shadow-[0_0_15px_rgba(34,197,94,0.05)]">
            <span className="absolute -top-3 left-6 px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-[13px] font-mono uppercase rounded-full">
              Optimized Custom Site
            </span>
            <ul className="space-y-3 text-[16px] text-white/80 font-sans font-light mt-2">
              <li className="flex gap-2">✓ <span>Built for fast mobile loading and Core Web Vitals.</span></li>
              <li className="flex gap-2">✓ <span>Plain-language service outlines.</span></li>
              <li className="flex gap-2">✓ <span>Visible, sticky WhatsApp and calling buttons.</span></li>
              <li className="flex gap-2">✓ <span>Custom coded framework optimized for search.</span></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 text-center text-[13px] text-white/50 uppercase tracking-widest font-mono">
            Demonstration — Not Client Data
          </div>
        </div>
      </section>

      {/* ── 8. Recognisable Customer Problems ── */}
      <section className="py-14 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">Problems You Face with Your Current Website</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Slow Loading Speeds", desc: "Your site takes too long to load on mobile networks, causing visitors to click away in seconds." },
            { title: "Confusing Layouts", desc: "Visitors cannot easily find what services you offer or how to get in contact on your pages." },
            { title: "Weak Local Search Visibility", desc: "Your company doesn't appear when local customers search for your services in Sharjah." }
          ].map((prob, i) => (
            <div key={i} className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl">
              <span className="text-[13px] font-mono text-green-400 block mb-4">PROBLEM 0{i+1}</span>
              <h3 className="text-[18px] font-bold mb-3 font-sans">{prob.title}</h3>
              <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">{prob.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Web Development Packages ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-serif mb-8 text-center font-bold">Web Development Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              { title: "Starter Business Website", desc: "A clean 5-page website detailing your core services and company profile. Perfect for small businesses looking for an online presence." },
              { title: "Lead-Generation Website", desc: "Includes custom inquiry forms, WhatsApp integration triggers, and landing pages optimized for search visibility." },
              { title: "Ecommerce Website", desc: "Online store setups with payment gateway integrations, catalog filtration, and secure checkouts." },
              { title: "Redesign & Speed Updates", desc: "Rebuilding your old website on modern Next.js/React framework to load in under 1.5 seconds and pass core metrics." }
            ].map((pack, i) => (
              <div key={i} className="p-6 border border-white/5 bg-black rounded-xl hover:border-green-500/20 transition-colors">
                <h3 className="font-bold text-white mb-2 text-base font-sans">{pack.title}</h3>
                <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">{pack.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. How It Works Step by Step ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">Our Step-by-Step Process</h2>
        <div className="space-y-6 text-left">
          {[
            "We audit your current website setup and local competition.",
            "We plan a clear, conversion-focused page layout.",
            "Our team writes plain-language copywriting tailored to your services.",
            "We design custom interface wireframes for your approval.",
            "We code your website using Next.js/React for optimal loading speeds.",
            "We set up secure local data hosting settings.",
            "We register your website with Google Search Console."
          ].map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="h-6 w-6 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
              <p className="text-[17px] text-white/80 font-sans font-light leading-[1.7]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 11. Why Choose Asif Digital ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-8 text-center font-bold">Why Work With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">UAE Based Team</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">Reach our office on +971 54 586 6094 for direct support.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">No Generic Templates</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">We build and test custom layout designs specifically for your brand.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Search-Friendly Foundation</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">The website will be built with a search-friendly technical foundation; rankings depend on competition, content, authority, and ongoing SEO.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Honest Copy</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">We do not claim we guarantee rank #1 on Google. We focus on building high-performance, fast sites.</p>
          </div>
        </div>
      </section>

      {/* ── 12. FAQ Accordion ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What should Sharjah businesses look for in a web design company?",
              a: "Look for a team that builds fast mobile layouts, clear calls-to-action, search-friendly page structures, and custom designs suited to your business."
            },
            {
              q: "What areas of Sharjah do you cover?",
              a: "We provide services across Sharjah, including SAIF Zone (Sharjah Airport International Free Zone), Muwaileh Commercial, Al Majaz, Rolla, Al Khan, Al Taawun, and the Sharjah Industrial Areas."
            },
            {
              q: "Do you build bilingual Arabic/English sites?",
              a: "Yes. We design layouts that support both English (left-to-right) and Arabic (right-to-left) text formatting."
            }
          ].map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-6">
              <button
                className="w-full text-left text-[17px] md:text-[18px] font-bold font-sans py-4 flex justify-between items-center hover:text-white/70 transition-colors"
                onClick={() => handleFaq(i, faq.q)}
              >
                <span>{faq.q}</span>
                <span className="text-green-400 text-xl">{activeFaq === i ? "−" : "+"}</span>
              </button>
              {activeFaq === i && (
                <p className="mt-2 text-white/75 font-light leading-[1.7] text-[16px] max-w-3xl font-sans">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 13. Final CTA ── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-white text-black text-center relative overflow-hidden font-sans">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-6xl font-serif tracking-tight mb-8">
            Ready to Build a Website <br />
            <span className="italic text-black/50 font-light tracking-normal">That Drives Real Revenue?</span>
          </h2>
          <p className="text-[17px] md:text-[18px] text-black/60 font-light max-w-xl mx-auto leading-[1.7] mb-12">
            Schedule a 15-minute call. We will review your current website speed and explain how to improve your local search visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20a%20free%20review%20of%20my%20current%20website." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("Get a Free Website Review", "Final CTA Block", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20a%20free%20review%20of%20my%20current%20website.")}
              className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl h-[52px]"
            >
              Get a Free Website Review <MessageSquare className="w-4 h-4 text-white" />
            </a>
            <a 
              href="tel:+971545866094" 
              onClick={() => handleCTA("Call Phone", "Final CTA Block", "phone", "tel:+971545866094")}
              className="bg-transparent text-black border border-black/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-black/5 transition-all flex items-center justify-center gap-3 h-[52px]"
            >
              Call: +971 54 586 6094 <Phone className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 14. Related Service Links (High Contrast) ── */}
      <div className="py-6 bg-black border-t border-white/5 text-center text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/services/web-development-dubai-uae" className="hover:text-green-400 transition-colors mx-4">Web Development</Link>
        <span className="text-white/20">|</span>
        <Link href="/services/ecommerce-website-development-dubai" className="hover:text-green-400 transition-colors mx-4">Ecommerce Websites</Link>
        <span className="text-white/20">|</span>
        <Link href="/services/seo-agency-dubai-sharjah-uae" className="hover:text-green-400 transition-colors mx-4">SEO Agency</Link>
      </div>

      {/* Sticky Mobile CTA (WCAG Compliant) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0ced]/90 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-4 md:hidden font-sans">
        <a 
          href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20a%20free%20review%20of%20my%20current%20website."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCTA("Sticky WhatsApp Mobile", "Sticky Footer", "whatsapp", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20would%20like%20a%20free%20review%20of%20my%20current%20website.")}
          className="flex-1 bg-[#25d366] text-white text-center font-bold uppercase tracking-wider text-[13px] py-3 rounded-xl flex items-center justify-center gap-2 h-11"
        >
          <MessageSquare className="w-4 h-4" /> WhatsApp Us
        </a>
        <a 
          href="tel:+971545866094"
          onClick={() => handleCTA("Sticky Phone Mobile", "Sticky Footer", "phone", "tel:+971545866094")}
          className="flex-1 bg-white text-black text-center font-bold uppercase tracking-wider text-[13px] py-3 rounded-xl flex items-center justify-center gap-2 h-11"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
      </div>

    </div>
  );
}
