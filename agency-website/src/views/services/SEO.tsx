"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, FileText, MapPin, TrendingUp, Link2, BarChart3, CheckCircle } from "lucide-react";

const pillars = [
  { icon: <Search className="w-6 h-6" />, title: "Technical SEO Audits", desc: "We review crawlability, indexation, Core Web Vitals, internal links, canonicals, redirects, schema, duplicate signals and page templates so Google can understand the site cleanly." },
  { icon: <FileText className="w-6 h-6" />, title: "AEO Content Strategy", desc: "We build pages that answer real questions directly, use clear definitions, cite useful evidence and format sections so AI Overviews and answer engines can extract your expertise." },
  { icon: <MapPin className="w-6 h-6" />, title: "Local SEO for Dubai and Sharjah", desc: "We improve Google Business Profile signals, local landing pages, service-area relevance, NAP consistency and internal links for UAE location searches." },
  { icon: <Link2 className="w-6 h-6" />, title: "GEO and Entity Optimisation", desc: "We strengthen the relationship between your brand, services, locations, authors, tools and topics so AI recommendation systems can understand what Asif Digital should be known for." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "E-E-A-T and Conversion Signals", desc: "We add author context, reviewed content, use cases, methodology, FAQs, service definitions and CTAs without making unsupported ranking or revenue claims." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Measurement and Iteration", desc: "We track Search Console queries, rankings, technical fixes, content performance, lead quality and the next experiments that can improve visibility over time." },
];

const keywordTargets = [
  "SEO agency Dubai",
  "AEO agency Dubai",
  "GEO services UAE",
  "AI search visibility Dubai",
  "answer engine optimisation UAE",
  "local SEO Dubai and Sharjah",
];

const deliverables = [
  "Technical SEO audit and implementation",
  "Keyword map for SEO, AEO and GEO targets",
  "Service page and blog content improvements",
  "Google Business Profile and local page guidance",
  "Internal linking and schema recommendations",
  "Search Console and analytics monitoring",
  "Monthly performance report with strategy notes",
  "Competitor ranking gap analysis",
];

const faqs = [
  {
    q: "What is the difference between SEO, AEO and GEO?",
    a: "SEO improves visibility in traditional search results. AEO helps pages answer questions clearly enough for answer engines and AI Overviews. GEO strengthens brand, entity and topical signals so generative AI systems can understand when your business is relevant.",
  },
  {
    q: "Can AEO help a Dubai business appear in AI recommendations?",
    a: "It can improve eligibility by making your services, locations, expertise, FAQs and proof points easier to parse. No agency can guarantee AI recommendations, but structured content and entity clarity give search systems better evidence to work with.",
  },
  {
    q: "Do you still work on normal Google rankings?",
    a: "Yes. Technical SEO, local SEO, content quality and internal linking remain the foundation. AEO and GEO build on top of that foundation rather than replacing it.",
  },
  {
    q: "Which pages should we optimise first?",
    a: "We prioritise pages with commercial intent, existing impressions, strong service fit and internal-link potential. For Asif Digital, AI automation, WhatsApp chatbot, real estate automation and Arabic AI pages are especially important.",
  },
];

export default function SEOPage() {
  return (
    <div className="pt-20">
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">SEO, AEO and GEO - Dubai & UAE</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            SEO, AEO and GEO Agency <br /><span className="italic text-white/40">for Dubai visibility.</span>
          </h1>
          <p className="text-xl text-white/95 font-light leading-relaxed max-w-3xl mb-12">
            Search is no longer only ten blue links. Asif Digital helps UAE businesses improve Google rankings, local SEO, AI Overview eligibility, answer-engine clarity and GEO visibility with technical fixes, useful content and structured entity signals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" aria-label="Get a free SEO AEO GEO audit" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Get Free Search Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tools/ai-website-grader" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              Run Website Grader
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="h-[54vh] relative overflow-hidden my-16">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format,compress&fm=webp&q=75&w=1200)" }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight">
            Visibility <span className="italic">for search and AI answers</span>
          </h2>
        </div>
        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format,compress&fm=webp&q=75&w=1200" alt="SEO AEO and GEO agency for Dubai and UAE search visibility" className="sr-only" loading="lazy" />
      </section>

      <section className="px-6 md:px-12 py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div>
            <span className="text-white/45 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Keyword focus</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">Built around search terms UAE buyers actually use.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {keywordTargets.map((keyword) => (
              <div key={keyword} className="rounded-2xl border border-white/8 bg-black p-5 text-sm text-white/75">
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Search Methodology</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-3xl">A practical search system for Google, AI Overviews and answer engines.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/95 mb-5">{p.icon}</div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-white/70 font-light leading-relaxed text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-serif mb-10">Your Monthly Search Retainer Includes</h2>
            <ul className="space-y-4">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/90 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/90 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl">
            <h3 className="text-2xl font-serif mb-4">Prioritise the pages most likely to move.</h3>
            <p className="text-white/80 font-light text-sm leading-relaxed mb-8">
              Your best search opportunities usually sit between technical health, better page intent and clearer topical authority. Our free audit shows which pages, keywords and fixes deserve priority first.
            </p>
            <Link href="/contact" aria-label="Book a free SEO AEO GEO audit with Asif Digital" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Book Free Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="micro-label block mb-4">Questions answered</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">SEO, AEO and GEO FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-white/8 bg-white/[0.02]">
                <summary className="list-none cursor-pointer p-6 flex items-center justify-between gap-6">
                  <span className="font-serif text-lg">{faq.q}</span>
                  <span className="text-white/40 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-white/65">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="micro-label block mb-4">Strategic Synergy</span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Related Solutions</h2>
            </div>
            <Link href="/services" className="text-xs font-bold uppercase tracking-widest hover:text-white/70 transition-colors">View All Services</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "AI Automation", link: "/ai-automation-agency-dubai", desc: "Build the service and workflow pages that support your AI positioning." },
              { title: "AI Chatbots", link: "/ai-chatbots-dubai", desc: "Capture leads from search pages through website and WhatsApp chatbot flows." },
              { title: "AI Real Estate", link: "/ai-real-estate-uae", desc: "Strengthen your topical authority around real estate automation in Dubai and the UAE." },
            ].map((s) => (
              <Link key={s.title} href={s.link} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
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
