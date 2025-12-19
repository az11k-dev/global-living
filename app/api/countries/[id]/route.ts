// app/api/countries/[id]/route.ts
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {handleOptions, withCors} from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
    return handleOptions();
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

    try {
        const deletedCountry = await prisma.country.delete({
            where: {id},
        });

        return withCors(NextResponse.json({message: "Country deleted", country: deletedCountry}));
    } catch (error) {
        console.error(error);
        return withCors(NextResponse.json({error: "Country not found or already deleted"}, {status: 404}));
    }
}

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return withCors(NextResponse.json({error: "Invalid ID"}, {status: 400}));
    }

    const country = await prisma.country.findUnique({
        where: {id},
        include: {
            costs: true,
            cities: true,
        },
    });
    return withCors(NextResponse.json(country));
}

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return withCors(NextResponse.json({error: "Invalid ID"}, {status: 400}));
    }

    const data = await req.json();

    try {
        const updated = await prisma.country.update({
            where: {id},
            data: data,
        });
        return withCors(NextResponse.json({message: "Country updated", country: updated}));
    } catch (error) {
        console.error(error);
        return withCors(NextResponse.json({error: "Country not found"}, {status: 404}));
    }
}
