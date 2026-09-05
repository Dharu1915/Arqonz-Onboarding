import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, AlertCircle, AtSign } from 'lucide-react';
import { OnboardingData } from '../../types';

interface Step2EmailProps {
  formData: OnboardingData;
  updateFormData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const COMMON_DOMAINS = ['@arqonz.com', '@gmail.com', '@outlook.com', '@company.com'];

export const Step2Email: React.FC<Step2EmailProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [touched, setTouched] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isEmailValid = isValidEmail(formData.email);

  const handleDomainClick = (domain: string) => {
    const currentPrefix = formData.email.includes('@')
      ? formData.email.split('@')[0]
      : formData.email;
    const finalEmail = (currentPrefix || 'founder') + domain;
    updateFormData({ email: finalEmail });
    setTouched(true);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          Corporate or Founder Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="email-address-input"
            type="email"
            placeholder="e.g. alexandre.vance@arqonz.com"
            value={formData.email}
            onChange={(e) => {
              updateFormData({ email: e.target.value });
              setTouched(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isEmailValid) {
                e.preventDefault();
                onNext();
              }
            }}
            className={`w-full pl-10 pr-10 py-3 bg-stone-50 hover:bg-white focus:bg-white border rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none transition-all ${
              touched && !isEmailValid && formData.email.length > 0
                ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                : isEmailValid
                ? 'border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
                : 'border-stone-200 focus:border-[#003D40] focus:ring-2 focus:ring-[#003D40]/20'
            }`}
          />
          {isEmailValid ? (
            <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
          ) : touched && formData.email.length > 0 ? (
            <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
          ) : null}
        </div>
      </div>

      {/* Suggested Quick Domain Chips */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2 block">
          Quick Domain Shortcuts
        </span>
        <div className="flex flex-wrap gap-2">
          {COMMON_DOMAINS.map((domain) => (
            <button
              key={domain}
              type="button"
              id={`domain-shortcut-${domain.replace(/[@.]/g, '')}`}
              onClick={() => handleDomainClick(domain)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100/80 hover:bg-[#003D40]/10 hover:text-[#003D40] text-stone-700 border border-stone-200 transition-all active:scale-95 cursor-pointer"
            >
              <AtSign className="w-3 h-3 text-stone-400" />
              <span>{domain}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Security & Verification Card */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
          <ShieldCheck className="w-4 h-4 text-[#003D40]" />
          <span>Zero-Spam & Multi-Tenant Isolation</span>
        </div>
        <p className="text-[11px] text-stone-500 leading-relaxed">
          Arqonz.com will dispatch a single-use 6-digit cryptographic verification pass. No unsolicited marketing emails. Your workspace data will be strictly sandboxed in accordance with GDPR & SOC-2 standards.
        </p>
      </div>
    </div>
  );
};
