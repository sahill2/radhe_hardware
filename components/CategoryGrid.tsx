"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { mainCategories } from "../data/categories";
import { ArrowRight, ChevronRight, Grid, Sparkles } from "lucide-react";

export default function CategoryGrid() {
  const { lang, t } = useLanguage();

  return (
    <section id="products" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ebebeb] text-[#1E8E3E] text-xs font-semibold mb-2 shadow-xs">
              <Grid className="w-3.5 h-3.5" />
              <span>{t("મુખ્ય પ્રોડક્ટ શ્રેણીઓ", "Core Product Categories")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827]">
              {t("કૃષિ, ઈરીગેશન અને પ્લમ્બિંગ કેટેગરીઝ", "Agriculture, Irrigation & Plumbing Categories")}
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1E8E3E] hover:underline"
          >
            <span>{t("બધી ૧૨ કેટેગરીઝ જુઓ", "Explore All 12 Categories")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Featured Categories Grid on Homepage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCategories.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-[28px] p-3.5 border border-[#ebebeb] shadow-card-dual hover:shadow-card-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Framed Image */}
                <Link href={`/category/${cat.slug}`} className="block relative aspect-[4/3] w-full rounded-[20px] overflow-hidden bg-[#f2f4f5]">
                  <Image
                    src={cat.image}
                    alt={cat.nameEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {cat.badgeGu && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1E8E3E] shadow-sm border border-white/60">
                      {t(cat.badgeGu, cat.badgeEn || "")}
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-3 pt-4">
                  <Link href={`/category/${cat.slug}`} className="block">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#111827] leading-snug group-hover:text-[#1E8E3E] transition-colors">
                      {t(cat.nameGu, cat.nameEn)}
                    </h3>
                  </Link>
                  <p className="mt-1.5 text-[12px] text-[#6b7280] leading-relaxed line-clamp-2">
                    {t(cat.descriptionGu, cat.descriptionEn)}
                  </p>

                  {/* Subcategory Chips Preview */}
                  <div className="mt-3.5 pt-3 border-t border-[#ebebeb] flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[10px] bg-[#f2f4f5] text-[#111827] px-2.5 py-1 rounded-full font-medium"
                      >
                        {t(sub.nameGu, sub.nameEn)}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-[10px] text-[#6b7280] px-1 py-1 font-semibold">
                        +{cat.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Explore Link */}
              <div className="p-3 pt-1">
                <Link
                  href={`/category/${cat.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#f2f4f5] group-hover:bg-[#1E8E3E] text-[#111827] group-hover:text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>{t("પ્રોડક્ટ્સ અને સાઈઝ જુઓ", "View Products & Sizes")}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
