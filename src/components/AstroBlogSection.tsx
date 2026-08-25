import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, User, ArrowRight, Sparkles, X, Share2, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface BlogPostItem {
  id: string;
  titleEn: string;
  titleHi: string;
  excerptEn: string;
  excerptHi: string;
  contentEn: string;
  contentHi: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
}

const BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'angel-numbers-guide',
    titleEn: 'Angel Numbers & Synchronicity: What Repeating Numbers (111, 444, 777) Reveal',
    titleHi: 'एंजेल नंबर और ब्रह्मांडीय संकेत: बार-बार दिखने वाले अंक (111, 444, 777) का क्या अर्थ है?',
    excerptEn: 'Discover why seeing repeating sequence numbers is not a coincidence, but an angelic cosmic reassurance regarding your life path.',
    excerptHi: 'जानिए क्यों बार-बार एक ही संख्या का दिखना कोई संयोग नहीं बल्कि ब्रह्मांड की ओर से आपके सही मार्ग पर होने का संकेत है।',
    contentEn: `Seeing repeating numbers like 111, 222, 333, 444, or 777 frequently on clocks, license plates, or bills is known in occult numerology as "Angel Synchronicity".

- **111 (Intuition & Manifestation)**: A sign that your thoughts are manifesting rapidly. Focus purely on positive outcomes and release anxieties.
- **222 (Divine Timing & Balance)**: Reassurance that everything is falling into place in God’s perfect timing. Have faith in current partnerships.
- **333 (Ascended Masters Guidance)**: The universe is sending protective blessings to guide your creative and spiritual decisions.
- **444 (Angel Protection)**: You are surrounded by guardian angels. Fear nothing regarding your career or family safety.
- **777 (Spiritual Luck & Awakening)**: Financial and spiritual breakthroughs are right around the corner. Stay aligned with your highest purpose.`,
    contentHi: `घड़ी, नंबर प्लेट या बिल पर बार-बार 111, 222, 333, 444 या 777 देखना अंकज्योतिष में 'एंजेलिक सिन्क्रोनिसिटी' कहलाता है।

- **111 (अभिव्यक्ति एवं नया आरंभ)**: आपके विचार तेजी से यथार्थ बन रहे हैं। केवल सकारात्मक सोचें।
- **222 (संतुलन एवं धैर्य)**: ईश्वर की योजना के अनुसार सब सही समय पर हो रहा है।
- **333 (दिव्य गुरुओं का मार्गदर्शन)**: आपके निर्णय सही दिशा में हैं।
- **444 (सुरक्षा एवं स्थिरता)**: आप सुरक्षित हैं, भय त्यागें।
- **777 (परम सौभाग्य एवं सिद्धि)**: जीवन में बड़े आध्यात्मिक और आर्थिक लाभ के द्वार खुल रहे हैं।`,
    category: 'Numerology',
    readTime: '4 min read',
    date: 'Aug 2026',
    author: 'Dr. Preeti Sehgal'
  },
  {
    id: 'rahu-mahadasha-lal-kitab',
    titleEn: 'Rahu Mahadasha (18 Years): Symptoms, Misconceptions & Potent Lal Kitab Remedies',
    titleHi: 'राहु की 18 वर्षीय महादशा: लक्षण, भ्रांतियां एवं लाल किताब के अचूक सरल उपाय',
    excerptEn: 'How to channel Rahu’s sudden elevation power while mitigating illusion, anxiety, and legal hurdles with practical totkes.',
    excerptHi: 'राहु के अचानक धन लाभ के योग को सक्रिय करने और मानसिक भ्रम व व्यर्थ के खर्चों को शांत करने के नियम।',
    contentEn: `Rahu is the cosmic catalyst of sudden meteoric rise, foreign connections, and unconventional technologies. When afflicted, it can cause sleeplessness, erratic decisions, and trust deficits.

Key Practical Lal Kitab Precautions:
1. Never consume food in bed; eat in the kitchen or designated dining space.
2. Keep a solid silver square piece in your wallet or pocket to calm Rahu with Moon’s cooling energy.
3. Float dry coconut or barley in flowing river water on Saturday twilights during peak transit affliction.
4. Maintain high cleanliness in the toilet and electronic gadget storage areas.`,
    contentHi: `राहु अचानक धन, विदेश यात्रा और तकनीकी प्रगति का कारक है। जब यह अशुभ होता है, तो अनिद्रा, भय और निर्णय में भ्रम पैदा करता है।

लाल किताब के सरल उपाय:
1. बिस्तर पर बैठकर भोजन न करें; रसोई अथवा साफ स्थान पर भोजन करें।
2. अपनी जेब या पर्स में चांदी का ठोस चौकोर टुकड़ा रखें।
3. शनिवार शाम बहते जल में सूखा नारियल या जौ प्रवाहित करें।
4. घर के इलेक्ट्रॉनिक उपकरणों और उत्तर-पश्चिम (वायव्य) कोने को स्वच्छ रखें।`,
    category: 'Lal Kitab',
    readTime: '6 min read',
    date: 'Aug 2026',
    author: 'Dr. Preeti Sehgal'
  },
  {
    id: 'shubh-muhurat-2026-calendar',
    titleEn: '2026 Shubh Muhurat Calendar: Auspicious Dates for Marriage, Griha Pravesh & Business',
    titleHi: '2026 शुभ मुहूर्त पंचांग: विवाह, गृह प्रवेश एवं नए व्यापार आरंभ की शुभ तिथियां',
    excerptEn: 'Complete astrological guide on choosing planetary-aligned dates according to Ravi Yoga, Pushya Nakshatra, and Abhijit Muhurat.',
    excerptHi: 'रवि योग, पुष्य नक्षत्र एवं अभिजित मुहूर्त के अनुसार शुभ कार्यों की शास्त्र सम्मत तिथियां।',
    contentEn: `In Vedic Muhurat Shastra, conducting life milestones during planetary harmony neutralizes up to 70% of chart afflictions.

- **Vivah Muhurat (Wedding Timings)**: Avoid Venus/Jupiter combustion (Tara Dubna) and solar eclipse windows.
- **Griha Pravesh (Housewarming)**: Best in Shukla Paksha when Sun is in Uttarayana during auspicious Nakshatras like Rohini, Mrigashira, Uttara Phalguni.
- **Vehicle & Asset Purchase**: Pushya Nakshatra and Sarvartha Siddhi Yoga provide longevity and safety.`,
    contentHi: `वैदिक मुहूर्त शास्त्र के अनुसार शुभ समय में किए गए कार्य 70% दोषों को स्वतः निष्प्रभावी कर देते हैं।

- **विवाह मुहूर्त**: गुरु एवं शुक्र के अस्त काल से बचें।
- **गृह प्रवेश**: सूर्य के उत्तरायण में शुक्ल पक्ष की शुभ तिथियां सर्वश्रेष्ठ हैं।
- **वाहन एवं स्वर्ण क्रय**: पुष्य नक्षत्र और सर्वार्थ सिद्धि योग दीर्घकालिक सुरक्षा प्रदान करते हैं।`,
    category: 'Vedic Shastra',
    readTime: '5 min read',
    date: 'Aug 2026',
    author: 'Dr. Preeti Sehgal'
  },
  {
    id: 'vastu-northeast-wealth-rules',
    titleEn: '5 Essential Vastu Rules for the North-East (Ishanya) Corner to Attract Prosperity',
    titleHi: 'उत्तर-पूर्व (ईशान कोण) के 5 अनिवार्य वास्तु नियम: सुख-समृद्धि एवं शांति के उपाय',
    excerptEn: 'Why Ishanya is known as the divine conduit of Shiva & Kuber, and how keeping it balanced invites perpetual mental clarity.',
    excerptHi: 'ईशान कोण को क्यों माना जाता है देव स्थान और कैसे इसे संतुलित रखकर घर में सुख-शांति लाई जा सकती है।',
    contentEn: `The North-East (Ishanya) direction carries the highest vibrational magnetic energy in Vastu Shastra.

1. **Keep it Light**: Never construct heavy staircases or storage rooms in Ishanya.
2. **Strictly No Toilets**: A toilet in North-East severely damages financial growth and nervous tranquility.
3. **Best for Puja & Water**: A clean Pooja room, meditation space, or small indoor water fountain here multiplies positive prana.
4. **Color Harmony**: Use light off-white, cream, or light golden yellow tones. Avoid harsh red or dark black.`,
    contentHi: `ईशान कोण (उत्तर-पूर्व) वास्तु शास्त्र में सबसे पवित्र और संवेदनशील ऊर्जा क्षेत्र माना गया है।

1. **हल्का रखें**: यहां भारी सीढ़ियां या स्टोर रूम न बनाएं।
2. **शौचालय निषेध**: उत्तर-पूर्व में शौचालय गंभीर वास्तु दोष पैदा करता है।
3. **पूजा घर एवं जल**: यह स्थान पूजा घर अथवा जल स्थापना के लिए सर्वोत्तम है।
4. **रंगों का चयन**: हल्का पीला, सफेद या क्रीम रंग सर्वश्रेष्ठ हैं; लाल या काले रंग से बचें।`,
    category: 'Vastu Shastra',
    readTime: '4 min read',
    date: 'Aug 2026',
    author: 'Dr. Preeti Sehgal'
  }
];

