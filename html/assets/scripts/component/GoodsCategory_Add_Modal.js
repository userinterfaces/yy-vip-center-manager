class GoodsCategory_Add_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			desc: null,
			reorder: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$('#goodsCategory_Add_Modal').on('shown.bs.modal', function(e){
			$("#goodsCategory_Add_Modal input")[0].focus();
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
			"apiName": "GoodsCategory_Add_Api",
			"name": this.state.name,
			"desc": this.state.desc,
			"reorder": this.state.reorder
		}, function(resp){
			toastr.info("添加成功");
			modal.hide();
			goodsCategory_Main_Panel.reload();
		});
	}

	show() {
		$("#goodsCategory_Add_Modal").modal({keyboard: true});
	}

	hide() {
		$("#goodsCategory_Add_Modal").modal("hide");
		this.setState({
			name: "",
			desc: "",
			reorder: ""
		});
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "goodsCategory_Add_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h4", null, "添加商品分类")
						), 
						React.createElement("div", {className: "modal-body"}, 
							React.createElement("form", {className: "form-horizontal", role: "form"}, 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "名字"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.name, onChange: e => this.handleChange(e, "name")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "描述"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.desc, onChange: e => this.handleChange(e, "desc")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "排序号", React.createElement("small", null, "(小的在前)")), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.reorder, onChange: e => this.handleChange(e, "reorder")}))
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

var goodsCategory_Add_Modal = ReactDOM.render(React.createElement(GoodsCategory_Add_Modal, null), $("<div></div>").appendTo(document.body)[0]);
