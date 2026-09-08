"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Database,
  Globe2,
  Headphones,
  Languages,
  LockKeyhole,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Workflow,
  HelpCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

interface Pillar {
  id: string;
  enTitle: string;
  arTitle: string;
  enDesc: string;
  arDesc: string;
  icon: React.ElementType;
  enFeatures: string[];
  arFeatures: string[];
  relatedLink?: { href: string; label: string };
}

const pillars: Pillar[] = [
  {
    id: "chatbots",
    enTitle: "Arabic AI Chatbots & WhatsApp Automation",
    arTitle: "شات بوت الذكاء الاصطناعي وأتمتة واتساب",
    enDesc: "Official Meta Cloud API integration and website conversational agents capable of communicating naturally in Modern Standard Arabic and Gulf dialects, qualifying leads, and routing inquiries instantly.",
    arDesc: "ربط رسمي عبر Meta Cloud API ومساعدات ذكية للمواقع الإلكترونية تتواصل بسلاسة باللغتين العربية والإنجليزية وباللهجة الخليجية، مع تأهيل فوري للعملاء المحتملين وتوجيه الاستفسارات.",
    icon: MessageSquare,
    enFeatures: [
      "Official Meta Cloud API verified infrastructure",
      "Instant response to Arabic & English customer inquiries",
      "Lead qualification & CRM dispatch in real time",
      "Graceful human escalation when nuance is required",
    ],
    arFeatures: [
      "بنية تحتية معتمدة عبر Meta Cloud API",
      "استجابة فورية للاستفسارات بالعربية والإنجليزية",
      "تأهيل العملاء وإرسال البيانات لنظام CRM مباشرة",
      "تحويل سلس للموظف البشري عند الحاجة",
    ],
    relatedLink: {
      href: "/services/whatsapp-automation-gcc",
      label: "View WhatsApp Automation Architecture",
    },
  },
  {
    id: "real-estate",
    enTitle: "Smart Real Estate Operations & Portal Triage",
    arTitle: "الذكاء الاصطناعي للعقارات وإدارة الأملاك الذكية",
    enDesc: "Automated ingestion of portal inquiries (Property Finder, Bayut, Dubizzle), multilingual buyer qualification, tenant maintenance request logging, and viewing scheduling.",
    arDesc: "استقبال وتصنيف تلقائي للاستفسارات الواردة من المنصات العقارية والإعلانات، وتأهيل المشترين والمستأجرين، وتسجيل طلبات الصيانة باللغتين العربية والإنجليزية.",
    icon: Building2,
    enFeatures: [
      "Speed-to-lead response for off-plan and secondary listings",
      "Automated tenant maintenance intake and ticket logging",
      "Multi-currency payment plan and brochure delivery",
      "Integration with agency management and CRM systems",
    ],
    arFeatures: [
      "رد فوري خلال ثوانٍ على مهتمي المشاريع قيد الإنشاء والجاهزة",
      "تسجيل طلبات صيانة المستأجرين وأتمتة التذاكر",
      "إرسال خطط السداد والكتيبات بلغة العميل المفضلة",
      "ربط متكامل مع أنظمة إدارة العقارات والوساطة",
    ],
    relatedLink: {
      href: "/real-estate-digital-solutions-uae",
      label: "Explore Brokerage Tech Infrastructure",
    },
  },
  {
    id: "crm-workflow",
    enTitle: "CRM & Operational Workflow Automation",
    arTitle: "أتمتة العمليات وربط أنظمة إدارة علاقات العملاء (CRM)",
    enDesc: "End-to-end integration connecting WhatsApp, landing pages, and lead channels into HubSpot, Zoho, or custom databases with automated Arabic follow-up sequences.",
    arDesc: "أتمتة شاملة تربط قنوات المحادثة ونماذج المواقع بأنظمة مثل HubSpot وZoho وقواعد البيانات المخصصة، مع رسائل متابعة تلقائية باللغة العربية.",
    icon: Workflow,
    enFeatures: [
      "Zero manual data entry from customer conversations",
      "Bilingual automated email & WhatsApp follow-ups",
      "n8n and Make operational middleware orchestration",
      "UAE PDPL-aligned data retention and security controls",
    ],
    arFeatures: [
      "إلغاء الإدخال اليدوي لبيانات العملاء من المحادثات",
      "رسائل متابعة تلقائية عبر البريد وواتساب بالعربية والإنجليزية",
      "بناء مسارات أتمتة متطورة عبر n8n وMake",
      "حوكمة البيانات بما يتماشى مع متطلبات الخصوصية في الإمارات",
    ],
    relatedLink: {
      href: "/workflow-automation-uae",
      label: "Learn More About Workflow Automation",
    },
  },
  {
    id: "knowledge-assistants",
    enTitle: "Enterprise Knowledge Assistants & Document Intelligence",
    arTitle: "المساعدات الذكية للشركات والبحث المعرفي في الوثائق",
    enDesc: "Source-grounded internal AI assistants that retrieve company policies, service guidelines, and bilingual contracts with strict citations and zero hallucination risk.",
    arDesc: "مساعدات ذكية مدعومة بمصادر معتمدة للبحث في سياسات الشركة واللوائح الداخلية ومقارنة العقود ثنائية اللغة بدقة وموثوقية عالية دون اختلاق معلومات.",
    icon: Database,
    enFeatures: [
      "Retrieval-Augmented Generation (RAG) on private company data",
      "Bilingual Arabic/English document parsing and summarization",
      "Strict citation of internal sources and verified answers",
      "Role-based access permissions and audit trails",
    ],
    arFeatures: [
      "بحث ذكي مبني على مصادر الشركة والوثائق الداخلية المعتمدة",
      "تحليل وتلخيص المستندات باللغتين العربية والإنجليزية",
      "توثيق الإجابات بمراجع دقيقة لتجنب المعلومات غير المؤكدة",
      "صلاحيات وصول محددة وسجلات تدقيق كاملة",
    ],
    relatedLink: {
      href: "/ai-consulting-uae",
      label: "Consulting & AI Implementation Strategy",
    },
  },
];

