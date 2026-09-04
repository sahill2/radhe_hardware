"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { mainCategories } from "../data/categories";
import { Sparkles, Cylinder, Wrench, Droplets, CloudRain, SlidersHorizontal, Filter } from "lucide-react";

export default function MobileCategoryStrip() {
  const { t } = useLanguage();

  return (
    <div className="sticky top-[58px] sm:top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 py-2 shadow-xs">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          <Link
            href="/categories"
            className="shrink-0 px-3 py-1.5 rounded-full bg-[#1E8E3E] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("તમામ સાધનો", "All Products")}</span>
          </Link>

          {mainCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`#${cat.slug}`}
              className="shrink-0 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-emerald-50 hover:text-[#1E8E3E] text-gray-700 text-xs font-semibold border border-transparent hover:border-emerald-200 transition-all active:scale-95 whitespace-nowrap"
            >
              {t(cat.nameGu, cat.nameEn)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
