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
			<div className="modal fade" id="rechargeCard_Add_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>添加单个充值卡</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">原始密码序列编码串</label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.rawPasswordSeriesCode} onChange={e => this.handleChange(e, "rawPasswordSeriesCode")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-7"><a href="#" className="btn btn-danger" role="button" onClick={this.handleSubmit}>添加</a></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var rechargeCard_Add_Modal = ReactDOM.render(<RechargeCard_Add_Modal />, $("<div></div>").appendTo(document.body)[0]);
