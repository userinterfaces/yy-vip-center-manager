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
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="brand">
					<a href="index.html"><img src="assets/img/logo-dark.png" alt="Klorofil Logo" className="img-responsive logo" /></a>
				</div>
				<div className="container-fluid">
					<div className="navbar-btn">
						<button type="button" className="btn-toggle-fullwidth" onClick={this.handleClickToggleFullwidth}><i className="lnr lnr-arrow-left-circle"></i></button>
					</div>
					<div id="navbar-menu">
						<ul className="nav navbar-nav navbar-right">
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown"><img src="assets/img/profle.png" className="img-circle" alt="Avatar" /> <span>欢迎，管理员</span> <i className="icon-submenu lnr lnr-chevron-down"></i></a>
								<ul className="dropdown-menu">
									<li data-toggle="modal" data-target="#system_EditMyPassword_Modal"><a href="#"><i className="fa fa-key" aria-hidden="true"></i> <span>修改密码</span></a></li>
									<li onClick={this.handleClickLogout}><a href="#"><i className="lnr lnr-exit"></i> <span>退出</span></a></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

var system_Navbar = ReactDOM.render(<System_Navbar />, document.getElementById("system_Navbar_Container"));
