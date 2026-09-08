import PageComponent from '../../src/views/AiMarketingDubai';

export const metadata = {
  title: "AI Marketing Agency Dubai | Paid Ads, Funnels & Attribution",
  description: "AI marketing agency in Dubai specializing in paid advertising management, Meta Conversions API, Google offline conversion tracking, and automated WhatsApp intake funnels.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-marketing-dubai"
  },
  openGraph: {
    title: "AI Marketing Agency Dubai | Paid Ads, Funnels & Attribution",
    description: "AI marketing agency in Dubai specializing in paid advertising management, Meta Conversions API, Google offline conversion tracking, and automated WhatsApp intake funnels.",
    url: "https://www.asifdigital.agency/ai-marketing-dubai",
    siteName: "Asif Digital",
    type: "website"
  }
};

const faqData = [
  {
    q: "How does an AI marketing agency differ from a traditional digital marketing agency in Dubai?",
    a: "Traditional marketing agency setups often focus primarily on platform clicks, impressions, and manual campaign adjustments. An AI marketing agency integrates automated bid reallocation, systematic multi-angle creative testing, automated WhatsApp intake workflows, and closed-loop CRM revenue attribution to connect paid advertising directly with verified business outcomes."
  },
  {
    q: "How do you automate Google Ads and Meta Ads campaigns?",
    a: "We configure algorithmic budget reallocation, automated bid adjustments, dynamic creative variations, and server-side tracking (Meta Conversions API and Google offline conversion tracking) that feed verified CRM milestone updates back into ad managers to help algorithms target higher-intent buyers."
  },
  {
    q: "How does WhatsApp automation improve paid ad conversion rates in the UAE?",
    a: "In the UAE and GCC, WhatsApp is a primary channel for commercial dialogue. By routing Meta and Google ad traffic directly into verified WhatsApp Cloud API intake funnels, incoming prospects can immediately review catalogs, answer qualification questions, and schedule consultations without waiting for manual email follow-up."
  },
  {
    q: "Which CRMs and marketing platforms do you integrate?",
    a: "We integrate with major enterprise and SME platforms including HubSpot, Salesforce, Zoho CRM, Google Ads, Meta Ads Manager, TikTok Ads, Make, n8n, and custom webhooks connecting directly to your internal sales databases."
  },
  {
    q: "What factors determine the pricing of AI marketing services in Dubai?",
    a: "Pricing depends on your monthly advertising spend volume, the number of target ad channels (Google, Meta, TikTok), the complexity of your CRM integration, and whether custom bilingual Arabic and English conversational workflows are required."
  }
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.asifdigital.agency/ai-marketing-dubai#service",
        "name": "Asif Digital - AI Marketing Agency Dubai",
        "url": "https://www.asifdigital.agency/ai-marketing-dubai",
        "telephone": "+971545866094",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        },
        "description": "AI marketing agency in Dubai specializing in paid advertising management, Meta Conversions API, Google offline conversion tracking, and automated WhatsApp intake funnels.",
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
            "name": "Services",
            "item": "https://www.asifdigital.agency/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI Marketing Agency Dubai",
            "item": "https://www.asifdigital.agency/ai-marketing-dubai"
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
