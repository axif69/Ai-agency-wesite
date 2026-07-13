import PageComponent from '../../src/views/services/RealEstateDigitalSolutionsUAE';

export const metadata = {
  title: "Real Estate Digital Solutions | UAE CRM & Web",
  description: "Connect your property website, lead forms, listings, WhatsApp, and CRM. Streamline real estate operations without manual data transfer.",
  alternates: {
    canonical: "https://www.asifdigital.agency/real-estate-digital-solutions-uae"
  },
  openGraph: {
    title: "Real Estate Digital Solutions | UAE CRM & Web",
    description: "Connect your property website, lead forms, listings, WhatsApp, and CRM. Streamline real estate operations without manual data transfer.",
    url: "https://www.asifdigital.agency/real-estate-digital-solutions-uae",
    siteName: "Asif Digital",
    images: [
      {
        url: "https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png",
        width: 1200,
        height: 630,
        alt: "Real Estate Digital Solutions"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Digital Solutions | UAE CRM & Web",
    description: "Connect your property website, lead forms, listings, WhatsApp, and CRM. Streamline real estate operations without manual data transfer.",
    images: ["https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
