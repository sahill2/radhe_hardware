"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { createWhatsAppLink } from "../utils/whatsapp";
import { MessageCircle, ShieldCheck, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { lang, t } = useLanguage();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex] || variants[0];
  const unit = currentVariant?.unit || "piece";
  const stockQty = currentVariant?.stockQuantity ?? 25;
  const isOutOfStock = stockQty === 0 || currentVariant?.stockStatus === "out_of_stock";
  const isLowStock = !isOutOfStock && (stockQty <= 10 || currentVariant?.stockStatus === "low_stock");

  const categorySlug = product.categorySlug || product.category || "";

  const whatsappUrl = createWhatsAppLink({
    productNameEn: product.nameEn,
    productNameGu: product.nameGu,
    selectedVariant: currentVariant?.size,
    categoryEn: categorySlug,
    categoryGu: categorySlug,
    lang,
  });

  const primarySpecs = (product.specifications || []).slice(0, 2);

  return (
    <div className="bg-white rounded-2xl sm:rounded-[24px] p-3 sm:p-4 border border-[#e5e7eb] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group h-full">
      <div>
        {/* Product Image Container */}
        <Link
          href={`/product/${product.slug}`}
          className="block relative aspect-square sm:aspect-[4/3] w-full rounded-xl sm:rounded-[18px] overflow-hidden bg-[#f8fafc] border border-gray-100"
        >
          <Image
            src={product.image || "/images/pvc-pipes-category.jpg"}
            alt={product.nameEn}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Brand Tag */}
          {product.brand && (
            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold text-[#1E8E3E] shadow-xs border border-gray-100">
              {product.brand}
            </div>
          )}

          {/* Stock Indicator Badge */}
          <div className="absolute top-2 right-2">
            {isOutOfStock ? (
              <span className="bg-rose-500 text-white px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold shadow-xs">
                {t("સ્ટોક પૂર્ણ", "Out of Stock")}
              </span>
            ) : isLowStock ? (
              <span className="bg-amber-500 text-white px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold shadow-xs">
                {t(`માત્ર ${stockQty} બાકી`, `Only ${stockQty} Left`)}
              </span>
            ) : (
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold shadow-xs">
                {t("હાજર સ્ટોક", "In Stock")}
              </span>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="pt-2.5 sm:pt-3.5">
          {/* Title */}
          <Link
            href={`/product/${product.slug}`}
            className="block group-hover:text-[#1E8E3E] transition-colors"
          >
            <h3 className="text-[13px] sm:text-[15px] font-bold tracking-tight text-gray-900 leading-snug line-clamp-2 min-h-[36px] sm:min-h-[42px]">
              {t(product.nameGu, product.nameEn)}
            </h3>
          </Link>

          {/* Price Line */}
          <div className="mt-1 flex items-center justify-between">
            {currentVariant?.price ? (
              <span className="text-[13px] sm:text-[14px] font-black text-gray-900">
                ₹{currentVariant.price}
                <span className="text-[10px] font-normal text-gray-500 ml-1">/ {unit}</span>
              </span>
            ) : (
              <span className="text-[11px] sm:text-[12px] font-bold text-[#1E8E3E]">
                {t("ભાવ માટે પૂછો (Ask Price)", "Price on Request")}
              </span>
            )}
          </div>

          {/* Key Specifications */}
          <div className="mt-1.5 space-y-0.5 text-[10px] sm:text-[11px] text-gray-500">
            {primarySpecs.length > 0 ? (
              primarySpecs.map((spec: any, idx: number) => (
                <div key={idx} className="truncate">
                  <span className="font-medium text-gray-700">{t(spec.keyGu, spec.keyEn)}:</span>{" "}
                  <span>{t(spec.valueGu, spec.valueEn)}</span>
                </div>
              ))
            ) : (
              <div className="truncate text-gray-500">
                <span className="font-medium text-gray-700">{t("વર્ગ:", "Type:")}</span>{" "}
                {t("ઉચ્ચ ગુણવત્તા", "High Grade")}
              </div>
            )}
            {currentVariant && (
              <div className="truncate">
                <span className="font-medium text-gray-700">{t("સાઈઝ:", "Size:")}</span>{" "}
                <span className="text-gray-900 font-semibold">
                  {t(currentVariant.sizeGu || currentVariant.size, currentVariant.size)}
                </span>
              </div>
            )}
          </div>

          {/* Quick Variant Size Pills */}
          {variants.length > 1 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {variants.slice(0, 3).map((variant: any, idx: number) => (
                <button
                  key={variant.id || idx}
                  type="button"
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer ${
                    selectedVariantIndex === idx
                      ? "bg-[#1E8E3E] text-white font-bold"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t(variant.sizeGu || variant.size, variant.size)}
                </button>
              ))}
              {variants.length > 3 && (
                <span className="text-[9px] text-gray-400 self-center">
                  +{variants.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Primary CTA: "Get Best Price" / "ભાવ મેળવો" */}
      <div className="pt-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 rounded-xl bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-[12px] sm:text-[13px] font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{t("ભાવ પૂછો / ઓર્ડર", "Inquire on WhatsApp")}</span>
        </a>
      </div>
    </div>
  );
}
