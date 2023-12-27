import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { memberID: string } }) {

    try {
        const invoices = await prisma.member.findFirst({
            where: {
                MemberID: Number(params.memberID)
            },
            include: {
                BorrowInvoices: {
                    include: {
                        BorrowDetails: true
                    }
                }
            }
        })

        if (!invoices) return NextResponse.json({ message: "No borrow invoices found for this member" }, { status: 404 })

        return NextResponse.json({ data: invoices }, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Invalid memberID provided" }, { status: 404 })
    }
}