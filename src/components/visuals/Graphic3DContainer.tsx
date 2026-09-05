import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OnboardingData, StepInfo } from '../../types';
import { Globe3DVisual } from './Globe3DVisual';
import { Mail3DVisual } from './Mail3DVisual';
import { Keypad3DVisual } from './Keypad3DVisual';
import { Identity3DVisual } from './Identity3DVisual';
import { Company3DVisual } from './Company3DVisual';
import { Registry3DVisual } from './Registry3DVisual';
import { Address3DVisual } from './Address3DVisual';
import { Celebration3DVisual } from './Celebration3DVisual';

interface Graphic3DContainerProps {
  currentStep: number;
  stepInfo: StepInfo;
  formData: OnboardingData;
  direction: number;
}

export const Graphic3DContainer: React.FC<Graphic3DContainerProps> = ({
  currentStep,
  stepInfo,
  formData,
  direction,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Mild tilt for smooth 3D parallax feel
    const factor = 18;
    setRotateX(-y / factor);
    setRotateY(x / factor);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const renderStepVisual = () => {
    switch (currentStep) {
      case 1:
        return <Globe3DVisual formData={formData} />;
      case 2:
        return <Mail3DVisual formData={formData} />;
      case 3:
        return <Keypad3DVisual formData={formData} />;
      case 4:
        return <Identity3DVisual formData={formData} />;
      case 5:
        return <Company3DVisual formData={formData} />;
      case 6:
        return <Registry3DVisual formData={formData} />;
      case 7:
        return <Address3DVisual formData={formData} />;
      case 8:
      default:
        return <Celebration3DVisual formData={formData} />;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[460px] lg:min-h-[560px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#003D40]/5 via-white to-[#003D40]/10 border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between perspective-1000 shadow-xl shadow-stone-900/5 transition-all"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-[#003D40]/15 via-teal-200/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-emerald-100/30 via-teal-50/40 to-transparent blur-2xl pointer-events-none" />

      {/* Subtle background tech grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#003D400A_1px,transparent_1px),linear-gradient(to_bottom,#003D400A_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top Graphic Header HUD */}
      <div className="relative z-20 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#003D40] block">
            Visualization {currentStep}/8
          </span>
          <h3 className="text-base font-extrabold text-stone-900 leading-tight">
            {stepInfo.visualTitle}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/60 text-xs font-semibold text-stone-700 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[11px]">{stepInfo.shortLabel}</span>
        </div>
      </div>

      {/* 3D Dynamic Parallax Stage */}
      <motion.div
        className="relative z-10 w-full flex-1 flex items-center justify-center my-2 transform-style-3d"
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, scale: 0.92, x: direction > 0 ? 40 : -40, rotateY: direction > 0 ? 12 : -12 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: direction > 0 ? -40 : 40, rotateY: direction > 0 ? -12 : 12 }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 26,
            }}
            className="w-full h-full flex items-center justify-center"
          >
            {renderStepVisual()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom Subtitle / Capability Footer */}
      <div className="relative z-20 bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-stone-200/60 shadow-xs flex items-center justify-between text-xs text-stone-600">
        <p className="text-[11px] font-medium text-stone-600 truncate pr-2">
          {stepInfo.visualSubtitle}
        </p>
        <div className="flex items-center gap-1 text-[10px] font-mono text-stone-400 flex-shrink-0">
          <span>ARQONZ_CORE</span>
        </div>
      </div>
    </div>
  );
};
