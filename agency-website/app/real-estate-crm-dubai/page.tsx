import PageComponent from '../../src/views/RealEstateCrmDubai';

export const metadata = {
  title: "Real Estate CRM Dubai | Lead Routing, WhatsApp & Portal Automation",
  description: "Custom real estate CRM and lead automation for Dubai agencies. Fast portal lead capture, automated WhatsApp response, agent routing SLAs, and deal pipelines.",
  alternates: {
    canonical: "https://www.asifdigital.agency/real-estate-crm-dubai"
  },
  openGraph: {
    title: "Real Estate CRM Dubai | Lead Routing, WhatsApp & Portal Automation",
    description: "Custom real estate CRM and lead automation for Dubai agencies. Fast portal lead capture, automated WhatsApp response, agent routing SLAs, and deal pipelines.",
    url: "https://www.asifdigital.agency/real-estate-crm-dubai",
    siteName: "Asif Digital: AI Automation, Web & Graphic Design",
    type: "website",
    images: [
      {
        url: "https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png",
        width: 1024,
        height: 1024,
        alt: "Real Estate CRM Dubai & Lead Automation — Asif Digital"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate CRM Dubai | Lead Routing, WhatsApp & Portal Automation",
    description: "Custom real estate CRM and lead automation for Dubai agencies. Fast portal lead capture, automated WhatsApp response, agent routing SLAs, and deal pipelines.",
    images: ["https://www.asifdigital.agency/images/dubai_real_estate_ai_dashboard.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
