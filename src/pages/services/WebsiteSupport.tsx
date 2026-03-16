import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, RefreshCw, ShieldCheck, HeadphonesIcon, Code, BarChart3, CheckCircle } from "lucide-react";

const services = [
  { icon: <Clock className="w-6 h-6" />, title: "24/7 Uptime Monitoring", desc: "Your website is monitored every 30 seconds. If a page becomes unavailable or returns an error, our team is alerted instantly and diagnostic recovery begins automatically. Most issues are resolved before your customers even notice." },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Security Monitoring & Hardening", desc: "We run weekly malware scans, manage your Web Application Firewall rules, apply emergency security patches, monitor for suspicious login attempts, and ensure SSL certificates never expire—keeping your website and customer data continuously protected." },
  { icon: <RefreshCw className="w-6 h-6" />, title: "CMS, Plugin & Theme Updates", desc: "Outdated WordPress plugins are the number-one cause of website hacks. We apply all CMS core, plugin, and theme updates on a controlled schedule—staging environment first, then production—so your site stays compatible, secure, and fast." },
  { icon: <Code className="w-6 h-6" />, title: "Content & Design Change Requests", desc: "Need to update a price, swap an image, or change opening hours? Retainer clients send requests directly via WhatsApp or email and our team completes them within 24-48 business hours with zero project management overhead." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Quarterly Performance Optimization", desc: "Websites slow down as databases grow and technology evolves. We run quarterly performance audits and implement optimizations—image compression, caching configuration, database cleanup—to maintain the fast load times Google and users expect." },
  { icon: <HeadphonesIcon className="w-6 h-6" />, title: "Dedicated Support Team", desc: "You will have a named account manager who knows your website inside out. All support is handled by the same team who built your site—not a generic helpdesk. Critical issues have a direct WhatsApp line with a guaranteed 2-hour response." },
];

const plans = [
  { name: "Essential", price: "AED 350/mo", features: ["Monthly security scans", "CMS & plugin updates", "Uptime monitoring", "3 content changes/mo", "Monthly report"] },
  { name: "Business", price: "AED 750/mo", features: ["Weekly security scans + staging test", "24/7 uptime monitoring", "10 content changes/mo", "Quarterly performance optimization", "4-hour response SLA"], featured: true },
  { name: "Enterprise", price: "Custom", features: ["Daily monitoring & hardening", "Unlimited content changes", "Continuous staging environment", "Dedicated account manager", "24/7 emergency phone support"] },
];

const faqs = [
  { q: "What counts as a content change request?", a: "Content changes include updating text, swapping images, changing prices, adding listings, or updating staff profiles. New features, page designs, or integrations are scoped and quoted separately." },
  { q: "Can you maintain websites you didn't build?", a: "Yes. We conduct an initial audit to understand the codebase and identify any existing vulnerabilities before starting. We support WordPress, Webflow, React, and custom-coded sites." },
  { q: "What if my website gets hacked?", a: "Business and Enterprise plans include full malware removal and site restoration at no additional charge. We clean the infection, patch the vulnerability, and restore from backup if necessary." },
];

export default function WebsiteSupport() {
  return (
    <div className="pt-20">
      <SEO title="Website Maintenance & Support Dubai | Care Plans | Asif Digital" description="Professional website maintenance and support in Dubai. 24/7 monitoring, security, content updates, and dedicated support for UAE businesses." />

      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Website Support — Dubai & UAE</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">Your Website,<br /><span className="italic text-white/40">Always Flawless.</span></h1>
          <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-12">A website is not a one-time project—it's a living business asset that needs constant care to remain secure, fast, and effective. We provide ongoing maintenance and support plans that protect your investment and give you complete peace of mind.</p>
          <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Get A Care Plan <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16"><span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">What We Cover</span><h2 className="text-4xl md:text-5xl font-serif max-w-2xl">Complete, Proactive Website Care</h2></div>
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
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif mb-16 text-center">Monthly Care Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`p-10 rounded-2xl border flex flex-col ${p.featured ? "border-white/40 bg-white/5" : "border-white/10"}`}>
                {p.featured && <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4 block">Most Popular</span>}
                <h3 className="text-2xl font-serif mb-2">{p.name}</h3>
                <div className="text-3xl font-bold mb-8">{p.price}</div>
                <ul className="space-y-3 flex-1">{p.features.map((f, j) => <li key={j} className="flex items-start gap-3 text-white/60 text-sm"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />{f}</li>)}</ul>
                <Link to="/contact" className="mt-10 block text-center border border-white/20 hover:border-white text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors">Get Started</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
}
