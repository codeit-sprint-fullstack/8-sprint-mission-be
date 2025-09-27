/*
  Warnings:

  - You are about to drop the column `author` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Product` table. All the data in the column will be lost.
  - Added the required column `author` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "author",
DROP COLUMN "likes";
