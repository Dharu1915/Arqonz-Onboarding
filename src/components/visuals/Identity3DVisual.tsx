import React from 'react';
import { ShieldCheck, Fingerprint, Award, CheckCircle2, User, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';
import { OnboardingData } from '../../types';

interface VisualProps {
  formData: OnboardingData;
}

export const Identity3DVisual: React.FC<VisualProps> = ({ formData }) => {
  const fullName = `${formData.firstName || 'Alexandre'} ${formData.lastName || 'Vance'}`;

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#003D40]/20 to-teal-200/30 blur-2xl animate-pulse" />

      {/* Main Glass Stage */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotateY: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-80 sm:w-80 sm:h-88 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl shadow-stone-900/10 p-6 flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Top Status */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-[10px] font-semibold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#003D40]" />
            <span>ROLE: ROOT_ADMIN</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">SOC2_TYPE_II</span>
        </div>

        {/* 3D Holographic Administrator Badge */}
        <div className="relative w-full flex flex-col items-center justify-center my-auto">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="w-60 bg-gradient-to-br from-white/95 via-stone-50/90 to-teal-50/80 rounded-2xl border border-white p-4 shadow-xl shadow-[#003D40]/15 flex flex-col items-center space-y-3 relative overflow-hidden"
          >
            {/* Holographic light sheen */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br from-[#003D40]/20 to-transparent blur-xl" />

            {/* Avatar & Biometric Ring */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#003D40] to-teal-500 p-0.5 shadow-md flex items-center justify-center text-white">
                <User className="w-7 h-7" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border-2 border-[#003D40]"
              />
            </div>

            {/* Name & Title */}
            <div className="text-center">
              <h4 className="text-sm font-extrabold text-stone-900 truncate max-w-[200px]">
                {fullName}
              </h4>
              <p className="text-[10px] text-stone-500 font-mono">
                ID: ARQ-{Math.abs((formData.firstName || 'A').charCodeAt(0) * 892)}
              </p>
            </div>

            {/* Biometric Scan Line */}
            <div className="w-full bg-stone-100/90 rounded-xl p-2 flex items-center justify-between border border-stone-200/60">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-700">
                <Fingerprint className="w-4 h-4 text-[#003D40]" />
                <span>Biometric Signature</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">VERIFIED</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Tier Status */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-stone-200/70 shadow-md shadow-stone-900/5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-stone-900">Zero-Knowledge Key</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">PBKDF2_HMAC</span>
        </div>
      </motion.div>
    </div>
  );
};
