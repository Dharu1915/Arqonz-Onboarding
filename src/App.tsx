import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles, Shield, Rocket } from 'lucide-react';
import { TopNav } from './components/TopNav';
import { StepperBar } from './components/StepperBar';
import { Graphic3DContainer } from './components/visuals/Graphic3DContainer';
import { SuccessModal } from './components/SuccessModal';
import { LoginModal } from './components/LoginModal';
import { Step1Country } from './components/steps/Step1Country';
import { Step2Email } from './components/steps/Step2Email';
import { Step3OTP } from './components/steps/Step3OTP';
import { Step4Account } from './components/steps/Step4Account';
import { Step5CompanyType } from './components/steps/Step5CompanyType';
import { Step6SirenSearch } from './components/steps/Step6SirenSearch';
import { Step7Address } from './components/steps/Step7Address';
import { Step8Review } from './components/steps/Step8Review';
import { STEPS, INITIAL_FORM_DATA, DEMO_PREFILL_DATA } from './data/mockData';
import { OnboardingData } from './types';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [formData, setFormData] = useState<OnboardingData>(INITIAL_FORM_DATA);
  const [maxStepReached, setMaxStepReached] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateFormData = (updates: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  // Step navigation
  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setDirection(1);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxStepReached((prev) => Math.max(prev, nextStep));
    } else {
      // Final Submit state: Centered minimalist spinner animation -> Pop-in success modal
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSelectStep = (stepId: number) => {
    setDirection(stepId > currentStep ? 1 : -1);
    setCurrentStep(stepId);
    setMaxStepReached((prev) => Math.max(prev, stepId));
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    // Mimic enterprise sandbox provisioning delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessOpen(true);
      if (isAutoPlaying) setIsAutoPlaying(false);
    }, 1200 / animationSpeed);
  };

  const handleAutoFill = () => {
    setFormData(DEMO_PREFILL_DATA);
    setMaxStepReached(8);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setMaxStepReached(1);
    setIsAutoPlaying(false);
    setIsSuccessOpen(false);
  };

  const toggleAutoPlay = () => {
    if (!isAutoPlaying) {
      // If at last step or empty data, auto-fill demo for a smooth tour
      if (formData.email === '') {
        handleAutoFill();
      }
      setIsAutoPlaying(true);
    } else {
      setIsAutoPlaying(false);
    }
  };

  const toggleAnimationSpeed = () => {
    setAnimationSpeed((prev) => (prev === 1 ? 0.5 : prev === 0.5 ? 2 : 1));
  };

  // Auto-play walkthrough effect
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setTimeout(() => {
        if (currentStep < STEPS.length) {
          handleNext();
        } else {
          handleFinalSubmit();
          setIsAutoPlaying(false);
        }
      }, 3500 / animationSpeed);
    } else if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, currentStep, animationSpeed]);

  const activeStepInfo = STEPS[currentStep - 1];

  // Validation logic per step to enable/disable Next button
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!formData.country;
      case 2:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 3:
        return formData.otp && formData.otp.every((d) => d !== '');
      case 4:
        return (
          formData.firstName.trim().length > 0 &&
          formData.lastName.trim().length > 0 &&
          formData.password.length >= 6
        );
      case 5:
        return !!formData.companyType;
      case 6:
        return !!formData.companyName || !!formData.siren;
      case 7:
        return !!formData.streetAddress || !!formData.city;
      case 8:
        return formData.acceptTerms;
      default:
        return true;
    }
  };

  // Render current form step component
  const renderCurrentFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Country
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2Email
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <Step3OTP
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <Step4Account
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 5:
        return (
          <Step5CompanyType
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 6:
        return (
          <Step6SirenSearch
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 7:
        return (
          <Step7Address
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 8:
      default:
        return (
          <Step8Review
            formData={formData}
            updateFormData={updateFormData}
            onJumpToStep={handleSelectStep}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0F172A] selection:bg-[#003D40]/20 selection:text-[#003D40]">
      {/* 1. Top Navigation Bar */}
      <TopNav
        currentStep={currentStep}
        totalSteps={STEPS.length}
        onReset={handleReset}
        onAutoFill={handleAutoFill}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={toggleAutoPlay}
        animationSpeed={animationSpeed}
        onToggleSpeed={toggleAnimationSpeed}
        onOpenLoginModal={() => setIsLoginOpen(true)}
      />

      {/* 2. Top Stepper Bar */}
      <StepperBar
        currentStep={currentStep}
        onSelectStep={handleSelectStep}
        maxStepReached={maxStepReached}
      />

      {/* 3. Main Composition: 2 Columns (Form Left, 3D Visual Right) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT COLUMN: Main Form Card with smooth horizontal transitions */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl shadow-stone-900/5 border border-stone-200/80 flex flex-col justify-between flex-1 relative overflow-hidden">
              {/* Subtle top brand glow */}
              <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#003D40]/10 blur-2xl pointer-events-none" />

              <div>
                {/* Step Header */}
                <div className="mb-6 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#003D40] bg-[#003D40]/10 px-2.5 py-0.5 rounded-full inline-block">
                      Step 0{currentStep} of 0{STEPS.length}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      · {activeStepInfo.shortLabel}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug">
                    {activeStepInfo.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-xl">
                    {activeStepInfo.subtitle}
                  </p>
                </div>

                {/* Animated Form Step Transition: Horizontal slide + fade */}
                <div className="relative min-h-[300px] overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      initial={{
                        opacity: 0,
                        x: direction > 0 ? 30 : -30,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: direction > 0 ? -30 : 30,
                      }}
                      transition={{
                        duration: 0.35 / animationSpeed,
                        ease: [0.25, 1, 0.5, 1], // Smooth cubic-bezier spring easing
                      }}
                      className="w-full"
                    >
                      {renderCurrentFormStep()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom CTA Action Bar */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between gap-3">
                {/* Back Button */}
                {currentStep > 1 ? (
                  <button
                    id="form-back-button"
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-stone-400 text-xs font-medium">
                    <Shield className="w-3.5 h-3.5 text-[#003D40]" />
                    <span>Encrypted Connection</span>
                  </div>
                )}

                {/* Next / Submit CTA with press scale-down & hover shadow */}
                <div className="flex items-center gap-2">
                  <button
                    id="form-next-button"
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid() || isSubmitting}
                    className={`relative group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                      !isStepValid()
                        ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
                        : 'bg-[#003D40] hover:bg-[#002B2D] hover:shadow-lg hover:shadow-[#003D40]/25'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Provisioning Arqonz Instance...</span>
                      </>
                    ) : currentStep === STEPS.length ? (
                      <>
                        <Rocket className="w-4 h-4" />
                        <span>Complete & Launch Arqonz</span>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Interactive Graphic with floating cards & parallax */}
          <div className="lg:col-span-5 flex flex-col">
            <Graphic3DContainer
              currentStep={currentStep}
              stepInfo={activeStepInfo}
              formData={formData}
              direction={direction}
            />
          </div>
        </div>
      </main>

      {/* Footer subtle brand notes */}
      <footer className="w-full border-t border-stone-200/60 py-4 px-6 text-center text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Arqonz.com Enterprise Cloud © 2026</span>
          <div className="flex items-center gap-4 text-[11px] text-stone-500">
            <span>SOC 2 Type II Certified</span>
            <span>·</span>
            <span>GDPR Data Resiliency</span>
            <span>·</span>
            <span>ISO/IEC 27001</span>
          </div>
        </div>
      </footer>

      {/* Success Celebration Modal with Overshoot Animation */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onRestart={handleReset}
        formData={formData}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onAutoLoginDemo={handleAutoFill}
      />
    </div>
  );
}
