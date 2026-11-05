import PageComponent from '../../../src/views/services/WebDevelopment';

export const metadata = {
  title: "Custom Web Development Dubai | Enterprise Apps | Asif Digital",
  description: "Enterprise custom web development in Dubai & Sharjah. Next.js, React & Node.js web applications, client portals, and secure API integrations. Request an audit.",
  alternates: {
    canonical: "https://www.asifdigital.agency/services/web-development-dubai-uae"
  },
  openGraph: {
    title: "Custom Web Development Dubai | Enterprise Apps | Asif Digital",
    description: "Enterprise custom web development in Dubai & Sharjah. Next.js, React & Node.js web applications, client portals, and secure API integrations. Request an audit.",
    url: "https://www.asifdigital.agency/services/web-development-dubai-uae",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Web Development Dubai | Enterprise Apps | Asif Digital",
    description: "Enterprise custom web development in Dubai & Sharjah. Next.js, React & Node.js web applications, client portals, and secure API integrations. Request an audit."
  }
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.asifdigital.agency"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.asifdigital.agency/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Custom Web Development Dubai",
            "item": "https://www.asifdigital.agency/services/web-development-dubai-uae"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Custom Web Development Dubai",
        "serviceType": "Enterprise Web Application & Portal Engineering",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Asif Digital: AI Automation, Web & Graphic Design",
          "telephone": "+971545866094",
          "url": "https://www.asifdigital.agency",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Muwaileh Commercial - Industrial Area",
            "addressLocality": "Sharjah",
            "addressRegion": "Sharjah",
            "addressCountry": "AE"
          }
        },
        "areaServed": [
          { "@type": "City", "name": "Dubai" },
          { "@type": "City", "name": "Sharjah" },
          { "@type": "City", "name": "Abu Dhabi" },
          { "@type": "Country", "name": "United Arab Emirates" }
        ],
        "description": "Custom Next.js web application development, enterprise client portals, database architecture, and secure API integrations for UAE organizations."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageComponent />
    </>
  );
}
