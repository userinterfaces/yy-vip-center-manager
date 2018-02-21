class Goods_SetBuyLimit_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buyLimit: [],
			id: null,
			data: {
				name: null
			},
			userPhone: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// 焦点
		$('#goods_SetBuyLimit_Modal').on('shown.bs.modal', function(e){
			$("#goods_SetBuyLimit_Modal input")[0].focus();
		});
		// 加载商品限购数据
		var modal = this;
		fn_api({
			"apiName": "GoodsBuyLimit_QueryAll_Api",
			"goodsId": this.state.id
		}, function(resp){
			modal.setState({buyLimit: resp.data});
		});
	}

	handleChange(e, field) {
		var state = {};
		state[field] = e.target.value;
		this.setState(state);
	}

	handleSubmit() {
		var modal = this;
		fn_api({
			"apiName": "GoodsBuyLimit_Add_Api",
			"goodsId": this.state.id,
			"userPhone": this.state.userPhone
		}, function(resp){
			toastr.info("添加成功");
			modal.reload();
		});
	}

	show() {
		$("#goods_SetBuyLimit_Modal").modal({keyboard: true});
	}

	hide() {
		$("#goods_SetBuyLimit_Modal").modal("hide");
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "goods_SetBuyLimit_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h4", null, "设置商品限购")
						), 
						React.createElement("div", {className: "modal-body"}, 
							React.createElement("div", {className: "main"}, 
								React.createElement("div", {className: "main-content"}, 
									React.createElement("div", {className: "container-fluid"}, 
										React.createElement("h3", {className: "page-title"}, 
											"商品分类", 
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
																	React.createElement("th", null, "排序号"), 
																	React.createElement("th", null, "名称"), 
																	React.createElement("th", null, "描述"), 
																	React.createElement("th", null, "操作")
																)
															), 
															React.createElement("tbody", null, 
																this.state.data.map((x) => React.createElement("tr", null, 
																	React.createElement("td", null, x.reorder), 
																	React.createElement("td", null, x.name), 
																	React.createElement("td", null, x.desc), 
																	React.createElement("td", null, 
																		React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickEdit(x)}, React.createElement("i", {className: "fa fa-pencil", "aria-hidden": "true"}), " 编辑"), 
																		" ", 
																		React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickDelete(x)}, React.createElement("i", {className: "fa fa-times", "aria-hidden": "true"}), " 删除")
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
						)
					)
				)
			)
		);
	}
}

var goods_SetBuyLimit_Modal = ReactDOM.render(React.createElement(Goods_SetBuyLimit_Modal, null), $("<div></div>").appendTo(document.body)[0]);
