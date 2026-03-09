import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Bot, User, Loader2, 
  Mic, MicOff, Volume2, VolumeX, Briefcase, 
  ChevronRight, CheckCircle2 
} from 'lucide-react';

/**
 * ELITE STRATEGIC CONFIGURATION
 * Aligned with the working Content Generator model: gemini-3-flash-preview
 */
const getEnvKey = (key: string): string => {
  try {
    // Attempt standard Vite/Vercel prefix, then fallback to raw key
    const env = (import.meta as any).env;
    return env[key] || env[key.replace('VITE_', '')] || "";
  } catch {
    return "";
  }
};

const GEMINI_KEY = getEnvKey('VITE_GEMINI_API_KEY');
const GROQ_KEY = getEnvKey('VITE_GROQ_API_KEY');

const TEXT_MODEL = "gemini-3-flash-preview"; 
const GROQ_MODEL = "llama-3.3-70b-versatile"; 

const SYSTEM_INSTRUCTION = `
You are Khalid, the elite AI Strategic Consultant for Asif Digital.
Asif Digital is the UAE's premier AI Digital Marketing & Software Development agency, led by Asif Khan.

Your Mission:
1. Conduct a high-level strategic intake for potential clients.
2. Maintain an ultra-professional, sophisticated, and efficient tone.
3. Keep replies extremely CONCISE.

Conversation Protocol:
- Phase 1: Greet and secure their name.
- Phase 2: Identify objective (Web/App Dev, SEO/AEO, Meta/Google Ads, SaaS).
- Phase 3: Gather requirements (Budget, Timeline) via targeted questions.
- Phase 4: Secure WhatsApp for Asif Khan.

Interactive Suggestions:
- Always append "[SUGGESTIONS: Option 1, Option 2]" at the end of your message to guide the user.

Tone: Elite, Strategic, and Minimalist.
NO MARKDOWN: Never use asterisks (**) or bolding. Use clean, high-end text only.
`;

