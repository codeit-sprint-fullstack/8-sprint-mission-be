/*
  Warnings:

  - You are about to drop the column `articleId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "articleId",
ADD COLUMN     "freeboardId" TEXT;

-- DropTable
DROP TABLE "Article";

-- CreateTable
CREATE TABLE "Freeboard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "heart_count" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Freeboard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_freeboardId_fkey" FOREIGN KEY ("freeboardId") REFERENCES "Freeboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
