class Goods_SetBuyLimit_Edit_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			goodsId: null,
			goodsDetail: {
				name: null
			},
			id: null,
			data: {
				amount: null
			},
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		$('#goods_SetBuyLimit_Edit_Modal').on('shown.bs.modal', function(e){
			$("#goods_SetBuyLimit_Edit_Modal input")[0].focus();
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
			"apiName": "GoodsBuyLimit_Update_Api",
			"buyLimitId": this.state.id,
			"amount": this.state.data.amount
		}, function(resp){
			toastr.info("修改成功");
			modal.hide();
			goods_SetBuyLimit_Main_Modal.show({goodsId: modal.state.goodsId, goodsDetail: modal.state.goodsDetail});
		});
	}

	show(state) {
		this.setState(state);
		$("#goods_SetBuyLimit_Edit_Modal").modal({keyboard: true});
	}

	hide() {
		$("#goods_SetBuyLimit_Edit_Modal").modal("hide");
	}

	render() {
		return (
			<div className="modal fade" id="goods_SetBuyLimit_Edit_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>编辑商品限购</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">限购数量</label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.data.amount} onChange={e => this.handleChange(e, "amount")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-7"><a href="#" className="btn btn-danger" role="button" onClick={this.handleClick}>修改</a></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var goods_SetBuyLimit_Edit_Modal = ReactDOM.render(<Goods_SetBuyLimit_Edit_Modal />, $("<div></div>").appendTo(document.body)[0]);
