export const loader = async ({ context, params }: LoaderFunctionArgs) => {
return new Response(params.id, {
    headers: { 'Content-Type': 'text/plain' },
  });

}
//export async function loader() {}
