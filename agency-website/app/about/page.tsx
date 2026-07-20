import PageComponent from '../../src/views/About';

export const metadata = {
  title: "About Asif Digital | AI Automation & Digital Marketing Agency Dubai",
  description: "Meet the Asif Digital team and learn how our UAE agency delivers AI automation, websites, WhatsApp and CRM systems, SEO, AEO and measurable digital growth.",
  alternates: {
    canonical: "https://www.asifdigital.agency/about"
  }
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Where is Asif Digital based?", acceptedAnswer: { "@type": "Answer", text: "Asif Digital operates from the UAE and serves organizations across Dubai, Sharjah, Abu Dhabi, and the wider GCC." } },
      { "@type": "Question", name: "What types of companies does Asif Digital work with?", acceptedAnswer: { "@type": "Answer", text: "Asif Digital supports SMEs, professional-services firms, real estate businesses, ecommerce teams, healthcare operators, and enterprise departments." } },
      { "@type": "Question", name: "Does Asif Digital only provide AI services?", acceptedAnswer: { "@type": "Answer", text: "No. Services also include web design and development, CRM and WhatsApp workflows, SEO and AI-search visibility, paid acquisition, and conversion journeys." } },
      { "@type": "Question", name: "Can Asif Digital improve existing systems?", acceptedAnswer: { "@type": "Answer", text: "Yes. Existing websites, CRM systems, analytics, and workflows are audited before an unnecessary rebuild is recommended." } },
      { "@type": "Question", name: "How does an Asif Digital project begin?", acceptedAnswer: { "@type": "Answer", text: "Projects begin with discovery and an audit of the relevant customer journey or operational workflow, followed by defined scope, responsibilities, timeline, and success criteria." } }
    ]
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <PageComponent />
  </>;
}
