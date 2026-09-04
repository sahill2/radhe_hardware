import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustBadges from "../components/TrustBadges";
import WhatDoYouNeed from "../components/WhatDoYouNeed";
import CategoryGrid from "../components/CategoryGrid";
import PopularProducts from "../components/PopularProducts";
import QuickCallToAction from "../components/QuickCallToAction";
import LocationContact from "../components/LocationContact";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import MobileBottomNav from "../components/MobileBottomNav";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-[#111827] flex flex-col justify-between selection:bg-[#1E8E3E] selection:text-white pb-16 md:pb-0">
      {/* 1. Header with Compact Top Announcement Bar, Search & Menu */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex-1 w-full">
        {/* 2. Short Hero Section */}
        <Hero />

        {/* 3. Trust Badges & ISI Certifications */}
        <TrustBadges />

        {/* 4. "તમને શું જોઈએ?" (What Do You Need?) - 8 Farmer Friendly Categories */}
        <WhatDoYouNeed />

        {/* 5. Main Category Grid (6 Primary Categories) */}
        <CategoryGrid />

        {/* 6. Small Featured Products Section */}
        <PopularProducts />

        {/* 7. Simple Farmer Helpline CTA */}
        <QuickCallToAction />

        {/* 8. Store Location, Map & Contact */}
        <LocationContact />
      </main>

      {/* 9. Global Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Mobile-First Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}
