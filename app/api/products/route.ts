import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { getAdminSession } from "@/lib/auth";
import { seedDatabase } from "@/lib/seed";
import { products as staticProducts, searchProducts as staticSearch } from "@/data/products";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const featured = searchParams.get("featured");
    const popular = searchParams.get("popular");
    const stockStatus = searchParams.get("stockStatus");
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);

    try {
      await connectToDatabase();

      // Check if products exist in DB; auto-seed if zero
      const totalCountInDb = await Product.countDocuments();
      if (totalCountInDb === 0) {
        await seedDatabase(false);
      }

      const filter: Record<string, any> = { status: "active" };

      if (category && category !== "all") {
        filter.categorySlug = category;
      }
      if (subcategory && subcategory !== "all") {
        filter.subcategory = subcategory;
      }
      if (featured === "true") {
        filter.featured = true;
      }
      if (popular === "true") {
        filter.popular = true;
      }
      if (stockStatus && stockStatus !== "all") {
        filter["variants.stockStatus"] = stockStatus;
      }

      if (q && q.length > 0) {
        const regex = new RegExp(q, "i");
        filter.$or = [
          { nameEn: regex },
          { nameGu: regex },
          { brand: regex },
          { descriptionEn: regex },
          { descriptionGu: regex },
          { tags: regex },
          { "variants.size": regex },
          { "variants.sizeGu": regex },
          { "variants.specification": regex },
          { categorySlug: regex },
        ];
      }

      const skip = (page - 1) * limit;
      const [products, total] = await Promise.all([
        Product.find(filter).sort({ featured: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
        Product.countDocuments(filter),
      ]);

      return NextResponse.json({
        success: true,
        products,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (dbError) {
      console.warn("Database unavailable, falling back to static product data:", dbError);
      let results = [...staticProducts];

      if (category && category !== "all") {
        results = results.filter((p) => p.category === category);
      }
      if (subcategory && subcategory !== "all") {
        results = results.filter((p) => p.subcategory === subcategory);
      }
      if (featured === "true") {
        results = results.filter((p) => p.featured);
      }
      if (popular === "true") {
        results = results.filter((p) => p.popular);
      }
      if (q && q.length > 0) {
        results = staticSearch(q);
      }

      return NextResponse.json({
        success: true,
        products: results.slice(0, limit),
        pagination: {
          total: results.length,
          page: 1,
          limit,
          pages: 1,
        },
        isFallback: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
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
      categorySlug,
      subcategory,
      brand,
      image,
      images,
      descriptionEn,
      descriptionGu,
      variants,
      specifications,
      applicationsEn,
      applicationsGu,
      tags,
      featured,
      popular,
      status,
      relatedProductIds,
    } = body;

    if (!nameEn || !nameGu || !slug || !categorySlug) {
      return NextResponse.json(
        { error: "Product Name (En/Gu), Slug, and Category are required" },
        { status: 400 }
      );
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/\s+/g, "-");
    const existing = await Product.findOne({ slug: cleanSlug });
    if (existing) {
      return NextResponse.json(
        { error: "A product with this slug already exists" },
        { status: 409 }
      );
    }

    const product = await Product.create({
      nameEn,
      nameGu,
      slug: cleanSlug,
      categorySlug,
      subcategory: subcategory || "",
      brand: brand || "",
      image: image || "/images/pvc-pipes-category.jpg",
      images: images && images.length ? images : [image || "/images/pvc-pipes-category.jpg"],
      descriptionEn: descriptionEn || "",
      descriptionGu: descriptionGu || "",
      variants: variants && variants.length ? variants : [
        {
          id: `v-1-${Date.now()}`,
          size: "Standard",
          sizeGu: "સ્ટાન્ડર્ડ",
          isAskForPrice: true,
          stockQuantity: 10,
          unit: "piece",
          stockStatus: "in_stock",
        },
      ],
      specifications: specifications || [],
      applicationsEn: applicationsEn || [],
      applicationsGu: applicationsGu || [],
      tags: tags || [],
      featured: Boolean(featured),
      popular: Boolean(popular),
      status: status || "active",
      relatedProductIds: relatedProductIds || [],
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
