import PageComponent from '../../src/views/services/AiPpcAgencyDubai';

export const metadata = {
  title: "AI PPC Agency Dubai | Performance Marketing & Paid Media Automation",
  description: "AI-assisted PPC and performance marketing agency in Dubai. Smart bidding guardrails, server-side Meta CAPI, Google PMax optimization, and closed-loop CRM offline conversions.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-ppc-agency-dubai"
  },
  openGraph: {
    title: "AI PPC Agency Dubai | Performance Marketing & Paid Media Automation",
    description: "Scale qualified pipeline revenue across Dubai and the UAE with AI-assisted Google Ads, Meta Advantage+, server-side tracking, and CRM revenue sync.",
    url: "https://www.asifdigital.agency/ai-ppc-agency-dubai",
    type: "website"
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AI PPC Agency Dubai - Asif Digital",
  alternateName: "AI Performance Marketing & Paid Media Agency Dubai",
  serviceType: "AI PPC Management, Performance Marketing, Server-Side Tracking, B2B Paid Media",
  provider: {
    "@type": "Organization",
    name: "Asif Digital",
    url: "https://www.asifdigital.agency"
  },
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "City", name: "Sharjah" },
    { "@type": "Country", name: "United Arab Emirates" }
  ],
  url: "https://www.asifdigital.agency/ai-ppc-agency-dubai",
  description: "AI-assisted paid advertising and performance marketing agency in Dubai. We deploy Google Search and PMax algorithmic bidding, Meta Advantage+ creative rotation, server-side tracking, and closed-loop CRM revenue imports."
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.asifdigital.agency"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://www.asifdigital.agency/services"
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "AI PPC Agency Dubai",
      item: "https://www.asifdigital.agency/ai-ppc-agency-dubai"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does AI-assisted PPC differ from traditional PPC agency management in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditional PPC management often relies on manual bid tweaks once a week and sends clicks to generic homepages. Our AI-assisted performance marketing combines machine-learning bid algorithms (Google Smart Bidding, Meta Advantage+) with strict human strategy guardrails, server-side first-party data (CAPI), and closed-loop CRM conversion imports. This ensures ad networks optimize for actual signed contracts rather than vanity clicks or unqualified form fills."
      }
    },
    {
      "@type": "Question",
      name: "Which advertising platforms do you manage under your AI PPC service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We manage high-intent paid media across Google Search, Performance Max (PMax), Google Display, YouTube Ads, Meta Ads (Instagram & Facebook Lead Generation), and LinkedIn Ads for enterprise B2B sales in Dubai, Sharjah, Abu Dhabi, and the wider GCC."
      }
    },
    {
      "@type": "Question",
      name: "How do Meta CAPI and Google Enhanced Conversions improve our campaign ROI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Browser privacy restrictions (such as iOS App Tracking Transparency and browser ad blockers) prevent up to 30% of standard web conversions from reaching ad platforms. By deploying server-side Meta Conversions API (CAPI) and Google Enhanced Conversions, we pass verified, encrypted conversion signals directly from your server to the advertising algorithms, improving attribution accuracy and lowering your cost per acquisition (CPA)."
      }
    },
    {
      "@type": "Question",
      name: "What are offline conversion imports and how do they benefit our business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most ad platforms only know when someone submits a form—not whether they became a paying customer. With offline conversion imports, your CRM pushes qualified pipeline stages and closed deal revenues back to Google and Meta. The bidding algorithms then automatically optimize for high-value decision-makers rather than budget-draining tire-kickers."
      }
    },
    {
      "@type": "Question",
      name: "How do you protect our ad spend from runaway costs or invalid traffic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We implement strict budget scaling guardrails: daily spending caps, threshold-based budget adjustment rules, invalid-traffic monitoring, reCAPTCHA v3 bot protection on forms, and rigorous negative keyword exclusions. We never enable unmonitored auto-pilot spend scaling; every budget increase requires meeting agreed ROAS or qualified lead milestones."
      }
    },
    {
      "@type": "Question",
      name: "What is the recommended minimum monthly ad spend for AI PPC campaigns in the UAE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To allow machine learning algorithms (such as Google Smart Bidding and Meta Advantage+) to exit the learning phase and accumulate statistically significant conversion data, we generally recommend a minimum media budget of AED 7,000 to AED 15,000 per month paid directly to the ad platforms."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageComponent />
    </>
  );
}
