-- CreateTable
CREATE TABLE "JsonDocument" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "size" INTEGER NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "JsonDocument_pkey" PRIMARY KEY ("id")
);
