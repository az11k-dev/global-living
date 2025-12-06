import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams;

    const name = search.get("name");
    const minRating = search.get("minRating");
    const maxCost = search.get("maxCost");

    const cities = await prisma.city.findMany({
        where: {
            name: name ? {contains: name, mode: 'insensitive'} : undefined,
            rating: minRating ? {gte: Number(minRating)} : undefined,
            totalCost: maxCost ? {lte: Number(maxCost)} : undefined
        },
        include: {
            costs: true,
            country: true
        },
    });
    return NextResponse.json(cities);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {name, image, rating, description, costs, totalCost, countryId, population, temperature, timezone} = body;

        // Создаём страну вместе с costs
        const city = await prisma.city.create({
            data: {
                name,
                image,
                rating,
                description,
                countryId,
                totalCost,
                population,
                temperature,
                timezone,
                costs: costs
                    ? {
                        create: {
                            rent: costs.rent,
                            food: costs.food,
                            transport: costs.transport,
                            internet: costs.internet,
                            utilities: costs.utilities
                        },
                    }
                    : undefined,
            },
            include: {
                costs: true,
            },
        });

        return NextResponse.json(city);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to create city"}, {status: 500});
    }
}