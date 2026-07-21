"use client";
import { motion } from "framer-motion";

import { ArrowRight, Code, CheckCircle, Layers, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function WebDevelopment() {
  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital"
    },
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Custom AI-powered Web Development and React/Next.js applications for businesses in Dubai and Sharjah.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED"
    }
  };

  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <span className="micro-label block mb-4">Service Details</span>
        <div className="flex items-center gap-6 mb-8">
          <Code className="w-12 h-12 text-white/90" role="img" aria-label="Web Code Icon" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight">Dubai & Sharjah<br/><span className="text-white/80 italic text-white/90">AI Web Dev</span></h1>
        </div>
        <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl">
          Transform your digital presence in the UAE with immersive, high-performance web applications powered by Artificial Intelligence.
        </p>
      </motion.div>

      {/* Image Parallax Section */}
      <section className="h-[60vh] relative overflow-hidden my-20 -mx-6 md:-mx-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight">
            Code <span className="italic">Sovereignty</span>
          </h2>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Full-stack AI Web Development and Software Architecture Dubai" 
          className="sr-only"
          loading="lazy"
        />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="parallax-container rounded-3xl aspect-[4/5]"
        >
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format,compress&fm=webp&q=75&w=1200" 
            alt="Full-stack AI Web Development Agency in Dubai" 
            className="parallax-img"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center space-y-10"
        >
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-6">Next-Gen Web Experiences for UAE Businesses</h2>
            <p className="text-white/90 font-light leading-relaxed text-white/90 font-light leading-relaxed">
              In the competitive markets of Dubai and Sharjah, a standard website isn't enough. I build intelligent web platforms that adapt to user behavior, automate customer interactions, and provide seamless, immersive experiences. Using modern frameworks like React and Next.js combined with AI APIs, your website becomes a powerful business tool designed to convert local traffic into loyal customers.
            </p>
          </div>
          
          <ul className="space-y-6">
            {[
              "Custom React & Next.js Applications",
              "AI Chatbot & Assistant Integration",
              "Dynamic Content Personalization",
              "Immersive 3D & WebGL Interfaces",
              "High-Performance & SEO Optimized Architecture"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-white/95 font-light">
                <CheckCircle className="w-5 h-5 text-white/90" role="img" aria-label="Feature Checkmark" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Link href="/contact?service=web-dev" aria-label="Start Your Web Development Project with Asif Digital" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-all duration-500 glass-panel">
              Start Your Project <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Process Section */}
      <section className="py-20 border-y border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="micro-label block mb-4">Methodology</span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Development Process</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Layers className="w-6 h-6" role="img" aria-label="Architecture Icon" />, title: "1. Architecture & Design", desc: "Planning the tech stack, database schema, and creating high-fidelity UI/UX prototypes." },
            { icon: <Code className="w-6 h-6" role="img" aria-label="Code Icon" />, title: "2. Development & AI Integration", desc: "Writing clean, scalable code and integrating intelligent AI features tailored to your needs." },
            { icon: <ShieldCheck className="w-6 h-6" role="img" aria-label="Security Icon" />, title: "3. Testing & Deployment", desc: "Rigorous performance, security, and SEO testing before a seamless launch." }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 glass-panel rounded-3xl border border-white/5"
            >
              <div className="text-white/90 mb-6">{step.icon}</div>
              <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
              <p className="text-white/90 font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Engineering Briefing</span>
          <h2 className="text-4xl font-serif">Development FAQs</h2>
        </div>
        <div className="space-y-6">
          {[
            {
              q: "Why do you use Next.js instead of WordPress?",
              a: "Next.js provides superior speed, security, and SEO. It allows us to build 'Sovereign' applications that are immune to the vulnerabilities and performance bottlenecks of template-based systems like WordPress."
            },
            {
              q: "Can you build mobile apps alongside the web platform?",
              a: "Yes. We use cross-platform frameworks that allow your application to run seamlessly as a web app, iOS app, and Android app using a shared codebase, reducing development time by 40%."
            },
            {
              q: "Do you integrate with UAE payment gateways?",
              a: "Yes. We have deep experience integrating with local gateways like Telr, Checkout.com, and Stripe (UAE) to ensure smooth AED transactions."
            },
            {
              q: "What is your typical project timeline?",
              a: "Standard web applications take 4-8 weeks. High-ticket AI enterprise deployments usually span 12-16 weeks depending on the complexity of the custom model training."
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
              { title: "Ecommerce Development", link: "/services/ecommerce-website-development-dubai", desc: "Scale your revenue with high-performance headless commerce solutions." },
              { title: "UI/UX Design", link: "/services/ui-ux-design-agency-dubai", desc: "User-centric interfaces engineered for maximum conversion and retention." },
              { title: "Web Hosting & Security", link: "/services/web-hosting-uae", desc: "Secure, UAE-based infrastructure for unshakeable business continuity." }
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
              { title: "Web Development", link: "/services/web-development-dubai-uae", desc: "Bring your high-fidelity designs to life with maintainable code." },
              { title: "Branding Strategy", link: "/services/branding-agency-dubai-sharjah", desc: "Build the visual identity that powers your product's UI." },
              { title: "Ecommerce UX", link: "/services/ecommerce-website-development-dubai", desc: "Specialized user journeys designed to eliminate checkout friction." }
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
