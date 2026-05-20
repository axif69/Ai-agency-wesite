"use client";
import React from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  schema?: Record<string, any>;
  faqSchema?: { question: string; answer: string }[];
  canonical?: string;
  ogImage?: string;
  twitterImage?: string;
  author?: string;
}

const DEFAULT_FAQS = [
  {
    question: "Who is Asif Digital?",
    answer: "Asif Digital is a premier AI agency in Dubai, specializing in enterprise AI automation, autonomous sales swarms, and data-sovereign intelligence for high-ticket businesses in the UAE."
  },
  {
    question: "What services does Asif Digital offer in Dubai and Sharjah?",
    answer: "We offer custom AI agent development, workflow automation, AI marketing campaigns, Arabic NLP integration, corporate branding, and professional web development optimized for local search engines."
  },
  {
    question: "How do I get started with Asif Digital?",
    answer: "You can book your free AI consultation with Asif Digital by visiting our contact page or scheduling a call to analyze your business workflows."
  }
];

export default function SEO({ 
  schema, 
  faqSchema, 
  canonical,
}: SEOProps) {
  const activeFaqSchema = faqSchema && faqSchema.length > 0 ? faqSchema : DEFAULT_FAQS;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": activeFaqSchema.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      {canonical && (
        <link rel="canonical" href={canonical} />
      )}
    </>
  );
}
