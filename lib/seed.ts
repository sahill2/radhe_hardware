import connectToDatabase from "./mongodb";
import Category from "../models/Category";
import Product from "../models/Product";
import AdminUser from "../models/AdminUser";
import { hashPassword } from "./auth";
import { mainCategories } from "../data/categories";
import { products } from "../data/products";

function getAppropriateUnit(categorySlug: string, productName: string): "piece" | "meter" | "roll" | "box" | "packet" | "set" | "kg" {
  const lowerName = productName.toLowerCase();
  const lowerCat = categorySlug.toLowerCase();

  if (lowerName.includes("roll") || lowerName.includes("coil") || lowerName.includes("bundle")) {
    return "roll";
  }
  if (lowerCat === "drip-irrigation" && (lowerName.includes("lateral") || lowerName.includes("pipe") || lowerName.includes("tubing"))) {
    return "meter";
  }
  if (lowerCat === "rain-pipe-fittings" && lowerName.includes("rain pipe")) {
    return "meter";
  }
  if (lowerName.includes("set") || lowerName.includes("setup") || lowerName.includes("assembly")) {
    return "set";
  }
  if (lowerName.includes("packet") || lowerName.includes("box") || lowerName.includes("grommet") || lowerName.includes("ring")) {
    return "packet";
  }
  return "piece";
}

export async function seedDatabase(force = false) {
  await connectToDatabase();

  const categoryCount = await Category.countDocuments();
  const productCount = await Product.countDocuments();
  const adminCount = await AdminUser.countDocuments();

  // 1. Seed Admin User if environment variables are provided
  if ((adminCount === 0 || force) && process.env.DEFAULT_ADMIN_PASSWORD && process.env.DEFAULT_ADMIN_EMAIL) {
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL.toLowerCase().trim();
    const passwordHash = await hashPassword(adminPassword);

    await AdminUser.findOneAndUpdate(
      { email: adminEmail },
      {
        email: adminEmail,
        name: "Radhe Hardware Owner",
        passwordHash,
        role: "owner",
      },
      { upsert: true, new: true }
    );
    console.log(`✓ Admin user seeded from environment: ${adminEmail}`);
  }

  // 2. Seed Categories
  if (categoryCount === 0 || force) {
    for (let i = 0; i < mainCategories.length; i++) {
      const cat = mainCategories[i];
      await Category.findOneAndUpdate(
        { slug: cat.slug },
        {
          slug: cat.slug,
          nameEn: cat.nameEn,
          nameGu: cat.nameGu,
          taglineEn: cat.taglineEn || "",
          taglineGu: cat.taglineGu || "",
          descriptionEn: cat.descriptionEn || "",
          descriptionGu: cat.descriptionGu || "",
          image: cat.image || "/images/pvc-pipes-category.jpg",
          iconName: cat.iconName || "Grid",
          badgeEn: cat.badgeEn || "",
          badgeGu: cat.badgeGu || "",
          subcategories: cat.subcategories || [],
          order: i,
          isActive: true,
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✓ Seeded ${mainCategories.length} categories`);
  }

  // 3. Seed Products
  if (productCount === 0 || force) {
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      const unit = getAppropriateUnit(p.category, p.nameEn);

      const enhancedVariants = (p.variants || []).map((v, idx) => {
        // assign a realistic initial stock for demo / catalogue
        const baseStock = p.category === "pvc-pipes" ? 50 + (idx * 15) : 30 + (idx * 8);
        return {
          id: v.id || `v-${idx}-${p.id}`,
          size: v.size,
          sizeGu: v.sizeGu || v.size,
          brand: v.brand || p.brand || "",
          material: v.material || "",
          type: v.type || "",
          specification: v.specification || "",
          specificationGu: v.specificationGu || "",
          price: null,
          sellingPrice: null,
          isAskForPrice: true,
          stockQuantity: baseStock,
          unit: unit,
          stockStatus: "in_stock" as const,
        };
      });

      await Product.findOneAndUpdate(
        { slug: p.slug },
        {
          slug: p.slug,
          nameEn: p.nameEn,
          nameGu: p.nameGu,
          categorySlug: p.category,
          subcategory: p.subcategory || "",
          brand: p.brand || "",
          image: p.image || "/images/pvc-pipes-category.jpg",
          images: [p.image],
          descriptionEn: p.descriptionEn || "",
          descriptionGu: p.descriptionGu || "",
          variants: enhancedVariants,
          specifications: p.specifications || [],
          applicationsEn: p.applicationsEn || [],
          applicationsGu: p.applicationsGu || [],
          tags: p.tags || [],
          featured: p.featured || false,
          popular: p.popular || false,
          status: "active",
          relatedProductIds: p.relatedProductIds || [],
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✓ Seeded ${products.length} products`);
  }

  return { success: true, message: "Database verified & seeded" };
}
