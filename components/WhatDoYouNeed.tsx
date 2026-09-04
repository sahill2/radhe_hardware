"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import {
  Cylinder,
  Wrench,
  Sparkles,
  Droplets,
  CloudRain,
  SlidersHorizontal,
  Filter,
  Layers,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function WhatDoYouNeed() {
  const { t } = useLanguage();

  const options = [
    {
      titleGu: "PVC પાઈપ",
      titleEn: "PVC Pipes",
      subtitleGu: "ખેતી & પ્લમ્બિંગ પાઈપ",
      subtitleEn: "ISI & Agri Class Pipes",
      href: "/category/pvc-pipes",
      icon: Cylinder,
      bg: "bg-blue-50 text-blue-600",
    },
    {
      titleGu: "પ્લમ્બિંગ ફિટિંગ્સ",
      titleEn: "Plumbing Fittings",
      subtitleGu: "એલ્બો, ટી, કપ્લર, એડેપ્ટર",
      subtitleEn: "Elbows, Tees, Sockets",
      href: "/category/plumbing-fittings",
      icon: Wrench,
      bg: "bg-amber-50 text-amber-600",
    },
    {
      titleGu: "સ્પ્રિંકલર સિસ્ટમ",
      titleEn: "Sprinkler System",
      subtitleGu: "સ્ટેન્ડ, નોઝલ & સેટઅપ",
      subtitleEn: "Stands, Nozzles & Sets",
      href: "/category/sprinkler-system",
      icon: Sparkles,
      bg: "bg-emerald-50 text-[#1E8E3E]",
    },
    {
      titleGu: "ડ્રિપ (ટપક) ઈરીગેશન",
      titleEn: "Drip Irrigation",
      subtitleGu: "ડ્રિપર્સ, ગ્રોમેટ, કનેક્ટર",
      subtitleEn: "Drippers & Take-offs",
      href: "/category/drip-irrigation",
      icon: Droplets,
      bg: "bg-teal-50 text-teal-600",
    },
    {
      titleGu: "રેઈન પાઈપ",
      titleEn: "Rain Pipe",
      subtitleGu: "૪૦mm પાઈપ, કોક & જોઈનર",
      subtitleEn: "40mm Pipes & Cocks",
      href: "/category/rain-pipe-fittings",
      icon: CloudRain,
      bg: "bg-cyan-50 text-cyan-600",
    },
    {
      titleGu: "પાણીના વાલ્વ્સ",
      titleEn: "Control Valves",
      subtitleGu: "PP બોલ વાલ્વ & એર વાલ્વ",
      subtitleEn: "Ball & Air Valves",
      href: "/category/valves",
      icon: SlidersHorizontal,
      bg: "bg-rose-50 text-rose-600",
    },
    {
      titleGu: "સેન્ટર / ડિસ્ક ફિલ્ટર",
      titleEn: "Filters",
      subtitleGu: "ચોકઅપ મુક્ત શુદ્ધ પાણી",
      subtitleEn: "Disc & Screen Filters",
      href: "/category/filters",
      icon: Filter,
      bg: "bg-indigo-50 text-indigo-600",
    },
    {
      titleGu: "સ્પેરપાર્ટ્સ & વોશર",
      titleEn: "Spare Parts",
      subtitleGu: "રબર વોશર, રીંગ & સ્પેર",
      subtitleEn: "Washers, Seals & Spares",
      href: "/category/fittings-spare-parts",
      icon: Layers,
      bg: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="w-full py-10 sm:py-14 bg-white border-y border-[#ebebeb]">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E8E3E] text-xs font-bold mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#1E8E3E]" />
            <span>{t("ખેડૂત ઉપયોગી પસંદગી", "Farmer-Friendly Navigation")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827]">
            {t("તમને શું જોઈએ?", "What Do You Need?")}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">
            {t(
              "તમારી જરૂરિયાત પર ક્લિક કરો અને સીધા સંબંધિત સાધનો તથા વિગત જુઓ.",
              "Choose what you're looking for and we'll take you to the right products."
            )}
          </p>
        </div>

        {/* 8-Grid Responsive Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {options.map((opt, i) => {
            const IconComp = opt.icon;
            return (
              <Link
                key={i}
                href={opt.href}
                className="bg-[#f2f4f5] hover:bg-white rounded-[24px] p-4 border border-[#ebebeb] hover:border-[#1E8E3E]/50 hover:shadow-card-dual transition-all duration-300 flex flex-col justify-between group active:scale-98"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-11 h-11 rounded-2xl ${opt.bg} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#6b7280] group-hover:text-[#1E8E3E] group-hover:bg-emerald-50 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#111827] leading-snug group-hover:text-[#1E8E3E] transition-colors">
                    {t(opt.titleGu, opt.titleEn)}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#6b7280] mt-0.5 leading-tight">
                    {t(opt.subtitleGu, opt.subtitleEn)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
