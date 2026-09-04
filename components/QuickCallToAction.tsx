"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { Phone, MessageCircle, Sparkles, ShieldCheck } from "lucide-react";

export default function QuickCallToAction() {
  const { lang, t } = useLanguage();
  const { business } = siteContent;

  return (
    <section className="w-full py-10 sm:py-12 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-[28px] p-6 sm:p-8 backdrop-blur-md">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("સીધો ખેડૂત સપોર્ટ", "Direct Farmer Helpline")}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
              {t("કોઈપણ સાધનની જરૂર છે? સીધો સંપર્ક કરો.", "Need any hardware or irrigation part? Call or WhatsApp.")}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              {t(
                "લાલપુર ગોડાઉનમાંથી તરત માલ તૈયાર મળશે. હોલસેલ તેમજ રિટેલ ખેડૂતો માટે વ્યાજબી ભાવ.",
                "Direct store pickup & wholesale delivery available from Lalpur store."
              )}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={`tel:${business.phone1}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-gray-900 hover:bg-stone-100 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 text-center"
            >
              <Phone className="w-4 h-4 text-[#1E8E3E]" />
              <span>{t("કોલ કરો: ", "Call: ")}{business.phone1Display}</span>
            </a>

            <a
              href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
                lang === "gu"
                  ? "નમસ્તે રાધે હાર્ડવેર, મારે સામાન વિશે પૂછપરછ કરવી છે."
                  : "Hello Radhe Hardware, I want to inquire about irrigation supplies."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs sm:text-sm font-bold shadow-green-glow transition-all active:scale-95 text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t("WhatsApp પર પૂછો", "Chat on WhatsApp")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
