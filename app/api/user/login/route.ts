import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {handleOptions, withCors} from "@/lib/cors";

const JWT_SECRET = process.env.JWT_SECRET || "No secret provided";

export async function OPTIONS(req: NextRequest) {
    return handleOptions();
}

export async function POST(req: NextRequest) {
    const {email, password} = await req.json();

    if (!email || !password) return NextResponse.json({error: "Missing data"}, {status: 400});

    const user = await prisma.user.findUnique({where: {email}});
    if (!user || !user.password) return NextResponse.json({error: "Invalid credentials"}, {status: 401});

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({error: "Invalid credentials"}, {status: 401});

    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: "7d"});

    return withCors(NextResponse.json({token, user}));
}
