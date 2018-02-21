class Goods_SetBuyLimit_Main_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buyLimitList: [],
			goodsId: null,
			goodsDetail: {
				name: null
			},
			userPhone: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClickAdd = this.handleClickAdd.bind(this);
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.reload = this.reload.bind(this);
	}

	handleChange(e, field) {
		var state = {};
		state[field] = e.target.value;
		this.setState(state);
	}

	handleClickAdd() {
		this.hide();
		goods_SetBuyLimit_Add_Modal.show({goodsId: this.state.goodsId, goodsDetail: this.state.goodsDetail});
	}

	handleClickEdit(buyLimit) {
		var panel = this;
		this.hide();
		fn_api({
			"apiName": "GoodsBuyLimit_QueryDetail_Api",
			"buyLimitId": buyLimit.id
		}, function(resp){
			goods_SetBuyLimit_Edit_Modal.show({goodsId: panel.state.goodsId, goodsDetail: panel.state.goodsDetail, id: buyLimit.id, data: resp.data});
		});
	}

	handleClickDelete(buyLimit) {
		var panel = this;
		swal({
			title: "确定删除吗？",
			icon: "warning",
			buttons: ["取消", "确定"],
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				fn_api({
					"apiName": "GoodsBuyLimit_Delete_Api",
					"buyLimitId": buyLimit.id
				}, function(resp){
					swal("删除成功！", {icon: "success", buttons: "确定"});
					panel.reload();
				});
			}
		});
	}

	show(state) {
		this.setState(state);
		$("#goods_SetBuyLimit_Main_Modal").modal({keyboard: true});
		this.reload();
	}

	hide() {
		$("#goods_SetBuyLimit_Main_Modal").modal("hide");
	}

	reload() {
		var modal = this;
		fn_api({
			"apiName": "GoodsBuyLimit_QueryAll_Api",
			"goodsId": this.state.goodsId
		}, function(resp){
			modal.setState({buyLimitList: resp.data});
		});
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "goods_SetBuyLimit_Main_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
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
											this.state.goodsDetail.name, 
											React.createElement("div", {className: "pull-right"}, 
												React.createElement("button", {className: "btn btn-danger btn-sm", onClick: this.handleClickAdd}, React.createElement("i", {className: "fa fa-plus", "aria-hidden": "true"}), " 添加")
											)
										), 
										React.createElement("div", {className: "row"}, 
											React.createElement("div", {className: "col-md-12"}, 
												React.createElement("table", {className: "table table-striped table-hover"}, 
													React.createElement("thead", null, 
														React.createElement("tr", null, 
															React.createElement("th", null, "用户昵称"), 
															React.createElement("th", null, "限购数量"), 
															React.createElement("th", null, "创建时间"), 
															React.createElement("th", null, "操作")
														)
													), 
													React.createElement("tbody", null, 
														this.state.buyLimitList.map((x) => React.createElement("tr", null, 
															React.createElement("td", null, x.userNickname), 
															React.createElement("td", null, x.amount), 
															React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
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
		);
	}
}

var goods_SetBuyLimit_Main_Modal = ReactDOM.render(React.createElement(Goods_SetBuyLimit_Main_Modal, null), $("<div></div>").appendTo(document.body)[0]);
