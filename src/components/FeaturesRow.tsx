import React from 'react';
import { Zap, ShieldCheck, CreditCard } from 'lucide-react';

export const FeaturesRow: React.FC = () => {
  const features = [
    {
      icon: Zap,
      iconColor: 'text-orange-500',
      title: '০-৫ সেকেন্ড',
      subtitle: 'ইনস্ট্যান্ট ডেলিভারি',
      desc: 'অর্ডার করার সাথে সাথে সরাসরি আইডিতে পৌঁছে যায়'
    },
    {
      icon: ShieldCheck,
      iconColor: 'text-amber-500',
      title: '১০০% নিরাপদ',
      subtitle: 'পাসওয়ার্ড লাগে না',
      desc: 'শুধুমাত্র প্লেয়ার আইডি (UID) দিয়ে নিরাপদে রিচার্জ'
    },
    {
      icon: CreditCard,
      iconColor: 'text-rose-500',
      title: 'bKash • Nagad',
      subtitle: 'Rocket সাপোর্টেড',
      desc: 'যেকোনো ব্যক্তিগত মোবাইল ব্যাংকিং দিয়ে পেমেন্ট করুন'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {features.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-neutral-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <IconComponent className={`w-6 h-6 ${item.iconColor}`} />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg text-neutral-900 dark:text-white leading-tight">
                {item.title}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                {item.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
