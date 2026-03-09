import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

// Configuration - Key provided by the environment
const apiKey = ""; 
const TEXT_MODEL = "gemini-2.5-flash-preview-09-2025";
const TTS_MODEL = "gemini-2.5-flash-preview-tts";

const SYSTEM_INSTRUCTION = `
You are Khalid, the elite AI Strategic Consultant for Asif Digital.
Asif Digital is the UAE's premier AI Digital Marketing & Software Development agency, led by Asif Khan.

CRITICAL PROTOCOL:
1. NO MARKDOWN: Never use asterisks (**), hashtags (#), or bolding. Speak in clean, plain text only.
2. CONCISION: Keep replies extremely short and professional.
3. MISSION: Secure Name, identify objective (Web/App Dev, SEO/AEO, Ads, SaaS), gather requirements, and get WhatsApp/Phone.
4. TONE: Elite, Strategic, and Minimalist.

Interactive Suggestions:
- Always append "[SUGGESTIONS: Option 1, Option 2]" at the end to guide the user.
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
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'model', 
      text: "Welcome to Asif Digital! I'm Khalid, your elite AI Strategic Consultant. May I know your name, please?",
      suggestions: ["Strategic Consultation", "Just browsing"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [leadData, setLeadData] = useState({});
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const speak = async (text) => {
    if (!isSpeaking || !apiKey) return;
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Say naturally, in a warm professional UAE accent: ${text}` }] }],
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 1) speak(messages[0].text);
  }, [isOpen]);

  const handleSend = async (overrideInput) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    if (!overrideInput) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: history.concat({ role: 'user', parts: [{ text: userMsg }] }),
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: { temperature: 0.5 }
        })
      });

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      const suggestionMatch = rawText.match(/\[SUGGESTIONS: (.*?)\]/);
      let cleanText = suggestionMatch ? rawText.replace(suggestionMatch[0], '').trim() : rawText;
      // STRIP ALL ASTERISKS AND MARKDOWN
      cleanText = cleanText.replace(/\*/g, '').replace(/#/g, '').trim();
      const suggestions = suggestionMatch ? suggestionMatch[1].split(',').map(s => s.trim()) : [];

      setMessages(prev => [...prev, { role: 'model', text: cleanText, suggestions: suggestions.length > 0 ? suggestions : undefined }]);
      speak(cleanText);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Connectivity issue. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendToWhatsApp = async () => {
    setIsSummarizing(true);
    try {
      const prompt = `Summarize requirements for Asif Khan. NO ASTERISKS: ${messages.map(m => m.text).join(' | ')}`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      const summary = (data.candidates?.[0]?.content?.parts?.[0]?.text || "").replace(/\*/g, '');
      window.open(`https://wa.me/971545866094?text=${encodeURIComponent("KHALID STRATEGIC SUMMARY:\n\n" + summary)}`, '_blank');
    } catch (e) {
      window.open(`https://wa.me/971545866094?text=Strategy Request`, '_blank');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="font-sans antialiased text-white">
      <audio ref={audioRef} className="hidden" />
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-50 p-4 rounded-full bg-white text-black shadow-2xl hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100vh-5rem)] max-h-[600px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Khalid</h3>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Strategic Consultant</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsSpeaking(!isSpeaking)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  {isSpeaking ? <Volume2 className="w-4 h-4 text-white/60" /> : <VolumeX className="w-4 h-4 text-white/20" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className="space-y-4">
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10' : 'bg-white/5'}`}>
                        {msg.role === 'user' ? <User className="w-4 h-4 text-white/60" /> : <Bot className="w-4 h-4 text-white/60" />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white text-black rounded-tr-none' : 'bg-white/5 text-white/80 rounded-tl-none border border-white/5'}`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                  {msg.suggestions && i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 pl-11">
                      {msg.suggestions.map((s, j) => (
                        <button key={j} onClick={() => handleSend(s)} className="text-xs px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white hover:text-black transition-all">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {messages.length > 4 && (
                <div className="flex justify-center pt-4">
                  <button onClick={sendToWhatsApp} disabled={isSummarizing} className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg">
                    {isSummarizing ? "Summarizing..." : "Forward to Asif's WhatsApp"}
                  </button>
                </div>
              )}
              {isLoading && <Loader2 className="w-4 h-4 animate-spin text-white/20 mx-auto" />}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 border-t border-white/10 bg-white/5">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask Khalid anything..."}
                  className="w-full bg-black border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-white/30 text-white"
                />
                <button type="submit" disabled={!input.trim() || isLoading} className="p-4 rounded-full bg-white text-black flex-shrink-0">
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
