import PageComponent from '../../../src/views/services/SEO';

export const metadata = {
  title: "SEO, AEO & GEO Agency Dubai | AI Search Visibility UAE",
  description: "SEO, AEO and GEO agency in Dubai helping UAE businesses improve Google rankings, AI Overview visibility, answer-engine citations, local SEO and content authority.",
  alternates: {
    canonical: "https://www.asifdigital.agency/services/seo-agency-dubai-sharjah-uae"
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO, AEO and GEO Agency Dubai",
  serviceType: "Search engine optimisation, answer engine optimisation and generative engine optimisation",
  provider: {
    "@type": "Organization",
    name: "Asif Digital",
    url: "https://www.asifdigital.agency"
  },
  areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates"],
  url: "https://www.asifdigital.agency/services/seo-agency-dubai-sharjah-uae",
  description: "SEO, AEO and GEO services for UAE businesses that need stronger Google visibility, AI Overview eligibility, answer-engine clarity, local search signals and topical authority."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["What is the difference between SEO, AEO and GEO?", "SEO improves visibility in traditional search results. AEO helps pages answer questions clearly enough for answer engines and AI Overviews. GEO strengthens brand, entity and topical signals so generative AI systems can understand when your business is relevant."],
    ["Can AEO help a Dubai business appear in AI recommendations?", "It can improve eligibility by making services, locations, expertise, FAQs and proof points easier to parse. No agency can guarantee AI recommendations, but structured content and entity clarity give search systems better evidence to work with."],
    ["Do you still work on normal Google rankings?", "Yes. Technical SEO, local SEO, content quality and internal linking remain the foundation. AEO and GEO build on top of that foundation rather than replacing it."],
    ["Which pages should be optimised first?", "Commercial pages with clear intent, existing impressions, strong service fit and internal-link potential should be prioritised first."]
  ].map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer
    }
  }))
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageComponent />
    </>
  );
}
