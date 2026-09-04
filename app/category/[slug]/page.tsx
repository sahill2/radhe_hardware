"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MobileBottomNav from "../../../components/MobileBottomNav";
import ProductCard from "../../../components/ProductCard";
import { mainCategories } from "../../../data/categories";
import { getProductsByCategory, products } from "../../../data/products";
import { useLanguage } from "../../../context/LanguageContext";
import { siteContent } from "../../../data/content";
import {
  ArrowLeft,
  Filter,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang, t } = useLanguage();

  const category = mainCategories.find((c) => c.slug === slug);
  const rawProducts = useMemo(() => getProductsByCategory(slug), [slug]);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Extract all unique sizes available in this category
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    rawProducts.forEach((p) => {
      p.variants.forEach((v) => sizeSet.add(v.size));
    });
    return Array.from(sizeSet);
  }, [rawProducts]);

  // Filtered product list
  const filteredProducts = useMemo(() => {
    return rawProducts.filter((p) => {
      // Subcategory filter
      if (selectedSubcategory !== "all" && p.subcategory !== selectedSubcategory) {
        return false;
      }
      // Size filter
      if (selectedSize !== "all") {
        const hasSize = p.variants.some((v) => v.size === selectedSize);
        if (!hasSize) return false;
      }
      // Text search
      if (searchFilter.trim() !== "") {
        const q = searchFilter.toLowerCase();
        const matchName =
          p.nameEn.toLowerCase().includes(q) ||
          p.nameGu.toLowerCase().includes(q) ||
          p.descriptionEn.toLowerCase().includes(q) ||
          p.descriptionGu.toLowerCase().includes(q) ||
          p.variants.some((v) => v.size.toLowerCase().includes(q));
        if (!matchName) return false;
      }
      return true;
    });
  }, [rawProducts, selectedSubcategory, selectedSize, searchFilter]);

  if (!category) {
    return (
      <div className="min-h-screen bg-[#f2f4f5] flex flex-col justify-between">
        <Header />
        <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-[#000000] mb-3">
            {t("કેટેગરી મળી નથી", "Category Not Found")}
          </h1>
          <p className="text-sm text-[#787574] mb-6">
            {t("તમે શોધેલ પેજ ઉપલબ્ધ નથી.", "The requested category could not be found.")}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5433eb] text-white text-sm font-bold shadow-violet-glow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("મુખ્ય પેજ પર પાછા જાઓ", "Back to Home")}</span>
          </Link>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f4f5] flex flex-col justify-between">
      <Header />

      <main className="flex-1 w-full pb-16">
        {/* Breadcrumb & Header Banner */}
        <div className="bg-white border-b border-[#ebebeb] py-6 sm:py-8">
          <div className="max-w-[1200px] mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#787574] mb-4 overflow-x-auto">
              <Link href="/" className="hover:text-[#5433eb] transition-colors shrink-0">
                {t("હોમ", "Home")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href="/categories" className="hover:text-[#5433eb] transition-colors shrink-0">
                {t("તમામ કેટેગરી", "All Categories")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[#000000] font-semibold truncate">
                {t(category.nameGu, category.nameEn)}
              </span>
            </div>

            {/* Category Title & Tagline */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.04em] text-[#000000]">
                    {t(category.nameGu, category.nameEn)}
                  </h1>
                  {category.badgeGu && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f4f5] text-[#5433eb] text-[11px] font-bold border border-[#ebebeb]">
                      {t(category.badgeGu, category.badgeEn || "")}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#787574] max-w-2xl leading-relaxed">
                  {t(category.descriptionGu, category.descriptionEn)}
                </p>
              </div>

              {/* Direct WhatsApp Callout for this Category */}
              <a
                href={`https://wa.me/${siteContent.business.whatsappNumber}?text=${encodeURIComponent(
                  lang === "gu"
                    ? `નમસ્તે રાધે હાર્ડવેર, મારે "${category.nameGu}" વિશે સંપૂર્ણ લિસ્ટ અને ભાવ જાણવા છે.`
                    : `Hello Radhe Hardware, I want to see the full list and prices for "${category.nameEn}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5433eb] text-white text-xs sm:text-sm font-bold shadow-violet-glow shrink-0 w-fit active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("આ કેટેગરીના ભાવ પૂછો", "Inquire Category Pricing")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Subcategories Horizontal Filter Bar */}
        <div className="bg-[#f2f4f5] border-b border-[#ebebeb] sticky top-[60px] z-30 py-3 shadow-xs">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedSubcategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedSubcategory === "all"
                  ? "bg-[#5433eb] text-white shadow-violet-glow"
                  : "bg-white text-[#332f2d] hover:bg-stone-100 border border-[#ebebeb]"
              }`}
            >
              {t("બધી પ્રોડક્ટ્સ", "All Products")} ({rawProducts.length})
            </button>

            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedSubcategory === sub.id
                    ? "bg-[#5433eb] text-white shadow-violet-glow font-bold"
                    : "bg-white text-[#332f2d] hover:bg-stone-100 border border-[#ebebeb]"
                }`}
              >
                {t(sub.nameGu, sub.nameEn)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout with Sidebar Filters (Desktop) + Product Grid */}
        <div className="max-w-[1200px] mx-auto px-4 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Filter Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              {/* Search Inside Category */}
              <div className="bg-white p-4 rounded-2xl border border-[#ebebeb] shadow-sm">
                <h4 className="text-xs font-bold text-[#000000] uppercase tracking-wider mb-2.5">
                  {t("શોધ (Search)", "Search")}
                </h4>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#787574] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={t("સાઈઝ અથવા નામ...", "Size, name...")}
                    className="w-full bg-[#f2f4f5] text-xs py-2 pl-9 pr-3 rounded-full outline-none focus:ring-1 focus:ring-[#5433eb]"
                  />
                </div>
              </div>

              {/* Size Filter */}
              {availableSizes.length > 0 && (
                <div className="bg-white p-4 rounded-2xl border border-[#ebebeb] shadow-sm">
                  <h4 className="text-xs font-bold text-[#000000] uppercase tracking-wider mb-2.5">
                    {t("સાઈઝ / વેરિઅન્ટ", "Size / Variant")}
                  </h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedSize("all")}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                        selectedSize === "all"
                          ? "bg-[#5433eb] text-white font-bold"
                          : "text-[#332f2d] hover:bg-[#f2f4f5]"
                      }`}
                    >
                      {t("બધી સાઈઝ", "All Sizes")}
                    </button>
                    {availableSizes.map((sz, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                          selectedSize === sz
                            ? "bg-[#5433eb] text-white font-bold"
                            : "text-[#332f2d] hover:bg-[#f2f4f5]"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Help & Custom Requirements Banner */}
              <div className="bg-gradient-to-br from-[#332f2d] to-[#1a1716] text-white p-5 rounded-2xl shadow-sm">
                <Sparkles className="w-5 h-5 text-yellow-400 mb-2" />
                <h4 className="text-sm font-bold mb-1">
                  {t("કોઈ ખાસ સાઈઝ જોઈએ છે?", "Need a specific size?")}
                </h4>
                <p className="text-xs text-stone-300 mb-4 leading-relaxed">
                  {t(
                    "જો જોઈતી સાઈઝ લિસ્ટમાં ન દેખાય તો અમને સીધો ફોન કરો. ગોડાઉનમાંથી તરત વ્યવસ્થા કરી આપવામાં આવશે.",
                    "Call us directly if you need custom diameters or fabricated lengths."
                  )}
                </p>
                <a
                  href={`tel:${siteContent.business.phone1}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#5433eb] hover:bg-[#4323d4] text-white text-xs font-bold shadow-violet-glow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t("કોલ કરો", "Call Now")}</span>
                </a>
              </div>
            </div>

            {/* Right Product Grid */}
            <div className="lg:col-span-9">
              {/* Filter summary bar on mobile */}
              <div className="lg:hidden mb-4 flex items-center justify-between bg-white p-3 rounded-2xl border border-[#ebebeb]">
                <span className="text-xs font-bold text-[#000000]">
                  {filteredProducts.length} {t("પ્રોડક્ટ્સ મળ્યા", "Products Found")}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={t("શોધો...", "Search...")}
                    className="bg-[#f2f4f5] text-xs py-1.5 px-3 rounded-full outline-none w-36"
                  />
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[28px] p-10 text-center border border-[#ebebeb]">
                  <p className="text-base font-bold text-[#000000] mb-1">
                    {t("આ ફિલ્ટર મુજબ કોઈ પ્રોડક્ટ મળ્યા નથી", "No products matched your filter")}
                  </p>
                  <p className="text-xs text-[#787574] mb-6">
                    {t("કૃપા કરીને ફિલ્ટર સાફ કરો અથવા સીધા વોટ્સએપ પર પૂછપરછ કરો.", "Try resetting filters or ask directly on WhatsApp.")}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubcategory("all");
                      setSelectedSize("all");
                      setSearchFilter("");
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#f2f4f5] hover:bg-stone-200 text-[#000000] text-xs font-bold mr-2"
                  >
                    {t("બધા ફિલ્ટર સાફ કરો", "Clear All Filters")}
                  </button>
                  <a
                    href={`https://wa.me/${siteContent.business.whatsappNumber}?text=${encodeURIComponent(
                      lang === "gu"
                        ? `નમસ્તે રાધે હાર્ડવેર, મને "${category.nameGu}" માટે પ્રોડક્ટની જરૂર છે.`
                        : `Hello Radhe Hardware, I need products from "${category.nameEn}".`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#5433eb] text-white text-xs font-bold shadow-violet-glow"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
