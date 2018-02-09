class System_EditMyPassword_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: null,
			newPassword: null,
			repeatNewPassword: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$("#system_EditMyPassword_Modal").on('shown.bs.modal', function(e){
			$("#system_EditMyPassword_Modal input")[0].focus();
		});
	}

	handleChange(e, field) {
		var state = {};
		state[field] = e.target.value;
		this.setState(state);
	}

	handleSubmit() {
		var modal = this;
		if (this.state.repeatNewPassword != this.state.newPassword) {
			toastr.error("两次输入的密码不一致");
			return;
		}
		fn_api({
			"apiName": "System_UpdateMyPassword_Api",
			"oldLoginPassword": this.state.oldPassword,
			"newLoginPassword": this.state.newPassword
		}, function(){
			toastr.info("修改成功");
			modal.hide();
		});
	}

	show() {
		$("#system_EditMyPassword_Modal").modal({keyboard: true});
	}

	hide() {
		$("#system_EditMyPassword_Modal").modal("hide");
		this.setState({
			oldPassword: "",
			newPassword: "",
			repeatNewPassword: ""
		});
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "system_EditMyPassword_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h4", null, "修改密码")
						), 
						React.createElement("div", {className: "modal-body"}, 
							React.createElement("form", {className: "form-horizontal", role: "form"}, 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "旧密码"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", placeholder: "请输入旧密码", value: this.state.oldPassword, onChange: e => this.handleChange(e, "oldPassword")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "新密码"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", placeholder: "请输入新密码", value: this.state.newPassword, onChange: e => this.handleChange(e, "newPassword")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "再次输入新密码"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", placeholder: "请再次输入新密码", value: this.state.repeatNewPassword, onChange: e => this.handleChange(e, "repeatNewPassword")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("a", {href: "#", className: "btn btn-danger", role: "button", onClick: this.handleSubmit}, "修改"))
								)
							)
						)
					)
				)
			)
		);
	}
}

var system_EditMyPassword_Modal = ReactDOM.render(React.createElement(System_EditMyPassword_Modal, null), $("<div></div>").appendTo(document.body)[0]);
