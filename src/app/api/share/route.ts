import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { json } = await req.json();

    const jsonShare = await db.jsonShare.create({
      data: {
        json,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });

    return NextResponse.json({ id: jsonShare.id });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error: "Failed to share JSON",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const all = url.searchParams.get("all");

    // Handle fetch all JSONs
    if (all === "true") {
      const page = parseInt(url.searchParams.get("page") ?? "1");
      const pageSize = 10;

      const allJsonShares = await db.jsonShare.findMany({
        orderBy: { createdAt: "desc" },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });

      const total = await db.jsonShare.count();

      return NextResponse.json({
        shares: allJsonShares,
        pagination: {
          total,
          pageSize,
          currentPage: page,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    }

    // Single JSON fetch logic
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const jsonShare = await db.jsonShare.findUnique({
      where: { id },
    });

    if (!jsonShare) {
      return NextResponse.json({ error: "JSON not found" }, { status: 404 });
    }

    return NextResponse.json({ json: jsonShare.json });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch JSON",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
