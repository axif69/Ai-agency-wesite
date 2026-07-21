"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Monitor, Zap, Globe, Palette, CheckCircle, Star, Users, TrendingUp } from "lucide-react";

const whyUs = [
  { icon: <Monitor className="w-6 h-6" />, title: "Conversion-First Design", desc: "Every pixel is engineered to guide visitors through a deliberate journey—from first impression to completed inquiry. We combine behavioural psychology, strategic layout hierarchy, and visual communication theory to create websites that make it psychologically easier for visitors to say yes." },
  { icon: <Zap className="w-6 h-6" />, title: "Core Web Vitals & Performance", desc: "Google's ranking algorithm now directly rewards website speed. We build websites that score 95+ on Google PageSpeed Insights, ensuring fast load times on UAE mobile networks, superior user experience, and stronger positions in local Dubai and Sharjah search results." },
  { icon: <Globe className="w-6 h-6" />, title: "Dubai & UAE Market Expertise", desc: "We have designed websites for businesses across Sharjah, Dubai, Abu Dhabi, and the wider GCC. We understand bilingual Arabic/English user behavior, local trust signals (TRN numbers, UAE business credibility cues), and what converts regional audiences." },
  { icon: <Palette className="w-6 h-6" />, title: "Premium Visual Storytelling", desc: "We use motion design, glassmorphism, cinematic imagery, and 3D interactive elements to craft digital experiences that position you as the undisputed premium brand in your category. Your website will look like it belongs alongside global award-winning agencies." },
];

const process = [
  { num: "01", title: "Discovery & Strategy", desc: "We begin with a deep-dive workshop to understand your business goals, target audience, competitive landscape in the UAE market, and the key actions you want visitors to take. This informs every design decision." },
  { num: "02", title: "Wireframes & UX Architecture", desc: "Before a single design element is created, we map out the complete user journey through low-fidelity wireframes. Every page, CTA placement, and navigation structure is validated against conversion data and UX best practices." },
  { num: "03", title: "High-Fidelity UI Design", desc: "We bring the wireframes to life in Figma, producing pixel-perfect, fully responsive designs in your brand language. You receive a clickable prototype before any code is written, allowing full review and iteration." },
  { num: "04", title: "Development & Animation", desc: "Our frontend engineers translate the approved design into clean, semantic React or Next.js code. Interactive animations, page transitions, and micro-interactions are layered in to create the premium feel your brand deserves." },
  { num: "05", title: "SEO Setup & Launch", desc: "Before going live, we implement technical SEO foundations: schema markup, meta tags, sitemap, robots.txt, Google Analytics, Search Console, and Core Web Vitals optimization. Your site launches ready to rank." },
  { num: "06", title: "Post-Launch Support", desc: "We provide 30 days of complimentary post-launch support to address any refinements, monitor performance metrics, and ensure your website is delivering the results we promised." },
];

const testimonials = [
  { quote: "Asif Digital redesigned our entire website in 3 weeks. Our lead generation increased by 180% in the first month after launch.", author: "Ahmed Al-Rashidi", role: "CEO, Zenith Properties Dubai" },
  { quote: "The most professional web design agency we've worked with in the UAE. The attention to detail and knowledge of the local market is unmatched.", author: "Priya Menon", role: "Marketing Director, TechFlow Sharjah" },
];

