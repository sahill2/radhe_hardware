"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MobileBottomNav from "../../../components/MobileBottomNav";
import ProductCard from "../../../components/ProductCard";
import { getProductBySlug, products, Product } from "../../../data/products";
import { mainCategories } from "../../../data/categories";
import { useLanguage } from "../../../context/LanguageContext";
import { siteContent } from "../../../data/content";
import { createWhatsAppLink } from "../../../utils/whatsapp";
import {
  ArrowLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang, t } = useLanguage();

  const product = getProductBySlug(slug);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const currentVariant = product?.variants[selectedVariantIndex] || product?.variants[0];

  const category = useMemo(() => {
    return mainCategories.find((c) => c.slug === product?.category);
  }, [product]);

  // Related Products Cross-selling
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => product.relatedProductIds?.includes(p.id) || (p.category === product.category && p.id !== product.id))
      .slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f2f4f5] flex flex-col justify-between">
        <Header />
        <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-[#000000] mb-3">
            {t("પ્રોડક્ટ મળી નથી", "Product Not Found")}
          </h1>
          <p className="text-sm text-[#787574] mb-6">
            {t("તમે શોધેલ પ્રોડક્ટ ઉપલબ્ધ નથી.", "The requested product could not be found.")}
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

  const whatsappUrl = createWhatsAppLink({
    productNameEn: product.nameEn,
    productNameGu: product.nameGu,
    selectedVariant: currentVariant?.size,
    categoryEn: category?.nameEn,
    categoryGu: category?.nameGu,
    lang,
  });

  return (
    <div className="min-h-screen bg-[#f2f4f5] flex flex-col justify-between">
      <Header />

      <main className="flex-1 w-full pb-24 md:pb-16">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-[#ebebeb] py-3.5">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-xs text-[#787574] overflow-x-auto">
            <Link href="/" className="hover:text-[#5433eb] transition-colors shrink-0">
              {t("હોમ", "Home")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            {category && (
              <>
                <Link
                  href={`/category/${category.slug}`}
                  className="hover:text-[#5433eb] transition-colors shrink-0"
                >
                  {t(category.nameGu, category.nameEn)}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </>
            )}
            <span className="text-[#000000] font-semibold truncate">
              {t(product.nameGu, product.nameEn)}
            </span>
          </div>
        </div>

        {/* Main Product Showcase Section */}
        <div className="max-w-[1200px] mx-auto px-4 pt-6 sm:pt-10">
          <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-[#ebebeb] shadow-card-dual">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column: Product Image Gallery */}
              <div className="lg:col-span-6">
                <div className="sticky top-24 space-y-4">
                  <div className="relative aspect-[4/3] w-full rounded-[20px] overflow-hidden bg-[#f2f4f5] border border-[#ebebeb] shadow-sm">
                    <Image
                      src={product.image}
                      alt={product.nameEn}
                      fill
                      priority
                      className="object-cover"
                    />
                    {product.brand && (
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#5433eb] shadow-sm border border-white/80">
                        {product.brand}
                      </div>
                    )}
                  </div>

                  {/* Trust highlight under image */}
                  <div className="p-4 rounded-2xl bg-[#f2f4f5] border border-[#ebebeb] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#000000]">
                        {t("૧૦૦% ગુણવત્તા ટેસ્ટેડ સ્ટોક", "100% Quality Tested Stock")}
                      </h4>
                      <p className="text-[11px] text-[#787574]">
                        {t(
                          "લાલપુર દુકાન પર સીધો સ્ટોક ઉપલબ્ધ. હોલસેલ & રિટેલ ડિલિવરી.",
                          "Direct stock available at Lalpur store. Wholesale & retail delivery."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Variant Selection */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Category Pill */}
                  {category && (
                    <Link
                      href={`/category/${category.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f4f5] text-[#5433eb] text-xs font-semibold hover:bg-stone-200 transition-colors mb-3 w-fit"
                    >
                      <span>{t(category.nameGu, category.nameEn)}</span>
                    </Link>
                  )}

                  {/* Product Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.04em] text-[#000000] leading-tight">
                    {t(product.nameGu, product.nameEn)}
                  </h1>

                  {/* Description */}
                  <p className="mt-3 text-sm text-[#787574] leading-relaxed">
                    {t(product.descriptionGu, product.descriptionEn)}
                  </p>

                  {/* Price Policy Banner */}
                  <div className="my-5 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <div>
                        <span className="text-xs font-bold text-emerald-900 block">
                          {t("વર્તમાન તાજો ભાવ (Current Best Price)", "Current Best Market Price")}
                        </span>
                        <span className="text-[11px] text-emerald-700">
                          {t("રોજેરોજના વ્યાજબી ભાવ માટે ફોન અથવા વોટ્સએપ કરો", "Call or WhatsApp for daily fair pricing")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Variant / Size Selector */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="mb-6">
                      <label className="text-xs font-bold text-[#000000] uppercase tracking-wider block mb-2.5">
                        {t("સાઈઝ / વેરિઅન્ટ પસંદ કરો:", "Select Size / Variant:")}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {product.variants.map((v, idx) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariantIndex(idx)}
                            className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                              selectedVariantIndex === idx
                                ? "bg-[#5433eb] text-white border-[#5433eb] shadow-violet-glow"
                                : "bg-[#f2f4f5] text-[#332f2d] border-[#ebebeb] hover:bg-stone-200"
                            }`}
                          >
                            <span className="text-xs font-bold block truncate">
                              {t(v.sizeGu || v.size, v.size)}
                            </span>
                            {v.type && (
                              <span
                                className={`text-[10px] block mt-0.5 ${
                                  selectedVariantIndex === idx ? "text-stone-200" : "text-[#787574]"
                                }`}
                              >
                                {v.type}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Specifications Table */}
                  {product.specifications && product.specifications.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-[#000000] uppercase tracking-wider mb-2.5">
                        {t("ટેકનિકલ વિગત (Specifications):", "Technical Specifications:")}
                      </h3>
                      <div className="bg-[#f2f4f5] rounded-2xl p-4 border border-[#ebebeb] divide-y divide-[#ebebeb] text-xs">
                        {product.specifications.map((spec, i) => (
                          <div key={i} className="py-2 flex items-center justify-between first:pt-0 last:pb-0">
                            <span className="text-[#787574] font-medium">{t(spec.keyGu, spec.keyEn)}</span>
                            <span className="font-bold text-[#000000]">{t(spec.valueGu, spec.valueEn)}</span>
                          </div>
                        ))}
                        {currentVariant?.specification && (
                          <div className="py-2 flex items-center justify-between last:pb-0">
                            <span className="text-[#787574] font-medium">{t("પસંદ કરેલ મોડેલ", "Selected Model")}</span>
                            <span className="font-bold text-[#5433eb]">
                              {t(currentVariant.specificationGu || currentVariant.specification, currentVariant.specification)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Applications Bullet List */}
                  {product.applicationsEn && product.applicationsEn.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-[#000000] uppercase tracking-wider mb-2.5">
                        {t("મુખ્ય ઉપયોગ (Applications):", "Key Applications:")}
                      </h3>
                      <ul className="space-y-1.5 text-xs text-[#332f2d]">
                        {product.applicationsGu.map((app, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#5433eb] shrink-0 mt-0.5" />
                            <span>{t(app, product.applicationsEn[i])}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Direct Action Buttons (Desktop & Tablet) */}
                <div className="pt-6 border-t border-[#ebebeb] grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${siteContent.business.phone1}`}
                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#f2f4f5] hover:bg-stone-200 text-[#000000] text-sm font-bold transition-all active:scale-95 shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-[#5433eb]" />
                    <span>{t("કોલ કરો: ", "Call: ")}{siteContent.business.phone1Display}</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#5433eb] hover:bg-[#4323d4] text-white text-sm font-bold shadow-violet-glow hover:shadow-violet-glow-lg transition-all active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t("વોટ્સએપ પર ભાવ પૂછો", "Inquire on WhatsApp")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Cross-Selling / "You May Also Need" Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ebebeb] text-[#5433eb] text-xs font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t("સાથે જરૂરી સાધનો", "Complementary Items")}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#000000]">
                    {t("તમને આ સાધનોની પણ જરૂર પડી શકે છે", "You May Also Need")}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-18 left-3 right-3 z-40">
        <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-full border border-[#ebebeb] shadow-xl grid grid-cols-2 gap-2">
          <a
            href={`tel:${siteContent.business.phone1}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#f2f4f5] text-[#000000] text-xs font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-[#5433eb]" />
            <span>{t("કોલ કરો", "Call")}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#5433eb] text-white text-xs font-bold shadow-violet-glow"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
