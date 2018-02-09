class MixOrder_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			data: [],
			pager: {
				isFirstPage: null,
				isLastPage: null,
				pageIndex: null,
				pageSize: null,
				totalPages: null,
				totalRecords: null
			},
			neighborPageIndexs: [],
			searchStatus: 0,
			searchGoodsCategoryId: ""
		};
		this.reload = this.reload.bind(this);
		this.handleClickClose = this.handleClickClose.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClickRefundRequestAgree = this.handleClickRefundRequestAgree.bind(this);
		this.handleClickRefundRequestReject = this.handleClickRefundRequestReject.bind(this);
		this.handleChangeSearchGoodsCategoryId = this.handleChangeSearchGoodsCategoryId.bind(this);
		
	}

	componentDidMount() {
		var panel = this;
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			panel.setState({searchStatus: e.target.dataset.searchStatus});
			panel.reload();
		})
		this.reload();
		// 加载商品分类数据
		var modal = this;
		fn_api({
			"apiName": "GoodsCategory_QueryAll_Api"
		}, function(resp){
			modal.setState({categories: resp.data});
		});
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
			"apiName": "MixOrder_QueryList_Api",
			"pageIndex": pageIndex,
			"pageSize": pageSize,
			"searchStatus": this.state.searchStatus,
			"searchGoodsCategoryId": this.state.searchGoodsCategoryId
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

	handleClickClose(mixOrder) {
		var panel = this;
		fn_api({
			"apiName": "MixOrder_Close_Api",
			"orderId": mixOrder.id
		}, function(resp){
			panel.reload();
		});
	}

	handleClickOpen(mixOrder) {
		var panel = this;
		fn_api({
			"apiName": "MixOrder_Open_Api",
			"orderId": mixOrder.id
		}, function(resp){
			panel.reload();
		});
	}

	handleClickRefundRequestAgree(mixOrder) {
		var panel = this;
		fn_api({
			"apiName": "MixOrder_AgreeRefundRequest_Api",
			"orderId": mixOrder.id
		}, function(resp){
			panel.reload();
		});
	}

	handleClickRefundRequestReject(mixOrder) {
		var panel = this;
		fn_api({
			"apiName": "MixOrder_RejectRefundRequest_Api",
			"orderId": mixOrder.id
		}, function(resp){
			panel.reload();
		});
	}

	buildReadableComment(mixOrder) {
		var template = mixOrder.goodsCommentTemplate;
		var comment = JSON.parse(mixOrder.comment);
		if (template == 0) {
			return (
				React.createElement("div", null, 
					React.createElement("span", null, "【留言】：", comment.basic)
				)
			);
		} else if (template == 1) {
			return (
				React.createElement("div", null, 
					React.createElement("span", null, "【频道号】：", comment.channel), 
					React.createElement("span", null, "【开播时间段】：", comment.times[0].start+"-"+comment.times[0].end + "; " + comment.times[1].start+"-"+comment.times[1].end+ "; " + comment.times[2].start+"-"+comment.times[2].end), 
					React.createElement("span", null, "【留言】：", comment.basic)
				)
			);
		} else if (template == 2) {
			return (
				React.createElement("div", null, 
					React.createElement("span", null, "【频道号】：", comment.channel), 
					React.createElement("span", null, "【留言】：", comment.basic)
				)
			);
		} else if (template == 3) {
			return (
				React.createElement("div", null, 
					React.createElement("span", null, "【频道号】：", comment.channel), 
					React.createElement("span", null, "【是否是卡天频道】：", comment.isKtChannel==1?"是":"否"), 
					React.createElement("span", null, "【留言】：", comment.basic)
				)
			);
		}
	}

	handleChangeSearchGoodsCategoryId(e) {
		this.setState({searchGoodsCategoryId: e.target.value}, function() {
			this.reload();
		});
	}

	render() {
		return (
			React.createElement("div", {className: "main"}, 
				React.createElement("div", {className: "main-content"}, 
					React.createElement("div", {className: "container-fluid"}, 
						React.createElement("h3", {className: "page-title"}, 
							"订单管理", 
							React.createElement("div", {className: "pull-right"}, 
								React.createElement("select", {className: "form-control", style: {minWidth: "140px"}, value: this.state.searchGoodsCategoryId, onChange: e => this.handleChangeSearchGoodsCategoryId(e)}, 
									React.createElement("option", {value: ""}, "请选择商品分类"), 
									this.state.categories.map(x => React.createElement("option", {value: x.id}, x.name))
								)
							)
						), 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-md-12"}, 
								React.createElement("div", {className: "panel"}, 
									React.createElement("div", {className: "panel-heading"}, 
										React.createElement("h3", {className: "panel-title"}, "Table")
									), 
									React.createElement("div", {className: "panel-body"}, 
										React.createElement("div", {className: "row"}, 
										    React.createElement("div", {className: "col-md-12"}, 
								                React.createElement("ul", {className: "nav nav-tabs"}, 
													React.createElement("li", {className: "active"}, React.createElement("a", {href: "#all", "data-toggle": "tab", "data-search-status": "0"}, "全部订单")), 
													React.createElement("li", null, React.createElement("a", {href: "#undisposed", "data-toggle": "tab", "data-search-status": "1"}, "未处理")), 
													React.createElement("li", null, React.createElement("a", {href: "#disposed", "data-toggle": "tab", "data-search-status": "2"}, "已处理")), 
													React.createElement("li", null, React.createElement("a", {href: "#refundRequest", "data-toggle": "tab", "data-search-status": "3"}, "退货中")), 
													React.createElement("li", null, React.createElement("a", {href: "#refundRequestAgree", "data-toggle": "tab", "data-search-status": "4"}, "已退货")), 
													React.createElement("li", null, React.createElement("a", {href: "#refundRequestReject", "data-toggle": "tab", "data-search-status": "5"}, "退货被拒绝"))
												)
										    )
										), 
										React.createElement("div", {className: "tab-content"}, 
											React.createElement("div", {className: "tab-pane active", id: "all"}, 
												React.createElement("table", {className: "table table-striped table-hover"}, 
													React.createElement("thead", null, 
														React.createElement("tr", null, 
															React.createElement("th", null, "订单号"), 
															React.createElement("th", null, "用户"), 
															React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
															React.createElement("th", null, "商品"), 
															React.createElement("th", null, "备注"), 
															React.createElement("th", null, "状态"), 
															React.createElement("th", null, "下单时间")
														)
													), 
													React.createElement("tbody", null, 
														this.state.data.map((x) => React.createElement("tr", null, 
															React.createElement("td", null, x.id), 
															React.createElement("td", null, x.userNickname), 
															React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
															React.createElement("td", null, x.goodsName), 
															React.createElement("td", null, this.buildReadableComment(x)), 
															React.createElement("td", null, 
																x.isDispose == 1 &&
																	React.createElement("span", {className: "label label-default"}, "已处理"), 
																
																x.isDispose == 0 &&
																	React.createElement("span", {className: "label label-success"}, "未处理"), 
																
																x.refundRequestStatus == 1 &&
																	React.createElement("span", {className: "label label-danger"}, "退货中"), 
																
																x.refundRequestStatus == 2 &&
																	React.createElement("span", {className: "label label-info"}, "已退货"), 
																
																x.refundRequestStatus == 3 &&
																	React.createElement("span", {className: "label label-warning"}, "退货被拒绝")
																
															), 
															React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss"))
														))
													)
												)
											), 
											React.createElement("div", {className: "tab-pane", id: "undisposed"}, 
												React.createElement("table", {className: "table table-striped table-hover"}, 
													React.createElement("thead", null, 
														React.createElement("tr", null, 
															React.createElement("th", null, "订单号"), 
															React.createElement("th", null, "用户"), 
															React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
															React.createElement("th", null, "商品"), 
															React.createElement("th", null, "备注"), 
															React.createElement("th", null, "下单时间"), 
															React.createElement("th", null, "操作")
														)
													), 
													React.createElement("tbody", null, 
														this.state.data.map((x) => React.createElement("tr", null, 
															React.createElement("td", null, x.id), 
															React.createElement("td", null, x.userNickname), 
															React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
															React.createElement("td", null, x.goodsName), 
															React.createElement("td", null, this.buildReadableComment(x)), 
															React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
															React.createElement("td", null, 
																React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickClose(x)}, " 处理")
															)
														))
													)
												)
											), 
											React.createElement("div", {className: "tab-pane", id: "disposed"}, 
												React.createElement("table", {className: "table table-striped table-hover"}, 
													React.createElement("thead", null, 
														React.createElement("tr", null, 
															React.createElement("th", null, "订单号"), 
															React.createElement("th", null, "用户"), 
															React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
															React.createElement("th", null, "商品"), 
															React.createElement("th", null, "备注"), 
															React.createElement("th", null, "下单时间"), 
															React.createElement("th", null, "处理时间"), 
															React.createElement("th", null, "操作")
														)
													), 
													React.createElement("tbody", null, 
														this.state.data.map((x) => React.createElement("tr", null, 
															React.createElement("td", null, x.id), 
															React.createElement("td", null, x.userNickname), 
															React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
															React.createElement("td", null, x.goodsName), 
															React.createElement("td", null, this.buildReadableComment(x)), 
															React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
															React.createElement("td", null, fn_format_date(new Date(x.dtDispose), "yyyy-MM-dd hh:mm:ss")), 
															React.createElement("td", null, 
																React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickOpen(x)}, " 标记为未处理")
															)
														))
													)
												)
											), 
											React.createElement("div", {className: "tab-pane", id: "refundRequest"}, 
												React.createElement("table", {className: "table table-striped table-hover"}, 
													React.createElement("thead", null, 
														React.createElement("tr", null, 
															React.createElement("th", null, "订单号"), 
															React.createElement("th", null, "用户"), 
															React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
															React.createElement("th", null, "商品"), 
															React.createElement("th", null, "备注"), 
															React.createElement("th", null, "下单时间"), 
															React.createElement("th", null, "退货申请时间"), 
															React.createElement("th", null, "操作")
														)
													), 
													React.createElement("tbody", null, 
														this.state.data.map((x) => React.createElement("tr", null, 
															React.createElement("td", null, x.id), 
															React.createElement("td", null, x.userNickname), 
															React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
															React.createElement("td", null, x.goodsName), 
															React.createElement("td", null, x.refundRequestComment), 
															React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
															React.createElement("td", null, fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")), 
															React.createElement("td", null, 
																React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickRefundRequestAgree(x)}, React.createElement("i", {className: "fa fa-check", "aria-hidden": "true"}), " 同意"), 
																"  ", 
																React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickRefundRequestReject(x)}, React.createElement("i", {className: "fa fa-times", "aria-hidden": "true"}), " 拒绝")
															)
														))
													)
												)
											), 
											React.createElement("div", {className: "tab-pane", id: "refundRequestAgree"}, 
												React.createElement("table", {className: "table table-striped table-hover"}, 
													React.createElement("thead", null, 
														React.createElement("tr", null, 
															React.createElement("th", null, "订单号"), 
															React.createElement("th", null, "用户"), 
															React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
															React.createElement("th", null, "商品"), 
															React.createElement("th", null, "备注"), 
															React.createElement("th", null, "退货申请时间"), 
															React.createElement("th", null, "审核时间")
														)
													), 
													React.createElement("tbody", null, 
														this.state.data.map((x) => React.createElement("tr", null, 
															React.createElement("td", null, x.id), 
															React.createElement("td", null, x.userNickname), 
															React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
															React.createElement("td", null, x.goodsName), 
															React.createElement("td", null, x.refundRequestComment), 
															React.createElement("td", null, fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")), 
															React.createElement("td", null, fn_format_date(new Date(x.dtAuditRefundRequest), "yyyy-MM-dd hh:mm:ss"))
														))
													)
												)
											), 
											React.createElement("div", {className: "tab-pane", id: "refundRequestReject"}, 
												React.createElement("table", {className: "table table-striped table-hover"}, 
													React.createElement("thead", null, 
														React.createElement("tr", null, 
															React.createElement("th", null, "订单号"), 
															React.createElement("th", null, "用户"), 
															React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
															React.createElement("th", null, "商品"), 
															React.createElement("th", null, "备注"), 
															React.createElement("th", null, "退货申请时间"), 
															React.createElement("th", null, "审核时间")
														)
													), 
													React.createElement("tbody", null, 
														this.state.data.map((x) => React.createElement("tr", null, 
															React.createElement("td", null, x.id), 
															React.createElement("td", null, x.userNickname), 
															React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
															React.createElement("td", null, x.goodsName), 
															React.createElement("td", null, x.refundRequestComment), 
															React.createElement("td", null, fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")), 
															React.createElement("td", null, fn_format_date(new Date(x.dtAuditRefundRequest), "yyyy-MM-dd hh:mm:ss"))
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
				)
			)
		);
	}
}
