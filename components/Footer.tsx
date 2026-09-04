"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Lock } from "lucide-react";

export default function Footer() {
  const { lang, t } = useLanguage();
  const { business } = siteContent;

  return (
    <footer className="w-full bg-[#111827] text-white pt-12 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand Col */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-extrabold tracking-tight text-white">
                {t(business.nameGu, business.nameEn)}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#1E8E3E]" />
            </div>

            <p className="text-xs font-bold text-emerald-400 mb-2">
              {t(business.taglineGu, business.taglineEn)}
            </p>

            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              {t(
                "ગુજરાતના ખેડૂતો માટે ઉચ્ચ ગુણવત્તાવાળા સ્પ્રિંકલર સિસ્ટમ્સ, સ્વર્ણિમ™ ISI PVC પાઈપો અને ઈરીગેશન એક્સેસરીઝનું વિશ્વસનીય કેન્દ્ર.",
                "Gujarat farmers' trusted hub for high-performance sprinkler systems, Swarnim™ ISI PVC pipes, and irrigation accessories."
              )}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-stone-300 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#1E8E3E]" />
              <span>{business.isiNumber} • {business.isiLicense}</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              {t("મુખ્ય કેટેગરીઝ", "Main Categories")}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link href="/category/pvc-pipes" className="hover:text-white transition-colors">
                  {t("PVC પાઈપો (ISI & Non-ISI)", "PVC Pipes (ISI & Non-ISI)")}
                </Link>
              </li>
              <li>
                <Link href="/category/sprinkler-system" className="hover:text-white transition-colors">
                  {t("સ્પ્રિંકલર અને સેટઅપ", "Sprinklers & Setups")}
                </Link>
              </li>
              <li>
                <Link href="/category/drip-irrigation" className="hover:text-white transition-colors">
                  {t("ડ્રિપ ઈરીગેશન સાધનો", "Drip Irrigation Supplies")}
                </Link>
              </li>
              <li>
                <Link href="/category/rain-pipe-fittings" className="hover:text-white transition-colors">
                  {t("૪૦mm રેઈન પાઈપ & કોક", "40mm Rain Pipes & Cocks")}
                </Link>
              </li>
              <li>
                <Link href="/category/plumbing-fittings" className="hover:text-white transition-colors">
                  {t("પ્લમ્બિંગ ફિટિંગ્સ & એડેપ્ટર", "Plumbing Fittings & Adapters")}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-emerald-400 font-semibold transition-colors">
                  {t("તમામ ૧૨ કેટેગરીઝ જુઓ →", "View All 12 Categories →")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              {t("સંપર્ક અને દુકાન", "Contact & Location")}
            </h4>
            <ul className="space-y-3 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1E8E3E] shrink-0 mt-0.5" />
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {t(business.addressGu, business.addressEn)}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1E8E3E] shrink-0" />
                <a href={`tel:${business.phone1}`} className="hover:text-white font-semibold">
                  {business.phone1Display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1E8E3E] shrink-0" />
                <a href={`tel:${business.phone2}`} className="hover:text-white font-semibold">
                  {business.phone2Display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#1E8E3E] shrink-0" />
                <span>{t(business.hoursGu, business.hoursEn)}</span>
              </li>
            </ul>
          </div>

          {/* Wholesale & Delivery Col */}
          <div className="flex flex-col justify-between">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <span className="text-xs font-bold text-amber-400 block mb-1">
                {t(business.wholesaleGu, business.wholesaleEn)}
              </span>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                {t(
                  "રિટેલ ગ્રાહકો તેમજ ખેત મંડળીઓ અને હોલસેલ ડિલિવરી માટે ખાસ વ્યવસ્થા.",
                  "Dedicated logistics for retail farmers as well as bulk agricultural cooperatives."
                )}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-center sm:text-left">
              <p className="text-xs text-emerald-300 font-medium">
                "{t(business.blessingGu, business.blessingEn)}"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright row with discreet owner login */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} {t(business.nameGu, business.nameEn)}. {t("સર્વાધિકાર સુરક્ષિત.", "All rights reserved.")}
          </p>

          <div className="flex items-center gap-4">
            <span>{t("લાલપુર, તા. કપડવંજ, ગુજરાત", "Lalpur, Ta. Kapadwanj, Gujarat")}</span>
            <span className="text-stone-600">•</span>
            {/* Discreet Owner / Admin link */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-300 transition-colors text-[11px]"
            >
              <Lock className="w-3 h-3" />
              <span>{t("ઓનર લોગીન", "Owner Login")}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
