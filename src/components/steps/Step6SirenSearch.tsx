import React, { useState, useMemo } from 'react';
import { Search, Building, CheckCircle2, FileText, Calendar, MapPin, Sparkles, PlusCircle } from 'lucide-react';
import { MOCK_SIREN_REGISTRY } from '../../data/mockData';
import { OnboardingData, SirenRegistryItem } from '../../types';

interface Step6SirenSearchProps {
  formData: OnboardingData;
  updateFormData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export const Step6SirenSearch: React.FC<Step6SirenSearchProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [query, setQuery] = useState(formData.companyName || formData.siren || '');
  const [manualMode, setManualMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SirenRegistryItem | null>(null);

  const searchResults = useMemo(() => {
    if (!query.trim() || manualMode) return [];
    const q = query.toLowerCase().replace(/\s+/g, '');
    return MOCK_SIREN_REGISTRY.filter((item) => {
      const matchName = item.name.toLowerCase().includes(query.toLowerCase());
      const matchSiren = item.siren.replace(/\s+/g, '').includes(q);
      const matchSiret = item.siret.replace(/\s+/g, '').includes(q);
      return matchName || matchSiren || matchSiret;
    });
  }, [query, manualMode]);

  const handleSelectItem = (item: SirenRegistryItem) => {
    setSelectedItem(item);
    setQuery(item.name);
    updateFormData({
      siren: item.siren,
      companyName: item.name,
      nafCode: `${item.nafCode} (${item.nafLabel})`,
      incorporationDate: item.dateCreated,
      vatNumber: `FR 89 ${item.siren.replace(/\s+/g, '')}`,
      streetAddress: item.address,
      city: item.city,
      postalCode: item.postalCode,
      addressCountry: formData.country || 'France',
    });
  };

  const handleManualFill = () => {
    const defaultItem = MOCK_SIREN_REGISTRY[0];
    handleSelectItem(defaultItem);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            European & SIREN Registry Lookup
          </label>
          <button
            type="button"
            onClick={() => setManualMode(!manualMode)}
            className="text-xs text-[#003D40] hover:underline font-medium cursor-pointer"
          >
            {manualMode ? 'Switch to Registry Autocomplete' : 'Enter Manually / Pre-Registration'}
          </button>
        </div>

        {!manualMode ? (
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="siren-search-input"
              type="text"
              placeholder="Search by Company Name or 9-digit SIREN (e.g. Arqonz, Aurora, 892411902)..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (selectedItem && e.target.value !== selectedItem.name) {
                  setSelectedItem(null);
                }
              }}
              className="w-full pl-10 pr-24 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all"
            />
            <button
              type="button"
              onClick={handleManualFill}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-semibold bg-[#003D40]/10 hover:bg-[#003D40]/20 text-[#003D40] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Sample</span>
            </button>
          </div>
        ) : null}
      </div>

      {/* Autocomplete Results Dropdown */}
      {!manualMode && searchResults.length > 0 && !selectedItem && (
        <div className="p-2 bg-white border border-stone-200 rounded-xl shadow-lg space-y-1 max-h-[190px] overflow-y-auto">
          <span className="text-[10px] uppercase font-bold text-stone-400 px-2 py-1 block">
            Official Registry Matches ({searchResults.length})
          </span>
          {searchResults.map((item) => (
            <button
              key={item.siren}
              type="button"
              onClick={() => handleSelectItem(item)}
              className="w-full text-left p-2.5 rounded-lg hover:bg-stone-50 transition-colors flex items-start justify-between group cursor-pointer border border-transparent hover:border-stone-200"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-900 group-hover:text-[#003D40]">
                    {item.name}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                    VERIFIED
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  SIREN: <span className="font-mono text-stone-700">{item.siren}</span> · {item.city}
                </p>
                <p className="text-[10px] text-stone-400 truncate max-w-xs">{item.nafLabel}</p>
              </div>
              <span className="text-xs text-[#003D40] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Select →
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Selected Verified Company Details Card */}
      {(formData.companyName || formData.siren) && !manualMode && (
        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#003D40]" />
              <span className="text-xs font-bold text-stone-900">{formData.companyName}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              Verified Insee / Registry
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="bg-white p-2 rounded-lg border border-stone-200/80">
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">SIREN Number</span>
              <span className="font-mono font-semibold text-stone-800">{formData.siren || '892 411 902'}</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-stone-200/80">
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">NAF / APE Activity</span>
              <span className="font-semibold text-stone-800 truncate block">{formData.nafCode || '62.01Z'}</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-stone-200/80">
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">VAT Identification</span>
              <span className="font-mono font-semibold text-stone-800">{formData.vatNumber || 'FR 89 892411902'}</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-stone-200/80">
              <span className="text-stone-400 block text-[10px] uppercase font-semibold">Registration Date</span>
              <span className="font-semibold text-stone-800">{formData.incorporationDate || '14/02/2021'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Manual Mode Input Fields */}
      {manualMode && (
        <div className="space-y-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-stone-500 mb-1">
              Company Legal Name
            </label>
            <input
              type="text"
              placeholder="e.g. Arqonz Technologies Inc."
              value={formData.companyName}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-900 focus:outline-none focus:border-[#003D40]"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-stone-500 mb-1">
                SIREN or Registration #
              </label>
              <input
                type="text"
                placeholder="e.g. 892 411 902"
                value={formData.siren}
                onChange={(e) => updateFormData({ siren: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-900 focus:outline-none focus:border-[#003D40]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase text-stone-500 mb-1">
                NAF / Activity Code
              </label>
              <input
                type="text"
                placeholder="e.g. 62.01Z"
                value={formData.nafCode}
                onChange={(e) => updateFormData({ nafCode: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-900 focus:outline-none focus:border-[#003D40]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
