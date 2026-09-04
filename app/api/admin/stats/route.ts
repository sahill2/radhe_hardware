import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { getAdminSession } from "@/lib/auth";
import { seedDatabase } from "@/lib/seed";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    await seedDatabase(false);

    const [totalCategories, totalProducts, allProducts] = await Promise.all([
      Category.countDocuments(),
      Product.countDocuments(),
      Product.find().lean(),
    ]);

    let lowStockCount = 0;
    let outOfStockCount = 0;
    let totalInventoryUnits = 0;
    const lowStockItems: Array<any> = [];

    allProducts.forEach((p: any) => {
      (p.variants || []).forEach((v: any) => {
        totalInventoryUnits += v.stockQuantity || 0;
        if (v.stockQuantity === 0 || v.stockStatus === "out_of_stock") {
          outOfStockCount++;
        } else if (v.stockQuantity <= 10 || v.stockStatus === "low_stock") {
          lowStockCount++;
          if (lowStockItems.length < 10) {
            lowStockItems.push({
              productId: p._id.toString(),
              productSlug: p.slug,
              productNameEn: p.nameEn,
              productNameGu: p.nameGu,
              variantId: v.id,
              size: v.size,
              stockQuantity: v.stockQuantity,
              unit: v.unit || "piece",
            });
          }
        }
      });
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalCategories,
        lowStockCount,
        outOfStockCount,
        totalInventoryUnits,
      },
      lowStockItems,
      adminUser: {
        name: session.name,
        email: session.email,
        role: session.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}
