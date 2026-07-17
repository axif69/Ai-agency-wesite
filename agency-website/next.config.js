const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [],
  async redirects() {
    return [
      // www enforcement
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'asifdigital.agency' }],
        destination: 'https://www.asifdigital.agency/:path*',
        permanent: true,
      },
      // Service URL consolidation
      { source: '/services/ai-agents-dubai', destination: '/ai-agents-dubai', permanent: true },
      { source: '/services/workflow-automation-uae', destination: '/workflow-automation-uae', permanent: true },
      { source: '/services/ai-marketing-dubai', destination: '/ai-marketing-dubai', permanent: true },
      { source: '/services/ai-chatbots-dubai', destination: '/ai-chatbots-dubai', permanent: true },
      { source: '/services/ai-automation-chatbot-dubai', destination: '/ai-chatbots-dubai', permanent: true },
      { source: '/services/ai-consulting-uae', destination: '/ai-consulting-uae', permanent: true },
      { source: '/services/ai-automation-agency-dubai', destination: '/ai-automation-agency-dubai', permanent: true },
      // Keyword mismatch corrections
      { source: '/ai-marketing-agency-dubai', destination: '/ai-marketing-dubai', permanent: true },
      // Legacy URL redirects (SEO audit fixes)
      { source: '/ai-chatbot-dubai', destination: '/ai-chatbots-dubai', permanent: true },
      { source: '/services/ai-automation-chatbot-development-dubai', destination: '/ai-agents-dubai', permanent: true },
      { source: '/services/ppc-google-meta-ads-agency-dubai', destination: '/services/ppc-google-ads-agency-dubai', permanent: true },
      { source: '/services/social-media-management-dubai-sharjah', destination: '/services/social-media-management-dubai-uae', permanent: true },
      { source: '/services/saas-development-specialist-uae', destination: '/services', permanent: true },
      { source: '/services/web-hosting-dubai', destination: '/services/web-hosting-uae', permanent: true },
      { source: '/services/website-maintenance-support-dubai', destination: '/services/website-maintenance-support-dubai', permanent: false },
      
      // Recent SEO Architecture URL Updates
      { source: '/ai-for-real-estate-agencies-dubai', destination: '/ai-real-estate-agencies-dubai', permanent: true },
      { source: '/ai-for-real-estate-uae', destination: '/ai-real-estate-uae', permanent: true },
      { source: '/ai-real-estate-agency-dubai', destination: '/ai-real-estate-agencies-dubai', permanent: true },
      { source: '/services/ai-property-management-uae', destination: '/ai-property-management-uae', permanent: true },
      { source: '/services/real-estate-digital-solutions-uae', destination: '/real-estate-digital-solutions-uae', permanent: true },
      { source: '/services/web-design-sharjah', destination: '/web-design-sharjah', permanent: true },
    ];
  }
};
module.exports = nextConfig;


