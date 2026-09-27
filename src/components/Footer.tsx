import React from 'react';
import { MessageSquare, Send, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (cat: string) => void;
  onOpenTrack?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenTrack }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-12 pb-6 border-t border-neutral-900 mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-neutral-900">
        {/* Column 1: STAY CONNECTED */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-3">
            STAY CONNECTED
          </h4>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-5">
            যেকোনো সমস্যার দ্রুত সমাধান পেতে আমাদের পেইজে মেসেঞ্জারে মেসেজ করুন। ২৪/৭ সাপোর্ট টিম আপনার পাশে আছে।
          </p>

          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="#facebook"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="#telegram"
              aria-label="Telegram"
              className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-sky-500 text-white flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/8801828861788"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: QUICK LINKS */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-3">
            QUICK LINKS
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
            <li>
              <button
                onClick={() => onSelectCategory && onSelectCategory('freefire')}
                className="hover:text-white transition-colors"
              >
                Game Top Up
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory && onSelectCategory('all')}
                className="hover:text-white transition-colors"
              >
                Marketplace
              </button>
            </li>
            <li>
              <button
                onClick={onOpenTrack}
                className="hover:text-white transition-colors"
              >
                Track Order
              </button>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: SUPPORT CENTER */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-3">
            SUPPORT CENTER
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-850 text-xs">
              <MessageSquare className="w-5 h-5 text-orange-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Help line [9AM-12PM]</span>
                <span className="text-neutral-400">Messenger HelpLine</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-850 text-xs">
              <Send className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">টেলিগ্রামে সাপোর্ট</span>
                <span className="text-neutral-400">Telegram Support 24/7</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-850 text-xs">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">+8801828861788</span>
                <span className="text-neutral-400">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
        <p>© 2026 Lewra Top Up. All Rights Reserved.</p>
        <div className="flex items-center gap-3 font-semibold text-neutral-400">
          <span className="hover:text-rose-400 transition-colors">bKash</span>
          <span>•</span>
          <span className="hover:text-orange-400 transition-colors">Nagad</span>
          <span>•</span>
          <span className="hover:text-purple-400 transition-colors">Rocket</span>
        </div>
      </div>
    </footer>
  );
};
