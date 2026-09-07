import PageComponent from '../../src/views/AiConsultingUAE';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Consulting UAE | Enterprise AI Strategy, Readiness & Implementation",
  description: "Enterprise AI consulting in Dubai and the UAE. We deliver AI readiness audits, workflow mapping, vendor evaluation, build-vs-buy analysis, and implementation roadmaps.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-consulting-uae"
  },
  openGraph: {
    title: "AI Consulting UAE | Enterprise AI Strategy, Readiness & Implementation",
    description: "Enterprise AI consulting in Dubai and the UAE. We deliver AI readiness audits, workflow mapping, vendor evaluation, build-vs-buy analysis, and implementation roadmaps.",
    url: "https://www.asifdigital.agency/ai-consulting-uae",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting UAE | Enterprise AI Strategy, Readiness & Implementation",
    description: "Enterprise AI consulting in Dubai and the UAE. We deliver AI readiness audits, workflow mapping, vendor evaluation, build-vs-buy analysis, and implementation roadmaps."
  }
};

export default function Page() {
  return <PageComponent />;
}
