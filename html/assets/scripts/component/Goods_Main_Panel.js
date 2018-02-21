class Goods_Main_Panel extends React.Component {
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
			searchGoodsCategoryId: ""
		};
		this.handleClickSetBuyLimit = this.handleClickSetBuyLimit.bind(this);
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.reload = this.reload.bind(this);
		this.handleClickPageIndex = this.handleClickPageIndex.bind(this);
	}

	componentDidMount() {
		this.reload();
		// 加载商品分类数据
		var panel = this;
		fn_api({
			"apiName": "GoodsCategory_QueryAll_Api"
		}, function(resp){
			panel.setState({categories: resp.data});
		});
	}

	handleClickSetBuyLimit(goods) {
		fn_api({
			"apiName": "Goods_QueryDetail_Api",
			"goodsId": goods.id
		}, function(resp){
			goods_SetBuyLimit_Main_Modal.show({goodsId:goods.id, goodsDetail:resp.data});
		});
	}

	handleClickEdit(goods) {
		fn_api({
			"apiName": "Goods_QueryDetail_Api",
			"goodsId": goods.id
		}, function(resp){
			goods_Edit_Modal.show({id:goods.id, data:resp.data});
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
					"apiName": "Goods_SoldOut_Api",
					"goodsId": goods.id
				}, function(resp){
					swal("下架成功！", {icon: "success", buttons: "确定"});
					panel.reload();
				});
			}
		});
	}

	handleClickAdd() {
		goods_Add_Modal.show();
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
			"apiName": "Goods_QueryList_Api",
			"pageIndex": pageIndex,
			"pageSize": pageSize,
			"searchCategoryId": this.state.searchGoodsCategoryId
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
							"商品库", 
							React.createElement("div", {className: "pull-right", style: {paddingLeft: "20px"}}, 
								React.createElement("button", {className: "btn btn-danger btn-sm", onClick: this.handleClickAdd}, React.createElement("i", {className: "fa fa-plus", "aria-hidden": "true"}), " 添加")
							), 
							React.createElement("div", {className: "pull-right"}, 
								React.createElement("select", {className: "form-control", style: {minWidth: "140px", height: "30px"}, value: this.state.searchGoodsCategoryId, onChange: e => this.handleChangeSearchGoodsCategoryId(e)}, 
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
										React.createElement("table", {className: "table table-striped table-hover"}, 
											React.createElement("thead", null, 
												React.createElement("tr", null, 
													React.createElement("th", null, "排序号"), 
													React.createElement("th", null, "图片"), 
													React.createElement("th", null, "商品分类"), 
													React.createElement("th", null, "商品名称"), 
													React.createElement("th", null, "原价", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "一级", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "二级", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "三级", React.createElement("small", null, "(元)")), 
													React.createElement("th", null, "库存", React.createElement("small", null, "(件)")), 
													React.createElement("th", null, "备注模板"), 
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
													React.createElement("td", null, x.categoryName), 
													React.createElement("td", null, x.name), 
													React.createElement("td", null, React.createElement("i", {className: "fa fa-jpy", "aria-hidden": "true"}), fn_fen2yuan_in_thousands(x.price)), 
													React.createElement("td", null, React.createElement("i", {className: "fa fa-jpy", "aria-hidden": "true"}), fn_fen2yuan_in_thousands(x.priceLevel1)), 
													React.createElement("td", null, React.createElement("i", {className: "fa fa-jpy", "aria-hidden": "true"}), fn_fen2yuan_in_thousands(x.priceLevel2)), 
													React.createElement("td", null, React.createElement("i", {className: "fa fa-jpy", "aria-hidden": "true"}), fn_fen2yuan_in_thousands(x.priceLevel3)), 
													React.createElement("td", null, x.stock), 
													React.createElement("td", null, 
														x.commentTemplate == 0 && React.createElement("p", null, "-"), 
														x.commentTemplate == 1 && React.createElement("span", {className: "label label-info"}, "第一套"), 
														x.commentTemplate == 2 && React.createElement("span", {className: "label label-info"}, "第二套"), 
														x.commentTemplate == 3 && React.createElement("span", {className: "label label-info"}, "第三套")
													), 
													React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
													React.createElement("td", null, 
														React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickSetBuyLimit(x)}, React.createElement("i", {className: "fa fa-pencil", "aria-hidden": "true"}), " 设置限购"), 
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
