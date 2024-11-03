// app/routes/user/$id.jsx
export async function loader({ params }) {
  const userId = params.id;

  // 现在你可以使用 userId 变量了
  return userId;
}
