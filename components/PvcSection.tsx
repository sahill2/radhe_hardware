"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { ShieldCheck, Droplets, Clock, ShieldAlert, Award, FileText, MessageCircle, ArrowRight } from "lucide-react";

export default function PvcSection() {
  const { lang, t } = useLanguage();
  const { pvcHighlights, business } = siteContent;

  const getPvcIcon = (icon: string) => {
    switch (icon) {
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-[#1E8E3E]" />;
      case "Droplets":
        return <Droplets className="w-6 h-6 text-[#1E8E3E]" />;
      case "Clock":
        return <Clock className="w-6 h-6 text-[#1E8E3E]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#1E8E3E]" />;
    }
  };

  return (
    <section id="pvc" className="w-full py-12 sm:py-16 bg-[#f2f4f5]">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Main 2-Column Split Container */}
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-[#ebebeb] shadow-card-dual">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: PVC Photography & Floating Certification Badges */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[20px] overflow-hidden bg-[#f2f4f5] shadow-card-sm border border-[#ebebeb]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/pvc-pipes-category.jpg"
                    alt="Swarnim Agriculture PVC Pipes ISI Certified"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating Bottom Seal */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/80 shadow-card-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1E8E3E] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      ISI
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827]">
                        {business.isiNumber} • {business.isiLicense}
                      </p>
                      <p className="text-[11px] text-[#6b7280]">
                        {t("બ્યુરો ઓફ ઇન્ડિયન સ્ટાન્ડર્ડ્સ પ્રમાણિત", "Bureau of Indian Standards Certified")}
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    {t("સરકારી માન્ય", "Govt Approved")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Copy & Details */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E8E3E] text-xs font-bold mb-3 w-fit">
                <Award className="w-3.5 h-3.5" />
                <span>{t("સ્વર્ણિમ™ એગ્રીકલ્ચર ક્લાસ-૨", "Swarnim™ Agriculture Class-2")}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111827] leading-tight">
                {t(business.subsidyGu, business.subsidyEn)}
              </h2>

              <p className="mt-3 text-sm text-[#6b7280] leading-relaxed">
                {t(
                  "રાધે હાર્ડવેર ખાતે ૬૩mm, ૭૫mm, ૯૦mm અને ૧૧૦mm ના કૃષિ ક્લાસ-૨ અને ક્લાસ-૩ પાઈપો હંમેશા ઉપલબ્ધ છે. સરકારી કૃષિ સબસિડી યોજનાઓ માટે માન્ય તમામ માર્કિંગ અને ક્વોલિટી સર્ટિફિકેટ સાથે.",
                  "Full inventory of 63mm, 75mm, 90mm & 110mm agricultural Class-2 and Class-3 pipes engineered for high pressure water delivery and full compliance with state farmer subsidies."
                )}
              </p>

              {/* 3-Icon Feature Pillar Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                {pvcHighlights.map((feat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f2f4f5] p-3.5 rounded-2xl border border-[#ebebeb] flex flex-col items-center sm:items-start text-center sm:text-left hover:border-[#1E8E3E]/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center mb-2 shadow-xs">
                      {getPvcIcon(feat.icon)}
                    </div>
                    <span className="text-xs font-bold text-[#111827]">
                      {t(feat.titleGu, feat.titleEn)}
                    </span>
                    <span className="text-[11px] text-[#6b7280] mt-1 leading-tight line-clamp-2">
                      {t(feat.descGu, feat.descEn)}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/category/pvc-pipes"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs sm:text-sm font-bold shadow-green-glow active:scale-95 transition-all"
                >
                  <span>{t("PVC પાઈપ કેટલોગ જુઓ", "Explore PVC Pipes")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                  <FileText className="w-4 h-4 text-[#1E8E3E]" />
                  <span>{t("ઓરિજિનલ પાકા બિલ સાથે", "Official GST Invoice Available")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
