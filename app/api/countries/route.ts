export async function GET(req: Request) {
    const data = {
        id: 1,
        url: req.url,
        method: req.method || 'GET',
    };
    return new Response(JSON.stringify(data));
}

export async function POST(req: Request) {
    return new Response(req.body);
}