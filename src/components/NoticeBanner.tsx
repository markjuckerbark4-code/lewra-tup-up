import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';

interface NoticeBannerProps {
  onDismiss?: () => void;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#b84d00] text-white px-4 py-2.5 text-xs sm:text-sm font-medium relative shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 pr-8">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <Bell className="w-4 h-4 shrink-0 text-amber-200 animate-pulse" />
          <span className="font-bold text-amber-100">Notice:</span>
          <span className="truncate">
            আমাদের সার্ভিস চালু আছে, এখনি অর্ডার করুন, ৫ সেকেন্ডে ডায়মন্ড আইডিতে দেওয়া হয়
          </span>
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white rounded-md hover:bg-black/10 transition-colors"
        aria-label="Close Notice"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
