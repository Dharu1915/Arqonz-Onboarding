import React from 'react';
import { MapPin, Building, Check, Sparkles } from 'lucide-react';
import { OnboardingData } from '../../types';

interface Step7AddressProps {
  formData: OnboardingData;
  updateFormData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export const Step7Address: React.FC<Step7AddressProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const quickFillHeadquarters = () => {
    updateFormData({
      streetAddress: '42 Rue du Faubourg Saint-Honoré',
      addressLine2: 'Tech Hub - Floor 4',
      postalCode: '75008',
      city: 'Paris',
      addressCountry: formData.country || 'France',
      isBillingSame: true,
    });
  };

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-0.5">
            Registered Headquarters Domicile
          </label>
          <p className="text-xs text-stone-500">
            Address used on statutory invoices, tax reporting, and corporate certificates.
          </p>
        </div>
        <button
          type="button"
          onClick={quickFillHeadquarters}
          className="text-xs font-semibold text-[#003D40] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Sparkles className="w-3 h-3" />
          <span>Preset HQ</span>
        </button>
      </div>

      {/* Street Address Line 1 */}
      <div>
        <label className="block text-[11px] font-semibold uppercase text-stone-500 mb-1">
          Street Address Line 1
        </label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="address-street-input"
            type="text"
            placeholder="e.g. 42 Rue du Faubourg Saint-Honoré"
            value={formData.streetAddress}
            onChange={(e) => updateFormData({ streetAddress: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all"
          />
        </div>
      </div>

      {/* Line 2 */}
      <div>
        <label className="block text-[11px] font-semibold uppercase text-stone-500 mb-1">
          Apartment, Suite, Unit, or Floor (Optional)
        </label>
        <div className="relative">
          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="address-line2-input"
            type="text"
            placeholder="e.g. Suite 400 - Arqonz Tower"
            value={formData.addressLine2}
            onChange={(e) => updateFormData({ addressLine2: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all"
          />
        </div>
      </div>

      {/* Postal Code & City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold uppercase text-stone-500 mb-1">
            Postal / Zip Code
          </label>
          <input
            id="address-postal-input"
            type="text"
            placeholder="e.g. 75008"
            value={formData.postalCode}
            onChange={(e) => updateFormData({ postalCode: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase text-stone-500 mb-1">
            City / Municipality
          </label>
          <input
            id="address-city-input"
            type="text"
            placeholder="e.g. Paris"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all"
          />
        </div>
      </div>

      {/* Billing checkbox toggle */}
      <label className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200/80 cursor-pointer hover:bg-stone-100/70 transition-colors">
        <input
          type="checkbox"
          checked={formData.isBillingSame}
          onChange={(e) => updateFormData({ isBillingSame: e.target.checked })}
          className="w-4 h-4 rounded text-[#003D40] focus:ring-[#003D40] accent-[#003D40]"
        />
        <div className="text-xs">
          <span className="font-semibold text-stone-900 block">
            Set as primary billing & VAT tax domicile
          </span>
          <span className="text-stone-500 text-[11px]">
            Future invoices and European customer billing will route through this establishment.
          </span>
        </div>
      </label>
    </div>
  );
};
