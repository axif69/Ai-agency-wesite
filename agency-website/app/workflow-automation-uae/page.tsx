import PageComponent from '../../src/views/WorkflowAutomationUAE';

export const metadata = {
  title: "Workflow Automation UAE | Business Process & API Integration",
  description: "Operational workflow automation and systems integration in the UAE. We engineer automated document parsing, ERP & CRM synchronization, and approval pipelines using n8n, Make, and custom APIs.",
  alternates: {
    canonical: "https://www.asifdigital.agency/workflow-automation-uae"
  },
  openGraph: {
    title: "Workflow Automation UAE | Business Process & API Integration",
    description: "Operational workflow automation and systems integration in the UAE. Automated document parsing, ERP & CRM synchronization, and human-in-the-loop approval pipelines.",
    url: "https://www.asifdigital.agency/workflow-automation-uae",
    siteName: "Asif Digital",
    type: "website"
  }
};

const faqData = [
  {
    q: "How does workflow automation differ from hiring an AI development agency?",
    a: "While an AI development agency often focuses on building custom AI models or chat interfaces from scratch, workflow automation focuses on connecting and streamlining your existing operational software (ERPs, CRMs, billing tools, and email) using secure middleware and automated data validation."
  },
  {
    q: "Do you support self-hosted n8n instances within the UAE?",
    a: "Yes. For organizations subject to UAE Federal Decree-Law No. 45 or enterprise data governance policies, we deploy and configure self-hosted n8n instances on local cloud infrastructure, ensuring no confidential commercial data leaves UAE territory."
  },
  {
    q: "Can you automate document processing for Free Zone logistics and trading?",
    a: "Yes. We build pipelines that parse carrier bills of lading, packing lists, and commercial invoices, extracting container details and line items to accelerate internal Free Zone customs documentation workflows."
  },
  {
    q: "Does your invoice workflow verify legal tax compliance?",
    a: "No. We perform VAT field validation and invoice checks—such as checking that TRN syntax is formatted correctly, line items match purchase orders, and mathematical totals align. Final legal tax determinations remain the responsibility of your licensed tax auditor or internal finance director."
  },
  {
    q: "How long does a standard workflow integration take to deploy?",
    a: "A single targeted workflow (such as CRM-to-billing synchronization or invoice parsing) typically deploys in 2 to 3 weeks, including sandbox testing and staff approval training."
  }
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.asifdigital.agency/workflow-automation-uae#service",
        "name": "Asif Digital - Workflow Automation & Systems Integration UAE",
        "url": "https://www.asifdigital.agency/workflow-automation-uae",
        "telephone": "+971545866094",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        },
        "description": "Operational workflow automation and systems integration across the UAE. Specializing in n8n and Make middleware, document parsing, ERP/CRM sync, and human-in-the-loop approvals.",
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
            "name": "Workflow Automation UAE",
            "item": "https://www.asifdigital.agency/workflow-automation-uae"
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
