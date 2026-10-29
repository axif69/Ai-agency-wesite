import PageComponent from '../../src/views/Services';

export const metadata = {
  title: "AI Automation & Digital Agency Services Dubai | Asif Digital UAE",
  description: "Explore enterprise AI solutions in Dubai & Sharjah: autonomous AI workflows, WhatsApp CRM chatbots, custom web development & ROI-driven SEO systems.",
  alternates: {
    canonical: "https://www.asifdigital.agency/services"
  },
  openGraph: {
    title: "AI Automation & Digital Agency Services Dubai | Asif Digital UAE",
    description: "Explore enterprise AI solutions in Dubai & Sharjah: autonomous AI workflows, WhatsApp CRM chatbots, custom web development & ROI-driven SEO systems.",
    url: "https://www.asifdigital.agency/services",
    siteName: "Asif Digital",
    images: [
      {
        url: "https://www.asifdigital.agency/images/showcase/ai-agency-website-mockup.png",
        width: 1800,
        height: 1200,
        alt: "Asif Digital AI Automation & Digital Agency Services Dubai"
      }
    ],
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation & Digital Agency Services Dubai | Asif Digital UAE",
    description: "Explore enterprise AI solutions in Dubai & Sharjah: autonomous AI workflows, WhatsApp CRM chatbots, custom web development & ROI-driven SEO systems.",
    images: ["https://www.asifdigital.agency/images/showcase/ai-agency-website-mockup.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
