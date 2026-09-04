import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const category = searchParams.get("category");
    const stockFilter = searchParams.get("stockFilter"); // "all", "low", "out", "in"

    const filter: Record<string, any> = {};

    if (category && category !== "all") {
      filter.categorySlug = category;
    }

    if (q && q.length > 0) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { nameEn: regex },
        { nameGu: regex },
        { brand: regex },
        { "variants.size": regex },
        { "variants.sizeGu": regex },
      ];
    }

    const products = await Product.find(filter).sort({ nameEn: 1 }).lean();

    // Flatten into inventory rows for fast bulk display
    let inventoryItems: Array<{
      productId: string;
      productNameEn: string;
      productNameGu: string;
      categorySlug: string;
      image: string;
      variantId: string;
      size: string;
      sizeGu: string;
      specification: string;
      unit: string;
      stockQuantity: number;
      stockStatus: string;
      price: number | null;
      sellingPrice: number | null;
      isAskForPrice: boolean;
      updatedAt: Date;
    }> = [];

    products.forEach((p: any) => {
      (p.variants || []).forEach((v: any) => {
        inventoryItems.push({
          productId: p._id.toString(),
          productNameEn: p.nameEn,
          productNameGu: p.nameGu,
          categorySlug: p.categorySlug,
          image: p.image,
          variantId: v.id,
          size: v.size,
          sizeGu: v.sizeGu || v.size,
          specification: v.specification || "",
          unit: v.unit || "piece",
          stockQuantity: v.stockQuantity || 0,
          stockStatus: v.stockStatus || (v.stockQuantity === 0 ? "out_of_stock" : v.stockQuantity <= 10 ? "low_stock" : "in_stock"),
          price: v.price || null,
          sellingPrice: v.sellingPrice || null,
          isAskForPrice: v.isAskForPrice ?? true,
          updatedAt: p.updatedAt,
        });
      });
    });

    if (stockFilter === "low") {
      inventoryItems = inventoryItems.filter(
        (i) => i.stockQuantity > 0 && i.stockQuantity <= 10
      );
    } else if (stockFilter === "out") {
      inventoryItems = inventoryItems.filter((i) => i.stockQuantity === 0 || i.stockStatus === "out_of_stock");
    } else if (stockFilter === "in") {
      inventoryItems = inventoryItems.filter((i) => i.stockQuantity > 10);
    }

    return NextResponse.json({
      success: true,
      items: inventoryItems,
      totalItems: inventoryItems.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { productId, variantId, action, value, unit, price, sellingPrice, isAskForPrice, stockStatus } = body;

    if (!productId || !variantId) {
      return NextResponse.json(
        { error: "Product ID and Variant ID are required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const variantIndex = product.variants.findIndex((v) => v.id === variantId);
    if (variantIndex === -1) {
      return NextResponse.json({ error: "Variant not found" }, { status: 404 });
    }

    const variant = product.variants[variantIndex];

    if (action === "adjust") {
      const delta = Number(value) || 0;
      variant.stockQuantity = Math.max(0, (variant.stockQuantity || 0) + delta);
    } else if (action === "setQuantity") {
      variant.stockQuantity = Math.max(0, Number(value) || 0);
    }

    if (unit) {
      variant.unit = unit;
    }

    if (price !== undefined) {
      variant.price = price === "" || price === null ? null : Number(price);
    }
    if (sellingPrice !== undefined) {
      variant.sellingPrice = sellingPrice === "" || sellingPrice === null ? null : Number(sellingPrice);
    }
    if (isAskForPrice !== undefined) {
      variant.isAskForPrice = Boolean(isAskForPrice);
    }

    // Determine automatic stock status unless manually overridden
    if (stockStatus) {
      variant.stockStatus = stockStatus;
    } else {
      if (variant.stockQuantity === 0) {
        variant.stockStatus = "out_of_stock";
      } else if (variant.stockQuantity <= 10) {
        variant.stockStatus = "low_stock";
      } else {
        variant.stockStatus = "in_stock";
      }
    }

    product.markModified("variants");
    await product.save();

    return NextResponse.json({
      success: true,
      updatedVariant: variant,
      message: "Inventory updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update inventory" },
      { status: 500 }
    );
  }
}
