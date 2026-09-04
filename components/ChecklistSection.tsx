"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { CheckCircle2, ShieldCheck, PhoneCall } from "lucide-react";

export default function ChecklistSection() {
  const { t } = useLanguage();
  const { checklistItems, business } = siteContent;

  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Background Card */}
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-[#ebebeb] shadow-card-dual">
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E8E3E] text-xs font-bold mb-2 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E8E3E]" />
              <span>{t("દુકાન ઉપલબ્ધતા ચેકલિસ્ટ", "Shop Availability Checklist")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111827]">
              {t("કૃષિ કામ માટેનો દરેક મટીરીયલ એક જ જગ્યાએ!", "Every material for farm work, in one place!")}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">
              {t(
                "અમારી દુકાને ખેતી માટે જરૂરી તમામ સાધનો, સ્પ્રિંકલર એસેમ્બલી અને પાઇપલાઇનનું સંપૂર્ણ સોલ્યુશન મળશે.",
                "Find comprehensive farm irrigation supplies, replacement spares, and certified piping under one roof."
              )}
            </p>
          </div>

          {/* Two-Column Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f2f4f5] border border-[#ebebeb] hover:border-[#1E8E3E]/40 transition-colors group"
              >
                {/* Brand Green Check Icon */}
                <div className="w-8 h-8 rounded-full bg-[#1E8E3E] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </div>

                <div className="flex-1">
                  <h4 className="text-[14px] font-bold text-[#111827] leading-snug">
                    {t(item.titleGu, item.titleEn)}
                  </h4>
                  <p className="mt-1 text-[12px] text-[#6b7280] leading-relaxed">
                    {t(item.detailGu, item.detailEn)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-8 pt-6 border-t border-[#ebebeb] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <p className="text-xs sm:text-sm font-semibold text-[#111827]">
                {t(
                  "ખેડૂત મિત્રો માટે સ્પેશિયલ ડિસ્કાઉન્ટ અને હોલસેલ ડિલિવરી સુવિધા.",
                  "Special discount rates and doorstep bulk delivery available for farmer cooperatives."
                )}
              </p>
            </div>

            <a
              href={`tel:${business.phone1}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-green-glow transition-all active:scale-95 shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t("સીધો સંપર્ક કરો", "Contact Directly")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
