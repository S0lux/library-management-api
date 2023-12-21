import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const response = {
            data: await prisma.member.findMany()
        }

        return NextResponse.json(response, { status: 200 })
    }
    catch {
        return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const memberData = body.data;

        const response = await prisma.member.create({
            data: memberData
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Unable to create a new member using the member object provided" }, { status: 400 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const memberData = body.data;

        const response = await prisma.member.update({
            where: {
                MemberID: memberData.MemberID
            },
            data: memberData
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Unable to update a member using the member object provided" }, { status: 400 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const memberData = body.data;

        const response = await prisma.member.delete({
            where: {
                MemberID: memberData.MemberID
            }
        })

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Invalid memberID provided" }, { status: 404 })
    }
}