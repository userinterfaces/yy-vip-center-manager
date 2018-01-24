class MixOrder_Main_Panel extends React.Component {
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
			neighborPageIndexs: [],
			searchStatus: 0
		};
		this.reload = this.reload.bind(this);
		this.handleClickClose = this.handleClickClose.bind(this);
	}

	componentDidMount() {
		var panel = this;
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			panel.setState({searchStatus: e.target.dataset.searchStatus});
			panel.reload();
		})
		this.reload();
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
			"apiName": "MixOrder_QueryList_Api",
			"pageIndex": pageIndex,
			"pageSize": pageSize,
			"searchStatus": this.state.searchStatus
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

	handleClickClose(mixOrder) {
		console.dir(mixOrder);
	}

	render() {
		return (
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<h3 className="page-title">
							订单管理
						</h3>
						<div className="row">
							<div className="col-md-12">
								<div className="panel">
									<div className="panel-heading">
										<h3 className="panel-title">Table</h3>
									</div>
									<div className="panel-body">
										<div className="row">
										    <div className="col-md-12">
								                <ul className="nav nav-tabs">
													<li className="active"><a href="#" data-toggle="tab" data-search-status="0">全部订单</a></li>
													<li><a href="#" data-toggle="tab" data-search-status="1">未处理</a></li>
													<li><a href="#" data-toggle="tab" data-search-status="2">已处理</a></li>
													<li><a href="#" data-toggle="tab" data-search-status="3">退货中</a></li>
													<li><a href="#" data-toggle="tab" data-search-status="4">已退货</a></li>
													<li><a href="#" data-toggle="tab" data-search-status="5">退货被拒绝</a></li>
												</ul>
										    </div>
										</div>
										<table className="table table-striped table-hover">
											<thead>
												<tr>
													<th>订单号</th>
													<th>用户</th>
													<th>金额<small>(元)</small></th>
													<th>商品</th>
													<th>备注</th>
													<th>状态</th>
													<th>下单时间</th>
													<th>处理时间</th>
													<th>操作</th>
												</tr>
											</thead>
											<tbody>
												{this.state.data.map((x) => <tr>
													<td>{x.id}</td>
													<td>{x.userNickname}</td>
													<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
													<td>{x.goodsName}</td>
													<td>{x.comment}</td>
													<td>
														{x.dtDispose > 0 &&
															<span className="label label-default">已处理</span>
														}
														{x.dtDispose == 0 &&
															<span className="label label-success">未处理</span>
														}
													</td>
													<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
													<td>{x.dtDispose == 0 ? "-" : fn_format_date(new Date(x.dtDispose), "yyyy-MM-dd hh:mm:ss")}</td>
													<td>
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickClose(x)}><i className="fa fa-check" aria-hidden="true"></i> 已处理</button>
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
