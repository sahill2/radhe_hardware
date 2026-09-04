"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { ShieldCheck, Award, Sparkles, Star, Truck, CheckCircle } from "lucide-react";

export default function TrustBadges() {
  const { t } = useLanguage();
  const { trustBadges } = siteContent;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#1E8E3E]" />;
      case "Award":
        return <Award className="w-5 h-5 text-[#1E8E3E]" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-[#1E8E3E]" />;
      case "Star":
        return <Star className="w-5 h-5 text-amber-500 fill-amber-500" />;
      case "Truck":
        return <Truck className="w-5 h-5 text-[#1E8E3E]" />;
      default:
        return <CheckCircle className="w-5 h-5 text-[#1E8E3E]" />;
    }
  };

  return (
    <section className="w-full pb-8">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Rounded horizontal grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {trustBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#ebebeb] shadow-card-sm hover:shadow-card-dual transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center shrink-0">
                {getIcon(badge.icon)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-[#111827] truncate leading-tight">
                  {t(badge.titleGu, badge.titleEn)}
                </span>
                <span className="text-[11px] font-medium text-[#6b7280] truncate mt-0.5">
                  {t(badge.subtitleGu, badge.subtitleEn)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
