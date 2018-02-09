class GoodsCategory_Edit_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			data: {
				name: null,
				desc: null,
				reorder: null
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		$('#goodsCategory_Edit_Modal').on('shown.bs.modal', function(e){
			$("#goodsCategory_Edit_Modal input")[0].focus();
		});
	}

	handleChange(e, field) {
		var data = this.state.data;
		data[field] = e.target.value;
		this.setState({data: data});
	}

	handleClick() {
		var modal = this;
		fn_api({
			"apiName": "GoodsCategory_Update_Api",
			"categoryId": this.state.id,
			"name": this.state.data.name,
			"desc": this.state.data.desc,
			"reorder": this.state.data.reorder
		}, function(resp){
			toastr.info("修改成功");
			modal.hide();
			goodsCategory_Main_Panel.reload();
		});
	}

	show(state) {
		this.setState(state);
		$("#goodsCategory_Edit_Modal").modal({keyboard: true});
	}

	hide() {
		$("#goodsCategory_Edit_Modal").modal("hide");
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "goodsCategory_Edit_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h4", null, "编辑商品分类")
						), 
						React.createElement("div", {className: "modal-body"}, 
							React.createElement("form", {className: "form-horizontal", role: "form"}, 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "名字"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.data.name, onChange: e => this.handleChange(e, "name")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "描述"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.data.desc, onChange: e => this.handleChange(e, "desc")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "排序号", React.createElement("small", null, "(小的在前)")), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.data.reorder, onChange: e => this.handleChange(e, "reorder")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("a", {href: "#", className: "btn btn-danger", role: "button", onClick: this.handleClick}, "修改"))
								)
							)
						)
					)
				)
			)
		);
	}
}

var goodsCategory_Edit_Modal = ReactDOM.render(React.createElement(GoodsCategory_Edit_Modal, null), $("<div></div>").appendTo(document.body)[0]);
