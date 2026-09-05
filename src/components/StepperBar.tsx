import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { STEPS } from '../data/mockData';

interface StepperBarProps {
  currentStep: number;
  onSelectStep: (stepId: number) => void;
  maxStepReached: number;
}

export const StepperBar: React.FC<StepperBarProps> = ({
  currentStep,
  onSelectStep,
  maxStepReached,
}) => {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full bg-white/70 backdrop-blur-sm border-b border-stone-200/70 py-4 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Mobile Mini Stepper Bar */}
        <div className="flex sm:hidden flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-900">
              Step {currentStep} of {STEPS.length}:{' '}
              <span className="text-[#003D40]">{STEPS[currentStep - 1].shortLabel}</span>
            </span>
            <span className="text-stone-400 font-mono text-[11px]">
              {Math.round(progressPercent)}% completed
            </span>
          </div>
          {/* Progress track */}
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#003D40] to-[#005B60]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
          </div>
        </div>

        {/* Desktop & Tablet Full Stepper */}
        <div className="hidden sm:block relative">
          {/* Background Track Line */}
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-stone-200 -z-0" />

          {/* Animated Active Progress Line */}
          <motion.div
            className="absolute top-4 left-4 h-0.5 bg-[#003D40] -z-0 origin-left"
            initial={{ width: 0 }}
            animate={{ width: `calc(${progressPercent}% * 0.94)` }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          />

          {/* Nodes list */}
          <div className="flex items-center justify-between relative z-10">
            {STEPS.map((step) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              const isAccessible = step.id <= maxStepReached || isCompleted || isCurrent;

              return (
                <button
                  key={step.id}
                  id={`stepper-node-${step.id}`}
                  onClick={() => isAccessible && onSelectStep(step.id)}
                  disabled={!isAccessible}
                  className={`flex flex-col items-center group cursor-pointer transition-all ${
                    !isAccessible ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                >
                  {/* Node Circle */}
                  <div className="relative">
                    {/* Pulsing ring for current step */}
                    {isCurrent && (
                      <motion.div
                        layoutId="active-step-ring"
                        className="absolute -inset-1.5 rounded-full border-2 border-[#003D40]/40 bg-[#003D40]/10 animate-pulse"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                          : isCurrent
                          ? 'bg-[#003D40] text-white shadow-md shadow-[#003D40]/30 scale-105'
                          : 'bg-white text-stone-500 border border-stone-300 group-hover:border-stone-400'
                      }`}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </motion.div>
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-2 text-[11px] font-medium tracking-tight whitespace-nowrap transition-colors ${
                      isCurrent
                        ? 'text-stone-900 font-bold'
                        : isCompleted
                        ? 'text-emerald-700 font-medium'
                        : 'text-stone-400 group-hover:text-stone-600'
                    }`}
                  >
                    {step.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
