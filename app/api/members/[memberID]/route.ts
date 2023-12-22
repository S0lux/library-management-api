import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { memberID: string } }) {
    try {

        const response = await prisma.member.update({
            where: {
                MemberID: Number.parseInt(params.memberID)
            },
            data: {
                Deleted: true
            }
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Invalid memberID provided" }, { status: 404 })
    }
}