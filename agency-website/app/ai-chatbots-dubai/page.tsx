import PageComponent from '../../src/views/AiChatbotsDubai';

export const metadata = {
  title: "WhatsApp Chatbot Services Dubai | Meta API & AI Bots",
  description: "AI WhatsApp chatbot development in Dubai. Official Meta Cloud API, bilingual Arabic & English, 24/7 CRM lead qualification, and live human handover.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-chatbots-dubai"
  },
  openGraph: {
    title: "WhatsApp Chatbot Services Dubai | Meta API & AI Bots",
    description: "AI WhatsApp chatbot development in Dubai. Official Meta Cloud API, bilingual Arabic & English, 24/7 CRM lead qualification, and live human handover.",
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
        "name": "WhatsApp Chatbot Services Dubai",
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
            "name": "Is your WhatsApp chatbot built on the official Meta Business Platform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We build exclusively on the official WhatsApp Business Platform (Cloud API). This ensures high message delivery reliability, policy-compliant messaging workflows, multi-agent inbox support, and official Meta business verification without third-party scraping risks."
            }
          },
          {
            "@type": "Question",
            "name": "Does the WhatsApp chatbot support both Arabic and English?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our conversational models handle Modern Standard Arabic (MSA), common Gulf phrasing, and Arabizi alongside English. The chatbot adapts seamlessly while preserving right-to-left (RTL) formatting."
            }
          },
          {
            "@type": "Question",
            "name": "Can the chatbot transfer a conversation to a human sales agent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. When a prospect reaches a high-intent threshold or asks to speak with a representative, the system alerts your team via WhatsApp or CRM notification and hands over the full conversation transcript for live takeover."
            }
          },
          {
            "@type": "Question",
            "name": "Which CRM platforms can be integrated with the WhatsApp chatbot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We support bi-directional synchronization with HubSpot, Zoho CRM, Salesforce, Odoo, Google Sheets, Calendly, and custom webhook databases to ensure every contact and message history is stored automatically."
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
