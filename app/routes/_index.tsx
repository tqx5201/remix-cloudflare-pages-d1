import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

type iptv_list = {
  id: number;
  name: string;
  list: string;
  yys: string;
};

type Customer = {
  CustomerID: number;
  CompanyName: string;
  ContactName: string;
};

export const loader = async ({ context }: LoaderArgs) => {
  const db = context.DB as D1Database;

  const { results } = await db
    .prepare("SELECT * FROM iptv_list")
    .all<iptv_list>();

  return json({
    iptv_lists: results ?? [],
  });
};

export default function Index() {
  const { iptv_lists } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {iptv_lists.map((iptv_list) => (
          <li key={iptv_list.id}>
            {iptv_list.name}, {iptv_list.yys}
          </li>
        ))}
      </ul>
    </div>
  );
}

function hebing(){
// 假设我们有一个包含多个字符串的数组
let arr = ['cctv1,xxx1', 'cctv1,xxx2', 'cctv1,xxx1', 'cctv2,yyy1', 'cctv2,yyy2', 'cctv2,yyy3', 'cctv2,yyy2'];

// 我们首先创建一个空对象来存储合并后的结果
let merged = {};

// 遍历数组中的每个字符串
arr.forEach(item => {
    // 将字符串按逗号分割成前缀和后缀
    let [prefix, suffix] = item.split(',');
    // 如果前缀已经存在于merged对象中，则将后缀添加到对应的Set中
    if (merged[prefix]) {
        merged[prefix].add(suffix);
    } else {
        // 如果前缀不存在，则创建一个新的Set来存储后缀
        merged[prefix] = new Set([suffix]);
    }
});

// 现在我们将合并后的结果转换为所需的字符串格式
let result = Object.keys(merged).map(key => {
    return `${key},${Array.from(merged[key]).join('#')}`;
});
return result;
//console.log(result); 
// 输出: ['cctv1,xxx1#xxx2', 'cctv2,yyy1#yyy2#yyy3']
}
