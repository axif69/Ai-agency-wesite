import PageComponent from '../../src/views/ArabicAiHub';

export const metadata = {
  title: "Arabic AI Solutions UAE | Khaleeji NLP, WhatsApp & Workflow Automation",
  description: "Bilingual Arabic AI solutions for UAE & GCC enterprises: WhatsApp business automation, smart real estate operations, CRM integration, and NLP assistants.",
  alternates: {
    canonical: "https://www.asifdigital.agency/arabic-ai-hub"
  },
  openGraph: {
    title: "Arabic AI Solutions & Workflow Automation UAE | Asif Digital",
    description: "Bilingual Arabic AI chatbots, WhatsApp business automation, CRM integration, and enterprise NLP assistants for UAE & GCC businesses.",
    url: "https://www.asifdigital.agency/arabic-ai-hub",
    type: "website"
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Arabic AI Solutions UAE - Asif Digital",
  alternateName: "حلول الذكاء الاصطناعي والأتمتة في الإمارات",
  serviceType: "Arabic AI Chatbots, WhatsApp Automation, CRM & Real Estate Workflows",
  provider: {
    "@type": "Organization",
    name: "Asif Digital",
    url: "https://www.asifdigital.agency"
  },
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Bahrain" }
  ],
  url: "https://www.asifdigital.agency/arabic-ai-hub",
  description: "Enterprise bilingual Arabic AI solutions across UAE and GCC: official Meta Cloud API WhatsApp automation, smart real estate lead triage, CRM pipeline integration, and source-grounded knowledge assistants."
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.asifdigital.agency"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Arabic AI Hub",
      item: "https://www.asifdigital.agency/arabic-ai-hub"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is Asif Digital operating this bilingual validation hub? / لماذا تخصص Asif Digital هذا المركز التجريبي ثنائي اللغة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Search data across the UAE and GCC shows increasing demand for Arabic AI chatbots, real estate automation, and CRM workflows. Many Arabic search queries currently land on English pages, creating a likely language-intent mismatch. This hub allows us to validate specific commercial demand in both Arabic and English before architecting dedicated native subpaths."
      }
    },
    {
      "@type": "Question",
      name: "Does your AI handle Gulf (Khaleeji) Arabic naturally? / هل يفهم الذكاء الاصطناعي اللهجة الخليجية بشكل طبيعي؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Rather than using generic machine translation, our systems are configured and tested against representative UAE and GCC dialogue samples, understanding common phrasing, courteous greetings (حياك الله), and sector-specific terminology."
      }
    },
    {
      "@type": "Question",
      name: "Can the assistant switch between Arabic and English mid-conversation? / هل يمكن للمساعد الذكي التبديل بين اللغتين العربية والإنجليزية أثناء المحادثة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Bilingual context preservation ensures that if a customer inquires in Arabic and later types in English (or includes English property or project names), the conversation continues seamlessly with full context preserved."
      }
    },
    {
      "@type": "Question",
      name: "How are customer data and privacy handled under UAE regulations? / كيف يتم التعامل مع خصوصية بيانات العملاء وفقاً لقوانين الإمارات؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All automated workflows are designed in alignment with UAE Personal Data Protection Law (PDPL) principles. Client data is not used for public model retraining, customer credentials remain owned by the client, and hosting can be configured in UAE-region cloud infrastructure where required."
      }
    },
    {
      "@type": "Question",
      name: "Can Arabic AI automate portal lead capture for real estate brokerages? / هل يمكن للذكاء الاصطناعي العربي أتمتة استقبال عملاء المنصات العقارية؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Incoming leads from Bayut, Property Finder, Dubizzle, or Meta ads can be automatically greeted in Arabic on WhatsApp within seconds, qualified for budget and intent, and logged into your CRM without delay."
      }
    },
    {
      "@type": "Question",
      name: "What happens when a customer asks a complex or sensitive question? / ماذا يحدث عند طرح سؤال معقد أو استفسار حساس لا يملكه النظام؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We engineer strict guardrails and human-in-the-loop escalation rules. When a question falls outside verified documentation or involves complex negotiation, the system politely informs the customer and notifies your team instantly with conversation history."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageComponent />
    </>
  );
}
