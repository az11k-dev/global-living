import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams;

    const name = search.get("name");
    const continent = search.get("continent");
    const language = search.get("language");
    const minRating = search.get("minRating");
    const maxCost = search.get("maxCost");

    const countries = await prisma.country.findMany({
        where: {
            name: name ? {contains: name, mode: 'insensitive'} : undefined,
            continent: continent ? {contains: continent, mode: 'insensitive'} : undefined,
            language: language ? {contains: language, mode: 'insensitive'} : undefined,
            rating: minRating ? {gte: Number(minRating)} : undefined,
            totalCost: maxCost ? {lte: Number(maxCost)} : undefined
        },
        include: {
            costs: true,
            cities: true
        },
    });
    return NextResponse.json(countries);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {name, flag, continent, temperature, language, image, rating, description, costs, totalCost} = body;

        // Создаём страну вместе с costs
        const country = await prisma.country.create({
            data: {
                name,
                flag,
                continent,
                temperature,
                language,
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

        return NextResponse.json(country);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to create country"}, {status: 500});
    }
}