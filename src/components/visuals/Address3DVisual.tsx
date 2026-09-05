import React from 'react';
import { MapPin, Navigation, Building, Compass, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { OnboardingData } from '../../types';

interface VisualProps {
  formData: OnboardingData;
}

export const Address3DVisual: React.FC<VisualProps> = ({ formData }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#003D40]/20 to-teal-200/30 blur-2xl animate-pulse" />

      {/* Main Glass Stage */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotateZ: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-80 sm:w-80 sm:h-88 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl shadow-stone-900/10 p-6 flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Top Status */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-[10px] font-semibold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>GEO-RESOLVER: 100% MATCH</span>
          </div>
          <Navigation className="w-3.5 h-3.5 text-[#003D40]" />
        </div>

        {/* 3D Isometric Map Blueprint & Pin */}
        <div className="relative w-full flex flex-col items-center justify-center my-auto">
          <div className="relative w-56 h-36 rounded-2xl bg-gradient-to-tr from-stone-100 to-white border border-white shadow-xl p-3 flex flex-col justify-between overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_14px] opacity-60" />

            {/* Radar wave */}
            <motion.div
              animate={{ scale: [0.5, 2], opacity: [0.8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-[#003D40]"
            />

            {/* Central 3D Pin Beacon */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center">
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-10 h-10 rounded-full bg-[#003D40] text-white flex items-center justify-center shadow-lg shadow-[#003D40]/40 border-2 border-white"
              >
                <Building className="w-5 h-5" />
              </motion.div>
              <div className="w-6 h-2 rounded-full bg-stone-400/30 blur-xs mt-1" />
            </div>

            {/* Coordinates overlay */}
            <div className="relative z-10 bg-white/90 backdrop-blur-xs rounded-lg p-1.5 border border-stone-200/80 flex items-center justify-between text-[9px] font-mono text-stone-600">
              <span>LAT 48.8698° N</span>
              <span>LON 2.3168° E</span>
            </div>
          </div>
        </div>

        {/* Bottom Address Card */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-stone-200/70 shadow-md shadow-stone-900/5 flex items-center justify-between z-10">
          <div className="min-w-0 pr-2">
            <h4 className="text-xs font-bold text-stone-900 truncate">
              {formData.city || 'Paris'}, {formData.postalCode || '75008'}
            </h4>
            <p className="text-[10px] text-stone-500 truncate">
              {formData.streetAddress || '42 Rue du Faubourg Saint-Honoré'}
            </p>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex-shrink-0">
            GEOCODED
          </span>
        </div>
      </motion.div>
    </div>
  );
};
