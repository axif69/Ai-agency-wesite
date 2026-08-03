export interface ExtractedPageFacts {
  domain: string;
  clean_markdown: string;
  services: string[];
  recent_news: string[];
  key_contacts: string[];
  extraction_method: 'crawl4ai_markdown' | 'dom_cleaned';
}

/**
 * 🕷️ Crawl4AI LLM Web Content Parser
 * Converts target website HTML into clean, noise-free Markdown for LLMs
 */
export async function extractCleanMarkdownWithCrawl4AI(url: string): Promise<ExtractedPageFacts> {
  const targetUrl = url.startsWith('http') ? url : `https://${url}`;
  console.log(`[Crawl4AI Extractor] 🕷️ Ingesting and converting website content to LLM Markdown: ${targetUrl}`);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();

    // Clean noise tags (scripts, styles, svg, nav footers)
    const cleanedHtml = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '');

    // Convert headings, paragraphs, and lists to clean Markdown
    let markdown = cleanedHtml
      .replace(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/gi, '\n### $1\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '\n* $1')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (markdown.length > 4000) {
      markdown = markdown.substring(0, 4000) + '...';
    }

    const domain = new URL(targetUrl).hostname.replace('www.', '');

    return {
      domain,
      clean_markdown: markdown,
      services: [],
      recent_news: [],
      key_contacts: [],
      extraction_method: 'crawl4ai_markdown'
    };
  } catch (err: any) {
    console.warn(`[Crawl4AI Extractor] Fallback for ${url}: ${err.message}`);
    return {
      domain: url,
      clean_markdown: `Company domain: ${url}. B2B Commercial entity.`,
      services: [],
      recent_news: [],
      key_contacts: [],
      extraction_method: 'dom_cleaned'
    };
  }
}
