import React from 'react';
import { Mail, Send, ShieldCheck, Sparkles, Key, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { OnboardingData } from '../../types';

interface VisualProps {
  formData: OnboardingData;
}

export const Mail3DVisual: React.FC<VisualProps> = ({ formData }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Background radial glow */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#003D40]/20 to-teal-200/40 blur-2xl animate-pulse" />

      {/* Main Glass Stage */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotateZ: [1, -1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-80 sm:w-80 sm:h-88 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl shadow-stone-900/10 p-6 flex flex-col items-center justify-between overflow-hidden"
      >
        {/* Top Status */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-[10px] font-semibold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>DISPATCH DAEMON: READY</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">TLS_AES_256</span>
        </div>

        {/* 3D Floating Mail Envelope & Dispatch Token */}
        <div className="relative w-full flex items-center justify-center my-auto">
          {/* Animated Envelope Container */}
          <motion.div
            animate={{ rotateY: [-5, 5, -5], rotateX: [3, -3, 3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-56 h-36 rounded-2xl bg-gradient-to-br from-white/95 via-teal-50/80 to-[#003D40]/10 border border-white p-4 shadow-xl shadow-[#003D40]/15 flex flex-col justify-between"
          >
            {/* Top flap shape simulation */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-8 bg-gradient-to-b from-white to-teal-50/40 rounded-t-xl border-t border-x border-white/80 shadow-xs flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#003D40] text-white flex items-center justify-center shadow-md shadow-[#003D40]/30 -mt-2">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Content preview */}
            <div className="pt-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span>To:</span>
                <span className="font-semibold text-stone-800 truncate max-w-[150px]">
                  {formData.email || 'founder@arqonz.com'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-stone-200/70 rounded-full" />
              <div className="w-3/4 h-1.5 bg-stone-200/50 rounded-full" />
            </div>

            {/* Bottom passcode preview pill */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 border border-stone-200/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#003D40]">
                <Key className="w-3 h-3 text-[#003D40]" />
                <span>TOKEN: 849 201</span>
              </div>
              <span className="text-[10px] text-stone-400">10m TTL</span>
            </div>
          </motion.div>

          {/* Flying Dispatch Particles */}
          <motion.div
            animate={{ y: [-15, -45], x: [10, 30], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute top-2 right-4 p-2 rounded-full bg-[#003D40] text-white shadow-lg shadow-[#003D40]/40"
          >
            <Send className="w-3.5 h-3.5 -rotate-45" />
          </motion.div>
        </div>

        {/* Bottom Verification Status */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-stone-200/70 shadow-md shadow-stone-900/5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-teal-50 text-[#003D40] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block">Instant Handshake</span>
              <span className="text-[10px] text-stone-400">DNS & MX Record Checked</span>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-[#003D40]" />
        </div>
      </motion.div>
    </div>
  );
};
