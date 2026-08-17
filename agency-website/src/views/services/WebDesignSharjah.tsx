"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Compass, Eye, Sparkles, CheckCircle2, ArrowRight, 
  Layers, Smartphone, Globe, Shield, PhoneCall,
  BarChart3, Clock, MapPin, Building2, HelpCircle
} from "lucide-react";
import Link from "next/link";

export default function WebDesignSharjah() {
  // Interactive Local Inquiry Estimator State
  const [monthlyWebsiteVisitors, setMonthlyWebsiteVisitors] = useState(3500);
  const [leadConversionRate, setLeadConversionRate] = useState(1.2); // %
  const [averageDealSize, setAverageDealSize] = useState(12000); // AED

  // Calculations
  const currentMonthlyLeads = Math.round(monthlyWebsiteVisitors * (leadConversionRate / 100));
  const optimizedConversionRate = 4.2; // Sharjah custom UI + WhatsApp CTA benchmark
  const optimizedMonthlyLeads = Math.round(monthlyWebsiteVisitors * (optimizedConversionRate / 100));
  const additionalMonthlyLeads = Math.max(0, optimizedMonthlyLeads - currentMonthlyLeads);
  const estimatedNewRevenue = additionalMonthlyLeads * averageDealSize * 0.2; // Assuming 20% lead-to-close rate

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Web Design Sharjah",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/web-design-sharjah",
    "telephone": "+971545866094",
    "priceRange": "AED 6,500 - AED 45,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Sharjah", "Muwaileh Commercial", "SAIF Zone", "Al Majaz", "Industrial Area Sharjah", "Dubai", "UAE"],
    "description": "Premium Web Design and custom website development in Sharjah. Designed for Muwaileh, SAIF Zone, and Sharjah commercial businesses to maximize local buyer trust, mobile speed, and direct WhatsApp inquiries."
  };

  const faqData = [
    {
      q: "Why should a Sharjah business choose a local web design agency over an overseas freelancer?",
      a: "Sharjah's business ecosystem—spanning Muwaileh Commercial, SAIF Zone, Al Majaz, and the Industrial Areas—demands a deep understanding of local B2B purchasing habits, bilingual Arabic/English cultural nuances, and instant WhatsApp communication channels. An overseas freelancer builds generic templates with broken Arabic layouts and zero local support. Asif Digital operates right here in Sharjah, providing face-to-face strategic alignment and direct phone access on +971 54 586 6094."
    },
    {
      q: "How does a custom website design help my Sharjah company generate more phone and WhatsApp inquiries?",
      a: "Most old business websites fail because they hide contact information behind complicated forms and load slowly on mobile phones. We engineer conversion-first layouts featuring sticky 1-tap WhatsApp consultation buttons, clickable phone numbers, clear value propositions in the first 3 seconds, and friction-free inquiry forms tailored for UAE procurement managers."
    },
    {
      q: "Do you design websites in both Arabic and English?",
      a: "Yes. Every website we build for the Sharjah and UAE market is available in full native bilingual format. We program dedicated Right-to-Left (RTL) stylesheets, use refined Arabic typography, and ensure seamless language toggles that preserve Google Search rankings across both English and Arabic search terms."
    },
    {
      q: "What industries in Sharjah do you specialize in?",
      a: "We have extensive experience designing high-converting digital platforms for Sharjah's key commercial sectors: Manufacturing & Industrial Equipment, Real Estate & Property Developers, Logistics & Freight Forwarding (SAIF Zone / Hamriyah), B2B Wholesale & Trading, Healthcare Clinics, and Professional Legal & Accounting Consultancies."
    },
    {
      q: "How fast will our new Sharjah website load on smartphones?",
      a: "Our custom Next.js and high-performance layouts achieve sub-1.0 second load times across Etisalat and du 5G mobile networks. We guarantee 90+ scores on Google PageSpeed Insights by compressing images, removing bloated plugins, and utilizing local UAE Content Delivery Networks (CDNs)."
    },
    {
      q: "Will our website be optimized to rank on Google for Sharjah search terms?",
      a: "Yes. Every website includes comprehensive on-page Local SEO architecture: Google Business Profile (GMB) schema markup, localized title tags, structured meta descriptions, geographical breadcrumbs, and location-targeted service silos (e.g. Web Design Sharjah, Industrial Suppliers Sharjah)."
    },
    {
      q: "What is the typical timeline to design and launch a custom website in Sharjah?",
      a: "A standard corporate brochure or service website takes between 2 to 4 weeks from initial wireframe approval to live launch. Complex e-commerce stores or custom customer portals generally take 4 to 7 weeks."
    },
    {
      q: "Can we easily update text, photos, and team members after the website is launched?",
      a: "Absolutely. We deliver a clean, intuitive Content Management System (CMS) that allows your team to easily edit text, publish blog articles, update service prices, and add new photos without writing a single line of code. We also provide complete training."
    },
    {
      q: "Do you include corporate email setup and high-speed UAE web hosting?",
      a: "Yes. We configure business email addresses (e.g. info@yourcompany.ae), set up SSL security certificates, and deploy your website on high-speed cloud infrastructure with daily automated backups and 99.99% uptime guarantees."
    },
    {
      q: "Are there any hidden recurring agency fees?",
      a: "No. Our pricing is completely transparent. Once your project is paid in full, you own 100% of your website, design files, and domain. We offer optional monthly maintenance and SEO growth packages, but there are no mandatory lock-in contracts."
    },
    {
      q: "Can we integrate an AI chatbot or automated booking system into our Sharjah website?",
      a: "Yes. We can integrate bilingual AI conversational chatbots that answer customer questions 24/7 in both English and Gulf Arabic, capture verified lead details, and book consultation meetings directly into your team's calendar."
    },
    {
      q: "How do we schedule a meeting or consultation with Asif Digital in Sharjah?",
      a: "You can call our direct strategy desk at +971 54 586 6094, send a WhatsApp message, or submit an inquiry through our contact page. We are based in Muwaileh Commercial, Sharjah, and can meet at your office or host a digital strategy session."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Plan and Launch a High-Converting Commercial Website in Sharjah",
    "description": "The strategic roadmap for businesses in Sharjah to create an authoritative, bilingual web presence that converts local traffic into high-value B2B deals.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Local Market & Competitor Audit",
        "text": "We analyze your Sharjah competitors, target customer search keywords, and identify conversion opportunities in your specific industry."
      },
      {
        "@type": "HowToStep",
        "name": "Bilingual UX & Visual Wireframing",
        "text": "We craft mobile-first page layouts, bilingual typography systems, and high-visibility WhatsApp/call conversion pathways."
      },
      {
        "@type": "HowToStep",
        "name": "Custom UI Design & Asset Production",
        "text": "We design high-resolution custom graphics, authentic brand imagery, and clear service value propositions."
      },
      {
        "@type": "HowToStep",
        "name": "High-Speed Coding & Local SEO Setup",
        "text": "We build fast Next.js code, program Google Business Profile schemas, and configure Google Analytics 4 event tracking."
      },
      {
        "@type": "HowToStep",
        "name": "Client Review, Testing & Live Deployment",
        "text": "We conduct cross-device testing, review revisions with your management team, and launch with zero downtime."
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ── 1. Hero Section ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" /> Muwaileh Commercial &bull; SAIF Zone &bull; Sharjah, UAE
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Web Design <br />
            <span className="italic text-white/50 font-normal">Sharjah, UAE.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Outdated, slow-loading websites drive valuable Sharjah clients straight to your competitors. We design elegant, bilingual, high-speed corporate websites that build instant credibility, rank on Google UAE, and generate steady phone and WhatsApp inquiries.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Get a Free Sharjah Design Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Local Market Proof Metrics ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "100%", label: "Local Sharjah Presence", sub: "Muwaileh Commercial Office" },
            { metric: "sub-1.0s", label: "Mobile Speed on 5G", sub: "Fast UAE Hosting" },
            { metric: "Bilingual", label: "English & Arabic RTL", sub: "Native Khaleeji UX" },
            { metric: "+300%", label: "WhatsApp Lead Increase", sub: "Conversion-Focused CTAs" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Lead Conversion Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Sharjah ROI Calculator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Estimate Your Website Lead Growth
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              When prospective clients search for commercial products or services in Sharjah, how many actually contact you? Adjust the sliders below to see the impact of a high-converting redesign.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Monthly Website Visitors:</span>
                  <span className="text-white font-bold">{monthlyWebsiteVisitors.toLocaleString()} visits</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="25000" 
                  step="500" 
                  value={monthlyWebsiteVisitors} 
                  onChange={(e) => setMonthlyWebsiteVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Current Inquiries Conversion Rate:</span>
                  <span className="text-white font-bold">{leadConversionRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3.0" 
                  step="0.1" 
                  value={leadConversionRate} 
                  onChange={(e) => setLeadConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Average Commercial Deal Value:</span>
                  <span className="text-white font-bold">AED {averageDealSize.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="100000" 
                  step="2000" 
                  value={averageDealSize} 
                  onChange={(e) => setAverageDealSize(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Display Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Projected Monthly Inquiries
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {optimizedMonthlyLeads} Leads <span className="text-xs font-sans text-white/50">(+{additionalMonthlyLeads} new leads/mo)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Current Leads:</span>
                  <span className="text-white text-sm font-bold">{currentMonthlyLeads} / month</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Estimated Deal Pipeline:</span>
                  <span className="text-emerald-300 text-sm font-bold">+AED {Math.round(estimatedNewRevenue).toLocaleString()} / mo</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Schedule Your Sharjah Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Strategic Comparison Benchmark ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Quality & Results Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Why Sharjah Businesses Partner with Asif Digital
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Service Attribute</th>
                <th className="py-4 px-4 text-white/40">Generic Theme Template</th>
                <th className="py-4 px-4 text-white/40">Overseas Freelancer</th>
                <th className="py-4 px-4 text-white/40">Traditional Dubai Agency</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Sharjah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Local Physical Proximity</td>
                <td className="py-5 px-4 text-red-400">None</td>
                <td className="py-5 px-4 text-red-400">Different Time Zone</td>
                <td className="py-5 px-4 text-yellow-400">Dubai Only (Higher Overheads)</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Muwaileh Commercial, Sharjah</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bilingual Arabic & English</td>
                <td className="py-5 px-4 text-red-400">Google Translate widget</td>
                <td className="py-5 px-4 text-red-400">Broken RTL layout</td>
                <td className="py-5 px-4 text-yellow-400">Extra fee for Arabic</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Native Bilingual RTL Included</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Conversion Architecture</td>
                <td className="py-5 px-4 text-red-400">Static brochure</td>
                <td className="py-5 px-4 text-red-400">No marketing strategy</td>
                <td className="py-5 px-4 text-yellow-400">Standard contact form</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Direct WhatsApp + Call Intake Funnel</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Google SEO Foundation</td>
                <td className="py-5 px-4 text-red-400">Zero optimization</td>
                <td className="py-5 px-4 text-red-400">No local UAE knowledge</td>
                <td className="py-5 px-4 text-yellow-400">Separate SEO contract</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Built-in Local Sharjah Schema + AEO</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Direct Phone Support</td>
                <td className="py-5 px-4 text-red-400">No support</td>
                <td className="py-5 px-4 text-red-400">Unreliable messaging</td>
                <td className="py-5 px-4 text-yellow-400">Ticket queue (2-3 days)</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Direct Call on +971 54 586 6094</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Sharjah Commercial Industry Specializations ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Industry Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Tailored Web Solutions for Sharjah Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="w-6 h-6 text-emerald-400" />,
                title: "Industrial & Manufacturing",
                desc: "High-credibility digital catalogs and technical specification sheets designed for Sharjah Industrial Area fabricators, building material suppliers, and machinery distributors."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: "SAIF Zone & Free Zone Traders",
                desc: "International export platforms and B2B inquiry engines engineered for trade companies operating across the Middle East, Africa, and Central Asia."
              },
              {
                icon: <Compass className="w-6 h-6 text-emerald-400" />,
                title: "Real Estate & Contracting",
                desc: "Project showcase websites with interactive property listings, construction portfolio galleries, and direct broker lead routing."
              },
              {
                icon: <Layers className="w-6 h-6 text-emerald-400" />,
                title: "Corporate & Legal Consultancies",
                desc: "Polished, prestigious corporate profiles for Sharjah law firms, business setup advisors, chartered accountants, and management agencies."
              },
              {
                icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
                title: "Clinics & Healthcare Centers",
                desc: "Bilingual medical portals featuring doctor bios, patient appointment booking, and local clinic location maps for patients across Sharjah."
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-400" />,
                title: "Logistics & Fleet Operations",
                desc: "Freight tracking portals and instant quote request tools designed for Sharjah warehousing, road transport, and maritime logistics companies."
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors">
                <div className="mb-5">{f.icon}</div>
                <h3 className="text-xl font-serif text-white mb-3">{f.title}</h3>
                <p className="text-white/70 font-light text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Step-by-Step Delivery Roadmap ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Working Process
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How We Build Your Sharjah Website
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Discovery Call", text: "We review your company goals, key Sharjah competitors, target customer profile, and required feature list." },
            { step: "02", title: "Visual Blueprint", text: "We present a custom wireframe and bilingual layout design tailored to your specific brand identity." },
            { step: "03", title: "Custom Build", text: "We write clean, high-speed code, setup database integrations, and configure bilingual Arabic/English content." },
            { step: "04", title: "Speed & SEO QA", text: "We test mobile responsiveness on iOS/Android, conduct 5G speed audits, and program Google Business schema." },
            { step: "05", title: "Launch & Support", text: "We launch your website, train your team on updates, and provide 30 days of included technical hyper-care." }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-3xl font-serif text-emerald-400 mb-4 font-bold">{s.step}</div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions (12 FAQs) ── */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
              Client Guidance
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything Sharjah business owners need to know about commissioning a custom, high-converting website.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-lg md:text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-emerald-300 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-2xl text-white/40 group-open:rotate-45 group-open:text-emerald-400 transition-transform ml-4 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-white/75 font-light leading-relaxed text-sm md:text-base">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Call to Action ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block font-semibold">
            Based in Sharjah &bull; Serving the Entire UAE
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Elevate Your Business With a Premium Website.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Let's discuss how a custom-designed, lightning-fast website can help your company win bigger contracts in Sharjah, Dubai, and across the UAE.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Request Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
