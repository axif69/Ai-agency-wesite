import PageComponent from '../../src/views/AiAutomationAbuDhabi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Automation Abu Dhabi | Enterprise AI, Workflow & Systems Integration",
  description: "Enterprise AI automation and systems integration in Abu Dhabi. We engineer ADGM-compliant workflows, energy & industrial process automation, and ERP integrations.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-automation-abu-dhabi"
  },
  openGraph: {
    title: "AI Automation Abu Dhabi | Enterprise AI, Workflow & Systems Integration",
    description: "Enterprise AI automation and systems integration in Abu Dhabi. We engineer ADGM-compliant workflows, energy & industrial process automation, and ERP integrations.",
    url: "https://www.asifdigital.agency/ai-automation-abu-dhabi",
    siteName: "Asif Digital",
    locale: "en_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Abu Dhabi | Enterprise AI, Workflow & Systems Integration",
    description: "Enterprise AI automation and systems integration in Abu Dhabi. We engineer ADGM-compliant workflows, energy & industrial process automation, and ERP integrations."
  }
};

export default function Page() {
  return <PageComponent />;
}

