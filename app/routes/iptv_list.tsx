import { json } from "@remix-run/cloudflare";


export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");

  return json({ message: `Hello, ${name}!` });
}
/*
//默认组件
export default function Index() {

  return (
    <div>
      <Form method="post" action="/form-example">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
*/
