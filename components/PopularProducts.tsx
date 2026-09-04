"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { getFeaturedProducts } from "../data/products";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

export default function PopularProducts() {
  const { t } = useLanguage();
  const [featuredList, setFeaturedList] = useState<any[]>(() => getFeaturedProducts().slice(0, 6));

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await fetch("/api/products?featured=true&limit=6");
        if (res.ok) {
          const data = await res.json();
          if (data.products && data.products.length > 0) {
            setFeaturedList(data.products);
          }
        }
      } catch (err) {
        console.warn("Could not fetch remote featured products, using cached seed list:", err);
      }
    };
    loadFeatured();
  }, []);

  return (
    <section className="w-full py-10 sm:py-14 bg-white">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E8E3E] text-xs font-bold mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#1E8E3E]" />
              <span>{t("ખેડૂતોમાં સૌથી વધુ માંગ", "Top Demanded Equipment")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827]">
              {t("લોકપ્રિય સાધનો અને ફિટિંગ્સ", "Popular Products & Fittings")}
            </h2>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1E8E3E] hover:underline"
          >
            <span>{t("બધી ૧૨ કેટેગરીઝ જુઓ", "View All 12 Categories")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6-Card Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {featuredList.map((product) => (
            <ProductCard key={product._id || product.id || product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
