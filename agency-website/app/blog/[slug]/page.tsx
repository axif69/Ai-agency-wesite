import PageComponent from '../../../src/views/BlogPost';
import { BLOG_POSTS } from '../../../src/data/blogData';
import { Metadata } from 'next';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: { slug: string };
};

function compactSeoTitle(title: string, maxLength = 64) {
  if (title.length <= maxLength) return title;
  const candidate = title.slice(0, maxLength - 1);
  const boundary = candidate.lastIndexOf(' ');
  return `${candidate.slice(0, boundary > 40 ? boundary : maxLength - 1)}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Blog Post Not Found | Asif Digital Agency UAE',
      description: 'The requested blog post could not be found on Asif Digital.',
      alternates: {
        canonical: `https://www.asifdigital.agency/blog/${params.slug}`
      }
    };
  }
  return {
    title: compactSeoTitle(post.title),
    description: post.excerpt || `${post.title}. Read the full article on Asif Digital.`,
    authors: [{ name: post.author, url: 'https://www.asifdigital.agency/about' }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://www.asifdigital.agency/blog/${post.slug}`,
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.lastReviewed || post.date).toISOString(),
      authors: [post.author],
    },
    alternates: {
      canonical: `https://www.asifdigital.agency/blog/${params.slug}`
    }
  };
}

export default async function Page({ params }: Props) {
  const post = BLOG_POSTS.find((item) => item.slug === params.slug);
  const articleSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.lastReviewed || post.date).toISOString(),
    mainEntityOfPage: `https://www.asifdigital.agency/blog/${post.slug}`,
    author: { '@type': 'Person', name: post.author, url: 'https://www.asifdigital.agency/about' },
    reviewedBy: post.reviewedBy ? { '@type': 'Organization', name: post.reviewedBy } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Asif Digital',
      url: 'https://www.asifdigital.agency',
      logo: { '@type': 'ImageObject', url: 'https://www.asifdigital.agency/icon-512.png' },
    },
  } : null;

  return <>
    {articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />}
    <PageComponent />
  </>;
}

