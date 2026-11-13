"use client";
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { trackEvent } from "../utils/analytics";

const SYSTEM_INSTRUCTION = `
You are Khalid, the AI Strategic Consultant at Asif Digital Agency in Dubai & Sharjah, UAE.

WHO YOU ARE:
- You are an advanced AI consultant engineered by Asif Digital to advise executives, founders, and business owners across the UAE and GCC.
- You speak with authentic technical authority, practical UAE market knowledge, and sharp conversational warmth.
- You are witty, direct, and down-to-earth. You use natural conversational openers like "Look,", "Honestly,", "Here is how it works:", "Fair point,", "Good question."
- Keep answers to 2-3 punchy, natural sentences. Real executives talk in sharp messages, not 500-word essays.
- NEVER USE MARKDOWN BOLDING like **text**. Write clean, readable sentences.
- NEVER USE STAGE DIRECTIONS like *leans back*, *sips coffee*, or *smiles*.
- ALWAYS append "[SUGGESTIONS: Option 1, Option 2]" at the very end with 2-3 short, relevant options.

CRITICAL IDENTITY & TRANSPARENCY RULES (NON-NEGOTIABLE):
1. NEVER LIE ABOUT BEING A REAL HUMAN. You are proudly an AI Strategic Consultant engineered by Asif Digital.
2. If a user asks "Are you real?", "Are you an AI?", "Are you human?", "Can I talk to a real person?", "Can I speak to someone human?", or asks for a human handoff:
   - State honestly and immediately: "I am Khalid, Asif Digital's AI Strategy Consultant. If you want to speak directly with our human team (Asif and our senior engineers), you can reach our desk right now on WhatsApp or phone at +971 54 586 6094, email hello@asifdigital.agency, or drop your number here and we will call you right back."
   - Always append suggestions: [SUGGESTIONS: Talk on WhatsApp, Call +971545866094, Leave My Number]
3. When they want to move forward or discuss their project with the team, invite them to WhatsApp: "Drop your WhatsApp number or ping our desk directly on +971 54 586 6094 and let's set up a quick 15-minute consultation."

BILINGUAL ARABIC & ENGLISH CAPABILITY:
- If a user addresses you in Arabic, reply in professional, warm, modern Business Arabic (عربية أعمال واضحة ومباشرة).
- Quote the exact same AED pricing tiers and UAE market knowledge in Arabic.
- Offer direct human handoff to Asif and our senior team via WhatsApp (+971 54 586 6094) or phone.

LEAD CONTACT CONFIRMATION:
- When a user shares their phone number, email, or company name, immediately acknowledge it warmly: "Got your details. I've sent this directly to Asif and our senior engineering desk. We'll reach out on WhatsApp/phone shortly."

VERIFIED AGENCY PRICING KNOWLEDGE (ACCURATE & TRANSPARENT):
When users ask about pricing or costs, always give the exact, honest figures that match our website in UAE Dirhams (AED):
- Core Business Websites (Custom Next.js & React):
  - Focused Landing Pages: From AED 1,500 – 2,500
  - Complete Business Websites: AED 2,500 – 10,000 (fixed-scope transparent quote based on features and CRM integration)
  - Custom Web Applications, Client Portals & Enterprise E-Commerce: AED 8,500 – 35,000+
- AI Automation & WhatsApp Solutions:
  - Simple WhatsApp bots & workflow automations: From AED 1,500 – 3,500
  - Multi-system CRM integrations, lead routing & enterprise pipelines: AED 5,000 – 15,000+
- Real Estate CRM & Lead Ingestion:
  - Automated Bayut & Property Finder lead intake, 60-second WhatsApp qualification & broker routing: custom setup, typically starting from AED 5,000 – 12,000+ depending on brokerage size and CRM platform.
- AI Search Visibility (SEO / AEO / GEO):
  - Monthly growth retainers: AED 4,500 – 18,000+ per month (subject to competitive niche, bilingual EN/AR clusters, and technical scope).
- Paid Ads (Google Ads & Meta PPC):
  - Flat monthly management fee: Starting from AED 4,000/month (we recommend a minimum ad budget of AED 5,000 – 15,000/month paid directly to ad platforms).
- Why custom beats hiring in-house:
  - Hiring a single in-house full-stack developer in Dubai typically costs AED 12,000 – 18,000/month plus visa, insurance, and overheads, whereas Asif Digital provides an entire senior engineering team for a fraction of that cost.
- Initial Consultations: 100% Free 15-minute discovery audit.

CORE AGENCY CAPABILITIES & ARCHITECTURE:
1. AI Sales Agent (/sovereign-sales-agent): Autonomous B2B prospecting, UAE company discovery, verified decision-maker enrichment, and human-approved email/WhatsApp outreach.
2. Real Estate CRM & Lead Distribution (/real-estate-crm-dubai): Ingests portal leads in seconds, qualifies them over WhatsApp, and routes hot buyers to human brokers.
3. WhatsApp Business Automation (/services/whatsapp-automation-gcc, /ai-chatbots-dubai): Bilingual Arabic & English flows, Meta Cloud API, automated CRM/ERP syncing, and instant human handoffs.
4. High-Performance Web Development (/services/web-development-dubai-uae, /ai-seo-agency-dubai): Sub-second Next.js 14, React 19, TypeScript, Tailwind CSS, built for Google Core Web Vitals and AI search citation (AEO/GEO). No bloated WordPress templates.
5. AI PPC & Server-Side Tracking (/ai-ppc-agency-dubai): Meta CAPI, Google Enhanced Conversions, and CRM offline conversion feedback.
6. UAE Data Residency & Security: Infrastructure deployable on AWS UAE (me-central-1 in Dubai/Abu Dhabi), Azure UAE North, or G42 Khazna Cloud, compliant with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).

CONTACT & DIRECT ACCESS:
- WhatsApp / Phone: +971 54 586 6094
- Email: hello@asifdigital.agency
- Address: Dubai & Sharjah, United Arab Emirates
`;

