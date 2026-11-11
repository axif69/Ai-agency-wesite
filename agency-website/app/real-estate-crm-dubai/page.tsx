import PageComponent from '../../src/views/RealEstateCrmDubai';

export const metadata = {
  title: "Real Estate CRM Software Dubai | Implementation & Lead Routing",
  description: "Real estate CRM software and implementation for Dubai & UAE brokerages. Automate Bayut & Property Finder lead intake, WhatsApp routing SLAs, and deal pipelines.",
  alternates: {
    canonical: "https://www.asifdigital.agency/real-estate-crm-dubai"
  },
  openGraph: {
    title: "Real Estate CRM Software Dubai | Implementation & Lead Routing",
    description: "Real estate CRM software and implementation for Dubai & UAE brokerages. Automate Bayut & Property Finder lead intake, WhatsApp routing SLAs, and deal pipelines.",
    url: "https://www.asifdigital.agency/real-estate-crm-dubai",
    siteName: "Asif Digital: AI Automation, Web & Graphic Design",
    type: "website",
    images: [
      {
        url: "https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png",
        width: 1024,
        height: 1024,
        alt: "Real Estate CRM Dubai & Lead Automation — Asif Digital"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate CRM Software Dubai | Implementation & Lead Routing",
    description: "Real estate CRM software and implementation for Dubai & UAE brokerages. Automate Bayut & Property Finder lead intake, WhatsApp routing SLAs, and deal pipelines.",
    images: ["https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png"]
  }
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.asifdigital.agency/real-estate-crm-dubai#webpage",
      "url": "https://www.asifdigital.agency/real-estate-crm-dubai",
      "name": "Real Estate CRM Software Dubai | Implementation & Lead Routing",
      "breadcrumb": { "@id": "https://www.asifdigital.agency/real-estate-crm-dubai#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.asifdigital.agency/real-estate-crm-dubai#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.asifdigital.agency" },
        { "@type": "ListItem", "position": 2, "name": "Real Estate AI Hub", "item": "https://www.asifdigital.agency/real-estate" },
        { "@type": "ListItem", "position": 3, "name": "Real Estate CRM Dubai", "item": "https://www.asifdigital.agency/real-estate-crm-dubai" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.asifdigital.agency/real-estate-crm-dubai#service",
      "name": "Real Estate CRM Software & Implementation for Dubai Agencies",
      "serviceType": "Real Estate CRM Software Configuration, Portal Lead Routing & Brokerage Automation",
      "description": "Real estate CRM software and implementation for Dubai & UAE brokerages. Automate Bayut & Property Finder lead intake, WhatsApp routing SLAs, and deal pipelines.",
      "areaServed": [
        { "@type": "City", "name": "Dubai" },
        { "@type": "Country", "name": "United Arab Emirates" }
      ],
      "provider": {
        "@type": "Organization",
        "name": "Asif Digital",
        "url": "https://www.asifdigital.agency",
        "logo": "https://www.asifdigital.agency/icon-512.png",
        "telephone": "+971545866094",
        "email": "hello@asifdigital.agency"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does portal lead intake work with Bayut and Property Finder?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Depending on your agency's account configuration, we configure automated ingestion via official CRM connectors, portal email notification parsing, or webhook relays. Leads are extracted instantly—including property reference, budget, and buyer phone number—and ingested into your CRM without manual data entry."
          }
        },
        {
          "@type": "Question",
          "name": "Can we use our existing CRM, or do you provide a new one?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both options are supported. If your agency already uses HubSpot, Salesforce, Zoho, or Propertybase, we build the automation and WhatsApp layer directly on top of your existing database. If you do not have a CRM, we configure a streamlined, real-estate-specific pipeline from scratch."
          }
        },
        {
          "@type": "Question",
          "name": "How does the 10-minute lead escalation work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We configure custom SLA rules tailored to your team. For example, if a high-intent portal lead is assigned to an agent and not opened or updated within 10 minutes, an automated notification alerts the sales manager or transfers the lead to the next available agent."
          }
        },
        {
          "@type": "Question",
          "name": "Is customer data protected under UAE laws?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our architecture is designed with UAE PDPL-aligned data handling, access controls, and customer-owned credentials. You retain 100% ownership of your CRM database, WhatsApp Business API accounts, and client communication records."
          }
        },
        {
          "@type": "Question",
          "name": "What is the typical deployment timeline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Typical deployments take 2 to 4 weeks for core lead capture, WhatsApp qualification, and agent routing workflows. Complex multi-branch brokerages or extensive historical data migrations can require longer."
          }
        },
        {
          "@type": "Question",
          "name": "Does the CRM submit documents directly to the Dubai Land Department (DLD)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The CRM provides internal workflow and milestone tracking for your agency—tracking Form F signing dates, NOC follow-ups, trustee appointment schedules, and commission splits. Official conveyancing, legal contracts, and property registrations are handled directly by your licensed brokers and official DLD Trustee offices."
          }
        }
      ]
    }
  ]
};

export default function Page() {
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
