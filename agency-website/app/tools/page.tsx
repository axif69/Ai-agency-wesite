import ToolsHub from "../../src/views/tools/ToolsHub";

export const metadata = {
  title: "Free AI Marketing Tools for UAE Businesses | Asif Digital",
  description: "Grade your website, build a UAE-ready marketing strategy, and analyze ad spend efficiency with free tools from Asif Digital. Instant, practical results.",
  alternates: { canonical: "https://www.asifdigital.agency/tools" },
  openGraph: { title: "Free AI Growth Tools | Asif Digital", description: "Free website, marketing strategy and advertising efficiency tools for UAE businesses.", url: "https://www.asifdigital.agency/tools", type: "website" },
};

export default function Page() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Free AI Growth Tools", url: "https://www.asifdigital.agency/tools", provider: { "@type": "Organization", name: "Asif Digital", url: "https://www.asifdigital.agency" } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ToolsHub /></>;
}

