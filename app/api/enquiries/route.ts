import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(100).lean();
    return NextResponse.json({ success: true, enquiries });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, phone, message, productName, productSlug, variant, category } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone are required" },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      message: message || "",
      productName: productName || "",
      productSlug: productSlug || "",
      variant: variant || "",
      category: category || "",
      status: "new",
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
