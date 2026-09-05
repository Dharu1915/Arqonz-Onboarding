import React from 'react';
import { Lock, Unlock, ShieldAlert, Cpu, Check, Key } from 'lucide-react';
import { motion } from 'motion/react';
import { OnboardingData } from '../../types';

interface VisualProps {
  formData: OnboardingData;
}

export const Keypad3DVisual: React.FC<VisualProps> = ({ formData }) => {
  const isUnlocked = formData.otp.every((d) => d !== '');

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Glow background */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#003D40]/20 via-teal-200/30 to-emerald-200/20 blur-2xl animate-pulse" />

      {/* Main Glass Stage */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-80 sm:w-80 sm:h-88 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl shadow-stone-900/10 p-6 flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Top Status */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-[10px] font-semibold text-stone-700 shadow-xs">
            <span className={`w-2 h-2 rounded-full ${isUnlocked ? 'bg-emerald-500' : 'bg-[#003D40] animate-ping'}`} />
            <span>VAULT STATUS: {isUnlocked ? 'AUTHENTICATED' : 'CHALLENGE'}</span>
          </div>
          <Cpu className="w-3.5 h-3.5 text-[#003D40]" />
        </div>

        {/* 3D Cyber Dial Keypad & Lock */}
        <div className="relative w-full flex flex-col items-center justify-center my-auto">
          {/* Lock Cylinder */}
          <motion.div
            animate={{ scale: isUnlocked ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 shadow-lg ${
              isUnlocked
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-tr from-[#003D40] to-teal-600 text-white shadow-[#003D40]/30'
            }`}
          >
            {isUnlocked ? (
              <Unlock className="w-8 h-8 stroke-[2.2]" />
            ) : (
              <Lock className="w-8 h-8 stroke-[2.2]" />
            )}
          </motion.div>

          {/* Keypad Grid Simulation */}
          <div className="grid grid-cols-3 gap-2 w-48 bg-white/70 backdrop-blur-md p-2.5 rounded-2xl border border-stone-200/60 shadow-md">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num, i) => {
              const isFilled = formData.otp[i % 6] !== '';
              return (
                <motion.div
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  className={`h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    isFilled
                      ? 'bg-[#003D40] text-white shadow-xs'
                      : 'bg-white/90 text-stone-700 border border-stone-200/60'
                  }`}
                >
                  {num}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Hash Token */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-stone-200/70 shadow-md shadow-stone-900/5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#003D40]" />
            <div className="text-[10px] font-mono text-stone-600">
              HASH: SHA256_ARQONZ_0x9B81
            </div>
          </div>
          {isUnlocked && (
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              PASSED
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};
