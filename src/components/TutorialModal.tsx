import React from 'react';
import { X, Play, CheckCircle2, Copy, Smartphone, ShieldCheck, Zap } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
  onStartTopUp: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ onClose, onStartTopUp }) => {
  const steps = [
    {
      num: '১',
      title: 'প্লেয়ার আইডি (UID) কপি করুন',
      desc: 'Free Fire গেম ওপেন করে প্রোফাইল থেকে ৮-১০ ডিজিটের Player ID (UID) কপি করুন।',
      icon: Copy
    },
    {
      num: '২',
      title: 'প্যাকেজ নির্বাচন করুন',
      desc: 'Lewra Top Up সাইটে এসে ২৫ ডায়মন্ড থেকে শুরু করে যেকোনো প্যাকেজ সিলেক্ট করুন।',
      icon: Zap
    },
    {
      num: '৩',
      title: 'bKash / Nagad এ Send Money করুন',
      desc: 'আমাদের পার্সোনাল নাম্বারে সঠিক পরিমাণ টাকা Send Money করুন এবং TrxID কপি করে রাখুন।',
      icon: Smartphone
    },
    {
      num: '৪',
      title: 'TrxID সাবমিট করলেই ডায়মন্ড হাজির!',
      desc: 'TrxID দিয়ে কনফার্ম করলেই ০-৫ সেকেন্ডে সরাসরি গেম আইডিতে ডায়মন্ড যোগ হবে।',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-current" />
            <h3 className="font-extrabold text-base sm:text-lg text-neutral-900 dark:text-white">
              কিভাবে ১ সেকেন্ডে টপ-আপ করবেন? (Tutorial)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            {steps.map((st, i) => {
              const IconComp = st.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                    {st.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <IconComp className="w-4 h-4 text-orange-500" />
                      <span>{st.title}</span>
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              কোনো পাসওয়ার্ডের প্রয়োজন নেই। অ্যাকাউন্ট ১০০% সুরক্ষিত থাকবে।
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onStartTopUp();
            }}
            className="w-full py-3 bg-[#dc5900] hover:bg-[#c24e00] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>এখনই শুরু করুন</span>
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
