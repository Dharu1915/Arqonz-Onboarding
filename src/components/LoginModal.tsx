import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAutoLoginDemo: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onAutoLoginDemo,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-100 z-10 space-y-5"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#003D40]">
              Existing Members
            </span>
            <h3 className="text-xl font-extrabold text-stone-900">
              Log in to Arqonz Workspace
            </h3>
            <p className="text-xs text-stone-500">
              Access your architectural projects, team permissions, and enterprise hub.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-stone-500 mb-1">
                Corporate Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  placeholder="name@arqonz.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-semibold uppercase text-stone-500">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#003D40] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => {
                onAutoLoginDemo();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-[#003D40] hover:bg-[#002B2D] text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
            >
              <span>Sign In with Arqonz SSO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Demo Switch */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">Need to create an account?</span>
            <button
              onClick={onClose}
              className="font-bold text-[#003D40] hover:underline cursor-pointer"
            >
              Continue Onboarding →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
