-- CreateTable
CREATE TABLE "History" (
    "HistoryID" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Action" TEXT NOT NULL,
    "EmployeeID" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("HistoryID")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "Employee"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;
