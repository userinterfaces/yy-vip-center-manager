class TicketGoods_Main_Panel extends React.Component {
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
		this.handleClickReplenish = this.handleClickReplenish.bind(this);
		this.handleClickShowTickets = this.handleClickShowTickets.bind(this);
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.reload = this.reload.bind(this);
		this.handleClickPageIndex = this.handleClickPageIndex.bind(this);
	}

	componentDidMount() {
		this.reload();
	}

	handleClickReplenish(goods) {
		ticketGoods_Replenish_Modal.show({id: goods.id});
	}

	handleClickShowTickets(goods) {
		fn_api({
			"apiName": "TicketGoods_QueryTickets_Api",
			"ticketGoodsId": goods.id
		}, function(resp){
			ticketGoods_ShowTickets_Modal.show({tickets: resp.data});
		});
	}

	handleClickEdit(goods) {
		fn_api({
			"apiName": "TicketGoods_QueryDetail_Api",
			"ticketGoodsId": goods.id
		}, function(resp){
			ticketGoods_Edit_Modal.show({id:goods.id, data:resp.data});
		});
	}

	handleClickDelete(goods) {
		var panel = this;
		swal({
			title: "确定下架吗？",
			icon: "warning",
			buttons: ["取消", "确定"],
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				fn_api({
					"apiName": "TicketGoods_SoldOut_Api",
					"ticketGoodsId": goods.id
				}, function(resp){
					swal("下架成功！", {icon: "success", buttons: "确定"});
					panel.reload();
				});
			}
		});
	}

	handleClickAdd() {
		ticketGoods_Add_Modal.show();
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
			"apiName": "TicketGoods_QueryList_Api",
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

	render() {
		return (
			React.createElement("div", {className: "main"}, 
				React.createElement("div", {className: "main-content"}, 
					React.createElement("div", {className: "container-fluid"}, 
						React.createElement("h3", {className: "page-title"}, 
							"卡密商品库", 
							React.createElement("div", {className: "pull-right", style: {paddingLeft: "20px"}}, 
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
													React.createElement("th", null, "排序号"), 
													React.createElement("th", null, "图片"), 
													React.createElement("th", null, "商品名称"), 
													React.createElement("th", null, "原价", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "一级", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "二级", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "三级", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "上架时间"), 
													React.createElement("th", null, "操作")
												)
											), 
											React.createElement("tbody", null, 
												this.state.data.map((x) => React.createElement("tr", null, 
													React.createElement("td", null, x.reorder), 
													React.createElement("td", null, 
														React.createElement("img", {height: "60px", src: JSON.parse(x.pictureUrls)[0]})
													), 
													React.createElement("td", null, x.name), 
													React.createElement("td", null, React.createElement("i", {className: "fa fa-jpy", "aria-hidden": "true"}), fn_fen2yuan_in_thousands(x.price)), 
													React.createElement("td", null, React.createElement("i", {className: "fa fa-jpy", "aria-hidden": "true"}), fn_fen2yuan_in_thousands(x.priceLevel1)), 
													React.createElement("td", null, React.createElement("i", {className: "fa fa-jpy", "aria-hidden": "true"}), fn_fen2yuan_in_thousands(x.priceLevel2)), 
													React.createElement("td", null, React.createElement("i", {className: "fa fa-jpy", "aria-hidden": "true"}), fn_fen2yuan_in_thousands(x.priceLevel3)), 
													React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
													React.createElement("td", null, 
														React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickReplenish(x)}, " 补货"), 
														" ", 
														React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickShowTickets(x)}, " 查看剩余卡密"), 
														" ", 
														React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickEdit(x)}, React.createElement("i", {className: "fa fa-pencil", "aria-hidden": "true"}), " 编辑"), 
														" ", 
														React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickDelete(x)}, React.createElement("i", {className: "fa fa-times", "aria-hidden": "true"}), " 下架")
													)
												))
											)
										), 
										React.createElement("div", {className: "row"}, 
											React.createElement("div", {className: "col-md-12"}, 
												React.createElement("span", {className: "pull-right"}, 
													React.createElement("ul", {className: "pagination"}, 
														React.createElement("li", {className: this.state.pager.isFirstPage == 1 ? "disabled" : "", onClick: e => this.handleClickPageIndex("first")}, React.createElement("a", {href: "#"}, "首页")), 
														React.createElement("li", {className: this.state.pager.isFirstPage == 1 ? "disabled" : "", onClick: e => this.handleClickPageIndex("previous")}, React.createElement("a", {href: "#"}, "上一页")), 
														this.state.neighborPageIndexs.map(x => React.createElement("li", {className: this.state.pager.pageIndex == x ? "active" : "", onClick: e => this.handleClickPageIndex(x)}, 
															React.createElement("a", {href: "#"}, x+1)
														)), 
														React.createElement("li", {className: this.state.pager.isLastPage == 1 ? "disabled" : "", onClick: e => this.handleClickPageIndex("next")}, React.createElement("a", {href: "#"}, "下一页")), 
														React.createElement("li", {className: this.state.pager.isLastPage == 1 ? "disabled" : "", onClick: e => this.handleClickPageIndex("last")}, React.createElement("a", {href: "#"}, "末页"))
													)
												), 
												React.createElement("span", {className: "pull-right"}, 
													React.createElement("p", {style: {paddingTop: "28px", paddingBottom: "21px", paddingRight: "25px"}}, 
														React.createElement("small", null, "当前第", this.state.pager.pageIndex+1, "/", this.state.pager.totalPages, "页，共", this.state.pager.totalRecords, "条数据")
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
