import { Helmet } from "react-helmet-async";

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

export default function SEO({ 
  title, 
  description, 
  keywords, 
  schema, 
  faqSchema, 
  canonical,
  ogImage,
  twitterImage,
  author = "Asif Digital Team"
}: SEOProps) {
  const siteUrl = "https://asifdigital.agency";
  const finalCanonical = canonical || `${siteUrl}${window.location.pathname}`;
  
  // Default Branding Image (Global Fallback)
  const defaultOgImage = `${siteUrl}/brand/og-main.png`;
  const finalOgImage = ogImage || defaultOgImage;
  const finalTwitterImage = twitterImage || finalOgImage;

  // Default Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": finalCanonical
      }
    ]
  };

  // Default Organization & LocalBusiness Schema (E-E-A-T)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    "name": "Asif Digital | Sovereign AI Architecture",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/brand/logo-gold.png`
    },
    "image": `${siteUrl}/brand/office-dubai.jpg`,
    "description": "Elite AI Architectural Firm in Dubai, UAE. Specializing in Sovereign AI Hubs, Khaleeji NLP, and Agentic Workflow Automation for GCC Enterprise.",
    "telephone": "+971545866094",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressRegion": "DU",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.1852",
      "longitude": "55.2743"
    },
    "sameAs": [
      "https://linkedin.com/company/asifdigital",
      "https://twitter.com/asifdigitaluae"
    ],
    "priceRange": "$$$$",
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Abu Dhabi" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "City", "name": "Riyadh" }
    ],
    "knowsAbout": ["Sovereign AI", "Khaleeji NLP", "Agentic Automation", "Enterprise Software Architecture", "AEO Strategy"]
  };

  // FAQ Schema if provided
  const faqJsonLd = faqSchema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqSchema.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title} | Asif Digital Agency UAE</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={finalCanonical} />
      
      {/* E-E-A-T (Excellence, Experience, Authority, Trust) */}
      <meta name="author" content={author} />
      <meta name="publisher" content="Asif Digital Agency" />
      <meta name="copyright" content="© 2026 Asif Digital" />

      {/* Open Graph (Social Sharing) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="Asif Digital Agency" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalTwitterImage} />
      <meta name="twitter:site" content="@asifdigitaluae" />

      {/* UAE Regional Targeting */}
      <meta name="geo.region" content="AE-DU;AE-SH;AE-AZ" />
      <meta name="geo.placename" content="Dubai, Sharjah, Abu Dhabi, UAE" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      {faqJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      )}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
