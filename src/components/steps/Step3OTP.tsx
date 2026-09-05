import React, { useRef, useEffect, useState } from 'react';
import { KeyRound, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { OnboardingData } from '../../types';

interface Step3OTPProps {
  formData: OnboardingData;
  updateFormData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export const Step3OTP: React.FC<Step3OTPProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const otpArray = formData.otp && formData.otp.length === 6 ? formData.otp : ['', '', '', '', '', ''];

  const handleChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpArray];
    newOtp[index] = cleanValue;
    updateFormData({ otp: newOtp });

    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if fully entered
    if (newOtp.every((digit) => digit !== '')) {
      // Small timeout for user delight before auto-advancing if desired or enabling Next
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter' && isComplete) {
      e.preventDefault();
      onNext();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = [...otpArray];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      updateFormData({ otp: newOtp });
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const fillDemoOtp = () => {
    const demo = ['8', '4', '9', '2', '0', '1'];
    updateFormData({ otp: demo });
    inputRefs.current[5]?.focus();
  };

  const handleResend = () => {
    setTimer(45);
    setCanResend(false);
    updateFormData({ otp: ['', '', '', '', '', ''] });
    inputRefs.current[0]?.focus();
  };

  const isComplete = otpArray.every((d) => d !== '');

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            6-Digit Authorization Passcode
          </label>
          <span className="text-xs text-stone-400">
            Sent to <strong className="text-stone-700">{formData.email || 'your email'}</strong>
          </span>
        </div>

        {/* 6 OTP Input Boxes */}
        <div className="grid grid-cols-6 gap-2 sm:gap-3">
          {otpArray.map((digit, index) => {
            const hasValue = digit !== '';
            return (
              <input
                key={index}
                id={`otp-input-${index}`}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-full h-14 sm:h-16 text-center text-xl sm:text-2xl font-bold font-mono rounded-xl border transition-all ${
                  hasValue
                    ? 'border-[#003D40] bg-[#003D40]/5 text-stone-900 ring-2 ring-[#003D40]/20'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 focus:bg-white focus:border-[#003D40] focus:ring-2 focus:ring-[#003D40]/20 focus:outline-none'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Helper actions: Demo OTP + Resend timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="button"
          id="otp-demo-fill-btn"
          onClick={fillDemoOtp}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#003D40] bg-[#003D40]/10 hover:bg-[#003D40]/20 transition-all border border-[#003D40]/30 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fill Test OTP (849201)</span>
        </button>

        <div className="flex items-center gap-2">
          {canResend ? (
            <button
              type="button"
              id="otp-resend-btn"
              onClick={handleResend}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-[#003D40] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resend Token</span>
            </button>
          ) : (
            <span className="text-xs text-stone-400 font-mono">
              Resend in <strong className="text-stone-600">{timer}s</strong>
            </span>
          )}
        </div>
      </div>

      {/* Live validation feedback */}
      {isComplete && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2.5 text-emerald-800 text-xs animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Passcode verified against temporary cryptographic challenge token.</span>
        </div>
      )}
    </div>
  );
};
