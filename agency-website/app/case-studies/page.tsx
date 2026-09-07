import PageComponent from '../../src/views/CaseStudies';

export const metadata = {
  title: "AI & Digital Transformation Case Studies UAE | Asif Digital",
  description: "Explore verified AI, automation, and digital engineering case studies from Asif Digital. Detailed technical architectures, delivered controls, and honest operational results across the UAE.",
  alternates: {
    canonical: "https://www.asifdigital.agency/case-studies"
  },
  openGraph: {
    title: "AI & Digital Transformation Case Studies UAE | Asif Digital",
    description: "Explore verified AI, automation, and digital engineering case studies from Asif Digital. Detailed technical architectures, delivered controls, and honest operational results across the UAE.",
    url: "https://www.asifdigital.agency/case-studies",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Digital Transformation Case Studies UAE | Asif Digital",
    description: "Explore verified AI, automation, and digital engineering case studies from Asif Digital. Detailed technical architectures, delivered controls, and honest operational results across the UAE."
  }
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "Case Studies",
        "item": "https://www.asifdigital.agency/case-studies"
      }
    ]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.asifdigital.agency/case-studies#webpage",
    "url": "https://www.asifdigital.agency/case-studies",
    "name": "AI & Digital Transformation Case Studies UAE | Asif Digital",
    "description": "Verified proof-first case studies, technical architectures, and operational automation deployments engineered by Asif Digital for UAE businesses.",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://www.asifdigital.agency/#website",
      "name": "Asif Digital",
      "url": "https://www.asifdigital.agency"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <PageComponent />
    </>
  );
}

