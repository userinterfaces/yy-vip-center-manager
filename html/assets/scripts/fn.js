function fn_api(data, success) {
	$.post("http://47.104.17.187:8085/yy-vip-center-manager-api", JSON.stringify(data), function(resp){
		if (resp.code == 0) {
			success(resp);
		} else {
			toastr.warning(resp.message);
		}
	});
}

function fn_set_token(token) {
	$.cookie("token", token, { expires: 30, path: '/' });
}

function fn_get_token() {
	$.cookie("token");
}

function set_cookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString());
}

function get_cookie(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}