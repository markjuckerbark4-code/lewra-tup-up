import React, { useState } from 'react';
import { Order } from '../types/topup';
import { X, Search, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface OrderTrackerModalProps {
  orders: Order[];
  onClose: () => void;
  onOpenItemModal?: (itemId: string) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ orders, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      o.id.toLowerCase().includes(q) ||
      o.playerId.toLowerCase().includes(q) ||
      o.trxId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-neutral-900 dark:text-white">
              অর্ডার ট্র্যাকিং ও ইতিহাস (Track Order)
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              আপনার Order ID, Player ID অথবা TrxID দিয়ে স্ট্যাটাস চেক করুন
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearched(true);
                }}
                placeholder="যেমন: LTU-821940 বা Player UID"
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Orders list */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                    {order.id}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ডেলিভারি সম্পন্ন (0-5s)
                  </span>
                </div>

                <div className="font-bold text-neutral-900 dark:text-white text-sm">
                  {order.itemTitle} — {order.packageName}
                </div>

                <div className="grid grid-cols-2 gap-2 text-neutral-600 dark:text-neutral-300 text-xs pt-1 border-t border-neutral-200 dark:border-neutral-700">
                  <div>
                    <span className="text-neutral-400">Player UID:</span>{' '}
                    <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                      {order.playerId}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400">পেমেন্ট:</span>{' '}
                    <span className="font-semibold text-neutral-900 dark:text-white uppercase">
                      {order.paymentMethod} (৳{order.amount})
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400">TrxID:</span>{' '}
                    <span className="font-mono text-neutral-900 dark:text-white">
                      {order.trxId}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400">সময়:</span>{' '}
                    <span>{order.createdAt}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-neutral-500">
              <Clock className="w-10 h-10 mx-auto text-neutral-400 mb-2 opacity-50" />
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {searched ? 'কোনো অর্ডার খুঁজে পাওয়া যায়নি' : 'এখনও কোনো অর্ডার করেননি'}
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                যেকোনো প্যাকেজ সিলেক্ট করে টপ-আপ করলে এখানে দেখতে পাবেন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
