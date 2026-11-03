import PageComponent from '../../src/views/BusinessTaskAutomationDubai';

export const metadata = {
  title: "Business Task Automation Dubai | Automate Repetitive Operations & Workflows | Asif Digital",
  description: "Automate repetitive manual business tasks in Dubai and the UAE. We engineer automated lead entry, invoice data extraction, WhatsApp reminders, and reporting pipelines. Request a workflow audit.",
  alternates: {
    canonical: "https://www.asifdigital.agency/business-task-automation-dubai"
  },
  openGraph: {
    title: "Business Task Automation Dubai | Automate Repetitive Operations & Workflows | Asif Digital",
    description: "Automate repetitive manual business tasks in Dubai and the UAE. Automated lead entry, invoice data extraction, WhatsApp reminders, and reporting pipelines.",
    url: "https://www.asifdigital.agency/business-task-automation-dubai",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Task Automation Dubai | Automate Repetitive Operations & Workflows | Asif Digital",
    description: "Automate repetitive manual business tasks in Dubai and the UAE. Automated lead entry, invoice data extraction, WhatsApp reminders, and reporting pipelines."
  }
};

const faqData = [
  {
    q: "What types of manual tasks can you automate for my business?",
    a: "We specialize in operational tasks that involve repetitive data movement between software: syncing leads from ads to your CRM, extracting invoice details from emails or WhatsApp into accounting platforms, sending automated payment and renewal notifications, compiling cross-platform reports, and generating instant customer proposals."
  },
  {
    q: "Do we need to replace our existing software or CRM?",
    a: "No. Our approach connects to the tools you already use—such as Zoho, HubSpot, QuickBooks, Xero, Google Sheets, Meta Ads, and WhatsApp Business API. We build secure integration pipelines using modern middleware (like n8n or custom API microservices) so your team keeps their familiar interfaces."
  },
  {
    q: "How does the Task Efficiency Estimator calculate savings?",
    a: "The calculator multiplies the number of team members by their reported weekly hours spent on manual administrative tasks and standard UAE hourly rates. Industry benchmarks show well-engineered automations typically recover 60% to 75% of this time. These figures represent an indicative operational estimate based on your inputs, rather than a contractual guarantee."
  },
  {
    q: "How do you ensure data security and UAE PDPL compliance?",
    a: "All automated workflows are built with role-based access controls, encrypted API connections, and customer-owned credentials. We avoid public AI training on proprietary client data and design workflows aligned with UAE Personal Data Protection Law (PDPL) requirements."
  },
  {
    q: "What is the typical deployment timeline for a business automation project?",
    a: "Most single-system or two-system automations (such as automated lead ingestion or invoice parsing) go live within 2 to 3 weeks, including sandbox testing, error-handling validation, and team training."
  }
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Business Task Automation Dubai",
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
        "serviceType": "Business Process Automation, Manual Task Elimination & Workflow Engineering",
        "areaServed": [
          { "@type": "City", "name": "Dubai" },
          { "@type": "City", "name": "Abu Dhabi" },
          { "@type": "City", "name": "Sharjah" },
          { "@type": "Country", "name": "United Arab Emirates" }
        ],
        "description": "Enterprise business task and operational workflow automation in Dubai. Eliminates manual data entry, cross-software copy pasting, invoice parsing, and WhatsApp follow-ups."
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
            "name": "Business Task Automation Dubai",
            "item": "https://www.asifdigital.agency/business-task-automation-dubai"
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
