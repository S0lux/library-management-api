import { UpdateBookDetails } from "@/utils/bookDetailsUpdater";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {

  try {
    const borrowInvoices = await prisma.borrowInvoice.findMany({
      include: {
        BorrowDetails: true,
        Member: true,
        Employee: true,
      },
    })

    if (borrowInvoices.length < 1) return NextResponse.json({ message: "No borrow invoices found" }, { status: 404 })

    return NextResponse.json({ data: borrowInvoices }, { status: 200 })
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Unknown error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {

    try {
        const requestBody = await request.json();
        const borrowRequest: BorrowInvoice = requestBody.data;
    
        const borrowInvoice = await prisma.borrowInvoice.create({
            data: {
              BorrowingDate: borrowRequest.BorrowingDate,
              Member: {
                connect: {
                  MemberID: borrowRequest.MemberID
                }
              },
              Employee: {
                connect: {
                  EmployeeID: borrowRequest.EmployeeID
                }
              },
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

        borrowRequest.BorrowDetails.forEach(borrowDetail => {
          UpdateBookDetails(borrowDetail.ISBN13, 0, borrowDetail.Quantity, 0, 0)
        });

        return NextResponse.json({ data: borrowInvoice }, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
}