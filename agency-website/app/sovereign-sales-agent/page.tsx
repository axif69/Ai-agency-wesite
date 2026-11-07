import PageComponent from '../../src/views/SovereignSalesAgent';

export const metadata = {
  title: "AI-Powered B2B Sales Prospecting & Research Software | Sovereign",
  description: "Sovereign AI Sales Agent is desktop B2B sales prospecting software in development by Asif Digital. Discover relevant companies, verify ICP fit, research decision-makers, and draft human-approved outreach.",
  alternates: {
    canonical: "https://www.asifdigital.agency/sovereign-sales-agent"
  },
  openGraph: {
    title: "AI-Powered B2B Sales Prospecting & Research Software | Sovereign",
    description: "Sovereign AI Sales Agent is desktop B2B sales prospecting software in development by Asif Digital. Discover relevant companies, verify ICP fit, research decision-makers, and draft human-approved outreach.",
    url: "https://www.asifdigital.agency/sovereign-sales-agent",
    siteName: "Asif Digital Agency",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "https://www.asifdigital.agency/images/sovereign-sales-agent/hero-operations-v6.png",
        width: 1920,
        height: 1271,
        alt: "Sovereign AI-Powered B2B Sales Prospecting Software - Operations Overview Workspace"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered B2B Sales Prospecting & Research Software | Sovereign",
    description: "Sovereign AI Sales Agent is desktop B2B sales prospecting software in development by Asif Digital. Discover relevant companies, verify ICP fit, research decision-makers, and draft human-approved outreach.",
    images: ["https://www.asifdigital.agency/images/sovereign-sales-agent/hero-operations-v6.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
