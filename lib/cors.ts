import { NextResponse } from "next/server";

export function withCors(response: NextResponse) {
    response.headers.set("Access-Control-Allow-Origin", "*"); // replace "*" with your domain in production
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return response;
}

export function handleOptions() {
    return withCors(new NextResponse(null, { status: 204 }));
}
