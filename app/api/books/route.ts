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

        const bookDetals = await prisma.bookDetail.createMany({
            data: [
                {Status: 'normal', Quantity: 0,ISBN13:inserted.ISBN13},
                {Status: 'damaged', Quantity: 0,ISBN13:inserted.ISBN13},
                {Status: 'borrowed', Quantity: 0,ISBN13:inserted.ISBN13},
                {Status: 'lost', Quantity: 0,ISBN13:inserted.ISBN13}
            ]}
        )

        return NextResponse.json(inserted, { status: 200 })
    }
    catch {
        return NextResponse.json({ error: "Unable to connect to database" }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    try {
        const books = await prisma.book.findMany({
            where: {
                Deleted: false
            }
        })
    
        if (books.length < 1) return NextResponse.json({error: "No book founds"}, { status: 404 })
        return NextResponse.json({ data: books }, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
}
