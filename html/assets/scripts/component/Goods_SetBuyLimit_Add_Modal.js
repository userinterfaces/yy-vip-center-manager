class Goods_SetBuyLimit_Add_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			goodsId: null,
			goodsDetail: {
				name: null
			},
			userNickname: null,
			amount: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$('#goods_SetBuyLimit_Add_Modal').on('shown.bs.modal', function(e){
			$("#goods_SetBuyLimit_Add_Modal input")[0].focus();
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
			"goodsId": this.state.goodsId,
			"userNickname": this.state.userNickname,
			"amount": this.state.amount
		}, function(resp){
			toastr.info("添加成功");
			modal.hide();
			goods_SetBuyLimit_Main_Modal.show({goodsId: modal.state.goodsId, goodsDetail: modal.state.goodsDetail});
		});
	}

	show(state) {
		this.setState(state);
		this.setState({
			userNickname: "",
			amount: ""
		});
		$("#goods_SetBuyLimit_Add_Modal").modal({keyboard: true});
	}

	hide() {
		$("#goods_SetBuyLimit_Add_Modal").modal("hide");
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "goods_SetBuyLimit_Add_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h4", null, "添加商品限购")
						), 
						React.createElement("div", {className: "modal-body"}, 
							React.createElement("form", {className: "form-horizontal", role: "form"}, 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "用户昵称"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.userNickname, onChange: e => this.handleChange(e, "userNickname")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "限购数量"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.amount, onChange: e => this.handleChange(e, "amount")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("a", {href: "#", className: "btn btn-danger", role: "button", onClick: this.handleSubmit}, "添加"))
								)
							)
						)
					)
				)
			)
		);
	}
}

var goods_SetBuyLimit_Add_Modal = ReactDOM.render(React.createElement(Goods_SetBuyLimit_Add_Modal, null), $("<div></div>").appendTo(document.body)[0]);
