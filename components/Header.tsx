"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { mainCategories } from "../data/categories";
import SearchModal from "./SearchModal";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Globe,
  Search,
  Grid,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function Header() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { business } = siteContent;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300">
        {/* Top Micro Announcement Bar */}
        <div className="bg-[#111827] text-white text-[11px] sm:text-[12px] py-1 px-3 sm:px-4 border-b border-white/10">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-medium text-stone-200">
                {t(business.hoursGu, business.hoursEn)}
              </span>
              <span className="hidden sm:inline text-stone-500">•</span>
              <span className="hidden sm:inline text-emerald-400 font-medium">
                {t(business.wholesaleGu, business.wholesaleEn)}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 text-stone-300 transition-colors flex items-center gap-1 text-[11px]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1E8E3E]" />
                <span className="hidden sm:inline">{t("લાલપુર, કપડવંજ", "Lalpur, Kapadwanj")}</span>
              </a>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLang}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-[11px] font-semibold cursor-pointer border border-white/20"
                title="Switch Language"
              >
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>{lang === "gu" ? "English" : "ગુજરાતી"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`w-full transition-all duration-300 bg-white ${
            scrolled ? "shadow-md py-2 sm:py-3" : "py-2.5 sm:py-3.5 border-b border-gray-200"
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-3 sm:px-4">
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {/* Logo & Brand Wordmark */}
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1E8E3E] to-[#66BB6A] p-[2px] shadow-sm flex items-center justify-center shrink-0">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#1E8E3E]" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-[19px] lg:text-[21px] font-extrabold tracking-tight text-gray-900 leading-none">
                      {t(business.nameGu, business.nameEn)}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#1E8E3E] inline-block" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#1E8E3E] leading-tight mt-0.5">
                    {t(business.taglineGu, business.taglineEn)}
                  </span>
                </div>
              </Link>

              {/* Central Search Bar */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-500 text-xs font-medium border border-gray-200 transition-all w-72 lg:w-96 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#1E8E3E]" />
                <span className="truncate">{t("પાઈપ, સ્પ્રિંકલર, વાલ્વ, ફિટિંગ શોધો...", "Search products, pipes, fittings, sprinklers...")}</span>
                <kbd className="ml-auto text-[10px] bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-400">
                  /
                </kbd>
              </button>

              {/* Desktop Nav Links */}
              <nav className="flex items-center gap-4 lg:gap-6 text-[13px] font-semibold text-gray-800">
                <Link href="/categories" className="flex items-center gap-1 text-[#1E8E3E] hover:underline">
                  <Grid className="w-4 h-4" />
                  <span>{t("કેટેગરીઝ", "Categories")}</span>
                </Link>
                <Link href="/#sprinklers" className="hover:text-[#1E8E3E] transition-colors">
                  {t("સ્પ્રિંકલર", "Sprinklers")}
                </Link>
                <Link href="/#fittings" className="hover:text-[#1E8E3E] transition-colors">
                  {t("ફિટિંગ્સ", "Fittings")}
                </Link>
                <Link href="/#pvc-pipes" className="hover:text-[#1E8E3E] transition-colors">
                  {t("PVC પાઈપ", "PVC Pipes")}
                </Link>
                <Link href="/#drip" className="hover:text-[#1E8E3E] transition-colors">
                  {t("ડ્રિપ", "Drip")}
                </Link>
              </nav>

              {/* Direct WhatsApp & Call Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${business.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-50 text-[#1E8E3E] hover:bg-emerald-100 text-xs font-bold transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${business.phone1}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t("કોલ", "Call")}</span>
                </a>
              </div>
            </div>

            {/* Mobile Header Row (Matching User Screenshot!) */}
            <div className="md:hidden flex items-center justify-between gap-2">
              {/* Left: Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Center: Search Input Pill */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex-1 flex items-center gap-2 px-3.5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs border border-gray-200 cursor-pointer transition-all shadow-xs"
              >
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate text-[12px]">{t("પ્રોડક્ટ્સ શોધો...", "Search products...")}</span>
              </button>

              {/* Right: WhatsApp Chat Icon */}
              <a
                href={`https://wa.me/${business.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#1E8E3E] hover:bg-emerald-50 active:scale-95 transition-all"
                aria-label="WhatsApp Chat"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#1E8E3E]">
                  <MessageCircle className="w-5 h-5 fill-[#1E8E3E]" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slideout Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-fade-in">
            <div>
              {/* Drawer Header */}
              <div className="p-4 bg-[#111827] text-white flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base">{t(business.nameGu, business.nameEn)}</h3>
                  <p className="text-xs text-emerald-400 mt-0.5">{t(business.taglineGu, business.taglineEn)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Links */}
              <div className="p-4 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-1">
                  {t("મુખ્ય કેટેગરીઝ", "Product Categories")}
                </span>

                <Link
                  href="/categories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 text-gray-800 font-bold text-sm"
                >
                  <div className="flex items-center gap-2 text-[#1E8E3E]">
                    <Grid className="w-4 h-4" />
                    <span>{t("તમામ કેટેગરીઝ (૧૨)", "All Categories (12)")}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                {mainCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-100 text-gray-700 text-sm font-medium"
                  >
                    <span>{t(cat.nameGu, cat.nameEn)}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-2">
              <a
                href={`tel:${business.phone1}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1E8E3E] text-white text-sm font-bold shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{business.phone1}</span>
              </a>

              <button
                type="button"
                onClick={toggleLang}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-semibold"
              >
                <Globe className="w-4 h-4 text-[#1E8E3E]" />
                <span>{lang === "gu" ? "Switch to English" : "ગુજરાતી ભાષા પસંદ કરો"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
