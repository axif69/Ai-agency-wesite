import PageComponent from '../../src/views/AiChatbotsDubai';

export const metadata = {
  title: "WhatsApp Chatbot Development Dubai | Meta Cloud API | Asif Digital",
  description: "Official Meta Cloud API WhatsApp chatbot development in Dubai. Bilingual Arabic & English AI chatbots, 24/7 CRM lead qualification & live handover. Free consultation.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-chatbots-dubai"
  },
  openGraph: {
    title: "WhatsApp Chatbot Development Dubai | Meta Cloud API | Asif Digital",
    description: "Official Meta Cloud API WhatsApp chatbot development in Dubai. Bilingual Arabic & English AI chatbots, 24/7 CRM lead qualification & live handover. Free consultation.",
    url: "https://www.asifdigital.agency/ai-chatbots-dubai",
    siteName: "Asif Digital: AI Automation, Web & Graphic Design",
    type: "website"
  }
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.asifdigital.agency"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.asifdigital.agency/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "WhatsApp Chatbot Development Dubai"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "WhatsApp Chatbot Development Dubai",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Asif Digital: AI Automation, Web & Graphic Design",
          "telephone": "+971545866094",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Muwaileh Commercial - Industrial Area",
            "addressLocality": "Sharjah",
            "addressRegion": "Sharjah",
            "addressCountry": "AE"
          },
          "url": "https://www.asifdigital.agency"
        },
        "serviceType": "WhatsApp & Conversational AI Chatbot Development",
        "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
        "description": "Custom WhatsApp and AI chatbot development in Dubai. Official Meta WhatsApp Business Platform automation, bilingual Arabic and English NLP, CRM integration, and 24/7 lead qualification."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between an AI Chatbot and a legacy button-based chatbot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Legacy chatbots rely on rigid decision trees ('Press 1 for Sales') and fail whenever a user asks a complex question. Our Generative AI chatbots interpret natural language, typos, and nuanced business context in both English and Arabic. They answer inquiries directly from your verified documents and guide prospects through structured qualification flows."
            }
          },
          {
            "@type": "Question",
            "name": "Is your WhatsApp automation built on the official Meta Business Platform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We build exclusively on the official WhatsApp Business Platform (Cloud API). This ensures high message delivery reliability, policy-compliant messaging workflows, multi-agent inbox support, and eligibility for official Meta business verification assistance without third-party scraping risks."
            }
          },
          {
            "@type": "Question",
            "name": "How fast does the automated WhatsApp chatbot respond to incoming leads?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under normal network conditions, automated responses are delivered within seconds of receiving an inquiry. This immediate response is critical in competitive UAE markets like real estate and professional services where buyer engagement drops sharply after the first few minutes."
            }
          },
          {
            "@type": "Question",
            "name": "Does the AI support Arabic and Gulf (Khaleeji) conversational phrasing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our conversational models handle Modern Standard Arabic (MSA), common Gulf phrasing, and Arabizi (Arabic written in Latin characters with numbers). When a user switches between Arabic and English mid-sentence, the chatbot adapts seamlessly while preserving right-to-left (RTL) formatting."
            }
          },
          {
            "@type": "Question",
            "name": "Can the chatbot transfer a conversation to a human sales agent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. When a prospect reaches a high-intent threshold (such as an enterprise budget or urgent viewing request) or asks to speak with a representative, the system alerts your on-duty team via WhatsApp or CRM notification and hands over the full conversation transcript for a live takeover."
            }
          },
          {
            "@type": "Question",
            "name": "Which CRM and calendar platforms can be integrated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We support bi-directional synchronization with HubSpot, Zoho CRM, Salesforce, Odoo, Google Sheets, Calendly, Microsoft Bookings, and custom webhook databases to ensure every contact record, message history, and appointment is stored automatically."
            }
          },
          {
            "@type": "Question",
            "name": "What factors determine the cost of developing a custom WhatsApp & AI chatbot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pricing is determined by the number of conversational workflows required, integration depth (CRM, ERP, payment gateways), monthly messaging volumes, and knowledge-base complexity. We scope each project with a clear functional specification before implementation."
            }
          },
          {
            "@type": "Question",
            "name": "How are customer data and conversational records protected under UAE law?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All conversation records and customer details are transmitted through encrypted connections and processed in alignment with UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection. Client data is strictly kept within your own cloud or private database environments."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageComponent />
    </>
  );
}
