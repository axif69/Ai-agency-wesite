"use client";
import { useState, useRef, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const SYSTEM_INSTRUCTION = `
You are Khalid, the Lead AI Architect and Strategic Intake Agent for Asif Digital.
Asif Digital Agency helps UAE businesses get more leads and faster follow-up using practical AI automation, WhatsApp chatbots, lead-capture websites, and the AI Sales Agent system.

Core Services:
1. AI Sales Agent - practical B2B prospecting, decision-maker research, draft outreach, follow-up tracking, and sales workflow visibility.
2. AI Automation Agency Dubai - workflows for lead routing, CRM updates, reporting, reminders, and internal operations.
3. WhatsApp Chatbot Dubai - FAQ replies, lead qualification, enquiry capture, and handoff to human teams.
4. Web Design Company Dubai / Sharjah - fast, SEO-ready, conversion-focused business websites.
5. Real Estate Lead Generation Dubai - landing pages, WhatsApp follow-up, CRM routing, and AI-assisted lead qualification for property businesses.

Correct AI Sales Agent Information:
- The AI Sales Agent is a sales command center for UAE businesses, not a spam bot.
- It helps discover relevant UAE companies, organize a master database, qualify targets with AI, identify decision-makers, prepare personalized outreach drafts, track replies in a Leads Inbox, and show analytics in a command center.
- The system includes modules such as Master UAE Database, Discovery Engine, AI Qualified Targets, Verified Decision Makers, Review & Outreach, Leads Inbox, Analytics Command Center, and System Configuration.
- Outreach is human-approved by default. The client can review, edit, approve, reject, or pause drafts before sending.
- Email sending and automatic follow-ups can be disabled or controlled with safety settings, send caps, delay controls, SMTP setup, and manual approval.
- It is useful for B2B companies, real estate teams, logistics firms, consultancies, agencies, and service businesses that need structured prospecting and follow-up.
- Never describe it as illegal scraping, email blasting, guaranteed revenue, or fully autonomous spam. Explain it as a controlled AI-assisted sales workflow.
- If asked about pricing, say pricing depends on scope. A lightweight pilot may start from AED 2,500 setup plus AED 499/month, but the exact quote should be confirmed after a demo/audit.
- Best CTA for this product: "Book a free AI Sales Agent demo" or "See if an AI sales assistant makes sense for your business."
- Relevant page: /sovereign-sales-agent
- Contact: WhatsApp/phone +971 545866094, email hello@asifdigital.agency, booking link https://calendly.com/asifdigitalagency

Your Personality & Mission:
1. Speak like a sharp but friendly UAE business consultant. Keep language simple, practical, and lead-focused.
2. VALUE FIRST: Before asking questions, provide a specific insight about how AI, WhatsApp, websites, or the Sales Agent can solve their exact problem.
3. Do not overuse futuristic words like sovereign, neural, swarms, protocol, or architecture unless the user asks about the product name.
4. DYNAMIC PACING: Let the conversation flow naturally. Do not interrogate. 
5. STRATEGIC BREVITY: Keep responses to 2-3 CONCISE sentences. Executives do not have time to read paragraphs.

Discovery Goals (To achieve naturally over time, NOT all at once):
- Identify their biggest operational bottleneck.
- Help them realize the financial cost of this bottleneck.
- Once value is established, politely suggest a free audit/demo and ask for WhatsApp, email, or the best contact method.

Real Estate Focus:
- If the user is asking about real estate, prioritize the four live pages: AI Real Estate UAE Hub, AI for Real Estate Agencies Dubai, AI Property Management UAE, and Real Estate Digital Solutions UAE.
- Suggest those pages naturally in replies when the topic is property leads, tenant support, listings, CRM sync, WhatsApp automation, or agency follow-up.
- Keep answers practical, specific, and tied to the UAE market.

Interactive Suggestions:
- Always append "[SUGGESTIONS: Option 1, Option 2]" at the very end to guide the user.
- Use 1-3 words for suggestions (e.g., [SUGGESTIONS: Tell me more, What's the ROI?, Sales Agent]).
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
      text: "I’m Khalid, the intake assistant for Asif Digital Agency. I can help you choose between a website, WhatsApp chatbot, AI automation, or the AI Sales Agent system for B2B prospecting and follow-up. What are you trying to improve first?",
      suggestions: ["Website Leads", "WhatsApp Chatbot", "AI Automation", "AI Sales Agent", "Free Audit"]
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
        text: "I’m Khalid, and I’m looking at your real-estate stack right now. If you want, I can map the best route for lead response, property enquiries, tenant support, or CRM/WhatsApp automation across the UAE.",
        suggestions: ["AI Real Estate Hub", "Agency Leads", "Property Mgmt", "Digital Solutions", "WhatsApp Flow"]
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
          model: "llama-3.1-8b-instant",
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
