// app/routes/text.jsx
import { json } from '@remix-run/node';

export async function loader() {
  return new Response('Hello, world!', {
    headers: { 'Content-Type': 'text/plain' },
  });
}
