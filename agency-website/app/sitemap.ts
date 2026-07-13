import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '../src/data/blogData'
import { uaeLocations } from '../data/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.asifdigital.agency';
  
  const routes = [
    "/",
    "/about",
    "/ai-agents-dubai",
    "/ai-automation-abu-dhabi",
    "/ai-automation-agency-dubai",
    "/ai-automation-sharjah",
    "/ai-chatbots-dubai",
    "/ai-consulting-uae",
    "/ai-lead-generation-agency-dubai",
    "/ai-marketing-dubai",
    "/ai-real-estate-agency-dubai",
    "/arabic-ai-hub",
    "/blog",
    "/case-studies",
    "/contact",
    "/portfolio",
    "/services",
    "/services/agentic-finance-uae",
    "/services/ai-hr-emirates",
    "/services/ai-property-management-uae",
    "/services/branding-agency-dubai-sharjah",
    "/services/creative-web-design-dubai",
    "/services/ecommerce-website-development-dubai",
    "/services/graphic-design-agency-dubai-sharjah",
    "/services/logistics-resilience",
    "/services/ppc-google-ads-agency-dubai",
    "/services/seo-agency-dubai-sharjah-uae",
    "/services/social-media-management-dubai-uae",
    "/services/ui-ux-design-agency-dubai",
    "/services/web-design-dubai-sharjah",
    "/services/web-design-sharjah",
    "/services/web-development-dubai-uae",
    "/services/web-hosting-uae",
    "/services/website-maintenance-support-dubai",
    "/services/whatsapp-automation-gcc",
    "/sovereign-dashboard",
    "/sovereign-sales-agent",
    "/workflow-automation-uae"
  ];

  const staticUrls = routes.map((route) => {
    let priority = 0.8;
    if (route === "/") priority = 1.0;
    else if (route.includes("/services") || route.includes("/ai-")) priority = 0.9;

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
    };
  });

  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const locationUrls = uaeLocations.map((location) => ({
    url: `${baseUrl}/location/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...blogUrls, ...locationUrls];
}
