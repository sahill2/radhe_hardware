"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4f5] flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* Top Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#787574] hover:text-[#000000] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>મુખ્ય વેબસાઇટ (Customer Site)</span>
        </Link>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ebebeb] text-xs font-semibold text-[#1E8E3E]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>સુરક્ષિત પોર્ટલ</span>
        </div>
      </div>

      {/* Center Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#ebebeb] shadow-xl">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#1E8E3E] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
              રાધે હાર્ડવેર — ઓનર પોર્ટલ
            </h1>
            <p className="text-xs text-[#6b7280] mt-1">
              Radhe Hardware Owner & Admin Control Panel
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                એડમિન ઈમેઈલ (Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@radhehardware.com"
                  className="w-full bg-[#f8fafc] border border-[#e5e7eb] rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm font-medium outline-none focus:border-[#1E8E3E] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                પાસવર્ડ (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#f8fafc] border border-[#e5e7eb] rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm font-medium outline-none focus:border-[#1E8E3E] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98"
            >
              {loading ? (
                <span>ચકાસણી થઈ રહી છે...</span>
              ) : (
                <>
                  <span>લોગીન કરો (Login to Admin)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security notice */}
          <div className="mt-6 pt-4 border-t border-[#f3f4f6] text-center">
            <p className="text-[11px] text-[#9ca3af]">
              માત્ર અધિકૃત દુકાન સંચાલક / ઓનર માટે
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-md mx-auto w-full text-center text-[11px] text-[#9ca3af]">
        © {new Date().getFullYear()} Radhe Hardware. All Owner Actions Protected.
      </div>
    </div>
  );
}
