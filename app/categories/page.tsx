"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileBottomNav from "../../components/MobileBottomNav";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";
import { mainCategories } from "../../data/categories";
import { useLanguage } from "../../context/LanguageContext";
import { ChevronRight, ArrowRight, Sparkles, Layers } from "lucide-react";

export default function CategoriesDirectoryPage() {
  const { t } = useLanguage();
  const [categoriesList, setCategoriesList] = useState<any[]>(() => mainCategories);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          if (data.categories && data.categories.length > 0) {
            setCategoriesList(data.categories);
          }
        }
      } catch (err) {
        console.warn("Using fallback categories:", err);
      }
    };
    fetchCats();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between selection:bg-[#1E8E3E] selection:text-white pb-16 md:pb-0">
      <Header />

      <main className="flex-1 w-full pb-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-6 sm:py-8">
          <div className="max-w-[1240px] mx-auto px-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#1E8E3E] transition-colors">
                {t("હોમ", "Home")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-900 font-semibold">
                {t("તમામ કેટેગરી", "All Categories")}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {t("સંપૂર્ણ કૃષિ અને ઈરીગેશન કેટેગરી ડિરેક્ટરી", "Complete Agriculture & Irrigation Category Directory")}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-2xl">
              {t(
                "૧૨ મુખ્ય કેટેગરી અને તમામ સબકેટેગરીનું સંપૂર્ણ લિસ્ટ. તમારી જરૂરિયાત મુજબ કેટેગરી ખોલો.",
                "Explore all 12 main categories and dozens of subcategories for PVC, sprinklers, drip, and hardware."
              )}
            </p>
          </div>
        </div>

        {/* 12-Category Complete Grid */}
        <div className="max-w-[1240px] mx-auto px-4 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {categoriesList.map((cat) => (
              <div
                key={cat._id || cat.id || cat.slug}
                className="bg-white rounded-[24px] sm:rounded-[28px] p-4 border border-[#ebebeb] shadow-card-dual hover:shadow-card-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="block relative aspect-[16/10] w-full rounded-[18px] overflow-hidden bg-[#f2f4f5] mb-4"
                  >
                    <Image
                      src={cat.image || "/images/pvc-pipes-category.jpg"}
                      alt={cat.nameEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {cat.badgeGu && (
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#1E8E3E] shadow-sm border border-white/60">
                        {t(cat.badgeGu, cat.badgeEn || "")}
                      </div>
                    )}
                  </Link>

                  <Link href={`/category/${cat.slug}`} className="block">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#1E8E3E] transition-colors">
                      {t(cat.nameGu, cat.nameEn)}
                    </h2>
                  </Link>

                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {t(cat.descriptionGu, cat.descriptionEn)}
                  </p>

                  {/* Subcategories list */}
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#ebebeb] space-y-1">
                      <span className="text-[11px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">
                        {t("સબકેટેગરીઝ:", "Subcategories:")}
                      </span>
                      {cat.subcategories.map((sub: any, idx: number) => (
                        <Link
                          key={sub.id || idx}
                          href={`/category/${cat.slug}`}
                          className="flex items-center justify-between py-1 px-2 rounded-xl text-xs text-gray-700 hover:bg-slate-100 hover:text-[#1E8E3E] transition-colors"
                        >
                          <span>{t(sub.nameGu, sub.nameEn)}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#f2f4f5] group-hover:bg-[#1E8E3E] text-gray-900 group-hover:text-white text-xs font-bold transition-all shadow-xs"
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
      <FloatingWhatsApp />
      <MobileBottomNav />
    </div>
  );
}
