import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ context }: LoaderArgs) => {
  const db = context.DB as D1Database;
  const sql = 'SELECT * FROM iptv_list';
  //const { results } = await db
    //.prepare(sql)
    //.all<iptv_list>();
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL)`);
  return new Response('results');
  return json({
    iptv_lists: results ?? [],
  });
};
