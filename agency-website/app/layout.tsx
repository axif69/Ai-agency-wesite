import './globals.css';
import Layout from '../src/components/Layout';
import SmoothScroll from '../src/components/SmoothScroll';
import { Syne, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.asifdigital.agency'),
  title: "AI Automation Agency Dubai | Asif Digital — AI Agents & Workflows UAE",
  description: "Asif Digital is a Dubai-based AI automation agency helping UAE businesses automate workflows, generate leads, and scale with custom AI agents. Book a free consultation.",
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-clean.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon-clean.png',
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
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
              "@type": "ProfessionalService",
              "name": "Asif Digital: AI Automation, Web & Custom Software Agency",
              "image": "https://www.asifdigital.agency/icon-512.png",
              "logo": "https://www.asifdigital.agency/icon-512.png",
              "url": "https://www.asifdigital.agency",
              "telephone": "+971545866094",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Muwaileh Commercial",
                "addressLocality": "Sharjah",
                "addressRegion": "Sharjah",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.3218,
                "longitude": 55.4564
              },
              "areaServed": [
                "Dubai",
                "Sharjah",
                "Abu Dhabi",
                "United Arab Emirates",
                "GCC"
              ],
              "openingHours": "Mo,Tu,We,Th,Fr 09:00-18:00"
            })
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Layout>
            {children}
          </Layout>
        </SmoothScroll>
      </body>
    </html>
  );
}
