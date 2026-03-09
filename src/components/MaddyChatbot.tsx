import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Bot, User, Loader2, 
  Mic, MicOff, Volume2, VolumeX, Briefcase, 
  ChevronRight, CheckCircle2, Target, Code, Brain
} from 'lucide-react';

/**
 * ELITE API CONFIGURATION
 * Linking to Vercel/Vite Environment Variables.
 * We use a safe access pattern to prevent compilation errors in non-ESNext targets.
 */
const getSafeEnv = (key: string): string => {
  try {
    // Access via bracket notation to bypass static analysis warnings in some environments
    const env = (import.meta as any).env;
    return env[key] || "";
  } catch {
    return "";
  }
};

const GEMINI_KEY = getSafeEnv('VITE_GEMINI_API_KEY');
const GROQ_KEY = getSafeEnv('VITE_GROQ_API_KEY');

const TEXT_MODEL = "gemini-2.5-flash-preview-09-2025";
const TTS_MODEL = "gemini-2.5-flash-preview-tts";
const GROQ_MODEL = "llama-3.1-70b-versatile";

const SYSTEM_INSTRUCTION = `
You are Khalid, the Elite AI Strategic Consultant for Asif Digital (UAE).
Asif Digital is the UAE's premier AI agency led by Asif Khan.

STRICT PROTOCOL:
1. NO MARKDOWN: NEVER use asterisks (**), hashtags (#), or bolding. Use clean, professional text only.
2. CONCISION: Maximum two sentences per response. 
3. TONE: Elite, sophisticated, and direct. You are a human consultant, not a robot.
4. ACCENT: Your voice is warm and professional.

MISSION:
- Secure: Name, Strategic Objective, and WhatsApp/Phone.
- Once contact info is shared, provide the WhatsApp summary button.

SUGGESTIONS:
- Always append exactly 2 strategic options like this: [SUGGESTIONS: Strategic Audit, Enterprise SaaS]
`;

interface Message {
  role: 'user' | 'model';
  text: string;
  suggestions?: string[];
}

