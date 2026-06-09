import axios from 'axios';
import * as cheerio from 'cheerio';
import { Tool, ToolContext } from '../framework/Tool';

export class BingSearchTool extends Tool {
  constructor() {
    super('BingSearch', 'Searches Bing to extract company domains and titles based on a query.');
  }

  async execute(query: string, context?: ToolContext): Promise<any> {
    const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    
    const { data: html } = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
      }
    });

    const $ = cheerio.load(html);
    const results: any[] = [];
    const seen = new Set();

    $('a').each((i, el) => {
      const url = $(el).attr('href');
      if (!url || !url.startsWith('http')) return;
      
      try {
        const domain = new URL(url).hostname.replace('www.', '').toLowerCase();
        
        const isJunk = /bing|google|microsoft|apple|facebook|linkedin|twitter|youtube|instagram|amazon|ad|wiki|blog|news|article|press|release|clutch|yelp|yellow|pages|directory|top10|best|about|privacy|help|reddit|pinterest|wordpress|shopify|faz\.net|frankfurter|allgemeine|reuters|bloomberg|nytimes|cnn|bbc|theguardian|economist|forbes|techcrunch|wired/.test(domain);
        const isTooShort = domain.split('.')[0].length < 3;
        
        if (isJunk || isTooShort) return;

        if (!seen.has(domain)) {
          seen.add(domain);
          results.push({
            url: `https://${domain}`,
            title: $(el).text().trim() || domain
          });
        }
      } catch (e) {}
    });

    return results;
  }
}
