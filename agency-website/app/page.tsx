import Home from '../src/views/Home';

export const metadata = {
  title: "Asif Digital | Websites, WhatsApp Chatbots & AI Automation UAE",
  description: "Asif Digital Agency builds conversion-focused websites, WhatsApp assistants and AI automation systems for businesses in Dubai, Sharjah and across the UAE.",
  alternates: {
    canonical: "https://www.asifdigital.agency"
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Agency",
    "description": "Conversion-focused websites, WhatsApp assistants and AI automation systems for UAE businesses that need more calls, enquiries and bookings",
    "url": "https://www.asifdigital.agency/",
    "telephone": "+971545866094",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.3218,
      "longitude": 55.4564
    },
    "areaServed": ["Sharjah", "Dubai", "Abu Dhabi", "United Arab Emirates", "GCC"]
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
