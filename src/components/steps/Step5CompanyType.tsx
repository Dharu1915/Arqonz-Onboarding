import React from 'react';
import { Building2, Building, UserCheck, Landmark, HeartHandshake, Boxes, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_TYPES } from '../../data/mockData';
import { OnboardingData } from '../../types';

interface Step5CompanyTypeProps {
  formData: OnboardingData;
  updateFormData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export const Step5CompanyType: React.FC<Step5CompanyTypeProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'Building':
        return <Building className="w-5 h-5" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Boxes':
      default:
        return <Boxes className="w-5 h-5" />;
    }
  };

  const handleSelect = (option: typeof COMPANY_TYPES[0]) => {
    updateFormData({
      companyType: option.id,
      companyCategory: option.title,
    });
  };

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
          Select Corporate Entity Archetype
        </label>
        <p className="text-xs text-stone-500">
          This determines your governance templates, capitalization table structure, and statutory VAT schedules.
        </p>
      </div>

      {/* Grid of Company Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
        {COMPANY_TYPES.map((type) => {
          const isSelected = formData.companyType === type.id;

          return (
            <motion.div
              key={type.id}
              id={`company-type-${type.id}`}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => handleSelect(type)}
              className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#003D40]/10 border-[#003D40] ring-1 ring-[#003D40] shadow-sm'
                  : 'bg-white border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/80 shadow-xs'
              }`}
            >
              <div>
                {/* Header with Icon & Check */}
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#003D40] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {getIcon(type.iconName)}
                  </div>

                  {type.tag && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? 'bg-[#003D40]/20 text-[#003D40] border-[#003D40]/40'
                          : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      {type.tag}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-stone-900">{type.title}</h4>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#003D40] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-stone-500">{type.subtitle}</p>
                  <p className="text-[11px] text-stone-600 leading-relaxed pt-1">
                    {type.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
