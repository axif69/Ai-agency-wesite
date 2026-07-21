"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers, Globe, Zap, Sparkles, CheckCircle, Code, MousePointer2, Gauge, Film, Box } from "lucide-react";

const features = [
  { icon: <Sparkles className="w-6 h-6" />, title: "Award-Winning Visual Concept", desc: "Creative web design goes beyond beautiful—it is strategically arresting. We use editorial-grade typography, cinematic imagery, motion-driven storytelling, and interaction design that makes visitors feel the premium quality of your brand before they read a single word." },
  { icon: <Layers className="w-6 h-6" />, title: "Custom Animations & Micro-Interactions", desc: "Page transitions, parallax scroll effects, text reveals, cursor interactions, and hover states are all custom-coded to create a seamless, immersive digital experience. These details signal craft and investment—and they make visitors stay significantly longer." },
  { icon: <Globe className="w-6 h-6" />, title: "Storytelling Through Scroll", desc: "We design websites where the scroll itself tells your brand story. As users move through the page, content, imagery, and data reveal progressively—creating a narrative journey that builds desire and guides visitors inevitably toward your call to action." },
  { icon: <Zap className="w-6 h-6" />, title: "Performance Without Compromise", desc: "Grand visual ambitions often come at the cost of website speed. We use advanced optimisation techniques—lazy loading, sprite sheets, WebP images, code splitting, and CDN delivery—to ensure your visually spectacular website still loads fast and scores well on Core Web Vitals." },
  { icon: <Code className="w-6 h-6" />, title: "React & Next.js Creative Development", desc: "Our frontend engineers are fluent in the latest creative development techniques: Three.js 3D scenes, GSAP timeline animations, Lottie animations, WebGL shaders, and custom cursor experiences. We bring creative direction to life with clean, maintainable code." },
  { icon: <Layers className="w-6 h-6" />, title: "Fully Responsive & Cross-Device", desc: "Creative web experiences must translate beautifully from 27-inch monitors to iPhone screens. We design and test meticulously across every device, ensuring your creative vision is preserved and impactful regardless of how your audience finds you." },
];

const clientTypes = ["Luxury Real Estate (Dubai)", "Premium Hospitality & Hotels", "Fashion & Lifestyle Brands", "Architecture & Interior Design Studios", "Investment & Private Equity Firms", "Creative Agencies & Studios", "Luxury F&B Concepts", "Tech Startups & SaaS Products"];

const showcaseTemplates = [
  {
    title: "Cinematic Brand Launch",
    tag: "Luxury / Hospitality / Real Estate",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format,compress&fm=webp&q=80&w=1200",
    desc: "A high-impact homepage with editorial typography, full-screen visual scenes, soft parallax, launch storytelling, premium CTAs and mobile-first lead capture.",
    details: ["Hero film frame", "Scroll chapter reveals", "Luxury proof blocks", "Lead-focused CTA flow"],
  },
  {
    title: "Interactive Product Story",
    tag: "SaaS / AI / Tech",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format,compress&fm=webp&q=80&w=1200",
    desc: "A modern product website where features unfold through scroll-triggered cards, animated interface mockups, workflow diagrams and conversion-focused comparison sections.",
    details: ["Animated UI panels", "Feature sequencing", "Sticky product story", "Demo/request flow"],
  },
  {
    title: "WebGL / 3D Experience",
    tag: "Premium / Experimental",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format,compress&fm=webp&q=80&w=1200",
    desc: "A lightweight creative direction using Three.js/WebGL-style visuals, depth, particles, gradients and object movement while preserving SEO text and page speed.",
    details: ["3D hero concept", "Motion-safe fallback", "GPU-conscious effects", "SEO-visible copy"],
  },
  {
    title: "Magazine Editorial Website",
    tag: "Consultancy / Founder Brand",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format,compress&fm=webp&q=80&w=1200",
    desc: "A sharp content-led site with oversized typography, case-study storytelling, proof-led sections, long-form landing pages and elegant micro-interactions.",
    details: ["Editorial grid", "Authority sections", "Case study modules", "Article-ready structure"],
  },
];

