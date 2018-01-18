function fn_api(data, success) {
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

function fn_remove_token() {
	fn_set_token(null);
}

function fn_set_token(token) {
	$.cookie("token", token, { "expires": 30, "path": "/" });
}

function fn_get_token() {
	return $.cookie("token");
}