import PageComponent from '../../src/views/real-estate/RealEstatePillarHub';

export const metadata = {
  title: "AI for Real Estate UAE | Automation, Technology & Operations",
  description: "Enterprise AI and automation systems for UAE real estate companies. Explore agency workflow automation, specialized CRM routing, property management AI, and portal integrations.",
  alternates: {
    canonical: "https://www.asifdigital.agency/real-estate"
  },
  openGraph: {
    title: "AI for Real Estate UAE | Automation, Technology & Operations",
    description: "Enterprise AI and automation systems for UAE real estate companies. Explore agency workflow automation, specialized CRM routing, property management AI, and portal integrations.",
    url: "https://www.asifdigital.agency/real-estate",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "https://www.asifdigital.agency/images/real_estate_uae_hero_new.png",
        width: 1024,
        height: 1024,
        alt: "AI for Real Estate UAE — Asif Digital"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Real Estate UAE | Automation, Technology & Operations",
    description: "Enterprise AI and automation systems for UAE real estate companies. Explore agency workflow automation, specialized CRM routing, property management AI, and portal integrations.",
    images: ["https://www.asifdigital.agency/images/real_estate_uae_hero_new.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
