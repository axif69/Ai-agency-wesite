import { Metadata } from 'next';
import TicketFlowView from '../../../src/views/products/TicketFlowView';

export const metadata: Metadata = {
  title: "TicketFlow™ | Smart Tenant Maintenance Ticketing & Dispatch for UAE",
  description: "Automated maintenance ticketing software for UAE property managers, landlords and facility teams. Zero-friction WhatsApp & photo intake with real-time technician dispatch.",
  alternates: {
    canonical: "https://www.asifdigital.agency/products/ticketflow"
  },
  openGraph: {
    title: "TicketFlow™ | UAE Tenant Maintenance Software & Dispatch",
    description: "Streamline tenant repairs in Dubai & Sharjah. Instant photo/video intake, automated technician dispatch, and SLA tracking via WhatsApp.",
    url: "https://www.asifdigital.agency/products/ticketflow",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TicketFlow™ | Smart Tenant Maintenance Ticketing UAE",
    description: "Cut repair coordination time by 40%. WhatsApp & QR code intake for UAE property managers."
  }
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.asifdigital.agency/products/ticketflow#software",
        "name": "TicketFlow™",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Cloud, WhatsApp, iOS, Android",
        "description": "Smart Tenant Maintenance Ticketing and Facility Dispatch Platform engineered for UAE property management companies, landlords, and commercial facilities.",
        "url": "https://www.asifdigital.agency/products/ticketflow",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "34"
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
            "name": "TicketFlow",
            "item": "https://www.asifdigital.agency/products/ticketflow"
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
      <TicketFlowView />
    </>
  );
}
