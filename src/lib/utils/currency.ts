"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Currency = "INR" | "USD";

// Configurable exchange rate: 1 USD = 86.5 INR
export const USD_TO_INR_RATE = 86.5;

export interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatAmount: (amountInInr: number) => string;
  formatBracket: (bracketInr: string) => string;
  usdRate: number;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  setCurrency: () => {},
  formatAmount: () => "",
  formatBracket: () => "",
  usdRate: USD_TO_INR_RATE,
});

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function convertInrToUsd(inrAmount: number): number {
  return Math.round(inrAmount / USD_TO_INR_RATE);
}

export function convertUsdToInr(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_INR_RATE);
}

// Convert common budget bracket strings
export function formatBudgetBracket(bracket: string, currency: Currency): string {
  if (currency === "INR") {
    // If it already contains ₹, return as is
    if (bracket.includes("₹")) return bracket;
    // If it contains $, convert approx
    if (bracket.includes("$")) {
      return bracket
        .replace(/\$([0-9,]+)/g, (_, val) => {
          const num = parseInt(val.replace(/,/g, ""), 10);
          return formatINR(num * USD_TO_INR_RATE);
        })
        .concat(" (est.)");
    }
    return bracket;
  }

  // Target is USD
  if (bracket.includes("₹")) {
    return bracket
      .replace(/₹([0-9,]+)/g, (_, val) => {
        const num = parseInt(val.replace(/,/g, ""), 10);
        return formatUSD(num / USD_TO_INR_RATE);
      })
      .concat(" (est. equiv.)");
  }

  return bracket;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("the_ground_currency") as Currency | null;
      if (saved === "INR" || saved === "USD") {
        setCurrencyState(saved);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("the_ground_currency", c);
    } catch {
      // safe fallback
    }
  };

  const formatAmount = (amountInInr: number) => {
    if (currency === "INR") {
      return formatINR(amountInInr);
    }
    const inUsd = convertInrToUsd(amountInInr);
    return `${formatUSD(inUsd)} (est.)`;
  };

  const formatBracket = (bracketInr: string) => {
    return formatBudgetBracket(bracketInr, currency);
  };

  return React.createElement(
    CurrencyContext.Provider,
    {
      value: {
        currency,
        setCurrency,
        formatAmount,
        formatBracket,
        usdRate: USD_TO_INR_RATE,
      },
    },
    children
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
