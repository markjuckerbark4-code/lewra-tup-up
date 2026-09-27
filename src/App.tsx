/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GAME_ITEMS } from './data/topupData';
import { GameItem, Order } from './types/topup';
import { NoticeBanner } from './components/NoticeBanner';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FeaturesRow } from './components/FeaturesRow';
import { ItemSection } from './components/ItemSection';
import { CommunityButtons } from './components/CommunityButtons';
import { ContentGuide } from './components/ContentGuide';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { TopUpModal } from './components/TopUpModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AuthModal } from './components/AuthModal';
import { TutorialModal } from './components/TutorialModal';
import { Search, Flame, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'marketplace'>('home');
  const [selectedItem, setSelectedItem] = useState<GameItem | null>(null);
  const [showOrderTracker, setShowOrderTracker] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; phone?: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [marketplaceFilter, setMarketplaceFilter] = useState<'all' | 'freefire' | 'efootball' | 'social' | 'offer'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load initial orders from local storage
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('lewra_topup_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        // Initial sample successful order to demonstrate functionality immediately
        const initialOrder: Order = {
          id: 'LTU-892410',
          itemId: 'ff-topup-bd',
          itemTitle: 'Free Fire Top Up Bangladesh',
          packageId: 'ff-115',
          packageName: '115 Diamonds',
          amount: 85,
          playerId: '1829472910',
          playerName: 'Lewra_BossBD',
          paymentMethod: 'bkash',
          senderNumber: '01828861788',
          trxId: 'BL98K210L',
          status: 'completed',
          createdAt: 'আজ, ০২:১৮ PM'
        };
        setOrders([initialOrder]);
        localStorage.setItem('lewra_topup_orders', JSON.stringify([initialOrder]));
      }

      const savedUser = localStorage.getItem('lewra_topup_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const handleOrderSuccess = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem('lewra_topup_orders', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleLoginSuccess = (user: { name: string; phone: string }) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('lewra_topup_user', JSON.stringify(user));
    } catch {
      // Ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('lewra_topup_user');
    } catch {
      // Ignore
    }
  };

  const scrollToPacks = () => {
    const el = document.getElementById('free-fire-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered items by category for the main layout
  const offerItems = GAME_ITEMS.filter((item) => item.category === 'offer');
  const freeFireItems = GAME_ITEMS.filter((item) => item.category === 'freefire');
  const efootballItems = GAME_ITEMS.filter((item) => item.category === 'efootball');
  const socialItems = GAME_ITEMS.filter((item) => item.category === 'social');

  // Filtered for Marketplace tab
  const filteredMarketplaceItems = GAME_ITEMS.filter((item) => {
    const matchesFilter = marketplaceFilter === 'all' || item.category === marketplaceFilter;
    const matchesQuery = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#f7f8f9] dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      {/* 1. Top Notice Banner */}
      <NoticeBanner />

      {/* 2. Top Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenTrack={() => setShowOrderTracker(true)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab as 'home' | 'marketplace')}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 w-full py-4">
        {activeTab === 'marketplace' ? (
          /* Marketplace View */
          <div className="my-8">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                মার্কেটপ্লেস ও সকল প্যাকেজ
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                আপনার পছন্দের গেম বা সার্ভিসের নাম লিখে খুঁজুন এবং মুহূর্তের মধ্যে টপ-আপ করুন
              </p>

              {/* Search Bar */}
              <div className="relative mt-4">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="গেম বা সার্ভিস খুঁজুন (যেমন: Free Fire, Weekly, E-Football)..."
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
                {[
                  { id: 'all', label: 'সকল আইটেম' },
                  { id: 'freefire', label: 'Free Fire' },
                  { id: 'efootball', label: 'E-Football' },
                  { id: 'offer', label: 'অফার' },
                  { id: 'social', label: 'সোশ্যাল মিডিয়া' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setMarketplaceFilter(f.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      marketplaceFilter === f.id
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {filteredMarketplaceItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="p-4 rounded-2xl bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:border-orange-500 transition-all cursor-pointer flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 mb-3 group-hover:scale-105 transition-transform">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {item.subtitle || '০-৫ সেকেন্ডে'}
                  </p>
                  <button className="mt-3 w-full py-1.5 px-2 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold text-xs rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-all">
                    টপ-আপ করুন
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Home View (Matching exact user screenshot) */
          <>
            {/* 3. Hero Carousel Banner */}
            <HeroBanner
              onOpenTutorial={() => setShowTutorialModal(true)}
              onScrollToPacks={scrollToPacks}
            />

            {/* 4. Three Badges / Feature Cards */}
            <FeaturesRow />

            {/* 5. Top Up Offer Section */}
            <ItemSection
              title="Top Up Offer"
              items={offerItems}
              onSelect={(item) => setSelectedItem(item)}
            />

            {/* 6. Free Fire Diamond Top Up Section */}
            <ItemSection
              id="free-fire-section"
              title="Free Fire Diamond Top Up"
              items={freeFireItems}
              onSelect={(item) => setSelectedItem(item)}
            />

            {/* 7. E-FOOTBALL Section */}
            <ItemSection
              title="E-FOOTBALL"
              items={efootballItems}
              onSelect={(item) => setSelectedItem(item)}
            />

            {/* 8. SOCIAL MEDIA SERVICE Section */}
            <ItemSection
              title="SOCIAL MEDIA SERVICE"
              items={socialItems}
              onSelect={(item) => setSelectedItem(item)}
            />

            {/* 9. Facebook & Telegram Action Buttons */}
            <CommunityButtons />

            {/* 10. Content Guide / SEO Text Card */}
            <ContentGuide />

            {/* 11. FAQ Accordion Section */}
            <FaqSection />
          </>
        )}
      </main>

      {/* 12. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveTab('marketplace');
          setMarketplaceFilter(cat as any);
        }}
        onOpenTrack={() => setShowOrderTracker(true)}
      />

      {/* Modals */}
      {selectedItem && (
        <TopUpModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {showOrderTracker && (
        <OrderTrackerModal
          orders={orders}
          onClose={() => setShowOrderTracker(false)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showTutorialModal && (
        <TutorialModal
          onClose={() => setShowTutorialModal(false)}
          onStartTopUp={() => {
            const firstFf = GAME_ITEMS.find((i) => i.id === 'ff-topup-bd');
            if (firstFf) setSelectedItem(firstFf);
          }}
        />
      )}
    </div>
  );
}
