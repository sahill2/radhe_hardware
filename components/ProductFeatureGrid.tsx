"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { MessageCircle, Info, Sparkles } from "lucide-react";

export default function ProductFeatureGrid() {
  const { lang, t } = useLanguage();
  const { productFeatures, business } = siteContent;
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  return (
    <section id="features" className="w-full py-12 bg-white border-y border-[#ebebeb]">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E8E3E] text-xs font-bold mb-2.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#1E8E3E]" />
            <span>{t("સ્પ્રિંકલર સિસ્ટમ પાર્ટ્સ", "Sprinkler System Breakdown")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827]">
            {t("સંપૂર્ણ સેટઅપ: ૫ મુખ્ય સાધનો", "Full Setup: 5 Essential Components")}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">
            {t(
              "પોસ્ટર મુજબ સ્પ્રિંકલર સિસ્ટમના દરેક મુખ્ય ભાગો અને સ્પેરપાર્ટ્સની વિગત.",
              "Detailed view of all 5 critical components that power an uninterrupted farm sprinkler setup."
            )}
          </p>
        </div>

        {/* 5-Item Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {productFeatures.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedFeature(selectedFeature === item.id ? null : item.id)}
              className="group cursor-pointer bg-[#f2f4f5] rounded-[24px] p-2.5 border border-[#ebebeb] hover:border-[#1E8E3E]/40 hover:shadow-card-dual transition-all duration-300 flex flex-col"
            >
              {/* Image Container with 18px inner radius */}
              <div className="relative w-full aspect-square rounded-[18px] overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.titleEn}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500 p-2"
                />

                {/* Bottom-left semi-transparent white label chip (12px radius) */}
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-[12px] shadow-xs border border-white/80 max-w-[85%]">
                  <span className="text-[11px] font-bold text-[#111827] truncate block">
                    {t(item.titleGu, item.titleEn)}
                  </span>
                </div>

                {/* Top-right tag */}
                <div className="absolute top-2 right-2 bg-[#1E8E3E] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                  {t(item.tagGu, item.tagEn)}
                </div>
              </div>

              {/* Text info below */}
              <div className="p-2 pt-2.5 flex-1 flex flex-col justify-between">
                <p className="text-[12px] text-[#6b7280] line-clamp-2 leading-tight">
                  {t(item.descGu, item.descEn)}
                </p>

                <a
                  href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
                    lang === "gu"
                      ? `નમસ્તે રાધે હાર્ડવેર, મારે "${item.titleGu}" વિશે પૂછપરછ કરવી છે.`
                      : `Hello Radhe Hardware, I want to inquire about "${item.titleEn}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 px-2 rounded-full bg-white hover:bg-[#1E8E3E] text-[#1E8E3E] hover:text-white border border-[#ebebeb] hover:border-[#1E8E3E] text-[11px] font-bold transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>{t("પૂછપરછ", "Inquire")}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
