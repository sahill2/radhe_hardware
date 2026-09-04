"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import SearchModal from "./SearchModal";
import { Home, User, Grid, MapPin, Phone, MessageSquare } from "lucide-react";

export default function MobileBottomNav() {
  const { t } = useLanguage();
  const { business } = siteContent;
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe"
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

          {/* 2. Profile / Why Radhe */}
          <Link
            href="/#why-radhe"
            className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t("પરિચય", "Profile")}</span>
          </Link>

          {/* 3. Our Range / Categories (Elevated Center Button) */}
          <div className="flex justify-center -mt-4">
            <Link
              href="/categories"
              className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-[#1E8E3E] text-white shadow-lg border-2 border-white active:scale-95 transition-transform"
            >
              <Grid className="w-5 h-5" />
              <span className="text-[8px] font-bold uppercase">{t("રેન્જ", "Range")}</span>
            </Link>
          </div>

          {/* 4. Contact Us / Map */}
          <Link
            href="/#contact-location"
            className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t("સંપર્ક", "Contact")}</span>
          </Link>

          {/* 5. Call Us */}
          <a
            href={`tel:${business.phone1}`}
            className="flex flex-col items-center justify-center py-1 text-[#1E8E3E] hover:text-[#146C2E] transition-colors font-medium"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t("કોલ કરો", "Call Us")}</span>
          </a>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
