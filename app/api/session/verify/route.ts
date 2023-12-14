import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    const token = req.headers.get("token")
    const username = req.headers.get("username")

    const account = await prisma.account.findFirstOrThrow({
        where: {
            Username: username!
        }
    })

    const employee = await prisma.employee.findFirstOrThrow({
        where: {
            EmployeeID: account.OwnerID
        }
    })

    const response = {
        ...employee,
        token: token,
    }
    
    return NextResponse.json(response, { status: 200 })
}