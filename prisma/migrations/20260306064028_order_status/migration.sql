-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Dikerjakan', 'Dibatalkan', 'Selesai');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'Dikerjakan';
