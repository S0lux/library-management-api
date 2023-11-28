/*
  Warnings:

  - You are about to drop the column `session` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "session";

-- DropTable
DROP TABLE "Session";
