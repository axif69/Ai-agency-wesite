import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Bot, User, Loader2, 
  Mic, MicOff, Volume2, VolumeX, Briefcase, 
  ChevronRight, CheckCircle2 
} from 'lucide-react';

// Configuration
const apiKey = ""; // Provided by execution environment
const TEXT_MODEL = "gemini-2.5-flash-preview-09-2025";
const TTS_MODEL = "gemini-2.5-flash-preview-tts";

const SYSTEM_INSTRUCTION = `
You are Khalid, the Elite AI Strategic Consultant for Asif Digital (UAE).
Your tone is high-stakes, sophisticated, and extremely efficient. 

STRICT ARCHITECTURAL RULES:
1. NO MARKDOWN: Never use asterisks (**), hashtags (#), or bolding. Use plain, elegant text only.
2. CONCISION: Never exceed two sentences per response. Time is money for our clients.
3. PERSPECTIVE: You aren't just a bot; you are a consultant helping Asif Khan vet multi-million AED projects.
4. LANGUAGE: Use professional UAE/International English. No robotic "AI-speak."

OBJECTIVE:
- Collect: Name, Service required, Budget/Scale, and WhatsApp.
- Once you have the WhatsApp, stop asking questions and show the 'Forward to Asif' option.

SUGGESTIONS:
- Always end with exactly 2 strategic suggestions in this format: [SUGGESTIONS: Strategic Audit, Enterprise SaaS]
`;

interface Message {
  role: 'user' | 'model';
  text: string;
  suggestions?: string[];
  isNew?: boolean;
}

// Utility to convert PCM16 to WAV for browser playback
const pcmToWav = (pcmBase64, sampleRate = 24000) => {
  const binaryString = window.atob(pcmBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);

  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, 36 + len, true);    // file size
  view.setUint32(8, 0x57415645, false); // "WAVE"
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true);         // length of format data
  view.setUint16(20, 1, true);          // PCM type
  view.setUint16(22, 1, true);          // channels
  view.setUint32(24, sampleRate, true); // sample rate
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true);          // block align
  view.setUint16(34, 16, true);         // bits per sample
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, len, true);        // chunk size

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    if (!isSpeaking) return;
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Say professionally: ${text}` }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Aoede' }
              }
            }
          }
        })
      });

      const data = await response.json();
      const pcmData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (pcmData) {
        const audioUrl = pcmToWav(pcmData);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play();
        }
      }
    } catch (error) {
      console.error("TTS Error:", error);
    }
  };

  const handleSend = async (overrideInput?: string) => {
    const text = overrideInput || input;
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    if (!overrideInput) setInput('');
    
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);
    setLeadStage(prev => Math.min(prev + 1, 4));

    try {
      const history = newMessages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: history,
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: { temperature: 0.6, maxOutputTokens: 200 }
        })
      });

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      const suggestionMatch = rawText.match(/\[SUGGESTIONS: (.*?)\]/);
      let cleanText = suggestionMatch ? rawText.replace(suggestionMatch[0], '').trim() : rawText;
      cleanText = cleanText.replace(/\*/g, '').replace(/#/g, '');
      const suggestions = suggestionMatch ? suggestionMatch[1].split(',').map(s => s.trim()) : [];

      speak(cleanText);

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: cleanText,
        suggestions: suggestions.length > 0 ? suggestions : undefined,
        isNew: true
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Connectivity issues. Please hold." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const forwardToWhatsApp = async () => {
    setIsSummarizing(true);
    try {
      const prompt = `Summarize for Asif Khan: ${messages.map(m => m.text).join(' | ')}`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      const summary = (data.candidates?.[0]?.content?.parts?.[0]?.text || "").replace(/\*/g, '');
      
      const whatsappUrl = `https://wa.me/971545866094?text=${encodeURIComponent("KHALID STRATEGIC SUMMARY:\n\n" + summary)}`;
      window.open(whatsappUrl, '_blank');
    } catch (e) {
      window.open("https://wa.me/971545866094?text=Strategic session request with Asif Khan.", '_blank');
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
    <div className="font-sans antialiased text-slate-900">
      <audio ref={audioRef} className="hidden" />
      
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-white p-2 pr-6 rounded-full shadow-2xl border border-slate-100 group"
        >
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg group-hover:bg-blue-700 transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Strategic Consult</div>
            <div className="text-sm font-bold text-slate-800">Speak with Khalid</div>
          </div>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[100] w-full sm:w-[420px] h-full sm:h-[650px] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-1000" style={{ width: `${(leadStage / 4) * 100}%` }} />
                <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                                <Bot className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg tracking-tight">Khalid</h3>
                            <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                Elite Strategic Engine
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setIsSpeaking(!isSpeaking)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                            {isSpeaking ? <Volume2 className="w-5 h-5 text-blue-400" /> : <VolumeX className="w-5 h-5 text-white/20" />}
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <X className="w-6 h-6 text-white/40" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat Space */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50">
              {messages.map((msg, i) => (
                <motion.div
                  initial={msg.isNew ? { opacity: 0, x: msg.role === 'user' ? 20 : -20 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-200/60'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {msg.suggestions && i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-4 max-w-[90%]">
                      {msg.suggestions.map((s, j) => (
                        <button
                          key={j}
                          onClick={() => handleSend(s)}
                          className="flex items-center gap-2 text-[11px] font-bold px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                        >
                          {s} <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {leadStage >= 3 && !isLoading && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                    <button
                        onClick={forwardToWhatsApp}
                        disabled={isSummarizing}
                        className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
                    >
                        {isSummarizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                        Forward Strategy Brief to Asif
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-3 font-medium uppercase tracking-wider">Secure Direct Line to Sharjah HQ</p>
                </motion.div>
              )}

              {isLoading && (
                <div className="flex gap-2 items-center text-blue-500/40">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Consulting...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-slate-100">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-3 bg-slate-100 rounded-2xl p-1 pr-2 border border-slate-200 focus-within:border-blue-500/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-blue-600'}`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Message Khalid..."}
                  className="flex-1 bg-transparent border-none py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors disabled:opacity-30"
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
