"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  AlertTriangle,
  XCircle,
  PlusCircle,
  ArrowRight,
  Boxes,
  TrendingUp,
  RefreshCw,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setLowStockItems(data.lowStockItems || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleQuickRestock = async (productId: string, variantId: string, amount: number) => {
    try {
      setUpdatingId(`${productId}-${variantId}`);
      const res = await fetch("/api/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          variantId,
          action: "adjust",
          value: amount,
        }),
      });

      if (res.ok) {
        await fetchStats();
      }
    } catch (err) {
      console.error("Quick restock failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-xl w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-white rounded-2xl border border-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              ડેશબોર્ડ (Dashboard Overview)
            </h1>
            <span className="w-2 h-2 rounded-full bg-[#1E8E3E] inline-block" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            રાધે હાર્ડવેર — સ્ટોક, પ્રોડક્ટ્સ અને કેટેગરીઝનું કેન્દ્રીય વ્યવસ્થાપન
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchStats}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            <span>રીફ્રેશ</span>
          </button>

          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ નવી પ્રોડક્ટ ઉમેરો</span>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {/* Products */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              કુલ પ્રોડક્ટ્સ
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">
              {stats?.totalProducts || 0}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Total Active Items</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1E8E3E] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              કેટેગરીઝ
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">
              {stats?.totalCategories || 0}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Active Categories</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Warning */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
              ઓછો સ્ટોક (Low)
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-900 block mt-1">
              {stats?.lowStockCount || 0}
            </span>
            <span className="text-[10px] text-amber-700 font-semibold">10 કે તેથી ઓછો સ્ટોક</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block">
              સ્ટોક પૂર્ણ (Out)
            </span>
            <span className="text-2xl sm:text-3xl font-black text-rose-900 block mt-1">
              {stats?.outOfStockCount || 0}
            </span>
            <span className="text-[10px] text-rose-700 font-semibold">તરત ઓર્ડર કરવાની જરૂર</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Link
          href="/admin/products"
          className="bg-white hover:bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1E8E3E] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#1E8E3E] transition-colors">
                પ્રોડક્ટ્સ મેનેજ કરો
              </h4>
              <p className="text-[11px] text-slate-500">Add, edit or update price</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#1E8E3E] transition-all" />
        </Link>

        <Link
          href="/admin/inventory"
          className="bg-white hover:bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                ઇન્વેન્ટરી અપડેટ
              </h4>
              <p className="text-[11px] text-slate-500">Quick +5, -5 & bulk stock</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
        </Link>

        <Link
          href="/admin/categories"
          className="bg-white hover:bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                કેટેગરી મેનેજ કરો
              </h4>
              <p className="text-[11px] text-slate-500">Manage 12 main categories</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-purple-600 transition-all" />
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white hover:bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                દુકાન સેટિંગ્સ
              </h4>
              <p className="text-[11px] text-slate-500">Phone, WhatsApp, address</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-600 transition-all" />
        </Link>
      </div>

      {/* Low Stock Attention Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              ઓછો સ્ટોક ધરાવતી પ્રોડક્ટ્સ (Low Stock Alert)
            </h3>
          </div>
          <Link
            href="/admin/inventory?stockFilter=low"
            className="text-xs font-bold text-[#1E8E3E] hover:underline"
          >
            બધી જુઓ →
          </Link>
        </div>

        {lowStockItems.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs font-medium">
            બધી પ્રોડક્ટ્સનો પૂરતો સ્ટોક ઉપલબ્ધ છે. કોઈ ચેતવણી નથી.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {lowStockItems.map((item, idx) => {
              const itemKey = `${item.productId}-${item.variantId}`;
              const isUpdating = updatingId === itemKey;

              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {item.productNameGu || item.productNameEn}
                      </span>
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                        {item.size}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.productNameEn}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                      માત્ર {item.stockQuantity} {item.unit} બાકી
                    </span>

                    {/* 1-Click Fast Stock Boost */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleQuickRestock(item.productId, item.variantId, 10)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#1E8E3E] text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                      >
                        +10
                      </button>
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleQuickRestock(item.productId, item.variantId, 25)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#1E8E3E] text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                      >
                        +25
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
