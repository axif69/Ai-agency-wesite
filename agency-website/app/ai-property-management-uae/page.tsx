import PageComponent from '../../src/views/services/AiPropertyManagementUAE';

export const metadata = {
  title: "AI Property Management Automation | UAE Landlords",
  description: "Automate rent reminders, tenant messages, and maintenance tickets in one workflow. AI assistance for UAE landlords and property management teams.",
  alternates: {
    canonical: "https://www.asifdigital.agency/ai-property-management-uae"
  },
  openGraph: {
    title: "AI Property Management Automation | UAE Landlords",
    description: "Automate rent reminders, tenant messages, and maintenance tickets in one workflow. AI assistance for UAE landlords and property management teams.",
    url: "https://www.asifdigital.agency/ai-property-management-uae",
    siteName: "Asif Digital",
    images: [
      {
        url: "https://www.asifdigital.agency/images/ai_property_management_dashboard.png",
        width: 1200,
        height: 630,
        alt: "AI Property Management Automation"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Property Management Automation | UAE Landlords",
    description: "Automate rent reminders, tenant messages, and maintenance tickets in one workflow. AI assistance for UAE landlords and property management teams.",
    images: ["https://www.asifdigital.agency/images/ai_property_management_dashboard.png"]
  }
};

export default function Page() {
  return <PageComponent />;
}
