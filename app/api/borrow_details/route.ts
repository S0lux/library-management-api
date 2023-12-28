import { UpdateBookDetails } from "@/utils/bookDetailsUpdater";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const Prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
    
    let body

    try {
        body = await request.json();
    }
    catch {
        return NextResponse.json({ error: "Malformed request body"}, { status: 500 })
    }
    

    if (!body.InvoiceID || !body.ISBN13)
    return NextResponse.json({ error: "Invalid request body"}, { status: 400 })

    const updatedBorrowDetail = await Prisma.borrowDetail.update({
        where: {
            BorrowInvoiceID_ISBN13: {
                BorrowInvoiceID: body.InvoiceID,
                ISBN13: body.ISBN13,
            }
        },
        data: {
            Returned: body.Returned,
            Damaged: body.Damaged,
            Lost: body.Lost,
        }
    })

    if (updatedBorrowDetail.Quantity == body.Returned + body.Lost + body.Damaged) {
        const updatedBorrowDetail = await Prisma.borrowDetail.update({
            where: {
                BorrowInvoiceID_ISBN13: {
                    BorrowInvoiceID: body.InvoiceID,
                    ISBN13: body.ISBN13,
                }
            },
            data: {
                HasReturned: true
            }
        })
    }

    UpdateBookDetails(body.ISBN13, body.Returned, body.Quantity, body.Damaged, body.Lost)

    return NextResponse.json(updatedBorrowDetail, { status: 200 })
}