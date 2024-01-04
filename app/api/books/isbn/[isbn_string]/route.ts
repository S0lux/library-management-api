import { book } from "@/types/book";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const ISBN = require('isbn3')
const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { isbn_string: string } }) {

    const fetchBookResult = await fetch(`https://openlibrary.org/isbn/${params.isbn_string}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })

    if (fetchBookResult.status != 200) {
        return NextResponse.json({ error: fetchBookResult.statusText }, { status: fetchBookResult.status });
    }

    const bookResultJson = await fetchBookResult.json();

    let authorName

    if (bookResultJson.authors?.[0]) {
        const fetchAuthorResult = await fetch(`https://openlibrary.org/${bookResultJson.authors[0].key}.json`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        authorName = fetchAuthorResult.status == 200 ? (await fetchAuthorResult.json()).name : "undefined"
    }
    else authorName = "Unknown"

    const parsedISBN13 = ISBN.parse(bookResultJson.isbn_13?.[0] || bookResultJson.isbn_10?.[0]).isbn13

    const responseData: { data: book } = {
        data: {
            ISBN13: parsedISBN13,
            PublishDate: new Date(bookResultJson.publish_date).toISOString(),
            Title: bookResultJson.title,
            Author: authorName
        }
    }

    return NextResponse.json(responseData, { status: 200 })
}

export async function DELETE(request: NextRequest, { params }: { params: { isbn_string: string } }) {

    if (params.isbn_string.length != 13) return NextResponse.json(
        { error: "This operation requires ISBN13" },
        { status: 400 }
    )

    try {
        const deleteBook = await prisma.book.update({
            where: {
                ISBN13: params.isbn_string
            },
            data: {
                Deleted: true
            }
        })

        const generatedHistory = await prisma.history.create({
            data: {
                Date: new Date().toISOString(),
                Action: "DELETE",
                ActionDetails: "Xóa sách với ISBN13 " + deleteBook.ISBN13,
                AccountUsername: request.headers.get("username") || "Unknown"
            }
        
        })

        return NextResponse.json(deleteBook, { status: 200 })
    }
    catch {
        return NextResponse.json({ error: "Unable to connect to database" }, { status: 500 })
    }
}