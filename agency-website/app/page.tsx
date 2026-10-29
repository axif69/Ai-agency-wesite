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
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.asifdigital.agency/#organization",
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
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.asifdigital.agency/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do I need a new website to implement a WhatsApp AI assistant?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We can integrate an AI assistant with your current website and WhatsApp Business number directly. However, if your existing site is slow or struggles to convert visitors, our combined Web + WhatsApp architecture produces significantly higher enquiry rates."
            }
          },
          {
            "@type": "Question",
            "name": "How does the WhatsApp AI qualification process work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We train the assistant on your exact service scope, pricing parameters, location details, qualification criteria, and preferred next steps. When a prospect messages, it answers their questions in English or Arabic, captures their contact info, and alerts your team."
            }
          },
          {
            "@type": "Question",
            "name": "What is the typical investment for a website and AI chatbot package?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our core packages range between AED 2,500 and AED 10,000 depending on website scope, bespoke integrations, and CRM complexity. We provide a transparent, fixed-scope quote during our initial free discovery audit."
            }
          },
          {
            "@type": "Question",
            "name": "How long does implementation take from start to finish?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Timelines depend on project scope and third-party API access. A standard landing page or WhatsApp assistant setup is typically delivered in 2 to 4 weeks, with clear milestone reviews along the way."
            }
          },
          {
            "@type": "Question",
            "name": "Will our new website be optimized to rank on Google in the UAE?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every website is built on Next.js with semantic HTML5, localized Schema.org metadata, fast Core Web Vitals, and keyword architecture targeting commercial Dubai and Sharjah search queries from day one."
            }
          }
        ]
      }
    ]
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
