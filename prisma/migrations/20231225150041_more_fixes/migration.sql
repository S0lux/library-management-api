/*
  Warnings:

  - A unique constraint covering the columns `[Status,ISBN13]` on the table `BookDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookDetail_Status_ISBN13_key" ON "BookDetail"("Status", "ISBN13");
