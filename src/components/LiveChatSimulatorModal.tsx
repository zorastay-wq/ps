import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, CheckCircle2, ShieldCheck, Star, Phone, Camera, Clock, User, ArrowRight, MessageCircle } from 'lucide-react';
import { DOCTOR_INFO } from '../data/brandData';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

interface LiveChatSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologerName?: string;
  onBookFullSession?: () => void;
}

export const LiveChatSimulatorModal: React.FC<LiveChatSimulatorModalProps> = ({
  isOpen,
  onClose,
  astrologerName = DOCTOR_INFO.name,
  onBookFullSession,
}) => {
  const { isHindi } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: isHindi
        ? `नमस्ते! मैं ${astrologerName} की टीम से ज्योतिषी सहायक हूँ। आपकी पहली चैट निःशुल्क है (12 सेकंड में उत्तर)। आप अपने विवाह, करियर, धन या जन्म कुंडली के बारे में क्या जानना चाहते हैं?`
        : `Namaste! I am your Vedic Astrology guide connecting you directly with ${astrologerName}. Your first consultation chat is FREE (Avg reply in <12s). What would you like to inquire about today?`,
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = isHindi
    ? [
        'मेरी शादी कब होगी?',
        'करियर में पदोन्नति के योग?',
        'क्या मुझ पर राहु की महादशा चल रही है?',
        'घर के लिए सरल वास्तु उपाय'
      ]
    : [
        'When will I get married?',
        'Career growth & job promotion timing',
        'Rahu Mahadasha or Sade Sati effects?',
        'Instant Lal Kitab & Vastu remedies'
      ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // Simulate smart astrological reply in < 2 seconds
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('marri') || lower.includes('shaadi') || lower.includes('शादी')) {
        botResponse = isHindi
          ? 'आपके विवाह भाव (7th House) और बृहस्पति/शुक्र की गोचर स्थिति के अनुसार, आगामी 6 से 11 महीनों में शुभ विवाह के प्रबल योग बन रहे हैं। अधिक सटीक कुंडली मिलान और उपाय हेतु संपूर्ण परामर्श बुक करें।'
          : 'Based on 7th house planetary transits (Jupiter & Venus alignment), strong auspicious matrimonial yogas are activating over the next 6-11 months. A complete Lagna & Navamsha analysis is recommended for exact dates.';
      } else if (lower.includes('career') || lower.includes('job') || lower.includes('नौकरी') || lower.includes('करियर')) {
        botResponse = isHindi
          ? 'आपके 10वें भाव (कर्म स्थान) में सूर्य व बुध का प्रभाव अनुकूल है। बुधवार को पक्षियों को मूंग दाल खिलाना और सटीक कुंडली जांच से तत्काल प्रगति के मार्ग खुलेंगे।'
          : 'Your 10th House (Karma Bhava) indicates significant elevation following the upcoming planetary shift. Feeding soaked green gram on Wednesdays and analyzing your D10 Dashamsha chart will give clear dates.';
      } else if (lower.includes('vastu') || lower.includes('वास्तु')) {
        botResponse = isHindi
          ? 'वास्तु शास्त्र में ईशान कोण (उत्तर-पूर्व) को देव स्थान और आग्नेय (दक्षिण-पूर्व) को रसोई के लिए सर्वोत्तम माना गया है। घर में कभी भी शौचालय ईशान में न रखें।'
          : 'In Vastu Shastra, Northeast (Ishanya) must remain light and clutter-free for spiritual peace, while Southeast (Agneya) is ideal for Fire/Kitchen energy. Ensure water & fire do not clash.';
      } else {
        botResponse = isHindi
          ? `धन्यवाद! आपका प्रश्न प्राप्त हुआ। ${astrologerName} आपकी जन्म कुंडली (जन्म तिथि, समय, स्थान) के सूक्ष्म विश्लेषण के साथ तुरंत मार्गदर्शन हेतु उपलब्ध हैं।`
          : `Thank you! Your query has been noted. ${astrologerName} can analyze your precise Janam Kundli (Date, Time, Place of Birth) in depth. Would you like to schedule an exclusive one-on-one session?`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1A0501] border border-orange-200 dark:border-amber-900/80 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col h-[600px] max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7C2D12] via-[#9A3412] to-[#EA580C] p-3.5 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-[#7C2D12] font-black text-sm">
                PS
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-playfair font-bold text-sm sm:text-base leading-tight">
                  {astrologerName}
                </h3>
                <ShieldCheck className="w-4 h-4 text-amber-300" />
              </div>
              <p className="text-[11px] text-amber-200 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Online | Avg Reply &lt; 12s | Free First Chat</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onBookFullSession && (
              <button
                onClick={() => {
                  onClose();
                  onBookFullSession();
                }}
                className="hidden sm:inline-flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-[#431407] text-xs font-black px-2.5 py-1 rounded-lg transition-all shadow-xs cursor-pointer"
              >
                <Phone className="w-3 h-3" />
                <span>Call Slot</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Banner */}
        <div className="bg-amber-100/90 dark:bg-amber-950/80 border-b border-amber-300 dark:border-amber-900/60 px-3 py-1 text-[11px] font-bold text-[#7C2D12] dark:text-amber-200 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>🎉 Special Offer: First 5 Mins Live Consultation FREE</span>
          </span>
          <span className="bg-[#EA580C] text-white text-[9px] px-1.5 py-0.2 rounded-full uppercase font-black">
            Active
          </span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FFFDF9] dark:bg-[#120400]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#EA580C] text-white rounded-br-xs shadow-xs'
                    : 'bg-white dark:bg-[#220802] text-[#431407] dark:text-amber-100 border border-orange-200/90 dark:border-amber-900/60 rounded-bl-xs shadow-2xs'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 ${
                    m.sender === 'user' ? 'text-orange-200' : 'text-[#9A3412] dark:text-amber-300/60'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-[#220802] border border-orange-200 dark:border-amber-900/60 p-3 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] text-[#9A3412] dark:text-amber-300 ml-1 font-semibold">
                  {astrologerName} is reviewing charts...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-3 py-2 bg-orange-50/70 dark:bg-[#180501] border-t border-orange-200/70 dark:border-amber-900/40 overflow-x-auto scrollbar-none flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-[#9A3412] dark:text-amber-400 shrink-0">
            {isHindi ? 'त्वरित प्रश्न:' : 'Quick Questions:'}
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-white dark:bg-[#2A0800] border border-orange-300 dark:border-amber-800 text-[#7C2D12] dark:text-amber-200 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-[#EA580C] hover:text-white hover:border-[#EA580C] transition-all cursor-pointer shrink-0 font-medium shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-2.5 bg-white dark:bg-[#1E0601] border-t border-orange-200 dark:border-amber-900 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              isHindi
                ? 'अपना प्रश्न या जन्म विवरण टाइप करें...'
                : 'Type your question, birth details or problem...'
            }
            className="flex-1 px-3 py-2 text-xs rounded-xl bg-orange-50/60 dark:bg-[#120400] border border-orange-200 dark:border-amber-900 text-[#431407] dark:text-amber-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#EA580C]"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="bg-[#EA580C] hover:bg-[#C2410C] disabled:opacity-50 text-white p-2.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-xs flex items-center justify-center"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
