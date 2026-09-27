import React, { useState } from 'react';
import { GameItem, TopUpPackage, Category, StoreSettings, Order } from '../types/topup';
import { 
  Plus, Trash2, Edit3, Save, X, Settings, Layers, DollarSign, 
  ShoppingBag, ExternalLink, KeyRound, Shield, Check, AlertCircle, Eye, EyeOff, Lock
} from 'lucide-react';

interface AdminPanelProps {
  categories: Category[];
  items: GameItem[];
  settings: StoreSettings;
  orders: Order[];
  adminPasswordHash: string;
  onUpdateCategories: (categories: Category[]) => void;
  onUpdateItems: (items: GameItem[]) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
  onUpdatePassword: (newPass: string) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onExitAdmin: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  categories,
  items,
  settings,
  orders,
  adminPasswordHash,
  onUpdateCategories,
  onUpdateItems,
  onUpdateSettings,
  onUpdatePassword,
  onUpdateOrders,
  onExitAdmin,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'categories' | 'packages' | 'store' | 'orders'>('categories');
  const [notification, setNotification] = useState<string | null>(null);

  // New Category State
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Selected Item for Package Management
  const [selectedItemId, setSelectedItemId] = useState<string>(items[0]?.id || '');
  const [showAddPackageModal, setShowAddPackageModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TopUpPackage | null>(null);
  const [packageName, setPackageName] = useState('');
  const [packageDiamonds, setPackageDiamonds] = useState<string>('');
  const [packagePrice, setPackagePrice] = useState<string>('');
  const [packageOriginalPrice, setPackageOriginalPrice] = useState<string>('');
  const [packageTag, setPackageTag] = useState('');

  // New Item State
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemSubtitle, setNewItemSubtitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<string>(categories[0]?.id || 'freefire');
  const [newItemRequiresUid, setNewItemRequiresUid] = useState(true);

  // Store Control Form State
  const [storeForm, setStoreForm] = useState<StoreSettings>({ ...settings });
  
  // Password Change State
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginPass === adminPasswordHash) {
      setIsAuthenticated(true);
      setLoginPass('');
    } else {
      setLoginError('ভুল পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  // 1. Category Actions
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newId = newCategoryName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
    const updated = [...categories, { id: newId, name: newCategoryName.trim() }];
    onUpdateCategories(updated);
    setNewCategoryName('');
    setShowAddCategoryModal(false);
    notify('নতুন ক্যাটাগরি সফলভাবে যুক্ত হয়েছে!');
  };

  const handleDeleteCategory = (catId: string, catName: string) => {
    if (confirm(`আপনি কি নিশ্চিত "${catName}" ক্যাটাগরি ডিলিট করতে চান?`)) {
      const updated = categories.filter((c) => c.id !== catId);
      onUpdateCategories(updated);
      notify(`"${catName}" ক্যাটাগরি মুছে ফেলা হয়েছে!`);
    }
  };

  // 2. Item Actions
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    const newId = `item-${Date.now()}`;
    const newItem: GameItem = {
      id: newId,
      title: newItemTitle.trim(),
      subtitle: newItemSubtitle.trim() || undefined,
      category: newItemCategory,
      image: items[0]?.image || '',
      requirePlayerId: newItemRequiresUid,
      placeholderText: newItemRequiresUid ? 'Player ID (UID)' : 'Account Link / Info',
      packages: [
        { id: `pkg-${Date.now()}-1`, name: 'Standard Pack', price: 50, diamonds: 50 }
      ]
    };
    onUpdateItems([...items, newItem]);
    setNewItemTitle('');
    setNewItemSubtitle('');
    setShowAddItemModal(false);
    notify(`"${newItem.title}" সফলভাবে যোগ করা হয়েছে!`);
  };

