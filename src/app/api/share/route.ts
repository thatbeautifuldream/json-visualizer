import { env } from "@/env";
import { db } from "@/server/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

export async function POST(req: Request) {
  try {
    const { json, title } = await req.json();

    // Calculate the size of the JSON string
    const jsonString = JSON.stringify(json);
    const size = new Blob([jsonString]).size;

    // Validate JSON
    let isValid = true;
    try {
      JSON.parse(jsonString);
    } catch {
      isValid = false;
    }

    const jsonDocument = await db.jsonDocument.create({
      data: {
        title: title ?? "Untitled",
        content: jsonString,
        size,
        isValid,
        expiresAt: new Date(Date.now() + THIRTY_DAYS),
      },
    });

    return NextResponse.json({ id: jsonDocument.id });
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

    if (all === "true") {
      const page = parseInt(url.searchParams.get("page") ?? "1");
      const pageSize = 10;

      const allDocuments = await db.jsonDocument.findMany({
        where: {
          expiresAt: {
            gt: new Date(),
          },
        },
        orderBy: { createdAt: "desc" },
        take: pageSize,
        skip: (page - 1) * pageSize,
        select: {
          id: true,
          title: true,
          size: true,
          viewCount: true,
          createdAt: true,
          expiresAt: true,
          isValid: true,
        },
      });

      const total = await db.jsonDocument.count({
        where: {
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      return NextResponse.json({
        documents: allDocuments,
        pagination: {
          total,
          pageSize,
          currentPage: page,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    }

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const document = await db.jsonDocument.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      select: {
        content: true,
        title: true,
        viewCount: true,
        expiresAt: true,
        isValid: true,
        size: true,
      },
    });

    if (!document) {
      return NextResponse.json({ error: "JSON not found" }, { status: 404 });
    }

    if (document.expiresAt && document.expiresAt < new Date()) {
      return NextResponse.json({ error: "JSON has expired" }, { status: 410 });
    }

    return NextResponse.json({
      json: JSON.parse(document.content),
      metadata: {
        title: document.title,
        viewCount: document.viewCount,
        size: document.size,
        isValid: document.isValid,
      },
    });
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

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const cookieStore = await cookies();
    const adminKey = cookieStore.get("ADMIN_KEY")?.value;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!adminKey || adminKey !== env.ADMIN_KEY) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid admin key" },
        { status: 401 }
      );
    }

    const deleted = await db.jsonDocument.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Document deleted successfully",
      id: deleted.id,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete document",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
