"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileBottomNav from "../../components/MobileBottomNav";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";
import LocationContact from "../../components/LocationContact";
import { useLanguage } from "../../context/LanguageContext";
import { siteContent } from "../../data/content";
import { Phone, MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const { business } = siteContent;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setPhone("");
        setMessage("");
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between selection:bg-[#1E8E3E] selection:text-white pb-16 md:pb-0">
      <Header />

      <main className="flex-1 w-full pb-16">
        {/* Top Banner */}
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-[1240px] mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {t("સંપર્ક અને દુકાનનું સરનામું", "Contact & Store Location")}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
              {t(
                "લાલપુર બસ સ્ટેશન પાસે, તાલુકો કપડવંજ. કોઈપણ પૂછપરછ માટે ફોન કરો અથવા વોટ્સએપ પર મેસેજ કરો.",
                "Near Bus Stop, Lalpur, Ta. Kapadwanj. Call or message us for all agricultural hardware requirements."
              )}
            </p>
          </div>
        </div>

        {/* Quick Enquiry Form */}
        <div className="max-w-[1240px] mx-auto px-4 pt-10">
          <div className="max-w-xl mx-auto bg-white rounded-[28px] p-6 sm:p-8 border border-gray-200 shadow-card-dual mb-12">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {t("ઝડપી પૂછપરછ / કોલબેક વિનંતી", "Quick Enquiry / Callback Request")}
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              {t(
                "તમારું નામ અને મોબાઈલ નંબર લખો. અમારી ટીમ તરત તમારો સંપર્ક કરશે.",
                "Fill in your details and our team will contact you shortly."
              )}
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {t(
                    "આભાર! તમારી પૂછપરછ મળી ગઈ છે. અમે ટૂંક સમયમાં તમને કોલ કરીશું.",
                    "Thank you! Your enquiry has been received. We will call you soon."
                  )}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t("તમારું નામ (Name) *", "Your Name *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="દા.ત. રમેશભાઈ પટેલ"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t("મોબાઈલ નંબર (Phone Number) *", "Phone Number *")}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t("શું સામાન જોઈએ છે? (Requirements)", "What do you need? (Requirements)")}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t(
                      "દા.ત. ૭૫mm PVC પાઈપ અને ૨૦ નંગ સ્પ્રિંકલર નોઝલ...",
                      "e.g. 75mm PVC pipes and 20 sprinkler nozzles..."
                    )}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs sm:text-sm font-bold shadow-green-glow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {submitting
                      ? t("મોકલાઈ રહ્યું છે...", "Submitting...")
                      : t("વિગત મોકલો (Submit Request)", "Submit Request")}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Location & Map Section */}
        <LocationContact />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileBottomNav />
    </div>
  );
}
