"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Database,
  FileSearch,
  Globe2,
  Headphones,
  Landmark,
  Languages,
  LockKeyhole,
  MessageSquare,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

const capabilities = [
  {
    icon: MessageSquare,
    title: "Arabic WhatsApp and Web Agents",
    description:
      "Answer enquiries, qualify intent, collect details, and hand conversations to your team in Arabic or English.",
  },
  {
    icon: FileSearch,
    title: "Arabic Knowledge Assistants",
    description:
      "Search approved policies, product information, service guides, and internal documents with source-grounded answers.",
  },
  {
    icon: Workflow,
    title: "Bilingual Workflow Automation",
    description:
      "Route requests, create CRM records, trigger follow-ups, and preserve the language and context of each conversation.",
  },
  {
    icon: Headphones,
    title: "Customer-Service Copilots",
    description:
      "Help service teams draft consistent replies, summarize conversations, and escalate sensitive or uncertain cases.",
  },
  {
    icon: Database,
    title: "Arabic Document Intelligence",
    description:
      "Classify, summarize, extract, and compare Arabic and bilingual business documents using controlled workflows.",
  },
  {
    icon: BarChart3,
    title: "Conversation Quality Analytics",
    description:
      "Track unresolved questions, escalation reasons, language preference, conversion events, and content gaps.",
  },
];

const sectors = [
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Arabic and bilingual property enquiry handling, project FAQs, lead qualification, viewing requests, and CRM routing.",
  },
  {
    icon: Headphones,
    title: "Customer Service",
    description:
      "Always-available first-line support for common requests with controlled escalation to the right human team.",
  },
  {
    icon: Landmark,
    title: "Government and Public Services",
    description:
      "Clear Arabic service guidance, document discovery, and structured enquiry intake for approved public information.",
  },
  {
    icon: Scale,
    title: "Legal and Professional Services",
    description:
      "Internal document search, bilingual summaries, matter intake, and human-reviewed knowledge workflows.",
  },
  {
    icon: Users,
    title: "HR and Employee Support",
    description:
      "Arabic policy assistance, onboarding guidance, request triage, and multilingual employee communications.",
  },
  {
    icon: Globe2,
    title: "Hospitality and Tourism",
    description:
      "Guest enquiries, service information, reservation support, and bilingual handoff across web and messaging channels.",
  },
];

const evaluationChecks = [
  {
    title: "Language and dialect fit",
    description:
      "Test Modern Standard Arabic, Gulf expressions, English-Arabic code-switching, spelling variation, and your preferred brand tone.",
  },
  {
    title: "Answer grounding",
    description:
      "Confirm that business answers come from approved sources and that the system says when evidence is unavailable.",
  },
  {
    title: "Task completion",
    description:
      "Measure whether the assistant captures the right information, routes correctly, and completes the intended workflow.",
  },
  {
    title: "Safety and escalation",
    description:
      "Stress-test restricted topics, ambiguous requests, prompt injection, sensitive data, and human-escalation rules.",
  },
  {
    title: "RTL experience",
    description:
      "Check right-to-left layouts, numbers, dates, mixed-language content, buttons, forms, and mobile readability.",
  },
  {
    title: "Operational reporting",
    description:
      "Define useful measures such as containment, escalation, qualified leads, response time, and unresolved intent.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Arabic Workflow Audit",
    description:
      "We review your audience, channels, source content, dialect expectations, high-risk topics, and required human handoffs.",
  },
  {
    number: "02",
    title: "Prototype and Test Set",
    description:
      "We build a focused prototype and a representative Arabic-English evaluation set based on real customer questions.",
  },
  {
    number: "03",
    title: "Integration and Controls",
    description:
      "We connect approved knowledge, CRM or messaging workflows, then configure access, logging, retention, and escalation.",
  },
  {
    number: "04",
    title: "Measured Launch",
    description:
      "We launch after agreed checks pass, monitor live conversations, review failure patterns, and improve the system from evidence.",
  },
];

const faqs = [
  {
    question: "Does the system understand Khaleeji Arabic?",
    answer:
      "It can be configured and evaluated for Gulf Arabic use cases, but dialect performance depends on the model, the task, and the quality of your examples. We test representative UAE conversations before launch instead of promising universal dialect accuracy.",
  },
  {
    question: "Can it switch between Arabic and English?",
    answer:
      "Yes. We design bilingual workflows for customers who change language during the same conversation. The interface, knowledge retrieval, CRM notes, and human handoff can preserve that context.",
  },
  {
    question: "Do we need to train a model from scratch?",
    answer:
      "Usually not. Most projects use a suitable foundation model combined with approved knowledge, workflow logic, evaluation, and guardrails. Fine-tuning is considered only when evidence shows it is necessary.",
  },
  {
    question: "Can the assistant use our private company information?",
    answer:
      "Yes, through controlled retrieval and access rules. We first map what data is allowed, who can access it, where it may be processed, how long it is retained, and when a human must review the answer.",
  },
  {
    question: "Can it replace our Arabic customer-service team?",
    answer:
      "It is best used to automate repetitive questions and structured intake while escalating complex, sensitive, or high-value conversations to people. The goal is faster service and cleaner handoffs, not uncontrolled replacement.",
  },
  {
    question: "How long does an Arabic AI project take?",
    answer:
      "A focused prototype may take days, while a production system with private data, integrations, security review, and formal evaluation normally takes longer. We provide a scoped timeline after the workflow audit.",
  },
];

