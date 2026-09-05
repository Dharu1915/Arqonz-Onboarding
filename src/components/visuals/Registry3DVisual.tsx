import React from 'react';
import { FileCheck, QrCode, Sparkles, CheckCircle2, Shield, Scan } from 'lucide-react';
import { motion } from 'motion/react';
import { OnboardingData } from '../../types';

interface VisualProps {
  formData: OnboardingData;
}

export const Registry3DVisual: React.FC<VisualProps> = ({ formData }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#003D40]/20 to-teal-200/30 blur-2xl animate-pulse" />

      {/* Main Glass Stage */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotateY: [3, -3, 3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-80 sm:w-80 sm:h-88 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl shadow-stone-900/10 p-6 flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Top Status */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-[10px] font-semibold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>INSEE / SIRENE API: CONNECTED</span>
          </div>
          <Scan className="w-3.5 h-3.5 text-[#003D40]" />
        </div>

        {/* 3D Holographic Certificate with Laser Scan Beam */}
        <div className="relative w-full flex items-center justify-center my-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-60 bg-gradient-to-b from-white via-stone-50 to-teal-50/50 rounded-2xl border border-white p-4 shadow-xl shadow-[#003D40]/15 flex flex-col space-y-2.5 overflow-hidden"
          >
            {/* Animated Laser Scanner Line */}
            <motion.div
              animate={{ y: [-10, 120, -10] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#003D40] to-transparent shadow-[0_0_8px_#003D40] z-20"
            />

            {/* Certificate Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-stone-200/80">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#003D40]" />
                <span className="text-[11px] font-bold text-stone-900">Extrait Kbis / SIREN</span>
              </div>
              <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                OFFICIAL
              </span>
            </div>

            {/* Content lines */}
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between text-stone-600">
                <span>Raison Sociale:</span>
                <span className="font-bold text-stone-900 truncate max-w-[120px]">
                  {formData.companyName || 'ARQONZ SAS'}
                </span>
              </div>
              <div className="flex justify-between text-stone-600 font-mono">
                <span>SIREN:</span>
                <span className="font-bold text-[#003D40]">{formData.siren || '892 411 902'}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Code APE:</span>
                <span className="font-semibold text-stone-800">{formData.nafCode?.slice(0, 6) || '62.01Z'}</span>
              </div>
            </div>

            {/* Barcode & Security Hologram */}
            <div className="pt-1 flex items-center justify-between">
              <div className="flex gap-0.5 h-4 items-end">
                {[3, 7, 4, 8, 2, 6, 9, 3, 5, 8, 4, 6].map((h, i) => (
                  <div key={i} className="w-1 bg-stone-700 rounded-xs" style={{ height: `${h * 2}px` }} />
                ))}
              </div>
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#003D40] to-teal-400 flex items-center justify-center text-white text-[8px] font-bold shadow-xs">
                ★
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Status */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-stone-200/70 shadow-md shadow-stone-900/5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-stone-900">Registry Seal Valid</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">RCS_PARIS</span>
        </div>
      </motion.div>
    </div>
  );
};