// Utility for high-fidelity audio playback from PCM data
const pcmToWav = (pcmBase64: string, sampleRate = 24000) => {
  const binaryString = window.atob(pcmBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
  
  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, 36 + len, true);    // file size
  view.setUint32(8, 0x57415645, false); // "WAVE"
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint16(16, 16, true);         // format size
  view.setUint16(20, 1, true);          // PCM type
  view.setUint16(22, 1, true);          // mono
  view.setUint32(24, sampleRate, true); 
  view.setUint32(28, sampleRate * 2, true); 
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, len, true);
  
  const combined = new Uint8Array(wavHeader.byteLength + bytes.byteLength);
  combined.set(new Uint8Array(wavHeader), 0);
  combined.set(bytes, wavHeader.byteLength);
  
  return URL.createObjectURL(new Blob([combined], { type: 'audio/wav' }));
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Welcome to Asif Digital. I am Khalid. To initiate our strategic assessment, may I have your name?",
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
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const speak = async (text: string) => {
    if (!isSpeaking || !GEMINI_KEY) return;
    
    // Clean text for speech: Remove the SUGGESTIONS part from audio playback
    const cleanSpeechText = text.split('[SUGGESTIONS')[0].trim();

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${GEMINI_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Say naturally, in a professional and warm strategic consultant accent: ${cleanSpeechText}` }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } } }
          }
        })
      });
      const data = await response.json();
      const pcmData = data.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data;
      if (pcmData && audioRef.current) {
        audioRef.current.src = pcmToWav(pcmData);
        audioRef.current.play().catch(() => {});
      }
    } catch (e) { console.error("TTS Error:", e); }
  };

  const processResponse = (rawText: string) => {
    const suggestionMatch = rawText.match(/\[SUGGESTIONS: (.*?)\]/);
    let cleanText = suggestionMatch ? rawText.replace(suggestionMatch[0], '').trim() : rawText;
    
    // FINAL PROTOCOL: Strip all asterisks completely
    cleanText = cleanText.replace(/\*/g, '').trim();
    
    const suggestions = suggestionMatch ? suggestionMatch[1].split(',').map(s => s.trim()) : [];
    
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
    setLeadStage(prev => Math.min(prev + 1, 4));

    try {
      // --- ATTEMPT 1: GEMINI ---
      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${GEMINI_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages.concat({ role: 'user', text: userMsg }).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: { temperature: 0.5 }
        })
      });

      const geminiData = await geminiResponse.json();

      // Check for Gemini Rate Limit (429) or Auth Errors
      if (geminiData.error) {
        console.warn("Gemini Error:", geminiData.error.message, "Triggering Groq Failover...");
        throw new Error("FAILOVER_TRIGGERED");
      }

      const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
      processResponse(rawText);

    } catch (e: any) {
      // --- ATTEMPT 2: GROQ FAILOVER ---
      if (GROQ_KEY) {
        try {
          const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${GROQ_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: GROQ_MODEL,
              messages: [
                { role: "system", content: SYSTEM_INSTRUCTION },
                ...messages.map(m => ({ 
                  role: m.role === 'user' ? 'user' : 'assistant', 
                  content: m.text 
                })),
                { role: "user", content: userMsg }
              ],
              temperature: 0.5
            })
          });

          const groqData = await groqResponse.json();
          if (groqData.error) throw new Error("GROQ_ERROR");
          
          const rawText = groqData.choices[0].message.content;
          processResponse(rawText);
          
        } catch (groqErr) {
          console.error("Groq Error:", groqErr);
          setMessages(prev => [...prev, { role: 'model', text: "Strategic systems are currently under high load. Please message Asif Khan on WhatsApp for an immediate response." }]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "Strategic assessment paused. Please verify your VITE_GEMINI_API_KEY & VITE_GROQ_API_KEY in Vercel settings." }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const forwardToWhatsApp = async () => {
    setIsSummarizing(true);
    try {
      const prompt = `Summarize requirements for Asif Khan: ${messages.map(m => m.text).join(' | ')}`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${GEMINI_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      const summary = (data.candidates?.[0]?.content?.parts?.[0]?.text || "New Lead Request").replace(/\*/g, '');
      window.open(`https://wa.me/971545866094?text=${encodeURIComponent("KHALID STRATEGIC SUMMARY:\n\n" + summary)}`, '_blank');
    } catch (e) {
      window.open("https://wa.me/971545866094?text=Requesting strategic session with Asif Digital.", '_blank');
    } finally {
      setIsSummarizing(false);
    }
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
      <audio ref={audioRef} className="hidden" />
      
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-2xl group border border-slate-100"
        >
          <div className="w-12 h-12 rounded-full bg-[#0284c7] flex items-center justify-center text-white shadow-lg group-hover:bg-[#0369a1] transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#0284c7] uppercase tracking-tighter">Strategic Consult</div>
            <div className="text-sm font-bold text-slate-800">Speak with Khalid</div>
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
            {/* Header */}
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

            {/* Chat Body */}
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
                        <button
                          key={j}
                          onClick={() => handleSend(s)}
                          className="flex items-center gap-2 text-[11px] font-bold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:border-[#0ea5e9] hover:text-white hover:bg-[#0ea5e9]/10 transition-all"
                        >
                          {s} <ChevronRight className="w-3 h-3 text-[#0ea5e9]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {leadStage >= 3 && !isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                    <button
                        onClick={forwardToWhatsApp}
                        disabled={isSummarizing}
                        className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,211,102,0.2)] hover:scale-[1.02] transition-transform"
                    >
                        {isSummarizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                        Secure Session with Asif Khan
                    </button>
                    <p className="text-[10px] text-center text-white/20 mt-4 font-medium uppercase tracking-[0.2em]">Sharjah HQ Direct Connection</p>
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

            {/* Input Area */}
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
