import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './utils/jwtHandler'
 
export async function middleware(request: NextRequest) {

    const jwtToken = request.headers.get("Authorization")?.split(" ")[1]
    let payload

    // Authentication with JWT
    try {
        payload = await verifyToken(jwtToken)
        if (!payload.username) throw new Error
    }
    catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.next()
}
 
export const config = {
  matcher: ['/api/book/:path*', '/api/session/:path*']
}