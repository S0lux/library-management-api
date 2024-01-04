/*
  Warnings:

  - You are about to drop the column `EmployeeID` on the `History` table. All the data in the column will be lost.
  - Added the required column `AccountUsername` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_EmployeeID_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "EmployeeID",
ADD COLUMN     "AccountUsername" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_AccountUsername_fkey" FOREIGN KEY ("AccountUsername") REFERENCES "Account"("Username") ON DELETE RESTRICT ON UPDATE CASCADE;
