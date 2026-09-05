import PageComponent from '../../src/views/services/RealEstateDigitalSolutionsUAE';

export const metadata = {
  title: "Real Estate Digital Solutions UAE | Brokerage Tech & Portal Infrastructure",
  description: "Enterprise real estate digital solutions and technology infrastructure in the UAE. Custom brokerage websites, automated portal listing syndication, API feeds, and developer portals.",
  alternates: {
    canonical: "https://www.asifdigital.agency/real-estate-digital-solutions-uae"
  },
  openGraph: {
    title: "Real Estate Digital Solutions UAE | Brokerage Tech & Portal Infrastructure",
    description: "Enterprise real estate digital solutions and technology infrastructure in the UAE. Custom brokerage websites, automated portal listing syndication, API feeds, and developer portals.",
    url: "https://www.asifdigital.agency/real-estate-digital-solutions-uae",
    siteName: "Asif Digital",
    type: "website"
  }
};

const faqData = [
  {
    q: "How do custom real estate websites differ from standard WordPress or portal templates?",
    a: "Standard real estate templates rely on heavy PHP plugins, unoptimized databases, and generic themes that load slowly on mobile, causing high bounce rates and poor Google rankings. Our custom real estate websites are built on modern headless Next.js and React architecture, featuring sub-second property filtering, automated WebP image optimization, CDN caching, and direct API connections to your property database without third-party plugin vulnerability."
  },
  {
    q: "Can you automate listing syndication across Bayut, Property Finder, and Dubizzle?",
    a: "Yes. We engineer XML and REST API listing engines that synchronize your internal property listings directly with major UAE portals including Bayut, Property Finder, and Dubizzle. When an agent updates a price, uploads high-res photography, or marks a property as reserved, changes syndicate automatically, preventing manual duplicate entry across portal dashboards."
  },
  {
    q: "Does this digital infrastructure replace our sales CRM?",
    a: "No. Real estate digital solutions represent your customer-facing technology infrastructure—including your brokerage website, developer portals, listing feeds, and API middleware. For sales pipeline management, speed-to-lead automation, WhatsApp qualification, and broker assignment rules, this infrastructure connects directly into our dedicated Real Estate CRM setup or your existing CRM platform."
  },
  {
    q: "How do you handle off-plan developer data and brochure downloads?",
    a: "We build dedicated off-plan project hubs that ingest developer inventory data, high-resolution rendering galleries, payment plan schedules, and floor plan PDFs. Users can explore units by completion date, developer, and payment structure, while automated download gates capture qualified investor details before releasing brochures."
  },
  {
    q: "Who owns the codebase and property database after deployment?",
    a: "You retain 100% full ownership of your custom code repository, property database, media assets, and API configurations. We do not lock your brokerage into proprietary closed ecosystems; your team receives full administrative credentials and documentation upon handover."
  }
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.asifdigital.agency/real-estate-digital-solutions-uae#service",
        "name": "Asif Digital - Real Estate Digital Solutions & Technology Infrastructure UAE",
        "url": "https://www.asifdigital.agency/real-estate-digital-solutions-uae",
        "telephone": "+971545866094",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        },
        "description": "Enterprise real estate digital solutions and technology infrastructure across the UAE. Specializing in custom headless brokerage websites, automated Bayut and Property Finder XML syndication, developer project hubs, and API middleware.",
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
            "name": "Real Estate Digital Solutions",
            "item": "https://www.asifdigital.agency/real-estate-digital-solutions-uae"
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
