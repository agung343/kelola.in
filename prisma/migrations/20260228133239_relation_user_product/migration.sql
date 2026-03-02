/*
  Warnings:

  - Added the required column `userId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "product_businessId_idx";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "userId" TEXT;

UPDATE "product" SET "userId" = 'EkLCGoKZ9FxBoT3qljEOC0lHVGZ8Z0VV';

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "product" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "product_businessId_id_idx" ON "product"("businessId", "id");

-- CreateIndex
CREATE INDEX "product_userId_slug_idx" ON "product"("userId", "slug");

