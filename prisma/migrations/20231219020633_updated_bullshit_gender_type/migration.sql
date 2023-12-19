/*
  Warnings:

  - Changed the type of `Gender` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Gender` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "Gender",
ADD COLUMN     "Gender" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "Gender",
ADD COLUMN     "Gender" INTEGER NOT NULL;
