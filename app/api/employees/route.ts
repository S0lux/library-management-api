import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const userName = req.headers.get("username");

        if (userName == null) {
            return NextResponse.json({ error: "Token not found" }, { status: 404 })
        }

        const accCheck = await prisma.account.findFirst({ where: { Username: userName } });

        if (accCheck?.AccessLevel == 3) {

            const response = {
                data: await prisma.employee.findMany({
                include: {
                    Account: true
                } 
            })
            }

            return NextResponse.json(response, { status: 200 })
        }

        return NextResponse.json({ error: "Permission denied" }, { status: 403 })
    }
    catch {
        return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        let employeeData = body.data;
        employeeData.DateOfBirth = new Date(employeeData.DateOfBirth)

        let accountData = body.accountData

        const response = await prisma.employee.create({
            data: employeeData
        })

        await prisma.account.create({
            data:{
                Owner:{
                    connect: {
                        EmployeeID: employeeData.EmployeeID
                    }
                },
                Username: accountData.Username,
                Password: accountData.Password,
                AccessLevel: 1,
            }
        })


        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Unable to create a new employee using the member object provided" }, { status: 400 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        let employeeData = body.data;
        employeeData.DateOfBirth = new Date(employeeData.DateOfBirth)

        let accountData = body.accountData

        const response = await prisma.employee.update({
            where: {
                EmployeeID: employeeData.EmployeeID
            },
            data: employeeData
        })

        await prisma.account.update({
            where:{
                OwnerID: employeeData.EmployeeID
            },
            data:{
                Username: accountData.Username,
                Password: accountData.Password
            } 
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Unable to update an employee using the member object provided" }, { status: 400 })
    }
}