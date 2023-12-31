import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const history = await prisma.historyLogs.findMany({
            orderBy: {
                Date: "desc"
            }
        });

        return NextResponse.json({ data: history }, { status: 200 })
    }
    catch {
        return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
}