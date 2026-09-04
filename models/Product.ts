import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductVariant {
  id: string;
  size: string;
  sizeGu?: string;
  brand?: string;
  material?: string;
  type?: string;
  specification?: string;
  specificationGu?: string;
  price?: number | null;
  sellingPrice?: number | null;
  isAskForPrice: boolean;
  stockQuantity: number;
  unit: "piece" | "meter" | "roll" | "box" | "packet" | "set" | "kg";
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
}

export interface ISpecification {
  keyEn: string;
  keyGu: string;
  valueEn: string;
  valueGu: string;
}

export interface IProduct extends Document {
  id?: string;
  slug: string;
  nameEn: string;
  nameGu: string;
  categorySlug: string;
  subcategory?: string;
  brand?: string;
  image: string;
  images?: string[];
  descriptionEn: string;
  descriptionGu: string;
  variants: IProductVariant[];
  specifications: ISpecification[];
  applicationsEn: string[];
  applicationsGu: string[];
  tags: string[];
  featured: boolean;
  popular: boolean;
  status: "active" | "inactive";
  relatedProductIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariantSchema = new Schema<IProductVariant>({
  id: { type: String, required: true },
  size: { type: String, required: true },
  sizeGu: { type: String, default: "" },
  brand: { type: String, default: "" },
  material: { type: String, default: "" },
  type: { type: String, default: "" },
  specification: { type: String, default: "" },
  specificationGu: { type: String, default: "" },
  price: { type: Number, default: null },
  sellingPrice: { type: Number, default: null },
  isAskForPrice: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 25 },
  unit: {
    type: String,
    enum: ["piece", "meter", "roll", "box", "packet", "set", "kg"],
    default: "piece",
  },
  stockStatus: {
    type: String,
    enum: ["in_stock", "low_stock", "out_of_stock"],
    default: "in_stock",
  },
});

const SpecificationSchema = new Schema<ISpecification>({
  keyEn: { type: String, required: true },
  keyGu: { type: String, required: true },
  valueEn: { type: String, required: true },
  valueGu: { type: String, required: true },
});

const ProductSchema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    nameEn: { type: String, required: true, index: true },
    nameGu: { type: String, required: true, index: true },
    categorySlug: { type: String, required: true, index: true },
    subcategory: { type: String, default: "" },
    brand: { type: String, default: "" },
    image: { type: String, default: "/images/pvc-pipes-category.jpg" },
    images: { type: [String], default: [] },
    descriptionEn: { type: String, default: "" },
    descriptionGu: { type: String, default: "" },
    variants: [ProductVariantSchema],
    specifications: [SpecificationSchema],
    applicationsEn: { type: [String], default: [] },
    applicationsGu: { type: [String], default: [] },
    tags: { type: [String], default: [], index: true },
    featured: { type: Boolean, default: false, index: true },
    popular: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
    relatedProductIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Text search index across critical product fields
ProductSchema.index({
  nameEn: "text",
  nameGu: "text",
  descriptionEn: "text",
  descriptionGu: "text",
  tags: "text",
  brand: "text",
});

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
