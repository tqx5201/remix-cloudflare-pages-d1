import { json } from "@remix-run/cloudflare";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>这是部署在cloudflare pages 的Remix</h1>
    </div>
  );
}


export async function action({ context,request }) {
  const db = context.DB as D1Database;
  const formData = await request.formData();
  const action = formData.get("action");
  //return json({ message: `Hello, ${action}!` });


  if(action=='get_categorys'){
    const yys = formData.get("yys");
    const { results } = await db
    .prepare("SELECT * FROM iptv_list where yys = ?")
    .bind(yys)
    .all();
    let re_str = '';
    for (const obj of results) {
      re_str += obj.name + ',#genre#\n';
      re_str += obj.list + '\n';
    }
    return new Response(re_str);
    
  }else if(action=='get_list'){
    const id = formData.get("id");
    const { results } = await db
    .prepare("select id,name,list,yys from iptv_list where id = ?")
    .bind(id)
    .all();
  }
 /* 
 return results;
 return json({ message: `Hello, ${action}!` });
 const jsonString = JSON.stringify(results);

  // 返回JSON响应
  return json({ jsonString });
  //return new Response(re_str);
  //return new Response(results);
  //return json({ data: ${results} });
  */
}
