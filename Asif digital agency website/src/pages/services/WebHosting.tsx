import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Server, Shield, Zap, Clock, CheckCircle, Globe } from "lucide-react";

const features = [
  { icon: <Zap className="w-6 h-6" />, title: "NVMe SSD Servers in UAE & Global CDN", desc: "We host all websites on NVMe SSD-powered servers located in UAE and European data centres, combined with a global CDN spanning 200+ PoPs. This ensures your UAE visitors experience sub-second page load times regardless of their location or device." },
  { icon: <Shield className="w-6 h-6" />, title: "Enterprise Security Stack", desc: "Every hosted website is protected by a Web Application Firewall (WAF), daily automated malware scanning, DDoS mitigation, brute-force protection, and free SSL/TLS certificates with automatic renewal. Your data and your customers' data remain secure." },
  { icon: <Clock className="w-6 h-6" />, title: "99.99% Uptime SLA", desc: "Our infrastructure is built on enterprise-grade cloud providers with multi-region redundancy. We monitor your website's uptime every 30 seconds and have automated failover in place—so when issues occur, recovery is often complete before you even notice." },
  { icon: <Server className="w-6 h-6" />, title: "Automated Daily Backups", desc: "Automated backups run every 24 hours with 30-day retention. Full site restoration can be completed in under 60 minutes—meaning data loss from a disaster is limited to a maximum of 24 hours of activity, fully within industry standards." },
  { icon: <Globe className="w-6 h-6" />, title: "Managed WordPress & CMS Hosting", desc: "For WordPress, Webflow, and other CMS-based sites, we handle all software updates, plugin maintenance, database optimization, and caching configuration. Your CMS stays secure, fast, and fully maintained without you lifting a finger." },
  { icon: <Shield className="w-6 h-6" />, title: "Staging Environments", desc: "Every Business and Enterprise plan includes a private staging environment—an identical copy of your website where changes can be tested safely before being deployed live. Never again will a plugin update or code change break your production site unexpectedly." },
];

const plans = [
  { name: "Starter", price: "AED 99/mo", desc: "For small businesses launching their first website.", features: ["10 GB NVMe SSD", "1 Website", "Free SSL Certificate", "Daily Backups (7-day retention)", "99.9% Uptime SLA", "Email Support"] },
  { name: "Business", price: "AED 249/mo", desc: "For growing businesses with active traffic.", features: ["50 GB NVMe SSD", "5 Websites", "Free SSL + Global CDN", "Daily Backups (30-day retention)", "99.99% Uptime SLA", "Staging Environment", "Priority Support (24hr)"], featured: true },
  { name: "Enterprise", price: "Custom", desc: "For high-traffic platforms and enterprise workloads.", features: ["Unlimited NVMe SSD", "Unlimited Websites", "Dedicated Server Resources", "Hourly Backups", "Custom SLA Agreement", "UAE Data Residency Available", "Dedicated Account Manager", "24/7 Phone Support"] },
];

const faqs = [
  { q: "Where are your servers located?", a: "Our primary servers are located in UAE and Dubai Internet City. We also leverage Cloudflare's global CDN with 200+ edge locations for fast delivery to visitors around the world." },
  { q: "Can you migrate my existing website to your hosting?", a: "Yes—we handle full website migrations including DNS transfer, database migration, and email setup at no additional cost for all Business and Enterprise plans." },
  { q: "Do you support custom email addresses (info@mybusiness.com)?", a: "Yes. All plans include custom domain email hosting through Google Workspace or Microsoft 365, which we can set up and manage as an add-on service." },
  { q: "What happens if my website goes down?", a: "Our monitoring system alerts our team within 30 seconds of any downtime. We have on-call engineers available to respond and resolve critical issues 24/7. You will receive automated notifications and a post-incident report." },
];

export default function WebHosting() {
  return (
    <div className="pt-20">
      <SEO
        title="Web Hosting Dubai & UAE | Fast, Secure & Managed | Asif Digital"
        description="Premium managed web hosting in Dubai and UAE. NVMe SSD servers, free SSL, 99.99% uptime guarantee, daily backups, and 24/7 expert support for serious businesses."
      />

      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Web Hosting — UAE</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            Hosting as Fast as<br /><span className="italic text-white/40">Your Ambitions.</span>
          </h1>
          <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-12">
            Your website's hosting directly impacts your Google rankings, user experience, and business reliability. Every second of load time costs you conversions. Every hour of downtime costs you revenue. We provide UAE-based managed hosting that eliminates both problems permanently.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Get A Hosting Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">Infrastructure Features</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">Enterprise Infrastructure. Human Support.</h2>
          </div>
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
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">Transparent, Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`p-10 rounded-2xl border flex flex-col ${p.featured ? "border-white/40 bg-white/5" : "border-white/10"}`}>
                {p.featured && <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4 block">Most Popular</span>}
                <h3 className="text-2xl font-serif mb-1">{p.name}</h3>
                <p className="text-white/40 text-xs mb-6">{p.desc}</p>
                <div className="text-3xl font-bold mb-8">{p.price}</div>
                <ul className="space-y-3 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-10 block text-center border border-white/20 hover:border-white text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors">
                  Get This Plan
                </Link>
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
