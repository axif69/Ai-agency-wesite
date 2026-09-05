import PageComponent from '../../src/views/AiMarketingDubai';

export const metadata = {
  title: "AI Marketing Agency Dubai | Lead Generation, Ads & Automation",
  description: "AI powered marketing agency in Dubai. We build autonomous lead generation, predictive Google & Meta ads management, CRM scoring, and WhatsApp conversion systems across the UAE.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-marketing-dubai"
  },
  openGraph: {
    title: "AI Marketing Agency Dubai | Lead Generation, Ads & Automation",
    description: "AI powered marketing agency in Dubai. Enterprise lead generation, predictive advertising management, CRM lead scoring, and WhatsApp sales automation.",
    url: "https://www.asifdigital.agency/ai-marketing-dubai",
    siteName: "Asif Digital",
    type: "website"
  }
};

const faqData = [
  {
    q: "How does an AI marketing agency differ from a traditional digital marketing agency in Dubai?",
    a: "Traditional marketing agencies in Dubai rely on manual ad optimizations, monthly static reporting, and slow creative turnaround times, often creating a 4 to 24-hour delay in lead follow-up. An AI marketing agency integrates predictive bid management, automated multi-variant creative testing, sub-minute WhatsApp lead qualification, and closed-loop CRM revenue attribution to optimize campaigns for closed revenue rather than vanity impressions."
  },
  {
    q: "Can AI automate our Google Ads and Meta Ads campaigns?",
    a: "Yes. We configure algorithmic budget reallocation, automated bid adjustments, dynamic creative variations, and offline conversion tracking (CAPI) that feeds qualified CRM stage updates back into Google Ads and Meta Ads Manager algorithms to target higher-intent buyers across the UAE."
  },
  {
    q: "How does WhatsApp automation increase ad conversion rates in the UAE?",
    a: "In the UAE and GCC, over 80% of consumer and B2B engagement occurs via WhatsApp. By connecting Meta and Google ads directly to official WhatsApp Cloud API conversational funnels, incoming leads receive instant qualification, property or catalog matching, and calendar booking within 30 seconds, dramatically reducing lead decay."
  },
  {
    q: "Which CRMs and marketing platforms do you integrate?",
    a: "We integrate with major enterprise and SME platforms including HubSpot, Salesforce, Zoho CRM, Google Ads, Meta Ads Manager, TikTok Ads, Make, n8n, and custom webhooks connecting directly to your internal sales databases."
  },
  {
    q: "What factors determine the pricing of AI marketing services in Dubai?",
    a: "Pricing depends on your monthly advertising spend volume, the number of target markets (Dubai, Abu Dhabi, Saudi Arabia, or broader GCC), the complexity of your CRM lead scoring integration, and whether custom multilingual Arabic and English conversational agents are required."
  }
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.asifdigital.agency/ai-marketing-dubai#service",
        "name": "Asif Digital - AI Marketing & Lead Generation Agency Dubai",
        "url": "https://www.asifdigital.agency/ai-marketing-dubai",
        "telephone": "+971545866094",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        },
        "description": "AI powered marketing agency in Dubai specializing in predictive paid advertising, automated lead scoring, WhatsApp conversion funnels, and revenue attribution.",
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
