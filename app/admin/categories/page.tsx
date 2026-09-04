"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nameEn: "",
    nameGu: "",
    slug: "",
    taglineEn: "",
    taglineGu: "",
    descriptionEn: "",
    descriptionGu: "",
    image: "/images/pvc-pipes-category.jpg",
    badgeEn: "",
    badgeGu: "",
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormError("");
    setFormData({
      nameEn: "",
      nameGu: "",
      slug: "",
      taglineEn: "",
      taglineGu: "",
      descriptionEn: "",
      descriptionGu: "",
      image: "/images/pvc-pipes-category.jpg",
      badgeEn: "",
      badgeGu: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setEditingCategory(cat);
    setFormError("");
    setFormData({
      nameEn: cat.nameEn,
      nameGu: cat.nameGu,
      slug: cat.slug,
      taglineEn: cat.taglineEn || "",
      taglineGu: cat.taglineGu || "",
      descriptionEn: cat.descriptionEn || "",
      descriptionGu: cat.descriptionGu || "",
      image: cat.image || "/images/pvc-pipes-category.jpg",
      badgeEn: cat.badgeEn || "",
      badgeGu: cat.badgeGu || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const endpoint = editingCategory
        ? `/api/categories/${editingCategory._id}`
        : "/api/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save category");
      }

      setIsModalOpen(false);
      await fetchCategories();
    } catch (err: any) {
      setFormError(err.message || "Failed to save category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete category "${name}"?`)) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchCategories();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            કેટેગરીઝ મેનેજમેન્ટ (Category Management)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            દુકાનની તમામ ૧૨ મુખ્ય કૃષિ અને પ્લમ્બિંગ કેટેગરીઝ મેનેજ કરો
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-sm transition-all cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>+ નવી કેટેગરી ઉમેરો</span>
        </button>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs font-medium">
          કેટેગરીઝ લોડ થઈ રહી છે...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat._id || cat.slug}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-200">
                  <Image
                    src={cat.image || "/images/pvc-pipes-category.jpg"}
                    alt={cat.nameEn}
                    fill
                    className="object-cover"
                  />
                  {cat.badgeGu && (
                    <div className="absolute top-2 left-2 bg-white/95 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#1E8E3E]">
                      {cat.badgeGu}
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {cat.nameGu}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{cat.nameEn}</p>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2">
                  {cat.descriptionGu || cat.descriptionEn}
                </p>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                    {cat.subcategories.slice(0, 3).map((sub: any, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                      >
                        {sub.nameGu || sub.nameEn}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{cat.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`/category/${cat.slug}`}
                  target="_blank"
                  className="text-xs font-bold text-[#1E8E3E] hover:underline flex items-center gap-1"
                >
                  <span>પેજ જુઓ</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(cat._id, cat.nameGu || cat.nameEn)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-900">
                {editingCategory ? "કેટેગરી એડિટ કરો" : "નવી કેટેગરી ઉમેરો"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  ગુજરાતી નામ *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nameGu}
                  onChange={(e) => setFormData({ ...formData, nameGu: e.target.value })}
                  placeholder="દા.ત. PVC પાઈપો"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  અંગ્રેજી નામ *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nameEn}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setFormData((prev) => ({
                      ...prev,
                      nameEn: name,
                      slug: editingCategory ? prev.slug : slug,
                    }));
                  }}
                  placeholder="e.g. PVC Pipes"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="pvc-pipes"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  વિગત (Description)
                </label>
                <textarea
                  rows={2}
                  value={formData.descriptionGu}
                  onChange={(e) => setFormData({ ...formData, descriptionGu: e.target.value })}
                  placeholder="કેટેગરી વિશે ટૂંકી માહિતી..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-[#1E8E3E]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  રદ કરો
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? "સેવ થઈ રહ્યું છે..." : "સાચવો"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
