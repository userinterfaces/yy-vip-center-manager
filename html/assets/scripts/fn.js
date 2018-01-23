function fn_public_api(data, success) {
	$.post("http://47.104.17.187:8085/yy-vip-center-manager-api", JSON.stringify(data), function(resp){
		if (resp.code == 0) {
			if (typeof success == 'function') {
				success(resp);
			}
		} else {
			toastr.warning(resp.message);
		}
	});
}

function fn_api(data, success) {
	if (fn_get_token() == null) {
		toastr.error("Token已失效，请重新登录");
		return;
	}
	data.token = fn_get_token();
	fn_public_api(data, success);
}

function fn_fen2yuan(num) {
	if (typeof num !== "number" || isNaN(num)) {
		return null;
	}
	return num / 100 + '';
}

function fn_fen2yuan_fixed(num) {
	if (typeof num !== "number" || isNaN(num)) {
		return null;
	}
	return (num / 100).toFixed(2);
}

function fn_fen2yuan_in_thousands(num) {
	var yuan = fn_fen2yuan(num);
	var reg = yuan.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
	return yuan.replace(reg, '$1,');
}

function fn_format_date(date, format){
	var o = {
		"M+" : date.getMonth()+1, //month
		"d+" : date.getDate(), //day
		"h+" : date.getHours(), //hour
		"m+" : date.getMinutes(), //minute
		"s+" : date.getSeconds(), //second
		"q+" : Math.floor((date.getMonth()+3)/3), //quarter
		"S" : date.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}

function fn_ajax_upload_file(files, success) {
	var formData = new FormData();
	for(var i=0; i<files.length; i++) {
		formData.append("file"+i, files[i]);
	}
	$.ajax({
		url: "http://47.104.17.187:8082/micro-file-server",
		type: "POST",
		cache: false,
		data: formData,
		processData: false,
		contentType: false
	}).done(function(resp) {
		if (typeof success == 'function') {
			success(resp);
		}
	}).fail(function(resp) {
		toastr.error("文件上传失败");
	});
}

function fn_getNeighborPageIndexs(pager, max) {
	var left = pager.pageIndex - 0;
	var maxLeft = (max - 1) / 2;
	if (left > maxLeft) {
		left = maxLeft;
	}
	var right = max - left - 1;
	var maxRight = pager.totalPages - 1 - pager.pageIndex;
	if (right > maxRight) {
		right = maxRight;
	}
	var paddingLeft = max - left - right - 1;
	var maxPaddingLeft = pager.pageIndex - left;
	if (paddingLeft > maxPaddingLeft) {
		paddingLeft = maxPaddingLeft;
	}
	var neighborPageIndexs = new Array();
	for (var i = left+paddingLeft; i >= 1; i--) {
		neighborPageIndexs.push(pager.pageIndex - i);
	}
	neighborPageIndexs.push(pager.pageIndex);
	for (var i = 1; i <= right; i++) {
		neighborPageIndexs.push(pager.pageIndex + i);
	}
	return neighborPageIndexs;
}
