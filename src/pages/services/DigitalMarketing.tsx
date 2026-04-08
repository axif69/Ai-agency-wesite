import { motion } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Megaphone, CheckCircle, Target, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function DigitalMarketing() {
  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": "Digital Marketing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asif Digital"
    },
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "City", "name": "Ajman" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Expert Digital Marketing, Meta Ads, and Data-driven marketing services designed to maximize ROI for UAE businesses.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED"
    }
  };

  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO 
        title="Top Digital Marketing Agency in Sharjah & Dubai | Meta Ads" 
        description="Data-driven Digital Marketing, High-Converting Meta Ads, Google Ads, and SEO services by Asif Khan in Sharjah and Dubai. Dominate local search and social media."
        keywords="Digital Marketing Agency Sharjah, Meta Ads Expert Dubai, Google Ads Specialist UAE, Best SEO Services Sharjah, Social Media Management Dubai"
        schema={serviceSchema}
        faqSchema={[
          {
            question: "What digital marketing services do you offer in Dubai and Sharjah?",
            answer: "We offer comprehensive digital marketing solutions including Meta and Google Ads, SEO, Social Media Management, and AEO (AI Search Optimization) tailored for the UAE market."
          },
          {
            question: "How long does it take to see results from digital marketing?",
            answer: "Paid ads (Meta/Google) can show results within days, while organic SEO and AEO typically take 3 to 6 months to see significant improvements in search rankings and traffic."
          },
          {
            question: "Do you provide transparent ROI tracking?",
            answer: "Yes. We set up advanced tracking and provide detailed monthly reports showing EXACTLY how many leads and sales your digital marketing campaigns are generating."
          },
          {
            question: "Which platform is best for my UAE business: Meta or Google?",
            answer: "This depends on your business. Google is ideal for capturing high-intent searches, while Meta (Instagram/Facebook) is powerful for brand building and visual products."
          }
        ]}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <span className="micro-label block mb-4">Service Details</span>
        <div className="flex items-center gap-6 mb-8">
          <Megaphone className="w-12 h-12 text-white/40" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] font-serif leading-tight tracking-tight">UAE Digital<br/><span className="text-white/50 italic">Marketing</span></h1>
        </div>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          Data-driven marketing strategies that maximize ROI, elevate brand visibility, and dominate the digital landscape across Dubai and Sharjah.
        </p>
      </motion.div>

      {/* Image Parallax Section */}
      <section className="h-[60vh] relative overflow-hidden my-20 -mx-6 md:-mx-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight">
            Growth <span className="italic">Unleashed</span>
          </h2>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Performance Focused Digital Marketing and Growth Agency Dubai" 
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
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format,compress&fm=webp&q=75&w=1200" 
            alt="Data-driven Digital Marketing and Meta Ads Agency Dubai" 
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
            <h2 className="text-4xl font-serif tracking-tight mb-6">Strategic Growth in the UAE</h2>
            <p className="text-white/60 font-light leading-relaxed">
              With over 5 years of experience in the UAE market, I understand what it takes to convert clicks into clients in Dubai, Sharjah, and Ajman. From highly targeted Meta and Google Ads campaigns to comprehensive Social Media Management and advanced AEO (Answer Engine Optimization), I provide end-to-end marketing solutions that drive real, measurable ROI.
            </p>
          </div>
          
          <ul className="space-y-6">
            {[
              "High-Converting Meta & Google Ads",
              "Advanced SEO & AEO (AI Search Optimization)",
              "Comprehensive Social Media Management",
              "Data Analytics & Conversion Tracking",
              "Content Strategy & Brand Positioning"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-white/80 font-light">
                <CheckCircle className="w-5 h-5 text-white/40" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Link to="/contact?service=marketing" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-all duration-500 glass-panel">
              Grow Your Business <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Process Section */}
      <section className="py-20 border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="micro-label block mb-4">Methodology</span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Campaign Lifecycle</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Target />, title: "1. Audit & Strategy", desc: "Analyzing your current presence, identifying target audiences, and formulating a data-backed plan." },
            { icon: <Users />, title: "2. Execution & Engagement", desc: "Deploying campaigns, managing communities, and creating content that resonates." },
            { icon: <BarChart />, title: "3. Analysis & Optimization", desc: "Continuous monitoring, A/B testing, and refining strategies for maximum ROI." }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 glass-panel rounded-3xl border border-white/5"
            >
              <div className="text-white/40 mb-6">{step.icon}</div>
              <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
              <p className="text-white/50 font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* FAQ Section */}
      <section className="px-6 md:px-12 py-24 bg-white/[0.02] border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">Marketing Strategy FAQs</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "What digital marketing services do you offer in Dubai and Sharjah?",
                a: "We offer comprehensive digital marketing solutions including Meta and Google Ads, SEO, Social Media Management, and AEO (AI Search Optimization) tailored for the UAE market."
              },
              {
                q: "How long does it take to see results from digital marketing?",
                a: "Paid ads (Meta/Google) can show results within days, while organic SEO and AEO typically take 3 to 6 months to see significant improvements in search rankings and traffic."
              },
              {
                q: "Do you provide transparent ROI tracking?",
                a: "Yes. We set up advanced tracking and provide detailed monthly reports showing EXACTLY how many leads and sales your digital marketing campaigns are generating."
              },
              {
                q: "Which platform is best for my UAE business: Meta or Google?",
                a: "This depends on your business. Google is ideal for capturing high-intent searches, while Meta (Instagram/Facebook) is powerful for brand building and visual products."
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
              { title: "SEO & AEO Strategy", link: "/services/seo-agency-dubai-sharjah-uae", desc: "Dominate both traditional search and AI answer engines in the UAE." },
              { title: "PPC & Google Ads", link: "/services/ppc-google-ads-agency-dubai", desc: "Capture high-intent traffic with precision-targeted search campaigns." },
              { title: "Social Media Strategy", link: "/services/social-media-management-dubai-uae", desc: "Build a premium digital identity that resonates across the GCC." }
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
