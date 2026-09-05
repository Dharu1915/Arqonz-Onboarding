import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Rocket, Copy, ArrowRight, RotateCcw, ShieldCheck, CheckCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OnboardingData } from '../types';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  formData: OnboardingData;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  formData,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger multi-stage celebration confetti
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#003D40', '#0A5C60', '#10B981', '#3B82F6', '#F59E0B'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const workspaceSlug = (formData.companyName || 'arqonz-studio')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

  const handleCopyToken = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('arq_live_9941a884f290ceb');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window with Overshoot Scale Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 24,
          }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-100 overflow-hidden z-10 space-y-6"
        >
          {/* Top glowing ambient gradient */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-[#003D40]/20 to-transparent blur-2xl pointer-events-none" />

          {/* Header Icon with Green Checkmark Badge */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="relative">
              {/* Pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-2 rounded-full bg-emerald-500/20"
              />
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#003D40] to-teal-500 text-white flex items-center justify-center shadow-lg shadow-[#003D40]/30">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full inline-block">
                Onboarding Verified
              </span>
              <h2 className="text-2xl font-extrabold text-stone-900">
                Account created successfully!
              </h2>
              <p className="text-xs text-stone-500 max-w-sm">
                Your enterprise workspace instance for{' '}
                <strong className="text-stone-800">
                  {formData.companyName || 'Arqonz Technologies SAS'}
                </strong>{' '}
                has been provisioned and is ready for team collaboration.
              </p>
            </div>
          </div>

          {/* Workspace Details Card */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200/70">
              <span className="text-stone-500">Dedicated Endpoint:</span>
              <span className="font-mono font-bold text-[#003D40]">
                arqonz.com/{workspaceSlug}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="space-y-0.5">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                  Administrator
                </span>
                <span className="font-semibold text-stone-800">
                  {formData.firstName || 'Alexandre'} {formData.lastName || 'Vance'}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                  Entity & SIREN
                </span>
                <span className="font-mono text-stone-800 truncate block">
                  {formData.companyType?.toUpperCase() || 'SAS'} · {formData.siren || '892 411 902'}
                </span>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-medium text-stone-700">
                  Master API Token: <span className="font-mono text-stone-400">arq_live_••••••89a</span>
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyToken}
                className="text-[10px] font-semibold text-[#003D40] hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copied ? <CheckCheck className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <button
              id="success-launch-workspace-btn"
              onClick={onClose}
              className="w-full py-3.5 px-4 rounded-xl bg-[#003D40] hover:bg-[#002B2D] text-white font-bold text-sm shadow-lg shadow-[#003D40]/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>Launch Arqonz.com Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="success-replay-tour-btn"
              onClick={onRestart}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Onboarding Animation Flow</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
