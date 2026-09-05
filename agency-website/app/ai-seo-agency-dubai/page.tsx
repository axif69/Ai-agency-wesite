import PageComponent from '../../src/views/services/AiSeoAgencyDubai';

export const metadata = {
  title: "AI SEO Agency Dubai | AEO, GEO & AI Search Visibility",
  description: "AI SEO, Answer Engine Optimization (AEO) and GEO agency in Dubai. We engineer entity architecture, LLM citation visibility, and structured content across the UAE.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-seo-agency-dubai"
  },
  openGraph: {
    title: "AI SEO Agency Dubai | AEO, GEO & AI Search Visibility",
    description: "Enterprise AI SEO, Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) in Dubai & the UAE.",
    url: "https://www.asifdigital.agency/ai-seo-agency-dubai",
    type: "website"
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AI SEO Agency Dubai - Asif Digital",
  alternateName: "AEO & GEO Search Visibility Agency Dubai",
  serviceType: "AI Search Engine Optimization, Answer Engine Optimization, Generative Engine Optimization",
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
  url: "https://www.asifdigital.agency/ai-seo-agency-dubai",
  description: "Bespoke AI SEO, Answer Engine Optimization (AEO), and LLM citation visibility for UAE enterprises seeking dominance in Google AI Overviews, ChatGPT, Perplexity, and traditional search."
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
      name: "AI SEO Agency Dubai",
      item: "https://www.asifdigital.agency/ai-seo-agency-dubai"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between AI SEO, AEO, and traditional SEO in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditional SEO focuses primarily on keyword density, backlink quantity, and ranking among the standard 10 blue links on Google. AI SEO and Answer Engine Optimization (AEO) re-engineer content for machine comprehension—structuring data into concise direct answers, comparison matrices, and entity graphs so that search engines feature your brand in Google AI Overviews and conversational AI engines (ChatGPT Search, Perplexity, Gemini)."
      }
    },
    {
      "@type": "Question",
      name: "Can an AI SEO agency guarantee #1 rankings or guaranteed ChatGPT citations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No honest agency can guarantee rank #1 or guaranteed LLM citations. Search algorithms and generative AI models update continuously, incorporating dynamic user signals, competition, and index shifts. Asif Digital guarantees architectural rigor: establishing the highest standard of technical speed, schema clarity, intent demarcation, and topical depth that maximize your site's eligibility for top visibility."
      }
    },
    {
      "@type": "Question",
      name: "How does AI search visibility relate to our paid advertising (PPC)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI SEO builds compounding, zero-cost organic discovery, establishing lasting topical authority and brand trust. Paid advertising (Google Ads & Meta Ads) provides immediate traffic and rapid message testing. For organizations seeking rapid full-funnel growth, we coordinate organic search signals with predictive PPC campaigns."
      }
    },
    {
      "@type": "Question",
      name: "How long does it take for AEO and GEO optimizations to show results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Technical crawl and schema improvements are recognized by search engines within 1 to 3 weeks of re-indexing. Direct answer inclusion in Google AI Overviews and notable ranking improvements typically materialize over 4 to 12 weeks, depending on existing domain authority, crawl frequency, and regional competition in the UAE."
      }
    },
    {
      "@type": "Question",
      name: "Do you use automated AI tools to write all content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Pure unedited AI-generated text often produces generic, non-authoritative content that fails Google's Helpful Content standards and lacks genuine local UAE business context. We use AI for computational research, query clustering, and semantic schema modeling, but all customer-facing content is architected with verified technical precision, local UAE operational realities, and human editorial review."
      }
    },
    {
      "@type": "Question",
      name: "How do you measure and report AI search performance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We track both traditional search metrics (impressions, clicks, average position, organic conversions) and AI-era visibility indicators (AI Overview appearances, brand entity co-citations, conversational answer mentions, and multi-touch lead attribution in your CRM)."
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