export default function WebDesign() {
  return (
    <div className="pt-20">
      

      {/* Hero */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Web Design — Dubai & Sharjah</span>
          <h1 className="text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight mb-8">
            Web Design <br/><span className="italic text-white/40">Agency Dubai.</span>
          </h1>
          <p className="text-xl text-white/95 font-light leading-relaxed max-w-2xl mb-12">
            We design premium websites for Dubai and Sharjah businesses that don't just look extraordinary—they rank on Google, engage every visitor, and convert prospects into paying customers with remarkable consistency.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" aria-label="Get A Free Consultation and Start Your Web Design Project" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Get A Free Consultation <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
            <Link href="/portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              View Our Work
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Image Parallax Section */}
      <section className="h-[60vh] relative overflow-hidden my-20 -mx-6 md:-mx-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight">
            Design <span className="italic">Authority</span>
          </h2>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Premium Web Design and UI/UX Strategy Agency Dubai" 
          className="sr-only"
          loading="lazy"
        />
      </section>

      {/* Stats */}
      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ n: "UX", l: "Conversion Clarity" }, { n: "SEO", l: "Technical Foundation" }, { n: "CWV", l: "Performance Review" }, { n: "CMS", l: "Maintainable Content" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl font-serif mb-2">{s.n}</div>
              <div className="text-white/95 text-xs uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Advantages</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">Why UAE Businesses Choose Asif Digital</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/95 mb-5" role="img" aria-label={`${item.title} Icon`}>{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/95 font-light leading-relaxed text-sm">
            Launch a high-converting digital storefront with a premier Web Design Agency in Dubai. We create modern, fast, and SEO-optimized websites that not only look incredible but are strategically built to generate leads and grow your business.
          </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">How We Work</span>
          <h2 className="text-4xl md:text-6xl font-serif">Our 6-Step Design Process</h2>
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
      </section>

      {/* What's Included */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Every Project Includes</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-10">What You Get With Every Website</h2>
            <ul className="space-y-4">
              {["Custom, bespoke design (no templates)", "Fully responsive for all devices", "Google Core Web Vitals optimization", "On-page SEO setup (meta tags, schema, sitemap)", "Arabic/English bilingual support available", "Hosting setup and DNS configuration", "30-day post-launch support", "Google Analytics & Search Console integration"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/95 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/90 flex-shrink-0 mt-0.5" role="img" aria-label="Feature Included" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="p-8 border border-white/10 rounded-2xl">
                <Star className="w-5 h-5 text-white/90 mb-4" role="img" aria-label="Star Icon" />
                <p className="text-white/95 font-light leading-relaxed italic mb-6 text-sm">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-sm">{t.author}</div>
                  <div className="text-white/90 text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Project Briefing</span>
            <h2 className="text-4xl font-serif">Web Design FAQs</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "How long until my new website is live?",
                a: "A standard corporate website typically transitions from discovery to launch in 3-5 weeks. High-complexity ecommerce sites may take 6-8 weeks due to deep integration requirements."
              },
              {
                q: "Do you use templates like WordPress or Wix?",
                a: "No. We build custom, high-performance websites using modern frameworks like React and Next.js. This ensures your site is faster, more secure, and infinitely more scalable than a template-based site."
              },
              {
                q: "Will I be able to update the content myself?",
                a: "Yes. We can integrate a 'Headless CMS' that allows you to update text, images, and blog posts as easily as editing a Google Doc, without ever touching the code."
              },
              {
                q: "Do you handle domain and hosting?",
                a: "Yes, we handle the entire technical setup including high-speed UAE-based hosting, SSL certificates, and DNS configuration so you don't have to worry about the 'tech' stuff."
              }
            ].map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-white/70 transition-colors">
                  {faq.q}
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-white/70 font-light leading-relaxed text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Ready to build a website that dominates?</h2>
          <p className="text-white/50 text-lg font-light mb-10">Build a faster, clearer digital presence around your business goals and customer journey.</p>
          <Link href="/contact" aria-label="Start Your Web Design Project with Asif Digital" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
            Start Your Project <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
          </Link>
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
              { title: "SEO Agency", link: "/services/seo-agency-dubai-sharjah-uae", desc: "Ensure your new website ranks at the top of UAE search results." },
              { title: "UI/UX Design", link: "/services/ui-ux-design-agency-dubai", desc: "Deeper product strategy and interactive prototyping for complex apps." },
              { title: "Ecommerce Solutions", link: "/services/ecommerce-website-development-dubai", desc: "Build high-converting online stores tailored for the GCC market." }
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
