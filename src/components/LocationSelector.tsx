"use client";

import { useState, useMemo } from "react";
import { Country, State, City } from "country-state-city";
import { Globe, MapPin, Building2 } from "lucide-react";

// Currency mapping by country ISO code
const currencyMap: Record<string, { symbol: string; code: string }> = {
  US: { symbol: "$", code: "USD" },
  GB: { symbol: "£", code: "GBP" },
  IN: { symbol: "₹", code: "INR" },
  EU: { symbol: "€", code: "EUR" },
  DE: { symbol: "€", code: "EUR" },
  FR: { symbol: "€", code: "EUR" },
  IT: { symbol: "€", code: "EUR" },
  ES: { symbol: "€", code: "EUR" },
  NL: { symbol: "€", code: "EUR" },
  BE: { symbol: "€", code: "EUR" },
  AT: { symbol: "€", code: "EUR" },
  IE: { symbol: "€", code: "EUR" },
  PT: { symbol: "€", code: "EUR" },
  FI: { symbol: "€", code: "EUR" },
  JP: { symbol: "¥", code: "JPY" },
  CN: { symbol: "¥", code: "CNY" },
  AU: { symbol: "A$", code: "AUD" },
  CA: { symbol: "C$", code: "CAD" },
  AE: { symbol: "د.إ", code: "AED" },
  SG: { symbol: "S$", code: "SGD" },
  CH: { symbol: "CHF", code: "CHF" },
  SE: { symbol: "kr", code: "SEK" },
  NO: { symbol: "kr", code: "NOK" },
  DK: { symbol: "kr", code: "DKK" },
  BR: { symbol: "R$", code: "BRL" },
  MX: { symbol: "$", code: "MXN" },
  KR: { symbol: "₩", code: "KRW" },
  ZA: { symbol: "R", code: "ZAR" },
  SA: { symbol: "﷼", code: "SAR" },
  MY: { symbol: "RM", code: "MYR" },
  NZ: { symbol: "NZ$", code: "NZD" },
};

function getCurrency(countryCode: string) {
  return currencyMap[countryCode] || { symbol: "$", code: "USD" };
}

function getBudgetOptions(countryCode: string) {
  const { symbol, code } = getCurrency(countryCode);
  // Adjust amounts based on region
  const isIndia = countryCode === "IN";
  const isAsia = ["IN", "MY", "SG", "JP", "CN", "KR"].includes(countryCode);
  const isEurope = ["GB", "DE", "FR", "IT", "ES", "NL", "BE", "AT", "IE", "PT", "FI", "CH", "SE", "NO", "DK"].includes(countryCode);

  if (isIndia) {
    return [
      `Under ${symbol}5L (${code})`,
      `${symbol}5L - ${symbol}15L (${code})`,
      `${symbol}15L - ${symbol}30L (${code})`,
      `${symbol}30L - ${symbol}75L (${code})`,
      `${symbol}75L+ (${code})`,
      "Not sure yet",
    ];
  }
  if (isAsia) {
    return [
      `Under ${symbol}5K (${code})`,
      `${symbol}5K - ${symbol}15K (${code})`,
      `${symbol}15K - ${symbol}40K (${code})`,
      `${symbol}40K - ${symbol}80K (${code})`,
      `${symbol}80K+ (${code})`,
      "Not sure yet",
    ];
  }
  if (isEurope) {
    return [
      `Under ${symbol}8K (${code})`,
      `${symbol}8K - ${symbol}20K (${code})`,
      `${symbol}20K - ${symbol}50K (${code})`,
      `${symbol}50K - ${symbol}100K (${code})`,
      `${symbol}100K+ (${code})`,
      "Not sure yet",
    ];
  }
  // Default USD-style
  return [
    `Under ${symbol}10K (${code})`,
    `${symbol}10K - ${symbol}25K (${code})`,
    `${symbol}25K - ${symbol}50K (${code})`,
    `${symbol}50K - ${symbol}100K (${code})`,
    `${symbol}100K+ (${code})`,
    "Not sure yet",
  ];
}

interface Props {
  onBudgetOptionsChange?: (options: string[]) => void;
  errors?: { country?: string };
  onClearError?: (field: string) => void;
}

export default function LocationSelector({ onBudgetOptionsChange, errors, onClearError }: Props) {
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [cityName, setCityName] = useState("");

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(() => (countryCode ? State.getStatesOfCountry(countryCode) : []), [countryCode]);
  const cities = useMemo(() => (countryCode && stateCode ? City.getCitiesOfState(countryCode, stateCode) : []), [countryCode, stateCode]);

  function handleCountryChange(code: string) {
    setCountryCode(code);
    setStateCode("");
    setCityName("");
    onClearError?.("country");
    if (code) {
      onBudgetOptionsChange?.(getBudgetOptions(code));
    }
  }

  const inputCls = (hasError?: boolean) =>
    `w-full bg-dark border rounded-lg px-4 py-3 text-dark-heading text-sm focus:outline-none transition-colors placeholder:text-dark-text/40 appearance-none ${
      hasError ? "border-red-400 focus:border-red-400" : "border-dark-border focus:border-brand"
    }`;

  return (
    <div className="grid sm:grid-cols-3 gap-5">
      <div>
        <label htmlFor="loc-country" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
          <Globe size={13} className="text-dark-text" /> Country <span className="text-brand">*</span>
        </label>
        <select
          id="loc-country"
          name="country"
          value={countryCode}
          onChange={(e) => handleCountryChange(e.target.value)}
          className={inputCls(!!errors?.country)}
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
          ))}
        </select>
        {errors?.country && (
          <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
            <span className="w-[11px] h-[11px] rounded-full border border-red-400 flex items-center justify-center text-[8px]">!</span>
            {errors.country}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="loc-state" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
          <MapPin size={13} className="text-dark-text" /> State
        </label>
        <select
          id="loc-state"
          name="state"
          value={stateCode}
          onChange={(e) => { setStateCode(e.target.value); setCityName(""); }}
          disabled={!countryCode || states.length === 0}
          className={inputCls() + " disabled:opacity-40"}
        >
          <option value="">{states.length === 0 ? "N/A" : "Select state"}</option>
          {states.map((s) => (
            <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="loc-city" className="flex items-center gap-1.5 text-sm font-medium text-dark-heading mb-1.5">
          <Building2 size={13} className="text-dark-text" /> City
        </label>
        <select
          id="loc-city"
          name="city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          disabled={!stateCode || cities.length === 0}
          className={inputCls() + " disabled:opacity-40"}
        >
          <option value="">{cities.length === 0 ? "N/A" : "Select city"}</option>
          {cities.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
