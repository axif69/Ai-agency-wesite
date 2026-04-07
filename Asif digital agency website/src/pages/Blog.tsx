import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import SEO from "../components/SEO";
import { BLOG_POSTS } from "../data/blogData";

export default function Blog() {
  return (
    <div className="pt-20">
      <SEO 
        title="AI Digital Marketing & Dev Blog | Asif Digital UAE" 
        description="Expert insights on artificial intelligence, web development, SaaS architectures, and AEO strategies for businesses in Dubai and Sharjah."
        canonical="https://asifdigital.agency/blog"
      />
      
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="micro-label block mb-4">Insights & Strategy</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] font-serif leading-tight tracking-tight mb-8">
            The <span className="italic text-white/50">Journal</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl leading-relaxed">
            Cutting-edge insights on AI automation, software engineering, and digital growth strategies for the modern UAE enterprise.
          </p>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article 
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass-panel p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all duration-500 flex flex-col"
            >
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-[#0066FF] mb-6">
                {post.category}
              </div>
              
              <h2 className="text-2xl font-serif tracking-tight mb-4 group-hover:text-[#0066FF] transition-colors line-clamp-2">
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-white/60 font-light leading-relaxed mb-8 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-white/40 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
