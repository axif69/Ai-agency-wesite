import PageComponent from '../../src/views/services/RealEstateDigitalSolutionsUAE';

export const metadata = {
  title: "Real Estate Digital Solutions UAE | Real Estate CRM & WhatsApp AI Dubai",
  description: "End-to-end real estate digital solutions and CRM in Dubai & UAE. High-speed property portals, automated WhatsApp lead routing, Bayut/Property Finder sync & ROI dashboards.",
  alternates: {
    canonical: "https://www.asifdigital.agency/real-estate-digital-solutions-uae"
  },
  openGraph: {
    title: "Real Estate Digital Solutions UAE | Real Estate CRM & WhatsApp AI Dubai",
    description: "Real estate digital solutions and CRM in Dubai and the UAE connecting property portals, lead capture, WhatsApp automation, CRM routing, and reporting systems.",
    url: "https://www.asifdigital.agency/real-estate-digital-solutions-uae",
    siteName: "Asif Digital: AI Automation, Web & Graphic Design",
    images: [
      {
        url: "https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png",
        width: 1200,
        height: 630,
        alt: "Real Estate Digital Solutions UAE"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Digital Solutions UAE | Real Estate CRM & WhatsApp AI Dubai",
    description: "End-to-end real estate digital solutions and CRM in Dubai & UAE.",
    images: ["https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
