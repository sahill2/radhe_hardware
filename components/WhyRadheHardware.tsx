"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Users,
  Award,
  CheckCircle2,
  Clock,
  PhoneCall,
} from "lucide-react";

export default function WhyRadheHardware() {
  const { t } = useLanguage();
  const { business } = siteContent;

  return (
    <section className="w-full py-12 sm:py-16 bg-[#f2f4f5]">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#ebebeb] text-[#1E8E3E] text-xs font-semibold mb-2 shadow-xs">
            <Award className="w-3.5 h-3.5" />
            <span>{t("ખેડૂતોની પહેલી પસંદ", "Why Farmers Choose Us")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827]">
            {t("શા માટે રાધે હાર્ડવેર?", "Why Radhe Hardware?")}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">
            {t(
              "ઉત્તમ ગુણવત્તાવાળા ISI પાઈપો, સ્પ્રિંકલર્સ અને તમામ ઈરીગેશન મટીરીયલ વ્યાજબી ભાવે.",
              "Genuine agricultural quality, subsidy documentation, and reliable farmer support."
            )}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: ISI & Subsidy Certification */}
          <div className="bg-white rounded-[28px] p-6 border border-[#ebebeb] shadow-card-dual hover:shadow-card-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1E8E3E] flex items-center justify-center mb-4 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                {t("ISI પ્રમાણિત & સબસિડી માન્ય", "ISI Certified & Subsidy Approved")}
              </h3>
              <p className="text-xs sm:text-sm text-[#6b7280] mt-2 leading-relaxed">
                {t(
                  "સ્વર્ણિમ™ પાઈપો IS:4985 (લાયસન્સ CM/L-2840761) સાથે સરકારી સબસિડી યોજના માટે માન્ય છે.",
                  "All agricultural pipes comply with IS:4985 with authentic GST documentation for state farmer subsidies."
                )}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#1E8E3E] mt-4 block">
              {business.isiNumber} • {business.isiLicense}
            </span>
          </div>

          {/* Card 2: Wholesale & Retail Direct Stock */}
          <div className="bg-white rounded-[28px] p-6 border border-[#ebebeb] shadow-card-dual hover:shadow-card-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-xs">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                {t("હોલસેલ અને રિટેલ સપ્લાય", "Wholesale & Retail Direct Supply")}
              </h3>
              <p className="text-xs sm:text-sm text-[#6b7280] mt-2 leading-relaxed">
                {t(
                  "છૂટક ખેડૂત મિત્રો તેમજ ખેત મંડળીઓ અને મોટા ઓર્ડર માટે સીધા ફેક્ટરી ભાવે માલ ઉપલબ્ધ છે.",
                  "Direct inventory pricing for individual farm owners as well as agricultural societies."
                )}
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-600 mt-4 block">
              {t("ગોડાઉનમાંથી તાત્કાલિક ડિલિવરી", "Direct Warehouse Dispatch")}
            </span>
          </div>

          {/* Card 3: 100% Comprehensive Range */}
          <div className="bg-white rounded-[28px] p-6 border border-[#ebebeb] shadow-card-dual hover:shadow-card-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#1E8E3E] flex items-center justify-center mb-4 shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                {t("એક જ જગ્યાએ તમામ સાધનો", "One-Stop Hardware & Irrigation")}
              </h3>
              <p className="text-xs sm:text-sm text-[#6b7280] mt-2 leading-relaxed">
                {t(
                  "પાઈપથી લઈને નોઝલ, વાલ્વ, ફિલ્ટર, એડેપ્ટર અને નાનામાં નાનો સ્પેરપાર્ટ સ્ટોકમાં હાજર.",
                  "From mainline pipes to nozzles, valves, screen filters, and every micro spare washer."
                )}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#1E8E3E] mt-4 block">
              {t("૧૨+ મુખ્ય પ્રોડક્ટ કેટેગરીઝ", "12+ Main Product Categories")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
