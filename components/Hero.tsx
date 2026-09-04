"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import {
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  Cylinder,
  Droplets,
  SlidersHorizontal,
} from "lucide-react";

export default function Hero() {
  const { lang, t } = useLanguage();
  const { business } = siteContent;

  return (
    <section className="relative w-full pt-4 pb-12 sm:pt-6 sm:pb-16 overflow-hidden bg-gradient-to-b from-white to-[#f2f4f5]">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            {/* Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E8E3E] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#1E8E3E]" />
              <span>RADHE HARDWARE • {t("કૃષિ અને સિંચાઈ કેન્દ્ર", "Agriculture & Irrigation Hub")}</span>
            </div>

            {/* Main Headings */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
                {t(business.taglineGu, business.taglineEn)}
              </h1>

              <p className="mt-2 text-lg sm:text-xl font-bold text-[#1E8E3E]">
                {t("કૃષિ, સિંચાઈ અને પ્લમ્બિંગનું વિશ્વાસપાત્ર કેન્દ્ર.", "A trusted place for agriculture, irrigation & plumbing essentials.")}
              </p>

              <p className="mt-3 text-sm sm:text-base text-[#6b7280] leading-relaxed max-w-xl">
                {t(
                  "PVC પાઈપો, સ્પ્રિંકલર સિસ્ટમ, ડ્રિપ ઈરીગેશન, રેઈન પાઈપ, બોલ વાલ્વ, સેન્ટર ફિલ્ટર અને તમામ એગ્રીકલ્ચર ફિટિંગ્સ — ખેડૂતો માટે હોલસેલ અને રિટેલમાં એક જ જગ્યાએ.",
                  "PVC pipes, sprinkler systems, drip irrigation, rain pipes, fittings, valves and spare accessories — wholesale & retail in one place."
                )}
              </p>
            </div>

            {/* Trust Pills Strip */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ebebeb] text-xs font-semibold text-[#111827] shadow-card-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E8E3E]" />
                <span>{business.isiNumber} • {business.isiLicense}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#1E8E3E]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t("સરકારી સબસિડી માન્ય પાઈપ", "Subsidy Approved PVC")}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{business.ratingCount}</span>
              </span>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-sm font-bold shadow-green-glow hover:shadow-green-glow-lg transition-all active:scale-95 text-center group"
              >
                <span>{t("પ્રોડક્ટ્સ અને કેટેગરીઝ જુઓ", "Explore Products")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
                  lang === "gu"
                    ? "નમસ્તે રાધે હાર્ડવેર, મારે ખેતીના સાધનો અને પાઈપ વિશે માહિતી જોઈએ છે."
                    : "Hello Radhe Hardware, I need details about agriculture irrigation supplies."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-[#111827] text-sm font-bold border border-[#ebebeb] shadow-card-sm hover:border-[#1E8E3E]/40 transition-all active:scale-95 text-center"
              >
                <MessageCircle className="w-4 h-4 text-[#1E8E3E]" />
                <span>{t("WhatsApp પર પૂછો", "WhatsApp Us")}</span>
              </a>

              <a
                href={`tel:${business.phone1}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-[#111827] text-xs font-bold transition-all active:scale-95 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#1E8E3E]" />
                <span>{business.phone1Display}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual with Floating Category Cards */}
          <div className="lg:col-span-6 relative">
            {/* Main Visual Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-[28px] overflow-hidden shadow-card-lg border border-[#ebebeb] bg-[#f2f4f5]">
              <Image
                src="/images/hero-irrigation.jpg"
                alt="Agricultural farm irrigation setup in Gujarat"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Bottom Caption inside Image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-0.5">
                  {t("સંપૂર્ણ સિંચાઈ સોલ્યુશન", "Complete Irrigation Solution")}
                </span>
                <p className="text-sm font-semibold leading-snug">
                  {t("સ્વર્ણિમ™ પાઈપ & સ્પ્રિંકલર સેટઅપ — લાલપુર (કપડવંજ)", "Swarnim™ Pipes & Sprinkler Setups — Lalpur (Kapadwanj)")}
                </p>
              </div>
            </div>

            {/* Floating Mini Product Badges around Hero (Desktop) */}
            {/* Badge 1: PVC Pipe */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#ebebeb] shadow-card-dual items-center gap-2.5 animate-fade-in">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Cylinder className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#111827] block leading-none">
                  {t("સ્વર્ણિમ™ PVC પાઈપો", "Swarnim™ PVC Pipes")}
                </span>
                <span className="text-[10px] text-[#6b7280]">
                  {t("ISI IS:4985 સબસિડી માન્ય", "ISI IS:4985 Subsidy")}
                </span>
              </div>
            </div>

            {/* Badge 2: Sprinkler Setup */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#ebebeb] shadow-card-dual items-center gap-2.5 animate-fade-in">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#1E8E3E] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#111827] block leading-none">
                  {t("સ્પ્રિંકલર & નોઝલ", "Sprinklers & Nozzles")}
                </span>
                <span className="text-[10px] text-[#6b7280]">
                  {t("સ્ટેન્ડ & વાલ્વ સાથે", "With Stands & Valves")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
