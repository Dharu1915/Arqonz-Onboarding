import React from 'react';
import { Globe, MapPin, Compass, Shield, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { OnboardingData } from '../../types';

interface VisualProps {
  formData: OnboardingData;
}

export const Globe3DVisual: React.FC<VisualProps> = ({ formData }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Outer ambient glow */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#003D40]/20 to-teal-200/30 blur-2xl animate-pulse" />

      {/* 3D Glassmorphic Main Stage */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotateZ: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-80 sm:w-80 sm:h-88 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl shadow-stone-900/10 p-6 flex flex-col items-center justify-between overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top HUD status */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-[10px] font-semibold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#003D40] animate-ping" />
            <span>GEO-NODE: ACTIVE</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-stone-600 bg-white/80 px-2 py-0.5 rounded-md border border-stone-200/60">
            <Compass className="w-3 h-3 text-[#003D40]" />
            <span>EU-WEST-3</span>
          </div>
        </div>

        {/* 3D Central Globe Sphere */}
        <div className="relative w-44 h-44 flex items-center justify-center my-auto">
          {/* Latitude / Longitude Orbital Rings */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#003D40]/30"
          />
          <motion.div
            animate={{ rotateY: 360, rotateX: 60 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute w-40 h-40 rounded-full border border-[#003D40]/40"
          />
          <motion.div
            animate={{ rotateX: 360, rotateY: 45 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute w-36 h-36 rounded-full border border-teal-400/30"
          />

          {/* Central Glass Sphere */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#003D40]/20 via-teal-50/70 to-white/95 shadow-xl shadow-[#003D40]/20 flex items-center justify-center backdrop-blur-md border border-white/90">
            <Globe className="w-16 h-16 text-[#003D40] stroke-[1.2]" />

            {/* Pulsing Target Beacon Pin */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], y: [-2, -8, -2] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 right-6 w-8 h-8 rounded-full bg-[#003D40] text-white flex items-center justify-center shadow-lg shadow-[#003D40]/40 border-2 border-white"
            >
              <MapPin className="w-4 h-4 fill-white" />
            </motion.div>

            {/* Radar Scan Wave */}
            <motion.div
              animate={{ scale: [0.8, 1.6], opacity: [0.8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-[#003D40]"
            />
          </div>
        </div>

        {/* Bottom Floating Jurisdiction Pill */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-stone-200/70 shadow-md shadow-stone-900/5 flex items-center justify-between z-10"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{formData.countryFlag || '🇫🇷'}</span>
            <div>
              <h4 className="text-xs font-bold text-stone-900">{formData.country || 'France'}</h4>
              <p className="text-[10px] text-stone-500 font-mono">
                Code: {formData.countryCode || 'FR'} · Prefix: {formData.phonePrefix || '+33'}
              </p>
            </div>
          </div>
          <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            VALIDATED
          </span>
        </motion.div>
      </motion.div>

      {/* Floating secondary decorative badge */}
      <motion.div
        animate={{ y: [8, -8, 8], x: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-2 -left-2 bg-white/90 backdrop-blur-lg border border-stone-200/70 p-2.5 rounded-2xl shadow-xl shadow-stone-900/10 flex items-center gap-2 text-xs font-semibold text-stone-800 hidden sm:flex"
      >
        <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
          <Shield className="w-3.5 h-3.5" />
        </div>
        <div className="text-[10px]">
          <span className="block font-bold">EU Directive Compliant</span>
          <span className="text-stone-400 font-mono">Article 13 GDPR</span>
        </div>
      </motion.div>
    </div>
  );
};
