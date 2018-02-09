class User_Edit_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			data: {
				level: null,
				isDisable: null
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$('#user_Edit_Modal').on('shown.bs.modal', function(e){
			$("#user_Edit_Modal select")[0].focus();
		});
	}

	handleChange(e, field) {
		var data = this.state.data;
		data[field] = e.target.value;
		this.setState({data: data});
	}

	handleSubmit() {
		var modal = this;
		fn_api({
			"apiName": "User_Update_Api",
			"userId": this.state.id,
			"level": this.state.data.level,
			"isDisable": this.state.data.isDisable
		}, function(resp){
			toastr.info("修改成功");
			modal.hide();
			user_Main_Panel.reload();
		});
	}

	show(state) {
		this.setState(state);
		$("#user_Edit_Modal").modal({keyboard: true});
	}

	hide() {
		$("#user_Edit_Modal").modal("hide");
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "user_Edit_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h4", null, "编辑用户")
						), 
						React.createElement("div", {className: "modal-body"}, 
							React.createElement("form", {className: "form-horizontal", role: "form"}, 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "等级"), 
									React.createElement("div", {className: "col-sm-7"}, 
										React.createElement("select", {className: "form-control", value: this.state.data.level, onChange: e => this.handleChange(e, "level")}, 
											React.createElement("option", {value: "0"}, "普通用户"), 
											React.createElement("option", {value: "1"}, "一级代理"), 
											React.createElement("option", {value: "2"}, "二级代理"), 
											React.createElement("option", {value: "3"}, "三级代理")
										)
									)
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "是否禁用"), 
									React.createElement("div", {className: "col-sm-7"}, 
										React.createElement("select", {className: "form-control", value: this.state.data.isDisable, onChange: e => this.handleChange(e, "isDisable")}, 
											React.createElement("option", {value: "0"}, "启用"), 
											React.createElement("option", {value: "1"}, "禁用")
										)
									)
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

var user_Edit_Modal = ReactDOM.render(React.createElement(User_Edit_Modal, null), $("<div></div>").appendTo(document.body)[0]);
