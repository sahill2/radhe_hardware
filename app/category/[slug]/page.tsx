"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MobileBottomNav from "../../../components/MobileBottomNav";
import FloatingWhatsApp from "../../../components/FloatingWhatsApp";
import ProductCard from "../../../components/ProductCard";
import { mainCategories } from "../../../data/categories";
import { getProductsByCategory, products as staticProducts } from "../../../data/products";
import { useLanguage } from "../../../context/LanguageContext";
import { siteContent } from "../../../data/content";
import {
  ArrowLeft,
  Search,
  ChevronRight,
  Sparkles,
  Phone,
  MessageCircle,
  Loader2,
} from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang, t } = useLanguage();

  const [categoryData, setCategoryData] = useState<any>(() =>
    mainCategories.find((c) => c.slug === slug)
  );
  const [categoryProducts, setCategoryProducts] = useState<any[]>(() =>
    getProductsByCategory(slug)
  );
  const [loading, setLoading] = useState(false);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`/api/products?category=${slug}&limit=100`),
          fetch("/api/categories"),
        ]);

        if (catRes.ok) {
          const cData = await catRes.json();
          const matchCat = (cData.categories || []).find((c: any) => c.slug === slug);
          if (matchCat) setCategoryData(matchCat);
        }

        if (prodRes.ok) {
          const pData = await prodRes.json();
          if (pData.products && pData.products.length > 0) {
            setCategoryProducts(pData.products);
          }
        }
      } catch (err) {
        console.warn("Could not fetch remote category products, using local cache:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryAndProducts();
    }
  }, [slug]);

  const category = categoryData || mainCategories.find((c) => c.slug === slug);

  // Extract all unique sizes available in this category
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    categoryProducts.forEach((p) => {
      (p.variants || []).forEach((v: any) => {
        if (v.size) sizeSet.add(v.size);
      });
    });
    return Array.from(sizeSet);
  }, [categoryProducts]);

  // Filtered product list
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((p) => {
      // Subcategory filter
      if (selectedSubcategory !== "all" && p.subcategory !== selectedSubcategory) {
        return false;
      }
      // Size filter
      if (selectedSize !== "all") {
        const hasSize = (p.variants || []).some((v: any) => v.size === selectedSize);
        if (!hasSize) return false;
      }
      // Text search
      if (searchFilter.trim() !== "") {
        const q = searchFilter.toLowerCase();
        const matchName =
          p.nameEn.toLowerCase().includes(q) ||
          p.nameGu.toLowerCase().includes(q) ||
          (p.descriptionEn && p.descriptionEn.toLowerCase().includes(q)) ||
          (p.descriptionGu && p.descriptionGu.toLowerCase().includes(q)) ||
          (p.variants || []).some((v: any) => v.size && v.size.toLowerCase().includes(q));
        if (!matchName) return false;
      }
      return true;
    });
  }, [categoryProducts, selectedSubcategory, selectedSize, searchFilter]);

  if (!category && !loading) {
    return (
      <div className="min-h-screen bg-[#f2f4f5] flex flex-col justify-between">
        <Header />
        <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {t("કેટેગરી મળી નથી", "Category Not Found")}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {t("તમે શોધેલ પેજ ઉપલબ્ધ નથી.", "The requested category could not be found.")}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E8E3E] text-white text-sm font-bold shadow-green-glow"
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

  const categoryNameGu = category?.nameGu || "";
  const categoryNameEn = category?.nameEn || "";

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between selection:bg-[#1E8E3E] selection:text-white pb-16 md:pb-0">
      <Header />

      <main className="flex-1 w-full pb-16">
        {/* Breadcrumb & Header Banner */}
        <div className="bg-white border-b border-gray-200 py-6 sm:py-8">
          <div className="max-w-[1240px] mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 overflow-x-auto">
              <Link href="/" className="hover:text-[#1E8E3E] transition-colors shrink-0">
                {t("હોમ", "Home")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href="/categories" className="hover:text-[#1E8E3E] transition-colors shrink-0">
                {t("તમામ કેટેગરી", "All Categories")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-gray-900 font-semibold truncate">
                {t(categoryNameGu, categoryNameEn)}
              </span>
            </div>

            {/* Category Title & Tagline */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                    {t(categoryNameGu, categoryNameEn)}
                  </h1>
                  {category?.badgeGu && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#1E8E3E] text-[11px] font-bold border border-emerald-200">
                      {t(category.badgeGu, category.badgeEn || "")}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
                  {t(category?.descriptionGu || "", category?.descriptionEn || "")}
                </p>
              </div>

              {/* Direct WhatsApp Callout for this Category */}
              <a
                href={`https://wa.me/${siteContent.business.whatsappNumber}?text=${encodeURIComponent(
                  lang === "gu"
                    ? `નમસ્તે રાધે હાર્ડવેર, મારે "${categoryNameGu}" વિશે સંપૂર્ણ લિસ્ટ અને ભાવ જાણવા છે.`
                    : `Hello Radhe Hardware, I want to see the full list and prices for "${categoryNameEn}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs sm:text-sm font-bold shadow-green-glow shrink-0 w-fit active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("આ કેટેગરીના ભાવ પૂછો", "Inquire Category Pricing")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Subcategories Horizontal Filter Bar */}
        {category?.subcategories && category.subcategories.length > 0 && (
          <div className="bg-white border-b border-gray-200 sticky top-[57px] z-30 py-2.5 shadow-xs">
            <div className="max-w-[1240px] mx-auto px-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedSubcategory("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedSubcategory === "all"
                    ? "bg-[#1E8E3E] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("બધી પ્રોડક્ટ્સ", "All Products")} ({categoryProducts.length})
              </button>

              {category.subcategories.map((sub: any) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubcategory(sub.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    selectedSubcategory === sub.id
                      ? "bg-[#1E8E3E] text-white shadow-xs font-bold"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t(sub.nameGu, sub.nameEn)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Layout with Sidebar Filters (Desktop) + Product Grid */}
        <div className="max-w-[1240px] mx-auto px-4 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Filter Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-3 space-y-5">
              {/* Search Inside Category */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                  {t("શોધ (Search Inside)", "Search Inside")}
                </h4>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={t("સાઈઝ અથવા નામ...", "Size, name...")}
                    className="w-full bg-gray-50 text-xs py-2 pl-9 pr-3 rounded-full outline-none focus:bg-white focus:ring-1 focus:ring-[#1E8E3E] border border-gray-200"
                  />
                </div>
              </div>

              {/* Size Filter */}
              {availableSizes.length > 0 && (
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                    {t("સાઈઝ / વેરિઅન્ટ", "Size / Variant")}
                  </h4>
                  <div className="space-y-1 max-h-56 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedSize("all")}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        selectedSize === "all"
                          ? "bg-[#1E8E3E] text-white font-bold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {t("બધી સાઈઝ (All Sizes)", "All Sizes")}
                    </button>
                    {availableSizes.map((sz, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          selectedSize === sz
                            ? "bg-[#1E8E3E] text-white font-bold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Help & Custom Requirements Banner */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-5 rounded-2xl shadow-sm">
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
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t("કોલ કરો", "Call Now")}</span>
                </a>
              </div>
            </div>

            {/* Right Product Grid */}
            <div className="lg:col-span-9">
              {/* Filter summary bar on mobile */}
              <div className="lg:hidden mb-4 flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold text-gray-900">
                  {filteredProducts.length} {t("પ્રોડક્ટ્સ મળ્યા", "Products Found")}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={t("શોધો...", "Search...")}
                    className="bg-gray-100 text-xs py-1.5 px-3 rounded-full outline-none w-36 border border-gray-200"
                  />
                </div>
              </div>

              {loading ? (
                <div className="p-12 text-center text-gray-500 text-xs font-medium">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1E8E3E]" />
                  <span>પ્રોડક્ટ્સ લોડ થઈ રહી છે...</span>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
                  {filteredProducts.map((p) => (
                    <ProductCard key={p._id || p.id || p.slug} product={p} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
                  <p className="text-base font-bold text-gray-900 mb-1">
                    {t("આ ફિલ્ટર મુજબ કોઈ પ્રોડક્ટ મળ્યા નથી", "No products matched your filter")}
                  </p>
                  <p className="text-xs text-gray-500 mb-6">
                    {t(
                      "કૃપા કરીને ફિલ્ટર સાફ કરો અથવા સીધા વોટ્સએપ પર પૂછપરછ કરો.",
                      "Try resetting filters or ask directly on WhatsApp."
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubcategory("all");
                      setSelectedSize("all");
                      setSearchFilter("");
                    }}
                    className="px-6 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-bold mr-2 cursor-pointer"
                  >
                    {t("બધા ફિલ્ટર સાફ કરો", "Clear All Filters")}
                  </button>
                  <a
                    href={`https://wa.me/${siteContent.business.whatsappNumber}?text=${encodeURIComponent(
                      lang === "gu"
                        ? `નમસ્તે રાધે હાર્ડવેર, મને "${categoryNameGu}" માટે પ્રોડક્ટની જરૂર છે.`
                        : `Hello Radhe Hardware, I need products from "${categoryNameEn}".`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1E8E3E] text-white text-xs font-bold shadow-green-glow"
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
      <FloatingWhatsApp />
      <MobileBottomNav />
    </div>
  );
}
