import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {getUserId} from "@/lib/auth";
import {handleOptions, withCors} from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
    return handleOptions();
}

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return withCors(NextResponse.json({error: "Invalid ID"}, {status: 400}));
    }
    const user = await prisma.user.findUnique({where: {id}});
    if (!user) return withCors(NextResponse.json({error: "User not found"}, {status: 404}));
    return withCors(NextResponse.json(user));
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400});
    }
    const userId = getUserId(req);
    if (!userId || userId !== id) return NextResponse.json({error: "Unauthorized"}, {status: 403});

    const {name} = await req.json();
    const user = await prisma.user.update({where: {id: userId}, data: {name}});
    return NextResponse.json(user);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400});
    }
    const userId = getUserId(req);
    if (!userId || userId !== id) return NextResponse.json({error: "Unauthorized"}, {status: 403});

    await prisma.user.delete({where: {id: userId}});
    return NextResponse.json({message: "User deleted"});
}