import { verifyToken } from "@/utils/jwtHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const jwtToken = req.headers.get("Authorization")?.split(" ")[1]
    let payload

    // Authentication with JWT
    try {
        payload = verifyToken(jwtToken)
        console.log(payload)
    }
    catch {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({}, { status: 200 })
}