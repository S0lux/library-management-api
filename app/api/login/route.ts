import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import { generateToken } from "@/utils/jwtHandler";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

    let username, password
    let account, employee

    // Check if request body contains username and password fields
    try {
        const body = await req.json()
        username = body.username
        password = body.password
        
        if (!username || !password) throw new Error
    }
    catch {
        return NextResponse.json({ error: "Bad request" }, { status: 400 })
    }

    // Check if the login credential exists in the database
    try {
        account = await prisma.account.findFirstOrThrow({
            where: {
                Username: username,
                Password: password
            }
        })

        employee = await prisma.employee.findFirst({
            where: {
                EmployeeID: account.OwnerID
            }
        })
    }
    catch {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return JWT token
    const token = await generateToken(account.Username)
    const response = {
        ...employee,
        token: token,
    }

    return NextResponse.json(response, { status: 200 })
}