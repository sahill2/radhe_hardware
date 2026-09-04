"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { searchProducts as staticSearch } from "../data/products";
import { Search, X, ArrowRight, Sparkles, Loader2 } from "lucide-react";

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  }) {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(query.trim())}&limit=12`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
        } else {
          setResults(staticSearch(query.trim()));
        }
      } catch (err) {
        setResults(staticSearch(query.trim()));
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
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
    { en: "Filter", gu: "ફિલ્ટર" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-[28px] shadow-2xl border border-[#ebebeb] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#ebebeb] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#1E8E3E] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              "પ્રોડક્ટ, સાઈઝ (૭૫mm), પાઈપ, વાલ્વ, સ્પ્રિંકલર શોધો...",
              "Search products, sizes (75mm, 90mm), pipes, valves, sprinklers..."
            )}
            autoFocus
            className="w-full text-sm sm:text-base font-medium text-gray-900 placeholder-gray-400 bg-transparent outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-[#1E8E3E] animate-spin shrink-0" />}
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 text-xs font-semibold cursor-pointer"
            >
              ESC
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-gray-50 border-b border-[#ebebeb] flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-gray-500 shrink-0 font-medium">{t("ઝડપી શોધ:", "Quick:")}</span>
          {quickKeywords.map((kw, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setQuery(kw.en)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#1E8E3E] hover:text-white text-gray-700 border border-gray-200 font-medium transition-colors shrink-0 cursor-pointer text-[11px]"
            >
              {t(kw.gu, kw.en)}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {query.trim().length === 0 ? (
            <div className="py-8 text-center">
              <Sparkles className="w-8 h-8 text-[#1E8E3E] mx-auto mb-2 opacity-60" />
              <p className="text-sm font-semibold text-gray-900">
                {t("શોધવા માટે ટાઈપ કરો", "Type to search full inventory")}
              </p>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                {t(
                  "PVC પાઈપો, સ્પ્રિંકલર ફિટિંગ્સ, ડ્રિપ, વાલ્વ્સ, ફિલ્ટર્સ અને તમામ સાધનો હાજર છે.",
                  "Explore PVC pipes, sprinkler fittings, drip accessories, valves, and filters."
                )}
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {t(`મળેલા પરિણામો (${results.length})`, `Found ${results.length} Products`)}
              </p>
              {results.map((p) => {
                const variants = p.variants || [];
                return (
                  <Link
                    key={p._id || p.id || p.slug}
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50 hover:bg-emerald-50/50 hover:border-emerald-200 border border-transparent transition-all group"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                      <Image
                        src={p.image || "/images/pvc-pipes-category.jpg"}
                        alt={p.nameEn}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate group-hover:text-[#1E8E3E] transition-colors">
                        {t(p.nameGu, p.nameEn)}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {variants.slice(0, 3).map((v: any, idx: number) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white px-2 py-0.5 rounded-full text-gray-700 font-medium border border-gray-200"
                          >
                            {t(v.sizeGu || v.size, v.size)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1E8E3E] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm font-bold text-gray-900">
                {t("કોઈ પરિણામ મળ્યું નથી", "No matching products found")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t(
                  "કૃપા કરીને અલગ શબ્દ અજમાવો અથવા સીધો વોટ્સએપ પર પૂછો.",
                  "Try another keyword or message us directly on WhatsApp."
                )}
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-gray-50 border-t border-[#ebebeb] flex items-center justify-between text-xs text-gray-500">
          <span>{t("રાધે હાર્ડવેર ડિજિટલ કેટલોગ", "Radhe Hardware Digital Catalogue")}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white hover:bg-gray-200 text-gray-900 font-semibold border border-gray-200 cursor-pointer"
          >
            {t("બંધ કરો", "Close")}
          </button>
        </div>
      </div>
    </div>
  );
}
