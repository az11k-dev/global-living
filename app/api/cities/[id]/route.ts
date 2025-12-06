// app/api/countries/[id]/route.ts
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

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
        return NextResponse.json({error: "City not found or already deleted"}, {status: 404});
    }
}
