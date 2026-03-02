-- AlterTable
ALTER TABLE "product" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "product_businessId_idx" ON "product"("businessId");