const motionStack = [
  { icon: <Film className="w-5 h-5" />, title: "GSAP-style timelines", desc: "Sequenced reveals, pinned sections, smooth transitions and controlled scroll storytelling for premium pages." },
  { icon: <Box className="w-5 h-5" />, title: "Three.js / WebGL concepts", desc: "3D-inspired hero scenes, particles, gradients and spatial interfaces where the brand needs a signature visual moment." },
  { icon: <MousePointer2 className="w-5 h-5" />, title: "Micro-interactions", desc: "Cursor states, hover physics, magnetic buttons, card depth, menu transitions and small details that make the site feel expensive." },
  { icon: <Gauge className="w-5 h-5" />, title: "Performance guardrails", desc: "Motion is planned with lazy loading, reduced-motion fallbacks, image compression and Core Web Vitals in mind." },
];

const processSteps = [
  { step: "01", title: "Creative Direction", desc: "We define the visual world: typography, movement style, interaction tone, visual references, brand mood and conversion objective." },
  { step: "02", title: "Motion Prototype", desc: "Instead of flat mockups only, we plan how the page should move: reveal timing, scroll logic, hover behaviour and responsive fallbacks." },
  { step: "03", title: "Next.js Build", desc: "The design is developed with clean React/Next.js structure, SEO-visible content, reusable sections and fast-loading media." },
  { step: "04", title: "QA + Launch", desc: "We test mobile, desktop, speed, accessibility, reduced motion, forms, WhatsApp CTAs, tracking and post-launch editability." },
];

const faqs = [
  { q: "What makes creative web design different from standard web design?", a: "Standard web design prioritises usability and conversion within established templates and conventions. Creative web design pushes the boundaries of what a website can feel like—using advanced animations, experimental layouts, immersive scroll experiences, and visual storytelling to create a work of digital art that also drives business results." },
  { q: "Will a heavily animated website hurt my Google rankings?", a: "Not if it's built correctly. We adhere to Core Web Vitals standards and ensure all animations are performance-optimised. Your creative website will load fast, score well on Google PageSpeed, and maintain strong technical SEO foundations." },
  { q: "How long does a creative web design project take?", a: "Creative web design projects typically take 8-12 weeks due to the elevated level of design craft and custom development involved. This timeline ensures the final product is truly exceptional rather than merely adequate." },
  { q: "Do you build creative websites on CMS platforms like WordPress?", a: "Yes. We build on headless CMS platforms including Sanity, Contentful, and Strapi, as well as custom WordPress implementations. This gives you creative freedom in design combined with the ease of content management you need." },
];

