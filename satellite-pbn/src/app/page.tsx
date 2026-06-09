import { getSortedPostsData } from '@/lib/markdown';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <main className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Insights & Automation Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Agentic AI &<br />
            Workflow Automation
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            The definitive resource for UAE businesses looking to scale operations, reduce overhead, and dominate their market using advanced Artificial Intelligence.
          </p>
        </header>

        {/* Articles Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-white border-b border-zinc-800 pb-4">Latest Insights</h2>
          <div className="grid gap-6">
            {allPostsData.map(({ slug, date, title, seoDescription }) => (
              <Link 
                href={`/${slug}`} 
                key={slug}
                className="group relative block p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 hover:bg-zinc-900"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <article className="relative z-10">
                  <div className="text-sm font-medium text-emerald-500 mb-3">{date}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {seoDescription}
                  </p>
                  
                  <div className="mt-6 flex items-center text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    Read the deep dive
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
