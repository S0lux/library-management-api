import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const response = {
            data: await prisma.bookDetail.findMany()
        }

        return NextResponse.json(response, { status: 200 })
    }
    catch {
        return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
}


export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const bookDetailData = body.data;

        const response = await prisma.bookDetail.update({
            where: {
                Status_ISBN13: {
                    ISBN13: bookDetailData.ISBN13,
                    Status: bookDetailData.Status
                }
            },
            data: {
                Quantity: bookDetailData.Quantity
            }
        })

        const generatedHistory = await prisma.history.create({
            data: {
                Date: new Date().toISOString(),
                Action: "UPDATE",
                ActionDetails: "Cập nhật sách với ISBN13 " + bookDetailData.ISBN13 + " số lượng thành " + bookDetailData.Quantity + ` (Tình trạng: ${bookDetailData.Status})`,
                AccountUsername: req.headers.get("username") || "Unknown"
            }
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Unable to update a book detail record using the book detail object provided" }, { status: 400 })
    }
}