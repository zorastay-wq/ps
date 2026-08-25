import React, { useState } from 'react';
import { REVIEWS_DATA, DOCTOR_INFO } from '../data/brandData';
import { Star, ShieldCheck, CheckCircle, ExternalLink, Quote, Sparkles } from 'lucide-react';
import { StaggeredHeading } from './typography';

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.service.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FFF9F2] text-[#7C2D12] border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-white px-3.5 py-1 rounded-full text-[11px] font-bold text-[#C2410C] tracking-[0.18em] uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Verified Client Experiences &bull; 5.0 Google Rating</span>
          </div>
          <StaggeredHeading
            text="Trusted by Thousands in Delhi & Globally"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#431407] tracking-tight"
            goldAccentWords={['Delhi', 'Globally', 'Trusted']}
            staggerDelay={0.035}
          />
          <p className="text-[#431407] mt-3 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Read genuine reflections from families, corporate executives, and global NRI clients whose lives were positively transformed.
          </p>

          {/* Rating Summary Bar */}
          <div className="mt-8 inline-flex items-center gap-5 bg-white border border-orange-200/90 px-6 py-3.5 rounded-2xl shadow-lg shadow-orange-950/5">
            <div className="flex items-center gap-2 text-2xl font-playfair font-bold text-[#431407]">
              <span>5.0</span>
              <div className="flex text-[#F97316] ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F97316] text-[#F97316]" />
                ))}
              </div>
            </div>
            <div className="h-6 w-px bg-orange-200"></div>
            <div className="text-xs text-[#7C2D12] font-medium text-left">
              <span className="font-bold text-[#431407] block">{DOCTOR_INFO.reviewsCount} 5-Star Reviews on Google</span>
              <a
                href={DOCTOR_INFO.googleShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C2410C] hover:text-[#EA580C] font-bold block hover:underline uppercase tracking-wider text-[11px] mt-0.5"
              >
                View Google Profile &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-orange-200/90 hover:border-orange-400 p-6 sm:p-7 shadow-lg shadow-orange-950/5 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20 flex flex-col justify-between"
            >
              <div>
                {/* Top Quote & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#F97316]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F97316] text-[#F97316]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#7C2D12] font-semibold">{item.date}</span>
                </div>

                <div className="inline-block text-[10px] font-bold text-[#C2410C] bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                  {item.service}
                </div>

                <p className="text-xs sm:text-sm text-[#431407] leading-relaxed italic mb-5 font-normal">
                  "{item.comment}"
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="pt-3.5 border-t border-orange-100 flex items-center justify-between">
                <div>
                  <h4 className="font-playfair text-xs sm:text-sm font-bold text-[#431407]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#7C2D12] font-semibold">
                    {item.location}
                  </p>
                </div>

                {item.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300 uppercase tracking-wider">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Share Link Banner */}
        <div className="mt-12 text-center">
          <a
            href={DOCTOR_INFO.googleShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C2410C] hover:text-white bg-white hover:bg-[#F97316] px-7 py-3.5 rounded-xl border border-orange-300 hover:border-orange-500 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
          >
            <span>Read more reviews on Google Profile</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
