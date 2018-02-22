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
			<div className="modal fade" id="ticketGoods_ShowTickets_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>查看剩余卡密</h4>
						</div>
						<div className="modal-body">
							{this.state.tickets.map((x) => <p>{x.ticket}</p>)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var ticketGoods_ShowTickets_Modal = ReactDOM.render(<TicketGoods_ShowTickets_Modal />, $("<div></div>").appendTo(document.body)[0]);
