import { getPostData, getSortedPostsData } from '@/lib/markdown';
import Link from 'next/link';

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);
    return {
        title: postData.seoTitle,
        description: postData.seoDescription,
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return (
        <article className="max-w-4xl mx-auto px-6 py-16">
            <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-medium tracking-wide flex items-center mb-10 transition-colors duration-300">
                &larr; Back to all insights
            </Link>
            
            <header className="mb-14">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                    {postData.title}
                </h1>
                <div className="flex items-center text-zinc-400 font-medium">
                    <span>{postData.date}</span>
                    <span className="mx-3 text-zinc-600">•</span>
                    <span className="text-emerald-500">{postData.author}</span>
                </div>
            </header>

            <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-p:text-zinc-300 prose-li:text-zinc-300 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/10 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:italic"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
            />
        </article>
    );
}