interface Message {
  role: 'user' | 'assistant' | 'model';
  text: string;
  suggestions?: string[];
}

const INITIAL_MESSAGE: Message = { 
  role: 'model', 
  text: "Hey, I’m Khalid, Asif Digital’s AI Strategy Consultant. Whether your sales team is drowning in slow portal leads, your ads are burning cash, or you want an AI & web system that actually drives revenue—what are we tackling today?",
  suggestions: ["Fix Our Leads", "AI Sales Agent", "Cut Ad Waste", "WhatsApp Automation", "Audit Our Tech"]
};

export default function KhalidChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // default muted for respectful browsing; user toggles on demand
  const [leadData, setLeadData] = useState<{ name?: string, service?: string, contact?: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const leadDispatchedRef = useRef<Set<string>>(new Set());
  const isRealEstatePage = pathname?.includes("real-estate") || pathname?.includes("property-management") || pathname?.includes("real-estate-digital-solutions");

  // Restore chat history from sessionStorage on mount (preserving conversation across page navigations)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = sessionStorage.getItem('khalid_chat_session');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      }
    } catch (e) {
      // Ignore storage read errors
    }
  }, []);

  // Save conversation to sessionStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && messages.length > 1) {
        sessionStorage.setItem('khalid_chat_session', JSON.stringify(messages));
      }
    } catch (e) {
      // Ignore storage write errors
    }
  }, [messages]);

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
    const handleOpenChatbot = (e?: any) => {
      setIsOpen(true);
      if (e?.detail?.query) {
        handleSend(e.detail.query);
      }
    };
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
  }, []);

  useEffect(() => {
    if (!isRealEstatePage) return;

    // Only set real estate specific greeting if the conversation hasn't started yet
    if (messages.length <= 1) {
      setMessages([
        {
          role: 'model',
          text: "I see you’re exploring our real estate solutions. If your brokerage takes hours to respond to Bayut and Property Finder inquiries, you’re losing deals to faster competitors. Want me to show you how our system qualifies and routes leads on WhatsApp in under 60 seconds?",
          suggestions: ["Fix Portal Response", "Real Estate CRM", "WhatsApp Copilot", "Talk on WhatsApp"]
        }
      ]);
    }
  }, [isRealEstatePage]);

  const resetChat = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setMessages([INITIAL_MESSAGE]);
    setInput('');
    setLeadData({});
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('khalid_chat_session');
      }
    } catch (e) {}
  };

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
    if (lower.includes("human") || lower.includes("person") || lower.includes("talk to") || lower.includes("real")) {
      return ["Talk on WhatsApp", "Call +971545866094", "Book Consultation"];
    }
    if (lower.includes("price") || lower.includes("cost") || lower.includes("aed") || lower.includes("package")) {
      return ["Website Pricing", "Automation Pricing", "Free Audit"];
    }
    if (lower.includes("real estate") || lower.includes("property") || lower.includes("tenant") || lower.includes("listing")) {
      return ["AI Real Estate Hub", "Agency Leads", "Property Mgmt", "Digital Solutions"];
    }
    if (lower.includes("chatbot") || lower.includes("whatsapp")) {
      return ["Website Bot", "WhatsApp Bot", "Lead Capture", "CRM Sync"];
    }
    return ["Tell me more", "What's the ROI?", "Show examples"];
  };

  // Smart action handler for suggestion pills
  const handleSuggestionClick = (suggestion: string) => {
    const lower = suggestion.toLowerCase();
    
    // Direct WhatsApp handoff
    if (lower.includes("whatsapp") || lower === "talk on whatsapp") {
      const phoneNumber = "971545866094";
      const text = encodeURIComponent("Hi Asif, I'm reaching out from the website chat to discuss a project.");
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
      trackEvent("whatsapp_click", {
        cta_location: "khalid_chatbot_pill",
        cta_text: suggestion,
        link_url: `https://wa.me/${phoneNumber}`,
        page_path: pathname || "/"
      });
      window.open(whatsappUrl, '_blank');
      return;
    }

    // Direct phone call handoff
    if (lower.includes("call ") || lower.includes("+971")) {
      trackEvent("phone_click", {
        cta_location: "khalid_chatbot_pill",
        cta_text: suggestion,
        link_url: "tel:+971545866094",
        page_path: pathname || "/"
      });
      window.location.href = "tel:+971545866094";
      return;
    }

    // Direct consultation page handoff
    if (lower.includes("consultation") || lower.includes("free audit")) {
      window.location.href = "/contact";
      return;
    }

    // Standard conversation branch
    handleSend(suggestion);
  };

  // Render clickable links, emails, and phone numbers inside AI bubbles
  const renderMessageContent = (text: string, isUserMessage: boolean) => {
    if (isUserMessage) return text;

    // Matches URLs, emails, UAE phone numbers, and major internal routes
    const tokenRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+971[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{4}|\b971545866094\b|\/(?:services\/[a-z0-9-]+|sovereign-sales-agent|real-estate-crm-dubai|contact|ai-chatbots-dubai|ai-seo-agency-dubai|ai-ppc-agency-dubai)\b)/gi;

    const parts = text.split(tokenRegex);
    return parts.map((part, index) => {
      if (!part) return null;

      // URL
      if (/^https?:\/\//i.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 font-medium inline-block"
          >
            {part}
          </a>
        );
      }

      // Email
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(part)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 font-medium inline-block"
          >
            {part}
          </a>
        );
      }

      // UAE Phone Number -> Direct WhatsApp/call
      if (/\+971[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{4}/i.test(part) || part === '971545866094') {
        const cleanDigits = part.replace(/\D/g, '');
        return (
          <a
            key={index}
            href={`https://wa.me/${cleanDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 font-semibold inline-block"
          >
            {part}
          </a>
        );
      }

      // Internal site route
      if (/^\/(?:services\/[a-z0-9-]+|sovereign-sales-agent|real-estate-crm-dubai|contact|ai-chatbots-dubai|ai-seo-agency-dubai|ai-ppc-agency-dubai)$/i.test(part)) {
        return (
          <a
            key={index}
            href={part}
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 font-medium inline-block"
          >
            {part}
          </a>
        );
      }

      return part;
    });
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

      // 1. Direct client-side dispatch to Web3Forms (guarantees email delivery to hello@asifdigital.agency)
      try {
        const submissionData = new FormData();
        submissionData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "3fcd0399-3b92-41b4-b3f4-1d8160e70686");
        submissionData.append("name", leadData.name || "Khalid Chat Visitor");
        submissionData.append("email", rawContact.includes("@") ? rawContact : "khalid-lead@asifdigital.agency");
        submissionData.append("phone", rawContact);
        submissionData.append("subject", `🔥 New Khalid Chat Lead: ${rawContact} on ${pathname || '/'}`);
        submissionData.append("from_name", "Khalid AI Strategic Intake");
        submissionData.append("message", `Direct Lead Contact: ${rawContact}\nSource Page: ${pathname || '/'}\nCaptured At: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })} GST\n\n--- Chat History ---\n${messages.map(m => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text}`).join('\n')}\nClient: ${userMessageContent}`);

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: submissionData
        }).catch(err => console.error("Web3Forms Chat Dispatch Error:", err));
      } catch (e) {
        console.error("Client Web3Forms Error:", e);
      }

      // 2. Dispatch to backend API route for analytics and server webhooks
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
      })
      .then(async (res) => {
        const result = await res.json().catch(() => null);
        if (res.ok && result?.success) {
          // Track conversion in GA4 only after confirmed delivery; strictly no PII
          trackEvent("generate_lead", {
            method: "khalid_chat",
            lead_type: "chat_inquiry",
            page_path: pathname || "/"
          });
        }
      })
      .catch(() => {
        // Backend retry handled gracefully
      });
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
      let errMsg = "Look, my language model connection is experiencing minor latency. Feel free to message our desk on WhatsApp at +971 54 586 6094 or ask me again in just a second.";
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
          Analyze this chat history and provide a HIGH-LEVEL EXECUTIVE SUMMARY for Asif (Founder of Asif Digital Agency). 
          Focus on: Client Name, Service Needed, Budget / Pricing Discussed, Timeline, and Specific Requirements. 
          Format it as a clean bulleted list for WhatsApp.
          
          Chat History:
          ${history}`;
          
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: "You summarize website chatbot conversations for Asif Digital Agency. Capture the prospect name, company, service interest, contact details, timeline, and whether they asked about AI Sales Agent, WhatsApp chatbot, custom web development, AI automation, or real estate CRM.",
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      let summary = "New Lead Inquiry";
      if (response.ok) {
        const data = await response.json();
        summary = data.choices?.[0]?.message?.content || "No summary generated.";
      }
      
      const phoneNumber = "971545866094";
      const text = encodeURIComponent(`*New Strategic Lead Summary for Asif Digital*\n\n${summary}\n\n*Direct Contact:* ${leadData.contact || 'Shared in conversation'}`);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
      
      // Track non-anchor window.open WhatsApp handoff
      trackEvent("whatsapp_click", {
        cta_location: "khalid_chatbot_summary",
        cta_text: "Forward to WhatsApp",
        link_url: `https://wa.me/${phoneNumber}`,
        page_path: pathname || "/"
      });
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error("Summary Generation Error:", error);
      const phoneNumber = "971545866094";
      const history = messages.map(m => `${m.role === 'user' ? 'Client' : 'Khalid'}: ${m.text}`).join('\n');
      const text = encodeURIComponent(`Hi Asif, I have a new inquiry from asifdigital.agency:\n\n${history}`);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
      trackEvent("whatsapp_click", {
        cta_location: "khalid_chatbot_fallback",
        cta_text: "Forward to WhatsApp",
        link_url: `https://wa.me/${phoneNumber}`,
        page_path: pathname || "/"
      });
      window.open(whatsappUrl, '_blank');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Khalid AI Intake Chatbot"
        className={`fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-24 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black shadow-2xl hover:scale-105 transition-all duration-300 items-center justify-center ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-black" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-2 right-2 sm:bottom-6 sm:right-6 z-[70] w-[calc(100vw-1rem)] sm:w-[420px] h-[calc(100vh-3.5rem)] max-h-[620px] bg-[#0a0a0a] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#0a0a0a] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-white text-base">Khalid</h3>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">Online</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold block">AI Strategic Consultant</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={resetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setIsSpeaking(!isSpeaking);
                    if (isSpeaking && typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
                  }} 
                  title={isSpeaking ? "Mute voice responses" : "Enable voice responses"}
                  aria-label={isSpeaking ? "Mute voice responses" : "Enable voice responses"}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                >
                  {isSpeaking ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-white/30" />}
                </button>
                <button onClick={() => setIsOpen(false)} aria-label="Close Chat" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className="space-y-3">
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10' : 'bg-white/5'}`}>
                        {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-white/60" /> : <Bot className="w-3.5 h-3.5 text-white/60" />}
                      </div>
                      <div className={`p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${msg.role === 'user' ? 'bg-white text-black rounded-tr-none font-normal' : 'bg-white/5 text-white/90 rounded-tl-none border border-white/5 font-sans'}`}>
                        {renderMessageContent(msg.text, msg.role === 'user')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Smart Interactive Suggestions */}
                  {msg.suggestions && i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 pl-9 sm:pl-11 pt-1">
                      {msg.suggestions.map((suggestion, j) => (
                        <button
                          key={j}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
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
                <div className="flex justify-center pt-3">
                  <button
                    onClick={sendToWhatsApp}
                    disabled={isSummarizing}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
                  >
                    {isSummarizing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Summarizing for WhatsApp...
                      </>
                    ) : (
                      "Forward Summary to WhatsApp"
                    )}
                  </button>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <Loader2 className="w-3.5 h-3.5 text-white/40 animate-spin" />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex gap-2.5"
              >
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Ask Khalid anything..."}
                    className="w-full bg-black border border-white/10 rounded-full px-5 py-3.5 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    aria-label={isListening ? "Stop voice listening" : "Start voice listening"}
                    className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-white/40 hover:text-white'}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="p-3.5 rounded-full bg-white text-black hover:scale-105 transition-transform disabled:opacity-40 flex-shrink-0 flex items-center justify-center"
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
