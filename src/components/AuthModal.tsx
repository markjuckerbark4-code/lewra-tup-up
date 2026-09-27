import React, { useState } from 'react';
import { X, User, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: { name: string; phone: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'info' | 'otp'>('info');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 11) {
      setError('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 018XXXXXXXX)');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('অনুগ্রহ করে ৪ ডিজিটের ওটিপি দিন (যেকোনো ৪ সংখ্যা লিখুন)');
      return;
    }
    const finalName = name.trim() || `Gamer_${phone.slice(-4)}`;
    onLoginSuccess({ name: finalName, phone });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h3 className="font-extrabold text-base sm:text-lg text-neutral-900 dark:text-white">
              লগইন / একাউন্ট (Login)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'info' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-neutral-900 dark:text-white">
                  Lewra Top Up এ স্বাগতম
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  সহজে অর্ডার ট্র্যাক ও স্পেশাল ডিসকাউন্ট পেতে লগইন করুন
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-1">
                  আপনার নাম (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-1">
                  মোবাইল নম্বর <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="018XXXXXXXX"
                    className="w-full pl-9 pr-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-mono text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-rose-600 dark:text-rose-400 text-xs font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#dc5900] hover:bg-[#c24e00] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                ওটিপি কোড পাঠান (Get OTP)
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h4 className="font-bold text-neutral-900 dark:text-white">
                  ওটিপি যাচাই করুন
                </h4>
                <p className="text-xs text-neutral-500 mt-1 font-mono">
                  {phone} নম্বরে পাঠানো হয়েছে (ডেমো কোড: 1234)
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-1 text-center">
                  ৪ ডিজিটের কোড লিখুন
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  className="w-full text-center tracking-widest text-lg font-mono font-bold px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                />
              </div>

              {error && (
                <div className="text-rose-600 dark:text-rose-400 text-xs font-medium text-center">
                  {error}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="w-1/3 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold text-xs rounded-xl hover:bg-neutral-200"
                >
                  পিছনে যান
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#dc5900] hover:bg-[#c24e00] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  লগইন সম্পন্ন করুন
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
