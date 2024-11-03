// app/routes/user/$id.jsx
import { useParams } from '@remix-run/react';

export default function UserPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>User ID: {id}</h1>
    </div>
  );
}
