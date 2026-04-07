import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, TrendingUp, Shield, Zap, CreditCard, Package, CheckCircle } from "lucide-react";

const features = [
  { icon: <ShoppingCart className="w-6 h-6" />, title: "Custom Ecommerce Development", desc: "We build bespoke online stores from scratch or develop on leading platforms including Shopify, WooCommerce, and Magento—tailored precisely to your product catalogue, brand, and UAE customer expectations. No one-size-fits-all solutions." },
  { icon: <CreditCard className="w-6 h-6" />, title: "UAE Payment Gateway Integration", desc: "Full integration with the region's leading payment processors: Telr, PayFort (Amazon Payment Services), Stripe, PayPal, as well as cash-on-delivery and bank transfer flows that UAE shoppers trust and expect." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Conversion Rate Optimization", desc: "We apply A/B tested checkout flow designs, urgency mechanisms, trust badge placement, product page hierarchy, and abandoned cart recovery sequences that have been proven to increase average order value and reduce cart abandonment rates." },
  { icon: <Shield className="w-6 h-6" />, title: "Security & PCI Compliance", desc: "Enterprise-grade SSL encryption, PCI-DSS compliant payment handling, and automated fraud detection protocols ensure your customers' data is protected and your business is shielded from liability." },
  { icon: <Zap className="w-6 h-6" />, title: "Performance & SEO", desc: "Every product page is optimized with structured data (Product Schema), rich snippets, and Core Web Vitals targeting. Fast-loading product images via CDN and lazy loading ensure Google rewards your store with higher rankings." },
  { icon: <Package className="w-6 h-6" />, title: "Inventory & Fulfilment Integration", desc: "We integrate your store with inventory management systems, shipping providers (Aramex, FedEx, DHL), and warehouse management software, creating a seamless flow from purchase to delivery." },
];

const platforms = ["Shopify", "WooCommerce", "Magento", "React + Headless Commerce", "Custom Node.js Backends", "Stripe & Telr", "Aramex & DHL"];

export default function EcommerceWebsites() {
  return (
    <div className="pt-20">
      <SEO
        title="Ecommerce Website Development Dubai & UAE | Asif Digital"
        description="Expert ecommerce website development in Dubai and UAE. We build Shopify, WooCommerce, and custom online stores with local payment gateways that convert visitors into buyers."
      />

      {/* Hero */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Ecommerce Development — Dubai & UAE</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight mb-8">
            Online Stores That<br /><span className="italic text-white/90">Sell Relentlessly.</span>
          </h1>
          <p className="text-xl text-white/95 font-light leading-relaxed max-w-2xl mb-12">
            The UAE ecommerce market is projected to exceed $9 billion by 2026. We build the online stores that capture the lion's share of it—fast, secure, beautifully designed, and engineered to maximize every dirham of revenue from your traffic.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" aria-label="Get A Free Store Audit and Start Your Ecommerce Project" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors flex items-center gap-2">
              Get A Free Store Audit <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
            <Link to="/portfolio" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              View Ecommerce Work
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ n: "40+", l: "Stores Launched" }, { n: "340%", l: "Avg Revenue Increase" }, { n: "2.1s", l: "Avg Page Load Target" }, { n: "99.9%", l: "Store Uptime" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl font-serif mb-2">{s.n}</div>
              <div className="text-white/95 text-xs uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-white/30 text-xs font-bold tracking-[0.3em] uppercase block mb-4">What We Build</span>
            <h2 className="text-4xl md:text-6xl font-serif max-w-2xl">Everything Your Store Needs to Dominate</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                <div className="text-white/95 mb-5" role="img" aria-label={`${f.title} Icon`}>{f.icon}</div>
                <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-white/95 font-light leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-12">Technologies & Platforms We Use</h2>
          <div className="flex flex-wrap gap-4">
            {platforms.map((p, i) => (
              <span key={i} className="px-6 py-3 border border-white/10 rounded-full text-sm text-white/70 hover:border-white/40 transition-colors">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-10">Every Store Comes With</h2>
            <ul className="space-y-4">
              {["Custom design matched to your brand", "Mobile-first responsive layout", "UAE payment gateway (Telr, PayFort, Stripe)", "Product schema & SEO for every product page", "Inventory management setup", "Abandoned cart email automation", "Analytics dashboard configuration", "30-day post-launch support"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/95 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/90 flex-shrink-0 mt-0.5" role="img" aria-label="Feature Included" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Launch in 30 Days</h3>
            <p className="text-white/95 font-light text-sm leading-relaxed mb-8">We operate on an accelerated timeline that gets your store live and selling within 30 days without compromising on quality or functionality.</p>
            <Link to="/contact" aria-label="Start Your Ecommerce Project with Asif Digital Today" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Start Today <ArrowRight className="w-4 h-4" role="img" aria-label="Arrow Right icon" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
