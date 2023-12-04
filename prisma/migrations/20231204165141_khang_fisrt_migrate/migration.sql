/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `Address` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DateOfBirth` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Gender` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PhoneNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_username_key";

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "id",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "DateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "EmployeeID" SERIAL NOT NULL,
ADD COLUMN     "Gender" BOOLEAN NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "PhoneNumber" TEXT NOT NULL,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("EmployeeID");

-- CreateTable
CREATE TABLE "Member" (
    "MemberID" SERIAL NOT NULL,
    "CitizenID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Credit" INTEGER NOT NULL,
    "DateOfBirth" TIMESTAMP(3) NOT NULL,
    "Gender" BOOLEAN NOT NULL,
    "EmployeeID" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("MemberID")
);

-- CreateTable
CREATE TABLE "Account" (
    "AccountID" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "AccessLevel" INTEGER NOT NULL,
    "OwnerID" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("AccountID")
);

-- CreateTable
CREATE TABLE "Book" (
    "BookID" SERIAL NOT NULL,
    "ISBN" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Author" TEXT NOT NULL,
    "ReleaseDate" TIMESTAMP(3) NOT NULL,
    "Genre" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("BookID")
);

-- CreateTable
CREATE TABLE "BookDetail" (
    "Status" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "BookID" INTEGER NOT NULL,

    CONSTRAINT "BookDetail_pkey" PRIMARY KEY ("Status","BookID")
);

-- CreateTable
CREATE TABLE "BorrowInvoice" (
    "BorrowInvoiceID" SERIAL NOT NULL,
    "BorrowingDate" TIMESTAMP(3) NOT NULL,
    "MemberID" INTEGER NOT NULL,
    "EmployeeID" INTEGER NOT NULL,

    CONSTRAINT "BorrowInvoice_pkey" PRIMARY KEY ("BorrowInvoiceID")
);

-- CreateTable
CREATE TABLE "BorrowDetail" (
    "Quantity" INTEGER NOT NULL,
    "DueDate" TIMESTAMP(3) NOT NULL,
    "BorrowInvoiceID" INTEGER NOT NULL,
    "BookID" INTEGER NOT NULL,

    CONSTRAINT "BorrowDetail_pkey" PRIMARY KEY ("BorrowInvoiceID","BookID")
);

-- CreateTable
CREATE TABLE "ChangeInvoice" (
    "ChangeInvoiceID" SERIAL NOT NULL,
    "ChangeDate" TIMESTAMP(3) NOT NULL,
    "EmployeeID" INTEGER NOT NULL,

    CONSTRAINT "ChangeInvoice_pkey" PRIMARY KEY ("ChangeInvoiceID")
);

-- CreateTable
CREATE TABLE "ChangeDetail" (
    "Partner" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "ChangeType" INTEGER NOT NULL,
    "BookID" INTEGER NOT NULL,
    "ChangeInvoiceID" INTEGER NOT NULL,

    CONSTRAINT "ChangeDetail_pkey" PRIMARY KEY ("BookID","ChangeInvoiceID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_CitizenID_key" ON "Member"("CitizenID");

-- CreateIndex
CREATE UNIQUE INDEX "Account_Username_key" ON "Account"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_OwnerID_key" ON "Account"("OwnerID");

-- CreateIndex
CREATE UNIQUE INDEX "Book_ISBN_key" ON "Book"("ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "BookDetail_BookID_key" ON "BookDetail"("BookID");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "Employee"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_OwnerID_fkey" FOREIGN KEY ("OwnerID") REFERENCES "Employee"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookDetail" ADD CONSTRAINT "BookDetail_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowInvoice" ADD CONSTRAINT "BorrowInvoice_MemberID_fkey" FOREIGN KEY ("MemberID") REFERENCES "Member"("MemberID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowInvoice" ADD CONSTRAINT "BorrowInvoice_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "Employee"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowDetail" ADD CONSTRAINT "BorrowDetail_BorrowInvoiceID_fkey" FOREIGN KEY ("BorrowInvoiceID") REFERENCES "BorrowInvoice"("BorrowInvoiceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowDetail" ADD CONSTRAINT "BorrowDetail_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeInvoice" ADD CONSTRAINT "ChangeInvoice_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "Employee"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeDetail" ADD CONSTRAINT "ChangeDetail_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeDetail" ADD CONSTRAINT "ChangeDetail_ChangeInvoiceID_fkey" FOREIGN KEY ("ChangeInvoiceID") REFERENCES "ChangeInvoice"("ChangeInvoiceID") ON DELETE RESTRICT ON UPDATE CASCADE;
