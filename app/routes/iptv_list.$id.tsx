import { json } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");

  return json({ message: `Hello, ${name}!` });
}
