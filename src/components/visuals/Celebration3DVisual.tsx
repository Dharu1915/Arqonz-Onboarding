import React from 'react';
import { Rocket, Sparkles, ShieldCheck, Zap, Crown, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { OnboardingData } from '../../types';

interface VisualProps {
  formData: OnboardingData;
}

export const Celebration3DVisual: React.FC<VisualProps> = ({ formData }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#003D40]/25 via-teal-300/30 to-emerald-200/30 blur-3xl animate-pulse" />

      {/* Main Glass Stage */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotateZ: [1, -1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-80 sm:w-80 sm:h-88 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl shadow-stone-900/10 p-6 flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Top Status */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-[10px] font-semibold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>DEPLOYMENT: ALL CLEAR</span>
          </div>
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
        </div>

        {/* 3D Golden Launch Key & Rocket Beacon */}
        <div className="relative w-full flex flex-col items-center justify-center my-auto">
          {/* Orbital glowing ring */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute w-44 h-44 rounded-full border-2 border-dashed border-[#003D40]/30"
          />

          {/* Central 3D Launch Emblem */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotateZ: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#003D40] via-teal-600 to-emerald-400 p-1 shadow-2xl shadow-[#003D40]/30 flex items-center justify-center text-white"
          >
            <Rocket className="w-12 h-12 stroke-[2.2] -rotate-45" />
          </motion.div>

          <div className="mt-3 text-center">
            <span className="text-xs font-extrabold text-stone-900 block uppercase tracking-wider">
              {formData.companyName || 'Arqonz Enterprise'}
            </span>
            <span className="text-[10px] font-mono text-stone-500">
              Provisioning Workspace v2.4
            </span>
          </div>
        </div>

        {/* Bottom Status Card */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-stone-200/70 shadow-md shadow-stone-900/5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-stone-900">Ready for Launch</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            100% READY
          </span>
        </div>
      </motion.div>
    </div>
  );
};
