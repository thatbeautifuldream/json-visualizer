import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  try {
    const stats = await db.$transaction(async (tx) => {
      // Get total documents count
      const totalDocs = await tx.jsonDocument.count();

      // Get documents created in last 24 hours
      const last24Hours = await tx.jsonDocument.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });

      // Get total views
      const viewsResult = await tx.jsonDocument.aggregate({
        _sum: {
          viewCount: true,
        },
      });

      // Get average document size
      const sizeResult = await tx.jsonDocument.aggregate({
        _avg: {
          size: true,
        },
      });

      // Get expired documents count
      const expiredDocs = await tx.jsonDocument.count({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      return {
        totalDocuments: totalDocs,
        documentsLast24h: last24Hours,
        totalViews: viewsResult._sum.viewCount ?? 0,
        averageSize: Math.round(sizeResult._avg.size ?? 0),
        expiredDocuments: expiredDocs,
      };
    });

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
