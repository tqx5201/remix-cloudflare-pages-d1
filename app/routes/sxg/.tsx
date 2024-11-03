
export async function loader() {
  return new Response('Hello, world!', {
    headers: { 'Content-Type': 'text/plain' },
  });
}
