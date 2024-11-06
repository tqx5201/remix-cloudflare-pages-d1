//import{ useLoaderData } from "@remix-run/react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {

	// 替换为你的七牛云 Access Key 和 Secret Key
  const ACCESS_KEY = '_xrjdAPeGkNOy_Kuw_ZK-CarsgrnJbuGMyt5gxZP'
  const SECRET_KEY = 'QFOnGvqUDF4EGO3n02ybiSdKjKAjWMk7gAHEcWkG'

  // 替换为你的七牛云存储空间名称和文件名称
  const BUCKET_NAME = 'diyp'
  const FILE_NAME = 'test.txt'

  // 要上传的字符串
  const stringToUpload = 'Hello, Qiniu Cloud!'

  // 构建上传策略
  const policy = {
    scope: `${BUCKET_NAME}:${FILE_NAME}`,
    deadline: 1730901680   //Math.floor(Date.now() / 1000) + 3600 // 1小时有效期
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
