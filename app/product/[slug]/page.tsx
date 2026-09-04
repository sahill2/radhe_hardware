"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MobileBottomNav from "../../../components/MobileBottomNav";
import FloatingWhatsApp from "../../../components/FloatingWhatsApp";
import ProductCard from "../../../components/ProductCard";
import { getProductBySlug as getStaticProduct, products as staticProducts } from "../../../data/products";
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
  AlertTriangle,
  XCircle,
  Loader2,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang, t } = useLanguage();

  const [product, setProduct] = useState<any>(() => getStaticProduct(slug));
  const [category, setCategory] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.product) {
            setProduct(data.product);
            if (data.category) setCategory(data.category);
            if (data.relatedProducts) setRelatedProducts(data.relatedProducts);
          }
        }
      } catch (err) {
        console.warn("Using fallback static product data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const variants = product?.variants || [];
  const currentVariant = variants[selectedVariantIndex] || variants[0];
  const unit = currentVariant?.unit || "piece";
  const stockQty = currentVariant?.stockQuantity ?? 25;
  const isOutOfStock = stockQty === 0 || currentVariant?.stockStatus === "out_of_stock";
  const isLowStock = !isOutOfStock && (stockQty <= 10 || currentVariant?.stockStatus === "low_stock");

  const categoryData = useMemo(() => {
    if (category) return category;
    const catSlug = product?.categorySlug || product?.category;
    return mainCategories.find((c) => c.slug === catSlug);
  }, [product, category]);

  const finalRelated = useMemo(() => {
    if (relatedProducts && relatedProducts.length > 0) return relatedProducts;
    if (!product) return [];
    const catSlug = product.categorySlug || product.category;
    return staticProducts
      .filter((p) => p.category === catSlug && p.slug !== product.slug)
      .slice(0, 3);
  }, [product, relatedProducts]);

  if (!product && !loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
        <Header />
        <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {t("પ્રોડક્ટ મળી નથી", "Product Not Found")}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {t("તમે શોધેલ પ્રોડક્ટ ઉપલબ્ધ નથી.", "The requested product could not be found.")}
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

  const productNameGu = product?.nameGu || product?.nameEn || "";
  const productNameEn = product?.nameEn || "";
  const variantSize = currentVariant?.size || "";

  const whatsappUrl = createWhatsAppLink({
    productNameEn,
    productNameGu,
    selectedVariant: variantSize,
    categoryEn: categoryData?.nameEn,
    categoryGu: categoryData?.nameGu,
    lang,
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between selection:bg-[#1E8E3E] selection:text-white pb-24 md:pb-0">
      <Header />

      <main className="flex-1 w-full pb-16">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200 py-3.5">
          <div className="max-w-[1240px] mx-auto px-4 flex items-center gap-2 text-xs text-gray-500 overflow-x-auto">
            <Link href="/" className="hover:text-[#1E8E3E] transition-colors shrink-0">
              {t("હોમ", "Home")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            {categoryData && (
              <>
                <Link
                  href={`/category/${categoryData.slug}`}
                  className="hover:text-[#1E8E3E] transition-colors shrink-0"
                >
                  {t(categoryData.nameGu, categoryData.nameEn)}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </>
            )}
            <span className="text-gray-900 font-semibold truncate">
              {t(productNameGu, productNameEn)}
            </span>
          </div>
        </div>

        {/* Main Product Showcase Section */}
        <div className="max-w-[1240px] mx-auto px-4 pt-6 sm:pt-10">
          <div className="bg-white rounded-[28px] p-5 sm:p-8 lg:p-10 border border-gray-200 shadow-card-dual">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column: Product Image Gallery */}
              <div className="lg:col-span-6">
                <div className="sticky top-24 space-y-4">
                  <div className="relative aspect-[4/3] w-full rounded-[20px] overflow-hidden bg-gray-50 border border-gray-200 shadow-xs">
                    <Image
                      src={product?.image || "/images/pvc-pipes-category.jpg"}
                      alt={productNameEn}
                      fill
                      priority
                      className="object-contain p-4"
                    />
                    {product?.brand && (
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1E8E3E] shadow-sm border border-gray-200">
                        {product.brand}
                      </div>
                    )}
                  </div>

                  {/* Trust highlight under image */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#1E8E3E] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">
                        {t("૧૦૦% ગુણવત્તા ટેસ્ટેડ સ્ટોક", "100% Quality Tested Stock")}
                      </h4>
                      <p className="text-[11px] text-gray-500">
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
                  {categoryData && (
                    <Link
                      href={`/category/${categoryData.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#1E8E3E] text-xs font-bold hover:bg-emerald-100 transition-colors mb-3 w-fit"
                    >
                      <span>{t(categoryData.nameGu, categoryData.nameEn)}</span>
                    </Link>
                  )}

                  {/* Product Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    {t(productNameGu, productNameEn)}
                  </h1>

                  {/* Stock Status Badge & Availability */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{t("હાલમાં સ્ટોક પૂર્ણ (Out of Stock)", "Currently Out of Stock")}</span>
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>
                          {t(`ઓછો સ્ટોક: માત્ર ${stockQty} ${unit} બાકી`, `Low Stock: Only ${stockQty} ${unit} remaining`)}
                        </span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          {t(`હાજર સ્ટોક: ${stockQty} ${unit} ઉપલબ્ધ`, `In Stock: ${stockQty} ${unit} available`)}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t(product?.descriptionGu || "", product?.descriptionEn || "")}
                  </p>

                  {/* Price Banner */}
                  <div className="my-5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Tag className="w-4 h-4 text-[#1E8E3E]" />
                      <div>
                        {currentVariant?.price ? (
                          <>
                            <span className="text-lg font-black text-gray-900 block">
                              ₹{currentVariant.price}{" "}
                              <span className="text-xs font-medium text-gray-500">/ {unit}</span>
                            </span>
                            <span className="text-[11px] text-emerald-800">
                              {t("તાજો વ્યાજબી બજાર ભાવ", "Current best market price")}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-xs font-bold text-emerald-900 block">
                              {t("વર્તમાન તાજો ભાવ (Ask for Current Best Price)", "Current Best Market Price")}
                            </span>
                            <span className="text-[11px] text-emerald-700">
                              {t("રોજેરોજના વ્યાજબી ભાવ માટે ફોન અથવા વોટ્સએપ કરો", "Call or WhatsApp for daily wholesale rates")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Variant / Size Selector */}
                  {variants.length > 0 && (
                    <div className="mb-6">
                      <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2.5">
                        {t("સાઈઝ / વેરિઅન્ટ પસંદ કરો:", "Select Size / Variant:")}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {variants.map((v: any, idx: number) => {
                          const isSelected = selectedVariantIndex === idx;
                          return (
                            <button
                              key={v.id || idx}
                              type="button"
                              onClick={() => setSelectedVariantIndex(idx)}
                              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#1E8E3E] text-white border-[#1E8E3E] shadow-sm"
                                  : "bg-gray-50 text-gray-900 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              <span className="text-xs font-bold block truncate">
                                {t(v.sizeGu || v.size, v.size)}
                              </span>
                              <span
                                className={`text-[10px] block mt-0.5 ${
                                  isSelected ? "text-emerald-100" : "text-gray-500"
                                }`}
                              >
                                {v.stockQuantity ?? 25} {v.unit || "piece"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Technical Specifications Table */}
                  {product?.specifications && product.specifications.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                        {t("ટેકનિકલ વિગત (Specifications):", "Technical Specifications:")}
                      </h3>
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 divide-y divide-gray-200 text-xs">
                        {product.specifications.map((spec: any, i: number) => (
                          <div key={i} className="py-2 flex items-center justify-between first:pt-0 last:pb-0">
                            <span className="text-gray-500 font-medium">{t(spec.keyGu, spec.keyEn)}</span>
                            <span className="font-bold text-gray-900">{t(spec.valueGu, spec.valueEn)}</span>
                          </div>
                        ))}
                        {currentVariant?.specification && (
                          <div className="py-2 flex items-center justify-between last:pb-0">
                            <span className="text-gray-500 font-medium">{t("મોડેલ / સ્પેક", "Selected Model")}</span>
                            <span className="font-bold text-[#1E8E3E]">
                              {t(currentVariant.specificationGu || currentVariant.specification, currentVariant.specification)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Applications Bullet List */}
                  {product?.applicationsEn && product.applicationsEn.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                        {t("મુખ્ય ઉપયોગ (Applications):", "Key Applications:")}
                      </h3>
                      <ul className="space-y-1.5 text-xs text-gray-700">
                        {product.applicationsGu?.map((app: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#1E8E3E] shrink-0 mt-0.5" />
                            <span>{t(app, product.applicationsEn[i])}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${siteContent.business.phone1}`}
                    className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-[#1E8E3E]" />
                    <span>{t("કોલ કરો: ", "Call: ")}{siteContent.business.phone1Display}</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs sm:text-sm font-bold shadow-green-glow transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t("વોટ્સએપ પર ભાવ પૂછો", "Inquire on WhatsApp")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {finalRelated.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#1E8E3E] text-xs font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t("સાથે જરૂરી સાધનો", "Complementary Items")}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                    {t("તમને આ સાધનોની પણ જરૂર પડી શકે છે", "You May Also Need")}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {finalRelated.map((p: any) => (
                  <ProductCard key={p._id || p.id || p.slug} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileBottomNav />
    </div>
  );
}
