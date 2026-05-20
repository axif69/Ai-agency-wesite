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
    title: `${post.title} | Asif Digital Blog`,
    description: post.excerpt || `${post.title}. Read the full article on Asif Digital.`,
    alternates: {
      canonical: `https://www.asifdigital.agency/blog/${params.slug}`
    }
  };
}

export default function Page() {
  return <PageComponent />;
}

