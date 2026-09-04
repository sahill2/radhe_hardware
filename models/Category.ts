import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubcategory {
  id: string;
  nameEn: string;
  nameGu: string;
  descriptionEn?: string;
  descriptionGu?: string;
}

export interface ICategory extends Document {
  id?: string;
  slug: string;
  nameEn: string;
  nameGu: string;
  taglineEn?: string;
  taglineGu?: string;
  descriptionEn: string;
  descriptionGu: string;
  image: string;
  iconName?: string;
  badgeEn?: string;
  badgeGu?: string;
  subcategories: ISubcategory[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubcategorySchema = new Schema<ISubcategory>({
  id: { type: String, required: true },
  nameEn: { type: String, required: true },
  nameGu: { type: String, required: true },
  descriptionEn: { type: String, default: "" },
  descriptionGu: { type: String, default: "" },
});

const CategorySchema = new Schema<ICategory>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    nameEn: { type: String, required: true },
    nameGu: { type: String, required: true },
    taglineEn: { type: String, default: "" },
    taglineGu: { type: String, default: "" },
    descriptionEn: { type: String, default: "" },
    descriptionGu: { type: String, default: "" },
    image: { type: String, default: "/images/pvc-pipes-category.jpg" },
    iconName: { type: String, default: "Grid" },
    badgeEn: { type: String, default: "" },
    badgeGu: { type: String, default: "" },
    subcategories: [SubcategorySchema],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
