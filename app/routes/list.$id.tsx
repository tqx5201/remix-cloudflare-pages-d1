
export const loader = async ({ context,params }: LoaderFunctionArgs) => {
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
      //re_str += mergeItems(obj.list);
  }
  return new Response(re_str);
};

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
