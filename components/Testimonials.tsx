"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { Star, CheckCircle, Quote } from "lucide-react";

export default function Testimonials() {
  const { t } = useLanguage();
  const { testimonials, business } = siteContent;

  return (
    <section id="testimonials" className="w-full py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ebebeb] text-[#5433eb] text-[12px] font-semibold mb-2">
              <Star className="w-3.5 h-3.5 fill-[#5433eb]" />
              <span>{t("૫.૦★ ગુગલ રિવ્યુઝ", "5.0★ Google Verified Reviews")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.04em] text-[#000000]">
              {t("ખેડૂત મિત્રોનો વિશ્વાસ", "What Farmers Say About Us")}
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#ebebeb] shadow-sm">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#000000]">
              {business.ratingCount}
            </span>
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-[28px] p-6 border border-[#ebebeb] shadow-card-dual hover:shadow-card-lg transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Row with Stars & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f2f4f5] text-[#5433eb] text-[10px] font-bold">
                    {t(test.tagGu, test.tagEn)}
                  </span>
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-[#c0b5f3]/40 absolute -top-2 -left-1 transform -rotate-12 pointer-events-none" />
                  <p className="text-[13px] text-[#332f2d] leading-relaxed relative z-10 pl-3 italic">
                    "{t(test.commentGu, test.commentEn)}"
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-[#ebebeb] flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-[#000000] flex items-center gap-1">
                    <span>{t(test.nameGu, test.nameEn)}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline-block" />
                  </h4>
                  <span className="text-[11px] font-medium text-[#787574]">
                    {t(test.villageGu, test.villageEn)}
                  </span>
                </div>

                <span className="w-8 h-8 rounded-full bg-[#f2f4f5] flex items-center justify-center text-xs font-bold text-[#5433eb]">
                  {test.nameEn.charAt(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
