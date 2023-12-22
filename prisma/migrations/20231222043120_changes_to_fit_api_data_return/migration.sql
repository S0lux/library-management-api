/*
  Warnings:

  - You are about to drop the column `Genre` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `ISBN` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `Price` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `ReleaseDate` on the `Book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ISBN10]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ISBN13]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ISBN10` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ISBN13` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PublishDate` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Book_ISBN_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "Genre",
DROP COLUMN "ISBN",
DROP COLUMN "Price",
DROP COLUMN "ReleaseDate",
ADD COLUMN     "ISBN10" TEXT NOT NULL,
ADD COLUMN     "ISBN13" TEXT NOT NULL,
ADD COLUMN     "PublishDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_ISBN10_key" ON "Book"("ISBN10");

-- CreateIndex
CREATE UNIQUE INDEX "Book_ISBN13_key" ON "Book"("ISBN13");
