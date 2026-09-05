import React from 'react';
import { User, Building, MapPin, ShieldCheck, Edit3, CheckCircle2, FileCheck, Check } from 'lucide-react';
import { OnboardingData } from '../../types';

interface Step8ReviewProps {
  formData: OnboardingData;
  updateFormData: (updates: Partial<OnboardingData>) => void;
  onJumpToStep: (stepId: number) => void;
}

export const Step8Review: React.FC<Step8ReviewProps> = ({
  formData,
  updateFormData,
  onJumpToStep,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-0.5">
          Account & Legal Entity Summary
        </label>
        <p className="text-xs text-stone-500">
          Review all parameters before initializing your dedicated Arqonz workspace.
        </p>
      </div>

      {/* Recap Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
        {/* Administrator Profile */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 relative group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <User className="w-3.5 h-3.5 text-[#003D40]" />
              <span>Administrator</span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(4)}
              className="text-[11px] text-[#003D40] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="text-[11px] text-stone-600 space-y-0.5">
            <p className="font-semibold text-stone-900">
              {formData.firstName || 'Alexandre'} {formData.lastName || 'Vance'}
            </p>
            <p className="text-stone-500 truncate">{formData.email || 'alexandre@arqonz.com'}</p>
            <p className="font-mono text-stone-500">
              {formData.phonePrefix || '+33'} {formData.phoneNumber || '6 42 88 19 03'}
            </p>
          </div>
        </div>

        {/* Corporate Structure */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 relative group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <Building className="w-3.5 h-3.5 text-[#003D40]" />
              <span>Corporate Structure</span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(5)}
              className="text-[11px] text-[#003D40] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="text-[11px] text-stone-600 space-y-0.5">
            <p className="font-semibold text-stone-900 uppercase">
              {formData.companyType?.toUpperCase() || 'SAS / SASU'}
            </p>
            <p className="text-stone-500">{formData.companyCategory || 'Simplified Joint-Stock Company'}</p>
            <p className="text-stone-500">
              Jurisdiction: <strong className="text-stone-800">{formData.country}</strong> {formData.countryFlag}
            </p>
          </div>
        </div>

        {/* Registry & SIREN */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 relative group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <FileCheck className="w-3.5 h-3.5 text-[#003D40]" />
              <span>Registry Validation</span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(6)}
              className="text-[11px] text-[#003D40] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="text-[11px] text-stone-600 space-y-0.5">
            <p className="font-semibold text-stone-900 truncate">
              {formData.companyName || 'ARQONZ TECHNOLOGIES SAS'}
            </p>
            <p className="font-mono text-stone-500">SIREN: {formData.siren || '892 411 902'}</p>
            <p className="text-[10px] text-stone-400 truncate">{formData.nafCode || '62.01Z (Architecture & SaaS)'}</p>
          </div>
        </div>

        {/* Headquarters Domicile */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 relative group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <MapPin className="w-3.5 h-3.5 text-[#003D40]" />
              <span>Registered HQ</span>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(7)}
              className="text-[11px] text-[#003D40] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="text-[11px] text-stone-600 space-y-0.5">
            <p className="font-semibold text-stone-900 truncate">
              {formData.streetAddress || '42 Rue du Faubourg Saint-Honoré'}
            </p>
            <p className="text-stone-500">
              {formData.postalCode || '75008'} {formData.city || 'Paris'}, {formData.addressCountry || 'France'}
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-2.5 h-2.5 stroke-[3]" /> Domicile validated
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Terms Checkbox */}
      <div className="space-y-2 pt-1 border-t border-stone-200/80">
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700">
          <input
            id="accept-terms-checkbox"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => updateFormData({ acceptTerms: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded text-[#003D40] focus:ring-[#003D40] accent-[#003D40]"
          />
          <span className="leading-snug">
            I certify that the information provided represents accurate legal corporate parameters and I accept the{' '}
            <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#003D40] underline font-semibold">
              Arqonz.com Master Service Agreement
            </a>{' '}
            and{' '}
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-[#003D40] underline font-semibold">
              European Data Privacy Standards
            </a>.
          </span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-stone-500">
          <input
            id="subscribe-newsletter-checkbox"
            type="checkbox"
            checked={formData.subscribeNewsletter}
            onChange={(e) => updateFormData({ subscribeNewsletter: e.target.checked })}
            className="w-4 h-4 rounded text-[#003D40] focus:ring-[#003D40] accent-[#003D40]"
          />
          <span>Receive product changelog updates and regulatory compliance notices.</span>
        </label>
      </div>
    </div>
  );
};
