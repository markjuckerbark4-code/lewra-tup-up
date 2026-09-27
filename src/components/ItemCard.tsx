import React from 'react';
import { GameItem } from '../types/topup';
import { Zap } from 'lucide-react';

interface ItemCardProps {
  item: GameItem;
  onSelect: (item: GameItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(item)}
      className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
    >
      {/* Icon Frame */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 shadow-md group-hover:border-orange-500 group-hover:shadow-orange-500/25 group-hover:scale-105 transition-all duration-200">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:brightness-110 transition-all"
          referrerPolicy="no-referrer"
        />

        {/* Optional overlay badge */}
        {item.badge && (
          <span className="absolute top-1 right-1 px-1.5 py-0.5 text-[9px] font-bold tracking-tight text-white bg-orange-600 rounded-md shadow">
            {item.badge}
          </span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Instant Indicator icon */}
        <div className="absolute bottom-1 right-1 text-amber-300 opacity-80 group-hover:opacity-100 transition-opacity">
          <Zap className="w-3.5 h-3.5 fill-amber-400" />
        </div>
      </div>

      {/* Title */}
      <span className="mt-2.5 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 max-w-[130px] leading-tight transition-colors">
        {item.title}
      </span>

      {/* Subtitle in Bengali if present */}
      {item.subtitle && (
        <span className="text-[11px] text-neutral-500 dark:text-neutral-400 max-w-[120px] truncate mt-0.5">
          {item.subtitle}
        </span>
      )}
    </button>
  );
};
