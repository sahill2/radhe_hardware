"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Upload,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  PlusCircle,
  Eye,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStock, setSelectedStock] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nameEn: "",
    nameGu: "",
    slug: "",
    categorySlug: "pvc-pipes",
    subcategory: "",
    brand: "",
    image: "/images/pvc-pipes-category.jpg",
    descriptionEn: "",
    descriptionGu: "",
    featured: false,
    popular: false,
    status: "active",
    variants: [
      {
        id: "v-1",
        size: "Standard",
        sizeGu: "સ્ટાન્ડર્ડ",
        specification: "",
        unit: "piece",
        stockQuantity: 25,
        price: null,
        sellingPrice: null,
        isAskForPrice: true,
        stockStatus: "in_stock",
      },
    ],
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/products?limit=200"),
        fetch("/api/categories"),
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.products || []);
      }
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.categories || []);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormError("");
    setFormData({
      nameEn: "",
      nameGu: "",
      slug: "",
      categorySlug: categories[0]?.slug || "pvc-pipes",
      subcategory: "",
      brand: "",
      image: "/images/pvc-pipes-category.jpg",
      descriptionEn: "",
      descriptionGu: "",
      featured: false,
      popular: false,
      status: "active",
      variants: [
        {
          id: `v-${Date.now()}-1`,
          size: "",
          sizeGu: "",
          specification: "",
          unit: "piece",
          stockQuantity: 25,
          price: null,
          sellingPrice: null,
          isAskForPrice: true,
          stockStatus: "in_stock",
        },
      ],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setFormError("");
    setFormData({
      nameEn: product.nameEn,
      nameGu: product.nameGu,
      slug: product.slug,
      categorySlug: product.categorySlug,
      subcategory: product.subcategory || "",
      brand: product.brand || "",
      image: product.image || "/images/pvc-pipes-category.jpg",
      descriptionEn: product.descriptionEn || "",
      descriptionGu: product.descriptionGu || "",
      featured: Boolean(product.featured),
      popular: Boolean(product.popular),
      status: product.status || "active",
      variants: product.variants?.length
        ? product.variants
        : [
            {
              id: "v-1",
              size: "Standard",
              sizeGu: "સ્ટાન્ડર્ડ",
              specification: "",
              unit: "piece",
              stockQuantity: 20,
              price: null,
              sellingPrice: null,
              isAskForPrice: true,
              stockStatus: "in_stock",
            },
          ],
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const result = await res.json();
        setFormData((prev) => ({ ...prev, image: result.url }));
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id: `v-${Date.now()}-${prev.variants.length + 1}`,
          size: "",
          sizeGu: "",
          specification: "",
          unit: prev.variants[0]?.unit || "piece",
          stockQuantity: 25,
          price: null,
          sellingPrice: null,
          isAskForPrice: true,
          stockStatus: "in_stock",
        },
      ],
    }));
  };

  const handleRemoveVariant = (index: number) => {
    if (formData.variants.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.variants];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const endpoint = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product");
      }

      setIsModalOpen(false);
      await fetchData();
    } catch (err: any) {
      setFormError(err.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Filtered products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const match =
        p.nameEn.toLowerCase().includes(q) ||
        p.nameGu.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.variants?.some((v: any) => v.size.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            પ્રોડક્ટ્સ મેનેજમેન્ટ (Product Catalogue)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            દુકાનની તમામ પ્રોડક્ટ્સ, સાઈઝ વેરિઅન્ટ્સ, ભાવ અને સ્ટોક મેનેજ કરો
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-sm transition-all cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>+ નવી પ્રોડક્ટ ઉમેરો</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="પ્રોડક્ટનું નામ, બ્રાન્ડ અથવા સાઈઝ શોધો..."
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
            <option value="all">બધી કેટેગરીઝ (All Categories)</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nameGu} ({c.nameEn})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List / Cards */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs font-medium">
          પ્રોડક્ટ્સ લોડ થઈ રહી છે...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-900">કોઈ પ્રોડક્ટ મળી નથી</p>
          <p className="text-xs text-slate-500 mt-1">ફિલ્ટર બદલો અથવા નવી પ્રોડક્ટ ઉમેરો.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">પ્રોડક્ટ</th>
                  <th className="py-3 px-4">કેટેગરી</th>
                  <th className="py-3 px-4">સાઈઝ / વેરિઅન્ટ્સ</th>
                  <th className="py-3 px-4">કુલ સ્ટોક</th>
                  <th className="py-3 px-4">ભાવ / Ask Price</th>
                  <th className="py-3 px-4 text-right">ક્રિયા</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProducts.map((p) => {
                  const totalStock = (p.variants || []).reduce(
                    (acc: number, v: any) => acc + (v.stockQuantity || 0),
                    0
                  );
                  const firstUnit = p.variants?.[0]?.unit || "piece";

                  return (
                    <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                      {/* Product Name & Image */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                            <Image
                              src={p.image || "/images/pvc-pipes-category.jpg"}
                              alt={p.nameEn}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {p.nameGu || p.nameEn}
                            </span>
                            <span className="text-[11px] text-slate-500">{p.nameEn}</span>
                            {p.brand && (
                              <span className="text-[10px] bg-slate-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded ml-1">
                                {p.brand}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-md text-[11px]">
                          {p.categorySlug}
                        </span>
                      </td>

                      {/* Variants Count & preview */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(p.variants || []).map((v: any, i: number) => (
                            <span
                              key={i}
                              className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                            >
                              {v.size}: <strong className="text-slate-900">{v.stockQuantity}</strong>
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Total Stock */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-xs ${
                            totalStock === 0
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : totalStock <= 10
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-emerald-50 text-emerald-800"
                          }`}
                        >
                          {totalStock} {firstUnit}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 text-slate-700 font-semibold">
                        {p.variants?.some((v: any) => v.price) ? (
                          <span>₹{p.variants[0].price}</span>
                        ) : (
                          <span className="text-emerald-700 font-bold text-[11px]">
                            Ask on WhatsApp
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                            title="View on site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(p._id, p.nameGu || p.nameEn)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingProduct ? "પ્રોડક્ટ એડિટ કરો (Edit Product)" : "નવી પ્રોડક્ટ ઉમેરો (Add Product)"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {formError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    ગુજરાતી નામ (Gujarati Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameGu}
                    onChange={(e) => setFormData({ ...formData, nameGu: e.target.value })}
                    placeholder="દા.ત. સ્વર્ણિમ™ એગ્રીકલ્ચર PVC પાઈપ"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    અંગ્રેજી નામ (English Name) *
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
                        slug: editingProduct ? prev.slug : slug,
                      }));
                    }}
                    placeholder="e.g. Swarnim Agriculture PVC Pipe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Slug (URL Key) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="swarnim-agriculture-pvc-pipe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    કેટેગરી (Category) *
                  </label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.nameGu} ({c.nameEn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    બ્રાન્ડ (Brand - Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Swarnim, ISI, Finolex, etc."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    પ્રોડક્ટ ફોટો (Image Upload)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-[#1E8E3E] cursor-pointer"
                    />
                    {uploadingImage && <span className="text-[11px] text-slate-400">અપલોડ થઈ રહ્યો છે...</span>}
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    ગુજરાતી વિગત (Description Gu)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.descriptionGu}
                    onChange={(e) => setFormData({ ...formData, descriptionGu: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    અંગ્રેજી વિગત (Description En)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-[#1E8E3E]"
                  />
                </div>
              </div>

              {/* Multi-Variant Manager */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      સાઈઝ / વેરિઅન્ટ્સ અને સ્ટોક મેનેજમેન્ટ
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      દરેક સાઈઝનો સ્ટોક અને ભાવ અલગથી સેટ કરો
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 text-[#1E8E3E] text-xs font-bold hover:bg-emerald-100 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ વેરિઅન્ટ ઉમેરો</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.variants.map((variant, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-6 gap-2.5 items-center"
                    >
                      <div className="col-span-2 sm:col-span-2">
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                          સાઈઝ (Size En)
                        </label>
                        <input
                          type="text"
                          required
                          value={variant.size}
                          onChange={(e) => handleVariantChange(idx, "size", e.target.value)}
                          placeholder="e.g. 75mm (3 Inch)"
                          className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                          સ્ટોક જથ્થો
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={variant.stockQuantity}
                          onChange={(e) =>
                            handleVariantChange(idx, "stockQuantity", Number(e.target.value))
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                          એકમ (Unit)
                        </label>
                        <select
                          value={variant.unit || "piece"}
                          onChange={(e) => handleVariantChange(idx, "unit", e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg py-1 px-1 text-xs font-medium"
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

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">
                          ભાવ (Price ₹)
                        </label>
                        <input
                          type="number"
                          value={variant.price || ""}
                          onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
                          placeholder="Ask"
                          className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs"
                        />
                      </div>

                      <div className="flex items-center justify-end pt-3">
                        {formData.variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(idx)}
                            className="p-1 rounded-md text-rose-500 hover:bg-rose-50 cursor-pointer"
                            title="Remove variant"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2 border-t border-slate-200">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-[#1E8E3E] rounded"
                  />
                  <span>સ્પેશિયલ / ફીચર્ડ પ્રોડક્ટ (Featured)</span>
                </label>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  રદ કરો (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#1E8E3E] hover:bg-[#146C2E] text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? "સેવ થઈ રહ્યું છે..." : "સાચવો (Save Product)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
