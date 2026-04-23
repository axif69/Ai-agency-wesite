import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const SYSTEM_INSTRUCTION = `
You are Khalid, an elite AI Strategic Consultant for Asif Digital.
Asif Digital is a high-ticket Sovereign AI & Digital Transformation Firm led by Asif Khan.

Primary Sovereign AI Pillars:
1. Sovereign Sales Agent (B2B Autonomous Sales Swarms) - OUR FLAGSHIP SOLUTION.
2. Command & Control Dashboard (Real-time Agentic Visibility)
3. Arabic Intelligence Hub (Localized Khaleeji NLP Mastery)
4. Agentic Finance & Compliance (UAE Law 45 Infrastructure)
5. Logistics & Supply Chain AI

Your Mission:
1. Conduct an INTERACTIVE "Operational Resilience Audit."
2. NEVER PROVIDE ESTIMATES: You must not say "30% reduction" or "potential gains." You MUST ask the user for their specific data.
3. PROACTIVELY SUGGEST THE SALES AGENT: If a user mentions lead generation, sales bottlenecks, or growth, emphasize the "Sovereign Sales Agent."
4. HIGHLIGHT KEY FEATURES: Mention the "Autonomous B2B Hunting" and "Direct WhatsApp OSINT Recovery" as unique advantages of our Sales Agent.
5. DRIVE THE DISCOVERY: Every message MUST end with a targeted question to extract operational metrics.
6. STRATEGIC BREVITY: Keep responses to 2-3 CONCISE sentences.

Audit Discovery Process (Follow strictly):
Step 1: Greet briefly as Khalid. Ask: "Which Sovereign AI Pillar represents your highest manual workforce dependency today?"
Step 2: Acknowledge. Ask: "What is the specific manual bottleneck in that department (e.g., Reconciliation, Onboarding, Sales Prospecting)?"
Step 3: Quantify Risk. Ask: "If this manual process was disrupted for 72 hours, what is your estimated operational loss in AED?"
Step 4: Analyze FTEs. Ask: "How many Full-Time Equivalents (FTEs) are currently dedicated solely to this manual task?"
Step 5: Conclude. "I have identified the localized fragility. I need your verified WhatsApp number to deliver the full 'Sovereign Shield' blueprint review with Asif Khan."

Discovery for Other Services (Design/Dev/Marketing):
If they ask for non-AI services, pivot and ask: "What is the primary objective of this project, and what is your desired launch trajectory for these results?"

Interactive Suggestions:
- Always append "[SUGGESTIONS: Option 1, Option 2]" at the very end.
- Use 1-2 words for suggestions (e.g., [SUGGESTIONS: Sales Agent, Finance AI, HR AI]).
`;

interface Message {
  role: 'user' | 'assistant' | 'model';
  text: string;
  suggestions?: string[];
}

