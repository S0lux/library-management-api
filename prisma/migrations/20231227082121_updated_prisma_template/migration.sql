/*
  Warnings:

  - You are about to drop the column `EmployeeID` on the `BorrowInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `MemberID` on the `BorrowInvoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BorrowInvoice" DROP CONSTRAINT "BorrowInvoice_EmployeeID_fkey";

-- DropForeignKey
ALTER TABLE "BorrowInvoice" DROP CONSTRAINT "BorrowInvoice_MemberID_fkey";

-- AlterTable
ALTER TABLE "BorrowInvoice" DROP COLUMN "EmployeeID",
DROP COLUMN "MemberID";

-- CreateTable
CREATE TABLE "_BorrowInvoiceToMember" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BorrowInvoiceToEmployee" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BorrowInvoiceToMember_AB_unique" ON "_BorrowInvoiceToMember"("A", "B");

-- CreateIndex
CREATE INDEX "_BorrowInvoiceToMember_B_index" ON "_BorrowInvoiceToMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BorrowInvoiceToEmployee_AB_unique" ON "_BorrowInvoiceToEmployee"("A", "B");

-- CreateIndex
CREATE INDEX "_BorrowInvoiceToEmployee_B_index" ON "_BorrowInvoiceToEmployee"("B");

-- AddForeignKey
ALTER TABLE "_BorrowInvoiceToMember" ADD CONSTRAINT "_BorrowInvoiceToMember_A_fkey" FOREIGN KEY ("A") REFERENCES "BorrowInvoice"("BorrowInvoiceID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BorrowInvoiceToMember" ADD CONSTRAINT "_BorrowInvoiceToMember_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("MemberID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BorrowInvoiceToEmployee" ADD CONSTRAINT "_BorrowInvoiceToEmployee_A_fkey" FOREIGN KEY ("A") REFERENCES "BorrowInvoice"("BorrowInvoiceID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BorrowInvoiceToEmployee" ADD CONSTRAINT "_BorrowInvoiceToEmployee_B_fkey" FOREIGN KEY ("B") REFERENCES "Employee"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;
