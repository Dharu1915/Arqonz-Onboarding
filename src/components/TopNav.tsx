import React from 'react';
import { Sparkles, Play, Pause, RotateCcw, ShieldCheck, ArrowRight, Gauge } from 'lucide-react';

interface TopNavProps {
  currentStep: number;
  totalSteps: number;
  onReset: () => void;
  onAutoFill: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  animationSpeed: number;
  onToggleSpeed: () => void;
  onOpenLoginModal: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentStep,
  totalSteps,
  onReset,
  onAutoFill,
  isAutoPlaying,
  onToggleAutoPlay,
  animationSpeed,
  onToggleSpeed,
  onOpenLoginModal,
}) => {
  return (
    <header className="w-full border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Quick controls & Onboarding mode indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="top-nav-demo-fill-btn"
            onClick={onAutoFill}
            title="Auto-fill with realistic enterprise data"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-[#003D40]/10 hover:text-[#003D40] rounded-full border border-stone-200/90 transition-colors shadow-xs active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#003D40]" />
            <span className="hidden sm:inline">Demo Auto-Fill</span>
            <span className="sm:hidden">Fill</span>
          </button>

          <button
            id="top-nav-autoplay-btn"
            onClick={onToggleAutoPlay}
            title={isAutoPlaying ? 'Pause automatic tour' : 'Play automated walkthrough'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-full border transition-all cursor-pointer ${
              isAutoPlaying
                ? 'bg-[#003D40] text-white border-[#003D40] shadow-sm shadow-[#003D40]/30 animate-pulse'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span className="hidden md:inline">Playing</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span className="hidden md:inline">Auto-Tour</span>
              </>
            )}
          </button>

          <button
            id="top-nav-speed-btn"
            onClick={onToggleSpeed}
            title={`Toggle motion speed: currently ${animationSpeed}x`}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-600 bg-stone-50 hover:bg-stone-100 rounded-full border border-stone-200 transition-colors cursor-pointer"
          >
            <Gauge className="w-3 h-3 text-stone-500" />
            <span>{animationSpeed}x</span>
          </button>

          <button
            id="top-nav-reset-btn"
            onClick={onReset}
            title="Reset onboarding to step 1"
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Arqonz.com Brand Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#003D40] to-[#002628] p-0.5 shadow-md shadow-[#003D40]/25 flex items-center justify-center text-white">
            {/* Architectural Hexagon & Isometric A logo for Arqonz */}
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
              <path d="M12 12v10" stroke="#4ade80" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-stone-900 leading-tight">
              Arqonz<span className="text-[#003D40]">.com</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 hidden sm:block">
              Architecture & SaaS Onboarding
            </span>
          </div>
        </div>

        {/* Right: Outlined Log In Pill Button & Status */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 font-medium mr-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] text-stone-500">Bank-grade TLS 1.3</span>
          </div>

          <button
            id="top-nav-login-btn"
            onClick={onOpenLoginModal}
            className="group relative inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-stone-800 bg-white hover:bg-[#003D40]/5 hover:text-[#003D40] rounded-full border border-stone-300 hover:border-[#003D40] transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
          >
            <span>Log in</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-stone-400 group-hover:text-[#003D40]" />
          </button>
        </div>
      </div>
    </header>
  );
};
