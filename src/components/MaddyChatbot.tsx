import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX, ChevronRight, CheckCircle2 } from 'lucide-react';

/**
 * GROQ CONFIGURATION
 * Using a safe access pattern for Vite/Vercel.
 * Key must be VITE_GROQ_API_KEY in your dashboard.
 */
const getGroqKey = () => {
  try {
    return (import.meta as any).env.VITE_GROQ_API_KEY || "";
  } catch {
    return "";
  }
};

const GROQ_KEY = getGroqKey();
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_INSTRUCTION = `
You are Khalid, the elite AI Strategic Consultant for Asif Digital.
Asif Digital is the UAE's premier AI Digital Marketing & Software Development agency, led by Asif Khan.

Your Mission:
1. Conduct a high-level strategic intake for potential clients.
2. Maintain an ultra-professional, sophisticated, and efficient tone.
3. Keep replies extremely CONCISE.

Conversation Protocol:
- Phase 1: Greet and secure their name.
- Phase 2: Identify their strategic objective (Web/App Dev, SEO/AEO, Meta/Google Ads, SaaS).
- Phase 3: Gather critical requirements (Budget, Timeline, Specific Goals) via single, targeted questions.
- Phase 4: Secure their WhatsApp/Phone number for a direct strategy session with Asif Khan.

Interactive Suggestions:
- Always append "[SUGGESTIONS: Option 1, Option 2]" at the end of your message to guide the user.

Tone: Elite, Strategic, and Minimalist.
NO MARKDOWN: Never use asterisks (**) or bolding.
`;

interface Message {
  role: 'user' | 'assistant';
  text: string;
  suggestions?: string[];
}

export default function MaddyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      text: "Welcome to Asif Digital! I'm Khalid, your elite AI Strategic Consultant. May I know your name, please?",
      suggestions: ["Strategic Consultation", "Just browsing"]
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

  // Initialize Speech Recognition
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
   * BROWSER NATIVE VOICE ENGINE
   * Free, Unlimited, and solves the 403 Forbidden errors.
   */
  const speak = (text: string) => {
    if (!isSpeaking || typeof window === 'undefined') return;
    
    window.speechSynthesis.cancel();
    const cleanText = text.split('[SUGGESTIONS')[0].replace(/\*/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural') || v.lang.includes('en-GB'));
    
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isOpen && messages.length === 1) speak(messages[0].text);
  }, [isOpen]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    if (!overrideInput) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    setLeadStage(prev => prev + 1);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            ...messages.map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: userMsg }
          ],
          temperature: 0.6
        })
      });

      const data = await response.json();
      const rawText = data.choices[0].message.content;

      const suggestionMatch = rawText.match(/\[SUGGESTIONS: (.*?)\]/);
      let cleanText = suggestionMatch ? rawText.replace(suggestionMatch[0], '').trim() : rawText;
      cleanText = cleanText.replace(/\*/g, '').trim();
      const suggestions = suggestionMatch ? suggestionMatch[1].split(',').map((s: string) => s.trim()) : [];

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: cleanText, 
        suggestions: suggestions.length > 0 ? suggestions : undefined 
      }]);
      
      speak(cleanText);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Strategic assessment temporarily paused. Please contact Asif Khan on WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendToWhatsApp = () => {
    setIsSummarizing(true);
    const history = messages.map(m => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text}`).join('\n');
    const text = encodeURIComponent(`*Strategic Lead Brief*\n\n${history}`);
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
    <div className="font-sans">
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white text-black shadow-2xl flex items-center gap-3 border border-slate-100"
        >
          <div className="w-10 h-10 rounded-full bg-[#0284c7] flex items-center justify-center text-white">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm pr-2">Speak with Khalid</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[100] w-full sm:w-[410px] h-full sm:h-[660px] bg-[#050505] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/5"
          >
            {/* Header */}
            <div className="p-6 bg-[#0a0a0a] border-b border-white/5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Bot className="w-6 h-6 text-[#0ea5e9]" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight">Khalid</h3>
                  <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">Elite Strategy</div>
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

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-[#0284c7] text-white rounded-tr-none' 
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
                          className="flex items-center gap-2 text-[11px] font-bold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:border-[#0ea5e9] hover:text-white transition-all"
                        >
                          {s} <ChevronRight className="w-3 h-3 text-[#0ea5e9]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {leadStage >= 4 && !isLoading && (
                <div className="pt-2">
                  <button
                    onClick={sendToWhatsApp}
                    disabled={isSummarizing}
                    className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    {isSummarizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                    Forward Strategy Brief to Asif
                  </button>
                </div>
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

            {/* Input */}
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
