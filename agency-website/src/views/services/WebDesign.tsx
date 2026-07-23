"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Code2, FileSearch, Gauge, Globe, Layout, MessageSquare, Palette, Search, Smartphone, Zap } from "lucide-react";

const problems = [
  "Your website looks nice but does not explain your offer clearly.",
  "Visitors do not know whether to call, WhatsApp, book or submit a form.",
  "The site loads slowly on mobile and loses impatient Dubai buyers.",
  "Google cannot clearly understand your services, location and conversion intent.",
];

const deliverables = [
  { icon: <Layout className="w-6 h-6" />, title: "Conversion-first page structure", desc: "Clear hero, service sections, trust signals, FAQs, WhatsApp CTA and lead forms arranged around buyer decisions." },
  { icon: <Gauge className="w-6 h-6" />, title: "Fast mobile performance", desc: "Modern lightweight pages built to load quickly and feel smooth on UAE mobile networks." },
  { icon: <Search className="w-6 h-6" />, title: "SEO-ready foundations", desc: "Metadata, headings, internal links, schema, sitemap and service copy written for local search intent." },
  { icon: <MessageSquare className="w-6 h-6" />, title: "Lead capture and WhatsApp flow", desc: "Forms, buttons and WhatsApp journeys built so visitors can enquire without friction." },
];

const packages = [
  { title: "Landing page", price: "From AED 1,500", desc: "One focused service page for ads, SEO or a launch campaign." },
  { title: "Business website", price: "AED 3,000-8,000+", desc: "Homepage, service pages, contact flow, SEO setup, analytics and responsive design." },
  { title: "Custom web system", price: "Scoped after audit", desc: "Advanced websites with CMS, dashboards, automations, integrations or ecommerce workflows." },
];

const showcase = [
  {
    image: "/images/showcase/ai-agency-website-mockup.png",
    title: "Modern AI agency website",
    desc: "Clean hero, sharp product positioning, smooth sections and premium B2B conversion flow.",
  },
  {
    image: "/images/showcase/lead-generation-website-mockup.png",
    title: "Lead-generation business website",
    desc: "Strong service explanation, trust signals, product sections and clear action paths.",
  },
  {
    image: "/images/showcase/corporate-website-mockup.png",
    title: "Premium corporate website",
    desc: "Modern visuals, interactive feel, elegant sections and a polished creative presentation.",
  },
];

const faqs = [
  { q: "How much does web design cost in Dubai?", a: "A focused landing page can start from around AED 1,500. A full business website normally costs more depending on the number of pages, design quality, SEO content, CMS needs and integrations." },
  { q: "How long does a website take to build?", a: "A simple landing page can be completed quickly once copy and direction are clear. A full business website usually needs more time for structure, content, design, development, testing and launch." },
  { q: "Will the website be SEO friendly?", a: "Yes. We build the foundation with metadata, clean headings, fast loading, schema, sitemap, internal links and service copy that helps Google understand what you offer and where you serve." },
  { q: "Can you add WhatsApp and lead forms?", a: "Yes. We can add WhatsApp buttons, lead forms, booking CTAs, email notifications and tracking so the website is built for enquiries, not just design." },
  { q: "Can I update the website later?", a: "Yes. Depending on your needs, we can connect a CMS or keep the website simple and maintain updates for you." },
];

