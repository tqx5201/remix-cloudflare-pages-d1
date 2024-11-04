//import{ useLoaderData } from "@remix-run/react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
const domain = 'http://live2.rxip.sc96655.com';
//const [searchParams] = useSearchParams();
//const playseek = searchParams.get("playseek");
const url = new URL(request.url);
const playseek = url.searchParams.get("playseek");
const { id } = params;//另一种写法params.id;//'emdy_800';
if(playseek){
    	get_back(playseek,id,domain);
}else{
	get_live(id,domain);
}
	



}
//export async function loader() {}
function get_live(ids,domain){
	var _id = ids.split('.')[0];
	var ch_arr = _id.split('_');
	
	let ch_id = ch_arr[0];
	let ch_qxd = ch_arr[1];
		
	let stream = `${domain}/live/8ne5i_sccn,${ch_id}_hls_pull_${ch_qxd}K/`;
	var time=Math.floor(new Date().getTime()/1000);
	let timestamp = parseInt((time-60)/6);
	let current = "#EXTM3U\r\n";
	current += "#EXT-X-VERSION:3\r\n";
	current += "#EXT-X-TARGETDURATION:6\r\n";
	current += `#EXT-X-MEDIA-SEQUENCE:${timestamp}\r\n`;
	
	for (var i = 0; i < 6; i++) {
	     timestamp = String(timestamp);
	     current += "#EXTINF:6,\r\n";
	     current += stream+timestamp.substr(0,3)+'/'+timestamp.substr(3,3)+'/'+timestamp.substr(6,3)+".ts\r\n";
	     timestamp = Number(timestamp);
	     timestamp++;
	}
	//header("Content-Type: text/plain");
	//header('Content-Type: application/vnd.apple.mpegurl');
	//header("Content-Disposition: attachment; filename=mnf.m3u8");
	//console.log(current);
	return new Response(current, {
		headers: { 'Content-Type': 'application/vnd.apple.mpegurl'},
	});
}
