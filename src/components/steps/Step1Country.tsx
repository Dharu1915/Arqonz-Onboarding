import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Check, Globe2, X, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COUNTRIES } from '../../data/mockData';
import { ExtendedCountryItem } from '../../data/countriesData';
import { OnboardingData } from '../../types';

interface Step1CountryProps {
  formData: OnboardingData;
  updateFormData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const REGIONS = ['All', 'Europe', 'Americas', 'Asia-Pacific', 'Middle East & Africa'];

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export const Step1Country: React.FC<Step1CountryProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Smart multi-criteria search filter with normalized text & ranking
  const filteredCountries = useMemo(() => {
    const rawQuery = searchQuery.trim();
    const cleanQuery = normalizeText(rawQuery);
    const numericQuery = rawQuery.replace(/[^0-9]/g, '');

    return COUNTRIES.filter((c: ExtendedCountryItem) => {
      // 1. Region filter
      if (selectedRegion !== 'All' && c.region !== selectedRegion) {
        return false;
      }

      // If no search query, return all in region
      if (!cleanQuery) return true;

      // 2. Exact / partial match on name
      const normName = normalizeText(c.name);
      if (normName.includes(cleanQuery)) return true;

      // 3. ISO Code match (e.g., 'IN', 'FR', 'US', 'DE', 'GB', 'AE')
      const normCode = normalizeText(c.code);
      if (normCode === cleanQuery || normCode.startsWith(cleanQuery)) return true;

      // 4. ISO-3 Code match (e.g., 'IND', 'FRA', 'USA', 'DEU', 'GBR')
      if (c.iso3 && normalizeText(c.iso3).includes(cleanQuery)) return true;

      // 5. Dial Prefix match (e.g. '+91', '91', '+1', '+44', '+33')
      const cleanPrefix = c.prefix.replace(/[^0-9]/g, '');
      if (c.prefix.toLowerCase().includes(cleanQuery) || (numericQuery && cleanPrefix.includes(numericQuery))) {
        return true;
      }

      // 6. Aliases match (e.g. 'Bharat', 'America', 'UAE', 'Dubai', 'Holland', 'UK', 'Korea')
      if (c.aliases && c.aliases.some((alias) => normalizeText(alias).includes(cleanQuery))) {
        return true;
      }

      // 7. Region name match
      if (c.region && normalizeText(c.region).includes(cleanQuery)) {
        return true;
      }

      return false;
    }).sort((a, b) => {
      if (!cleanQuery) {
        // Default sort: popular first, then alphabetical
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return a.name.localeCompare(b.name);
      }

      const aNorm = normalizeText(a.name);
      const bNorm = normalizeText(b.name);

      // Exact name match first
      if (aNorm === cleanQuery && bNorm !== cleanQuery) return -1;
      if (bNorm === cleanQuery && aNorm !== cleanQuery) return 1;

      // Name starts with query next
      if (aNorm.startsWith(cleanQuery) && !bNorm.startsWith(cleanQuery)) return -1;
      if (bNorm.startsWith(cleanQuery) && !aNorm.startsWith(cleanQuery)) return 1;

      // Exact code match next
      if (normalizeText(a.code) === cleanQuery) return -1;
      if (normalizeText(b.code) === cleanQuery) return 1;

      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedRegion]);

  const handleSelectCountry = (country: ExtendedCountryItem) => {
    updateFormData({
      country: country.name,
      countryCode: country.code,
      countryFlag: country.flag,
      phonePrefix: country.prefix,
      addressCountry: country.name,
    });
  };

  // Keyboard navigation support: Enter selects top match
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredCountries.length > 0) {
      handleSelectCountry(filteredCountries[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Enhanced Search Bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="country-search-input"
            className="block text-[11px] font-bold uppercase tracking-wider text-stone-500"
          >
            Search Jurisdiction Across The Globe
          </label>
          <span className="text-[10px] font-mono text-stone-400">
            {filteredCountries.length} of {COUNTRIES.length} Countries Available
          </span>
        </div>

        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-[#003D40] transition-colors" />
          <input
            ref={inputRef}
            id="country-search-input"
            type="text"
            placeholder="Type country name, code, prefix, or alias (e.g. India, USA, France, +971, UK, Japan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-16 py-2.5 bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-[#003D40] rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003D40]/20 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              id="clear-country-search-btn"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-semibold text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Region Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
        {REGIONS.map((region) => {
          const isActive = selectedRegion === region;
          return (
            <button
              key={region}
              type="button"
              id={`region-filter-${region.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedRegion(region)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#003D40] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
              }`}
            >
              {region}
            </button>
          );
        })}
      </div>

      {/* 3. Frequent / Popular Jurisdictions Shortcuts */}
      {!searchQuery && selectedRegion === 'All' && (
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
            <Sparkles className="w-3 h-3 text-[#003D40]" />
            <span>Frequent Global Hubs</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {COUNTRIES.filter((c) => c.popular).map((country) => {
              const isSelected = formData.country === country.name;
              return (
                <button
                  key={country.code}
                  id={`popular-country-${country.code.toLowerCase()}`}
                  onClick={() => handleSelectCountry(country)}
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#003D40]/10 border-[#003D40] text-[#003D40] font-bold shadow-xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  <span className="text-sm">{country.flag}</span>
                  <span>{country.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#003D40] stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Full Country Grid List */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
          <span>
            {searchQuery ? `Search Results (${filteredCountries.length})` : `All Markets (${filteredCountries.length})`}
          </span>
          {searchQuery && (
            <span className="text-[10px] font-normal text-stone-400">
              Press <kbd className="px-1 py-0.5 bg-stone-100 border border-stone-200 rounded text-[9px] font-mono">Enter</kbd> to select top match
            </span>
          )}
        </div>

        <div
          ref={listContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 select-none focus:outline-none"
        >
          <AnimatePresence mode="popLayout">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = formData.country === country.name;
                return (
                  <motion.div
                    key={country.code}
                    layout
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelectCountry(country)}
                    id={`country-item-${country.code.toLowerCase()}`}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#003D40]/10 border-[#003D40] ring-1 ring-[#003D40] shadow-xs'
                        : 'bg-white border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl flex-shrink-0" role="img" aria-label={country.name}>
                        {country.flag}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-stone-900 truncate">
                          {country.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-mono">
                          <span className="font-semibold text-stone-600">{country.code}</span>
                          <span>·</span>
                          <span>{country.prefix}</span>
                          {country.region && (
                            <>
                              <span>·</span>
                              <span className="text-[9px] text-stone-400 truncate font-sans max-w-[80px]">
                                {country.region}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-[#003D40] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-300 flex-shrink-0" />
                    )}
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-200 p-4">
                <Globe2 className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-stone-700">No country matching "{searchQuery}"</p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Try typing the ISO code (e.g. IN, US, GB), phone prefix (+91, +1), or clear filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRegion('All');
                  }}
                  className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 bg-[#003D40] text-white rounded-lg text-xs font-semibold hover:bg-[#002B2D] transition-colors cursor-pointer"
                >
                  Show All Countries
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 5. Jurisdiction Compliance Banner */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-teal-50/70 border border-teal-200/70 text-stone-800 text-xs">
        <Globe2 className="w-4 h-4 text-[#003D40] flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="leading-snug text-[11px] text-stone-700">
            Selected Market: <strong className="text-stone-900 font-bold">{formData.country}</strong> ({formData.countryCode}, {formData.phonePrefix}).
          </p>
          <p className="text-[10px] text-stone-500">
            Corporate charter templates, SIREN/Tax ID formats, and local currency rules will automatically configure for {formData.country}.
          </p>
        </div>
      </div>
    </div>
  );
};
