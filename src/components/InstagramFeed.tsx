import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INSTAGRAM_REELS, DOCTOR_INFO } from '../data/brandData';
import { Instagram, Play, Heart, Eye, Sparkles, ExternalLink, CheckCircle2, ArrowRight, Quote, Compass, BookOpen, Sun, Moon, Flame, ShieldAlert, Image as ImageIcon } from 'lucide-react';

// Dedicated Sub-component for Smooth Blur-Up Lazy Image Loading
interface LazyBlurImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  imgClassName?: string;
}

const LazyBlurImage: React.FC<LazyBlurImageProps> = ({
  src,
  alt,
  containerClassName = '',
  imgClassName = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate lightweight micro-blur thumbnail URL for Unsplash or use fallback
  const lqipUrl = src.includes('unsplash.com')
    ? `${src.replace(/w=\d+/, 'w=36').replace(/q=\d+/, 'q=20')}&blur=25`
    : src;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#2A0800] ${containerClassName}`}>
      {/* 1. Low-Resolution Blurred Micro-Thumbnail */}
      <img
        src={lqipUrl}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover object-center filter blur-xl scale-110 transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* 2. Sacred Saffron Warm Shimmer Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950/40 via-amber-600/20 to-orange-950/40 animate-pulse pointer-events-none flex items-center justify-center">
          <div className="flex items-center gap-1 text-amber-300/40 text-[10px] uppercase font-bold tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Vedic Post</span>
          </div>
        </div>
      )}

      {/* 3. Fallback Error Display */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-200/60 bg-[#2A0800] p-4 text-center">
          <ImageIcon className="w-6 h-6 mb-1 text-amber-400/50" />
          <span className="text-[11px] font-semibold">{alt}</span>
        </div>
      )}

      {/* 4. Full-Resolution Target Image with Lazy Loading & Blur-Up Transition */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${imgClassName} ${
          isLoaded
            ? 'opacity-100 blur-0 scale-100 filter brightness-95'
            : 'opacity-0 blur-lg scale-105'
        }`}
      />
    </div>
  );
};

// Curated Instagram photo posts & Astro Lines by Dr. Preeti Sehgal (@drpreetisehgal1)
const INSTAGRAM_PHOTOS = [
  {
    id: 'photo-1',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=700',
    title: 'Dr. Preeti Sehgal at Delhi Vedic Consultation Chamber',
    astroLineHindi: '“ग्रह केवल संकेत देते हैं, आपका पुरुषार्थ और सही कर्म ही भाग्य को सिद्धि तक पहुंचाता है।”',
    astroLineEnglish: 'Planets only signal tendencies; your righteous karma and conscious efforts translate fate into actual success.',
    category: 'Vedic Janam Kundli',
    likes: '14.2K',
    comments: '480',
    postUrl: 'https://www.instagram.com/drpreetisehgal1'
  },
  {
    id: 'photo-2',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700',
    title: 'Lal Kitab Farman & Darpan Guidance Session',
    astroLineHindi: '“लाल किताब का मूल सिद्धांत है—अहंकार का त्याग, प्रकृति से सामंजस्य और सरल सेवा भाव।”',
    astroLineEnglish: 'The core essence of Lal Kitab is non-violence, ego dissolution, and pure charitable alignment with nature.',
    category: 'Lal Kitab Upay',
    likes: '19.8K',
    comments: '720',
    postUrl: 'https://www.instagram.com/drpreetisehgal1'
  },
  {
    id: 'photo-3',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700',
    title: 'Vastu Shastra Site Energy Audit (Without Demolition)',
    astroLineHindi: '“घर के ईशान और उत्तर कोण को स्वच्छ रखें, लक्ष्मी और स्वास्थ्य का वास स्वतः होगा।”',
    astroLineEnglish: 'Keep the Ishan (North-East) and Kuber (North) corners clutter-free; prosperity and vitality follow naturally.',
    category: 'Vastu Shastra',
    likes: '16.5K',
    comments: '530',
    postUrl: 'https://www.instagram.com/drpreetisehgal1'
  },
  {
    id: 'photo-4',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=700',
    title: 'Global Video Reading: Kundli Milan & Career Timing',
    astroLineHindi: '“समय से पूर्व और भाग्य से अधिक कुछ नहीं मिलता, पर सही मुहूर्त से हर बाधा पार होती है।”',
    astroLineEnglish: 'Align your critical decisions with auspicious Abhijit Muhurats to bypass hidden planetary resistances.',
    category: 'Matchmaking & Career',
    likes: '22.1K',
    comments: '890',
    postUrl: 'https://www.instagram.com/drpreetisehgal1'
  },
  {
    id: 'photo-5',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=700',
    title: 'Rahu-Ketu Karmic Axis & Modern Remedies',
    astroLineHindi: '“राहु भय नहीं, आपकी अनसुलझी महत्वाकांक्षा है। इसे अनुशासन से संभालें तो यह शिखर देता है।”',
    astroLineEnglish: 'Rahu is not dread, but unchanneled ambition. Master it through self-discipline and it yields extraordinary summits.',
    category: 'Graha Shanti',
    likes: '18.9K',
    comments: '610',
    postUrl: 'https://www.instagram.com/drpreetisehgal1'
  },
  {
    id: 'photo-6',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=700',
    title: 'Scientific Gemstone Prescription & Aura Shielding',
    astroLineHindi: '“रत्न दवा की तरह होते हैं—सही लग्न में अमृत, गलत चयन में विष। हमेशा कुंडली जांच के बाद ही धारण करें।”',
    astroLineEnglish: 'Gemstones act like potent medicine—nectar when aligned to your ascendant, poison when worn blindly.',
    category: 'Scientific Gemology',
    likes: '25.4K',
    comments: '940',
    postUrl: 'https://www.instagram.com/drpreetisehgal1'
  }
];

export const InstagramFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'reels'>('photos');

  return (
    <section id="instagram" data-section="reels" className="py-16 sm:py-24 bg-[#FFF9F2] text-[#7C2D12] border-b border-orange-200 relative overflow-hidden">
      
      {/* Background subtle light */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-orange-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
        >
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-orange-50 px-3.5 py-1 rounded-full text-[11px] font-bold text-[#C2410C] tracking-[0.2em] uppercase mb-3 shadow-sm">
              <Instagram className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Official Instagram: {DOCTOR_INFO.instagramHandle}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#431407] tracking-tight">
              Dr. Preeti Sehgal &bull; Astro Insights & Visuals
            </h2>
            <p className="text-[#431407] mt-2 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
              Follow Dr. Preeti Sehgal on Instagram for daily astrological wisdom, Vedic planetary transit updates (Gochar), and practical Lal Kitab karma tips.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* View Switcher Toggle */}
            <div className="inline-flex p-1 rounded-xl bg-orange-50 border border-orange-200">
              <button
                id="insta-photos-tab"
                onClick={() => setActiveTab('photos')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'photos'
                    ? 'bg-[#F97316] text-white shadow-sm'
                    : 'text-[#7C2D12] hover:text-[#431407]'
                }`}
              >
                Photos & Astro Lines
              </button>
              <button
                id="insta-reels-tab"
                onClick={() => setActiveTab('reels')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'reels'
                    ? 'bg-[#F97316] text-white shadow-sm'
                    : 'text-[#7C2D12] hover:text-[#431407]'
                }`}
              >
                Reels & Video Tips
              </button>
            </div>

            <a
              id="insta-follow-btn"
              href={DOCTOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer cta-glow-hover"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>Follow @drpreetisehgal1</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </motion.div>

        {/* Tab 1: Instagram Photos & Astro Lines */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTAGRAM_PHOTOS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl border border-orange-200 overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20 hover:border-orange-400 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container with Blur-Up Lazy Loading */}
                  <div className="relative h-64 overflow-hidden bg-orange-100">
                    <LazyBlurImage
                      src={item.image}
                      alt={item.title}
                      imgClassName="group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/70 backdrop-blur-md text-white border border-white/20 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                        {item.category}
                      </span>
                    </div>

                    {/* Instagram Verified Pill */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] text-white border border-white/10 font-medium">
                      <Instagram className="w-3 h-3 text-[#F97316]" />
                      <span>@drpreetisehgal1</span>
                    </div>

                    {/* Likes and engagement bar */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/95">
                      <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur px-2 py-0.5 rounded-md">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        <strong className="text-white font-bold">{item.likes}</strong>
                      </span>
                      <span className="text-[11px] text-white bg-black/60 backdrop-blur px-2 py-0.5 rounded-md font-semibold">Verified Post</span>
                    </div>
                  </div>

                  {/* Astro Lines & Content */}
                  <div className="p-6 space-y-3.5">
                    <h3 className="font-playfair text-lg font-bold text-[#431407] group-hover:text-[#F97316] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Sacred Astro Quote Box */}
                    <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 relative shadow-inner">
                      <Quote className="w-4 h-4 text-[#F97316]/40 absolute top-3 right-3" />
                      <p className="text-xs sm:text-sm text-[#9A3412] font-bold leading-relaxed italic mb-2 font-playfair">
                        {item.astroLineHindi}
                      </p>
                      <p className="text-xs text-[#431407] leading-relaxed font-normal">
                        {item.astroLineEnglish}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-6 pt-0">
                  <a
                    href={item.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-50 hover:bg-[#F97316] hover:text-white text-[#431407] text-xs font-bold tracking-wider uppercase border border-orange-200 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer shadow-xs"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#F97316] group-hover:text-white" />
                    <span>View on Instagram</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 2: Instagram Reels Showcase Grid */}
        {activeTab === 'reels' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTAGRAM_REELS.map((reel, idx) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl border border-orange-200 overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20 hover:border-orange-400 flex flex-col justify-between group"
              >
                <div>
                  {/* Visual Thumbnail */}
                  <div className={`relative h-48 bg-gradient-to-br ${reel.thumbnailGradient} p-4 text-white flex flex-col justify-between overflow-hidden`}>
                    <div className="flex items-center justify-between text-[10px] font-medium">
                      <span className="bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/20 uppercase tracking-widest text-white font-bold">
                        {reel.topic}
                      </span>
                      <span className="text-white text-[10px] font-semibold">{reel.date}</span>
                    </div>

                    {/* Play Button Icon */}
                    <div className="w-12 h-12 mx-auto rounded-full bg-black/50 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-white ml-0.5 text-white" />
                    </div>

                    <div className="flex items-center justify-between text-xs text-white">
                      <span className="flex items-center gap-1 font-semibold"><Eye className="w-3.5 h-3.5" /> {reel.views}</span>
                      <span className="flex items-center gap-1 font-semibold"><Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> {reel.likes}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-playfair text-base font-bold text-[#431407] group-hover:text-[#F97316] transition-colors leading-snug line-clamp-2">
                      {reel.title}
                    </h3>

                    <p className="text-xs text-[#7C2D12] line-clamp-2 leading-relaxed font-normal">
                      {reel.caption}
                    </p>

                    {/* Key Highlights from the Reel */}
                    <div className="bg-orange-50/70 p-3.5 rounded-xl border border-orange-200 space-y-1.5">
                      <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-widest block mb-1">
                        Key Astrological Takeaway:
                      </span>
                      {reel.bulletPoints.map((bp, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-[#431407] font-normal leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0 mt-0.5" />
                          <span>{bp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0">
                  <a
                    href={DOCTOR_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-[#F97316] hover:text-white text-[#431407] text-xs font-bold tracking-wider uppercase border border-orange-200 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Watch Reel on Instagram</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </a>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

