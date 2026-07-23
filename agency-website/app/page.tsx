import Home from '../src/views/Home';

export const metadata = {
  title: "AI Automation, WhatsApp Chatbots & Web Design Dubai",
  description: "Asif Digital builds AI automation systems, WhatsApp chatbots and high-performance websites for Dubai and UAE businesses that need more organic leads, calls and bookings.",
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
    "description": "AI automation, WhatsApp chatbot and web design company helping UAE businesses generate leads, calls and bookings",
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
