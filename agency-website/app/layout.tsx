import './globals.css';
import Layout from '../src/components/Layout';

export const metadata = {
  title: "AI Automation Agency Dubai | Asif Digital — AI Agents & Workflows UAE",
  description: "Asif Digital is a Dubai-based AI automation agency helping UAE businesses automate workflows, generate leads, and scale with custom AI agents. Book a free consultation."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="3GJPTV-4-OEXb4Z_r0EAIVCYBzHYp8YDR2QavSzPGm8" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DKTWMYPBV7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DKTWMYPBV7');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Asif Digital: AI Automation, Web & Graphic Design",
              "image": "https://asifdigital.agency/favicon.png",
              "url": "https://asifdigital.agency",
              "telephone": "+971545866094",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Muwaileh Commercial",
                "addressLocality": "Sharjah",
                "addressRegion": "Sharjah",
                "addressCountry": "AE"
              },
              "openingHours": "Mo,Tu,We,Th,Fr 09:00-18:00"
            })
          }}
        />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
