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

    const oldBorrowDetail = await Prisma.borrowDetail.findFirstOrThrow({
        where: {
            BorrowInvoiceID: body.InvoiceID,
            ISBN13: body.ISBN13,
        }
    })

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

    // Update HasReturned
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

    // Update book details
    await Prisma.bookDetail.update({
        where: {
            Status_ISBN13: {
                Status: "normal",
                ISBN13: body.ISBN13
            }
        },
        data: {
            Quantity: {
                decrement: oldBorrowDetail.Returned - body.Returned
            }
        }
    })

    await Prisma.bookDetail.update({
        where: {
            Status_ISBN13: {
                Status: "borrowed",
                ISBN13: body.ISBN13
            }
        },
        data: {
            Quantity: {
                decrement: oldBorrowDetail.Quantity - body.Quantity + body.Returned
            }
        }
    })

    await Prisma.bookDetail.update({
        where: {
            Status_ISBN13: {
                Status: "lost",
                ISBN13: body.ISBN13
            }
        },
        data: {
            Quantity: {
                decrement: oldBorrowDetail.Lost - body.Lost
            }
        }
    })

    await Prisma.bookDetail.update({
        where: {
            Status_ISBN13: {
                Status: "damaged",
                ISBN13: body.ISBN13
            }
        },
        data: {
            Quantity: {
                decrement: oldBorrowDetail.Damaged - body.Damaged
            }
        }
    })

    return NextResponse.json(updatedBorrowDetail, { status: 200 })
}