import AdSpendAnalyzer from "../../../src/views/tools/AdSpendAnalyzer";
export const metadata = { 
  title: "Free Ad Spend Analyzer | CPL, CPA, ROAS & Waste", 
  description: "Calculate CPL, CPA, ROAS and estimated wasted ad spend for Google and Meta Ads. Free interactive UAE ad-spend tool with no signup required.", 
  alternates: { canonical: "https://www.asifdigital.agency/tools/ad-spend-efficiency-analyzer" }, 
  openGraph: { 
    title: "Free Ad Spend Analyzer | CPL, CPA, ROAS & Waste", 
    description: "Calculate CPL, CPA, ROAS and estimated wasted ad spend for Google and Meta Ads. Free interactive UAE ad-spend tool with no signup required.", 
    url: "https://www.asifdigital.agency/tools/ad-spend-efficiency-analyzer", 
    type: "website" 
  } 
};
export default function Page() { const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebApplication", name: "Asif Digital Ad Spend Efficiency Analyzer", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: "https://www.asifdigital.agency/tools/ad-spend-efficiency-analyzer", offers: { "@type": "Offer", price: "0", priceCurrency: "AED" }, provider: { "@type": "Organization", name: "Asif Digital" } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.asifdigital.agency" }, { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.asifdigital.agency/tools" }, { "@type": "ListItem", position: 3, name: "Ad Spend Efficiency Analyzer" }] }] }; return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><AdSpendAnalyzer /></>; }

