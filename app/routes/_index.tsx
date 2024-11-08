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
  const sql = 'CREATE TABLE Customers222 (CustomerID INT PRIMARY KEY autoincrement, CompanyName TEXT, ContactName TEXT, PRIMARY KEY (`CustomerID`));';
  const { results } = await db
    .prepare(sql);
    //.all<iptv_list>();

  return json({
    iptv_lists: results ?? [],
  });
};

export default function Index() {
  const { iptv_lists } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>这是部署在cloudflare pages 的Remix</h1>
      <ul>
        {iptv_lists.map((iptv_list) => (
          <li key={iptv_list.id}>
            {iptv_list.name},#genre#
            {iptv_list.yys}
          </li>
        ))}
      </ul>
    </div>
  );
}

function mergeItems(str) {
    let arr = str.split('\n');
    // 过滤掉空值
    let filteredArr = arr.filter(item => item);

    // 我们首先创建一个空对象来存储合并后的结果
    let merged = {};

    // 遍历数组中的每个字符串
    filteredArr.forEach(item => {
        // 将字符串按逗号分割成前缀和后缀
        let [prefix, suffix] = item.split(',');
        // 过滤掉空字符串和undefined值
        if (prefix && suffix) {
            // 如果前缀已经存在于merged对象中，则将后缀添加到对应的Set中
            if (merged[prefix]) {
                merged[prefix].add(suffix);
            } else {
                // 如果前缀不存在，则创建一个新的Set来存储后缀
                merged[prefix] = new Set([suffix]);
            }
        }
    });

    // 现在我们将合并后的结果转换为所需的字符串格式
    let result = Object.keys(merged).map(key => {
        return `${key},${Array.from(merged[key]).join('#')}`;
    }).join('\n'); // 使用换行符将每个合并后的项连接成一个字符串

    return result;
}

// 示例使用
//let arr = ['cctv1,xxx1', 'cctv1,xxx2', '', 'cctv2,yyy1', null, 'cctv2,yyy2', 'cctv2,', 'cctv2,yyy2'];
//console.log(mergeItems(arr)); // 输出: 'cctv1,xxx1#xxx2\ncctv2,yyy1#yyy2'
