import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, Loader2, Copy, Check, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function SocialPostGenerator() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<'Instagram' | 'Twitter' | 'LinkedIn' | 'Facebook'>('Instagram');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePost = async () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);
    setGeneratedPost('');

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a high-converting, professional social media post for ${platform} about the following topic: "${topic}". 
        The post should be engaging, include relevant hashtags, and have a clear call to action. 
        Tone: Professional yet energetic agency style.`,
      });

      setGeneratedPost(response.text || "Failed to generate post. Please try again.");
    } catch (error) {
      console.error("Post Generation Error:", error);
      setGeneratedPost("An error occurred while generating your post. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    { name: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
    { name: 'Twitter', icon: <Twitter className="w-4 h-4" /> },
    { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
    { name: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="micro-label block mb-4">AI Tools</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
            Social <span className="italic text-white/40">Architect.</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto">
            Experience the power of our proprietary AI. Enter a topic and let our engine craft high-performance social content for your brand instantly.
          </p>
        </motion.div>

        <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Side */}
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4">Select Platform</label>
                <div className="flex flex-wrap gap-3">
                  {platforms.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setPlatform(p.name as any)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 border ${
                        platform === p.name 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {p.icon}
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4">What's the topic?</label>
                <div className="relative">
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Benefits of AI in Real Estate marketing..."
                    className="w-full bg-black/50 border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-white/30 transition-colors min-h-[150px] resize-none"
                  />
                </div>
              </div>

              <button
                onClick={generatePost}
                disabled={!topic.trim() || isLoading}
                className="btn-premium btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Architecting Post...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content
                  </>
                )}
              </button>
            </div>

            {/* Output Side */}
            <div className="relative min-h-[300px] flex flex-col">
              <div className="absolute inset-0 bg-white/5 rounded-3xl border border-white/5 flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/20">Generated Output</span>
                  {generatedPost && (
                    <button 
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                <div className="p-8 flex-grow overflow-y-auto font-light text-white/80 leading-relaxed whitespace-pre-wrap">
                  {generatedPost ? (
                    generatedPost
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                      <Sparkles className="w-12 h-12" />
                      <p className="text-sm">Your AI-crafted content will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
