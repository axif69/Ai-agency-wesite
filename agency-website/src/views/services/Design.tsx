"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Link from "next/link";
import { ArrowRight, PenTool, Image, Layout, Film, CheckCircle } from "lucide-react";

const services = [
  { icon: <PenTool className="w-6 h-6" />, title: "Marketing Collateral Design", desc: "Brochures, company profiles, flyers, leaflets, trade show materials, and print ads that cut through the noise and tell your story with visual authority. We design for both digital distribution (interactive PDFs) and high-quality print production." },
  { icon: <Image className="w-6 h-6" />, title: "Social Media Content Design", desc: "A consistent, on-brand library of social media templates for Instagram posts, Stories, LinkedIn articles, and TikTok overlays. We design systems—not one-off pieces—so your in-house team can produce on-brand content at scale without needing a designer every time." },
  { icon: <Layout className="w-6 h-6" />, title: "Pitch Decks & Presentation Design", desc: "Investor presentations, corporate decks, and company profiles transformed from dense text slides into visually compelling narratives. Our presentations have supported businesses in raising investment from Dubai venture funds and closing enterprise contracts." },
  { icon: <Film className="w-6 h-6" />, title: "Digital Ad Creatives", desc: "High-CTR Google Display banners, Meta ad images and carousels, LinkedIn Sponsored Content, and programmatic ad formats—designed with conversion psychology baked in. We produce creative sets in all required dimensions and test variants." },
  { icon: <PenTool className="w-6 h-6" />, title: "Infographics & Data Visualisation", desc: "Complex data, processes, and statistics transformed into beautiful, shareable infographics that communicate your authority, drive website engagement, and earn natural backlinks from industry publications." },
  { icon: <Image className="w-6 h-6" />, title: "Annual Reports & Corporate Documents", desc: "Professional annual reports, ESG reports, and corporate governance documents designed to the highest standard—reflecting the credibility and sophistication that institutional stakeholders, government partners, and investors require." },
];

const tools = ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop", "Figma", "After Effects", "Canva Pro (Templates)"];

const heroAssets = [
  { title: "Company Profile", label: "01", gradient: "from-emerald-300/20 via-white/10 to-slate-950", visual: "profile" },
  { title: "Social Creatives", label: "02", gradient: "from-fuchsia-300/20 via-emerald-300/10 to-slate-950", visual: "social" },
  { title: "Pitch Deck", label: "03", gradient: "from-sky-300/20 via-white/10 to-slate-950", visual: "deck" },
  { title: "Ad Visuals", label: "04", gradient: "from-amber-300/20 via-emerald-300/10 to-slate-950", visual: "ad" },
];

