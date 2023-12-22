/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ISBN10` on the `Book` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Book_ISBN10_key";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "ISBN10",
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("ISBN13");
