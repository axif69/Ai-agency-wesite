import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*?*rwg_token=',
          '/*?*source=',
          '/*?*fbclid=',
          '/*?*gclid=',
          '/*?*utm_',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.asifdigital.agency/sitemap.xml',
  }
}
