import PageComponent from '../../src/views/ArabicAiHub';

export const metadata = {
  title: "Arabic AI Solutions UAE | Chatbots, NLP & Automation",
  description: "Arabic and bilingual AI solutions for UAE businesses: WhatsApp agents, knowledge assistants, NLP workflows, evaluation, integrations, and governance.",
  alternates: {
    canonical: "https://www.asifdigital.agency/arabic-ai-hub"
  },
  openGraph: {
    title: "Arabic AI Solutions for UAE Businesses | Asif Digital",
    description: "Build Arabic and bilingual AI assistants with measured quality, approved knowledge, workflow integrations, privacy controls, and human escalation.",
    url: "https://www.asifdigital.agency/arabic-ai-hub",
    type: "website"
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Arabic AI Solutions UAE",
  serviceType: "Arabic AI, NLP, chatbot and workflow automation services",
  provider: {
    "@type": "Organization",
    name: "Asif Digital",
    url: "https://www.asifdigital.agency"
  },
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates"
  },
  url: "https://www.asifdigital.agency/arabic-ai-hub",
  description: "Arabic and bilingual AI assistants for customer service, knowledge search, WhatsApp, websites, document intelligence, and operational workflows."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["Does the system understand Khaleeji Arabic?", "It can be configured and evaluated for Gulf Arabic use cases. Performance depends on the model, task, and quality of representative examples, so Asif Digital tests UAE conversations before launch."],
    ["Can it switch between Arabic and English?", "Yes. Bilingual workflows can preserve language context across the interface, knowledge retrieval, CRM notes, and human handoff."],
    ["Do we need to train a model from scratch?", "Usually not. Most projects combine a suitable foundation model with approved knowledge, workflow logic, evaluation, and guardrails."],
    ["Can the assistant use our private company information?", "Yes, through controlled retrieval and access rules after mapping allowed data, processing, retention, and human-review requirements."],
    ["Can it replace our Arabic customer-service team?", "It is best used for repetitive questions and structured intake while complex, sensitive, or high-value conversations are escalated to people."],
    ["How long does an Arabic AI project take?", "A focused prototype may take days. Production systems with private data, integrations, security review, and formal evaluation require a scoped timeline after the workflow audit."]
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
