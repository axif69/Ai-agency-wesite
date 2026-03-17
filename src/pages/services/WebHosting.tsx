import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Server, Shield, Zap, Globe, CheckCircle, Database, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: <Server className="w-6 h-6" />, title: "UAE-Based Cloud Servers", desc: "We provide high-performance cloud hosting on UAE-based infrastructure (AWS UAE, Azure UAE, or local Tier-3 Data Centers). This ensures sub-50ms latency for your local customers and full compliance with UAE data residency laws." },
  { icon: <Zap className="w-6 h-6" />, title: "Litespeed Enterprise Performance", desc: "Our servers run on Litespeed Enterprise with advanced caching layers (Redis/Memcached). Your website will load up to 10x faster than standard Apache or Nginx configurations, directly improving your SEO rankings and conversion rates." },
  { icon: <Shield className="w-6 h-6" />, title: "Enterprise-Grade Security", desc: "Every hosting account includes automated brute-force protection, real-time malware scanning, and a redundant Web Application Firewall (WAF). We mitigate attacks before they ever reach your application." },
  { icon: <Globe className="w-6 h-6" />, title: "Global CDN Integration", desc: "While we host locally, we route your traffic through a global CDN (Cloudflare Enterprise or BunnyCDN) with points of presence in 200+ cities, ensuring rapid load times for international visitors." },
  { icon: <Database className="w-6 h-6" />, title: "Automated Off-site Backups", desc: "We perform daily full-account backups stored in encrypted off-site locations. Whether it's a file deletion or a site-wide issue, we can restore your entire presence in minutes." },
  { icon: <Lock className="w-6 h-6" />, title: "Free SSL & Advanced Encryption", desc: "We provide and manage premium SSL certificates for all your domains and subdomains as standard, ensuring your customer data is always encrypted and your browsers show the 'Secure' padlock." },
];

export default function WebHosting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    {
      q: "Where exactly are your servers located?",
      a: "Our primary UAE infrastructure is located in Dubai and Abu Dhabi data centers (AWS me-central-1 and Azure UAE North), ensuring maximum speed for GCC-based users."
    },
    {
      q: "Do you offer managed WordPress hosting?",
      a: "Yes. Our managed WordPress environment is specifically tuned for the CMS, featuring one-click staging, automated core/plugin updates, and specialized WordPress security hardening."
    },
    {
      q: "Can you help migrate my existing website?",
      a: "Absolutely. We offer free, zero-downtime migration for all new hosting clients. Our technical team handles the entire move from your old provider to our high-performance UAE cloud."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Premium Cloud Hosting Dubai | UAE-Based Data Centers | Asif Digital"
        description="High-performance managed cloud hosting in Dubai and Sharjah. UAE data residency compliant, enterprise-grade security, and sub-50ms latency for GCC businesses."
        keywords="Web Hosting Dubai, Cloud Hosting UAE, Managed Hosting Sharjah, UAE Data Residency Hosting"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Managed Cloud Hosting",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Sharjah" }
          ],
          "description": "Premium managed cloud hosting services on UAE-based infrastructure, focusing on speed, security, and local compliance."
        }}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12 font-serif text-white tracking-tight leading-tight">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div style={{ y, opacity }} className="max-w-4xl">
            <span className="micro-label block mb-4 text-white/60">Dubai & Sharjah Infrastructure</span>
            <h1 className="text-4xl md:text-7xl">
              Local Performance.<br/><span className="text-white/80 italic">Global Scale.</span>
            </h1>
          </motion.div>
        </div>
        {/* Hidden SEO Image */}
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Premium Web Hosting and Cloud Infrastructure Dubai Sharjah UAE" 
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
            Hosting isn't just a place to store your files—it's the foundation of your digital performance. We provide managed UAE cloud infrastructure designed for unshakeable uptime and lightning-fast GCC load times.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Upgrade Your Hosting <ArrowRight className="w-4 h-4" /></Link>
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
            <h2 className="text-4xl font-serif mb-10">Compliance & Reliability</h2>
            <ul className="space-y-4">
              {["100% UAE Data Residency compliant", "99.99% Uptime Service Level Agreement (SLA)", "24/7 Proactive Server Monitoring", "Managed OS & Security Patching", "DDoS Mitigation & Rate Limiting", "Enterprise-grade NVMe SSD Storage"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Migrate to the UAE Cloud</h3>
            <p className="text-white/50 font-light text-sm leading-relaxed mb-8">Stop settling for high-latency overseas hosting. Give your UAE customers the experience they deserve with sub-50ms load times and localized support.</p>
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Start Your Migration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-white/40">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">Cloud Hosting FAQs</h2>
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
              { title: "Website Support", link: "/services/website-maintenance-support-dubai", desc: "Ongoing maintenance and security to keep your hosted site flawless." },
              { title: "Web Development", link: "/services/web-development-agency-dubai", desc: "High-performance applications built specifically for our cloud stack." },
              { title: "SaaS Development", link: "/services/saas-development-specialist-uae", desc: "Scalable cloud-native products architected for the GCC market." }
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
