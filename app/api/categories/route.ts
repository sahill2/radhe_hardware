import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import { getAdminSession } from "@/lib/auth";
import { seedDatabase } from "@/lib/seed";
import { mainCategories } from "@/data/categories";

export async function GET() {
  try {
    try {
      await connectToDatabase();
      let categories = await Category.find({ isActive: true }).sort({ order: 1 }).lean();

      if (!categories || categories.length === 0) {
        await seedDatabase(false);
        categories = await Category.find({ isActive: true }).sort({ order: 1 }).lean();
      }

      return NextResponse.json({ success: true, categories });
    } catch (dbError) {
      console.warn("Database unavailable, falling back to static category data:", dbError);
      return NextResponse.json({ success: true, categories: mainCategories, isFallback: true });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const {
      nameEn,
      nameGu,
      slug,
      taglineEn,
      taglineGu,
      descriptionEn,
      descriptionGu,
      image,
      iconName,
      badgeEn,
      badgeGu,
      subcategories,
    } = body;

    if (!nameEn || !nameGu || !slug) {
      return NextResponse.json(
        { error: "English Name, Gujarati Name, and Slug are required" },
        { status: 400 }
      );
    }

    const existing = await Category.findOne({ slug: slug.trim().toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "Category slug already exists" },
        { status: 409 }
      );
    }

    const count = await Category.countDocuments();
    const category = await Category.create({
      nameEn,
      nameGu,
      slug: slug.trim().toLowerCase(),
      taglineEn: taglineEn || "",
      taglineGu: taglineGu || "",
      descriptionEn: descriptionEn || "",
      descriptionGu: descriptionGu || "",
      image: image || "/images/pvc-pipes-category.jpg",
      iconName: iconName || "Grid",
      badgeEn: badgeEn || "",
      badgeGu: badgeGu || "",
      subcategories: subcategories || [],
      order: count,
      isActive: true,
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
