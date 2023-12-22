import { book } from "@/types/book";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { isbn_string: string } }) {

    const fetchBookResult = await fetch(`https://openlibrary.org/isbn/${params.isbn_string}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })

    if (fetchBookResult.status != 200) {
        return NextResponse.json( { error: fetchBookResult.statusText }, { status: fetchBookResult.status } );
    }

    const bookResultJson = await fetchBookResult.json();

    const fetchAuthorResult = await fetch(`https://openlibrary.org/${bookResultJson.authors[0].key}.json`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })

    const authorName = fetchAuthorResult.status == 200 ? (await fetchAuthorResult.json()).name : "undefined"

    const responseData: { data: book } = {
        data : {
            ISBN10: bookResultJson.isbn_10[0],
            ISBN13: bookResultJson.isbn_13[0],
            PublishDate: new Date(bookResultJson.publish_date).toISOString(),
            Title: bookResultJson.title,
            Author: authorName
        }
    }

    return NextResponse.json(responseData, {status: 200})
}

export async function DELETE(request: NextRequest, { params }: { params: { isbn_string: string } }) {

    if (params.isbn_string.length != 13) return NextResponse.json(
        { error: "This operation requires ISBN13" },
        { status: 400 }
    )

    try {
        const deleteDetailsRegistries = await prisma.bookDetail.deleteMany({
            where: {
                ISBN13: params.isbn_string
            }
        })
    
        const deleteBookRegistry = await prisma.book.delete({
            where: {
                ISBN13: params.isbn_string
            }
        })

        return NextResponse.json(deleteDetailsRegistries.count + (deleteBookRegistry ? 1 : 0), { status: 200 })
    }
    catch {
        return NextResponse.json({ error: "Unable to connect to database" }, { status: 500 })
    }
}