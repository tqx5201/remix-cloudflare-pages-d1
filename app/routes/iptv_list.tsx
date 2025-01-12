import { json } from "@remix-run/cloudflare";

export async function action({ context,request }) {
  const db = context.DB as D1Database;
  const formData = await request.formData();
  const action = formData.get("action");
  
  if(action=='get_categorys'){
    const yys = formData.get("yys");
    const { results } = await db
    .prepare("SELECT * FROM iptv_list where yys = ?")
    .bind(yys)
    .all();
  }else if(action=='get_list'){
    const id = formData.get("id");
    const { results } = await db
    .prepare("select id,name,list,yys from iptv_list where id = ?")
    .bind(id)
    .all();
  }

  return new Response(results);
  //return json({ data: ${results} });
}
