"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import SearchModal from "./SearchModal";
import { Home, Search, Grid, MapPin, Phone } from "lucide-react";

export default function MobileBottomNav() {
  const { t } = useLanguage();
  const { business } = siteContent;
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe"
      >
        <div className="grid grid-cols-5 items-center h-14 px-1">
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              pathname === "/" ? "text-[#1E8E3E] font-bold" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t("હોમ", "Home")}</span>
          </Link>

          {/* 2. Search */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t("શોધો", "Search")}</span>
          </button>

          {/* 3. Range / Categories (Elevated Center Button) */}
          <div className="flex justify-center -mt-4">
            <Link
              href="/categories"
              className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white shadow-lg border-2 border-white active:scale-95 transition-transform"
            >
              <Grid className="w-5 h-5" />
              <span className="text-[8px] font-bold uppercase">{t("રેન્જ", "Range")}</span>
            </Link>
          </div>

          {/* 4. Contact Us / Map */}
          <Link
            href="/#location"
            className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t("સંપર્ક", "Location")}</span>
          </Link>

          {/* 5. Call Us */}
          <a
            href={`tel:${business.phone1}`}
            className="flex flex-col items-center justify-center py-1 text-[#1E8E3E] hover:text-[#146C2E] transition-colors font-semibold"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t("કોલ", "Call")}</span>
          </a>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
