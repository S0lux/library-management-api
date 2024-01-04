/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_AccountUsername_fkey";

-- DropTable
DROP TABLE "History";

-- CreateTable
CREATE TABLE "HistoryLogs" (
    "HistoryID" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Action" TEXT NOT NULL,
    "ActionDetails" TEXT NOT NULL,
    "AccountUsername" TEXT NOT NULL,

    CONSTRAINT "HistoryLogs_pkey" PRIMARY KEY ("HistoryID")
);
