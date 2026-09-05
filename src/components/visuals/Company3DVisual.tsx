import React from 'react';
import { Building2, Layers, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { OnboardingData } from '../../types';

interface VisualProps {
  formData: OnboardingData;
}

export const Company3DVisual: React.FC<VisualProps> = ({ formData }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#003D40]/20 to-teal-200/30 blur-2xl animate-pulse" />

      {/* Main Glass Stage */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotateZ: [1, -1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-80 sm:w-80 sm:h-88 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl shadow-stone-900/10 p-6 flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Top Status */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-[10px] font-semibold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#003D40]" />
            <span>STRUCTURE: {formData.companyType?.toUpperCase() || 'SAS'}</span>
          </div>
          <Layers className="w-3.5 h-3.5 text-[#003D40]" />
        </div>

        {/* 3D Isometric Architectural Structure Towers */}
        <div className="relative w-full flex items-center justify-center my-auto">
          {/* Multi-layered isometric blocks */}
          <div className="relative w-56 h-40 flex items-center justify-center">
            {/* Base block */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-2 w-48 h-12 rounded-2xl bg-gradient-to-r from-stone-200/80 to-stone-300/80 border border-white shadow-lg flex items-center justify-between px-4 text-[10px] font-semibold text-stone-700"
            >
              <span>Legal Foundation</span>
              <span className="font-mono text-[9px] text-stone-500">Tier 0</span>
            </motion.div>

            {/* Middle Corporate block */}
            <motion.div
              animate={{ y: [-4, -8, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="absolute bottom-12 w-40 h-12 rounded-2xl bg-gradient-to-r from-teal-50/90 to-emerald-100/90 border border-white shadow-lg flex items-center justify-between px-3 text-[10px] font-bold text-stone-800"
            >
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#003D40]" />
                <span>Governance & Equity</span>
              </div>
              <span className="font-mono text-[9px] text-[#003D40]">Tier 1</span>
            </motion.div>

            {/* Top Apex Block */}
            <motion.div
              animate={{ y: [-8, -14, -8], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute bottom-22 w-32 h-12 rounded-2xl bg-gradient-to-r from-[#003D40] to-teal-700 text-white border border-white shadow-xl shadow-[#003D40]/30 flex items-center justify-center gap-1.5 px-3 text-xs font-extrabold"
            >
              <Building2 className="w-4 h-4" />
              <span>{formData.companyType?.toUpperCase() || 'SAS'} Entity</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-stone-200/70 shadow-md shadow-stone-900/5 flex items-center justify-between z-10">
          <div>
            <span className="text-xs font-bold text-stone-900 block truncate">
              {formData.companyCategory || 'Simplified Joint-Stock'}
            </span>
            <span className="text-[10px] text-stone-400">Standard French Corporate Charter</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            VALIDATED
          </span>
        </div>
      </motion.div>
    </div>
  );
};
