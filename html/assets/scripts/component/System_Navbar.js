class System_Navbar extends React.Component {

	handleClickLogout() {
		fn_public_api({
			"apiName": "System_Logout_Api",
			"token": fn_get_token()
		}, function(){
			fn_remove_token();
			window.location.href = "login.html";
		});
	}

	handleClickToggleFullwidth() {
		if(!$('body').hasClass('layout-fullwidth')) {
			$('body').addClass('layout-fullwidth');

		} else {
			$('body').removeClass('layout-fullwidth');
			$('body').removeClass('layout-default'); // also remove default behaviour if set
		}

		$(this).find('.lnr').toggleClass('lnr-arrow-left-circle lnr-arrow-right-circle');

		if($(window).innerWidth() < 1025) {
			if(!$('body').hasClass('offcanvas-active')) {
				$('body').addClass('offcanvas-active');
			} else {
				$('body').removeClass('offcanvas-active');
			}
		}
	}

	render() {
		return (
			React.createElement("nav", {className: "navbar navbar-default navbar-fixed-top"}, 
				React.createElement("div", {className: "brand"}, 
					React.createElement("a", {href: "index.html"}, React.createElement("img", {src: "assets/img/logo-dark.png", alt: "Klorofil Logo", className: "img-responsive logo"}))
				), 
				React.createElement("div", {className: "container-fluid"}, 
					React.createElement("div", {className: "navbar-btn"}, 
						React.createElement("button", {type: "button", className: "btn-toggle-fullwidth", onClick: this.handleClickToggleFullwidth}, React.createElement("i", {className: "lnr lnr-arrow-left-circle"}))
					), 
					React.createElement("div", {id: "navbar-menu"}, 
						React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
							React.createElement("li", {className: "dropdown"}, 
								React.createElement("a", {href: "#", className: "dropdown-toggle", "data-toggle": "dropdown"}, React.createElement("img", {src: "assets/img/profle.png", className: "img-circle", alt: "Avatar"}), " ", React.createElement("span", null, "欢迎，管理员"), " ", React.createElement("i", {className: "icon-submenu lnr lnr-chevron-down"})), 
								React.createElement("ul", {className: "dropdown-menu"}, 
									React.createElement("li", {"data-toggle": "modal", "data-target": "#system_EditMyPassword_Modal"}, React.createElement("a", {href: "#"}, React.createElement("i", {className: "fa fa-key", "aria-hidden": "true"}), " ", React.createElement("span", null, "修改密码"))), 
									React.createElement("li", {onClick: this.handleClickLogout}, React.createElement("a", {href: "#"}, React.createElement("i", {className: "lnr lnr-exit"}), " ", React.createElement("span", null, "退出")))
								)
							)
						)
					)
				)
			)
		);
	}
}

var system_Navbar = ReactDOM.render(React.createElement(System_Navbar, null), document.getElementById("system_Navbar_Container"));
