import React from 'react';
import { GameItem } from '../types/topup';
import { ItemCard } from './ItemCard';

interface ItemSectionProps {
  title: string;
  items: GameItem[];
  onSelect: (item: GameItem) => void;
  id?: string;
}

export const ItemSection: React.FC<ItemSectionProps> = ({ title, items, onSelect, id }) => {
  if (items.length === 0) return null;

  return (
    <section id={id} className="my-10 sm:my-14 text-center">
      {/* Centered Heading exactly matching screenshot */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6 sm:mb-8 font-serif sm:font-sans">
        {title}
      </h2>

      {/* Grid of items */}
      <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto px-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
};
