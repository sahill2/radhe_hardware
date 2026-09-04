"use client";

import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteContent } from "../data/content";
import { Check, ArrowRight, RotateCcw, MessageCircle, Phone, Sparkles } from "lucide-react";

export default function IrrigationSetupBuilder() {
  const { lang, t } = useLanguage();
  const { business } = siteContent;

  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<{
    pipe?: string;
    valve?: string;
    filter?: string;
    fitting?: string;
    irrigationType?: string;
  }>({});

  const pipes = [
    { id: "p-63", titleGu: "૬૩mm (૨.૫\") PVC પાઈપ", titleEn: "63mm (2.5\") PVC Pipe", descGu: "નાના ખેતર અને ૨-૩ HP પંપ", descEn: "For 2-3 HP pump" },
    { id: "p-75", titleGu: "૭૫mm (૩\") PVC પાઈપ (સૌથી લોકપ્રિય)", titleEn: "75mm (3\") PVC Pipe (Most Popular)", descGu: "૫ HP પંપ અને રેગ્યુલર ખેતર", descEn: "For 5 HP pump & standard field" },
    { id: "p-90", titleGu: "૯૦mm (૩.૫\") PVC પાઈપ", titleEn: "90mm (3.5\") PVC Pipe", descGu: "૭.૫ HP પંપ અને મોટો પ્રવાહ", descEn: "For 7.5 HP pump & high flow" },
    { id: "p-110", titleGu: "૧૧૦mm (૪\") હેવી PVC પાઈપ", titleEn: "110mm (4\") Heavy PVC Pipe", descGu: "૧૦+ HP પંપ અને લાંબી લાઇન", descEn: "For 10+ HP pump & long runs" },
  ];

  const valves = [
    { id: "v-pp-solid", titleGu: "PP સોલિડ બોલ વાલ્વ", titleEn: "PP Solid Ball Valve", descGu: "લીકેજ પ્રૂફ સ્મૂથ કંટ્રોલ", descEn: "Leak-proof smooth control" },
    { id: "v-air-valve", titleGu: "ઓટોમેટિક એર વાલ્વ સાથે", titleEn: "With Automatic Air Valve", descGu: "પાઈપલાઈન સેફ્ટી માટે", descEn: "For pipeline safety" },
  ];

  const filters = [
    { id: "f-disc", titleGu: "સેન્ટર ડિસ્ક ફિલ્ટર (૧૨૦ મેશ)", titleEn: "Center Disc Filter (120 Mesh)", descGu: "બારીક કાંપ અને કચરા માટે", descEn: "For fine silt & algae" },
    { id: "f-screen", titleGu: "સ્ક્રીન મેશ ફિલ્ટર", titleEn: "Screen Mesh Filter", descGu: "સામાન્ય કચરા માટે", descEn: "For regular debris" },
    { id: "f-hydro", titleGu: "હાઇડ્રોસાયક્લોન (રેતી સેપરેટર)", titleEn: "Hydrocyclone Sand Separator", descGu: "બોરવેલની રેતી દૂર કરવા", descEn: "For heavy borewell sand" },
  ];

  const fittings = [
    { id: "fit-c-type", titleGu: "C-ટાઈપ ક્વિક લેચ ફિટિંગ્સ", titleEn: "C-Type Quick Latch Fittings", descGu: "ઝડપી જોડાણ અને છૂટું કરવા", descEn: "Fast coupling & detachment" },
    { id: "fit-socket", titleGu: "સોલવન્ટ સિમેન્ટ સોકેટ ફિટિંગ્સ", titleEn: "Permanent Socket Fittings", descGu: "જમીન અંદર પાકી લાઇન માટે", descEn: "For fixed underground lines" },
  ];

  const irrigationTypes = [
    { id: "irr-sprinkler", titleGu: "સ્પ્રિંકલર સ્ટેન્ડ અને ઈમ્પેક્ટ હેડ્સ", titleEn: "Sprinkler Stand & Impact Heads", descGu: "ઘઉં, મગફળી, જીરૂ વગેરે", descEn: "For wheat, groundnut, cumin" },
    { id: "irr-raingun", titleGu: "હાઈ-રેડિયસ રેઈન ગન (૧\" - ૨\")", titleEn: "High-Radius Rain Gun (1\" to 2\")", descGu: "મોટા ખેતરો અને શેરડી", descEn: "For large fields & sugarcane" },
    { id: "irr-drip", titleGu: "ટપક (ડ્રિપ) ઈરીગેશન સેટ", titleEn: "Drip Irrigation Setup", descGu: "શાકભાજી, કપાસ, બાગાયત", descEn: "For vegetables, cotton, orchards" },
    { id: "irr-rainpipe", titleGu: "૪૦mm લેસર રેઈન પાઈપ", titleEn: "40mm Laser Rain Pipe", descGu: "ડુંગળી, લસણ, ઘાસચારો", descEn: "For onions, garlic, fodder" },
  ];

  const handleSelect = (key: string, val: string) => {
    setSelections({ ...selections, [key]: val });
  };

  const getSummaryWhatsAppText = () => {
    if (lang === "gu") {
      return `નમસ્તે રાધે હાર્ડવેર, મેં વેબસાઈટ પરથી ઈરીગેશન સેટઅપ પસંદ કર્યો છે:\n` +
        `• પાઈપ: ${selections.pipe || "પસંદ કરેલ નથી"}\n` +
        `• વાલ્વ: ${selections.valve || "પસંદ કરેલ નથી"}\n` +
        `• ફિલ્ટર: ${selections.filter || "પસંદ કરેલ નથી"}\n` +
        `• ફિટિંગ: ${selections.fitting || "પસંદ કરેલ નથી"}\n` +
        `• સિસ્ટમ: ${selections.irrigationType || "પસંદ કરેલ નથી"}\n` +
        `કૃપા કરીને આ સેટઅપના ભાવ અને જરૂરી વિગત જણાવો.`;
    } else {
      return `Hello Radhe Hardware, I customized an irrigation setup on your website:\n` +
        `• Pipe: ${selections.pipe || "Not selected"}\n` +
        `• Valve: ${selections.valve || "Not selected"}\n` +
        `• Filter: ${selections.filter || "Not selected"}\n` +
        `• Fittings: ${selections.fitting || "Not selected"}\n` +
        `• System: ${selections.irrigationType || "Not selected"}\n` +
        `Please share the current price and guidance for this setup.`;
    }
  };

  return (
    <section id="builder" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Main Card */}
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-[#ebebeb] shadow-card-dual">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E8E3E] text-xs font-bold mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("ઈન્ટરેક્ટિવ સિસ્ટમ પ્લાનર", "Interactive Setup Builder")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827]">
              {t("તમારો ઈરીગેશન સેટઅપ બનાવો", "Build Your Irrigation Setup")}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">
              {t(
                "પગલું દર પગલું તમારી જરૂરિયાત પસંદ કરો અને એક ક્લિકમાં રાધે હાર્ડવેર પાસેથી તૈયાર ક્વોટેશન મેળવો.",
                "Choose your farm requirements step-by-step and get an instant custom quotation on WhatsApp."
              )}
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex items-center justify-between max-w-xl mx-auto mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#f2f4f5] -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-[#1E8E3E] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(s)}
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                  step === s
                    ? "bg-[#1E8E3E] text-white shadow-green-glow scale-110"
                    : step > s
                    ? "bg-[#146C2E] text-white"
                    : "bg-[#f2f4f5] text-[#6b7280] border border-[#ebebeb]"
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </button>
            ))}
          </div>

          {/* Step Content Container */}
          <div className="max-w-2xl mx-auto bg-[#f2f4f5] p-5 sm:p-7 rounded-2xl border border-[#ebebeb]">
            {/* Step 1: Pipes */}
            {step === 1 && (
              <div>
                <h3 className="text-base font-bold text-[#111827] mb-1">
                  {t("પગલું ૧: મુખ્ય PVC પાઈપ સાઈઝ પસંદ કરો", "Step 1: Choose Main PVC Pipe Size")}
                </h3>
                <p className="text-xs text-[#6b7280] mb-4">
                  {t("તમારા પંપ અને ખેતરના માપ મુજબ પાઈપ પસંદ કરો:", "Select diameter based on pump capacity:")}
                </p>
                <div className="space-y-2.5">
                  {pipes.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelect("pipe", t(p.titleGu, p.titleEn))}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selections.pipe === t(p.titleGu, p.titleEn)
                          ? "bg-white border-[#1E8E3E] shadow-sm ring-1 ring-[#1E8E3E]"
                          : "bg-white/80 border-[#ebebeb] hover:bg-white"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-[#111827] block">{t(p.titleGu, p.titleEn)}</span>
                        <span className="text-xs text-[#6b7280]">{t(p.descGu, p.descEn)}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selections.pipe === t(p.titleGu, p.titleEn) ? "border-[#1E8E3E] bg-[#1E8E3E] text-white" : "border-[#cccccc]"}`}>
                        {selections.pipe === t(p.titleGu, p.titleEn) && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Valves */}
            {step === 2 && (
              <div>
                <h3 className="text-base font-bold text-[#111827] mb-1">
                  {t("પગલું ૨: કંટ્રોલ વાલ્વ પસંદ કરો", "Step 2: Choose Control Valve")}
                </h3>
                <p className="text-xs text-[#6b7280] mb-4">
                  {t("પાણીના દબાણ અને નિયંત્રણ માટે વાલ્વ:", "Flow control & pipeline safety:")}
                </p>
                <div className="space-y-2.5">
                  {valves.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => handleSelect("valve", t(v.titleGu, v.titleEn))}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selections.valve === t(v.titleGu, v.titleEn)
                          ? "bg-white border-[#1E8E3E] shadow-sm ring-1 ring-[#1E8E3E]"
                          : "bg-white/80 border-[#ebebeb] hover:bg-white"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-[#111827] block">{t(v.titleGu, v.titleEn)}</span>
                        <span className="text-xs text-[#6b7280]">{t(v.descGu, v.descEn)}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selections.valve === t(v.titleGu, v.titleEn) ? "border-[#1E8E3E] bg-[#1E8E3E] text-white" : "border-[#cccccc]"}`}>
                        {selections.valve === t(v.titleGu, v.titleEn) && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Filters */}
            {step === 3 && (
              <div>
                <h3 className="text-base font-bold text-[#111827] mb-1">
                  {t("પગલું ૩: ફિલ્ટરેશન યુનિટ પસંદ કરો", "Step 3: Choose Filtration Unit")}
                </h3>
                <p className="text-xs text-[#6b7280] mb-4">
                  {t("નોઝલ ચોકઅપ રોકવા માટે યોગ્ય ફિલ્ટર:", "Prevent clogging with optimal filtration:")}
                </p>
                <div className="space-y-2.5">
                  {filters.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => handleSelect("filter", t(f.titleGu, f.titleEn))}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selections.filter === t(f.titleGu, f.titleEn)
                          ? "bg-white border-[#1E8E3E] shadow-sm ring-1 ring-[#1E8E3E]"
                          : "bg-white/80 border-[#ebebeb] hover:bg-white"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-[#111827] block">{t(f.titleGu, f.titleEn)}</span>
                        <span className="text-xs text-[#6b7280]">{t(f.descGu, f.descEn)}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selections.filter === t(f.titleGu, f.titleEn) ? "border-[#1E8E3E] bg-[#1E8E3E] text-white" : "border-[#cccccc]"}`}>
                        {selections.filter === t(f.titleGu, f.titleEn) && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Fittings */}
            {step === 4 && (
              <div>
                <h3 className="text-base font-bold text-[#111827] mb-1">
                  {t("પગલું ૪: ફિટિંગ સિસ્ટમ પસંદ કરો", "Step 4: Choose Fitting System")}
                </h3>
                <p className="text-xs text-[#6b7280] mb-4">
                  {t("પાઈપલાઈનનું જોડાણ કેવું રાખવું છે?", "Coupling and joint mechanism:")}
                </p>
                <div className="space-y-2.5">
                  {fittings.map((fit) => (
                    <div
                      key={fit.id}
                      onClick={() => handleSelect("fitting", t(fit.titleGu, fit.titleEn))}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selections.fitting === t(fit.titleGu, fit.titleEn)
                          ? "bg-white border-[#1E8E3E] shadow-sm ring-1 ring-[#1E8E3E]"
                          : "bg-white/80 border-[#ebebeb] hover:bg-white"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-[#111827] block">{t(fit.titleGu, fit.titleEn)}</span>
                        <span className="text-xs text-[#6b7280]">{t(fit.descGu, fit.descEn)}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selections.fitting === t(fit.titleGu, fit.titleEn) ? "border-[#1E8E3E] bg-[#1E8E3E] text-white" : "border-[#cccccc]"}`}>
                        {selections.fitting === t(fit.titleGu, fit.titleEn) && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Irrigation Type & Summary */}
            {step === 5 && (
              <div>
                <h3 className="text-base font-bold text-[#111827] mb-1">
                  {t("પગલું ૫: સિંચાઈ પદ્ધતિ અને સ્પ્રિંકલર પ્રકાર", "Step 5: Irrigation Method & Emitter Type")}
                </h3>
                <p className="text-xs text-[#6b7280] mb-4">
                  {t("તમારા પાક મુજબ અંતિમ સાધન પસંદ કરો:", "Final emitter for your crop:")}
                </p>
                <div className="space-y-2.5 mb-6">
                  {irrigationTypes.map((irr) => (
                    <div
                      key={irr.id}
                      onClick={() => handleSelect("irrigationType", t(irr.titleGu, irr.titleEn))}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selections.irrigationType === t(irr.titleGu, irr.titleEn)
                          ? "bg-white border-[#1E8E3E] shadow-sm ring-1 ring-[#1E8E3E]"
                          : "bg-white/80 border-[#ebebeb] hover:bg-white"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-[#111827] block">{t(irr.titleGu, irr.titleEn)}</span>
                        <span className="text-xs text-[#6b7280]">{t(irr.descGu, irr.descEn)}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selections.irrigationType === t(irr.titleGu, irr.titleEn) ? "border-[#1E8E3E] bg-[#1E8E3E] text-white" : "border-[#cccccc]"}`}>
                        {selections.irrigationType === t(irr.titleGu, irr.titleEn) && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final Selections Summary Box */}
                <div className="bg-white p-4 rounded-xl border border-[#ebebeb] mb-4">
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                    {t("તમારો પસંદ કરેલ સેટઅપ:", "Your Customized Setup Summary:")}
                  </h4>
                  <ul className="text-xs space-y-1 text-[#374151]">
                    <li>• <strong>{t("પાઈપ:", "Pipe:")}</strong> {selections.pipe || t("પસંદ થયેલ નથી", "Not selected")}</li>
                    <li>• <strong>{t("વાલ્વ:", "Valve:")}</strong> {selections.valve || t("પસંદ થયેલ નથી", "Not selected")}</li>
                    <li>• <strong>{t("ફિલ્ટર:", "Filter:")}</strong> {selections.filter || t("પસંદ થયેલ નથી", "Not selected")}</li>
                    <li>• <strong>{t("ફિટિંગ્સ:", "Fittings:")}</strong> {selections.fitting || t("પસંદ થયેલ નથી", "Not selected")}</li>
                    <li>• <strong>{t("સિસ્ટમ:", "System:")}</strong> {selections.irrigationType || t("પસંદ થયેલ નથી", "Not selected")}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="mt-6 pt-4 border-t border-[#ebebeb] flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-full bg-white hover:bg-stone-100 text-[#111827] text-xs font-semibold border border-[#ebebeb]"
                >
                  {t("પાછા જાઓ", "Back")}
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-green-glow"
                >
                  <span>{t("આગળ વધો", "Next Step")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <a
                  href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(getSummaryWhatsAppText())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs sm:text-sm font-bold shadow-green-glow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t("WhatsApp પર આખો ભાવ મેળવો", "Get Full Quote on WhatsApp")}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
