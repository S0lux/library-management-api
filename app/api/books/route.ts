import { book } from "@/types/book";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {

    let book: book;

    try {
        book = (await request.json()).data

        const requiredProperties = ["ISBN13", "PublishDate", "Title", "Author"];
        const missingProperties = requiredProperties.filter(prop => !book[prop]);

        if (missingProperties.length > 0) return NextResponse.json(
                { error: `Request body is missing the following properties: ${missingProperties.toString()}` }, 
                { status: 400 }
            )
    }
    catch {
        return NextResponse.json({ error: "Malformed book body" }, { status: 400 })
    }

    try {
        const exists = await prisma.book.findFirst({
            where: {
                ISBN13: book.ISBN13
            }
        })

        if (exists) return NextResponse.json(
            { error: "Book is already registered in database" },
            { status: 409 }
        )

        const inserted = await prisma.book.create({
            data: book
        })

        return NextResponse.json(inserted, { status: 200 })
    }
    catch {
        return NextResponse.json({ error: "Unable to connect to database" }, { status: 500 })
    }
}