import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/data/blogData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.asifdigital.agency';
  
  const staticRoutes = [    {
      url: \\/\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },    {
      url: \\/about\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },    {
      url: \\/ai-agents-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/ai-automation-abu-dhabi\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/ai-automation-agency-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/ai-automation-sharjah\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/ai-chatbots-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/ai-consulting-uae\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/ai-lead-generation-agency-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/ai-marketing-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/ai-real-estate-agency-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/arabic-ai-hub\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },    {
      url: \\/blog\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },    {
      url: \\/case-studies\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },    {
      url: \\/contact\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },    {
      url: \\/portfolio\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },    {
      url: \\/services\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/agentic-finance-uae\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/ai-hr-emirates\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/branding-agency-dubai-sharjah-uae\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/creative-web-design-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/ecommerce-website-development-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/graphic-design-agency-dubai-sharjah\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/logistics-resilience\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/ppc-google-ads-agency-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/seo-agency-dubai-sharjah-uae\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/social-media-management-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/ui-ux-design-agency-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/web-design-dubai-sharjah\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/web-development-dubai-uae\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/web-hosting-uae\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/website-maintenance-support-dubai\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/services/whatsapp-automation-gcc\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },    {
      url: \\/sovereign-dashboard\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },    {
      url: \\/sovereign-sales-agent\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },    {
      url: \\/workflow-automation-uae\,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },  ];

  const blogUrls = BLOG_POSTS.map((post) => ({
    url: \\/blog/\\,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogUrls];
}
