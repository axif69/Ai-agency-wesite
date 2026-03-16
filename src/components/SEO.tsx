import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  schema?: Record<string, any>;
}

export default function SEO({ title, description, keywords, schema }: SEOProps) {
  return (
    <Helmet>
      <title>{title} | Asif Khan - AI Web Developer & Digital Marketer</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* UAE specific local SEO */}
      <meta name="geo.region" content="AE-SH" />
      <meta name="geo.placename" content="Sharjah" />
      <meta name="geo.position" content="25.3463;55.4209" />
      <meta name="ICBM" content="25.3463, 55.4209" />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
