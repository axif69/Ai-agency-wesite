import PageComponent from '../../src/views/services/WebDesignSharjah';

export const metadata = {
  title: "Web Design Company Sharjah | SEO Websites for Local Leads",
  description: "Web design company in Sharjah building fast, modern, SEO-ready websites with WhatsApp CTAs, lead forms and local service pages for UAE businesses.",
  alternates: {
    canonical: "https://www.asifdigital.agency/web-design-sharjah"
  },
  openGraph: {
    title: "Web Design Company Sharjah | SEO Websites for Local Leads",
    description: "Web design company in Sharjah building fast, modern, SEO-ready websites with WhatsApp CTAs, lead forms and local service pages for UAE businesses.",
    url: "https://www.asifdigital.agency/web-design-sharjah",
    siteName: "Asif Digital",
    images: [
      {
        url: "https://www.asifdigital.agency/images/sharjah_web_design_hero.png",
        width: 1200,
        height: 630,
        alt: "Web Design Company in Sharjah"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Company Sharjah | SEO Websites for Local Leads",
    description: "Web design company in Sharjah building fast, modern, SEO-ready websites with WhatsApp CTAs, lead forms and local service pages for UAE businesses.",
    images: ["https://www.asifdigital.agency/images/sharjah_web_design_hero.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
