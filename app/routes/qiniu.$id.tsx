
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
      re_str += mergeItems(obj.list) + '\n';
  }
  //return new Response(re_str);


  
    //将上面整理好的代码上传至qiniu
  // 替换为你的七牛云 Access Key 和 Secret Key
  const ACCESS_KEY = '_xrjdAPeGkNOy_Kuw_ZK-CarsgrnJbuGMyt5gxZP';
  //return new Response(process.env.QINIU_ACCESS_KEY);
  const SECRET_KEY = 'QFOnGvqUDF4EGO3n02ybiSdKjKAjWMk7gAHEcWkG';

  // 替换为你的七牛云存储空间名称和文件名称
  const BUCKET_NAME = 'diyp';
  const FILE_NAME = 'list_' + ids + '_cf.txt';

  // 要上传的字符串
  //const stringToUpload = 'Hello, Qiniu Cloud!';
  const stringToUpload = re_str;

  // 构建上传策略
  const policy = {
    scope: `${BUCKET_NAME}:${FILE_NAME}`,
    deadline: Math.floor(Date.now() / 1000) + 3600 // 1小时有效期
  }

  // 使用 HMAC-SHA1 签名策略
  const encodedPolicy = btoa(JSON.stringify(policy))
  const sign = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  ).then(key => crypto.subtle.sign('HMAC', key, new TextEncoder().encode(encodedPolicy)))
    .then(arrayBuffer => btoa(String.fromCharCode(...new Uint8Array(arrayBuffer))))

  // 构建上传凭证
  const uploadToken = `${ACCESS_KEY}:${sign}:${encodedPolicy}`
//return new Response(uploadToken);

  // 构建上传请求
  //const uploadUrl = `https://upload.qiniup.com/putb64/-2/key/${btoa(FILE_NAME)}`
  const uploadUrl = `http://up-z2.qiniup.com/putb64/-1/key/${btoa(FILE_NAME)}`
  const uploadRequest = new Request(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Authorization': `UpToken ${uploadToken}`
    },
    body: btoa(stringToUpload)
  })

  // 发送上传请求
  const response = await fetch(uploadRequest);
  // 返回响应结果
  return response;
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
