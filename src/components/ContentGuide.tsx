import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Zap } from 'lucide-react';

export const ContentGuide: React.FC = () => {
  return (
    <article className="my-10 max-w-5xl mx-auto px-6 py-8 sm:p-10 bg-white dark:bg-neutral-800/90 rounded-2xl border border-neutral-200 dark:border-neutral-700/80 shadow-sm text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
      {/* Main Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-3">
        Free Fire Diamond Top Up BD — Instant FF Top Up with Player ID
      </h3>

      <p className="mb-6 text-neutral-600 dark:text-neutral-300">
        Lewra Top Up is Bangladesh's most trusted site for{' '}
        <span className="text-orange-600 dark:text-orange-400 font-semibold underline underline-offset-2">
          Free Fire top up
        </span>{' '}
        — the fastest <strong className="text-neutral-900 dark:text-white font-semibold">diamond top up</strong> for FF players in BD.
        You recharge <strong className="text-neutral-900 dark:text-white font-semibold">FF Diamonds</strong> with nothing but your Player ID (UID)
        — no password, no email, no logging into your account. Pay with{' '}
        <strong className="text-neutral-900 dark:text-white font-semibold">bKash, Nagad or Rocket</strong> and the diamonds land in your ID
        within seconds. শুধু Player ID দিয়েই ফ্রি ফায়ার টপ আপ ও ডায়মন্ড টপ আপ, অ্যাকাউন্ট সম্পূর্ণ নিরাপদ থাকে।
      </p>

      {/* How to section */}
      <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-6 mb-2">
        How to Top Up Free Fire Diamond in BD using bKash
      </h4>
      <ol className="list-decimal pl-5 space-y-1.5 mb-6 text-neutral-600 dark:text-neutral-300">
        <li>Pick your diamond package from the list above and open it.</li>
        <li>
          Enter your <strong className="text-neutral-900 dark:text-white">Free Fire Player ID (UID)</strong> and confirm the player name shown.
        </li>
        <li>
          Choose <strong className="text-neutral-900 dark:text-white">bKash</strong> (or Nagad / Rocket), send the exact amount and submit the Transaction ID.
        </li>
        <li>The diamonds land in your ID, usually within 0–5 seconds.</li>
      </ol>

      {/* Price section */}
      <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-6 mb-2">
        Free Fire Diamond Top Up Price in Bangladesh (FF Diamond Rate)
      </h4>
      <p className="mb-6 text-neutral-600 dark:text-neutral-300">
        Every package is priced live on its product page, from the smallest diamond pack up to the largest bundle, plus Weekly and Monthly Membership.
        There is no service fee and no hidden charge on top — the price you see is the price you pay, which is what keeps our{' '}
        <strong className="text-neutral-900 dark:text-white">FF Diamond top up price</strong> among the lowest in Bangladesh.
      </p>

      {/* Delivery time section */}
      <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-6 mb-2">
        FF Top Up Delivery Time
      </h4>
      <p className="mb-6 text-neutral-600 dark:text-neutral-300">
        Most <strong className="text-neutral-900 dark:text-white">Free Fire top up</strong> orders are delivered within 0 to 5 seconds, 24 hours a day
        — every FF top up is automatic, so there is no waiting for an agent. Instant delivery costs nothing extra, and every order stays traceable from your order history.
      </p>

      {/* Is Safe section */}
      <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-6 mb-2">
        Is Free Fire Top Up with UID Safe?
      </h4>
      <p className="mb-6 text-neutral-600 dark:text-neutral-300">
        Yes. A UID-based diamond top up never touches your account. We have served FF players across Bangladesh for over three years, with thousands of verified customer reviews.
        A recharge needs only your UID, so you never hand over a password and ordering cannot compromise your account. If an order is not delivered, you get a full refund or the amount back in your wallet.
      </p>

      {/* Customer Support section */}
      <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-6 mb-2">
        Customer Support
      </h4>
      <p className="text-neutral-600 dark:text-neutral-300 mb-4">
        Need help with an order? Our support team is available 24/7:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <a
          href="tel:+8801828861788"
          className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-xs font-semibold text-neutral-800 dark:text-neutral-200"
        >
          <Phone className="w-4 h-4 text-emerald-500" />
          <span>Call: +8801828861788</span>
        </a>

        <a
          href="https://wa.me/8801828861788"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-xs font-semibold text-neutral-800 dark:text-neutral-200"
        >
          <MessageCircle className="w-4 h-4 text-emerald-500" />
          <span>WhatsApp: 8801828861788</span>
        </a>

        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/50 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          <span>Facebook: Lewra Top Up</span>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/50 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          <Zap className="w-4 h-4 text-orange-500" />
          <span>Messenger: 24/7 Live</span>
        </div>
      </div>
    </article>
  );
};