const linguisticPrinciples = [
  {
    enTitle: "Modern Standard Arabic (فصحى معاصرة)",
    arTitle: "الفصحى المعاصرة المعتمدة",
    enDesc: "Precision grammar and professional vocabulary for contracts, official correspondence, enterprise knowledge bases, and formal client communications across the UAE and GCC.",
    arDesc: "صياغة لغوية سليمة ومهنية تناسب العقود والمراسلات الرسمية وقواعد المعرفة المؤسسية للشركات في الإمارات ودول الخليج.",
  },
  {
    enTitle: "Gulf & Khaleeji Dialect Nuances (اللهجة الخليجية)",
    arTitle: "ملاءمة التخاطب الخليجي",
    enDesc: "Contextual conversational phrases and regional vocabulary (e.g., مرحباً، حياك الله، تفضل، شخباركم) integrated specifically for customer-facing messaging and sales inquiries.",
    arDesc: "استيعاب الأسلوب التخاطبي والمصطلحات الدارجة في خدمة العملاء والمبيعات لضمان تجربة تواصل طبيعية ومرحبة دون تكلف.",
  },
  {
    enTitle: "Bilingual Code-Switching & Terminology",
    arTitle: "المصطلحات المشتركة وتبديل اللغات",
    enDesc: "Handling natural UAE business conversations where clients mix Arabic and English terms seamlessly (e.g., 'Off-plan', 'ROI', 'Downtown', 'Ejari') without conversation breakdown.",
    arDesc: "التعامل الذكي مع محادثات الأعمال اليومية التي تمزج بين العربية والمصطلحات التقنية والإنجليزية دون ارتباك في الفهم.",
  },
  {
    enTitle: "Right-to-Left (RTL) Design & Numbers",
    arTitle: "التصميم من اليمين لليسار (RTL) والأرقام",
    enDesc: "Deliberate UI/UX engineering ensuring Arabic text, numbers, dates, currencies (AED/SAR), and layout elements render properly from right to left across mobile and web.",
    arDesc: "بناء واجهات تراعي الاتجاه الطبيعي للنصوص العربية من اليمين لليسار، وتنسيق الأرقام والتواريخ والعملات بسلاسة على الهواتف والأجهزة المختلفة.",
  },
];

