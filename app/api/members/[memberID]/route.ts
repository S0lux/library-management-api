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

        const generatedHistory = await prisma.history.create({
            data: {
                Date: new Date().toISOString(),
                Action: "DELETE",
                ActionDetails: "Xóa thành viên với mã thành viên " + params.memberID,
                AccountUsername: req.headers.get("username") || "Unknown"
            }
        
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Invalid memberID provided" }, { status: 404 })
    }
}