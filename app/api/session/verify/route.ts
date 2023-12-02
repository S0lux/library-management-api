import { verifyToken } from '@/utils/jwtHandler'
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const token = req.headers.get("token")
    const username = req.headers.get("username")

    const response = {
        username: username,
        token: token,
    }
    
    return NextResponse.json(response, { status: 200 })
}