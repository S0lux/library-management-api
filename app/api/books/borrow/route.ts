import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {

    try {
        const requestBody = await request.json();
        const borrowRequest: BorrowInvoice = requestBody.data;
    
        const borrowInvoice = await prisma.borrowInvoice.create({
            data: {
              BorrowingDate: borrowRequest.BorrowingDate,
              MemberID: borrowRequest.MemberID,
              EmployeeID: borrowRequest.EmployeeID,
              BorrowDetails: {
                create: borrowRequest.BorrowDetails.map((detail) => ({
                  Quantity: detail.Quantity,
                  DueDate: detail.DueDate,
                  ISBN13: detail.ISBN13
                })),
              },
            },
            include: {
              BorrowDetails: true,
            },
          });

        return NextResponse.json({ data: borrowInvoice }, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
}