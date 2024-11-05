import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

type iptv_list = {
  id: number;
  name: string;
  list: string;
  yys: string;
};

type Customer = {
  CustomerID: number;
  CompanyName: string;
  ContactName: string;
};

export const loader = async ({ context }: LoaderArgs) => {
  const db = context.DB as D1Database;

  const { results } = await db
    .prepare("SELECT * FROM iptv_list")
    .all<iptv_lidt>();

  return json({
    iptv_lists: results ?? [],
  });
};

export default function Index() {
  const { iptv_lists } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {customers.map((iptv_list) => (
          <li key={iptv_lists.id}>
            {iptv_lists.name}, {iptv_lists.list}
          </li>
        ))}
      </ul>
    </div>
  );
}
