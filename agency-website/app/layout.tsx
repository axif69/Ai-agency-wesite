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
  title: "Asif Digital | AI Automation, Web & Graphic Design Dubai & Sharjah",
  description: "Asif Digital is a premier UAE AI automation, web & graphic design agency helping businesses automate workflows, generate leads, and scale with custom AI agents and sovereign systems.",
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
      { url: '/favicon-clean.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.asifdigital.agency',
    siteName: 'Asif Digital: AI Automation, Web & Graphic Design',
    title: 'Asif Digital | AI Automation, Web & Graphic Design Dubai & Sharjah',
    description: 'Premier AI Automation, Custom Web Development & Graphic Design Agency in Dubai and Sharjah. 24/7 AI agents, WhatsApp workflows, and lead attribution systems.',
    images: [
      {
        url: 'https://www.asifdigital.agency/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Asif Digital Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asif Digital | AI Automation, Web & Graphic Design',
    description: 'Premier AI Automation, Custom Web Development & Graphic Design Agency in Dubai and Sharjah.',
    images: ['https://www.asifdigital.agency/icon-512.png'],
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
              gtag('config', 'G-DKTWMYPBV7', {
                send_page_view: true
              });

              // Automated GA4 Lead Gen Key Event Tracking
              if (typeof window !== 'undefined') {
                document.addEventListener('click', function(e) {
                  var target = e.target.closest('a');
                  if (!target) return;
                  var href = target.getAttribute('href') || '';
                  
                  // WhatsApp Lead Conversion
                  if (href.includes('wa.me') || href.includes('whatsapp.com')) {
                    gtag('event', 'generate_lead', {
                      event_category: 'Lead',
                      event_label: 'WhatsApp Click',
                      value: 1.0,
                      currency: 'AED',
                      link_url: href
                    });
                  }
                  
                  // Direct Phone Call Conversion
                  if (href.startsWith('tel:')) {
                    gtag('event', 'contact', {
                      event_category: 'Contact',
                      event_label: 'Phone Call Click',
                      value: 1.0,
                      currency: 'AED',
                      link_url: href
                    });
                  }
                }, true);

                // Contact Form Submission Conversion
                document.addEventListener('submit', function(e) {
                  gtag('event', 'generate_lead', {
                    event_category: 'Lead',
                    event_label: 'Contact Form Submission',
                    value: 1.0,
                    currency: 'AED'
                  });
                }, true);
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MarketingAgency",
              "name": "Asif Digital: AI Automation, Web & Graphic Design",
              "alternateName": "Asif Digital Agency",
              "image": "https://www.asifdigital.agency/icon-512.png",
              "logo": "https://www.asifdigital.agency/icon-512.png",
              "url": "https://www.asifdigital.agency",
              "telephone": "+971545866094",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Muwaileh Commercial - Industrial Area",
                "addressLocality": "Sharjah",
                "addressRegion": "Sharjah",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.3218,
                "longitude": 55.4564
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "8",
                "bestRating": "5"
              },
              "areaServed": [
                "Sharjah",
                "Dubai",
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
