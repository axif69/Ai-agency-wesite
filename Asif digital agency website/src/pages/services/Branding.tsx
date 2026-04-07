import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Layers, Globe, Star, CheckCircle, Users } from "lucide-react";

const deliverables = [
  { icon: <Palette className="w-6 h-6" />, title: "Logo Design & Identity Mark", desc: "We design a versatile logo system that works across every application—website favicon, business card, outdoor signage, vehicle livery, and digital ads. Your mark is crafted with deep intentionality: symbol choice, typography pairing, and colour psychology are all grounded in your competitive positioning." },
  { icon: <Layers className="w-6 h-6" />, title: "Comprehensive Brand Guidelines Manual", desc: "We produce a meticulously detailed brand guidelines document (50-80 pages) covering correct logo usage, colour palette (with HEX, RGB, CMYK, Pantone values), typography hierarchy, photography style, iconography, tone of voice, and do/don't examples—ensuring every stakeholder and supplier applies your brand with perfect consistency forever." },
  { icon: <Globe className="w-6 h-6" />, title: "Brand Strategy & Positioning", desc: "Before we open Figma, we conduct a strategic brand workshop. We define your brand's core purpose, values, promise, personality archetypes, and the precise market positioning that differentiates you from every competitor in the UAE market—creating a foundation that makes your visual identity genuinely meaningful." },
  { icon: <Star className="w-6 h-6" />, title: "Brand Voice & Messaging Framework", desc: "Visuals attract attention, but words build brands. We develop your brand's unique tone of voice, tagline, value proposition, and a messaging framework with pre-written copy variations for website headlines, social bios, pitch decks, and sales one-liners." },
  { icon: <Users className="w-6 h-6" />, title: "Printed & Digital Collateral Suite", desc: "Business cards, letterheads, envelopes, presentation folders, email signatures, LinkedIn banners, and social media templates—every branded touchpoint is designed to the same standard of excellence, ensuring a premium impression at every interaction point." },
  { icon: <Palette className="w-6 h-6" />, title: "Packaging & Environmental Design", desc: "For product businesses and physical retail environments, we extend your brand identity into packaging design, retail signage, exhibition stands, and office environmental graphics—creating a fully immersive, 360-degree brand experience." },
];

const process = [
  { num: "01", title: "Brand Discovery Workshop", desc: "A 2-3 hour deep-dive session—in person or via Zoom—exploring your business history, goals, target audience personas, competitive landscape, and aesthetic references." },
  { num: "02", title: "Research & Competitive Analysis", desc: "We audit your top 10 UAE competitors and conduct a broader global analysis to identify white space, overused visual trends to avoid, and differentiation opportunities." },
  { num: "03", title: "Concept Development", desc: "Our creative team develops 3 distinct brand identity directions, each with a unique visual world, rationale, and application examples across real-world touchpoints." },
  { num: "04", title: "Refinement & Finalisation", desc: "You select and refine your preferred direction through 3 rounds of revisions. All feedback is addressed until the identity is precise, complete, and unanimously loved." },
  { num: "05", title: "Brand Guidelines Delivery", desc: "We produce the master brand guidelines manual and deliver all logo files in every format (SVG, PNG, PDF, AI, EPS) across all required colour variants." },
  { num: "06", title: "Collateral & Launch", desc: "We design the full collateral suite and can coordinate print production through our trusted UAE suppliers, delivering everything print-ready and production-approved." },
];

const faqs = [
  { q: "How long does a brand identity project take?", a: "A full brand identity project typically takes 4-6 weeks from the discovery workshop to final delivery of all files and guidelines. Rush timelines are available." },
  { q: "Do you provide Arabic branding as well?", a: "Yes. We have Arabic typography and calligraphy specialists on the team who produce bilingual Arabic/English brand systems for UAE-facing businesses." },
  { q: "What if I already have a logo—can you just refresh it?", a: "Absolutely. We offer brand evolution services for businesses who have established recognition but need a modernised, more sophisticated visual identity." },
  { q: "How many logo concepts will I receive?", a: "You receive 3 fully developed concept directions, each with real-world applications. This isn't 3 logo sketches—each direction is a comprehensive visual world." },
];

export default function Branding() {
  return (
    <div className="pt-20">
      <SEO
        title="Brand Identity & Strategy Agency Dubai | Asif Digital"
        description="Premium brand identity design for Dubai and UAE businesses. Logo design, brand strategy, guidelines, and complete visual identity systems. Bilingual Arabic/English specialists."
      />

      {/* Hero */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Branding & Identity — Dubai & UAE</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            A Brand They'll<br /><span className="italic text-white/90">Never Forget.</span>
          </h1>
          <p className="text-xl text-white/95 font-light leading-relaxed max-w-2xl mb-12">
            In the UAE's hyper-competitive business landscape, a generic logo and a colour palette aren't enough. We build brands from the ground up—strategy first, identity second—that earn immediate trust, command premium pricing, and create the kind of emotional connection that turns customers into advocates.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" aria-label="Start Your Brand Project with Asif Digital" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Start Your Brand Project <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
            <Link to="/portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              View Brand Work
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ n: "200+", l: "Brands Created" }, { n: "Arab. & Eng.", l: "Bilingual Identity Experts" }, { n: "50-80pg", l: "Brand Guidelines Delivered" }, { n: "4-6 wks", l: "Avg Project Duration" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-3xl font-serif mb-2">{s.n}</div>
              <div className="text-white/95 text-xs uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">What We Create</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">A Complete, Cohesive Brand System</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/90 mb-5" role="img" aria-label={`${d.title} Icon`}>{d.icon}</div>
                <h3 className="text-lg font-bold mb-3">{d.title}</h3>
                <p className="text-white/95 font-light leading-relaxed text-sm">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Creative Process</span>
            <h2 className="text-4xl md:text-5xl font-serif">How We Build Your Brand</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/5 rounded-2xl">
                <div className="text-6xl font-serif text-white/10 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border border-white/10 rounded-2xl p-8">
                <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
                <p className="text-white/50 font-light text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Ready to build something iconic?</h2>
          <p className="text-white/50 text-lg font-light mb-10">Let's start with a free 30-minute brand consultation call and explore what your business could look like at its very best.</p>
          <Link to="/contact" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
            Book Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
