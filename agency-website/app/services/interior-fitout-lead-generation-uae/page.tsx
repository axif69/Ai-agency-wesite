import React from "react";
import InteriorFitoutLeadGenUae from "../../../src/views/InteriorFitoutLeadGenUae";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior Fitout Lead Generation UAE | Asif Digital",
  description: "Targeted Google Search & social media advertising for UAE commercial fitout contractors, villa renovation firms, and joinery specialists. Direct WhatsApp enquiries, 0% commission.",
  keywords: [
    "interior fitout lead generation uae",
    "fitout marketing dubai",
    "commercial fitout contractors dubai",
    "villa renovation leads uae",
    "joinery advertising dubai",
    "contractor marketing agency uae"
  ],
  alternates: {
    canonical: "https://www.asifdigital.agency/services/interior-fitout-lead-generation-uae"
  },
  openGraph: {
    title: "Interior Fitout Lead Generation UAE | Asif Digital",
    description: "Targeted advertising for UAE fitout contractors, villa renovation firms, and joinery workshops. Direct WhatsApp enquiry delivery with 0% commission.",
    url: "https://www.asifdigital.agency/services/interior-fitout-lead-generation-uae",
    siteName: "Asif Digital",
    locale: "en_US",
    type: "website"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.asifdigital.agency/services/interior-fitout-lead-generation-uae#service",
      "name": "Interior Fitout Lead Generation UAE",
      "provider": {
        "@type": "Organization",
        "name": "Asif Digital Agency",
        "url": "https://www.asifdigital.agency",
        "logo": "https://www.asifdigital.agency/images/asif-digital-ad-mark.png",
        "telephone": "+971 54 586 6094",
        "email": "hello@asifdigital.agency",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Muwaileh Commercial",
          "addressLocality": "Sharjah",
          "addressCountry": "AE"
        }
      },
      "areaServed": [
        { "@type": "City", "name": "Dubai" },
        { "@type": "City", "name": "Abu Dhabi" },
        { "@type": "City", "name": "Sharjah" }
      ],
      "description": "Google Search and social media advertising for UAE interior fitout contractors, villa renovation firms, and joinery workshops. Direct enquiry routing to WhatsApp and email with zero commission on project revenue.",
      "category": "Contractor Marketing & Advertising",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Fitout Marketing Solutions",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Fitout Lead Generation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential Villa Renovation Advertising"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Joinery & Interior Specialist Marketing"
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.asifdigital.agency/services/interior-fitout-lead-generation-uae#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you help attract relevant fitout enquiries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We build targeted search campaigns on Google for high-intent search terms (such as commercial office fitout, retail fitout, and villa renovation contractors in Dubai and Abu Dhabi) and social media ads in both Arabic and English. We highlight your specific project focus so prospects understand what you do before reaching out."
          }
        },
        {
          "@type": "Question",
          "name": "Do you charge a commission on signed contracts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. We work on a fixed monthly management retainer. You keep 100% of your project contract value and profit margin."
          }
        },
        {
          "@type": "Question",
          "name": "How do new enquiries reach our team?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enquiries are sent directly to your designated WhatsApp number or email address. Notifications arrive immediately with the prospect's contact details and project overview so your team can respond quickly."
          }
        },
        {
          "@type": "Question",
          "name": "What ad budget is needed to get started?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For the UAE market, we generally recommend starting with AED 4,000 to AED 7,000 per month paid directly to Google or Meta. This provides sufficient reach to test local commercial and residential audiences."
          }
        },
        {
          "@type": "Question",
          "name": "What do you need from our team to begin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We need photos or video clips of your completed projects, your company trade license, the types and sizes of projects you handle, and the WhatsApp number or email where you want enquiries delivered."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.asifdigital.agency/services/interior-fitout-lead-generation-uae#breadcrumb",
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
          "name": "Interior Fitout Lead Generation UAE",
          "item": "https://www.asifdigital.agency/services/interior-fitout-lead-generation-uae"
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteriorFitoutLeadGenUae />
    </>
  );
}
