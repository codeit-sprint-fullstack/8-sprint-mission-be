/*
  Warnings:

  - You are about to drop the `ArticleComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ArticleComment" DROP CONSTRAINT "ArticleComment_articleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductComment" DROP CONSTRAINT "ProductComment_productId_fkey";

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "price" SET DEFAULT 0;

-- DropTable
DROP TABLE "public"."ArticleComment";

-- DropTable
DROP TABLE "public"."ProductComment";

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "articleId" INTEGER,
    "productId" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "public"."Comment"("createdAt");

-- CreateIndex
CREATE INDEX "Comment_articleId_idx" ON "public"."Comment"("articleId");

-- CreateIndex
CREATE INDEX "Comment_productId_idx" ON "public"."Comment"("productId");

-- CreateIndex
CREATE INDEX "Article_createdAt_idx" ON "public"."Article"("createdAt");

-- CreateIndex
CREATE INDEX "Article_title_idx" ON "public"."Article"("title");

-- CreateIndex
CREATE INDEX "Article_content_idx" ON "public"."Article"("content");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "public"."Product"("createdAt");

-- CreateIndex
CREATE INDEX "Product_title_idx" ON "public"."Product"("title");

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "public"."Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
