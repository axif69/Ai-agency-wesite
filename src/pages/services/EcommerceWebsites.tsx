import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, ShoppingBag, CreditCard, Truck, BarChart, CheckCircle, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function EcommerceWebsites() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    {
      q: "Which platform is best for my UAE e-commerce business?",
      a: "We Recommend Shopify for most high-growth retailers due to its reliability and local payment support. For complex, high-volume enterprises requiring custom logic, we architect headless solutions using Next.js and MedusaJS."
    },
    {
      q: "Do your websites integrate with local delivery providers?",
      a: "Yes. We directly integrate with Aramex, Fetchr, and other major UAE logistics APIs to automate shipping labels, real-time tracking, and delivery notifications."
    },
    {
      q: "Can you set up payment gateways like Telr or Checkout.com?",
      a: "Absolutely. We handle the full technical integration of regional payment gateways, ensuring secure, multi-currency (AED, SAR, etc.) transactions that meet UAE regulatory standards."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="E-commerce Website Development Dubai | Shopify & Custom UAE | Asif Digital"
        description="High-conversion e-commerce stores for Dubai and Sharjah retailers. Shopify experts, headless commerce, and deep integration with UAE payment and logistics providers."
        keywords="E-commerce Dubai, Shopify Developer Sharjah, Headless Commerce UAE, Dubai Online Store Builder"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "E-commerce Website Development",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Sharjah" }
          ],
          "description": "Premium e-commerce development services including Shopify, WooCommerce, and custom headless commerce for UAE businesses."
        }}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />

      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-13da736c7459?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div style={{ y, opacity }} className="max-w-4xl">
            <span className="micro-label block mb-4 text-white/60">Dubai & Sharjah Specialized</span>
            <h1 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-tight">
               Convert Every<br /><span className="italic text-white/80">Digital Visit.</span>
            </h1>
          </motion.div>
        </div>
        {/* Hidden SEO Image */}
        <img 
          src="https://images.unsplash.com/photo-1556742049-13da736c7459?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="E-commerce Website Development and Shopify Specialist Dubai Sharjah" 
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
            Beautiful design meets brutal efficiency. We build e-commerce engines that don't just look world-class—they are optimized for maximum conversion, lightning speed, and seamless UAE logistics integration.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
             <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Build Your Store <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <ShoppingBag className="w-6 h-6" />, title: "Shopify & Shopify Plus", desc: "We are Dubai's go-to Shopify specialists, building custom themes and private apps that push the boundaries of what's possible on the platform." },
            { icon: <Smartphone className="w-6 h-6" />, title: "Mobile-First Commerce", desc: "80% of UAE online shopping happens on mobile. Our stores are architected for thumb-driven navigation and lightning-fast mobile checkouts." },
            { icon: <Truck className="w-6 h-6" />, title: "Logistics API Integration", desc: "Seamless connection with Aramex, Fetchr, and Emirates Post to automate your entire fulfillment and tracking workflow." },
            { icon: <CreditCard className="w-6 h-6" />, title: "Local Payment Gateways", desc: "Expert integration of Telr, Checkout.com, Tap, and Stripe to ensure high approval rates for GCC cards." },
            { icon: <BarChart className="w-6 h-6" />, title: "Conversion Optimization", desc: "We use heatmapping and A/B testing to identify friction points and optimize your checkout funnel for maximum AED per visitor." },
            { icon: <CheckCircle className="w-6 h-6" />, title: "Managed Growth", desc: "Ongoing support and optimization to keep your store fast, secure, and scaling with your business goals." }
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
              <div className="text-white/60 mb-5">{s.icon}</div>
              <h3 className="text-lg font-bold mb-3">{s.title}</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-10">Regional Features Built-In</h2>
            <ul className="space-y-4">
              {["Full Arabic Right-to-Left (RTL) support", "SADAD & Mada payment integrations for Saudi expansion", "VAT-compliant invoicing and reporting", "Hyper-local shipping rate calculators", "WhatsApp-based order notifications", "Omnichannel POS sync for physical stores"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Launch Your GCC Empire</h3>
            <p className="text-white/50 font-light text-sm leading-relaxed mb-8">We don't just build websites; we build scalable retail businesses. Let's discuss your product roadmap and how we can dominate the UAE digital shelf together.</p>
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Book A Consultant Call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-white/40">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">E-commerce FAQs</h2>
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
              { title: "SEO Strategy", link: "/services/seo-aeo-specialist-dubai", desc: "Dominate search results and drive organic high-intent traffic to your store." },
              { title: "Performance PPC", link: "/services/ppc-google-meta-ads-agency-dubai", desc: "Scalable customer acquisition through precision Meta and Google Ads." },
              { title: "Digital Marketing", link: "/services/digital-marketing-agency-dubai-sharjah", desc: "Holistic brand growth across all major UAE digital channels." }
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
