"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PenTool, Image as ImageIcon, Sparkles, Layers, FileText, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, 
  PhoneCall, HelpCircle, Layout, Award, BarChart3
} from "lucide-react";
import Link from "next/link";

export default function GraphicDesign() {
  // Interactive Creative Asset Production Estimator State
  const [monthlyCollateralItems, setMonthlyCollateralItems] = useState(12);
  const [primaryAssetType, setPrimaryAssetType] = useState<"marketing_brochures" | "investor_pitch_decks" | "social_ads">("marketing_brochures");

  // Calculations
  const avgTurnaroundHours = primaryAssetType === "investor_pitch_decks" ? 48 : primaryAssetType === "marketing_brochures" ? 36 : 24;
  const estimatedAgencyCostSavings = monthlyCollateralItems * 350; // Estimated AED saved vs per-item billing
  const productionPacePerWeek = Math.ceil(monthlyCollateralItems / 4);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Graphic Design Agency Dubai Sharjah",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/graphic-design-agency-dubai-sharjah",
    "telephone": "+971545866094",
    "priceRange": "AED 3,500 - AED 18,000 / month",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "High-impact Graphic Design, Commercial Brochure Design, Investor Pitch Decks, and Exhibition Booth Visuals in Dubai and Sharjah. Bilingual Arabic & English layout masters, vector precision, and fast 24-48hr turnaround."
  };

  const faqData = [
    {
      q: "What types of graphic design collateral does Asif Digital specialize in?",
      a: "We specialize in high-stakes commercial graphic design: Corporate Company Profiles (PDF & Print), Investor Pitch Decks (Keynote / PowerPoint), Product Catalogs & Technical Spec Sheets, Exhibition Booth Visuals for Dubai World Trade Centre (DWTC) and Expo City, Annual Reports, Luxury Packaging & Labels, and High-Converting Digital Ad Creatives."
    },
    {
      q: "Do you design collateral in both Arabic and English?",
      a: "Yes. All corporate marketing collateral, brochures, and pitch decks are crafted with native bilingual layout precision. We design balanced dual-language spreads (English on left, Arabic on right) or mirrored flip-cover books, ensuring the Arabic typography matches the prestige and weight of the English copy."
    },
    {
      q: "What is your typical turnaround time for graphic design requests?",
      a: "Standard digital ad graphics, social media banners, and roll-up banners are delivered within 24 to 36 hours. Comprehensive 16-to-32-page corporate brochures, annual reports, or complex investor pitch decks typically take 3 to 5 business days for first draft presentation."
    },
    {
      q: "Do you provide print-ready files with correct color profiles and bleed specifications?",
      a: "Yes, 100%. We provide press-ready master PDF files formatted in CMYK color space with 3mm to 5mm bleeds, crop marks, and embedded vector fonts. We also provide technical specifications for special printing finishes including Spot UV, Gold/Silver Hot Foil Stamping, and Embossing."
    },
    {
      q: "Can you liaise directly with our chosen commercial printing house in Dubai or Sharjah?",
      a: "Yes. We regularly coordinate directly with top commercial printers across Dubai and Sharjah (such as Al Ghurair, Atlas Printing, and Industrial Area print houses) to review pre-press proofs, verify paper stock weights (GSM), and approve color accuracy before final bulk print runs."
    },
    {
      q: "Do you offer on-demand monthly graphic design retainers?",
      a: "Yes! Our Dedicated Design Desk retainer provides your business with unlimited design requests and revisions for a flat monthly fee. You get a dedicated senior graphic designer without the overhead of hiring an in-house full-time employee."
    },
    {
      q: "What file formats will we receive for our finished designs?",
      a: "You receive all master source files: Adobe InDesign (INDD), Illustrator (AI), Photoshop (PSD), editable PowerPoint / Keynote files, Print-Ready PDFs (CMYK), and high-resolution digital exports (PNG, JPG, SVG, WebP)."
    },
    {
      q: "Can you redesign our outdated PowerPoint pitch deck for an upcoming investor meeting?",
      a: "Yes! We specialize in transforming dry, text-heavy slides into compelling, visually persuasive investor decks. We build custom data charts, clear process diagrams, and polished slide layouts that capture investor confidence."
    },
    {
      q: "How many rounds of revisions are included in a project?",
      a: "Our standard project engagements include 3 comprehensive rounds of revisions to ensure every layout, color nuance, and typography detail is flawless. On our monthly design retainers, revisions are completely unlimited."
    },
    {
      q: "Do we own the full copyright to the designs you create?",
      a: "Yes, 100%. You own complete, unrestricted commercial copyright and intellectual property rights to all finalized designs, source files, and illustrations upon final invoice settlement."
    },
    {
      q: "How does your service compare to hiring a freelance graphic designer on Upwork/Fiverr?",
      a: "Freelance platforms often deliver generic Canva templates, stolen copyrighted vectors, and broken Arabic fonts with zero understanding of UAE print standards. Asif Digital provides senior in-house designers, guaranteed UAE print compliance, and direct phone collaboration on +971 54 586 6094."
    },
    {
      q: "How do we submit our first design brief and get started?",
      a: "Call our design desk on +971 54 586 6094 or submit your design brief through our contact form. We will review your project requirements and provide a clear quotation and turnaround schedule within a few hours."
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
    "name": "How to Commission and Produce High-Impact Commercial Print & Digital Collateral in the UAE",
    "description": "The professional 5-stage graphic design and pre-press production protocol for UAE businesses.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Creative Brief & Asset Intake",
        "text": "We gather your text copy, brand guidelines, dimensions, and commercial objectives."
      },
      {
        "@type": "HowToStep",
        "name": "Layout Concept & Visual Hierarchy",
        "text": "We engineer the grid system, bilingual English/Arabic balance, and focal point imagery."
      },
      {
        "@type": "HowToStep",
        "name": "High-Fidelity Design Execution",
        "text": "We produce the complete layout in Adobe InDesign or Illustrator with vector precision."
      },
      {
        "@type": "HowToStep",
        "name": "Client Review & Proof Refinement",
        "text": "We incorporate your feedback and perfect every typographical and visual element."
      },
      {
        "@type": "HowToStep",
        "name": "Pre-Press CMYK Master Export",
        "text": "We generate press-ready PDFs with crop marks, bleeds, and deliver master source files."
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
            <PenTool className="w-4 h-4 text-emerald-400" /> Commercial Graphic Design &bull; Dubai & Sharjah &bull; GCC
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Graphic Design <br />
            <span className="italic text-white/50 font-normal">Agency Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Amateur visual collateral cheapens your company's perceived value. We design world-class company profiles, investor pitch decks, exhibition graphics, and bilingual marketing collateral that command respect and accelerate enterprise deal closing.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Start Your Design Project <ArrowRight className="w-4 h-4" />
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

      {/* ── 2. Performance Metrics Ribbon ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "24-48hr", label: "Standard Turnaround Time", sub: "Fast Commercial Delivery" },
            { metric: "100%", label: "Press-Ready Print Specs", sub: "CMYK, Bleeds & Vector Precision" },
            { metric: "Bilingual", label: "Arabic & English Layouts", sub: "Mirrored Dual-Language Spreads" },
            { metric: "100%", label: "Master Files Included", sub: "Full AI, InDesign & PSD Rights" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Creative Production Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Production Velocity Estimator
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Estimate Collateral Turnaround &amp; Savings
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Select your required monthly design volume and primary asset category to see estimated delivery turnaround and cost savings compared to traditional ad-hoc freelance billing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono block mb-3 font-bold">
                  Primary Collateral Type:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setPrimaryAssetType("marketing_brochures")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${primaryAssetType === "marketing_brochures" ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    📄 Company Profiles
                  </button>
                  <button
                    onClick={() => setPrimaryAssetType("investor_pitch_decks")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${primaryAssetType === "investor_pitch_decks" ? "bg-blue-500/20 border border-blue-400 text-blue-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    📊 Pitch Decks
                  </button>
                  <button
                    onClick={() => setPrimaryAssetType("social_ads")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${primaryAssetType === "social_ads" ? "bg-purple-500/20 border border-purple-400 text-purple-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    🎯 Digital Ads & Banners
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Estimated Monthly Collateral Items:</span>
                  <span className="text-white font-bold">{monthlyCollateralItems} assets / month</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="40" 
                  step="2" 
                  value={monthlyCollateralItems} 
                  onChange={(e) => setMonthlyCollateralItems(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold block mb-1">
                  Estimated Average Turnaround Time
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {avgTurnaroundHours} Hours <span className="text-xs font-sans text-white/50">(~{productionPacePerWeek} assets/week)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block mb-1">Print Pre-Press Ready:</span>
                  <span className="text-emerald-300 text-sm font-bold">100% CMYK Vector</span>
                </div>
                <div>
                  <span className="text-emerald-400 block mb-1">Monthly Cost Savings:</span>
                  <span className="text-emerald-300 text-sm font-bold">~AED {estimatedAgencyCostSavings.toLocaleString()} / mo</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-emerald-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-300 transition-colors"
                >
                  Request Creative Design Retainer <ArrowRight className="w-4 h-4" />
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
            Service Delivery Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Dedicated Senior Design Outperforms Quick Fixes
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Design Quality Dimension</th>
                <th className="py-4 px-4 text-white/40">In-House Junior / Canva</th>
                <th className="py-4 px-4 text-white/40">Print Shop Counter</th>
                <th className="py-4 px-4 text-white/40">Offshore Freelancer</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Senior Design Desk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Visual Sophistication</td>
                <td className="py-5 px-4 text-red-400">Basic Canva look</td>
                <td className="py-5 px-4 text-red-400">Rushed layout</td>
                <td className="py-5 px-4 text-yellow-400">Inconsistent quality</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Bespoke Luxury Commercial Layouts</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Bilingual Arabic Layouts</td>
                <td className="py-5 px-4 text-red-400">Broken text boxes</td>
                <td className="py-5 px-4 text-yellow-400">Basic Arabic fonts</td>
                <td className="py-5 px-4 text-red-400">Cannot read Arabic</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Master Arabic Typography &amp; Mirrored Spreads</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Pre-Press Color Accuracy</td>
                <td className="py-5 px-4 text-red-400">RGB errors / no bleeds</td>
                <td className="py-5 px-4 text-yellow-400">Basic setup</td>
                <td className="py-5 px-4 text-red-400">Frequent print rejections</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Guaranteed CMYK, Bleeds &amp; Pantone Codes</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Turnaround Reliability</td>
                <td className="py-5 px-4 text-yellow-400">Slow internal queue</td>
                <td className="py-5 px-4 text-yellow-400">Walk-in priority</td>
                <td className="py-5 px-4 text-red-400">Ghosting risk</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Guaranteed 24-48hr SLA Turnaround</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Master File Ownership</td>
                <td className="py-5 px-4 text-yellow-400">Canva link only</td>
                <td className="py-5 px-4 text-red-400">Refuses source files</td>
                <td className="py-5 px-4 text-yellow-400">Extra charge</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">100% Master AI, InDesign &amp; PSD Vectors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full Graphic Design Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Complete Collateral Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Commercial Design Deliverables
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-6 h-6 text-emerald-400" />,
                title: "Corporate Company Profiles & Brochures",
                desc: "16-to-64 page master company brochures designed for B2B procurement pitches, complete with high-end typography and bilingual Arabic/English spreads."
              },
              {
                icon: <Award className="w-6 h-6 text-emerald-400" />,
                title: "Investor Pitch Decks & Keynotes",
                desc: "High-impact presentation decks engineered for UAE government bids, venture capital fundraising, and corporate board meetings."
              },
              {
                icon: <Layout className="w-6 h-6 text-emerald-400" />,
                title: "DWTC Exhibition & Event Signage",
                desc: "Large-format 3D exhibition booth backdrops, roll-up banners, and promotional podium graphics for Gitex, Cityscape, and Arab Health."
              },
              {
                icon: <ImageIcon className="w-6 h-6 text-emerald-400" />,
                title: "Product Catalogs & Spec Sheets",
                desc: "Organized, easy-to-navigate technical specification catalogs for UAE industrial fabricators, MEP contractors, and wholesale distributors."
              },
              {
                icon: <Layers className="w-6 h-6 text-emerald-400" />,
                title: "Luxury Packaging & Labeling",
                desc: "Custom box die-lines, foil stamping layouts, bottle labels, and retail packaging designed to stand out on GCC store shelves."
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "High-Converting Digital Ad Creatives",
                desc: "Scroll-stopping social media ad carousels, Google Display banners, and promotional landing page graphics designed to maximize CTR."
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
            Workflow Discipline
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage Graphic Design Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Brief Intake", text: "We review copy, brand assets, dimensions, print requirements, and commercial goals." },
            { step: "02", title: "Layout Structuring", text: "We craft grid systems, bilingual typographical balance, and visual hierarchy." },
            { step: "03", title: "Design Execution", text: "We build vector layouts in Adobe InDesign or Illustrator with pixel precision." },
            { step: "04", title: "Proof Refinement", text: "We incorporate feedback and perfect every typographical and color detail." },
            { step: "05", title: "Pre-Press Export", text: "We deliver press-ready CMYK PDFs with bleeds and complete editable source files." }
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
              Creative Production Knowledge
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE company directors need to know about commercial graphic design, print specifications, and retainers.
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
            Elevate Your Marketing Collateral
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Commission World-Class Commercial Design.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Let's design company profiles, pitch decks, and exhibition collateral that position your company as the undisputed leader in your industry. Speak directly with our senior creative lead in the UAE.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Get Free Design Consultation <ArrowRight className="w-4 h-4" />
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
