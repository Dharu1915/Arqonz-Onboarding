import React, { useState } from 'react';
import { Eye, EyeOff, User, Phone, Lock, Check, X } from 'lucide-react';
import { OnboardingData } from '../../types';

interface Step4AccountProps {
  formData: OnboardingData;
  updateFormData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export const Step4Account: React.FC<Step4AccountProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const pwd = formData.password || '';

  const requirements = [
    { label: 'At least 8 characters', met: pwd.length >= 8 },
    { label: 'One uppercase letter (A-Z)', met: /[A-Z]/.test(pwd) },
    { label: 'One number (0-9)', met: /[0-9]/.test(pwd) },
    { label: 'One special symbol (!@#$%^&*)', met: /[^A-Za-z0-9]/.test(pwd) },
  ];

  const metCount = requirements.filter((r) => r.met).length;

  const strengthConfig = [
    { text: 'Too short', color: 'bg-stone-200', textClass: 'text-stone-400' },
    { text: 'Weak', color: 'bg-red-400', textClass: 'text-red-500' },
    { text: 'Fair', color: 'bg-amber-400', textClass: 'text-amber-600' },
    { text: 'Strong', color: 'bg-teal-500', textClass: 'text-teal-600' },
    { text: 'Unbreakable', color: 'bg-emerald-500', textClass: 'text-emerald-600' },
  ];

  const currentStrength = strengthConfig[metCount];

  return (
    <div className="space-y-4">
      {/* Name Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="account-first-name"
              type="text"
              placeholder="e.g. Alexandre"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="account-last-name"
              type="text"
              placeholder="e.g. Vance"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Phone Number with country prefix */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
          Direct Phone Number
        </label>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 select-none">
            <span>{formData.countryFlag || '🇫🇷'}</span>
            <span className="font-mono">{formData.phonePrefix || '+33'}</span>
          </div>
          <div className="relative flex-1">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="account-phone-input"
              type="tel"
              placeholder="6 42 88 19 03"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Password with Strength Meter */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Account Master Password
          </label>
          <span className={`text-xs font-semibold ${currentStrength.textClass}`}>
            {currentStrength.text}
          </span>
        </div>

        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="account-password-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Choose a strong security key..."
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            className="w-full pl-10 pr-10 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Strength Progress Segments */}
        <div className="grid grid-cols-4 gap-1.5 mt-2">
          {[1, 2, 3, 4].map((stepIndex) => (
            <div
              key={stepIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                stepIndex <= metCount ? currentStrength.color : 'bg-stone-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Security Requirements Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-3 rounded-xl bg-stone-50 border border-stone-200/70">
        {requirements.map((req, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px]">
            {req.met ? (
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            ) : (
              <div className="w-3.5 h-3.5 rounded-full bg-stone-200 text-stone-400 flex items-center justify-center flex-shrink-0">
                <X className="w-2.5 h-2.5" />
              </div>
            )}
            <span className={req.met ? 'text-stone-800 font-medium' : 'text-stone-400'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
