import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  RotateCcw,
  Copy,
  Check,
  Compass,
  BookOpen,
  ShieldCheck,
  Calendar,
  MessageCircle,
  ChevronRight,
  Info,
  Flame,
  Home,
  Star,
  ExternalLink
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { DOCTOR_INFO } from '../data/brandData';
import { useUserProfile } from '../context/UserProfileContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface VedicAIAssistantProps {
  onOpenBooking?: (serviceId?: string) => void;
  isDrawer?: boolean;
  onClose?: () => void;
}

const PRESET_TOPICS = [
  {
    category: 'Vastu Remedies',
    icon: Compass,
    prompts: [
      'How to fix a toilet in North-East (Ishan Kon) without demolition?',
      'Best Vastu direction for cash locker, safe, and Pooja Mandir?',
      'What are non-demolition remedies for a South-West corner defect?',
      'How to balance the 5 elements (Pancha Tattva) in a small apartment?'
    ]
  },
  {
    category: 'Lal Kitab Upays',
    icon: BookOpen,
    prompts: [
      'What is the 43-day Lal Kitab remedy for sudden money drain & loans?',
      'Lal Kitab remedies for delayed marriage and relationship tension?',
      'How to remove chronic evil eye (Buri Nazar) and negative vibrations?',
      'Powerful Sun and Jupiter remedies for job promotion and career stagnation?'
    ]
  },
  {
    category: 'Daily Planetary Tips',
    icon: Star,
    prompts: [
      'Simple everyday charity tips to calm Saturn (Shani) and Rahu?',
      'Which colors and items should I keep near my study/work desk?',
      'Rules and precautions to follow while doing a 43-day Lal Kitab remedy?'
    ]
  }
];