export default function WebDesign() {
  const [zoomedShowcase, setZoomedShowcase] = useState<(typeof showcase)[number] | null>(null);

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <section className="relative overflow-hidden px-6 md:px-12 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(to_bottom,#050505,#080808)]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="micro-label block mb-6 text-green-400">Web Design Company Dubai</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.92] tracking-tight mb-8">Web Design Company Dubai.</h1>
            <p className="text-lg md:text-xl text-white/65 font-light leading-relaxed max-w-3xl mb-10">
              Build a fast, clear and modern website that turns visitors into calls, WhatsApp enquiries and booked consultations. Asif Digital designs conversion-focused websites for Dubai and UAE businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/free-growth-audit" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/85 transition-colors inline-flex items-center justify-center gap-3">
                Book Free Website Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/ai-chatbots-dubai" className="border border-white/15 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-green-400/50 transition-colors inline-flex items-center justify-center gap-3">
                Add WhatsApp Chatbot
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center text-green-300"><Code2 className="w-6 h-6" /></div>
              <div>
                <h2 className="font-serif text-2xl">Website lead path</h2>
                <p className="text-white/45 text-sm">Google → website → WhatsApp/form → booked call</p>
              </div>
            </div>
            {["Clear service promise", "Fast mobile page", "Trust and proof sections", "WhatsApp or form CTA", "Tracking and follow-up"].map((step, i) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/40 p-4 mb-3">
                <span className="w-7 h-7 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-sm text-white/75">{step}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <span className="micro-label block mb-4 text-green-400">The real problem</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">A website should not just look good. It should help people choose you.</h2>
            <p className="text-white/55 leading-relaxed">Many websites in Dubai are either pretty but unclear, or SEO-heavy but hard to trust. We build the middle path: modern design, simple language, fast loading and clear enquiry actions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <CheckCircle className="w-5 h-5 text-green-400 mb-4" />
                <p className="text-sm text-white/60 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="micro-label block mb-4 text-green-400">What we build</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">Modern websites built for enquiries.</h2>
            <p className="text-white/55 leading-relaxed">Your website should explain the offer, build trust, load fast and make the next step obvious.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-8">
                <div className="text-green-300 mb-6">{item.icon}</div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white text-black rounded-[2.5rem] mx-4 md:mx-12">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-black/45 block mb-4">Showcase direction</span>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-12">Website styles we can build around your offer.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcase.map((item) => (
              <button key={item.title} type="button" onClick={() => setZoomedShowcase(item)} className="group text-left rounded-3xl border border-black/10 bg-black/[0.03] overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden bg-black">
                  <img src={item.image} alt={`${item.title} website design mockup`} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/45" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                    Tap to zoom
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                  <p className="text-black/65 leading-relaxed">{item.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-black transition-transform group-hover:translate-x-1">
                    View larger image <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <span className="micro-label block mb-4 text-green-400">Cost and starting point</span>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-12">How much does web design cost in Dubai?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-8">
                <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                <p className="text-green-300 font-bold tracking-wide mb-5">{item.price}</p>
                <p className="text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            { icon: <Smartphone className="w-5 h-5" />, title: "Mobile-first", desc: "Designed for how UAE users browse and enquire." },
            { icon: <FileSearch className="w-5 h-5" />, title: "SEO-ready", desc: "Service, location and FAQ structure included." },
            { icon: <Palette className="w-5 h-5" />, title: "Modern design", desc: "Clean visuals, motion and premium layout." },
            { icon: <Globe className="w-5 h-5" />, title: "Scalable", desc: "Ready for blogs, service pages and campaigns." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
              <div className="text-green-300 mb-5">{item.icon}</div>
              <h3 className="text-xl font-serif mb-3">{item.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-10">Web design FAQs.</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-bold mb-3">{faq.q}</h3>
                <p className="text-white/55 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28 text-center bg-[#080808] border-t border-white/5">
        <Zap className="w-10 h-10 text-green-400 mx-auto mb-8" />
        <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-8">Want a website that brings clearer enquiries?</h2>
        <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">Send us your current website or business idea. We will suggest the first structure that can improve trust, SEO and lead flow.</p>
        <Link href="/free-growth-audit" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/85 transition-colors inline-flex items-center justify-center gap-3">
          Book Free Website Audit <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {zoomedShowcase && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-4 md:p-10 flex items-center justify-center" onClick={() => setZoomedShowcase(null)}>
          <button type="button" className="absolute right-5 top-5 rounded-full bg-white text-black px-5 py-3 text-xs font-bold uppercase tracking-widest" onClick={() => setZoomedShowcase(null)}>
            Close
          </button>
          <div className="max-w-6xl w-full" onClick={(event) => event.stopPropagation()}>
            <div className="mb-5">
              <p className="text-green-400 micro-label mb-2">Website preview</p>
              <h3 className="text-3xl md:text-5xl font-serif">{zoomedShowcase.title}</h3>
            </div>
            <div className="rounded-[2rem] overflow-hidden border border-white/15 bg-white shadow-2xl">
              <img src={zoomedShowcase.image} alt={`${zoomedShowcase.title} enlarged website design mockup`} className="w-full max-h-[76vh] object-contain bg-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

