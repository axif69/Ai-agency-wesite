import PageComponent from '../../src/views/CustomCrmDevelopmentDubai';

export const metadata = {
  title: "Custom CRM Development Dubai | B2B Sales Pipelines | Asif Digital",
  description: "Enterprise custom CRM development in Dubai. Tailored B2B sales pipelines, multi-source lead ingestion, PostgreSQL databases, and ERP sync. Request an audit.",
  alternates: {
    canonical: "https://www.asifdigital.agency/custom-crm-development-dubai"
  },
  openGraph: {
    title: "Custom CRM Development Dubai | B2B Sales Pipelines | Asif Digital",
    description: "Enterprise custom CRM development in Dubai. Tailored B2B sales pipelines, multi-source lead ingestion, PostgreSQL databases, and ERP sync. Request an audit.",
    url: "https://www.asifdigital.agency/custom-crm-development-dubai",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom CRM Development Dubai | B2B Sales Pipelines | Asif Digital",
    description: "Enterprise custom CRM development in Dubai. Tailored B2B sales pipelines, multi-source lead ingestion, PostgreSQL databases, and ERP sync. Request an audit."
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
            "name": "Custom CRM Development Dubai",
            "item": "https://www.asifdigital.agency/custom-crm-development-dubai"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Custom CRM Development Dubai",
        "serviceType": "B2B CRM Software Engineering & Sales Pipeline Automation",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Asif Digital: AI Automation, Web & Graphic Design",
          "telephone": "+971545866094",
          "url": "https://www.asifdigital.agency",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Muwaileh Commercial - Industrial Area",
            "addressLocality": "Sharjah",
            "addressRegion": "Sharjah",
            "addressCountry": "AE"
          }
        },
        "areaServed": [
          { "@type": "City", "name": "Dubai" },
          { "@type": "City", "name": "Sharjah" },
          { "@type": "City", "name": "Abu Dhabi" },
          { "@type": "Country", "name": "United Arab Emirates" }
        ],
        "description": "Custom B2B CRM development in Dubai. Bespoke pipeline stages, multi-channel lead ingestion, relational database architecture, and ERP webhook integration."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does a custom CRM differ from off-the-shelf platforms like HubSpot, Salesforce, or Zoho?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Off-the-shelf CRMs charge recurring per-user monthly licenses that scale quickly as teams grow, while forcing your business into rigid, predefined data schemas. A custom CRM is engineered around your exact operational steps, customer attributes, and approval gates. You avoid paying for unused features, eliminate per-seat licensing penalties, and maintain direct control over your database schemas and backend code."
            }
          },
          {
            "@type": "Question",
            "name": "How is this different from your Real Estate CRM solution?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our Real Estate CRM is purpose-built for property brokerages, off-plan developers, and Bayut/Property Finder portal integrations. In contrast, this custom CRM service is engineered for general B2B organizations—such as fitout contractors, wholesale trading firms, specialized clinics, and professional corporate service providers—who need tailored customer records, custom quotation pipelines, and bespoke internal workflows."
            }
          },
          {
            "@type": "Question",
            "name": "Can a custom CRM integrate directly with our WhatsApp business communications?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. When paired with the official Meta WhatsApp Business Cloud API, customer conversations, inquiry submissions, and automated notifications can be piped directly into customer profile cards. This gives your account managers and sales coordinators complete conversational history in one centralized timeline."
            }
          },
          {
            "@type": "Question",
            "name": "Who owns the database, software code, and infrastructure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We engineer client-owned solutions. Delivered applications can be deployed directly into your company's own cloud tenancy (such as AWS, Microsoft Azure, Supabase, or Vercel). Upon final milestone completion and settlement, full administrative access and source-code repository ownership are handed over to your organization."
            }
          },
          {
            "@type": "Question",
            "name": "Can the database be hosted in UAE cloud regions to meet local compliance standards?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Custom databases and backend microservices can be provisioned in local UAE data centers—including AWS Middle East UAE (me-central-1 in Dubai/Abu Dhabi) or Microsoft Azure UAE North—to support compliance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL)."
            }
          },
          {
            "@type": "Question",
            "name": "Which third-party business tools and ERPs can you connect with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We engineer custom REST API and webhook middleware to sync with any platform providing accessible developer endpoints. Common integrations include ERP and accounting tools (such as Odoo, Zoho Books, SAP, QuickBooks, and Xero), payment processors (Stripe, Tap Payments), and corporate email services. Integration feasibility is verified during initial technical discovery based on your vendor's active subscription tier."
            }
          },
          {
            "@type": "Question",
            "name": "What does an indicative delivery timeline look like?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Indicative project timelines typically range from 4 to 8 weeks depending on technical scope: Phase 1 focuses on data schema modeling and pipeline mapping (Week 1–2); Phase 2 on full-stack UI development and database setup (Weeks 3–5); Phase 3 on API middleware, data migration, and exception handling (Weeks 6–7); and Phase 4 on end-to-end user acceptance testing, team walkthroughs, and production handover (Week 8)."
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
