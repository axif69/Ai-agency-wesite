import PageComponent from '../../src/views/AiRealEstateAgenciesDubai';

export const metadata = {
  title: "AI for Dubai Real Estate Agencies | WhatsApp & Lead Tech",
  description: "Automate lead response and qualification for your Dubai real estate agency. Reply to property enquiries, qualify buyers and help book viewings through WhatsApp, with lead details sent to your preferred sales workflow.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-real-estate-agencies-dubai"
  },
  openGraph: {
    title: "AI for Dubai Real Estate Agencies | WhatsApp & Lead Tech",
    description: "Automate lead response and qualification for your Dubai real estate agency. Reply to property enquiries, qualify buyers and help book viewings through WhatsApp, with lead details sent to your preferred sales workflow.",
    url: "https://www.asifdigital.agency/ai-real-estate-agencies-dubai",
    siteName: "Asif Digital",
    images: [
      {
        url: "https://www.asifdigital.agency/images/ai_whatsapp_broker_chat.png",
        width: 1200,
        height: 630,
        alt: "AI for Dubai Real Estate Agencies"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Dubai Real Estate Agencies | WhatsApp & Lead Tech",
    description: "Automate lead response and qualification for your Dubai real estate agency. Reply to property enquiries, qualify buyers and help book viewings through WhatsApp, with lead details sent to your preferred sales workflow.",
    images: ["https://www.asifdigital.agency/images/ai_whatsapp_broker_chat.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