export const VedicAIAssistant: React.FC<VedicAIAssistantProps> = ({
  onOpenBooking,
  isDrawer = false,
  onClose
}) => {
  const { profile, hasCustomProfile } = useUserProfile();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: `**Namaste! I am Dr. Preeti Sehgal's Vedic AI Assistant.** 🙏\n\nI am specially configured to answer your questions on **Vedic Vastu Shastra** (Zero-demolition directional harmonization) and **Lal Kitab Remedies** (Practical 43-day Upays, elemental shifts, and planetary balancing).\n\nFeel free to choose a popular topic below or type your specific question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Vastu Remedies');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build context payload
      const userContext = hasCustomProfile
        ? {
            name: profile.fullName,
            dob: profile.dob,
            tob: profile.tob,
            pob: profile.pob,
            gender: profile.gender
          }
        : undefined;

      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          userContext
        })
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorReply = data?.fallbackReply || data?.error || 'Namaste. We encountered a temporary delay. Please try asking again.';
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: errorReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      console.error('Error contacting Vedic Assistant API:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: 'Namaste. The celestial network is briefly synchronizing. For instant personalized answers, you can also consult Dr. Preeti Sehgal directly on WhatsApp at **+91 96501 58977**.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: `**Namaste! Chat has been cleared.** 🙏\n\nHow may I assist you with your home Vastu alignment or Lal Kitab remedies today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to render formatted Markdown-like text safely
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed font-normal text-[#431407]">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Heading ### or ##
          if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
            const headingText = trimmed.replace(/^#+\s*/, '');
            return (
              <h4
                key={idx}
                className="font-playfair font-bold text-sm sm:text-base text-[#431407] pt-2 pb-1 border-b border-orange-200"
              >
                {headingText}
              </h4>
            );
          }

          // Bullet point * or -
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            const bulletText = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
                <span className="text-[#F97316] font-bold text-sm leading-none mt-0.5">•</span>
                <span className="flex-1 text-[#431407]" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(bulletText) }} />
              </div>
            );
          }

          // Numbered item 1. 2.
          if (/^\d+\.\s/.test(trimmed)) {
            const match = trimmed.match(/^(\d+\.)\s(.*)$/);
            if (match) {
              return (
                <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
                  <span className="text-[#EA580C] font-bold text-xs min-w-[18px]">{match[1]}</span>
                  <span className="flex-1 text-[#431407]" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(match[2]) }} />
                </div>
              );
            }
          }

          // Standard paragraph with bold/italic format
          return (
            <p
              key={idx}
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
              className="text-[#431407]"
            />
          );
        })}
      </div>
    );
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#431407]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-[#9A3412] font-medium">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-orange-100 text-[#9A3412] px-1 py-0.5 rounded text-[11px] font-mono font-semibold">$1</code>');
  };

  return (
    <div
      id="vedic-ai-assistant-container"
      className={`flex flex-col bg-[#FFF9F2] text-[#7C2D12] ${
        isDrawer
          ? 'h-full w-full rounded-2xl'
          : 'rounded-3xl border border-orange-200 shadow-xl overflow-hidden'
      }`}
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#7C2D12] to-[#9A3412] text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" variant="compact" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-playfair font-bold text-base sm:text-lg text-white">
                Vedic AI Assistant
              </h3>
              <span className="inline-flex items-center gap-1 bg-[#F97316] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Gemini 3.7
              </span>
            </div>
            <p className="text-[11px] text-orange-100 font-light flex items-center gap-1">
              <span>Trained on Lal Kitab Farman & Vastu Shastra</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasCustomProfile && (
            <div className="hidden sm:flex items-center gap-1 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full text-[10px] text-orange-100">
              <User className="w-3 h-3 text-[#F97316]" />
              <span className="max-w-[100px] truncate">{profile.fullName.split(' ')[0]}</span>
            </div>
          )}

          <button
            onClick={handleResetChat}
            title="Clear Chat History"
            className="p-1.5 rounded-lg text-orange-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Clear chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {isDrawer && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-orange-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close assistant"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Suggested Quick Prompt Chips Bar */}
      <div className="bg-orange-50/70 border-b border-orange-200 p-3 sm:px-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#431407]">
              Quick Vedic Inquiries:
            </span>
          </div>

          <div className="flex items-center gap-1">
            {PRESET_TOPICS.map((topic) => {
              const isSelected = selectedCategory === topic.category;
              return (
                <button
                  key={topic.category}
                  onClick={() => setSelectedCategory(topic.category)}
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#F97316] text-white shadow-xs'
                      : 'bg-white text-[#431407] hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  {topic.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Category Prompt Chips */}
        <div className="flex flex-wrap gap-1.5">
          {PRESET_TOPICS.find((t) => t.category === selectedCategory)?.prompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-left text-xs font-semibold bg-white hover:bg-[#F97316] hover:text-white text-[#431407] border border-orange-200 px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1 group emoji-bounce-hover"
            >
              <span className="truncate max-w-[260px] sm:max-w-xs">{prompt}</span>
              <ChevronRight className="w-3 h-3 text-[#F97316] group-hover:text-white flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 min-h-[340px] max-h-[460px] bg-[#FFF9F2]/50">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isBot = msg.role === 'model';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-300 flex items-center justify-center text-[#F97316] flex-shrink-0 shadow-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 shadow-sm relative group ${
                    isBot
                      ? 'bg-white border border-orange-200 text-[#431407]'
                      : 'bg-[#F97316] text-white rounded-tr-none'
                  }`}
                >
                  {isBot ? (
                    <div>
                      {renderFormattedText(msg.text)}

                      {/* Action ribbon for bot replies */}
                      <div className="pt-3 mt-3 border-t border-orange-100 flex items-center justify-between text-[11px] text-[#7C2D12]">
                        <span className="flex items-center gap-1 font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
                          Vedic Consultation Wisdom
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="p-1 rounded hover:bg-orange-50 text-[#7C2D12] hover:text-[#431407] transition-colors flex items-center gap-1 cursor-pointer font-medium"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed drop-shadow-sm">{msg.text}</p>
                  )}

                  <span
                    className={`text-[9px] font-medium block mt-1.5 text-right ${
                      isBot ? 'text-[#7C2D12]' : 'text-white/90'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-full bg-[#7C2D12] text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Loading Spinner & Shimmering Mystic Skeleton */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-300 flex items-center justify-center text-[#F97316] flex-shrink-0 animate-pulse mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-orange-200 rounded-2xl p-4 shadow-sm space-y-3 min-w-[260px] sm:min-w-[320px]">
              <div className="flex items-center gap-2 text-xs text-[#431407]">
                <span className="w-3.5 h-3.5 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin flex-shrink-0" />
                <span className="font-playfair font-bold text-[#EA580C]">
                  Consulting Vedic Shastras & Lal Kitab Farman...
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full rounded-md skeleton-shimmer" />
                <div className="h-3 w-5/6 rounded-md skeleton-shimmer" />
                <div className="h-3 w-3/4 rounded-md skeleton-shimmer" />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Direct Escalation to Dr. Preeti Sehgal Consultation */}
      <div className="bg-orange-50/90 border-t border-orange-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-[#431407] font-medium">
          <Info className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Need a customized Janam Kundli or On-Site Vastu Audit?</span>
        </div>
        <div className="flex items-center gap-2">
          {onOpenBooking && (
            <button
              onClick={() => onOpenBooking('lal-kitab')}
              className="font-bold text-[#EA580C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-3 h-3 text-[#F97316]" />
              <span>Book Dr. Preeti Sehgal</span>
            </button>
          )}
          <span className="text-orange-300">|</span>
          <a
            href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
              'Namaste Dr. Preeti Sehgal ji, I would like to consult regarding a specific Vastu / Lal Kitab remedy.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Direct WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Input Message Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-white border-t border-orange-200 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask anything about Vastu defects, directions, or Lal Kitab remedies..."
          disabled={isLoading}
          className="flex-1 bg-orange-50/40 border border-orange-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-[#431407] placeholder:text-orange-900/50 focus:outline-none focus:border-[#F97316] transition-colors"
        />

        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-50 text-white p-2.5 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0 cta-glow-hover"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask Vedic AI</span>
        </button>
      </form>
    </div>
  );
};
