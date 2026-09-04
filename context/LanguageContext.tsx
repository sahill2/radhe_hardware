"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "gu" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (guText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("gu");

  useEffect(() => {
    const saved = localStorage.getItem("radhe_lang") as Language | null;
    if (saved === "gu" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("radhe_lang", newLang);
  };

  const toggleLang = () => {
    const nextLang = lang === "gu" ? "en" : "gu";
    handleSetLang(nextLang);
  };

  const t = (guText: string, enText: string) => {
    return lang === "gu" ? guText : enText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
