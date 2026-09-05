import PageComponent from '../../src/views/AiRealEstateAgenciesDubai';

export const metadata = {
  title: "AI for Real Estate Agencies in Dubai | Lead Intake, WhatsApp & CRM",
  description: "AI solutions for real estate agencies in Dubai. Automate multi-channel lead intake, sub-minute WhatsApp qualification, broker routing, and CRM pipeline synchronization.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-real-estate-agencies-dubai"
  },
  openGraph: {
    title: "AI for Real Estate Agencies in Dubai | Lead Intake, WhatsApp & CRM",
    description: "Enterprise AI infrastructure for Dubai real estate agencies. Multi-channel portal intake, WhatsApp qualification, and automated CRM routing.",
    url: "https://www.asifdigital.agency/ai-real-estate-agencies-dubai",
    siteName: "Asif Digital",
    type: "website"
  }
};

const faqData = [
  {
    q: "How does the system integrate with Property Finder and Bayut?",
    a: "We connect to your portal accounts using secure incoming webhook feeds or email parsing bridges. The moment a lead registers on a listing, our system triggers an instant automated WhatsApp intake message in under 30 seconds."
  },
  {
    q: "Does this require our agency to switch CRMs?",
    a: "No. Our architecture is built to integrate with whatever CRM your agency currently uses—including HubSpot, Salesforce, Zoho CRM, or custom internal spreadsheets and databases."
  },
  {
    q: "Can the AI handle Arabic and overseas buyers accurately?",
    a: "Yes. The conversational engine natively detects Arabic inputs (including Khaleeji, Levantine, and Egyptian dialects) as well as English, French, and Russian, responding in the prospect's language with culturally appropriate phrasing."
  },
  {
    q: "How does the broker copilot access our property inventory?",
    a: "We ingest your active off-plan inventory, developer payment plans, brochures, and secondary listings into a secure, private retrieval database. Your brokers can ask questions on-the-go and receive immediate unit information."
  },
  {
    q: "What is the difference between this agency system and the Real Estate AI Lead Dashboard?",
    a: "This commercial system provides end-to-end operational automation (multi-channel lead intake, WhatsApp qualification, and broker routing). The Real Estate AI Lead Dashboard is our specialized product module dedicated specifically to cross-channel advertising attribution and marketing ROI reporting."
  }
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.asifdigital.agency/ai-real-estate-agencies-dubai#service",
        "name": "Asif Digital - AI for Real Estate Agencies Dubai",
        "url": "https://www.asifdigital.agency/ai-real-estate-agencies-dubai",
        "telephone": "+971545866094",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        },
        "description": "AI systems and automation infrastructure for Dubai real estate agencies, brokerages, and property sales teams.",
        "provider": {
          "@type": "Organization",
          "name": "Asif Digital",
          "url": "https://www.asifdigital.agency"
        },
        "areaServed": [
          { "@type": "City", "name": "Dubai" },
          { "@type": "City", "name": "Abu Dhabi" },
          { "@type": "Country", "name": "United Arab Emirates" }
        ]
      },
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
            "name": "Real Estate AI Hub",
            "item": "https://www.asifdigital.agency/real-estate"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI for Real Estate Agencies",
            "item": "https://www.asifdigital.agency/ai-real-estate-agencies-dubai"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqData.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
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
