/**
 * Tech Stack & CMS Detector — OSINT Website Tech Profiler
 * Analyzes HTML, script tags, meta tags, and headers to identify frameworks, CMS, and analytics tools.
 */
import * as cheerio from 'cheerio';

export interface TechStackResult {
    cms?: string[];
    frameworks?: string[];
    analytics?: string[];
    hosting?: string[];
    all: string[];
}

export function detectTechStack(html: string): TechStackResult {
    if (!html) return { all: [] };

    const $ = cheerio.load(html);
    const htmlLower = html.toLowerCase();
    const cms: Set<string> = new Set();
    const frameworks: Set<string> = new Set();
    const analytics: Set<string> = new Set();

    // Check meta generator
    const generator = $('meta[name="generator"]').attr('content')?.toLowerCase() || '';
    if (generator.includes('wordpress')) cms.add('WordPress');
    if (generator.includes('shopify')) cms.add('Shopify');
    if (generator.includes('wix')) cms.add('Wix');
    if (generator.includes('webflow')) cms.add('Webflow');
    if (generator.includes('squarespace')) cms.add('Squarespace');
    if (generator.includes('drupal')) cms.add('Drupal');

    // Check HTML patterns
    if (htmlLower.includes('wp-content') || htmlLower.includes('wp-includes')) cms.add('WordPress');
    if (htmlLower.includes('cdn.shopify.com')) cms.add('Shopify');
    if (htmlLower.includes('wixstatic.com') || htmlLower.includes('wix.com')) cms.add('Wix');
    if (htmlLower.includes('assets.website-files.com')) cms.add('Webflow');
    if (htmlLower.includes('elementor')) cms.add('Elementor');

    // Frameworks & Libraries
    if (htmlLower.includes('_next/static') || htmlLower.includes('__next_data__')) frameworks.add('Next.js');
    if (htmlLower.includes('react') || htmlLower.includes('reactdom')) frameworks.add('React');
    if (htmlLower.includes('vue.js') || htmlLower.includes('__nuxt__')) frameworks.add('Vue.js');
    if (htmlLower.includes('tailwind')) frameworks.add('Tailwind CSS');
    if (htmlLower.includes('bootstrap')) frameworks.add('Bootstrap');
    if (htmlLower.includes('jquery')) frameworks.add('jQuery');

    // Analytics & MarTech
    if (htmlLower.includes('googletagmanager') || htmlLower.includes('google-analytics')) analytics.add('Google Analytics');
    if (htmlLower.includes('connect.facebook.net') || htmlLower.includes('fbevents.js')) analytics.add('Facebook Pixel');
    if (htmlLower.includes('hs-scripts.com') || htmlLower.includes('hubspot')) analytics.add('HubSpot');
    if (htmlLower.includes('hotjar')) analytics.add('Hotjar');

    const all = Array.from(new Set([...Array.from(cms), ...Array.from(frameworks), ...Array.from(analytics)]));

    return {
        cms: Array.from(cms),
        frameworks: Array.from(frameworks),
        analytics: Array.from(analytics),
        all: all.length > 0 ? all : ['Custom Web Stack']
    };
}
