"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { Product } from "../data/products";
import ProductCard from "./ProductCard";
import { ArrowRight, ChevronRight } from "lucide-react";

interface CategoryShowcaseProps {
  titleEn: string;
  titleGu: string;
  categorySlug: string;
  products: Product[];
  subtitleEn?: string;
  subtitleGu?: string;
}

export default function CategoryShowcaseSection({
  titleEn,
  titleGu,
  categorySlug,
  products,
  subtitleEn,
  subtitleGu,
}: CategoryShowcaseProps) {
  const { t } = useLanguage();

  if (!products || products.length === 0) return null;

  return (
    <section className="py-4 sm:py-6" id={categorySlug}>
      <div className="max-w-[1240px] mx-auto px-3 sm:px-4">
        {/* Category Header Row (like screenshot: "Sprinkler" on left, "View All" on right) */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3.5 mb-2.5 sm:mb-3.5 border-b border-gray-200">
          <div>
            <h2 className="text-[17px] sm:text-[22px] font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <span>{t(titleGu, titleEn)}</span>
            </h2>
            {(subtitleGu || subtitleEn) && (
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">
                {t(subtitleGu || "", subtitleEn || "")}
              </p>
            )}
          </div>

          <Link
            href={`/category/${categorySlug}`}
            className="text-[13px] sm:text-[14px] font-bold text-[#1E8E3E] hover:text-[#146C2E] flex items-center gap-0.5 hover:underline transition-all"
          >
            <span>{t("બધા જુઓ", "View All")}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2-Column Grid on Mobile, 3-Column on Tablet, 4-Column on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
