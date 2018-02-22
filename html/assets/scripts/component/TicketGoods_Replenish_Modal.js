class TicketGoods_Replenish_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			tickets: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$('#ticketGoods_Replenish_Modal').on('shown.bs.modal', function(e){
			$("#ticketGoods_Replenish_Modal textarea")[0].focus();
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
			"apiName": "TicketGoods_Replenish_Api",
			"ticketGoodsId": this.state.id,
			"tickets": this.state.tickets
		}, function(resp){
			toastr.info("补货成功");
			modal.hide();
			ticketGoods_Main_Panel.reload();
		});
	}

	show(state) {
		this.setState(state);
		$("#ticketGoods_Replenish_Modal").modal({keyboard: true});
	}

	hide() {
		$("#ticketGoods_Replenish_Modal").modal("hide");
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "ticketGoods_Replenish_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h4", null, "补货")
						), 
						React.createElement("div", {className: "modal-body"}, 
							React.createElement("form", {className: "form-horizontal", role: "form"}, 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "卡密列表", React.createElement("small", null, "(换行符分隔)")), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("textarea", {className: "form-control", value: this.state.tickets, onChange: e => this.handleChange(e, "tickets")}))
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

var ticketGoods_Replenish_Modal = ReactDOM.render(React.createElement(TicketGoods_Replenish_Modal, null), $("<div></div>").appendTo(document.body)[0]);
