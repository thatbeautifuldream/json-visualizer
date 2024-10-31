import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  try {
    const totalJsons = await db.jsonShare.count();

    const lastWeekJsons = await db.jsonShare.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          totalJsons,
          lastWeekJsons,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}
