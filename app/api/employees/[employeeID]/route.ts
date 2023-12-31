import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { employeeID: string } }) {
    try {

        const response = await prisma.employee.update({
            where: {
                EmployeeID: Number.parseInt(params.employeeID)
            },
            data: {
                Deleted: true
            }
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Invalid employeeID provided" }, { status: 404 })
    }
}