const faqs = [
  {
    questionEn: "Why is Asif Digital operating this bilingual validation hub?",
    questionAr: "لماذا تخصص Asif Digital هذا المركز التجريبي ثنائي اللغة؟",
    answerEn: "Search data across the UAE and GCC shows increasing demand for Arabic AI chatbots, real estate automation, and CRM workflows. Many Arabic search queries currently land on English pages, creating a likely language-intent mismatch. This hub allows us to validate specific commercial demand in both Arabic and English before architecting dedicated native subpaths.",
    answerAr: "توضح بيانات محركات البحث في الإمارات والخليج طلباً متزايداً على روبوتات الذكاء الاصطناعي وأتمتة العقارات وأنظمة CRM باللغة العربية. وحالياً، تصل العديد من عمليات البحث العربية إلى صفحات إنجليزية مما يسبب تبايناً بين لغة البحث والمحتوى. يهدف هذا المركز إلى التحقق الفعلي من احتياجات السوق تمهيداً لتقديم صفحات مستقلة لكل خدمة رابحة.",
  },
  {
    questionEn: "Does your AI handle Gulf (Khaleeji) Arabic naturally?",
    questionAr: "هل يفهم الذكاء الاصطناعي اللهجة الخليجية بشكل طبيعي؟",
    answerEn: "Yes. Rather than using generic machine translation, our systems are configured and tested against representative UAE and GCC dialogue samples, understanding common phrasing, courteous greetings (حياك الله), and sector-specific terminology.",
    answerAr: "نعم. بدلاً من الاعتماد على الترجمة الآلية الحرفية، يتم ضبط النماذج واختبارها على نماذج حوارية واقعية من الإمارات والخليج لاستيعاب عبارات الترحيب والأسلوب التخاطبي والمصطلحات الخاصة بكل قطاع.",
  },
  {
    questionEn: "Can the assistant switch between Arabic and English mid-conversation?",
    questionAr: "هل يمكن للمساعد الذكي التبديل بين اللغتين العربية والإنجليزية أثناء المحادثة؟",
    answerEn: "Absolutely. Bilingual context preservation ensures that if a customer inquires in Arabic and later types in English (or includes English property or project names), the conversation continues seamlessly with full context preserved.",
    answerAr: "بالتأكيد. يحافظ النظام على سياق المحادثة بالكامل؛ فإذا بدأ العميل بالسؤال بالعربية ثم استخدم الإنجليزية (أو ذكر أسماء مشاريع ومصطلحات تقنية)، يستمر الحوار بسلاسة دون فقدان للبيانات.",
  },
  {
    questionEn: "How are customer data and privacy handled under UAE regulations?",
    questionAr: "كيف يتم التعامل مع خصوصية بيانات العملاء وفقاً لقوانين الإمارات؟",
    answerEn: "All automated workflows are designed in alignment with UAE Personal Data Protection Law (PDPL) principles. Client data is not used for public model retraining, customer credentials remain owned by the client, and hosting can be configured in UAE-region cloud infrastructure where required.",
    answerAr: "تصمم جميع مسارات الأتمتة بما يتوافق مع مبادئ القانون الاتحادي بشأن حماية البيانات الشخصية في الإمارات. لا تُستخدم بياناتك لتدريب نماذج عامة، وتظل بيانات الاعتماد مملوكة لشركتك مع خيارات استضافة سحابية داخل الإمارات عند الطلب.",
  },
  {
    questionEn: "Can Arabic AI automate portal lead capture for real estate brokerages?",
    questionAr: "هل يمكن للذكاء الاصطناعي العربي أتمتة استقبال عملاء المنصات العقارية؟",
    answerEn: "Yes. Incoming leads from Bayut, Property Finder, Dubizzle, or Meta ads can be automatically greeted in Arabic on WhatsApp within seconds, qualified for budget and intent, and logged into your CRM without delay.",
    answerAr: "نعم. يمكن استقبال المهتمين القادمين من بيوت، بروبرتي فايندر، دوبيزل، أو إعلانات ميتا برسالة ترحيبية فورية بالعربية عبر واتساب خلال ثوانٍ، وتأهيل ميزانيتهم وتفضيلاتهم وتوثيق البيانات في نظام CRM.",
  },
  {
    questionEn: "What happens when a customer asks a complex or sensitive question?",
    questionAr: "ماذا يحدث عند طرح سؤال معقد أو استفسار حساس لا يملكه النظام؟",
    answerEn: "We engineer strict guardrails and human-in-the-loop escalation rules. When a question falls outside verified documentation or involves complex negotiation, the system politely informs the customer and notifies your team instantly with conversation history.",
    answerAr: "نعتمد قواعد دقيقة للتحويل البشري الفوري؛ فعندما يتعلق السؤال بأمر تفاوضي حساس أو معلومات خارج المصادر المعتمدة، يخبر النظام العميل بأدب ويقوم بتحويل المحادثة وسجلها مباشرة إلى فريق عملك.",
  },
];

