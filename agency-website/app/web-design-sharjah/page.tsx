import PageComponent from '../../src/views/services/WebDesignSharjah';

export const metadata = {
  title: "Web Design Company in Sharjah | Custom Website Design",
  description: "Custom web design company in Sharjah. We build fast, mobile-friendly websites that explain your services and generate local inquiries.",
  alternates: {
    canonical: "https://www.asifdigital.agency/web-design-sharjah"
  },
  openGraph: {
    title: "Web Design Company in Sharjah | Custom Website Design",
    description: "Custom web design company in Sharjah. We build fast, mobile-friendly websites that explain your services and generate local inquiries.",
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
    title: "Web Design Company in Sharjah | Custom Website Design",
    description: "Custom web design company in Sharjah. We build fast, mobile-friendly websites that explain your services and generate local inquiries.",
    images: ["https://www.asifdigital.agency/images/sharjah_web_design_hero.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
