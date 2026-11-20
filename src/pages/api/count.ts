import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const GET: APIRoute = async () => {
    try {
        const row = await env.DB.prepare(
            "SELECT count FROM page_views WHERE id = 'total'",
        ).first<{ count: number }>();
        return Response.json({ count: row?.count ?? 0 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Database query failed " }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
};

export const POST: APIRoute = async ({ locals }) => {
    try {
        const row = await env.DB.prepare(
            "UPDATE page_views SET count = count + 1 WHERE id = 'total' RETURNING count",
        ).first<{ count: number }>();
        return Response.json({ count: row?.count ?? 1 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Database query failed" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
};
