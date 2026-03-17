import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../../components/SEO";
import { ArrowRight, Instagram, Linkedin, MessageCircle, Share2, CheckCircle, Video, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: <Instagram className="w-6 h-6" />, title: "Instagram & TikTok Content", desc: "Short-form video is the heartbeat of UAE social media. We script, film, and edit high-impact Reels and TikToks that capture the attention of Dubai's mobile-first audience." },
  { icon: <Linkedin className="w-6 h-6" />, title: "LinkedIn Thought Leadership", desc: "For B2B and professional services, we craft executive positioning strategies that build authority, drive high-value networking, and generate enterprise leads in the GCC." },
  { icon: <MessageCircle className="w-6 h-6" />, title: "Community Management", desc: "We don't just post; we participate. Our team handles comments, DMs, and community engagement 7 days a week, ensuring your brand stays connected and responsive." },
  { icon: <Video className="w-6 h-6" />, title: "Short-Form Video Production", desc: "Professional videography and editing optimized for social algorithms. We handle everything from trend spotting to final color grading for maximum viral potential." },
  { icon: <Users className="w-6 h-6" />, title: "Influencer Coordination", desc: "We identify and manage relationships with regional UAE influencers who actually move the needle for your specific industry, ensuring authentic and measurable brand reach." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Performance Reporting", desc: "No vanity metrics. We provide monthly deep-dives into engagement rates, click-throughs, and sentiment analysis so you know exactly how social moves your business." },
];

export default function SocialMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faqs = [
    {
      q: "Which platforms are most active in the UAE?",
      a: "The UAE has some of the highest social media penetration globally. Instagram and TikTok are dominant for lifestyle and B2C, while LinkedIn is essential for professional services and B2B."
    },
    {
      q: "Do you offer content creation as part of management?",
      a: "Yes. Our full-service management includes content planning, professional graphic design, and short-form video editing (Reels/TikToks) tailored for your UAE audience."
    },
    {
      q: "How many times per week will you post?",
      a: "Posting frequency depends on your goals and platform. Generally, we recommend 3-5 high-quality posts per week for Instagram/TikTok and 2-3 strategic updates for LinkedIn."
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <SEO 
        title="Social Media Management Dubai | Content Strategy Sharjah | Asif Digital"
        description="Full-service social media management for Dubai and Sharjah brands. From content creation and community management to high-growth UAE social strategy."
        keywords="Social Media Dubai, Instagram Management Sharjah, LinkedIn Marketing UAE, TikTok Marketing Dubai"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Social Media Management & Strategy",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://asifdigital.agency"
          },
          "areaServed": [
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Sharjah" }
          ],
          "description": "Comprehensive social media management including organic content, community engagement, and regional influencer coordination for UAE brands."
        }}
        faqSchema={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden my-12 -mx-6 md:-mx-12 font-serif text-white tracking-tight leading-tight">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format,compress&fm=webp&q=75&w=1200)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div style={{ y, opacity }} className="max-w-4xl">
            <span className="micro-label block mb-4 text-white/60">Dubai & Sharjah Community</span>
            <h1 className="text-4xl md:text-7xl">
              Dominate the<br/><span className="text-white/80 italic">Digital Conversation.</span>
            </h1>
          </motion.div>
        </div>
        {/* Hidden SEO Image */}
        <img 
          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format,compress&fm=webp&q=75&w=1200" 
          alt="Social Media Management and Content Strategy Agency Dubai Sharjah" 
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
            In the UAE, social media isn't just about presence—it's about influence. We build communities that don't just 'like' your content, but become loyal advocates for your brand in Dubai and beyond.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors inline-flex items-center gap-2">Build Your Influence <ArrowRight className="w-4 h-4" /></Link>
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

      {/* FAQ Section */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="micro-label block mb-4 text-white/40">Common Inquiries</span>
            <h2 className="text-4xl font-serif tracking-tight">Social Strategy FAQs</h2>
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
              { title: "Graphic Design", link: "/services/graphic-design-agency-uae", desc: "Expert visual content to fuel your social media storytelling." },
              { title: "PPC Management", link: "/services/ppc-google-meta-ads-agency-dubai", desc: "Amplifying your organic reach with targeted paid social campaigns." },
              { title: "Digital Marketing", link: "/services/digital-marketing-agency-dubai-sharjah", desc: "Holistic strategy across all social, paid, and organic digital channels." }
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
