"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Boxes,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Minus,
  Edit3,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Tag,
  Check,
  X,
} from "lucide-react";

export default function AdminInventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStockFilter, setSelectedStockFilter] = useState("all");

  // Custom Quantity Modal State
  const [activeItemForEdit, setActiveItemForEdit] = useState<any | null>(null);
  const [customQty, setCustomQty] = useState<number>(0);
  const [customUnit, setCustomUnit] = useState<string>("piece");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchInventory = async () => {
    try {
      setRefreshing(true);
      const [invRes, catRes] = await Promise.all([
        fetch("/api/inventory"),
        fetch("/api/categories"),
      ]);

      if (invRes.ok) {
        const invData = await invRes.json();
        setItems(invData.items || []);
      }
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.categories || []);
      }
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdjustStock = async (
    productId: string,
    variantId: string,
    delta: number
  ) => {
    try {
      // Optimistic update
      setItems((prev) =>
        prev.map((item) => {
          if (item.productId === productId && item.variantId === variantId) {
            const newQty = Math.max(0, item.stockQuantity + delta);
            return {
              ...item,
              stockQuantity: newQty,
              stockStatus:
                newQty === 0
                  ? "out_of_stock"
                  : newQty <= 10
                  ? "low_stock"
                  : "in_stock",
            };
          }
          return item;
        })
      );

      await fetch("/api/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          variantId,
          action: "adjust",
          value: delta,
        }),
      });
    } catch (err) {
      console.error("Failed to adjust stock:", err);
      await fetchInventory();
    }
  };

  const handleSaveCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItemForEdit) return;

    try {
      setIsUpdating(true);
      const res = await fetch("/api/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: activeItemForEdit.productId,
          variantId: activeItemForEdit.variantId,
          action: "setQuantity",
          value: customQty,
          unit: customUnit,
          price: customPrice,
        }),
      });

      if (res.ok) {
        setActiveItemForEdit(null);
        await fetchInventory();
      }
    } catch (err) {
      console.error("Failed to update custom stock:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const openCustomModal = (item: any) => {
    setActiveItemForEdit(item);
    setCustomQty(item.stockQuantity);
    setCustomUnit(item.unit || "piece");
    setCustomPrice(item.price ? String(item.price) : "");
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    if (selectedCategory !== "all" && item.categorySlug !== selectedCategory) {
      return false;
    }
    if (selectedStockFilter === "low" && (item.stockQuantity > 10 || item.stockQuantity === 0)) {
      return false;
    }
    if (selectedStockFilter === "out" && item.stockQuantity > 0) {
      return false;
    }
    if (selectedStockFilter === "in" && item.stockQuantity <= 10) {
      return false;
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const match =
        item.productNameEn.toLowerCase().includes(q) ||
        item.productNameGu?.toLowerCase().includes(q) ||
        item.size?.toLowerCase().includes(q) ||
        item.categorySlug?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            ઇન્વેન્ટરી અને સ્ટોક મેનેજમેન્ટ (Inventory & Stock Control)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            દુકાનમાં હાજર નંગ/મીટરનો સ્ટોક ઝડપથી અપડેટ કરો (+5 / -5 / સેટ જથ્થો)
          </p>
        </div>

        <button
          type="button"
          onClick={fetchInventory}
          disabled={refreshing}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          <span>તાજું કરો (Refresh)</span>
        </button>
      </div>

      {/* Toolbar / Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="પ્રોડક્ટ અથવા સાઈઝ શોધો..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E] transition-all"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E] transition-all cursor-pointer"
          >
            <option value="all">બધી કેટેગરીઝ</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nameGu} ({c.nameEn})
              </option>
            ))}
          </select>
        </div>

        {/* Stock Status Filter */}
        <div>
          <select
            value={selectedStockFilter}
            onChange={(e) => setSelectedStockFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E] transition-all cursor-pointer"
          >
            <option value="all">તમામ સ્ટોક સ્થિતિ (All Stock)</option>
            <option value="in">પૂરતો સ્ટોક (In Stock {">"} 10)</option>
            <option value="low">ઓછો સ્ટોક (Low Stock ≤ 10)</option>
            <option value="out">સ્ટોક પૂર્ણ (Out of Stock = 0)</option>
          </select>
        </div>
      </div>

      {/* Inventory Items */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs font-medium">
          ઇન્વેન્ટરી લોડ થઈ રહી છે...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Boxes className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-900">કોઈ સ્ટોક આઈટમ મળી નથી</p>
          <p className="text-xs text-slate-500 mt-1">ફિલ્ટર્સ રીસેટ કરો.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">પ્રોડક્ટ અને સાઈઝ</th>
                  <th className="py-3 px-4">કેટેગરી</th>
                  <th className="py-3 px-4">હાજર સ્ટોક</th>
                  <th className="py-3 px-4">સ્થિતિ</th>
                  <th className="py-3 px-4">ભાવ (Price)</th>
                  <th className="py-3 px-4 text-right">ઝડપી સ્ટોક અપડેટ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredItems.map((item, idx) => {
                  const isOut = item.stockQuantity === 0;
                  const isLow = item.stockQuantity > 0 && item.stockQuantity <= 10;

                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      {/* Product Name & Size */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                            <Image
                              src={item.image || "/images/pvc-pipes-category.jpg"}
                              alt={item.productNameEn}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {item.productNameGu || item.productNameEn}
                            </span>
                            <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                              સાઈઝ: {item.size}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {item.categorySlug}
                      </td>

                      {/* Stock Quantity & Unit */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <span className="text-sm">
                          {item.stockQuantity} {item.unit}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3" />
                            <span>Out of Stock</span>
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Low Stock</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>In Stock</span>
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {item.price ? `₹${item.price}` : <span className="text-slate-400">Ask</span>}
                      </td>

                      {/* Fast Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              handleAdjustStock(item.productId, item.variantId, -5)
                            }
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                            title="Decrease by 5"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleAdjustStock(item.productId, item.variantId, 5)
                            }
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#1E8E3E] text-xs font-bold transition-colors cursor-pointer"
                            title="Increase by 5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => openCustomModal(item)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                            title="Set specific quantity and price"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>સેટ કરો</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="lg:hidden divide-y divide-slate-100">
            {filteredItems.map((item, idx) => {
              const isOut = item.stockQuantity === 0;
              const isLow = item.stockQuantity > 0 && item.stockQuantity <= 10;

              return (
                <div key={idx} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={item.image || "/images/pvc-pipes-category.jpg"}
                          alt={item.productNameEn}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                          {item.productNameGu || item.productNameEn}
                        </h4>
                        <span className="text-[11px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md inline-block mt-0.5">
                          {item.size}
                        </span>
                      </div>
                    </div>

                    <div>
                      {isOut ? (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full block text-center">
                          Out
                        </span>
                      ) : isLow ? (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full block text-center">
                          Low
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full block text-center">
                          In
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock & Fast Buttons Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">હાજર સ્ટોક</span>
                      <span className="text-sm font-black text-slate-900">
                        {item.stockQuantity} {item.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAdjustStock(item.productId, item.variantId, -5)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAdjustStock(item.productId, item.variantId, 5)}
                        className="p-2 rounded-lg bg-emerald-50 text-[#1E8E3E] text-xs font-bold"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openCustomModal(item)}
                        className="px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
                      >
                        સેટ કરો
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Set Quantity / Price Modal */}
      {activeItemForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-900">
                સ્ટોક અને ભાવ સેટ કરો (Update Stock & Price)
              </h3>
              <button
                type="button"
                onClick={() => setActiveItemForEdit(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCustom} className="p-5 space-y-4">
              <div>
                <span className="text-xs text-slate-500 font-medium block">પ્રોડક્ટ</span>
                <p className="text-sm font-bold text-slate-900">
                  {activeItemForEdit.productNameGu || activeItemForEdit.productNameEn}
                </p>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                  સાઈઝ: {activeItemForEdit.size}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    નવો સ્ટોક જથ્થો *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={customQty}
                    onChange={(e) => setCustomQty(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    એકમ (Unit)
                  </label>
                  <select
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                  >
                    <option value="piece">નંગ (Piece)</option>
                    <option value="meter">મીટર (Meter)</option>
                    <option value="roll">રોલ (Roll)</option>
                    <option value="box">બોક્સ (Box)</option>
                    <option value="packet">પેકેટ (Packet)</option>
                    <option value="set">સેટ (Set)</option>
                    <option value="kg">કિલો (kg)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  ભાવ (₹ - Price, Leave empty for Ask on WhatsApp)
                </label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="Ask for Price"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold outline-none focus:bg-white focus:border-[#1E8E3E]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveItemForEdit(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  રદ કરો
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-xl bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isUpdating ? "સેવ થઈ રહ્યું છે..." : "સાચવો (Save)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
