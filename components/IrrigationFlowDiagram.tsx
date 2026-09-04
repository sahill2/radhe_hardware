"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import {
  Waves,
  Cylinder,
  Filter,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  TreePine,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

export default function IrrigationFlowDiagram() {
  const { lang, t } = useLanguage();
  const { business } = siteContent;

  const flowSteps = [
    {
      num: "01",
      titleGu: "પાણીનો સ્ત્રોત",
      titleEn: "Water Source",
      descGu: "બોરવેલ / કૂવો / પંપ",
      descEn: "Bore / Well / Pump",
      icon: Waves,
      color: "bg-blue-600",
    },
    {
      num: "02",
      titleGu: "મેઈન PVC પાઈપ",
      titleEn: "Main PVC Pipe",
      descGu: "સ્વર્ણિમ™ ISI પાઈપો",
      descEn: "Swarnim™ ISI Pipes",
      icon: Cylinder,
      color: "bg-indigo-600",
    },
    {
      num: "03",
      titleGu: "સેન્ટર ફિલ્ટર",
      titleEn: "Center Filter",
      descGu: "રેતી-કાંપ શુદ્ધિકરણ",
      descEn: "Disc/Screen Filter",
      icon: Filter,
      color: "bg-emerald-600",
    },
    {
      num: "04",
      titleGu: "કંટ્રોલ વાલ્વ",
      titleEn: "Control Valve",
      descGu: "PP સોલિડ બોલ વાલ્વ",
      descEn: "PP Solid Ball Valve",
      icon: SlidersHorizontal,
      color: "bg-[#1E8E3E]",
    },
    {
      num: "05",
      titleGu: "સ્ટેન્ડ & રાઈઝર",
      titleEn: "Stand & Riser",
      descGu: "જમીનમાં મજબૂત ટેકો",
      descEn: "Ground Anchor Base",
      icon: Sparkles,
      color: "bg-teal-600",
    },
    {
      num: "06",
      titleGu: "સ્પ્રિંકલર હેડ",
      titleEn: "Sprinkler Head",
      descGu: "બ્રાસ / પોલી નોઝલ",
      descEn: "Brass / Poly Nozzle",
      icon: Sparkles,
      color: "bg-amber-600",
    },
    {
      num: "07",
      titleGu: "ખેતર છંટકાવ",
      titleEn: "Field Spray",
      descGu: "૩૬૦° સમાન ભેજ",
      descEn: "Uniform 360° Mist",
      icon: TreePine,
      color: "bg-green-700",
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-[#f2f4f5]">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Main Card */}
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-[#ebebeb] shadow-card-dual">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E8E3E] text-xs font-bold mb-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("ઈરીગેશન સિસ્ટમ વર્કિંગ ફ્લો", "Complete Sprinkler Flow")}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827]">
                {t("સ્પ્રિંકલર સિસ્ટમ કેવી રીતે કામ કરે છે?", "How the Sprinkler Setup Works")}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6b7280] max-w-md">
              {t(
                "તમે એક-એક સાધન છૂટક અથવા સંપૂર્ણ સેટઅપ એકસાથે રાધે હાર્ડવેર ખાતેથી મેળવી શકો છો.",
                "Available as complete ready-to-use setups or individual spare components."
              )}
            </p>
          </div>

          {/* Flow Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {flowSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#f2f4f5] rounded-2xl p-3.5 border border-[#ebebeb] flex flex-col justify-between relative group hover:bg-white hover:border-[#1E8E3E]/40 hover:shadow-card-sm transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#6b7280] tracking-wider">
                        STEP {step.num}
                      </span>
                      <div className={`w-7 h-7 rounded-xl ${step.color} text-white flex items-center justify-center shadow-xs`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h4 className="text-[13px] font-bold text-[#111827] leading-snug">
                      {t(step.titleGu, step.titleEn)}
                    </h4>

                    <p className="text-[11px] text-[#6b7280] mt-1 leading-tight">
                      {t(step.descGu, step.descEn)}
                    </p>
                  </div>

                  {idx < flowSteps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-[#1E8E3E] text-white items-center justify-center">
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-8 pt-6 border-t border-[#ebebeb] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f2f4f5] p-5 rounded-2xl">
            <div>
              <h4 className="text-sm font-bold text-[#111827]">
                {t("તમારા ખેતર માટે કયો સેટઅપ અનુકૂળ રહેશે?", "Which setup fits your farm size?")}
              </h4>
              <p className="text-xs text-[#6b7280] mt-0.5">
                {t(
                  "તમારા બોરવેલના હોર્સપાવર અને જમીનના માપ મુજબ યોગ્ય સેટઅપની મફત સલાહ માટે સંપર્ક કરો.",
                  "Contact us for free technical sizing based on your HP pump and farm dimensions."
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${business.phone1}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 text-[#111827] text-xs font-bold border border-[#ebebeb] shadow-card-sm"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#1E8E3E]" />
                <span>{t("કોલ કરો", "Call Now")}</span>
              </a>

              <a
                href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
                  lang === "gu"
                    ? "નમસ્તે રાધે હાર્ડવેર, મારા ખેતર માટે સ્પ્રિંકલર સિસ્ટમ સેટઅપનું માર્ગદર્શન આપો."
                    : "Hello Radhe Hardware, I need guidance for a complete sprinkler setup for my farm."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-green-glow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
