import Home from '../src/views/Home';

export const metadata = {
  title: "AI Automation Agency Dubai | AI, SEO, AEO & Chatbots",
  description: "Asif Digital builds AI automation, WhatsApp chatbots, AEO/GEO search visibility, real estate CRM workflows and high-performance websites for Dubai and UAE businesses.",
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
