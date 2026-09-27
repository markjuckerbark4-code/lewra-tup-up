import React, { useState } from 'react';
import { Play, Sparkles, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { HERO_BANNER } from '../data/topupData';

interface HeroBannerProps {
  onOpenTutorial: () => void;
  onScrollToPacks: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenTutorial,
  onScrollToPacks,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      titleTop: 'কিভাবে ১ সেকেন্ডে',
      titleBottom: 'ডায়মন্ড টপ-আপ করবেন?',
      badge: '১ মিনিটে ডেলিভারি',
      desc: 'প্লেয়ার আইডি দিন, bKash বা Nagad দিয়ে পে করুন আর মুহূর্তে পেয়ে যান ডায়মন্ড!',
      buttonText: 'ভিডিও টিউটোরিয়াল দেখুন'
    },
    {
      titleTop: 'বাংলাদেশ সেরা মূল্যে',
      titleBottom: 'ফ্রি ফায়ার মেম্বারশিপ অফার',
      badge: 'সুপার সেভার ডিল',
      desc: 'Weekly এবং Monthly মেম্বারশিপে ডায়মন্ড পান সবচেয়ে সাশ্রয়ী দামে।',
      buttonText: 'অফারগুলো দেখুন'
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl group my-4">
      {/* Background Graphic Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BANNER}
          alt="Free Fire Diamond Top Up BD"
          className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105 group-hover:scale-100 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[300px] md:min-h-[340px]">
        {/* Left side: Authentic framed graphic pill box matching screenshot */}
        <div className="w-full md:w-3/5 text-center md:text-left">
          {/* Framed white board like in the screenshot */}
          <div className="inline-block bg-white dark:bg-neutral-800/95 border-2 border-neutral-300 dark:border-neutral-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm transform hover:scale-[1.01] transition-transform">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-xs font-bold text-orange-600 dark:text-orange-400">
              <Zap className="w-4 h-4 fill-orange-500 text-orange-500 animate-bounce" />
              <span>{active.badge}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-snug">
              <span className="block text-teal-800 dark:text-teal-400 font-sans">{active.titleTop}</span>
              <span className="block text-emerald-800 dark:text-emerald-400 font-sans mt-1">
                {active.titleBottom}
              </span>
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
              {active.desc}
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={onOpenTutorial}
                className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{active.buttonText}</span>
              </button>

              <button
                onClick={onScrollToPacks}
                className="px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 active:scale-95 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>এখনি টপ-আপ করুন</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Quick Highlights */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-end justify-center">
          <div className="bg-neutral-900/80 border border-neutral-800 backdrop-blur-md rounded-2xl p-4 text-center text-white max-w-xs w-full shadow-lg">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              স্বয়ংক্রিয় সার্ভার স্পিড
            </span>
            <div className="text-3xl font-extrabold text-white mt-1 tabular-nums">
              0 - 5 <span className="text-sm font-normal text-neutral-400">সেকেন্ড</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              সরাসরি Garena Bangladesh গেটওয়ে থেকে ডেলিভারি
            </p>
            <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-around text-xs text-neutral-300">
              <span>✓ ১০০% নিরাপদ</span>
              <span>•</span>
              <span>✓ নো পাসওয়ার্ড</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-sm transition-all"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-sm transition-all"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentSlide ? 'bg-orange-500 w-6' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
