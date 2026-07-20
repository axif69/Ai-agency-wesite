"use client";

import { motion } from "framer-motion";
import { 
  Building, ArrowRight, ShieldAlert, Cpu, 
  MessageSquare, Phone, CheckCircle, Server, Code, Settings,
  Check, Globe, Database, Network
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { trackEvent } from "../../utils/analytics";

export default function RealEstateDigitalSolutionsUAE() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCTA = (ctaText: string, ctaLocation: string, type: "whatsapp" | "phone" | "consultation", destinationUrl: string) => {
    let eventName = "whatsapp_click";
    if (type === "phone") eventName = "phone_click";
    if (type === "consultation") eventName = "consultation_click";

    trackEvent(eventName, {
      service_name: "Real Estate Digital Solutions",
      cta_location: ctaLocation,
      cta_text: ctaText,
      link_url: destinationUrl
    });
  };

  const handleFaq = (index: number, question: string) => {
    if (activeFaq !== index) {
      trackEvent("faq_expand", {
        service_name: "Real Estate Digital Solutions",
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
        "@id": "https://www.asifdigital.agency/real-estate-digital-solutions-uae#webpage",
        "url": "https://www.asifdigital.agency/real-estate-digital-solutions-uae",
        "name": "Real Estate Digital Solutions UAE | CRM, Websites & WhatsApp Automation",
        "isPartOf": { "@id": "https://www.asifdigital.agency/#website" },
        "breadcrumb": { "@id": "https://www.asifdigital.agency/real-estate-digital-solutions-uae#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.asifdigital.agency/real-estate-digital-solutions-uae#breadcrumb",
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
            "name": "Real Estate AI Hub",
            "item": "https://www.asifdigital.agency/ai-real-estate-uae"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Real Estate Digital Solutions",
            "item": "https://www.asifdigital.agency/real-estate-digital-solutions-uae"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.asifdigital.agency/real-estate-digital-solutions-uae#service",
        "name": "Real Estate Digital Solutions in the UAE",
        "description": "Connected property websites, lead capture, WhatsApp automation, CRM routing, and reporting systems for UAE real estate teams.",
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
        <Link href="/ai-real-estate-uae" className="hover:text-green-400 transition-colors">REAL ESTATE AI HUB</Link>
        <span className="mx-2 text-white/40">&gt;</span>
        <span className="text-white/95">DIGITAL SOLUTIONS</span>
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
            Property Infrastructure Setup
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.15] tracking-tight mb-6">
            Real Estate Digital Solutions <br className="hidden md:inline" />
            <span className="italic text-white/50 font-light tracking-normal">in the UAE</span>
          </h1>
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/90 max-w-3xl mx-auto mb-8 font-sans font-light">
            Asif Digital builds real estate digital solutions in the UAE for agencies, developers, and property teams that need connected websites, lead capture, WhatsApp automation, CRM routing, and reporting systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Hero CTA", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests.")}
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white/80 transition-all flex items-center gap-3 shadow-2xl h-[52px] font-sans"
            >
              WhatsApp Us <MessageSquare className="w-4 h-4 text-black" />
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
            <span>✓ INTEGRATES PROPERTY WEBSITES</span>
            <span>✓ CUSTOM CRM CONFIGURATIONS</span>
          </div>
        </motion.div>
      </section>

      {/* Hero Visual Section - WebP */}
      <section className="px-6 md:px-12 pb-14 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] w-full bg-neutral-900 shadow-2xl">
          <Image 
            src="/images/real_estate_systems_integration.webp"
            alt="Systems integration diagram showing data flow from a property website and WhatsApp to a central CRM and sales team"
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

      {/* ── 3. Immediate Plain-Language Answer & Explicit Distinction ── */}
      <section className="px-6 md:px-12 py-10 max-w-3xl mx-auto text-left space-y-6">
        <div className="border-l-4 border-green-500 pl-6">
          <p className="text-[17px] md:text-[18px] leading-[1.7] text-white/95 font-sans font-light">
            We build and connect the core digital foundation for your agency—including property search websites, database pipelines, and portal feeds. 
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
          <p className="text-[17px] text-white/70 leading-[1.7] font-sans font-light">
            <strong>Please Note:</strong> This page is about the connected digital foundation (websites, hosting, databases, and integrations). If you are looking for automated conversational lead qualification and sales follow-up, please visit our <Link href="/ai-real-estate-agencies-dubai" className="text-green-400 hover:underline">AI for Real Estate Agencies</Link> page.
          </p>
        </div>
      </section>

      {/* ── 4. Flowchart: Website / Listings / WhatsApp to CRM Flow ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">Example: From Website Enquiry to Sales Team</h2>
        <p className="text-[17px] text-white/70 mb-8 font-sans font-light leading-[1.7]">
          A layout showing how lead sources are consolidated and routed without manual typing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left p-6 border border-white/5 bg-white/[0.01] rounded-3xl relative">
          {[
            { title: "1. Lead Sources", desc: "Buyer submits inquiry on Website, Listing, or WhatsApp link." },
            { title: "2. Secure API Tunnel", desc: "Data is formatted and routed securely through our server connection." },
            { title: "3. CRM Sync", desc: "The contact profile and neighborhood tag are updated in HubSpot/spreadsheets." },
            { title: "4. Broker Dispatch", desc: "Assigned broker receives an immediate notification with client details." }
          ].map((item, i) => (
            <div key={i} className="p-5 bg-black border border-white/10 rounded-2xl relative flex flex-col justify-between">
              <div>
                <h4 className="text-[16px] font-bold text-green-400 mb-2 font-sans">{item.title}</h4>
                <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">{item.desc}</p>
              </div>
              {i < 3 && <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 z-10 bg-black rounded-full p-1 border border-white/10" />}
            </div>
          ))}
          <div className="col-span-1 md:col-span-4 text-center text-[13px] text-white/50 uppercase tracking-widest font-mono pt-2">
            Demonstration — Not Client Data
          </div>
        </div>
      </section>

      {/* ── 5. Visual: The Digital Foundation Layer Diagram ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">The Digital Foundation Layer</h2>
        <p className="text-[17px] text-white/70 mb-8 font-sans font-light leading-[1.7]">
          How we structure your agency's online search-engine presence and database layers.
        </p>

        <div className="p-8 border border-white/10 bg-black rounded-3xl text-left space-y-6 max-w-2xl mx-auto shadow-2xl relative">
          <span className="absolute top-4 right-4 bg-green-500/10 border border-green-500/30 text-green-400 text-[13px] font-mono uppercase px-3 py-1 rounded-full">
            Demonstration — Not Client Data
          </span>
          
          <div className="space-y-4">
            
            {/* Layer 1 */}
            <div className="flex gap-4 items-start border-b border-white/10 pb-4">
              <Globe className="w-6 h-6 text-green-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-base font-bold text-white font-sans">1. Fast Search-Optimized Frontend</h4>
                <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
                  Custom Next.js website code built to load listings instantly, pass Google speed metrics, and rank locally for search intent.
                </p>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="flex gap-4 items-start border-b border-white/10 pb-4">
              <Database className="w-6 h-6 text-green-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-base font-bold text-white font-sans">2. Integrated Listings Database</h4>
                <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
                  A centralized property catalog that synchronizes with XML feeds, ensuring details are updated automatically across channels.
                </p>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="flex gap-4 items-start">
              <Network className="w-6 h-6 text-green-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-base font-bold text-white font-sans">3. Unified API Connections</h4>
                <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
                  Secure tunnels connecting website forms and portal webhooks directly to CRM systems without third-party template dependency.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. Recognisable Customer Problems ── */}
      <section className="py-14 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">Data and System Disorganization</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Manual Data Entry", desc: "Agents waste hours manually copy-pasting lead details from property portals into Excel files or CRM sheets." },
            { title: "Unstructured Client Records", desc: "No single place records client queries, property viewings, or broker assignments, causing confusion." },
            { title: "Slow Website Speeds", desc: "Large property image attachments make agency websites load slowly, losing search engine rankings and mobile visitors." }
          ].map((prob, i) => (
            <div key={i} className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl">
              <span className="text-[13px] font-mono text-green-400 block mb-4">PROBLEM 0{i+1}</span>
              <h3 className="text-[18px] font-bold mb-3 font-sans">{prob.title}</h3>
              <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">{prob.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. What We Build ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-serif mb-6 text-center">What We Build</h2>
          <p className="text-[17px] md:text-[18px] text-white/70 font-sans font-light leading-[1.7] mb-8 text-center">
            We build and connect the digital systems that run your agency. We handle all server setups, API connections, and directory integrations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-6 border border-white/5 bg-black rounded-xl">
              <h3 className="font-bold text-white mb-2 font-sans">High-Performance Agency Sites</h3>
              <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
                Websites built using clean, fast code that load listings and community maps instantly on mobile viewports.
              </p>
            </div>
            <div className="p-6 border border-white/5 bg-black rounded-xl">
              <h3 className="font-bold text-white mb-2 font-sans">CRM and Pipeline Setup</h3>
              <p className="text-[16px] text-white/70 leading-[1.7] font-sans font-light">
                Configure your database structure to automatically capture, categorize, and assign leads as they arrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. How It Works Step by Step ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">How the System Works</h2>
        <div className="space-y-6 text-left">
          {[
            "We audit your current property portals, spreadsheets, and database tools.",
            "We build a fast, search-engine-friendly website for your agency.",
            "We set up secure data tunnels to connect your portal forms to your database.",
            "Incoming lead data is automatically recorded and categorized in one file.",
            "The system alerts the assigned broker immediately.",
            "Client records are kept secure using private hosting protocols.",
            "Your team manages all leads from a single connected system."
          ].map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="h-6 w-6 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
              <p className="text-[17px] text-white/80 font-sans font-light leading-[1.7]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Exact Deliverables ── */}
      <section className="py-14 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-serif mb-8 text-center">What You Receive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 border border-white/5 bg-black rounded-2xl">
              <h3 className="text-xl font-bold mb-4 font-sans">Core Deliverables</h3>
              <ul className="space-y-3 text-[16px] text-white/70 font-sans font-light">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Custom agency property search website</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Unified lead routing configurations</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Custom CRM database pipeline setup</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Automatic listing sync pathways</li>
              </ul>
            </div>
            <div className="p-8 border border-white/5 bg-black rounded-2xl">
              <h3 className="text-xl font-bold mb-4 font-sans">Support & Hosting</h3>
              <ul className="space-y-3 text-[16px] text-white/70 font-sans font-light">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Custom server deployment options</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> 30 days of post-launch technical support</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Admin guide for listing updates</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 shrink-0 mt-1" /> Custom CRM usage training documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Why Choose Asif Digital ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-8 text-center">Why Work With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Local Support</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">Reach our strategist directly on +971 54 586 6094.</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white font-sans">Custom Code</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">We build high-speed custom websites from scratch, avoiding slow layout templates.</p>
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
              <h3 className="text-base font-semibold text-white font-sans">Honest Limits</h3>
            </div>
            <p className="text-[16px] text-white/75 leading-[1.7] font-sans font-light">We construct digital pathways but clarify that data updates depend on third-party portal uptime.</p>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ Accordion ── */}
      <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Can you connect lead portals to our WhatsApp?",
              a: "Yes. We configure pipelines that send lead alerts from property portals directly to your team's WhatsApp numbers."
            },
            {
              q: "Which CRMs do you support?",
              a: "We support integrations for major platforms like HubSpot, Salesforce, Zoho, or custom internal spreadsheets."
            },
            {
              q: "How long does a digital setup take?",
              a: "A standard website setup and CRM integration takes between 2 to 4 weeks depending on the inventory size."
            }
          ].map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-6">
              <button
                className="w-full text-left text-[17px] md:text-[18px] font-sans font-bold py-4 flex justify-between items-center hover:text-white/70 transition-colors"
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

      {/* ── 12. Final CTA ── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-white text-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-6xl font-serif tracking-tight mb-8">
            Bring Your Real Estate <br />
            <span className="italic text-black/50 font-light tracking-normal">Systems Together</span>
          </h2>
          <p className="text-[17px] md:text-[18px] text-black/60 font-light max-w-xl mx-auto leading-[1.7] mb-12 font-sans">
            Schedule a 15-minute call. We will explain how to organize your listing and client databases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-sans">
            <a 
              href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests." 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => handleCTA("WhatsApp Discussion", "Final CTA Block", "consultation", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests.")}
              className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-black/80 transition-all flex items-center justify-center gap-3 shadow-2xl h-[52px]"
            >
              WhatsApp Us <MessageSquare className="w-4 h-4 text-white" />
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

      {/* ── 13. Related Service Links (High Contrast) ── */}
      <div className="py-6 bg-black border-t border-white/5 text-center text-[13px] tracking-wider text-white/70 font-mono">
        <Link href="/ai-real-estate-uae" className="hover:text-green-400 transition-colors mx-4">AI Real Estate Hub</Link>
        <span className="text-white/20">|</span>
        <Link href="/ai-real-estate-agencies-dubai" className="hover:text-green-400 transition-colors mx-4">AI Real Estate Agencies</Link>
        <span className="text-white/20">|</span>
        <Link href="/ai-property-management-uae" className="hover:text-green-400 transition-colors mx-4">AI Property Management</Link>
      </div>

      {/* Sticky Mobile CTA (WCAG Compliant) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0ced]/90 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-4 md:hidden font-sans">
        <a 
          href="https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCTA("Sticky WhatsApp Mobile", "Sticky Footer", "whatsapp", "https://wa.me/971545866094?text=Hi%20Asif%20Digital,%20I%20want%20to%20discuss%20automating%20tenant%20and%20maintenance%20requests.")}
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
