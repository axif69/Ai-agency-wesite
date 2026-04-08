import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Wrench, Shield, Zap, RefreshCw, CheckCircle, Clock, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: <Wrench className="w-6 h-6" />, title: "Technical Maintenance", desc: "Regular core, theme, and plugin updates for WordPress, Shopify, and custom applications. We test everything in staging before pushing to production to ensure zero-downtime updates." },
  { icon: <Shield className="w-6 h-6" />, title: "Proactive Security", desc: "Constant monitoring for vulnerabilities, brute-force attacks, and malware. We implement enterprise-grade hardening and firewall rules to keep your business data safe 24/7." },
  { icon: <RefreshCw className="w-6 h-6" />, title: "Content Updates", desc: "Need a new landing page, a blog post uploaded, or hours-of-operation changed? Our support plans include dedicated hours for content and structural updates with rapid turnaround." },
  { icon: <Zap className="w-6 h-6" />, title: "Speed Optimization", desc: "Ongoing performance audits to ensure your site remains lightning-fast. We optimize images, clean up databases, and refine caching as your site grows." },
  { icon: <Clock className="w-6 h-6" />, title: "Uptime Monitoring", desc: "We monitor your website every 60 seconds. If your site goes down, our technical team is alerted immediately and starts recovery before you even notice." },
  { icon: <LifeBuoy className="w-6 h-6" />, title: "Priority Support", desc: "Dedicated support channel for your team. Whether it's a technical bug or a 'how-to' question, you have direct access to the developers who know your site best." },
];

export default function WebsiteSupport() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    {
      q: "What is your typical response time?",
      a: "Our standard response time for non-emergency tickets is 4-8 business hours. For critical 'site-down' emergencies, we respond within 30-60 minutes, 24/7."
    },
    {
      q: "Do I need a support plan if I have hosting?",
      a: "While hosting keeps your server running, support keeps your *application* running. Support covers software updates, bug fixes, and content changes that standard hosting providers do not handle."
    },
    {
      q: "Can you support a website built by another agency?",
      a: "Yes. We perform a comprehensive technical audit of any existing site to identify immediate risks and optimization areas before onboarding you onto one of our monthly support plans."
    }
  ];

  const supportSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Asif Digital — Website Support Dubai",
    "image": "https://images.unsplash.com/photo-1454165833968-4e71580cadda?auto=format,compress&fm=webp&q=80&w=1200",
    "@id": "https://asifdigital.agency/services/website-maintenance-support-dubai",
    "url": "https://asifdigital.agency/services/website-maintenance-support-dubai",
    "telephone": "+971500000000",
    "priceRange": "AED 500 - AED 5,000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "City", "name": "Abu Dhabi" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Professional website maintenance and technical support for UAE businesses. 24/7 monitoring, security hardening, and rapid content updates."
  };

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Website Support & Maintenance Dubai | Managed Services UAE | Asif Digital"
        description="Professional website maintenance and technical support for Dubai and Sharjah businesses. 24/7 monitoring, security hardening, and rapid content updates."
        keywords="Website Support Dubai, Website Maintenance Sharjah, Managed WordPress UAE, Website Security Dubai"
        ogImage="https://images.unsplash.com/photo-1454165833968-4e71580cadda?auto=format,compress&fm=webp&q=75&w=1200"
        schema={supportSchema}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12 font-serif text-white tracking-tight leading-tight">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1454165833968-4e71580cadda?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div style={{ y, opacity }} className="max-w-4xl">
            <span className="micro-label block mb-4 text-white/60">Dubai & Sharjah Reliability</span>
            <h1 className="text-4xl md:text-7xl">
              Zero Downtime.<br/><span className="text-white/80 italic">Complete Peace.</span>
            </h1>
          </motion.div>
        </div>
        {/* Hidden SEO Image */}
        <img 
          src="https://images.unsplash.com/photo-1454165833968-4e71580cadda?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Website Support and Maintenance Services Agency Dubai Sharjah UAE" 
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
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl leading-relaxed">
            Your website is your hardest working employee. We ensure it never takes a sick day. From proactive security hardening to rapid content updates, we manage the technical complexity so you can focus on growth.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Secure Your Website <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
              <div className="text-white/60 mb-5">{f.icon}</div>
              <h3 className="text-lg font-bold mb-3">{f.title}</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-10">Managed Excellence</h2>
            <ul className="space-y-4">
              {["Daily off-site website backups", "Real-time security vulnerability scanning", "Monthly performance & health reports", "Staging environment for safe testing", "Priority emergency technical support", "Database optimization & cleanup"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Focus On Your Business</h3>
            <p className="text-white/50 font-light text-sm leading-relaxed mb-8">Stop worrying about software versions, server errors, or security patches. Let our specialist team handle the technical heavy lifting while you focus on what matters most—your customers.</p>
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Explore Support Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-white/40">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">Support & Maintenance FAQs</h2>
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
              <span className="micro-label block mb-4">Strategic Synergy</span>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Related Solutions</h2>
            </div>
            <Link to="/services" className="text-xs font-bold uppercase tracking-widest hover:text-white/70 transition-colors">View All Services —</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Web Hosting", link: "/services/web-hosting-dubai", desc: "The high-performance cloud foundation for your supported website." },
              { title: "Web Development", link: "/services/web-development-agency-dubai", desc: "Building new features and specialized functions for your brand." },
              { title: "SEO Strategy", link: "/services/seo-aeo-specialist-dubai", desc: "Ensuring your maintained site remains visible and high-ranking." }
            ].map((s, i) => (
              <Link key={i} to={s.link} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
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
