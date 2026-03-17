import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Cloud, Shield, Zap, Code, CheckCircle, Database, Globe, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: <Cloud className="w-6 h-6" />, title: "Cloud-Native Architecture", desc: "We build SaaS platform using modern cloud-native architectures (Serverless, Microservices) on AWS, Azure, or Google Cloud. This ensures your application can scale from 10 to 100,000+ concurrent users without breaking a sweat." },
  { icon: <Code className="w-6 h-6" />, title: "Full-Stack Development", desc: "Our expertise spans the entire stack—from high-performance React/Next.js frontends to robust Node.js, Python, or Go backends. We use TypeScript across the board to ensure code quality and maintainability as your product evolves." },
  { icon: <Shield className="w-6 h-6" />, title: "Security & Compliance", desc: "Security is baked into our development lifecycle. We implement OAuth2, JWT, and encrypted data storage as standard, and ensure your platform meets regional UAE data residency and global GDPR/SOC2 standards." },
  { icon: <Zap className="w-6 h-6" />, title: "High-Performance APIs", desc: "We design and build clean, well-documented RESTful or GraphQL APIs that power your web app, mobile companions, and third-party integrations with sub-100ms response times." },
  { icon: <Database className="w-6 h-6" />, title: "Scalable Data Modeling", desc: "Whether it's relational (PostgreSQL), NoSQL (MongoDB), or Vector databases for AI features—we architect data layers that ensure consistency, performance, and easy reporting as your dataset grows." },
  { icon: <Globe className="w-6 h-6" />, title: "Multi-Tenant Architecture", desc: "Specialists in building secure multi-tenant SaaS environments where each customer's data is strictly isolated while sharing a common application infrastructure for easy maintenance." },
];

export default function SaaSServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    {
      q: "Which tech stack do you recommend for SaaS in the UAE?",
      a: "We prioritize performance and scalability. Our primary stack for UAE SaaS is Next.js with TypeScript, integrated with scalable backends like Node.js or Python (FastAPI), typically hosted on AWS or Azure GCC regions for low-latency."
    },
    {
      q: "Can you help with local data sovereignty requirements?",
      a: "Absolutely. We architect SaaS solutions that comply with UAE data residency laws, ensuring sensitive data is stored on UAE-based servers like G42 Khazna or AWS UAE Regions."
    },
    {
      q: "Do you build the mobile app version as well?",
      a: "Yes. We use cross-platform frameworks like React Native or Expo to build companion mobile apps that share the same backend, ensuring a consistent experience across web and mobile for your users."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="SaaS Product Development UAE | Custom Software Dubai | Asif Digital"
        description="Expert SaaS development for Dubai and Sharjah startups. We build scalable, high-performance cloud applications and MVPs with a focus on UAE market success."
        keywords="SaaS development Dubai, Cloud software UAE, Custom SaaS specialist Sharjah, Startup MVP UAE"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "SaaS Product Development",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Sharjah" }
          ],
          "description": "Custom SaaS product engineering from ideation to launch, focusing on scalability, security, and exceptional user experience."
        }}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12 font-serif text-white tracking-tight leading-tight">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div style={{ y, opacity }} className="max-w-4xl">
            <span className="micro-label block mb-4 text-white/60">Dubai & Sharjah Innovation</span>
            <h1 className="text-4xl md:text-7xl">
              Scalable Cloud<br/><span className="text-white/80 italic">Infrastructure.</span>
            </h1>
          </motion.div>
        </div>
        {/* Hidden SEO Image */}
        <img 
          src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="SaaS Product Development and Cloud Software Specialist Dubai Sharjah" 
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
            I don't just build software; I engineer scalable digital products. From initial MVP to enterprise-grade cloud architecture, my SaaS solutions are designed to handle rapid user growth and unshakeable uptime.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Architect Your Product <ArrowRight className="w-4 h-4" /></Link>
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
            <h2 className="text-4xl font-serif mb-10">Our SaaS Tech Stack</h2>
            <ul className="space-y-4">
              {["Frontend: Next.js, React, Tailwind CSS", "Backend: Node.js, Python (FastAPI/Django), Go", "Database: PostgreSQL, MongoDB, Redis", "Cloud: AWS, Azure, Google Cloud (GC Regions)", "DevOps: Docker, Kubernetes, GitHub Actions", "Mobile: React Native, Expo"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Ready to Build Something Big?</h3>
            <p className="text-white/50 font-light text-sm leading-relaxed mb-8">We specialize in turning complex vision into high-performance software. Let's discuss your roadmap and how we can architect your SaaS for GCC-wide success.</p>
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Book A Technical Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-white/40">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">SaaS Engineering FAQs</h2>
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
              { title: "Custom Software", link: "/services/custom-software-development-dubai", desc: "Build unshakeable enterprise solutions to power your cloud product." },
              { title: "Web Development", link: "/services/web-development-agency-dubai", desc: "High-performance front-ends for your SaaS and mobile companions." },
              { title: "AI Integration", link: "/services/ai-automation-chatbot-development-dubai", desc: "Incorporate intelligent agents and LLMs into your SaaS product." }
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
