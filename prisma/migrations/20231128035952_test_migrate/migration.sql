-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "session" TEXT;

-- CreateTable
CREATE TABLE "Session" (
    "token" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_employeeId_key" ON "Session"("employeeId");