export default function ArabicAiHub() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-emerald-400/30">
      <section className="relative min-h-[82vh] flex items-center overflow-hidden px-6 md:px-12 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(16,185,129,0.12),transparent_34%),linear-gradient(to_bottom,#050505_0%,#080808_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center py-24">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-emerald-400 block mb-6">
              Arabic AI Solutions UAE
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif tracking-tight leading-[0.94] mb-8">
              Arabic AI that understands your business context.
            </h1>
            <p className="text-lg md:text-xl text-white/65 font-light max-w-3xl leading-relaxed mb-10">
              Asif Digital builds Arabic and bilingual AI assistants for UAE organisations across WhatsApp, websites, internal knowledge, customer service, and operational workflows. Every system is tested against your terminology, source content, risk rules, and handoff process before launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors">
                Discuss an Arabic AI Project <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#what-we-build" className="border border-white/15 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center justify-center hover:bg-white/5 transition-colors">
                See What We Build
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="rounded-[2.5rem] border border-white/10 bg-black/50 p-8 md:p-10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/35 block mb-2">Bilingual experience</span>
                <h2 className="text-2xl font-serif">One conversation. Two languages.</h2>
              </div>
              <Languages className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="space-y-4">
              <div className="mr-8 rounded-2xl rounded-tr-sm bg-white/[0.06] border border-white/10 p-5 text-right" dir="rtl" lang="ar">
                <p className="text-lg leading-relaxed">أحتاج تفاصيل المشروع والأسعار المتاحة.</p>
                <span className="text-[9px] text-white/35 mt-2 block">استفسار عميل</span>
              </div>
              <div className="ml-8 rounded-2xl rounded-tl-sm bg-emerald-400/10 border border-emerald-400/20 p-5" dir="rtl" lang="ar">
                <p className="leading-relaxed text-white/85">بالتأكيد. سأعرض لك المعلومات المعتمدة، ثم أطلب التفاصيل اللازمة لتحويل الاستفسار إلى الفريق المناسب.</p>
                <span className="text-[9px] text-emerald-300 mt-2 block">رد مبني على مصادر الشركة</span>
              </div>
              <div className="rounded-2xl border border-white/10 p-4 flex items-center gap-3 text-xs text-white/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Approved knowledge, structured intake, and human escalation remain connected.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/5 bg-black py-7 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-[10px] uppercase tracking-[0.18em] font-bold text-white/50">
          {["Arabic-first UX", "English-Arabic handoff", "Measured before launch", "Human escalation controls"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {item}
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 block mb-5">Why generic localisation fails</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-7">Arabic is not one setting.</h2>
            <p className="text-white/50 leading-relaxed">
              A translated interface is not the same as an Arabic operating experience. Language choice affects trust, comprehension, retrieval, layout, and whether a workflow is completed correctly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              ["MSA and Gulf usage", "Formal Arabic may suit policies and official information, while customer conversations can require more familiar Gulf phrasing."],
              ["Code-switching", "UAE conversations frequently combine Arabic and English names, products, numbers, locations, and business terminology."],
              ["Right-to-left experience", "Forms, menus, message bubbles, dates, numbers, and mixed-language content need deliberate RTL design and testing."],
              ["Business-specific meaning", "The assistant must understand your offers, policies, exclusions, terminology, and escalation boundaries—not merely translate words."],
            ].map(([title, description]) => (
              <div key={title} className="p-7 rounded-3xl border border-white/8 bg-white/[0.02]">
                <h3 className="text-xl font-serif mb-3">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="what-we-build" className="py-28 px-6 md:px-12 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 block mb-5">Commercial applications</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6">What we build.</h2>
            <p className="text-white/55 text-lg leading-relaxed">
              Each solution starts with a specific business job, approved information, measurable success criteria, and a clear point where a person takes over.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-8 rounded-[2rem] border border-white/8 bg-black hover:border-emerald-400/30 transition-colors">
                  <Icon className="w-6 h-6 text-emerald-400 mb-8" />
                  <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 block mb-5">UAE use cases</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Designed around the work your team already does.</h2>
          <p className="text-white/50 leading-relaxed">We adapt the language, knowledge, controls, and integrations to the operating reality of each sector.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <div key={sector.title} className="p-7 rounded-3xl border border-white/8 bg-white/[0.015]">
                <Icon className="w-6 h-6 text-white/35 mb-6" />
                <h3 className="text-xl font-serif mb-3">{sector.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{sector.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-24">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 block mb-5">Evidence before claims</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-7">How Arabic AI quality is evaluated.</h2>
            <p className="text-white/55 leading-relaxed mb-8">
              A polished demo is not proof of production quality. We create a project-specific evaluation set and test the system against realistic Arabic and bilingual scenarios before launch.
            </p>
            <div className="p-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.06] flex gap-4">
              <BrainCircuit className="w-6 h-6 text-emerald-400 shrink-0" />
              <p className="text-sm text-white/65 leading-relaxed">
                Results are reported by task and failure type. We do not present one invented “Arabic accuracy” percentage as proof that every dialect and workflow is solved.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluationChecks.map((check, index) => (
              <div key={check.title} className="p-6 rounded-3xl border border-white/8 bg-black">
                <span className="text-[10px] font-bold text-emerald-400 block mb-4">0{index + 1}</span>
                <h3 className="font-bold mb-2">{check.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{check.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 block mb-5">Implementation</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">From workflow audit to measured launch.</h2>
          <p className="text-white/50 leading-relaxed">Timelines depend on integrations, data sensitivity, approval requirements, and the depth of evaluation—not a generic 48-hour promise.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((step) => (
            <div key={step.number} className="p-7 rounded-3xl border border-white/8 bg-white/[0.015]">
              <span className="text-4xl font-serif text-white/15 block mb-8">{step.number}</span>
              <h3 className="text-xl font-serif mb-3">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 bg-white text-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/45 block mb-5">Privacy and governance</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">Controls designed before deployment.</h2>
            <p className="text-black/60 leading-relaxed">
              Hosting location alone does not make an AI system safe. Good governance starts with data purpose, access, approved sources, retention, logging, and clear responsibility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Data mapping", "Identify what information enters the system, why it is needed, and which fields should never be collected."],
              ["Access controls", "Restrict private knowledge and administrative actions according to user and team roles."],
              ["Approved sources", "Ground business answers in reviewed content with an update and ownership process."],
              ["Retention and logs", "Define how conversations, metadata, feedback, and audit records are stored and reviewed."],
              ["Human escalation", "Route uncertainty, complaints, sensitive requests, and high-value opportunities to named teams."],
              ["Vendor review", "Select models, hosting, and integrations according to the project’s data and risk requirements."],
            ].map(([title, description]) => (
              <div key={title} className="p-6 rounded-3xl border border-black/10 bg-black/[0.03]">
                <LockKeyhole className="w-5 h-5 mb-4 text-black/50" />
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400 block mb-5">Questions answered</span>
          <h2 className="text-4xl md:text-6xl font-serif">Arabic AI FAQ</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border border-white/8 rounded-2xl bg-white/[0.02]">
              <summary className="list-none cursor-pointer p-6 md:p-7 flex items-center justify-between gap-6">
                <span className="font-serif text-lg md:text-xl">{faq.question}</span>
                <span className="text-emerald-400 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-6 md:px-7 pb-7 text-white/55 leading-relaxed max-w-4xl">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto rounded-[3rem] border border-emerald-400/20 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.13),transparent_55%)] p-8 md:p-16 text-center">
          <Sparkles className="w-7 h-7 text-emerald-400 mx-auto mb-7" />
          <p className="text-2xl md:text-3xl font-serif mb-4" dir="rtl" lang="ar">ذكاء اصطناعي عربي يفهم سياق أعمالك.</p>
          <h2 className="text-4xl md:text-6xl font-serif mb-7">Start with one valuable Arabic workflow.</h2>
          <p className="text-white/55 max-w-2xl mx-auto leading-relaxed mb-10">
            Bring us the customer questions, internal process, or bilingual workflow causing the most friction. We will map the opportunity, risks, evidence, and practical first version.
          </p>
          <Link href="/contact" className="bg-white text-black px-9 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] inline-flex items-center gap-3 hover:bg-emerald-300 transition-colors">
            Book an Arabic AI Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-14 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.18em] font-bold text-white/45">
          <Link href="/services/whatsapp-automation-gcc" className="hover:text-white transition-colors">WhatsApp Automation GCC</Link>
          <Link href="/ai-automation-agency-dubai" className="hover:text-white transition-colors">AI Automation Agency Dubai</Link>
          <Link href="/ai-real-estate-uae" className="hover:text-white transition-colors">AI for UAE Real Estate</Link>
          <Link href="/ai-consulting-uae" className="hover:text-white transition-colors">AI Consulting UAE</Link>
        </div>
      </section>
    </div>
  );
}
