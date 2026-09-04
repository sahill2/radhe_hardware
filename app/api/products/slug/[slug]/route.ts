import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { getProductBySlug as getStaticProduct, products as staticProducts } from "@/data/products";
import { mainCategories } from "@/data/categories";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    try {
      await connectToDatabase();
      const product = await Product.findOne({ slug, status: "active" }).lean();

      if (product) {
        // Fetch category & related products
        const [category, relatedProducts] = await Promise.all([
          Category.findOne({ slug: product.categorySlug }).lean(),
          Product.find({
            categorySlug: product.categorySlug,
            slug: { $ne: product.slug },
            status: "active",
          })
            .limit(4)
            .lean(),
        ]);

        return NextResponse.json({
          success: true,
          product,
          category,
          relatedProducts,
        });
      }
    } catch (dbError) {
      console.warn("Database error in product slug lookup, falling back:", dbError);
    }

    // Fallback to static data
    const staticP = getStaticProduct(slug);
    if (!staticP) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const cat = mainCategories.find((c) => c.slug === staticP.category);
    const related = staticProducts
      .filter((p) => p.category === staticP.category && p.slug !== staticP.slug)
      .slice(0, 4);

    return NextResponse.json({
      success: true,
      product: staticP,
      category: cat,
      relatedProducts: related,
      isFallback: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}
