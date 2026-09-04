"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink, Building2 } from "lucide-react";

export default function LocationContact() {
  const { lang, t } = useLanguage();
  const { business } = siteContent;

  return (
    <section id="location" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#ebebeb] text-[#1E8E3E] text-xs font-bold mb-2 shadow-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t("દુકાનનું સરનામું અને સમય", "Store Location & Hours")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827]">
            {t("રૂબરૂ મુલાકાત લો અથવા સંપર્ક કરો", "Visit Store or Contact Us")}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">
            {t(
              "લાલપુર બસ સ્ટેશન પાસે, તાલુકો કપડવંજ — ખેડૂતો માટે સવારે ૭ થી સાંજે ૭ સુધી ખુલ્લું.",
              "Near Bus Stop, Lalpur, Ta. Kapadwanj — Open daily 7:00 AM to 7:00 PM for all farm needs."
            )}
          </p>
        </div>

        {/* 2-Column Map & Contact Details Card */}
        <div className="bg-white rounded-[28px] overflow-hidden border border-[#ebebeb] shadow-card-lg grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[460px] bg-[#f2f4f5]">
            <iframe
              title="Radhe Hardware Location"
              src={`https://maps.google.com/maps?q=${business.mapsEmbedCoords.lat},${business.mapsEmbedCoords.lng}&hl=en&z=15&output=embed`}
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay Get Directions floating button */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs sm:text-sm font-bold shadow-green-glow transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>{t("ગુગલ મેપ્સમાં રસ્તો જુઓ (Get Directions)", "Get Directions in Google Maps")}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Information, Phone Cards & Hours */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Store Title */}
              <div className="flex items-center gap-3 pb-4 border-b border-[#ebebeb]">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#1E8E3E] shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111827]">
                    {t(business.nameGu, business.nameEn)}
                  </h3>
                  <p className="text-xs text-[#1E8E3E] font-semibold">
                    {t(business.taglineGu, business.taglineEn)}
                  </p>
                </div>
              </div>

              {/* Address Details */}
              <div className="py-4 border-b border-[#ebebeb] flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1E8E3E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    {t("સરનામું", "Address")}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#374151] mt-1 leading-relaxed">
                    {t(business.addressGu, business.addressEn)}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="py-4 border-b border-[#ebebeb] flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#1E8E3E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    {t("દુકાનનો સમય", "Working Hours")}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-[#111827] mt-1">
                    {t(business.hoursGu, business.hoursEn)}
                  </p>
                  <p className="text-[11px] text-[#6b7280] mt-0.5">
                    {t("સોમવાર થી રવિવાર (દરરોજ ખુલ્લું)", "Monday to Sunday (Open all 7 days)")}
                  </p>
                </div>
              </div>

              {/* Phone Numbers (Click to call) */}
              <div className="pt-4">
                <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2.5">
                  {t("કોલ અથવા વોટ્સએપ પર ઓર્ડર કરો", "Call or WhatsApp to Order")}
                </h4>

                <div className="flex flex-col gap-2">
                  {/* Phone 1 */}
                  <a
                    href={`tel:${business.phone1}`}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#f2f4f5] hover:bg-stone-200 transition-colors border border-[#ebebeb]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#1E8E3E] text-white flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-[#6b7280] block leading-none">{t("મુખ્ય નંબર", "Primary Line")}</span>
                        <span className="text-sm font-bold text-[#111827]">{business.phone1Display}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#1E8E3E]">{t("કોલ કરો", "Call")}</span>
                  </a>

                  {/* Phone 2 */}
                  <a
                    href={`tel:${business.phone2}`}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#f2f4f5] hover:bg-stone-200 transition-colors border border-[#ebebeb]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#1E8E3E] text-white flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-[#6b7280] block leading-none">{t("બીજો નંબર", "Secondary Line")}</span>
                        <span className="text-sm font-bold text-[#111827]">{business.phone2Display}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#1E8E3E]">{t("કોલ કરો", "Call")}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom WhatsApp Primary Banner */}
            <div className="mt-6 pt-4">
              <a
                href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
                  lang === "gu"
                    ? "નમસ્તે રાધે હાર્ડવેર, મારે ખેતીના સાધનો વિશે પૂછપરછ કરવી છે."
                    : "Hello Radhe Hardware, I want to inquire about farm irrigation items."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-sm font-bold shadow-green-glow active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("વોટ્સએપ પર સીધી વાતચીત કરો", "Chat Directly on WhatsApp")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
