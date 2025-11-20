-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "userName" SET DEFAULT '익명 판다';

-- AlterTable
ALTER TABLE "public"."Comment" ALTER COLUMN "userName" SET DEFAULT '익명 판다';

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "userName" SET DEFAULT '익명 판다';

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
