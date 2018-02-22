class TicketGoods_ShowTickets_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tickets: []
		};
	}

	show(state) {
		this.setState(state);
		$("#ticketGoods_ShowTickets_Modal").modal({keyboard: true});
	}

	hide() {
		$("#ticketGoods_ShowTickets_Modal").modal("hide");
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "ticketGoods_ShowTickets_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h4", null, "查看剩余卡密")
						), 
						React.createElement("div", {className: "modal-body"}, 
							this.state.tickets.map((x) => React.createElement("p", null, x.ticket))
						)
					)
				)
			)
		);
	}
}

var ticketGoods_ShowTickets_Modal = ReactDOM.render(React.createElement(TicketGoods_ShowTickets_Modal, null), $("<div></div>").appendTo(document.body)[0]);
