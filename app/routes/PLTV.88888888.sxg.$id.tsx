//import{ useLoaderData } from "@remix-run/react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const domain = 'http://live2.rxip.sc96655.com';
	const url = new URL(request.url);
	const playseek = url.searchParams.get("playseek");
	const { id } = params;//另一种写法params.id;//'emdy_800';
	let current = null;
	if(playseek){
		current = get_back(playseek,id,domain);
	}else{
		current = get_live(id,domain);
	}
	return new Response(current, {
		headers: { 'Content-Type': 'text/plain'},
	});
	//header("Content-Type: text/plain");
	//header('Content-Type: application/vnd.apple.mpegurl');
	//header("Content-Disposition: attachment; filename=mnf.m3u8");
	//console.log(current);
}

function get_live(ids,domain){
	var _id = ids.split('.')[0];
	var ch_arr = _id.split('_');
	
	let ch_id = ch_arr[0];
	let ch_qxd = ch_arr[1];
		
	let stream = `${domain}/live/8ne5i_sccn,${ch_id}_hls_pull_${ch_qxd}K/`;
	var time = Math.floor(new Date().getTime()/1000);
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
	return current;
}


function get_back(playseek,ids,domain){
	var _id = ids.split('.')[0];
	var ch_arr = _id.split('_');
	
	let ch_id = ch_arr[0];
	let ch_qxd = ch_arr[1];
	
	var playseeks = playseek.split("-");
	var stime = playseeks[0];
	var etime = playseeks[1];
	var sdate = new Date(stime.slice(0, 4) + '-' + stime.slice(4, 6) + '-' + stime.slice(6, 8) + 'T' + stime.slice(8, 10) + ':' + stime.slice(10, 12) + ':' + stime.slice(12, 14));
	var edate = new Date(etime.slice(0, 4) + '-' + etime.slice(4, 6) + '-' + etime.slice(6, 8) + 'T' + etime.slice(8, 10) + ':' + etime.slice(10, 12) + ':' + etime.slice(12, 14));
	
	var stimestamp = sdate.getTime()/1000;
	var etimestamp = edate.getTime()/1000;

	var s_back_id = parseInt(stimestamp/6);
	var e_back_id = parseInt(etimestamp/6);
	
	let stream = `${domain}/live/8ne5i_sccn,${ch_id}_hls_pull_${ch_qxd}K/`;
	var current = "#EXTM3U\r\n";
    current += "#EXT-X-VERSION:3\r\n";
    current += "#EXT-X-TARGETDURATION:6\r\n";
    current += `#EXT-X-MEDIA-SEQUENCE:${s_back_id}\r\n`;
    for (var i = s_back_id; i < e_back_id; i++) {
        i = String(i);
		current += "#EXTINF:6,\r\n";
	    current += stream+i.substr(0,3)+'/'+i.substr(3,3)+'/'+i.substr(6,3)+".ts\r\n";
    }
	current += '#EXT-X-ENDLIST';
	return current;
}
