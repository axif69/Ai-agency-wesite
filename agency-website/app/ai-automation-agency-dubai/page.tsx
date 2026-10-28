import PageComponent from '../../src/views/AiAutomationDubai';

export const metadata = {
  title: "AI Automation Agency Dubai | Custom Workflows & Enterprise Integrations | Asif Digital",
  description: "Enterprise AI automation agency in Dubai. Custom CRM integrations, WhatsApp business workflows, and human-in-the-loop automation for UAE firms. Request an audit.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-automation-agency-dubai"
  },
  openGraph: {
    title: "AI Automation Agency Dubai | Custom Workflows & Enterprise Integrations | Asif Digital",
    description: "Enterprise AI automation agency in Dubai. Custom CRM integrations, WhatsApp business workflows, and human-in-the-loop automation for UAE firms. Request an audit.",
    url: "https://www.asifdigital.agency/ai-automation-agency-dubai",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Agency Dubai | Custom Workflows & Enterprise Integrations | Asif Digital",
    description: "Enterprise AI automation agency in Dubai. Custom CRM integrations, WhatsApp business workflows, and human-in-the-loop automation for UAE firms. Request an audit."
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
            "name": "AI Automation Agency Dubai"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "AI Automation Agency Dubai",
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
        "serviceType": "Enterprise AI Automation, CRM Integration & Workflow Engineering",
        "areaServed": [
          { "@type": "City", "name": "Dubai" },
          { "@type": "Country", "name": "United Arab Emirates" }
        ],
        "description": "Enterprise AI automation agency in Dubai for WhatsApp, CRM, lead routing and operational workflows with human oversight."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does an enterprise AI automation agency actually do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An enterprise AI automation agency designs, builds, and maintains software integrations that automate repetitive business operations. Rather than delivering isolated no-code bots or conceptual slide decks, we engineer resilient backend pipelines, custom API middleware, document extraction systems, and human-in-the-loop workflows that connect your CRM, ERP, databases, and communication channels into a unified, auditable operational backbone."
            }
          },
          {
            "@type": "Question",
            "name": "How does Asif Digital differ from basic no-code setups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simple task automation setups typically rely on basic single-step triggers without automated failure recovery, schema validation, or error alerting. Asif Digital engineers multi-system enterprise automation: we build with structured API middleware, automated retry logic, error alerting, human verification checkpoints for sensitive data, and governance practices aligned with UAE PDPL requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Which systems and software platforms can you integrate with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common integrations may include HubSpot, Salesforce, Zoho, SAP, Oracle NetSuite, Dynamics and other systems depending on API availability, permissions and the client's environment. We also engineer custom REST, GraphQL, and webhook adapters for proprietary in-house databases and legacy on-premise systems."
            }
          },
          {
            "@type": "Question",
            "name": "How does Asif Digital handle data privacy and UAE regulatory compliance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We design data architectures around UAE PDPL-aligned data handling, access controls, and client-specific security requirements. Deployment options can include UAE-region cloud tenancy, private infrastructure and role-based access controls depending on client requirements and provider availability. Deployment options can be configured so client data is not used for public model training."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between workflow automation, AI agents, and AI consulting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Workflow automation focuses on deterministic, rules-based data movement between APIs and databases. AI agents introduce bounded reasoning, unstructured information extraction, and tool-calling autonomy within supervised operational boundaries. AI consulting provides the strategic readiness audits, architecture design, and governance frameworks that precede multi-system engineering. As an umbrella agency, Asif Digital delivers across all three disciplines."
            }
          },
          {
            "@type": "Question",
            "name": "What does an indicative deployment timeline look like?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical engagement follows an indicative 4-to-6 week deployment framework: Week 1 focuses on workflow discovery and technical scoping; Weeks 2-3 on API integration and schema engineering; Weeks 4-5 on human-in-the-loop validation and security review; and Week 6 on monitored production rollout and team handoff. Actual delivery depends on system access, integration complexity, security review and business scope."
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

