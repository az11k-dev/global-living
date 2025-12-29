import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "No secret provided";

export function getUserId(req: NextRequest) {
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