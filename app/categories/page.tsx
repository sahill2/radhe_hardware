"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileBottomNav from "../../components/MobileBottomNav";
import { mainCategories } from "../../data/categories";
import { useLanguage } from "../../context/LanguageContext";
import { ChevronRight, ArrowRight, Sparkles, Layers } from "lucide-react";

export default function CategoriesDirectoryPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f2f4f5] flex flex-col justify-between">
      <Header />

      <main className="flex-1 w-full pb-16">
        {/* Header */}
        <div className="bg-white border-b border-[#ebebeb] py-8">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex items-center gap-2 text-xs text-[#787574] mb-3">
              <Link href="/" className="hover:text-[#5433eb] transition-colors">
                {t("હોમ", "Home")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#000000] font-semibold">
                {t("તમામ કેટેગરી", "All Categories")}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#000000]">
              {t("સંપૂર્ણ કૃષિ અને ઈરીગેશન કેટેગરી ડિરેક્ટરી", "Complete Agriculture & Irrigation Category Directory")}
            </h1>
            <p className="mt-2 text-sm text-[#787574] max-w-2xl">
              {t(
                "૧૨ મુખ્ય કેટેગરી અને તમામ સબકેટેગરીનું સંપૂર્ણ લિસ્ટ. તમારી જરૂરિયાત મુજબ કેટેગરી ખોલો.",
                "Explore all 12 main categories and dozens of subcategories for PVC, sprinklers, drip, and hardware."
              )}
            </p>
          </div>
        </div>

        {/* 12-Category Complete Grid */}
        <div className="max-w-[1200px] mx-auto px-4 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-[28px] p-4 border border-[#ebebeb] shadow-card-dual hover:shadow-card-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <Link href={`/category/${cat.slug}`} className="block relative aspect-[16/9] w-full rounded-[20px] overflow-hidden bg-[#f2f4f5] mb-4">
                    <Image
                      src={cat.image}
                      alt={cat.nameEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {cat.badgeGu && (
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#5433eb] shadow-sm">
                        {t(cat.badgeGu, cat.badgeEn || "")}
                      </div>
                    )}
                  </Link>

                  <Link href={`/category/${cat.slug}`} className="block">
                    <h2 className="text-lg font-bold text-[#000000] group-hover:text-[#5433eb] transition-colors">
                      {t(cat.nameGu, cat.nameEn)}
                    </h2>
                  </Link>

                  <p className="text-xs text-[#787574] mt-1 line-clamp-2">
                    {t(cat.descriptionGu, cat.descriptionEn)}
                  </p>

                  {/* Subcategories list */}
                  <div className="mt-4 pt-3 border-t border-[#ebebeb] space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#787574] block mb-1">
                      {t("સબકેટેગરીઝ:", "Subcategories:")}
                    </span>
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${cat.slug}`}
                        className="flex items-center justify-between py-1 px-2 rounded-xl text-xs text-[#332f2d] hover:bg-[#f2f4f5] transition-colors"
                      >
                        <span>{t(sub.nameGu, sub.nameEn)}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#787574]" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#f2f4f5] group-hover:bg-[#5433eb] text-[#000000] group-hover:text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>{t("પ્રોડક્ટ્સ જુઓ", "Explore Category")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
