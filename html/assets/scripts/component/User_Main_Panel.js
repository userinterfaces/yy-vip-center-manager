class User_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.reload = this.reload.bind(this);
	}

	componentDidMount() {
		this.reload();
	}

	handleClickEdit(user) {
		fn_api({
			"apiName": "User_QueryDetail_Api",
			"userId": user.id
		}, function(resp){
			user_Edit_Modal.show({id:user.id, data:resp.data});
		});
	}

	reload() {
		var panel = this;
		fn_api({
			"apiName": "User_QueryList_Api",
			"pageIndex": 0,
			"pageSize": 15
		}, function(resp){
			panel.setState({data: resp.data});
		});
	}

	render() {
		return (
			React.createElement("div", {className: "main"}, 
				React.createElement("div", {className: "main-content"}, 
					React.createElement("div", {className: "container-fluid"}, 
						React.createElement("h3", {className: "page-title"}, 
							"用户管理"
						), 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-md-12"}, 
								React.createElement("div", {className: "panel"}, 
									React.createElement("div", {className: "panel-heading"}, 
										React.createElement("h3", {className: "panel-title"}, "Table")
									), 
									React.createElement("div", {className: "panel-body"}, 
										React.createElement("table", {className: "table table-striped table-hover"}, 
											React.createElement("thead", null, 
												React.createElement("tr", null, 
													React.createElement("th", null, "用户ID"), 
													React.createElement("th", null, "昵称"), 
													React.createElement("th", null, "手机号"), 
													React.createElement("th", null, "等级"), 
													React.createElement("th", null, "余额", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "是否禁用"), 
													React.createElement("th", null, "注册时间"), 
													React.createElement("th", null, "操作")
												)
											), 
											React.createElement("tbody", null, 
												this.state.data.map((x) => React.createElement("tr", null, 
													React.createElement("td", null, x.id), 
													React.createElement("td", null, x.nickname), 
													React.createElement("td", null, x.phone), 
													React.createElement("td", null, 
														x.level == 0 && "普通用户", 
														x.level == 1 && "一级代理", 
														x.level == 2 && "二级代理", 
														x.level == 3 && "三级代理"
													), 
													React.createElement("td", null, React.createElement("i", {className: "fa fa-jpy", "aria-hidden": "true"}), fn_fen2yuan_in_thousands(x.walletAmount)), 
													React.createElement("td", null, 
														x.isDisable == 0 &&
															React.createElement("span", {className: "label label-success"}, "未禁用"), 
														
														x.isDisable == 1 &&
															React.createElement("span", {className: "label label-default"}, "已禁用")
														
													), 
													React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
													React.createElement("td", null, 
														React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickEdit(x)}, React.createElement("i", {className: "fa fa-pencil", "aria-hidden": "true"}), " 编辑")
													)
												))
											)
										)
									)
								)
							)
						)
					)
				)
			)
		);
	}
}
