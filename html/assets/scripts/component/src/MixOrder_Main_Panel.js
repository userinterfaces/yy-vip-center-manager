class MixOrder_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
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
			searchStatus: 0,
			searchGoodsCategoryId: ""
		};
		this.reload = this.reload.bind(this);
		this.handleClickClose = this.handleClickClose.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClickRefundRequestAgree = this.handleClickRefundRequestAgree.bind(this);
		this.handleClickRefundRequestReject = this.handleClickRefundRequestReject.bind(this);
		this.handleChangeSearchGoodsCategoryId = this.handleChangeSearchGoodsCategoryId.bind(this);
		
	}

	componentDidMount() {
		var panel = this;
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			panel.setState({searchStatus: e.target.dataset.searchStatus});
			panel.reload();
		})
		this.reload();
		// 加载商品分类数据
		var modal = this;
		fn_api({
			"apiName": "GoodsCategory_QueryAll_Api"
		}, function(resp){
			modal.setState({categories: resp.data});
		});
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
			"searchStatus": this.state.searchStatus,
			"searchGoodsCategoryId": this.state.searchGoodsCategoryId
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
		var panel = this;
		fn_api({
			"apiName": "MixOrder_Close_Api",
			"orderId": mixOrder.id
		}, function(resp){
			panel.reload();
		});
	}

	handleClickOpen(mixOrder) {
		var panel = this;
		fn_api({
			"apiName": "MixOrder_Open_Api",
			"orderId": mixOrder.id
		}, function(resp){
			panel.reload();
		});
	}

	handleClickRefundRequestAgree(mixOrder) {
		var panel = this;
		fn_api({
			"apiName": "MixOrder_AgreeRefundRequest_Api",
			"orderId": mixOrder.id
		}, function(resp){
			panel.reload();
		});
	}

	handleClickRefundRequestReject(mixOrder) {
		var panel = this;
		fn_api({
			"apiName": "MixOrder_RejectRefundRequest_Api",
			"orderId": mixOrder.id
		}, function(resp){
			panel.reload();
		});
	}

	buildReadableComment(mixOrder) {
		if (mixOrder.isTicketGoodsOrder == 1){
			return (
				<div>
					<span>卡密订单</span>
				</div>
			);
		}
		var template = mixOrder.goodsCommentTemplate;
		var comment = JSON.parse(mixOrder.comment);
		if (template == 0) {
			return (
				<div>
					<span>【留言】：{comment.basic}</span>
				</div>
			);
		} else if (template == 1) {
			return (
				<div>
					<span>【频道号】：{comment.channel}</span>
					<span>【开播时间段】：{comment.times[0].start+"-"+comment.times[0].end + "; " + comment.times[1].start+"-"+comment.times[1].end+ "; " + comment.times[2].start+"-"+comment.times[2].end}</span>
					<span>【留言】：{comment.basic}</span>
				</div>
			);
		} else if (template == 2) {
			return (
				<div>
					<span>【频道号】：{comment.channel}</span>
					<span>【留言】：{comment.basic}</span>
				</div>
			);
		} else if (template == 3) {
			return (
				<div>
					<span>【频道号】：{comment.channel}</span>
					<span>【是否是卡天频道】：{comment.isKtChannel==1?"是":"否"}</span>
					<span>【留言】：{comment.basic}</span>
				</div>
			);
		}
	}

	handleChangeSearchGoodsCategoryId(e) {
		this.setState({searchGoodsCategoryId: e.target.value}, function() {
			this.reload();
		});
	}

	render() {
		return (
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<h3 className="page-title">
							订单管理
							<div className="pull-right">
								<select className="form-control" style={{minWidth: "140px"}} value={this.state.searchGoodsCategoryId} onChange={e => this.handleChangeSearchGoodsCategoryId(e)}>
									<option value="">请选择商品分类</option>
									{this.state.categories.map(x => <option value={x.id}>{x.name}</option>)}
								</select>
							</div>
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
													<li className="active"><a href="#all" data-toggle="tab" data-search-status="0">全部订单</a></li>
													<li><a href="#undisposed" data-toggle="tab" data-search-status="1">未处理</a></li>
													<li><a href="#disposed" data-toggle="tab" data-search-status="2">已处理</a></li>
													<li><a href="#refundRequest" data-toggle="tab" data-search-status="3">退货中</a></li>
													<li><a href="#refundRequestAgree" data-toggle="tab" data-search-status="4">已退货</a></li>
													<li><a href="#refundRequestReject" data-toggle="tab" data-search-status="5">退货被拒绝</a></li>
												</ul>
										    </div>
										</div>
										<div className="tab-content">
											<div className="tab-pane active" id="all">
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
														</tr>
													</thead>
													<tbody>
														{this.state.data.map((x) => <tr>
															<td>{x.id}</td>
															<td>{x.userNickname}</td>
															<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
															<td>{x.goodsName}</td>
															<td>{this.buildReadableComment(x)}</td>
															<td>
																{x.isTicketGoodsOrder == 0 && x.isDispose == 1 &&
																	<span className="label label-default">已处理</span>
																}
																{x.isTicketGoodsOrder == 0 && x.isDispose == 0 &&
																	<span className="label label-success">未处理</span>
																}
																{x.isTicketGoodsOrder == 0 && x.refundRequestStatus == 1 &&
																	<span className="label label-danger">退货中</span>
																}
																{x.isTicketGoodsOrder == 0 && x.refundRequestStatus == 2 &&
																	<span className="label label-info">已退货</span>
																}
																{x.isTicketGoodsOrder == 0 && x.refundRequestStatus == 3 &&
																	<span className="label label-warning">退货被拒绝</span>
																}
															</td>
															<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
														</tr>)}
													</tbody>
												</table>
											</div>
											<div className="tab-pane" id="undisposed">
												<table className="table table-striped table-hover">
													<thead>
														<tr>
															<th>订单号</th>
															<th>用户</th>
															<th>金额<small>(元)</small></th>
															<th>商品</th>
															<th>备注</th>
															<th>下单时间</th>
															<th>操作</th>
														</tr>
													</thead>
													<tbody>
														{this.state.data.map((x) => <tr>
															<td>{x.id}</td>
															<td>{x.userNickname}</td>
															<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
															<td>{x.goodsName}</td>
															<td>{this.buildReadableComment(x)}</td>
															<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
															<td>
																<button className="btn btn-default btn-sm" onClick={e => this.handleClickClose(x)}> 处理</button>
															</td>
														</tr>)}
													</tbody>
												</table>
											</div>
											<div className="tab-pane" id="disposed">
												<table className="table table-striped table-hover">
													<thead>
														<tr>
															<th>订单号</th>
															<th>用户</th>
															<th>金额<small>(元)</small></th>
															<th>商品</th>
															<th>备注</th>
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
															<td>{this.buildReadableComment(x)}</td>
															<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
															<td>{fn_format_date(new Date(x.dtDispose), "yyyy-MM-dd hh:mm:ss")}</td>
															<td>
																<button className="btn btn-default btn-sm" onClick={e => this.handleClickOpen(x)}> 标记为未处理</button>
															</td>
														</tr>)}
													</tbody>
												</table>
											</div>
											<div className="tab-pane" id="refundRequest">
												<table className="table table-striped table-hover">
													<thead>
														<tr>
															<th>订单号</th>
															<th>用户</th>
															<th>金额<small>(元)</small></th>
															<th>商品</th>
															<th>备注</th>
															<th>下单时间</th>
															<th>退货申请时间</th>
															<th>操作</th>
														</tr>
													</thead>
													<tbody>
														{this.state.data.map((x) => <tr>
															<td>{x.id}</td>
															<td>{x.userNickname}</td>
															<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
															<td>{x.goodsName}</td>
															<td>{x.refundRequestComment}</td>
															<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
															<td>{fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
															<td>
																<button className="btn btn-default btn-sm" onClick={e => this.handleClickRefundRequestAgree(x)}><i className="fa fa-check" aria-hidden="true"></i> 同意</button>
																&nbsp;&nbsp;
																<button className="btn btn-default btn-sm" onClick={e => this.handleClickRefundRequestReject(x)}><i className="fa fa-times" aria-hidden="true"></i> 拒绝</button>
															</td>
														</tr>)}
													</tbody>
												</table>
											</div>
											<div className="tab-pane" id="refundRequestAgree">
												<table className="table table-striped table-hover">
													<thead>
														<tr>
															<th>订单号</th>
															<th>用户</th>
															<th>金额<small>(元)</small></th>
															<th>商品</th>
															<th>备注</th>
															<th>退货申请时间</th>
															<th>审核时间</th>
														</tr>
													</thead>
													<tbody>
														{this.state.data.map((x) => <tr>
															<td>{x.id}</td>
															<td>{x.userNickname}</td>
															<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
															<td>{x.goodsName}</td>
															<td>{x.refundRequestComment}</td>
															<td>{fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
															<td>{fn_format_date(new Date(x.dtAuditRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
														</tr>)}
													</tbody>
												</table>
											</div>
											<div className="tab-pane" id="refundRequestReject">
												<table className="table table-striped table-hover">
													<thead>
														<tr>
															<th>订单号</th>
															<th>用户</th>
															<th>金额<small>(元)</small></th>
															<th>商品</th>
															<th>备注</th>
															<th>退货申请时间</th>
															<th>审核时间</th>
														</tr>
													</thead>
													<tbody>
														{this.state.data.map((x) => <tr>
															<td>{x.id}</td>
															<td>{x.userNickname}</td>
															<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
															<td>{x.goodsName}</td>
															<td>{x.refundRequestComment}</td>
															<td>{fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
															<td>{fn_format_date(new Date(x.dtAuditRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
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
