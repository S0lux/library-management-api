/*
  Warnings:

  - Added the required column `CitizenID` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "CitizenID" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL;
