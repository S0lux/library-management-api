import { book } from "@/types/book";
import { SearchResponse } from "@/types/searchRes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { title_string: string } }) {
    try {
        const title = params.title_string.replaceAll(" ", "+");
        let response: book[] = []

        const res = await fetch("https://openlibrary.org/search.json?"
            + `title=${title}&`
            + `fields=key,title,author_name,editions,editions.isbn,editions.publish_date&`
            + `limit=50`)

        const searches: SearchResponse = await res.json();

        searches.docs.forEach(doc => {
            doc.editions.docs.forEach(book => {

                if (book.isbn?.[0] && book.isbn?.[1]) {
                    response.push({
                        Author: doc.author_name?.[0] || "Not found",
                        Title: doc.title,
                        ISBN13: book.isbn[0].length == 13 ? book.isbn[0] : book.isbn[1],
                        PublishDate: (book.publish_date?.[0]) ? new Date(book.publish_date[0]).toISOString() : new Date().toISOString()
                    })
                }
                else if (book.isbn?.[0]) {
                    response.push({
                        Author: doc.author_name?.[0] || "Not found",
                        Title: doc.title,
                        ISBN13: book.isbn[0],
                        PublishDate: (book.publish_date?.[0]) ? new Date(book.publish_date[0]).toISOString() : new Date().toISOString()
                    })
                }
            })
        });

        if (response.length < 1) {
            return NextResponse.json({ error: "No books found" }, { status: 404 })
        }

        return NextResponse.json({ data: response }, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json( { error: "Unknown error", }, { status: 500 } )
    }
}