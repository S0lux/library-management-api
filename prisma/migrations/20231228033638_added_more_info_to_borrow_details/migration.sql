-- AlterTable
ALTER TABLE "BorrowDetail" ADD COLUMN     "Damaged" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Lost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Returned" INTEGER NOT NULL DEFAULT 0;