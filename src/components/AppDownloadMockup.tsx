import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, Phone, Star, ShieldCheck, Download, QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DOCTOR_INFO } from '../data/brandData';
import { useLanguage } from '../context/LanguageContext';

interface AppDownloadMockupProps {
  onStartChat: () => void;
  onOpenBooking: () => void;
}

export const AppDownloadMockup: React.FC<AppDownloadMockupProps> = ({
  onStartChat,
  onOpenBooking,
}) => {
  const { isHindi } = useLanguage();

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-[#FFFDF9] via-[#FFF5EB] to-[#FFF0E0] dark:from-[#150400] dark:via-[#1D0601] dark:to-[#120400] overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Value Proposition & Download Badges */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-700/60 text-[#EA580C] dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHindi ? 'भारत का सर्वश्रेष्ठ ज्योतिष ऐप' : 'Experience 24x7 Vedic Astrology on Mobile'}</span>
            </div>

            <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#431407] dark:text-amber-100 leading-tight">
              {isHindi ? (
                <>
                  प्रत्यक्ष ज्योतिष परामर्श — <span className="text-[#EA580C]">12 सेकंड में लाइव चैट</span> एवं ऑडियो कॉल
                </>
              ) : (
                <>
                  Connect with Certified Astrologer — <span className="text-[#EA580C]">Live Chat in &lt; 12 Seconds</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[#7C2D12] dark:text-amber-200/90 leading-relaxed max-w-2xl">
              {isHindi
                ? 'प्रमाणित ज्योतिषी से 100% गोपनीय परामर्श, दैनिक राशिफल, और निःशुल्क कुंडली मिलान अपनी जेब में पाएं।'
                : 'Get instant answers for love, marriage timing, career switches, and financial growth from certified Vedic astrologer with 100% privacy and lightning-fast responses.'}
            </p>

            {/* Key Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              {[
                { en: 'First Chat Consultation is 100% FREE', hi: 'पहला चैट परामर्श 100% निःशुल्क' },
                { en: 'Verified Gold Medalist Astrologer', hi: 'स्वर्ण पदक विजेता प्रमाणित ज्योतिषी' },
                { en: '100% Private & Confidential Records', hi: '100% गोपनीय व सुरक्षित जन्म विवरण' },
                { en: '13+ Regional Languages Supported', hi: '13+ भारतीय भाषाओं में परामर्श उपलब्ध' }
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#431407] dark:text-amber-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{isHindi ? feat.hi : feat.en}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <button
                onClick={onStartChat}
                className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{isHindi ? 'मुफ़्त लाइव चैट शुरू करें' : 'Start Free Live Chat Now'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenBooking}
                className="bg-white dark:bg-[#2A0800] border-2 border-orange-300 dark:border-amber-700 text-[#7C2D12] dark:text-amber-200 hover:bg-orange-50 font-bold text-sm px-5 py-3.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#EA580C]" />
                <span>{isHindi ? 'कॉल स्लॉट बुक करें' : 'Book Audio/Video Call'}</span>
              </button>
            </div>

            {/* App Store Mockup Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-left">
              <div className="flex items-center gap-3 bg-white/80 dark:bg-[#1E0601] p-2.5 rounded-xl border border-orange-200 dark:border-amber-900/60 shadow-xs">
                <div className="p-2 bg-stone-900 text-white rounded-lg">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-stone-500 uppercase tracking-wider font-bold">Available on</p>
                  <p className="text-xs font-black text-stone-900 dark:text-white leading-tight">Google Play & App Store</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#7C2D12] dark:text-amber-300">
                <div className="flex text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <span>4.8/5 (5L+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Mobile Phone Device Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[300px] sm:w-[330px] rounded-[42px] p-3.5 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-950 shadow-2xl border-4 border-stone-700/80 ring-1 ring-white/20">
              
              {/* Dynamic Island / Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-stone-950 rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-800 mr-2"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>

              {/* Phone Screen Canvas */}
              <div className="w-full bg-[#FFF9F2] dark:bg-[#150400] rounded-[32px] overflow-hidden flex flex-col h-[520px] shadow-inner text-left text-xs border border-orange-100 dark:border-amber-950">
                
                {/* Screen Header */}
                <div className="bg-[#7C2D12] dark:bg-[#200701] text-white p-4 pt-8 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-amber-200 border border-amber-300 text-[#7C2D12] font-black flex items-center justify-center text-xs">
                        PS
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white"></span>
                    </div>
                    <div>
                      <p className="font-playfair font-bold text-xs leading-tight flex items-center gap-1">
                        <span>Dr. Preeti Sehgal</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                      </p>
                      <p className="text-[10px] text-amber-200">Online | Reply in 12s</p>
                    </div>
                  </div>

                  <span className="text-[9px] bg-amber-400 text-stone-950 font-black px-2 py-0.5 rounded-full">
                    FREE CHAT
                  </span>
                </div>

                {/* Chat Stream inside phone */}
                <div className="flex-1 p-3 space-y-2.5 overflow-y-auto bg-[#FFFDF9] dark:bg-[#120400]">
                  <div className="text-center my-1">
                    <span className="text-[9px] bg-orange-100 dark:bg-amber-950 text-[#7C2D12] dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                      Session Started • 100% Confidential
                    </span>
                  </div>

                  {/* Astrologer Bubble */}
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-[#200802] border border-orange-200 dark:border-amber-900/60 p-2.5 rounded-2xl rounded-bl-xs text-[11px] text-[#431407] dark:text-amber-100 max-w-[85%] shadow-2xs">
                      <p className="font-semibold text-[#EA580C]">Astro Dr. Preeti Sehgal</p>
                      <p>Namaste! I analyzed your birth chart. Jupiter transit is blessing your 7th house soon. 🌟</p>
                      <span className="text-[8px] text-stone-400 block text-right mt-0.5">10:42 AM</span>
                    </div>
                  </div>

                  {/* User Bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#EA580C] text-white p-2.5 rounded-2xl rounded-br-xs text-[11px] max-w-[80%] shadow-2xs">
                      <p>Thank you! When is the best time for job promotion?</p>
                      <span className="text-[8px] text-orange-200 block text-right mt-0.5">10:43 AM</span>
                    </div>
                  </div>

                  {/* Astrologer Remedy Card Bubble */}
                  <div className="flex justify-start">
                    <div className="bg-amber-50 dark:bg-[#2A0B02] border border-amber-300 dark:border-amber-700/60 p-2.5 rounded-2xl rounded-bl-xs text-[11px] text-[#431407] dark:text-amber-100 max-w-[88%] shadow-2xs">
                      <div className="flex items-center gap-1 text-[#EA580C] font-bold mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Prescribed Lal Kitab Upay</span>
                      </div>
                      <p className="text-[10px] text-stone-700 dark:text-amber-200">
                        Feed green grass to cows on Wednesdays & keep silver square in pocket for instant career boost.
                      </p>
                    </div>
                  </div>

                  {/* Typing Bubble */}
                  <div className="flex items-center gap-1.5 text-[10px] text-[#EA580C] font-semibold pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-bounce [animation-delay:0.4s]"></span>
                    <span>Astrologer is typing reply...</span>
                  </div>
                </div>

                {/* Phone Bottom Bar */}
                <div className="p-2.5 bg-white dark:bg-[#1E0601] border-t border-orange-200 dark:border-amber-900 flex items-center gap-2">
                  <input
                    type="text"
                    disabled
                    placeholder="Ask question..."
                    className="flex-1 px-2.5 py-1.5 text-[11px] rounded-lg bg-stone-100 dark:bg-[#120400] text-stone-600"
                  />
                  <button
                    onClick={onStartChat}
                    className="bg-[#EA580C] text-white p-1.5 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Send
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
