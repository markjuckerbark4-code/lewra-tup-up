/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GAME_ITEMS, DEFAULT_CATEGORIES, DEFAULT_STORE_SETTINGS, DEFAULT_ADMIN_PASSWORD } from './data/topupData';
import { GameItem, Order, Category, StoreSettings } from './types/topup';
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
import { AdminPanel } from './components/AdminPanel';
import { Search } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'marketplace' | 'admin'>('home');
  const [selectedItem, setSelectedItem] = useState<GameItem | null>(null);
  const [showOrderTracker, setShowOrderTracker] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; phone?: string } | null>(null);
  const [marketplaceFilter, setMarketplaceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic Stores & Configs backed by LocalStorage
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [items, setItems] = useState<GameItem[]>(GAME_ITEMS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [adminPassword, setAdminPassword] = useState<string>(DEFAULT_ADMIN_PASSWORD);
  const [orders, setOrders] = useState<Order[]>([]);

  // Check URL pathname for /admin or hash on initial load
  useEffect(() => {
    const checkAdminPath = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin/') || hash === '#admin' || hash === '#/admin') {
        setCurrentView('admin');
      } else if (currentView === 'admin' && path !== '/admin' && !hash.includes('admin')) {
        setCurrentView('home');
      }
    };

    checkAdminPath();
    window.addEventListener('popstate', checkAdminPath);
    return () => window.removeEventListener('popstate', checkAdminPath);
  }, []);

  // Sync route navigation
  const navigateTo = (view: 'home' | 'marketplace' | 'admin') => {
    setCurrentView(view);
    if (view === 'admin') {
      window.history.pushState(null, '', '/admin');
    } else {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load state from local storage
  useEffect(() => {
    try {
      const savedCats = localStorage.getItem('lewra_topup_categories');
      if (savedCats) setCategories(JSON.parse(savedCats));

      const savedItems = localStorage.getItem('lewra_topup_items');
      if (savedItems) setItems(JSON.parse(savedItems));

      const savedSettings = localStorage.getItem('lewra_topup_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedPass = localStorage.getItem('lewra_topup_admin_pass');
      if (savedPass) setAdminPassword(savedPass);

      const savedOrders = localStorage.getItem('lewra_topup_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
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
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Update handlers
  const handleUpdateCategories = (newCats: Category[]) => {
    setCategories(newCats);
    localStorage.setItem('lewra_topup_categories', JSON.stringify(newCats));
  };

  const handleUpdateItems = (newItems: GameItem[]) => {
    setItems(newItems);
    localStorage.setItem('lewra_topup_items', JSON.stringify(newItems));
  };

  const handleUpdateSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    localStorage.setItem('lewra_topup_settings', JSON.stringify(newSettings));
  };

  const handleUpdatePassword = (newPass: string) => {
    setAdminPassword(newPass);
    localStorage.setItem('lewra_topup_admin_pass', newPass);
  };

  const handleUpdateOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('lewra_topup_orders', JSON.stringify(newOrders));
  };

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
    const firstCat = categories[1] || categories[0];
    const el = document.getElementById(`section-${firstCat?.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered for Marketplace tab
  const filteredMarketplaceItems = items.filter((item) => {
    const matchesFilter = marketplaceFilter === 'all' || item.category === marketplaceFilter;
    const matchesQuery = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesQuery;
  });

  // If in /admin mode, render Admin Panel directly!
  if (currentView === 'admin') {
    return (
      <AdminPanel
        categories={categories}
        items={items}
        settings={settings}
        orders={orders}
        adminPasswordHash={adminPassword}
        onUpdateCategories={handleUpdateCategories}
        onUpdateItems={handleUpdateItems}
        onUpdateSettings={handleUpdateSettings}
        onUpdatePassword={handleUpdatePassword}
        onUpdateOrders={handleUpdateOrders}
        onExitAdmin={() => navigateTo('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8f9] dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      {/* 1. Top Notice Banner with dynamic text & active state */}
      <NoticeBanner
        text={settings.noticeText}
        active={settings.noticeActive}
      />

      {/* 2. Top Navigation Bar with dynamic store name */}
      <Navbar
        storeName={settings.storeName}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenTrack={() => setShowOrderTracker(true)}
        onOpenAdmin={() => navigateTo('admin')}
        activeTab={currentView}
        onSelectTab={(tab) => navigateTo(tab as any)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 w-full py-4">
        {currentView === 'marketplace' ? (
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

              {/* Dynamic Filter Tabs from categories */}
              <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setMarketplaceFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    marketplaceFilter === 'all'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  সকল আইটেম
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setMarketplaceFilter(c.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      marketplaceFilter === c.id
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {c.name}
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
                  <button className="mt-3 w-full py-1.5 px-2 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold text-xs rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-all cursor-pointer">
                    টপ-আপ করুন
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Home View (Matching exact user design with dynamic items) */
          <>
            {/* 3. Hero Carousel Banner */}
            <HeroBanner
              onOpenTutorial={() => setShowTutorialModal(true)}
              onScrollToPacks={scrollToPacks}
            />

            {/* 4. Three Badges / Feature Cards */}
            <FeaturesRow />

            {/* 5. Dynamically Render Category Sections */}
            {categories.map((cat) => {
              const catItems = items.filter((i) => i.category === cat.id);
              if (catItems.length === 0) return null;
              return (
                <ItemSection
                  key={cat.id}
                  id={`section-${cat.id}`}
                  title={cat.name}
                  items={catItems}
                  onSelect={(item) => setSelectedItem(item)}
                />
              );
            })}

            {/* 6. Dynamic Facebook & Telegram Action Buttons */}
            <CommunityButtons
              facebookLink={settings.facebookLink}
              telegramLink={settings.telegramLink}
            />

            {/* 7. Content Guide / SEO Text Card */}
            <ContentGuide
              storeName={settings.storeName}
              supportPhone={settings.supportPhone}
              whatsappNumber={settings.whatsappNumber}
            />

            {/* 8. FAQ Accordion Section */}
            <FaqSection />
          </>
        )}
      </main>

      {/* 9. Footer with dynamic store props and admin trigger */}
      <Footer
        storeName={settings.storeName}
        supportPhone={settings.supportPhone}
        whatsappNumber={settings.whatsappNumber}
        facebookLink={settings.facebookLink}
        telegramLink={settings.telegramLink}
        onSelectCategory={(cat) => {
          navigateTo('marketplace');
          setMarketplaceFilter(cat);
        }}
        onOpenTrack={() => setShowOrderTracker(true)}
        onOpenAdmin={() => navigateTo('admin')}
      />

      {/* Modals */}
      {selectedItem && (
        <TopUpModal
          item={selectedItem}
          settings={settings}
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
            const firstItem = items[0];
            if (firstItem) setSelectedItem(firstItem);
          }}
        />
      )}
    </div>
  );
}
