"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, redirect } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";


import { BLOG_POSTS } from "../data/blogData";

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  if (!slug || !post) {
    redirect("/blog");
  }

  return (
    <div className="pt-20">
      
      
      {/* Article Header */}
      <section className="px-6 md:px-12 pt-20 pb-10 max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest mb-12">
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
            {post.lastReviewed && (
              <div className="text-white/40">
                Reviewed {post.lastReviewed}{post.reviewedBy ? ` by ${post.reviewedBy}` : ""}
              </div>
            )}
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

        {/* Dynamic CTA at the end of the post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-[80px]" />
          <h3 className="text-2xl font-serif mb-4 relative z-10">Ready to accelerate your B2B operations in Dubai or the UAE?</h3>
          <p className="text-white/60 font-light mb-8 relative z-10">
            Let's design a customized, compliant, and highly performant AI strategy to capture demand and automate workflows.
          </p>
          <div className="relative z-10">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Book your free AI consultation with Asif Digital
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
