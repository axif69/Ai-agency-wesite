import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, MessageSquare, Bot, Zap, Shield, CheckCircle, Smartphone, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: <MessageSquare className="w-6 h-6" />, title: "Official API Integration", desc: "We deploy secure, enterprise-grade WhatsApp Business API integrations that allow your brand to communicate with millions of UAE users through their preferred messaging channel." },
  { icon: <Bot className="w-6 h-6" />, title: "AI-Powered Conversational Bots", desc: "Beyond simple keyword triggers, we build intelligent AI bots that understand intent, qualify leads, and handle complex customer service inquiries in both English and Arabic." },
  { icon: <Zap className="w-6 h-6" />, title: "Automated Re-engagement", desc: "Schedule automated order updates, appointment reminders, and targeted marketing broadcasts that achieve 90%+ open rates compared to traditional email marketing." },
  { icon: <Smartphone className="w-6 h-6" />, title: "Mobile-First UX", desc: "Design interactive WhatsApp menus, list messages, and call-to-action buttons that make buying or booking as simple as sending a single text message." },
  { icon: <Users className="w-6 h-6" />, title: "Multi-Agent Support Desks", desc: "Connect your WhatsApp API to a centralized team dashboard, allowing multiple customer service agents to respond to queries while AI handles the repetitive triage." },
  { icon: <Globe className="w-6 h-6" />, title: "GCC-Wide Scalability", desc: "Our solutions are architected to scale across the UAE, Saudi Arabia, Qatar, and the wider GCC, managing localized numbers and high-volume messaging throughput." },
];

export default function WhatsAppAutomationGCC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    {
      q: "Do I need an official WhatsApp Business API account?",
      a: "Yes. To ensure your number isn't banned and to access advanced automation features, we help you secure and verify an official WhatsApp Business API account through authorized Meta partners."
    },
    {
      q: "Can the AI bot speak Arabic?",
      a: "Absolutely. Our AI agents are natively bilingual, capable of understanding and responding to customers in both professional (Modern Standard) and colloquial Khaleeji Arabic."
    },
    {
      q: "Can I send marketing broadcasts to my customers?",
      a: "Yes, within Meta's guidelines. We help you design template messages that get approved quickly, allowing you to reach your opted-in customer base with high-conversion offers."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="WhatsApp Business API & Automation UAE | GCC Marketing | Asif Digital"
        description="Transform your UAE customer engagement with official WhatsApp Business API automation. Intelligent AI bots, automated broadcasts, and GCC-wide support by Asif Digital."
        keywords="WhatsApp Automation Dubai, WhatsApp Business API UAE, AI Chatbots Sharjah, WhatsApp Marketing GCC"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "WhatsApp Business Automation",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "Country", "name": "United Arab Emirates" },
            { "@type": "Country", "name": "Saudi Arabia" }
          ],
          "description": "Expert implementation of WhatsApp Business API and AI-driven conversational automation for high-growth GCC brands."
        }}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12 font-serif text-white tracking-tight leading-tight">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div style={{ y, opacity }} className="max-w-4xl">
            <span className="micro-label block mb-4 text-white/60">GCC & UAE Specialized</span>
            <h1 className="text-4xl md:text-7xl">
              Where Your Customers<br/><span className="text-white/80 italic">Actually Live.</span>
            </h1>
          </motion.div>
        </div>
        {/* Hidden SEO Image */}
        <img 
          src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="WhatsApp Business API and AI Automation Specialist Dubai UAE GCC" 
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
            WhatsApp is the digital town square of the Middle East. We help you move your business directly into your customers' pockets with intelligent automation that scales without losing the personal touch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Automate Your WhatsApp <ArrowRight className="w-4 h-4" /></Link>
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
            <h2 className="text-4xl font-serif mb-10">Regional Leadership</h2>
            <ul className="space-y-4">
              {["Full Arabic NLP (Natural Language Processing)", "Official Meta Business Partner integrations", "90%+ Message Open Rates", "Verified WhatsApp Green Badge assistance", "CRM sync (Salesforce, HubSpot, Zoho)", "Regional data compliance (UAE/KSA)"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                  <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-serif mb-4">Start Conversant Scaling</h3>
            <p className="text-white/50 font-light text-sm leading-relaxed mb-8">Stop missing leads in cluttered inboxes. Meet your customers where they are most responsive. Let's design a WhatsApp automation strategy that drives real revenue for your GCC brand.</p>
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">
              Book A Demo Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-white/40">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">WhatsApp Strategy FAQs</h2>
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
              { title: "AI Integration", link: "/services/ai-automation-chatbot-development-dubai", desc: "Power your WhatsApp bots with sophisticated LLMs and agents." },
              { title: "Digital Marketing", link: "/services/digital-marketing-agency-dubai-sharjah", desc: "Integrate WhatsApp into your holistic multi-channel marketing funnels." },
              { title: "E-commerce", link: "/services/ecommerce-website-development-dubai", desc: "Automate order tracking and recovery for your online store." }
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
