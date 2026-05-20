# Asif Digital: Blog Publisher's Guide

Your blog system is engineered for high-speed publishing without touching complex code.

## How to Publish a New Post

1.  **Open the Data Store:** Navigate to `src/data/blogData.ts`.
2.  **Add Your Content:** Copy an existing post block (everything between `{ ... }`) and paste it at the top of the `BLOG_POSTS` array.
3.  **Update the Fields:**
    - `slug`: The unique URL name (e.g., `modern-ai-dubai`).
    - `title`: The headline of your article.
    - `excerpt`: A 2-sentence summary for the preview card.
    - `content`: Your article body.

### Writing the Content
The `content` field supports standard HTML tags. Your system is already styled to handle these beautifully:

| Tag | Purpose |
| :--- | :--- |
| `<h2>` | Section Headings (Serif Font) |
| `<h3>` | Sub-headings (Modern Sans) |
| `<p>` | Standard Paragraphs |
| `<strong>` | **Bold Text** for emphasis |
| `<ul>` / `<li>` | Bulleted Lists (styled with custom marks) |
| `<blockquote>` | Important Quotes (styled with borders) |

## Example Block
```typescript
  {
    slug: "your-new-post",
    title: "The Headline Here",
    excerpt: "The summary for the card view...",
    date: "March 23, 2026",
    readTime: "5 min read",
    author: "Asif Khan",
    category: "Strategy",
    content: `
      <p>Your opening paragraph here.</p>
      <h2>A New Section</h2>
      <p>More details...</p>
    `
  },
```

**Note:** Once you save the file, the website updates instantly!