interface Message {
  role: 'user' | 'model' | 'assistant';
  text: string;
  suggestions?: string[];
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Welcome to Asif Digital. I am Khalid, your elite AI Strategic Consultant. To begin our assessment, may I have your name?",
      suggestions: ["Strategic Consultation", "Partnership Inquiry"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [leadStage, setLeadStage] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /**
   * ELITE VOICE ENGINE (Browser Native)
   * Using native synthesis to bypass all Google Cloud TTS issues.
   */
  const speak = (text: string) => {
    if (!isSpeaking || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const cleanText = text.split('[SUGGESTIONS')[0].replace(/\*/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural') || v.lang.includes('en-GB'));
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.95; 
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isOpen && messages.length === 1) speak(messages[0].text);
  }, [isOpen]);

  const processResponse = (rawText: string) => {
    const suggestionMatch = rawText.match(/\[SUGGESTIONS: (.*?)\]/);
    let cleanText = suggestionMatch ? rawText.replace(suggestionMatch[0], '').trim() : rawText;
    cleanText = cleanText.replace(/\*/g, '').trim();
    const suggestions = suggestionMatch ? suggestionMatch[1].split(',').map((s: string) => s.trim()) : [];

    setMessages(prev => [...prev, { 
      role: 'model', 
      text: cleanText, 
      suggestions: suggestions.length > 0 ? suggestions : undefined 
    }]);
    speak(cleanText);
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    if (!overrideInput) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    setLeadStage(prev => prev + 1);

    try {
      // --- ATTEMPT 1: GOOGLE REST API (gemini-3-flash-preview) ---
      // We ensure strict role alternation: user -> model -> user
      const contents = messages
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }))
        .concat({ role: "user", parts: [{ text: userMsg }] });

      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${GEMINI_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: { 
            temperature: 0.5,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 400,
          }
        })
      });

      const geminiData = await geminiResponse.json();

      if (geminiData.error) {
        throw new Error(geminiData.error.message);
      }

      const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
      processResponse(responseText);

    } catch (error: any) {
      console.warn("Primary Engine Unavailable, checking failover...", error);
      
      // --- ATTEMPT 2: GROQ FAILOVER ---
      if (GROQ_KEY) {
        try {
          const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${GROQ_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: GROQ_MODEL,
              messages: [
                { role: "system", content: SYSTEM_INSTRUCTION },
                ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
                { role: "user", content: userMsg }
              ],
              temperature: 0.5
            })
          });
          const data = await response.json();
          processResponse(data.choices[0].message.content);
        } catch (failoverError) {
          setMessages(prev => [...prev, { role: 'model', text: "Strategic lines are momentarily offline. Please message Asif Khan on WhatsApp." }]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "Connectivity issue. Please check your Vercel Environment Variables." }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const forwardToWhatsApp = () => {
    setIsSummarizing(true);
    const history = messages.map(m => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text}`).join('\n');
    const text = encodeURIComponent(`*New Strategic Lead Brief for Asif Khan*\n\n${history}`);
    window.open(`https://wa.me/971545866094?text=${text}`, '_blank');
    setIsSummarizing(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  return (
    <div className="font-sans antialiased text-white">
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 p-2 pr-6 rounded-full bg-white text-black shadow-2xl flex items-center gap-4 border border-slate-100 group"
        >
          <div className="w-12 h-12 rounded-full bg-[#0284c7] flex items-center justify-center text-white shadow-lg group-hover:bg-[#0369a1] transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#0284c7] uppercase tracking-tighter">Strategic Consult</div>
            <div className="text-sm font-bold text-slate-900">Speak with Khalid</div>
          </div>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[100] w-full sm:w-[410px] h-full sm:h-[660px] bg-[#050505] sm:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden border border-white/5"
          >
            <div className="p-6 bg-[#0a0a0a] border-b border-white/5 relative shrink-0">
                <div className="absolute top-0 left-0 h-[2px] bg-[#0ea5e9] transition-all duration-1000 shadow-[0_0_15px_#0ea5e9]" style={{ width: `${Math.min((leadStage / 5) * 100, 100)}%` }} />
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                <Bot className="w-6 h-6 text-[#0ea5e9]" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#050505]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg tracking-tight text-white leading-tight">Khalid</h3>
                            <div className="flex items-center gap-2 text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
                                <span className="w-1 h-1 rounded-full bg-[#0ea5e9] animate-pulse" />
                                Powering Asif Digital
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setIsSpeaking(!isSpeaking)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                            {isSpeaking ? <Volume2 className="w-5 h-5 text-[#0ea5e9]" /> : <VolumeX className="w-5 h-5 text-white/10" />}
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                            <X className="w-6 h-6 text-white/20 hover:text-white" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide bg-[#050505]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-[#0284c7] text-white rounded-tr-none shadow-lg' 
                      : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {msg.suggestions && i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {msg.suggestions.map((s, j) => (
                        <button
                          key={j}
                          onClick={() => handleSend(s)}
                          className="flex items-center gap-2 text-[11px] font-bold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:border-[#0ea5e9] hover:text-white hover:bg-[#0ea5e9]/10 transition-all shadow-sm"
                        >
                          {s} <ChevronRight className="w-3 h-3 text-[#0ea5e9]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {leadStage >= 4 && !isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                    <button
                        onClick={forwardToWhatsApp}
                        disabled={isSummarizing}
                        className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,211,102,0.2)] hover:scale-[1.02] transition-transform"
                    >
                        {isSummarizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                        Forward Brief to Asif
                    </button>
                </motion.div>
              )}

              {isLoading && (
                <div className="flex items-center gap-3 text-[#0ea5e9]/40 pl-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-5 bg-[#0a0a0a] border-t border-white/5 shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 bg-white/5 rounded-2xl p-1 border border-white/10 focus-within:border-[#0ea5e9]/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-white/20 hover:text-[#0ea5e9]'}`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Message Khalid..."}
                  className="flex-1 bg-transparent border-none py-3 text-sm text-white placeholder:text-white/20 focus:outline-none px-2"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#0284c7] text-white shadow-lg hover:bg-[#0369a1] transition-colors disabled:opacity-10"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
