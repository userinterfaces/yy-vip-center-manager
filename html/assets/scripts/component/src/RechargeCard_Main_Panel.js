class RechargeCard_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			pager: {
				isFirstPage: null,
				isLastPage: null,
				pageIndex: null,
				pageSize: null,
				totalPages: null,
				totalRecords: null
			},
			neighborPageIndexs: []
		};
		this.reload = this.reload.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
	}

	componentDidMount() {
		this.reload();
		var clipboard = new Clipboard('.btn-copy');
		clipboard.on('success', function(e) {
			toastr.info("已复制！");
			e.clearSelection();
		});
		clipboard.on('error', function(e) {
			toastr.error("无法复制！");
		});
	}

	handleClickAdd() {
		rechargeCard_Add_Modal.show();
	}

	reload(pageIndex, pageSize) {
		if (pageIndex == null) {
			pageIndex = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}
		var panel = this;
		fn_api({
			"apiName": "RechargeCard_QueryList_Api",
			"pageIndex": pageIndex,
			"pageSize": pageSize
		}, function(resp){
			panel.setState({data: resp.data, pager: resp.pager, neighborPageIndexs: fn_getNeighborPageIndexs(resp.pager, 5)});
		});
	}

	handleClickPageIndex(pageIndex) {
		if (pageIndex == "first" && this.state.pager.isFirstPage == 0) {
			this.reload(0, 15);
		} else if (pageIndex == "last" && this.state.pager.isLastPage == 0) {
			this.reload(this.state.pager.totalPages - 1, 15);
		} else if (pageIndex == "previous" && this.state.pager.isFirstPage == 0) {
			this.reload(this.state.pager.pageIndex - 1, 15);
		} else if (pageIndex == "next" && this.state.pager.isLastPage == 0) {
			this.reload(this.state.pager.pageIndex + 1, 15);
		} else if (typeof(pageIndex) == "number") {
			this.reload(pageIndex, 15);
		}
	}

	handleClickDelete(rechargeCard) {
		var panel = this;
		fn_api({
			"apiName": "RechargeCard_Delete_Api",
			"rechargeCardId": rechargeCard.id
		}, function(resp){
			panel.reload();
		});
	}

	getPasswordSeriesCode(rechargeCard) {
		var rawPasswordSeriesCode = rechargeCard.rawPasswordSeriesCode;
		var code = rawPasswordSeriesCode.substring(0, rawPasswordSeriesCode.indexOf("@"));
		var amount = rawPasswordSeriesCode.substring(rawPasswordSeriesCode.indexOf("@"));
		return code.substring(0, 5) + "**********" + code.substring(code.length - 5) + amount;
	}

	render() {
		return (
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<h3 className="page-title">
							充值卡管理
							<div className="pull-right">
								<button className="btn btn-danger btn-sm" onClick={this.handleClickAdd}><i className="fa fa-plus" aria-hidden="true"></i> 添加</button>
							</div>
						</h3>
						<div className="row">
							<div className="col-md-12">
								<div className="panel">
									<div className="panel-heading">
										<h3 className="panel-title">Table</h3>
									</div>
									<div className="panel-body">
										<table className="table table-striped table-hover">
											<thead>
												<tr>
													<th>原始密码序列编码串</th>
													<th>面额<small>(元)</small></th>
													<th>状态</th>
													<th>入库时间</th>
													<th>使用时间</th>
													<th>操作</th>
												</tr>
											</thead>
											<tbody>
												{this.state.data.map((x) => <tr>
													<td>{this.getPasswordSeriesCode(x)}</td>
													<td>{x.amount}</td>
													<td>
														{x.dtUse > 0 &&
															<span className="label label-default">已使用</span>
														}
														{x.dtUse == 0 &&
															<span className="label label-success">未使用</span>
														}
													</td>
													<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
													<td>{x.dtUse == 0 ? "-" : fn_format_date(new Date(x.dtUse), "yyyy-MM-dd hh:mm:ss")}</td>
													<td>
														<button className="btn btn-default btn-sm btn-copy" data-clipboard-text={x.rawPasswordSeriesCode}>
															<img width="14px" src="assets/img/clippy.svg" alt="Copy to clipboard" />
														</button>
														&nbsp;&nbsp;
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickDelete(x)}> 删除</button>
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
		);
	}
}
