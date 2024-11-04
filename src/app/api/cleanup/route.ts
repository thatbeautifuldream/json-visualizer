import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const deleted = await db.jsonDocument.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    return NextResponse.json({
      message: "Cleanup completed",
      deletedCount: deleted.count,
    });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      {
        error: "Failed to cleanup expired records",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
