import { motion } from "motion/react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import SEO from "../components/SEO";

// Temporary post data for demonstration
const MOCK_DB: Record<string, any> = {
  "future-of-ai-marketing-dubai": {
    title: "The Future of AI Marketing in Dubai: 2024 Trends",
    date: "Mar 15, 2024",
    readTime: "5 min read",
    author: "Asif Khan",
    category: "AI Marketing",
    content: "Dubai is rapidly becoming a global hub for Artificial Intelligence. Marketing agencies in the UAE must adapt to autonomous agents and predictive models to survive. This post outlines the key strategies to cut CAC by 40% using LLMs."
  },
  "top-saas-architectures-uae": {
    title: "Scaling SaaS Architectures for the UAE Market",
    date: "Mar 10, 2024",
    readTime: "8 min read",
    author: "Asif Khan",
    category: "SaaS Development",
    content: "Building SaaS platforms in the UAE requires strict compliance with local data sovereignty laws. We explore modern microservices, AWS Middle East region deployments, and React architectures to guarantee 99.99% uptime."
  },
  "seo-vs-aeo-sharjah": {
    title: "SEO vs AEO: Why Answer Engine Optimization is the new standard in Sharjah",
    date: "Feb 28, 2024",
    readTime: "6 min read",
    author: "Asif Khan",
    category: "SEO & AEO",
    content: "Google's AI Overviews and ChatGPT are changing how users search. You no longer just need 10 blue links; you need your brand to be cited as the authoritative source by the LLM itself. Here is Phase 1 of our AEO playbook."
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  
  if (!slug || !MOCK_DB[slug]) {
    return <Navigate to="/blog" replace />;
  }

  const post = MOCK_DB[slug];

  return (
    <div className="pt-20">
      <SEO 
        title={`${post.title} | Asif Digital Blog`} 
        description={post.content.slice(0, 150) + "..."}
      />
      
      {/* Article Header */}
      <section className="px-6 md:px-12 pt-20 pb-10 max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-[#0066FF] mb-6">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-tight tracking-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 border-t border-b border-white/10 py-6">
            <div className="flex items-center gap-2 border-r border-white/10 pr-6">
              <User className="w-4 h-4" />
              <span className="text-white">{post.author}</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
            <button className="ml-auto flex items-center gap-2 text-white/40 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.div>
      </section>

      {/* Article Body */}
      <section className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
            <Clock className="w-8 h-8 text-white/40" />
          </div>
          <h2 className="text-2xl font-serif mb-4">Comprehensive Article Coming Soon</h2>
          <p className="text-white/50 font-light leading-relaxed max-w-lg mx-auto">
            Our technical experts are currently finalizing the research, data points, and actionable strategies for this topic. Please bookmark this page and check back later for the full publication.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
