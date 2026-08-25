import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, X, Heart, Eye, Filter, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface SpiritualProduct {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'evileye' | 'rudraksha' | 'gemstone' | 'vastu' | 'crystal';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: string;
  benefitsEn: string;
  benefitsHi: string;
  certifiedTagEn: string;
  certifiedTagHi: string;
  energizedByEn: string;
  energizedByHi: string;
  iconName: string;
  inStock: boolean;
}

const PRODUCTS_DATA: SpiritualProduct[] = [
  {
    id: 'evil-eye-nazar-bracelet',
    nameEn: 'Vedic Evil Eye Nazar Suraksha Bracelet',
    nameHi: 'नज़र सुरक्षा ब्रेसलेट (बुरी नज़र निवारक)',
    category: 'evileye',
    price: 899,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: '3.4K',
    benefitsEn: 'Wards off jealous glares, negative aura vibrations, and sudden commercial hurdles.',
    benefitsHi: 'नकारात्मक ऊर्जा, नजर दोष और व्यापारिक बाधाओं से पूर्ण सुरक्षा प्रदान करता है।',
    certifiedTagEn: '100% Authentic Nazar Bead',
    certifiedTagHi: '100% प्रामाणिक सुरक्षा मनका',
    energizedByEn: 'Pran Pratishtha by Dr. Preeti Sehgal',
    energizedByHi: 'डॉ. प्रीति सहगल द्वारा प्राण प्रतिष्ठित',
    iconName: 'Eye',
    inStock: true
  },
  {
    id: 'rudraksha-5mukhi-nepal',
    nameEn: 'Original 5-Mukhi Nepali Rudraksha Mala (108+1)',
    nameHi: 'मूल 5-मुखी नेपाली रुद्राक्ष माला (108+1 मनके)',
    category: 'rudraksha',
    price: 1899,
    originalPrice: 3200,
    rating: 5.0,
    reviewsCount: '5.1K',
    benefitsEn: 'Governed by Lord Shiva & Jupiter (Guru). Brings mental serenity, memory power, and blood pressure balance.',
    benefitsHi: 'भगवान शिव एवं गुरु का आशीर्वाद। मानसिक शांति, एकाग्रता और स्वास्थ्य संवर्धन।',
    certifiedTagEn: 'Govt. Lab Certified',
    certifiedTagHi: 'सरकारी लैब प्रमाणित',
    energizedByEn: 'Vedic Rudrabhishekam Energized',
    energizedByHi: 'वैदिक रुद्राभिषेक द्वारा सिद्ध',
    iconName: 'Sparkles',
    inStock: true
  },
  {
    id: 'pyrite-money-magnet',
    nameEn: 'Natural Pyrite Cluster (Money Magnet Stone)',
    nameHi: 'प्राकृतिक पाइराइट क्लस्टर (धन आकर्षण स्टोन)',
    category: 'crystal',
    price: 1499,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: '2.8K',
    benefitsEn: 'Known as "Fool’s Gold" & Wealth Magnet. Placed in North/Cash box to stimulate cashflow and wealth retention.',
    benefitsHi: 'तिजोरी अथवा कार्यस्थल के उत्तर दिशा में रखने से धन प्रवाह और समृद्धि में वृद्धि।',
    certifiedTagEn: 'Natural Raw Mineral Specimen',
    certifiedTagHi: 'प्राकृतिक शुद्ध खनिज स्टोन',
    energizedByEn: 'Kuber Gayatri Mantra Infused',
    energizedByHi: 'कुबेर गायत्री मंत्र द्वारा जागृत',
    iconName: 'Sparkles',
    inStock: true
  },
  {
    id: 'vastu-brass-tortoise-plate',
    nameEn: 'Vastu Brass Tortoise with Glass Water Plate',
    nameHi: 'वास्तु पीतल कछुआ एवं जल पात्र (दीर्घायु व धन)',
    category: 'vastu',
    price: 1299,
    originalPrice: 2199,
    rating: 4.8,
    reviewsCount: '1.9K',
    benefitsEn: 'Placed facing North to absorb negative chi and invite steady business revenues and longevity.',
    benefitsHi: 'उत्तर दिशा में मुख कर रखने से परिवार में स्थिरता, दीर्घायु और स्थिर लक्ष्मी का वास होता है।',
    certifiedTagEn: 'Pure Heavy Cast Brass',
    certifiedTagHi: 'शुद्ध भारी पीतल धातु',
    energizedByEn: 'Lakshmi Vastu Yantra Charged',
    energizedByHi: 'महालक्ष्मी वास्तु यंत्र सिद्ध',
    iconName: 'Sparkles',
    inStock: true
  },
  {
    id: 'meru-shree-yantra-panchdhatu',
    nameEn: '3D Meru Shree Yantra (Panchdhatu Gold Coated)',
    nameHi: '3D मेरु श्री यंत्र (पंचधातु स्वर्ण लेपित)',
    category: 'vastu',
    price: 2499,
    originalPrice: 4500,
    rating: 5.0,
    reviewsCount: '4.2K',
    benefitsEn: 'The supreme geometric powerhouse of Goddess Tripura Sundari for debt destruction and home prosperity.',
    benefitsHi: 'कर्ज मुक्ति, दरिद्रता निवारण और व्यापार में निरंतर वृद्धि हेतु सर्वोच्च यंत्र।',
    certifiedTagEn: 'Authentic 9-Trikona Geometry',
    certifiedTagHi: 'शास्त्रोक्त 9-त्रिकोण ज्यामिति',
    energizedByEn: 'Kanakdhara Stotra Energized',
    energizedByHi: 'कनकधारा स्तोत्र द्वारा अभिमंत्रित',
    iconName: 'Sparkles',
    inStock: true
  },
  {
    id: 'yellow-sapphire-pukhraj',
    nameEn: 'Astrological Ceylon Yellow Sapphire (Pukhraj)',
    nameHi: 'प्राकृतिक सीलोन पुखराज रत्न (बृहस्पति शुभ)',
    category: 'gemstone',
    price: 5999,
    originalPrice: 9500,
    rating: 5.0,
    reviewsCount: '1.6K',
    benefitsEn: 'Unheated & untreated natural Jupiter gemstone for marriage timing, intellect, and executive promotions.',
    benefitsHi: 'शीघ्र विवाह, ज्ञान, सम्मान और संतान सुख हेतु पूर्णतः प्राकृतिक बिना गर्म किया हुआ पुखराज।',
    certifiedTagEn: 'IGI / GIA Certified Lab Report',
    certifiedTagHi: 'IGI / GIA अंतर्राष्ट्रीय लैब रिपोर्ट',
    energizedByEn: 'Jupiter Vedic Mantra Chanted',
    energizedByHi: 'गुरु बीज मंत्र द्वारा अभिमंत्रित',
    iconName: 'Sparkles',
    inStock: true
  },
  {
    id: 'selenite-cleansing-plate',
    nameEn: 'Moroccan Selenite Charging Plate',
    nameHi: 'प्राकृतिक सेलेनाइट चार्जिंग प्लेट',
    category: 'crystal',
    price: 999,
    originalPrice: 1799,
    rating: 4.8,
    reviewsCount: '1.2K',
    benefitsEn: 'Instantly purifies and re-energizes crystals, rudrakshas, and jewelry from absorbed negative energy.',
    benefitsHi: 'क्रिस्टल और रुद्राक्ष की नकारात्मक ऊर्जा को स्वतः शुद्ध करने वाली दिव्य प्लेट।',
    certifiedTagEn: '100% Genuine Moroccan Crystal',
    certifiedTagHi: '100% प्राकृतिक मोरक्को क्रिस्टल',
    energizedByEn: 'Moonlight Cleansed',
    energizedByHi: 'पूर्णिमा चंद्र प्रकाश में शुद्ध',
    iconName: 'Sparkles',
    inStock: true
  },
  {
    id: 'rudraksha-gauri-shankar',
    nameEn: 'Rare Gauri Shankar Rudraksha (Nepal)',
    nameHi: 'दुर्लभ गौरी शंकर रुद्राक्ष (दांपत्य सुख)',
    category: 'rudraksha',
    price: 4499,
    originalPrice: 7500,
    rating: 5.0,
    reviewsCount: '980+',
    benefitsEn: 'Naturally joined dual bead symbolizing Shiva & Parvati. Unrivaled for marital harmony & finding soulmates.',
    benefitsHi: 'शिव-पार्वती का साक्षात स्वरूप। वैवाहिक कलह समाप्त करने और प्रेम बढ़ाने में अचूक।',
    certifiedTagEn: 'Natural Join Verified X-Ray',
    certifiedTagHi: 'एक्स-रे सत्यापित प्राकृतिक जोड़',
    energizedByEn: 'Gauri Shankar Vivah Puja Blessed',
    energizedByHi: 'विवाह सूत्र पूजा द्वारा सिद्ध',
    iconName: 'Sparkles',
    inStock: true
  }
];

