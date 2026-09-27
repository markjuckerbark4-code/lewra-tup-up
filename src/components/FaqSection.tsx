import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/topupData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="my-14 max-w-5xl mx-auto px-4">
      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-center text-neutral-900 dark:text-white tracking-tight mb-8">
        সাধারণ প্রশ্ন (FAQ)
      </h3>

      {/* Accordion List */}
      <div className="bg-white dark:bg-neutral-800/90 rounded-2xl border border-neutral-200 dark:border-neutral-700/80 divide-y divide-neutral-200 dark:divide-neutral-700/80 shadow-sm overflow-hidden">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="transition-colors">
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                  {item.question}
                </span>
                <span className="text-orange-600 dark:text-orange-400 p-1 shrink-0">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-700/50 bg-neutral-50/50 dark:bg-neutral-850/50">
                  <p className="whitespace-pre-line">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
