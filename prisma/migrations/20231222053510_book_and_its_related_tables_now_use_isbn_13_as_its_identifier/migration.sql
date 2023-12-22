/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BookID` on the `Book` table. All the data in the column will be lost.
  - The primary key for the `BookDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BookID` on the `BookDetail` table. All the data in the column will be lost.
  - The primary key for the `BorrowDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BookID` on the `BorrowDetail` table. All the data in the column will be lost.
  - The primary key for the `ChangeDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BookID` on the `ChangeDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ISBN13]` on the table `BookDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ISBN13` to the `BookDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ISBN13` to the `BorrowDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ISBN13` to the `ChangeDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookDetail" DROP CONSTRAINT "BookDetail_BookID_fkey";

-- DropForeignKey
ALTER TABLE "BorrowDetail" DROP CONSTRAINT "BorrowDetail_BookID_fkey";

-- DropForeignKey
ALTER TABLE "ChangeDetail" DROP CONSTRAINT "ChangeDetail_BookID_fkey";

-- DropIndex
DROP INDEX "BookDetail_BookID_key";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "BookID",
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("ISBN10");

-- AlterTable
ALTER TABLE "BookDetail" DROP CONSTRAINT "BookDetail_pkey",
DROP COLUMN "BookID",
ADD COLUMN     "ISBN13" TEXT NOT NULL,
ADD CONSTRAINT "BookDetail_pkey" PRIMARY KEY ("Status", "ISBN13");

-- AlterTable
ALTER TABLE "BorrowDetail" DROP CONSTRAINT "BorrowDetail_pkey",
DROP COLUMN "BookID",
ADD COLUMN     "ISBN13" TEXT NOT NULL,
ADD CONSTRAINT "BorrowDetail_pkey" PRIMARY KEY ("BorrowInvoiceID", "ISBN13");

-- AlterTable
ALTER TABLE "ChangeDetail" DROP CONSTRAINT "ChangeDetail_pkey",
DROP COLUMN "BookID",
ADD COLUMN     "ISBN13" TEXT NOT NULL,
ADD CONSTRAINT "ChangeDetail_pkey" PRIMARY KEY ("ISBN13", "ChangeInvoiceID");

-- CreateIndex
CREATE UNIQUE INDEX "BookDetail_ISBN13_key" ON "BookDetail"("ISBN13");

-- AddForeignKey
ALTER TABLE "BookDetail" ADD CONSTRAINT "BookDetail_ISBN13_fkey" FOREIGN KEY ("ISBN13") REFERENCES "Book"("ISBN13") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowDetail" ADD CONSTRAINT "BorrowDetail_ISBN13_fkey" FOREIGN KEY ("ISBN13") REFERENCES "Book"("ISBN13") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeDetail" ADD CONSTRAINT "ChangeDetail_ISBN13_fkey" FOREIGN KEY ("ISBN13") REFERENCES "Book"("ISBN13") ON DELETE RESTRICT ON UPDATE CASCADE;