interface AstroMallShopProps {
  onStartChat: () => void;
  onOpenBooking: () => void;
}

export const AstroMallShop: React.FC<AstroMallShopProps> = ({
  onStartChat,
  onOpenBooking,
}) => {
  const { isHindi } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<SpiritualProduct | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const categories = [
    { id: 'all', labelEn: 'All Products (8)', labelHi: 'सभी उत्पाद (8)' },
    { id: 'evileye', labelEn: 'Evil Eye & Amulets', labelHi: 'नज़र दोष एवं ताबीज' },
    { id: 'rudraksha', labelEn: 'Certified Rudraksha', labelHi: 'प्रमाणित रुद्राक्ष' },
    { id: 'gemstone', labelEn: 'Astrological Gemstones', labelHi: 'वैदिक रत्न' },
    { id: 'vastu', labelEn: 'Vastu Yantras & Idols', labelHi: 'वास्तु यंत्र एवं कछुआ' },
    { id: 'crystal', labelEn: 'Healing Crystals', labelHi: 'सकारात्मक क्रिस्टल' }
  ];

  const filtered = PRODUCTS_DATA.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleOrder = (product: SpiritualProduct) => {
    setSelectedProduct(product);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setSelectedProduct(null);
    }, 2800);
  };

  return (
    <section id="astromall" className="py-16 px-4 bg-[#FFF9F2] dark:bg-[#120400] border-t border-orange-200/80 dark:border-amber-950 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-700/60 text-[#EA580C] dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isHindi ? 'एस्ट्रोमॉल — सिद्ध एवं प्राण-प्रतिष्ठित आध्यात्मिक स्टोर' : 'AstroMall — 100% Certified Spiritual Store'}</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#431407] dark:text-amber-100">
              {isHindi ? 'डॉ. प्रीति सहगल द्वारा सिद्ध रत्न, रुद्राक्ष एवं वास्तु यंत्र' : 'Energized Gemstones, Rudraksha & Vastu Yantras'}
            </h2>
            <p className="text-xs sm:text-sm text-[#7C2D12] dark:text-amber-200/80 max-w-2xl mt-1">
              {isHindi
                ? 'प्रत्येक उत्पाद शास्त्रीय मंत्रोच्चार एवं वैदिक विधि से सिद्ध करके भेजा जाता है ताकि त्वरित प्रभाव मिल सके।'
                : 'Every item is rigorously lab-certified and energized through classical Vedic consecration rituals before dispatch.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#7C2D12] dark:text-amber-300 bg-white dark:bg-[#1E0601] px-3.5 py-2 rounded-xl border border-orange-200 dark:border-amber-900 shadow-2xs shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isHindi ? '100% मनी-बैक प्रामाणिकता गारंटी' : '100% Certified Authentic with Lab Card'}</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-md ring-2 ring-amber-300'
                    : 'bg-white dark:bg-[#1E0601] text-[#7C2D12] dark:text-amber-200 border-orange-200 dark:border-amber-900/80 hover:border-[#EA580C] hover:bg-orange-50'
                }`}
              >
                <span>{isHindi ? cat.labelHi : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            return (
              <div
                key={product.id}
                className="bg-white dark:bg-[#1E0601] rounded-3xl border border-orange-200/90 dark:border-amber-900/70 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#EA580C] dark:hover:border-amber-500 relative"
              >
                {/* Top Badge: Discount & Lab Certificate */}
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                    {discountPercent}% OFF
                  </span>
                  <span className="text-[10px] font-semibold text-[#9A3412] dark:text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>{isHindi ? product.certifiedTagHi : product.certifiedTagEn}</span>
                  </span>
                </div>

                {/* Product Title & Info */}
                <div>
                  <h3 className="font-playfair font-bold text-sm sm:text-base text-[#431407] dark:text-amber-100 group-hover:text-[#EA580C] transition-colors leading-snug">
                    {isHindi ? product.nameHi : product.nameEn}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <div className="flex items-center text-amber-500 font-bold gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-stone-400">•</span>
                    <span className="text-stone-500 dark:text-amber-200/70 text-[11px]">({product.reviewsCount} reviews)</span>
                  </div>

                  {/* Benefits description */}
                  <p className="text-xs text-[#7C2D12]/90 dark:text-amber-200/80 mt-2.5 line-clamp-2 leading-relaxed">
                    {isHindi ? product.benefitsHi : product.benefitsEn}
                  </p>

                  {/* Energized Tag */}
                  <div className="mt-3 p-2 bg-amber-50/80 dark:bg-[#280A02] rounded-xl border border-amber-200 dark:border-amber-900/60 text-[10px] text-[#9A3412] dark:text-amber-300 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                    <span className="truncate">{isHindi ? product.energizedByHi : product.energizedByEn}</span>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="mt-5 pt-3.5 border-t border-orange-100 dark:border-amber-900/50 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-playfair font-black text-lg text-[#EA580C] dark:text-amber-400">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold block">
                      Free Shipping Across India
                    </span>
                  </div>

                  <button
                    onClick={() => handleOrder(product)}
                    className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'ऑर्डर करें' : 'Buy Now'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 dark:from-[#250801] dark:via-[#1B0500] dark:to-[#250801] p-5 rounded-3xl border border-orange-200 dark:border-amber-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white dark:bg-[#2F0B02] rounded-2xl border border-orange-300 dark:border-amber-800 text-[#EA580C] shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-playfair font-bold text-sm sm:text-base text-[#431407] dark:text-amber-100">
                {isHindi ? 'क्या आप अनिश्चित हैं कि कौन सा रत्न या रुद्राक्ष आपके लिए अनुकूल है?' : 'Unsure Which Gemstone or Rudraksha Suits Your Kundli?'}
              </h4>
              <p className="text-xs text-[#7C2D12] dark:text-amber-200/80">
                {isHindi
                  ? 'गलत रत्न पहनने से बचें। पहले 5 मिनट निःशुल्क चैट में अपनी जन्म कुंडली अनुसार अनुकूलता जांचें।'
                  : 'Avoid wearing unsuited stones. Verify planet alignment with an astrologer in a free 5-minute chat.'}
              </p>
            </div>
          </div>

          <button
            onClick={onStartChat}
            className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>{isHindi ? 'ज्योतिषी से निःशुल्क पूछें' : 'Get Free Astrologer Recommendation'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Instant Order Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1A0501] border border-orange-200 dark:border-amber-900/80 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-[#7C2D12] to-[#EA580C] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <h3 className="font-playfair font-bold text-base">
                  {isHindi ? 'सुरक्षित चेकआउट' : 'Direct Order Checkout'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded-lg hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-playfair font-bold text-lg text-stone-900 dark:text-white">
                  {isHindi ? 'ऑर्डर सफलतापूर्वक दर्ज!' : 'Order Placed Successfully!'}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  {isHindi
                    ? 'हमारी टीम आपके पते पर प्राण-प्रतिष्ठित उत्पाद के प्रेषण विवरण के साथ व्हाट्सएप पर संपर्क करेगी।'
                    : 'Our team will contact you via WhatsApp with the energized consecration certificate and tracking ID.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} className="p-5 space-y-4 text-xs">
                <div className="p-3 bg-orange-50 dark:bg-[#200701] rounded-2xl border border-orange-200 dark:border-amber-900 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#431407] dark:text-amber-100">
                      {isHindi ? selectedProduct.nameHi : selectedProduct.nameEn}
                    </p>
                    <p className="text-[10px] text-[#9A3412] dark:text-amber-300">
                      {isHindi ? selectedProduct.energizedByHi : selectedProduct.energizedByEn}
                    </p>
                  </div>
                  <span className="font-playfair font-black text-base text-[#EA580C]">
                    ₹{selectedProduct.price}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isHindi ? 'पूरा नाम' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isHindi ? 'व्हाट्सएप / मोबाइल नंबर' : 'WhatsApp / Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isHindi ? 'डिलीवरी का पूरा पता (पिन कोड सहित)' : 'Delivery Address & PIN Code'}
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Street, Landmark, City, PIN Code"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isHindi ? 'ऑर्डर की पुष्टि करें (Cash on Delivery / UPI)' : 'Confirm Order (COD & UPI Available)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
