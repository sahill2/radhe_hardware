import Header from "../components/Header";
import MobileCategoryStrip from "../components/MobileCategoryStrip";
import Hero from "../components/Hero";
import TrustBadges from "../components/TrustBadges";
import WhatDoYouNeed from "../components/WhatDoYouNeed";
import CategoryShowcaseSection from "../components/CategoryShowcaseSection";
import CategoryGrid from "../components/CategoryGrid";
import ProductFeatureGrid from "../components/ProductFeatureGrid";
import IrrigationFlowDiagram from "../components/IrrigationFlowDiagram";
import PvcSection from "../components/PvcSection";
import ChecklistSection from "../components/ChecklistSection";
import WhyRadheHardware from "../components/WhyRadheHardware";
import IrrigationSetupBuilder from "../components/IrrigationSetupBuilder";
import Testimonials from "../components/Testimonials";
import LocationContact from "../components/LocationContact";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import MobileBottomNav from "../components/MobileBottomNav";
import { products } from "../data/products";

export default function Home() {
  // Filter products by primary categories
  const sprinklerProducts = products.filter(
    (p) => p.category === "sprinkler-system" || p.category === "sprinkler-fittings"
  );
  const fittingsProducts = products.filter(
    (p) =>
      p.category === "plumbing-fittings" ||
      p.category === "fittings-spare-parts" ||
      p.category === "fabricated-threaded-fittings"
  );
  const pvcPipeProducts = products.filter((p) => p.category === "pvc-pipes");
  const dripProducts = products.filter((p) => p.category === "drip-irrigation");
  const rainPipeProducts = products.filter((p) => p.category === "rain-pipe-fittings");
  const valveFilterProducts = products.filter(
    (p) => p.category === "valves" || p.category === "filters" || p.category === "irrigation-accessories"
  );

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-[#111827] flex flex-col justify-between selection:bg-[#1E8E3E] selection:text-white pb-16 md:pb-0">
      {/* 1. Sticky Header with Search, Lang Switcher & Quick CTAs */}
      <Header />

      {/* 2. Horizontal Category Navigation Strip */}
      <MobileCategoryStrip />

      {/* Main Content Hierarchy */}
      <main className="flex-1 w-full">
        {/* 3. Hero Section (Split Layout) */}
        <Hero />

        {/* 4. Trust Badges & ISI Certifications */}
        <TrustBadges />

        {/* 5. "તમને શું જોઈએ?" Farmer-Friendly Quick Navigator */}
        <WhatDoYouNeed />

        {/* ========================================================= */}
        {/* CATEGORY SHOWCASES (2-Column Mobile Grid like Reference)  */}
        {/* ========================================================= */}

        {/* 6. Sprinkler Showcase */}
        <CategoryShowcaseSection
          titleEn="Sprinkler Systems & Fittings"
          titleGu="સ્પ્રિંકલર સિસ્ટમ અને ફિટિંગ્સ"
          subtitleEn="Impact heads, riser pipes, tripod stands, C-type couplers"
          subtitleGu="ઈમ્પેક્ટ હેડ્સ, રાઈઝર પાઈપ, ટ્રાઈપોડ સ્ટેન્ડ, C-ટાઈપ કપ્લર્સ"
          categorySlug="sprinkler-system"
          products={sprinklerProducts}
        />

        {/* 7. Fittings & Spare Parts Showcase */}
        <CategoryShowcaseSection
          titleEn="Plumbing & Threaded Fittings"
          titleGu="પ્લમ્બિંગ અને થ્રેડેડ ફિટિંગ્સ"
          subtitleEn="Elbows, tees, adapters, fabricated bends, nipples, gaskets"
          subtitleGu="એલ્બો, ટી, એડેપ્ટર્સ, થ્રેડેડ બેન્ડ, નીપલ, રબર વોશર"
          categorySlug="plumbing-fittings"
          products={fittingsProducts}
        />

        {/* 8. PVC Pipes Showcase */}
        <CategoryShowcaseSection
          titleEn="PVC Pipes (ISI & Commercial)"
          titleGu="PVC પાઈપો (ISI અને કોમર્શિયલ)"
          subtitleEn="Swarnim™ ISI IS:4985, Class-2 & Class-3 high pressure pipes"
          subtitleGu="સ્વર્ણિમ™ ISI IS:4985, ક્લાસ-૨ અને ક્લાસ-૩ હાઈ પ્રેશર પાઈપો"
          categorySlug="pvc-pipes"
          products={pvcPipeProducts}
        />

        {/* 9. Drip Irrigation Showcase */}
        <CategoryShowcaseSection
          titleEn="Drip Irrigation & Accessories"
          titleGu="ડ્રિપ ઈરીગેશન અને સાધનો"
          subtitleEn="Drippers, foggers, lateral cocks, start connectors, grommets"
          subtitleGu="ડ્રિપર્સ, ફોગર્સ, લેટરલ કોક, સ્ટાર્ટ કનેક્ટર, રબર ગ્રોમેટ્સ"
          categorySlug="drip-irrigation"
          products={dripProducts}
        />

        {/* 10. Rain Pipe Showcase */}
        <CategoryShowcaseSection
          titleEn="Rain Pipe & Fittings"
          titleGu="રેઈન પાઈપ અને ફિટિંગ્સ"
          subtitleEn="40mm laser-punched rain pipes, MTA/FTA cocks, joiners"
          subtitleGu="૪૦mm લેસર પંચ રેઈન પાઈપો, MTA/FTA કોક, જોઈનર્સ"
          categorySlug="rain-pipe-fittings"
          products={rainPipeProducts}
        />

        {/* 11. Valves & Filtration Showcase */}
        <CategoryShowcaseSection
          titleEn="Valves, Filters & Irrigation Tools"
          titleGu="વાલ્વ, ફિલ્ટર્સ અને સાધનો"
          subtitleEn="PP solid ball valves, disc filters, Venturi injectors, pressure gauges"
          subtitleGu="PP સોલિડ બોલ વાલ્વ, ડિસ્ક ફિલ્ટર્સ, વેન્ચુરી, પ્રેશર ગેજ"
          categorySlug="valves"
          products={valveFilterProducts}
        />

        {/* 12. Main Categories Grid (12 Categories) */}
        <CategoryGrid />

        {/* 13. Swarnim™ PVC Pipe Spotlight */}
        <PvcSection />

        {/* 14. 5-Item Sprinkler Breakdown */}
        <ProductFeatureGrid />

        {/* 15. Complete Irrigation Flow Diagram (Water Source -> Field) */}
        <IrrigationFlowDiagram />

        {/* 16. Equipment Checklist */}
        <ChecklistSection />

        {/* 17. Why Radhe Hardware (Bento Grid) */}
        <WhyRadheHardware />

        {/* 18. Interactive Setup Builder */}
        <IrrigationSetupBuilder />

        {/* 19. Farmer Reviews & Google Ratings */}
        <Testimonials />

        {/* 20. Google Maps, Store Hours & Contact */}
        <LocationContact />
      </main>

      {/* 21. Global Footer */}
      <Footer />

      {/* 22. Floating WhatsApp Chat Pill */}
      <FloatingWhatsApp />

      {/* 23. Mobile Bottom 5-Tab Navigation Dock */}
      <MobileBottomNav />
    </div>
  );
}