interface AstroBlogSectionProps {
  onStartChat: () => void;
  onOpenBooking: () => void;
}

export const AstroBlogSection: React.FC<AstroBlogSectionProps> = ({
  onStartChat,
  onOpenBooking,
}) => {
  const { isHindi } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<BlogPostItem | null>(null);

  return (
    <section id="blog-section" className="py-16 px-4 bg-[#FFFDF9] dark:bg-[#150400]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-700/60 text-[#EA580C] dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isHindi ? 'वैदिक ज्ञान एवं लेख' : 'Astrological Insights & Vedic Knowledge'}</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#431407] dark:text-amber-100">
              {isHindi ? 'अंकशास्त्र, लाल किताब एवं वास्तु पर प्रामाणिक लेख' : 'Explore Vedic Astrology, Numerology & Vastu Wisdom'}
            </h2>
            <p className="text-xs sm:text-sm text-[#7C2D12] dark:text-amber-200/80 max-w-2xl mt-1">
              {isHindi
                ? 'डॉ. प्रीति सहगल द्वारा 28+ वर्षों के शोध और अनुभव पर आधारित ज्ञानवर्धक लेख।'
                : 'Educational articles grounding ancient occult shastras in modern practical everyday living.'}
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedArticle(post)}
              className="bg-white dark:bg-[#1E0601] rounded-3xl border border-orange-200/90 dark:border-amber-900/70 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#EA580C] dark:hover:border-amber-500 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] bg-orange-100 dark:bg-amber-950 text-[#EA580C] dark:text-amber-300 px-2 py-0.5 rounded-full font-bold uppercase">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="font-playfair font-bold text-sm sm:text-base text-[#431407] dark:text-amber-100 group-hover:text-[#EA580C] transition-colors leading-snug">
                  {isHindi ? post.titleHi : post.titleEn}
                </h3>

                <p className="text-xs text-[#7C2D12]/80 dark:text-amber-200/80 mt-2.5 line-clamp-3 leading-relaxed">
                  {isHindi ? post.excerptHi : post.excerptEn}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-orange-100 dark:border-amber-900/50 flex items-center justify-between text-xs font-bold text-[#EA580C] dark:text-amber-400">
                <span>{isHindi ? 'पूरा लेख पढ़ें' : 'Read Full Article'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1A0501] border border-orange-200 dark:border-amber-900/80 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#7C2D12] to-[#EA580C] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                  {selectedArticle.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg hover:bg-white/20 text-white cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#431407] dark:text-amber-100 leading-relaxed bg-[#FFFDF9] dark:bg-[#120400]">
              <h2 className="font-playfair font-black text-lg sm:text-xl text-[#7C2D12] dark:text-amber-100 leading-snug">
                {isHindi ? selectedArticle.titleHi : selectedArticle.titleEn}
              </h2>

              <div className="flex items-center gap-3 text-[11px] text-[#9A3412] dark:text-amber-300 pb-3 border-b border-orange-100 dark:border-amber-900/60">
                <span>By {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="whitespace-pre-line text-[#431407] dark:text-amber-100 space-y-3 font-normal">
                {isHindi ? selectedArticle.contentHi : selectedArticle.contentEn}
              </div>

              {/* Remedy CTA inside Article */}
              <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-[#280A02] border border-amber-300 dark:border-amber-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#EA580C]" />
                  <span className="text-xs font-bold text-[#7C2D12] dark:text-amber-200">
                    {isHindi ? 'अपनी कुंडली के अनुसार उपाय जानने हेतु चैट करें' : 'Discuss remedies for your personal birth chart'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onStartChat();
                  }}
                  className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                >
                  {isHindi ? 'निःशुल्क चैट शुरू करें' : 'Start Free Chat'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
