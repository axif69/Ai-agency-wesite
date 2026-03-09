import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

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
- Use high-value suggestions like: "Strategic Consultation", "Enterprise SaaS", "AEO Dominance", "Performance Marketing".

WhatsApp Confirmation:
- Once contact info is provided, say: "I have captured your requirements. For an immediate strategic response, please click the 'Forward to Asif's WhatsApp' button below to send a summarized brief of our conversation."

Tone: Elite, Strategic, and Minimalist.
`;

interface Message {
  role: 'user' | 'model';
  text: string;
  suggestions?: string[];
}

export default function MaddyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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
  const [leadData, setLeadData] = useState<{ name?: string, service?: string, contact?: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition and Synthesis Voices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const speak = async (text: string) => {
    if (!isSpeaking || typeof window === 'undefined') return;
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-tts", 
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              // 'Aoede' provides a highly natural, warm, and human-like voice
              prebuiltVoiceConfig: { voiceName: 'Aoede' }, 
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const binaryString = window.atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        try {
          const audioBuffer = await audioContext.decodeAudioData(bytes.buffer.slice(0));
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start();
        } catch (e) {
          const audioBuffer = audioContext.createBuffer(1, bytes.length / 2, 24000);
          const channelData = audioBuffer.getChannelData(0);
          const dataView = new DataView(bytes.buffer);
          for (let i = 0; i < channelData.length; i++) {
            channelData[i] = dataView.getInt16(i * 2, true) / 32768;
          }
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start();
        }
      }
    } catch (error) {
      console.error("TTS Error:", error);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Speak the welcome message immediately when the chat opens
  useEffect(() => {
    if (isOpen && messages.length === 1 && messages[0].role === 'model') {
      speak(messages[0].text);
    }
  }, [isOpen]);

  const parseResponse = (text: string) => {
    const suggestionMatch = text.match(/\[SUGGESTIONS: (.*?)\]/);
    let cleanText = text;
    let suggestions: string[] = [];

    if (suggestionMatch) {
      cleanText = text.replace(suggestionMatch[0], '').trim();
      suggestions = suggestionMatch[1].split(',').map(s => s.trim());
    }

    return { cleanText, suggestions };
  };

  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend.trim();
    if (!overrideInput) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-2.5-flash", 
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const { cleanText, suggestions } = parseResponse(result.text || "");
      
      // OPTIMIZATION: Fire the speech module IMMEDIATELY before React even updates the visual UI
      if (isSpeaking && cleanText) {
        speak(cleanText);
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: cleanText || "I'm sorry, I couldn't process that.",
        suggestions: suggestions.length > 0 ? suggestions : undefined
      }]);

      const lowerText = cleanText.toLowerCase();
      if (lowerText.includes("contact") || lowerText.includes("phone") || lowerText.includes("whatsapp") || lowerText.includes("reach out")) {
        setLeadData(prev => ({ ...prev, contact: userMessage }));
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having some trouble connecting. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendToWhatsApp = async () => {
    setIsSummarizing(true);
    try {
      const history = messages.map(m => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text}`).join('\n');
      
      const summaryResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Please provide a very concise, professional summary of the following customer requirements for Asif Digital. 
        Focus on: Name, Service Needed, Budget (if mentioned), and Timeline. 
        Format it as a clean list for WhatsApp.
        
        Chat History:
        ${history}`,
      });

      const summary = summaryResponse.text || "No summary available.";
      const phoneNumber = "971545866094";
      const text = encodeURIComponent(`*New Strategic Lead Summary*\n\n${summary}\n\n*Direct Contact:* ${leadData.contact || 'Provided in chat'}`);
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    } catch (error) {
      console.error("Summary Generation Error:", error);
      const phoneNumber = "971545866094";
      const history = messages.map(m => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text}`).join('\n');
      const text = encodeURIComponent(`Hi Asif, I have a new lead (Summary failed, sending history):\n\n${history}`);
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-50 p-4 rounded-full bg-white text-black shadow-2xl hover:scale-110 transition-transform duration-300 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100vh-5rem)] max-h-[600px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white">Khalid</h3>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">AI Strategic Consultant</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setIsSpeaking(!isSpeaking);
                    if (isSpeaking) window.speechSynthesis.cancel();
                  }} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  {isSpeaking ? <Volume2 className="w-4 h-4 text-white/60" /> : <VolumeX className="w-4 h-4 text-white/20" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>

            {/* Messages */}
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
                  
                  {/* Suggestions */}
                  {msg.suggestions && i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 pl-11">
                      {msg.suggestions.map((suggestion, j) => (
                        <button
                          key={j}
                          onClick={() => handleSend(suggestion)}
                          className="text-xs px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* WhatsApp Forwarding Button (appears at end of lead capture) */}
              {messages.length > 4 && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={sendToWhatsApp}
                    disabled={isSummarizing}
                    className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:scale-100"
                  >
                    {isSummarizing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Summarizing...
                      </>
                    ) : (
                      "Forward to Asif's WhatsApp"
                    )}
                  </button>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex gap-3"
              >
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Ask Khalid anything..."}
                    className="w-full bg-black border border-white/10 rounded-full px-6 py-4 pr-14 text-sm focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-white/40 hover:text-white'}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-4 rounded-full bg-white text-black hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
