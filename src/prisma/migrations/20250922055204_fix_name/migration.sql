/*
  Warnings:

  - Added the required column `heart_count` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDeleted` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDeleted` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "heart_count" INTEGER NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "articleId" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
