import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { ArrowRight, Users, Target, Globe, Award, CheckCircle } from "lucide-react";

const teamValues = [
  { icon: <Target className="w-6 h-6" />, title: "Results Over Everything", desc: "Every service we offer is measured by one standard: does it generate measurable business growth? Vanity metrics don't pay salaries — results do." },
  { icon: <Users className="w-6 h-6" />, title: "Specialist Teams, Not Generalists", desc: "Each service discipline — web, SEO, paid ads, social, creative — is executed by a dedicated specialist team that eats, sleeps, and breathes their craft." },
  { icon: <Globe className="w-6 h-6" />, title: "Built for the UAE Market", desc: "We understand Arabic bilingual requirements, local payment gateways (Telr, PayFort), Ramadan campaign nuances, and what actually converts UAE audiences." },
  { icon: <Award className="w-6 h-6" />, title: "Transparent Partnership", desc: "No jargon, no black boxes. You get full dashboard access, monthly reporting calls, and clear attribution of every dirham spent to business outcomes." },
];

const milestones = [
  { year: "2020", title: "Founded", desc: "Asif Digital launched in Sharjah with a focus on web development and digital marketing for UAE SMEs." },
  { year: "2022", title: "Agency Expansion", desc: "Grew from solo practice to a multi-specialist virtual agency, adding dedicated SEO, paid ads, and creative teams." },
  { year: "2023", title: "100+ Clients", desc: "Crossed 100 UAE businesses served across real estate, F&B, healthcare, retail, logistics, and tech sectors." },
  { year: "2024", title: "AI-First Approach", desc: "Integrated AI automation, chatbot development, and AI-driven marketing capabilities across all service lines." },
  { year: "2025", title: "Full-Service Agency", desc: "Launched all 13 service disciplines — the most comprehensive digital agency offering in the Sharjah/Dubai market." },
];

const services13 = [
  "Web Design", "Web Development", "Ecommerce Websites", "Web Hosting", "Website Support",
  "SEO", "PPC", "Social Media", "AI & Automation", "Branding", "Graphic Design", "UI/UX Design", "Creative Web Design"
];

export default function About() {
  return (
    <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <SEO
        title="About Asif Digital | Full-Service Digital Agency Dubai & Sharjah UAE"
        description="Asif Digital is a full-service digital agency founded by Asif Khan in Sharjah, UAE. Web design, SEO, PPC, social media, branding, AI automation — 13 services, 150+ clients, proven results."
      />

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-32 text-center md:text-left">
        <span className="micro-label block mb-4">The Agency</span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">About Asif Digital</h1>
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl">
          A full-service digital agency delivering web, marketing, creative, and AI services to businesses across Dubai, Sharjah, Abu Dhabi, and the wider GCC region.
        </p>
      </motion.div>

      {/* Founder + Agency Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center mb-40">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl transform -rotate-3 scale-105" />
          <img
            src="https://lh3.googleusercontent.com/d/1ChELaq_hCpBMzUpw9Z7H1TBYZ9nW_JU0"
            alt="Asif Khan — Founder, Asif Digital"
            className="w-full h-auto rounded-3xl object-cover grayscale hover:grayscale-0 transition-all duration-1000 relative z-10 border border-white/10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-8 left-8 z-20 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
            <div className="font-bold text-white text-lg">Asif Khan</div>
            <div className="text-white/50 text-xs uppercase tracking-widest font-bold">Founder & CEO, Asif Digital</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col justify-center space-y-10">
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-6">Founded on a Simple Belief</h2>
            <div className="space-y-5 text-white/60 font-light leading-relaxed text-lg">
              <p>
                Asif Digital was founded by Asif Khan in 2020 with one conviction: UAE businesses deserve a digital partner that actually delivers measurable results — not just beautiful websites and vague promises.
              </p>
              <p>
                What started as a boutique web and marketing practice has grown into a full-service virtual agency with specialist teams across 13 disciplines — web design, development, ecommerce, SEO, PPC, social media, AI automation, branding, graphic design, and UI/UX.
              </p>
              <p>
                We operate across the UAE and the wider GCC territory, serving clients in Dubai, Abu Dhabi, Sharjah, and internationally. 150+ businesses served. One goal: your growth.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[{ n: "150+", l: "UAE Clients" }, { n: "13", l: "Services" }, { n: "5 Yrs", l: "In Market" }].map((s, i) => (
              <div key={i} className="p-5 border border-white/5 rounded-2xl text-center bg-white/[0.02]">
                <div className="text-2xl font-serif mb-1">{s.n}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What We Cover */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-40 p-12 border border-white/5 rounded-2xl bg-white/[0.02]">
        <span className="micro-label block mb-6">Our 13 Services</span>
        <h2 className="text-4xl font-serif mb-8">Everything Your Business Needs.<br /><span className="italic text-white/40">Under One Roof.</span></h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {services13.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-white/60 text-sm font-medium p-3 border border-white/5 rounded-xl">
              <CheckCircle className="w-3 h-3 flex-shrink-0 text-white/30" /> {s}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:text-white/60 transition-colors">
            Explore All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Agency Values */}
      <div className="mb-40">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <span className="micro-label block mb-4">How We Work</span>
          <h2 className="text-4xl md:text-5xl font-serif">Our Core Values</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamValues.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/5 rounded-2xl hover:border-white/15 transition-colors">
              <div className="text-white/40 mb-4">{v.icon}</div>
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-40">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <span className="micro-label block mb-4">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-serif">How We Got Here</h2>
        </motion.div>
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-8 pb-10 border-b border-white/5 last:border-0 pt-10 first:pt-0">
              <div className="flex-shrink-0 w-20">
                <span className="text-white/30 text-sm font-bold uppercase tracking-widest">{m.year}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                <p className="text-white/50 font-light text-sm leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Location & CTA */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-10 border border-white/5 rounded-2xl bg-white/[0.02]">
          <h2 className="text-2xl font-serif mb-4">Location</h2>
          <p className="text-white/50 font-light leading-relaxed mb-2 italic text-xl">Operating across the UAE & GCC territory.</p>
          <p className="text-white/30 text-sm">Serving clients in Dubai, Sharjah, Abu Dhabi, Ajman, RAK, and internationally through our distributed specialist teams.</p>
        </div>
        <div className="p-10 border border-white/5 rounded-2xl bg-white/[0.02] flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-serif mb-4">Ready to Work Together?</h2>
            <p className="text-white/50 font-light leading-relaxed">Book a free 30-minute strategy session. No sales pitch — just an honest audit of your digital presence and the biggest opportunities we see.</p>
          </div>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-colors w-fit">
            Book Free Session <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
