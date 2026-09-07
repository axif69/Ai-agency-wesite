import PageComponent from "../../src/views/FreeGrowthAudit";

export const metadata = {
  title: "Free AI & Growth Audit Dubai | Automation, CRM & Funnel Review",
  description: "Request a free AI and growth audit for your Dubai business. We review workflow bottlenecks, CRM processes, automation opportunities and digital growth gaps with practical next-step recommendations.",
  alternates: {
    canonical: "https://www.asifdigital.agency/free-growth-audit"
  },
  openGraph: {
    title: "Free AI & Growth Audit Dubai | Automation, CRM & Funnel Review",
    description: "Request a free AI and growth audit for your Dubai business. We review workflow bottlenecks, CRM processes, automation opportunities and digital growth gaps with practical next-step recommendations.",
    url: "https://www.asifdigital.agency/free-growth-audit",
    type: "website",
    locale: "en_AE",
    siteName: "Asif Digital"
  }
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.asifdigital.agency/free-growth-audit#service",
        "name": "Free AI, Automation & Growth Audit Dubai",
        "serviceType": "Operational & Technology Audit",
        "provider": {
          "@type": "Organization",
          "name": "Asif Digital",
          "url": "https://www.asifdigital.agency"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Dubai, UAE"
        },
        "description": "Comprehensive diagnostic review of enterprise workflow bottlenecks, CRM lead-flow leakage, and AI automation opportunities for UAE businesses.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "AED"
        }
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
            "name": "Free Growth Audit",
            "item": "https://www.asifdigital.agency/free-growth-audit"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this growth and automation audit really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, 100% free with zero financial obligation. It is our introductory technical evaluation to demonstrate our architectural rigor to operating companies in the UAE."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to receive our audit deliverable?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Audits are typically completed within 2 to 3 business days. Because reviews are conducted manually by automation architects rather than automated scraping tools, we evaluate your actual workflow bottlenecks carefully."
            }
          },
          {
            "@type": "Question",
            "name": "Do we need to grant admin passwords or CRM database access?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We never ask for admin credentials or database access for this audit. We review public funnels, forms, speed metrics, and your submitted workflow description to diagnose bottlenecks."
            }
          },
          {
            "@type": "Question",
            "name": "How is our business data protected under UAE law?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All submitted operational details are treated with strict confidentiality in compliance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (UAE PDPL). Information is used strictly for diagnostic review."
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
