import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400});
    }
    const reviews = await prisma.review.findMany({
        where: {countryId: id},
        include: {user: {select: {id: true, name: true}}},
        orderBy: {createdAt: "desc"},
    });

    return NextResponse.json(reviews);
}
