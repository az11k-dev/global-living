import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const countries = await prisma.country.findMany({
        include: {
            costs: true,
        },
    });
    return NextResponse.json(countries);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {name, flag, image, rating, description, costs, totalCost} = body;

        // Создаём страну вместе с costs
        const country = await prisma.country.create({
            data: {
                name,
                flag,
                image,
                rating,
                description,
                totalCost,
                costs: costs
                    ? {
                        create: {
                            rent: costs.rent,
                            food: costs.food,
                            transport: costs.transport,
                        },
                    }
                    : undefined,
            },
            include: {
                costs: true,
            },
        });

        return NextResponse.json(country);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to create country"}, {status: 500});
    }
}