import React from 'react';
import { Moon, Sun, User, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAuth: () => void;
  onOpenTrack: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: { name: string; phone?: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenAuth,
  onOpenTrack,
  activeTab,
  onSelectTab,
  currentUser,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-lg tracking-wider">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-white flex items-center gap-1.5 font-sans">
                Lewra <span className="text-orange-600 dark:text-orange-500">TopUp</span>
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'home'
                ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30'
                : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onSelectTab('marketplace')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'marketplace'
                ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30'
                : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={onOpenTrack}
            className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            Track Order
          </button>
          <a
            href="#faq"
            className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User state / Login Button */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200">
                <User className="w-3.5 h-3.5 text-orange-500" />
                <span className="truncate max-w-[120px]">{currentUser.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-red-500 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#dc5900] hover:bg-[#c24e00] active:scale-95 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
