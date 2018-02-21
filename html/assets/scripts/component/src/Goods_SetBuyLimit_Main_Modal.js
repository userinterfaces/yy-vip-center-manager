class Goods_SetBuyLimit_Main_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buyLimitList: [],
			goodsId: null,
			goodsDetail: {
				name: null
			},
			userPhone: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClickAdd = this.handleClickAdd.bind(this);
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.reload = this.reload.bind(this);
	}

	handleChange(e, field) {
		var state = {};
		state[field] = e.target.value;
		this.setState(state);
	}

	handleClickAdd() {
		this.hide();
		goods_SetBuyLimit_Add_Modal.show({goodsId: this.state.goodsId, goodsDetail: this.state.goodsDetail});
	}

	handleClickEdit(buyLimit) {
		var panel = this;
		this.hide();
		fn_api({
			"apiName": "GoodsBuyLimit_QueryDetail_Api",
			"buyLimitId": buyLimit.id
		}, function(resp){
			goods_SetBuyLimit_Edit_Modal.show({goodsId: panel.state.goodsId, goodsDetail: panel.state.goodsDetail, id: buyLimit.id, data: resp.data});
		});
	}

	handleClickDelete(buyLimit) {
		var panel = this;
		swal({
			title: "确定删除吗？",
			icon: "warning",
			buttons: ["取消", "确定"],
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				fn_api({
					"apiName": "GoodsBuyLimit_Delete_Api",
					"buyLimitId": buyLimit.id
				}, function(resp){
					swal("删除成功！", {icon: "success", buttons: "确定"});
					panel.reload();
				});
			}
		});
	}

	show(state) {
		this.setState(state);
		$("#goods_SetBuyLimit_Main_Modal").modal({keyboard: true});
		this.reload();
	}

	hide() {
		$("#goods_SetBuyLimit_Main_Modal").modal("hide");
	}

	reload() {
		var modal = this;
		fn_api({
			"apiName": "GoodsBuyLimit_QueryAll_Api",
			"goodsId": this.state.goodsId
		}, function(resp){
			modal.setState({buyLimitList: resp.data});
		});
	}

	render() {
		return (
			<div className="modal fade" id="goods_SetBuyLimit_Main_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>设置商品限购</h4>
						</div>
						<div className="modal-body">
							<div className="main">
								<div className="main-content">
									<div className="container-fluid">
										<h3 className="page-title">
											{this.state.goodsDetail.name}
											<div className="pull-right">
												<button className="btn btn-danger btn-sm" onClick={this.handleClickAdd}><i className="fa fa-plus" aria-hidden="true"></i> 添加</button>
											</div>
										</h3>
										<div className="row">
											<div className="col-md-12">
												<table className="table table-striped table-hover">
													<thead>
														<tr>
															<th>用户昵称</th>
															<th>限购数量</th>
															<th>创建时间</th>
															<th>操作</th>
														</tr>
													</thead>
													<tbody>
														{this.state.buyLimitList.map((x) => <tr>
															<td>{x.userNickname}</td>
															<td>{x.amount}</td>
															<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
															<td>
																<button className="btn btn-default btn-sm" onClick={e => this.handleClickEdit(x)}><i className="fa fa-pencil" aria-hidden="true"></i> 编辑</button>
																&nbsp;
																<button className="btn btn-default btn-sm" onClick={e => this.handleClickDelete(x)}><i className="fa fa-times" aria-hidden="true"></i> 删除</button>
															</td>
														</tr>)}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var goods_SetBuyLimit_Main_Modal = ReactDOM.render(<Goods_SetBuyLimit_Main_Modal />, $("<div></div>").appendTo(document.body)[0]);
