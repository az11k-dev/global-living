import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(req: NextRequest) {
    if (req.method === "OPTIONS") {
        const res = NextResponse.json(null, {status: 204});
        res.headers.set("Access-Control-Allow-Origin", "*"); // replace * with your frontend in production
        res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return res;
    }

    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res;
}

export const config = {
    matcher: "/api/:path*", // only API routes
};