export default function ArabicAiHub() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [languageMode, setLanguageMode] = useState<"bilingual" | "ar" | "en">("bilingual");

  const whatsappLink =
    "https://wa.me/971545866094?text=" +
    encodeURIComponent("مرحباً Asif Digital، أود الاستفسار عن حلول الذكاء الاصطناعي وأتمتة العمليات باللغة العربية في الإمارات.");

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-emerald-400/30">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[84vh] flex items-center overflow-hidden px-6 md:px-12 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(16,185,129,0.12),transparent_40%),linear-gradient(to_bottom,#050505_0%,#080808_100%)]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 mb-6">
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                Bilingual AI Hub • الإمارات والخليج
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif tracking-tight leading-[1.02] mb-6">
              Bilingual Arabic AI Solutions & Workflow Automation
            </h1>

            {/* Arabic Lead Summary */}
            <div className="mb-8 p-5 rounded-2xl border border-emerald-400/20 bg-white/[0.02]" dir="rtl" lang="ar">
              <p className="text-xl md:text-2xl font-serif text-emerald-300 mb-2">
                ذكاء اصطناعي وأتمتة عمليات تفهم لغة وسياق أعمالك في الإمارات.
              </p>
              <p className="text-sm md:text-base text-white/75 font-light leading-relaxed">
                حلول متقدمة للشركات والقطاع العقاري في دبي وأبوظبي: شات بوت ذكي، أتمتة محادثات واتساب، ربط أنظمة إدارة علاقات العملاء (CRM)، والبحث الآمن في وثائق الشركات.
              </p>
            </div>

            <p className="text-base md:text-lg text-white/60 font-light leading-relaxed mb-8">
              We engineer bilingual enterprise AI agents that converse naturally in Modern Standard Arabic and Gulf dialects, qualify commercial leads, automate operational handoffs, and integrate directly with your CRM and messaging infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-400 text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20"
              >
                <span>استشارة واتساب بالعربية</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="border border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center hover:bg-white/5 transition-colors text-white/85"
              >
                Schedule Technical Audit
              </Link>
            </div>
          </motion.div>

          {/* Interactive Bilingual Conversation Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-black/60 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono uppercase text-white/60 tracking-wider">
                  Live Bilingual Experience • تجربة حية
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-emerald-400 border border-emerald-400/20">
                UAE &amp; GCC Logic
              </span>
            </div>

            <div className="space-y-4 text-sm">
              {/* User message in Arabic */}
              <div className="mr-6 rounded-2xl rounded-tr-sm bg-white/[0.06] border border-white/10 p-4 text-right" dir="rtl" lang="ar">
                <span className="text-[10px] text-white/40 block mb-1">عميل عقاري من دبي</span>
                <p className="text-white/90 leading-relaxed">
                  السلام عليكم، شفت إعلان المشروع الجديد في دبي هيلز. كم أسعار الغرفتين وكيف طريقة الدفع؟
                </p>
              </div>

              {/* AI response in Arabic + Structured Data */}
              <div className="ml-6 rounded-2xl rounded-tl-sm bg-emerald-400/10 border border-emerald-400/30 p-4 text-right" dir="rtl" lang="ar">
                <span className="text-[10px] text-emerald-300 block mb-1">المساعد الذكي (Asif Digital AI)</span>
                <p className="text-white/90 leading-relaxed mb-3">
                  وعليكم السلام ورحمة الله، حياك الله أخي الكريم. تبدأ أسعار شقق الغرفتين في المشروع من 1.85 مليون درهم إماراتي، مع خطة سداد مرنة تمتد لـ 5 سنوات.
                </p>
                <div className="p-2.5 rounded-lg bg-black/40 border border-emerald-400/20 text-xs text-emerald-200">
                  تم إرسال بروشور المشروع وخطة الدفع إلى محادثتك فورياً ✓
                </div>
              </div>

              {/* System Action Badge */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 flex items-center justify-between text-xs text-white/55">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CRM Record Created (Dubai Hills Lead #4810)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Response: 1.2s</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Validation Hub Notice ── */}
      <section className="py-6 px-6 border-b border-white/5 bg-emerald-400/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">Demand Validation Hub:</strong> Validating enterprise bilingual Arabic workflows across UAE, Saudi Arabia, and GCC commercial search queries.
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400/80">
            <span>Modern Standard Arabic</span>
            <span>•</span>
            <span>Gulf Dialect Fit</span>
            <span>•</span>
            <span>PDPL Aligned</span>
          </div>
        </div>
      </section>

      {/* ── 4 Core Service Pillars (Targeting Validated Demand) ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400 block mb-4">
            Commercial Capabilities • مجالات العمل
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Bilingual AI Built for GCC Enterprise Operations
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Engineered around the exact commercial inquiries and operations where UAE organisations experience language friction or manual bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/40 hover:bg-white/[0.04] hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                      {p.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif mb-2 text-white group-hover:text-emerald-300 transition-colors">
                    {p.enTitle}
                  </h3>
                  <h4 className="text-lg font-serif mb-4 text-emerald-400/90 text-right" dir="rtl" lang="ar">
                    {p.arTitle}
                  </h4>

                  <p className="text-sm text-white/60 font-light leading-relaxed mb-4">
                    {p.enDesc}
                  </p>
                  <p className="text-sm text-white/70 font-light leading-relaxed mb-6 text-right p-3 rounded-xl bg-black/40 border border-white/5" dir="rtl" lang="ar">
                    {p.arDesc}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-white/40 block font-mono">
                        Key Capabilities (English)
                      </span>
                      <ul className="space-y-1.5 text-xs text-white/70">
                        {p.enFeatures.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-white/5" dir="rtl" lang="ar">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400/70 block font-mono text-right">
                        المزايا التشغيلية (بالعربية)
                      </span>
                      <ul className="space-y-1.5 text-xs text-white/75 text-right">
                        {p.arFeatures.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {p.relatedLink && (
                  <div className="pt-4 border-t border-white/10">
                    <Link
                      href={p.relatedLink.href}
                      className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                    >
                      <span>{p.relatedLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Linguistic Reality: MSA vs Khaleeji vs Code-Switching ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400 block mb-4">
            Linguistic Precision • المعايير اللغوية
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Why Generic Localisation Fails in the Gulf
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Machine translation replaces words; enterprise conversational AI respects regional etiquette, formal business standards, and seamless right-to-left layout dynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {linguisticPrinciples.map((item, idx) => (
            <div key={idx} className="p-7 rounded-2xl border border-white/10 bg-white/[0.015] hover:border-emerald-400/40 hover:bg-white/[0.03] hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-emerald-400">0{idx + 1}</span>
                <span className="text-base font-serif text-emerald-300" dir="rtl" lang="ar">
                  {item.arTitle}
                </span>
              </div>
              <h3 className="text-xl font-serif text-white mb-3">{item.enTitle}</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
                {item.enDesc}
              </p>
              <p className="text-xs text-white/70 font-light leading-relaxed text-right p-3 rounded-xl bg-black/40 border border-white/5" dir="rtl" lang="ar">
                {item.arDesc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Data Governance & PDPL Alignment ── */}
      <section className="py-24 px-6 md:px-12 bg-[#080808] border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-4">
              <LockKeyhole className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-mono uppercase text-white/60 tracking-wider">
                Governance &amp; Sovereignty
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Compliant by Architecture, Not by Afterthought
            </h2>
            <div className="text-sm text-white/75 font-light leading-relaxed space-y-4" dir="rtl" lang="ar">
              <p className="text-lg font-serif text-emerald-300">
                حوكمة كاملة للبيانات والتزام بمتطلبات الخصوصية في الإمارات.
              </p>
              <p>
                نصمم أنظمة الذكاء الاصطناعي مع مراعاة تشريعات حماية البيانات الشخصية (UAE PDPL). لا يتم تدريب النماذج العامة على سجلاتك الخاصة، وتظل صلاحيات الوصول وسجلات المحادثات تحت الإشراف الكامل لفريقك.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                titleEn: "Customer-Owned Credentials",
                titleAr: "ملكية بيانات الاعتماد",
                descEn: "You retain full ownership of Meta Business Manager and CRM API access tokens.",
                descAr: "تبقى حسابات واتساب وأنظمة إدارة علاقات العملاء مملوكة بالكامل لشركتك.",
              },
              {
                titleEn: "Zero Public Retraining",
                titleAr: "عدم مشاركة البيانات لتدريب النماذج",
                descEn: "Client records and internal knowledge bases are never exposed to public LLM training pipelines.",
                descAr: "بياناتك واستفسارات عملائك محمية ولا تُستخدم لتدريب نماذج عامة إطلاقاً.",
              },
              {
                titleEn: "Human-in-the-Loop Safeguards",
                titleAr: "إشراف بشري مستمر",
                descEn: "Automatic escalation to human agents whenever uncertainty or high-value negotiation occurs.",
                descAr: "تحويل مباشر للموظفين عند الحاجة لضمان دقة التعامل في الحالات الحساسة.",
              },
              {
                titleEn: "Optional UAE Regional Hosting",
                titleAr: "خيارات استضافة سحابية محلية",
                descEn: "Deployable on UAE cloud zones (AWS UAE / Azure UAE) where regulatory policies require it.",
                descAr: "إمكانية الاستضافة السحابية داخل الإمارات وفقاً لمتطلبات الحوكمة المؤسسية.",
              },
            ].map((card, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/10 bg-black hover:border-emerald-400/40 hover:bg-white/[0.03] hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-emerald-300 transition-colors">{card.titleEn}</h4>
                <h5 className="font-serif text-emerald-400 text-xs mb-2 text-right" dir="rtl" lang="ar">
                  {card.titleAr}
                </h5>
                <p className="text-xs text-white/50 leading-relaxed mb-2">{card.descEn}</p>
                <p className="text-xs text-white/65 leading-relaxed text-right" dir="rtl" lang="ar">
                  {card.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bilingual FAQs ── */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-b border-white/5">
        <div className="text-center mb-16">
          <HelpCircle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif mb-3">Frequently Asked Questions</h2>
          <p className="text-emerald-300 font-serif text-xl" dir="rtl" lang="ar">
            الأسئلة الشائعة حول حلول الذكاء الاصطناعي بالعربية
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <div className="space-y-1">
                    <h3 className="text-base md:text-lg font-serif text-white">{faq.questionEn}</h3>
                    <h4 className="text-sm md:text-base font-serif text-emerald-400/90 text-right" dir="rtl" lang="ar">
                      {faq.questionAr}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 space-y-4 border-t border-white/5">
                    <p className="text-sm text-white/65 leading-relaxed font-light">
                      {faq.answerEn}
                    </p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-right" dir="rtl" lang="ar">
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        {faq.answerAr}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Arabic CTA Section ── */}
      <section className="py-24 px-6 md:px-12 text-center relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#0a120e]">
        <div className="max-w-4xl mx-auto relative z-10">
          <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-6" />
          <div dir="rtl" lang="ar" className="mb-6">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
              هل أنت جاهز لتفعيل الذكاء الاصطناعي بلغتك؟
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              تحدث مباشرة مع مستشارينا في الإمارات لمراجعة مسارات أعمالك وتحديد الحل الأمثل لشركتك سواء عبر واتساب أو تكامل الـ CRM.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-400 text-black px-10 py-5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-3 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20"
            >
              <span>تواصل معنا عبر واتساب الآن</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="border border-white/20 px-9 py-5 rounded-full font-bold uppercase tracking-wider text-xs inline-flex items-center gap-2 hover:bg-white/5 transition-colors text-white/80"
            >
              Request Enterprise Proposal
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contextual Cross-Link Hub ── */}
      <section className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-wider font-semibold text-white/50">
          <span className="text-emerald-400 font-mono">Related Capabilities:</span>
          <Link href="/services/whatsapp-automation-gcc" className="hover:text-white transition-colors">
            WhatsApp Automation GCC
          </Link>
          <Link href="/real-estate-digital-solutions-uae" className="hover:text-white transition-colors">
            Real Estate Digital Solutions UAE
          </Link>
          <Link href="/workflow-automation-uae" className="hover:text-white transition-colors">
            Workflow Automation UAE
          </Link>
          <Link href="/ai-consulting-uae" className="hover:text-white transition-colors">
            AI Consulting UAE
          </Link>
          <Link href="/ai-real-estate-agencies-dubai" className="hover:text-white transition-colors">
            AI for Real Estate Agencies
          </Link>
        </div>
      </section>
    </div>
  );
}
