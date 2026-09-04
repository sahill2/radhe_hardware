"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { searchProducts, Product } from "../data/products";
import { mainCategories } from "../data/categories";
import { Search, X, ArrowRight, Tag, Sparkles } from "lucide-react";

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      setResults(searchProducts(query));
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickKeywords = [
    { en: "75mm", gu: "૭૫mm" },
    { en: "90mm", gu: "૯૦mm" },
    { en: "PVC Pipe", gu: "PVC પાઈપ" },
    { en: "Sprinkler", gu: "સ્પ્રિંકલર" },
    { en: "Ball Valve", gu: "બોલ વાલ્વ" },
    { en: "Drip", gu: "ડ્રિપ" },
    { en: "Rain Pipe", gu: "રેઈન પાઈપ" },
    { en: "Elbow", gu: "એલ્બો" },
    { en: "Filter", gu: "ફિલ્ટર" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-[28px] shadow-2xl border border-[#ebebeb] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#ebebeb] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#5433eb] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              "પ્રોડક્ટ, સાઈઝ (૭૫mm), પાઈપ, વાલ્વ, સ્પ્રિંકલર શોધો...",
              "Search products, sizes (75mm, 90mm), pipes, valves, sprinklers..."
            )}
            autoFocus
            className="w-full text-base sm:text-lg font-medium text-[#000000] placeholder-[#787574] bg-transparent outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-[#f2f4f5] text-[#787574]"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f2f4f5] text-[#787574] text-xs font-semibold"
            >
              ESC
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-[#f2f4f5] border-b border-[#ebebeb] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#787574] shrink-0 font-medium">{t("ઝડપી શોધ:", "Quick:")}</span>
          {quickKeywords.map((kw, i) => (
            <button
              key={i}
              onClick={() => setQuery(kw.en)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#5433eb] hover:text-white text-[#332f2d] border border-[#ebebeb] font-medium transition-colors shrink-0 cursor-pointer"
            >
              {t(kw.gu, kw.en)}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {query.trim().length === 0 ? (
            <div className="py-8 text-center">
              <Sparkles className="w-8 h-8 text-[#5433eb] mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-[#000000]">
                {t("શોધવા માટે કંઈક ટાઈપ કરો", "Type to search complete catalogue")}
              </p>
              <p className="text-xs text-[#787574] mt-1 max-w-sm mx-auto">
                {t(
                  "PVC પાઈપો, સ્પ્રિંકલર ફિટિંગ્સ, ડ્રિપ, વાલ્વ્સ, ફિલ્ટર્સ અને તમામ સાધનો હાજર છે.",
                  "Explore PVC pipes, sprinkler fittings, drip accessories, valves, and filters."
                )}
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-[#787574] uppercase tracking-wider mb-2">
                {t(`મળેલા પરિણામો (${results.length})`, `Found ${results.length} Products`)}
              </p>
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#f2f4f5] hover:bg-stone-200 transition-colors group"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0">
                    <Image src={p.image} alt={p.nameEn} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#000000] truncate group-hover:text-[#5433eb] transition-colors">
                      {t(p.nameGu, p.nameEn)}
                    </h4>
                    <p className="text-xs text-[#787574] truncate mt-0.5">
                      {t(p.descriptionGu, p.descriptionEn)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {p.variants.slice(0, 3).map((v) => (
                        <span key={v.id} className="text-[10px] bg-white px-2 py-0.5 rounded-full text-[#332f2d] font-medium border border-[#ebebeb]">
                          {t(v.sizeGu || v.size, v.size)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#787574] group-hover:text-[#5433eb] group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm font-bold text-[#000000]">
                {t("કોઈ પરિણામ મળ્યું નથી", "No matching products found")}
              </p>
              <p className="text-xs text-[#787574] mt-1">
                {t(
                  "કૃપા કરીને અલગ શબ્દ અજમાવો અથવા સીધો વોટ્સએપ પર પૂછો.",
                  "Try another keyword or message us directly on WhatsApp."
                )}
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white border-t border-[#ebebeb] flex items-center justify-between text-xs text-[#787574]">
          <span>{t("રાધે હાર્ડવેર ડિજિટલ કેટલોગ", "Radhe Hardware Digital Catalogue")}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#f2f4f5] hover:bg-stone-200 text-[#000000] font-semibold"
          >
            {t("બંધ કરો", "Close")}
          </button>
        </div>
      </div>
    </div>
  );
}
