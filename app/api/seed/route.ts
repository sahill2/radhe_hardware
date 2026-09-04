import { NextRequest, NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "true";

    // Allow force only for authenticated admins
    if (force) {
      const session = await getAdminSession(req);
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const result = await seedDatabase(force);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}
