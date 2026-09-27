import React, { useState, useEffect } from 'react';
import { GameItem, TopUpPackage, PaymentMethod, Order, StoreSettings } from '../types/topup';
import { PAYMENT_METHODS } from '../data/topupData';
import { X, Check, Copy, AlertCircle, Sparkles, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface TopUpModalProps {
  item: GameItem | null;
  settings?: StoreSettings;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({ item, settings, onClose, onOrderSuccess }) => {
  if (!item) return null;

  const [selectedPackage, setSelectedPackage] = useState<TopUpPackage>(
    item.packages[0] || { id: 'default', name: 'Standard Pack', price: 50 }
  );
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bkash');
  const [playerId, setPlayerId] = useState('');
  const [isVerifyingUid, setIsVerifyingUid] = useState(false);
  const [verifiedPlayerName, setVerifiedPlayerName] = useState<string | null>(null);
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (item && item.packages.length > 0) {
      setSelectedPackage(item.packages[0]);
    }
    setVerifiedPlayerName(null);
    setErrorMessage('');
    setCompletedOrder(null);
  }, [item]);

  const activeMethodConfig = PAYMENT_METHODS.find((m) => m.id === selectedMethod) || PAYMENT_METHODS[0];

  const getDynamicPaymentNumber = () => {
    if (!settings) return activeMethodConfig.number;
    if (selectedMethod === 'bkash') return settings.bkashNumber || activeMethodConfig.number;
    if (selectedMethod === 'nagad') return settings.nagadNumber || activeMethodConfig.number;
    if (selectedMethod === 'rocket') return settings.rocketNumber || activeMethodConfig.number;
    return activeMethodConfig.number;
  };

  const currentPaymentNumber = getDynamicPaymentNumber();

  const handleVerifyUid = () => {
    if (!playerId.trim()) {
      setErrorMessage('অনুগ্রহ করে প্লেয়ার আইডি (UID) লিখুন');
      return;
    }
    setErrorMessage('');
    setIsVerifyingUid(true);

    setTimeout(() => {
      setIsVerifyingUid(false);
      // Realistic simulated gamer tag generator based on UID
      const names = ['Lewra_GamerBD', 'ThunderStrike_BD', 'Apex_Sniper77', 'ShadowRider_FF', 'BD_Gamer_007'];
      const randomName = names[Math.abs(playerId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % names.length];
      setVerifiedPlayerName(`${randomName} (Level 68 • Server: BD)`);
    }, 600);
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(currentPaymentNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (item.requirePlayerId && !playerId.trim()) {
      setErrorMessage('অনুগ্রহ করে প্লেয়ার আইডি (UID) প্রদান করুন।');
      return;
    }

    if (!senderNumber.trim() || senderNumber.length < 11) {
      setErrorMessage('সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন।');
      return;
    }

    if (!trxId.trim() || trxId.length < 6) {
      setErrorMessage('অনুগ্রহ করে সঠিক Transaction ID (TrxID) প্রদান করুন।');
      return;
    }

    setIsSubmitting(true);

    // Simulate instant 0-5s delivery
    setTimeout(() => {
      const newOrder: Order = {
        id: `LTU-${Math.floor(100000 + Math.random() * 900000)}`,
        itemId: item.id,
        itemTitle: item.title,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        amount: selectedPackage.price,
        playerId: playerId.trim() || 'N/A',
        playerName: verifiedPlayerName || 'BD_Player',
        paymentMethod: selectedMethod,
        senderNumber: senderNumber.trim(),
        trxId: trxId.trim().toUpperCase(),
        status: 'completed',
        createdAt: new Date().toLocaleTimeString('bn-BD', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          day: '2-digit',
          month: 'short'
        })
      };

      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-neutral-900 dark:text-white leading-tight">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {item.subtitle || '০-৫ সেকেন্ডে ইনস্ট্যান্ট ডেলিভারি'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {completedOrder ? (
            /* Order Success Receipt View */
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold mb-2">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  ডেলিভারি সফল • Completed
                </span>
                <h4 className="text-2xl font-black text-neutral-900 dark:text-white">
                  ধন্যবাদ! অর্ডার সম্পন্ন হয়েছে
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-md mx-auto">
                  আপনার ডায়মন্ড বা আইটেম সরাসরি আপনার আইডিতে পাঠিয়ে দেওয়া হয়েছে।
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-neutral-50 dark:bg-neutral-800/80 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-700 text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-neutral-500">Order ID:</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Package:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{completedOrder.packageName}</span>
                </div>
                {completedOrder.playerId !== 'N/A' && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Player UID:</span>
                    <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{completedOrder.playerId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-500">Player Nickname:</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{completedOrder.playerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Payment:</span>
                  <span className="uppercase font-semibold text-neutral-900 dark:text-white">{completedOrder.paymentMethod} (৳{completedOrder.amount})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">TrxID:</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white">{completedOrder.trxId}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700 text-[11px] text-neutral-400">
                  <span>ডেলিভারি সময়:</span>
                  <span>{completedOrder.createdAt}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  আরও টপ-আপ করুন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Step 1: Player ID input */}
              {item.requirePlayerId && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center">১</span>
                      <span>{item.placeholderText || 'আপনার Player ID (UID) দিন'}</span>
                    </label>
                    <span className="text-[11px] text-neutral-400">পাসওয়ার্ডের প্রয়োজন নেই</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={playerId}
                      onChange={(e) => {
                        setPlayerId(e.target.value);
                        setVerifiedPlayerName(null);
                      }}
                      placeholder="e.g. 1928471928"
                      className="flex-1 px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-mono text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyUid}
                      disabled={isVerifyingUid || !playerId.trim()}
                      className="px-4 py-2.5 bg-neutral-800 dark:bg-neutral-700 text-white font-semibold text-xs rounded-xl hover:bg-neutral-900 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50 shrink-0"
                    >
                      {isVerifyingUid ? 'যাচাই হচ্ছে...' : 'যাচাই করুন'}
                    </button>
                  </div>

                  {verifiedPlayerName && (
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>যাচাইকৃত প্লেয়ার: <strong>{verifiedPlayerName}</strong></span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Select Package */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center">২</span>
                  <span>প্যাকেজ নির্বাচন করুন</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {item.packages.map((pkg) => {
                    const isSelected = selectedPackage.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all relative ${
                          isSelected
                            ? 'bg-orange-50/80 dark:bg-orange-950/40 border-orange-500 shadow-sm ring-1 ring-orange-500'
                            : 'bg-white dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 hover:border-orange-300 dark:hover:border-orange-800'
                        }`}
                      >
                        {pkg.tag && (
                          <span className="absolute -top-2 right-2 px-1.5 py-0.2 text-[9px] font-extrabold text-white bg-orange-600 rounded">
                            {pkg.tag}
                          </span>
                        )}

                        <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white leading-tight">
                          {pkg.name}
                        </span>

                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-extrabold text-orange-600 dark:text-orange-400 tabular-nums">
                            ৳{pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-[11px] text-neutral-400 line-through tabular-nums">
                              ৳{pkg.originalPrice}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center">৩</span>
                  <span>পেমেন্ট মেথড নির্বাচন করুন</span>
                </label>

                <div className="grid grid-cols-4 gap-2">
                  {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all ${
                          isSelected
                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-sm'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-750'
                        }`}
                      >
                        {method.name}
                      </button>
                    );
                  })}
                </div>

                {/* Send Money Number & Instruction Box */}
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 rounded-2xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-neutral-300">
                      {activeMethodConfig.name} {activeMethodConfig.type} Number (Send Money):
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-neutral-800 border border-orange-300 dark:border-orange-800 rounded-lg text-orange-600 dark:text-orange-400 font-bold hover:bg-orange-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedNumber ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                    </button>
                  </div>

                  <div className="font-mono text-base sm:text-lg font-black text-neutral-900 dark:text-white tracking-wider">
                    {currentPaymentNumber}
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 leading-normal">
                    {activeMethodConfig.instruction}
                  </p>
                </div>
              </div>

              {/* Step 4: Sender Number & TrxID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    যে নম্বর থেকে টাকা পাঠিয়েছেন (Sender No)
                  </label>
                  <input
                    type="tel"
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm font-mono text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    Transaction ID (TrxID)
                  </label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="e.g. BL924KLM0"
                    className="w-full px-3.5 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm font-mono text-neutral-900 dark:text-white uppercase focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#dc5900] hover:bg-[#c24e00] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-orange-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin" />
                    <span>যাচাই হচ্ছে... ০-৫ সেকেন্ডে ডেলিভারি হচ্ছে</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>অর্ডার নিশ্চিত করুন (টাকা: ৳{selectedPackage.price})</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
