class RechargeCard_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			pager: {
				isFirstPage: null,
				isLastPage: null,
				pageIndex: null,
				pageSize: null,
				totalPages: null,
				totalRecords: null
			},
			neighborPageIndexs: []
		};
		this.reload = this.reload.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
	}

	componentDidMount() {
		this.reload();
		var clipboard = new Clipboard('.btn-copy');
		clipboard.on('success', function(e) {
			toastr.info("已复制！");
			e.clearSelection();
		});
		clipboard.on('error', function(e) {
			toastr.error("无法复制！");
		});
	}

	handleClickAdd() {
		rechargeCard_Add_Modal.show();
	}

	reload(pageIndex, pageSize) {
		if (pageIndex == null) {
			pageIndex = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}
		var panel = this;
		fn_api({
			"apiName": "RechargeCard_QueryList_Api",
			"pageIndex": pageIndex,
			"pageSize": pageSize
		}, function(resp){
			panel.setState({data: resp.data, pager: resp.pager, neighborPageIndexs: fn_getNeighborPageIndexs(resp.pager, 5)});
		});
	}

	handleClickPageIndex(pageIndex) {
		if (pageIndex == "first" && this.state.pager.isFirstPage == 0) {
			this.reload(0, 15);
		} else if (pageIndex == "last" && this.state.pager.isLastPage == 0) {
			this.reload(this.state.pager.totalPages - 1, 15);
		} else if (pageIndex == "previous" && this.state.pager.isFirstPage == 0) {
			this.reload(this.state.pager.pageIndex - 1, 15);
		} else if (pageIndex == "next" && this.state.pager.isLastPage == 0) {
			this.reload(this.state.pager.pageIndex + 1, 15);
		} else if (typeof(pageIndex) == "number") {
			this.reload(pageIndex, 15);
		}
	}

	handleClickDelete(rechargeCard) {
		var panel = this;
		fn_api({
			"apiName": "RechargeCard_Delete_Api",
			"rechargeCardId": rechargeCard.id
		}, function(resp){
			panel.reload();
		});
	}

	getPasswordSeriesCode(rechargeCard) {
		var rawPasswordSeriesCode = rechargeCard.rawPasswordSeriesCode;
		var code = rawPasswordSeriesCode.substring(0, rawPasswordSeriesCode.indexOf("@"));
		var amount = rawPasswordSeriesCode.substring(rawPasswordSeriesCode.indexOf("@"));
		return code.substring(0, 5) + "**********" + code.substring(code.length - 5) + amount;
	}

	render() {
		return (
			React.createElement("div", {className: "main"}, 
				React.createElement("div", {className: "main-content"}, 
					React.createElement("div", {className: "container-fluid"}, 
						React.createElement("h3", {className: "page-title"}, 
							"充值卡管理", 
							React.createElement("div", {className: "pull-right"}, 
								React.createElement("button", {className: "btn btn-danger btn-sm", onClick: this.handleClickAdd}, React.createElement("i", {className: "fa fa-plus", "aria-hidden": "true"}), " 添加")
							)
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
													React.createElement("th", null, "原始密码序列编码串"), 
													React.createElement("th", null, "面额", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "状态"), 
													React.createElement("th", null, "入库时间"), 
													React.createElement("th", null, "使用时间"), 
													React.createElement("th", null, "操作")
												)
											), 
											React.createElement("tbody", null, 
												this.state.data.map((x) => React.createElement("tr", null, 
													React.createElement("td", null, this.getPasswordSeriesCode(x)), 
													React.createElement("td", null, x.amount), 
													React.createElement("td", null, 
														x.dtUse > 0 &&
															React.createElement("span", {className: "label label-default"}, "已使用"), 
														
														x.dtUse == 0 &&
															React.createElement("span", {className: "label label-success"}, "未使用")
														
													), 
													React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
													React.createElement("td", null, x.dtUse == 0 ? "-" : fn_format_date(new Date(x.dtUse), "yyyy-MM-dd hh:mm:ss")), 
													React.createElement("td", null, 
														React.createElement("button", {className: "btn btn-default btn-sm btn-copy", "data-clipboard-text": x.rawPasswordSeriesCode}, 
															React.createElement("img", {width: "14px", src: "assets/img/clippy.svg", alt: "Copy to clipboard"})
														), 
														"  ", 
														React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickDelete(x)}, " 删除")
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
