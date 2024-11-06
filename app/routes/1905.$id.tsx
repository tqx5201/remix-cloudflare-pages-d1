//import{ useLoaderData } from "@remix-run/react";
//export const loader = async({request,params}: LoaderFunctionArgs) = >{
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	
    const { id } = params; //另一种写法params.id;//'1905b';
    const n = {
        "cctv6": "LIVEOCTI36HXJXB9U",
        "1905a": "LIVENCOI8M4RGOOJ9",
        "1905b": "LIVE8J4LTCXPI7QJ5",
    };

    var ts = String(new Date().getTime() / 1000);
    const salt = "689d471d9240010534b531f8409c9ac31e0e6521";

    const playerId = ts.substr(6) + ts.substr( - 3) + ts.substr( - 8);
    const uuid = generateUUID();

    let myParams = {
        "cid": 999999,
        "expiretime": (ts + 600),
        "nonce": ts,
        "page": "https://www.1905.com/",
        "playerid": playerId,
        "streamname": n[id],
        "uuid": uuid,
    };
return new Response(JSON.stringfy(myParams));
    
const http_query = jsonToQueryString(myParams) + "." + salt;
    const hashBuffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(http_query));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sign = hashArray.map(b =>b.toString(16).padStart(2, '0')).join('');

    myParams['appid'] = 'W0hUwz8D';
return new Response(JSON.stringfy(myParams));
    const originalUrl = "https://profile.m1905.com/mvod/liveinfo.php";
    const myHeaders = {
        "Authorization": sign,
        "Content-Type": "application/json",
        "Origin": "https://www.1905.com"
    };

    const response = await fetch(originalUrl, {
        method: "POST",// *GET, POST, PUT, DELETE, etc.
        headers: myHeaders,
        body: JSON.stringfy(myParams),
    });

    const {
        status,
        statusText,
        headers
    } = response;
    const body = await response.arrayBuffer();

    return new Response(body, {
        status,
        statusText,
        headers: {...headers,
            'Content-Type': contentType,
            'Content-Disposition': ContentDisposition,
            'Access-Control-Allow-Origin': '*',
            // 可选：设置 CORS 头以允许跨域请求
        },
    });
}
function jsonToQueryString(json) {
    return Object.keys(json).map(key => 
        encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
        ).join('&');
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
