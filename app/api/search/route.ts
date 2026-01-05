import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { handleOptions, withCors } from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
    return handleOptions();
}

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams;

    // Common filters
    const name = search.get("name");
    const minRating = search.get("minRating");
    const maxCost = search.get("maxCost");

    // City-specific filters
    const countryName = search.get("country");
    const maxPopulation = search.get("maxPopulation");

    try {
        // Fetch countries
        const countries = await prisma.country.findMany({
            where: {
                name: name ? { contains: name, mode: "insensitive" } : undefined,
                rating: minRating ? { gte: Number(minRating) } : undefined,
                totalCost: maxCost ? { lte: Number(maxCost) } : undefined,
            },
            include: {
                costs: true,
                cities: true,
                reviews: true,
            },
        });

        // Fetch cities
        const cities = await prisma.city.findMany({
            where: {
                name: name ? { contains: name, mode: "insensitive" } : undefined,
                rating: minRating ? { gte: Number(minRating) } : undefined,
                totalCost: maxCost ? { lte: Number(maxCost) } : undefined,
                population: maxPopulation ? { lte: Number(maxPopulation) } : undefined,
                country: countryName
                    ? { name: { contains: countryName, mode: "insensitive" } }
                    : undefined,
            },
            include: {
                country: true,
                costs: true,
                reviews: true,
            },
        });

        return withCors(NextResponse.json({ countries, cities }));
    } catch (error) {
        console.error(error);
        return withCors(NextResponse.json({ error: "Server error" }, { status: 500 }));
    }
}