export default function CreativeWebDesign() {
  return (
    <div className="pt-20">
      

      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="micro-label mb-8 block">Creative Web Design — Dubai</span>
            <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight leading-tight">
            Creative Web Design <br/><span className="italic text-white/40">Agency Dubai.</span>
          </h1>
            <div className="flex flex-wrap gap-4 justify-center mt-12">
              <Link href="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">Start Your Project <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">View Creative Work</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16"><span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Creative Capabilities</span><h2 className="text-4xl md:text-5xl font-serif max-w-2xl">Where Art Meets Conversion Science</h2></div>
          <p className="text-white/55 font-light leading-relaxed max-w-3xl mb-12">
            Modern creative web design is not just a pretty layout. It is a designed experience where motion, typography, interaction, speed, storytelling and conversion work together. We build premium motion websites in Dubai using the same thinking behind high-end SaaS launches, luxury real estate campaigns, hospitality experiences and founder-led authority brands.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/60 mb-5">{f.icon}</div>
                <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16">
            <div>
              <span className="micro-label block mb-4">Showcase Directions</span>
              <h2 className="text-4xl md:text-6xl font-serif max-w-3xl leading-tight">Modern website templates we can shape around your brand</h2>
            </div>
            <p className="text-white/50 font-light leading-relaxed max-w-md">
              These are not copied templates. They are premium creative directions: reusable website concepts that give your project a faster start while still being custom-designed, branded and performance-aware.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showcaseTemplates.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative min-h-[520px] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015] overflow-hidden p-8"
              >
                <div className="absolute inset-x-6 top-6 h-64 rounded-[1.5rem] border border-white/10 bg-black/40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} modern website showcase template for Dubai creative web design`}
                    className="h-full w-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-300/70" />
                    <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="mb-3 h-2 w-2/3 rounded-full bg-white/70" />
                    <div className="h-2 w-1/2 rounded-full bg-white/30" />
                  </div>
                </div>
                <div className="pt-72">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-bold">{item.tag}</span>
                  <h3 className="text-2xl md:text-3xl font-serif mt-4 mb-4">{item.title}</h3>
                  <p className="text-white/55 font-light leading-relaxed mb-6">{item.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {item.details.map((detail) => (
                      <div key={detail} className="text-xs text-white/50 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-white/35" /> {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="micro-label block mb-4">Motion Website Stack</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">Motion that feels premium — not slow, noisy or gimmicky</h2>
            <p className="text-white/55 font-light leading-relaxed mb-8">
              The best modern websites use movement with restraint. Scroll reveals should guide attention. Micro-interactions should make the interface feel alive. 3D and WebGL should support the brand story, not hide the message from Google or punish mobile users.
            </p>
            <p className="text-white/55 font-light leading-relaxed">
              We plan every motion layer with conversion, accessibility and speed in mind: reduced-motion support, mobile alternatives, lazy-loaded media, compressed assets, SEO-readable HTML and clear CTAs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {motionStack.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-7 rounded-3xl border border-white/10 bg-black">
                <div className="text-white/55 mb-5">{item.icon}</div>
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="micro-label block mb-4">Build Process</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-3xl">From visual concept to live conversion system</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {processSteps.map((item) => (
              <div key={item.step} className="p-7 rounded-3xl border border-white/10 bg-white/[0.02]">
                <span className="text-white/25 text-sm font-bold tracking-widest">{item.step}</span>
                <h3 className="text-xl font-serif mt-8 mb-4">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-8">Who This Is For</h2>
            <p className="text-white/50 font-light mb-8 leading-relaxed">Creative web design is for brands for whom ordinary is not an option. If your business commands a premium price point and needs a digital presence that reflects that premium positioning, this is your service.</p>
            <div className="grid grid-cols-2 gap-3">
              {clientTypes.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                  <CheckCircle className="w-3 h-3 flex-shrink-0" /> {c}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[{ n: "8-12 wks", l: "Typical Project Duration" }, { n: "3", l: "Design Concepts Presented" }, { n: "95+", l: "PageSpeed Score Target" }, { n: "Award", l: "Quality Standard" }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 border border-white/10 rounded-2xl flex justify-between items-center">
                <span className="text-white/50 text-sm">{s.l}</span>
                <span className="text-2xl font-serif">{s.n}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden SEO Image */}
      <img 
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fm=webp&q=75&w=1200" 
        alt="Bespoke Creative Web Design and Cinematic Experiences Dubai | Award Winning Agency" 
        className="sr-only"
        loading="lazy"
      />

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Ready to be unforgettable?</h2>
          <p className="text-white/50 text-lg font-light mb-10">Let's create a digital experience your industry has never seen before.</p>
          <Link href="/contact" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Start The Conversation <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <span className="micro-label block mb-4">Questions Answered</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-12">Creative web design FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="font-bold mb-3">{faq.q}</h3>
                <p className="text-white/50 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Strategic Synergy Grid */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="micro-label block mb-4">Strategic Synergy</span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Related Solutions</h2>
            </div>
            <Link href="/services" className="text-xs font-bold uppercase tracking-widest hover:text-white/70 transition-colors">View All Services —</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "UI/UX Design", link: "/services/ui-ux-design-agency-dubai", desc: "User-centric interaction patterns for complex digital ecosystems." },
              { title: "Graphic Design", link: "/services/graphic-design-agency-dubai-sharjah", desc: "Comprehensive brand assets and visual collateral for multi-channel impact." },
              { title: "Web Hosting", link: "/services/web-hosting-uae", desc: "Fast, secure infrastructure for your creative digital storefront." }
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
