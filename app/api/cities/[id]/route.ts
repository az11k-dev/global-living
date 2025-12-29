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
        const deletedCity = await prisma.city.delete({
            where: {id},
        });

        return NextResponse.json({message: "City deleted", city: deletedCity});
    } catch (error) {
        console.error(error);
        return withCors(NextResponse.json({error: "City not found or already deleted"}, {status: 404}));
    }
}

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400});
    }

    const city = await prisma.city.findUnique({
        where: {id},
        include: {
            costs: true,
            country: true,
        },
    });
    return withCors(NextResponse.json(city));
}

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400});
    }

    const data = await req.json();

    try {
        const updated = await prisma.city.update({
            where: {id},
            data: data,
        });
        return NextResponse.json({message: "City updated", city: updated});
    } catch (error) {
        console.error(error);
        return withCors(NextResponse.json({error: "City not found"}, {status: 404}))
    }
}
