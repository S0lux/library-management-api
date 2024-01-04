import { NextResponse } from 'next/server'
import { verifyToken } from './utils/jwtHandler'
import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.UPSTASH_URL!,
    token: process.env.UPSTASH_KEY!,
  })
 
export async function middleware(request: Request) {

    const jwtToken = request.headers.get("Authorization")?.split(" ")[1]
    
    if (jwtToken == null) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Check if token is in blacklist
    const inBlacklist = await redis.get(`bl_${jwtToken}`)
    if (inBlacklist) return NextResponse.json({ error: "Token rejected" }, { status: 401 })

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
    newHeader.set("exp", payload.exp)

    return NextResponse.next({
        request: {
            headers: newHeader,
        },
    })
}
 
export const config = {
  matcher: ['/api/book/:path*', '/api/session/:path*', 
            '/api/members/:path*', '/api/books/:path*',
            '/api/logout/:path*', '/api/book_details/:path*',
            '/api/borrow_details/:path*','/api/employees/:path*', 
            '/api/history/:path*']
}