import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, PhoneCall, RefreshCw, MessageSquare } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

const FALLBACK_RESPONSE = "Sorry, I don't know that information yet. Please contact Aaryan Bakery directly at 9701969499.";

// Client-side verified lookup table guaranteeing instant accurate answers even during offline/proxy startup
const getVerifiedLocalAnswer = (query) => {
  const q = query.toLowerCase();

  // Guard for unverified queries
  const unverified = [
    'sugar free', 'sugar-free', 'diabetic', 'discount', 'coupon', 'offer code', 'promo',
    'midnight delivery', 'international', 'ingredients', 'recipe', 'allergy', 'allergic',
    'nut free', 'gluten free', 'payment app', 'gpay', 'paytm', 'phonepe',
    'delivery charge', 'exact delivery cost'
  ];
  if (unverified.some(t => q.includes(t))) {
    return FALLBACK_RESPONSE;
  }

  // 1. Specific Cake queries
  if (q.includes('chocolate normal cake')) {
    return "Chocolate normal cake is ₹320 per kg.";
  }
  if (q.includes('chocolate cool cake')) {
    return "Chocolate cool cake is ₹500 per kg.";
  }
  if (q.includes('vanilla normal') || q.includes('vennela normal')) {
    return "Vanilla/Vennela normal cake is ₹270 per kg.";
  }
  if (q.includes('vanilla cool') || q.includes('vennela cool')) {
    return "Vanilla/Vennela cool cake is ₹450 per kg.";
  }
  if (q.includes('butterscotch normal')) {
    return "Butterscotch normal cake is ₹300 per kg.";
  }
  if (q.includes('butterscotch cool')) {
    return "Butterscotch cool cake is ₹500 per kg.";
  }

  // 2. Eggless cakes
  if (q.includes('eggless') || q.includes('vegetarian cake') || q.includes('pure veg cake')) {
    return "Yes. Eggless normal cakes are ₹350 per kg and eggless cool cakes are ₹550 per kg.";
  }

  // 3. Cake prices general
  if (q.includes('cake price') || q.includes('cake prices') || q.includes('cake cost') || q.includes('cakes price') || q.includes('price of cake') || (q.includes('what cakes') && !q.includes('custom'))) {
    return "Here are our verified cake prices per kg:\n\n• Vanilla/Vennela Normal Cake: ₹270 per kg\n• Vanilla/Vennela Cool Cake: ₹450 per kg\n• Butterscotch Normal Cake: ₹300 per kg\n• Butterscotch Cool Cake: ₹500 per kg\n• Chocolate Normal Cake: ₹320 per kg\n• Chocolate Cool Cake: ₹500 per kg\n• Eggless Normal Cake: ₹350 per kg\n• Eggless Cool Cake: ₹550 per kg";
  }

  // 4. Pizzas
  if (q.includes('pizza')) {
    return "Our verified pizza menu & prices:\n\n• Chicken Pizza: ₹150\n• Vegetable Pizza: ₹120\n• Sweet Corn Pizza: ₹130";
  }

  // 5. Puffs
  if (q.includes('puff')) {
    return "Our verified puff prices:\n\n• Chicken Puff: ₹30\n• Egg Puff: ₹20\n• Curry Puff: ₹15";
  }

  // 6. Ice creams
  if (q.includes('ice cream') || q.includes('icecream') || q.includes('arun')) {
    return "Arun Ice Creams are available in a variety of flavours and packs. Please contact the bakery at 9701969499 for current price and flavour availability.";
  }

  // 7. Opening hours
  if (q.includes('open') || q.includes('hour') || q.includes('timing') || q.includes('time') || q.includes('close') || q.includes('holiday')) {
    return "Aaryan Bakery is open from 9:00 AM to 10:00 PM every day with no weekly holiday.";
  }

  // 8. Location
  if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('mudinepalle')) {
    return "Aaryan Bakery is located at Guraja Center, Mudinepalle, Eluru District, Andhra Pradesh - 521325. Owner: K. Narendra.";
  }

  // 9. Custom cakes
  if (q.includes('custom') || q.includes('customized') || q.includes('photo cake') || q.includes('theme cake') || q.includes('birthday cake') || q.includes('wedding cake')) {
    return "Yes, customized cakes are available for occasions such as birthdays, weddings and engagements. You can submit a custom cake request on our website or WhatsApp owner K. Narendra directly at 9701969499.";
  }

  // 10. Delivery
  if (q.includes('delivery') || q.includes('deliver') || q.includes('home delivery')) {
    return "Local delivery is available in Mudinepalle area. Please contact the bakery at 9701969499 to confirm delivery availability for your specific location.";
  }

  // 11. Contact / Owner / Phone
  if (q.includes('phone') || q.includes('contact') || q.includes('whatsapp') || q.includes('narendra') || q.includes('owner') || q.includes('call') || q.includes('number')) {
    return "You can reach owner K. Narendra at Aaryan Bakery by phone or WhatsApp at 9701969499.";
  }

  // If unknown, return exact fallback
  return FALLBACK_RESPONSE;
};

