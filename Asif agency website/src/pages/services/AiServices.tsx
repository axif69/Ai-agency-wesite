import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { Bot, Zap, Shield, Cpu, ArrowRight, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: <Bot className="w-6 h-6" />, title: "AI Chatbots & Virtual Assistants", desc: "We deploy intelligent, context-aware chatbots on your website, WhatsApp, and social media that qualify leads, handle FAQs, and book appointments 24/7. Built on GPT-4 and Claude—these bots sound genuinely human and radically reduce your customer service overhead." },
  { icon: <Cpu className="w-6 h-6" />, title: "Business Process Automation (n8n & Make)", desc: "We map your repetitive manual workflows—data entry, lead routing, invoice generation, report delivery—and automate them completely. Our tools of choice include n8n, Make (Integromat), and custom Python scripts that integrate with your existing software stack." },
  { icon: <Zap className="w-6 h-6" />, title: "LLM & OpenAI API Development", desc: "We integrate GPT-4, Claude, Gemini, and open-source models directly into your applications, internal tools, and customer-facing products. From AI-powered search and content generators to intelligent data extraction systems—we architect an AI-native advantage for your business." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Predictive Analytics & Machine Learning", desc: "We build and deploy supervised machine learning models that forecast customer churn, predict lifetime value, identify optimal pricing opportunities, and surface sales signals buried in your operational data—giving your leadership team the intelligence to act before competitors." },
];

export default function AiServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "LocalBusiness",
    "name": "Asif Digital — AI Automation Dubai",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format,compress&fm=webp&q=80&w=1200",
    "@id": "https://asifdigital.agency/services/ai-automation-chatbot-development-dubai",
    "url": "https://asifdigital.agency/services/ai-automation-chatbot-development-dubai",
    "telephone": "+971500000000",
    "priceRange": "AED 5,000 - AED 50,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "postalCode": "00000",
      "addressCountry": "AE"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "City", "name": "Abu Dhabi" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "description": "Enterprise-grade AI solutions by Asif Digital in Dubai and Sharjah. Specialist in LLM integration, AI automation, and intelligent agents."
  };

  const faqs = [
    {
      q: "How can AI benefit my business in Dubai?",
      a: "Our AI solutions automate repetitive tasks, improve customer engagement through intelligent chatbots, and provide data-driven insights, allowing your business to scale efficiently in the competitive UAE market."
    },
    {
      q: "Is my business data secure with your AI integrations?",
      a: "Absolutely. We prioritize data security and can implement solutions that allow your data to remain on your servers (on-premise or UAE-hosted) while still leveraging powerful AI capabilities."
    },
    {
      q: "What is the typical timeline for an AI implementation?",
      a: "A pilot or MVP typically takes 4 to 8 weeks. Larger enterprise integrations are phased out over several months depending on complexity and data availability."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Enterprise AI Solutions & Consulting Dubai | Asif Digital" 
        description="Transform your UAE business with custom AI solutions. Specialist in LLM integration, automated agent swarms, and intelligent workflows for Dubai and Sharjah enterprises."
        keywords="AI Consulting Dubai, Custom AI Development Sharjah, LLM Integration UAE, AI Automation UAE"
        ogImage="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format,compress&fm=webp&q=75&w=1200"
        schema={serviceSchema}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div style={{ y, opacity }} className="max-w-4xl">
            <span className="micro-label block mb-4 text-white/60">Dubai & Sharjah Specialized</span>
            <h1 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-tight">
              Enterprise <br/><span className="text-white/80 italic">AI Integration</span>
            </h1>
          </motion.div>
        </div>
        {/* Hidden SEO Image */}
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Enterprise AI Solutions and Specialist Consulting Dubai Sharjah" 
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
            I build intelligence into the core of your business. From autonomous Agentic swarms to custom LLM layers, my AI solutions are architected to drive measurable ROI for the UAE's most ambitious enterprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
              <div className="text-white/60 mb-5">{f.icon}</div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-10">Technologies We Deploy</h2>
            <ul className="space-y-4">
              {["OpenAI GPT-4 & Assistants API", "Anthropic Claude & AWS Bedrock", "Google Gemini & Vertex AI", "n8n, Make (Integromat) & Zapier", "LangChain & LlamaIndex frameworks", "Vector databases: Pinecone, Weaviate", "Python, FastAPI & Node.js backends", "WhatsApp Business API integration"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Book An AI Strategy Session</h3>
            <p className="text-white/50 font-light text-sm leading-relaxed mb-8">In 60 minutes, we will identify the highest-value AI automation opportunities in your specific business, estimate the time and cost savings, and outline an implementation roadmap with no obligation.</p>
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Book Free Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">AI Deployment FAQs</h2>
          </div>
          <div className="space-y-6 px-6">
            {faqs.map((faq, i) => (
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
      <section className="py-24 border-t border-white/5 mx-6 md:mx-12">
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
              { title: "SaaS Development", link: "/services/saas-development-specialist-uae", desc: "Build the cloud-native backbone for your enterprise intelligence." },
              { title: "Custom Software", link: "/services/custom-software-development-dubai", desc: "Tailored enterprise solutions built with the latest high-performance tech." },
              { title: "Web Development", link: "/services/web-development-agency-dubai", desc: "World-class digital front-ends for your intelligent backend swarms." }
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
