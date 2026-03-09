import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Bot, User, Loader2, 
  Mic, MicOff, Volume2, VolumeX, Briefcase, 
  ChevronRight, CheckCircle2, Code, Brain, Target, MessageCircle, PenTool, Server, MapPin, Phone, Mail, ArrowRight, Zap
} from 'lucide-react';

// Configuration - API Key provided by environment
const apiKey = ""; 
const TEXT_MODEL = "gemini-2.5-flash-preview-09-2025";
const TTS_MODEL = "gemini-2.5-flash-preview-tts";

const SYSTEM_INSTRUCTION = `
You are Khalid, the Elite AI Strategic Consultant for Asif Digital (UAE).
Asif Digital is the UAE's premier AI agency led by Asif Khan.

STRICT PROTOCOL:
1. NO MARKDOWN: NEVER use asterisks (**), hashtags (#), or bolding.
2. CONCISION: Maximum two sentences per response. 
3. TONE: Elite, sophisticated, and direct. You are a human consultant.
4. MISSION: Secure Name, Strategic Objective, and WhatsApp/Phone.

SUGGESTIONS:
- Always append exactly 2 strategic options: [SUGGESTIONS: Strategic Audit, Enterprise SaaS]
`;

const pcmToWav = (pcmBase64, sampleRate = 24000) => {
  const binaryString = window.atob(pcmBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);
  view.setUint32(0, 0x52494646, false);
  view.setUint32(4, 36 + len, true);
  view.setUint32(8, 0x57415645, false);
  view.setUint32(12, 0x666d7420, false);
  view.setUint16(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true); 
  view.setUint32(28, sampleRate * 2, true); 
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  view.setUint32(36, 0x64617461, false);
  view.setUint32(40, len, true);
  const blob = new Blob([wavHeader, bytes], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

export default function App() {
  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Welcome to Asif Digital. I am Khalid. To initiate our strategic assessment, may I have your name?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [leadStage, setLeadStage] = useState(0);

  // Refs
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Khalid Voice Logic
  const speak = async (text) => {
    if (!isSpeaking || !apiKey) return;
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Say naturally: ${text}` }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } } }
          }
        })
      });
      const data = await response.json();
      const pcmData = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      if (pcmData && audioRef.current) {
        audioRef.current.src = pcmToWav(pcmData);
        audioRef.current.play().catch(() => {});
      }
    } catch (e) { console.error(e); }
  };

  const handleSend = async (overrideInput) => {
    const text = overrideInput || input;
    if (!text.trim() || isLoading) return;
    const userMessage = text.trim();
    if (!overrideInput) setInput('');
    
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);
    setLeadStage(prev => Math.min(prev + 1, 4));

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: newMessages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: { temperature: 0.5 }
        })
      });
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "System latency. Please hold.";
      const suggestionMatch = rawText.match(/\[SUGGESTIONS: (.*?)\]/);
      let cleanText = suggestionMatch ? rawText.replace(suggestionMatch[0], '').trim() : rawText;
      cleanText = cleanText.replace(/\*/g, '').trim();
      const suggestions = suggestionMatch ? suggestionMatch[1].split(',').map(s => s.trim()) : [];
      
      setMessages(prev => [...prev, { role: 'model', text: cleanText, suggestions: suggestions.length > 0 ? suggestions : undefined }]);
      speak(cleanText);
    } catch (e) { console.error(e); } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-sky-500/30 overflow-x-hidden">
      <audio ref={audioRef} className="hidden" />

      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-40 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter">ASIF <span className="text-sky-500 italic">KHAN.</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-8"
            >
                Strategic Digital Partner — UAE
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-serif mb-12 leading-[1.1]">
                Architecting <br />
                <span className="italic text-white/40">Intelligent</span> <br />
                Digital Ecosystems
            </h1>
            <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-xl leading-relaxed mb-12">
                We bridge the gap between complex AI technology and business convenience. 
                Delivering high-performance software and data-driven marketing strategies that 
                scale enterprise growth across Sharjah, Dubai, and the Northern Emirates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button onClick={() => setIsChatOpen(true)} className="px-10 py-5 bg-white text-black font-bold rounded-full text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3">
                    Request Strategy Session <ChevronRight className="w-4 h-4" />
                </button>
                <button className="px-10 py-5 border border-white/10 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-colors">
                    Explore Capabilities
                </button>
            </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="p-10 border border-white/5 bg-white/[0.02] rounded-3xl group hover:border-sky-500/50 transition-colors">
                    <Code className="w-10 h-10 text-sky-500 mb-8" />
                    <h3 className="text-2xl font-serif mb-4">Web / App Development</h3>
                    <p className="text-white/40 leading-relaxed">High-stakes engineering for custom SaaS platforms and enterprise web applications.</p>
                </div>
                <div className="p-10 border border-white/5 bg-white/[0.02] rounded-3xl group hover:border-sky-500/50 transition-colors">
                    <Brain className="w-10 h-10 text-sky-500 mb-8" />
                    <h3 className="text-2xl font-serif mb-4">AI & Automation</h3>
                    <p className="text-white/40 leading-relaxed">Integrating neural intelligence into business workflows to multiply operational efficiency.</p>
                </div>
                <div className="p-10 border border-white/5 bg-white/[0.02] rounded-3xl group hover:border-sky-500/50 transition-colors">
                    <Target className="w-10 h-10 text-sky-500 mb-8" />
                    <h3 className="text-2xl font-serif mb-4">Performance Marketing</h3>
                    <p className="text-white/40 leading-relaxed">Data-driven Meta and Google Ads strategies focused purely on ROI and acquisition.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- KHALID CHATBOT UI --- */}
      <div className="fixed bottom-8 right-8 z-[100]">
        {!isChatOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] group border border-slate-100"
          >
            <div className="w-12 h-12 rounded-full bg-[#0284c7] flex items-center justify-center text-white shadow-lg group-hover:bg-[#0369a1] transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold text-[#0284c7] uppercase tracking-tighter">Strategic Consult</div>
              <div className="text-sm font-bold text-slate-900">Speak with Khalid</div>
            </div>
          </motion.button>
        )}

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="w-full fixed inset-0 sm:relative sm:inset-auto sm:w-[410px] h-full sm:h-[660px] bg-[#050505] sm:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden border border-white/5"
            >
              {/* Khalid Header */}
              <div className="p-6 bg-[#0a0a0a] border-b border-white/5 relative shrink-0">
                  <div className="absolute top-0 left-0 h-[2px] bg-[#0ea5e9] transition-all duration-1000 shadow-[0_0_15px_#0ea5e9]" style={{ width: `${Math.min((leadStage / 4) * 100, 100)}%` }} />
                  <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                          <div className="relative">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                  <Bot className="w-6 h-6 text-[#0ea5e9]" />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#050505]" />
                          </div>
                          <div>
                              <h3 className="font-bold text-lg tracking-tight text-white">Khalid</h3>
                              <div className="flex items-center gap-2 text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
                                  <span className="w-1 h-1 rounded-full bg-[#0ea5e9] animate-pulse" />
                                  Elite AI Strategy
                              </div>
                          </div>
                      </div>
                      <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                          <X className="w-6 h-6 text-white/20 hover:text-white" />
                      </button>
                  </div>
              </div>

              {/* Khalid Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide bg-[#050505]">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                      msg.role === 'user' 
                        ? 'bg-[#0284c7] text-white rounded-tr-none shadow-[0_10px_20px_rgba(2,132,199,0.2)]' 
                        : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.suggestions && i === messages.length - 1 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {msg.suggestions.map((s, j) => (
                          <button key={j} onClick={() => handleSend(s)} className="text-[11px] font-bold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:border-[#0ea5e9] hover:text-white transition-all">
                            {s} <ChevronRight className="w-3 h-3 text-[#0ea5e9]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {leadStage >= 3 && !isLoading && (
                  <div className="pt-2">
                      <button onClick={() => window.open(`https://wa.me/971545866094?text=Requesting Strategy Session with Asif Digital`, '_blank')} className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition-transform">
                          <CheckCircle2 className="w-5 h-5" /> Secure Session with Asif Khan
                      </button>
                      <p className="text-[10px] text-center text-white/20 mt-4 font-medium uppercase tracking-[0.2em]">Sharjah HQ Connection</p>
                  </div>
                )}
                {isLoading && <div className="flex gap-1 pl-2"><span className="w-1.5 h-1.5 bg-sky-500/40 rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-sky-500/40 rounded-full animate-bounce [animation-delay:0.2s]" /></div>}
                <div ref={messagesEndRef} />
              </div>

              {/* Khalid Input */}
              <div className="p-5 bg-[#0a0a0a] border-t border-white/5 shrink-0">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 bg-white/5 rounded-2xl p-1 border border-white/10 focus-within:border-[#0ea5e9]/50 transition-colors">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message Khalid..." className="flex-1 bg-transparent border-none py-3 text-sm text-white px-4 placeholder:text-white/20 focus:outline-none" />
                  <button type="submit" disabled={!input.trim() || isLoading} className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#0284c7] text-white shadow-lg hover:bg-[#0369a1] disabled:opacity-10 transition-all">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl font-bold tracking-tighter">ASIF <span className="text-sky-500">DIGITAL.</span></div>
            <p className="text-white/20 text-xs uppercase tracking-widest">&copy; 2026 Architected by Asif Digital. All Rights Reserved.</p>
            <div className="flex gap-6 text-white/30 text-xs font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
