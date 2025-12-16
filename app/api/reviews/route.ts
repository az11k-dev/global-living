// app/api/reviews/route.ts
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {getUserId} from "@/lib/auth";
import recalcRating from "@/lib/recalcRating";

export async function POST(req: NextRequest) {
    const userId = getUserId(req);
    if (!userId) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const {rating, text, cityId, countryId} = await req.json();

    if (!rating || (!cityId && !countryId) || (cityId && countryId)) {
        return NextResponse.json(
            {error: "Invalid review payload"},
            {status: 400}
        );
    }

    try {
        const review = await prisma.review.create({
            data: {
                rating,
                text,
                userId,
                cityId,
                countryId,
            },
        });

        await recalcRating({cityId, countryId});

        return NextResponse.json(review, {status: 201});
    } catch (e) {
        return NextResponse.json(
            {error: "Review already exists"},
            {status: 409}
        );
    }
}