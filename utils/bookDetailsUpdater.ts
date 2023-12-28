import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function UpdateBookDetails(ISBN13: string, returned: number, borrowed: number, damaged: number, lost: number) {
    await prisma.bookDetail.update({
        where: {
            Status_ISBN13: {
                Status: "normal",
                ISBN13: ISBN13
            }
        },
        data: {
            Quantity: {
                increment: returned - borrowed - damaged - lost 
            }
        }
    })

    await prisma.bookDetail.update({
        where: {
            Status_ISBN13: {
                Status: "borrowed",
                ISBN13: ISBN13
            }
        },
        data: {
            Quantity: {
                increment: borrowed - returned - damaged - lost 
            }
        }
    })

    await prisma.bookDetail.update({
        where: {
            Status_ISBN13: {
                Status: "lost",
                ISBN13: ISBN13
            }
        },
        data: {
            Quantity: {
                increment: lost - borrowed - damaged - returned 
            }
        }
    })

    await prisma.bookDetail.update({
        where: {
            Status_ISBN13: {
                Status: "damaged",
                ISBN13: ISBN13
            }
        },
        data: {
            Quantity: {
                increment: damaged - returned - borrowed - lost 
            }
        }
    })
}