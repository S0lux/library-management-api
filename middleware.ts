import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './utils/jwtHandler'
 
export async function middleware(request: NextRequest) {

    const jwtToken = request.headers.get("Authorization")?.split(" ")[1]
    console.log(request.headers.get("Authorization"))
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
    newHeader.set("username", payload.username)
    newHeader.set("token", jwtToken!)

    return NextResponse.next({
        request: {
            headers: newHeader,
        },
    })
}
 
export const config = {
  matcher: ['/api/book/:path*', '/api/session/:path*']
}