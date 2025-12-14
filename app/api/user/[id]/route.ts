import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "No secret provided";

function getUserId(req: NextRequest) {
    const auth = req.headers.get("Authorization");
    if (!auth) return null;
    const token = auth.split(" ")[1];
    try {
        const payload: unknown = jwt.verify(token, JWT_SECRET);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return payload.userId;
    } catch {
        return null;
    }
}

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const {id: idStr} = await context.params;
    const id = Number(idStr);

    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400});
    }
    const user = await prisma.user.findUnique({where: {id}});
    if (!user) return NextResponse.json({error: "User not found"}, {status: 404});
    return NextResponse.json(user);
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
    return NextResponse.json({id: user.id, email: user.email, name: user.name});
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