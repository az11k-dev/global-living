import {NextRequest, NextResponse} from "next/server";
import {withCors} from "@/lib/cors";
import prisma from "@/lib/prisma";
import {getUserId} from "@/lib/auth";

export async function GET(req: NextRequest) {
    let id;

    try {
        id = getUserId(req);
    } catch {
        return withCors(
            NextResponse.json({error: "Invalid or expired token"}, {status: 401})
        );
    }

    if (typeof id !== "number") {
        return withCors(
            NextResponse.json({error: "Unauthorized"}, {status: 401})
        );
    }

    let user;
    try {
        user = await prisma.user.findUnique({
            where: {id},
            select: {
                id: true,
                email: true,
                name: true,
                position: true,
                image: true,
                country: true,
                city: true,
                interestedCountries: true,
                monthlyBudget: true,
                reviews: true,
                createdAt: true,
            },
        });
    } catch (e) {
        console.error("DB error:", e);
        return withCors(
            NextResponse.json({error: "Internal server error"}, {status: 500})
        );
    }
    if (!user) {
        return withCors(
            NextResponse.json({error: "User not found"}, {status: 404})
        );
    }
    return withCors(NextResponse.json(user));
}