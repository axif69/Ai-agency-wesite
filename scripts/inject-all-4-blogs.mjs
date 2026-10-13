import fs from 'fs';
import { article1 } from './generate-article-1.mjs';
import { article2 } from './generate-article-2.mjs';
import { article3 } from './generate-article-3.mjs';
import { article4 } from './generate-article-4.mjs';

const articles = [article1, article2, article3, article4];

console.log('Validating 4 articles:');
articles.forEach((art, i) => {
  const words = art.content.split(/\s+/).filter(Boolean).length;
  console.log(`Article ${i + 1}: ${art.slug} (${words} words)`);
  if (words < 5000) {
    throw new Error(`Article ${i + 1} has less than 5000 words: ${words}`);
  }
});

const targetPath = 'agency-website/src/data/blogData.ts';
let content = fs.readFileSync(targetPath, 'utf8');

// Build TypeScript object string for each article
function formatArticle(art) {
  return `  {
    slug: ${JSON.stringify(art.slug)},
    title: ${JSON.stringify(art.title)},
    excerpt: ${JSON.stringify(art.excerpt)},
    date: ${JSON.stringify(art.date)},
    readTime: ${JSON.stringify(art.readTime)},
    author: ${JSON.stringify(art.author)},
    reviewedBy: ${JSON.stringify(art.reviewedBy)},
    lastReviewed: ${JSON.stringify(art.lastReviewed)},
    category: ${JSON.stringify(art.category)},
    content: \`${art.content.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`
  },`;
}

const formattedArticles = articles.map(formatArticle).join('\n');

// Find insertion point right after the closing `},` of "why-uae-corporate-websites-bleed-paid-ad-spend"
const marker = 'why-uae-corporate-websites-bleed-paid-ad-spend';
const markerIndex = content.indexOf(marker);

if (markerIndex === -1) {
  throw new Error('Could not find why-uae-corporate-websites-bleed-paid-ad-spend in blogData.ts');
}

// Find the closing `},` of this object
const nextClosingBrace = content.indexOf('  },', markerIndex);
if (nextClosingBrace === -1) {
  throw new Error('Could not find closing brace for why-uae blog post');
}

const insertionPoint = nextClosingBrace + 4; // right after "  },"

// Check if any of these slugs are already present in blogData.ts
articles.forEach((art) => {
  if (content.includes(`slug: "${art.slug}"`)) {
    console.log(`Note: ${art.slug} already present in blogData.ts, skipping duplicate insertion.`);
  }
});

const newContent = content.slice(0, insertionPoint) + '\n' + formattedArticles + content.slice(insertionPoint);

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully injected all 4 articles into blogData.ts!');
