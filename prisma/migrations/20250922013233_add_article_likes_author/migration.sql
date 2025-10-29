/*
  Warnings:

  - Added the required column `author` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL;