  const handleDeleteItem = (itemId: string, title: string) => {
    if (confirm(`আপনি কি "${title}" আইটেমটি মুছে ফেলতে চান?`)) {
      const updated = items.filter((i) => i.id !== itemId);
      onUpdateItems(updated);
      if (selectedItemId === itemId && updated.length > 0) {
        setSelectedItemId(updated[0].id);
      }
      notify(`"${title}" মুছে ফেলা হয়েছে!`);
    }
  };

  // 3. Package Actions
  const currentSelectedItem = items.find((i) => i.id === selectedItemId) || items[0];

  const handleOpenAddPackage = () => {
    setEditingPackage(null);
    setPackageName('');
    setPackageDiamonds('');
    setPackagePrice('');
    setPackageOriginalPrice('');
    setPackageTag('');
    setShowAddPackageModal(true);
  };

  const handleOpenEditPackage = (pkg: TopUpPackage) => {
    setEditingPackage(pkg);
    setPackageName(pkg.name);
    setPackageDiamonds(pkg.diamonds ? String(pkg.diamonds) : '');
    setPackagePrice(String(pkg.price));
    setPackageOriginalPrice(pkg.originalPrice ? String(pkg.originalPrice) : '');
    setPackageTag(pkg.tag || '');
    setShowAddPackageModal(true);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageName.trim() || !packagePrice.trim()) return;

    const priceNum = Number(packagePrice);
    const diamondsNum = packageDiamonds ? Number(packageDiamonds) : undefined;
    const originalPriceNum = packageOriginalPrice ? Number(packageOriginalPrice) : undefined;

    let updatedPackages: TopUpPackage[];

    if (editingPackage) {
      updatedPackages = currentSelectedItem.packages.map((pkg) => {
        if (pkg.id === editingPackage.id) {
          return {
            ...pkg,
            name: packageName.trim(),
            price: priceNum,
            diamonds: diamondsNum,
            originalPrice: originalPriceNum,
            tag: packageTag.trim() || undefined
          };
        }
        return pkg;
      });
      notify('প্যাকেজ আপডেট করা হয়েছে!');
    } else {
      const newPkg: TopUpPackage = {
        id: `pkg-${Date.now()}`,
        name: packageName.trim(),
        price: priceNum,
        diamonds: diamondsNum,
        originalPrice: originalPriceNum,
        tag: packageTag.trim() || undefined
      };
      updatedPackages = [...currentSelectedItem.packages, newPkg];
      notify('নতুন প্যাকেজ যোগ করা হয়েছে!');
    }

    const updatedItems = items.map((it) => {
      if (it.id === currentSelectedItem.id) {
        return { ...it, packages: updatedPackages };
      }
      return it;
    });

