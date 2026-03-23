import { motion } from "motion/react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import SEO from "../components/SEO";

import { BLOG_POSTS } from "../data/blogData";

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  if (!slug || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-20">
      <SEO 
        title={`${post.title} | Asif Digital Blog`} 
        description={post.excerpt}
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
          </div>
        </motion.div>
      </section>

      {/* Article Body */}
      <section className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div 
            className="text-white/80 font-light leading-[1.8] space-y-6 blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
      </section>
    </div>
  );
}
