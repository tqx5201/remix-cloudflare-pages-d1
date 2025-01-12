// app/routes/form-example.jsx

import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";


export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");

  return json({ message: `Hello, ${name}!` });
}

export default function FormExample() {
  const actionData = useActionData();

  return (
    <div>
      <form method="post" action="/form-example">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {actionData && <p>{actionData.message}</p>}
    </div>
  );
}