export default function Design() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    { q: "What file formats will I receive?", a: "For print, you receive press-ready PDF, AI, and EPS files. For digital use, we provide PNG, SVG, and JPEG files at multiple resolutions. Source files are included on request." },
    { q: "Do you offer ongoing monthly design retainers?", a: "Yes. Our design retainers starting at AED 2,500/month give you a bank of design hours each month for social media graphics, ad creatives, and ad-hoc requests with 48-hour turnaround." },
    { q: "Can you match our existing brand guidelines?", a: "Absolutely. If you have an existing brand identity, we study your guidelines meticulously and produce new assets that are perfectly aligned with your established visual system." },
    { q: "How many revisions do I get?", a: "Your project includes 3 rounds of revisions per deliverable. Additional revision rounds can be accommodated for an agreed hourly rate." },
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_36%),linear-gradient(to_bottom,#050505,#080808)]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="micro-label mb-6 block text-green-400">Graphic Design Dubai & Sharjah</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[0.92]">
              Brand visuals, pitch decks and marketing assets that look professional everywhere.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/65 font-light leading-relaxed max-w-3xl">
              Asif Digital creates graphic design systems for UAE businesses: social media creatives, company profiles, brochures, ad visuals, pitch decks and digital assets that support sales and brand trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link href="/free-growth-audit" className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-100">
                Book Free Design Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services/branding-agency-dubai-sharjah" className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/15 px-7 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10">
                See Branding Service
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {heroAssets.map((asset) => (
                <div key={asset.title} className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${asset.gradient} p-5 shadow-2xl`}>
                  <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.35),transparent_22%),radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.28),transparent_28%)]" />
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-white/20 bg-white/5 blur-[1px]" />
                  <div className="absolute left-5 right-5 top-12 space-y-2">
                    {asset.visual === "profile" && (
                      <>
                        <div className="h-5 w-24 rounded-full bg-white/80" />
                        <div className="grid grid-cols-[1fr_0.6fr] gap-3 pt-2">
                          <div className="space-y-2">
                            <div className="h-2 rounded-full bg-white/40" />
                            <div className="h-2 w-4/5 rounded-full bg-white/25" />
                            <div className="mt-4 h-10 rounded-xl bg-emerald-300/25" />
                          </div>
                          <div className="rounded-xl bg-white/15" />
                        </div>
                      </>
                    )}
                    {asset.visual === "social" && (
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-16 rounded-xl bg-white/75" />
                        <div className="h-20 rounded-xl bg-emerald-300/35" />
                        <div className="h-14 rounded-xl bg-fuchsia-300/35" />
                        <div className="col-span-3 h-3 rounded-full bg-white/35" />
                        <div className="col-span-2 h-3 rounded-full bg-white/20" />
                      </div>
                    )}
                    {asset.visual === "deck" && (
                      <div className="relative h-24">
                        <div className="absolute left-0 top-4 h-16 w-28 rotate-[-7deg] rounded-xl border border-white/15 bg-white/15" />
                        <div className="absolute left-10 top-1 h-20 w-32 rounded-xl border border-white/20 bg-white/80" />
                        <div className="absolute left-16 top-6 h-2 w-16 rounded-full bg-black/40" />
                        <div className="absolute left-16 top-11 h-2 w-20 rounded-full bg-black/20" />
                      </div>
                    )}
                    {asset.visual === "ad" && (
                      <div className="rounded-2xl border border-white/15 bg-black/35 p-3">
                        <div className="mb-3 h-8 rounded-xl bg-amber-200/70" />
                        <div className="space-y-2">
                          <div className="h-2 rounded-full bg-white/50" />
                          <div className="h-2 w-2/3 rounded-full bg-white/25" />
                        </div>
                        <div className="mt-3 h-5 w-20 rounded-full bg-emerald-300/70" />
                      </div>
                    )}
                  </div>
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-300">{asset.label}</span>
                    <span className="font-serif text-xl leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">{asset.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-white/50">Example design asset system — built around your real brand, offer and campaign needs.</p>
          </motion.div>
        </div>
      </section>

      <section className="hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541462608141-ad4d1f995502?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div style={{ y, opacity }} className="max-w-4xl">
            <span className="micro-label block mb-4 text-white/50 font-bold tracking-[0.3em] uppercase">Dubai & Sharjah Creative</span>
            <h1 className="text-5xl md:text-8xl">
            Graphic Design Agency <br/><span className="italic text-white/40">Dubai & Sharjah.</span>
          </h1>
          </motion.div>
        </div>
        {/* Hidden SEO Image */}
        <img 
          src="https://images.unsplash.com/photo-1541462608141-ad4d1f995502?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Professional Graphic Design and Creative Services Agency Dubai Sharjah" 
          className="sr-only"
          loading="lazy"
        />
      </section>

      <div className="px-6 md:px-12 max-w-7xl mx-auto py-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mb-12">
            Capture your audience's attention with the top Graphic Design Agency in Dubai and Sharjah. Our creative team delivers premium marketing materials, social media graphics, and print designs that elevate your brand and communicate your message effectively.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/free-growth-audit" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Book Free Design Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              View Design Portfolio
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-white/5">
          {[{ n: "01", l: "Creative Brief" }, { n: "02", l: "Design System" }, { n: "03", l: "Review Cycle" }, { n: "04", l: "Production Assets" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl font-serif mb-2">{s.n}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>

        <div className="py-24 border-t border-white/5">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">What We Design</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">Visual Communication for Every Medium</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/60 mb-5">{s.icon}</div>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="py-16 border-t border-white/5">
          <h2 className="text-3xl font-serif mb-8 text-white/80">Tools We Master</h2>
          <div className="flex flex-wrap gap-4">
            {tools.map((t, i) => <span key={i} className="px-6 py-3 border border-white/10 rounded-full text-sm text-white/70 hover:border-white/40 transition-colors">{t}</span>)}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-white/40 font-bold tracking-[0.3em] uppercase">Common Inquiries</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Graphic Design FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-white/70 transition-colors">
                  {faq.q}
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-white/50 font-light leading-relaxed text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Synergy Grid */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="micro-label block mb-4 text-[10px] font-bold uppercase tracking-widest">Strategic Synergy</span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Related Solutions</h2>
            </div>
            <Link href="/services" className="text-xs font-bold uppercase tracking-widest hover:text-white/70 transition-colors">View All Services —</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Branding", link: "/services/branding-agency-dubai-sharjah", desc: "The strategic foundation for all your visual communication." },
              { title: "Web Design", link: "/services/creative-web-design-dubai", desc: "Award-winning digital experiences that reflect your brand design." },
              { title: "Digital Marketing", link: "/ai-marketing-dubai", desc: "Using high-performance design to support measurable marketing outcomes." }
            ].map((s, i) => (
              <Link key={i} href={s.link} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                <h3 className="text-xl font-serif mb-4 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed mb-6">{s.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white">Explore Solution</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