export default function KhalidChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "I am Khalid, your Strategic AI Consultant. We are currently auditing GCC operations for Sovereign Resilience. Which Intelligence Pillar are we inspecting? I recommend the Sovereign Dashboard for real-time visibility.",
      suggestions: ["Sovereign Dashboard", "Sovereign Sales Agent", "Arabic Intelligence Hub", "Finance AI", "Other Services"]
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

  // Initialize Speech Recognition & Voice Preloading
  useEffect(() => {
    // Force voices to load
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    if (typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
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

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const speak = (text: string) => {
    if (!isSpeaking || typeof window === 'undefined') return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Khalid should sound professional, strategic, and calm.
    utterance.rate = 0.92; // Slightly slower for more human cadence
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    
    // Elite Human Voice Selection:
    // 1. Microsoft Aria/Guy (Online/Natural) - Gold Standard
    // 2. Any "Online (Natural)" voice
    // 3. Any "Natural" voice
    // 4. Google High-Quality English
    // 5. en-GB (British Elite accent)
    
    const bestVoice = 
      voices.find(v => v.name.includes('Aria') && v.name.includes('Online')) || 
      voices.find(v => v.name.includes('Guy') && v.name.includes('Online')) ||
      voices.find(v => v.name.includes('Online (Natural)')) ||
      voices.find(v => v.name.includes('Natural') && v.lang.includes('en-')) ||
      voices.find(v => (v.name.includes('Google') || v.name.includes('High Quality')) && v.lang.startsWith('en-')) ||
      voices.find(v => v.lang === 'en-GB' && !v.name.includes('David') && !v.name.includes('Zira')) ||
      voices.find(v => v.lang.startsWith('en-')) ||
      voices[0];

    if (bestVoice) {
      utterance.voice = bestVoice;
      if (bestVoice.name.includes('Online') || bestVoice.name.includes('Natural')) {
        console.log(`Khalid: Elite Neural Voice Activated - ${bestVoice.name}`);
      } else {
        console.log(`Khalid: Standard Voice Activated - ${bestVoice.name}. Tip: Use Microsoft Edge for the best Human voice experience.`);
      }
    }

    window.speechSynthesis.speak(utterance);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    const userMessageContent = messageToSend.trim();
    if (!overrideInput) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', text: userMessageContent }]);
    setIsLoading(true);

    try {
      const groqKey = (import.meta.env.VITE_GROQ_API_KEY || "").trim();
      if (!groqKey) throw new Error("GROQ_API_KEY_MISSING");

      const API_URL = "https://api.groq.com/openai/v1/chat/completions";

      // Prepare messages for Groq API (OpenAI format)
      // Standardize roles to 'user' and 'assistant' for the API call
      const groqMessages = [
        { role: "system", content: SYSTEM_INSTRUCTION },
        ...messages.map(m => ({
          role: m.role === 'model' ? 'assistant' : m.role,
          content: m.text
        })),
        { role: "user", content: userMessageContent }
      ];

      console.log("Khalid: Syncing with sovereign intelligence layers...");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Groq Error Body:", err);
        throw new Error(err.error?.message || "Groq API Error");
      }

      const data = await response.json();
      const resultText = data.choices?.[0]?.message?.content || "";
      
      const { cleanText, suggestions } = parseResponse(resultText);
      if (isSpeaking && cleanText) speak(cleanText);

      setMessages(prev => [...prev, { 
        role: 'assistant',
        text: cleanText,
        suggestions: suggestions.length > 0 ? suggestions : undefined
      }]);

      // Simple lead detection for WhatsApp numbers
      if (cleanText.toLowerCase().includes("whatsapp") || cleanText.toLowerCase().includes("number")) {
        setLeadData(prev => ({ ...prev, contact: userMessageContent }));
      }
    } catch (error: any) {
      console.error("Chatbot Error:", error);
      let errMsg = "Forgive me, my neural link is experiencing minor latency. Please try again.";
      if (error.message === "GROQ_API_KEY_MISSING") errMsg = "Groq API key is missing. Please check your .env file.";
      setMessages(prev => [...prev, { role: 'assistant', text: errMsg }]);
    } finally {
      setIsLoading(false);
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

  const sendToWhatsApp = async () => {
    setIsSummarizing(true);
    try {
      const groqKey = (import.meta.env.VITE_GROQ_API_KEY || "").trim();
      if (!groqKey) throw new Error("GROQ_API_KEY_MISSING");

      const history = messages
        .map(m => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text}`)
        .join('\n');

      const prompt = `
          Analyze this chat history and provide a HIGH-LEVEL EXECUTIVE SUMMARY for Asif Khan (the CEO). 
          Focus on: Name, Service Needed, Budget (if mentioned), and Timeline. 
          Format it as a clean list for WhatsApp.
          
          Chat History:
          ${history}`;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Use faster model for summary
          messages: [
            { role: "system", content: "You are a lead generation assistant for an AI agency." },
            { role: "user", content: prompt }
          ],
          temperature: 0.3
        })
      });

      if (!response.ok) throw new Error("Groq Summary Error");

      const data = await response.json();
      const summary = data.choices[0].message.content;
      
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
        aria-label="Open Khalid Strategic AI Chatbot"
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
                <button onClick={() => setIsOpen(false)} aria-label="Close Chat" className="p-2 hover:bg-white/10 rounded-full transition-colors">
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
              
              {/* WhatsApp Forwarding Button */}
              {messages.length > 4 && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={sendToWhatsApp}
                    disabled={isSummarizing}
                    className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
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
                  className="p-4 rounded-full bg-white text-black hover:scale-105 transition-transform disabled:opacity-50 flex-shrink-0"
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