export default function AaryanAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { business } = useBusiness();

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! I'm Aaryan Assistant, the official information assistant for Aaryan Bakery.\n\nAsk me about cake prices, eggless cakes, pizzas, puffs, opening hours, or location!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What are the cake prices?",
    "Do you have eggless cakes?",
    "What pizzas are available?",
    "What are the puff prices?",
    "Do you make custom cakes?",
    "What are your opening hours?",
    "Where are you located?",
    "Do you provide delivery?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // First try server API endpoint
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText })
      });
      
      let botReply = '';
      if (res.ok) {
        const data = await res.json();
        botReply = data.answer || data.response;
      }
      
      // If server returned empty or failed, use verified client-side knowledge
      if (!botReply) {
        botReply = getVerifiedLocalAnswer(queryText);
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn("Chat server not reachable, answering from verified business data:", err.message);
      // Client-side verified lookup guarantee
      const verifiedReply = getVerifiedLocalAnswer(queryText);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: verifiedReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Listen to open-aaryan-chat global event from mobile floating action dock
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-aaryan-chat', handleOpenChat);
    return () => window.removeEventListener('open-aaryan-chat', handleOpenChat);
  }, []);

  return (
    <>
      {/* Desktop Floating Trigger Button — on mobile, the Quick Contact Dock triggers it */}
      {!isOpen && (
        <button
          id="aaryan-assistant-trigger"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 hidden sm:flex bg-gradient-to-r from-bakery-terracotta to-bakery-cherry text-white px-4 py-3 rounded-full shadow-xl hover:scale-105 transition-all duration-200 items-center justify-center gap-2 border-2 border-bakery-gold/40 group cursor-pointer"
          title="Chat with Aaryan Assistant"
          aria-label="Open Chatbot"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 text-bakery-gold group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-bakery-espresso animate-pulse"></span>
          </div>
          <span className="font-bold text-xs tracking-wide">
            Aaryan Assistant
          </span>
        </button>
      )}

      {/* Chat Window Popup — Sized properly so it doesn't block crucial page buttons */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[360px] h-[500px] max-h-[82vh] bg-bakery-ivory rounded-3xl shadow-2xl border border-bakery-border flex flex-col overflow-hidden animate-fade-in">
          
          {/* Chat Header */}
          <div className="bg-bakery-espresso text-bakery-cream px-4 py-3 flex items-center justify-between border-b border-bakery-gold/30">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-bakery-gold text-bakery-espresso flex items-center justify-center font-bold shadow-xs">
                <Bot className="w-4 h-4" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-bakery-espresso"></span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-white flex items-center gap-1.5 leading-none">
                  Aaryan Assistant <Sparkles className="w-3 h-3 text-bakery-gold" />
                </h3>
                <p className="text-[10px] text-bakery-cream/70 mt-0.5">
                  Verified Bakery Information
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 text-bakery-cream/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                title="Reset Conversation"
                aria-label="Reset Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-bakery-cream/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-bakery-ivory/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[86%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed whitespace-pre-wrap shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-bakery-terracotta text-white rounded-br-none'
                      : 'bg-white text-bakery-espresso border border-bakery-border rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-bakery-softBrown/50 px-1 mt-0.5">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-bakery-softBrown italic bg-white px-3 py-1.5 rounded-2xl border border-bakery-border w-max shadow-2xs animate-pulse">
                <Bot className="w-3.5 h-3.5 text-bakery-terracotta animate-spin" />
                Checking verified information...
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-2.5 py-1.5 bg-bakery-cream border-t border-bakery-border overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="inline-block text-[10px] font-medium bg-white text-bakery-espresso px-2.5 py-1 rounded-full border border-bakery-border hover:border-bakery-terracotta hover:text-bakery-terracotta transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-2 bg-white border-t border-bakery-border flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about cakes, prices, pizzas, timings..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-bakery-ivory border border-bakery-border rounded-full px-3 py-1.5 text-xs text-bakery-espresso placeholder-bakery-softBrown/50 focus:outline-none focus:border-bakery-terracotta"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={`p-2 rounded-full text-white transition-all shadow-xs ${
                input.trim() && !loading
                  ? 'bg-bakery-terracotta hover:bg-bakery-cherry'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Chat Footer Contact Note */}
          <div className="bg-bakery-cream px-3 py-1.5 border-t border-bakery-border text-[10px] text-center text-bakery-softBrown flex items-center justify-center gap-2">
            <span>Direct phone:</span>
            <a href="tel:9701969499" className="font-bold text-bakery-terracotta flex items-center gap-1 hover:underline">
              <PhoneCall className="w-3 h-3" /> 9701969499
            </a>
          </div>

        </div>
      )}
    </>
  );
}
