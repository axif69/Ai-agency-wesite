"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle, Clock, Database, HelpCircle, Languages, MessageSquare, Phone, ShieldCheck, UserCheck, Zap } from "lucide-react";

const useCases = [
  "Real estate teams can qualify buyers, collect budget and location, send brochures, and book viewings.",
  "Clinics and salons can answer service questions, collect patient details, and push users toward appointments.",
  "Ecommerce brands can answer delivery, product, order and return questions without manual replies.",
  "Service businesses can capture job details, area, urgency and contact information before a human calls.",
];

const features = [
  { icon: <MessageSquare className="w-6 h-6" />, title: "Instant WhatsApp replies", desc: "Answer common questions immediately, even outside working hours, while keeping human handoff available." },
  { icon: <UserCheck className="w-6 h-6" />, title: "Lead qualification", desc: "Collect name, phone, budget, location, service need and urgency before your team speaks to the prospect." },
  { icon: <Phone className="w-6 h-6" />, title: "Appointment and call booking", desc: "Move serious prospects toward a call, viewing, consultation or appointment instead of leaving chats unfinished." },
  { icon: <Database className="w-6 h-6" />, title: "CRM and sheet updates", desc: "Send qualified enquiries into HubSpot, Zoho, Google Sheets, email alerts or your internal workflow." },
];

const pricing = [
  { title: "Basic WhatsApp lead bot", price: "From AED 1,500", desc: "FAQ replies, lead capture, notification and simple handoff." },
  { title: "Business chatbot system", price: "AED 3,000-7,000+", desc: "WhatsApp flows, website bot, CRM updates, appointment routing and reporting." },
  { title: "Custom AI chatbot", price: "Scoped after audit", desc: "Advanced AI answers trained on your content, multi-language support and custom integrations." },
];

const faqs = [
  { q: "What is a WhatsApp chatbot in Dubai?", a: "It is an automated WhatsApp assistant for your business. It can answer FAQs, collect lead details, qualify prospects, share links or brochures, and alert your team when a human should take over." },
  { q: "Can the chatbot speak Arabic and English?", a: "Yes. We can build English, Arabic or bilingual chatbot flows depending on your audience. For sensitive answers, we keep human approval and escalation rules." },
  { q: "Can it connect with my CRM?", a: "Yes. We can connect WhatsApp enquiries to HubSpot, Zoho, Salesforce, Google Sheets, email notifications or a custom dashboard depending on your setup." },
  { q: "How much does a WhatsApp chatbot cost in Dubai?", a: "A simple lead chatbot can start from around AED 1,500. More complete systems with CRM, appointment booking, bilingual flows and reporting cost more depending on the workflow." },
  { q: "Will the bot replace my sales team?", a: "No. The best setup helps your team respond faster. The chatbot handles repetitive questions and data collection, then passes serious or complex enquiries to a human." },
];

export default function AiChatbotsDubai() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <section className="relative overflow-hidden px-6 md:px-12 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.13),transparent_36%),linear-gradient(to_bottom,#050505,#080808)]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="micro-label block mb-6 text-green-400">WhatsApp Chatbot Dubai</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.92] tracking-tight mb-8">WhatsApp Chatbot Dubai.</h1>
            <p className="text-lg md:text-xl text-white/65 font-light leading-relaxed max-w-3xl mb-10">
              Turn WhatsApp messages into qualified leads, booked calls and cleaner CRM records. Asif Digital builds WhatsApp chatbots for Dubai and UAE businesses that need faster replies without losing human control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/free-growth-audit" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/85 transition-colors inline-flex items-center justify-center gap-3">
                Book Free Chatbot Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/ai-automation-agency-dubai" className="border border-white/15 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-green-400/50 transition-colors inline-flex items-center justify-center gap-3">
                See AI Automation
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center text-green-300"><Bot className="w-6 h-6" /></div>
              <div>
                <h2 className="font-serif text-2xl">Example chatbot flow</h2>
                <p className="text-white/45 text-sm">Question → qualification → human handoff</p>
              </div>
            </div>
            {["Customer sends WhatsApp message", "Bot answers common question", "Bot collects name and requirement", "Lead is tagged and saved", "Team receives handoff alert"].map((step, i) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/40 p-4 mb-3">
                <span className="w-7 h-7 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-sm text-white/75">{step}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <span className="micro-label block mb-4 text-green-400">The real problem</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">Most leads do not disappear. They wait too long for a reply.</h2>
            <p className="text-white/55 leading-relaxed">Dubai buyers expect quick answers. A WhatsApp chatbot helps your business reply faster, collect useful details and move serious prospects to a human conversation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["24/7 first response", "Lead qualification", "Appointment routing", "CRM handoff"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <CheckCircle className="w-5 h-5 text-green-400 mb-4" />
                <p className="text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="micro-label block mb-4 text-green-400">What we build</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">Practical chatbot systems, not gimmicks.</h2>
            <p className="text-white/55 leading-relaxed">The goal is simple: reduce missed enquiries, improve response time and give your team cleaner lead information.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-8">
                <div className="text-green-300 mb-6">{item.icon}</div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-white text-black rounded-[2.5rem] mx-4 md:mx-12">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-black/45 block mb-4">UAE use cases</span>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-12">Built around how customers message businesses in Dubai.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((item) => (
              <div key={item} className="rounded-3xl border border-black/10 bg-black/[0.03] p-7">
                <p className="text-black/65 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <span className="micro-label block mb-4 text-green-400">Cost and starting point</span>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-12">How much does a WhatsApp chatbot cost in Dubai?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pricing.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-8">
                <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                <p className="text-green-300 font-bold tracking-wide mb-5">{item.price}</p>
                <p className="text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: <Clock className="w-5 h-5" />, title: "Faster response", desc: "Reply before the lead goes to another business." },
            { icon: <Languages className="w-5 h-5" />, title: "Arabic and English", desc: "Support bilingual enquiries with clear handoff rules." },
            { icon: <ShieldCheck className="w-5 h-5" />, title: "Human control", desc: "Keep your team involved for sensitive or high-value chats." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
              <div className="text-green-300 mb-5">{item.icon}</div>
              <h3 className="text-xl font-serif mb-3">{item.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <HelpCircle className="w-10 h-10 text-green-400 mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif mb-10">WhatsApp chatbot FAQs.</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-bold mb-3">{faq.q}</h3>
                <p className="text-white/55 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28 text-center bg-[#080808] border-t border-white/5">
        <Zap className="w-10 h-10 text-green-400 mx-auto mb-8" />
        <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-8">Want WhatsApp to capture better leads?</h2>
        <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">Send us your website and current WhatsApp process. We will suggest the first chatbot flow that can save time and protect more enquiries.</p>
        <Link href="/free-growth-audit" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/85 transition-colors inline-flex items-center justify-center gap-3">
          Book Free Chatbot Audit <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

