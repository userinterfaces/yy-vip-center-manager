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
			<div className="modal fade" id="ticketGoods_Replenish_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>补货</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">卡密列表<small>(换行符分隔)</small></label>
									<div className="col-sm-7"><textarea className="form-control" value={this.state.tickets} onChange={e => this.handleChange(e, "tickets")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-7"><a href="#" className="btn btn-danger" role="button" onClick={this.handleSubmit}>修改</a></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var ticketGoods_Replenish_Modal = ReactDOM.render(<TicketGoods_Replenish_Modal />, $("<div></div>").appendTo(document.body)[0]);
