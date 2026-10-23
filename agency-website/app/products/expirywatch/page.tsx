import { Metadata } from 'next';
import ExpiryWatchView from '../../../src/views/products/ExpiryWatchView';

export const metadata: Metadata = {
  title: "ExpiryWatch™ | Automated UAE Document Expiry & Compliance Copilot",
  description: "Eliminate late renewal fines in the UAE. ExpiryWatch tracks Trade Licenses, Visas, Emirates IDs, Ejari & Corporate Insurance with automated WhatsApp & email alerts.",
  alternates: {
    canonical: "https://www.asifdigital.agency/products/expirywatch"
  },
  openGraph: {
    title: "ExpiryWatch™ | UAE Document Expiry & Compliance Automation",
    description: "Never miss a UAE document renewal again. Automated multi-tier alerts via WhatsApp and email for Trade Licenses, Visas, Ejari & Insurance.",
    url: "https://www.asifdigital.agency/products/expirywatch",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ExpiryWatch™ | Automated UAE Document Expiry Copilot",
    description: "Zero fines on Trade Licenses, Visas, Ejari & Insurance in Dubai & UAE. Automated WhatsApp alerts."
  }
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.asifdigital.agency/products/expirywatch#software",
        "name": "ExpiryWatch™",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Cloud, WhatsApp",
        "description": "Automated UAE Document Expiry & Compliance Monitoring Software for Trade Licenses, Visas, Emirates IDs, Ejari, and Corporate Insurance policies.",
        "url": "https://www.asifdigital.agency/products/expirywatch",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "AED",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "description": "Free Starter Tier for up to 10 company documents"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "28"
        },
        "creator": {
          "@type": "Organization",
          "name": "Asif Digital Agency",
          "url": "https://www.asifdigital.agency"
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
            "name": "Products",
            "item": "https://www.asifdigital.agency/tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "ExpiryWatch",
            "item": "https://www.asifdigital.agency/products/expirywatch"
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
      <ExpiryWatchView />
    </>
  );
}
