import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Star } from 'lucide-react';
import { DOCTOR_INFO } from '../data/brandData';

export interface DoctorPhoto {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  src: string;
  fallbackSrc: string;
  alt: string;
}

export const DOCTOR_CAROUSEL_PHOTOS: DoctorPhoto[] = [
  {
    id: 'photo-desk',
    title: 'Consultation Chamber',
    subtitle: 'Meticulous Kundli & Horoscope Analysis',
    badge: 'Delhi Chambers',
    src: '/images/1787254451942.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    alt: 'Dr. Preeti Sehgal analyzing horoscope chart at consultation desk',
  },
  {
    id: 'photo-portrait',
    title: 'Dr. Preeti Sehgal',
    subtitle: 'Gold Medalist & Jyotish Acharya',
    badge: '28+ Years Experience',
    src: '/images/1787254705542.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=800',
    alt: 'Dr. Preeti Sehgal portrait - Renowned Vedic Astrologer and Lal Kitab Scholar',
  },
  {
    id: 'photo-global',
    title: 'Global Video Consultations',
    subtitle: 'Connecting with Clients Worldwide',
    badge: 'Zoom & Video Slots Open',
    src: '/images/1787254540546.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    alt: 'Dr. Preeti Sehgal conducting international video consultation',
  },
];

interface DoctorPhotoCarouselProps {
  autoSwipeInterval?: number; // ms, defaults to 3500ms
  className?: string;
}

export const DoctorPhotoCarousel: React.FC<DoctorPhotoCarouselProps> = ({
  autoSwipeInterval = 3500,
  className = '',
}) => {
  const photos = DOCTOR_CAROUSEL_PHOTOS;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Automatic Swiping Effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoSwipeInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoSwipeInterval, nextSlide]);

  const currentPhoto = photos[currentIndex] || DOCTOR_CAROUSEL_PHOTOS[0];

  const slideVariants: {
    enter: (dir: number) => { x: number; opacity: number; scale: number };
    center: { x: number; opacity: number; scale: number; transition: { x: { type: 'spring'; stiffness: number; damping: number }; opacity: { duration: number }; scale: { duration: number } } };
    exit: (dir: number) => { x: number; opacity: number; scale: number; transition: { x: { type: 'spring'; stiffness: number; damping: number }; opacity: { duration: number } } };
  } = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <div 
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Dr. Preeti Sehgal Photo Gallery"
    >
      {/* Royal Vedic Photo Frame with Corner Flourishes */}
      <div className="relative p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-[#F97316]/25 via-amber-100/60 to-[#EA580C]/25 border border-orange-300 shadow-xl shadow-orange-950/10 group">
        
        {/* 4 Ornate Golden Corner Accents */}
        <div className="absolute top-1 left-1.5 text-[#EA580C] text-xs font-serif select-none pointer-events-none opacity-80">
          ✦
        </div>
        <div className="absolute top-1 right-1.5 text-[#EA580C] text-xs font-serif select-none pointer-events-none opacity-80">
          ✦
        </div>
        <div className="absolute bottom-1 left-1.5 text-[#EA580C] text-xs font-serif select-none pointer-events-none opacity-80">
          ✦
        </div>
        <div className="absolute bottom-1 right-1.5 text-[#EA580C] text-xs font-serif select-none pointer-events-none opacity-80">
          ✦
        </div>

        {/* Inner Ornate Bevel & Image Container */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-xl overflow-hidden border-2 border-orange-200/90 bg-[#FFF7ED] shadow-inner">
          
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.div
              key={currentPhoto.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              {/* Photo */}
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== currentPhoto.fallbackSrc) {
                    target.src = currentPhoto.fallbackSrc;
                  }
                }}
              />

              {/* Subtle Warm Gradient Overlay at bottom for readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/95 text-[#7C2D12] border border-orange-200 shadow-md backdrop-blur-xs">
                  <Sparkles className="w-3 h-3 text-[#F97316]" />
                  <span>{currentPhoto.badge}</span>
                </span>
              </div>

              {/* Live Status Indicator Top Center/Right */}
              <div className="absolute top-3 right-3 sm:right-28 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-white font-medium border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Chamber Open</span>
              </div>

              {/* Bottom Caption Inside Frame */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-white text-left">
                <div className="flex items-center gap-1.5 text-xs text-orange-200 font-medium">
                  <Star className="w-3.5 h-3.5 fill-[#F97316] text-[#F97316]" />
                  <span className="uppercase tracking-widest text-[10px]">{currentPhoto.title}</span>
                </div>
                <h4 className="font-playfair text-sm sm:text-base font-bold text-white tracking-wide drop-shadow-sm">
                  {currentPhoto.subtitle}
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#7C2D12] hover:text-[#EA580C] flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#7C2D12] hover:text-[#EA580C] flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Animated Indicator Dots & Progress */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-black/40 backdrop-blur-xs">
            {photos.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to photo ${idx + 1}: ${photo.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-5 h-1.5 bg-[#F97316]'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Doctor Name & Credentials Block Below Frame */}
      <div className="mt-3 text-center">
        <h3 className="font-playfair text-xl sm:text-2xl font-bold tracking-wide text-[#7C2D12]">
          {DOCTOR_INFO.name}
        </h3>
        <p className="text-xs font-bold text-[#EA580C] uppercase tracking-[0.2em] mt-0.5">
          Jyotish Acharya & Lal Kitab Scholar
        </p>
        <p className="text-[11px] text-[#9A3412] mt-0.5 font-medium">
          Gold Medalist &bull; 28+ Years Astrological Practice &bull; Delhi
        </p>
      </div>

    </div>
  );
};
