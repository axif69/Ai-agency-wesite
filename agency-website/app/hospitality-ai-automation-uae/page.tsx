import PageComponent from '../../src/views/services/HospitalityAiAutomationUAE';

export const metadata = {
  title: "Hospitality AI Automation UAE | Hotel & Resort AI Concierge Systems",
  description: "Hospitality AI & hotel workflow automation in the UAE. 24/7 multilingual WhatsApp concierge, PMS integration, direct booking conversion workflows, and service dispatch.",
  alternates: {
    canonical: "https://www.asifdigital.agency/hospitality-ai-automation-uae"
  },
  openGraph: {
    title: "Hospitality AI Automation UAE | Hotel & Resort AI Concierge Systems",
    description: "Enterprise hospitality AI and hotel workflow automation across Dubai, Abu Dhabi, and the UAE. WhatsApp concierge, PMS connectivity, and housekeeping dispatch.",
    url: "https://www.asifdigital.agency/hospitality-ai-automation-uae",
    type: "website"
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Hospitality AI Automation UAE - Asif Digital",
  alternateName: "Hotel & Resort AI Workflow Automation Dubai",
  serviceType: "Hospitality AI, Hotel Workflow Automation, Multilingual Concierge Systems",
  provider: {
    "@type": "Organization",
    name: "Asif Digital",
    url: "https://www.asifdigital.agency"
  },
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "City", name: "Ras Al Khaimah" },
    { "@type": "Country", name: "United Arab Emirates" }
  ],
  url: "https://www.asifdigital.agency/hospitality-ai-automation-uae",
  description: "Enterprise hospitality AI workflow automation for UAE luxury hotels, resorts, and serviced apartments: 24/7 WhatsApp concierge, PMS integration, direct booking conversion workflows, and housekeeping dispatch."
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
      name: "Services",
      item: "https://www.asifdigital.agency/services"
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Hospitality AI Automation UAE",
      item: "https://www.asifdigital.agency/hospitality-ai-automation-uae"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which hotel Property Management Systems (PMS) can you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We engineer API and middleware connectors for major enterprise PMS platforms including Oracle Opera (Opera Cloud & Opera 5), Protel, Cloudbeds, Infor HMS, and WebRezPro. For independent boutique properties or serviced apartment groups using custom databases or specialized CRMs, we build bespoke webhook listeners via n8n and Make middleware."
      }
    },
    {
      "@type": "Question",
      name: "How does the AI concierge handle multilingual guests in the UAE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our conversational architecture automatically detects the guest's language from their first message. It naturally converses in over 20 languages—including Modern Standard Arabic, Gulf/Khaleeji phrasing, English, Russian, French, German, and Mandarin—allowing international travelers to interact in their native tongue."
      }
    },
    {
      "@type": "Question",
      name: "Are payment card details processed through WhatsApp or AI chat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. In strict compliance with PCI-DSS standards and hotel security guidelines, sensitive credit card details are never collected or stored over plain messaging. For reservation confirmations, deposits, or dining prepayments, the system generates secure, tokenized payment gateway links directing guests to the hotel's PCI-compliant booking engine."
      }
    },
    {
      "@type": "Question",
      name: "Can the AI take over our front-desk or concierge staff?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Hospitality AI is designed to assist and elevate staff, not replace human hospitality. It eliminates 60-70% of repetitive operational questions (Wi-Fi passwords, pool timings, luggage requests, check-out times), allowing your front-desk and concierge professionals to focus on genuine guest hospitality, face-to-face service recovery, and VIP care."
      }
    },
    {
      "@type": "Question",
      name: "What happens when a guest submits a complaint or service issue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The system features automated sentiment analysis and strict escalation boundaries. When a complaint, dissatisfaction, or sensitive issue is detected, the AI acknowledges the concern with professional empathy, refrains from hallucinating solutions, and immediately alerts the Front Office Duty Manager with the guest's room number and complete chat log."
      }
    },
    {
      "@type": "Question",
      name: "How long does deployment take for a hotel or resort in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical hotel implementation takes between 3 to 6 weeks. Phase 1 covers property knowledge base curation and WhatsApp Business API verification (Weeks 1-2); Phase 2 covers PMS middleware connection and department ticket routing (Weeks 3-4); Phase 3 involves staff training, sandbox testing, and staged go-live (Weeks 5-6)."
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
