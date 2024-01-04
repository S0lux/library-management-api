/*
  Warnings:

  - Added the required column `ActionDetails` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "ActionDetails" TEXT NOT NULL;
