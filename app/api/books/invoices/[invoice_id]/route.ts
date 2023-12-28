import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { invoice_id: string }}) {
    const invoice = await prisma.borrowInvoice.findFirst({
        where: {
            BorrowInvoiceID: Number(params.invoice_id)
        },
        include: {
            BorrowDetails: true,
            Member: true,
            Employee: true
        }
    })

    if (!invoice) return NextResponse.json({ error: "No such invoice exist" }, { status: 404 })
    return NextResponse.json(invoice, { status: 200 })
}