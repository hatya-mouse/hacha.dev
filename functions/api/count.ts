interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
    const row = await env.DB.prepare(
        "SELECT count FROM page_views WHERE id = 'total'",
    ).first<{ count: number }>();
    return Response.json({ count: row?.count ?? 0 });
};

export const onRequestPost: PagesFunction<Env> = async ({ env }) => {
    const row = await env.DB.prepare(
        "UPDATE page_views SET count = count + 1 WHERE id = 'total' RETURNING count",
    ).first<{ count: number }>();
    return Response.json({ count: row?.count ?? 1 });
};
