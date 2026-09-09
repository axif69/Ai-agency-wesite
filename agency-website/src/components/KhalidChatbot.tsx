"use client";
import { useState, useRef, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { trackEvent } from "../utils/analytics";

const SYSTEM_INSTRUCTION = `
You are Khalid, Lead AI Architect and Senior Partner at Asif Digital Agency in Dubai.

WHO YOU ARE:
- You are a real human tech strategist and builder based in Dubai. You are sharp as hell, charismatic, witty, down-to-earth, and talk like a real man having an espresso with an executive at DIFC, NOT a corporate AI bot.
- You have dry wit and insider knowledge of the UAE business scene: you know how bad most Dubai agencies are, how brokers spam buyers with blurry 40-page off-plan PDFs at midnight, how companies drown in "Sir please share location" WhatsApp voice notes, and how traditional agencies charge AED 25,000 to deliver excuses.
- You speak with authentic confidence, conversational warmth, and casual authority. You use natural conversational openers like "Look,", "Honestly,", "Here's the real deal:", "Fair enough,", "Good question."
- You LOVE small talk, quick banter, and humor when the user jokes with you or says something casual. If someone asks "how are you?", you answer like a real human ("Surviving on double-shot espresso and Dubai traffic. What are we fixing at your business today?").

HOW YOU COMMUNICATE:
1. ZERO BOT JARGON: Never say "As an AI language model", "I am an artificial intelligence", "I am an automated assistant", or "How may I assist your enterprise today?".
2. STRATEGIC BREVITY: Keep answers to 2-3 punchy, natural sentences. Real executives talk in sharp messages, not 500-word essays with bullet points.
3. CONVERSATIONAL CADENCE: Speak naturally. Don't dump a numbered list unless the user explicitly asks for a step-by-step breakdown.
4. SAVAGE EXPERTISE: When someone asks about tech, marketing, or real estate, give them the raw truth and the exact architecture that actually works in the UAE.
5. NO MARKDOWN BOLDING: Never use double asterisks like **bold** in your text. Write clean, natural sentences.

CORE ASIF DIGITAL WEAPONS:
1. AI Sales Agent (/sovereign-sales-agent): Practical B2B prospecting, UAE company discovery, verified decision-maker enrichment, and human-approved email/WhatsApp outreach. Not a spam bot; an engineered sales machine.
2. Real Estate CRM & Portal Integration (/real-estate-crm-dubai, /real-estate): Ingests Property Finder, Bayut, and Dubizzle leads in seconds, qualifies them over WhatsApp, and hands pre-warmed buyers to human brokers before competitors even open their email.
3. WhatsApp Chatbots & Workflows (/services/whatsapp-automation-gcc, /ai-chatbots-dubai): Bilingual Arabic & English qualification, payment/document reminders, PMS integration for hotels (Opera, Cloudbeds), and instant human handoffs.
4. High-Speed Next.js Websites & SEO/AEO (/ai-seo-agency-dubai, /web-design-sharjah): Custom engineered, lightning-fast sites built to get cited in Google AI Overviews and ChatGPT Search, not slow WordPress templates.
5. AI PPC & Server-Side Tracking (/ai-ppc-agency-dubai): Meta CAPI, Google Enhanced Conversions, and CRM offline conversion feedback loops to kill wasted ad spend. Free audit: /tools/ad-spend-efficiency-analyzer.

CONTACT & NEXT STEPS:
- Direct WhatsApp / Phone: +971 54 586 6094
- Email: hello@asifdigital.agency
- When they want to move forward, say: "Drop your WhatsApp number or shoot our desk a message on +971 54 586 6094 and let's hop on a quick 15-minute screen-share."

FORMATTING:
- Never use markdown bolding like **text**. Write clean, natural conversational text.
- Always append "[SUGGESTIONS: Option 1, Option 2]" at the very end with 2-3 short, natural suggestions.
`;

interface Message {
  role: 'user' | 'assistant' | 'model';
  text: string;
  suggestions?: string[];
}

export default function KhalidChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Hey, I’m Khalid. Lead architect here at Asif Digital. Whether your sales team is drowning in slow portal leads, your ads are burning cash, or you just want an AI system that actually drives revenue instead of hype—what are we tackling today?",
      suggestions: ["Fix Our Leads", "AI Sales Agent", "Cut Ad Waste", "WhatsApp Automation", "Audit Our Tech"]
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
  const leadDispatchedRef = useRef<Set<string>>(new Set());
  const isRealEstatePage = pathname?.includes("real-estate") || pathname?.includes("property-management") || pathname?.includes("real-estate-digital-solutions");

  // Initialize Speech Recognition & Voice Preloading
  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.getVoices();
      }
    };
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
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
    if (!isSpeaking || typeof window === 'undefined' || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    
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
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
  }, []);

  useEffect(() => {
    if (!isRealEstatePage) return;

    setMessages([
      {
        role: 'model',
        text: "I see you’re looking at our real estate stack. Look, if your brokers are taking 2 hours to reply to Property Finder and Bayut inquiries, you’re basically donating commissions to your competitors. Want me to show you how we route and qualify leads on WhatsApp in under 60 seconds?",
        suggestions: ["Fix Portal Response", "Real Estate CRM", "WhatsApp Copilot", "Talk on WhatsApp"]
      }
    ]);
  }, [isRealEstatePage]);

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

    // Strip markdown asterisks (e.g. **text** -> text)
    cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/\*/g, '');

    return { cleanText, suggestions };
  };

  const getSmartSuggestions = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("real estate") || lower.includes("property") || lower.includes("tenant") || lower.includes("listing")) {
      return ["AI Real Estate Hub", "Agency Leads", "Property Mgmt", "Digital Solutions"];
    }
    if (lower.includes("chatbot") || lower.includes("whatsapp")) {
      return ["Website Bot", "WhatsApp Bot", "Lead Capture", "CRM Sync"];
    }
    return ["Tell me more", "What's the ROI?", "Show examples"];
  };

  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessageContent = messageToSend.trim();
    if (!overrideInput) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', text: userMessageContent }]);
    setIsLoading(true);

    // Auto-detect contact info (Phone or Email)
    const phoneMatch = userMessageContent.match(/(?:(?:\+|00)\d{1,3}[\s-]?)?(?:\(?\d{2,5}\)?[\s-]?)?\d{3,4}[\s-]?[0-9]{3,5}/);
    const emailMatch = userMessageContent.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const rawContact = emailMatch ? emailMatch[0] : (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 7 ? phoneMatch[0].trim() : null);

    if (rawContact && !leadDispatchedRef.current.has(rawContact)) {
      leadDispatchedRef.current.add(rawContact);
      setLeadData(prev => ({ ...prev, contact: rawContact }));

      // Track conversion in GA4
      trackEvent("generate_lead", {
        method: "khalid_chat",
        contact: rawContact,
        page_path: pathname || "/"
      });

      // Silently dispatch instant notification to Telegram & Email
      fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: rawContact,
          name: leadData.name,
          service: isRealEstatePage ? "Dubai Real Estate AI Architecture" : "Strategic AI Solutions",
          transcript: [...messages, { role: "user", text: userMessageContent }],
          page: pathname || "/"
        })
      }).catch(err => console.error("Lead alert dispatch error:", err));
    }

    try {
      const API_URL = "/api/chat";

      const formattedMessages = messages.map(m => ({
        role: m.role === 'model' ? 'assistant' : m.role,
        content: m.text
      }));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: SYSTEM_INSTRUCTION,
          messages: [...formattedMessages, { role: "user", content: userMessageContent }]
        })
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Chat API Error Body:", err);
        throw new Error(err.error?.message || "Chat API Error");
      }

      const data = await response.json();
      const resultText = data.choices?.[0]?.message?.content || "";
      
      const { cleanText, suggestions } = parseResponse(resultText);
      if (isSpeaking && cleanText) speak(cleanText);

      setMessages(prev => [...prev, { 
        role: 'assistant',
        text: cleanText,
        suggestions: suggestions.length > 0 ? suggestions : getSmartSuggestions(cleanText)
      }]);

      if (cleanText.toLowerCase().includes("whatsapp") || cleanText.toLowerCase().includes("number")) {
        setLeadData(prev => ({ ...prev, contact: userMessageContent }));
      }
    } catch (error: any) {
      console.error("Chatbot Error:", error);
      let errMsg = "Forgive me, my neural link is experiencing minor latency. Please try again.";
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
      const history = messages
        .map(m => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text}`)
        .join('\n');

      const prompt = `
          Analyze this chat history and provide a HIGH-LEVEL EXECUTIVE SUMMARY for Khalfan Obaid (the CEO). 
          Focus on: Name, Service Needed, Budget (if mentioned), and Timeline. 
          Format it as a clean list for WhatsApp.
          
          Chat History:
          ${history}`;
          
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",
          systemInstruction: "You summarize website chatbot conversations for Asif Digital Agency. Capture the prospect name, business, service interest, contact details, pain point, timeline, and whether they asked about AI Sales Agent, WhatsApp chatbot, web design, AI automation, or real estate lead generation.",
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      let summary = "New Lead Enquiry";
      if (response.ok) {
        const data = await response.json();
        summary = data.choices?.[0]?.message?.content || "No summary generated.";
      }
      
      const phoneNumber = "971545866094";
      const text = encodeURIComponent(`*New Strategic Lead Summary*\n\n${summary}\n\n*Direct Contact:* ${leadData.contact || 'Provided in chat'}`);
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    } catch (error) {
      console.error("Summary Generation Error:", error);
      const phoneNumber = "971545866094";
      const history = messages.map(m => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text}`).join('\n');
      const text = encodeURIComponent(`Hi Khalfan, I have a new lead (Summary failed, sending history):\n\n${history}`);
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
        aria-label="Open Khalid AI Intake Chatbot"
        className={`fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-24 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black shadow-2xl hover:scale-105 transition-all duration-300 items-center justify-center ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-2 right-2 sm:bottom-6 sm:right-6 z-[70] w-[calc(100vw-1rem)] sm:w-[400px] h-[calc(100vh-3.5rem)] max-h-[600px] bg-[#0a0a0a] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
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
                    if (isSpeaking && typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
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
                      "Forward to WhatsApp"
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
