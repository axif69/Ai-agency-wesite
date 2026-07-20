import WebsiteGrader from "../../../src/views/tools/WebsiteGrader";

export const metadata = {
  title: "Free AI Website Grader UAE | SEO, Speed & AI Search Audit",
  description: "Audit your website's performance, SEO, mobile experience, lead conversion and AI-search readiness. Get a free prioritized report from Asif Digital.",
  alternates: { canonical: "https://www.asifdigital.agency/tools/ai-website-grader" },
  openGraph: { title: "Free AI Website Grader UAE | Asif Digital", description: "Measure website performance, SEO, conversion and AI-search readiness.", url: "https://www.asifdigital.agency/tools/ai-website-grader", type: "website" },
};

export default function Page() {
  const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebApplication", name: "Asif Digital AI Website Grader", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: "https://www.asifdigital.agency/tools/ai-website-grader", offers: { "@type": "Offer", price: "0", priceCurrency: "AED" }, provider: { "@type": "Organization", name: "Asif Digital" } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.asifdigital.agency" }, { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.asifdigital.agency/tools" }, { "@type": "ListItem", position: 3, name: "AI Website Grader" }] }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><WebsiteGrader /></>;
}

