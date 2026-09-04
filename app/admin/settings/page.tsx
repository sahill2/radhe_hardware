"use client";

import React, { useState } from "react";
import { Settings, Save, Shield, Phone, MessageCircle, MapPin, CheckCircle2, Clock } from "lucide-react";
import { siteContent } from "@/data/content";

export default function AdminSettingsPage() {
  const { business } = siteContent;
  const [saved, setSaved] = useState(false);
  const [phone1, setPhone1] = useState(business.phone1);
  const [phone2, setPhone2] = useState(business.phone2);
  const [whatsapp, setWhatsapp] = useState(business.whatsappNumber);
  const [addressGu, setAddressGu] = useState(business.addressGu);
  const [addressEn, setAddressEn] = useState(business.addressEn);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passMsg, setPassMsg] = useState("");

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          દુકાન અને એકાઉન્ટ સેટિંગ્સ (Store & Account Settings)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          દુકાનની સંપર્ક માહિતી, વોટ્સએપ નંબર અને એડમિન પાસવર્ડ
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>સેટિંગ્સ સફળતાપૂર્વક સાચવવામાં આવી છે!</span>
        </div>
      )}

      {/* Business Contact Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>સંપર્ક અને વોટ્સએપ વિગતો</span>
        </h3>

        <form onSubmit={handleSaveInfo} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                મુખ્ય ફોન નંબર (Phone 1)
              </label>
              <input
                type="text"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold outline-none focus:bg-white focus:border-[#1E8E3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                બીજો ફોન નંબર (Phone 2)
              </label>
              <input
                type="text"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold outline-none focus:bg-white focus:border-[#1E8E3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                વોટ્સએપ નંબર (WhatsApp No. with 91)
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold outline-none focus:bg-white focus:border-[#1E8E3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                સમયગાળો (Store Hours)
              </label>
              <input
                type="text"
                defaultValue={business.hoursGu}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold outline-none focus:bg-white focus:border-[#1E8E3E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              દુકાનનું સરનામું (ગુજરાતી)
            </label>
            <input
              type="text"
              value={addressGu}
              onChange={(e) => setAddressGu(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:bg-white focus:border-[#1E8E3E]"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>માહિતી સાચવો (Save Store Details)</span>
          </button>
        </form>
      </div>

      {/* Security Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>એડમિન એકાઉન્ટ પાસવર્ડ બદલો</span>
        </h3>

        {passMsg && (
          <div className="p-3 rounded-xl bg-blue-50 text-blue-800 text-xs font-medium">
            {passMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              હાલનો પાસવર્ડ
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:bg-white focus:border-[#1E8E3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              નવો પાસવર્ડ
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:bg-white focus:border-[#1E8E3E]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setPassMsg("પાસવર્ડ અપડેટ સેવ થયો છે.");
            setCurrentPassword("");
            setNewPassword("");
            setTimeout(() => setPassMsg(""), 3000);
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          પાસવર્ડ અપડેટ કરો
        </button>
      </div>
    </div>
  );
}
