import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { json } = await req.json();

    const jsonShare = await prisma.jsonShare.create({
      data: {
        json,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      },
    });

    return NextResponse.json({ id: jsonShare.id });
  } catch {
    return NextResponse.json(
      { error: "Failed to share JSON" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const jsonShare = await prisma.jsonShare.findUnique({
      where: { id },
    });

    if (!jsonShare) {
      return NextResponse.json({ error: "JSON not found" }, { status: 404 });
    }

    return NextResponse.json({ json: jsonShare.json });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch JSON" },
      { status: 500 }
    );
  }
}
