import { NextResponse } from 'next/server'
import { verifyToken } from './utils/jwtHandler'
 
export async function middleware(request: Request) {

    const jwtToken = request.headers.get("Authorization")?.split(" ")[1]
    console.log(request)
    let payload

    // Authentication with JWT
    try {
        payload = await verifyToken(jwtToken)
        if (!payload.username) throw new Error
    }
    catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create a new header
    const newHeader = new Headers(request.headers)
    console.log("Username: ", payload.username)
    newHeader.set("username", payload.username)
    newHeader.set("token", jwtToken!)

    return NextResponse.next({
        request: {
            headers: newHeader,
        },
    })
}
 
export const config = {
  matcher: ['/api/book/:path*', '/api/session/:path*', '/api/members/:path*', '/api/books/:path*']
}