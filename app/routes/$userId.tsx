// app/routes/user/$id.jsx
import { json } from '@remix-run/node';

export async function loader({ params }) {
  const userId = params.id;

  // 现在你可以使用 userId 变量了
  return json({ userId });
}
