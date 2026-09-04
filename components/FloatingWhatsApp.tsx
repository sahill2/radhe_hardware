"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const { lang, t } = useLanguage();
  const { business } = siteContent;

  const whatsappMessage =
    lang === "gu"
      ? "નમસ્તે રાધે હાર્ડવેર, મારે કૃષિ અને ઈરીગેશન સાધનોના ભાવ જાણવા છે."
      : "Hello Radhe Hardware, I would like to inquire about prices and availability of farm irrigation products.";

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40">
      <a
        href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-white text-[#111827] pl-2.5 pr-4 py-2 rounded-full border-2 border-[#1E8E3E] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-8 h-8 rounded-full bg-[#1E8E3E] flex items-center justify-center text-white shadow-sm">
          <MessageCircle className="w-5 h-5 fill-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-[#1E8E3E] leading-tight">
            {t("WhatsApp ચેટ", "Chat now!")}
          </span>
          <span className="text-[10px] text-gray-500 leading-none">
            {t("ઓનલાઈન સહાય", "Online 7 AM - 7 PM")}
          </span>
        </div>
      </a>
    </div>
  );
}
