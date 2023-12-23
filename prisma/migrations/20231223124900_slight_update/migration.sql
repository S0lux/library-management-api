-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "Deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "Deleted" SET DEFAULT false;
