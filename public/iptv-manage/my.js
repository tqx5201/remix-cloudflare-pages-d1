//定义数据在哪里显示
var my_data_area = '';
if(my_data_area=='ace'){
	$('#my_data_area').html('<div id="data" style="height: 500px; width: 100%"></div>');
	var editor = ace.edit("data");
	editor.setTheme("ace/theme/monokai"); // 设置主题
	editor.setFontSize(16);
	editor.getSession().setMode("ace/mode/text"); // 设置语言模式
	editor.getSession().setUseWrapMode(true); //设置代码自动换行
	editor.getSession().on("change", function(e) {
	console.log("Editor content changed:", e);
	});
}else{
	$('#my_data_area').html('<textarea id="data" rows="20" class="form-control" style="heigth:500px;"></textarea>');
}



var yys = getUrlParam("yys");
if (yys === null) {
    yys = 'yd';
}
set_css(yys);


var api_url = 'https://api.7259.us.kg/iptv_list';
var file_name = '';
var file_path = '';
//class="active"
get_categorys();


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null)
        return unescape(r[2]);
    return null;
}

function get_categorys() {
    $.ajax({
        url: api_url,
        type: "post",
        dataType: "json",
        data: {
            yys: yys,
            action: 'get_categorys',
        },
        success: function(json) {
            //console.log(json);
            if (!$.isEmptyObject(json)) {
                $_html = '';
                $.each(json.data, function(i, item) {
                    $_html += '<li class="list-group-item"><a href="#" onclick="read(\'' + item.id + '\')">' + item.name + '</a></li>';
                });
                $('.list-group').html($_html);
                read(json.data[0]['id']);
            } else {
                $('.list-group').html("");
                $("#name").val("新分类");
                $("#data").val("暂无数据");
            }
        },
        error: function() {
            alert("错误");
        }
    });
}

function read(_id) {
    $.ajax({
        url: api_url,
        type: "post",
        data: {
	    id : _id,
	    action: 'get_list',
        },
        dataType: "json",
        success: function(json) {
            //console.log(json);
            if(my_data_area=='ace'){
                editor.setValue(json.data,-1);
                editor.clearSelection();
                editor.setShowPrintMargin(false);
            }else{
                $("#data").val(json.data[0]['list']); 
            }
	        $("#id").val(json.data[0]['id']); 
		$("#name").val(json.data[0]['name']); 
        },
        error: function() {
            alert("错误");
        }
    });
}

$("#save").click(function() {
    if(my_data_area=='ace'){
        my_data = editor.getValue();
    }else{
        my_data = $('#data').val();
    }

    $.ajax({
        url: api_url,
        type: "post",
        dataType: "json",
        data: {
	    action : 'save',
	    yys : yys,
	    id : $("#id").val(),
	    name: $("#name").val(),
	    data: my_data,
        },
        success: function(json) {
            console.log(json);
            alert(json.msg);
        },
        error: function() {
            alert("错误");
        }
    });
    get_categorys();
});


$("#del").click(function() {
    $.ajax({
        url: api_url,
        type: "post",
        dataType: "json",
        data: {
	    action: "del",
            yys: yys,
	    id : $("#id").val(),
        },
        success: function(json) {
            //console.log(json);
            alert(json.msg);
        },
        error: function() {
            alert("错误");
        }
    });
    get_categorys();
});

function set_css(id) {
    $("#yd").removeClass("active");
    $("#dx").removeClass("active");
    $("#lt").removeClass("active");
    $("#ty").removeClass("active");
    $("#" + id).addClass("active");
}

$("#add_new").click(function() {
    $("#name").val("新分类");
    $("#data").val("");
    $("#id").val(0);
});

$("#up_qiniu").click(function() {
    $.ajax({
        url: api_url,
        type: "post",
        dataType: "json",
        data: {
            yys: yys,
	    action: "up_qiniu",
        },
        success: function(json) {
            alert(json.msg);
        },
        error: function() {
            alert("错误");
        }
    });
});



function replaceText() {
    var findText = $('#find').val();
    var replaceText = $('#replace').val();
    if(my_data_area=='ace'){
        editor.find(findText, {  
	    backwards: false,  
	    wrap: false,  
	    caseSensitive: false,  
	    wholeWord: false,  
	    regExp: false  
	});  
	editor.findAll();
	editor.replaceAll(replaceText);
     }else{
	var originalText = document.getElementById('data').value;
	var modifiedText = originalText.replace(new RegExp(findText, 'g'), replaceText);
	//console.log(modifiedText);
	 document.getElementById('data').value = modifiedText;
    }
}
