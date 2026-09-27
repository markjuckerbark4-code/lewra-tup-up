import React, { useState } from 'react';
import { Send, Check, ExternalLink } from 'lucide-react';

export const CommunityButtons: React.FC = () => {
  const [copiedFb, setCopiedFb] = useState(false);
  const [copiedTg, setCopiedTg] = useState(false);

  const handleFbClick = () => {
    setCopiedFb(true);
    setTimeout(() => setCopiedFb(false), 2500);
  };

  const handleTgClick = () => {
    setCopiedTg(true);
    setTimeout(() => setCopiedTg(false), 2500);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-10 max-w-2xl mx-auto px-4">
      {/* Facebook Button */}
      <button
        onClick={handleFbClick}
        className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3 bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-bold text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all active:scale-95"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span>{copiedFb ? 'পেইজ ওপেন হচ্ছে...' : 'Facebook পেইজ ফলো করুন'}</span>
        {copiedFb ? <Check className="w-4 h-4 text-emerald-500" /> : <ExternalLink className="w-4 h-4 text-neutral-400" />}
      </button>

      {/* Telegram Button */}
      <button
        onClick={handleTgClick}
        className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3 bg-white dark:bg-neutral-800 text-sky-500 dark:text-sky-400 font-bold text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:border-sky-300 dark:hover:border-sky-500 transition-all active:scale-95"
      >
        <Send className="w-5 h-5" />
        <span>{copiedTg ? 'টেলিগ্রাম লিঙ্ক ওপেন হচ্ছে...' : 'Giveaway & Offer — Join Telegram'}</span>
        {copiedTg ? <Check className="w-4 h-4 text-emerald-500" /> : <ExternalLink className="w-4 h-4 text-neutral-400" />}
      </button>
    </div>
  );
};
