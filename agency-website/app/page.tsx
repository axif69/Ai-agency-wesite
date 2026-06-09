import Home from '../src/views/Home';

export const metadata = {
  title: "AI Automation Agency Dubai & UAE | Asif Digital",
  description: "Asif Digital is the leading AI automation agency in Dubai. We build custom AI agents, automate workflows, and scale UAE businesses with cutting-edge artificial intelligence.",
  alternates: {
    canonical: "https://www.asifdigital.agency"
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "name": "Asif Digital",
    "alternateName": "Ai Automation & Web Development & Graphics design Services in Sharjah UAE",
    "description": "AI Automation Agency offering AI agents, workflow automation, web development and digital marketing for UAE businesses",
    "url": "https://www.asifdigital.agency/",
    "telephone": "054 586 6094",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
    "priceRange": "$$"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}
