class RechargeCard_Add_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rawPasswordSeriesCode: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$('#rechargeCard_Add_Modal').on('shown.bs.modal', function(e){
			$("#rechargeCard_Add_Modal input")[0].focus();
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
			"apiName": "RechargeCard_Add_Api",
			"rawPasswordSeriesCode": this.state.rawPasswordSeriesCode
		}, function(resp){
			toastr.info("添加成功");
			modal.hide();
			rechargeCard_Main_Panel.reload();
		});
	}

	show() {
		$("#rechargeCard_Add_Modal").modal({keyboard: true});
	}

	hide() {
		$("#rechargeCard_Add_Modal").modal("hide");
		this.setState({
			rawPasswordSeriesCode: ""
		});
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "rechargeCard_Add_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h4", null, "添加单个充值卡")
						), 
						React.createElement("div", {className: "modal-body"}, 
							React.createElement("form", {className: "form-horizontal", role: "form"}, 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "原始密码序列编码串"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", value: this.state.rawPasswordSeriesCode, onChange: e => this.handleChange(e, "rawPasswordSeriesCode")}))
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

var rechargeCard_Add_Modal = ReactDOM.render(React.createElement(RechargeCard_Add_Modal, null), $("<div></div>").appendTo(document.body)[0]);
