import PageComponent from '../../src/views/AiRealEstateUAE';

export const metadata = {
  title: "AI Real Estate Automation Dubai | CRM & WhatsApp UAE",
  description: "AI real estate automation in Dubai and the UAE for agencies, developers and property teams using WhatsApp bots, CRM routing, lead capture and reporting workflows.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-real-estate-uae"
  },
  openGraph: {
    title: "AI for Real Estate in the UAE | Practical Business Guide",
    description: "Learn how UAE real estate agencies, landlords and property teams can use AI for enquiries, follow-ups, tenant support and everyday operations.",
    url: "https://www.asifdigital.agency/ai-real-estate-uae",
    siteName: "Asif Digital",
    images: [
      {
        url: "https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png",
        width: 1200,
        height: 630,
        alt: "AI for Real Estate in the UAE"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Real Estate in the UAE | Practical Business Guide",
    description: "Learn how UAE real estate agencies, landlords and property teams can use AI for enquiries, follow-ups, tenant support and everyday operations.",
    images: ["https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