    onUpdateItems(updatedItems);
    setShowAddPackageModal(false);
  };

  const handleDeletePackage = (pkgId: string, pkgName: string) => {
    if (confirm(`আপনি কি "${pkgName}" প্যাকেজটি ডিলিট করতে চান?`)) {
      const updatedPackages = currentSelectedItem.packages.filter((p) => p.id !== pkgId);
      const updatedItems = items.map((it) => {
        if (it.id === currentSelectedItem.id) {
          return { ...it, packages: updatedPackages };
        }
        return it;
      });
      onUpdateItems(updatedItems);
      notify(`"${pkgName}" প্যাকেজ ডিলিট হয়েছে!`);
    }
  };

  // 4. Store Settings Actions
  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(storeForm);
    notify('স্টোর সেটিংস সফলভাবে সেভ করা হয়েছে!');
  };

  // 5. Change Password Action
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    if (oldPass !== adminPasswordHash) {
      setPassError('বর্তমান পাসওয়ার্ড সঠিক নয়!');
      return;
    }
    if (!newPass || newPass.length < 6) {
      setPassError('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('নতুন পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }

    onUpdatePassword(newPass);
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
    notify('এডমিন পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
  };

  // 6. Order Status Change
  const handleUpdateOrderStatus = (orderId: string, newStatus: 'completed' | 'processing' | 'failed') => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    onUpdateOrders(updated);
    notify(`অর্ডার ${orderId} স্ট্যাটাস আপডেট হয়েছে!`);
  };

  // ================= LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600" />

          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-orange-600/20 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-orange-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Admin Portal
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              ওয়েবসাইট কনফিগারেশন ও স্টোর ম্যানেজমেন্ট
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                এডমিন পাসওয়ার্ড (Admin Password)
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={loginPass}
                  onChange={(e) => {
                    setLoginPass(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="পাসওয়ার্ড লিখুন"
                  className="w-full pl-4 pr-11 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-mono"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-600/25 active:scale-98 transition-all cursor-pointer"
            >
              লগইন করুন (Access Panel)
            </button>

            <button
              type="button"
              onClick={onExitAdmin}
              className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors block text-center"
            >
              ← ওয়েবসাইটে ফিরে যান (Back to Website)
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= MAIN ADMIN DASHBOARD =================
  return (
    <div className="min-h-screen bg-[#0e1015] text-neutral-200 font-sans flex flex-col">
      {/* Admin Topbar */}
      <header className="sticky top-0 z-30 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-black text-sm">
            LT
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
              <span>{settings.storeName}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-600/30 text-orange-400 border border-orange-500/30">
                Admin Panel
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExitAdmin}
            className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-700 flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ওয়েবসাইটে যান</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-xs font-semibold rounded-lg border border-rose-500/30 transition-all"
          >
            লগআউট
          </button>
        </div>
      </header>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-16 right-4 z-50 bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Subnav / Tabs */}
      <div className="bg-neutral-900/60 border-b border-neutral-800 px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'categories'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>ক্যাটাগরি ও আইটেম</span>
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'packages'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>ডায়মন্ড ও প্যাকেজ লিস্ট</span>
        </button>

        <button
          onClick={() => setActiveTab('store')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'store'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>স্টোর কন্ট্রোল (Store Control)</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'orders'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>অর্ডার ও ট্রানজেকশন ({orders.length})</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* ================= TAB 1: CATEGORIES & ITEMS ================= */}
        {activeTab === 'categories' && (
          <div className="space-y-8">
            {/* Header + Add Category / Add Item */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <h2 className="text-xl font-bold text-white">ক্যাটাগরি ও প্রোডাক্ট আইটেম ম্যানেজমেন্ট</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  হোমপেজের ক্যাটাগরি এবং প্রতিটি ক্যাটাগরির অন্তর্ভুক্ত গেম ও সেবা যোগ/মুছে ফেলুন
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddCategoryModal(true)}
                  className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold rounded-xl border border-neutral-700 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4 text-orange-400" />
                  <span>নতুন ক্যাটাগরি</span>
                </button>
                <button
                  onClick={() => setShowAddItemModal(true)}
                  className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন আইটেম / গেম যোগ</span>
                </button>
              </div>
            </div>

            {/* List Categories with their Items */}
            <div className="space-y-6">
              {categories.map((cat) => {
                const catItems = items.filter((i) => i.category === cat.id);
                return (
                  <div
                    key={cat.id}
                    className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                        <h3 className="font-bold text-base sm:text-lg text-white">
                          {cat.name}
                        </h3>
                        <span className="text-xs text-neutral-500">
                          ({catItems.length} টি আইটেম)
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 rounded-lg transition-colors"
                        title="ক্যাটাগরি ডিলিট করুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Items Grid for this Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {catItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 bg-neutral-850 border border-neutral-750 rounded-xl flex items-center justify-between gap-3 group hover:border-neutral-600 transition-all"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-950 shrink-0 border border-neutral-700">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="overflow-hidden">
                              <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-neutral-400 truncate">
                                {item.packages.length} টি প্যাকেজ
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => {
                                setSelectedItemId(item.id);
                                setActiveTab('packages');
                              }}
                              className="p-1.5 text-neutral-400 hover:text-orange-400 transition-colors"
                              title="প্যাকেজ এডিট করুন"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, item.title)}
                              className="p-1.5 text-neutral-400 hover:text-rose-400 transition-colors"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {catItems.length === 0 && (
                        <div className="col-span-full py-4 text-center text-xs text-neutral-500">
                          এই ক্যাটাগরিতে এখনও কোনো আইটেম যোগ করা হয়নি। উপরের বাটন দিয়ে যোগ করুন।
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: PACKAGES & DIAMONDS ================= */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <h2 className="text-xl font-bold text-white">ডায়মন্ড ও প্যাকেজ লিস্ট এডিটর</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  আইটেম নির্বাচন করে ডায়মন্ড সংখ্যা, দাম এবং ডিসকাউন্ট পরিবর্তন বা নতুন প্যাক যোগ করুন
                </p>
              </div>

              <button
                onClick={handleOpenAddPackage}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ডায়মন্ড / প্যাকেজ যোগ করুন</span>
              </button>
            </div>

            {/* Select Item to Manage */}
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <label className="text-xs font-bold text-neutral-300">
                যে আইটেমের প্যাকেজ এডিট করতে চান নির্বাচন করুন:
              </label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[260px]"
              >
                {items.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.title} ({i.packages.length} Packs)
                  </option>
                ))}
              </select>
            </div>

            {/* Packages Table/Cards */}
            {currentSelectedItem && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-neutral-850 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentSelectedItem.image}
                      alt={currentSelectedItem.title}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <h3 className="font-bold text-sm text-white">
                      {currentSelectedItem.title} — প্যাকেজ তালিকা
                    </h3>
                  </div>
                  <span className="text-xs text-orange-400 font-bold">
                    মোট {currentSelectedItem.packages.length} টি প্যাকেজ
                  </span>
                </div>

                <div className="divide-y divide-neutral-800">
                  {currentSelectedItem.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-850/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{pkg.name}</span>
                          {pkg.tag && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-orange-600/30 text-orange-400 border border-orange-500/30">
                              {pkg.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-neutral-400">
                          {pkg.diamonds && <span>ডায়মন্ড: <strong>{pkg.diamonds}</strong></span>}
                          <span>বিক্রয় মূল্য: <strong className="text-emerald-400">৳{pkg.price}</strong></span>
                          {pkg.originalPrice && <span>আগের মূল্য: <span className="line-through">৳{pkg.originalPrice}</span></span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => handleOpenEditPackage(pkg)}
                          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-orange-400" />
                          <span>এডিট</span>
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                          className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 text-xs font-semibold rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {currentSelectedItem.packages.length === 0 && (
                    <div className="p-8 text-center text-xs text-neutral-500">
                      কোনো প্যাকেজ নেই। নতুন প্যাকেজ যোগ করতে উপরের বাটন চাপুন।
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: STORE CONTROL ================= */}
        {activeTab === 'store' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Store Settings & Links */}
            <div className="space-y-6">
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                  <Settings className="w-5 h-5 text-orange-500" />
                  <h3 className="font-extrabold text-base text-white">স্টোর তথ্য ও কন্ট্রোল</h3>
                </div>

                <form onSubmit={handleSaveStoreSettings} className="space-y-4">
                  {/* Store Name */}
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      স্টোরের নাম (Store Name)
                    </label>
                    <input
                      type="text"
                      value={storeForm.storeName}
                      onChange={(e) => setStoreForm({ ...storeForm, storeName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* Support Phone & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-1">
                        সাপোর্ট নাম্বার (Call Support)
                      </label>
                      <input
                        type="text"
                        value={storeForm.supportPhone}
                        onChange={(e) => setStoreForm({ ...storeForm, supportPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-1">
                        হোয়াটসঅ্যাপ নাম্বার (WhatsApp)
                      </label>
                      <input
                        type="text"
                        value={storeForm.whatsappNumber}
                        onChange={(e) => setStoreForm({ ...storeForm, whatsappNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Send Money Numbers */}
                  <div className="pt-2 border-t border-neutral-800">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-2">
                      মোবাইল ব্যাংকিং Send Money নাম্বার
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">bKash Personal</label>
                        <input
                          type="text"
                          value={storeForm.bkashNumber}
                          onChange={(e) => setStoreForm({ ...storeForm, bkashNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-mono text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Nagad Personal</label>
                        <input
                          type="text"
                          value={storeForm.nagadNumber}
                          onChange={(e) => setStoreForm({ ...storeForm, nagadNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-mono text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Rocket Personal</label>
                        <input
                          type="text"
                          value={storeForm.rocketNumber}
                          onChange={(e) => setStoreForm({ ...storeForm, rocketNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-mono text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Action Links (User explicitly requested!) */}
                  <div className="pt-3 border-t border-neutral-800 space-y-3">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                      সোশ্যাল মিডিয়া বাটন লিংক
                    </span>

                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-1">
                        "Facebook পেইজ ফলো করুন" বাটন লিংক:
                      </label>
                      <input
                        type="url"
                        value={storeForm.facebookLink}
                        onChange={(e) => setStoreForm({ ...storeForm, facebookLink: e.target.value })}
                        placeholder="https://facebook.com/yourpage"
                        className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-1">
                        "Giveaway & Offer — Join Telegram" বাটন লিংক:
                      </label>
                      <input
                        type="url"
                        value={storeForm.telegramLink}
                        onChange={(e) => setStoreForm({ ...storeForm, telegramLink: e.target.value })}
                        placeholder="https://t.me/yourchannel"
                        className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Notice Banner */}
                  <div className="pt-3 border-t border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-300">
                        টপ নোটিশ ব্যানার (Notice Text)
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={storeForm.noticeActive}
                          onChange={(e) => setStoreForm({ ...storeForm, noticeActive: e.target.checked })}
                          className="rounded text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-xs text-neutral-400">চালু রাখুন</span>
                      </label>
                    </div>
                    <textarea
                      value={storeForm.noticeText}
                      onChange={(e) => setStoreForm({ ...storeForm, noticeText: e.target.value })}
                      rows={2}
                      className="w-full px-3.5 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>স্টোর সেটিংস সেভ করুন (Save Changes)</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Change Admin Password */}
            <div className="space-y-6">
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                  <KeyRound className="w-5 h-5 text-orange-500" />
                  <h3 className="font-extrabold text-base text-white">এডমিন লগইন পাসওয়ার্ড পরিবর্তন</h3>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      বর্তমান পাসওয়ার্ড (Current Password)
                    </label>
                    <input
                      type="password"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="বর্তমান পাসওয়ার্ড লিখুন"
                      className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      নতুন পাসওয়ার্ড (New Password)
                    </label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="নতুন পাসওয়ার্ড দিন (কমপক্ষে ৬ অক্ষর)"
                      className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)
                    </label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="পুনরায় নতুন পাসওয়ার্ড লিখুন"
                      className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {passError && (
                    <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{passError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm rounded-xl border border-neutral-700 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-orange-400" />
                    <span>পাসওয়ার্ড আপডেট করুন</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <h2 className="text-xl font-bold text-white">গ্রাহক অর্ডার ও ট্রানজেকশন তালিকা</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  ওয়েবসাইটে প্লেস করা সকল অর্ডারের বিস্তারিত তথ্য ও লাইভ ডেলিভারি স্ট্যাটাস
                </p>
              </div>
              <span className="text-xs font-bold bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300">
                মোট অর্ডার: {orders.length} টি
              </span>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden divide-y divide-neutral-800">
              {orders.map((o) => (
                <div key={o.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-orange-400">{o.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        o.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : o.status === 'processing'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {o.status === 'completed' ? 'ডেলিভারি সম্পন্ন' : o.status === 'processing' ? 'প্রসেসিং' : 'বাতিল'}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-white">
                      {o.itemTitle} — {o.packageName} (টাকা: ৳{o.amount})
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400 pt-1">
                      <span>Player UID: <strong className="text-white font-mono">{o.playerId}</strong></span>
                      <span>মেথড: <strong className="text-white uppercase">{o.paymentMethod}</strong></span>
                      <span>প্রেরক নাম্বার: <strong className="text-white font-mono">{o.senderNumber}</strong></span>
                      <span>TrxID: <strong className="text-white font-mono">{o.trxId}</strong></span>
                      <span>সময়: {o.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={() => handleUpdateOrderStatus(o.id, 'completed')}
                      className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30 transition-colors"
                    >
                      কমপ্লিট
                    </button>
                    <button
                      onClick={() => handleUpdateOrderStatus(o.id, 'processing')}
                      className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/30 transition-colors"
                    >
                      প্রসেসিং
                    </button>
                    <button
                      onClick={() => handleUpdateOrderStatus(o.id, 'failed')}
                      className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-xs font-bold rounded-lg border border-rose-500/30 transition-colors"
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              ))}

              {orders.length === 0 && (
                <div className="p-12 text-center text-xs text-neutral-500">
                  এখনও কোনো অর্ডার আসেনি।
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ================= MODALS ================= */}

      {/* 1. Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-bold text-base text-white">নতুন ক্যাটাগরি তৈরি করুন</h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  ক্যাটাগরির নাম (Category Name)
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="যেমন: PUBG Mobile, Free Fire Indonesia"
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="w-1/3 py-2.5 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl"
                >
                  ক্যাটাগরি যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-bold text-base text-white">নতুন আইটেম / গেম যোগ করুন</h3>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  আইটেমের নাম (Item Title)
                </label>
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="যেমন: Free Fire Indonesia Top Up"
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  সাবটাইটেল / বিবরণ (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={newItemSubtitle}
                  onChange={(e) => setNewItemSubtitle(e.target.value)}
                  placeholder="যেমন: ইন্দোনেশিয়া সার্ভার টপ আপ"
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  ক্যাটাগরি নির্বাচন করুন
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="requireUidCheck"
                  checked={newItemRequiresUid}
                  onChange={(e) => setNewItemRequiresUid(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="requireUidCheck" className="text-xs text-neutral-300 cursor-pointer">
                  প্লেয়ার আইডি (UID) আবশ্যক
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="w-1/3 py-2.5 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl"
                >
                  আইটেম সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add / Edit Package Modal */}
      {showAddPackageModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-bold text-base text-white">
                {editingPackage ? 'প্যাকেজ এডিট করুন' : 'নতুন ডায়মন্ড / প্যাকেজ যোগ করুন'}
              </h3>
              <button
                onClick={() => setShowAddPackageModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  প্যাকেজের নাম (Package Name)
                </label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="যেমন: 115 Diamonds বা Weekly Membership"
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    বিক্রয় মূল্য (Price in ৳)
                  </label>
                  <input
                    type="number"
                    value={packagePrice}
                    onChange={(e) => setPackagePrice(e.target.value)}
                    placeholder="85"
                    className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    ডায়মন্ড সংখ্যা (Diamonds)
                  </label>
                  <input
                    type="number"
                    value={packageDiamonds}
                    onChange={(e) => setPackageDiamonds(e.target.value)}
                    placeholder="115"
                    className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    পূর্বের মূল্য (Original ৳)
                  </label>
                  <input
                    type="number"
                    value={packageOriginalPrice}
                    onChange={(e) => setPackageOriginalPrice(e.target.value)}
                    placeholder="95"
                    className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    ট্যাগ / ব্যাজ (Tag)
                  </label>
                  <input
                    type="text"
                    value={packageTag}
                    onChange={(e) => setPackageTag(e.target.value)}
                    placeholder="যেমন: Hot Deal, Popular"
                    className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPackageModal(false)}
                  className="w-1/3 py-2.5 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl"
                >
                  {editingPackage ? 'আপডেট করুন' : 'প্যাকেজ যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
