export const loader = async ({ context,params }: LoaderFunctionArgs) => {

// 将对象转换为JSON字符串
  const jsonString = JSON.stringify(params);
  // 返回JSON响应
  return json({ jsonString });

  
  return new Response(params);
  const db = context.DB as D1Database;
  const { id } = params; 
  const ids = id.split('.')[0];
  const { results } = await db
    .prepare("SELECT * FROM iptv_list where yys = ?")
    .bind(ids)
    .all();
  let re_str = '';
  for (const obj of results) {
      re_str += obj.name + ',#genre#\n';
      re_str += mergeItems(obj.list) + '\n';
  }
  return new Response(re_str);
};
