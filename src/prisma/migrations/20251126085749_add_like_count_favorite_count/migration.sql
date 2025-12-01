-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "favoriteCount" INTEGER NOT NULL DEFAULT 0;
