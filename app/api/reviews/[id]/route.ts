// app/api/reviews/[id]/route.ts
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {getUserId} from "@/lib/auth";
import recalcRating from "@/lib/recalcRating";

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400});
    }
    const userId = getUserId(req);
    if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const {rating, text} = await req.json();

    const review = await prisma.review.findUnique({
        where: {id},
    });

    if (!review || review.userId !== userId) {
        return NextResponse.json({error: "Forbidden"}, {status: 403});
    }

    const updated = await prisma.review.update({
        where: {id: review.id},
        data: {rating, text},
    });

    await recalcRating({
        cityId: review.cityId,
        countryId: review.countryId,
    });

    return NextResponse.json(updated);
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400});
    }
    const userId = getUserId(req);
    if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const review = await prisma.review.findUnique({
        where: {id},
    });

    if (!review || review.userId !== userId) {
        return NextResponse.json({error: "Forbidden"}, {status: 403});
    }

    await prisma.review.delete({where: {id: review.id}});

    await recalcRating({
        cityId: review.cityId,
        countryId: review.countryId,
    });

    return NextResponse.json({success: true});
}